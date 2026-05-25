import * as usermodel from "../models/user.model.js";
import AppError from "../errors/AppError.js";




export const getAllUsers = async () => {
    const users = await usermodel.findAll();
    if (!users) {
        throw new AppError("Aucun utilisateur trouvé", 404);
    }
    return users;
}

export const deleteUser = async (userId) => {
    const user = await usermodel.findById(userId);
    if (!user) {
        throw new AppError("Utilisateur non trouvé", 404);
    }
    await usermodel.deleteById(userId);
}