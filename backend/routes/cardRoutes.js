import {getAllCards,getCardById,createCard,updateCard,deleteCard} from '../controllers/cardsController.js';
import express from 'express'

const router = express.Router();

router.get("/",getAllCards);
router.patch("/:id",getCardById);
router.post("/",createCard);
router.put("/:id",updateCard);
router.delete("/:id",deleteCard);


export default router;


