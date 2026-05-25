import { body, param } from "express-validator";

export const validateCreatePlat = [
    body("id_categorie")
        .optional({ nullable: true })
        .isInt({ gt: 0 })
        .withMessage("L'ID de la catégorie doit être un entier positif"),
    body("nom_plat")
        .trim()
        .notEmpty()
        .withMessage("Le nom du plat est obligatoire"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("La description du plat est obligatoire"),
    body("prix")
        .notEmpty()
        .withMessage("Le prix du plat est obligatoire")
        .isFloat({ gt: 0 })
        .withMessage("Le prix doit être un nombre positif"),
    body("image_url")
        .optional({ nullable: true })
        .isURL()
        .withMessage("L'URL de l'image n'est pas valide"),
    body("temps_preparation_minutes")
        .optional({ nullable: true })
        .isInt({ gt: 0 })
        .withMessage("Le temps de préparation doit être un entier positif"),
    body("disponible")
        .optional()
        .isBoolean()
        .withMessage("La disponibilité doit être un booléen"),
];

export const validatePlatId = [
    param("id")
        .isInt({ gt: 0 })
        .withMessage("L'ID du plat doit être un entier positif"),
];

export const validateUpdatePlat = [
    body("id_categorie")
        .optional({ nullable: true })
        .isInt({ gt: 0 })
        .withMessage("L'ID de la catégorie doit être un entier positif"),
    body("nom_plat")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Le nom du plat ne peut pas être vide"),
    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La description du plat ne peut pas être vide"),
    body("prix")
        .optional()
        .notEmpty()
        .withMessage("Le prix du plat ne peut pas être vide")
        .isFloat({ gt: 0 })
        .withMessage("Le prix doit être un nombre positif"),
    body("image_url")
        .optional({ nullable: true })
        .isURL()
        .withMessage("L'URL de l'image n'est pas valide"),
    body("temps_preparation_minutes")
        .optional({ nullable: true })
        .isInt({ gt: 0 })
        .withMessage("Le temps de préparation doit être un entier positif"),
    body("disponible")
        .optional()
        .isBoolean()
        .withMessage("La disponibilité doit être un booléen"),
];
