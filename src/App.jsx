import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  // Disciplinas completas por turma
  const disciplinas = {
    TEM2: [
      { nome: 'Técnicas Básicas de Enfermagem', modulo: '1', cargaTeorica: 130, cargaEstagio: 150 },
      { nome: 'Anatomia e Fisiologia humanas', modulo: '1', cargaTeorica: 80, cargaEstagio: null },
      { nome: 'Nutrição e Dietética', modulo: '1', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Microbiologia e Parasitologia', modulo: '1', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Primeiros Socorros', modulo: '1', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Farmacologia Aplicada à Enfermagem', modulo: '1', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Ética Profissional I', modulo: '1', cargaTeorica: 20, cargaEstagio: null },
      { nome: 'Psicologia Aplicada à Enfermagem', modulo: '1', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Enfermagem Médica', modulo: '1', cargaTeorica: 70, cargaEstagio: 90 },
      { nome: 'Enfermagem em Saúde Coletiva e Higiene', modulo: '1', cargaTeorica: 40, cargaEstagio: 40 },
      { nome: 'Enfermagem em Centro Cirúrgico', modulo: '1', cargaTeorica: 40, cargaEstagio: 20 },
      { nome: 'Enfermagem Cirúrgica', modulo: '1', cargaTeorica: 70, cargaEstagio: 60 },
      { nome: 'Enf. no Processo de Cuidar em Materno Infantil I', modulo: '1', cargaTeorica: 60, cargaEstagio: 40 },
      { nome: 'Enfermagem em Geriatria', modulo: '1', cargaTeorica: 20, cargaEstagio: null },
      { nome: 'Administração em Unidade de Enfermagem', modulo: '2', cargaTeorica: 50, cargaEstagio: 24 },
      { nome: 'Enfermagem em Saúde Pública', modulo: '2', cargaTeorica: 50, cargaEstagio: 40 },
      { nome: 'Enf. no Processo de cuidar em Materno-Infantil II', modulo: '2', cargaTeorica: 60, cargaEstagio: 20 },
      { nome: 'Enf. em Centro Cirúrgico e Central de Material de Esterilização', modulo: '2', cargaTeorica: 40, cargaEstagio: 20 },
      { nome: 'Enf. no Cuidado de Paciente de Alta Dependência', modulo: '2', cargaTeorica: 100, cargaEstagio: 20 },
      { nome: 'Enfermagem em Urgência e Emergência', modulo: '2', cargaTeorica: 70, cargaEstagio: 76 },
      { nome: 'Enfermagem em Saúde Mental', modulo: '2', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Enfermagem Domiciliária', modulo: '2', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Ética Profissional II', modulo: '2', cargaTeorica: 20, cargaEstagio: null },
      { nome: 'Gestão em Enfermagem', modulo: '2', cargaTeorica: 40, cargaEstagio: null }
    ],
    TRN2: [
      { nome: 'Anatomia Básica', modulo: '1', cargaTeorica: 100, cargaEstagio: null },
      { nome: 'Radiologia Elementar', modulo: '1', cargaTeorica: 20, cargaEstagio: null },
      { nome: 'Psicologia e Ética', modulo: '1', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Fisiologia Humana', modulo: '1', cargaTeorica: 50, cargaEstagio: null },
      { nome: 'Física Radiológica', modulo: '1', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Proteção Radiológica1', modulo: '1', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Patologia', modulo: '1', cargaTeorica: 50, cargaEstagio: null },
      { nome: 'Primeiros Socorros', modulo: '1', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Atomística', modulo: '1', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Processamento de Imagens', modulo: '1', cargaTeorica: 40, cargaEstagio: 40 },
      { nome: 'Princípios Básicos de Posicionamento', modulo: '1', cargaTeorica: 30, cargaEstagio: 40 },
      { nome: 'Políticas de Saúde', modulo: '2', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Anatomia Radiológica1', modulo: '2', cargaTeorica: 70, cargaEstagio: null },
      { nome: 'Legislação Radiológica, Previdenciária e Trabalhista', modulo: '2', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Administração de Serviços Radiológicos', modulo: '2', cargaTeorica: 20, cargaEstagio: null },
      { nome: 'Farmacologia', modulo: '2', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Noções de Tomografia Computadorizada e Ressonância Magnética', modulo: '2', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Proteção Radiológica2', modulo: '2', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: '2', cargaTeorica: 100, cargaEstagio: 160 },
      { nome: 'Exames Contrastados', modulo: '3', cargaTeorica: 70, cargaEstagio: 60 },
      { nome: 'Mamografia', modulo: '3', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Técnica de Posicionamento Especial', modulo: '3', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Radiologia Veterinária', modulo: '3', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Radiologia Odontológica', modulo: '3', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Radioterapia', modulo: '3', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Radioisotopia e Medicina Nuclear', modulo: '3', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Radiologia Industrial', modulo: '3', cargaTeorica: 30, cargaEstagio: null },
      { nome: 'Anatomia Radiológica2', modulo: '3', cargaTeorica: 60, cargaEstagio: null }
    ],
    N1: [
      { nome: 'Anatomia', modulo: '1', cargaTeorica: 60, cargaEstagio: null },
      { nome: 'Biologia', modulo: '1', cargaTeorica: 20, cargaEstagio: null },
      { nome: 'Higiene Biossegurança', modulo: '1', cargaTeorica: 32, cargaEstagio: null },
      { nome: 'Fisiologia', modulo: '1', cargaTeorica: 44, cargaEstagio: null },
      { nome: 'Ética Profissional', modulo: '1', cargaTeorica: 24, cargaEstagio: null },
      { nome: 'Língua Portuguesa', modulo: '1', cargaTeorica: 28, cargaEstagio: null },
      { nome: 'Medicina Legal', modulo: '1', cargaTeorica: 32, cargaEstagio: null },
      { nome: 'Raciocínio Lógico', modulo: '1', cargaTeorica: 28, cargaEstagio: null },
      { nome: 'Tanatologia Forense', modulo: '1', cargaTeorica: 24, cargaEstagio: null },
      { nome: 'Técnicas de Necropsia', modulo: '1', cargaTeorica: 40, cargaEstagio: null },
      { nome: 'Traumatologia Forense', modulo: '1', cargaTeorica: 28, cargaEstagio: null }
    ]
  };

  useEffect(() => {
    const storedTurmas = Object.keys(disciplinas);
    setTurmas(storedTurmas);
    setNovoAluno({ nome: '', disciplinas: {} });
    setNotasEncontradas(null);
    setTurmaSelecionada('');
    setTurmaAluno('');
    setNomeAluno('');
    setAutenticado(false);
    setSenhaAdmin('');
  }, []);

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) return alert('Preencha seu nome e turma!');
    const alunosTurma = JSON.parse(localStorage.getItem(`alunos_${turmaAluno}`)) || [];
    const aluno = alunosTurma.find(a => a.nome.toLowerCase() === nomeAluno.toLowerCase());
    if (aluno) setNotasEncontradas(aluno);
    else { alert('Aluno não encontrado nesta turma!'); setNotasEncontradas(null); }
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno.nome.trim()) return alert('Preencha turma e nome do aluno!');
    const alunosTurma = JSON.parse(localStorage.getItem(`alunos_${turmaSelecionada}`)) || [];
    const disciplinasAluno = {};
    disciplinas[turmaSelecionada].forEach(d => {
      disciplinasAluno[d.nome] = { ...d, nota: '', faltas: '', aprovado: '', media: '' };
    });
    alunosTurma.push({ nome: novoAluno.nome, disciplinas: disciplinasAluno });
    localStorage.setItem(`alunos_${turmaSelecionada}`, JSON.stringify(alunosTurma));
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const atualizarDisciplina = (idxAluno, nomeDisc, campo, valor) => {
    const alunosTurma = JSON.parse(localStorage.getItem(`alunos_${turmaSelecionada}`)) || [];
    alunosTurma[idxAluno].disciplinas[nomeDisc][campo] = valor;
    localStorage.setItem(`alunos_${turmaSelecionada}`, JSON.stringify(alunosTurma));
    setTurmaSelecionada(turmaSelecionada);
  };

  const carregarAlunos = (turma) => JSON.parse(localStorage.getItem(`alunos_${turma}`)) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
          <img src="https://i.imgur.com/lD9BrRR.jpeg" alt="Logo Ana Nery" className="mx-auto h-20 w-20 object-contain mb-2"/>
          <div className="text-lg font-bold text-red-600">Sistema de Notas e Faltas</div>
          <div className="text-sm text-gray-700">ANA NERY BAURU - Sistema Integrado de Ensino Técnico LTDA</div>
          <div className="text-xs text-gray-500">CNPJ – 08.036.462/0001-70</div>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          <button onClick={()=>setModo('aluno')}
            className={`px-6 py-2 rounded-lg font-medium ${modo==='aluno'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Consultar Notas
          </button>
          <button onClick={()=>setModo('admin')}
            className={`px-6 py-2 rounded-lg font-medium ${modo==='admin'?'bg-red-600 text-white':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Área do Professor
          </button>
        </div>

        {modo==='aluno' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consultar Notas e Faltas</h2>
            <div className="space-y-4">
              <input type="text" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)}
                className="w-full px-4 py-2 border rounded" placeholder="Digite seu nome"/>
              <select value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)} className="w-full px-4 py-2 border rounded">
                <option value="">Selecione sua turma</option>
                {turmas.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={buscarNotas} className="w-full bg-blue-600 text-white py-2 rounded">Buscar Notas</button>
            </div>

            {notasEncontradas && (
              <div className="mt-6 overflow-auto max-h-[500px]">
                <table className="w-full border border-gray-300 border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-1">Disciplina</th>
                      <th className="border p-1">Módulo</th>
                      <th className="border p-1">Nota</th>
                      <th className="border p-1">Faltas</th>
                      <th className="border p-1">Aprovado/Retido</th>
                      <th className="border p-1">Carga Teórica</th>
                      <th className="border p-1">Carga Estágio</th>
                      <th className="border p-1">Média</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(notasEncontradas.disciplinas).map(([nome, d])=>(
                      <tr key={nome}>
                        <td className="border p-1">{nome}</td>
                        <td className="border p-1">{d.modulo}</td>
                        <td className="border p-1">{d.nota}</td>
                        <td className="border p-1">{d.faltas}</td>
                        <td className="border p-1">{d.aprovado}</td>
                        <td className="border p-1">{d.cargaTeorica}</td>
                        <td className="border p-1">{d.cargaEstagio||'-'}</td>
                        <td className="border p-1">{d.media}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {modo==='admin' && !autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login do Professor</h2>
            <div className="relative mb-4">
              <input type={mostrarSenha?'text':'password'} value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)}
                className="w-full px-4 py-2 border rounded" placeholder="Senha"/>
              <div className="absolute right-3 top-2 cursor-pointer" onClick={()=>setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha?<EyeOff size={20}/>:<Eye size={20}/>}
              </div>
            </div>
            <button onClick={fazerLogin} className="w-full bg-red-600 text-white py-2 rounded">Entrar</button>
          </div>
        )}

        {modo==='admin' && autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto max-h-[600px]">
            <h2 className="text-2xl font-semibold mb-4">Área do Professor</h2>

            <select className="mb-4 w-full px-3 py-2 border rounded" value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
              <option value="">Selecione uma turma</option>
              {turmas.map(t=><option key={t} value={t}>{t}</option>)}
            </select>

            {turmaSelecionada && (
              <div>
                <h3 className="font-bold text-lg mb-2">Adicionar Novo Aluno</h3>
                <input type="text" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno,nome:e.target.value})}
                  placeholder="Nome do aluno" className="w-full px-3 py-2 border rounded mb-3"/>
                <button onClick={adicionarAluno} className="mb-4 bg-red-600 text-white px-4 py-2 rounded">Adicionar</button>

                <h3 className="font-bold text-lg mb-2">Alunos da Turma {turmaSelecionada}</h3>
                {carregarAlunos(turmaSelecionada).map((aluno, idx)=>(
                  <div key={idx} className="mb-4 border rounded p-2 overflow-auto max-h-[300px]">
                    <div className="font-semibold text-left mb-2">{aluno.nome}</div>
                    <table className="w-full border border-gray-300 border-collapse text-sm">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="border p-1">Disciplina</th>
                          <th className="border p-1">Módulo</th>
                          <th className="border p-1">Nota</th>
                          <th className="border p-1">Faltas</th>
                          <th className="border p-1">Aprovado/Retido</th>
                          <th className="border p-1">Carga Teórica</th>
                          <th className="border p-1">Carga Estágio</th>
                          <th className="border p-1">Média</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(aluno.disciplinas).map(([nome, d])=>(
                          <tr key={nome}>
                            <td className="border p-1">{nome}</td>
                            <td className="border p-1">{d.modulo}</td>
                            <td className="border p-1">
                              <input type="text" value={d.nota} onChange={e=>atualizarDisciplina(idx,nome,'nota',e.target.value)}
                                className="w-full px-1 py-0.5 border rounded"/>
                            </td>
                            <td className="border p-1">
                              <input type="text" value={d.faltas} onChange={e=>atualizarDisciplina(idx,nome,'faltas',e.target.value)}
                                className="w-full px-1 py-0.5 border rounded"/>
                            </td>
                            <td className="border p-1">
                              <input type="text" value={d.aprovado} onChange={e=>atualizarDisciplina(idx,nome,'aprovado',e.target.value)}
                                className="w-full px-1 py-0.5 border rounded"/>
                            </td>
                            <td className="border p-1">{d.cargaTeorica}</td>
                            <td className="border p-1">{d.cargaEstagio||'-'}</td>
                            <td className="border p-1">
                              <input type="text" value={d.media} onChange={e=>atualizarDisciplina(idx,nome,'media',e.target.value)}
                                className="w-full px-1 py-0.5 border rounded"/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
