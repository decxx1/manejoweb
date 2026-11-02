import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access'
import { legacyIdField } from '../fields'
import { deployHook } from '../hooks/deploy'

export const Planes: CollectionConfig = {
  slug: 'planes',
  labels: { singular: 'Plan', plural: 'Planes' },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'tipo', 'precio', 'orden'],
  },
  defaultSort: 'orden',
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterChange: [deployHook('web')],
    afterDelete: [deployHook('web')],
  },
  fields: [
    legacyIdField,
    {
      name: 'titulo',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitulo',
      label: 'Subtítulo',
      type: 'text',
    },
    {
      name: 'precio',
      type: 'text',
      required: true,
      admin: { description: 'Texto libre, por ejemplo $20.000 o Consultar.' },
    },
    {
      name: 'precioEfectivo',
      label: 'Precio en efectivo',
      type: 'text',
    },
    {
      name: 'pago',
      label: 'Forma de pago del plan',
      type: 'text',
      admin: { description: 'Por ejemplo: Pago único o Mensual.' },
    },
    {
      name: 'tipo',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Páginas web', value: 'paginas-web' },
        { label: 'Redes sociales', value: 'redes' },
        { label: 'Diseño de marca', value: 'marca' },
      ],
    },
    {
      name: 'detalles',
      type: 'array',
      fields: [
        {
          name: 'texto',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'orden',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
