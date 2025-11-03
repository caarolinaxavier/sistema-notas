import React, { useState, useEffect } from 'react';
import { Search, Eye, EyeOff, Download, Upload, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const DISCIPLINAS_POR_CURSO = {
  ENFERMAGEM: {
    turmas: ['TEM2', 'TEM3', 'TEM4', 'TEM5', 'TEN2', 'TEN3', 'TEN4', 'TEN5', 'TEN6', 'TEN7'],
    modulos: {
      'MÓDULO 1': [
        { nome: 'Técnicas Básicas de Enfermagem', chTeoria: 130, chEstagio: 150 },
        { nome: 'Anatomia e Fisiologia humanas', chTeoria: 80, chEstagio: 0 },
        { nome: 'Nutrição e Dietética', chTeoria: 30, chEstagio: 0 },
        { nome: 'Microbiologia e Parasitologia', chTeoria: 40, chEstagio: 0 },
        { nome: 'Primeiros Socorros', chTeoria: 40, chEstagio: 0 },
        { nome: 'Farmacologia Aplicada à Enfermagem', chTeoria: 40, chEstagio: 0 },
        { nome: 'Ética Profissional I', chTeoria: 20, chEstagio: 0 },
        { nome: 'Psicologia Aplicada à Enfermagem', chTeoria: 30, chEstagio: 0 },
        { nome: 'Enfermagem Médica', chTeoria: 70, chEstagio: 90 },
        { nome: 'Enfermagem em Saúde Coletiva e Higiene', chTeoria: 40, chEstagio: 40 },
        { nome: 'Enfermagem em Centro Cirúrgico', chTeoria: 40, chEstagio: 20 },
        { nome: 'Enfermagem Cirúrgica', chTeoria: 70, chEstagio: 60 },
        { nome: 'Enf. no Processo de Cuidar em Materno Infantil I', chTeoria: 60, chEstagio: 40 },
        { nome: 'Enfermagem em Geriatria', chTeoria: 20, chEstagio: 0 },
      ],
      'MÓDULO 2': [
        { nome: 'Administração em Unidade de Enfermagem', chTeoria: 50, chEstagio: 24 },
        { nome: 'Enfermagem em Saúde Pública', chTeoria: 50, chEstagio: 40 },
        { nome: 'Enf. no Processo de cuidar em Materno-Infantil II', chTeoria: 60, chEstagio: 20 },
        { nome: 'Enf. em Centro Cirúrgico e Central de Material de Esterilização', chTeoria: 40, chEstagio: 20 },
        { nome: 'Enf. no Cuidado de Paciente de Alta Dependência', chTeoria: 100, chEstagio: 20 },
        { nome: 'Enfermagem em Urgência e Emergência', chTeoria: 70, chEstagio: 76 },
        { nome: 'Enfermagem em Saúde Mental', chTeoria: 30, chEstagio: 0 },
        { nome: 'Enfermagem Domiciliária', chTeoria: 30, chEstagio: 0 },
        { nome: 'Ética Profissional II', chTeoria: 20, chEstagio: 0 },
        { nome: 'Gestão em Enfermagem', chTeoria: 40, chEstagio: 0 },
      ],
    },
  },
  RADIOLOGIA: {
    turmas: ['TRN1', 'TRN2', 'TRN3'],
    modulos: {
      'MÓDULO 1': [
        { nome: 'Anatomia Básica', chTeoria: 100, chEstagio: 0 },
        { nome: 'Radiologia Elementar', chTeoria: 20, chEstagio: 0 },
        { nome: 'Psicologia e Ética', chTeoria: 40, chEstagio: 0 },
        { nome: 'Fisiologia Humana', chTeoria: 50, chEstagio: 0 },
        { nome: 'Física Radiológica', chTeoria: 40, chEstagio: 0 },
        { nome: 'Proteção Radiológica1', chTeoria: 40, chEstagio: 0 },
        { nome: 'Patologia', chTeoria: 50, chEstagio: 0 },
        { nome: 'Primeiros Socorros', chTeoria: 30, chEstagio: 0 },
        { nome: 'Atomística', chTeoria: 30, chEstagio: 0 },
        { nome: 'Processamento de Imagens', chTeoria: 40, chEstagio: 40 },
        { nome: 'Princípios Básicos de Posicionamento', chTeoria: 30, chEstagio: 40 },
      ],
      'MÓDULO 2': [
        { nome: 'Políticas de Saúde', chTeoria: 30, chEstagio: 0 },
        { nome: 'Anatomia Radiológica1', chTeoria: 70, chEstagio: 0 },
        { nome: 'Legislação Radiológica, Previdenciária e Trabalhista', chTeoria: 40, chEstagio: 0 },
        { nome: 'Administração de Serviços Radiológicos', chTeoria: 20, chEstagio: 0 },
        { nome: 'Farmacologia', chTeoria: 30, chEstagio: 0 },
        { nome: 'Noções de Tomografia Computadorizada e Ressonância Magnética', chTeoria: 40, chEstagio: 0 },
        { nome: 'Proteção Radiológica2', chTeoria: 40, chEstagio: 0 },
        { nome: 'Técnicas de Posic. em diagnóstico Médico', chTeoria: 100, chEstagio: 160 },
      ],
      'MÓDULO 3': [
        { nome: 'Exames Contrastados', chTeoria: 70, chEstagio: 60 },
        { nome: 'Mamografia', chTeoria: 40, chEstagio: 0 },
        { nome: 'Técnica de Posicionamento Especial', chTeoria: 40, chEstagio: 0 },
        { nome: 'Radiologia Veterinária', chTeoria: 30, chEstagio: 0 },
        { nome: 'Radiologia Odontológica', chTeoria: 30, chEstagio: 0 },
        { nome: 'Radioterapia', chTeoria: 30, chEstagio: 0 },
        { nome: 'Radioisotopia e Medicina Nuclear', chTeoria: 30, chEstagio: 0 },
        { nome: 'Radiologia Industrial', chTeoria: 30, chEstagio: 0 },
        { nome: 'Anatomia Radiológica2', chTeoria: 60, chEstagio: 0 },
        { nome: 'Técnicas de Posicionamento em Diagnóstico Médico', chTeoria: 0, chEstagio: 100 },
      ],
    },
  },
  NECROPSIA: {
    turmas: ['TN1'],
    modulos: {
      'MÓDULO 1': [
        { nome: 'Anatomia', chTeoria: 60, chEstagio: 0 },
        { nome: 'Biologia', chTeoria: 20, chEstagio: 0 },
        { nome: 'Higiene Biossegurança', chTeoria: 32, chEstagio: 0 },
        { nome: 'Fisiologia', chTeoria: 44, chEstagio: 0 },
        { nome: 'Ética Profissional', chTeoria: 24, chEstagio: 0 },
        { nome: 'Língua Portuguesa', chTeoria: 28, chEstagio: 0 },
        { nome: 'Medicina Legal', chTeoria: 32, chEstagio: 0 },
        { nome: 'Raciocínio Lógico', chTeoria: 28, chEstagio: 0 },
        { nome: 'Tanatologia Forense', chTeoria: 24, chEstagio: 0 },
        { nome: 'Técnicas de Necropsia', chTeoria: 40, chEstagio: 0 },
        { nome: 'Traumatologia Forense', chTeoria: 28, chEstagio: 0 },
      ],
    },
  },
};

function identificarCurso(turma) {
  if (DISCIPLINAS_POR_CURSO.ENFERMAGEM.turmas.includes(turma)) return 'ENFERMAGEM';
  if (DISCIPLINAS_POR_CURSO.RADIOLOGIA.turmas.includes(turma)) return 'RADIOLOGIA';
  if (DISCIPLINAS_POR_CURSO.NECROPSIA.turmas.includes(turma)) return 'NECROPSIA';
  return null;
}

function obterDisciplinas(turma) {
  const curso = identificarCurso(turma);
  if (!curso) return {};
  return DISCIPLINAS_POR_CURSO[curso].modulos;
}

export default function App() {
  const [modo, setModo] = useState('aluno');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);
  
  const [turmas] = useState([
    ...DISCIPLINAS_POR_CURSO.ENFERMAGEM.turmas,
    ...DISCIPLINAS_POR_CURSO.RADIOLOGIA.turmas,
    ...DISCIPLINAS_POR_CURSO.NECROPSIA.turmas,
  ]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [alunos, setAlunos] = useState({});
  const [novoAluno, setNovoAluno] = useState('');
  const [alunoExpandido, setAlunoExpandido] = useState(null);

  const SENHA_PADRAO = 'admin123';

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    try {
      const alunosData = localStorage.getItem('alunos_sistema');
      if (alunosData) {
        setAlunos(JSON.parse(alunosData));
      }
    } catch (error) {
      console.log('Primeira vez usando o sistema');
    }
  };

  const salvarAlunos = (novosAlunos) => {
    localStorage.setItem('alunos_sistema', JSON.stringify(novosAlunos));
    setAlunos(novosAlunos);
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

  const adicionarAluno = () => {
    if (!turmaSelecionada) {
      alert('Selecione uma turma primeiro!');
      return;
    }

    if (!novoAluno.trim()) {
      alert('Digite o nome do aluno!');
      return;
    }

    const alunosTurma = alunos[turmaSelecionada] || [];
    
    if (alunosTurma.find(a => a.nome.toLowerCase() === novoAluno.toLowerCase())) {
      alert('Aluno já existe nesta turma!');
      return;
    }

    const disciplinasModulos = obterDisciplinas(turmaSelecionada);
    const disciplinasIniciais = {};

    Object.entries(disciplinasModulos).forEach(([modulo, disciplinas]) => {
      disciplinas.forEach(disc => {
        disciplinasIniciais[disc.nome] = {
          modulo,
          chTeoria: disc.chTeoria,
          chEstagio: disc.chEstagio,
          notaTeoria: '',
          notaEstagio: '',
          faltasTeoria: '',
          faltasEstagio: '',
          media: '',
          status: '',
        };
      });
    });

    const novoAlunoObj = {
      nome: novoAluno,
      disciplinas: disciplinasIniciais,
    };

    const novosAlunos = {
      ...alunos,
      [turmaSelecionada]: [...alunosTurma, novoAlunoObj].sort((a, b) => 
        a.nome.localeCompare(b.nome)
      ),
    };

    salvarAlunos(novosAlunos);
    setNovoAluno('');
  };

  const removerAluno = (turma, index) => {
    if (!confirm('Remover este aluno?')) return;
    
    const alunosTurma = alunos[turma] || [];
    const novosAlunosTurma = alunosTurma.filter((_, i) => i !== index);
    
    const novosAlunos = {
      ...alunos,
      [turma]: novosAlunosTurma,
    };

    salvarAlunos(novosAlunos);
    setAlunoExpandido(null);
  };

  const atualizarDisciplina = (turma, indexAluno, disciplina, campo, valor) => {
    const alunosTurma = [...(alunos[turma] || [])];
    alunosTurma[indexAluno].disciplinas[disciplina][campo] = valor;

    const novosAlunos = {
      ...alunos,
      [turma]: alunosTurma,
    };

    salvarAlunos(novosAlunos);
  };

  const exportarDados = () => {
    const dados = { alunos };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sistema_notas_backup.json';
    a.click();
  };

  const importarDados = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const dados = JSON.parse(event.target.result);
        
        if (dados.alunos) {
          salvarAlunos(dados.alunos);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-1">ANA NERY BAURU</div>
            <div className="text-xs text-gray-500 mb-1">Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</div>
            <div className="text-xs text-gray-500 mb-4">CNPJ – 08.036.462/0001-70</div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="https://i.imgur.com/lD9BrRR.jpeg" alt="Logo Ana Nery" className="h-16 w-16 object-contain" />
            <h1 className="text-3xl font-bold text-red-600">
              Sistema de Notas e Faltas
            </h1>
          </div>
          
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setModo('aluno');
                setAutenticado(false);
                setSenhaAdmin('');
                setNotasEncontradas(null);
              }}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                modo === 'aluno'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Consultar Notas
            </button>
            <button
              onClick={() => setModo('admin')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                modo === 'admin'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Área do Professor
            </button>
          </div>
        </div>

        {modo === 'aluno' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Consultar Minhas Notas e Faltas
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  value={nomeAluno}
                  onChange={(e) => setNomeAluno(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turma
                </label>
                <select
                  value={turmaAluno}
                  onChange={(e) => setTurmaAluno(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione sua turma</option>
                  {turmas.map(turma => (
                    <option key={turma} value={turma}>{turma}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={buscarNotas}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Buscar Notas
              </button>
            </div>

            {notasEncontradas && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-2xl font-semibold text-green-800 mb-6">
                  Boletim de {notasEncontradas.nome}
                </h3>
                
                {Object.entries(
                  Object.entries(notasEncontradas.disciplinas).reduce((acc, [disc, dados]) => {
                    const modulo = dados.modulo;
                    if (!acc[modulo]) acc[modulo] = [];
                    acc[modulo].push([disc, dados]);
                    return acc;
                  }, {})
                ).map(([modulo, disciplinas]) => (
                  <div key={modulo} className="mb-6">
                    <h4 className="text-lg font-bold text-gray-700 mb-3 border-b-2 border-gray-300 pb-2">
                      {modulo}
                    </h4>
                    <div className="space-y-3">
                      {disciplinas.map(([disciplina, dados]) => (
                        <div key={disciplina} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="font-semibold text-gray-800 mb-3">{disciplina}</div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600">CH Teoria:</span>
                              <span className="ml-2 font-medium">{dados.chTeoria}h</span>
                            </div>
                            {dados.chEstagio > 0 && (
                              <div>
                                <span className="text-gray-600">CH Estágio:</span>
                                <span className="ml-2 font-medium">{dados.chEstagio}h</span>
                              </div>
                            )}
                            <div>
                              <span className="text-gray-600">Nota Teoria:</span>
                              <span className="ml-2 font-bold text-blue-600">{dados.notaTeoria || '-'}</span>
                            </div>
                            {dados.chEstagio > 0 && (
                              <div>
                                <span className="text-gray-600">Nota Estágio:</span>
                                <span className="ml-2 font-bold text-blue-600">{dados.notaEstagio || '-'}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-gray-600">Faltas Teoria:</span>
                              <span className="ml-2 font-bold text-orange-600">{dados.faltasTeoria || '0'}</span>
                            </div>
                            {dados.chEstagio > 0 && (
                              <div>
                                <span className="text-gray-600">Faltas Estágio:</span>
                                <span className="ml-2 font-bold text-orange-600">{dados.faltasEstagio || '0'}</span>
                              </div>
                            )}
                            <div>
                              <span className="text-gray-600">Status:</span>
                              <span className={`ml-2 font-bold ${
                                dados.status === 'Aprovado' ? 'text-green-600' : 
                                dados.status === 'Retido' ? 'text-red-600' : 
                                'text-gray-400'
                              }`}>
                                {dados.status || '-'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {modo === 'admin' && !autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Login do Professor
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    value={senhaAdmin}
                    onChange={(e) => setSenhaAdmin(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && fazerLogin()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Digite a senha"
                  />
                  <button
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
            
              </div>

              <button
                onClick={fazerLogin}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Entrar
              </button>
            </div>
          </div>
        )}

        {modo === 'admin' && autenticado && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Gerenciar Alunos
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={exportarDados}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <Download size={18} />
                    Exportar
                  </button>
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer">
                    <Upload size={18} />
                    Importar
                    <input
                      type="file"
                      accept=".json"
                      onChange={importarDados}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecionar Turma
                </label>
                <select
                  value={turmaSelecionada}
                  onChange={(e) => {
                    setTurmaSelecionada(e.target.value);
                    setAlunoExpandido(null);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Selecione uma turma</option>
                  {turmas.map(turma => (
                    <option key={turma} value={turma}>{turma}</option>
                  ))}
                </select>
              </div>

              {turmaSelecionada && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">Adicionar Novo Aluno</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={novoAluno}
                      onChange={(e) => setNovoAluno(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && adicionarAluno()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Nome completo do aluno"
                    />
                    <button
                      onClick={adicionarAluno}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {turmaSelecionada && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Alunos da Turma {turmaSelecionada}
                </h2>

                {(alunos[turmaSelecionada] || []).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Nenhum aluno cadastrado nesta turma ainda.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {(alunos[turmaSelecionada] || []).map((aluno, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => setAlunoExpandido(alunoExpandido === index ? null : index)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800 text-lg">
                              {aluno.nome}
                            </span>
                            {alunoExpandido === index ? (
                              <ChevronUp className="text-gray-400" size={20} />
                            ) : (
                              <ChevronDown className="text-gray-400" size={20} />
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removerAluno(turmaSelecionada, index);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {alunoExpandido === index && (
                          <div className="p-4 bg-gray-50 border-t">
                            {Object.entries(
                              Object.entries(aluno.disciplinas).reduce((acc, [disc, dados]) => {
                                const modulo = dados.modulo;
                                if (!acc[modulo]) acc[modulo] = [];
                                acc[modulo].push([disc, dados]);
                                return acc;
                              }, {})
                            ).map(([modulo, disciplinas]) => (
                              <div key={modulo} className="mb-6">
                                <h4 className="text-lg font-bold text-gray-700 mb-3 border-b-2 border-gray-300 pb-2">
                                  {modulo}
                                </h4>
                                <div className="space-y-4">
                                  {disciplinas.map(([disciplina, dados]) => (
                                    <div key={disciplina} className="bg-white p-4 rounded-lg shadow-sm">
                                      <div className="font-semibold text-gray-800 mb-3">
                                        {disciplina}
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                          <label className="text-xs text-gray-600 block mb-1">
                                            CH Teoria (h)
                                          </label>
                                          <input
                                            type="text"
                                            value={dados.chTeoria}
                                            onChange={(e) => atualizarDisciplina(
                                              turmaSelecionada, index, disciplina, 'chTeoria', e.target.value
                                            )}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                          />
                                        </div>

                                        {dados.chEstagio > 0 && (
                                          <div>
                                            <label className="text-xs text-gray-600 block mb-1">
                                              CH Estágio (h)
                                            </label>
                                            <input
                                              type="text"
                                              value={dados.chEstagio}
                                              onChange={(e) => atualizarDisciplina(
                                                turmaSelecionada, index, disciplina, 'chEstagio', e.target.value
                                              )}
                                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                            />
                                          </div>
                                        )}

                                        <div>
                                          <label className="text-xs text-gray-600 block mb-1">
                                            Nota Teoria
                                          </label>
                                          <input
                                            type="text"
                                            value={dados.notaTeoria}
                                            onChange={(e) => atualizarDisciplina(
                                              turmaSelecionada, index, disciplina, 'notaTeoria', e.target.value
                                            )}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                            placeholder="Ex: 7.5"
                                          />
                                        </div>

                                        {dados.chEstagio > 0 && (
                                          <div>
                                            <label className="text-xs text-gray-600 block mb-1">
                                              Nota Estágio
                                            </label>
                                            <input
                                              type="text"
                                              value={dados.notaEstagio}
                                              onChange={(e) => atualizarDisciplina(
                                                turmaSelecionada, index, disciplina, 'notaEstagio', e.target.value
                                              )}
                                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                              placeholder="Ex: 8.0"
                                            />
                                          </div>
                                        )}

                                        <div>
                                          <label className="text-xs text-gray-600 block mb-1">
                                            Faltas Teoria
                                          </label>
                                          <input
                                            type="text"
                                            value={dados.faltasTeoria}
                                            onChange={(e) => atualizarDisciplina(
                                              turmaSelecionada, index, disciplina, 'faltasTeoria', e.target.value
                                            )}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                            placeholder="Ex: 3"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-xs text-gray-600 block mb-1">
                                            Status
                                          </label>
                                          <select
                                            value={dados.status}
                                            onChange={(e) => atualizarDisciplina(
                                              turmaSelecionada, index, disciplina, 'status', e.target.value
                                            )}
                                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-semibold"
                                          >
                                            <option value="">Selecione</option>
                                            <option value="Aprovado">Aprovado</option>
                                            <option value="Retido">Retido</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
