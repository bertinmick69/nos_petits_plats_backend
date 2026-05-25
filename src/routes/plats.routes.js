import { Router } from "express";
import * as platsValidator from "../validators/plats.validator.js";
import * as platsController from "../controllers/plats.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";


const router = Router();
router.get("/", platsController.getAllPlats);
router.post("/", authenticate, authorize('admin'), platsValidator.validateCreatePlat, validate, platsController.createPlat);
router.get("/:id", platsValidator.validatePlatId, validate, platsController.getPlatById);
router.put("/:id", authenticate, authorize('admin'), platsValidator.validatePlatId, platsValidator.validateUpdatePlat, validate, platsController.updatePlat);
router.delete("/:id", authenticate, authorize('admin'), platsValidator.validatePlatId, validate, platsController.deletePlat);

export default router;