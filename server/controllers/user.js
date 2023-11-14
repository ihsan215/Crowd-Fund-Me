const User = require("../models/user");

exports.postUserInfo = async (req, res, next) => {
  const walletId = req.params.userId;

  const query = await User.findOne({ walletId: walletId });
  if (query) {
    query.name = req.body.name;
    query.email = req.body.email;
    query.country = req.body.country;
    query.city = req.body.city;
    if (req.files) {
      query.profileImg = req.files.profileImg;
    }

    query.save();
  } else {
    const user = new User({
      walletId: walletId,
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      profileImg: req.files?.profileImg,
    });
    user.save();
  }

  res.status(200).json({
    message: "ok",
  });
};

exports.postUserJobInfo = async (req, res, next) => {
  const walletId = req.params.userId;

  const query = await User.findOne({ walletId: walletId });
  console.log(req.body.jobTitle);
  console.log(req.body.coverLetter);
  if (query) {
    query.jobTitle = req.body.jobTitle;
    query.coverLetter = req.body.coverLetter;
    query.save();
  } else {
    const user = new User({
      walletId: walletId,
      jobTitle: req.body.jobTitle,
      coverLetter: req.body.coverLetter,
    });
    user.save();
  }

  res.status(200).json({
    message: "ok",
  });
};

exports.getUserInfo = async (req, res, next) => {
  const walletId = req.params.userId;
  const query = await User.findOne({ walletId: walletId });
  if (query) {
    res.status(200).json({
      message: "ok",
      name: query.name,
      email: query.email,
      country: query.country,
      city: query.city,
      profileImg: query.profileImg,
      jobTitle: query.jobTitle,
      coverLetter: query.coverLetter,
    });
  } else {
    res.status(200).json({
      message: "not found",
    });
  }
};
