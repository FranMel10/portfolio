'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const experiencias = [
  {
    id: 1,
    titulo: 'Tour Café Centro Histórico',
    descripcion: 'Recorre los cafés más emblemáticos del Centro Histórico de San Salvador. Conoce la historia del café salvadoreño en cada taza.',
    duracion: '3 horas',
    precio: 25,
    lugar: 'Centro Histórico, San Salvador',
    emoji: '🏛️',
    incluye: ['Guía especializado', '3 catas de café', 'Historia del café SV', 'Transporte incluido']
  },
  {
    id: 2,
    titulo: 'Cata Sensorial en 1200 Café',
    descripcion: 'Una experiencia de cata profesional en uno de los cafés más reconocidos de El Salvador. Aprende a identificar notas, aromas y texturas.',
    duracion: '2 horas',
    precio: 35,
    lugar: '1200 Café, San Salvador',
    emoji: '☕',
    incluye: ['Barista certificado', '5 varietales distintos', 'Guía de cata', 'Certificado de participación']
  },
  {
    id: 3,
    titulo: 'Café Sensorial en Alquimia Coffee',
    descripcion: 'Descubre el arte detrás de cada taza en Alquimia Coffee. Una experiencia inmersiva que combina ciencia y sabor.',
    duracion: '2.5 horas',
    precio: 40,
    lugar: 'Alquimia Coffee, San Salvador',
    emoji: '⚗️',
    incluye: ['Proceso completo de extracción', 'Métodos alternativos', 'Maridaje con postres', 'Recetas exclusivas']
  },
  {
    id: 4,
    titulo: 'Dormir Entre Cafetales en Kafen',
    descripcion: 'Pasa la noche en una cúpula geodésica rodeado de cafetales en Juayúa. Despierta con el aroma del café recién cosechado.',
    duracion: '1 noche',
    precio: 120,
    lugar: 'Kafen, Juayúa, Sonsonate',
    emoji: '🌿',
    incluye: ['Noche en domo geodésico', 'Cena y desayuno', 'Tour del cafetal', 'Cata de café de origen']
  }
]

export default function Experiencias() {
  const [seleccionada, setSeleccionada] = useState(null)
  const [email, setEmail] = useState('')
  const [suscrito, setSuscrito] = useState(false)

  async function suscribirse() {
  if (!email) return alert('Ingresa tu email')
  
  const { error } = await supabase
    .from('newsletter')
    .insert([{ email }])

  if (error) {
    alert('Error al suscribirse')
    console.error(error)
  } else {
    setSuscrito(true)
    setEmail('')
  }
}

  return (
    <main>
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul>
          <li><Link href="/coffee">Tienda</Link></li>
          <li><Link href="/coffee/historia">Historia</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Experiencias de Café</h1>
        <p>Vive el café salvadoreño de una manera que nunca olvidarás</p>
      </section>

      {/* EXPERIENCIAS */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {experiencias.map(exp => (
            <div key={exp.id} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: seleccionada?.id === exp.id ? '0 8px 30px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.05)'
            }}
              onClick={() => setSeleccionada(seleccionada?.id === exp.id ? null : exp)}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{exp.emoji}</div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{exp.titulo}</h2>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{exp.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>⏱ {exp.duracion}</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>${exp.precio}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>📍 {exp.lugar}</p>

              {seleccionada?.id === exp.id && (
                <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Incluye:</p>
                  <ul style={{ paddingLeft: '1.2rem' }}>
                    {exp.incluye.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.3rem' }}>✓ {item}</li>
                    ))}
                  </ul>
                  <button className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                    Reservar experiencia
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
<section style={{ background: '#111', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
  <h2 style={{ marginBottom: '1rem' }}>¿Quieres saber de nuevas experiencias?</h2>
  <p style={{ color: '#aaa', marginBottom: '2rem' }}>Suscríbete y recibe las primeras novedades</p>
  {suscrito ? (
    <p style={{ color: '#4ade80', fontSize: '1.1rem' }}>¡Gracias por suscribirte! ☕</p>
  ) : (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <input 
        type="email" 
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: 'none',
          fontSize: '1rem',
          minWidth: '280px'
        }} 
      />
      <button onClick={suscribirse} className="btn" style={{ background: '#fff', color: '#111' }}>
        Suscribirme
      </button>
    </div>
  )}
</section>

      <footer className="footer">
        <p>© 2025 Surreal Roots Coffee — El Salvador</p>
      </footer>
    </main>
  )
}