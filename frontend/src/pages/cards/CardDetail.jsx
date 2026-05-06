import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { toast } from 'react-hot-toast';

const CardDetail = ({ cards, setCards }) => {
  
  const [card, setCard  ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await api.get(`/cards/${id}`);
        console.log("Fetched card:", res.data);
        setCard(res.data);
      } catch (error) {
        console.log("Error in fetching card", error);
        toast.error("Failed to fetch the card");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const handleSave = async () => {
    if (!card?.title?.trim() || !card?.content?.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/cards/${id}`, { title: card.title, content: card.content });
      toast.success("Card updated successfully");
      navigate("/cards");
    } catch (error) {
      console.log("Error saving the card:", error);
      toast.error("Failed to update card");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="card-detail-container animate-fade-in">
        <div className="glass detail-content" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="card-detail-container animate-fade-in">
        <div className="glass detail-content" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          Card not found
        </div>
      </div>
    );
  }

  return (
    <div className="card-detail-container animate-fade-in">
      <header className="page-header detail-header">

        <button className="btn btn-icon" onClick={() => navigate("/cards")}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="detail-actions">
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              <Save size={20} />
              <span>{saving ? 'Saving...' : 'Save Card'}</span>
            </button>
        </div>

      </header>

      <div className="glass detail-content">
        
          <div className="editor-mode">
            <input 
              type="text" 
              className="input-glass detail-title-input" 
              value={card.title || ''}
              onChange={(e) => setCard({ ...card, title: e.target.value })}
              placeholder="Card Title"
            />
            <textarea 
              className="input-glass detail-content-input" 
              value={card.content || ''}
              onChange={(e) => setCard({ ...card, content: e.target.value })}
              placeholder="Card Content"
              rows="15"
            />
          </div>
      </div>
    </div>
  );
};

export default CardDetail;
