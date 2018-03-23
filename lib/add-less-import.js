var fs = require('fs')
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function addLessImport(componentName) {
  const lessFile = path.join(__dirname + '../../components/common/main.less');
  // let fileContents = await readFile(lessFile, 'utf-8');

  const comment = '//Add new imports here - do not remove this line//'
  // const regex = new RegExp(comment, 'i');
  const newRoute = `
@import "../${componentName}/${componentName}.less";`

  fs.appendFile(lessFile, newRoute, function (err) {
    if (err) throw err;
  });
  
  // fileContents = fileContents.replace(regex, newRoute)
  
  // fs.writeFile(lessFile, fileContents, (err) => {
  //   if (err) throw err;

  //   fs.appendFile(lessFile, comment, function (err) {
  //     if (err) throw err;
  //   });
  // })
}


module.exports = addLessImport