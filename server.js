const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.post('/api/thoughts', (req, res) => {
  const { thought } = req.body;
  pool.query('INSERT INTO thoughts (thought) VALUES ($1);', [thought], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Thought added`);
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(___dirname, 'client/build')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`listening to port ${port}`));