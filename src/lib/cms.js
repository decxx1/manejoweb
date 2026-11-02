const CMS_URL =
  import.meta.env.PUBLIC_CMS_URL ||
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://admin.manejoweb.com.ar')

export function mediaUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${CMS_URL}${url.startsWith('/') ? url : `/${url}`}`
}

export async function fetchPlanes(tipo) {
  const url = new URL('/api/planes', CMS_URL)
  url.searchParams.set('where[tipo][equals]', tipo)
  url.searchParams.set('sort', 'orden')
  url.searchParams.set('limit', '100')
  url.searchParams.set('depth', '0')

  const response = await fetch(url)
  if (!response.ok) return []
  const data = await response.json()

  return (data.docs ?? []).map((plan) => ({
    id: plan.id,
    titulo: plan.titulo,
    subtitulo: plan.subtitulo,
    precio: plan.precio,
    pago: plan.pago,
    detalles: (plan.detalles ?? []).map((item) => item.texto).filter(Boolean),
  }))
}

export async function fetchEquipoPublico() {
  const sitioUrl = new URL('/api/globals/sitio', CMS_URL)
  const equipoUrl = new URL('/api/equipo', CMS_URL)
  equipoUrl.searchParams.set('where[activo][equals]', 'true')
  equipoUrl.searchParams.set('sort', 'nombre')
  equipoUrl.searchParams.set('limit', '100')
  equipoUrl.searchParams.set('depth', '1')

  const [sitioRes, equipoRes] = await Promise.all([fetch(sitioUrl), fetch(equipoUrl)])
  const sitio = sitioRes.ok ? await sitioRes.json() : {}
  const data = equipoRes.ok ? await equipoRes.json() : { docs: [] }

  const equipo = (data.docs ?? []).map((member) => ({
    id: member.id,
    color: member.color || '#06dbfe',
    mini: mediaUrl(member.foto?.sizes?.mini?.url || member.foto?.url),
    nombre: member.nombre,
    titulo: member.titulo,
    presentacion: member.presentacion,
    whatsapp: member.whatsapp,
    mail: member.email,
    full_url: `https://manejoweb.com.ar/equipo/${member.slug}`,
  }))

  return {
    activo: Boolean(sitio.equipoVisible),
    equipo,
  }
}
