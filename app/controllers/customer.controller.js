const db = require('../models');
const Customer = db.customers;
const {
  create: createIdentifier,
} = require('../controllers/identifier.controller.js');

// Create and Save a new Customer
exports.create = async (req, res) => {
  const { name, age, gender } = req.body;

  // Validate request
  if (!name) {
    return res.status(400).send({ message: 'Name can not be empty!' });
  }

  if (!age) {
    return res.status(400).send({ message: 'Age can not be empty!' });
  }

  if (!gender) {
    return res.status(400).send({ message: 'Gender can not be empty!' });
  }

  // Save Customer in the database
  try {
    const customer = await Customer.create({
      name,
      age,
      gender,
    });

    console.log('Created Customer: ' + customer);

    const identifier = await createIdentifier(
      customer._id.toString().substring(0, 10).toUpperCase(),
      customer
    );

    console.log('Created Identifier: ' + identifier);

    return res.send({
      customer,
      message: 'Customer was created successfully!',
    });
  } catch (error) {
    console.log('Error creating Customer: ' + error);
    return res.status(500).send({
      message: error.message || 'Some error occurred while creating Customer.',
    });
  }
};

//   Customer.create({
//     name: req.body.name,
//     age: req.body.age,
//     gender: req.body.gender,
//   })
//     .then((customer) => {
//       console.log('Created Customer: ' + customer);

//       return createIdentifier(
//         customer._id.toString().substring(0, 10).toUpperCase(),
//         customer
//       );
//     })
//     .then((identifier) => {
//       console.log('Created Identifier: ' + identifier);
//     })
//     .catch((err) => {
//       console.log('Error creating Customer: ' + err);
//     });
