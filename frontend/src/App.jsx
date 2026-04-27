import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TodoList from './components/TodoList';
import Notes from './components/Notes';
import Flashcards from './components/Flashcards';
import NoteDetail from './pages/NoteDetail';
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Ideas', content: 'Explore React UI integrations', date: 'Oct 23' },
    { id: 2, title: 'Meeting Notes', content: 'Discuss the Planly roadmap and feature set for Q3.', date: 'Oct 22' },
  ]);

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/notes" element={<Notes notes={notes} setNotes={setNotes} />} />
          <Route path="/notes/:id" element={<NoteDetail notes={notes} setNotes={setNotes} />} />
          <Route path="/flashcards" element={<Flashcards />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
