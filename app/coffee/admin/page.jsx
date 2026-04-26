'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const PASSWORD = 'surreal2025'

const ESTADOS = ['pendiente', 'confirmado', 'entregado', 'cancelado']

const COLORES = {
  pendiente:  { bg: '#2a1f00', color: '#f59e0b' },
  confirmado: { bg: '#0a2a1f', color: '#10b981' },
  entregado:  { bg: '#0a1a2a', color: '#3b82f6' },
  cancelado:  { bg: '#2a0a0a', color: '#ef4444' },
}

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false)
  const [password, setPassword] = useState('')
  const [ordenes, setOrdenes] = useState([])
  const [cargando, setCargando] = useState(false)
  const [filtro, setFiltro] = useState('todos')
  const [actualizando, setActualizando] = useState(null)

  function login() {
    if (password === PASSWORD) setAutenticado(true)
    else alert('Contraseña incorrecta')
  }

  async function cargarOrdenes() {
    setCargando(true)
    try {
      const res = await fetch('/api/admin-ordenes')
      const data = await res.json()
      setOrdenes(data.ordenes || [])
    } catch (e) {
      console.error(e)
    } finally {
      setCargando(false)
    }
  }

  async function cambiarEstado(id, estado) {
    setActualizando(id)
    try {
      await fetch('/api/admin-ordenes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado }),
      })
      setOrdenes(prev => prev.map(o => o.id === id ? { ...o, estado } : o))
    } catch (e) {
      console.error(e)
    } finally {
      setActualizando(null)
    }
  }

  useEffect(() => {
    if (autenticado) cargarOrdenes()
  }, [autenticado])

  const ordenesFiltradas = filtro === 'todos'
    ? ordenes
    : ordenes.filter(o => o.estado === filtro)

  if (!autenticado) return (
    <main>
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul><li><Link href="/coffee">← Volver</Link></li></ul>
      </nav>
      <section className="section" style={{ maxWidth: '360px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem' }}>Admin</h2>
        <div style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>
              Contraseña
            </p>
          </div>
          <div style={{ padding: '1rem 1.25rem' }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="••••••••"
              style={{
                width: '100%', background: 'var(--grain)', border: '1px solid var(--border)',
                borderRadius: '4px', padding: '0.75rem', color: 'var(--white)',
                fontSize: '0.85rem', fontFamily: 'DM Mono, monospace', boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
        <button className="btn" onClick={login} style={{ width: '100%', marginTop: '1rem' }}>
          Entrar
        </button>
      </section>
    </main>
  )

  return (
    <main>
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee · Admin</span>
        <ul>
          <li><Link href="/coffee">← Volver</Link></li>
          <li>
            <button
              onClick={cargarOrdenes}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              ↻ Actualizar
            </button>
          </li>
        </ul>
      </nav>

      <section className="section" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
          <h2>Órdenes</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{ordenesFiltradas.length} resultado(s)</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['todos', ...ESTADOS].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              style={{
                padding: '0.4rem 0.9rem', borderRadius: '4px', fontSize: '0.75rem',
                textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer',
                border: '1px solid var(--border)',
                background: filtro === f ? 'var(--accent)' : 'transparent',
                color: filtro === f ? '#000' : 'var(--gray)',
                transition: 'all 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {cargando ? (
          <p style={{ color: 'var(--gray)' }}>Cargando órdenes...</p>
        ) : ordenesFiltradas.length === 0 ? (
          <p style={{ color: 'var(--gray)' }}>No hay órdenes.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {ordenesFiltradas.map(orden => (
              <div key={orden.id} style={{ border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)',
                  background: 'var(--grain)'
                }}>
                  <div>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>{orden.nombre}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '2px' }}>{orden.telefono}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1rem', fontFamily: 'DM Mono, monospace', color: 'var(--accent)' }}>${orden.total.toFixed(2)}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--gray)', marginTop: '2px' }}>
                      {new Date(orden.created_at).toLocaleString('es-SV', { dateStyle: 'short', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                  {orden.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--gray)' }}>{item.cantidad}× {item.nombre}</span>
                      <span style={{ fontFamily: 'DM Mono, monospace' }}>${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)',
                  display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: 'var(--gray)'
                }}>
                  <span>{orden.tipo_entrega === 'delivery' ? '🚚 Delivery' : '🏠 Pickup'}</span>
                  <span>{orden.metodo_pago === 'wompi' ? '💳 Tarjeta' : '💵 Efectivo'}</span>
                  {orden.direccion && <span>📍 {orden.direccion}</span>}
                </div>

                <div style={{
                  padding: '0.9rem 1.25rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem'
                }}>
                  <span style={{
                    fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                    padding: '0.3rem 0.75rem', borderRadius: '4px',
                    background: COLORES[orden.estado]?.bg,
                    color: COLORES[orden.estado]?.color,
                  }}>
                    {orden.estado}
                  </span>
                  <select
                    value={orden.estado}
                    disabled={actualizando === orden.id}
                    onChange={e => cambiarEstado(orden.id, e.target.value)}
                    style={{
                      background: 'var(--grain)', border: '1px solid var(--border)',
                      borderRadius: '4px', padding: '0.4rem 0.75rem',
                      color: 'var(--white)', fontSize: '0.75rem',
                      fontFamily: 'DM Mono, monospace', cursor: 'pointer'
                    }}
                  >
                    {ESTADOS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>2025 Surreal Roots Coffee - El Salvador</p>
      </footer>
    </main>
  )
}