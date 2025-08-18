import React, { useState } from "react";

export default function NewLead() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Lead criado: ${name} - ${email}`);
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h2>Novo Lead</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Digite o seu nome"
          />
        </div>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite seu email"
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
