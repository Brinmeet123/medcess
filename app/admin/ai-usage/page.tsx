import { redirect } from 'next/navigation'
import { isAdminUser } from '@/lib/ai/admin'
import { listAdminUsageForDate } from '@/lib/ai/tokenUsage'
import { prisma } from '@/lib/prisma'
import AdminAIUsageTable from '@/components/admin/AdminAIUsageTable'

export const dynamic = 'force-dynamic'

export default async function AdminAIUsagePage() {
  if (!(await isAdminUser())) {
    redirect('/')
  }

  const rows = await listAdminUsageForDate()
  const userIds = rows.filter((r) => !r.isGuest).map((r) => r.actorId)
  const users =
    userIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, username: true, email: true },
        })
      : []
  const userById = new Map(users.map((u) => [u.id, u]))

  const enriched = rows.map((row) => {
    if (row.isGuest) return row
    const u = userById.get(row.actorId)
    return {
      ...row,
      displayUser: u ? `@${u.username} (${u.email})` : row.displayUser,
    }
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-xs text-slate-500 mb-2">Admin · hidden</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">AI usage (today)</h1>
      <p className="text-sm text-slate-600 mb-6">
        Daily token totals per user or guest session. Counters reset at each user&apos;s local midnight.
      </p>
      <AdminAIUsageTable rows={enriched} />
    </div>
  )
}
