import { NextResponse } from 'next/server'
import { listVisibleTestimonials } from '@/lib/testimonials'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const rows = await listVisibleTestimonials()
  return NextResponse.json({ rows })
}
