import type { CollectionConfig } from 'payload'

import { adminField, isAdmin, isAdminUser, isAuthenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'nombre', 'roles'],
  },
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  access: {
    admin: ({ req }) => isAdminUser(req.user),
    read: isAuthenticated,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['admin'],
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: adminField,
      },
      admin: {
        description:
          'Admin gestiona usuarios y contenido. Editor solo edita contenido. El primer usuario entra como admin.',
      },
    },
  ],
}
