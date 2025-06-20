import Home from '@/app/home';
import LoginPage from '@/app/login';
import Missions from '@/app/missions';
import Ranking from '@/app/ranking';
import RootLayout from '@/components/layout';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route without sidebar */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Routes with sidebar */}
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;