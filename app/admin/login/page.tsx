import { Suspense } from 'react'
import AdminLoginForm from '@/components/admin/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-slate-500">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  )
}
