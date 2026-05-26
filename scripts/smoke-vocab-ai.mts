/**
 * Smoke test: vocab define + explain-result AI paths (uses .env.local).
 * Run: npx tsx --env-file=.env.local scripts/smoke-vocab-ai.mts
 */
import { shouldUseOllamaLLM } from '../lib/llm.ts'
import { callManagedLLM } from '../lib/ai/callManagedLLM.ts'
import type { AIActor } from '../lib/ai/resolveActor.ts'

const actor: AIActor = { actorId: 'smoke-test', isRegistered: true, isGuest: false }

async function main() {
  if (!shouldUseOllamaLLM()) {
    console.error('FAIL: OPENAI_API_KEY not set (or DEMO_MODE=true)')
    process.exit(1)
  }

  console.log('OK: OpenAI configured')

  const vocab = await callManagedLLM(
    [
      {
        role: 'system',
        content:
          'Return ONLY JSON: {"term":string,"shortDefinition":string,"definition":string,"category":string}',
      },
      { role: 'user', content: 'Define the medical term "tachycardia" for a student.' },
    ],
    actor,
    { responseFormatJson: true, maxTokens: 200, temperature: 0.3 }
  )
  const vocabJson = JSON.parse(vocab.content.match(/\{[\s\S]*\}/)?.[0] ?? '{}') as {
    shortDefinition?: string
  }
  if (!vocabJson.shortDefinition) {
    console.error('FAIL: vocab JSON missing shortDefinition')
    process.exit(1)
  }
  console.log('OK: vocab-style AI call', vocabJson.shortDefinition.slice(0, 60) + '…')

  const explain = await callManagedLLM(
    [
      {
        role: 'system',
        content: 'Return ONLY plain text, 2 short sentences, no markdown.',
      },
      {
        role: 'user',
        content:
          'Explain in simpler language for a student: "Your history-taking was thorough but you missed asking about radiation."',
      },
    ],
    actor,
    { maxTokens: 120, temperature: 0.4 }
  )
  if (!explain.content.trim()) {
    console.error('FAIL: explain-result style call returned empty text')
    process.exit(1)
  }
  console.log('OK: explain-result-style AI call', explain.content.trim().slice(0, 60) + '…')

  console.log('\nAll vocab + explanation AI smoke checks passed.')
}

main().catch((e) => {
  console.error('FAIL:', e instanceof Error ? e.message : e)
  process.exit(1)
})
