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
    <div>
      <h2>Leads</h2>
      {leads.length === 0 && <p>Nenhum lead cadastrado.</p>}
      <ul>
        {leads.map(lead => (
          <li key={lead.id}>
            {lead.first_name} {lead.last_name} - {lead.email}
          </li>
        ))}
      </ul>
    </div>
  );
}


