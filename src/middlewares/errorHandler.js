import AppError from "../errors/AppError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  
  // Log complet de l'erreur dans la console du serveur
  console.error("=== ERREUR SERVEUR ===");
  console.error(err);
  console.error("=======================");

  res.status(500).json({
    message: "Erreur serveur interne",
    error: err.message, // On renvoie le message pour aider au débogage
    details: err.code || "No code" // Utile pour les erreurs SQL
  });
};

export default errorHandler;
