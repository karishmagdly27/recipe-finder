const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const userRouter = require("./routes/userRoutes");
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(userRouter);
require("./db");


app.listen(port, () => {
    console.log("Listening on port ", port)
});
