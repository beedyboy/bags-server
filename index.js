const express = require('express');
const router = require('./routes');

const app = express();
app.use(express.json());
// public folder
app.use(express.static('./uploads'))
app.use(router)


app.listen(8080, () => console.log('server listening on port 8080'));