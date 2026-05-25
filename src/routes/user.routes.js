import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import * as UserValidator from "../validators/user.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();


router.get("/", authorize('admin'), UserController.getAllUsers);

router.delete("/:id", authorize('admin'), UserValidator.validateUserId, validate, UserController.deleteUser);

export default router;
