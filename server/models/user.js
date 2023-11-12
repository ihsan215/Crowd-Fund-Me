const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  walletId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  profileImg: {
    data: Buffer,
    contentType: String,
  },

  jobTitle: {
    type: String,
    required: false,
  },

  coverLetter: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
