import React, { useState, useEffect } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import './App.css';

export default function App() {
  const [modo, setModo] = useState('aluno'); // aluno ou professor
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);

  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  // Disciplinas pré-carregadas
  const disciplinasPorCurso = {
    ENFERMAGEM: {
      TEM2: [
        { nome: 'Técnicas Básicas de Enfermagem', modulo: 1, teorico: 130, estagio: 150 },
        { nome: 'Anatomia e Fisiologia humanas', modulo: 1, teorico: 80, estagio: 0 },
        { nome: 'Nutrição e Dietética', modulo: 1, teorico: 30, estagio: 0 },
        { nome: 'Microbiologia e Parasitologia', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Primeiros Socorros', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Farmacologia Aplicada à Enfermagem', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Ética Profissional I', modulo: 1, teorico: 20, estagio: 0 },
        { nome: 'Psicologia Aplicada à Enfermagem', modulo: 1, teorico: 30, estagio: 0 },
        { nome: 'Enfermagem Médica', modulo: 1, teorico: 70, estagio: 90 },
        { nome: 'Enfermagem em Saúde Coletiva e Higiene', modulo: 1, teorico: 40, estagio: 40 },
        { nome: 'Enfermagem em Centro Cirúrgico', modulo: 1, teorico: 40, estagio: 20 },
        { nome: 'Enfermagem Cirúrgica', modulo: 1, teorico: 70, estagio: 60 },
        { nome: 'Enf. no Processo de Cuidar em Materno Infantil I', modulo: 1, teorico: 60, estagio: 40 },
        { nome: 'Enfermagem em Geriatria', modulo: 1, teorico: 20, estagio: 0 },
        { nome: 'Administração em Unidade de Enfermagem', modulo: 2, teorico: 50, estagio: 24 },
        { nome: 'Enfermagem em Saúde Pública', modulo: 2, teorico: 50, estagio: 40 },
        { nome: 'Enf. no Processo de cuidar em Materno-Infantil II', modulo: 2, teorico: 60, estagio: 20 },
        { nome: 'Enf. em Centro Cirúrgico e Central de Material de Esterilização', modulo: 2, teorico: 40, estagio: 20 },
        { nome: 'Enf. no Cuidado de Paciente de Alta Dependência', modulo: 2, teorico: 100, estagio: 20 },
        { nome: 'Enfermagem em Urgência e Emergência', modulo: 2, teorico: 70, estagio: 76 },
        { nome: 'Enfermagem em Saúde Mental', modulo: 2, teorico: 30, estagio: 0 },
        { nome: 'Enfermagem Domiciliária', modulo: 2, teorico: 30, estagio: 0 },
        { nome: 'Ética Profissional II', modulo: 2, teorico: 20, estagio: 0 },
        { nome: 'Gestão em Enfermagem', modulo: 2, teorico: 40, estagio: 0 }
      ],
      TEM3: [], TEM4: [], TEM5: [], TEN2: [], TEN3: [], TEN4: [], TEN5: [], TEN6: [], TEN7: []
    },
    RADIOLOGIA: {
      TRN1: [
        { nome: 'Anatomia Básica', modulo: 1, teorico: 100, estagio: 0 },
        { nome: 'Radiologia Elementar', modulo: 1, teorico: 20, estagio: 0 },
        { nome: 'Psicologia e Ética', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Fisiologia Humana', modulo: 1, teorico: 50, estagio: 0 },
        { nome: 'Física Radiológica', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Proteção Radiológica1', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Patologia', modulo: 1, teorico: 50, estagio: 0 },
        { nome: 'Primeiros Socorros', modulo: 1, teorico: 30, estagio: 0 },
        { nome: 'Atomística', modulo: 1, teorico: 30, estagio: 0 },
        { nome: 'Processamento de Imagens', modulo: 1, teorico: 40, estagio: 40 },
        { nome: 'Princípios Básicos de Posicionamento', modulo: 1, teorico: 30, estagio: 40 },
        { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 3, teorico: 0, estagio: 100 }
      ],
      TRN2: [
        { nome: 'Anatomia Básica', modulo: 1, teorico: 100, estagio: 0 },
        { nome: 'Radiologia Elementar', modulo: 1, teorico: 20, estagio: 0 },
        { nome: 'Psicologia e Ética', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Fisiologia Humana', modulo: 1, teorico: 50, estagio: 0 },
        { nome: 'Física Radiológica', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Proteção Radiológica1', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Patologia', modulo: 1, teorico: 50, estagio: 0 },
        { nome: 'Primeiros Socorros', modulo: 1, teorico: 30, estagio: 0 },
        { nome: 'Atomística', modulo: 1, teorico: 30, estagio: 0 },
        { nome: 'Processamento de Imagens', modulo: 1, teorico: 40, estagio: 40 },
        { nome: 'Princípios Básicos de Posicionamento', modulo: 1, teorico: 30, estagio: 40 },
        { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 3, teorico: 0, estagio: 100 }
      ],
      TRN3: [
        { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 3, teorico: 0, estagio: 100 }
      ]
    },
    NECROPSIA: {
      N1: [
        { nome: 'Anatomia', modulo: 1, teorico: 60, estagio: 0 },
        { nome: 'Biologia', modulo: 1, teorico: 20, estagio: 0 },
        { nome: 'Higiene Biossegurança', modulo: 1, teorico: 32, estagio: 0 },
        { nome: 'Fisiologia', modulo: 1, teorico: 44, estagio: 0 },
        { nome: 'Ética Profissional', modulo: 1, teorico: 24, estagio: 0 },
        { nome: 'Língua Portuguesa', modulo: 1, teorico: 28, estagio: 0 },
        { nome: 'Medicina Legal', modulo: 1, teorico: 32, estagio: 0 },
        { nome: 'Raciocínio Lógico', modulo: 1, teorico: 28, estagio: 0 },
        { nome: 'Tanatologia Forense', modulo: 1, teorico: 24, estagio: 0 },
        { nome: 'Técnicas de Necropsia', modulo: 1, teorico: 40, estagio: 0 },
        { nome: 'Traumatologia Forense', modulo: 1, teorico: 28, estagio: 0 }
      ]
    }
  };

  useEffect(() => {
    // Inicializar turmas
    setTurmas(['TRN1', 'TRN2', 'TRN3', 'TEM2', 'TEM3', 'TEM4', 'TEM5', 'TEN2', 'TEN3', 'TEN4', 'TEN5', 'TEN6', 'TEN7', 'N1']);
  }, []);

  const handleLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) {
      setAutenticado(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const adicionarAluno = () => {
    if (!nomeAluno || !turmaAluno) return;
    const turma = turmas.includes(turmaAluno) ? turmaAluno : turmaAluno;
    const disciplinas = disciplinasPorCurso.RADIOLOGIA[turma] || [];
    const aluno = {
      nome: nomeAluno,
      disciplinas: disciplinas.reduce((acc, disc) => {
        acc[disc.nome] = { ...disc, nota: '', faltas: '', aprovado: '' };
        return acc;
      }, {})
    };
    setNovoAluno(aluno);
    setNomeAluno('');
  };

  return (
    <div className="App">
      {!autenticado && modo === 'professor' && (
        <div className="login-box">
          <h2>Login do Professor</h2>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Senha"
            value={senhaAdmin}
            onChange={(e) => setSenhaAdmin(e.target.value)}
          />
          <div>
            <input type="checkbox" checked={mostrarSenha} onChange={() => setMostrarSenha(!mostrarSenha)} /> Mostrar senha
          </div>
          <button onClick={handleLogin}>Entrar</button>
          <p className="senha-info">Senha padrão: {SENHA_PADRAO}</p>
        </div>
      )}
      {autenticado && (
        <div className="professor-area">
          <h1>Área do Professor</h1>
          <div className="adicionar-aluno">
            <input placeholder="Nome do aluno" value={nomeAluno} onChange={(e) => setNomeAluno(e.target.value)} />
            <input placeholder="Turma" value={turmaAluno} onChange={(e) => setTurmaAluno(e.target.value)} />
            <button onClick={adicionarAluno}><Plus size={16} /> Adicionar</button>
          </div>

          {novoAluno.nome && (
            <div className="aluno-card">
              <h2>{novoAluno.nome}</h2>
              {Object.keys(novoAluno.disciplinas).map((disc, idx) => (
                <div key={idx} className="disciplina">
                  <p>{disc} | Módulo {novoAluno.disciplinas[disc].modulo}</p>
                  <input
                    type="number"
                    placeholder="Nota"
                    value={novoAluno.disciplinas[disc].nota}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNovoAluno((prev) => ({
                        ...prev,
                        disciplinas: {
                          ...prev.disciplinas,
                          [disc]: { ...prev.disciplinas[disc], nota: val }
                        }
                      }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Faltas"
                    value={novoAluno.disciplinas[disc].faltas}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNovoAluno((prev) => ({
                        ...prev,
                        disciplinas: {
                          ...prev.disciplinas,
                          [disc]: { ...prev.disciplinas[disc], faltas: val }
                        }
                      }));
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Aprovado/Retido"
                    value={novoAluno.disciplinas[disc].aprovado}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNovoAluno((prev) => ({
                        ...prev,
                        disciplinas: {
                          ...prev.disciplinas,
                          [disc]: { ...prev.disciplinas[disc], aprovado: val }
                        }
                      }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Carga Teórica"
                    value={novoAluno.disciplinas[disc].teorico}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNovoAluno((prev) => ({
                        ...prev,
                        disciplinas: {
                          ...prev.disciplinas,
                          [disc]: { ...prev.disciplinas[disc], teorico: val }
                        }
                      }));
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Carga Estágio"
                    value={novoAluno.disciplinas[disc].estagio}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNovoAluno((prev) => ({
                        ...prev,
                        disciplinas: {
                          ...prev.disciplinas,
                          [disc]: { ...prev.disciplinas[disc], estagio: val }
                        }
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
