import MedcessECGIcon from './MedcessECGIcon'

/** Thin ECG-accent section divider. */
export default function MedcessDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 py-2 ${className}`} aria-hidden>
      <div className="medcess-divider flex-1" />
      <MedcessECGIcon className="h-4 w-16 opacity-80 animate-ecg-pulse" />
      <div className="medcess-divider flex-1" />
    </div>
  )
}
