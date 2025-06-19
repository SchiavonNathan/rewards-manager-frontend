import Home from '@/app/home';
import LoginPage from '@/app/login';
import Ranking from '@/app/ranking';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;