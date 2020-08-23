const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.post('/api/thoughts', (req, res) => {
  res.send(
    `I received your POST request. You sent me ${req.body.thought}`
  );
  
});

app.listen(port, () => console.log(`listening to port ${port}`));