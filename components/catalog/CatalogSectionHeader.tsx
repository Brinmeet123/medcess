type Props = {
  title: string
}

/** Section label for grouped catalog lists (Tests / Diagnosis). */
export default function CatalogSectionHeader({ title }: Props) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-[#94a3b8] pt-4 pb-2 first:pt-0 border-b border-slate-100 dark:border-[#14345C] mb-3">
      {title}
    </h3>
  )
}
