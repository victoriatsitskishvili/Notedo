const router = require('express').Router();
const store = require('../db/store');

// to get notes from the database //
router.get('/notes', (req, res) => {
    store
      .getNotes()
      .then((notes) => {
        return res.json(notes);
      })
      .catch((err) => res.status(400).json(err));
  });
  
  router.post('/notes', (req, res) => {
    store
      .addNote(req.body)
      .then((note) => res.json(note))
      .catch((err) => res.status(400).json(err));
  });
  
  // To delete notes if equal to req.params.id //
  router.delete('/notes/:id', (req, res) => {
    store
      .removeNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(400).json(err));
  });
  
  module.exports = router;
  