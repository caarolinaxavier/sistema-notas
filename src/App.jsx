import React, { useState, useEffect } from 'react';
import { Search, Upload, Eye, EyeOff, Download, Trash2, Plus } from 'lucide-react';

export default function App() {
  const [modo, setModo] = useState('aluno'); // 'aluno' ou 'admin'
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

  // --- Dados iniciais das disciplinas por curso ---
  const disciplinasIniciais = {
    // Enfermagem
    TEM2: [
      { nome: "Técnicas Básicas de Enfermagem", modulo:1, cargaTeorica:130, cargaEstagio:150 },
      { nome: "Anatomia e Fisiologia humanas", modulo:1, cargaTeorica:80 },
      { nome: "Nutrição e Dietética", modulo:1, cargaTeorica:30 },
      { nome: "Microbiologia e Parasitologia", modulo:1, cargaTeorica:40 },
      { nome: "Primeiros Socorros", modulo:1, cargaTeorica:40 },
      { nome: "Farmacologia Aplicada à Enfermagem", modulo:1, cargaTeorica:40 },
      { nome: "Ética Profissional I", modulo:1, cargaTeorica:20 },
      { nome: "Psicologia Aplicada à Enfermagem", modulo:1, cargaTeorica:30 },
      { nome: "Enfermagem Médica", modulo:1, cargaTeorica:70, cargaEstagio:90 },
      { nome: "Enfermagem em Saúde Coletiva e Higiene", modulo:1, cargaTeorica:40, cargaEstagio:40 },
      { nome: "Enfermagem em Centro Cirúrgico", modulo:1, cargaTeorica:40, cargaEstagio:20 },
      { nome: "Enfermagem Cirúrgica", modulo:1, cargaTeorica:70, cargaEstagio:60 },
      { nome: "Enf. no Processo de Cuidar em Materno Infantil I", modulo:1, cargaTeorica:60, cargaEstagio:40 },
      { nome: "Enfermagem em Geriatria", modulo:1, cargaTeorica:20 },
      { nome: "Administração em Unidade de Enfermagem", modulo:2, cargaTeorica:50, cargaEstagio:24 },
      { nome: "Enfermagem em Saúde Pública", modulo:2, cargaTeorica:50, cargaEstagio:40 },
      { nome: "Enf. no Processo de cuidar em Materno-Infantil II", modulo:2, cargaTeorica:60, cargaEstagio:20 },
      { nome: "Enf. em Centro Cirúrgico e Central de Material de Esterilização", modulo:2, cargaTeorica:40, cargaEstagio:20 },
      { nome: "Enf. no Cuidado de Paciente de Alta Dependência", modulo:2, cargaTeorica:100, cargaEstagio:20 },
      { nome: "Enfermagem em Urgência e Emergência", modulo:2, cargaTeorica:70, cargaEstagio:76 },
      { nome: "Enfermagem em Saúde Mental", modulo:2, cargaTeorica:30 },
      { nome: "Enfermagem Domiciliária", modulo:2, cargaTeorica:30 },
      { nome: "Ética Profissional II", modulo:2, cargaTeorica:20 },
      { nome: "Gestão em Enfermagem", modulo:2, cargaTeorica:40 },
    ],
    TEM3: [], TEM4: [], TEM5: [], TEN2: [], TEN3: [], TEN4: [], TEN5: [], TEN6: [], TEN7: [],
    // Radiologia
    TRN1: [
      { nome:"Anatomia Básica", modulo:1, cargaTeorica:100 },
      { nome:"Radiologia Elementar", modulo:1, cargaTeorica:20 },
      { nome:"Psicologia e Ética", modulo:1, cargaTeorica:40 },
      { nome:"Fisiologia Humana", modulo:1, cargaTeorica:50 },
      { nome:"Física Radiológica", modulo:1, cargaTeorica:40 },
      { nome:"Proteção Radiológica1", modulo:1, cargaTeorica:40 },
      { nome:"Patologia", modulo:1, cargaTeorica:50 },
      { nome:"Primeiros Socorros", modulo:1, cargaTeorica:30 },
      { nome:"Atomística", modulo:1, cargaTeorica:30 },
      { nome:"Processamento de Imagens", modulo:1, cargaTeorica:40, cargaEstagio:40 },
      { nome:"Princípios Básicos de Posicionamento", modulo:1, cargaTeorica:30, cargaEstagio:40 },
    ],
    TRN2: [
      { nome:"Políticas de Saúde", modulo:2, cargaTeorica:30 },
      { nome:"Anatomia Radiológica1", modulo:2, cargaTeorica:70 },
      { nome:"Legislação Radiológica, Previdenciária e Trabalhista", modulo:2, cargaTeorica:40 },
      { nome:"Administração de Serviços Radiológicos", modulo:2, cargaTeorica:20 },
      { nome:"Farmacologia", modulo:2, cargaTeorica:30 },
      { nome:"Noções de Tomografia Computadorizada e Ressonância Magnética", modulo:2, cargaTeorica:40 },
      { nome:"Proteção Radiológica2", modulo:2, cargaTeorica:40 },
      { nome:"Técnicas de Posic. em diagnóstico Médico", modulo:2, cargaTeorica:100, cargaEstagio:160 },
      { nome:"Exames Contrastados", modulo:3, cargaTeorica:70, cargaEstagio:60 },
      { nome:"Mamografia", modulo:3, cargaTeorica:40 },
      { nome:"Técnica de Posicionamento Especial", modulo:3, cargaTeorica:40 },
      { nome:"Radiologia Veterinária", modulo:3, cargaTeorica:30 },
      { nome:"Radiologia Odontológica", modulo:3, cargaTeorica:30 },
      { nome:"Radioterapia", modulo:3, cargaTeorica:30 },
      { nome:"Radioisotopia e Medicina Nuclear", modulo:3, cargaTeorica:30 },
      { nome:"Radiologia Industrial", modulo:3, cargaTeorica:30 },
      { nome:"Anatomia Radiológica2", modulo:3, cargaTeorica:60 },
    ],
    // Necropsia
    N1: [
      { nome:"Anatomia", modulo:1, cargaTeorica:60 },
      { nome:"Biologia", modulo:1, cargaTeorica:20 },
      { nome:"Higiene Biossegurança", modulo:1, cargaTeorica:32 },
      { nome:"Fisiologia", modulo:1, cargaTeorica:44 },
      { nome:"Ética Profissional", modulo:1, cargaTeorica:24 },
      { nome:"Língua Portuguesa", modulo:1, cargaTeorica:28 },
      { nome:"Medicina Legal", modulo:1, cargaTeorica:32 },
      { nome:"Raciocínio Lógico", modulo:1, cargaTeorica:28 },
      { nome:"Tanatologia Forense", modulo:1, cargaTeorica:24 },
      { nome:"Técnicas de Necropsia", modulo:1, cargaTeorica:40 },
      { nome:"Traumatologia Forense", modulo:1, cargaTeorica:28 },
    ]
  };

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
        // primeira vez: carregar turmas padrão
        const turmasPadrao = Object.keys(disciplinasIniciais);
        setTurmas(turmasPadrao);
        turmasPadrao.forEach(t => salvarAlunos(t, []));
      }
    } catch (error) {
      console.log('Erro ao carregar dados', error);
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
    if (!turmaSelecionada) { alert('Selecione uma turma!'); return; }
    if (!novoAluno.nome.trim()) { alert('Digite o nome do aluno!'); return; }

    // adiciona disciplinas padrão
    if (Object.keys(novoAluno.disciplinas).length === 0) {
      const padrao = disciplinasIniciais[turmaSelecionada].reduce((acc, d) => {
        acc[d.nome] = {
          nota: '', faltas: '', aprovado: '', modulo: d.modulo, cargaTeorica: d.cargaTeorica, cargaEstagio: d.cargaEstagio || ''
        };
        return acc;
      }, {});
      novoAluno.disciplinas = padrao;
    }

    const alunosTurma = alunos[turmaSelecionada] || [];
    salvarAlunos(turmaSelecionada, [...alunosTurma, novoAluno]);
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const removerAluno = (index) => {
    if (!confirm('Remover este aluno?')) return;
    const alunosTurma = alunos[turmaSelecionada] || [];
    salvarAlunos(turmaSelecionada, alunosTurma.filter((_, i) => i !== index));
  };

  // --- JSX ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">

        {/* BARRA ALUNO / PROFESSOR */}
        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={() => { setModo('aluno'); setAutenticado(false); setSenhaAdmin(''); }}
            className={`px-6 py-2 rounded-lg font-medium ${modo==='aluno' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Consultar Notas
          </button>
          <button
            onClick={() => setModo('admin')}
            className={`px-6 py-2 rounded-lg font-medium ${modo==='admin' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Área do Professor
          </button>
        </div>

        {/* TELA DO ALUNO */}
        {modo==='aluno' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Consultar Minhas Notas e Faltas</h2>
            <input type="text" placeholder="Seu nome completo" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-2" />
            <select value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-2">
              <option value="">Selecione sua turma</option>
              {turmas.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
            <button onClick={buscarNotas} className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4 flex items-center justify-center gap-2">
              <Search size={20}/> Buscar Notas
            </button>

            {notasEncontradas ? (
              <div className="space-y-2">
                <h3 className="font-semibold text-green-800 text-xl">{notasEncontradas.nome}</h3>
                {Object.entries(notasEncontradas.disciplinas).map(([disc, d])=>(
                  <div key={disc} className="bg-gray-50 p-3 rounded shadow-sm flex flex-col gap-1">
                    <span className="font-medium">{disc} (Módulo {d.modulo})</span>
                    <div className="flex gap-4 text-sm">
                      <span>Nota: <strong>{d.nota || '-'}</strong></span>
                      <span>Faltas: <strong>{d.faltas || '-'}</strong></span>
                      <span>Aprovado: <strong>{d.aprovado || '-'}</strong></span>
                      <span>Teórica: {d.cargaTeorica}</span>
                      {d.cargaEstagio ? <span>Estágio: {d.cargaEstagio}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              nomeAluno && turmaAluno && <p className="text-gray-500 mt-2">As disciplinas foram carregadas automaticamente. Preencha manualmente notas, faltas e aprovado/retido.</p>
            )}
          </div>
        )}

        {/* LOGIN DO PROFESSOR */}
        {modo==='admin' && !autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Login Professor</h2>
            <div className="relative">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Senha"
                value={senhaAdmin}
                onChange={e=>setSenhaAdmin(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-2"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={()=>setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={20}/> : <Eye size={20}/>}
              </span>
            </div>
            <button onClick={fazerLogin} className="w-full bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <Search size={20}/> Entrar
            </button>
          </div>
        )}

        {/* ÁREA DO PROFESSOR */}
        {modo==='admin' && autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Área do Professor</h2>

            {/* Selecionar turma */}
            <select value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4">
              <option value="">Selecione a turma</option>
              {turmas.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Adicionar aluno */}
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Nome do aluno"
                value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno, nome: e.target.value})}
                className="flex-1 px-4 py-2 border rounded-lg"/>
              <button onClick={adicionarAluno} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus size={18}/> Adicionar
              </button>
            </div>

            {/* Lista de alunos */}
            {turmaSelecionada && alunos[turmaSelecionada]?.length > 0 && (
              <div className="space-y-2">
                {alunos[turmaSelecionada].map((aluno, idx)=>(
                  <div key={idx} className="bg-gray-50 p-3 rounded shadow-sm flex justify-between items-center">
                    <span>{aluno.nome}</span>
                    <button onClick={()=>removerAluno(idx)} className="text-red-600 flex items-center gap-1">
                      <Trash2 size={16}/> Remover
                    </button>
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
