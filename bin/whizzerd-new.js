#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

const copyFile = require('../lib/copy-file');
const addRoute = require('../lib/add-route');
const addLessImport = require('../lib/add-less-import');
const { replaceHtml, addIndexLink } = require('../lib/replace-html');

const args = require('commander').parse(process.argv).args;

const componentName = args[0];
const sourceHtml = path.join(__dirname + '../../lib/templates/component.html');
const targetHtml = path.join(__dirname + '../../components/' + componentName + '/' + componentName + '.html');
const targetLess = path.join(path.dirname(targetHtml) + '/' + componentName + '.less');

if (!componentName || fs.existsSync(targetHtml)) {
  console.error('component name is missing or already exists');
  process.exit(1);
}

whizzerNew(componentName);

function whizzerNew(componentName) {
  createFiles().then(res => {
    console.log(`created ${componentName}`)
    
    replaceHtml(targetHtml, componentName);
    addRoute(componentName);
    addLessImport(componentName);
  })
}

async function createFiles() {
  return copyFile(sourceHtml, targetHtml).then(res => {
    let lessContent = `.${componentName} {}`

    fs.writeFile(targetLess, lessContent, (err) => {
      if (err) throw err;
    })
  })
}