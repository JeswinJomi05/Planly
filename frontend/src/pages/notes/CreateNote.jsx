import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../lib/axios";
import { toast } from 'react-hot-toast';

function CreateNote() {

    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await api.post("/notes", {
                title,
                content,
            });

            toast.success("Note created successfully!");
            navigate("/notes");
        } catch (error) {
        console.log("Error creating note", error);
        if (error.response.status === 429) {
            toast.error("Slow down! You're creating notes too fast", {
            duration: 4000,
            icon: "💀",
            });
        } else {
            toast.error("Failed to create note");
        }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass note-editor animate-fade-in">
            <input 
                type="text" 
                className="input-glass note-title-input" 
                placeholder="Note Title" 
                value={title}
                onChange={(e) => settitle(e.target.value)}
            />
            <textarea 
                className="input-glass note-content-input" 
                placeholder="Write your thoughts..." 
                rows="5"
                value={content}
                onChange={(e) => setcontent(e.target.value)}
            ></textarea>
            <div className="editor-actions">
                <button className="btn" onClick={() => {
                    settitle('');
                    setcontent('');
                }}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Save Note</button>
            </div>
    </div>
    )
    }

export default CreateNote