export function generateId (): string {
  return Math.random().toString(36).substr(2, 16)
}

export default {
  generateId
}
