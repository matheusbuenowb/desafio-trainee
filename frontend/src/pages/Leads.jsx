import { useEffect, useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/leads/list/")
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error("Erro ao buscar leads:", err));
  }, []);

  return (
    <div className="leads-container">
      <h2>Leads</h2>
      {leads.length === 0 && <p>Nenhum lead cadastrado.</p>}
      <table className="leads-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Mensagem</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td>{lead.first_name} {lead.last_name}</td>
              <td>{lead.email}</td>
              <td>{lead.message}</td>
              <td>{lead.status}</td>
              <td>{new Date(lead.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


