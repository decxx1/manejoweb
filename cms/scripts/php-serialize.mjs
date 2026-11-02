// Lee el serialize() de PHP solo para escalares y arrays, que es lo que guarda el admin viejo.

export function phpUnserialize(input) {
  if (input == null || input === '') return null
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input), 'utf8')
  const parsed = parseValue(buf, 0)
  return parsed.value
}

function parseValue(buf, i) {
  const type = String.fromCharCode(buf[i])

  if (type === 'N') return { value: null, i: i + 2 }
  if (type === 'b') return { value: buf[i + 2] === 49, i: i + 4 }

  if (type === 'i' || type === 'd') {
    const end = buf.indexOf(0x3b, i)
    const raw = buf.slice(i + 2, end).toString('ascii')
    return { value: type === 'i' ? Number.parseInt(raw, 10) : Number(raw), i: end + 1 }
  }

  if (type === 's') {
    const colon = buf.indexOf(0x3a, i + 2)
    const len = Number.parseInt(buf.slice(i + 2, colon).toString('ascii'), 10)
    const start = colon + 2
    const value = buf.slice(start, start + len).toString('utf8')
    return { value, i: start + len + 2 }
  }

  if (type === 'a') {
    const colon = buf.indexOf(0x3a, i + 2)
    const count = Number.parseInt(buf.slice(i + 2, colon).toString('ascii'), 10)
    let cursor = colon + 2
    const entries = []
    for (let n = 0; n < count; n += 1) {
      const key = parseValue(buf, cursor)
      cursor = key.i
      const val = parseValue(buf, cursor)
      cursor = val.i
      entries.push([key.value, val.value])
    }
    return { value: entries, i: cursor + 1 }
  }

  throw new Error(`serialize PHP no soportado en el byte ${i}`)
}

export function phpList(input) {
  const entries = phpUnserialize(input)
  if (!Array.isArray(entries)) return []
  return entries
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map((entry) => entry[1])
    .filter((value) => value != null && value !== '')
}
