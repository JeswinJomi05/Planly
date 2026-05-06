import express from 'express'
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import cardsRoutes from "./routes/cardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
if(process.env.NODE_ENV === 'development') {
    app.use(cors({
    origin: process.env.VITE_FRONTEND_URL,
}));
}

app.use("/api/notes",notesRoutes);
app.use("/api/cards",cardsRoutes);
app.use("/api/tasks",taskRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});



}
connectDB().then(()=>{
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
})

