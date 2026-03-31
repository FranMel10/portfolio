'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Suscripcion() {
  const [planSeleccionado, setPlanSeleccionado] = useState(null)
  const [enviado, setEnviado] = useState(false)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')

  function handleSuscribirse() {
    if (!planSeleccionado) return
    const plan = planSeleccionado === 'clasico' ? 'Clásico $13.99/mes' : 'Premium $19.99/mes'
    const mensaje = `Hola, quiero suscribirme al plan ${plan}. Mi nombre es ${nombre || '(sin nombre)'} y mi teléfono es ${telefono || '(sin teléfono)'}.`
    const url = `https://wa.me/50372017598?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
    setEnviado(true)
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}>

      {/* NAVBAR mínimo */}
      <nav className="navbar">
        <Link href="/coffee" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none' }}>
          <span className="logo">Surreal Roots Coffee</span>
        </Link>
        <ul>
          <li><Link href="/coffee#menu">Menú</Link></li>
          <li><Link href="/coffee/experiencias">Experiencias</Link></li>
          <li><Link href="/coffee">← Volver</Link></li>
        </ul>
      </nav>

      {/* HERO de suscripción */}
      <section style={{
        padding: '8rem 2rem 4rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)',
        background: 'var(--grain)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoración de fondo */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <p style={{
          fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '1.5rem', fontFamily: 'DM Mono, monospace'
        }}>
          ☕ Suscripción mensual
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2
        }}>
          Café fresco,<br />cada mes en tu puerta
        </h1>
        <p style={{
          color: 'var(--gray)', maxWidth: '480px', margin: '0 auto 2rem',
          fontSize: '0.95rem', lineHeight: 1.7
        }}>
          Suscríbete y recibe café de especialidad salvadoreño a un precio exclusivo para miembros. Sin complicaciones, cancelable cuando quieras.
        </p>
        <div style={{
          display: 'inline-block', background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px',
          padding: '0.6rem 1.2rem',
          fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--accent)', fontFamily: 'DM Mono, monospace'
        }}>
          🗓 Se cobra el 1° de cada mes · Entrega a domicilio
        </div>
      </section>

      {/* PLANES */}
      <section style={{ padding: '5rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif', textAlign: 'center',
          marginBottom: '0.75rem', fontSize: 'clamp(1.4rem, 3vw, 2rem)'
        }}>
          Elige tu plan
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '3rem' }}>
          Ambos planes incluyen envío y empaque premium
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start'
        }}>

          {/* PLAN CLÁSICO */}
          <div
            onClick={() => setPlanSeleccionado('clasico')}
            style={{
              background: planSeleccionado === 'clasico'
                ? 'rgba(201,168,76,0.08)' : 'var(--grain)',
              border: planSeleccionado === 'clasico'
                ? '2px solid var(--accent)' : '1px solid var(--border)',
              borderRadius: '6px',
              padding: '2.5rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            {planSeleccionado === 'clasico' && (
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'var(--accent)', color: '#000',
                fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '0.25rem 0.6rem', borderRadius: '2px', fontWeight: 'bold',
                fontFamily: 'DM Mono, monospace'
              }}>
                ✓ Seleccionado
              </div>
            )}

            <p style={{
              fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gray)', fontFamily: 'DM Mono, monospace', marginBottom: '1rem'
            }}>
              Plan Clásico
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'Playfair Display, serif', fontSize: '2.8rem',
                color: 'var(--white)', lineHeight: 1
              }}>$13.99</span>
              <span style={{ color: 'var(--gray)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>/mes</span>
            </div>

            <p style={{ color: 'var(--gray)', fontSize: '0.82rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Ideal para el día a día. Café de calidad a un precio accesible con presentación premium.
            </p>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gray)', fontFamily: 'DM Mono, monospace', marginBottom: '1rem'
              }}>Incluye</p>
              {[
                { item: '2 lbs de café clásico', detalle: '2 bolsas × $4.50' },
                { item: 'Empaque premium', detalle: 'Bolsa de presentación · $5' },
                { item: 'Entrega a domicilio', detalle: 'Incluida' },
              ].map(({ item, detalle }) => (
                <div key={item} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--white)' }}>· {item}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gray)', fontFamily: 'DM Mono, monospace' }}>{detalle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PLAN PREMIUM */}
          <div
            onClick={() => setPlanSeleccionado('premium')}
            style={{
              background: planSeleccionado === 'premium'
                ? 'rgba(201,168,76,0.08)' : 'var(--grain)',
              border: planSeleccionado === 'premium'
                ? '2px solid var(--accent)' : '2px solid rgba(201,168,76,0.35)',
              borderRadius: '6px',
              padding: '2.5rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            {/* Badge recomendado */}
            <div style={{
              position: 'absolute', top: '-1px', left: '2rem',
              background: 'var(--accent)', color: '#000',
              fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '0.3rem 0.75rem', fontWeight: 'bold',
              fontFamily: 'DM Mono, monospace',
              borderRadius: '0 0 4px 4px'
            }}>
              ★ Recomendado
            </div>

            {planSeleccionado === 'premium' && (
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'var(--accent)', color: '#000',
                fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '0.25rem 0.6rem', borderRadius: '2px', fontWeight: 'bold',
                fontFamily: 'DM Mono, monospace'
              }}>
                ✓ Seleccionado
              </div>
            )}

            <p style={{
              fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--accent)', fontFamily: 'DM Mono, monospace', marginBottom: '1rem',
              marginTop: '0.5rem'
            }}>
              Plan Premium
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'Playfair Display, serif', fontSize: '2.8rem',
                color: 'var(--white)', lineHeight: 1
              }}>$19.99</span>
              <span style={{ color: 'var(--gray)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>/mes</span>
            </div>

            <p style={{ color: 'var(--gray)', fontSize: '0.82rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              La experiencia completa. Café para casa y una bolsa portátil especial para llevar a donde vayas.
            </p>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <p style={{
                fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gray)', fontFamily: 'DM Mono, monospace', marginBottom: '1rem'
              }}>Incluye</p>
              {[
                { item: '2 bolsas de café regular', detalle: 'Para casa' },
                { item: '1 bolsa portátil premium', detalle: 'On-the-go' },
                { item: 'Empaque exclusivo', detalle: 'Presentación especial' },
                { item: 'Entrega a domicilio', detalle: 'Incluida' },
              ].map(({ item, detalle }) => (
                <div key={item} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--white)' }}>· {item}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gray)', fontFamily: 'DM Mono, monospace' }}>{detalle}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FORMULARIO / CTA */}
      <section style={{
        padding: '0 2rem 6rem',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {!enviado ? (
          <div style={{
            background: 'var(--grain)', border: '1px solid var(--border)',
            borderRadius: '6px', padding: '2.5rem 2rem'
          }}>
            <p style={{
              fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gray)', fontFamily: 'DM Mono, monospace', marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              {planSeleccionado
                ? `Plan ${planSeleccionado === 'clasico' ? 'Clásico · $13.99/mes' : 'Premium · $19.99/mes'}`
                : 'Selecciona un plan arriba para continuar'}
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--gray)',
                fontFamily: 'DM Mono, monospace', marginBottom: '0.5rem'
              }}>
                Tu nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="¿Cómo te llamas?"
                style={{
                  width: '100%', background: 'var(--black)', border: '1px solid var(--border)',
                  color: 'var(--white)', padding: '0.75rem 1rem', fontSize: '0.85rem',
                  borderRadius: '3px', fontFamily: 'DM Mono, monospace',
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{
                display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--gray)',
                fontFamily: 'DM Mono, monospace', marginBottom: '0.5rem'
              }}>
                Tu WhatsApp
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                placeholder="+503 0000 0000"
                style={{
                  width: '100%', background: 'var(--black)', border: '1px solid var(--border)',
                  color: 'var(--white)', padding: '0.75rem 1rem', fontSize: '0.85rem',
                  borderRadius: '3px', fontFamily: 'DM Mono, monospace',
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              className="btn"
              onClick={handleSuscribirse}
              disabled={!planSeleccionado}
              style={{
                width: '100%',
                opacity: planSeleccionado ? 1 : 0.4,
                cursor: planSeleccionado ? 'pointer' : 'not-allowed'
              }}
            >
              💬 Suscribirme por WhatsApp
            </button>

            <p style={{
              textAlign: 'center', color: 'var(--gray)', fontSize: '0.7rem',
              marginTop: '1rem', lineHeight: 1.6, fontFamily: 'DM Mono, monospace'
            }}>
              Se te cobrará el 1° de cada mes y recibirás tu café directamente en tu casa
            </p>
          </div>
        ) : (
          <div style={{
            background: 'var(--grain)', border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '6px', padding: '3rem 2rem', textAlign: 'center'
          }}>
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>☕</p>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.75rem' }}>
              ¡Listo, {nombre || 'amigo'}!
            </h3>
            <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7 }}>
              Te contactaremos por WhatsApp para confirmar tu suscripción y coordinar la primera entrega.
            </p>
            <Link href="/coffee" className="btn" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
              ← Volver al café
            </Link>
          </div>
        )}
      </section>

      {/* FOOTER mínimo */}
      <footer className="footer">
        <p>2025 Surreal Roots Coffee · El Salvador</p>
      </footer>

    </main>
  )
}