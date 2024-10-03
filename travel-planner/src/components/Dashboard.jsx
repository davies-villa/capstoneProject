import React from 'react';
import { useAuth } from '../context/AuthContext';  

function Dashboard() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload(); // Force refresh all pages to reflect the logout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {currentUser.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
