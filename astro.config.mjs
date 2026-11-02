import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://manejoweb.com.ar',
  build: {
    // Ejemplo: Genera `page.html` en lugar de `page/index.html` durante la compilación.
    format: 'file'
  },
  redirects: {
    "/clientes": "/",
  },
  integrations: [vue()]
});