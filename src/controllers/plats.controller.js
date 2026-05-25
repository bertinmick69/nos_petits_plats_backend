import * as platsService from "../services/plats.service.js";

export const getAllPlats = async (req, res, next) => {
  try {
    const plats = await platsService.getAllPlats();
    return res.json(plats);
  } catch (error) {
    next(error);
  }
};

export const getPlatById = async (req, res, next) => {
  try {
    const platId = req.params.id;
    const plat = await platsService.getPlatById(platId);
    res.json(plat);
  } catch (error) {
    next(error);
  }
};

export const createPlat = async (req, res, next) => {
  try {
    const platData = req.body;
    const platId = await platsService.createPlat(platData);
    res.status(201).json({ id: platId });
  } catch (error) {
    next(error);
  }
};

export const updatePlat = async (req, res, next) => {
  try {
    const platId = req.params.id;
    const platData = req.body;
    await platsService.updatePlat(platId, platData);
    res.json({ message: "Plat mis à jour avec succès" });
  } catch (error) {
    next(error);
  }
};

export const deletePlat = async (req, res, next) => {
  try {
    const platId = req.params.id;
    await platsService.deletePlat(platId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
