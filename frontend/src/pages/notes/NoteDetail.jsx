import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { toast } from 'react-hot-toast';
import './NoteDetail.css';

const NoteDetail = ({ notes, setNotes }) => {
  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        console.log("Fetched note:", res.data);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, { title: note.title, content: note.content });
      toast.success("Note updated successfully");
      navigate("/notes");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="note-detail-container animate-fade-in">
        <div className="glass detail-content" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="note-detail-container animate-fade-in">
        <div className="glass detail-content" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          Note not found
        </div>
      </div>
    );
  }

  return (
    <div className="note-detail-container animate-fade-in">
      <header className="page-header detail-header">

        <button className="btn btn-icon" onClick={() => navigate("/notes")}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="detail-actions">
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              <Save size={20} />
              <span>{saving ? 'Saving...' : 'Save Note'}</span>
            </button>
        </div>

      </header>

      <div className="glass detail-content">
        
          <div className="editor-mode">
            <input 
              type="text" 
              className="input-glass detail-title-input" 
              value={note.title || ''}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              placeholder="Note Title"
            />
            <textarea 
              className="input-glass detail-content-input" 
              value={note.content || ''}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              placeholder="Note Content"
              rows="15"
            />
          </div>
      </div>
    </div>
  );
};

export default NoteDetail;
