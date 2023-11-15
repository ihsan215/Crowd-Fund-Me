const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectId: {
    type: Number,
    required: true,
  },
  mainPageImg: {
    type: String,
    required: false,
  },
  categoria: {
    type: String,
    required: false,
  },
  projectMaterial: {
    type: String,
    required: false,
  },
  projectSummary: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Project", projectSchema);
