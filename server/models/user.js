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
  projectsCart: {
    projects: [
      {
        projectId: {
          type: Number,
          ref: "Project",
          required: false,
        },
      },
    ],
  },
});

userSchema.methods.addProject = function (projectId) {
  const updatedprojects = [...this.projectsCart.projects];
  updatedprojects.push({
    projectId: projectId,
  });
  this.projectsCart.projects = updatedprojects;

  return this.save();
};

module.exports = mongoose.model("User", userSchema);
