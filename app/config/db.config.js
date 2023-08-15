require('dotenv').config();

const uri = process.env.DATABASE_URL;

module.exports = {
  url: uri,
};
