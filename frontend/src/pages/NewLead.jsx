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
      <h2>Cadastro de Lead</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
