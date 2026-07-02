const MIN_DELAY_MS = 1000
const MAX_DELAY_MS = 2000
const BASE_DELAY_MS = 400
const MS_PER_CHAR = 12
const JITTER_MS = 300

function computeScriptedReplyDelayMs(message: string): number {
  const lengthScaled = BASE_DELAY_MS + message.length * MS_PER_CHAR
  const jitter = Math.floor(Math.random() * JITTER_MS)
  return Math.min(MAX_DELAY_MS, Math.max(MIN_DELAY_MS, lengthScaled + jitter))
}

/** Brief pause so scripted preset replies feel like live AI generation. */
export async function delayBeforeScriptedPatientReply(message: string): Promise<void> {
  const ms = computeScriptedReplyDelayMs(message)
  await new Promise((resolve) => setTimeout(resolve, ms))
}
