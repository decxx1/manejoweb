import type { CollectionConfig } from 'payload'

import { isAuthenticated, readPublicado } from '../access'

export const Paginas: CollectionConfig = {
  slug: 'paginas',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'slug', 'publicado'],
    description:
      'Contenido editable de las páginas de marketing. El sitio Astro todavía no renderiza esta colección.',
  },
  access: {
    read: readPublicado,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Ejemplos: inicio, paginas-web, publicidad, creacion-de-marca.',
      },
    },
    {
      name: 'resumen',
      type: 'textarea',
    },
    {
      name: 'contenido',
      type: 'richText',
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'metaTitulo',
      label: 'Meta título',
      type: 'text',
    },
    {
      name: 'metaDescripcion',
      label: 'Meta descripción',
      type: 'textarea',
    },
    {
      name: 'publicado',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
