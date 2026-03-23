'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const systemPrompt = `Eres un experto barista y guía de café de Surreal Roots Coffee, una marca de café de especialidad salvadoreña. 
Tu trabajo es recomendar productos de nuestro menú basándote en las preferencias del usuario.

Nuestros productos son:
1. Café Volcánico Clásico - $6 - Café de altura con notas suaves y cuerpo balanceado. Origen: Santa Ana, SV. Ideal para quienes prefieren un café suave y equilibrado.
2. Café Pacamara Premium - $9 - Variedad especial Pacamara, con aroma floral, notas dulces a panela y caramelo, sutil acidez a frutas amarillas, cuerpo redondo. Origen: Apaneca, SV. Ideal para paladares exigentes.
3. Café de Temporada - $9 - Disponibilidad limitada según la cosecha, siempre sorprendente. Origen: variable, SV. Ideal para quienes buscan algo especial y exclusivo.
4. Café Pacamara Clásico Caliente - $0.50 - Servido caliente por taza. Ideal para quien quiere probar el Pacamara sin compromiso.
5. Cold Brew - $1.00 - Extracción en frío 12 horas. Suave, concentrado, sin acidez. Perfecto para clima caliente.
6. Prensa Francesa - $8.00 - Preparación artesanal por taza, cuerpo completo y sabor limpio. Experiencia de café premium.
7. Cold Brew con Leche o Naranja - $1.50 - Cold brew servido con leche o jugo de naranja fresco a elección del cliente. Ideal para quien quiere algo más cremoso o cítrico.

Responde siempre en español, de forma breve y amigable. Máximo 3 oraciones. Recomienda siempre uno de nuestros productos.`

export default function Coffee() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [drawerAbierto, setDrawerAbierto] = useState(false)
  const [mensajesChat, setMensajesChat] = useState([
    { role: 'assistant', content: 'Hola! Soy tu guía de café Surreal. ¿Qué tipo de café estás buscando hoy? ☕' }
  ])
  const [inputChat, setInputChat] = useState('')
  const [cargandoChat, setCargandoChat] = useState(false)

  useEffect(() => {
    async function cargarProductos() {
      const { data, error } = await supabase.from('productos').select('*')
      if (error) console.error(error)
      else setProductos(data)
    }
    cargarProductos()
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerAbierto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerAbierto])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setDrawerAbierto(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

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

  async function enviarMensaje() {
    if (!inputChat.trim()) return
    const nuevoMensaje = { role: 'user', content: inputChat }
    const mensajesActualizados = [...mensajesChat, nuevoMensaje]
    setMensajesChat(mensajesActualizados)
    setInputChat('')
    setCargandoChat(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: mensajesActualizados, systemPrompt })
      })
      const data = await response.json()
      const respuesta = data.content[0].text
      setMensajesChat([...mensajesActualizados, { role: 'assistant', content: respuesta }])
    } catch (error) {
      console.error(error)
      setMensajesChat([...mensajesActualizados, { role: 'assistant', content: 'Lo siento, hubo un error. Intenta de nuevo.' }])
    } finally {
      setCargandoChat(false)
    }
  }

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <main>
      {/* NAVBAR */}
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#menu">Menú</a></li>
          <li><Link href="/coffee/experiencias">Experiencias</Link></li>
          <li>
            <button
              onClick={() => setDrawerAbierto(true)}
              style={{ background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', padding: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              🛒 {totalItems > 0 && (
                <span style={{ background: 'var(--accent)', color: '#000', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {totalItems}
                </span>
              )}
            </button>
          </li>
          <li><Link href="/">← Portfolio</Link></li>
        </ul>
      </nav>

      {/* OVERLAY */}
      <div
        onClick={() => setDrawerAbierto(false)}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40,
          opacity: drawerAbierto ? 1 : 0,
          pointerEvents: drawerAbierto ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* DRAWER */}
      <div style={{
        position: 'fixed', top: 0, right: 0, height: '100%', width: '360px',
        background: '#0d0d0d', borderLeft: '1px solid var(--border)',
        zIndex: 50, display: 'flex', flexDirection: 'column',
        transform: drawerAbierto ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray)' }}>
            Tu selección {totalItems > 0 && `(${totalItems})`}
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
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '0.75rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'var(--grain)', border: '1px solid var(--border)', overflow: 'hidden', flexShrink: 0 }}>
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
                    <button onClick={() => cambiarCantidad(item.id, -1)} style={{ width: '22px', height: '22px', background: 'var(--grain)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '3px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                    <span style={{ fontSize: '0.8rem', color: 'var(--white)', minWidth: '16px', textAlign: 'center', fontFamily: 'DM Mono, monospace' }}>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.id, 1)} style={{ width: '22px', height: '22px', background: 'var(--grain)', border: '1px solid var(--border)', color: 'var(--white)', borderRadius: '3px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
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
              style={{ width: '100%', marginBottom: '0.5rem', opacity: 0.6 }}
            >
              Collection (Recogida)
            </button>
            <button
              className="btn"
              onClick={() => {
                localStorage.setItem('carrito', JSON.stringify(carrito))
                window.location.href = '/checkout'
              }}
              style={{ width: '100%', opacity: 0.6 }}
            >
              Delivery
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
          <a href="#menu" className="btn">Ver Menú</a>
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
        <h2>Menú</h2>
        <div className="cards">
          {productos.map((producto) => {
            const badges = {
              'Café Volcánico Clásico': { label: 'Más vendido', color: '#c9a84c' },
              'Café Pacamara Premium': { label: 'Premium', color: '#9b59b6' },
              'Café de Temporada': { label: 'Edición limitada', color: '#e74c3c' },
              'Café Pacamara Clásico Caliente': { label: 'Feria', color: '#2e7d32' },
              'Cold Brew': { label: 'Frío', color: '#1565c0' },
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
                  Agregar al carrito
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* CHATBOT */}
      <section className="section">
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>IA Coffee Guide</p>
        <h2 style={{ marginBottom: '2rem' }}>¿Qué café eres tú?</h2>
        <div style={{ maxWidth: '600px', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mensajesChat.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ background: msg.role === 'user' ? 'var(--accent)' : 'var(--grain)', color: msg.role === 'user' ? '#000' : 'var(--white)', padding: '0.75rem 1rem', borderRadius: '8px', maxWidth: '80%', fontSize: '0.85rem', lineHeight: '1.6', border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none' }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {cargandoChat && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: 'var(--grain)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--gray)' }}>
                  Preparando tu recomendación...
                </div>
              </div>
            )}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', padding: '1rem', display: 'flex', gap: '0.75rem' }}>
            <input type="text" placeholder="Ej: quiero un café suave y dulce..." value={inputChat} onChange={(e) => setInputChat(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
              style={{ flex: 1, background: 'var(--grain)', border: '1px solid var(--border)', borderRadius: '4px', padding: '0.75rem 1rem', color: 'var(--white)', fontSize: '0.85rem', fontFamily: 'DM Mono, monospace' }}
            />
            <button onClick={enviarMensaje} className="btn" style={{ whiteSpace: 'nowrap' }}>Enviar</button>
          </div>
        </div>
      </section>

      {/* CTA EXPERIENCIAS */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--grain)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Mas que un cafe</h2>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Vive experiencias unicas de cafe en El Salvador</p>
        <Link href="/coffee/experiencias" className="btn">Ver experiencias</Link>
      </section>

      <footer className="footer">
        <p>2025 Surreal Roots Coffee - El Salvador</p>
      </footer>
    </main>
  )
}