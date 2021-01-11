const dotenv = require('dotenv');
const puppeteer = require('puppeteer');
const fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();
const simpleGitPromise = require('simple-git/promise')();
const path = require('path');
const { urls } = require('./paths');

const GIT_REPO = 'sf-lwc-docs-diff';
const GIT_DIFF_BRANCH = 'site-diffs';
const GIT_USERNAME = process.env.GIT_USERNAME;
const GIT_PASSWORD = process.env.GIT_PASSWORD;
const AUTHOR_NAME = process.env.npm_package_author_name;
const AUTHOR_EMAIL = process.env.npm_package_author_email;
const repoUrl = 'https://github.com/jamigibbs/sf-lwc-docs-diff';
const githubUrl = `https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_USERNAME}/${GIT_REPO}`;

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  git.init()
    .addRemote('origin', githubUrl, onRemoteAdd)
    .addConfig('user.email', AUTHOR_EMAIL)
    .addConfig('user.name', AUTHOR_NAME)
    .checkoutLocalBranch(GIT_DIFF_BRANCH)
    .catch(handleGitCatch);
}

puppeteer
  .launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
  .then(async browser => {
    console.time('pagefetch');

    const page = await browser.newPage();
    console.log('*browser open*');

    for ( let i = 0; i < urls.length; i++) {
      const docsUrl = urls[i].docs;
      const name = urls[i].name;
      const baseDir = path.join(__dirname, `/./docs/${name}/`);

      /**
       * Get Docs html.
       */
      const promiseDocs = page.waitForNavigation({ waitUntil: 'networkidle2' });

      await page.goto(docsUrl);
      await promiseDocs;

      const docsHtml = await page.evaluate(() => {
        const el = document.querySelector('#documentation');
        if (el) {
          return el.innerHTML
        } else {
          console.log(`${i} - unable to locate ${urls[i].name} docs element`);
          return null;
        }
      });

      if (docsHtml) {
        const docFileName = 'docs.html';
        fs.writeFile(`${baseDir}${docFileName}`, docsHtml, 'utf8', function (err) {
          if (err) throw err;
          console.log(`${i} - ${urls[i].name} docs done`);
        });
      }

      /**
       * Get specs html.
       */
      const specsUrl = urls[i].specs;
      const promiseSpecs = page.waitForNavigation({ waitUntil: 'networkidle2' });

      await page.goto(specsUrl);
      await promiseSpecs;

      const specsHtml = await page.evaluate(() => {
        const el = document.querySelector('#specification');
        if (el) {
          return el.innerHTML;
        } else {
          console.log(`${i} - unable to locate ${urls[i].name} specs element`);
          return null;
        }
      });

      if (specsHtml) {
        const specsFileName = 'specs.html'
        fs.writeFile(`${baseDir}${specsFileName}`, specsHtml, 'utf8', function (err) {
          if (err) throw err;
          console.log(`${i} - ${urls[i].name} specs done`);
        });
      }
    }

    await browser.close();
    console.log('*browser closed*');
    console.timeEnd('pagefetch');

    // Only automate the git commit during a production process.
    if (process.env.NODE_ENV === 'production') {
      handleGitCommit();
    }
  })
  .catch(function(err) {
    console.error(err);
  });

function handleGitCommit(){
  const commitMessage = `${generatePrettyDateTime()} - Diff found`;

  // Add local git config
  // git.addConfig('user.email', AUTHOR_EMAIL);
  // git.addConfig('user.name', AUTHOR_NAME);

  git.add('.')
    .commit(commitMessage)
    .push('origin', 'main')
    .catch(handleGitCatch)
}

function generatePrettyDateTime(){
  let date = new Date();
  return date.toLocaleDateString(); // -> "2/1/2021"
}

function onRemoteAdd (err, result) {
  if (err) console.log('git onRemoteAdd', err);
  console.log('git onRemoteAdd res', result);
}

function handleGitCatch (err, result) {
  if (err) console.log('git catch err', err);
  console.log('git catch res', result);
}
