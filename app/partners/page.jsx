'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { supabase } from '../../lib/supabase'

const beneficios = [
  {
    icono: '◈',
    titulo: 'Comisión por ventas',
    desc: 'Gana un porcentaje por cada libra de café que vendas. Mientras más vendes, más ganas.'
  },
  {
    icono: '◇',
    titulo: 'Precio staff',
    desc: 'Accede a precio preferencial por libra para consumo personal o para vender en tu negocio.'
  },
  {
    icono: '◉',
    titulo: 'Promoción cruzada',
    desc: 'Te mencionamos en nuestras redes. Tu marca crece junto a la nuestra.'
  },
  {
    icono: '◐',
    titulo: 'Marketing conjunto',
    desc: 'Creamos contenido y campañas en colaboración. Más alcance, menos esfuerzo.'
  },
  {
    icono: '○',
    titulo: 'Marca colaborativa',
    desc: 'Construimos algo juntos. Tu identidad suma a la historia de Surreal Roots.'
  },
]

const audiencia = [
  { label: 'Cafés', sub: 'Ofrece café de especialidad a tus clientes' },
  { label: 'Restaurantes', sub: 'Complementa tu menú con origen salvadoreño' },
  { label: 'Creadores', sub: 'Monetiza tu audiencia con algo auténtico' },
  { label: 'Marcas', sub: 'Alianza estratégica con propósito' },
]

