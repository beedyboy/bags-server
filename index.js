const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();

global.__basedir = __dirname + "/..";
// app.use(cors())

const origin = '*';
// const origin = "https://bags-admin.herokuapp.com";
app.use(
  cors({
    allowedHeaders: [
      "Origin",
      " X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Access-Token",
    ],
    exposedHeaders: ["sessionId"],
    origin: origin,
    methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
// public folder
app.use(express.static('./uploads'))
app.use(router)


app.listen(8080, () => console.log('server listening on port 8080'));