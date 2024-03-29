const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const isProduction = process.env.NODE_ENV === 'development';

const originLadybug = {origin: isProduction ? 'https://www.eileenladybugli.com/' : '*'};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(cors(originLadybug));

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
  pool.query('SELECT id, title, content, author FROM grievestories ORDER BY id desc;', [], (err, pool_res) => {
    if (err) {
      res.status(300).send(`Something went wrong with your database request`);
    } else {
      // res.append('Access-Control-Allow-Origin','*')
      // res.append('Access-Control-Allow-Methods','GET, POST')
      // res.append('Access-Control-Allow-Headers', 'Content-Type');
      res.status(200).json(pool_res.rows);
    }
  })
});

app.post('/api/grieveyard', (req, res) => {
  const { title, content, author } = req.body;
  if (title) {
    pool.query('INSERT INTO grievestories (title, content, author) VALUES ($1, $2, $3);', [title, content, author], (error, results) => {
      if (error) {
        throw error
      } else {
        // res.append('Access-Control-Allow-Origin','*')
        // res.append('Access-Control-Allow-Methods','GET, POST')
        // res.append('Access-Control-Allow-Headers', 'Content-Type');
        res.status(201).send(`Grievestory added`);
      }
    })
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`listening to port ${port}`));