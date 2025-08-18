import React from "react";

export default function Leads() {
  return (
    <div>
      <h1>Leads</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maria Silva</td>
              <td>maria@email.com</td>
              <td>Ativo</td>
            </tr>
            <tr>
              <td>João Souza</td>
              <td>joao@email.com</td>
              <td>Inativo</td>
            </tr>
            <tr>
              <td>Ana Costa</td>
              <td>ana@email.com</td>
              <td>Em negociação</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

