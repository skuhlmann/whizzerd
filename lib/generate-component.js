var fs = require('fs');
var path = require('path');

function copyFile(source, target) {
  checkDirectory(path.dirname(target));

  var read = fs.createReadStream(source);
  var write = fs.createWriteStream(target);

  return new Promise(function(resolve, reject) {
    read.on('error', reject);
    write.on('error', reject);
    write.on('finish', resolve);
    read.pipe(write);
  }).catch(function(error) {
    read.destroy();
    write.end();

    throw error;
  });
}

function checkDirectory(targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }
}



module.exports = copyFile;