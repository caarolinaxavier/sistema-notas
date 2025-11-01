import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "../public/logo.png";

export default function App() {
  const [view, setView] = useState("home");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState({});
  const [newStudentName, setNewStudentName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // backup no localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dadosAlunos");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("dadosAlunos", JSON.stringify(students));
  }, [students]);

  const turmas = {
    "ENFERMAGEM - MÓDULO 1 e 2": [
      "Técnicas Básicas de Enfermagem",
      "Anatomia e Fisiologia Humanas",
      "Nutrição e Dietética",
      "Microbiologia e Parasitologia",
      "Primeiros Socorros",
      "Farmacologia Aplicada à Enfermagem",
      "Ética Profissional I",
      "Psicologia Aplicada à Enfermagem",
      "Enfermagem Médica",
      "Enfermagem em Saúde Coletiva e Higiene",
      "Enfermagem em Centro Cirúrgico",
      "Enfermagem Cirúrgica",
      "Enf. no Processo de Cuidar em Materno Infantil I",
      "Enfermagem em Geriatria",
      "Administração em Unidade de Enfermagem",
      "Enfermagem em Saúde Pública",
      "Enf. no Processo de Cuidar em Materno-Infantil II",
      "Enf. em Centro Cirúrgico e Central de Material de Esterilização",
      "Enf. no Cuidado de Paciente de Alta Dependência",
      "Enfermagem em Urgência e Emergência",
      "Enfermagem em Saúde Mental",
      "Enfermagem Domiciliária",
      "Ética Profissional II",
      "Gestão em Enfermagem"
    ],
    "RADIOLOGIA - TRN1": [
      "Anatomia Básica",
      "Radiologia Elementar",
      "Psicologia e Ética",
      "Fisiologia Humana",
      "Física Radiológica",
      "Proteção Radiológica 1",
      "Patologia",
      "Primeiros Socorros",
      "Atomística",
      "Processamento de Imagens",
      "Princípios Básicos de Posicionamento"
    ],
    "RADIOLOGIA - TRN2": [
      "Políticas de Saúde",
      "Anatomia Radiológica 1",
      "Legislação Radiológica, Previdenciária e Trabalhista",
      "Administração de Serviços Radiológicos",
      "Farmacologia",
      "Noções de Tomografia Computadorizada e Ressonância Magnética",
      "Proteção Radiológica 2",
      "Técnicas de Posicionamento em Diagnóstico Médico"
    ],
    "RADIOLOGIA - TRN3": [
      "Exames Contrastados",
      "Mamografia",
      "Técnica de Posicionamento Especial",
      "Radiologia Veterinária",
      "Radiologia Odontológica",
      "Radioterapia",
      "Radioisotopia e Medicina Nuclear",
      "Radiologia Industrial",
      "Anatomia Radiológica 2",
      "Técnicas de Posicionamento em Diagnóstico Médico (Estágio 100h)"
    ],
    "NECROPSIA - N1": [
      "Anatomia",
      "Biologia",
      "Higiene e Biossegurança",
      "Fisiologia",
      "Ética Profissional",
      "Língua Portuguesa",
      "Medicina Legal",
      "Raciocínio Lógico",
      "Tanatologia Forense",
      "Técnicas de Necropsia",
      "Traumatologia Forense"
    ]
  };

  const handleLogin = () => {
    if (password === "admin123") setView("professor");
    else alert("Senha incorreta!");
  };

  const addStudent = () => {
    if (!newStudentName || !selectedClass) return;
    setStudents((prev) => ({
      ...prev,
      [selectedClass]: [
        ...(prev[selectedClass] || []),
        { nome: newStudentName, dados: {} }
      ]
    }));
    setNewStudentName("");
  };

  const updateField = (turma, nome, disciplina, campo, valor) => {
    setStudents((prev) => {
      const turmaAlunos = prev[turma] || [];
      const novosAlunos = turmaAlunos.map((aluno) => {
        if (aluno.nome === nome) {
          return {
            ...aluno,
            dados: {
              ...aluno.dados,
              [disciplina]: {
                ...aluno.dados[disciplina],
                [campo]: valor
              }
            }
          };
        }
        return aluno;
      });
      return { ...prev, [turma]: novosAlunos };
    });
  };

  const backup = () => {
    const blob = new Blob([JSON.stringify(students, null, 2)], {
      type: "application/json"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "backup_notas.json";
    link.click();
  };

  return (
    <div className="app-container">
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Sistema de Notas e Estágios</h1>
      </header>

      {view === "home" && (
        <div className="login-box">
          <h2>Área do Professor</h2>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            Mostrar senha
          </label>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      )}

      {view === "professor" && (
        <div className="professor-area">
          <h2>Turmas</h2>
          <div className="turmas-list">
            {Object.keys(turmas).map((t) => (
              <button key={t} onClick={() => setSelectedClass(t)}>
                {t}
              </button>
            ))}
          </div>

          {selectedClass && (
            <div className="turma-detalhe">
              <h3>{selectedClass}</h3>
              <div className="add-aluno">
                <input
                  type="text"
                  placeholder="Nome do aluno"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                />
                <button onClick={addStudent}>Adicionar</button>
                <button onClick={backup}>Fazer Backup</button>
              </div>

              <ul className="alunos-lista">
                {(students[selectedClass] || [])
                  .sort((a, b) => a.nome.localeCompare(b.nome))
                  .map((aluno) => (
                    <li
                      key={aluno.nome}
                      onClick={() =>
                        setSelectedStudent(
                          selectedStudent === aluno.nome ? null : aluno.nome
                        )
                      }
                    >
                      {aluno.nome}
                      {selectedStudent === aluno.nome && (
                        <table>
                          <thead>
                            <tr>
                              <th>Disciplina</th>
                              <th>Módulo</th>
                              <th>Carga Teórica</th>
                              <th>Carga Estágio</th>
                              <th>Nota</th>
                              <th>Faltas</th>
                              <th>Aprovado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {turmas[selectedClass].map((disc) => (
                              <tr key={disc}>
                                <td>{disc}</td>
                                <td>
                                  <input
                                    value={
                                      aluno.dados[disc]?.modulo || ""
                                    }
                                    onChange={(e) =>
                                      updateField(
                                        selectedClass,
                                        aluno.nome,
                                        disc,
                                        "modulo",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    value={
                                      aluno.dados[disc]?.teorico || ""
                                    }
                                    onChange={(e) =>
                                      updateField(
                                        selectedClass,
                                        aluno.nome,
                                        disc,
                                        "teorico",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    value={
                                      aluno.dados[disc]?.estagio || ""
                                    }
                                    onChange={(e) =>
                                      updateField(
                                        selectedClass,
                                        aluno.nome,
                                        disc,
                                        "estagio",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    value={
                                      aluno.dados[disc]?.nota || ""
                                    }
                                    onChange={(e) =>
                                      updateField(
                                        selectedClass,
                                        aluno.nome,
                                        disc,
                                        "nota",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    value={
                                      aluno.dados[disc]?.faltas || ""
                                    }
                                    onChange={(e) =>
                                      updateField(
                                        selectedClass,
                                        aluno.nome,
                                        disc,
                                        "faltas",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <select
                                    value={
                                      aluno.dados[disc]?.aprovado || ""
                                    }
                                    onChange={(e) =>
                                      updateField(
                                        selectedClass,
                                        aluno.nome,
                                        disc,
                                        "aprovado",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value=""></option>
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
