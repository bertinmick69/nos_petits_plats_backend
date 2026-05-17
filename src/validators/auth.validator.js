import { body } from "express-validator";

export const validateRegister = [
    body("nom")
        .trim()
        .notEmpty()
        .withMessage("Le nom est obligatoire"),
        
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email absent")
        .isEmail()
        .withMessage("Email invalide"),
        
    body("mot_de_passe")
        .notEmpty()
        .withMessage("Mot de passe requis")
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

export const validateAuth = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email absent")
        .isEmail()
        .withMessage("Email invalide"),
        
    body("mot_de_passe")
        .notEmpty()
        .withMessage("Mot de passe requis"),
];   