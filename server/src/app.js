const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const readFilesSync = require('./utils/readFilesSync');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
});
app.get('/maps/', (req, res) => {
  readFilesSync(
    './resources/maps',
    (files) => {
      res.send(files);
    },
    console.error
  );

});
app.post('/saveMap', (req, res) => {
  console.log(req.body);

  fs.writeFile(`./resources/maps/${req.body.name}.json`, JSON.stringify(req.body.content), 'utf8', (err) => {
    if (err) {
      console.error(err);
    }

    res.send('The file has been saved!');
  });
});

app.listen(process.env.PORT || 8081);