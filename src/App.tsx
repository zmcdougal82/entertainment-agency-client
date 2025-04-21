import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import EntertainersListPage from './pages/EntertainersListPage';
import EntertainerDetailPage from './pages/EntertainerDetailPage';
import EntertainerFormPage from './pages/EntertainerFormPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/entertainers" element={<EntertainersListPage />} />
            <Route path="/entertainers/new" element={<EntertainerFormPage />} />
            <Route path="/entertainers/:id" element={<EntertainerDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
