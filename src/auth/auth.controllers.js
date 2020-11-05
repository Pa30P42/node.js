const bcrypt = require("bcrypt");
const UserModel = require("../auth/user.model");
const AppError = require("../helpers/AppError");
const jwt = require("jsonwebtoken");
const { generateAvatar } = require("../helpers/avatarCreator");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

exports.createNewUser = async (req, res, next) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const existUser = await UserModel.findOne({ email });

  if (existUser) {
    return next(new AppError("User with such email is exist", 409));
  }

  const avatarName = await generateAvatar();
  const avatarPath = `http://localhost:${process.env.PORT}/images/${avatarName}`;
  const verificationToken = uuidv4();
  console.log("verificationToken", verificationToken);

  const newUser = await UserModel.create({
    email,
    password: passwordHash,
    avatarURL: avatarPath,
    verificationToken,
  });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER,
    subject: "HM email Node.js",
    text: "Verification test",
    html: `<p>For verify your account, please follow this <a href='http://localhost:3000/api/auth/verify/${verificationToken}'>link</a></p> `,
  };
  console.log(msg);

  // sgMail.send(msg);
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(201).json({
    status: "sucess",
    createdUser: {
      email: newUser.email,
      id: newUser._id,
    },
  });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await UserModel.findOne({ email });

  if (!existUser) {
    return next(new AppError("Email or password is wrong", 401));
  }
  const validPassword = await bcrypt.compare(password, existUser.password);
  if (!validPassword) {
    return next(new AppError("Email or password is wrong", 401));
  }

  const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 24 * 60 * 60,
  });

  res.status(200).json({
    status: "sucess",
    loginUser: {
      token: token,
      email: existUser.email,
      id: existUser._id,
      subscription: existUser.subscription,
    },
  });
};

exports.logout = async (req, res, next) => {
  const loggedUser = req.user;

  await UserModel.findByIdAndUpdate(loggedUser._id, { token: "" });
  req.user = null;
  res.status(204).end();
};

exports.checkVerification = async (req, res, next) => {
  const { verificationToken } = req.params;

  const verifiedUser = await UserModel.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
    }
  );
  if (!verifiedUser) {
    return next(new AppError("User not found", 404));
  }
  return res.status(200).send();
};
