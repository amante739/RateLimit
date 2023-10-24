const express = require('express');
const TokenBucket = require('./tokenBucket');

const tokenBucket = new TokenBucket(100, 10, 50);
function handleRequest(req, res, next) {
     
    if (tokenBucket.refillBucket(1)) {
      console.log("token bucket is not full");
    next();
  } else {
    res.status(429).send('Too Many Requests');
  }
}
const app = express();

app.get('/unlimited',handleRequest, (req, res) => {
  res.send('Hello World Unlimited!');
});

app.get("/limited", handleRequest, (req, res) => {
     if (tokenBucket.consumeTokens(1)) {
    next();
  } else {
    res.status(429).send('Too Many Requests');
  }
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
}); 