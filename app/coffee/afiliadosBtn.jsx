'use client'

import { useRouter } from 'next/navigation'

export default function AfiliadosBtn() {
  const router = useRouter()

  return (
    <>
      <style>{`
        @keyframes floatFree {
          0%   { top: 20%; right: 8%; }
          20%  { top: 60%; right: 15%; }
          40%  { top: 30%; right: 40%; }
          60%  { top: 70%; right: 25%; }
          80%  { top: 15%; right: 60%; }
          100% { top: 20%; right: 8%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }

        .afiliados-btn-wrap {
          position: absolute;
          animation: floatFree 14s ease-in-out infinite;
          z-index: 10;
          top: 20%;
          right: 8%;
        }

        .afiliados-btn-outer {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .afiliados-btn-outer:hover {
          transform: scale(1.12);
        }

        /* Anillo giratorio dentado */
        .afiliados-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px dashed var(--accent);
          animation: spin 8s linear infinite;
          opacity: 0.7;
        }

        /* Círculo interior */
        .afiliados-btn-inner {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: var(--accent);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          box-shadow: 0 0 0 4px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.5);
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .afiliados-btn-outer:hover .afiliados-btn-inner {
          background: #fff;
          box-shadow: 0 0 0 6px rgba(201,168,76,0.4), 0 12px 40px rgba(0,0,0,0.6);
        }

        .afiliados-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #000;
          text-align: center;
          line-height: 1.4;
          font-weight: bold;
          padding: 0 8px;
        }

        .afiliados-star {
          font-size: 1rem;
          color: #000;
          display: block;
        }
      `}</style>

      <div className="afiliados-btn-wrap">
        <div className="afiliados-btn-outer" onClick={() => router.push('/partners')}>
          <div className="afiliados-ring" />
          <div className="afiliados-btn-inner">
            <span className="afiliados-star">✦</span>
            <span className="afiliados-label">Programa<br />Afiliados</span>
          </div>
        </div>
      </div>
    </>
  )
}