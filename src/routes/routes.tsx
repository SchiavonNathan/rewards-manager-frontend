import AdminLoginPage from '@/app/admin/login';
import Home from '@/app/user/home';
import LoginPage from '@/app/user/login';
import Missions from '@/app/user/missions';
import Ranking from '@/app/user/ranking';
import RootLayout from '@/components/layout';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route without sidebar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
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