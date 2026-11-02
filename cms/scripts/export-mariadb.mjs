import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'

import { phpList } from './php-serialize.mjs'

const cmsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(cmsRoot, 'import-data')
const filesDir = path.join(outDir, 'files')
const mediaRoot = process.env.MARIADB_ROOT || 'C:\\laragon\\www\\manejoweb'
const publicOrigin = 'https://manejoweb.com.ar'

const tipos = { pw: 'paginas-web', rs: 'redes', di: 'marca' }
const roles = { creador: 'admin', administrador: 'admin', moderador: 'editor' }

function emailDe(usuario) {
  const local = String(usuario || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._+-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  if (!local) throw new Error('Usuario PHP sin nombre para armar el email')
  return `${local}@manejoweb.local`
}

function relFromStored(value) {
  if (!value) return ''
  const raw = String(value).trim()
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return new URL(raw).pathname.replace(/^\/+/, '')
  }
  return raw.replace(/^\/+/, '').replace(/\\/g, '/')
}

async function materializar(stored, usedNames) {
  const rel = relFromStored(stored)
  if (!rel) return null
  const base = path.basename(rel)
  let name = base
  let n = 2
  while (usedNames.has(name)) {
    const ext = path.extname(base)
    name = `${path.basename(base, ext)}-${n}${ext}`
    n += 1
  }
  usedNames.add(name)
  const dest = path.join(filesDir, name)
  const local = path.join(mediaRoot, ...rel.split('/'))
  try {
    await copyFile(local, dest)
    return { file: `files/${name}`, alt: base, source: rel }
  } catch {
    const remote = `${publicOrigin}/${rel}`
    const response = await fetch(remote)
    if (!response.ok) throw new Error(`No se pudo copiar ni bajar ${rel} (${response.status})`)
    await writeFile(dest, Buffer.from(await response.arrayBuffer()))
    return { file: `files/${name}`, alt: base, source: rel }
  }
}

function zipRows(keys, ...columns) {
  const count = Math.max(0, ...columns.map((column) => column.length))
  const rows = []
  for (let i = 0; i < count; i += 1) {
    const row = {}
    keys.forEach((key, index) => {
      const value = columns[index]?.[i]
      if (value != null && value !== '') row[key] = value
    })
    if (Object.keys(row).length) rows.push(row)
  }
  return rows
}

const conn = await mysql.createConnection({
  host: process.env.MARIADB_HOST || '127.0.0.1',
  port: Number(process.env.MARIADB_PORT || 3306),
  user: process.env.MARIADB_USER || 'root',
  password: process.env.MARIADB_PASSWORD ?? '',
  database: process.env.MARIADB_DATABASE || 'u568255035_manejoweb',
  charset: 'utf8mb4',
})

await mkdir(filesDir, { recursive: true })
const usedNames = new Set()
const media = new Map()

async function archivo(stored) {
  if (!stored) return null
  const key = relFromStored(stored)
  if (media.has(key)) return media.get(key).file
  const item = await materializar(stored, usedNames)
  if (!item) return null
  media.set(key, item)
  return item.file
}

const [admins] = await conn.query(
  'SELECT id, usuario, nombre, rol FROM administradores ORDER BY id',
)
const [planes] = await conn.query('SELECT * FROM planes ORDER BY id')
const [equipo] = await conn.query('SELECT * FROM equipo ORDER BY id')
const [servicios] = await conn.query('SELECT * FROM servicios ORDER BY id')
const [trabajos] = await conn.query('SELECT * FROM portfolio ORDER BY id')
const [ajustes] = await conn.query(
  'SELECT nombre_empresa, logo, direccion1, direccion2, direccion3, telefono_empresa, email_empresa FROM ajustes WHERE id = 1',
)
const [paginaEquipo] = await conn.query('SELECT activo FROM equipo_pagina WHERE id = 1')

const usuarios = admins.map((row) => ({
  legacyId: Number(row.id),
  usuario: String(row.usuario).trim(),
  nombre: String(row.nombre).trim(),
  email: emailDe(row.usuario),
  rol: roles[row.rol] || 'editor',
}))

