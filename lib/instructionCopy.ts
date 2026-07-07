/** Keys match localStorage: instruction_seen_${pageKey} */
export type InstructionPageKey =
  | 'chat'
  | 'exam'
  | 'tests'
  | 'diagnosis'
  | 'case-info'
  | 'clinical-data'
  | 'vocab'
  | 'debrief'
  | 'medacademy-interview'

export const INSTRUCTION_COPY: Record<
  InstructionPageKey,
  { title: string; lines: string[] }
> = {
  chat: {
    title: 'Talk to the Patient',
    lines: [
      'Ask questions to understand symptoms.',
      'Use the suggested questions if you’re stuck.',
      'Build your case before moving on.',
    ],
  },
  exam: {
    title: 'Run Your Exam',
    lines: [
      'Select physical exams to perform.',
      'Look for key findings.',
      'Only select the exam sections you actually need.',
    ],
  },
  tests: {
    title: 'Order Tests',
    lines: [
      'Choose the right diagnostic tests.',
      'Avoid over-ordering.',
      'Use results to narrow your diagnosis.',
    ],
  },
  diagnosis: {
    title: 'Make Your Diagnosis',
    lines: [
      'Enter your final diagnosis.',
      'Be confident, but think it through.',
      'You’ll get feedback after submitting.',
    ],
  },
  'case-info': {
    title: 'Review Case Info',
    lines: [
      'Read the case snapshot for your first look at the patient.',
      'Open Clinical Data or Vocab when you want more detail.',
      'No tests can be ordered here — gather context first.',
    ],
  },
  'clinical-data': {
    title: 'Review Clinical Data',
    lines: [
      'Browse the chart sections already available in this case.',
      'Use the section menu to jump to imaging, history, exam, and more.',
      'This is review only — you cannot order new tests here.',
    ],
  },
  vocab: {
    title: 'Review Vocabulary',
    lines: [
      'Browse key terms for this case.',
      'Search terms or add them to your Practice List.',
      'Highlighted terms also appear in the case text.',
    ],
  },
  debrief: {
    title: 'Review Your Results',
    lines: [
      'Read your score and feedback.',
      'See what you did well and what to review next.',
      'Retry the case or try another from the library.',
    ],
  },
  'medacademy-interview': {
    title: 'Patient Interview',
    lines: [
      'Select interview questions from the list.',
      'Patient answers use only information from this case.',
      'Ask about smoking, symptoms, history, and exam before making your diagnosis.',
    ],
  },
}

export function instructionStorageKey(pageKey: InstructionPageKey): string {
  return `instruction_seen_${pageKey}`
}
