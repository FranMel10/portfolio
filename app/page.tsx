import Link from 'next/link';

export default function Home() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="logo">Francisco Armando Meléndez</span>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Full Stack Developer</h1>
        <p>Biomedical Engineer building digital experiences from El Salvador 🇸🇻</p>
        <a href="#projects" className="btn">Ver proyectos</a>
      </section>

      {/* ABOUT */}
<section id="about" className="section">
  <h2>About</h2>
  <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <img
      src="/avatar.png"
      alt="Armando Meléndez"
      style={{
        width: '220px',
        height: '220px',
        objectFit: 'cover',
        borderRadius: '4px',
        border: '1px solid rgba(255,255,255,0.08)',
        filter: 'grayscale(20%)'
      }}
    />
    <div style={{ flex: 1, minWidth: '280px' }}>
      <div className="divider"></div>
      <p style={{ lineHeight: '1.9', color: '#888', marginBottom: '1.5rem' }}>
        Biomedical Engineer & Support Specialist at Flipdish. 
        Building fullstack web experiences with Next.js, Supabase and modern JavaScript. 
        Based in El Salvador — passionate about local art, coffee culture, and creating 
        real digital products.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a href="https://github.com/FranMel10" target="_blank" rel="noopener noreferrer" className="btn">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/francisco-melendez-2459171b5/" target="_blank" rel="noopener noreferrer" className="btn">
          LinkedIn
        </a>
        <Link href="/podcast" className="btn">
          Surreal Podcast
        </Link>
      </div>
    </div>
  </div>
</section>


{/* SKILLS */}
<section id="skills" className="section">
  <h2>Skills</h2>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
    
    <div>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>Development</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {['JavaScript', 'HTML & CSS', 'Next.js', 'React', 'Supabase', 'PostgreSQL', 'Git & GitHub', 'Node.js', 'REST APIs'].map(skill => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </div>
    </div>

    <div>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>Technical Support</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {[ 'Salesforce', 'Zendesk', 'IT Troubleshooting', 'Technical Documentation', 'CRM Systems', 'Customer Support'].map(skill => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </div>
    </div>

    <div>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>Languages</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {['Español — Nativo', 'English — Professional'].map(skill => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </div>
    </div>

  </div>
</section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="cards">
          <div className="card">
            <h3>Surreal Roots Coffee</h3>
            <p>Tienda online de café salvadoreño con pagos integrados y base de datos.</p>
            <span className="tag">Next.js</span>
            <span className="tag">Supabase</span>
            <span className="tag">Wompi</span>
            <Link href="/coffee" className="btn" style={{marginTop: '1rem', display: 'inline-block'}}>Ver proyecto →</Link>
          </div>
          <div className="card">
            <h3>Experiencias de Café</h3>
            <p>Directorio de cafeterías especiales en El Salvador con newsletter.</p>
            <span className="tag">Next.js</span>
            <span className="tag">Supabase</span>
            <Link href="/coffee/experiencias" className="btn" style={{marginTop: '1rem', display: 'inline-block'}}>Ver proyecto →</Link>
          </div>
          <div className="card">
            <h3>Podcast Surreal</h3>
            <p>Página conectada a YouTube y Spotify con contexto editorial de cada episodio.</p>
            <span className="tag">YouTube API</span>
            <span className="tag">Next.js</span>
            <Link href="/podcast" className="btn" style={{marginTop: '1rem', display: 'inline-block'}}>Ver proyecto →</Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2>Contact</h2>
        <p>¿Tienes un proyecto en mente? Hablemos.</p>
        <form className="form">
          <input type="text" placeholder="Tu nombre" />
          <input type="email" placeholder="Tu email" />
          <textarea placeholder="Tu mensaje" rows={5} />
          <button type="submit" className="btn">Enviar</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Armando Meléndez — El Salvador</p>
      </footer>

    </main>
  );
}