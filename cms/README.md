# ManejoWeb CMS

CMS headless que reemplaza el admin PHP (`c:\laragon\www\manejoweb\admin`). El panel y la API quedan en `https://admin.manejoweb.com.ar`. Los sitios Astro leen en el build o en el navegador; escribir exige sesión.

Clientes y presupuestos no se migran: no hay colección, ruta ni datos de esas tablas.

## Versiones

Confirmadas en la documentación y en los `peerDependencies` de Payload 3.92.1 (2 de noviembre de 2026):

| Pieza | Versión |
| --- | --- |
| Payload | 3.92.1 |
| `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical` | 3.92.1 |
| Next.js | 16.4.4 (`@payloadcms/next` acepta `>=16.3.3 <17`) |
| React | 19.2.6 |
| PostgreSQL | 17. En local, Laragon 17.5. En Coolify, un contenedor aparte |
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

Lectura pública: `paginas` solo si `publicado`, `equipo` solo si `activo`, el resto del contenido y `media` sin sesión. Altas, cambios y bajas exigen usuario logueado. Usuarios: solo `admin`. `paginas` no tiene tabla en el PHP, así que el import la deja vacía.

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
const cms = import.meta.env.PUBLIC_CMS_URL ?? 'http://localhost:3000'
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

## Local (PostgreSQL 17.5 de Laragon)

Payload no usa MariaDB. El CMS local habla con el Postgres 17.5 que ya trae Laragon, en `127.0.0.1:5432`, usuario `postgres`. En esta máquina `pg_hba.conf` acepta conexiones locales con `trust`, así que la URI no lleva clave. La base se llama `manejoweb` y hay que crearla vacía:

```powershell
& C:\laragon\bin\postgresql\pgsql-17.5-3\bin\psql.exe -h 127.0.0.1 -U postgres -d postgres -c "CREATE DATABASE manejoweb OWNER postgres;"
```

Hace falta Node `^22.23.4` o `>=24.22.1`.

```powershell
cd c:\xampp\htdocs\astro\manejoweb\cms
copy .env.example .env
npm ci
npm run dev
```

Antes de importar, en `.env` cambiá `PAYLOAD_SECRET` y `CMS_IMPORT_PASSWORD`. El `.env.example` solo trae placeholders. La clave real no se commitea.

El login viejo era usuario y clave. Payload pide email. Cada usuario queda como `usuario@manejoweb.local` (por ejemplo `decxx1@manejoweb.local`) y conserva el nombre. La clave hasheada de PHP no se copia: todos entran con `CMS_IMPORT_PASSWORD` del `.env`. Un import posterior no pisa esa clave si el email ya existe.

## Exportar MariaDB e importar a Postgres

El origen es la base PHP `u568255035_manejoweb` de MariaDB (Laragon, puerto 3306). No se exportan clientes, presupuestos, hashes de claves, CUIT ni datos de comprobantes. Los archivos salen a `cms/import-data/`, que no se versiona.

```powershell
cd c:\xampp\htdocs\astro\manejoweb\cms
npm run export:mariadb
npm run import:payload
```

Para repetir la carga en el Postgres de producción, corré el export en esta máquina y después el import con `DATABASE_URI` apuntando al contenedor de Coolify. El JSON no incluye secretos. La web, en otra terminal:

```powershell
cd c:\xampp\htdocs\astro\manejoweb
copy .env.example .env
npm run dev
```

http://localhost:4321  
`PUBLIC_CMS_URL` apunta al CMS. Si no está definida, `astro dev` usa `http://localhost:3000` y el build de producción usa `https://admin.manejoweb.com.ar`.

## Webhooks de deploy

Al crear, editar o borrar:

| Colección | Variable |
| --- | --- |
| `planes` | `CLOUDFLARE_DEPLOY_HOOK_WEB` |
| `equipo`, `trabajos`, `servicios` | `CLOUDFLARE_DEPLOY_HOOK_PORTFOLIO` |

Si la variable está vacía, el guardado sigue y el log dice que el hook no está configurado. No hace falta una URL real para probar: levantá un servidor local y poné esa URL en el `.env`. El import pasa `skipDeployHooks` y no los llama.

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
| `CLOUDFLARE_DEPLOY_HOOK_WEB` | webhook del sitio, o vacío |
| `CLOUDFLARE_DEPLOY_HOOK_PORTFOLIO` | webhook del portfolio, o vacío |

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

En local la home y páginas web muestran los planes importados. La página de equipo sigue el flag `equipoVisible` que vino de `equipo_pagina`. El build de producción tiene que definir `PUBLIC_CMS_URL=https://admin.manejoweb.com.ar`.
