module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      username: String,
      text: String,
    },
    {
      timestaps: true,
    }
  );

  const Comment = mongoose.model('Comment', schema);

  return Comment;
};
