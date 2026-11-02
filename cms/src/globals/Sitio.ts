import type { GlobalConfig } from 'payload'

import { isAuthenticated } from '../access'

export const Sitio: GlobalConfig = {
  slug: 'sitio',
  label: 'Sitio',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'nombreEmpresa',
      label: 'Nombre',
      type: 'text',
      defaultValue: 'Manejo Web',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'equipoVisible',
      label: 'Mostrar la página de equipo',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Reemplaza el interruptor de equipo_pagina del admin PHP.',
      },
    },
  ],
}
