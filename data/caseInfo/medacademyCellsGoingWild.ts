import type { CaseInfoContent } from '@/data/scenarios'

export const medacademyCellsGoingWildCaseInfo: CaseInfoContent = {
  introduction:
    'A 59 y/o female fell and sustained a subtrochanteric hip fracture requiring fixation. During the hospitalization, she had an episode of shortness of breath and chest pain. CT scan was ordered to rule out a pulmonary embolism (PE). The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm (see Figure 1). The PE was ruled out.',
  keyImagingFinding:
    'The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm (see Figure 1). The PE was ruled out.',
  clinicalDataImaging:
    'CT scan was ordered to rule out a pulmonary embolism (PE). The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm (see Figure 1). The PE was ruled out.',
  hpi: 'She denies weight loss and hemoptysis, but has been complaining of hoarseness for the past two weeks. She has chronic low back pain, headache, and changes in mentation/coordination. She has a 65-70 pack year smoking history.',
  pmh: [
    'Chronic back pain',
    'HTN',
    'Hypothyroidism',
    'Hx of GI bleed 2004 with negative endoscopy',
    'Hx of diverticular abscess requiring colon resection in 1982',
  ],
  familyHistory: 'No cancer in the family',
  physicalExam: [
    'Mild raspy voice',
    'HEENT: pupils equal, round, and reactive to light, extraocular movements intact (EOMI), oropharynx (OP) clear',
    'Neck: Supple non-palpable thyroid',
    'Lungs: Clear to auscultation and percussion',
    'Cardiac: regular rate & rhythm (RRR) w/o murmurs',
    'Abd: Well healed surgical scar, no masses, liver edge not palpated',
    'Limbs: No edema',
    'Neuro: Cranial nerves (CN) intact, no focal weakness',
  ],
  figureCaption:
    'Figure 1: A contrast-enhanced CT shows the mass (arrow) situated in the right middle and lower lobes',
  figureImageUrl: '/cases/medacademy-pathology-cells-going-wild/figure-1-ct.png',
}
