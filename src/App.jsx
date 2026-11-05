import { useState } from "react";
import { isSupabaseConfigured, supabase } from "./lib/supabase.js";

const navigation = [
  { id: "inicio", label: "Início", icon: "⌂" },
  { id: "cadastro", label: "Cadastro", icon: "＋" },
  { id: "relatorios", label: "Relatórios", icon: "▤" },
  { id: "configuracoes", label: "Configurações", icon: "⚙" },
];

export default function App() {
  const [activePage, setActivePage] = useState("inicio");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setStatus("error");
      setFeedback("Digite seu nome antes de salvar.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setStatus("error");
      setFeedback("O Supabase ainda não está configurado. Adicione as variáveis de ambiente para habilitar o cadastro.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    const { error } = await supabase.from("test_names").insert({
      name: cleanName,
    });

    if (error) {
      setStatus("error");
      setFeedback(error.message);
      return;
    }

    setStatus("success");
    setFeedback("Nome salvo no Supabase com sucesso!");
    setName("");
  }

  const pageTitle =
    navigation.find((item) => item.id === activePage)?.label ?? "Início";

  function navigate(page) {
    setActivePage(page);
    setFeedback("");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => navigate("inicio")} aria-label="Ir para início">
          <span className="brand-mark">OC</span>
          <span className="brand-copy">
            <strong>Oficina Conexão</strong>
            <small>Ambiente de testes</small>
          </span>
        </button>

        <div className="topbar-right">
          <span className={`connection-pill ${isSupabaseConfigured ? "is-ready" : "is-pending"}`}>
            <span className="status-dot" />
            {isSupabaseConfigured ? "Supabase configurado" : "Aguardando Supabase"}
          </span>
          <div className="avatar" aria-label="Perfil de teste">T</div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">NAVEGAÇÃO</div>
          <nav className="side-nav" aria-label="Menu principal">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => navigate(item.id)}
                aria-current={activePage === item.id ? "page" : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-note">
              <span className="note-icon">✦</span>
              <strong>Projeto inicial</strong>
              <p>Uma base pequena, pronta para evoluir.</p>
            </div>
            <span className="version-label">VERSÃO 0.1.0</span>
          </div>
        </aside>

        <main className="main-content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">OFICINA CONEXÃO / TESTE</p>
              <h1>{activePage === "inicio" ? "Bem-vindo ao projeto" : pageTitle}</h1>
              <p className="page-subtitle">
                {activePage === "inicio"
                  ? "Estrutura inicial para validar a interface e a conexão com o banco."
                  : "Navegação demonstrativa — esta seção é apenas um mockup."}
              </p>
            </div>
            <span className="page-tag">DEMO</span>
          </div>

          {activePage === "inicio" || activePage === "cadastro" ? (
            <section className="panel">
              <div className="panel-heading">
                <div className="panel-icon">♙</div>
                <div>
                  <h2>Cadastro de nome</h2>
                  <p>Um único campo para nosso primeiro teste de gravação.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="name-form">
                <label htmlFor="person-name">Nome</label>
                <input
                  id="person-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Digite seu nome"
                  maxLength={120}
                  autoComplete="name"
                />
                <div className="form-footer">
                  <span className="helper-text">Máximo de 120 caracteres.</span>
                  <button className="primary-button" type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Salvando..." : "Salvar nome"}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
                {feedback && (
                  <p className={`feedback ${status === "success" ? "success" : "error"}`} role="status">
                    {feedback}
                  </p>
                )}
              </form>
            </section>
          ) : (
            <section className="placeholder-panel">
              <div className="placeholder-icon">{navigation.find((item) => item.id === activePage)?.icon}</div>
              <h2>{pageTitle}</h2>
              <p>Esta tela existe somente para testar a navegação do menu.</p>
              <button className="secondary-button" onClick={() => navigate("inicio")}>
                Voltar ao início
              </button>
            </section>
          )}

          <div className="info-strip">
            <span className="info-icon">i</span>
            <p>O menu é demonstrativo. O formulário grava no Supabase quando as credenciais e a tabela estiverem configuradas.</p>
          </div>
        </main>
      </div>

      <footer className="bottom-nav">
        {navigation.slice(0, 3).map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => navigate(item.id)}
            aria-current={activePage === item.id ? "page" : undefined}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </button>
        ))}
        <button
          className={`bottom-nav-item ${activePage === "configuracoes" ? "active" : ""}`}
          onClick={() => navigate("configuracoes")}
          aria-current={activePage === "configuracoes" ? "page" : undefined}
        >
          <span>☰</span>
          <small>Mais</small>
        </button>
      </footer>
    </div>
  );
}
