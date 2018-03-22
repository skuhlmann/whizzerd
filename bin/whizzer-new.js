#!/usr/bin/env node

let args = require('commander').parse(process.argv).args;

let componentName = args[0];

if (!componentName) {
  console.error('component name required');
  process.exit(1);
}


whizzerNew(componentName);

function whizzerNew(componentName) {
  console.log("Whizzing " + componentName)

  //need to get the templates
  //copy them with component file
  //swap out component names in various places


  // gitClone(template, projectName)
  //   .then(res => {
  //     console.log(`New project created.`);
  //   })
  //   .catch(err => console.error(err));
}