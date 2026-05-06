import React from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';
function NoteCard({ note, setNotes }) {
    const navigate = useNavigate();

    const handleDelete = async (e, id) => {
        e.preventDefault(); // get rid of the navigation behaviour
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
            
        } catch (error) {
            console.log("Error in handleDelete", error);
           
        }
    };
    return (
        <div className="glass note-card" style={{cursor: 'pointer'}} onClick={() => navigate(`/notes/${note._id}`)}>
            <div className="note-card-header">
                <h3>{note.title}</h3>
                <div className="note-actions">
                <button className="note-action-btn">
                    <Edit2 size={16} />
                </button>
                <button className="note-action-btn note-delete" onClick={(e) => handleDelete(e, note._id)}>
                    <Trash2 size={16} />
                </button>
                </div>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
                <span className="note-date">{new Date(note.updatedAt || note.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default NoteCard
