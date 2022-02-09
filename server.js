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
const auth = require('./controllers/authorization');

const db = knex({
  client: 'pg',
  connection: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
});

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is working!') });
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', auth.requireAuth, profile.handleProfileGet(db));
app.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate(db));
app.put('/image', auth.requireAuth, image.handleImage(db));
app.post('/imageUrl', auth.requireAuth, image.handleApiCall());

app.listen(process.env.PORT || 3000, () => console.log(`App is running on port ${process.env.PORT || 3000}!`));