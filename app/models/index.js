const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require('./tutorial.model.js')(mongoose);
db.customers = require('./customer.model.js')(mongoose);
db.identifiers = require('./identifier.model.js')(mongoose);
// Tutorial-Images: One-to-Few
db.images = require('./image.model.js')(mongoose);
// Tutorial-Comments: One-to-Many
db.comments = require('./comment.model.js')(mongoose);
// Category-Tutorials: One-to-aLot

module.exports = db;
