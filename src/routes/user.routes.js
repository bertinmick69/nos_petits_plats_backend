import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import * as UserValidator from "../validators/user.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();


router.get("/", authorize('admin'), UserController.getAllUsers);

router.get("/:id", UserValidator.validateUserId, validate, UserController.getUserById);

router.post("/", authorize('admin'), UserValidator.validateUpdateUser, validate, UserController.createUser);

router.put("/:id", UserValidator.validateUserId, UserValidator.validateUpdateUser, validate, UserController.updateUser);

router.delete("/:id", authorize('admin'), UserValidator.validateUserId, validate, UserController.deleteUser);

export default router;
