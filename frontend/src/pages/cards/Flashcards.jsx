import './Flashcards.css';
import { useState,useEffect } from 'react';
import api from '../../lib/axios';
import FlashCard from '../../components/FlashCard';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Flashcards = () => {
  const navigate = useNavigate();

  const [cards,setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteCard = async (id) => {
    try {
      await api.delete(`/cards/${id}`);
      setCards((prev) => prev.filter((card) => card._id !== id));
    } catch (error) {
      console.log("Error deleting card", error.response || error);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get("/cards");
        setCards(res.data);
      } catch (error) {
        console.log("Error fetching cards");
        console.log(error.response);
        if (error.response?.status === 429) {
         
        } else {
          
        }
      } finally {
        setLoading(false);
      }
    };
    

    fetchCards();
  }, []);
  

  // const nextCard = () => {
  //   setIsFlipped(false);
  //   setTimeout(() => {
  //     setActiveCard((prev) => (prev + 1) % cards.length);
  //   }, 150); // wait for unflip animation
  // };

  // const prevCard = () => {
  //   setIsFlipped(false);
  //   setTimeout(() => {
  //     setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);
  //   }, 150);
  // };

  return (
    <div className="flashcards-container">
      <header className="page-header">
        <div className="header-content">
          <h1>Flashcards</h1>
          <p>Master your concepts efficiently.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/cards/create")}>
          <Plus size={20} />
          <span>New Card</span>
        </button>
      </header>

      {
        loading ? (
          <div className="loading-state">
            <p>Loading flashcards...</p>
          </div>
        ) : (
          Array.isArray(cards) && cards.length > 0 ? (
            <FlashCard cards={cards} onDelete={handleDeleteCard} />
          ) : (
            <p>No flashcards found</p>
          )
        )
         }
      
      
    </div>
  );
};

export default Flashcards;
