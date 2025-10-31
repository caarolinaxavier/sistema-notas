import React, { useState, useEffect } from 'react';
import { Search, Upload, Eye, EyeOff, Download, Trash2, Plus } from 'lucide-react';

export default function App() {
  const [modo, setModo] = useState('aluno'); // aluno ou admin
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);

  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novaTurma, setNovaTurma] = useState('');
  const [alunos, setAlunos] = useState({});
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  // Dados iniciais de disciplinas por curso
  const disciplinasIniciais = {
    // ENFERMAGEM
    TEM2: [
      { nome: 'Técnicas Básicas de Enfermagem', modulo: 1, cargaTeorica: 130, cargaEstagio: 150 },
      { nome: 'Anatomia e Fisiologia humanas', modulo: 1, cargaTeorica: 80 },
      { nome: 'Nutrição e Dietética', modulo: 1, cargaTeorica: 30 },
      { nome: 'Microbiologia e Parasitologia', modulo: 1, cargaTeorica: 40 },
      { nome: 'Primeiros Socorros', modulo: 1, cargaTeorica: 40 },
      { nome: 'Farmacologia Aplicada à Enfermagem', modulo: 1, cargaTeorica: 40 },
      { nome: 'Ética Profissional I', modulo: 1, cargaTeorica: 20 },
      { nome: 'Psicologia Aplicada à Enfermagem', modulo: 1, cargaTeorica: 30 },
      { nome: 'Enfermagem Médica', modulo: 1, cargaTeorica: 70, cargaEstagio: 90 },
      { nome: 'Enfermagem em Saúde Coletiva e Higiene', modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
      { nome: 'Enfermagem em Centro Cirúrgico', modulo: 1, cargaTeorica: 40, cargaEstagio: 20 },
      { nome: 'Enfermagem Cirúrgica', modulo: 1, cargaTeorica: 70, cargaEstagio: 60 },
      { nome: 'Enf. no Processo de Cuidar em Materno Infantil I', modulo: 1, cargaTeorica: 60, cargaEstagio: 40 },
      { nome: 'Enfermagem em Geriatria', modulo: 1, cargaTeorica: 20 },
      { nome: 'Administração em Unidade de Enfermagem', modulo: 2, cargaTeorica: 50, cargaEstagio: 24 },
      { nome: 'Enfermagem em Saúde Pública', modulo: 2, cargaTeorica: 50, cargaEstagio: 40 },
      { nome: 'Enf. no Processo de cuidar em Materno-Infantil II', modulo: 2, cargaTeorica: 60, cargaEstagio: 20 },
      { nome: 'Enf. em Centro Cirúrgico e Central de Material de Esterilização', modulo: 2, cargaTeorica: 40, cargaEstagio: 20 },
      { nome: 'Enf. no Cuidado de Paciente de Alta Dependência', modulo: 2, cargaTeorica: 100, cargaEstagio: 20 },
      { nome: 'Enfermagem em Urgência e Emergência', modulo: 2, cargaTeorica: 70, cargaEstagio: 76 },
      { nome: 'Enfermagem em Saúde Mental', modulo: 2, cargaTeorica: 30 },
      { nome: 'Enfermagem Domiciliária', modulo: 2, cargaTeorica: 30 },
      { nome: 'Ética Profissional II', modulo: 2, cargaTeorica: 20 },
      { nome: 'Gestão em Enfermagem', modulo: 2, cargaTeorica: 40 },
    ],
    TEM3: [], TEM4: [], TEM5: [], TEN2: [], TEN3: [], TEN4: [], TEN5: [], TEN6: [], TEN7: [],
    // RADIOLGIA
    TRN1: [
      { nome: 'Anatomia Básica', modulo: 1, cargaTeorica: 100 },
      { nome: 'Radiologia Elementar', modulo: 1, cargaTeorica: 20 },
      { nome: 'Psicologia e Ética', modulo: 1, cargaTeorica: 40 },
      { nome: 'Fisiologia Humana', modulo: 1, cargaTeorica: 50 },
      { nome: 'Física Radiológica', modulo: 1, cargaTeorica: 40 },
      { nome: 'Proteção Radiológica1', modulo: 1, cargaTeorica: 40 },
      { nome: 'Patologia', modulo: 1, cargaTeorica: 50 },
      { nome: 'Primeiros Socorros', modulo: 1, cargaTeorica: 30 },
      { nome: 'Atomística', modulo: 1, cargaTeorica: 30 },
      { nome: 'Processamento de Imagens', modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
      { nome: 'Princípios Básicos de Posicionamento', modulo: 1, cargaTeorica: 30, cargaEstagio: 40 },
    ],
    TRN2: [], 
    // NECROPSIA
    N1: [
      { nome: 'Anatomia', modulo: 1, cargaTeorica: 60 },
      { nome: 'Biologia', modulo: 1, cargaTeorica: 20 },
      { nome: 'Higiene Biossegurança', modulo: 1, cargaTeorica: 32 },
      { nome: 'Fisiologia', modulo: 1, cargaTeorica: 44 },
      { nome: 'Ética Profissional', modulo: 1, cargaTeorica: 24 },
      { nome: 'Língua Portuguesa', modulo: 1, cargaTeorica: 28 },
      { nome: 'Medicina Legal', modulo: 1, cargaTeorica: 32 },
      { nome: 'Raciocínio Lógico', modulo: 1, cargaTeorica: 28 },
      { nome: 'Tanatologia Forense', modulo: 1, cargaTeorica: 24 },
      { nome: 'Técnicas de Necropsia', modulo: 1, cargaTeorica: 40 },
      { nome: 'Traumatologia Forense', modulo: 1, cargaTeorica: 28 },
    ]
  };

  // ---------- useEffect para carregar dados ----------
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    try {
      // carregar turmas
      let turmasData = localStorage.getItem('turmas');
      if (!turmasData) {
        // Primeira vez: carregar todas as turmas iniciais
        const turmasIniciais = Object.keys(disciplinasIniciais);
        salvarTurmas(turmasIniciais);

        // Criar alunos vazios por turma com disciplinas prontas
        const alunosInit = {};
        turmasIniciais.forEach(turma => {
          alunosInit[turma] = []; // sem alunos ainda
        });
        setAlunos(alunosInit);
        localStorage.setItem('alunos', JSON.stringify(alunosInit));
      } else {
        setTurmas(JSON.parse(turmasData));
        const alunosData = localStorage.getItem('alunos');
        if (alunosData) setAlunos(JSON.parse(alunosData));
      }
    } catch (e) {
      console.log('Primeira vez usando o sistema');
    }
  };

  const salvarTurmas = (novasTurmas) => {
    localStorage.setItem('turmas', JSON.stringify(novasTurmas));
    setTurmas(novasTurmas);
  };

  const salvarAlunos = (turma, alunosTurma) => {
    const todosAlunos = { ...alunos, [turma]: alunosTurma };
    setAlunos(todosAlunos);
    localStorage.setItem('alunos', JSON.stringify(todosAlunos));
  };

  // ---------- Login ----------
  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  // ---------- Buscar Notas ----------
  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) {
      alert('Preencha seu nome e turma!');
      return;
    }
    const aluno = (alunos[turmaAluno] || []).find(a => a.nome.toLowerCase() === nomeAluno.toLowerCase());
    if (aluno) setNotasEncontradas(aluno);
    else {
      setNotasEncontradas(null);
      alert('Aluno não encontrado nesta turma!');
    }
  };

  // ---------- Adicionar/Remover Turma ----------
  const adicionarTurma = () => {
    if (!novaTurma.trim()) return;
    if (turmas.includes(novaTurma)) { alert('Turma já existe!'); return; }
    const novasTurmas = [...turmas, novaTurma];
    salvarTurmas(novasTurmas);
    salvarAlunos(novaTurma, []);
    setNovaTurma('');
  };

  const removerTurma = (turma) => {
    if (!confirm(`Remover turma ${turma}?`)) return;
    const novasTurmas = turmas.filter(t => t !== turma);
    salvarTurmas(novasTurmas);
    const novosAlunos = { ...alunos };
    delete novosAlunos[turma];
    setAlunos(novosAlunos);
  };

  // ---------- Adicionar/Remover Aluno ----------
  const adicionarAluno = () => {
    if (!turmaSelecionada) { alert('Selecione uma turma!'); return; }
    if (!novoAluno.nome.trim()) { alert('Digite o nome do aluno!'); return; }

    // Preencher disciplinas iniciais se não existir
    const disciplinasPadrao = disciplinasIniciais[turmaSelecionada] || [];
    const disciplinasObj = {};
    disciplinasPadrao.forEach(d => {
      disciplinasObj[d.nome] = {
        nota: '',
        faltas: '',
        aprovado: '',
        cargaTeorica: d.cargaTeorica,
        cargaEstagio: d.cargaEstagio || '',
        modulo: d.modulo
      };
    });

    const alunoCompleto = { ...novoAluno, disciplinas: disciplinasObj };

    const alunosTurma = alunos[turmaSelecionada] || [];
    salvarAlunos(turmaSelecionada, [...alunosTurma, alunoCompleto]);
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const removerAluno = (index) => {
    if (!confirm('Remover este aluno?')) return;
    const alunosTurma = alunos[turmaSelecionada] || [];
    const novosAlunos = alunosTurma.filter((_, i) => i !== index);
    salvarAlunos(turmaSelecionada, novosAlunos);
  };

  // ---------- Atualizar campos ----------
  const atualizarDisciplina = (alunoIndex, disciplina, campo, valor) => {
    const alunosTurma = alunos[turmaSelecionada];
    alunosTurma[alunoIndex].disciplinas[disciplina][campo] = valor;
    salvarAlunos(turmaSelecionada, alunosTurma);
  };

  // ---------- Exportar/Importar ----------
  const exportarDados = () => {
    const blob = new Blob([JSON.stringify({ turmas, alunos }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notas_backup.json';
    a.click();
  };

  const importarDados = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const dados = JSON.parse(event.target.result);
        if (dados.turmas && dados.alunos) {
          salvarTurmas(dados.turmas);
          setAlunos(dados.alunos);
          alert('Dados importados com sucesso!');
        } else alert('Arquivo inválido!');
      } catch {
        alert('Erro ao importar dados!');
      }
    };
    reader.readAsText(file);
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-1">ANA NERY BAURU</div>
            <div className="text-xs text-gray-500 mb-4">Sistema Integrado de Ensino Técnico LTDA</div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-red-600">Sistema de Notas e Faltas</h1>
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => { setModo('aluno'); setAutenticado(false); setSenhaAdmin(''); }}
              className={`px-6 py-2 rounded-lg font-medium transition ${modo==='aluno'? 'bg-blue-600 text-white':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Consultar Notas
            </button>
            <button onClick={() => setModo('admin')}
              className={`px-6 py-2 rounded-lg font-medium transition ${modo==='admin'? 'bg-red-600 text-white':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Área do Professor
            </button>
          </div>
        </div>

        {/** Tela do aluno */}
        {modo==='aluno' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consultar Minhas Notas e Faltas</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Seu nome completo" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg" />
              <select value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg">
                <option value="">Selecione sua turma</option>
                {turmas.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={buscarNotas} className="w-full bg-blue-600 text-white py-2 rounded-lg">Buscar Notas</button>
            </div>

            {notasEncontradas && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
                <h3 className="font-semibold text-green-800 text-xl">{notasEncontradas.nome}</h3>
                {Object.entries(notasEncontradas.disciplinas).map(([disc, dados])=>(
                  <div key={disc} className="bg-white p-3 rounded shadow-sm">
                    <div className="font-medium">{disc} (Módulo {dados.modulo})</div>
                    <div className="flex gap-4 text-sm mt-1">
                      <span>Nota: <strong>{dados.nota || '-'}</strong></span>
                      <span>Faltas: <strong>{dados.faltas || '-'}</strong></span>
                      <span>Aprovado: <strong>{dados.aprovado || '-'}</strong></span>
                      <span>Carga Teórica: {dados.cargaTeorica}</span>
                      {dados.cargaEstagio ? <span>Estágio: {dados.cargaEstagio}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/** Tela admin */}
        {modo==='admin' && !autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login do Professor</h2>
            <input type={mostrarSenha?'text':'password'} value={senhaAdmin} 
              onChange={e=>setSenhaAdmin(e.target.value)} placeholder="Senha"
              className="w-full px-4 py-2 border rounded-lg mb-2"/>
            <button onClick={fazerLogin} className="w-full bg-red-600 text-white py-2 rounded-lg mb-2">Entrar</button>
            <button onClick={()=>setMostrarSenha(!mostrarSenha)} className="text-sm text-gray-600">
              {mostrarSenha?'Ocultar senha':'Mostrar senha
