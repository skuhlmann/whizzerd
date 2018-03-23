var fs = require('fs')
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
  })
}


module.exports = replaceHtml