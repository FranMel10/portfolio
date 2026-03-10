import Link from 'next/link';

export default function Coffee() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#menu">Menú</a></li>
          <li><Link href="/">← Portfolio</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Surreal Roots Coffee</h1>
        <p>Café de especialidad con raíces salvadoreñas y alma surrealista ☕</p>
        <a href="#menu" className="btn">Ver Menú</a>
      </section>

      {/* HISTORIA */}
<section id="historia" className="section">
  <h2>Historia</h2>
  <p>
    Surreal Roots Coffee nació en El Salvador con la visión de conectar 
    la riqueza del café salvadoreño con una experiencia cultural única. 
    Cada taza cuenta una historia de origen, tradición y creatividad.
  </p>
  <Link href="/coffee/historia" className="btn" style={{marginTop: '1rem', display: 'inline-block'}}>Leer historia completa →</Link>
</section>

      {/* MENU */}
      <section id="menu" className="section">
        <h2>Menú</h2>
        <div className="cards">
          <div className="card">
            <h3>Espresso Surreal</h3>
            <p>Shot doble de café de altura, notas de chocolate y caramelo.</p>
            <span className="tag">$2.50</span>
          </div>
          <div className="card">
            <h3>Cold Brew Roots</h3>
            <p>Extracción en frío por 24 horas, suave y con cuerpo.</p>
            <span className="tag">$4.00</span>
          </div>
          <div className="card">
            <h3>Latte de Cardamomo</h3>
            <p>Espresso con leche vaporizada y cardamomo salvadoreño.</p>
            <span className="tag">$3.50</span>
          </div>
          <div className="card">
            <h3>Pour Over Volcánico</h3>
            <p>Café de origen único del Volcán Santa Ana, filtrado a mano.</p>
            <span className="tag">$4.50</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Surreal Roots Coffee — El Salvador</p>
      </footer>

    </main>
  );
}