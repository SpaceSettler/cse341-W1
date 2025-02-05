const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerDocument = require('./swagger-output.json');
const swaggerUi = require('swagger-ui-express');
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
        req.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Connected to DB and listening on ${port}`);
    }
  });