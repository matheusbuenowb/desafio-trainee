import { useState } from "react";

export default function NewLead() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // mensagem do lead
  const [statusMessage, setStatusMessage] = useState(""); // feedback
  const [status, setStatus] = useState(""); // sucesso ou erro

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); 
    setStatusMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage("Lead criado com sucesso!");
        // limpa formulário
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setStatusMessage(`Erro: ${data.error || "Não foi possível criar lead"}`);
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("Erro ao conectar com o servidor!");
    }
  };

  return (
    <div className="new-lead-container">
      <h2>Novo Lead</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sobrenome:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mensagem:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {statusMessage && (
        <p style={{ color: status === "success" ? "green" : "red" }}>
          {statusMessage}
        </p>
      )}
    </div>
  );
}
