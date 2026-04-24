import express from 'express';
import { connectDB } from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import tasksRoutes from './routes/tasksRoutes.js';
import cardsRoutes from './routes/cardsRoutes.js';
const app = express();

app.use(express.json()); 

app.use("/api/notes/", notesRoutes);
app.use("/api/tasks/", tasksRoutes);
app.use("/api/cards/", cardsRoutes);
connectDB().then(()=>{
    app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
})
