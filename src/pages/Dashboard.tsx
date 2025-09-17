import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/dashboard/Navbar';
import ZoneMap from '@/components/maps/ZoneMap';
import ReportsPage from '@/components/dashboard/ReportsPage';
import AlertsPage from '@/components/dashboard/AlertsPage';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ZoneMap />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;