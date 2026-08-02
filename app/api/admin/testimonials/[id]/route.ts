import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import {
  deleteTestimonial,
  testimonialInputSchema,
  updateTestimonial,
} from '@/lib/testimonials'

export const dynamic = 'force-dynamic'

const patchSchema = testimonialInputSchema.partial()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: gate.status === 401 ? 'Unauthorized' : 'Forbidden' }, { status: gate.status })
  }

  const id = params.id
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    const msg =
      Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .find(Boolean) ?? 'Invalid input'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
  }

  const row = await updateTestimonial(id, parsed.data)
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ row })
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: gate.status === 401 ? 'Unauthorized' : 'Forbidden' }, { status: gate.status })
  }

  const id = params.id
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const ok = await deleteTestimonial(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
