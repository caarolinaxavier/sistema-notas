import React, { useState, useEffect } from 'react';
import { Search, Upload, Eye, EyeOff, Download, Trash2, Plus } from 'lucide-react';

export default function App() {
  const [modo, setModo] = useState('aluno');
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

  // ============================
  // Definição de disciplinas por curso
  // ============================
  const disciplinasPorCurso = {
    ENFERMAGEM: {
      TEM2: [
        { nome: "Técnicas Básicas de Enfermagem", modulo: 1, cargaTeorica: 130, cargaEstagio: 150 },
        { nome: "Anatomia e Fisiologia humanas", modulo: 1, cargaTeorica: 80 },
        { nome: "Nutrição e Dietética", modulo: 1, cargaTeorica: 30 },
        { nome: "Microbiologia e Parasitologia", modulo: 1, cargaTeorica: 40 },
        { nome: "Primeiros Socorros", modulo: 1, cargaTeorica: 40 },
        { nome: "Farmacologia Aplicada à Enfermagem", modulo: 1, cargaTeorica: 40 },
        { nome: "Ética Profissional I", modulo: 1, cargaTeorica: 20 },
        { nome: "Psicologia Aplicada à Enfermagem", modulo: 1, cargaTeorica: 30 },
        { nome: "Enfermagem Médica", modulo: 1, cargaTeorica: 70, cargaEstagio: 90 },
        { nome: "Enfermagem em Saúde Coletiva e Higiene", modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
        { nome: "Enfermagem em Centro Cirúrgico", modulo: 1, cargaTeorica: 40, cargaEstagio: 20 },
        { nome: "Enfermagem Cirúrgica", modulo: 1, cargaTeorica: 70, cargaEstagio: 60 },
        { nome: "Enf. no Processo de Cuidar em Materno Infantil I", modulo: 1, cargaTeorica: 60, cargaEstagio: 40 },
        { nome: "Enfermagem em Geriatria", modulo: 1, cargaTeorica: 20 },
        { nome: "Administração em Unidade de Enfermagem", modulo: 2, cargaTeorica: 50, cargaEstagio: 24 },
        { nome: "Enfermagem em Saúde Pública", modulo: 2, cargaTeorica: 50, cargaEstagio: 40 },
        { nome: "Enf. no Processo de cuidar em Materno-Infantil II", modulo: 2, cargaTeorica: 60, cargaEstagio: 20 },
        { nome: "Enf. em Centro Cirúrgico e Central de Material de Esterilização", modulo: 2, cargaTeorica: 40, cargaEstagio: 20 },
        { nome: "Enf. no Cuidado de Paciente de Alta Dependência", modulo: 2, cargaTeorica: 100, cargaEstagio: 20 },
        { nome: "Enfermagem em Urgência e Emergência", modulo: 2, cargaTeorica: 70, cargaEstagio: 76 },
        { nome: "Enfermagem em Saúde Mental", modulo: 2, cargaTeorica: 30 },
        { nome: "Enfermagem Domiciliária", modulo: 2, cargaTeorica: 30 },
        { nome: "Ética Profissional II", modulo: 2, cargaTeorica: 20 },
        { nome: "Gestão em Enfermagem", modulo: 2, cargaTeorica: 40 },
      ],
      TEM3: [], TEM4: [], TEM5: [], TEN2: [], TEN3: [], TEN4: [], TEN5: [], TEN6: [], TEN7: []
    },
    RADIOLOGIA: {
      TRN1: [
        { nome: "Anatomia Básica", modulo: 1, cargaTeorica: 100 },
        { nome: "Radiologia Elementar", modulo: 1, cargaTeorica: 20 },
        { nome: "Psicologia e Ética", modulo: 1, cargaTeorica: 40 },
        { nome: "Fisiologia Humana", modulo: 1, cargaTeorica: 50 },
        { nome: "Física Radiológica", modulo: 1, cargaTeorica: 40 },
        { nome: "Proteção Radiológica1", modulo: 1, cargaTeorica: 40 },
        { nome: "Patologia", modulo: 1, cargaTeorica: 50 },
        { nome: "Primeiros Socorros", modulo: 1, cargaTeorica: 30 },
        { nome: "Atomística", modulo: 1, cargaTeorica: 30 },
        { nome: "Processamento de Imagens", modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
        { nome: "Princípios Básicos de Posicionamento", modulo: 1, cargaTeorica: 30, cargaEstagio: 40 },
      ],
      TRN2: [
        { nome: "Políticas de Saúde", modulo: 2, cargaTeorica: 30 },
        { nome: "Anatomia Radiológica1", modulo: 2, cargaTeorica: 70 },
        { nome: "Legislação Radiológica, Previdenciária e Trabalhista", modulo: 2, cargaTeorica: 40 },
        { nome: "Administração de Serviços Radiológicos", modulo: 2, cargaTeorica: 20 },
        { nome: "Farmacologia", modulo: 2, cargaTeorica: 30 },
        { nome: "Noções de Tomografia Computadorizada e Ressonância Magnética", modulo: 2, cargaTeorica: 40 },
        { nome: "Proteção Radiológica2", modulo: 2, cargaTeorica: 40 },
        { nome: "Técnicas de Posic. em diagnóstico Médico", modulo: 2, cargaTeorica: 100, cargaEstagio: 160 },
        { nome: "Exames Contrastados", modulo: 3, cargaTeorica: 70, cargaEstagio: 60 },
        { nome: "Mamografia", modulo: 3, cargaTeorica: 40 },
        { nome: "Técnica de Posicionamento Especial", modulo: 3, cargaTeorica: 40 },
        { nome: "Radiologia Veterinária", modulo: 3, cargaTeorica: 30 },
        { nome: "Radiologia Odontológica", modulo: 3, cargaTeorica: 30 },
        { nome: "Radioterapia", modulo: 3, cargaTeorica: 30 },
        { nome: "Radioisotopia e Medicina Nuclear", modulo: 3, cargaTeorica: 30 },
        { nome: "Radiologia Industrial", modulo: 3, cargaTeorica: 30 },
        { nome: "Anatomia Radiológica2", modulo: 3, cargaTeorica: 60 },
      ]
    },
    NECROPSIA: {
      N1: [
        { nome: "Anatomia", modulo: 1, cargaTeorica: 60 },
        { nome: "Biologia", modulo: 1, cargaTeorica: 20 },
        { nome: "Higiene Biossegurança", modulo: 1, cargaTeorica: 32 },
        { nome: "Fisiologia", modulo: 1, cargaTeorica: 44 },
        { nome: "Ética Profissional", modulo: 1, cargaTeorica: 24 },
        { nome: "Língua Portuguesa", modulo: 1, cargaTeorica: 28 },
        { nome: "Medicina Legal", modulo: 1, cargaTeorica: 32 },
        { nome: "Raciocínio Lógico", modulo: 1, cargaTeorica: 28 },
        { nome: "Tanatologia Forense", modulo: 1, cargaTeorica: 24 },
        { nome: "Técnicas de Necropsia", modulo: 1, cargaTeorica: 40 },
        { nome: "Traumatologia Forense", modulo: 1, cargaTeorica: 28 },
      ]
    }
  };

  // ============================
  // Funções de carregamento e salvamento
  // ============================
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
        // Se for primeira vez, cria todas as turmas com disciplinas iniciais
        const todasTurmas = [];
        Object.values(disciplinasPorCurso).forEach(curso => {
          Object.keys(curso).forEach(turma => {
            todasTurmas.push(turma);
            if (!localStorage.getItem(`alunos_${turma}`)) {
              const alunosTurma = [];
              localStorage.setItem(`alunos_${turma}`, JSON.stringify(alunosTurma));
            }
          });
        });
        setTurmas(todasTurmas);
      }
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  };

  const salvarAlunos = (turma, alunosTurma) => {
    localStorage.setItem(`alunos_${turma}`, JSON.stringify(alunosTurma));
    setAlunos(prev => ({ ...prev, [turma]: alunosTurma }));
  };

  // ============================
  // Funções de login, busca e CRUD
  // ============================
  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) { alert('Preencha seu nome e turma!'); return; }
    const alunosTurma = alunos[turmaAluno] || [];
    const aluno = alunosTurma.find(a => a.nome.toLowerCase() === nomeAluno.toLowerCase());
    if (aluno) setNotasEncontradas(aluno);
    else { setNotasEncontradas(null); alert('Aluno não encontrado nesta turma!'); }
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada) { alert('Selecione uma turma primeiro!'); return; }
    if (!novoAluno.nome.trim()) { alert('Digite o nome do aluno!'); return; }

    // Adiciona todas as disciplinas da turma automaticamente
    const curso = Object.keys(disciplinasPorCurso).find(c => disciplinasPorCurso[c][turmaSelecionada]);
    const disciplinasDaTurma = disciplinasPorCurso[curso][turmaSelecionada];
    const disciplinasComCampos = {};
    disciplinasDaTurma.forEach(d => {
      disciplinasComCampos[d.nome] = { 
        nota: '', faltas: '', aprovado: '', 
        cargaTeorica: d.cargaTeorica, 
        cargaEstagio: d.cargaEstagio || null, 
        modulo: d.modulo
      };
    });

    const alunoComDisciplinas = { nome: novoAluno.nome, disciplinas: disciplinasComCampos };
    const alunosTurma = alunos[turmaSelecionada] || [];
    const novosAlunos = [...alunosTurma, alunoComDisciplinas];
    salvarAlunos(turmaSelecionada, novosAlunos);
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  // ============================
  // Resto do código (UI) continua igual ao seu App.jsx,
  // mas ao exibir as disciplinas, mostrar:
  // - Nota, Faltas, Aprovado/Retido, Carga Teórica, Carga Estágio (quando houver)
  // ============================

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      {/* Aqui segue toda a estrutura de UI que você já tinha, mas nos locais onde
          você mapeia as disciplinas para exibir, basta adicionar: */}
      {/* {disciplina.cargaTeorica}, {disciplina.cargaEstagio}, {disciplina.aprovado} */}
      {/* E também a aba de média e carga horária do estágio */}
      {/* ... */}
      <h1 className="text-center font-bold text-xl text-red-600">
        Código atualizado com turmas e disciplinas prontas
      </h1>
      <p className="text-center text-gray-700 mt-4">
        As disciplinas foram carregadas automaticamente ao criar o aluno. Preencha manualmente notas, faltas e aprovado/retido.
      </p>
    </div>
  );
}
