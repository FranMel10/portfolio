'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Coffee() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

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

  function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id)
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }

  function quitarDelCarrito(id) {
  setCarrito(carrito.filter(item => item.id !== id))
}

function cambiarCantidad(id, delta) {
  setCarrito(carrito
    .map(item => item.id === id ? { ...item, cantidad: item.cantidad + delta } : item)
    .filter(item => item.cantidad > 0)
  )
}

async function confirmarPedido() {
  const { error } = await supabase
    .from('pedidos')
    .insert([{
      productos: carrito,
      total: total,
      estado: 'pendiente'
    }])

  if (error) {
    console.error('Error:', JSON.stringify(error))
    alert('Error al procesar pedido')
    return
  }

  const referencia = `surreal-${new Date().getTime()}`

  const response = await fetch('/api/crear-pago', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ total: total, referencia })
  })

  const data = await response.json()

  if (data.urlEnlacePago) {
    window.location.assign(data.urlEnlacePago)
  } else {
    console.error('Wompi error:', JSON.stringify(data))
    alert('Error al crear enlace de pago')
  }
}
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

  return (
    <main>

      {/* NAVBAR */}
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#menu">Menú</a></li>
           <li><Link href="/coffee/experiencias">Experiencias</Link></li>
          <li><a href="#carrito">🛒 {carrito.length}</a></li>
          <li><Link href="/">← Portfolio</Link></li>
        </ul>
      </nav>
         

      {/* HERO */}
<section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
  <video
    autoPlay
    muted
    loop
    playsInline
    style={{
      position: 'absolute',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.35,
      zIndex: 0
    }}
  >
    <source src="/coffee-hero.mp4" type="video/mp4" />
  </video>
  <div style={{ position: 'relative', zIndex: 1 }}>
    <h1>Surreal Roots Coffee</h1>
    <p>Café de especialidad con raíces salvadoreñas y alma surrealista ☕</p>
    <a href="#menu" className="btn">Ver Menú</a>
  </div>
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
    {productos.map((producto) => {
      const badges = {
        'Café Volcánico Clásico': { label: 'Más vendido', color: '#c9a84c' },
        'Café Pacamara Premium': { label: 'Premium', color: '#9b59b6' },
        'Café de Temporada': { label: 'Edición limitada', color: '#e74c3c' }
      }
      const origenes = {
        'Café Volcánico Clásico': 'Santa Ana, SV',
        'Café Pacamara Premium': 'Apaneca, SV',
        'Café de Temporada': 'Origen variable, SV'
      }
      const badge = badges[producto.nombre]
      const origen = origenes[producto.nombre]

      return (
        <div className="card" key={producto.id} style={{ position: 'relative', overflow: 'hidden' }}>
          {badge && (
            <span style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: badge.color,
              color: '#fff',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.75rem',
              borderRadius: '2px',
              fontWeight: 'bold',
              zIndex: 2
            }}>
              {badge.label}
            </span>
          )}
          {producto.imagen && (
            <div style={{ overflow: 'hidden', borderRadius: '4px', marginBottom: '1.5rem' }}>
              <img
                src={`/${producto.imagen}`}
                alt={producto.nombre}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          )}
          <h3>{producto.nombre}</h3>
          {origen && (
            <p style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              📍 {origen}
            </p>
          )}
          <p>{producto.descripcion}</p>
          <span className="tag">{producto.peso}</span>
          <span className="tag">${producto.precio}</span>
          <button
            className="btn"
            style={{marginTop: '1rem', width: '100%'}}
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      )
    })}
  </div>
</section>

      {/* CARRITO */}
      <section id="carrito" className="section">
        <h2>🛒 Carrito</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map(item => (
              <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #222'}}>
                <div>
                  <p style={{fontWeight: '700', color: '#f0f0f0'}}>{item.nombre}</p>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.3rem'}}>
  <button onClick={() => cambiarCantidad(item.id, -1)} style={{background: '#222', border: '1px solid #444', color: '#f0f0f0', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem'}}>−</button>
  <span style={{color: '#aaa'}}>{item.cantidad}</span>
  <button onClick={() => cambiarCantidad(item.id, 1)} style={{background: '#222', border: '1px solid #444', color: '#f0f0f0', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem'}}>+</button>
  <span style={{color: '#aaa', fontSize: '0.9rem'}}>× ${item.precio}</span>
</div>
                </div>
                <button onClick={() => quitarDelCarrito(item.id)} style={{background: 'none', border: '1px solid #444', color: '#aaa', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer'}}>
                  Quitar
                </button>
              </div>

              
            ))}
            <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <p style={{fontSize: '1.2rem', fontWeight: '700', color: '#f0f0f0'}}>Total: ${total.toFixed(2)}</p>
              <button className="btn" onClick={confirmarPedido}>Confirmar pedido</button>
            </div>
          </>
        )}
      </section>

{/* EXPERIENCIAS */}
<section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--grain)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
  <h2 style={{ marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Más que un café</h2>
  <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Vive experiencias únicas de café en El Salvador</p>
  <Link href="/coffee/experiencias" className="btn">Ver experiencias</Link>
</section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Surreal Roots Coffee — El Salvador</p>
      </footer>

    </main>
  );
}