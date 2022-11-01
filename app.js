
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

require('./src/routes/books.routes')(app);

app.listen(port, () => {
    console.log('listening on 3000')
});

module.exports.handler = serverless(app);
