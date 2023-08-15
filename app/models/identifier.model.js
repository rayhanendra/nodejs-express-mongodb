module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      cardCode: String,
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
      },
    },
    { timestamps: true }
  );

  const Identifier = mongoose.model('Identifier', schema);

  return Identifier;
};
