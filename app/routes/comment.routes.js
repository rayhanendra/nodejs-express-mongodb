module.exports = (app) => {
  const comments = require('../controllers/comment.controller.js');

  var router = require('express').Router();

  // Create a new Comment
  router.post('/:id', comments.create);

  app.use('/api/comments', router);
};
