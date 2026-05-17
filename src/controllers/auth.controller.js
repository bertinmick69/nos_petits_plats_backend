import * as AuthService from "../services/auth.service.js";

export const login = async (req, res, next) => {
  const token = await AuthService.loginUsers(req.body);
  return res.json({ token });
};

export const register = async (req, res, next) => {
  const userId = await AuthService.registerUser(req.body);
  return res.status(201).json({ userId });
};  

// export const createAdmin = async (req, res, next) => {
//   const userId = await AuthService.createAdmin(req.body);
//   return res.status(201).json({ userId });
// }; 
