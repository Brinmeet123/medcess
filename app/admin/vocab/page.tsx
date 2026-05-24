import { redirect } from 'next/navigation'
import { isAdminUser } from '@/lib/ai/admin'
import { listSharedVocabForAdmin } from '@/lib/sharedVocab'
import AdminSharedVocabTable, {
  type AdminSharedVocabRow,
} from '@/components/admin/AdminSharedVocabTable'

export const dynamic = 'force-dynamic'

export default async function AdminSharedVocabPage() {
  if (!(await isAdminUser())) {
    redirect('/')
  }

  const { rows, total } = await listSharedVocabForAdmin({ limit: 200 })

  const initialRows: AdminSharedVocabRow[] = rows.map((row) => ({
    id: row.id,
    term: row.term,
    normalizedTerm: row.normalizedTerm,
    definition: row.definition,
    simpleDefinition: row.simpleDefinition,
    category: row.category,
    source: row.source,
    usageCount: row.usageCount,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-xs text-slate-500 mb-2">Admin · hidden</p>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Shared vocabulary cache</h1>
      <p className="text-sm text-slate-600 mb-6">
        Globally cached medical definitions. Sorted by lookup count. Edit entries to mark them as manually
        curated.
      </p>
      <AdminSharedVocabTable initialRows={initialRows} initialTotal={total} />
    </div>
  )
}
