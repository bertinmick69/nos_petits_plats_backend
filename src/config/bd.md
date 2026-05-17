```sql
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS nos_petits_plats;
USE nos_petits_plats;

-- 1. Table des Utilisateurs (Clients et Admins)
CREATE TABLE utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    adresse TEXT,
    telephone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'client', -- Peut être 'client' ou 'admin'
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table des Catégories (ex: Burgers, Pizzas, Desserts)
CREATE TABLE categories (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE
);

-- 3. Table des Plats (Nourriture)
CREATE TABLE plats (
    id_plat INT AUTO_INCREMENT PRIMARY KEY,
    id_categorie INT,
    nom_plat VARCHAR(150) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255), -- Chemin vers l'image
    temps_preparation_minutes INT,
    disponible BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categorie) REFERENCES categories(id_categoria) ON DELETE SET NULL
);

-- 4. Table des Ingrédients
CREATE TABLE ingredients (
    id_ingredient INT AUTO_INCREMENT PRIMARY KEY,
    nom_ingredient VARCHAR(100) NOT NULL,
    allergene BOOLEAN DEFAULT FALSE
);

-- 5. Table de liaison entre Plats et Ingrédients
CREATE TABLE plat_ingredients (
    id_plat INT,
    id_ingredient INT,
    PRIMARY KEY (id_plat, id_ingredient),
    FOREIGN KEY (id_plat) REFERENCES plats(id_plat) ON DELETE CASCADE,
    FOREIGN KEY (id_ingredient) REFERENCES ingredients(id_ingredient) ON DELETE CASCADE
);

-- 6. Table des Commentaires / Avis
CREATE TABLE commentaires (
    id_commentaire INT AUTO_INCREMENT PRIMARY KEY,
    id_plat INT,
    id_utilisateur INT,
    note INT CHECK (note BETWEEN 1 AND 5),
    texte_commentaire TEXT,
    date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_plat) REFERENCES plats(id_plat) ON DELETE CASCADE,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE
);

-- 7. Table des Likes / Favoris
CREATE TABLE likes (
    id_utilisateur INT,
    id_plat INT,
    PRIMARY KEY (id_utilisateur, id_plat),
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (id_plat) REFERENCES plats(id_plat) ON DELETE CASCADE
);

-- 8. Table des Commandes
CREATE TABLE commandes (
    id_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut_commande VARCHAR(50) DEFAULT 'En attente', -- En attente, En préparation, Livré
    total_prix DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur) ON DELETE SET NULL
);

-- 9. Table de détail des Commandes
CREATE TABLE commande_details (
    id_detail INT AUTO_INCREMENT PRIMARY KEY,
    id_commande INT,
    id_plat INT,
    quantite INT NOT NULL DEFAULT 1,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES commandes(id_commande) ON DELETE CASCADE,
    FOREIGN KEY (id_plat) REFERENCES plats(id_plat) ON DELETE SET NULL
);


-------------------------------------------------------------------------------------

1. Le MCD (Modèle Conceptuel de Données)
Le MCD exprime les règles de gestion en français avec des entités et des associations, sans se soucier de l'informatique.

UTILISATEUR (0,N) ── [Passer] ── (1,1) COMMANDE

UTILISATEUR (0,N) ── [Liker] ── (0,N) PLAT

UTILISATEUR (0,N) ── [Commenter] ── (0,N) PLAT (Attribut de l'association : note, texte_commentaire, date_publication)

CATEGORIE (0,N) ── [Contenir] ── (1,1) PLAT

PLAT (0,N) ── [Composer] ── (0,N) INGREDIENT

COMMANDE (1,N) ── [Contenir détail] ── (0,N) PLAT (Attribut de l'association : quantite, prix_unitaire)

2. Le MLD (Modèle Logique de Données)
Au niveau logique, les relations "Plusieurs à Plusieurs" (N:N) se transforment en tables intermédiaires, et les clés primaires (CP) migrent vers les tables dépendantes comme clés étrangères (CE).

utilisateurs (id_utilisateur, nom, email, mot_de_passe, adresse, telephone, role, date_inscription)

categories (id_categorie, nom_categorie)

plats (id_plat, nom_plat, description, prix, image_url, temps_preparation_minutes, disponible, date_creation, #id_categorie)

ingredients (id_ingredient, nom_ingredient, allergene)

plat_ingredients (#id_plat, #id_ingredient)

likes (#id_utilisateur, #id_plat)

commentaires (id_commentaire, texte_commentaire, note, date_publication, #id_plat, #id_utilisateur)

commandes (id_commande, date_commande, statut_commande, total_prix, #id_utilisateur)

commande_details (id_detail, quantite, prix_unitaire, #id_commande, #id_plat)

--------------------------------------------------------------------------------
1. Gestion des Rôles (RBAC)
Le système gère nativement deux types de profils via la colonne role de la table users :

Client : Peut parcourir les plats, filtrer par catégorie, liker, commenter et passer des commandes.

Admin : Dispose des privilèges d'administration globaux (Ajouter/Modifier/Supprimer des plats, configurer les ingrédients, modérer les commentaires et mettre à jour le statut de préparation des commandes).

-------------------------------------------------------------------------------


Le Schéma Relationnel des Tables

[categories]
                         │
                       (1:N)
                         │
                         ▼
  [utilisateurs] ────> [plats] <──── (1:N) ──── [ingredients]
   (role: admin/         │   │                     (via table 
      client)            │   │                  plat_ingredients)
        │                │   │
      (1:N)            (1:N) (1:N)
        │                │   │
        ▼                ▼   └─────────> [likes]
  [commentaires]   [commande_details]             ▲
                         ▲                        │
                       (1:N)                    (1:N)
                         │                        │
                    [commandes] ────────────> [utilisateurs]


src/
│
├── config/             # Connexion à la base de données (db.js)
├── controllers/        # Reçoit la requête et renvoie la réponse (authController.js)
├── services/           # Contient les requêtes SQL et la logique métier (userService.js)
├── validators/         # Vérifie les données (ex: format de l'email) (authValidator.js)
├── middlewares/        # Sécurité, rôles et gestion d'erreurs (errorHandler.js)
├── routes/             # Associe les URL aux contrôleurs (authRoutes.js)
└── server.js           # Point d'entrée de l'application

 1 src/
    2 │
    3 ├── config/         # Connexion à la base de données (db.js)
    4 ├── routes/         # Définit les URLs (les "portes d'entrée")
    5 ├── validators/     # Vérifie si les données reçues sont correctes (ex: format email)
    6 ├── middlewares/    # Filtres de sécurité et gestion des erreurs
    7 ├── controllers/    # Reçoit la requête, demande le travail et renvoie la réponse
    8 ├── services/       # Le "cerveau" : contient la logique métier et les calculs
    9 ├── models/         # Le "garde-manger" : fait les requêtes SQL à la base de données
   10 └── server.js       # Le moteur qui démarre tout



   Temps de préparation & Images : Ils sont directement intégrés dans la table plats. L'image est stockée sous forme de texte (un chemin vers le fichier ou un lien URL), ce qui est beaucoup plus léger que de stocker l'image directement en base de données.

Les Ingrédients séparés : En créant une table ingredients et une table de liaison plat_ingredients, tu pourras facilement faire un système de filtres sur ton site (ex: "Afficher tous les plats sans gluten" ou "Masquer les plats contenant des arachides").

Gestion des Likes : La table likes utilise une clé primaire combinée PRIMARY KEY (id_utilisateur, id_plat). Cela empêche techniquement un utilisateur de mettre plus d'un "like" sur un même plat. S'il clique à nouveau, ton code supprimera la ligne (Unlike).


------------------------------------------------------------------------------------

1. Le Déroulé du Projet (Roadmap)
Pour ne pas t'éparpiller, voici les 4 grandes phases pour mener ton projet à terme, de là où tu en es aujourd'hui jusqu'à la mise en ligne.

🚀 Phase 1 : L'Architecture et le Backend (En cours)
Base de données : Modélisation et création des tables (users, plats, commandes, etc.) dans phpMyAdmin. (Fait !)

Structure API (MVC) : Configuration de Node.js, Express, Nodemon et de tes dossiers (controllers, services, routes, etc.). (Fait !)

Sécurité & Gestion d'erreurs : Intégration d'un validateur robuste (express-validator), d'un système d'erreurs centralisé (AppError, errorHandler) et chiffrement des mots de passe (bcrypt). (Fait !)

🔐 Phase 2 : Authentification et Profils
Inscription / Connexion : Permettre aux clients de se créer un compte.(Fait !)

Gestion des Tokens (JWT) : Mettre en place des JSON Web Tokens pour que le site se souvienne de qui est connecté.(Fait !)

Autorisations (Rôles) : Créer un middleware de sécurité qui bloque l'accès aux routes d'administration si l'utilisateur n'a pas le role: 'admin'.(Fait !)

🍔 Phase 3 : Le Cœur du Métier (Plats & Commandes)
Module Admin : Routes et contrôleurs pour que l'admin puisse Ajouter (INSERT), Modifier (UPDATE) ou Supprimer (DELETE) des plats, des images, des catégories et des ingrédients.

Module Client : Routes pour afficher les plats, trier par catégorie, ajouter des likes et écrire des commentaires.

Module Panier & Commande : Logique pour valider un panier, enregistrer la commande en base de données et calculer le prix total.

🎨 Phase 4 : Le Frontend (L'Interface) et la Mise en ligne
Interface Graphique : Création des pages en HTML/CSS/JavaScript (ou React, Vue, etc.) pour rendre le site beau et interactif.

Connexion Front/Back : Connecter tes formulaires et tes boutons (ex: le bouton "Commander") à ton API Node.js.

Déploiement : Héberger ton site et ta base de données sur Internet pour que tes clients puissent y accéder.

2. Comment fonctionne le site ? (Le parcours utilisateur)
Voici exactement comment les données vont circuler et comment ton code MVC va réagir selon les actions sur le site.

A. Le point de vue du Client
L'Arrivée : Le client arrive sur la page d'accueil. Son navigateur web fait une requête GET /api/plats. Ton Controller appelle ton Service, qui fait un SELECT * FROM plats dans MySQL. Le client voit les photos de tes bons petits plats, le temps de préparation, les likes et les prix.

L'Interaction : Le client clique sur un plat pour voir les détails. Il voit les ingrédients (et les allergènes). S'il est connecté, il peut cliquer sur "Like" (ce qui ajoute une ligne dans la table likes) ou écrire un avis (ce qui déclenche ton validateAuth puis insère une ligne dans commentaires).

La Commande : Il ajoute un burger et un dessert à son panier. Quand il clique sur "Valider ma commande" :

Le site vérifie son adresse et son téléphone (s'ils sont vides, le site lui demande de les remplir à ce moment-là).

Une requête POST /api/commandes est envoyée.

Une ligne est créée dans commandes (ex: Commande n°42, Total: 22€, Statut: "En attente").

Deux lignes sont créées dans commande_details (Ligne 1: 1x Burger / Ligne 2: 1x Dessert).

B. Le point de vue de l'Administrateur (Toi)
La Connexion : Tu te connectes avec ton compte. Ton code détecte que ton role est égal à 'admin' dans la base de données. Un bouton "Accéder au tableau de bord" apparaît sur ton écran.

La Gestion de la Carte : Tu as cuisiné un nouveau plat. Tu remplis un formulaire sur ton site avec le nom, le prix, le temps de préparation et les ingrédients. En cliquant sur "Publier", une requête POST /api/plats est envoyée. Ton validateur vérifie que tu n'as pas oublié le prix, et le service fait un INSERT INTO plats. Le plat est instantanément visible par tous les clients.

Le Suivi des Commandes : Sur ton panneau d'administration, tu vois la commande n°42 arriver en temps réel. Quand tu commences à cuisiner, tu cliques sur un bouton qui fait un UPDATE commandes SET statut_commande = 'En préparation' WHERE id_commande = 42. Le client reçoit une notification ou voit son statut changer sur son profil.

Avec l'architecture MVC propre que tu viens de mettre en place, chaque action (un like, un commentaire, un ajout de plat) aura sa propre route, son propre validateur, et sa fonction dédiée dans un service. C'est robuste, hyper sécurisé, et super gratifiant à coder !