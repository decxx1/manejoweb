import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = path.join(root, 'import-data')
const sinHooks = { skipDeployHooks: true }

type MediaItem = { file: string; alt: string }
type Content = {
  users: { legacyId: number; usuario: string; nombre: string; email: string; rol: 'admin' | 'editor' }[]
  planes: {
    legacyId: number
    titulo: string
    subtitulo: string
    precio: string
    precioEfectivo: string
    pago: string
    tipo: 'paginas-web' | 'redes' | 'marca'
    orden: number
    detalles: string[]
  }[]
  equipo: {
    legacyId: number
    activo: boolean
    slug: string
    nombre: string
    titulo: string
    presentacion: string
    foto: string | null
    direccion: string
    nacimiento: string
    whatsapp: string
    email: string
    color: string
    conocimientos: { nombre: string; porcentaje: number }[]
    educacion: { titulo?: string; lugar?: string; anio?: string; descripcion?: string }[]
    experiencia: { trabajo?: string; lugar?: string; anio?: string; descripcion?: string }[]
  }[]
  servicios: {
    legacyId: number
    equipoLegacyId: number
    icono: string
    titulo: string
    descripcion: string
  }[]
  trabajos: {
    legacyId: number
    equipoLegacyId: number
    titulo: string
    descripcion: string
    categoria: string
    imagen: string | null
  }[]
  sitio: {
    nombreEmpresa: string
    logo: string | null
    direccion: string
    telefono: string
    email: string
    equipoVisible: boolean
  }
  media: MediaItem[]
}

const content = JSON.parse(await readFile(path.join(dataDir, 'content.json'), 'utf8')) as Content
const password = process.env.CMS_IMPORT_PASSWORD
if (!password) throw new Error('Falta CMS_IMPORT_PASSWORD en el entorno')

const payload = await getPayload({ config })
const mediaIds = new Map<string, number>()

function asNumber(id: number | string): number {
  return typeof id === 'number' ? id : Number(id)
}

async function mediaId(file: string | null, alt: string): Promise<number | undefined> {
  if (!file) return undefined
  const cached = mediaIds.get(file)
  if (cached) return cached
  const filename = path.basename(file)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    const id = asNumber(existing.docs[0].id)
    mediaIds.set(file, id)
    return id
  }
  const created = await payload.create({
    collection: 'media',
    overrideAccess: true,
    context: sinHooks,
    data: { alt },
    filePath: path.join(dataDir, file),
  })
  const id = asNumber(created.id)
  mediaIds.set(file, id)
  return id
}

for (const item of content.media) {
  await mediaId(item.file, item.alt)
}

for (const user of content.users) {
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: user.email } },
    limit: 1,
    overrideAccess: true,
  })
  const data = {
    nombre: user.nombre,
    usuario: user.usuario,
    legacyId: user.legacyId,
    roles: [user.rol],
  }
  if (existing.docs[0]) {
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      overrideAccess: true,
      context: sinHooks,
      data,
    })
  } else {
    await payload.create({
      collection: 'users',
      overrideAccess: true,
      context: sinHooks,
      data: { ...data, email: user.email, password },
    })
  }
}

const equipoIds = new Map<number, number>()
for (const member of content.equipo) {
  const data = {
    legacyId: member.legacyId,
    activo: member.activo,
    slug: member.slug,
    nombre: member.nombre,
    titulo: member.titulo,
    presentacion: member.presentacion,
    foto: (await mediaId(member.foto, member.nombre)) ?? null,
    direccion: member.direccion,
    nacimiento: member.nacimiento,
    whatsapp: member.whatsapp,
    email: member.email,
    color: member.color,
    conocimientos: member.conocimientos,
    educacion: member.educacion,
    experiencia: member.experiencia,
  }
  const existing = await payload.find({
    collection: 'equipo',
    where: { legacyId: { equals: member.legacyId } },
    limit: 1,
    overrideAccess: true,
  })
  const doc = existing.docs[0]
    ? await payload.update({
        collection: 'equipo',
        id: existing.docs[0].id,
        overrideAccess: true,
        context: sinHooks,
        data: data as never,
      })
    : await payload.create({
        collection: 'equipo',
        overrideAccess: true,
        context: sinHooks,
        data: data as never,
      })
  equipoIds.set(member.legacyId, asNumber(doc.id))
}

async function upsert(
  collection: 'planes' | 'servicios' | 'trabajos',
  legacyId: number,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { legacyId: { equals: legacyId } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      overrideAccess: true,
      context: sinHooks,
      data: data as never,
    })
  } else {
    await payload.create({
      collection,
      overrideAccess: true,
      context: sinHooks,
      data: data as never,
    })
  }
}

for (const plan of content.planes) {
  await upsert('planes', plan.legacyId, {
    legacyId: plan.legacyId,
    titulo: plan.titulo,
    subtitulo: plan.subtitulo,
    precio: plan.precio,
    precioEfectivo: plan.precioEfectivo,
    pago: plan.pago,
    tipo: plan.tipo,
    orden: plan.orden,
    detalles: plan.detalles.map((texto) => ({ texto })),
  })
}

for (const servicio of content.servicios) {
  const miembro = equipoIds.get(servicio.equipoLegacyId)
  if (!miembro) throw new Error(`Servicio ${servicio.legacyId} sin miembro ${servicio.equipoLegacyId}`)
  await upsert('servicios', servicio.legacyId, {
    legacyId: servicio.legacyId,
    miembro,
    icono: servicio.icono,
    titulo: servicio.titulo,
    descripcion: servicio.descripcion,
  })
}

for (const trabajo of content.trabajos) {
  const miembro = equipoIds.get(trabajo.equipoLegacyId)
  if (!miembro) throw new Error(`Trabajo ${trabajo.legacyId} sin miembro ${trabajo.equipoLegacyId}`)
  const imagen = await mediaId(trabajo.imagen, trabajo.titulo)
  if (!imagen) throw new Error(`Trabajo ${trabajo.legacyId} sin imagen`)
  await upsert('trabajos', trabajo.legacyId, {
    legacyId: trabajo.legacyId,
    miembro,
    titulo: trabajo.titulo,
    descripcion: trabajo.descripcion,
    categoria: trabajo.categoria,
    imagen,
  })
}

await payload.updateGlobal({
  slug: 'sitio',
  overrideAccess: true,
  context: sinHooks,
  data: {
    nombreEmpresa: content.sitio.nombreEmpresa,
    logo: (await mediaId(content.sitio.logo, content.sitio.nombreEmpresa)) ?? null,
    direccion: content.sitio.direccion,
    telefono: content.sitio.telefono,
    email: content.sitio.email,
    equipoVisible: content.sitio.equipoVisible,
  },
})

const [users, equipo, servicios, trabajos, planes] = await Promise.all([
  payload.count({ collection: 'users', overrideAccess: true }),
  payload.count({ collection: 'equipo', overrideAccess: true }),
  payload.count({ collection: 'servicios', overrideAccess: true }),
  payload.count({ collection: 'trabajos', overrideAccess: true }),
  payload.count({ collection: 'planes', overrideAccess: true }),
])

console.log(
  `Import listo: ${users.totalDocs} usuarios, ${equipo.totalDocs} equipo, ${servicios.totalDocs} servicios, ${trabajos.totalDocs} trabajos, ${planes.totalDocs} planes.`,
)
process.exit(0)
