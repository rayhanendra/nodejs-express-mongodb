module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      path: String,
      url: String,
      caption: String,
    },
    {
      timestamps: true,
    }
  );

  const Image = mongoose.model('Image', schema);

  return Image;
};
