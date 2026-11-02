import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const variables = {
  web: 'CLOUDFLARE_DEPLOY_HOOK_WEB',
  portfolio: 'CLOUDFLARE_DEPLOY_HOOK_PORTFOLIO',
} as const

type Destino = keyof typeof variables

async function avisar(destino: Destino, req: Parameters<CollectionAfterChangeHook>[0]['req']) {
  if (req.context?.skipDeployHooks) return

  const url = process.env[variables[destino]]?.trim()
  if (!url) {
    req.payload.logger.info(`Deploy hook ${destino}: no configurado`)
    return
  }

  try {
    const response = await fetch(url, { method: 'POST' })
    req.payload.logger.info(`Deploy hook ${destino}: HTTP ${response.status}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'error de red'
    req.payload.logger.error(`Deploy hook ${destino} falló: ${message}`)
  }
}

export function deployHook(destino: Destino): CollectionAfterChangeHook & CollectionAfterDeleteHook {
  return async ({ req }) => {
    await avisar(destino, req)
  }
}
