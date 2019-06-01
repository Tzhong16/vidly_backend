const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, name: 'action' },
  { id: 2, name: 'strategy' },
  { id: 3, name: 'motion' }
];

router.get('/', (req, res) => {
  // res.send('Hello World!!');
  res.render('index', { title: 'vidly_app', message: 'Hello World!' });
});

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre id might be wrong, please check...');

  res.send(genre);
});

router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre id might be wrong, please check...');

  const { error } = genreValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.send('The genre id might be wrong, please check...');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = genreValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);

  res.send(genre);
});

function genreValidation(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return (result = Joi.validate(genre, schema));
}

module.exports = router;
