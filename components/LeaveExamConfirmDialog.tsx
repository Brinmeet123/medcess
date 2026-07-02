'use client'

type Props = {
  open: boolean
  onContinue: () => void
  onStay: () => void
}

export default function LeaveExamConfirmDialog({ open, onContinue, onStay }: Props) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-exam-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onStay}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200/90 dark:border-[#14345C] bg-white dark:bg-[#071A33] p-6 shadow-xl">
        <h2
          id="leave-exam-dialog-title"
          className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC] sm:text-xl"
        >
          Leave Physical Exam?
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1]">
          You can continue to other sections at any time, but make sure you&apos;ve reviewed all
          available physical exam findings before moving on. You can always return to this section
          later.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="btn-press rounded-lg border border-slate-300 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-[#F8FAFC] transition hover:bg-slate-50 dark:hover:bg-[#14345C]/40"
            onClick={onStay}
          >
            Stay on Physical Exam
          </button>
          <button
            type="button"
            className="btn-press rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
