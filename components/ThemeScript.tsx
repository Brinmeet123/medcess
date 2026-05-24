import { THEME_INIT_SCRIPT } from '@/lib/theme'

/** Runs before paint to avoid theme flash (must stay inline). */
export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
}
