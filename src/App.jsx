import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  // Disciplinas por curso e módulo
  const disciplinasPorTurma = {
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
      { nome: 'Gestão em Enfermagem', modulo: 2, cargaTeorica: 40 }
    ],
    TEM3: [], TEM4: [], TEM5: [], TEN2: [], TEN3: [], TEN4: [], TEN5: [], TEN6: [], TEN7: [],
    // RADIOLGIA
    TRN1: [
      { nome: 'Anatomia Básica', modulo:1, cargaTeorica:100 },
      { nome: 'Radiologia Elementar', modulo:1, cargaTeorica:20 },
      { nome: 'Psicologia e Ética', modulo:1, cargaTeorica:40 },
      { nome: 'Fisiologia Humana', modulo:1, cargaTeorica:50 },
      { nome: 'Física Radiológica', modulo:1, cargaTeorica:40 },
      { nome: 'Proteção Radiológica1', modulo:1, cargaTeorica:40 },
      { nome: 'Patologia', modulo:1, cargaTeorica:50 },
      { nome: 'Primeiros Socorros', modulo:1, cargaTeorica:30 },
      { nome: 'Atomística', modulo:1, cargaTeorica:30 },
      { nome: 'Processamento de Imagens', modulo:1, cargaTeorica:40, cargaEstagio:40 },
      { nome: 'Princípios Básicos de Posicionamento', modulo:1, cargaTeorica:30, cargaEstagio:40 }
    ],
    TRN2: [
      { nome: 'Políticas de Saúde', modulo:2, cargaTeorica:30 },
      { nome: 'Anatomia Radiológica1', modulo:2, cargaTeorica:70 },
      { nome: 'Legislação Radiológica, Previdenciária e Trabalhista', modulo:2, cargaTeorica:40 },
      { nome: 'Administração de Serviços Radiológicos', modulo:2, cargaTeorica:20 },
      { nome: 'Farmacologia', modulo:2, cargaTeorica:30 },
      { nome: 'Noções de Tomografia Computadorizada e Ressonância Magnética', modulo:2, cargaTeorica:40 },
      { nome: 'Proteção Radiológica2', modulo:2, cargaTeorica:40 },
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo:2, cargaTeorica:100, cargaEstagio:160 },
      { nome: 'Exames Contrastados', modulo:3, cargaTeorica:70, cargaEstagio:60 },
      { nome: 'Mamografia', modulo:3, cargaTeorica:40 },
      { nome: 'Técnica de Posicionamento Especial', modulo:3, cargaTeorica:40 },
      { nome: 'Radiologia Veterinária', modulo:3, cargaTeorica:30 },
      { nome: 'Radiologia Odontológica', modulo:3, cargaTeorica:30 },
      { nome: 'Radioterapia', modulo:3, cargaTeorica:30 },
      { nome: 'Radioisotopia e Medicina Nuclear', modulo:3, cargaTeorica:30 },
      { nome: 'Radiologia Industrial', modulo:3, cargaTeorica:30 },
      { nome: 'Anatomia Radiológica2', modulo:3, cargaTeorica:60 }
    ],
    // NECROPSIA
    N1: [
      { nome: 'Anatomia', modulo:1, cargaTeorica:60 },
      { nome: 'Biologia', modulo:1, cargaTeorica:20 },
      { nome: 'Higiene Biossegurança', modulo:1, cargaTeorica:32 },
      { nome: 'Fisiologia', modulo:1, cargaTeorica:44 },
      { nome: 'Ética Profissional', modulo:1, cargaTeorica:24 },
      { nome: 'Língua Portuguesa', modulo:1, cargaTeorica:28 },
      { nome: 'Medicina Legal', modulo:1, cargaTeorica:32 },
      { nome: 'Raciocínio Lógico', modulo:1, cargaTeorica:28 },
      { nome: 'Tanatologia Forense', modulo:1, cargaTeorica:24 },
      { nome: 'Técnicas de Necropsia', modulo:1, cargaTeorica:40 },
      { nome: 'Traumatologia Forense', modulo:1, cargaTeorica:28 }
    ]
  };

  useEffect(() => {
    const turmasSalvas = Object.keys(disciplinasPorTurma);
    setTurmas(turmasSalvas);
    const alunosSalvos = {};
    turmasSalvas.forEach(t => {
      const data = localStorage.getItem('alunos_'+t);
      if(data) alunosSalvos[t] = JSON.parse(data);
      else alunosSalvos[t] = [];
    });
    setAlunos(alunosSalvos);
  }, []);

  const [alunos, setAlunos] = useState({});

  const salvarAlunos = (turma, alunosTurma) => {
    localStorage.setItem('alunos_'+turma, JSON.stringify(alunosTurma));
    setAlunos(prev => ({ ...prev, [turma]: alunosTurma }));
  }

  const fazerLogin = () => {
    if(senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta');
  }

  const buscarNotas = () => {
    if(!nomeAluno || !turmaAluno){ alert('Preencha nome e turma'); return; }
    const aluno = alunos[turmaAluno]?.find(a => a.nome.toLowerCase()===nomeAluno.toLowerCase());
    if(aluno) setNotasEncontradas(aluno);
    else { setNotasEncontradas(null); alert('Aluno não encontrado'); }
  }

  const adicionarAluno = () => {
    if(!turmaSelecionada || !novoAluno.nome.trim()) { alert('Selecione turma e digite nome'); return; }
    // Cria disciplinas automaticamente
    const disciplinasAuto = {};
    disciplinasPorTurma[turmaSelecionada].forEach(d => {
      disciplinasAuto[d.nome] = { ...d, nota:'', faltas:'', aprovado:'' };
    });
    const alunoNovo = { nome: novoAluno.nome.trim(), disciplinas: disciplinasAuto };
    const lista = [...(alunos[turmaSelecionada]||[]), alunoNovo];
    salvarAlunos(turmaSelecionada, lista);
    setNovoAluno({ nome:'', disciplinas:{} });
  }

  const atualizarDisciplina = (idxAluno, nomeDisc, campo, valor) => {
    const lista = [...alunos[turmaSelecionada]];
    lista[idxAluno].disciplinas[nomeDisc][campo] = valor;
    salvarAlunos(turmaSelecionada, lista);
  }

  const removerAluno = (idxAluno) => {
    if(!window.confirm('Remover aluno?')) return;
    const lista = [...alunos[turmaSelecionada]];
    lista.splice(idxAluno,1);
    salvarAlunos(turmaSelecionada, lista);
  }

  const carregarAlunos = (turma) => alunos[turma]||[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-1">ANA NERY BAURU</div>
            <div className="text-xs text-gray-500 mb-1">Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</div>
            <div className="text-xs text-gray-500 mb-4">CNPJ – 08.036.462/0001-70</div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="https://i.imgur.com/lD9BrRR.jpeg" alt="Logo Ana Nery" className="h-20 w-20 object-contain"/>
            <h1 className="text-3xl font-bold text-red-600">Sistema de Notas e Faltas</h1>
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={()=>{setModo('aluno'); setAutenticado(false); setSenhaAdmin('');}}
              className={`px-6 py-2 rounded-lg font-medium ${modo==='aluno'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Consultar Notas
            </button>
            <button onClick={()=>setModo('admin')}
              className={`px-6 py-2 rounded-lg font-medium ${modo==='admin'?'bg-red-600 text-white':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Área do Professor
            </button>
          </div>
        </div>

        {modo==='aluno' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Consultar Minhas Notas e Faltas</h2>
            <div className="space-y-4">
              <input type="text" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)}
                className="w-full px-4 py-2 border rounded" placeholder="Seu nome"/>
              <select value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}
                className="w-full px-4 py-2 border rounded">
                <option value="">Selecione a turma</option>
                {turmas.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={buscarNotas} className="w-full bg-blue-600 text-white py-2 rounded">Buscar</button>
            </div>
            {notasEncontradas && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border border-gray-300 border-collapse table-fixed">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-1">Disciplina</th>
                      <th className="border p-1">Módulo</th>
                      <th className="border p-1">Nota</th>
                      <th className="border p-1">Faltas</th>
                      <th className="border p-1">Aprovado/Retido</th>
                      <th className="border p-1">Teórico</th>
                      <th className="border p-1">Estágio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(notasEncontradas.disciplinas).map(([nomeDisc, info])=>(
                      <tr key={nomeDisc}>
                        <td className="border p-1">{nomeDisc}</td>
                        <td className="border p-1">{info.modulo}</td>
                        <td className="border p-1">{info.nota}</td>
                        <td className="border p-1">{info.faltas}</td>
                        <td className="border p-1">{info.aprovado}</td>
                        <td className="border p-1">{info.cargaTeorica}</td>
                        <td className="border p-1">{info.cargaEstagio||'-'}</td>
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
            <h2 className="text-2xl font-semibold mb-4">Login do Professor</h2>
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
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Área do Professor</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <select value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}
                className="px-4 py-2 border rounded flex-1">
                <option value="">Selecione turma</option>
                {turmas.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              <input type="text" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno, nome:e.target.value})}
                className="px-4 py-2 border rounded flex-1" placeholder="Nome do aluno"/>
              <button onClick={adicionarAluno} className="bg-green-600 text-white px-4 py-2 rounded">Adicionar Aluno</button>
            </div>

            {turmaSelecionada && carregarAlunos(turmaSelecionada).length>0 && (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 border-collapse table-fixed">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-1">Aluno</th>
                      <th className="border p-1">Disciplina</th>
                      <th className="border p-1">Módulo</th>
                      <th className="border p-1">Nota</th>
                      <th className="border p-1">Faltas</th>
                      <th className="border p-1">Aprovado/Retido</th>
                      <th className="border p-1">Teórico</th>
                      <th className="border p-1">Estágio</th>
                      <th className="border p-1">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carregarAlunos(turmaSelecionada).map((aluno, idxAluno)=>(
                      Object.entries(aluno.disciplinas).map(([nomeDisc, info], idxDisc)=>(
                        <tr key={idxAluno+'-'+idxDisc}>
                          {idxDisc===0 && (
                            <td className="border p-1" rowSpan={Object.keys(aluno.disciplinas).length}>{aluno.nome}</td>
                          )}
                          <td className="border p-1">{nomeDisc}</td>
                          <td className="border p-1">{info.modulo}</td>
                          <td className="border p-1">
                            <input type="text" value={info.nota} onChange={e=>atualizarDisciplina(idxAluno,nomeDisc,'nota',e.target.value)}
                              className="w-full px-1 py-0.5 border rounded"/>
                          </td>
                          <td className="border p-1">
                            <input type="text" value={info.faltas} onChange={e=>atualizarDisciplina(idxAluno,nomeDisc,'faltas',e.target.value)}
                              className="w-full px-1 py-0.5 border rounded"/>
                          </td>
                          <td className="border p-1">
                            <input type="text" value={info.aprovado} onChange={e=>atualizarDisciplina(idxAluno,nomeDisc,'aprovado',e.target.value)}
                              className="w-full px-1 py-0.5 border rounded"/>
                          </td>
                          <td className="border p-1">{info.cargaTeorica}</td>
                          <td className="border p-1">{info.cargaEstagio||'-'}</td>
                          {idxDisc===0 && (
                            <td className="border p-1" rowSpan={Object.keys(aluno.disciplinas).length}>
                              <button onClick={()=>removerAluno(idxAluno)} className="bg-red-600 text-white px-2 py-1 rounded">X</button>
                            </td>
                          )}
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
