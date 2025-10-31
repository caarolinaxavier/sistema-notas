import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';

export default function App() {
  const SENHA_PADRAO = 'admin123';
  const [modo, setModo] = useState('aluno'); // aluno ou professor
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState({});
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });
  const [novaTurma, setNovaTurma] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  // Todas as disciplinas organizadas por turma
  const disciplinas = {
    ENFERMAGEM: [
      { nome: "Técnicas Básicas de Enfermagem", modulo: 1, teorica: 130, estagio: 150 },
      { nome: "Anatomia e Fisiologia humanas", modulo: 1, teorica: 80, estagio: 0 },
      { nome: "Nutrição e Dietética", modulo: 1, teorica: 30, estagio: 0 },
      { nome: "Microbiologia e Parasitologia", modulo: 1, teorica: 40, estagio: 0 },
      { nome: "Primeiros Socorros", modulo: 1, teorica: 40, estagio: 0 },
      { nome: "Farmacologia Aplicada à Enfermagem", modulo: 1, teorica: 40, estagio: 0 },
      { nome: "Ética Profissional I", modulo: 1, teorica: 20, estagio: 0 },
      { nome: "Psicologia Aplicada à Enfermagem", modulo: 1, teorica: 30, estagio: 0 },
      { nome: "Enfermagem Médica", modulo: 1, teorica: 70, estagio: 90 },
      { nome: "Enfermagem em Saúde Coletiva e Higiene", modulo: 1, teorica: 40, estagio: 40 },
      { nome: "Enfermagem em Centro Cirúrgico", modulo: 1, teorica: 40, estagio: 20 },
      { nome: "Enfermagem Cirúrgica", modulo: 1, teorica: 70, estagio: 60 },
      { nome: "Enf. no Processo de Cuidar em Materno Infantil I", modulo: 1, teorica: 60, estagio: 40 },
      { nome: "Enfermagem em Geriatria", modulo: 1, teorica: 20, estagio: 0 },
      { nome: "Administração em Unidade de Enfermagem", modulo: 2, teorica: 50, estagio: 24 },
      { nome: "Enfermagem em Saúde Pública", modulo: 2, teorica: 50, estagio: 40 },
      { nome: "Enf. no Processo de cuidar em Materno-Infantil II", modulo: 2, teorica: 60, estagio: 20 },
      { nome: "Enf. em Centro Cirúrgico e Central de Material de Esterilização", modulo: 2, teorica: 40, estagio: 20 },
      { nome: "Enf. no Cuidado de Paciente de Alta Dependência", modulo: 2, teorica: 100, estagio: 20 },
      { nome: "Enfermagem em Urgência e Emergência", modulo: 2, teorica: 70, estagio: 76 },
      { nome: "Enfermagem em Saúde Mental", modulo: 2, teorica: 30, estagio: 0 },
      { nome: "Enfermagem Domiciliária", modulo: 2, teorica: 30, estagio: 0 },
      { nome: "Ética Profissional II", modulo: 2, teorica: 20, estagio: 0 },
      { nome: "Gestão em Enfermagem", modulo: 2, teorica: 40, estagio: 0 },
    ],
    TRN1: [
      { nome: "Anatomia Básica", modulo: 1, teorica: 100, estagio: 0 },
      { nome: "Radiologia Elementar", modulo: 1, teorica: 20, estagio: 0 },
      { nome: "Psicologia e Ética", modulo: 1, teorica: 40, estagio: 0 },
      { nome: "Fisiologia Humana", modulo: 1, teorica: 50, estagio: 0 },
      { nome: "Física Radiológica", modulo: 1, teorica: 40, estagio: 0 },
      { nome: "Proteção Radiológica1", modulo: 1, teorica: 40, estagio: 0 },
      { nome: "Patologia", modulo: 1, teorica: 50, estagio: 0 },
      { nome: "Primeiros Socorros", modulo: 1, teorica: 30, estagio: 0 },
      { nome: "Atomística", modulo: 1, teorica: 30, estagio: 0 },
      { nome: "Processamento de Imagens", modulo: 1, teorica: 40, estagio: 40 },
      { nome: "Princípios Básicos de Posicionamento", modulo: 1, teorica: 30, estagio: 40 },
      { nome: "Técnicas de Posicionamento em Diagnóstico Médico", modulo: 3, teorica: 0, estagio: 100 },
    ],
    TRN2: [
      { nome: "Técnicas de Posicionamento em Diagnóstico Médico", modulo: 2, teorica: 100, estagio: 160 },
      { nome: "Exames Contrastados", modulo: 3, teorica: 70, estagio: 60 },
      { nome: "Mamografia", modulo: 3, teorica: 40, estagio: 0 },
      { nome: "Técnica de Posicionamento Especial", modulo: 3, teorica: 40, estagio: 0 },
      { nome: "Radiologia Veterinária", modulo: 3, teorica: 30, estagio: 0 },
      { nome: "Radiologia Odontológica", modulo: 3, teorica: 30, estagio: 0 },
      { nome: "Radioterapia", modulo: 3, teorica: 30, estagio: 0 },
      { nome: "Radioisotopia e Medicina Nuclear", modulo: 3, teorica: 30, estagio: 0 },
      { nome: "Radiologia Industrial", modulo: 3, teorica: 30, estagio: 0 },
      { nome: "Anatomia Radiológica2", modulo: 3, teorica: 60, estagio: 0 },
    ],
    TRN3: [
      { nome: "Exames Contrastados", modulo: 3, teorica: 70, estagio: 60 },
      { nome: "Mamografia", modulo: 3, teorica: 40, estagio: 0 },
      { nome: "Técnica de Posicionamento Especial", modulo: 3, teorica: 40, estagio: 0 },
    ],
    N1: [
      { nome: "Anatomia", modulo: 1, teorica: 60, estagio: 0 },
      { nome: "Biologia", modulo: 1, teorica: 20, estagio: 0 },
      { nome: "Higiene Biossegurança", modulo: 1, teorica: 32, estagio: 0 },
      { nome: "Fisiologia", modulo: 1, teorica: 44, estagio: 0 },
      { nome: "Ética Profissional", modulo: 1, teorica: 24, estagio: 0 },
      { nome: "Língua Portuguesa", modulo: 1, teorica: 28, estagio: 0 },
      { nome: "Medicina Legal", modulo: 1, teorica: 32, estagio: 0 },
      { nome: "Raciocínio Lógico", modulo: 1, teorica: 28, estagio: 0 },
      { nome: "Tanatologia Forense", modulo: 1, teorica: 24, estagio: 0 },
      { nome: "Técnicas de Necropsia", modulo: 1, teorica: 40, estagio: 0 },
      { nome: "Traumatologia Forense", modulo: 1, teorica: 28, estagio: 0 },
    ],
  };

  useEffect(() => {
    const turmasLS = JSON.parse(localStorage.getItem('turmas') || '[]');
    setTurmas(turmasLS);
    const alunosLS = {};
    turmasLS.forEach(turma => {
      alunosLS[turma] = JSON.parse(localStorage.getItem(`alunos_${turma}`) || '[]');
    });
    setAlunos(alunosLS);
  }, []);

  const salvarTurmas = (novasTurmas) => {
    setTurmas(novasTurmas);
    localStorage.setItem('turmas', JSON.stringify(novasTurmas));
  };

  const salvarAlunos = (turma, listaAlunos) => {
    setAlunos(prev => ({ ...prev, [turma]: listaAlunos }));
    localStorage.setItem(`alunos_${turma}`, JSON.stringify(listaAlunos));
  };

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const adicionarTurma = () => {
    if (!turmas.includes(novaTurma) && novaTurma.trim()) {
      salvarTurmas([...turmas, novaTurma]);
      salvarAlunos(novaTurma, []);
      setNovaTurma('');
    }
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno.nome.trim()) return;
    const disciplinasDaTurma = disciplinas[turmaSelecionada] || [];
    const disciplinasFormatadas = {};
    disciplinasDaTurma.forEach(d => {
      disciplinasFormatadas[d.nome] = {
        nota: '',
        faltas: '',
        aprovado: '',
        teorica: d.teorica,
        estagio: d.estagio,
        modulo: d.modulo
      };
    });
    const alunoFinal = { ...novoAluno, disciplinas: disciplinasFormatadas };
    const lista = [...(alunos[turmaSelecionada] || []), alunoFinal].sort((a,b)=>a.nome.localeCompare(b.nome));
    salvarAlunos(turmaSelecionada, lista);
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const exportarDados = () => {
    const dados = { turmas, alunos };
    const blob = new Blob([JSON.stringify(dados,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='backup.json'; a.click();
  };

  const importarDados = (e) => {
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = (event)=>{
      const dados = JSON.parse(event.target.result);
      if(dados.turmas && dados.alunos){
        salvarTurmas(dados.turmas);
        dados.turmas.forEach(t=>{
          salvarAlunos(t, dados.alunos[t] || []);
        });
      }
    }; reader.readAsText(file);
  };

  return (
    <div className="App">
      <header>
        <img src={logo} alt="Logo" className="logo"/>
        <h1>Sistema de Notas e Estágio</h1>
      </header>
      <div className="modo-toggle">
        <button onClick={()=>setModo('aluno')}>Aluno</button>
        <button onClick={()=>setModo('professor')}>Professor</button>
      </div>
      {modo==='aluno' && (
        <div className="aluno">
          <input placeholder="Nome do aluno" value={alunoSelecionado?.nome || ''} disabled />
          <select value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
            <option value="">Selecione a turma</option>
            {turmas.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={()=>alert('Aqui vai exibir notas e estágio')}>Ver Notas</button>
        </div>
      )}
      {modo==='professor' && !autenticado && (
        <div className="login">
          <input type="password" placeholder="Senha" value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)} />
          <button onClick={fazerLogin}>Entrar</button>
        </div>
      )}
      {modo==='professor' && autenticado && (
        <div className="professor">
          <h2>Gerenciar Turmas</h2>
          <input placeholder="Nova turma" value={novaTurma} onChange={e=>setNovaTurma(e.target.value)} />
          <button onClick={adicionarTurma}>Adicionar Turma</button>
          <select value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
            <option value="">Selecione a turma</option>
            {turmas.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <input placeholder="Nome do aluno" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno,nome:e.target.value})} />
          <button onClick={adicionarAluno}>Adicionar Aluno</button>
          <button onClick={exportarDados}>Backup</button>
          <input type="file" onChange={importarDados} />
          {turmaSelecionada && alunos[turmaSelecionada] && (
            <div className="lista-alunos">
              {alunos[turmaSelecionada].map(aluno => (
                <div key={aluno.nome} onClick={()=>setAlunoSelecionado(aluno)}>
                  {aluno.nome}
                </div>
              ))}
            </div>
          )}
          {alunoSelecionado && (
            <div className="detalhes-aluno">
              <h3>{alunoSelecionado.nome}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Módulo</th>
                    <th>Teórica</th>
                    <th>Estágio</th>
                    <th>Nota</th>
                    <th>Faltas</th>
                    <th>Aprovado/Retido</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(alunoSelecionado.disciplinas).map(([nome,dados])=>(
                    <tr key={nome}>
                      <td>{nome}</td>
                      <td>{dados.modulo}</td>
                      <td><input type="number" value={dados.teorica} onChange={e=>dados.teorica=e.target.value} /></td>
                      <td><input type="number" value={dados.estagio} onChange={e=>dados.estagio=e.target.value} /></td>
                      <td><input type="text" value={dados.nota} onChange={e=>dados.nota=e.target.value} /></td>
                      <td><input type="text" value={dados.faltas} onChange={e=>dados.faltas=e.target.value} /></td>
                      <td><input type="text" value={dados.aprovado} onChange={e=>dados.aprovado=e.target.value} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
