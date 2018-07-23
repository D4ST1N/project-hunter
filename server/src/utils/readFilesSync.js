const fs = require('fs');

module.exports = function readFilesSync(dirName, onSuccess) {
  const files = [];
  const filesList = fs.readdirSync(dirName);

  filesList.forEach((fileName) => {
    if (fileName.indexOf('.json') === fileName.length - 5) {
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