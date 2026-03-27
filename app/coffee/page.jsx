'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Coffee() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [drawerAbierto, setDrawerAbierto] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    async function cargarProductos() {
      const { data, error } = await supabase.from('productos').select('*')
      if (error) console.error(error)
      else setProductos(data)
    }
    cargarProductos()
  }, [])

  useEffect(() => {
    if (drawerAbierto || menuAbierto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerAbierto, menuAbierto])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setDrawerAbierto(false)
        setMenuAbierto(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light')
    } else {
      document.body.classList.add('light')
    }
  }, [darkMode])

  function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.id === producto.id)
    if (existe) {
      setCarrito(carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
    setDrawerAbierto(true)
    setMenuAbierto(false)
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

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <main id="top">

      {/* NAVBAR */}
      <nav className="navbar">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span className="logo">Surreal Roots Coffee</span>
        </button>

        <ul className={menuAbierto ? 'open' : ''}>
          <li><a href="#top" onClick={() => setMenuAbierto(false)}>Inicio</a></li>
          <li><a href="#historia" onClick={() => setMenuAbierto(false)}>Historia</a></li>
          <li><a href="#menu" onClick={() => setMenuAbierto(false)}>Menu</a></li>
          <li><Link href="/coffee/experiencias" onClick={() => setMenuAbierto(false)}>Experiencias</Link></li>
    <li>
  <a
    href="https://wa.me/50372017598"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      background: '#25D366',
      color: '#fff',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      fontWeight: 'bold'
    }}
  >
    💬 WhatsApp
  </a>
