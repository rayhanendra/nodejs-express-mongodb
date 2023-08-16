const db = require('../models');
const Identifier = db.identifiers;

exports.create = (cardCode, customer) => {
  const identifier = new Identifier({
    cardCode,
    customer,
  });

  return identifier.save();
};

exports.findAll = (req, res) => {
  Identifier.find()
    .populate('customer', {
      _id: 0,
      name: 1,
      age: 1,
      gender: 1,
    })
    .select('-__v -customer.__v  -customer._id -updatedAt')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving identifiers.',
      });
    });
};
