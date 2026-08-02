import { NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdmin } from '@/lib/adminAuth'
import { reorderTestimonials } from '@/lib/testimonials'

export const dynamic = 'force-dynamic'

const reorderSchema = z.object({
  orderedIds: z.array(z.string().min(1)).min(1),
})

export async function PUT(request: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: gate.status === 401 ? 'Unauthorized' : 'Forbidden' }, { status: gate.status })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = reorderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'orderedIds must be a non-empty array of ids' }, { status: 400 })
  }

  try {
    const rows = await reorderTestimonials(parsed.data.orderedIds)
    return NextResponse.json({ rows })
  } catch {
    return NextResponse.json({ error: 'Could not reorder testimonials' }, { status: 400 })
  }
}
