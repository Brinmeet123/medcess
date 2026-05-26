/** Tell the navbar usage bar to refresh after a token-counted AI call. */
export function notifyAiUsageUpdated(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('ai-usage-updated'))
}
