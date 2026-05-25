/** True when a definition is a client/server fallback, not suitable for quiz or saving. */
export function isPlaceholderVocabDefinition(definition: string | undefined | null): boolean {
  if (!definition?.trim()) return true
  const d = definition.trim().toLowerCase()
  return (
    d.includes('educational placeholder') ||
    d.includes('educational overview') ||
    d.includes('offline / api unavailable') ||
    d.includes('demo_mode is enabled') ||
    d.includes('replaced with this placeholder') ||
    d.includes('could not be loaded. try again when the server')
  )
}
