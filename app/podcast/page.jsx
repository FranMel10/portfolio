'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Podcast() {
  return (
    <main>
      <nav className="navbar">
        <span className="logo">Surreal Podcast</span>
        <ul>
          <li><Link href="/">Portafolio</Link></li>
          <li><Link href="/coffee">Surreal Roots Coffee</Link></li>
        </ul>
      </nav>

      <section style={{ background: '#000', color: '#fff', padding: '5rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <Image
          src="/surreal-logo.png"
          alt="Surreal Podcast"
          width={500}
          height={150}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <p style={{ color: '#aaa', maxWidth: '600px', lineHeight: '1.8', fontSize: '1.1rem' }}>
          Conversaciones esporádicas con personas que están creando algo significativo dentro del arte en El Salvador.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://www.youtube.com/@surrealpodcastoficial/podcasts" target="_blank" rel="noopener noreferrer" className="btn">
            YouTube
          </a>
          <a href="https://open.spotify.com/show/1AGum72X9d293c0wIbuCFK" target="_blank" rel="noopener noreferrer" className="btn">
            Spotify
          </a>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>De donde nace Surreal?</h2>
        <p style={{ color: '#555', lineHeight: '1.9', fontSize: '1rem', textAlign: 'center' }}>
          Surreal nace de la curiosidad de un ingeniero biomedico especializado en sistemas que disfruta de una buena pieza artistica local y una taza de cafe. Es un espacio para conocer a las personas detras del arte salvadoreno, sus historias, sus procesos y lo que los mueve a crear. Sin agenda fija, sin formato rigido. Solo una conversacion honesta entre personas que hacen cosas.
        </p>
      </section>

      <footer className="footer" style={{ background: '#000', color: '#fff', borderTop: '1px solid #222' }}>
        <p>2026 Surreal Podcast - El Salvador</p>
      </footer>
    </main>
  )
}