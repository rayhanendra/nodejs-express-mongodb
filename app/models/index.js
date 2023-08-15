const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require('./tutorial.model.js')(mongoose);
db.customers = require('./customer.model.js')(mongoose);
db.identifiers = require('./identifier.model.js')(mongoose);

module.exports = db;
