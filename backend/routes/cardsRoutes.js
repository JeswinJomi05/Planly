import express from 'express';

import {getAllCards,getCardById,createCard,updateCard,deleteCard} from '../controllers/cardscontrollers.js';

const router = express.Router();

router.get('/', getAllCards);
router.patch('/:id', getCardById);

router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;