var fs = require('fs')
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function addLessImport(componentName) {
  const lessFile = path.join(__dirname + '../../components/assets/main.less');
  const comment = '//Add new imports here - do not remove this line//'
  const newRoute = `
@import "../${componentName}/${componentName}.less";`

  fs.appendFile(lessFile, newRoute, function (err) {
    if (err) throw err;
  });
}


module.exports = addLessImport
