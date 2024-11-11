require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
require("./database/connection");
const registerrouteruse =require("./routers/registerRouter");
app.use(express.json());
app.use(registerrouteruse);

app.get('/', (req, res) => {
    res.send('home');
})

app.listen(PORT, () => {
   console.log( `back end server is connect ${PORT}`)
});