import type { SharedVocab } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { sharedVocabLookupKeys } from '@/lib/vocabNormalize'

export type SharedVocabSource = 'ai_generated' | 'manual'

export type SharedVocabPayload = {
  term: string
  normalizedTerm: string
  definition: string
  simpleDefinition: string
  category: string | null
  source: SharedVocabSource
}

export async function findSharedVocabByTerm(rawTerm: string): Promise<SharedVocab | null> {
  const keys = sharedVocabLookupKeys(rawTerm)
  for (const key of keys) {
    const hit = await prisma.sharedVocab.findUnique({ where: { normalizedTerm: key } })
    if (hit) return hit
  }
  return null
}

export async function incrementSharedVocabUsage(id: string): Promise<SharedVocab> {
  return prisma.sharedVocab.update({
    where: { id },
    data: { usageCount: { increment: 1 } },
  })
}

export async function saveSharedVocabEntry(payload: SharedVocabPayload): Promise<SharedVocab> {
  const normalizedTerm = payload.normalizedTerm

  try {
    return await prisma.sharedVocab.create({
      data: {
        term: payload.term,
        normalizedTerm,
        definition: payload.definition,
        simpleDefinition: payload.simpleDefinition,
        category: payload.category,
        source: payload.source,
        usageCount: 1,
      },
    })
  } catch (e: unknown) {
    const code = (e as { code?: string })?.code
    if (code === 'P2002') {
      const existing = await prisma.sharedVocab.findUnique({ where: { normalizedTerm } })
      if (existing) {
        return incrementSharedVocabUsage(existing.id)
      }
    }
    throw e
  }
}

export async function listSharedVocabForAdmin(options?: {
  limit?: number
  offset?: number
  search?: string
}): Promise<{ rows: SharedVocab[]; total: number }> {
  const limit = Math.min(options?.limit ?? 100, 500)
  const offset = options?.offset ?? 0
  const search = options?.search?.trim()

  const where = search
    ? {
        OR: [
          { term: { contains: search, mode: 'insensitive' as const } },
          { normalizedTerm: { contains: search.toLowerCase() } },
          { definition: { contains: search, mode: 'insensitive' as const } },
        ],
      }
    : undefined

  const [rows, total] = await Promise.all([
    prisma.sharedVocab.findMany({
      where,
      orderBy: [{ usageCount: 'desc' }, { updatedAt: 'desc' }],
      take: limit,
      skip: offset,
    }),
    prisma.sharedVocab.count({ where }),
  ])

  return { rows, total }
}

export async function updateSharedVocabManual(
  id: string,
  data: { definition?: string; simpleDefinition?: string; category?: string | null }
): Promise<SharedVocab> {
  return prisma.sharedVocab.update({
    where: { id },
    data: {
      ...(data.definition !== undefined ? { definition: data.definition } : {}),
      ...(data.simpleDefinition !== undefined ? { simpleDefinition: data.simpleDefinition } : {}),
      ...(data.category !== undefined ? { category: data.category } : {}),
      source: 'manual',
    },
  })
}
