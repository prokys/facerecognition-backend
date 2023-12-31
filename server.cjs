const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register.cjs");
const signin = require("./controllers/signin.cjs");
const profile = require("./controllers/profile.cjs");
const image = require("./controllers/image.cjs");

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DB_URL,
      ssl: {rejectUnauthorized: false},
      host : process.env.DB_HOST,
      port : 5432,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB,
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send("server is running");})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
console.log("app is running on port: "+process.env.PORT);
})