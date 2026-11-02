import path from 'path'
import type { CollectionConfig } from 'payload'

import { isAuthenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo', plural: 'Archivos' },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    adminThumbnail: 'mini',
    imageSizes: [
      {
        name: 'mini',
        width: 160,
        height: 160,
        position: 'centre',
      },
      {
        name: 'card',
        width: 1200,
        height: undefined,
      },
    ],
  },
}
