import { useState } from "react";
import { isSupabaseConfigured, supabase } from "./lib/supabase.js";

const paths = [
  { number: "01", title: "Aprenda", detail: "Descubra novas habilidades", href: "#experiencias", tone: "lime" },
  { number: "02", title: "Conecte", detail: "Encontre pessoas e ideias", href: "#comunidade", tone: "coral" },
  { number: "03", title: "Transforme", detail: "Tire projetos do papel", href: "#contato", tone: "violet" },
];

const experiences = [
  { number: "01", icon: "✳", title: "Aprender na prática", text: "Experimente, descubra e desenvolva habilidades em experiências que fazem sentido no mundo real.", tag: "APRENDIZADO" },
  { number: "02", icon: "↗", title: "Criar em conjunto", text: "Aproxime pessoas, compartilhe repertório e encontre novas perspectivas para suas ideias.", tag: "COLABORAÇÃO" },
  { number: "03", icon: "⌘", title: "Fazer acontecer", text: "Transforme boas conversas em projetos, iniciativas e oportunidades concretas.", tag: "INOVAÇÃO" },
];

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d={diagonal ? "M6 14 14 6M7 6h7v7" : "M3 10h13M10 4l6 6-6 6"} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const closeMenu = () => setMenuOpen(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setStatus("error");
      setFeedback("Digite seu nome para continuar.");
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setStatus("error");
      setFeedback("O cadastro está temporariamente indisponível. Tente novamente mais tarde.");
      return;
    }

    setStatus("loading");
    setFeedback("");
    try {
      const { error } = await supabase.from("test_names").insert({ name: cleanName });
      if (error) throw error;
      setStatus("success");
      setFeedback("Pronto! Seu nome chegou até a gente. Obrigado por se conectar.");
      setName("");
    } catch {
      setStatus("error");
      setFeedback("Não foi possível enviar agora. Tente novamente em instantes.");
    }
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <div className="container announcement-inner">
          <span>OFICINA CONEXÃO <i>—</i> IDEIAS EM MOVIMENTO</span>
          <a href="#contato">Vem construir com a gente <Arrow diagonal /></a>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Oficina Conexão - início" onClick={closeMenu}>
            <span className="brand-symbol"><i></i><i></i><i></i><i></i></span>
            <span className="brand-name">oficina<span>conexão</span></span>
          </a>
          <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span>
          </button>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
            <a href="#inicio" onClick={closeMenu}>Início</a>
            <a href="#sobre" onClick={closeMenu}>Nossa ideia</a>
            <a href="#experiencias" onClick={closeMenu}>Experiências</a>
            <a href="#comunidade" onClick={closeMenu}>Comunidade</a>
            <a className="nav-cta" href="#contato" onClick={closeMenu}>Faça parte <Arrow diagonal /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-photo" role="img" aria-label="Jovens colaborando e criando em um espaço de aprendizagem" />
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow eyebrow-light"><i></i> IDEIAS, PESSOAS E POSSIBILIDADES</span>
              <h1>Seu próximo<br />grande passo<br /><em>começa aqui.</em></h1>
              <p>Um espaço para descobrir talentos, conectar pessoas e transformar ideias em experiências que fazem a diferença.</p>
              <div className="hero-actions">
                <a className="button button-lime" href="#experiencias">Explore a oficina <Arrow /></a>
                <a className="hero-text-link" href="#sobre">Conheça nossa ideia <Arrow diagonal /></a>
              </div>
            </div>
            <div className="hero-bottomline">
              <span>01 — 03</span><i></i><span>APRENDER · CONECTAR · REALIZAR</span>
            </div>
          </div>
          <div className="hero-side-note"><span>OC.</span><small>UM LUGAR<br />PARA FAZER</small></div>
        </section>

        <section className="path-strip" aria-label="Explore a Oficina Conexão">
          <div className="container path-grid">
            <div className="path-heading"><span className="eyebrow">SEU CAMINHO COMEÇA AQUI</span><h2>Encontre seu<br />próximo passo.</h2></div>
            {paths.map((item) => (
              <a className={`path-card ${item.tone}`} href={item.href} key={item.number}>
                <span className="path-number">{item.number}</span>
                <span className="path-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                <span className="path-arrow"><Arrow diagonal /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section section-pad" id="sobre">
          <div className="container about-grid">
            <div className="about-photo-wrap">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=88" alt="Grupo de estudantes colaborando em uma atividade" loading="lazy" />
              <div className="photo-sticker"><span>IDEIAS</span><strong>ganham vida<br />em conjunto.</strong><i>✳</i></div>
              <span className="photo-index">CONEXÃO É O COMEÇO / 001</span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">O QUE É A OFICINA?</span>
              <h2>Não é só sobre<br />ter uma ideia.<br /><em>É sobre fazer.</em></h2>
              <p className="about-lead">A Oficina Conexão é um ponto de encontro entre curiosidade, conhecimento e ação.</p>
              <p>Acreditamos que as melhores soluções surgem quando pessoas diferentes compartilham o que sabem. Aqui, aprender é experimentar, colaborar é crescer e cada ideia tem espaço para evoluir.</p>
              <a className="inline-link" href="#comunidade">Conheça nossa comunidade <Arrow diagonal /></a>
            </div>
          </div>
        </section>

        <section className="experience-section section-pad" id="experiencias">
          <div className="container">
            <div className="section-heading">
              <div><span className="eyebrow">EXPERIÊNCIAS QUE MOVEM</span><h2>Ideias boas pedem<br /><em>movimento.</em></h2></div>
              <p>Do primeiro insight à realização: encontre ferramentas, pessoas e experiências para avançar.</p>
            </div>
            <div className="experience-grid">
              {experiences.map((item) => (
                <article className="experience-card" key={item.number}>
                  <div className="experience-card-top"><span>{item.number}</span><span className="experience-icon">{item.icon}</span></div>
                  <span className="experience-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href="#contato" aria-label={`Saiba mais: ${item.title}`}><Arrow diagonal /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="community-section" id="comunidade">
          <div className="community-image" role="img" aria-label="Pessoas trabalhando juntas em um projeto criativo" />
          <div className="community-overlay"></div>
          <div className="container community-content">
            <span className="eyebrow eyebrow-light">GENTE QUE FAZ ACONTECER</span>
            <h2>Uma ideia muda tudo.<br /><em>Uma comunidade move o mundo.</em></h2>
            <p>O próximo projeto incrível pode começar com uma conversa simples.</p>
            <a className="button button-white" href="#contato">Entre nessa conexão <Arrow /></a>
          </div>
          <span className="community-mark">FAÇA PARTE / OC</span>
        </section>

        <section className="contact-section section-pad" id="contato">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">SEU PRÓXIMO PASSO</span>
              <h2>Vamos tirar<br />uma ideia<br /><em>do papel?</em></h2>
              <p>Deixe seu nome. A primeira conexão começa com um simples oi.</p>
              <div className="contact-promise"><span>✳</span><div><strong>Um espaço aberto para novas possibilidades.</strong><small>Conhecimento compartilhado. Ideias em movimento.</small></div></div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-top"><span className="form-kicker">BORA COMEÇAR?</span><span className="form-step">01 / 01</span></div>
              <h3>Quem está chegando?</h3>
              <p>Conta seu nome pra gente.</p>
              <label htmlFor="person-name">Seu nome</label>
              <input id="person-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Digite seu nome completo" maxLength={120} autoComplete="name" required />
              <button className="button button-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Enviando..." : "Quero me conectar"} <Arrow /></button>
              <p className="form-privacy">Seus dados serão usados apenas para este contato.</p>
              {feedback && <p className={status === "success" ? "form-feedback success" : "form-feedback error"} role="status">{feedback}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand brand-footer" href="#inicio">
            <span className="brand-symbol"><i></i><i></i><i></i><i></i></span>
            <span className="brand-name">oficina<span>conexão</span></span>
          </a>
          <p>Ideias em movimento.<br />Possibilidades sem limite.</p>
          <a className="footer-top" href="#inicio">Voltar ao início ↑</a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Oficina Conexão. Todos os direitos reservados.</span><span className={isSupabaseConfigured ? "footer-status online" : "footer-status"}><i></i>{isSupabaseConfigured ? "SISTEMA CONECTADO" : "MODO DEMONSTRAÇÃO"}</span></div>
      </footer>
    </div>
  );
}
