import * as userService from "../services/user.service.js";
import AppError from "../errors/AppError.js";



export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return res.json(users);
    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}