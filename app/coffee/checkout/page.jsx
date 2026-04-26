async function handlePagar() {
  if (!validar()) return

  const ordenData = {
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    direccion: direccion.trim(),
    tipo_entrega: tipoEntrega,
    metodo_pago: metodoPago,
    items: carrito,
    subtotal,
    costo_delivery: costoDelivery,
    total,
  }

  // Siempre guardar en Supabase y mandar WhatsApp
  const lineas = carrito.map(item => `• ${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toFixed(2)}`)
  const infoEntrega = tipoEntrega === 'delivery'
    ? `\n📍 Dirección: ${direccion}\n🚚 Delivery: $3.00`
    : '\n🏠 Pickup en tienda'
  const metodoPagoTexto = metodoPago === 'wompi' ? 'Tarjeta (Wompi)' : 'Efectivo'
  const mensaje = `🛒 *Nuevo pedido Surreal Roots Coffee*\n\n👤 ${nombre}\n📞 ${telefono}\n\n${lineas.join('\n')}${infoEntrega}\n\n*Total: $${total.toFixed(2)}*\n\nMétodo de pago: ${metodoPagoTexto}`

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`

  if (metodoPago === 'wompi') {
    setProcesando(true)
    try {
      const referencia = `surreal-${Date.now()}`
      const response = await fetch('/api/crear-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ordenData, referencia }),
      })
      const data = await response.json()
      if (data.urlEnlacePago) {
        localStorage.removeItem('carrito')
        window.open(whatsappUrl, '_blank')
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
    setProcesando(true)
    try {
      await fetch('/api/crear-orden', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ordenData),
      })
    } catch (e) {
      console.error('Error guardando orden:', e)
    }

    localStorage.removeItem('carrito')
    window.open(whatsappUrl, '_blank')
    router.push('/coffee/confirmacion?estado=cash')
  }
}