</li>
<li>
            
            <button
              onClick={() => { setDrawerAbierto(true); setMenuAbierto(false) }}
              style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit', padding: 0, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              🛒 {totalItems > 0 && (
                <span style={{ background: 'var(--accent)', color: '#000', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {totalItems}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => { setDarkMode(!darkMode); setMenuAbierto(false) }}
              style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit', padding: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              {darkMode ? '☀ Claro' : '● Oscuro'}
            </button>
          </li>
          <li><Link href="/coffee/en" onClick={() => setMenuAbierto(false)}>EN</Link></li>
          <li><Link href="/" onClick={() => setMenuAbierto(false)}>Portfolio</Link></li>
        </ul>

        <button
          className={`menu-toggle ${menuAbierto ? 'open' : ''}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => { setDrawerAbierto(false); setMenuAbierto(false) }}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40,
          opacity: drawerAbierto ? 1 : 0,
          pointerEvents: drawerAbierto ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* DRAWER */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100%', width: 'min(360px, 100vw)',
        background: 'var(--grain)', borderLeft: '1px solid var(--border)',
        zIndex: 50, display: 'flex', flexDirection: 'column',
        transform: drawerAbierto ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray)' }}>
            Tu seleccion {totalItems > 0 && `(${totalItems})`}
          </span>
          <button onClick={() => setDrawerAbierto(false)} style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1, padding: '4px' }}>
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {carrito.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '0.75rem', color: 'var(--gray)' }}>
              <span style={{ fontSize: '2rem' }}>○</span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Sin productos</span>
              <button
                onClick={() => setDrawerAbierto(false)}
                style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'DM Mono, monospace', marginTop: '0.5rem' }}
              >
                ← Volver al menu
              </button>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '0.75rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'var(--black)', border: '1px solid var(--border)', overflow: 'hidden', flexShrink: 0 }}>
                  {item.imagen ? (
                    <img src={`/${item.imagen}`} alt={item.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>☕</div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--white)', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.nombre}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>${(item.precio * item.cantidad).toFixed(2)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button onClick={() => cambiarCantidad(item.id, -1)} style={{ width: '22px', height: '22px', background: 'var(--black)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '3px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ fontSize: '0.8rem', color: 'var(--white)', minWidth: '16px', textAlign: 'center', fontFamily: 'DM Mono, monospace' }}>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.id, 1)} style={{ width: '22px', height: '22px', background: 'var(--black)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '3px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                  </div>
                </div>
                <button onClick={() => quitarDelCarrito(item.id)} style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '1rem', alignSelf: 'flex-start', padding: '2px' }}>×</button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>Total</span>
              <span style={{ fontSize: '1.3rem', color: 'var(--white)', fontFamily: 'DM Mono, monospace' }}>${total.toFixed(2)}</span>
            </div>
            <button
              className="btn"
              onClick={() => {
                localStorage.setItem('carrito', JSON.stringify(carrito))
                window.location.href = '/checkout'
              }}
              style={{ width: '100%', marginBottom: '0.5rem' }}
            >
              Proceder al pago
            </button>
            <button
              onClick={() => setDrawerAbierto(false)}
              style={{ width: '100%', background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.75rem', fontFamily: 'DM Mono, monospace' }}
            >
              ← Seguir comprando
            </button>
          </div>
        )}
      </div>

      {/* HERO */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, zIndex: 0 }}>
          <source src="/coffee-hero.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>Surreal Roots Coffee</h1>
          <p>Café de especialidad con raíces salvadoreñas y alma surrealista</p>
          <a href="#menu" className="btn">Ver Menu</a>
          
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="section">
        <h2>Historia</h2>
        <p>Surreal Roots Coffee nació en El Salvador con la visión de conectar la riqueza del café salvadoreño con una experiencia cultural única. Cada taza cuenta una historia de origen, tradición y creatividad.</p>
        <Link href="/coffee/historia" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>Leer historia completa</Link>
      </section>

      {/* MENÚ */}
      <section id="menu" className="section">
        <h2>Menu</h2>
        <div className="cards">
          {productos.map((producto) => {
            const badges = {
              'Café Volcánico Clásico': { label: 'Mas vendido', color: '#c9a84c' },
              'Café Pacamara Premium': { label: 'Premium', color: '#9b59b6' },
              'Café de Temporada': { label: 'Edicion limitada', color: '#e74c3c' },
              'Café Pacamara Clásico Caliente': { label: 'Feria', color: '#2e7d32' },
              'Cold Brew': { label: 'Frio', color: '#1565c0' },
              'Prensa Francesa': { label: 'Artesanal', color: '#6d4c41' },
              'Cold Brew con Leche o Naranja': { label: 'Especial', color: '#e65100' },
            }
            const origenes = {
              'Café Volcánico Clásico': 'Santa Ana, SV',
              'Café Pacamara Premium': 'Apaneca, SV',
              'Café de Temporada': 'Origen variable, SV',
              'Café Pacamara Clásico Caliente': 'Feria · Por taza',
              'Cold Brew': 'Feria · Por vaso',
              'Prensa Francesa': 'Feria · Por prensa',
              'Cold Brew con Leche o Naranja': 'Feria · Por vaso',
            }
            const badge = badges[producto.nombre]
            const origen = origenes[producto.nombre]
            return (
              <div className="card" key={producto.id} style={{ position: 'relative', overflow: 'hidden' }}>
                {badge && (
                  <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: badge.color, color: '#fff', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '2px', fontWeight: 'bold', zIndex: 2 }}>
                    {badge.label}
                  </span>
                )}
                {producto.imagen && (
                  <div style={{ overflow: 'hidden', borderRadius: '4px', marginBottom: '1.5rem' }}>
                    <img src={`/${producto.imagen}`} alt={producto.nombre} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                )}
                <h3>{producto.nombre}</h3>
                {origen && <p style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📍 {origen}</p>}
                <p>{producto.descripcion}</p>
                <span className="tag">{producto.peso}</span>
                <span className="tag">${producto.precio}</span>
                <button className="btn" style={{ marginTop: '1rem', width: '100%' }} onClick={() => agregarAlCarrito(producto)}>
                  Agregar al Carrito{producto.disponible === false ? (
  <button
    disabled
    style={{ marginTop: '1rem', width: '100%', background: 'none', border: '1px solid var(--border)', color: 'var(--gray)', padding: '0.75rem 2rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'not-allowed', fontFamily: 'DM Mono, monospace' }}
  >
    Solo en feria
  </button>
) : (
  <button className="btn" style={{ marginTop: '1rem', width: '100%' }} onClick={() => agregarAlCarrito(producto)}>
    Agregar al carrito
  </button>
)}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA EXPERIENCIAS */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--grain)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Mas que un cafe</h2>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Vive experiencias unicas de cafe en El Salvador</p>
        <Link href="/coffee/experiencias" className="btn">Ver experiencias</Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <a href="https://www.instagram.com/surrealrootscoffee" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--gray)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
          <a href="https://www.youtube.com/watch?v=nTftGsYmzoU" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--gray)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
            </svg>
            YouTube
          </a>
        </div>
        <p>2025 Surreal Roots Coffee - El Salvador</p>
      </footer>
    

    <a
  href="https://wa.me/50372017598?text=Hola%20quiero%20informacion%20sobre%20el%20cafe"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#25D366',
    color: '#fff',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 100,
    textDecoration: 'none'
  }}
>
  💬
</a>
    </main>
  )
}