import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { nombre, telefono, direccion, tipo_entrega, metodo_pago, items, subtotal, costo_delivery, total } = body

    // 1 — Guardar en Supabase
    const { data, error } = await supabase
      .from('ordenes')
      .insert([{
        nombre,
        telefono,
        direccion: direccion || null,
        tipo_entrega,
        metodo_pago,
        items,
        subtotal,
        costo_delivery,
        total,
        estado: 'pendiente',
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json({ ok: false, error: error.message }, { status: 500 })
    }

    // 2 — Mandar email de notificación
    const lineas = items.map(item =>
      `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a">${item.cantidad}× ${item.nombre}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right">$${(item.precio * item.cantidad).toFixed(2)}</td>
      </tr>`
    ).join('')

    await resend.emails.send({
      from: 'Surreal Roots Coffee <onboarding@resend.dev>',
      to: 'franciscoarmandomelendez@gmail.com', // ← cambia a tu email
      subject: `🛒 Nueva orden · ${nombre} · $${total.toFixed(2)}`,
      html: `
        <div style="font-family:monospace;background:#0f0f0f;color:#e5e5e5;padding:32px;max-width:480px">
          <h2 style="color:#c8a96e;margin-bottom:4px">Surreal Roots Coffee</h2>
          <p style="color:#666;font-size:12px;margin-bottom:24px">Nueva orden recibida</p>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <thead>
              <tr>
                <th style="text-align:left;padding:8px 12px;border-bottom:1px solid #333;color:#666;font-size:11px;text-transform:uppercase">Producto</th>
                <th style="text-align:right;padding:8px 12px;border-bottom:1px solid #333;color:#666;font-size:11px;text-transform:uppercase">Precio</th>
              </tr>
            </thead>
            <tbody>${lineas}</tbody>
          </table>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:6px 12px;color:#666;font-size:13px">Subtotal</td>
              <td style="padding:6px 12px;text-align:right;font-size:13px">$${subtotal.toFixed(2)}</td>
            </tr>
            ${costo_delivery > 0 ? `
            <tr>
              <td style="padding:6px 12px;color:#666;font-size:13px">Delivery</td>
              <td style="padding:6px 12px;text-align:right;font-size:13px">$${costo_delivery.toFixed(2)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding:8px 12px;font-weight:bold">Total</td>
              <td style="padding:8px 12px;text-align:right;font-weight:bold;color:#c8a96e;font-size:18px">$${total.toFixed(2)}</td>
            </tr>
          </table>

          <div style="background:#1a1a1a;border-radius:4px;padding:16px;margin-bottom:16px">
            <p style="color:#666;font-size:11px;text-transform:uppercase;margin-bottom:8px">Cliente</p>
            <p style="margin:4px 0">👤 ${nombre}</p>
            <p style="margin:4px 0">📞 ${telefono}</p>
            ${direccion ? `<p style="margin:4px 0">📍 ${direccion}</p>` : ''}
          </div>

          <div style="background:#1a1a1a;border-radius:4px;padding:16px">
            <p style="color:#666;font-size:11px;text-transform:uppercase;margin-bottom:8px">Entrega</p>
            <p style="margin:4px 0">${tipo_entrega === 'delivery' ? '🚚 Delivery' : '🏠 Pickup en tienda'}</p>
            <p style="margin:4px 0">${metodo_pago === 'wompi' ? '💳 Tarjeta (Wompi)' : '💵 Efectivo'}</p>
          </div>
        </div>
      `,
    })

    return Response.json({ ok: true, orden: data })
  } catch (e) {
    console.error('Error en crear-orden:', e)
    return Response.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}