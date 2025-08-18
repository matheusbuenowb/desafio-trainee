import React from "react";

export default function Dashboard() {
  return (
    <div>
        <h1>Dashboard</h1>
        <div className="dashboard-cards">
            <div className="card">
                <h2>Leads Totais</h2>
                <p>120</p>
            </div>
            <div className="card">
                <h2>Leads Ativos</h2>
                <p>80</p>
            </div>
            <div className="card">
                <h2>Conversões</h2>
                <p>15%</p>
            </div>
        </div>
    </div>
  );
}
