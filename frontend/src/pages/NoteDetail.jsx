import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import './NoteDetail.css';

const NoteDetail = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noteId = parseInt(id);
  const note = notes.find(n => n.id === noteId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  if (!note) {
    return (
      <div className="note-detail-container">
        <h2>Note not found</h2>
        <button className="btn" onClick={() => navigate('/notes')}>Back to Notes</button>
      </div>
    );
  }

  const handleSave = () => {
    setNotes(notes.map(n => n.id === noteId ? { ...n, title, content } : n));
    setIsEditing(false);
  };

  return (
    <div className="note-detail-container animate-fade-in">
      <header className="page-header detail-header">
        <button className="btn btn-icon" onClick={() => navigate('/notes')}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="detail-actions">
          {isEditing ? (
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={20} />
              <span>Save Note</span>
            </button>
          ) : (
            <button className="btn" onClick={() => setIsEditing(true)}>
              <Edit2 size={20} />
              <span>Edit Note</span>
            </button>
          )}
        </div>
      </header>

      <div className="glass detail-content">
        {isEditing ? (
          <div className="editor-mode">
            <input 
              type="text" 
              className="input-glass detail-title-input" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Note Title"
            />
            <textarea 
              className="input-glass detail-content-input" 
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Note Content"
              rows="15"
            />
          </div>
        ) : (
          <div className="view-mode">
            <h1 className="detail-title">{note.title}</h1>
            <div className="detail-meta">
              <span className="detail-date">Last updated: {note.date}</span>
            </div>
            <div className="detail-body">
              {note.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
