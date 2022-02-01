const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is working!') });
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.post('/profile/:id', profile.handleProfileUpdate(db));
app.put('/image', image.handleImage(db));
app.post('/imageUrl', image.handleApiCall());

app.listen(process.env.PORT || 3000, () => console.log(`App is running on port ${process.env.PORT || 3000}!`));