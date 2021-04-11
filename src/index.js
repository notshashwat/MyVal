const path = require('path');
const express = require("express");
require('dotenv').config();
const fetch = require('node-fetch');
const app = express();
const staticPath = path.join(__dirname,'../Public/');
app.use(express.static(staticPath));
const api_key_stock = process.env.API_KEY;
const api_key_jewel = process.env.API_KEY_JEWEL;
const api_key_firebase = process.env.API_KEY_FIREBASE;

app.listen(8225, () =>{
console.log('hello');
} );

