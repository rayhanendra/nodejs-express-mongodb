const db = require('../models');
const Identifier = db.identifiers;

exports.create = (cardCode, customer) => {
  const identifier = new Identifier({
    cardCode,
    customer,
  });

  return identifier.save();
};
