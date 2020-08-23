const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.post('/api/thoughts', (req, res) => {
  res.send(
    `I received your POST request. You sent me ${req.body.thought}`
  );

});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(___dirname, 'client/build')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`listening to port ${port}`));