const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { urls } = require('./paths')

puppeteer
  .launch()
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
  })
  .catch(function(err) {
    console.error(err);
  });
