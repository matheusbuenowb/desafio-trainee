import { useState } from "react";

export default function NewLead() {
  const [firstName, setFirstName] = useState("");  // substitui name
  const [lastName, setLastName] = useState("");    // novo campo opcional
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");      // novo campo opcional

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/leads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          message: message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao criar lead:", errorData);
        return;
      }

      console.log("Lead criado com sucesso!");
      // limpa campos
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <h2>Cadastro de Lead</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
