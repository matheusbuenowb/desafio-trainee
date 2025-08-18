import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import NewLead from "./pages/NewLead";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h1 className="logo">Trainee CRM</h1>
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
            <Route path="/dashboard" element={<h2>Dashboard</h2>} />
            <Route path="/leads" element={<h2>Lista de Leads</h2>} />
            <Route path="/new-lead" element={<h2>Cadastro de Lead</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
