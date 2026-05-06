import { useEffect } from 'react'
import { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FlashCard({cards, onDelete}) {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        console.log("Active card changed:", activeCard);
    }, [activeCard]);

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

    useEffect(() => {
        if (activeCard >= cards.length) {
            setActiveCard(Math.max(cards.length - 1, 0));
        }
    }, [cards.length, activeCard]);

    if (!cards || cards.length === 0) return <p>No cards available</p>;

    const card = cards[activeCard];

    return (
        <div className="flashcard-viewer">
            <div className="navigation-buttons">
                <button onClick={prevCard} disabled={cards.length <= 1}>
                    <ChevronLeft size={24} />
                </button>
                <span>{activeCard + 1} / {cards.length}</span>
                <button onClick={nextCard} disabled={cards.length <= 1}>
                    <ChevronRight size={24} />
                </button>

            </div>
            <div className={`flashcard glass ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            >
            <div className="flashcard-inner">
                <div className="flashcard-actions">
                    <button className="note-action-btn cdd flashcard-edit-btn" onClick={(event) => { event.stopPropagation(); navigate(`/cards/${card._id}`); }}>
                        <Edit2 size={16} />
                    </button>
                    <button className="note-action-btn cdd flashcard-delete-btn" onClick={(event) => { event.stopPropagation(); onDelete?.(card._id); }}>
                        <Trash2 size={16} />
                    </button>
                </div>
                <div className="flashcard-front">
                    <span className="card-label">Term</span>
                    <h2>{card.title}</h2>
                    <div className="flip-hint">
                        <RotateCw size={16} /> Click to flip
                    </div>
                </div>
                <div className="flashcard-back">
                    <span className="card-label">Definition</span>
                    <p>{card.content}</p>
                </div>
            </div>
            </div>
            
            
            
        </div>
    )
}

export default FlashCard