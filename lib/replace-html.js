const cheerio = require('cheerio');
const fs = require('fs')
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function replaceHtml(file, componentName) {
  let fileContents = await readFile(file, 'utf-8');
  
  const regex = new RegExp('{{ component-name }}', 'g');
  const capName = componentName[0].toUpperCase() + componentName.substring(1);

  fileContents = fileContents.replace(regex, capName)

  fs.writeFile(file, fileContents, (err) => {
    if (err) throw err;

    addIndexLink(componentName);
  })
}

async function addIndexLink(componentName) {
  const indexFile = path.join(__dirname + '../../index.html');
  let fileContents = await readFile(indexFile, 'utf-8');

  const $ = cheerio.load(fileContents);
  let listItem = $('.linkTemplate').clone();
  
  listItem
    .removeAttr('class')
    .removeAttr('style')
    .find('a')
    .attr('href', `/${componentName}`)
    .text(componentName)
  
  // listItem.find('a')
  //   .attr('href', `/${componentName}`)
  //   .text(componentName)

  $('ul').append(listItem);
  fileContents = $.html();

  fs.writeFile(indexFile, fileContents, (err) => {
    if (err) throw err;
  })
}


module.exports = {
  replaceHtml,
  addIndexLink
}