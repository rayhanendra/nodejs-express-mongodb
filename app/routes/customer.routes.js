module.exports = (app) => {
  const customers = require('../controllers/customer.controller.js');

  var router = require('express').Router();

  // Create a new Customer
  router.post('/', customers.create);

  app.use('/api/customers', router);
};
