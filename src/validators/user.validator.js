import { body, param } from "express-validator";

export const validateUpdateUser = [
    body("nom")
        .optional()
        .isLength({ max: 40 })
        .trim()
        .notEmpty()
        .withMessage("Le nom ne peut pas être vide"),
        
    body("email")
        .optional()
        .isLength({ max: 150 })
        .trim()
        .isEmail()
        .withMessage("Format d'email invalide"),
        
    body("adresse")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("L'adresse est trop longue"),
        
    body("telephone")
        .optional()
        .trim()
        .isLength({ max: 10, min: 10 })
        .isMobilePhone()
        .withMessage("Format de téléphone invalide"),
];

export const validateUserId = [
    param("id")
        .isInt()
        .withMessage("L'identifiant doit être un nombre entier"),
];
