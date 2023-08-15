module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      name: String,
      age: Number,
      gender: String,
    },
    { timestamps: true }
  );

  const Customer = mongoose.model('Customer', schema);

  return Customer;
};
