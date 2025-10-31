import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, Plus } from 'lucide-react';

export default function App() {
  const [modo, setModo] = useState('aluno');
  const [senhaAdmin, setSenhaAdmin] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  const [nomeAluno, setNomeAluno] = useState('');
  const [turmaAluno, setTurmaAluno] = useState('');
  const [notasEncontradas, setNotasEncontradas] = useState(null);

  const [turmas, setTurmas] = useState([
    'TEM2','TEM3','TEM4','TEM5','TEN2','TEN3','TEN4','TEN5','TEN6','TEN7','TRN1','TRN2','N1'
  ]);
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [alunos, setAlunos] = useState({});
  const [novoAluno, setNovoAluno] = useState({ nome: '', disciplinas: {} });

  const SENHA_PADRAO = 'admin123';

  // Disciplinas por curso
  const disciplinas = {
    ENFERMAGEM: {
      MOD1: {
        "Técnicas Básicas de Enfermagem": { cargaTeorica:130, cargaEstagio:150 },
        "Anatomia e Fisiologia humanas": { cargaTeorica:80, cargaEstagio:0 },
        "Nutrição e Dietética": { cargaTeorica:30, cargaEstagio:0 },
        "Microbiologia e Parasitologia": { cargaTeorica:40, cargaEstagio:0 },
        "Primeiros Socorros": { cargaTeorica:40, cargaEstagio:0 },
        "Farmacologia Aplicada à Enfermagem": { cargaTeorica:40, cargaEstagio:0 },
        "Ética Profissional I": { cargaTeorica:20, cargaEstagio:0 },
        "Psicologia Aplicada à Enfermagem": { cargaTeorica:30, cargaEstagio:0 },
        "Enfermagem Médica": { cargaTeorica:70, cargaEstagio:90 },
        "Enfermagem em Saúde Coletiva e Higiene": { cargaTeorica:40, cargaEstagio:40 },
        "Enfermagem em Centro Cirúrgico": { cargaTeorica:40, cargaEstagio:20 },
        "Enfermagem Cirúrgica": { cargaTeorica:70, cargaEstagio:60 },
        "Enf. no Processo de Cuidar em Materno Infantil I": { cargaTeorica:60, cargaEstagio:40 },
        "Enfermagem em Geriatria": { cargaTeorica:20, cargaEstagio:0 },
      },
      MOD2: {
        "Administração em Unidade de Enfermagem": { cargaTeorica:50, cargaEstagio:24 },
        "Enfermagem em Saúde Pública": { cargaTeorica:50, cargaEstagio:40 },
        "Enf. no Processo de cuidar em Materno-Infantil II": { cargaTeorica:60, cargaEstagio:20 },
        "Enf. em Centro Cirúrgico e Central de Material de Esterilização": { cargaTeorica:40, cargaEstagio:20 },
        "Enf. no Cuidado de Paciente de Alta Dependência": { cargaTeorica:100, cargaEstagio:20 },
        "Enfermagem em Urgência e Emergência": { cargaTeorica:70, cargaEstagio:76 },
        "Enfermagem em Saúde Mental": { cargaTeorica:30, cargaEstagio:0 },
        "Enfermagem Domiciliária": { cargaTeorica:30, cargaEstagio:0 },
        "Ética Profissional II": { cargaTeorica:20, cargaEstagio:0 },
        "Gestão em Enfermagem": { cargaTeorica:40, cargaEstagio:0 },
      }
    },
    RADIOLOGIA: {
      MOD1: {
        "Anatomia Básica": { cargaTeorica:100, cargaEstagio:0 },
        "Radiologia Elementar": { cargaTeorica:20, cargaEstagio:0 },
        "Psicologia e Ética": { cargaTeorica:40, cargaEstagio:0 },
        "Fisiologia Humana": { cargaTeorica:50, cargaEstagio:0 },
        "Física Radiológica": { cargaTeorica:40, cargaEstagio:0 },
        "Proteção Radiológica1": { cargaTeorica:40, cargaEstagio:0 },
        "Patologia": { cargaTeorica:50, cargaEstagio:0 },
        "Primeiros Socorros": { cargaTeorica:30, cargaEstagio:0 },
        "Atomística": { cargaTeorica:30, cargaEstagio:0 },
        "Processamento de Imagens": { cargaTeorica:40, cargaEstagio:40 },
        "Princípios Básicos de Posicionamento": { cargaTeorica:30, cargaEstagio:40 },
      },
      MOD2: {
        "Políticas de Saúde": { cargaTeorica:30, cargaEstagio:0 },
        "Anatomia Radiológica1": { cargaTeorica:70, cargaEstagio:0 },
        "Legislação Radiológica, Previdenciária e Trabalhista": { cargaTeorica:40, cargaEstagio:0 },
        "Administração de Serviços Radiológicos": { cargaTeorica:20, cargaEstagio:0 },
        "Farmacologia": { cargaTeorica:30, cargaEstagio:0 },
        "Noções de Tomografia Computadorizada e Ressonância Magnétic": { cargaTeorica:40, cargaEstagio:0 },
        "Proteção Radiológica2": { cargaTeorica:40, cargaEstagio:0 },
        "Técnicas de Posic. em diagnóstico Médico": { cargaTeorica:100, cargaEstagio:160 },
      },
      MOD3: {
        "Exames Contrastados": { cargaTeorica:70, cargaEstagio:60 },
        "Mamografia": { cargaTeorica:40, cargaEstagio:0 },
        "Técnica de Posicionamento Especial": { cargaTeorica:40, cargaEstagio:0 },
        "Radiologia Veterinária": { cargaTeorica:30, cargaEstagio:0 },
        "Radiologia Odontológica": { cargaTeorica:30, cargaEstagio:0 },
        "Radioterapia": { cargaTeorica:30, cargaEstagio:0 },
        "Radioisotopia e Medicina Nuclear": { cargaTeorica:30, cargaEstagio:0 },
        "Radiologia Industrial": { cargaTeorica:30, cargaEstagio:0 },
        "Anatomia Radiológica2": { cargaTeorica:60, cargaEstagio:0 },
        "Técnicas de Posicionamento em Diagnóstico Médico": { cargaTeorica:0, cargaEstagio:100 }, // módulo 3 só estágio
      }
    },
    NECROPSIA: {
      MOD1: {
        "Anatomia": { cargaTeorica:60, cargaEstagio:0 },
        "Biologia": { cargaTeorica:20, cargaEstagio:0 },
        "Higiene Biossegurança": { cargaTeorica:32, cargaEstagio:0 },
        "Fisiologia": { cargaTeorica:44, cargaEstagio:0 },
        "Ética Profissional": { cargaTeorica:24, cargaEstagio:0 },
        "Língua Portuguesa": { cargaTeorica:28, cargaEstagio:0 },
        "Medicina Legal": { cargaTeorica:32, cargaEstagio:0 },
        "Raciocínio Lógico": { cargaTeorica:28, cargaEstagio:0 },
        "Tanatologia Forense": { cargaTeorica:24, cargaEstagio:0 },
        "Técnicas de Necropsia": { cargaTeorica:40, cargaEstagio:0 },
        "Traumatologia Forense": { cargaTeorica:28, cargaEstagio:0 },
      }
    }
  };

  useEffect(() => {
    // Carrega alunos do localStorage
    const dados = localStorage.getItem('alunos');
    if (dados) setAlunos(JSON.parse(dados));
  }, []);

  const salvarAlunos = (novos) => {
    setAlunos(novos);
    localStorage.setItem('alunos', JSON.stringify(novos));
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno.nome.trim()) return;
    const turmaAtual = alunos[turmaSelecionada] || [];
    const alunoCompleto = { ...novoAluno }; 
    salvarAlunos({
      ...alunos,
      [turmaSelecionada]: [...turmaAtual, alunoCompleto].sort((a,b)=> a.nome.localeCompare(b.nome))
    });
    setNovoAluno({ nome: '', disciplinas: {} });
  };

  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) return alert('Preencha nome e turma!');
    const turmaAtual = alunos[turmaAluno] || [];
    const aluno = turmaAtual.find(a => a.nome.toLowerCase() === nomeAluno.toLowerCase());
    if (aluno) setNotasEncontradas(aluno);
    else alert('Aluno não encontrado!');
  };

  const exportarBackup = () => {
    const blob = new Blob([JSON.stringify(alunos,null,2)], { type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_notas.json';
    a.click();
  };

  const importarBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try{
        const dados = JSON.parse(ev.target.result);
        salvarAlunos(dados);
        alert('Backup importado!');
      }catch{
        alert('Erro ao importar backup!');
      }
    }
    reader.readAsText(file);
  };

  const fazerLogin = () => {
    if(senhaAdmin===SENHA_PADRAO) setAutenticado(true);
    else alert('Senha incorreta!');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src="/logo.png" alt="Logo" className="h-20 w-20 object-contain"/>
          <div>
            <div className="text-xl font-bold text-red-600">ANA NERY BAURU</div>
            <div className="text-sm text-gray-600">Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</div>
            <div className="text-sm text-gray-600">CNPJ – 08.036.462/0001-70</div>
          </div>
        </div>

        {/* Modo */}
        <div className="flex gap-2 mb-6">
          <button className={`px-4 py-2 rounded ${modo==='aluno'?'bg-blue-600 text-white':'bg-gray-200'}`} onClick={()=>{setModo('aluno'); setAutenticado(false)}}>Aluno</button>
          <button className={`px-4 py-2 rounded ${modo==='admin'?'bg-red-600 text-white':'bg-gray-200'}`} onClick={()=>setModo('admin')}>Professor</button>
        </div>

        {/* Aluno */}
        {modo==='aluno' && (
          <div>
            <input placeholder="Nome" className="border px-3 py-2 rounded w-full mb-2" value={nomeAluno} onChange={e=>setNomeAluno(e.target.value)} />
            <select className="border px-3 py-2 rounded w-full mb-2" value={turmaAluno} onChange={e=>setTurmaAluno(e.target.value)}>
              <option value="">Selecione turma</option>
              {turmas.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4" onClick={buscarNotas}><Search size={16}/> Buscar Notas</button>
            {notasEncontradas && (
              <div className="border p-4 rounded bg-green-50">
                <div className="font-bold text-lg">{notasEncontradas.nome}</div>
                <div className="space-y-2">
                  {Object.entries(notasEncontradas.disciplinas).map(([disc, info])=>(
                    <div key={disc} className="p-2 border rounded bg-white">
                      <div className="font-semibold">{disc} (Módulo {info.modulo})</div>
                      {info.cargaTeorica>0 && <div>Teórica: {info.cargaTeorica}h</div>}
                      {info.cargaEstagio>0 && <div>Estágio: {info.cargaEstagio}h</div>}
                      <div>Nota: {info.nota || '-'}</div>
                      <div>Faltas: {info.faltas || '-'}</div>
                      <div>Aprovado/Retido: {info.status || '-'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Professor */}
        {modo==='admin' && !autenticado && (
          <div className="border p-4 rounded">
            <input type="password" placeholder="Senha" className="border px-3 py-2 rounded w-full mb-2" value={senhaAdmin} onChange={e=>setSenhaAdmin(e.target.value)} />
            <button className="bg-red-600 text-white px-4 py-2 rounded w-full" onClick={fazerLogin}>Entrar</button>
            <div className="text-xs text-gray-500 mt-1">Senha padrão: admin123</div>
          </div>
        )}

        {modo==='admin' && autenticado && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <input placeholder="Nome do aluno" className="border px-3 py-2 rounded w-64 mr-2" value={novoAluno.nome} onChange={e=>setNovoAluno({...novoAluno,nome:e.target.value})} />
                <select className="border px-3 py-2 rounded" value={turmaSelecionada} onChange={e=>setTurmaSelecionada(e.target.value)}>
                  <option value="">Selecione turma</option>
                  {turmas.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
                <button className="bg-red-600 text-white px-3 py-2 rounded ml-2" onClick={adicionarAluno}><Plus size={16}/> Adicionar</button>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-3 py-2 rounded" onClick={exportarBackup}><Download size={16}/> Backup</button>
                <label className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer flex items-center gap-1"><Upload size={16}/> Importar<input type="file" onChange={importarBackup} className="hidden"/></label>
              </div>
            </div>

            <div className="space-y-2">
              {(alunos[turmaSelecionada]||[]).map((aluno,index)=>(
                <div key={index} className="border p-2 rounded bg-gray-50">
                  <div className="font-bold">{aluno.nome}</div>
                  <div className="space-y-1">
                    {Object.entries(aluno.disciplinas).map(([disc,info])=>(
                      <div key={disc} className="p-1 border rounded bg-white">
                        <div>{disc} (Módulo {info.modulo})</div>
                        <input type="number" placeholder="Teórica" value={info.cargaTeorica} onChange={e=>info.cargaTeorica=+e.target.value} className="w-20 border px-1 rounded mr-1"/>
                        <input type="number" placeholder="Estágio" value={info.cargaEstagio} onChange={e=>info.cargaEstagio=+e.target.value} className="w-20 border px-1 rounded mr-1"/>
                        <input type="number" placeholder="Nota" value={info.nota||''} onChange={e=>info.nota=+e.target.value} className="w-16 border px-1 rounded mr-1"/>
                        <input type="number" placeholder="Faltas" value={info.faltas||''} onChange={e=>info.faltas=+e.target.value} className="w-16 border px-1 rounded mr-1"/>
                        <input type="text" placeholder="Aprovado/Retido" value={info.status||''} onChange={e=>info.status=e.target.value} className="w-24 border px-1 rounded"/>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
