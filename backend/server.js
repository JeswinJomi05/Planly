import express from 'express'
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import cardsRoutes from "./routes/cardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",

}))
app.use(rateLimiter);
app.use("/api/notes",notesRoutes);
app.use("/api/cards",cardsRoutes);
app.use("/api/tasks",taskRoutes);

connectDB().then(()=>{
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
})

