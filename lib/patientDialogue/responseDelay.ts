const INTERVIEW_MIN_MS = 1500
const INTERVIEW_MAX_MS = 2500
const TEST_MIN_MS = 1400
const TEST_MAX_MS = 2800
const ASSESSMENT_MIN_MS = 4000
const ASSESSMENT_MAX_MS = 6000

function randomDelayMs(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export async function delayForAssessment(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, randomDelayMs(ASSESSMENT_MIN_MS, ASSESSMENT_MAX_MS)))
}

export function delayForTestResultMs(): number {
  return randomDelayMs(TEST_MIN_MS, TEST_MAX_MS)
}
