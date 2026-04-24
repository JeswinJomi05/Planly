import Card from "../models/Card.js";


export const getAllCards = async (req, res) => {
    try{
        const cards = await Card.find().sort({createdAt: -1});
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getCardById = async (req, res) => {
    try{
        const card = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createCard = async (req,res)=>{
    try{
        console.log(req.body);
        const { title, content } = req.body;
        
        const newCard = new Card({title,content});

        await newCard.save();
        res.status(201).json("Card created successfully");

    }
    catch(error){
        res.status(400).json({ message: error.message });
    }

};
export const updateCard = async (req, res) => {
    try{
        
        const { title, content } = req.body;

        const updatedCard = await Card.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedCard){
            return res.status(404).json({ message: "Card not found" });
        }
        
        res.status(200).json("Card updated successfully");
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
};
export const deleteCard = async (req, res) => {
    try{
        const deletedCard = await Card.findByIdAndDelete(req.params.id);
        if(!deletedCard){
            return res.status(404).json({ message: "Card not found" });
        }
        res.status(200).json("Card deleted successfully");
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};
