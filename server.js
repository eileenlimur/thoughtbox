const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.post('/api/thoughts', (req, res) => {
  const { thought } = req.body;
  pool.query('INSERT INTO thoughts (thought) VALUES ($1);', [thought], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Thought added`);
  })
});

app.get('/api/grieveyard', (req, res) => {
  pool.query('SELECT title, content FROM grievestories ORDER BY id desc;', (pool_res) => {
    if (error) {
      res.status(300).send(`Something went wrong with your database request`);
    } else {
      res.append({
        'Access-Control-Allow-Origin': '*'
        // 'Access-Control-Allow-Origin': 'https://www.eileenladybugli.com/grieveyard'
      })
      res.status(200).json(pool_res);
    }
  })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`listening to port ${port}`));