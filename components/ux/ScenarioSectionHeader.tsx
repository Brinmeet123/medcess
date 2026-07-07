import type { ClinicalSection } from '@/components/SectionNav'

const GUIDANCE_LINES: Record<ClinicalSection, string> = {
  'case-info': 'Review the case introduction and key findings.',
  history: 'Ask questions to understand the patient.',
  exam: 'Review findings and decide what matters.',
  tests: 'Choose tests to confirm your thinking.',
  'clinical-data': 'Review the clinical data already available in this case.',
  diagnosis: 'Enter your diagnosis.',
  vocab: 'Review key terms for this case.',
  'guided-reasoning': 'Work through guided questions to connect the case to the learning objectives.',
  debrief: 'Review your report.',
}

export function getScenarioSectionGuidanceLine(section: ClinicalSection): string {
  return GUIDANCE_LINES[section]
}
