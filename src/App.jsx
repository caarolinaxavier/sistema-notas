import React, { useState, useEffect } from 'react';
import './App.css';
import { Eye, EyeOff, Upload, Download, Plus } from 'lucide-react';

export default function App() {
  const [modo, setModo] = useState('aluno');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);

  const [turmas, setTurmas] = useState([
    'TEM2','TEM3','TEM4','TEM5','TEN2','TEN3','TEN4','TEN5','TEN6','TEN7',
    'TRN1','TRN2',
    'N1'
  ]);
  const [alunos, setAlunos] = useState({});
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';
  const disciplinas = {
    TEM2: [
      { nome: "Técnicas Básicas de Enfermagem", modulo: 1, teorico: 130, estagio:150 },
      { nome: "Anatomia e Fisiologia humanas", modulo:1, teorico:80, estagio:0 },
      { nome: "Nutrição e Dietética", modulo:1, teorico:30, estagio:0 },
      { nome: "Microbiologia e Parasitologia", modulo:1, teorico:40, estagio:0 },
      { nome: "Primeiros Socorros", modulo:1, teorico:40, estagio:0 },
      { nome: "Farmacologia Aplicada à Enfermagem", modulo:1, teorico:40, estagio:0 },
      { nome: "Ética Profissional I", modulo:1, teorico:20, estagio:0 },
      { nome: "Psicologia Aplicada à Enfermagem", modulo:1, teorico:30, estagio:0 },
      { nome: "Enfermagem Médica", modulo:1, teorico:70, estagio:90 },
      { nome: "Enfermagem em Saúde Coletiva e Higiene", modulo:1, teorico:40, estagio:40 },
      { nome: "Enfermagem em Centro Cirúrgico", modulo:1, teorico:40, estagio:20 },
      { nome: "Enfermagem Cirúrgica", modulo:1, teorico:70, estagio:60 },
      { nome: "Enf. no Processo de Cuidar em Materno Infantil I", modulo:1, teorico:60, estagio:40 },
      { nome: "Enfermagem em Geriatria", modulo:1, teorico:20, estagio:0 },
      { nome: "Administração em Unidade de Enfermagem", modulo:2, teorico:50, estagio:24 },
      { nome: "Enfermagem em Saúde Pública", modulo:2, teorico:50, estagio:40 },
      { nome: "Enf. no Processo de cuidar em Materno-Infantil II", modulo:2, teorico:60, estagio:20 },
      { nome: "Enf. em Centro Cirúrgico e Central de Material de Esterilização", modulo:2, teorico:40, estagio:20 },
      { nome: "Enf. no Cuidado de Paciente de Alta Dependência", modulo:2, teorico:100, estagio:20 },
      { nome: "Enfermagem em Urgência e Emergência", modulo:2, teorico:70, estagio:76 },
      { nome: "Enfermagem em Saúde Mental", modulo:2, teorico:30, estagio:0 },
      { nome: "Enfermagem Domiciliária", modulo:2, teorico:30, estagio:0 },
      { nome: "Ética Profissional II", modulo:2, teorico:20, estagio:0 },
      { nome: "Gestão em Enfermagem", modulo:2, teorico:40, estagio:0 },
    ],
    TRN1: [
      { nome:"Anatomia Básica", modulo:1, teorico:100, estagio:0 },
      { nome:"Radiologia Elementar", modulo:1, teorico:20, estagio:0 },
      { nome:"Psicologia e Ética", modulo:1, teorico:40, estagio:0 },
      { nome:"Fisiologia Humana", modulo:1, teorico:50, estagio:0 },
      { nome:"Física Radiológica", modulo:1, teorico:40, estagio:0 },
      { nome:"Proteção Radiológica1", modulo:1, teorico:40, estagio:0 },
      { nome:"Patologia", modulo:1, teorico:50, estagio:0 },
      { nome:"Primeiros Socorros", modulo:1, teorico:30, estagio:0 },
      { nome:"Atomística", modulo:1, teorico:30, estagio:0 },
      { nome:"Processamento de Imagens", modulo:1, teorico:40, estagio:40 },
      { nome:"Princípios Básicos de Posicionamento", modulo:1, teorico:30, estagio:40 },
      { nome:"Políticas de Saúde", modulo:2, teorico:30, estagio:0 },
      { nome:"Anatomia Radiológica1", modulo:2, teorico:70, estagio:0 },
      { nome:"Legislação Radiológica, Previdenciária e Trabalhista", modulo:2, teorico:40, estagio:0 },
      { nome:"Administração de Serviços Radiológicos", modulo:2, teorico:20, estagio:0 },
      { nome:"Farmacologia", modulo:2, teorico:30, estagio:0 },
      { nome:"Noções de Tomografia Computadorizada e Ressonância Magnética", modulo:2, teorico:40, estagio:0 },
      { nome:"Proteção Radiológica2", modulo:2, teorico:40, estagio:0 },
      { nome:"Técnicas de Posicionamento em Diagnóstico Médico", modulo:2, teorico:100, estagio:160 },
      { nome:"Exames Contrastados", modulo:3, teorico:70, estagio:60 },
      { nome:"Mamografia", modulo:3, teorico:40, estagio:0 },
      { nome:"Técnica de Posicionamento Especial", modulo:3, teorico:40, estagio:0 },
      { nome:"Radiologia Veterinária", modulo:3, teorico:30, estagio:0 },
      { nome:"Radiologia Odontológica", modulo:3, teorico:30, estagio:0 },
      { nome:"Radioterapia", modulo:3, teorico:30, estagio:0 },
      { nome:"Radioisotopia e Medicina Nuclear", modulo:3, teorico:30, estagio:0 },
      { nome:"Radiologia Industrial", modulo:3, teorico:30, estagio:0 },
      { nome:"Anatomia Radiológica2", modulo:3, teorico:60, estagio:0 },
      { nome:"Técnicas de Posicionamento em Diagnóstico Médico", modulo:3, teorico:0, estagio:100 }, // só estagio
    ],
    TRN2: [
      // igual ao TRN1
    ],
    N1: [
      { nome:"Anatomia", modulo:1, teorico:60, estagio:0 },
      { nome:"Biologia", modulo:1, teorico:20, estagio:0 },
      { nome:"Higiene Biossegurança", modulo:1, teorico:32, estagio:0 },
      { nome:"Fisiologia", modulo:1, teorico:44, estagio:0 },
      { nome:"Ética Profissional", modulo:1, teorico:24, estagio:0 },
      { nome:"Língua Portuguesa", modulo:1, teorico:28, estagio:0 },
      { nome:"Medicina Legal", modulo:1, teorico:32, estagio:0 },
      { nome:"Raciocínio Lógico", modulo:1, teorico:28, estagio:0 },
      { nome:"Tanatologia Forense", modulo:1, teorico:24, estagio:0 },
      { nome:"Técnicas de Necropsia", modulo:1, teorico:40, estagio:0 },
      { nome:"Traumatologia Forense", modulo:1, teorico:28, estagio:0 }
    ]
  };

  // Inicializa alunos com disciplinas
  useEffect(() => {
    const inicial = {};
    turmas.forEach(t => {
      if(!alunos[t]){
        inicial[t] = [];
      }
    });
    setAlunos(prev => ({...inicial, ...prev}));
  }, []);

  const salvarAlunos = (turma, lista) => {
    setAlunos(prev => ({ ...prev, [turma]: lista }));
  };

  const fazerLogin = () => {
    if(senhaAdmin === SENHA_PADRAO){
      setAutenticado(true);
    } else alert("Senha incorreta!");
  };

  const buscarNotas = () => {
    if(!nomeAluno || !turmaAluno) return alert("Preencha nome e turma");
    const aluno = alunos[turmaAluno]?.find(a => a.nome.toLowerCase() === nomeAluno.toLowerCase());
    if(aluno) setNotasEncontradas(aluno);
    else { setNotasEncontradas(null); alert("Aluno não encontrado"); }
  };

  const adicionarAluno = () => {
    if(!novoAluno.nome.trim() || !turmaSelecionada) return alert("Digite nome e selecione turma");
    // inicializa disciplinas
    const inicialDisciplinas = {};
    (disciplinas[turmaSelecionada] || []).forEach(d => {
      inicialDisciplinas[d.nome] = { nota:'', faltas:'', aprovado:'', teorico:d.teorico, estagio:d.estagio, modulo:d.modulo };
    });
    const alunoFinal = { ...novoAluno, disciplinas: inicialDisciplinas };
    salvarAlunos(turmaSelecionada, [...alunos[turmaSelecionada], alunoFinal]);
    setNovoAluno({ nome:'', disciplinas:{} });
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <img src="logo.png" className="logo" alt="Logo"/>
        <div>
          <h1>Sistema de Notas e Faltas</h1>
          <small>ANA NERY BAURU - Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</small>
        </div>
      </div>

      {modo==='aluno' &&
        <div className="login-container">
          <h2>Consulta do Aluno</h2>
          <input placeholder="Nome do aluno" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)}/>
          <select value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}>
            <option value="">Selecione a turma</option>
            {turmas.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={buscarNotas}>Buscar</button>
          {notasEncontradas && (
            <div className="info-aluno">
              <h3>{notasEncontradas.nome}</h3>
              <div className="abas">
                <button className="ativa">Notas Teórico</button>
                <button>Notas Estágio</button>
              </div>
              <table>
                <thead>
                  <tr><th>Disciplina</th><th>Módulo</th><th>Nota/Faltas</th></tr>
                </thead>
                <tbody>
                  {Object.entries(notasEncontradas.disciplinas).map(([d, info])=>(
                    <tr key={d}>
                      <td>{d}</td>
                      <td>{info.modulo}</td>
                      <td>Teórico: {info.nota} | Estágio: {info.estagio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      }

      {modo==='professor' &&
        <div className="professor-container">
          {!autenticado &&
            <div className="login-container">
              <h2>Login do Professor</h2>
              <input type={mostrarSenha?"text":"password"} placeholder="Senha" value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)}/>
              <label><input type="checkbox" checked={mostrarSenha} onChange={e=>setMostrarSenha(!mostrarSenha)}/> Mostrar senha</label>
              <button onClick={fazerLogin}>Entrar</button>
            </div>
          }
          {autenticado &&
            <>
              <div className="adicionar-aluno">
                <input placeholder="Nome do aluno" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno, nome:e.target.value})}/>
                <select value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
                  <option value="">Selecione a turma</option>
                  {turmas.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                <button onClick={adicionarAluno}><Plus size={16}/> Adicionar</button>
              </div>
              {turmas.map(t=>(
                <div key={t}>
                  <h3>{t}</h3>
                  <div className="lista-alunos">
                    {alunos[t]?.sort((a,b)=>a.nome.localeCompare(b.nome)).map(a=>(
                      <div key={a.nome} className="aluno-item" onClick={()=>setNotasEncontradas(a)}>
                        {a.nome}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          }
        </div>
      }

      <div style={{textAlign:'center', marginTop:20}}>
        <button onClick={()=>setModo(modo==='aluno'?'professor':'aluno')}>{modo==='aluno'?'Área do Professor':'Área do Aluno'}</button>
      </div>
    </div>
  );
}
