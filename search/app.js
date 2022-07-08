require("dotenv").config()
const express = require('express')
const dbConnect = require ('./dbConnect')
const router = require('./routes/index')
const cors = require('cors')
const app = express()

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", router);

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...`));


/**
 * Возвращает дату в формате "dd/mm/yyyy"
 */

//d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()


