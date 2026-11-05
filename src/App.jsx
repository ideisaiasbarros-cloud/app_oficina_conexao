import { useState } from "react";
import { isSupabaseConfigured, supabase } from "./lib/supabase.js";

const quickLinks = [
  { number: "01", title: "Conheça a oficina", detail: "Nossa proposta e propósito", href: "#sobre" },
  { number: "02", title: "O que fazemos", detail: "Experiências e possibilidades", href: "#experiencias" },
  { number: "03", title: "Faça parte", detail: "Conecte-se com a comunidade", href: "#contato" },
];

const experiences = [
  { number: "01", icon: "✳", title: "Aprender fazendo", text: "Ideias ganham forma quando saem do papel. Explore, experimente e desenvolva novas habilidades." },
  { number: "02", icon: "⌘", title: "Criar conexões", text: "Pessoas, conhecimentos e oportunidades se encontram para construir algo maior." },
  { number: "03", icon: "↗", title: "Transformar ideias", text: "Um espaço aberto à colaboração, à criatividade e a soluções que fazem a diferença." },
];

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setStatus("error");
      setFeedback("Informe seu nome para continuar.");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setStatus("error");
      setFeedback("O cadastro está temporariamente indisponível. Tente novamente mais tarde.");
      return;
    }

    setStatus("loading");
    setFeedback("");
    const { error } = await supabase.from("test_names").insert({ name: cleanName });

    if (error) {
      setStatus("error");
      setFeedback("Não foi possível enviar agora. Tente novamente em instantes.");
      return;
    }

    setStatus("success");
    setFeedback("Recebemos seu nome. Obrigado por se conectar!");
    setName("");
  }

  return (
    <div className="site-shell">
      <div className="utility-bar">
        <div className="container utility-inner">
          <span><i className="utility-pin">⌖</i> Um espaço para aprender, criar e conectar</span>
          <a href="#contato">Fale com a equipe <Arrow /></a>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Oficina Conexão - início" onClick={closeMenu}>
            <span className="brand-symbol"><span></span><span></span><span></span><span></span></span>
            <span className="brand-name">oficina<span>conexão</span><small>IDEIAS EM MOVIMENTO</small></span>
          </a>

          <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span>
          </button>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
            <a href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#sobre" onClick={closeMenu}>A oficina</a>
            <a href="#experiencias" onClick={closeMenu}>Experiências</a>
            <a href="#contato" onClick={closeMenu}>Contato</a>
            <a className="nav-cta" href="#contato" onClick={closeMenu}>Quero me conectar <Arrow /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-image" role="img" aria-label="Pessoas colaborando em um espaço criativo" />
          <div className="hero-shade"></div>
          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow eyebrow-light"><span></span> CONHECIMENTO • CRIATIVIDADE • COLABORAÇÃO</span>
              <h1>Grandes ideias<br />começam com uma<br /><em>conexão.</em></h1>
              <p>Um lugar para trocar experiências, descobrir possibilidades e transformar boas ideias em projetos que fazem sentido.</p>
              <div className="hero-actions">
                <a className="button button-accent" href="#sobre">Descubra a oficina <Arrow /></a>
                <a className="text-link text-link-light" href="#experiencias">Explore possibilidades <span>↘</span></a>
              </div>
            </div>
            <div className="hero-caption"><span>01 / 03</span><span className="caption-line"></span><span>IDEIAS QUE MOVEM O FUTURO</span></div>
          </div>
          <div className="hero-stamp"><span>OC</span><small>IDEIAS<br/>EM AÇÃO</small></div>
        </section>

        <section className="quick-access" aria-label="Acesso rápido">
          <div className="container quick-grid">
            <div className="quick-intro"><span className="eyebrow">EXPLORE</span><strong>Por onde<br/>começar?</strong></div>
            {quickLinks.map((item) => (
              <a className="quick-card" href={item.href} key={item.number}>
                <span className="quick-number">{item.number}</span>
                <span className="quick-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                <span className="quick-arrow"><Arrow /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section section-pad" id="sobre">
          <div className="container about-grid">
            <div className="about-visual">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1100&q=85" alt="Estudantes conversando e colaborando em um ambiente de aprendizagem" loading="lazy" />
              <div className="image-note"><span>01</span><strong>Curiosidade é<br/>o ponto de partida.</strong></div>
              <span className="visual-ring"></span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">SOBRE A OFICINA</span>
              <h2>Mais do que um espaço.<br/><em>Um jeito de fazer.</em></h2>
              <p className="lead">A Oficina Conexão nasce da vontade de aproximar pessoas, ideias e conhecimento.</p>
              <p>Acreditamos que a inovação acontece quando diferentes perspectivas se encontram. Por isso, criamos um ambiente acolhedor para aprender na prática, colaborar e experimentar novos caminhos.</p>
              <a className="text-link" href="#experiencias">Conheça nossa proposta <span>↗</span></a>
              <div className="about-signature"><span className="signature-mark">OC</span><span><strong>Oficina Conexão</strong><small>Ideias em movimento.</small></span></div>
            </div>
          </div>
        </section>

        <section className="experience-section section-pad" id="experiencias">
          <div className="container">
            <div className="section-heading">
              <div><span className="eyebrow">O QUE NOS MOVE</span><h2>Conexões que viram<br/><em>possibilidades.</em></h2></div>
              <p>Um ambiente para despertar talentos, compartilhar repertório e dar o próximo passo — juntos.</p>
            </div>
            <div className="experience-grid">
              {experiences.map((item) => (
                <article className="experience-card" key={item.number}>
                  <div className="card-top"><span>{item.number}</span><span className="experience-icon">{item.icon}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href="#contato" aria-label={`Saiba mais sobre ${item.title}`}><Arrow /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-band">
          <div className="container quote-inner">
            <span className="quote-mark">“</span>
            <p>O futuro não se espera.<br/><em>Se constrói em conjunto.</em></p>
            <span className="quote-side">IDEIAS EM MOVIMENTO<br/>DESDE O PRIMEIRO ENCONTRO</span>
          </div>
        </section>

        <section className="contact-section section-pad" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">FAÇA PARTE</span>
              <h2>Vamos começar<br/>uma <em>conversa?</em></h2>
              <p>Deixe seu nome e dê o primeiro passo para se conectar com a Oficina.</p>
              <div className="contact-detail"><span className="contact-detail-icon">✳</span><span><strong>Uma ideia pode ser o começo de tudo.</strong><small>Estamos prontos para ouvir você.</small></span></div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <span className="form-kicker">CONEXÃO COMEÇA AQUI</span>
              <h3>Conte pra gente quem é você.</h3>
              <label htmlFor="person-name">Seu nome</label>
              <input id="person-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Digite seu nome completo" maxLength={120} autoComplete="name" required />
              <button className="button button-dark" type="submit" disabled={status === "loading"}>{status === "loading" ? "Enviando..." : "Enviar meu nome"} <Arrow /></button>
              <p className="form-privacy">Seus dados serão usados apenas para este contato.</p>
              {feedback && <p className={status === "success" ? "form-feedback success" : "form-feedback error"} role="status">{feedback}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand brand-footer" href="#inicio">
            <span className="brand-symbol"><span></span><span></span><span></span><span></span></span>
            <span className="brand-name">oficina<span>conexão</span><small>IDEIAS EM MOVIMENTO</small></span>
          </a>
          <p>Conhecimento compartilhado.<br/>Possibilidades multiplicadas.</p>
          <a className="footer-top" href="#inicio">Voltar ao topo ↑</a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Oficina Conexão. Todos os direitos reservados.</span><span>FEITO PARA CONECTAR.</span><span className={isSupabaseConfigured ? "footer-status online" : "footer-status"}><i></i>{isSupabaseConfigured ? "SISTEMA CONECTADO" : "MODO DEMONSTRAÇÃO"}</span></div>
      </footer>
    </div>
  );
}
