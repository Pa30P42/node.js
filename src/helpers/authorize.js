const jwt = require("jsonwebtoken");
const UserModel = require("../auth/user.model");
const AppError = require("./AppError");

exports.authorize = async (req, res, next) => {
  //   try {
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UserModel.findById(payload.id);

  if (!user) {
    return next(new AppError("token is not valid", 401));
  }

  req.user = user;

  next();
  //   } catch (error) {
  //     next(new AppError("token is not valid", 401));
  //   }
};
