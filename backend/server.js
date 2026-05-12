import express from 'express'
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import cardsRoutes from "./routes/cardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.VITE_FRONTEND_URL,
    })
  );
}

app.use("/api/notes", notesRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

