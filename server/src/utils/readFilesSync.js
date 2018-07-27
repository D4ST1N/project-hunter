const fs = require('fs');

module.exports = function readFilesSync(dirName, onSuccess, format = 'json') {
  const files = [];
  const filesList = fs.readdirSync(dirName);

  filesList.forEach((fileName) => {
    if (fileName.indexOf(`.${format}`) > -1) {
      const fileContent = fs.readFileSync(`${dirName}/${fileName}`, {
        encoding: 'utf-8'
      });
      files.push({
        name: fileName,
        content: fileContent
      });
    }
  });

  onSuccess(files);
};