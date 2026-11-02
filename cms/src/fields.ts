import type { Field } from 'payload'

export const legacyIdField: Field = {
  name: 'legacyId',
  label: 'Id PHP',
  type: 'number',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    readOnly: true,
    description: 'Id de la fila en el admin PHP. Lo usa el importador.',
  },
}
