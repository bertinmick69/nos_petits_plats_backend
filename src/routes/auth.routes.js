import { Router } from "express";
import * as validateAuth from "../validators/auth.validator.js";
import * as AuthController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validateAuth.validateRegister, validate, AuthController.register);
router.post("/login", validateAuth.validateAuth, validate, AuthController.login);


export default router;