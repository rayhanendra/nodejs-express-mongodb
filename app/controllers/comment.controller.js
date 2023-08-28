const db = require('../models');
const Comment = db.comments;
const Tutorial = db.tutorials;

// Create and Save a new Comment
exports.create = async (req, res) => {
  console.log('req.body: ' + req.body);

  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const tutorialId = req.params.id;
  const comment = req.body;

  return Comment.create(comment).then((docComment) => {
    console.log('\n>> Created Comment:\n', docComment);

    return Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          comments: docComment._id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    ).then((docTutorial) => {
      console.log('\n>> Updated Tutorial:\n', docTutorial);
      return docTutorial;
    });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Not found Comment with id ' + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving Comment with id=' + id });
    });
};
