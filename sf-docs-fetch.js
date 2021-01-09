const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { urls } = require('./paths')

// Get Docs
puppeteer
  .launch()
  .then(async browser => {
    console.time('pagefetch');

    const page = await browser.newPage();
    console.log('*doc page browser open*');

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

      console.log(`got to the ${urls[i].name} docs page`);

      const docsHtml = await page.evaluate(() => document.querySelector('#documentation').innerHTML);
      console.log(`got the ${urls[i].name} docs page html`);

      const docFileName = 'docs.html'

      fs.writeFile(`${baseDir}${docFileName}`, docsHtml, 'utf8', function (err) {
        if (err) throw err;
        console.log(`wrote the ${urls[i].name} doc file`);
      });

      /**
       * Get specs html.
       */
      const specsUrl = urls[i].specs;
      const promiseSpecs = page.waitForNavigation({ waitUntil: 'networkidle2' });

      await page.goto(specsUrl);
      await promiseSpecs;

      console.log(`got to the ${urls[i].name} specs page`);

      const specsHtml = await page.evaluate(() => document.querySelector('#specification').innerHTML);
      console.log(`got the ${urls[i].name} specs page html`);

      // const name = urls[i].name;
      // const baseDir = path.join(__dirname, `/./docs/${name}/`);
      const specsFileName = 'specs.html'

      fs.writeFile(`${baseDir}${specsFileName}`, specsHtml, 'utf8', function (err) {
        if (err) throw err;
        console.log(`wrote the ${urls[i].name} specs file`);
      });
    }

    await browser.close();
    console.log('*doc page browser closed*');
    console.timeEnd('pagefetch');
  })
  .catch(function(err) {
    console.error(err);
  });
