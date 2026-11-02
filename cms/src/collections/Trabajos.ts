import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access'

export const Trabajos: CollectionConfig = {
  slug: 'trabajos',
  labels: { singular: 'Trabajo', plural: 'Trabajos' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'categoria', 'miembro'],
    description: 'Piezas del portfolio de cada miembro. Las consume mi.manejoweb.com.ar.',
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'miembro',
      type: 'relationship',
      relationTo: 'equipo',
      required: true,
      index: true,
    },
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea',
    },
    {
      name: 'categoria',
      label: 'Categoría',
      type: 'text',
      index: true,
    },
    {
      name: 'imagen',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
