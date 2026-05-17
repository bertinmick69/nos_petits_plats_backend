import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js";
// TODO : importer vos routes au fur et à mesure

import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT|| 3000;
app.use(express.json());

// Middlewares globaux
app.use(cors({ origin: 'http://localhost:5173' }));


// Exemple avec une route — à dupliquer pour chaque groupe de routes
app.use('/auth', authRoutes);

// TODO : brancher les autres routes ici

// Gestionnaire d'erreurs — toujours EN DERNIER
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


