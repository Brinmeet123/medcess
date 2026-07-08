import type { CaseInfoContent } from '@/data/scenarios'

const CASE_SNAPSHOT =
  'A middle-aged man with a history of hypertension, diabetes, and hyperlipidemia presents with crushing retrosternal chest pain (10/10 in intensity) that is radiating down his left arm and left side of his neck. He reports a long history of smoking cigarettes as well as a family history of heart disease. He feels nauseous and light-headed, and he reports shortness of breath. Examination reveals a diaphoretic man in considerable discomfort with diffuse bilateral rales on chest auscultation. ECG reveals convex ST-segment elevation.'

export const medacademyElephantOnChestCaseInfo: CaseInfoContent = {
  introduction: CASE_SNAPSHOT,
  clinicalDataLayout: 'cardio',
  presentation: CASE_SNAPSHOT,
  vitalSigns: [
    'Vital Signs:',
    '',
    'Blood Pressure: 90/60 mmHg',
    '',
    'HR: 75',
    '',
    'RR: 22 rpm',
    '',
    'Temp: 37.5 C',
  ],
  ecgHeading: 'ECG (EKG) Results:',
  ecgFindings: 'ECG reveals convex ST-segment elevation.',
  labValuesIntro:
    'Lab Values: Blood is drawn at the initial presentation and then repeatedly every 3-6 hours for 24 hours. Initial CBC is normal, however remarkable for slightly elevated creatine kinase (see below).',
  labValues: [
    {
      timepoint: 'Initial draw',
      troponin: '0.8 ng/mL',
      creatineKinase: '200 U/L',
      ckMb: '18 IU/L',
    },
    {
      timepoint: '6 hours post initial draw',
      troponin: '>100 ng/mL',
      creatineKinase: '13473 U/L',
      ckMb: '650 ng/mL',
    },
    {
      timepoint: '12 hours post initial draw',
      troponin: '>100 ng/mL',
      creatineKinase: '13542 U/L',
      ckMb: '1207 U/L',
    },
    {
      timepoint: '18 hours post initial draw',
      troponin: '>93 ng/mL',
      creatineKinase: '9000 U/L',
      ckMb: '938 U/L',
    },
    {
      timepoint: '24 hours post initial draw',
      troponin: '87.2 ng/mL',
      creatineKinase: '4000 U/L',
      ckMb: '389 U/L',
    },
  ],
}
