import type { ClinicalSection } from '@/components/SectionNav'
import { APP_NAME } from '@/lib/branding'
import type { SimulatorStep } from './SimulatorProgressBar'

export type HelpBlock = {
  stepName: string
  whatToDo: string
  nextStep: string
}

/** Help when browsing /scenarios (not part of the in-case progress bar). */
export function getScenarioLibraryHelpCopy(): HelpBlock {
  return {
    stepName: 'Scenario library',
    whatToDo: `Pick a case on ${APP_NAME}. Everything here is fictional, built for practice.`,
    nextStep: 'Open a card, then use Start Case.',
  }
}

export function getSimulatorHelpCopy(
  currentStep: SimulatorStep,
  options?: { activeSection?: ClinicalSection }
): HelpBlock {
  const sec = options?.activeSection

  if (currentStep === 5 || sec === 'debrief') {
    return {
      stepName: 'Step 5: Results',
      whatToDo: 'Read the score, rubric notes, and feedback.',
      nextStep: 'Retry this case or pick another from the library.',
    }
  }

  if (currentStep === 4 || sec === 'diagnosis') {
    return {
      stepName: 'Step 4: Diagnosis',
      whatToDo: 'Build a differential, rank it, add short reasoning, pick one final diagnosis.',
      nextStep: 'Submit to load the debrief and score.',
    }
  }

  if (currentStep === 3 || sec === 'tests') {
    return {
      stepName: 'Step 3: Tests',
      whatToDo: 'Order what you need to narrow the picture. You can return to interview or exam anytime.',
      nextStep: 'Move to diagnosis when you are ready.',
    }
  }

  if (currentStep === 2 || sec === 'exam') {
    return {
      stepName: 'Step 2: Exam',
      whatToDo: 'Work through the systems and read the findings. You can switch tabs freely.',
      nextStep: 'Continue to tests or another section when ready.',
    }
  }

  return {
    stepName: 'Step 1: History',
    whatToDo: 'Use quick prompts or type in the chat. All case tabs stay available as you work.',
    nextStep: 'Open exam, tests, or diagnosis from the tab bar anytime.',
  }
}
