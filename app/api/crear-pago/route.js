export async function POST(request) {
  try {
    const { total, referencia } = await request.json()

    // Paso 1 — obtener token OAuth
    const tokenResponse = await fetch('https://id.wompi.sv/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_WOMPI_API_ID,
        client_secret: process.env.WOMPI_API_SECRET,
        audience: 'wompi_api',
      }),
    })

    const tokenText = await tokenResponse.text()
    console.log('Token status:', tokenResponse.status)
    console.log('Token response:', tokenText)

    if (!tokenResponse.ok) {
      return Response.json({ error: 'Error obteniendo token', detalle: tokenText }, { status: 500 })
    }

    const { access_token } = JSON.parse(tokenText)

    // Paso 2 — crear enlace de pago
    const pagoResponse = await fetch('https://api.wompi.sv/EnlacePago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        identificadorEnlaceComercio: referencia,
        monto: total,
        nombreProducto: 'Surreal Roots Coffee',
        urlRedirect: `${process.env.NEXT_PUBLIC_URL}/coffee/confirmacion`,
      }),
    })

    const pagoText = await pagoResponse.text()
    console.log('Pago status:', pagoResponse.status)
    console.log('Pago response:', pagoText)

    if (!pagoText) {
      return Response.json({ error: 'Wompi no respondio' }, { status: 500 })
    }

    const data = JSON.parse(pagoText)
      return Response.json({ urlEnlacePago: data.urlEnlace, data })
  } catch (error) {
    console.error('Route error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
