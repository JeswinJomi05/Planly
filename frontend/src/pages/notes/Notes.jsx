import { useState,useEffect } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Notes.css';
import api from "../../lib/axios";
import NoteCard from '../../components/NoteCard';


const Notes = () => {
  const navigate = useNavigate();


  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("Fetching notes...");
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
         
        } else {
          
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  
  return (
    <div className="notes-container">
      <header className="page-header notes-header">
        <div>
          <h1>Notes</h1>
          <p>Capture your thoughts securely.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/notes/create")}>
          <Plus size={20} />
          <span>New Note</span>
        </button>
      </header>

      

      <div className="notes-grid">
        {notes?.map(note => (
          <NoteCard key={note._id} note={note} setNotes={setNotes}/>
        ))}
      </div>
    </div>
  );
};

export default Notes;
