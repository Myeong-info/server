const express = require('express');
const router = require('./routes');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, () => {
    console.log(`http://localhost:${port} waiting`);
});
