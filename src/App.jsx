import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const SENHA_PADRAO = 'admin123';
  const [modo, setModo] = useState('aluno'); // aluno ou professor
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novoAluno, setNovoAluno] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('notas');

  // Turmas
  const turmas = [
    'TEM2','TEM3','TEM4','TEM5','TEN2','TEN3','TEN4','TEN5','TEN6','TEN7',
    'TRN1','TRN2','TRN3','N1'
  ];

  // Disciplinas completas
  const disciplinas = {
    ENFERMAGEM: [
      { nome: 'Técnicas Básicas de Enfermagem', modulo: 1, cargaTeorica: 130, cargaEstagio: 150 },
      { nome: 'Anatomia e Fisiologia humanas', modulo: 1, cargaTeorica: 80, cargaEstagio: 0 },
      { nome: 'Nutrição e Dietética', modulo: 1, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Microbiologia e Parasitologia', modulo: 1, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Primeiros Socorros', modulo: 1, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Farmacologia Aplicada à Enfermagem', modulo: 1, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Ética Profissional I', modulo: 1, cargaTeorica: 20, cargaEstagio: 0 },
      { nome: 'Psicologia Aplicada à Enfermagem', modulo: 1, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Enfermagem Médica', modulo: 1, cargaTeorica: 70, cargaEstagio: 90 },
      { nome: 'Enfermagem em Saúde Coletiva e Higiene', modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
      { nome: 'Enfermagem em Centro Cirúrgico', modulo: 1, cargaTeorica: 40, cargaEstagio: 20 },
      { nome: 'Enfermagem Cirúrgica', modulo: 1, cargaTeorica: 70, cargaEstagio: 60 },
      { nome: 'Enf. no Processo de Cuidar em Materno Infantil I', modulo: 1, cargaTeorica: 60, cargaEstagio: 40 },
      { nome: 'Enfermagem em Geriatria', modulo: 1, cargaTeorica: 20, cargaEstagio: 0 },
      { nome: 'Administração em Unidade de Enfermagem', modulo: 2, cargaTeorica: 50, cargaEstagio: 24 },
      { nome: 'Enfermagem em Saúde Pública', modulo: 2, cargaTeorica: 50, cargaEstagio: 40 },
      { nome: 'Enf. no Processo de cuidar em Materno-Infantil II', modulo: 2, cargaTeorica: 60, cargaEstagio: 20 },
      { nome: 'Enf. em Centro Cirúrgico e Central de Material de Esterilização', modulo: 2, cargaTeorica: 40, cargaEstagio: 20 },
      { nome: 'Enf. no Cuidado de Paciente de Alta Dependência', modulo: 2, cargaTeorica: 100, cargaEstagio: 20 },
      { nome: 'Enfermagem em Urgência e Emergência', modulo: 2, cargaTeorica: 70, cargaEstagio: 76 },
      { nome: 'Enfermagem em Saúde Mental', modulo: 2, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Enfermagem Domiciliária', modulo: 2, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Ética Profissional II', modulo: 2, cargaTeorica: 20, cargaEstagio: 0 },
      { nome: 'Gestão em Enfermagem', modulo: 2, cargaTeorica: 40, cargaEstagio: 0 },
    ],
    RADIOLOGIA: [
      { nome: 'Anatomia Básica', modulo: 1, cargaTeorica: 100, cargaEstagio: 0 },
      { nome: 'Radiologia Elementar', modulo: 1, cargaTeorica: 20, cargaEstagio: 0 },
      { nome: 'Psicologia e Ética', modulo: 1, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Fisiologia Humana', modulo: 1, cargaTeorica: 50, cargaEstagio: 0 },
      { nome: 'Física Radiológica', modulo: 1, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Proteção Radiológica1', modulo: 1, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Patologia', modulo: 1, cargaTeorica: 50, cargaEstagio: 0 },
      { nome: 'Primeiros Socorros', modulo: 1, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Atomística', modulo: 1, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Processamento de Imagens', modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
      { nome: 'Princípios Básicos de Posicionamento', modulo: 1, cargaTeorica: 30, cargaEstagio: 40 },
      { nome: 'Políticas de Saúde', modulo: 2, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Anatomia Radiológica1', modulo: 2, cargaTeorica: 70, cargaEstagio: 0 },
      { nome: 'Legislação Radiológica, Previdenciária e Trabalhista', modulo: 2, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Administração de Serviços Radiológicos', modulo: 2, cargaTeorica: 20, cargaEstagio: 0 },
      { nome: 'Farmacologia', modulo: 2, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Noções de Tomografia Computadorizada e Ressonância Magnética', modulo: 2, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Proteção Radiológica2', modulo: 2, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Técnicas de Posicionamento em Diagnóstico Médico', modulo: 2, cargaTeorica: 100, cargaEstagio: 160 },
      { nome: 'Exames Contrastados', modulo: 3, cargaTeorica: 70, cargaEstagio: 60 },
      { nome: 'Mamografia', modulo: 3, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Técnica de Posicionamento Especial', modulo: 3, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Radiologia Veterinária', modulo: 3, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Radiologia Odontológica', modulo: 3, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Radioterapia', modulo: 3, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Radioisotopia e Medicina Nuclear', modulo: 3, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Radiologia Industrial', modulo: 3, cargaTeorica: 30, cargaEstagio: 0 },
      { nome: 'Anatomia Radiológica2', modulo: 3, cargaTeorica: 60, cargaEstagio: 0 },
      { nome: 'Técnicas de Posicionamento em Diagnóstico Médico', modulo: 3, cargaTeorica: 0, cargaEstagio: 100 }
    ],
    NECROPSIA: [
      { nome: 'Anatomia', modulo: 1, cargaTeorica: 60, cargaEstagio: 0 },
      { nome: 'Biologia', modulo: 1, cargaTeorica: 20, cargaEstagio: 0 },
      { nome: 'Higiene Biossegurança', modulo: 1, cargaTeorica: 32, cargaEstagio: 0 },
      { nome: 'Fisiologia', modulo: 1, cargaTeorica: 44, cargaEstagio: 0 },
      { nome: 'Ética Profissional', modulo: 1, cargaTeorica: 24, cargaEstagio: 0 },
      { nome: 'Língua Portuguesa', modulo: 1, cargaTeorica: 28, cargaEstagio: 0 },
      { nome: 'Medicina Legal', modulo: 1, cargaTeorica: 32, cargaEstagio: 0 },
      { nome: 'Raciocínio Lógico', modulo: 1, cargaTeorica: 28, cargaEstagio: 0 },
      { nome: 'Tanatologia Forense', modulo: 1, cargaTeorica: 24, cargaEstagio: 0 },
      { nome: 'Técnicas de Necropsia', modulo: 1, cargaTeorica: 40, cargaEstagio: 0 },
      { nome: 'Traumatologia Forense', modulo: 1, cargaTeorica: 28, cargaEstagio: 0 }
    ]
  };

  const [alunos, setAlunos] = useState({});

  // Carrega do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('alunos');
    if (stored) setAlunos(JSON.parse(stored));
  }, []);

  const salvarAlunos = (novoAlunos) => {
    setAlunos(novoAlunos);
    localStorage.setItem('alunos', JSON.stringify(novoAlunos));
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno) return;
    const turmaAtual = alunos[turmaSelecionada] || [];
    const tipoCurso = turmaSelecionada.includes('TRN') ? 'RADIOLOGIA' : turmaSelecionada.includes('N') ? 'NECROPSIA' : 'ENFERMAGEM';
    turmaAtual.push({
      nome: novoAluno,
      disciplinas: disciplinas[tipoCurso].map(d => ({ ...d, nota: '', faltas: '', aprovado: '' }))
    });
    salvarAlunos({ ...alunos, [turmaSelecionada]: turmaAtual });
    setNovoAluno('');
  };

  const atualizarAluno = (aluno, disciplinaIndex, campo, valor) => {
    const novoAlunos = { ...alunos };
    const index = novoAlunos[turmaSelecionada].indexOf(aluno);
    if (index > -1) {
      novoAlunos[turmaSelecionada][index].disciplinas[disciplinaIndex][campo] = valor;
      salvarAlunos(novoAlunos);
    }
  };

  const exportarDados = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(alunos));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "backup_alunos.json");
    dlAnchorElem.click();
  };

  const importarDados = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setAlunos(data);
      localStorage.setItem('alunos', JSON.stringify(data));
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1>Sistema de Notas e Faltas</h1>
      </header>

      {modo === 'professor' && !autenticado && (
        <div className="login-container">
          <h2>Login do Professor</h2>
          <input type={mostrarSenha ? "text" : "password"} placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
          <label>
            <input type="checkbox" checked={mostrarSenha} onChange={() => setMostrarSenha(!mostrarSenha)} /> Mostrar senha
          </label>
          <button onClick={() => senha === SENHA_PADRAO ? setAutenticado(true) : alert('Senha incorreta')}>Entrar</button>
        </div>
      )}

      {autenticado && (
        <div className="professor-container">
          <div className="adicionar-aluno">
            <select value={turmaSelecionada} onChange={e => setTurmaSelecionada(e.target.value)}>
              <option value="">Selecione a turma</option>
              {turmas.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input placeholder="Nome do aluno" value={novoAluno} onChange={e => setNovoAluno(e.target.value)} />
            <button onClick={adicionarAluno}>Adicionar</button>
            <button onClick={exportarDados}>Backup</button>
            <input type="file" onChange={importarDados} />
          </div>

          <div className="lista-alunos">
            {turmaSelecionada && alunos[turmaSelecionada]?.sort((a,b)=>a.nome.localeCompare(b.nome)).map((aluno,index)=>(
              <div key={index} className="aluno-item" onClick={()=>{setAlunoSelecionado(aluno); setAbaAtiva('notas')}}>
                {aluno.nome}
              </div>
            ))}
          </div>

          {alunoSelecionado && (
            <div className="info-aluno">
              <h3>{alunoSelecionado.nome}</h3>
              <div className="abas">
                {['notas','faltas','aprovado','estagio'].map(a=>(
                  <button key={a} className={abaAtiva===a?'ativa':''} onClick={()=>setAbaAtiva(a)}>{a.charAt(0).toUpperCase()+a.slice(1)}</button>
                ))}
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Módulo</th>
                    <th>Carga Teórica</th>
                    {abaAtiva==='estagio' && <th>Carga Estágio</th>}
                    {abaAtiva==='notas' && <th>Nota</th>}
                    {abaAtiva==='faltas' && <th>Faltas</th>}
                    {abaAtiva==='aprovado' && <th>Aprovado/Retido</th>}
                  </tr>
                </thead>
                <tbody>
                  {alunoSelecionado.disciplinas.map((disc,index)=>(
                    <tr key={index}>
                      <td>{disc.nome}</td>
                      <td><input type="number" value={disc.modulo} onChange={e=>atualizarAluno(alunoSelecionado,index,'modulo',parseInt(e.target.value)||0)} /></td>
                      <td><input type="number" value={disc.cargaTeorica} onChange={e=>atualizarAluno(alunoSelecionado,index,'cargaTeorica',parseInt(e.target.value)||0)} /></td>
                      {abaAtiva==='estagio' && <td><input type="number" value={disc.cargaEstagio} onChange={e=>atualizarAluno(alunoSelecionado,index,'cargaEstagio',parseInt(e.target.value)||0)} /></td>}
                      {abaAtiva==='notas' && <td><input type="text" value={disc.nota} onChange={e=>atualizarAluno(alunoSelecionado,index,'nota',e.target.value)} /></td>}
                      {abaAtiva==='faltas' && <td><input type="text" value={disc.faltas} onChange={e=>atualizarAluno(alunoSelecionado,index,'faltas',e.target.value)} /></td>}
                      {abaAtiva==='aprovado' && <td><input type="text" value={disc.aprovado} onChange={e=>atualizarAluno(alunoSelecionado,index,'aprovado',e.target.value)} /></td>}
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
