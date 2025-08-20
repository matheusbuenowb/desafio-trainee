/* Autor do código: Matheus Bueno Faria */

import React, { useState, useEffect } from "react";


const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/leads/list/")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar leads:", err);
        setLoading(false);
      });

  }, []);

  if (loading) return <p>Carregando leads...</p>;

  const totalLeads = leads.length;
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h2>Total de Leads</h2>
          <p>{totalLeads}</p>
        </div>
      </div>

      <div className="recent-leads">
        <h2>Leads mais recentes</h2>
        <ul>
          {recentLeads.map((lead) => (
            <li key={lead.id}>
              {lead.first_name} {lead.last_name} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
