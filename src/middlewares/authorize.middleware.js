import AppError from "../errors/AppError.js";

export const authorize = (allowedRole) => (req, res, next) => {
  console.log("toto", req.user);
  if (!(allowedRole === req.user.role)) {
    return next(new AppError("Action non autorisée", 403));
  }
  next();
};
