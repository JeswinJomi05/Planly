import express from 'express';

import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);
router.patch('/:id', updateNote);
router.post('/', createNote);
router.put('/:id', getNoteById);
router.delete('/:id', deleteNote);

export default router;