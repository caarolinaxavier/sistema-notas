import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Plus, Eye, EyeOff } from 'lucide-react';

export default function App() {
  const [modo, setModo] = useState('aluno');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const [turmas, setTurmas] = useState([
    'TEM2','TEM3','TEM4','TEM5','TEN2','TEN3','TEN4','TEN5','TEN6','TEN7',
    'TRN1','TRN2','N1'
  ]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [alunos, setAlunos] = useState({});
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  // Disciplinas por turma/curso
  const disciplinas = {
    ENFERMAGEM: [
      { nome:'Técnicas Básicas de Enfermagem', modulo:1, teoria:130, estagio:150 },
      { nome:'Anatomia e Fisiologia humanas', modulo:1, teoria:80, estagio:0 },
      { nome:'Nutrição e Dietética', modulo:1, teoria:30, estagio:0 },
      { nome:'Microbiologia e Parasitologia', modulo:1, teoria:40, estagio:0 },
      { nome:'Primeiros Socorros', modulo:1, teoria:40, estagio:0 },
      { nome:'Farmacologia Aplicada à Enfermagem', modulo:1, teoria:40, estagio:0 },
      { nome:'Ética Profissional I', modulo:1, teoria:20, estagio:0 },
      { nome:'Psicologia Aplicada à Enfermagem', modulo:1, teoria:30, estagio:0 },
      { nome:'Enfermagem Médica', modulo:1, teoria:70, estagio:90 },
      { nome:'Enfermagem em Saúde Coletiva e Higiene', modulo:1, teoria:40, estagio:40 },
      { nome:'Enfermagem em Centro Cirúrgico', modulo:1, teoria:40, estagio:20 },
      { nome:'Enfermagem Cirúrgica', modulo:1, teoria:70, estagio:60 },
      { nome:'Enf. no Processo de Cuidar em Materno Infantil I', modulo:1, teoria:60, estagio:40 },
      { nome:'Enfermagem em Geriatria', modulo:1, teoria:20, estagio:0 },
      { nome:'Administração em Unidade de Enfermagem', modulo:2, teoria:50, estagio:24 },
      { nome:'Enfermagem em Saúde Pública', modulo:2, teoria:50, estagio:40 },
      { nome:'Enf. no Processo de cuidar em Materno-Infantil II', modulo:2, teoria:60, estagio:20 },
      { nome:'Enf. em Centro Cirúrgico e Central de Material de Esterilização', modulo:2, teoria:40, estagio:20 },
      { nome:'Enf. no Cuidado de Paciente de Alta Dependência', modulo:2, teoria:100, estagio:20 },
      { nome:'Enfermagem em Urgência e Emergência', modulo:2, teoria:70, estagio:76 },
      { nome:'Enfermagem em Saúde Mental', modulo:2, teoria:30, estagio:0 },
      { nome:'Enfermagem Domiciliária', modulo:2, teoria:30, estagio:0 },
      { nome:'Ética Profissional II', modulo:2, teoria:20, estagio:0 },
      { nome:'Gestão em Enfermagem', modulo:2, teoria:40, estagio:0 }
    ],
    RADIOLOGIA: [
      { nome:'Anatomia Básica', modulo:1, teoria:100, estagio:0 },
      { nome:'Radiologia Elementar', modulo:1, teoria:20, estagio:0 },
      { nome:'Psicologia e Ética', modulo:1, teoria:40, estagio:0 },
      { nome:'Fisiologia Humana', modulo:1, teoria:50, estagio:0 },
      { nome:'Física Radiológica', modulo:1, teoria:40, estagio:0 },
      { nome:'Proteção Radiológica1', modulo:1, teoria:40, estagio:0 },
      { nome:'Patologia', modulo:1, teoria:50, estagio:0 },
      { nome:'Primeiros Socorros', modulo:1, teoria:30, estagio:0 },
      { nome:'Atomística', modulo:1, teoria:30, estagio:0 },
      { nome:'Processamento de Imagens', modulo:1, teoria:40, estagio:40 },
      { nome:'Princípios Básicos de Posicionamento', modulo:1, teoria:30, estagio:40 },
      { nome:'Políticas de Saúde', modulo:2, teoria:30, estagio:0 },
      { nome:'Anatomia Radiológica1', modulo:2, teoria:70, estagio:0 },
      { nome:'Legislação Radiológica, Previdenciária e Trabalhista', modulo:2, teoria:40, estagio:0 },
      { nome:'Administração de Serviços Radiológicos', modulo:2, teoria:20, estagio:0 },
      { nome:'Farmacologia', modulo:2, teoria:30, estagio:0 },
      { nome:'Noções de Tomografia Computadorizada e Ressonância Magnética', modulo:2, teoria:40, estagio:0 },
      { nome:'Proteção Radiológica2', modulo:2, teoria:40, estagio:0 },
      { nome:'Técnicas de Posic. em diagnóstico Médico', modulo:2, teoria:100, estagio:160 },
      { nome:'Exames Contrastados', modulo:3, teoria:70, estagio:60 },
      { nome:'Mamografia', modulo:3, teoria:40, estagio:0 },
      { nome:'Técnica de Posicionamento Especial', modulo:3, teoria:40, estagio:0 },
      { nome:'Radiologia Veterinária', modulo:3, teoria:30, estagio:0 },
      { nome:'Radiologia Odontológica', modulo:3, teoria:30, estagio:0 },
      { nome:'Radioterapia', modulo:3, teoria:30, estagio:0 },
      { nome:'Radioisotopia e Medicina Nuclear', modulo:3, teoria:30, estagio:0 },
      { nome:'Radiologia Industrial', modulo:3, teoria:30, estagio:0 },
      { nome:'Anatomia Radiológica2', modulo:3, teoria:60, estagio:0 },
      { nome:'Técnicas de Posicionamento em Diagnóstico Médico', modulo:3, teoria:0, estagio:100 } // Módulo 3 só estágio
    ],
    NECROPSIA: [
      { nome:'Anatomia', modulo:1, teoria:60, estagio:0 },
      { nome:'Biologia', modulo:1, teoria:20, estagio:0 },
      { nome:'Higiene Biossegurança', modulo:1, teoria:32, estagio:0 },
      { nome:'Fisiologia', modulo:1, teoria:44, estagio:0 },
      { nome:'Ética Profissional', modulo:1, teoria:24, estagio:0 },
      { nome:'Língua Portuguesa', modulo:1, teoria:28, estagio:0 },
      { nome:'Medicina Legal', modulo:1, teoria:32, estagio:0 },
      { nome:'Raciocínio Lógico', modulo:1, teoria:28, estagio:0 },
      { nome:'Tanatologia Forense', modulo:1, teoria:24, estagio:0 },
      { nome:'Técnicas de Necropsia', modulo:1, teoria:40, estagio:0 },
      { nome:'Traumatologia Forense', modulo:1, teoria:28, estagio:0 }
    ]
  };

  useEffect(() => {
    // Carrega alunos do localStorage
    const alunosStorage = localStorage.getItem('alunos');
    if (alunosStorage) setAlunos(JSON.parse(alunosStorage));
  }, []);

  const salvarAlunos = (novosAlunos) => {
    setAlunos(novosAlunos);
    localStorage.setItem('alunos', JSON.stringify(novosAlunos));
  };

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  };

  const adicionarAluno = () => {
    if (!novoAluno.nome || !turmaSelecionada) return;

    const alunosTurma = alunos[turmaSelecionada] || [];
    // Adiciona disciplinas automáticas conforme curso
    let cursoDisciplinas = [];
    if (turmaSelecionada.startsWith('T')) cursoDisciplinas = disciplinas.ENFERMAGEM;
    else if (turmaSelecionada.startsWith('TR')) cursoDisciplinas = disciplinas.RADIOLOGIA;
    else cursoDisciplinas = disciplinas.NECROPSIA;

    const disciplinasAluno = {};
    cursoDisciplinas.forEach(d => {
      disciplinasAluno[d.nome] = {
        modulo: d.modulo,
        teoria: d.teoria,
        estagio: d.estagio,
        nota: '',
        faltas: '',
        aprovado: ''
      };
    });

    const novo = { ...novoAluno, disciplinas: disciplinasAluno };
    const novosAlunos = [...alunosTurma, novo].sort((a,b)=>a.nome.localeCompare(b.nome));
    salvarAlunos({ ...alunos, [turmaSelecionada]: novosAlunos });
    setNovoAluno({ nome:'', disciplinas:{} });
  };

  const atualizarCampo = (turma, alunoNome, disciplina, campo, valor) => {
    const novosAlunos = { ...alunos };
    novosAlunos[turma] = novosAlunos[turma].map(a => {
      if (a.nome !== alunoNome) return a;
      return {
        ...a,
        disciplinas: {
          ...a.disciplinas,
          [disciplina]: {
            ...a.disciplinas[disciplina],
            [campo]: valor
          }
        }
      };
    });
    salvarAlunos(novosAlunos);
  };

  const exportarDados = () => {
    const blob = new Blob([JSON.stringify(alunos, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_notas.json';
    a.click();
  };

  const importarDados = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const dados = JSON.parse(ev.target.result);
        setAlunos(dados);
        localStorage.setItem('alunos', JSON.stringify(dados));
        alert('Importado com sucesso!');
      } catch {
        alert('Erro ao importar!');
      }
    };
    reader.readAsText(file);
  };

  const buscarAluno = () => {
    if (!nomeAluno || !turmaAluno) return alert('Preencha nome e turma');
    const aluno = (alunos[turmaAluno]||[]).find(a=>a.nome.toLowerCase()===nomeAluno.toLowerCase());
    if (!aluno) return alert('Aluno não encontrado');
    setAlunoSelecionado(aluno);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-center">
          <img src="/logo.png" alt="Logo Ana Nery" className="h-20 mx-auto mb-4 object-contain"/>
          <div className="text-sm font-semibold text-gray-700">ANA NERY BAURU</div>
          <div className="text-xs text-gray-500">Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</div>
          <div className="text-xs text-gray-500 mb-4">CNPJ – 08.036.462/0001-70</div>
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={()=>setModo('aluno')} className={`px-6 py-2 rounded-lg font-medium ${modo==='aluno'?'bg-blue-600 text-white':'bg-gray-200 hover:bg-gray-300'}`}>Consultar Notas</button>
            <button onClick={()=>setModo('admin')} className={`px-6 py-2 rounded-lg font-medium ${modo==='admin'?'bg-red-600 text-white':'bg-gray-200 hover:bg-gray-300'}`}>Área do Professor</button>
          </div>
        </div>

        {/* ALUNO */}
        {modo==='aluno' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consultar Notas e Faltas</h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Seu nome" className="px-3 py-2 border rounded" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)}/>
              <select className="px-3 py-2 border rounded" value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}>
                <option value="">Selecione a turma</option>
                {turmas.map(t=> <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={buscarAluno} className="bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2"><Search size={18}/>Buscar</button>
            </div>
            {alunoSelecionado && (
              <div className="mt-4 space-y-2">
                {Object.entries(alunoSelecionado.disciplinas).map(([disc,dados])=>(
                  <div key={disc} className="bg-gray-50 p-3 rounded">
                    <div className="font-semibold">{disc} (Módulo {dados.modulo})</div>
                    <div className="flex gap-4 text-sm mt-1">
                      <div>Teórica: {dados.teoria}h | Estágio: {dados.estagio}h</div>
                      <div>Nota: {dados.nota || '-'}</div>
                      <div>Faltas: {dados.faltas || '-'}</div>
                      <div>Status: {dados.aprovado || '-'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROFESSOR */}
        {modo==='admin' && !autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Login do Professor</h2>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input type={mostrarSenha?'text':'password'} placeholder="Senha" value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)} className="w-full px-3 py-2 border rounded"/>
                <button onClick={()=>setMostrarSenha(!mostrarSenha)} className="absolute right-2 top-1/2 -translate-y-1/2">{mostrarSenha?<EyeOff size={18}/>:<Eye size={18}/>}</button>
              </div>
              <button onClick={fazerLogin} className="bg-red-600 text-white py-2 rounded">Entrar</button>
              <div className="text-xs text-gray-500">Senha padrão: admin123</div>
            </div>
          </div>
        )}

        {modo==='admin' && autenticado && (
          <div className="space-y-6">
