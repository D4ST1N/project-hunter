const fs = require('fs');

module.exports = function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }

    filenames.forEach((filename) => {
      fs.readFile(`${dirname}/${filename}`, 'utf-8', (err, content) => {
        if (err) {
          onError(err);
          return;
        }

        onFileContent(filename, content);
      });
    });
  });
};