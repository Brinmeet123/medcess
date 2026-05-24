import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminUser } from '@/lib/ai/admin'
import { listSharedVocabForAdmin, updateSharedVocabManual } from '@/lib/sharedVocab'

export const dynamic = 'force-dynamic'

const patchSchema = z.object({
  id: z.string().min(1),
  definition: z.string().min(1).max(4000).optional(),
  simpleDefinition: z.string().min(1).max(500).optional(),
  category: z.string().max(120).nullable().optional(),
})

export async function GET(request: NextRequest) {
  if (!(await isAdminUser())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = request.nextUrl
  const limit = Number(searchParams.get('limit') ?? '100')
  const offset = Number(searchParams.get('offset') ?? '0')
  const search = searchParams.get('search') ?? undefined

  const { rows, total } = await listSharedVocabForAdmin({ limit, offset, search })
  return NextResponse.json({ rows, total })
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminUser())) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const parsed = patchSchema.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { id, definition, simpleDefinition, category } = parsed.data
  if (definition === undefined && simpleDefinition === undefined && category === undefined) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }

  const updated = await updateSharedVocabManual(id, { definition, simpleDefinition, category })
  return NextResponse.json({ row: updated })
}
