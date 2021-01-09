# sf-docs-diff

A small script that scrapes the html from the [Salesforce developer component reference public documentation](https://developer.salesforce.com/docs/component-library/overview/components) so that we can diff previous versions of the components and therefore track updates that are not always publicing announced.

Currently the script needs to be run manually to generate diff'ing in the repo.

## Installation

First make sure puppeteer is installed:

`npm install --save puppeteer`

Generate a diff by running the following within the project folder:

`node sf-docs-fetch.js`

## Roadmap

- Display diffs visually outside of the repo.
- Automate the fetch request (ie. weekly)
- Include other components besides LWCs.