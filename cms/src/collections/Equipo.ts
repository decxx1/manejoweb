import type { CollectionConfig } from 'payload'

import { isAuthenticated, readActivo } from '../access'

export const Equipo: CollectionConfig = {
  slug: 'equipo',
  labels: { singular: 'Miembro', plural: 'Equipo' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'titulo', 'activo'],
  },
  access: {
    read: readActivo,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'activo',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Si está apagado, el sitio público no lo lista.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'titulo',
      label: 'Cargo',
      type: 'text',
    },
    {
      name: 'presentacion',
      label: 'Presentación',
      type: 'textarea',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
    },
    {
      name: 'nacimiento',
      type: 'text',
      admin: { description: 'Texto libre, igual que en el admin anterior.' },
    },
    {
      name: 'whatsapp',
      type: 'text',
      admin: { description: 'Número sin el 54. El sitio arma el enlace wa.me.' },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'color',
      type: 'text',
      admin: { description: 'Hexadecimal, por ejemplo #06dbfe.' },
    },
    {
      name: 'conocimientos',
      type: 'array',
      fields: [
        { name: 'nombre', type: 'text', required: true },
        { name: 'porcentaje', type: 'number', min: 0, max: 100, required: true },
      ],
    },
    {
      name: 'educacion',
      label: 'Educación',
      type: 'array',
      fields: [
        { name: 'titulo', type: 'text', required: true },
        { name: 'lugar', type: 'text' },
        { name: 'anio', label: 'Año', type: 'text' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ],
    },
    {
      name: 'experiencia',
      type: 'array',
      fields: [
        { name: 'trabajo', type: 'text', required: true },
        { name: 'lugar', label: 'Lugar o tarea', type: 'text' },
        { name: 'anio', label: 'Año', type: 'text' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ],
    },
  ],
}
