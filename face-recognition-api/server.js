import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleApiCall, handleImage } from './controllers/image.js';

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "LaoLuanDeYiPi",
    password: "Yuan$990611",
    database: "smart-brain",
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})