import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET — traer todas las órdenes
export async function GET() {
  const { data, error } = await supabase
    .from('ordenes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 })
  return Response.json({ ok: true, ordenes: data })
}

// PATCH — cambiar estado de una orden
export async function PATCH(request) {
  const { id, estado } = await request.json()

  const { error } = await supabase
    .from('ordenes')
    .update({ estado })
    .eq('id', id)

  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}