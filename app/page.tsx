export default function Home() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="logo">Armando Meléndez</span>
        <ul>
          <li><a href="#about">About</a></li>
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
        <p>
          Soy Armando Meléndez, Ingeniero Biomédico y parte del equipo de soporte en Flipdish.
          Estoy aprendiendo desarrollo web fullstack — JavaScript, HTML, CSS y Next.js —
          con el objetivo de crecer como desarrollador y crear productos reales.
        </p>
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
          </div>
          <div className="card">
            <h3>Experiencias de Café</h3>
            <p>Directorio de cafeterías especiales en El Salvador con newsletter.</p>
            <span className="tag">Next.js</span>
            <span className="tag">Supabase</span>
          </div>
          <div className="card">
            <h3>Podcast Surreal</h3>
            <p>Página conectada a YouTube y Spotify con contexto editorial de cada episodio.</p>
            <span className="tag">YouTube API</span>
            <span className="tag">Next.js</span>
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