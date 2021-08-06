const handleSignin = (db, bcrypt) => (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        db.select('*').from('users').where('email', req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(() => res.status(400).json('Unable to get user'));
      } else {
        res.status(400).json('Wrong credentials');
      }
    })
    .catch(() => res.status(400).json("Wrong credentials"));
}

module.exports = {
  handleSignin
}