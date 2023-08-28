const db = require('../models');
const Tutorial = db.tutorials;
const { create: createImage } = require('../controllers/image.controller.js');

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  const { title, description, published, images } = req.body;
  console.log('req.body: ' + req.body.images);
  // Validate request
  if (!title) {
    res.status(400).send({ message: 'Title can not be empty!' });
    return;
  }

  if (!description) {
    res.status(400).send({ message: 'Description can not be empty!' });
    return;
  }

  try {
    const tutorial = await Tutorial.create({
      title,
      description,
      published: published ? published : false,
    });

    console.log('Created Tutorial: ' + tutorial);

    let updatedTutorial = tutorial;
    if (images && images.length > 0) {
      updatedTutorial = await images.map((image) => {
        return createImage(tutorial._id, image);
      });
      console.log('Created Images');
    }

    return res.send({
      tutorial: updatedTutorial,
      message: 'Tutorial was created successfully!',
    });
  } catch (error) {
    console.log('Error creating Tutorial: ' + error);
    return res.status(500).send({
      message: error.message || 'Some error occurred while creating Tutorial.',
    });
  }
};
// // Create a Tutorial
// const tutorial = new Tutorial({
//   title: req.body.title,
//   description: req.body.description,
//   published: req.body.published ? req.body.published : false,
// });

// // Save Tutorial in the database
// tutorial
//   .save(tutorial)
//   .then((data) => {
//     res.send(data);
//   })
//   .catch((err) => {
//     res.status(500).send({
//       message:
//         err.message || 'Some error occurred while creating the Tutorial.',
//     });
//   });

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Tutorial with id ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving Tutorial with id=' + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: 'Tutorial was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Tutorial with id=' + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: 'Tutorial was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Tutorial with id=' + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all tutorials.',
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};
