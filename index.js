#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');
const { program } = require('commander');

program
  .version('1.0.0')
  .description('A CLI tool to scrape and print the text content of a web page element by CSS selector')
  .requiredOption('-u, --url <url>', 'URL of the web page to scrape')
  .requiredOption('-s, --selector <selector>', 'CSS selector of the element to scrape');

program.parse(process.argv);

const { url, selector } = program.opts();

axios
  .get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const selectedElement = $(selector);

    if (selectedElement.length > 0) {
      console.log(selectedElement.text().trim());
    } else {
      console.error('No element found with the specified CSS selector.');
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
