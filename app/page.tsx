'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const estado = searchParams.get('estado')

  return (
    <section className="hero">
      {estado === 'exitoso' ? (
        <>
          <h1>¡Pago exitoso! 🎉</h1>
          <p>Tu pedido ha sido confirmado. Nos pondremos en contacto contigo pronto.</p>
          <Link href="/coffee" className="btn" style={{marginTop: '1rem'}}>Seguir comprando</Link>
        </>
      ) : estado === 'fallido' ? (
        <>
          <h1>Pago fallido 😞</h1>
          <p>Hubo un problema con tu pago. Por favor intenta de nuevo.</p>
          <Link href="/coffee" className="btn" style={{marginTop: '1rem'}}>Volver al carrito</Link>
        </>
      ) : (
        <>
          <h1>Procesando pago... ⏳</h1>
          <p>Espera un momento mientras confirmamos tu transacción.</p>
        </>
      )}
    </section>
  )
}

export default function Confirmacion() {
  return (
    <main>
      <nav className="navbar">
        <span className="logo">Surreal Roots Coffee</span>
        <ul>
          <li><Link href="/coffee">← Volver al café</Link></li>
        </ul>
      </nav>
      <Suspense fallback={<section className="hero"><h1>Cargando...</h1></section>}>
        <ConfirmacionContent />
      </Suspense>
      <footer className="footer">
        <p>© 2025 Surreal Roots Coffee — El Salvador</p>
      </footer>
    </main>
  )
}