export async function POST(request) {
  try {
    const { total, referencia } = await request.json()

    const response = await fetch('https://api.wompi.sv/EnlacePago', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WOMPI_API_SECRET}`
      },
      body: JSON.stringify({
        identificadorEnlaceComercio: referencia,
        monto: total,
        nombreProducto: 'Surreal Roots Coffee',
        urlRedirect: `${process.env.NEXT_PUBLIC_URL}/coffee/confirmacion`
      })
    })

    const text = await response.text()
    console.log('Wompi status:', response.status)
    console.log('Wompi response:', text)

    return Response.json({ status: response.status, body: text })

  } catch (error) {
    console.error('Route error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}