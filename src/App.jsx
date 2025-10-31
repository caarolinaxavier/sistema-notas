import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Trash2, Eye, EyeOff } from 'lucide-react';

const turmasPadrao = [
  // Enfermagem
  'TEM2','TEM3','TEM4','TEM5','TEN2','TEN3','TEN4','TEN5','TEN6','TEN7',
  // Radiologia
  'TRN1','TRN2',
  // Necropsia
  'N1'
];

// Disciplinas por curso e turma
const disciplinasPorCurso = {
  ENFERMAGEM: [
    { nome: 'Técnicas Básicas de Enfermagem', modulo: '1', cargaTeorica: 130, cargaEstagio: 150 },
    { nome: 'Anatomia e Fisiologia humanas', modulo: '1', cargaTeorica: 80 },
    { nome: 'Nutrição e Dietética', modulo: '1', cargaTeorica: 30 },
    { nome: 'Microbiologia e Parasitologia', modulo: '1', cargaTeorica: 40 },
    { nome: 'Primeiros Socorros', modulo: '1', cargaTeorica: 40 },
    { nome: 'Farmacologia Aplicada à Enfermagem', modulo: '1', cargaTeorica: 40 },
    { nome: 'Ética Profissional I', modulo: '1', cargaTeorica: 20 },
    { nome: 'Psicologia Aplicada à Enfermagem', modulo: '1', cargaTeorica: 30 },
    { nome: 'Enfermagem Médica', modulo: '1', cargaTeorica: 70, cargaEstagio: 90 },
    { nome: 'Enfermagem em Saúde Coletiva e Higiene', modulo: '1', cargaTeorica: 40, cargaEstagio: 40 },
    { nome: 'Enfermagem em Centro Cirúrgico', modulo: '1', cargaTeorica: 40, cargaEstagio: 20 },
    { nome: 'Enfermagem Cirúrgica', modulo: '1', cargaTeorica: 70, cargaEstagio: 60 },
    { nome: 'Enf. no Processo de Cuidar em Materno Infantil I', modulo: '1', cargaTeorica: 60, cargaEstagio: 40 },
    { nome: 'Enfermagem em Geriatria', modulo: '1', cargaTeorica: 20 },
    { nome: 'Administração em Unidade de Enfermagem', modulo: '2', cargaTeorica: 50, cargaEstagio: 24 },
    { nome: 'Enfermagem em Saúde Pública', modulo: '2', cargaTeorica: 50, cargaEstagio: 40 },
    { nome: 'Enf. no Processo de cuidar em Materno-Infantil II', modulo: '2', cargaTeorica: 60, cargaEstagio: 20 },
    { nome: 'Enf. em Centro Cirúrgico e Central de Material de Esterilização', modulo: '2', cargaTeorica: 40, cargaEstagio: 20 },
    { nome: 'Enf. no Cuidado de Paciente de Alta Dependência', modulo: '2', cargaTeorica: 100, cargaEstagio: 20 },
    { nome: 'Enfermagem em Urgência e Emergência', modulo: '2', cargaTeorica: 70, cargaEstagio: 76 },
    { nome: 'Enfermagem em Saúde Mental', modulo: '2', cargaTeorica: 30 },
    { nome: 'Enfermagem Domiciliária', modulo: '2', cargaTeorica: 30 },
    { nome: 'Ética Profissional II', modulo: '2', cargaTeorica: 20 },
    { nome: 'Gestão em Enfermagem', modulo: '2', cargaTeorica: 40 },
  ],
  RADIOLOGIA: [
    { nome: 'Anatomia Básica', modulo: '1', cargaTeorica: 100 },
    { nome: 'Radiologia Elementar', modulo: '1', cargaTeorica: 20 },
    { nome: 'Psicologia e Ética', modulo: '1', cargaTeorica: 40 },
    { nome: 'Fisiologia Humana', modulo: '1', cargaTeorica: 50 },
    { nome: 'Física Radiológica', modulo: '1', cargaTeorica: 40 },
    { nome: 'Proteção Radiológica1', modulo: '1', cargaTeorica: 40 },
    { nome: 'Patologia', modulo: '1', cargaTeorica: 50 },
    { nome: 'Primeiros Socorros', modulo: '1', cargaTeorica: 30 },
    { nome: 'Atomística', modulo: '1', cargaTeorica: 30 },
    { nome: 'Processamento de Imagens', modulo: '1', cargaTeorica: 40, cargaEstagio: 40 },
    { nome: 'Princípios Básicos de Posicionamento', modulo: '1', cargaTeorica: 30, cargaEstagio: 40 },
    { nome: 'Políticas de Saúde', modulo: '2', cargaTeorica: 30 },
    { nome: 'Anatomia Radiológica1', modulo: '2', cargaTeorica: 70 },
    { nome: 'Legislação Radiológica, Previdenciária e Trabalhista', modulo: '2', cargaTeorica: 40 },
    { nome: 'Administração de Serviços Radiológicos', modulo: '2', cargaTeorica: 20 },
    { nome: 'Farmacologia', modulo: '2', cargaTeorica: 30 },
    { nome: 'Noções de Tomografia Computadorizada e Ressonância Magnética', modulo: '2', cargaTeorica: 40 },
    { nome: 'Proteção Radiológica2', modulo: '2', cargaTeorica: 40 },
    { nome: 'Técnicas de Posic. em diagnóstico Médico', modulo: '2', cargaTeorica: 100, cargaEstagio: 160 },
    { nome: 'Exames Contrastados', modulo: '3', cargaTeorica: 70, cargaEstagio: 60 },
    { nome: 'Mamografia', modulo: '3', cargaTeorica: 40 },
    { nome: 'Técnica de Posicionamento Especial', modulo: '3', cargaTeorica: 40 },
    { nome: 'Radiologia Veterinária', modulo: '3', cargaTeorica: 30 },
    { nome: 'Radiologia Odontológica', modulo: '3', cargaTeorica: 30 },
    { nome: 'Radioterapia', modulo: '3', cargaTeorica: 30 },
    { nome: 'Radioisotopia e Medicina Nuclear', modulo: '3', cargaTeorica: 30 },
    { nome: 'Radiologia Industrial', modulo: '3', cargaTeorica: 30 },
    { nome: 'Anatomia Radiológica2', modulo: '3', cargaTeorica: 60 },
  ],
  NECROPSIA: [
    { nome: 'Anatomia', modulo: '1', cargaTeorica: 60 },
    { nome: 'Biologia', modulo: '1', cargaTeorica: 20 },
    { nome: 'Higiene Biossegurança', modulo: '1', cargaTeorica: 32 },
    { nome: 'Fisiologia', modulo: '1', cargaTeorica: 44 },
    { nome: 'Ética Profissional', modulo: '1', cargaTeorica: 24 },
    { nome: 'Língua Portuguesa', modulo: '1', cargaTeorica: 28 },
    { nome: 'Medicina Legal', modulo: '1', cargaTeorica: 32 },
    { nome: 'Raciocínio Lógico', modulo: '1', cargaTeorica: 28 },
    { nome: 'Tanatologia Forense', modulo: '1', cargaTeorica: 24 },
    { nome: 'Técnicas de Necropsia', modulo: '1', cargaTeorica: 40 },
    { nome: 'Traumatologia Forense', modulo: '1', cargaTeorica: 28 },
  ]
};

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
  const [novoAluno, setNovoAluno] = useState({ nome:'', disciplinas:{} });

  const SENHA_PADRAO = 'admin123';

  useEffect(() => {
    // Inicializa turmas no localStorage se não existir
    const turmasLS = localStorage.getItem('turmas');
    if(!turmasLS){
      localStorage.setItem('turmas', JSON.stringify(turmasPadrao));
      turmasPadrao.forEach(t => localStorage.setItem(`alunos_${t}`, JSON.stringify([])));
    }
    setTurmas(JSON.parse(localStorage.getItem('turmas')));
  }, []);

  const salvarAlunos = (turma, alunos) => {
    localStorage.setItem(`alunos_${turma}`, JSON.stringify(alunos));
  };

  const carregarAlunos = (turma) => {
    const dados = localStorage.getItem(`alunos_${turma}`);
    return dados ? JSON.parse(dados) : [];
  };

  const fazerLogin = ()=> {
    if(senhaAdmin===SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const buscarNotas = () => {
    if(!nomeAluno || !turmaAluno) { alert('Preencha nome e turma'); return;}
    const alunosTurma = carregarAlunos(turmaAluno);
    const aluno = alunosTurma.find(a=>a.nome.toLowerCase()===nomeAluno.toLowerCase());
    if(aluno) setNotasEncontradas(aluno);
    else { setNotasEncontradas(null); alert('Aluno não encontrado'); }
  };

  const adicionarAluno = () => {
    if(!turmaSelecionada) return alert('Selecione uma turma');
    if(!novoAluno.nome.trim()) return alert('Digite o nome do aluno');

    // Cria disciplinas de acordo com a turma
    let curso = 'NECROPSIA';
    if(turmaSelecionada.startsWith('T')) curso='ENFERMAGEM';
    if(turmaSelecionada.startsWith('TR')) curso='RADIOLOGIA';
    const disciplinasCurso = disciplinasPorCurso[curso];
    const disciplinasAluno = {};
    disciplinasCurso.forEach(d=>disciplinasAluno[d.nome]={...d, nota:'', faltas:'', aprovado:''});
    
    const alunosTurma = carregarAlunos(turmaSelecionada);
    alunosTurma.push({nome: novoAluno.nome, disciplinas: disciplinasAluno});
    salvarAlunos(turmaSelecionada, alunosTurma);
    setNovoAluno({nome:'', disciplinas:{}});
  };

  const atualizarDisciplina = (idxAluno, nomeDisc, campo, valor) => {
    const alunosTurma = carregarAlunos(turmaSelecionada);
    alunosTurma[idxAluno].disciplinas[nomeDisc][campo]=valor;
    salvarAlunos(turmaSelecionada, alunosTurma);
    setTurmaSelecionada(''); // Força reload do estado
    setTimeout(()=>setTurmaSelecionada(turmaSelecionada),10);
  };

  const removerAluno = (idxAluno) => {
    const alunosTurma = carregarAlunos(turmaSelecionada);
    alunosTurma.splice(idxAluno,1);
    salvarAlunos(turmaSelecionada, alunosTurma);
    setTurmaSelecionada('');
    setTimeout(()=>setTurmaSelecionada(turmaSelecionada),10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
          <img src="https://i.imgur.com/lD9BrRR.jpeg" alt="Logo" className="mx-auto h-20 w-20 object-contain"/>
          <h1 className="text-3xl font-bold text-red-600 mt-2">Sistema de Notas e Faltas</h1>
          <p className="text-sm text-gray-500">ANA NERY BAURU – Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</p>
          <p className="text-sm text-gray-500">CNPJ – 08.036.462/0001-70</p>
        </div>

        {/* Modo */}
        <div className="flex justify-center gap-2 mb-6">
          <button onClick={()=>{setModo('aluno'); setAutenticado(false)}} className={`px-6 py-2 rounded-lg ${modo==='aluno'?'bg-blue-600 text-white':'bg-gray-200'}`}>Consultar Notas</button>
          <button onClick={()=>setModo('admin')} className={`px-6 py-2 rounded-lg ${modo==='admin'?'bg-red-600 text-white':'bg-gray-200'}`}>Área do Professor</button>
        </div>

        {/* Área Aluno */}
        {modo==='aluno' && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Consultar Notas e Faltas</h2>
            <input className="border p-2 mb-2 w-full" placeholder="Seu nome" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)}/>
            <select className="border p-2 w-full mb-2" value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}>
              <option value="">Selecione a turma</option>
              {turmas.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={buscarNotas}>Buscar</button>

            {notasEncontradas && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border border-gray-300 border-collapse">
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
                    {Object.entries(notasEncontradas.disciplinas).map(([d, info])=>(
                      <tr key={d}>
                        <td className="border p-1">{d}</td>
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

        {/* Área Professor */}
        {modo==='admin' && !autenticado && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Login do Professor</h2>
            <div className="mb-2">
              <input type={mostrarSenha?'text':'password'} value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)} placeholder="Senha" className="border p-2 w-full"/>
            </div>
            <div className="mb-2">
              <label className="flex items-center gap-2"><input type="checkbox" onChange={()=>setMostrarSenha(!mostrarSenha)}/> Mostrar senha</label>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={fazerLogin}>Entrar</button>
            <p className="text-xs text-gray-500 mt-1">Senha padrão: admin123</p>
          </div>
        )}

        {modo==='admin' && autenticado && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Gerenciar Alunos</h2>
            <input className="border p-2 mb-2 w-full" placeholder="Nome do aluno" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno,nome:e.target.value})}/>
            <select className="border p-2 mb-2 w-full" value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
              <option value="">Selecione a turma</option>
              {turmas.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded mb-4" onClick={adicionarAluno}>Adicionar Aluno</button>

            {turmaSelecionada && (
              <div className="overflow-x-auto">
                <h3 className="font-semibold mb-2">Alunos na turma {turmaSelecionada}</h3>
                <table className="w-full border border-gray-300 border-collapse">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-1">Nome</th>
                      <th className="border p-1">Disciplina</th>
                      <th className="border p-1">Nota</th>
                      <th className="border p-1">Faltas</th>
                      <th className="border p-1">Aprovado/Retido</th>
                      <th className="border p-1">Teórico</th>
                      <th className="border p-1">Estágio</th>
                      <th className="border p-1">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carregarAlunos(turmaSelecionada).map((aluno, idxAluno)=>(
                      Object.entries(aluno.disciplinas).map(([nomeDisc, info], idxDisc)=>(
                        <tr key={idxAluno+'-'+idxDisc}>
                          {idxDisc===0 && <td className="border p-1" rowSpan={Object.keys(aluno.disciplinas).length}>{aluno.nome}</td>}
                          <td className="border p-1">{nomeDisc}</td>
                          <td className="border p-1"><input className="border p-1 w-16" value={info.nota} onChange={e=>atualizarDisciplina(idxAluno,nomeDisc,'nota',e.target.value)}/></td>
                          <td className="border p-1"><input className="border p-1 w-16" value={info.faltas} onChange={e=>atualizarDisciplina(idxAluno,nomeDisc,'faltas',e.target.value)}/></td>
                          <td className="border p-1"><input className="border p-1 w-16" value={info.aprovado} onChange={e=>atualizarDisciplina(idxAluno,nomeDisc,'aprovado',e.target.value)}/></td>
                          <td className="border p-1">{info.cargaTeorica}</td>
                          <td className="border p-1">{info.cargaEstagio||'-'}</td>
                          {idxDisc===0 && <td className="border p-1" rowSpan={Object.keys(aluno.disciplinas).length}>
                            <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={()=>removerAluno(idxAluno)}>Remover</button>
                          </td>}
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