const planesOut = []
for (const row of planes) {
  const tipo = tipos[row.tipo]
  if (!tipo) throw new Error(`Tipo de plan desconocido: ${row.tipo}`)
  planesOut.push({
    legacyId: Number(row.id),
    titulo: row.titulo,
    subtitulo: row.subtitulo || '',
    precio: row.precio || '',
    precioEfectivo: row.precio_e || '',
    pago: row.pago || '',
    tipo,
    orden: Number(row.id),
    detalles: phpList(row.detalles).map((texto) => String(texto)),
  })
}

const equipoOut = []
for (const row of equipo) {
  const nombres = phpList(row.conocimiento).map(String)
  const porcentajes = phpList(row.conocimiento_p).map((value) => Number(value))
  const educacionT = phpList(row.educacion_t).map(String)
  const educacionI = phpList(row.educacion_i).map(String)
  const educacionA = phpList(row.educacion_a).map(String)
  const educacionD = phpList(row.educacion_d).map(String)
  const experienciaT = phpList(row.experiencia_t).map(String)
  const experienciaS = phpList(row.experiencia_s).map(String)
  const experienciaA = phpList(row.experiencia_a).map(String)
  const experienciaD = phpList(row.experiencia_d).map(String)

  equipoOut.push({
    legacyId: Number(row.id),
    activo: Boolean(row.activo),
    slug: row.slug,
    nombre: row.nombre,
    titulo: row.titulo || '',
    presentacion: row.presentacion || '',
    foto: await archivo(row.imagen),
    direccion: row.direccion || '',
    nacimiento: row.nacimiento || '',
    whatsapp: row.whatsapp || '',
    email: row.mail || '',
    color: row.color || '',
    conocimientos: nombres.map((nombre, index) => ({
      nombre,
      porcentaje: Number.isFinite(porcentajes[index]) ? porcentajes[index] : 0,
    })),
    educacion: zipRows(
      ['titulo', 'lugar', 'anio', 'descripcion'],
      educacionT,
      educacionI,
      educacionA,
      educacionD,
    ).filter((row) => row.titulo),
    experiencia: zipRows(
      ['trabajo', 'lugar', 'anio', 'descripcion'],
      experienciaT,
      experienciaS,
      experienciaA,
      experienciaD,
    ).filter((row) => row.trabajo),
  })
}

const serviciosOut = []
for (const row of servicios) {
  serviciosOut.push({
    legacyId: Number(row.id),
    equipoLegacyId: Number(row.id_equipo),
    icono: row.icono || '',
    titulo: row.titulo,
    descripcion: row.descripcion || '',
  })
}

const trabajosOut = []
for (const row of trabajos) {
  trabajosOut.push({
    legacyId: Number(row.id),
    equipoLegacyId: Number(row.id_equipo),
    titulo: row.titulo,
    descripcion: row.descripcion || '',
    categoria: row.categoria || '',
    imagen: await archivo(row.imagen),
  })
}

const ajuste = ajustes[0] || {}
const direccion = [ajuste.direccion1, ajuste.direccion2, ajuste.direccion3]
  .map((part) => (part || '').trim())
  .filter(Boolean)
  .join(', ')

const sitio = {
  nombreEmpresa: ajuste.nombre_empresa || 'Manejo Web',
  logo: await archivo(ajuste.logo),
  direccion,
  telefono: ajuste.telefono_empresa || '',
  email: ajuste.email_empresa || '',
  equipoVisible: Boolean(paginaEquipo[0]?.activo),
}

const content = {
  exportedAt: new Date().toISOString(),
  users: usuarios,
  planes: planesOut,
  equipo: equipoOut,
  servicios: serviciosOut,
  trabajos: trabajosOut,
  sitio,
  media: [...media.values()],
}

await writeFile(path.join(outDir, 'content.json'), JSON.stringify(content, null, 2), 'utf8')
await conn.end()

console.log(
  `Export listo: ${usuarios.length} usuarios, ${equipoOut.length} equipo, ${serviciosOut.length} servicios, ${trabajosOut.length} trabajos, ${planesOut.length} planes, ${media.size} archivos.`,
)
