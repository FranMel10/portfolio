'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Coffee() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
      if (error) console.error(error)
      else setProductos(data)
    }
    cargarProductos()
  }, [])

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
          {productos.map((producto) => (
            <div className="card" key={producto.id}>
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <span className="tag">{producto.peso}</span>
              <span className="tag">${producto.precio}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Surreal Roots Coffee — El Salvador</p>
      </footer>

    </main>
  );
}