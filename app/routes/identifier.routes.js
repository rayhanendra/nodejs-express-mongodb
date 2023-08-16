module.exports = (app) => {
  const identifiers = require('../controllers/identifier.controller.js');

  var router = require('express').Router();

  // Retrieve all Identifiers
  router.get('/', identifiers.findAll);

  app.use('/api/identifiers', router);
};
