import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access'
import { legacyIdField } from '../fields'
import { deployHook } from '../hooks/deploy'

export const Servicios: CollectionConfig = {
  slug: 'servicios',
  labels: { singular: 'Servicio', plural: 'Servicios' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'miembro'],
    description: 'Servicios que un miembro muestra en su perfil. No son las páginas de marketing.',
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterChange: [deployHook('portfolio')],
    afterDelete: [deployHook('portfolio')],
  },
  fields: [
    legacyIdField,
    {
      name: 'miembro',
      type: 'relationship',
      relationTo: 'equipo',
      required: true,
      index: true,
    },
    {
      name: 'icono',
      label: 'Ícono',
      type: 'text',
      admin: { description: 'Clase de Font Awesome, por ejemplo fas fa-globe.' },
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
  ],
}
