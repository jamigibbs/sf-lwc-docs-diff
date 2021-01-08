const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const urls = require('./urls')

// Get Docs
puppeteer
  .launch()
  .then (async browser => { 
    const page = await browser.newPage();
    await page.goto(urls[0].docs, {waitUntil: 'load', timeout: 0});
    console.log('1. got doc page');

    // Wait until the full page has loaded before finding element.
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    console.log('2. doc page finished loading');

    const html = await page.evaluate(() => document.querySelector('body').innerHTML);

    console.log('3. got doc page html');

    // Create/updated doc html file
    const name = urls[0].name;
    const baseDir = path.join(__dirname, `/./docs/${name}/`);
    const docsFile = 'docs.html'
    const stream = fs.createWriteStream(`${baseDir}${docsFile}`);

    stream.once('open', function(fd) {
      stream.write(html);
      stream.end();
    });

    console.log('4. wrote doc html to file');

    // console.log(grabDocs);
    await browser.close();

    console.log('5. doc page browser closed');
  })
  .catch(function(err) {
    console.error(err);
  });


// Get specs
puppeteer
  .launch()
  .then (async browser => { 
    const page = await browser.newPage();
    await page.goto(urls[0].specs, {waitUntil: 'load', timeout: 0});

    console.log('1. got specs page');

    // Wait until the full page has loaded before finding element.
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    console.log('2. specs page finished loading');

    const html = await page.evaluate(() => document.querySelector('body').innerHTML);

    console.log('3. got specs page html');

    // Create/updated doc html file

    const name = urls[0].name;
    const baseDir = path.join(__dirname, `/./docs/${name}/`);
    const docsFile = 'specs.html'
    const stream = fs.createWriteStream(`${baseDir}${docsFile}`);

    stream.once('open', function(fd) {
      stream.write(html);
      stream.end();
    });

    console.log('4. wrote specs html to file');

    // console.log(grabDocs);
    await browser.close();
    
    console.log('5. specs page browser closed');
  })
  .catch(function(err) {
    console.error(err);
  });