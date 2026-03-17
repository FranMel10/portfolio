'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const experiencias = [
  {
    id: 1,
    titulo: 'Tour Café Centro Histórico',
    descripcion: 'Recorre 5 cafeterías especiales del Centro Histórico de San Salvador. Termina probando Surreal Roots Coffee. Una experiencia guiada por Armando Meléndez.',
    duracion: '3 horas',
    precio: '$10 por persona',
    lugar: 'Centro Histórico, San Salvador',
    emoji: '🏛️',
    incluye: ['Guía personalizado', '5 catas de café', 'Historia del café SV', 'Surreal Roots Coffee al final'],
    accion: 'reservar'
  },
  {
    id: 2,
    titulo: 'Cata Sensorial en 1200 Café',
    descripcion: 'Una experiencia de cata profesional en las faldas del Volcán de San Salvador. Se organiza en fechas específicas con cupo limitado.',
    duracion: '2 horas',
    precio: '$25 por persona',
    lugar: '1200 Café, San Salvador',
    emoji: '☕',
    incluye: ['Barista certificado', '5 varietales distintos', 'Guía de cata', 'Vista al volcán'],
    accion: 'reservar'
  },
  {
    id: 3,
    titulo: 'Café Sensorial en Alquimia Coffee',
    descripcion: 'Una recomendación especial. Alquimia Coffee ofrece experiencias sensoriales únicas en San Salvador. Visítalos directamente.',
    duracion: 'Variable',
    precio: 'Consultar directamente',
    lugar: 'Alquimia Coffee, San Salvador',
    emoji: '⚗️',
    incluye: ['Experiencia sensorial completa', 'Métodos alternativos', 'Baristas especializados'],
    accion: 'externo',
    link: 'https://www.instagram.com/alquimiacoffee/'
  },
  {
    id: 4,
    titulo: 'Dormir Entre Cafetales en Kafen',
    descripcion: 'Una recomendación especial. Kafen Hotel en Juayúa ofrece glamping entre cafetales con una experiencia única de café de origen.',
    duracion: '1 noche',
    precio: 'Consultar directamente',
    lugar: 'Kafen Hotel, Juayúa, Sonsonate',
    emoji: '🌿',
    incluye: ['Domo geodésico', 'Cena y desayuno', 'Tour del cafetal', 'Café de origen'],
    accion: 'externo',
    link: 'https://hotelkafen.com'
  }
]

export default function Experiencias() {
  const [seleccionada, setSeleccionada] = useState(null)
  const [email, setEmail] = useState('')
  const [suscrito, setSuscrito] = useState(false)

  async function suscribirse() {
    if (!email) return alert('Ingresa tu email')
    const { error } = await supabase.from('newsletter').insert([{ email }])
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

      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/experiencias-hero.png" alt="Experiencias de Café" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>Experiencias de Café</h1>
          <p>Vive el café salvadoreño de una manera que nunca olvidarás</p>
          <Link href="/coffee" className="btn" style={{ marginTop: '1.5rem' }}>Volver a la tienda</Link>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {experiencias.map(exp => (
            <div key={exp.id}
              onClick={() => setSeleccionada(seleccionada?.id === exp.id ? null : exp)}
              style={{ border: `1px solid ${seleccionada?.id === exp.id ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '4px', padding: '2rem', cursor: 'pointer', background: 'var(--grain)', transition: 'transform 0.2s, border-color 0.2s', transform: seleccionada?.id === exp.id ? 'translateY(-4px)' : 'none' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{exp.emoji}</div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'Playfair Display, serif' }}>{exp.titulo}</h2>
              <p style={{ color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: '1.7' }}>{exp.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>⏱ {exp.duracion}</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--accent)' }}>{exp.precio}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '1rem' }}>📍 {exp.lugar}</p>
              {seleccionada?.id === exp.id && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>Incluye:</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {exp.incluye.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.4rem' }}>✓ {item}</li>
                    ))}
                  </ul>
                  {exp.accion === 'reservar' ? (
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScpNtz1_idvqh674ytA-8bbwvtdtLwmtrLdMDoA7r42XIHNqw/viewform" target="_blank" rel="noopener noreferrer" className="btn" style={{ marginTop: '1rem', width: '100%', textAlign: 'center', display: 'block' }}>
  Reservar — {exp.precio}
</a>
                  ) : (
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="btn" style={{ marginTop: '1rem', width: '100%', textAlign: 'center', display: 'block' }}>
                      {exp.id === 4 ? 'Ver sitio web' : 'Ver en Instagram'}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Reservaciones</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '1rem' }}>Reserva tu ritual</h2>
        <p style={{ color: 'var(--gray)', marginBottom: '3rem', lineHeight: '1.8' }}>
          Te interesa el Tour de Cafe o la Cata Sensorial? Llena el formulario y te contactamos para coordinar tu experiencia.
        </p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScpNtz1_idvqh674ytA-8bbwvtdtLwmtrLdMDoA7r42XIHNqw/viewform" target="_blank" rel="noopener noreferrer" className="btn">
          Reserva tu ritual
        </a>
      </section>

      <section style={{ background: '#111', color: '#fff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Quieres saber de nuevas experiencias?</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Suscribete y recibe las primeras novedades</p>
        {suscrito ? (
          <p style={{ color: '#4ade80', fontSize: '1.1rem' }}>Gracias por suscribirte!</p>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '0.75rem 1.5rem', borderRadius: '6px', border: 'none', fontSize: '1rem', minWidth: '280px' }} />
            <button onClick={suscribirse} className="btn" style={{ background: '#fff', color: '#111' }}>Suscribirme</button>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>2025 Surreal Roots Coffee - El Salvador</p>
      </footer>
    </main>
  )
}