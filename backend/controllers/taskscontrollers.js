import Task from "../models/Task.js";


export const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find().sort({createdAt: -1});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createTask = async (req,res)=>{
    try{
        console.log(req.body);
        const { title, content } = req.body;
        
        const newTask = new Task({title,content});

        await newTask.save();
        res.status(201).json("Task created successfully");

    }
    catch(error){
        res.status(400).json({ message: error.message });
    }

};
export const updateTask = async (req, res) => {
    try{
        
        const { title, content } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedTask){
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json("Task updated successfully");
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
};
export const deleteTask = async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json("Task deleted successfully");
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};
    