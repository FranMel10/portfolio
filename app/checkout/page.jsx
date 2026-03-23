'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const [carrito, setCarrito] = useState([])
  const [metodoPago, setMetodoPago] = useState('cash')
  const [tipoEntrega, setTipoEntrega] = useState('pickup')
  const [direccion, setDireccion] = useState('')
  const [procesando, setProcesando] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('carrito')
    if (data) setCarrito(JSON.parse(data))
  }, [])

  const subtotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const costoDelivery = tipoEntrega === 'delivery' ? 3.00 : 0
  const total = subtotal + costoDelivery

  async function handlePagar() {
    if (tipoEntrega === 'delivery' && !direccion.trim()) {
      alert('Por favor ingresa tu dirección de entrega')
      return
    }

    if (metodoPago === 'wompi') {
      setProcesando(true)
      try {
        const referencia = `surreal-${Date.now()}`
        const response = await fetch('/api/crear-pago', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ total, referencia }),
        })
        const data = await response.json()
        if (data.urlEnlacePago) {
          window.location.assign(data.urlEnlacePago)
        } else {
          alert('Error al crear enlace de pago')
        }
      } catch (e) {
        alert('Error de conexión')
      } finally {
        setProcesando(false)
      }
    } else {
      const lineas = carrito.map(item => `• ${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toFixed(2)}`)
      const infoEntrega = tipoEntrega === 'delivery' ? `\n📍 Dirección: ${direccion}\n🚚 Delivery: $3.00` : '\n🏠 Pickup en tienda'
      const mensaje = `🛒 *Nuevo pedido Surreal Roots Coffee*\n\n${lineas.join('\n')}${infoEntrega}\n\n*Total: $${total.toFixed(2)}*\n\nMétodo de pago: Efectivo`

      localStorage.removeItem('carrito')

      const url = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
      window.open(url, '_blank')

      router.push('/coffee/confirmacion?estado=cash')
    }
  }

  return (
    <main>
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul>
          <li><Link href="/coffee">← Volver al menú</Link></li>
        </ul>
      </nav>

      <section className="section" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem' }}>Tu pedido</h2>

        {carrito.length === 0 ? (
          <p style={{ color: 'var(--gray)' }}>Tu carrito está vacío.</p>
        ) : (
          <>
            {/* Productos */}
            <div style={{ border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
              {carrito.map((item, i) => (
                <div key={item.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.9rem 1.25rem',
                  borderBottom: i < carrito.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>{item.cantidad}×</span>
                    <span style={{ fontSize: '0.85rem' }}>{item.nombre}</span>
                  </div>
                  <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontFamily: 'DM Mono, monospace' }}>
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Tipo de entrega */}
            <div style={{ border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
              <div style={{ padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>
                  Tipo de entrega
                </p>
              </div>
              {[
                { id: 'pickup', label: 'Recoger en tienda', sub: 'Sin costo adicional' },
                { id: 'delivery', label: 'Delivery', sub: 'Envío a domicilio · $3.00' },
              ].map((opcion, i, arr) => (
                <div
                  key={opcion.id}
                  onClick={() => setTipoEntrega(opcion.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    background: tipoEntrega === opcion.id ? 'var(--grain)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                    border: `1px solid ${tipoEntrega === opcion.id ? 'var(--accent)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s',
                  }}>
                    {tipoEntrega === opcion.id && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', marginBottom: '0.15rem' }}>{opcion.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>{opcion.sub}</p>
                  </div>
                </div>
              ))}

              {/* Campo dirección */}
              {tipoEntrega === 'delivery' && (
                <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '0.75rem' }}>
                    Dirección de entrega
                  </p>
                  <textarea
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Colonia, calle, casa/apartamento, referencias..."
                    rows={3}
                    style={{
                      width: '100%', background: 'var(--grain)', border: '1px solid var(--border)',
                      borderRadius: '4px', padding: '0.75rem', color: 'var(--white)',
                      fontSize: '0.85rem', fontFamily: 'DM Mono, monospace', resize: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Total */}
            <div style={{ border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>Subtotal</span>
                <span style={{ fontSize: '0.85rem', fontFamily: 'DM Mono, monospace' }}>${subtotal.toFixed(2)}</span>
              </div>
              {tipoEntrega === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>Delivery</span>
                  <span style={{ fontSize: '0.85rem', fontFamily: 'DM Mono, monospace' }}>$3.00</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.9rem 1.25rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: '1.4rem', fontFamily: 'DM Mono, monospace', color: 'var(--white)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Método de pago */}
            <div style={{ border: '1px solid var(--border)', borderRadius: '4px', marginBottom: '2rem', overflow: 'hidden' }}>
              <div style={{ padding: '0.9rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>
                  Método de pago
                </p>
              </div>
              {[
                { id: 'cash', label: 'Efectivo', sub: 'Pago en mano' },
                { id: 'wompi', label: 'Tarjeta', sub: 'Wompi · débito o crédito' },
              ].map((metodo, i, arr) => (
                <div
                  key={metodo.id}
                  onClick={() => setMetodoPago(metodo.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    background: metodoPago === metodo.id ? 'var(--grain)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                    border: `1px solid ${metodoPago === metodo.id ? 'var(--accent)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s',
                  }}>
                    {metodoPago === metodo.id && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.85rem', marginBottom: '0.15rem' }}>{metodo.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>{metodo.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón */}
            <button
  className="btn"
  onClick={handlePagar}
  disabled={procesando}
  style={{ width: '100%', opacity: procesando ? 0.6 : 1, transition: 'opacity 0.2s' }}
>
  {procesando
    ? metodoPago === 'wompi'
      ? 'Conectando con Wompi...'
      : 'Procesando...'
    : metodoPago === 'cash'
    ? `Confirmar pedido · $${total.toFixed(2)}`
    : `Pagar con tarjeta · $${total.toFixed(2)}`}
</button>
          </>
        )}
      </section>

      <footer className="footer">
        <p>2025 Surreal Roots Coffee - El Salvador</p>
      </footer>
    </main>
  )
}