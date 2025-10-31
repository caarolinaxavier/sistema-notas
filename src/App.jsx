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
  const [novaTurma, setNovaTurma] = useState('');
  const [alunos, setAlunos] = useState({});
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  const disciplinas = {
    TEM2: [
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
      { nome: "Técnicas de Posicionamento em Diagnóstico Médico", modulo: 3, teorica: 0, estagio: 100 }, // Módulo 3, só estágio
      // adicionar mais disciplinas do TRN2/TRN3 se necessário
    ],
    TRN2: [], // copiar disciplinas do TRN1, adicionar diferenças de estagio se houver
    TRN3: [], 
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
    ]
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
          } else {
            alunosCarregados[turma] = [];
          }
        });
        setAlunos(alunosCarregados);
      }
    } catch (error) {
      console.log('Primeira vez usando o sistema');
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

    if (aluno) {
      setNotasEncontradas(aluno);
    } else {
      setNotasEncontradas(null);
      alert('Aluno não encontrado nesta turma!');
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
      alert('Selecione uma turma primeiro!');
      return;
    }

    if (!novoAluno.nome.trim()) {
      alert('Digite o nome do aluno!');
      return;
    }

    // adiciona disciplinas automaticamente conforme turma
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

    const alunoFinal = { 
      ...novoAluno,
      disciplinas: { ...disciplinasFormatadas, ...novoAluno.disciplinas }
    };

    const alunosTurma = alunos[turmaSelecionada] || [];
    const novosAlunos = [...alunosTurma, alunoFinal];
    // ordena alfabeticamente
    novosAlunos.sort((a,b) => a.nome.localeCompare(b.nome));
    
    salvarAlunos(turmaSelecionada, novosAlunos);
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const exportarDados = () => {
    const dados = { turmas, alunos };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
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
          
          dados.turmas.forEach(turma => {
            if (dados.alunos[turma]) {
              salvarAlunos(turma, dados.alunos[turma]);
            }
          });
          
          alert('Dados importados com sucesso!');
          carregarDados();
        } else {
          alert('Arquivo inválido!');
        }
      } catch (error) {
        alert('Erro ao importar dados!');
      }
    };
    reader.readAsText(file);
  };

  // Aqui é onde a parte de renderização e layout entra
  // ... (mantém o mesmo layout do seu último código que você aprovou com cabeçalho, logo, abas etc.)
}
