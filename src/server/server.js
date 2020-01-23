const express = require('express');
const Cache = require('node-cache');
const cors = require('cors');

const keybaseClient = require('./keybase-client');

const app = express();
const cache = new Cache();

app.set('json spaces', 2);

const CHANNEL = 'grincoin#general';

function midCache(key, duration) {
  return (req, res, next) => {
    const value = cache.get(key);

    if (value) {
      res.json(value);
    } else {
      res.__json = res.json;
      res.json = (body) => {
        cache.set(key, body, duration);
        res.__json(body);
      };

      next();
    }
  };
}

app.get('/messages', cors(), midCache(CHANNEL, 3), (req, res) => {
  keybaseClient.readMessages().then(messages => {
    res.json(messages);
  });
});

app.get('/team', cors(), midCache('grincoin.public', 86400), (req, res) => {
  keybaseClient.getTeam().then(messages => {
    res.json(messages);
  });
});

app.listen(8080, () => {
  console.log('Listening on port: 8080');
});
