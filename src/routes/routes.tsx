import AdminDashboard from '@/app/admin/dashboard';
import AdminLayout from '@/components/admin-layout';
import AdminLoginPage from '@/app/admin/login';
import AdminUsers from '@/app/admin/users'; 
import Home from '@/app/user/home';
import LoginPage from '@/app/user/login';
import Missions from '@/app/user/missions';
import Ranking from '@/app/user/ranking';
import RootLayout from '@/components/layout';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminTeams from '@/app/admin/teams';
import AdminMissions from '@/app/admin/missions';
import Rewards from '@/app/user/rewards';

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        <Route element={<RootLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/rewards" element={<Rewards />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/teams" element={<AdminTeams />} />
          <Route path="/admin/missions" element={<AdminMissions />} />
          <Route path="/admin/settings" element={<div>Admin Settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;