export default function Partners() {
  const formRef = useRef(null)

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit() {
  const nombre = document.getElementById('p-nombre')?.value || ''
  const negocio = document.getElementById('p-negocio')?.value || ''
  const instagram = document.getElementById('p-instagram')?.value || ''
  const website = document.getElementById('p-website')?.value || ''
  const ciudad = document.getElementById('p-ciudad')?.value || ''

  if (!nombre || !negocio || !ciudad) {
    alert('Por favor llena nombre, negocio y ciudad.')
    return
  }

  // Guardar en Supabase
  const { error } = await supabase.from('partners').insert([
    { nombre, negocio, instagram, website, ciudad }
  ])

  if (error) {
    console.error(error)
    alert('Hubo un error al guardar. Intenta de nuevo.')
    return
  }

  // Abrir WhatsApp
  const msg = `Hola, quiero ser partner de Surreal Roots Coffee.\nNombre: ${nombre}\nNegocio: ${negocio}\nInstagram: ${instagram}\nWebsite: ${website}\nCiudad: ${ciudad}`
  window.open(`https://wa.me/50372017598?text=${encodeURIComponent(msg)}`, '_blank')
}

  return (
    <main style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pu { animation: fadeUp 0.7s ease both; }
        .pu-1 { animation-delay: 0.05s; }
        .pu-2 { animation-delay: 0.15s; }
        .pu-3 { animation-delay: 0.25s; }
        .pu-4 { animation-delay: 0.35s; }

        .benefit-card {
          background: var(--grain);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 2rem 1.75rem;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .benefit-card:hover {
          border-color: rgba(201,168,76,0.5);
          transform: translateY(-3px);
        }

        .audience-card {
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.5rem;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .audience-card:hover {
          background: rgba(201,168,76,0.05);
          border-color: rgba(201,168,76,0.4);
        }

        .partner-input {
          width: 100%;
          background: var(--black);
          border: 1px solid var(--border);
          color: var(--white);
          padding: 0.8rem 1rem;
          font-size: 0.85rem;
          border-radius: 3px;
          font-family: 'DM Mono', monospace;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        .partner-input:focus {
          border-color: rgba(201,168,76,0.6);
        }
        .partner-input::placeholder { color: var(--gray); opacity: 0.6; }

        .field-label {
          display: block;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gray);
          font-family: 'DM Mono', monospace;
          margin-bottom: 0.5rem;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: var(--accent);
          margin: 0 auto 2rem;
          opacity: 0.6;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <Link href="/coffee" style={{ textDecoration: 'none' }}>
          <span className="logo">Surreal Roots Coffee</span>
        </Link>
        <ul>
          <li><Link href="/coffee#menu">Menú</Link></li>
          <li><Link href="/coffee/suscripcion">Suscripción</Link></li>
          <li><Link href="/coffee">← Volver</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section style={{
        padding: '9rem 2rem 5rem',
        textAlign: 'center',
        background: 'var(--grain)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <p className="pu pu-1" style={{
          fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'var(--accent)', fontFamily: 'DM Mono, monospace', marginBottom: '1.5rem'
        }}>
          ◈ Surreal Roots Partners
        </p>

        <h1 className="pu pu-2" style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: 700, lineHeight: 1.15,
          marginBottom: '1.5rem', maxWidth: '720px', margin: '0 auto 1.5rem'
        }}>
          Programa de Afiliados<br />Surreal Roots
        </h1>

        <p className="pu pu-3" style={{
          color: 'var(--gray)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
          lineHeight: 1.75, maxWidth: '540px', margin: '0 auto 2.5rem'
        }}>
          Únete a nuestra red de partners y genera ingresos vendiendo café de especialidad mientras crecemos juntos.
        </p>

        <div className="pu pu-4">
          <button className="btn" onClick={scrollToForm}>
            Quiero ser partner →
          </button>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ padding: '5rem 2rem', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', fontFamily: 'DM Mono, monospace', marginBottom: '1rem'
        }}>Cómo funciona</p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          marginBottom: '1rem'
        }}>Simple, transparente, rentable</h2>
        <div className="divider" />
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            ['01', 'Aplica al programa completando el formulario de abajo.'],
            ['02', 'Te contactamos para definir los términos y tu precio staff por libra.'],
            ['03', 'Empiezas a vender y ganas una comisión por cada libra vendida.'],
            ['04', 'Crecemos juntos: contenido, promoción y marca colaborativa.'],
          ].map(([num, text]) => (
            <div key={num} style={{
              display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
              padding: '1.25rem 1.5rem',
              background: 'var(--grain)', border: '1px solid var(--border)',
              borderRadius: '4px'
            }}>
              <span style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.65rem',
                color: 'var(--accent)', letterSpacing: '0.1em', flexShrink: 0, marginTop: '2px'
              }}>{num}</span>
              <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section style={{
        padding: '5rem 2rem',
        background: 'var(--grain)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--accent)', fontFamily: 'DM Mono, monospace',
            marginBottom: '1rem', textAlign: 'center'
          }}>Beneficios</p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            textAlign: 'center', marginBottom: '0.75rem'
          }}>Lo que obtienes</h2>
          <div className="divider" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}>
            {beneficios.map((b) => (
              <div key={b.titulo} className="benefit-card">
                <span style={{
                  fontSize: '1.4rem', color: 'var(--accent)',
                  display: 'block', marginBottom: '1rem'
                }}>{b.icono}</span>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.05rem', marginBottom: '0.6rem'
                }}>{b.titulo}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCIA */}
      <section style={{ padding: '5rem 2rem', maxWidth: '860px', margin: '0 auto' }}>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', fontFamily: 'DM Mono, monospace',
          marginBottom: '1rem', textAlign: 'center'
        }}>¿Para quién es?</p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          textAlign: 'center', marginBottom: '0.75rem'
        }}>Hecho para creadores y negocios</h2>
        <div className="divider" />
        <p style={{
          textAlign: 'center', color: 'var(--gray)', fontSize: '0.9rem',
          lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 2.5rem'
        }}>
          Si tienes una marca, un local, una audiencia o simplemente pasión por el café de calidad, este programa es para ti.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          {audiencia.map((a) => (
            <div key={a.label} className="audience-card">
              <p style={{
                fontFamily: 'Playfair Display, serif', fontSize: '1.1rem',
                marginBottom: '0.4rem', color: 'var(--white)'
              }}>{a.label}</p>
              <p style={{ color: 'var(--gray)', fontSize: '0.75rem', lineHeight: 1.5, margin: 0 }}>{a.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULARIO */}
      <section
        ref={formRef}
        style={{
          padding: '5rem 2rem 7rem',
          background: 'var(--grain)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--accent)', fontFamily: 'DM Mono, monospace',
            marginBottom: '1rem', textAlign: 'center'
          }}>Aplicar</p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            textAlign: 'center', marginBottom: '0.5rem'
          }}>Aplica ahora</h2>
          <div className="divider" />

          <div style={{
            background: 'var(--black)', border: '1px solid var(--border)',
            borderRadius: '6px', padding: '2.5rem 2rem',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              <div>
                <label className="field-label" htmlFor="p-nombre">Nombre</label>
                <input className="partner-input" id="p-nombre" type="text" placeholder="Tu nombre completo" />
              </div>
              <div>
                <label className="field-label" htmlFor="p-negocio">Negocio</label>
                <input className="partner-input" id="p-negocio" type="text" placeholder="Nombre de tu proyecto o local" />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              <div>
                <label className="field-label" htmlFor="p-instagram">Instagram</label>
                <input className="partner-input" id="p-instagram" type="text" placeholder="@tuusuario" />
              </div>
              <div>
                <label className="field-label" htmlFor="p-website">Website</label>
                <input className="partner-input" id="p-website" type="text" placeholder="tusitio.com (opcional)" />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label className="field-label" htmlFor="p-ciudad">Ciudad</label>
              <input className="partner-input" id="p-ciudad" type="text" placeholder="¿Desde dónde operas?" />
            </div>

            <button className="btn" onClick={handleSubmit} style={{ width: '100%' }}>
              💬 Aplicar ahora
            </button>

            <p style={{
              textAlign: 'center', color: 'var(--gray)', fontSize: '0.68rem',
              marginTop: '1rem', lineHeight: 1.6, fontFamily: 'DM Mono, monospace'
            }}>
              Te contactaremos por WhatsApp en menos de 48 horas
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>2025 Surreal Roots Coffee · El Salvador</p>
      </footer>

    </main>
  )
}