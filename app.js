const express = require('express');
const TokenBucket = require('./tokenBucket');

const tokenBucket = new TokenBucket(100, 10, 50);
function handleRequest(req, res, next) {
     const tokensNeeded = 1; 
    if (tokenBucket.refillBucket(tokensNeeded)) {
      console.log("token bucket is not full");
      next();
    } else {
      const waitTimeInSeconds =
        (tokensNeeded - tokenBucket.tokens) / tokenBucket.tokensPerSecond;
      const waitTimeMilliseconds = waitTimeInSeconds * 1000;
      res.status(429).send("Too Many Requests wait till:"+waitTimeMilliseconds+"ms");
    }
}
const app = express();

app.get('/unlimited',handleRequest, (req, res) => {
  res.send('Hello World Unlimited!');
});

app.get("/limited", handleRequest, (req, res) => {
 
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
}); 