const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f66a5232e20740b2b15f43b94af615c3'
});

const handleApiCall = () => (req, res) => {
  const { input } = req.body;
  app.models
    .predict('f76196b43bbd45c99b4f3cd8e8b40a8a', input)
    .then(data => {
      res.json(data);
    })
    .catch(() => res.status(400).json('Unable to work with API'));
}

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(() => res.status(400).json('Unable to get entries'));
}

module.exports = {
  handleImage,
  handleApiCall
}