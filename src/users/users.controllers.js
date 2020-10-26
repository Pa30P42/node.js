exports.getCurrentUser = (req, res, next) => {
  res.status(200).json({
    status: "sucess",
    user: {
      email: req.user.email,
      subscription: req.user.subscription,
      id: req.user._id,
    },
  });
};

// const getCurrentUserController = catchAsync(async (req, res, next) => {
//   const { id: userId } = req.userInfo;
//   const currentUser = await UserDB.findUserById(userId);
//   if (currentUser) {
//     return res.json({
//       email: currentUser.email,
//       subscription: currentUser.subscription,
//     });
//   }
//   res.status(401).send({ message: "Not authorized" });
// });
