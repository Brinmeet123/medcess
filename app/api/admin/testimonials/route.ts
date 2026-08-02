import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import {
  createTestimonial,
  listAllTestimonials,
  testimonialInputSchema,
} from '@/lib/testimonials'

export const dynamic = 'force-dynamic'

export async function GET() {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ error: gate.status === 401 ? 'Unauthorized' : 'Forbidden' }, { status: gate.status })
  }

  const rows = await listAllTestimonials()
  return NextResponse.json({ rows })
}

export async function POST(request: Request) {
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

  const parsed = testimonialInputSchema.safeParse(body)
  if (!parsed.success) {
    const msg =
      Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .find(Boolean) ?? 'Invalid input'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const row = await createTestimonial(parsed.data)
  return NextResponse.json({ row }, { status: 201 })
}
