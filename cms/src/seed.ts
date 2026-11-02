import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

const planTitulo = 'Sitio inicial'

export async function seedLocal(payload: Payload): Promise<void> {
  const email = process.env.CMS_ADMIN_EMAIL || 'admin@manejoweb.local'
  const password = process.env.CMS_ADMIN_PASSWORD

  const usuarios = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
  })

  if (usuarios.totalDocs === 0) {
    if (!password) {
      payload.logger.warn('CMS_ADMIN_PASSWORD vacío: no se creó el admin local.')
    } else {
      await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: {
          email,
          password,
          nombre: 'Admin local',
          roles: ['admin'],
        },
      })
      payload.logger.info(`Admin local creado: ${email}`)
    }
  }

  const planes = await payload.find({
    collection: 'planes',
    where: { titulo: { equals: planTitulo } },
    limit: 1,
    overrideAccess: true,
  })

  if (planes.totalDocs > 0) return

  const dir = path.resolve(process.cwd(), 'media')
  await mkdir(dir, { recursive: true })
  const filePath = path.join(dir, 'muestra-seed.png')
  await writeFile(filePath, png)

  const media = await payload.create({
    collection: 'media',
    overrideAccess: true,
    data: { alt: 'Muestra local' },
    filePath,
  })

  const miembro = await payload.create({
    collection: 'equipo',
    overrideAccess: true,
    data: {
      activo: true,
      slug: 'ana-perez',
      nombre: 'Ana Pérez',
      titulo: 'Diseño',
      presentacion: 'Diseña marcas y piezas para los proyectos de ManejoWeb.',
      color: '#7752e8',
      email: 'ana@manejoweb.local',
      foto: media.id,
    },
  })

  await payload.create({
    collection: 'planes',
    overrideAccess: true,
    data: {
      titulo: planTitulo,
      subtitulo: 'Para emprendedores',
      precio: '$150.000',
      pago: 'Pago único',
      tipo: 'paginas-web',
      orden: 1,
      detalles: [{ texto: 'Diseño a medida' }, { texto: 'Dominio y SSL' }],
    },
  })

  await payload.create({
    collection: 'trabajos',
    overrideAccess: true,
    data: {
      miembro: miembro.id,
      titulo: 'Landing de muestra',
      descripcion: 'Pieza de ejemplo para el entorno local.',
      categoria: 'Web',
      imagen: media.id,
    },
  })

  await payload.create({
    collection: 'servicios',
    overrideAccess: true,
    data: {
      miembro: miembro.id,
      icono: 'fas fa-globe',
      titulo: 'Sitios web',
      descripcion: 'Diseño y publicación de páginas.',
    },
  })

  await payload.updateGlobal({
    slug: 'sitio',
    overrideAccess: true,
    data: {
      nombreEmpresa: 'Manejo Web',
      direccion: 'Mendoza, Argentina',
      telefono: '+54 261 245-5960',
      email: 'contacto@manejoweb.com.ar',
      equipoVisible: true,
    },
  })

  payload.logger.info('Seed local listo: plan, equipo, trabajo, servicio y sitio.')
}
