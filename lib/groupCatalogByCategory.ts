/**
 * Group catalog items by category for sectioned list display.
 * When `sectioned` is false, returns a single group with all items.
 */
export function groupCatalogByCategory<T extends { category: string }>(
  items: T[],
  categoryOrder: readonly string[],
  sectioned: boolean
): { category: string; items: T[] }[] {
  if (!sectioned) {
    return items.length > 0 ? [{ category: '', items }] : []
  }

  const byCategory = new Map<string, T[]>()
  for (const item of items) {
    const list = byCategory.get(item.category) ?? []
    list.push(item)
    byCategory.set(item.category, list)
  }

  const groups: { category: string; items: T[] }[] = []
  for (const cat of categoryOrder) {
    const catItems = byCategory.get(cat)
    if (catItems?.length) {
      groups.push({ category: cat, items: catItems })
      byCategory.delete(cat)
    }
  }
  for (const [category, catItems] of byCategory) {
    if (catItems.length) groups.push({ category, items: catItems })
  }
  return groups
}
