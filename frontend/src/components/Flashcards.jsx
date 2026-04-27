import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import './Flashcards.css';

const Flashcards = () => {
  const [cards] = useState([
    { id: 1, term: 'Glassmorphism', definition: 'A UI trend that uses translucent, frosted glass-like backgrounds with blur effects.' },
    { id: 2, term: 'Vite', definition: 'A modern frontend build tool that significantly improves the frontend development experience.' },
    { id: 3, term: 'React', definition: 'A JavaScript library for building user interfaces.' },
  ]);
  const [activeCard, setActiveCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 150); // wait for unflip animation
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="flashcards-container">
      <header className="page-header">
        <h1>Flashcards</h1>
        <p>Master your concepts efficiently.</p>
      </header>
      
      {cards.length > 0 && (
        <div className="flashcard-viewer">
          <div 
            className={`flashcard glass ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <span className="card-label">Term</span>
                <h2>{cards[activeCard].term}</h2>
                <div className="flip-hint">
                  <RotateCw size={16} /> Click to flip
                </div>
              </div>
              <div className="flashcard-back">
                <span className="card-label">Definition</span>
                <p>{cards[activeCard].definition}</p>
              </div>
            </div>
          </div>
          
          <div className="flashcard-controls glass">
            <button className="btn" onClick={prevCard}>Previous</button>
            <span className="card-counter">{activeCard + 1} / {cards.length}</span>
            <button className="btn btn-primary" onClick={nextCard}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
