'use client'

type Props = {
  patientName: string
  onPatientClick?: () => void
}

export default function DoctorPatientScene({ patientName, onPatientClick }: Props) {
  return (
    <div className="case-panel">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mb-4">Scene</h2>
      <div className="flex flex-col sm:flex-row justify-around items-center gap-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mb-2">
            <span className="text-4xl" aria-hidden>
              👨‍⚕️
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-[#CBD5E1]">You (Doctor)</p>
        </div>
        <div className="text-2xl text-gray-400 dark:text-[#64748b]" aria-hidden>
          →
        </div>
        <button
          type="button"
          onClick={onPatientClick}
          className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-950/50 rounded-full flex items-center justify-center mb-2">
            <span className="text-4xl" aria-hidden>
              👤
            </span>
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-[#CBD5E1]">{patientName}</p>
          <p className="text-xs text-gray-500 dark:text-[#94a3b8] mt-1">(Patient)</p>
        </button>
      </div>
    </div>
  )
}
