import Link from 'next/link';

export default function Historia() {
  return (
    <main>

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul>
          <li><Link href="/coffee">← Volver</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Nuestra Historia</h1>
        <p>De las faldas del volcán a tu taza ☕</p>
      </section>

      {/* CONTENIDO */}
      <section className="section">
        <h2>El Origen</h2>
        <p>
          Surreal Roots Coffee nació en El Salvador con una visión simple: 
          conectar la riqueza del café salvadoreño con una experiencia cultural 
          auténtica. Todo comenzó con una pregunta — ¿por qué el mejor café 
          de El Salvador se exporta y nosotros tomamos lo que sobra?
        </p>
      </section>

      <section className="section">
        <h2>La Tierra</h2>
        <p>
          Nuestros granos provienen de las faldas del Volcán Santa Ana, 
          conocido también como Ilamatepec. A más de 2,000 metros de altura, 
          el clima frío y los suelos volcánicos crean las condiciones perfectas 
          para un café de altura con notas complejas de chocolate, fruta y caramelo.
        </p>
      </section>

      <section className="section">
        <h2>El Nombre</h2>
        <p>
          Surreal porque creemos que tomar un buen café es una experiencia 
          que va más allá de lo cotidiano. Roots porque nunca olvidamos 
          nuestras raíces — la tierra, la gente y la cultura salvadoreña 
          que hace posible cada taza.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Surreal Roots Coffee — El Salvador</p>
      </footer>

    </main>
  );
}