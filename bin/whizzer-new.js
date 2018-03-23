#!/usr/bin/env node
var fs = require('fs')
var path = require('path');

const copyFile = require('../lib/generate-component');

const args = require('commander').parse(process.argv).args;
const componentName = args[0];

if (!componentName) {
  console.error('component name required');
  process.exit(1);
}

whizzerNew(componentName);

function whizzerNew(componentName) {
  console.log("Whizzing " + componentName)

  let source = path.join(__dirname + '../../lib/templates/component.html')
  let target = path.join(__dirname + '../../components/' + componentName + '/' + componentName + '.html')

  console.log(source)
  console.log(target)
  
  copyFile(source, target).then(res => {
    //now perform the transformations
    console.log(res)
  })

  //need to get the templates
  //copy them with component file
  // // create dir
  // // create html and less
  //swap out component names in various places
  // // html spots
  // // add to routes
  // // add import to main.less
  // // 


  // gitClone(template, projectName)
  //   .then(res => {
  //     console.log(`New project created.`);
  //   })
  //   .catch(err => console.error(err));
}