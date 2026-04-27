import { Link } from 'react-router-dom';
import { CheckSquare, StickyNote, Layers, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome back to <span className="highlight">Planly</span></h1>
        <p>Your beautiful, productive workspace.</p>
      </header>

      <div className="modules-grid">
        <div className="glass module-card">
          <div className="module-icon todo-icon">
            <CheckSquare size={32} />
          </div>
          <h2>Todo List</h2>
          <p>Organize your tasks and stay ahead of your schedule.</p>
          <Link to="/todo" className="btn btn-primary module-link">
            <span>Open Tasks</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="glass module-card">
          <div className="module-icon notes-icon">
            <StickyNote size={32} />
          </div>
          <h2>Notes</h2>
          <p>Capture thoughts, ideas, and meeting summaries.</p>
          <Link to="/notes" className="btn btn-primary module-link">
            <span>View Notes</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="glass module-card">
          <div className="module-icon flashcards-icon">
            <Layers size={32} />
          </div>
          <h2>Flashcards</h2>
          <p>Master new concepts with interactive study cards.</p>
          <Link to="/flashcards" className="btn btn-primary module-link">
            <span>Study Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
