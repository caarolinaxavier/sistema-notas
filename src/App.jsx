import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Plus } from 'lucide-react';
import './App.css';

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

  // Disciplinas completas por turma/curso
  const disciplinasPorCurso = {
    ENFERMAGEM: [
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
      { nome: 'Gestão em Enfermagem', modulo: 2, teorico: 40, estagio: 0 },
    ],
    RADIOLOGIA: [
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
      { nome: 'Políticas de Saúde', modulo: 2, teorico: 30, estagio: 0 },
      { nome: 'Anatomia Radiológica1', modulo: 2, teorico: 70, estagio: 0 },
      { nome: 'Legislação Radiológica, Previdenciária e Trabalhista', modulo: 2, teorico: 40, estagio: 0 },
      { nome: 'Administração de Serviços Radiológicos', modulo: 2, teorico: 20, estagio: 0 },
      { nome: 'Farmacologia', modulo: 2, teorico: 30, estagio: 0 },
      { nome: 'Noções de Tomografia Computadorizada e Ressonância Magnética', modulo: 2, teorico: 40, estagio: 0 },
      { nome: 'Proteção Radiológica2', modulo: 2, teorico: 40, estagio: 0 },
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 2, teorico: 100, estagio: 160 },
      { nome: 'Exames Contrastados', modulo: 3, teorico: 70, estagio: 60 },
      { nome: 'Mamografia', modulo: 3, teorico: 40, estagio: 0 },
      { nome: 'Técnica de Posicionamento Especial', modulo: 3, teorico: 40, estagio: 0 },
      { nome: 'Técnicas de Posicionamento em Diagnóstico Médico', modulo: 3, teorico: 0, estagio: 100 },
      { nome: 'Radiologia Veterinária', modulo: 3, teorico: 30, estagio: 0 },
      { nome: 'Radiologia Odontológica', modulo: 3, teorico: 30, estagio: 0 },
      { nome: 'Radioterapia', modulo: 3, teorico: 30, estagio: 0 },
      { nome: 'Radioisotopia e Medicina Nuclear', modulo: 3, teorico: 30, estagio: 0 },
      { nome: 'Radiologia Industrial', modulo: 3, teorico: 30, estagio: 0 },
      { nome: 'Anatomia Radiológica2', modulo: 3, teorico: 60, estagio: 0 },
    ],
    NECROPSIA: [
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
      { nome: 'Traumatologia Forense', modulo: 1, teorico: 28, estagio: 0 },
    ]
  };

  // Turmas
  const turmasTodas = [
    'TEM2','TEM3','TEM4','TEM5','TEN2','TEN3','TEN4','TEN5','TEN6','TEN7',
    'TRN1','TRN2','N1'
  ];

  useEffect(() => {
    // Inicializar turmas e alunos
    setTurmas(turmasTodas);
    const dadosAlunos = {};
    turmasTodas.forEach(turma => {
      const curso = turma.startsWith('T') && turma.includes('EM') ? 'ENFERMAGEM' :
                    turma.startsWith('TR') ? 'RADIOLOGIA' : 'NECROPSIA';
      dadosAlunos[turma] = [];
    });
    setAlunos(dadosAlunos);
  }, []);

  // ... Aqui você mantém as funções de login, buscarNotas, adicionarAluno, removerAluno,
  // exportar/importar dados, atualizarDisciplina, etc, adaptando o código anterior
  // mantendo a lógica para campos editáveis: nota, faltas, aprovado/retido, carga horaria.

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 font-sans">
      <header className="flex items-center p-4 bg-white shadow">
        <img src="/logo.png" alt="Logo" className="h-12 mr-4"/>
        <h1 className="text-2xl font-bold">Sistema de Notas e Faltas</h1>
      </header>

      {modo === 'aluno' && (
        <div className="p-4">
          {/* Aqui vai a interface simplificada do aluno */}
          <h2 className="text-xl font-semibold mb-4">Área do Aluno</h2>
          {/* Lista de alunos clicável em ordem alfabética */}
        </div>
      )}

      {modo === 'professor' && !autenticado && (
        <div className="p-4 max-w-sm mx-auto mt-10 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Login do Professor</h2>
          <input
            type={mostrarSenha ? 'text' : 'password'}
            className="border p-2 mb-2 w-full"
            placeholder="Senha"
            value={senhaAdmin}
            onChange={(e) => setSenhaAdmin(e.target.value)}
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={mostrarSenha}
              onChange={() => setMostrarSenha(!mostrarSenha)}
              id="mostrarSenha"
            />
            <label htmlFor="mostrarSenha" className="ml-2 text-sm">Mostrar senha</label>
          </div>
          <button
            onClick={() => setAutenticado(senhaAdmin === SENHA_PADRAO)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </div>
      )}

      {modo === 'professor' && autenticado && (
        <div className="p-4">
          {/* Aqui vai a interface do professor */}
          <h2 className="text-xl font-semibold mb-4">Área do Professor</h2>
          {/* Lista de turmas e alunos clicáveis */}
          {/* Abas de disciplinas com campos editáveis */}
          {/* Backup/exportação */}
        </div>
      )}
    </div>
  );
}
