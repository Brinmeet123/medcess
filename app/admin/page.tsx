import { redirect } from 'next/navigation'
import { isAdminUser } from '@/lib/adminAuth'
import { listAllTestimonials } from '@/lib/testimonials'
import AdminTestimonialsManager from '@/components/admin/AdminTestimonialsManager'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  if (!(await isAdminUser())) {
    redirect('/admin/login')
  }

  const rows = await listAllTestimonials()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <p className="text-xs text-slate-500 mb-2">Admin · testimonials</p>
      <h1 className="text-2xl font-bold text-medcess-navy dark:text-[#F8FAFC] mb-1">
        Testimonials
      </h1>
      <p className="text-sm text-slate-600 dark:text-[#94a3b8] mb-8">
        Add, edit, reorder, and control which testimonials appear on the homepage below &ldquo;Who
        it&apos;s for.&rdquo;
      </p>
      <AdminTestimonialsManager initialRows={rows} />
    </div>
  )
}
