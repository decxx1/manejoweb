# ManejoWeb CMS

CMS headless que reemplaza el admin PHP (`c:\laragon\www\manejoweb\admin`). El panel y la API quedan en `https://admin.manejoweb.com.ar`. Los sitios Astro leen en el build o en el navegador; escribir exige sesión.

Clientes y presupuestos no se migran: no hay colección, ruta ni seed.

## Versiones

Confirmadas en la documentación y en los `peerDependencies` de Payload 3.92.1 (2 de noviembre de 2026):

| Pieza | Versión |
| --- | --- |
| Payload | 3.92.1 |
| `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical` | 3.92.1 |
| Next.js | 16.4.4 (`@payloadcms/next` acepta `>=16.3.3 <17`) |
| React | 19.2.6 |
| PostgreSQL | 17, externo |
| Node en la imagen | 22.23.4 (LTS; Payload pide `^22.23.4`) |
| TypeScript | 5.7.3 |

Node 24.22.1 o mayor también cumple el motor de Payload. La imagen usa la línea 22.

## Colecciones

| Slug | Origen PHP | Uso |
| --- | --- | --- |
| `users` | `administradores` | Roles `admin` (creador y administrador) y `editor` (moderador) |
| `media` | fotos, logos | Archivos. Miniatura `mini` de 160 px |
| `paginas` | no estaba en MySQL; el texto vive en Astro | Contrato para más adelante. El sitio todavía no la renderiza |
| `planes` | `planes` | Precios. `tipo`: `paginas-web` (pw), `redes` (rs), `marca` (di) |
| `equipo` | `equipo` | Miembros, conocimientos, educación y experiencia |
| `trabajos` | `portfolio` | Piezas por miembro. Las va a consumir `mi.manejoweb.com.ar` |
| `servicios` | `servicios` | Servicios del perfil de un miembro, no las páginas de marketing |
| `sitio` (global) | `ajustes` + `equipo_pagina` | Nombre, logo, dirección, teléfono, email, `equipoVisible` |

Lectura pública: `paginas` solo si `publicado`, `equipo` solo si `activo`, el resto del contenido y `media` sin sesión. Altas, cambios y bajas exigen usuario logueado. Usuarios: solo `admin`. El primer ingreso en `/admin` crea el primer usuario.

## API

Base: `https://admin.manejoweb.com.ar`

REST de Payload. GraphQL está desactivado.

Login:

```http
POST /api/users/login
Content-Type: application/json

{"email":"admin@manejoweb.com.ar","password":"..."}
```

La respuesta trae `token`. Las escrituras llevan `Authorization: JWT <token>`.

Ejemplo para Astro, en el build o en el cliente:

```ts
const cms = import.meta.env.PUBLIC_CMS_URL ?? 'https://admin.manejoweb.com.ar'
const url = new URL('/api/planes', cms)
url.searchParams.set('where[tipo][equals]', 'paginas-web')
url.searchParams.set('sort', 'orden')
url.searchParams.set('limit', '100')
url.searchParams.set('depth', '0')

const { docs } = await fetch(url).then((response) => response.json())
const planes = docs.map((plan) => ({
  ...plan,
  detalles: plan.detalles?.map((item) => item.texto) ?? [],
}))
```

Otros GET públicos:

- `GET /api/planes?where[tipo][equals]=redes&sort=orden&limit=100`
- `GET /api/planes?where[tipo][equals]=marca&sort=orden&limit=100`
- `GET /api/equipo?where[activo][equals]=true&depth=1&limit=100`
- `GET /api/trabajos?where[miembro][equals]=ID&depth=1&limit=100`
- `GET /api/servicios?where[miembro][equals]=ID&limit=100`
- `GET /api/paginas?where[slug][equals]=paginas-web&where[publicado][equals]=true&depth=1`
- `GET /api/globals/sitio`
- Archivos: la URL viene en `foto.url` o `sizes.mini.url` y es absoluta si `NEXT_PUBLIC_SERVER_URL` está definida

Las fotos relativas hay que prefijarlas con la URL del CMS. `detalles` es `[{ texto }]`, no un array de strings.

CORS y CSRF incluyen `admin.manejoweb.com.ar`, `manejoweb.com.ar`, `mi.manejoweb.com.ar` y localhost (`3000` y `4321`). `CORS_ORIGINS` suma orígenes separados por coma. `serverURL` sale de `NEXT_PUBLIC_SERVER_URL`.

## Desarrollo local

Hace falta Postgres 17 ya creado y Node `^22.23.4` o `>=24.22.1`.

```bash
cd cms
cp .env.example .env
npm ci
npm run dev
```

`.env` no se versiona. En desarrollo el adaptador empuja el esquema (`push`). En producción no: aplicá las migraciones de `src/migrations`.

## Coolify

Un solo servicio, el de este directorio. Postgres 17 es otro servicio de Coolify; no está en la imagen.

- Build pack: Dockerfile
- Directorio base: `cms`
- Dominio: `admin.manejoweb.com.ar`
- Puerto interno: el de `PORT` (por defecto 3000). El proceso escucha en `0.0.0.0`
- Healthcheck: `GET /api/health`

Variables:

| Variable | Valor |
| --- | --- |
| `DATABASE_URI` | `postgresql://USUARIO:CLAVE@HOST:5432/BASE` |
| `PAYLOAD_SECRET` | secreto largo, distinto en cada entorno |
| `NEXT_PUBLIC_SERVER_URL` | `https://admin.manejoweb.com.ar` |

La base tiene que existir y estar vacía (`disableCreateDatabase`). Al primer request en producción, Payload corre `src/migrations` (`prodMigrations`). No apuntes el contenedor a una base que hayas modificado con `push` en desarrollo: Payload se queda esperando una confirmación y el proceso no atiende.

Los uploads van a `/app/media`. El disco del contenedor no es persistente: montá un volumen en esa ruta. Sin volumen, las fotos se pierden en cada deploy.

El build de la imagen no se conecta a Postgres. El script corre `next build --experimental-build-mode compile` y después `generate-env`. Con Turbopack ese segundo paso no hace falta, pero queda por el modo de build que documenta Payload.

## Qué quedó afuera

- Tablas y pantallas `clientes` y `presupuestos`
- De `ajustes`: CUIT, número de comprobante, formas de pago y estados (eran del presupuesto)
- El POST `send_mail` del PHP (contacto del portfolio). No se copiaron credenciales SMTP ni de reCAPTCHA
- No había blog en el admin PHP

## Sitio Astro de este repo

`src/lib/cms.js` lee planes y el listado de equipo. Las fichas `equipo/[slug]`, los trabajos, los servicios del perfil y el formulario de contacto siguen en `api.php` hasta la pasada del portfolio (`mi.manejoweb.com.ar` no se tocó).

Hasta cargar planes en el CMS, las grillas de precios quedan vacías. La sección de equipo muestra el estado "actualizando" mientras `sitio.equipoVisible` esté apagado.

`PUBLIC_CMS_URL` pisa la URL por defecto `https://admin.manejoweb.com.ar`.
