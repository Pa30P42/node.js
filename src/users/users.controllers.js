const UserModel = require("../auth/user.model");
const AppError = require("../helpers/AppError");

exports.getCurrentUser = (req, res, next) => {
  try {
    res.status(200).json({
      status: "sucess",
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
        id: req.user._id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  await UserModel.findByIdAndDelete(id);

  return res.status(204).end();
};
