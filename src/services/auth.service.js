import * as UserModel from "../models/user.model.js";
import AppError  from "../errors/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUsers = async ({email, mot_de_passe}) => {
    const user = await UserModel.findByEmail(email);
    if (!user) {
        throw new AppError("Email ou mot de passe incorrect Utilisateur non trouvé", 404);
    }
    const isValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isValid) {
        throw new AppError("Email ou Mot de passe incorrect", 401);
    }
    const token = jwt.sign({ id: user.id_users, email: user.email,
      role: user.role, }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;   
    
}
export const registerUser = async ({email, mot_de_passe, nom, adresse, telephone}) => {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
        throw new AppError("Email déjà utilisé", 400);
    }
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const userId = await UserModel.create({
        email, 
        mot_de_passe: hashedPassword, 
        nom, 
        adresse, 
        telephone
    });
    return userId;
}   

