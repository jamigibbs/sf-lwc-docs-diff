# sf-lwc-docs-diff

A small script that scrapes the Salesforce Lightning Web Component documentation and specs from the [Salesforce developer component reference](https://developer.salesforce.com/docs/component-library/overview/components) site so that we can diff previous versions of the components and therefore track updates that are not always publicing announced.

## Installation

First make sure puppeteer is installed:

`npm install --save puppeteer`

Generate a diff by running the following within the project folder:

`node sf-lwc-docs-fetch.js`

## Roadmap

- Automate the fetch request (ie. weekly).
- Send email when a change is logged.
- Display diffs visually outside of the repo.