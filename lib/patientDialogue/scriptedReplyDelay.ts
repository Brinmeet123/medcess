const MIN_DELAY_MS = 1000
const MAX_DELAY_MS = 2000
const BASE_DELAY_MS = 400
const MS_PER_CHAR = 12
const JITTER_MS = 300

const FAST_MIN_DELAY_MS = 700
const FAST_MAX_DELAY_MS = 1400
const FAST_BASE_DELAY_MS = 280
const FAST_MS_PER_CHAR = 8
const FAST_JITTER_MS = 200

function computeScriptedReplyDelayMs(message: string, fast?: boolean): number {
  const min = fast ? FAST_MIN_DELAY_MS : MIN_DELAY_MS
  const max = fast ? FAST_MAX_DELAY_MS : MAX_DELAY_MS
  const base = fast ? FAST_BASE_DELAY_MS : BASE_DELAY_MS
  const msPerChar = fast ? FAST_MS_PER_CHAR : MS_PER_CHAR
  const jitterMax = fast ? FAST_JITTER_MS : JITTER_MS

  const lengthScaled = base + message.length * msPerChar
  const jitter = Math.floor(Math.random() * jitterMax)
  return Math.min(max, Math.max(min, lengthScaled + jitter))
}

/** Brief pause so scripted preset replies feel like live AI generation. */
export async function delayBeforeScriptedPatientReply(
  message: string,
  options?: { fast?: boolean }
): Promise<void> {
  const ms = computeScriptedReplyDelayMs(message, options?.fast)
  await new Promise((resolve) => setTimeout(resolve, ms))
}
