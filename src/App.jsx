// src/App.jsx
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SENHA_PADRAO = "admin123";

/* Templates */
const templateTEM2 = [
  { nome: "Técnicas Básicas de Enfermagem", modulo: 1, cargaTeorica: 130, cargaEstagio: 150 },
  { nome: "Anatomia e Fisiologia humanas", modulo: 1, cargaTeorica: 80, cargaEstagio: "" },
  { nome: "Nutrição e Dietética", modulo: 1, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Microbiologia e Parasitologia", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Primeiros Socorros", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Farmacologia Aplicada à Enfermagem", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Ética Profissional I", modulo: 1, cargaTeorica: 20, cargaEstagio: "" },
  { nome: "Psicologia Aplicada à Enfermagem", modulo: 1, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Enfermagem Médica", modulo: 1, cargaTeorica: 70, cargaEstagio: 90 },
  { nome: "Enfermagem em Saúde Coletiva e Higiene", modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
  { nome: "Enfermagem em Centro Cirúrgico", modulo: 1, cargaTeorica: 40, cargaEstagio: 20 },
  { nome: "Enfermagem Cirúrgica", modulo: 1, cargaTeorica: 70, cargaEstagio: 60 },
  { nome: "Enf. no Processo de Cuidar em Materno Infantil I", modulo: 1, cargaTeorica: 60, cargaEstagio: 40 },
  { nome: "Enfermagem em Geriatria", modulo: 1, cargaTeorica: 20, cargaEstagio: "" },
  { nome: "Administração em Unidade de Enfermagem", modulo: 2, cargaTeorica: 50, cargaEstagio: 24 },
  { nome: "Enfermagem em Saúde Pública", modulo: 2, cargaTeorica: 50, cargaEstagio: 40 },
  { nome: "Enf. no Processo de cuidar em Materno-Infantil II", modulo: 2, cargaTeorica: 60, cargaEstagio: 20 },
  { nome: "Enf. em Centro Cirúrgico e Central de Material de Esterilização", modulo: 2, cargaTeorica: 40, cargaEstagio: 20 },
  { nome: "Enf. no Cuidado de Paciente de Alta Dependência", modulo: 2, cargaTeorica: 100, cargaEstagio: 20 },
  { nome: "Enfermagem em Urgência e Emergência", modulo: 2, cargaTeorica: 70, cargaEstagio: 76 },
  { nome: "Enfermagem em Saúde Mental", modulo: 2, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Enfermagem Domiciliária", modulo: 2, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Ética Profissional II", modulo: 2, cargaTeorica: 20, cargaEstagio: "" },
  { nome: "Gestão em Enfermagem", modulo: 2, cargaTeorica: 40, cargaEstagio: "" },
];

const templateTRN2 = [
  { nome: "Anatomia Básica", modulo: 1, cargaTeorica: 100, cargaEstagio: "" },
  { nome: "Radiologia Elementar", modulo: 1, cargaTeorica: 20, cargaEstagio: "" },
  { nome: "Psicologia e Ética", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Fisiologia Humana", modulo: 1, cargaTeorica: 50, cargaEstagio: "" },
  { nome: "Física Radiológica", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Proteção Radiológica1", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Patologia", modulo: 1, cargaTeorica: 50, cargaEstagio: "" },
  { nome: "Primeiros Socorros", modulo: 1, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Atomística", modulo: 1, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Processamento de Imagens", modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
  { nome: "Princípios Básicos de Posicionamento", modulo: 1, cargaTeorica: 30, cargaEstagio: 40 },

  { nome: "Políticas de Saúde", modulo: 2, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Anatomia Radiológica1", modulo: 2, cargaTeorica: 70, cargaEstagio: "" },
  { nome: "Legislação Radiológica, Previdenciária e Trabalhista", modulo: 2, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Administração de Serviços Radiológicos", modulo: 2, cargaTeorica: 20, cargaEstagio: "" },
  { nome: "Farmacologia", modulo: 2, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Noções de Tomografia Computadorizada e Ressonância Magnética", modulo: 2, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Proteção Radiológica2", modulo: 2, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Técnicas de Posicionamento em diagnóstico Médico", modulo: 2, cargaTeorica: 100, cargaEstagio: 160 },

  // módulo 3
  { nome: "Exames Contrastados", modulo: 3, cargaTeorica: 70, cargaEstagio: 60 },
  { nome: "Mamografia", modulo: 3, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Técnica de Posicionamento Especial", modulo: 3, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Radiologia Veterinária", modulo: 3, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Radiologia Odontológica", modulo: 3, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Radioterapia", modulo: 3, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Radioisotopia e Medicina Nuclear", modulo: 3, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Radiologia Industrial", modulo: 3, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Anatomia Radiológica2", modulo: 3, cargaTeorica: 60, cargaEstagio: "" },

  // disciplina solicitada: Módulo 3 — somente estágio 100h
  { nome: "Técnicas de Posicionamento em Diagnóstico Médico", modulo: 3, cargaTeorica: "", cargaEstagio: 100 },
];

const templateTRN1 = [
  // TRN1 should include module1 content and the module3 tecnica (estagio 100)
  { nome: "Anatomia Básica", modulo: 1, cargaTeorica: 100, cargaEstagio: "" },
  { nome: "Radiologia Elementar", modulo: 1, cargaTeorica: 20, cargaEstagio: "" },
  { nome: "Psicologia e Ética", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Fisiologia Humana", modulo: 1, cargaTeorica: 50, cargaEstagio: "" },
  { nome: "Física Radiológica", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Proteção Radiológica1", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Patologia", modulo: 1, cargaTeorica: 50, cargaEstagio: "" },
  { nome: "Primeiros Socorros", modulo: 1, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Atomística", modulo: 1, cargaTeorica: 30, cargaEstagio: "" },
  { nome: "Processamento de Imagens", modulo: 1, cargaTeorica: 40, cargaEstagio: 40 },
  { nome: "Princípios Básicos de Posicionamento", modulo: 1, cargaTeorica: 30, cargaEstagio: 40 },

  // inclusão MÓDULO 3 — somente estágio 100h
  { nome: "Técnicas de Posicionamento em Diagnóstico Médico", modulo: 3, cargaTeorica: "", cargaEstagio: 100 },
];

const templateN1 = [
  { nome: "Anatomia", modulo: 1, cargaTeorica: 60, cargaEstagio: "" },
  { nome: "Biologia", modulo: 1, cargaTeorica: 20, cargaEstagio: "" },
  { nome: "Higiene Biossegurança", modulo: 1, cargaTeorica: 32, cargaEstagio: "" },
  { nome: "Fisiologia", modulo: 1, cargaTeorica: 44, cargaEstagio: "" },
  { nome: "Ética Profissional", modulo: 1, cargaTeorica: 24, cargaEstagio: "" },
  { nome: "Língua Portuguesa", modulo: 1, cargaTeorica: 28, cargaEstagio: "" },
  { nome: "Medicina Legal", modulo: 1, cargaTeorica: 32, cargaEstagio: "" },
  { nome: "Raciocínio Lógico", modulo: 1, cargaTeorica: 28, cargaEstagio: "" },
  { nome: "Tanatologia Forense", modulo: 1, cargaTeorica: 24, cargaEstagio: "" },
  { nome: "Técnicas de Necropsia", modulo: 1, cargaTeorica: 40, cargaEstagio: "" },
  { nome: "Traumatologia Forense", modulo: 1, cargaTeorica: 28, cargaEstagio: "" },
];

const turmasPadrao = [
  "TEM2", "TEM3", "TEM4", "TEM5", "TEN2", "TEN3", "TEN4", "TEN5", "TEN6", "TEN7",
  "TRN1", "TRN2", "TRN3",
  "N1"
];

function getTemplateFor(turma) {
  if (turma.startsWith("TEM") || turma.startsWith("TEN")) return templateTEM2;
  if (turma === "TRN1") return templateTRN1;
  if (turma === "TRN2" || turma === "TRN3") return templateTRN2;
  if (turma === "N1") return templateN1;
  return [];
}

function createEmptyStudentFromTemplate(name, turma) {
  const template = getTemplateFor(turma);
  const disciplinas = {};
  template.forEach((d) => {
    disciplinas[d.nome] = {
      nome: d.nome,
      modulo: d.modulo ?? "",
      cargaTeorica: d.cargaTeorica ?? "",
      cargaEstagio: d.cargaEstagio ?? "",
      nota: "",
      faltas: "",
      aprovado: "",
      notaEstagio: "",
    };
  });
  return { nome, disciplinas };
}

export default function App() {
  const [modo, setModo] = useState("aluno");
  const [senhaAdmin, setSenhaAdmin] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [nomeAluno, setNomeAluno] = useState("");
  const [turmaAluno, setTurmaAluno] = useState("");
  const [notasEncontradas, setNotasEncontradas] = useState(null);
  const [alunoTab, setAlunoTab] = useState("teorica");

  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [novoAluno, setNovoAluno] = useState({ nome: "" });

  useEffect(() => {
    // ensure localStorage keys exist so select always shows turmas
    turmasPadrao.forEach((t) => {
      const key = `alunos_${t}`;
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([]));
    });
  }, []);

  const carregarAlunos = (turma) => JSON.parse(localStorage.getItem(`alunos_${turma}`)) || [];

  const fazerLogin = () => {
    if (senhaAdmin === SENHA_PADRAO) {
      setAutenticado(true);
      setSenhaAdmin("");
    } else {
      alert("Senha incorreta!");
    }
  };

  const buscarNotas = () => {
    if (!nomeAluno || !turmaAluno) { alert("Preencha seu nome e turma!"); return; }
    const lista = carregarAlunos(turmaAluno);
    const aluno = lista.find((a) => a.nome.toLowerCase() === nomeAluno.toLowerCase());
    if (!aluno) { alert("Aluno não encontrado nesta turma!"); setNotasEncontradas(null); return; }
    setNotasEncontradas(aluno);
    setAlunoTab("teorica");
  };

  const adicionarAluno = () => {
    if (!turmaSelecionada || !novoAluno.nome.trim()) { alert("Preencha turma e nome do aluno!"); return; }
    const key = `alunos_${turmaSelecionada}`;
    const list = carregarAlunos(turmaSelecionada);
    const student = createEmptyStudentFromTemplate(novoAluno.nome.trim(), turmaSelecionada);
    list.push(student);
    localStorage.setItem(key, JSON.stringify(list));
    setNovoAluno({ nome: "" });
    setTurmaSelecionada((s) => s);
  };

  const atualizarDisciplina = (idxAluno, nomeDisc, campo, valor) => {
    if (!turmaSelecionada) return;
    const key = `alunos_${turmaSelecionada}`;
    const list = carregarAlunos(turmaSelecionada);
    if (!list[idxAluno]) return;
    list[idxAluno].disciplinas[nomeDisc][campo] = valor;
    localStorage.setItem(key, JSON.stringify(list));
    setTurmaSelecionada((s) => s);
  };

  const removerAluno = (idxAluno) => {
    if (!turmaSelecionada) return;
    if (!window.confirm("Remover este aluno?")) return;
    const key = `alunos_${turmaSelecionada}`;
    const list = carregarAlunos(turmaSelecionada);
    list.splice(idxAluno, 1);
    localStorage.setItem(key, JSON.stringify(list));
    setTurmaSelecionada((s) => s);
  };

  const turmaHasEstagio = (turma) => getTemplateFor(turma).some((d) => d.cargaEstagio && d.cargaEstagio !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER with onError fallback for logo */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="logo" className="h-20 w-20 object-contain" onError={(e) => { e.target.onerror = null; e.target.src = "https://i.imgur.com/lD9BrRR.jpeg"; }} />
            <div className="flex-1">
              <div className="text-2xl font-bold text-red-600">Sistema de Notas e Faltas</div>
              <div className="text-sm font-semibold text-gray-700">ANA NERY BAURU</div>
              <div className="text-xs text-gray-500">Mantido por AN – Sistema Integrado de Ensino Técnico LTDA</div>
              <div className="text-xs text-gray-500">CNPJ – 08.036.462/0001-70</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setModo("aluno"); setNotasEncontradas(null); }} className={`px-4 py-2 rounded ${modo === "aluno" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Consultar Notas</button>
              <button onClick={() => setModo("admin")} className={`px-4 py-2 rounded ${modo === "admin" ? "bg-red-600 text-white" : "bg-gray-200"}`}>Área do Professor</button>
            </div>
          </div>
        </div>

        {/* ALUNO */}
        {modo === "aluno" && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Consultar Notas e Faltas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input className="col-span-1 md:col-span-2 px-3 py-2 border rounded" placeholder="Seu nome completo" value={nomeAluno} onChange={(e) => setNomeAluno(e.target.value)} />
              <select className="px-3 py-2 border rounded" value={turmaAluno} onChange={(e) => setTurmaAluno(e.target.value)}>
                <option value="">Selecione sua turma</option>
                {turmasPadrao.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="flex gap-2 mb-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={buscarNotas}>Buscar</button>
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setNomeAluno(""); setTurmaAluno(""); setNotasEncontradas(null); }}>Limpar</button>
            </div>

            {notasEncontradas && (
              <div>
                <div className="font-semibold text-left mb-2">{notasEncontradas.nome}</div>

                <div className="mb-3 flex gap-2">
                  <button className={`px-3 py-1 rounded ${alunoTab === "teorica" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setAlunoTab("teorica")}>Notas Teóricas</button>
                  {turmaHasEstagio(turmaAluno) && <button className={`px-3 py-1 rounded ${alunoTab === "estagio" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setAlunoTab("estagio")}>Notas Estágio</button>}
                </div>

                <div className="overflow-auto border rounded max-h-[520px]">
                  <table className="w-full table-fixed border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="p-2 border text-left">Disciplina</th>
                        <th className="p-2 border text-left w-16">Mód.</th>
                        {alunoTab === "teorica" ? (
                          <>
                            <th className="p-2 border text-left w-24">Nota</th>
                            <th className="p-2 border text-left w-24">Faltas</th>
                            <th className="p-2 border text-left w-28">Aprovado</th>
                            <th className="p-2 border text-left w-28">Carga Teórica</th>
                            <th className="p-2 border text-left w-28">Carga Estágio</th>
                            <th className="p-2 border text-left w-28">Nota Estágio</th>
                          </>
                        ) : (
                          <>
                            <th className="p-2 border text-left w-28">Carga Estágio</th>
                            <th className="p-2 border text-left w-28">Nota Estágio</th>
                            <th className="p-2 border text-left w-24">Faltas</th>
                            <th className="p-2 border text-left w-28">Aprovado</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(notasEncontradas.disciplinas).map(([nome, d]) => (
                        <tr key={nome} className="odd:bg-white even:bg-gray-50">
                          <td className="p-2 border">{nome}</td>
                          <td className="p-2 border">{d.modulo ?? "-"}</td>
                          {alunoTab === "teorica" ? (
                            <>
                              <td className="p-2 border">{d.nota || "-"}</td>
                              <td className="p-2 border">{d.faltas || "-"}</td>
                              <td className="p-2 border">{d.aprovado || "-"}</td>
                              <td className="p-2 border">{d.cargaTeorica !== "" ? d.cargaTeorica : "-"}</td>
                              <td className="p-2 border">{d.cargaEstagio !== "" ? d.cargaEstagio : "-"}</td>
                              <td className="p-2 border">{d.notaEstagio || "-"}</td>
                            </>
                          ) : (
                            <>
                              <td className="p-2 border">{d.cargaEstagio !== "" ? d.cargaEstagio : "-"}</td>
                              <td className="p-2 border">{d.notaEstagio || "-"}</td>
                              <td className="p-2 border">{d.faltas || "-"}</td>
                              <td className="p-2 border">{d.aprovado || "-"}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFESSOR LOGIN */}
        {modo === "admin" && !autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login do Professor</h2>
            <div className="relative mb-4">
              <input type={mostrarSenha ? "text" : "password"} value={senhaAdmin} onChange={(e) => setSenhaAdmin(e.target.value)} placeholder="Senha" className="w-full px-3 py-2 border rounded" />
              <div className="absolute right-3 top-2 cursor-pointer" onClick={() => setMostrarSenha((s) => !s)}>{mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}</div>
            </div>
            <div className="flex gap-2 mb-2">
              <button onClick={fazerLogin} className="flex-1 bg-red-600 text-white px-3 py-2 rounded">Entrar</button>
              <button onClick={() => setSenhaAdmin("")} className="flex-1 bg-gray-200 px-3 py-2 rounded">Limpar</button>
            </div>
            <div className="text-xs text-gray-500">Senha protegida (não exibida publicamente).</div>
          </div>
        )}

        {/* PROFESSOR PANEL */}
        {modo === "admin" && autenticado && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Área do Professor</h2>
              <div>
                <button onClick={() => { setAutenticado(false); setSenhaAdmin(""); }} className="bg-gray-200 px-3 py-1 rounded">Sair</button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Selecionar Turma</label>
              <select value={turmaSelecionada} onChange={(e) => setTurmaSelecionada(e.target.value)} className="w-full px-3 py-2 border rounded">
                <option value="">-- escolha uma turma --</option>
                {turmasPadrao.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {turmaSelecionada && (
              <>
                <div className="mb-4 border rounded p-3">
                  <div className="font-semibold mb-2">Adicionar novo aluno</div>
                  <div className="flex gap-2">
                    <input placeholder="Nome completo do aluno" value={novoAluno.nome} onChange={(e) => setNovoAluno({ nome: e.target.value })} className="flex-1 px-3 py-2 border rounded" />
                    <button onClick={adicionarAluno} className="bg-red-600 px-4 py-2 text-white rounded">Adicionar</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Alunos da turma {turmaSelecionada}</h3>
                  <div className="space-y-4">
                    {carregarAlunos(turmaSelecionada).length === 0 && <div className="text-sm text-gray-500">Nenhum aluno cadastrado.</div>}
                    {carregarAlunos(turmaSelecionada).map((aluno, idxAluno) => (
                      <div key={idxAluno} className="border rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-semibold text-left">{aluno.nome}</div>
                          <div>
                            <button onClick={() => removerAluno(idxAluno)} className="text-sm bg-gray-200 px-2 py-1 rounded">Remover</button>
                          </div>
                        </div>

                        <div className="overflow-auto max-h-[340px]">
                          <table className="w-full table-fixed border-collapse">
                            <thead className="bg-gray-100 sticky top-0">
                              <tr>
                                <th className="p-2 border text-left">Disciplina</th>
                                <th className="p-2 border text-left w-16">Mód.</th>
                                <th className="p-2 border text-left w-24">Nota</th>
                                <th className="p-2 border text-left w-24">Faltas</th>
                                <th className="p-2 border text-left w-28">Aprovado</th>
                                <th className="p-2 border text-left w-28">Carga Teórica</th>
                                <th className="p-2 border text-left w-28">Carga Estágio</th>
                                <th className="p-2 border text-left w-28">Nota Estágio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(aluno.disciplinas).map(([nome, d]) => (
                                <tr key={nome} className="odd:bg-white even:bg-gray-50">
                                  <td className="p-2 border align-top">{nome}</td>

                                  <td className="p-2 border"><input value={d.modulo ?? ""} onChange={(e) => atualizarDisciplina(idxAluno, nome, "modulo", e.target.value)} className="w-full px-1 py-0.5 border rounded" /></td>

                                  <td className="p-2 border"><input value={d.nota ?? ""} onChange={(e) => atualizarDisciplina(idxAluno, nome, "nota", e.target.value)} className="w-full px-1 py-0.5 border rounded" /></td>

                                  <td className="p-2 border"><input value={d.faltas ?? ""} onChange={(e) => atualizarDisciplina(idxAluno, nome, "faltas", e.target.value)} className="w-full px-1 py-0.5 border rounded" /></td>

                                  <td className="p-2 border"><input value={d.aprovado ?? ""} onChange={(e) => atualizarDisciplina(idxAluno, nome, "aprovado", e.target.value)} className="w-full px-1 py-0.5 border rounded" /></td>

                                  <td className="p-2 border"><input value={d.cargaTeorica ?? ""} onChange={(e) => atualizarDisciplina(idxAluno, nome, "cargaTeorica", e.target.value)} className="w-full px-1 py-0.5 border rounded" /></td>

                                  <td className="p-2 border"><input value={d.cargaEstagio ?? ""} onChange={(e) => atualizarDisciplina(idxAluno, nome, "cargaEstagio", e.target.value)} className="w-full px-1 py-0.5 border rounded" /></td>

                                  <td className="p-2 border"><input value={d.notaEstagio ?? ""} onChange={(e) => atualizarDisciplina(idxAluno, nome, "notaEstagio", e.target.value)} className="w-full px-1 py-0.5 border rounded" /></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
