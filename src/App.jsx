import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Plus } from 'lucide-react';
import './App.css';

export default function App() {
  const [modo, setModo] = useState('aluno');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);

  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novaTurma, setNovaTurma] = useState('');
  const [alunos, setAlunos] = useState({});
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  const disciplinasPorTurma = {
    // Enfermagem
    TEM2: [...enfermagemDisciplinas()],
    TEM3: [...enfermagemDisciplinas()],
    TEM4: [...enfermagemDisciplinas()],
    TEM5: [...enfermagemDisciplinas()],
    TEN2: [...enfermagemDisciplinas()],
    TEN3: [...enfermagemDisciplinas()],
    TEN4: [...enfermagemDisciplinas()],
    TEN5: [...enfermagemDisciplinas()],
    TEN6: [...enfermagemDisciplinas()],
    TEN7: [...enfermagemDisciplinas()],
    // Radiologia
    TRN1: [...radiologiaDisciplinas()],
    TRN2: [...radiologiaDisciplinas()],
    // Necropsia
    N1: [...necropsiaDisciplinas()],
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    try {
      const turmasData = localStorage.getItem('turmas');
      if (turmasData) {
        const turmasCarregadas = JSON.parse(turmasData);
        setTurmas(turmasCarregadas);

        const alunosCarregados = {};
        turmasCarregadas.forEach(turma => {
          const alunosData = localStorage.getItem(`alunos_${turma}`);
          if (alunosData) {
            alunosCarregados[turma] = JSON.parse(alunosData);
          }
        });
        setAlunos(alunosCarregados);
      } else {
        // inicializa turmas
        const turmasInicial = Object.keys(disciplinasPorTurma);
        setTurmas(turmasInicial);
        turmasInicial.forEach(turma => salvarAlunos(turma, []));
      }
    } catch (error) {
      console.log('Erro ao carregar dados');
    }
  };

  const salvarTurmas = (novasTurmas) => {
    localStorage.setItem('turmas', JSON.stringify(novasTurmas));
    setTurmas(novasTurmas);
  };

  const salvarAlunos = (turma, alunosTurma) => {
    localStorage.setItem(`alunos_${turma}`, JSON.stringify(alunosTurma));
    setAlunos(prev => ({ ...prev, [turma]: alunosTurma }));
  };

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) {
      setAutenticado(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) {
      alert('Preencha seu nome e turma!');
      return;
    }
    const alunosTurma = alunos[turmaAluno] || [];
    const aluno = alunosTurma.find(a =>
      a.nome.toLowerCase() === nomeAluno.toLowerCase()
    );
    if (aluno) setNotasEncontradas(aluno);
    else {
      setNotasEncontradas(null);
      alert('Aluno não encontrado!');
    }
  };

  const adicionarTurma = () => {
    if (!novaTurma.trim()) return;
    if (turmas.includes(novaTurma)) {
      alert('Turma já existe!');
      return;
    }
    const novasTurmas = [...turmas, novaTurma];
    salvarTurmas(novasTurmas);
    salvarAlunos(novaTurma, []);
    setNovaTurma('');
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada) {
      alert('Selecione uma turma!');
      return;
    }
    if (!novoAluno.nome.trim()) {
      alert('Digite o nome do aluno!');
      return;
    }
    const alunosTurma = alunos[turmaSelecionada] || [];
    const alunoComDisciplinas = {
      ...novoAluno,
      disciplinas: disciplinasPorTurma[turmaSelecionada].reduce((acc, d) => {
        acc[d.nome] = { ...d, nota: '', faltas: '', aprovado: '' };
        return acc;
      }, {}),
    };
    const novosAlunos = [...alunosTurma, alunoComDisciplinas].sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );
    salvarAlunos(turmaSelecionada, novosAlunos);
    setNovoAluno({ nome: '', disciplinas: {} });
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
      try {
        const dados = JSON.parse(event.target.result);
        if (dados.turmas && dados.alunos) {
          salvarTurmas(dados.turmas);
          Object.keys(dados.alunos).forEach(t => salvarAlunos(t, dados.alunos[t]));
          carregarDados();
          alert('Dados importados com sucesso!');
        } else alert('Arquivo inválido!');
      } catch (err) {
        alert('Erro ao importar dados!');
      }
    };
    reader.readAsText(file);
  };

  // Funções para disciplinas
  function enfermagemDisciplinas() {
    return [
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
      { nome: 'Enf. em
