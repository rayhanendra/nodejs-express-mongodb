const db = require('../models');
const Image = db.images;
const Tutorial = db.tutorials;

// Create and Save a new Image
exports.create = (tutorialId, image) => {
  console.log('tutorialId: ' + tutorialId);
  console.log('image: ' + image);
  return Image.create(image).then((docImage) => {
    console.log('\n>> Created Image:\n', docImage);
    return Tutorial.findByIdAndUpdate(
      tutorialId,
      {
        $push: {
          images: {
            _id: docImage._id,
            url: docImage.url,
            caption: docImage.caption,
          },
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
