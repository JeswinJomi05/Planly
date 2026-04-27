import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Notes.css';

const Notes = ({ notes, setNotes }) => {
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const saveNote = () => {
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;
    
    if (editingId) {
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...note, title: newNoteTitle || 'Untitled Note', content: newNoteContent }
          : note
      ));
    } else {
      setNotes([
        { 
          id: Date.now(), 
          title: newNoteTitle || 'Untitled Note', 
          content: newNoteContent, 
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
        }, 
        ...notes
      ]);
    }
    setNewNoteTitle('');
    setNewNoteContent('');
    setEditingId(null);
    setShowEditor(false);
  };

  const handleEdit = (e, note) => {
    e.stopPropagation();
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
    setEditingId(note.id);
    setShowEditor(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteNote = (e, id) => {
    e.stopPropagation();
    setNotes(notes.filter(note => note.id !== id));
  };

  const openNoteDetail = (id) => {
    navigate(`/notes/${id}`);
  };

  return (
    <div className="notes-container">
      <header className="page-header notes-header">
        <div>
          <h1>Notes</h1>
          <p>Capture your thoughts securely.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowEditor(!showEditor)}>
          <Plus size={20} />
          <span>New Note</span>
        </button>
      </header>

      {showEditor && (
        <div className="glass note-editor animate-fade-in">
          <input 
            type="text" 
            className="input-glass note-title-input" 
            placeholder="Note Title" 
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
          <textarea 
            className="input-glass note-content-input" 
            placeholder="Write your thoughts..." 
            rows="5"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
          ></textarea>
          <div className="editor-actions">
            <button className="btn" onClick={() => {
              setShowEditor(false);
              setEditingId(null);
              setNewNoteTitle('');
              setNewNoteContent('');
            }}>Cancel</button>
            <button className="btn btn-primary" onClick={saveNote}>Save Note</button>
          </div>
        </div>
      )}

      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="glass note-card" onClick={() => openNoteDetail(note.id)} style={{cursor: 'pointer'}}>
            <div className="note-card-header">
              <h3>{note.title}</h3>
              <div className="note-actions">
                <button className="note-action-btn" onClick={(e) => handleEdit(e, note)}>
                  <Edit2 size={16} />
                </button>
                <button className="note-action-btn note-delete" onClick={(e) => deleteNote(e, note.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
              <span className="note-date">{note.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
