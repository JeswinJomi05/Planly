import express from 'express';

import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/notescontrollers.js';

const router = express.Router();

router.get('/', getAllNotes);
router.patch('/:id', getNoteById);

router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;