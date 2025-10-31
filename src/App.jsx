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

  // --- DISCIPLINAS PRONTAS POR TURMA ---
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
      { nome: 'Gestão em Enfermagem', modulo: 2, cargaTeorica: 40 },
    ],
    // RADIOLOGIA
    TRN2: [
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
      { nome: 'Políticas de Saúde', modulo: 2, cargaTeorica: 30 },
      { nome: 'Anatomia Radiológica1', modulo: 2, cargaTeorica: 70 },
      { nome: 'Legislação Radiológica, Previdenciária e Trabalhista', modulo: 2, cargaTeorica: 40 },
      { nome: 'Administração de Serviços Radiológicos', modulo: 2, cargaTeorica: 20 },
      { nome: 'Farmacologia', modulo: 2, cargaTeorica: 30 },
      { nome: 'Noções de Tomografia Computadorizada e Ressonância Magnética', modulo: 2, cargaTeorica: 40 },
      { nome: 'Proteção Radiológica2', modulo: 2, cargaTeorica: 40 },
      { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: 2, cargaTeorica: 100, cargaEstagio: 160 },
      { nome: 'Exames Contrastados', modulo: 3, cargaTeorica: 70, cargaEstagio: 60 },
      { nome: 'Mamografia', modulo: 3, cargaTeorica: 40 },
      { nome: 'Técnica de Posicionamento Especial', modulo: 3, cargaTeorica: 40 },
      { nome: 'Radiologia Veterinária', modulo: 3, cargaTeorica: 30 },
      { nome: 'Radiologia Odontológica', modulo: 3, cargaTeorica: 30 },
      { nome: 'Radioterapia', modulo: 3, cargaTeorica: 30 },
      { nome: 'Radioisotopia e Medicina Nuclear', modulo: 3, cargaTeorica: 30 },
      { nome: 'Radiologia Industrial', modulo: 3, cargaTeorica: 30 },
      { nome: 'Anatomia Radiológica2', modulo: 3, cargaTeorica: 60 },
    ],
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
    ],
  };

  // --- LOAD DATA ---
  useEffect(() => {
    const turmasData = JSON.parse(localStorage.getItem('turmas')) || [];
    setTurmas(turmasData);

    const alunosData = {};
    turmasData.forEach(t => {
      alunosData[t] = JSON.parse(localStorage.getItem(`alunos_${t}`)) || [];
    });
    setAlunos(alunosData);
  }, []);

  const salvarTurmas = (novasTurmas) => {
    localStorage.setItem('turmas', JSON.stringify(novasTurmas));
    setTurmas(novasTurmas);
  };

  const salvarAlunos = (turma, alunosTurma) => {
    localStorage.setItem(`alunos_${turma}`, JSON.stringify(alunosTurma));
    setAlunos(prev => ({ ...prev, [turma]: alunosTurma }));
  };

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno.nome.trim()) return alert('Selecione turma e digite nome');
    const aluno = { ...novoAluno };
    // Carrega disciplinas automaticamente se não houver
    if (!aluno.disciplinas || Object.keys(aluno.disciplinas).length===0) {
      const disciplinas = disciplinasPorTurma[turmaSelecionada] || [];
      const discObj = {};
      disciplinas.forEach(d => {
        discObj[d.nome] = { ...d, nota: '', faltas: '', aprovado: '' };
      });
      aluno.disciplinas = discObj;
    }

    const alunosTurma = alunos[turmaSelecionada] || [];
    salvarAlunos(turmaSelecionada, [...alunosTurma, aluno]);
    setNovoAluno({ nome:'', disciplinas:{} });
  };

  const atualizarDisciplina = (alunoIdx, disc, campo, valor) => {
    const turmaAlunos = [...alunos[turmaSelecionada]];
    turmaAlunos[alunoIdx].disciplinas[disc][campo] = valor;
    salvarAlunos(turmaSelecionada, turmaAlunos);
  };

  const removerAluno = (idx) => {
    const turmaAlunos = [...alunos[turmaSelecionada]];
    turmaAlunos.splice(idx,1);
    salvarAlunos(turmaSelecionada,turmaAlunos);
  };

  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) return alert('Preencha nome e turma');
    const aluno = (alunos[turmaAluno]||[]).find(a=>a.nome.toLowerCase()===nomeAluno.toLowerCase());
    if (!aluno) return alert('Aluno não encontrado');
    setNotasEncontradas(aluno);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* CABEÇALHO */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
          <img src="https://i.imgur.com/lD9BrRR.jpeg" alt="Logo" className="mx-auto h-20 mb-2"/>
          <div className="text-sm font-semibold text-gray-700">ANA NERY BAURU</div>
          <div className="text-xs text-gray-500 mb-1">Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</div>
          <div className="text-xs text-gray-500 mb-2">CNPJ – 08.036.462/0001-70</div>
          <div className="flex justify-center gap-2 mt-4">
            <button className={`px-6 py-2 rounded-lg ${modo==='aluno'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'}`} onClick={()=>setModo('aluno')}>Aluno</button>
            <button className={`px-6 py-2 rounded-lg ${modo==='admin'?'bg-red-600 text-white':'bg-gray-200 text-gray-700'}`} onClick={()=>setModo('admin')}>Professor</button>
          </div>
        </div>

        {/* ALUNO */}
        {modo==='aluno' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Consultar Notas e Faltas</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nome completo" className="w-full border px-3 py-2 rounded" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)} />
              <select className="w-full border px-3 py-2 rounded" value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}>
                <option value="">Selecione a turma</option>
                {turmas.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={buscarNotas} className="w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center gap-2"><Search size={18}/>Buscar</button>
            </div>

            {notasEncontradas && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">{notasEncontradas.nome}</h3>
                <div className="space-y-2">
                  {Object.entries(notasEncontradas.disciplinas).map(([disc, d])=>(
                    <div key={disc} className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">{disc} (Módulo {d.modulo})</div>
                      <div className="flex gap-4 text-sm">
                        <span>Nota: {d.nota || '-'}</span>
                        <span>Faltas: {d.faltas || '0'}</span>
                        <span>Aprovado: {d.aprovado || '-'}</span>
                        <span>Teórico: {d.cargaTeorica}</span>
                        {d.cargaEstagio && <span>Estágio: {d.cargaEstagio}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFESSOR LOGIN */}
        {modo==='admin' && !autenticado && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Login Professor</h2>
            <div className="relative mb-2">
              <input type={mostrarSenha?'text':'password'} placeholder="Senha" value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)} className="w-full border px-3 py-2 rounded"/>
              <span className="absolute right-3 top-2 cursor-pointer" onClick={()=>setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha?<EyeOff size={20}/>:<Eye size={20}/>}
              </span>
            </div>
            <button onClick={fazerLogin} className="w-full bg-red-600 text-white py-2 rounded flex justify-center items-center gap-2"><Search size={18}/>Entrar</button>
          </div>
        )}

        {/* PROFESSOR AREA */}
        {modo==='admin' && autenticado && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Área do Professor</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Nome do aluno" className="flex-1 border px-3 py-2 rounded" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno,nome:e.target.value})}/>
              <button onClick={adicionarAluno} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><Plus size={18}/>Adicionar</button>
            </div>
            <select className="w-full border px-3 py-2 rounded mb-4" value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
              <option value="">Selecione turma</option>
              {turmas.map(t=><option key={t} value={t}>{t}</option>)}
            </select>

            {turmaSelecionada && alunos[turmaSelecionada] && alunos[turmaSelecionada].length>0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-2">Aluno</th>
                      <th className="border p-2">Disciplina</th>
                      <th className="border p-2">Módulo</th>
                      <th className="border p-2">Nota</th>
                      <th className="border p-2">Faltas</th>
                      <th className="border p-2">Aprovado/Retido</th>
                      <th className="border p-2">Teórico</th>
                      <th className="border p-2">Estágio</th>
                      <th className="border p-2">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos[turmaSelecionada].map((aluno, idxAluno)=>(
                      Object.entries(aluno.disciplinas).map(([disc, d], idxDisc)=>(
                        <tr key={`${idxAluno}-${idxDisc}`}>
                          <td className="border p-2">{aluno.nome}</td>
                          <td className="border p-2">{disc}</td>
                          <td className="border p-2">{d.modulo}</td>
                          <td className="border p-2">
                            <input type="text" value={d.nota} onChange={e=>atualizarDisciplina(idxAluno,disc,'nota',e.target.value)} className="w-full border px-1 py-1 rounded"/>
                          </td>
                          <td className="border p-2">
                            <input type="text" value={d.faltas} onChange={e=>atualizarDisciplina(idxAluno,disc,'faltas',e.target.value)} className="w-full border px-1 py-1 rounded"/>
                          </td>
                          <td className="border p-2">
                            <input type="text" value={d.aprovado} onChange={e=>atualizarDisciplina(idxAluno,disc,'aprovado',e.target.value)} className="w-full border px-1 py-1 rounded"/>
                          </td>
                          <td className="border p-2">{d.cargaTeorica}</td>
                          <td className="border p-2">{d.cargaEstagio||'-'}</td>
                          <td className="border p-2 text-center">
                            <button onClick={()=>removerAluno(idxAluno)} className="bg-red-600 text-white px-2 py-1 rounded"><Trash2 size={16}/></button>
                          </td>
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
