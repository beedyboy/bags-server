const express = require('express');
const router = require('./routes');
const logger = require('./logger');
const httpLogger = require('./httpLogger');
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
app.use(httpLogger);
app.use(express.json());
// public folder
app.use(express.static('./uploads'))
app.use("/uploads/products", express.static("uploads/products"));
app.use("/uploads/documents", express.static("uploads/documents"));
app.use(router)

app.get('/errorhandler', (req, res, next) => {
  try {
    throw new Error('Wowza!')
  } catch (error) {
    next(error)
  }
})

app.use(logErrors)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function errorHandler (err, req, res, next) {
  res.status(500).send('Error!')
}
app.listen(8080, () => logger.info('server listening on port 8080'));