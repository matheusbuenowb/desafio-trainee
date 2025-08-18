import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import NewLead from "./pages/NewLead";

import "./styles/main.css";
import "./styles/sidebar.css";
import "./styles/pages.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h1 className="logo">CRM</h1>
          <nav>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/leads">Leads</Link></li>
              <li><Link to="/new-lead">Novo Lead</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/new-lead" element={<NewLead />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
