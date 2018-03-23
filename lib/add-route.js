var fs = require('fs')
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function addRoute(componentName) {
  const routeFile = path.join(__dirname + '../../routes/routes.js');
  let fileContents = await readFile(routeFile, 'utf-8');
  
  const regex = new RegExp('//Add new routes here - do not remove this line//', 'i');
  const newRoute = `app.get('/${componentName}', (req, res) => {
    res.sendFile(path.join(__dirname + '../../components/${componentName}/${componentName}.html'))
  })

  //Add new routes here - do not remove this line//
  `

  fileContents = fileContents.replace(regex, newRoute)

  fs.writeFile(routeFile, fileContents, (err) => {
    if (err) throw err;
  })
}


module.exports = addRoute