import { useEffect, useState } from "react";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    fetch("http://localhost:8080/api/leads/list/")
      .then(res => res.json())
      .then(data => setLeads(data))
      .catch(err => console.error("Erro ao buscar leads:", err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este lead?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/leads/${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLeads(leads.filter((lead) => lead.id !== id)); // atualiza local
      } else {
        console.error("Erro ao excluir lead");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };


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
            <th>Ações</th>
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
              <td>
                <button onClick={() => handleDelete(lead.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
