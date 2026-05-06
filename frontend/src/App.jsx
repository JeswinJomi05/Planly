import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TodoList from './components/TodoList';

import Flashcards from './pages/cards/Flashcards.jsx';
import Notes from './pages/notes/Notes';
import NoteDetail from './pages/notes/NoteDetail';
import CreateNote from './pages/notes/CreateNote.jsx';
import CreateCard from './pages/cards/CreateCard.jsx';
import CardDetail from './pages/cards/CardDetail.jsx';

function App() {
  

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TodoList />} />
          <Route path="/notes" element={<Notes/>} />
          <Route path="/notes/create" element={<CreateNote/>} />
          <Route path="/notes/:id" element={<NoteDetail/>} />
          <Route path="/cards" element={<Flashcards />} />
          <Route path="/cards/create" element={<CreateCard />} />
          <Route path="/cards/:id" element={<CardDetail />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
