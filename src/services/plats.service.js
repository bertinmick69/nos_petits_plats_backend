import * as platsmodel from "../models/plats.model.js";
import AppError from "../errors/AppError.js";

export const getAllPlats = async () => {
  const plats = await platsmodel.findAll();
  if (!plats || plats.length === 0) {
    throw new AppError("Aucun plat trouvé", 404);
  }
  return plats;
};

export const getPlatById = async (platId) => {
  const plat = await platsmodel.findById(platId);
  if (!plat) {
    throw new AppError("Plat non trouvé", 404);
  }
  return plat;
};

export const createPlat = async (platData) => {
  const platId = await platsmodel.create(platData);
  return platId;
};

export const updatePlat = async (id, platData) => {
  const success = await platsmodel.update(id, platData);
  if (!success) {
    throw new AppError("Plat non trouvé ou aucune modification apportée", 404);
  }
  return success;
};

export const deletePlat = async (id) => {
  const success = await platsmodel.remove(id);
  if (!success) {
    throw new AppError("Plat non trouvé", 404);
  }
  return success;
};