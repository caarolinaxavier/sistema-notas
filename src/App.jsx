import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Trash2, Eye, EyeOff } from 'lucide-react';
import './App.css';

export default function App() {
  const [modo, setModo] = useState('aluno'); // aluno/admin
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);

  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  const disciplinasPorCurso = {
    TEM2: [
      { nome: 'Técnicas Básicas de Enfermagem', modulo: 1, teórica: 130, estagio: 150 },
      { nome: 'Anatomia e Fisiologia humanas', modulo: 1, teórica: 80 },
      { nome: 'Nutrição e Dietética', modulo: 1, teórica: 30 },
      { nome: 'Microbiologia e Parasitologia', modulo: 1, teórica: 40 },
      { nome: 'Primeiros Socorros', modulo: 1, teórica: 40 },
      { nome: 'Farmacologia Aplicada à Enfermagem', modulo: 1, teórica: 40 },
      { nome: 'Ética Profissional I', modulo: 1, teórica: 20 },
      { nome: 'Psicologia Aplicada à Enfermagem', modulo: 1, teórica: 30 },
      { nome: 'Enfermagem Médica', modulo: 1, teórica: 70, estagio: 90 },
      { nome: 'Enfermagem em Saúde Coletiva e Higiene', modulo: 1, teórica: 40, estagio: 40 },
      { nome: 'Enfermagem em Centro Cirúrgico', modulo: 1, teórica: 40, estagio: 20 },
      { nome: 'Enfermagem Cirúrgica', modulo: 1, teórica: 70, estagio: 60 },
      { nome: 'Enf. no Processo de Cuidar em Materno Infantil I', modulo: 1, teórica: 60, estagio: 40 },
      { nome: 'Enfermagem em Geriatria', modulo: 1, teórica: 20 },
      { nome: 'Administração em Unidade de Enfermagem', modulo: 2, teórica: 50, estagio: 24 },
      { nome: 'Enfermagem em Saúde Pública', modulo: 2, teórica: 50, estagio: 40 },
      { nome: 'Enf. no Processo de cuidar em Materno-Infantil II', modulo: 2, teórica: 60, estagio: 20 },
      { nome: 'Enf. em Centro Cirúrgico e Central de Material de Esterilização', modulo: 2, teórica: 40, estagio: 20 },
      { nome: 'Enf. no Cuidado de Paciente de Alta Dependência', modulo: 2, teórica: 100, estagio: 20 },
      { nome: 'Enfermagem em Urgência e Emergência', modulo: 2, teórica: 70, estagio: 76 },
      { nome: 'Enfermagem em Saúde Mental', modulo: 2, teórica: 30 },
      { nome: 'Enfermagem Domiciliária', modulo: 2, teórica: 30 },
      { nome: 'Ética Profissional II', modulo: 2, teórica: 20 },
      { nome: 'Gestão em Enfermagem', modulo: 2, teórica: 40 },
    ],
    TEM3: [], // pode replicar TEM2 ou adaptar
    TEM4: [], TEM5: [], TEN2: [], TEN3: [], TEN4: [], TEN5: [], TEN6: [], TEN7: [],
    TRN1: [
      { nome: 'Anatomia Básica', modulo: 1, teórica: 100 },
      { nome: 'Radiologia Elementar', modulo: 1, teórica: 20 },
      { nome: 'Psicologia e Ética', modulo: 1, teórica: 40 },
      { nome: 'Fisiologia Humana', modulo: 1, teórica: 50 },
      { nome: 'Física Radiológica', modulo: 1, teórica: 40 },
      { nome: 'Proteção Radiológica1', modulo: 1, teórica: 40 },
      { nome: 'Patologia', modulo: 1, teórica: 50 },
      { nome: 'Primeiros Socorros', modulo: 1, teórica: 30 },
      { nome: 'Atomística', modulo: 1, teórica: 30 },
      { nome: 'Processamento de Imagens', modulo: 1, teórica: 40, estagio: 40 },
      { nome: 'Princípios Básicos de Posicionamento', modulo: 1, teórica: 30, estagio: 40 },
      { nome: 'Técnicas de Posicionamento em Diagnóstico Médico', modulo: 3, estagio: 100 },
    ],
    TRN2: [
      { nome: 'Anatomia Básica', modulo: 1, teórica: 100 },
      { nome: 'Radiologia Elementar', modulo: 1, teórica: 20 },
      { nome: 'Psicologia e Ética', modulo: 1, teórica: 40 },
      { nome: 'Fisiologia Humana', modulo: 1, teórica: 50 },
      { nome: 'Física Radiológica', modulo: 1, teórica: 40 },
      { nome: 'Proteção Radiológica1', modulo: 1, teórica: 40 },
      { nome: 'Patologia', modulo: 1, teórica: 50 },
      { nome: 'Primeiros Socorros', modulo: 1, teórica: 30 },
      { nome: 'Atomística', modulo: 1, teórica: 30 },
      { nome: 'Processamento de Imagens', modulo: 1, teórica: 40, estagio: 40 },
      { nome: 'Princípios Básicos de Posicionamento', modulo: 1, teórica: 30, estagio: 40 },
      { nome: 'Técnicas de Posicionamento em Diagnóstico Médico', modulo: 3, estagio: 100 },
    ],
    N1: [
      { nome: 'Anatomia', modulo: 1, teórica: 60 },
      { nome: 'Biologia', modulo: 1, teórica: 20 },
      { nome: 'Higiene Biossegurança', modulo: 1, teórica: 32 },
      { nome: 'Fisiologia', modulo: 1, teórica: 44 },
      { nome: 'Ética Profissional', modulo: 1, teórica: 24 },
      { nome: 'Língua Portuguesa', modulo: 1, teórica: 28 },
      { nome: 'Medicina Legal', modulo: 1, teórica: 32 },
      { nome: 'Raciocínio Lógico', modulo: 1, teórica: 28 },
      { nome: 'Tanatologia Forense', modulo: 1, teórica: 24 },
      { nome: 'Técnicas de Necropsia', modulo: 1, teórica: 40 },
      { nome: 'Traumatologia Forense', modulo: 1, teórica: 28 },
    ],
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const turmasSalvas = Object.keys(disciplinasPorCurso);
    setTurmas(turmasSalvas);

    const alunosCarregados = {};
    turmasSalvas.forEach(turma => {
      const dados = localStorage.getItem(`alunos_${turma}`);
      alunosCarregados[turma] = dados ? JSON.parse(dados) : [];
    });
    setNovoAluno({ nome: '', disciplinas: {} });
    setTurmaSelecionada('');
    setNotasEncontradas(null);
  };

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno.nome.trim()) return alert('Preencha o nome e selecione a turma');

    const alunosTurma = JSON.parse(localStorage.getItem(`alunos_${turmaSelecionada}`) || '[]');
    const alunoParaAdicionar = {
      ...novoAluno,
      disciplinas: disciplinasPorCurso[turmaSelecionada].reduce((acc, disc) => {
        acc[disc.nome] = { ...disc, nota: '', faltas: '', aprovado: '' };
        return acc;
      }, {}),
    };
    alunosTurma.push(alunoParaAdicionar);
    alunosTurma.sort((a,b)=>a.nome.localeCompare(b.nome));
    localStorage.setItem(`alunos_${turmaSelecionada}`, JSON.stringify(alunosTurma));
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const atualizarDisciplina = (alunoIndex, disc, campo, valor) => {
    const alunosTurma = JSON.parse(localStorage.getItem(`alunos_${turmaSelecionada}`) || '[]');
    alunosTurma[alunoIndex].disciplinas[disc][campo] = valor;
    localStorage.setItem(`alunos_${turmaSelecionada}`, JSON.stringify(alunosTurma));
    carregarDados();
  };

  const exportarDados = () => {
    const dados = {};
    turmas.forEach(turma => {
      dados[turma] = JSON.parse(localStorage.getItem(`alunos_${turma}`) || '[]');
    });
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'backup_notas.json';
    a.click();
  };

  const importarDados = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = evt => {
      const dados = JSON.parse(evt.target.result);
      Object.keys(dados).forEach(turma => {
        localStorage.setItem(`alunos_${turma}`, JSON.stringify(dados[turma]));
      });
      carregarDados();
      alert('Dados importados com sucesso!');
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-6">
          <img src="/logo.png" alt="Logo Ana Nery" className="h-20 w-20 object-contain" />
          <div>
            <h1 className="text-2xl font-bold">Sistema de Notas e Estágio</h1>
            <p className="text-gray-600">Visualize ou gerencie informações dos alunos</p>
          </div>
        </div>

        {/* Modo */}
        {modo === 'aluno' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Área do Aluno</h2>
            <input
              type="text"
              placeholder="Nome do aluno"
              value={nomeAluno}
              onChange={e => setNomeAluno(e.target.value)}
              className="border rounded px-2 py-1 w-full mb-2"
            />
            <select
              value={turmaAluno}
              onChange={e => setTurmaAluno(e.target.value)}
              className="border rounded px-2 py-1 w-full mb-2"
            >
              <option value="">Selecione a turma</option>
              {turmas.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
              onClick={() => {
                const alunosTurma = JSON.parse(localStorage.getItem(`alunos_${turmaAluno}`) || '[]');
                const encontrado = alunosTurma.find(a => a.nome.toLowerCase() === nomeAluno.toLowerCase());
                if (!encontrado) return alert('Aluno não encontrado');
                setNotasEncontradas(encontrado);
              }}
            >
              Buscar
            </button>

            {notasEncontradas && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">{notasEncontradas.nome}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(notasEncontradas.disciplinas).map(d => {
                    const disc = notasEncontradas.disciplinas[d];
                    return (
                      <div key={d} className="border rounded p-2">
                        <strong>{disc.nome}</strong> (Módulo {disc.modulo})<br/>
                        Teórica: {disc.teórica || '-'}<br/>
                        Estágio: {disc.estagio || '-'}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              className="mt-4 text-sm text-gray-500 underline"
              onClick={() => setModo('admin')}
            >
              Área do Professor
            </button>
          </div>
        )}

        {/* Área do professor */}
        {modo === 'admin' && !autenticado && (
          <div className="max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">Login do Professor</h2>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Senha"
              value={senhaAdmin}
              onChange={e => setSenhaAdmin(e.target.value)}
              className="border rounded px-2 py-1 w-full mb-2"
            />
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={mostrarSenha} onChange={() => setMostrarSenha(!mostrarSenha)} />
              Mostrar senha
            </label>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              onClick={fazerLogin}
            >
              Entrar
            </button>
          </div>
        )}

        {modo === 'admin' && autenticado && (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Área do Professor</h2>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={exportarDados}>Backup</button>
                <label className="bg-gray-200 px-3 py-1 rounded cursor-pointer">
                  Importar
                  <input type="file" className="hidden" onChange={importarDados} />
                </label>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={()=>setModo('aluno')}>Sair</button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Selecione a turma:</label>
              <select
                value={turmaSelecionada}
                onChange={e => setTurmaSelecionada(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Selecione a turma</option>
                {turmas.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Nome do aluno"
                value={novoAluno.nome}
                onChange={e => setNovoAluno({...novoAluno, nome: e.target.value})}
                className="border rounded px-2 py-1 w-full mb-2"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={adicionarAluno}
              >
                Adicionar Aluno
              </button>
            </div>

            {turmaSelecionada && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Alunos da turma {turmaSelecionada}</h3>
                {(JSON.parse(localStorage.getItem(`alunos_${turmaSelecionada}`) || '[]'))
                  .sort((a,b)=>a.nome.localeCompare(b.nome))
                  .map((aluno, index) => (
                  <div key={index} className="aluno-card">
                    <strong>{aluno.nome}</strong>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      {Object.keys(aluno.disciplinas).map(disc => {
                        const discObj = aluno.disciplinas[disc];
                        return (
                          <div key={disc} className="border rounded p-2">
                            <strong>{discObj.nome}</strong> (Módulo <input
                              type="number"
                              value={discObj.modulo}
                              onChange={e => atualizarDisciplina(index, disc, 'modulo', e.target.value)}
                              className="w-12 border px-1 rounded"
                            />)
                            <br/>
                            Teórica: <input
                              type="number"
                              value={discObj.teórica || ''}
                              onChange={e => atualizarDisciplina(index, disc, 'teórica', e.target.value)}
                              className="w-16 border px-1 rounded"
                            />
                            <br/>
                            Estágio: <input
                              type="number"
                              value={discObj.estagio || ''}
                              onChange={e => atualizarDisciplina(index, disc, 'estagio', e.target.value)}
                              className="w-16 border px-1 rounded"
                            />
                            <br/>
                            Nota: <input
                              type="text"
                              value={discObj.nota}
                              onChange={e => atualizarDisciplina(index, disc, 'nota', e.target.value)}
                              className="w-16 border px-1 rounded"
                            />
                            <br/>
                            Faltas: <input
                              type="text"
                              value={discObj.faltas}
                              onChange={e => atualizarDisciplina(index, disc, 'faltas', e.target.value)}
                              className="w-16 border px-1 rounded"
                            />
                            <br/>
                            Aprovado/Retido: <input
                              type="text"
                              value={discObj.aprovado}
                              onChange={e => atualizarDisciplina(index, disc, 'aprovado', e.target.value)}
                              className="w-24 border px-1 rounded"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
