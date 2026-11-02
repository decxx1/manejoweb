import type { Access, FieldAccess } from 'payload'

type ConRoles = {
  roles?: string[] | null
}

function rolesDe(user: unknown): string[] {
  if (!user || typeof user !== 'object') return []
  const roles = (user as ConRoles).roles
  return Array.isArray(roles) ? roles : []
}

export const isAdminUser = (user: unknown): boolean => rolesDe(user).includes('admin')

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => isAdminUser(req.user)

export const adminField: FieldAccess = ({ req }) => rolesDe(req.user).includes('admin')

/** Lectura anónima solo de documentos publicados. El admin ve todos. */
export const readPublicado: Access = ({ req }) => {
  if (req.user) return true
  return { publicado: { equals: true } }
}

/** El sitio público solo lista miembros activos. */
export const readActivo: Access = ({ req }) => {
  if (req.user) return true
  return { activo: { equals: true } }
}
