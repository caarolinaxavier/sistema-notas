import React, { useState } from "react";
import "./App.css";
import logo from "../public/logo.png";

export default function App() {
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);

  const turmas = [
    "TRN1", "TRN2", "TRN3",
    "Necropsia N1",
    "Enfermagem TEN2", "TEN3", "TEN4", "TEN5", "TEN6", "TEN7",
    "TEM2", "TEM3", "TEM4", "TEM5"
  ];

  const disciplinas = [
    "Anatomia", "Histologia", "Microbiologia",
    "Patologia", "Saúde Coletiva", "Ética Profissional"
  ];

  const handleLogin = () => {
    if (senha === "1234") {
      setLogado(true);
    } else {
      alert("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />

      {!logado ? (
        <div className="login-card">
          <h2>Área do Professor</h2>
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
        </div>
      ) : (
        <div className="painel">
          <h2>Painel do Professor</h2>
          <p>Selecione a turma e insira as informações abaixo.</p>

          {turmas.map((turma, index) => (
            <div key={index} className="turma-card">
              <h3>{turma}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Nota</th>
                    <th>Faltas</th>
                    <th>Aprovado</th>
                    <th>Retido</th>
                    <th>Carga Horária</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinas.map((disc, i) => (
                    <tr key={i}>
                      <td>{disc}</td>
                      <td><input type="text" placeholder="Nota" /></td>
                      <td><input type="text" placeholder="Faltas" /></td>
                      <td><input type="checkbox" /></td>
                      <td><input type="checkbox" /></td>
                      <td><input type="text" placeholder="CH" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
