import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Favorites from './components/Favorites';
import History from './components/History';
import Signup from './components/Signup';
import Login from './components/Login';
import WordList from './components/WordList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/signup" />} />
          <Route path="wordlist" element={<WordList />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
