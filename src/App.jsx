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

  const removerTurma = (turma) => {
    if (!confirm(`Remover turma ${turma} e todos os alunos?`)) return;
    
    const novasTurmas = turmas.filter(t => t !== turma);
    salvarTurmas(novasTurmas);
    localStorage.removeItem(`alunos_${turma}`);
    
    const novosAlunos = { ...alunos };
    delete novosAlunos[turma];
    setAlunos(novosAlunos);
    
    if (turmaSelecionada === turma) {
      setTurmaSelecionada('');
    }
  };

  const adicionarDisciplina = () => {
    const disciplina = prompt('Nome da disciplina:');
    if (disciplina && disciplina.trim()) {
      setNovoAluno(prev => ({
        ...prev,
        disciplinas: {
          ...prev.disciplinas,
          [disciplina]: { nota: '', faltas: '' }
        }
      }));
    }
  };

  const atualizarDisciplina = (disciplina, campo, valor) => {
    setNovoAluno(prev => ({
      ...prev,
      disciplinas: {
        ...prev.disciplinas,
        [disciplina]: {
          ...prev.disciplinas[disciplina],
          [campo]: valor
        }
      }
    }));
  };

  const removerDisciplina = (disciplina) => {
    const novasDisciplinas = { ...novoAluno.disciplinas };
    delete novasDisciplinas[disciplina];
    setNovoAluno(prev => ({
      ...prev,
      disciplinas: novasDisciplinas
    }));
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

    const alunosTurma = alunos[turmaSelecionada] || [];
    const novosAlunos = [...alunosTurma, novoAluno];
    
    salvarAlunos(turmaSelecionada, novosAlunos);
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const removerAluno = (index) => {
    if (!confirm('Remover este aluno?')) return;
    
    const alunosTurma = alunos[turmaSelecionada] || [];
    const novosAlunos = alunosTurma.filter((_, i) => i !== index);
    
    salvarAlunos(turmaSelecionada, novosAlunos);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-1">ANA NERY BAURU</div>
            <div className="text-xs text-gray-500 mb-1">Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</div>
            <div className="text-xs text-gray-500 mb-4">CNPJ – 08.036.462/0001-70</div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="https://i.imgur.com/lD9BrRR.jpeg" alt="Logo Ana Nery" className="h-20 w-20 object-contain" />
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
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  Dados de {notasEncontradas.nome}
                </h3>
                
                {Object.keys(notasEncontradas.disciplinas).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(notasEncontradas.disciplinas).map(([disciplina, dados]) => {
                      const nota = typeof dados === 'object' ? dados.nota : dados;
                      const faltas = typeof dados === 'object' ? dados.faltas : '';
                      
                      return (
                        <div key={disciplina} className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="font-semibold text-gray-800 mb-2 text-lg">{disciplina}</div>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <span className="text-sm text-gray-600">Nota:</span>
                              <span className="ml-2 text-lg font-bold text-blue-600">
                                {nota || 'Sem nota'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-sm text-gray-600">Faltas:</span>
                              <span className="ml-2 text-lg font-bold text-red-600">
                                {faltas || '0'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-600">Nenhuma disciplina cadastrada ainda.</p>
                )}
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
                <p className="text-xs text-gray-500 mt-2">
                  Senha padrão: admin123
                </p>
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
                  Gerenciar Turmas
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

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={novaTurma}
                  onChange={(e) => setNovaTurma(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && adicionarTurma()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Nome da nova turma (ex: 3º Ano A)"
                />
                <button
                  onClick={adicionarTurma}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Adicionar
                </button>
              </div>

              <div className="space-y-2">
                {turmas.map(turma => (
                  <div
                    key={turma}
                    className={`flex justify-between items-center p-3 rounded-lg border-2 cursor-pointer transition ${
                      turmaSelecionada === turma
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => setTurmaSelecionada(turma)}
                  >
                    <span className="font-medium">{turma}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removerTurma(turma);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {turmaSelecionada && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Alunos da Turma {turmaSelecionada}
                </h2>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">Novo Aluno</h3>
                  
                  <input
                    type="text"
                    value={novoAluno.nome}
                    onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                    placeholder="Nome do aluno"
                  />

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Disciplinas</label>
                      <button
                        onClick={adicionarDisciplina}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Disciplina
                      </button>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(novoAluno.disciplinas).map(([disciplina, dados]) => (
                        <div key={disciplina} className="bg-white p-3 rounded-lg border">
                          <div className="flex gap-2 items-center mb-2">
                            <input
                              type="text"
                              value={disciplina}
                              disabled
                              className="flex-1 px-3 py-2 border border-gray-300 rounded bg-gray-100 font-medium"
                            />
                            <button
                              onClick={() => removerDisciplina(disciplina)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="text-xs text-gray-600 mb-1 block">Nota</label>
                              <input
                                type="text"
                                value={dados.nota || ''}
                                onChange={(e) => atualizarDisciplina(disciplina, 'nota', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="Ex: 8.5"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="text-xs text-gray-600 mb-1 block">Faltas</label>
                              <input
                                type="text"
                                value={dados.faltas || ''}
                                onChange={(e) => atualizarDisciplina(disciplina, 'faltas', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                placeholder="Ex: 3"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={adicionarAluno}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Adicionar Aluno
                  </button>
                </div>

                <div className="space-y-3">
                  {(alunos[turmaSelecionada] || []).map((aluno, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-800 text-lg">{aluno.nome}</h4>
                        <button
                          onClick={() => removerAluno(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      {Object.keys(aluno.disciplinas).length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(aluno.disciplinas).map(([disc, dados]) => {
                            const nota = typeof dados === 'object' ? dados.nota : dados;
                            const faltas = typeof dados === 'object' ? dados.faltas : '';
                            
                            return (
                              <div key={disc} className="bg-gray-50 p-3 rounded">
                                <div className="font-medium text-gray-700 mb-1">{disc}</div>
                                <div className="flex gap-4 text-sm">
                                  <span className="text-gray-600">Nota: <strong>{nota || '-'}</strong></span>
                                  <span className="text-gray-600">Faltas: <strong>{faltas || '0'}</strong></span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Sem disciplinas</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
