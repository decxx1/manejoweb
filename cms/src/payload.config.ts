import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Equipo } from './collections/Equipo'
import { Media } from './collections/Media'
import { Paginas } from './collections/Paginas'
import { Planes } from './collections/Planes'
import { Servicios } from './collections/Servicios'
import { Trabajos } from './collections/Trabajos'
import { Users } from './collections/Users'
import { Sitio } from './globals/Sitio'
import { migrations } from './migrations'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  'https://admin.manejoweb.com.ar'

const origenesBase = [
  'https://admin.manejoweb.com.ar',
  'https://manejoweb.com.ar',
  'https://mi.manejoweb.com.ar',
  'http://localhost:3000',
  'http://localhost:4321',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4321',
  serverURL,
]

const origenesExtra = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map((origen) => origen.trim())
  .filter(Boolean)

const origenes = [...new Set([...origenesBase, ...origenesExtra])]

const databaseUri = (process.env.DATABASE_URI || process.env.DATABASE_URL || '').trim()

export default buildConfig({
  serverURL,
  cors: origenes,
  csrf: origenes,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— ManejoWeb',
    },
  },
  collections: [Users, Media, Paginas, Planes, Equipo, Trabajos, Servicios],
  globals: [Sitio],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  graphQL: {
    disable: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
    push: process.env.NODE_ENV !== 'production',
    disableCreateDatabase: true,
    migrationDir: path.resolve(dirname, 'migrations'),
    prodMigrations: migrations,
  }),
  sharp,
})
