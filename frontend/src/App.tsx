import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { TicketListPage } from './pages/TicketListPage';
import { CreateTicketPage } from './pages/CreateTicketPage';
import  { TicketDetailPage } from './pages/TicketDetailPage';
import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <header className="app-header">
        <Link to="/tickets" className="brand-logo">
          SupportFlow
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/tickets">Tickets</Link></li>
            <li><Link to="/tickets/new">+ New Ticket</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/tickets" replace />} />
          <Route path="/tickets" element={<TicketListPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="*" element={<div className="page-container"><div className="card">Page not found</div></div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;