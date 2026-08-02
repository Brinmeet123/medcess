import { z } from 'zod'
import { prisma } from '@/lib/prisma'

/** Suggested levels for the admin form (optional hints — level is free text). */
export const TESTIMONIAL_LEVEL_SUGGESTIONS = [
  'High school student',
  'College student',
  'First-year medical student',
  'Second-year medical student',
  'Third-year medical student',
  'Fourth-year medical student',
  'Resident physician',
  'Doctor',
  'Professor',
  'HOSA advisor',
  'Healthcare professional',
] as const

export const testimonialInputSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  text: z.string().trim().min(1, 'Testimonial text is required').max(4000),
  level: z.string().trim().min(1, 'Level is required').max(120),
  organization: z.string().trim().min(1, 'Organization is required').max(200),
  specialty: z
    .string()
    .trim()
    .max(160)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
  photoUrl: z
    .string()
    .max(600_000)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional()
    .nullable()
    .transform((v) => (v == null ? null : v)),
  visible: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional(),
})

export type TestimonialInput = z.infer<typeof testimonialInputSchema>

export type PublicTestimonial = {
  id: string
  name: string
  text: string
  level: string
  organization: string
  specialty: string | null
  photoUrl: string | null
  rating: number | null
  sortOrder: number
}

export type AdminTestimonial = PublicTestimonial & {
  visible: boolean
  createdAt: string
  updatedAt: string
}

function toPublic(row: {
  id: string
  name: string
  text: string
  level: string
  organization: string
  specialty: string | null
  photoUrl: string | null
  rating: number | null
  sortOrder: number
}): PublicTestimonial {
  return {
    id: row.id,
    name: row.name,
    text: row.text,
    level: row.level,
    organization: row.organization,
    specialty: row.specialty,
    photoUrl: row.photoUrl,
    rating: row.rating,
    sortOrder: row.sortOrder,
  }
}

function toAdmin(row: {
  id: string
  name: string
  text: string
  level: string
  organization: string
  specialty: string | null
  photoUrl: string | null
  rating: number | null
  sortOrder: number
  visible: boolean
  createdAt: Date
  updatedAt: Date
}): AdminTestimonial {
  return {
    ...toPublic(row),
    visible: row.visible,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

/** Subtitle line under the name, e.g. "Second-year medical student, Rutgers NJMS". */
export function formatTestimonialRole(level: string, organization: string, specialty?: string | null): string {
  const base = `${level}, ${organization}`
  if (specialty?.trim()) return `${base} · ${specialty.trim()}`
  return base
}

export async function listVisibleTestimonials(): Promise<PublicTestimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { visible: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return rows.map(toPublic)
}

export async function listAllTestimonials(): Promise<AdminTestimonial[]> {
  const rows = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return rows.map(toAdmin)
}

export async function createTestimonial(input: TestimonialInput): Promise<AdminTestimonial> {
  const maxOrder = await prisma.testimonial.aggregate({ _max: { sortOrder: true } })
  const sortOrder = input.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1

  const row = await prisma.testimonial.create({
    data: {
      name: input.name,
      text: input.text,
      level: input.level,
      organization: input.organization,
      specialty: input.specialty ?? null,
      photoUrl: input.photoUrl ?? null,
      rating: input.rating ?? null,
      visible: input.visible ?? true,
      sortOrder,
    },
  })
  return toAdmin(row)
}

export async function updateTestimonial(
  id: string,
  input: Partial<TestimonialInput>
): Promise<AdminTestimonial | null> {
  const existing = await prisma.testimonial.findUnique({ where: { id } })
  if (!existing) return null

  const row = await prisma.testimonial.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.text !== undefined ? { text: input.text } : {}),
      ...(input.level !== undefined ? { level: input.level } : {}),
      ...(input.organization !== undefined ? { organization: input.organization } : {}),
      ...(input.specialty !== undefined ? { specialty: input.specialty } : {}),
      ...(input.photoUrl !== undefined ? { photoUrl: input.photoUrl } : {}),
      ...(input.rating !== undefined ? { rating: input.rating } : {}),
      ...(input.visible !== undefined ? { visible: input.visible } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    },
  })
  return toAdmin(row)
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  try {
    await prisma.testimonial.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

export async function reorderTestimonials(orderedIds: string[]): Promise<AdminTestimonial[]> {
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.testimonial.update({
        where: { id },
        data: { sortOrder: index },
      })
    )
  )
  return listAllTestimonials()
}
