import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Plus } from 'lucide-react';

export default function App() {
  const [modo, setModo] = useState('aluno');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  
  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);

  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });
  const [alunos, setAlunos] = useState({});

  const SENHA_PADRAO = 'admin123';

  // Disciplinas pré-definidas por turma
  const disciplinasPorTurma = {
    TEM2: [
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
      { nome: 'Gestão em Enfermagem', modulo: 2, cargaTeorica: 40, cargaEstagio: 0 }
    ],
    TRN1: [
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
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 2, cargaTeorica: 100, cargaEstagio: 160 },
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 3, cargaTeorica: 0, cargaEstagio: 100 }
    ],
    TRN2: [
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
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 2, cargaTeorica: 100, cargaEstagio: 160 },
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 3, cargaTeorica: 0, cargaEstagio: 100 }
    ],
    TRN3: [
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
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 2, cargaTeorica: 100, cargaEstagio: 160 },
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 3, cargaTeorica: 0, cargaEstagio: 100 }
    ]
  };

  // ----------------- Funções para LocalStorage -----------------
  useEffect(() => {
    const turmasData = JSON.parse(localStorage.getItem('turmas')) || Object.keys(disciplinasPorTurma);
    setTurmas(turmasData);

    const alunosCarregados = {};
    turmasData.forEach(turma => {
      const data = JSON.parse(localStorage.getItem(`alunos_${turma}`)) || [];
      alunosCarregados[turma] = data;
    });
    setAlunos(alunosCarregados);
  }, []);

  const salvarAlunos = (turma, dados) => {
    localStorage.setItem(`alunos_${turma}`, JSON.stringify(dados));
    setAlunos(prev => ({ ...prev, [turma]: dados }));
  };

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) {
      alert('Preencha nome e turma!');
      return;
    }
    const aluno = (alunos[turmaAluno] || []).find(a => a.nome.toLowerCase() === nomeAluno.toLowerCase());
    if (aluno) setNotasEncontradas(aluno);
    else alert('Aluno não encontrado!');
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno.nome.trim()) return;
    // Preenche disciplinas automaticamente
    if (!novoAluno.disciplinas || Object.keys(novoAluno.disciplinas).length === 0) {
      const disciplinas = {};
      disciplinasPorTurma[turmaSelecionada].forEach(d => {
        disciplinas[d.nome] = {
          modulo: d.modulo,
          cargaTeorica: d.cargaTeorica,
          cargaEstagio: d.cargaEstagio,
          nota: '',
          faltas: '',
          aprovado: ''
        };
      });
      novoAluno.disciplinas = disciplinas;
    }

    const lista = [...(alunos[turmaSelecionada] || []), novoAluno];
    lista.sort((a,b) => a.nome.localeCompare(b.nome));
    salvarAlunos(turmaSelecionada, lista);
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const atualizarDisciplina = (alunoIndex, disciplina, campo, valor) => {
    const lista = [...(alunos[turmaSelecionada] || [])];
    lista[alunoIndex].disciplinas[disciplina][campo] = valor;
    salvarAlunos(turmaSelecionada, lista);
  };

  const exportarDados = () => {
    const dados = { turmas, alunos };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_notas.json';
    a.click();
  };

  const importarDados = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dados = JSON.parse(event.target.result);
      if (dados.turmas && dados.alunos) {
        setTurmas(dados.turmas);
        Object.keys(dados.alunos).forEach(t => {
          salvarAlunos(t, dados.alunos[t]);
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <header className="flex items-center mb-4">
        <img src="/logo.png" alt="Logo" className="h-16 mr-4" />
        <h1 className="text-2xl font-bold">Sistema de Notas</h1>
      </header>

      <div className="mb-6">
        <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setModo('aluno')}>Aluno</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setModo('professor')}>Professor</button>
      </div>

      {modo === 'aluno' && (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Consultar Notas</h2>
          <input className="w-full mb-2 p-2 border rounded" placeholder="Nome do aluno" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)} />
          <select className="w-full mb-2 p-2 border rounded" value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}>
            <option value="">Selecione a turma</option>
            {turmas.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <button className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={buscarNotas}>Buscar</button>
          {notasEncontradas && (
            <div>
              {Object.keys(notasEncontradas.disciplinas).map(disc => (
                <div key={disc} className="mb-2 border p-2 rounded">
                  <strong>{disc}</strong> (Módulo {notasEncontradas.disciplinas[disc].modulo})<br/>
                  Teoria: {notasEncontradas.disciplinas[disc].cargaTeorica}h | Estágio: {notasEncontradas.disciplinas[disc].cargaEstagio}h<br/>
                  Nota: {notasEncontradas.disciplinas[disc].nota || '-'} | Faltas: {notasEncontradas.disciplinas[disc].faltas || '-'} | Status: {notasEncontradas.disciplinas[disc].aprovado || '-'}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {modo === 'professor' && (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
          {!autenticado ? (
            <div>
              <h2 className="text-xl font-bold mb-2">Login do Professor</h2>
              <input className="w-full mb-2 p-2 border rounded" type="password" placeholder="Senha" value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)} />
              <button className="w-full px-4 py-2 bg-green-500 text-white rounded" onClick={fazerLogin}>Entrar</button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">Área do Professor</h2>
              <div className="flex mb-4 items-center">
                <select className="p-2 border rounded mr-2" value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
                  <option value="">Selecione a turma</option>
                  {turmas.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                <input className="p-2 border rounded mr-2 flex-1" placeholder="Nome do aluno" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno, nome: e.target.value})} />
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={adicionarAluno}>Adicionar Aluno</button>
              </div>

              <div className="mb-4">
                <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={exportarDados}>Exportar Backup</button>
                <input type="file" className="hidden" id="importFile" onChange={importarDados} />
                <label htmlFor="importFile" className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Importar Backup</label>
              </div>

              {turmaSelecionada && alunos[turmaSelecionada]?.length > 0 && (
                <div>
                  {alunos[turmaSelecionada].sort((a,b)=>a.nome.localeCompare(b.nome)).map((aluno,index)=>(
                    <details key={aluno.nome} className="mb-2 border p-2 rounded">
                      <summary className="font-bold cursor-pointer">{aluno.nome}</summary>
                      {Object.keys(aluno.disciplinas).map(disc => (
                        <div key={disc} className="mb-1 border p-1 rounded">
                          <strong>{disc}</strong> (Módulo <input className="w-12 inline border p-1 rounded" type="number" value={aluno.disciplinas[disc].modulo} onChange={e=>atualizarDisciplina(index, disc, 'modulo', e.target.value)} />)<br/>
                          Carga Teórica: <input className="w-16 inline border p-1 rounded" type="number" value={aluno.disciplinas[disc].cargaTeorica} onChange={e=>atualizarDisciplina(index, disc, 'cargaTeorica', e.target.value)} />h<br/>
                          Carga Estágio: <input className="w-16 inline border p-1 rounded" type="number" value={aluno.disciplinas[disc].cargaEstagio} onChange={e=>atualizarDisciplina(index, disc, 'cargaEstagio', e.target.value)} />h<br/>
                          Nota: <input className="w-16 inline border p-1 rounded" type="text" value={aluno.disciplinas[disc].nota} onChange={e=>atualizarDisciplina(index, disc, 'nota', e.target.value)} /> | 
                          Faltas: <input className="w-16 inline border p-1 rounded" type="text" value={aluno.disciplinas[disc].faltas} onChange={e=>atualizarDisciplina(index, disc, 'faltas', e.target.value)} /> | 
                          Status: <input className="w-16 inline border p-1 rounded" type="text" value={aluno.disciplinas[disc].aprovado} onChange={e=>atualizarDisciplina(index, disc, 'aprovado', e.target.value)} />
                        </div>
                      ))}
                    </details>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

