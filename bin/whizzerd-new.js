#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

const copyFile = require('../lib/copy-file');
const replaceHtml = require('../lib/replace-html');
const addRoute = require('../lib/add-route');

const args = require('commander').parse(process.argv).args;

//TODO: need to snake case this or something?
const componentName = args[0];
const sourceHtml = path.join(__dirname + '../../lib/templates/component.html');
const targetHtml = path.join(__dirname + '../../components/' + componentName + '/' + componentName + '.html');
const targetLess = path.join(path.dirname(targetHtml) + '/' + componentName + '.less');

if (!componentName) {
  console.error('component name required');
  process.exit(1);
}

if (fs.existsSync(targetHtml)) {
  console.error('component already exists');
  process.exit(1);
}

whizzerNew(componentName);

function whizzerNew(componentName) {
  createFiles().then(res => {
    console.log(`created ${componentName}`)
    
    replaceHtml(targetHtml, componentName);
    addRoute(componentName);
  })

  //swap out component names in various places
  // // html spots
  // // add to routes
  // // add import to main.less
  // // 
}

async function createFiles() {
  return copyFile(sourceHtml, targetHtml).then(res => {
    let lessContent = `.${componentName} {}`

    fs.writeFile(targetLess, lessContent, (err) => {
      if (err) throw err;
    })
  })
}

// async function replaceUrlsAndUpload(file, allFiles) {
//   let fileContents = await readFile(file, 'utf-8');

//   allFiles.forEach(assetFile => {
//     if (file !== assetFile) {
//       const fileName = path.basename(assetFile);
//       const regex = new RegExp(`("|')[^"]*${fileName}("|')`, 'g');

//       fileContents = fileContents.replace(
//         regex,
//         generateCustomPageUrl(path.basename(assetFile))
//       );
//     }
//   });

//   return uploadToQuickbase(file, fileContents);
// }