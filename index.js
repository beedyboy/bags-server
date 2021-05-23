const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
// public folder
app.use(express.static('./uploads'))
app.use(router)


app.listen(8080, () => console.log('server listening on port 8080'));