import type { ScenarioDebriefConfig } from '@/types/debrief'

/**
 * Rule-based debrief configuration per scenario.
 * Tune copy and expectations here without changing engine code.
 */
export const DEBRIEF_CONFIGS: Record<string, ScenarioDebriefConfig> = {
  'chest-pain-er': {
    keyHistoryQuestions: [
      'onset timing and what patient was doing',
      'pain quality and location',
      'radiation to arm jaw or back',
      'associated shortness of breath sweating nausea',
      'cardiac risk factors and medications',
      'family history of heart disease',
    ],
    keyExamItems: ['general', 'cardiac', 'respiratory'],
    criticalTests: ['ecg', 'troponin'],
    unnecessaryTests: ['cbc'],
    mustRecognizeFindings: [
      'Exertional chest pressure with radiation',
      'ECG shows ST changes',
      'Troponin elevation',
    ],
    commonMisses: [
      'Not ordering ECG early in ACS workup',
      'Forgetting to ask about radiation or diaphoresis',
      'Omitting pulmonary embolism from must-not-miss differential',
    ],
    correctDiagnosisExplanation: [
      'STEMI fits exertional pressure-like pain with radiation, ECG ST elevations, and elevated troponin.',
      'This pattern requires urgent reperfusion-oriented care in real practice (simulation stops at diagnosis).',
    ],
    differentialComparison: [
      {
        diagnosis: 'GERD',
        whyLessLikely:
          'Typically meal-related or positional burning; does not explain exertional onset, ECG changes, and troponin.',
      },
      {
        diagnosis: 'Panic attack',
        whyLessLikely:
          'Can mimic chest discomfort, but exertional pressure with objective ECG and troponin abnormality points to ACS.',
      },
    ],
    clinicalPearls: [
      'Exertional chest pain with diaphoresis and radiation is ACS until proven otherwise.',
      'ECG and troponin are central to the initial evaluation of suspected ACS.',
    ],
    vocabTerms: ['troponin', 'STEMI', 'acute coronary syndrome', 'reperfusion'],
  },

  'sudden-headache-er': {
    keyHistoryQuestions: [
      'onset sudden vs gradual',
      'maximal intensity at onset thunderclap',
      'neck stiffness or meningismus',
      'photophobia or vision change',
      'focal neuro deficits',
      'trauma or anticoagulation',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['ct_head'],
    unnecessaryTests: ['cbc'],
    mustRecognizeFindings: [
      'Thunderclap headache maximal at onset',
      'CT shows subarachnoid blood',
    ],
    commonMisses: [
      'Treating thunderclap headache as migraine without imaging',
      'Not asking about neck stiffness or sudden maximal onset',
    ],
    correctDiagnosisExplanation: [
      'Subarachnoid hemorrhage is supported by thunderclap onset and blood on CT.',
      'Sudden worst headache of life is a neuroimaging emergency.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Migraine',
        whyLessLikely:
          'Usually gradual build-up or prior similar episodes; thunderclap maximal-at-onset pattern is atypical.',
      },
    ],
    clinicalPearls: [
      'Thunderclap headache warrants urgent neuroimaging to exclude hemorrhage.',
      'CT non-contrast is first-line for suspected SAH; LP may follow if CT negative and suspicion remains high.',
    ],
    vocabTerms: ['thunderclap headache', 'subarachnoid hemorrhage', 'meningismus'],
  },

  'acute-sob-er': {
    keyHistoryQuestions: [
      'onset sudden vs gradual',
      'pleuritic vs non pleuritic pain',
      'recent travel immobilization surgery',
      'cough fever leg swelling',
      'past clot or bleeding risk',
    ],
    keyExamItems: ['respiratory', 'cardiac'],
    criticalTests: ['ct_chest'],
    unnecessaryTests: ['cbc'],
    mustRecognizeFindings: ['Hypoxia with acute dyspnea', 'CT shows pulmonary embolus'],
    commonMisses: [
      'Anchoring on pneumonia without PE risk factors',
      'Not linking recent travel to dyspnea',
    ],
    correctDiagnosisExplanation: [
      'PE explains acute dyspnea with risk factors and a filling defect on CTPA.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Pneumonia',
        whyLessLikely:
          'Often has fever and focal lung findings; this case emphasizes embolic pattern on CT.',
      },
    ],
    clinicalPearls: [
      'Unexplained hypoxia and tachycardia with risk factors should raise PE suspicion.',
      'CT pulmonary angiography is diagnostic when suspicion is moderate to high.',
    ],
    vocabTerms: ['pulmonary embolism', 'CTPA', 'Wells score', 'D-dimer'],
  },

  'rlq-abdominal-pain': {
    keyHistoryQuestions: [
      'pain migration from periumbilical to RLQ',
      'anorexia nausea vomiting',
      'fever and bowel changes',
      'urinary symptoms',
      'prior abdominal surgery',
    ],
    keyExamItems: ['abdomen'],
    criticalTests: ['ct_abdomen'],
    unnecessaryTests: ['cbc'],
    mustRecognizeFindings: ['Migratory abdominal pain', 'RLQ tenderness on exam', 'CT appendix inflammation'],
    commonMisses: [
      'Missing migration history classic for appendicitis',
      'Delaying imaging when exam suggests surgical abdomen',
    ],
    correctDiagnosisExplanation: [
      'Appendicitis fits migratory pain, focal RLQ findings, and inflamed appendix on CT.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Gastroenteritis',
        whyLessLikely:
          'Usually diffuse cramping with diarrhea; focal RLQ progression argues against isolated gastroenteritis.',
      },
    ],
    clinicalPearls: [
      'Periumbilical pain migrating to RLQ is a classic appendicitis story.',
      'CT abdomen/pelvis is highly useful when diagnosis is uncertain.',
    ],
    vocabTerms: ['appendicitis', 'McBurney point', 'rebound tenderness'],
  },

  'fever-confusion': {
    keyHistoryQuestions: [
      'time course of confusion',
      'fever rigors',
      'focal weakness speech vision',
      'urinary symptoms abdominal pain',
      'immune status and recent procedures',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['blood_culture', 'cmp'],
    unnecessaryTests: ['covid'],
    mustRecognizeFindings: ['Hypotension with fever', 'Altered mental status', 'Positive blood cultures'],
    commonMisses: [
      'Underestimating sepsis in elderly with altered mental status',
      'Not checking perfusion and lactate early',
    ],
    correctDiagnosisExplanation: [
      'Sepsis is supported by fever, hypotension, altered mental status, and positive cultures.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Stroke',
        whyLessLikely:
          'Fever and infection markers point to systemic infection; focal deficits may be absent early.',
      },
    ],
    clinicalPearls: [
      'Altered mental status plus infection signs should prompt sepsis evaluation.',
      'Early recognition and source control improve outcomes.',
    ],
    vocabTerms: ['sepsis', 'SIRS', 'qSOFA', 'lactate'],
  },

  'spring-allergic-rhinitis': {
    keyHistoryQuestions: [
      'onset and duration about three weeks',
      'worse outdoors soccer school',
      'sneezing itchy eyes clear drainage',
      'better indoors',
      'similar symptoms last spring',
      'fever purulent discharge body aches',
      'medications allergies',
    ],
    keyExamItems: ['general', 'heent', 'respiratory'],
    criticalTests: ['allergy_skin_prick', 'serum_ige'],
    unnecessaryTests: ['sinus_ct'],
    mustRecognizeFindings: [
      'Spring seasonal onset with recurrence last year',
      'Outdoor and exercise trigger pattern',
      'Itchy eyes and clear rhinorrhea without fever',
      'Allergic shiners and pale boggy turbinates',
      'Positive grass and tree pollen skin tests',
      'Mildly elevated total IgE',
      'Negative nasal swab for infection',
    ],
    commonMisses: [
      'Diagnosing bacterial sinusitis without fever or purulent discharge',
      'Ordering sinus CT before trying appropriate allergy-directed care',
      'Not asking about seasonal or outdoor triggers',
      'Missing itchy eyes as part of allergic rhinoconjunctivitis',
      'Not screening for exercise-related cough or wheeze',
    ],
    correctDiagnosisExplanation: [
      'Seasonal allergic rhinitis is IgE-mediated inflammation of the nasal mucosa triggered by pollen.',
      'Ethan\'s spring onset, outdoor/soccer flares, itch, clear discharge, allergic exam, elevated IgE, and positive pollen skin prick testing fit this diagnosis better than infection.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Viral URI',
        whyLessLikely:
          'URIs often include fever, myalgias, and shorter course; clear itch-predominant symptoms with seasonal recurrence argue against isolated viral illness.',
      },
      {
        diagnosis: 'Acute bacterial sinusitis',
        whyLessLikely:
          'Typically needs persistent purulence, facial pain, or fever; absent here.',
      },
      {
        diagnosis: 'Nonallergic rhinitis',
        whyLessLikely:
          'Lacks prominent itch and positive allergen sensitization on testing.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): History 30, allergic trigger pattern 25, appropriate testing 15, correct diagnosis 30.',
      'Treat allergic rhinitis with allergen avoidance, intranasal steroids, and oral or topical antihistamines.',
      'Skin prick or specific IgE testing confirms sensitization; imaging is not first-line for uncomplicated rhinitis.',
      'Ask about asthma symptoms in atopic patients.',
      'Do not prescribe antibiotics without bacterial features.',
    ],
    vocabTerms: ['allergic rhinitis', 'IgE', 'skin prick test', 'rhinoconjunctivitis', 'pollen'],
  },

  'peanut-anaphylaxis': {
    keyHistoryQuestions: [
      'time since eating Pad Thai about 15 minutes',
      'lip swelling throat tightness hives',
      'trouble swallowing wheezing',
      'possible peanut exposure',
      'childhood peanut reaction',
      'blood pressure symptoms dizziness',
      'medications allergies',
    ],
    keyExamItems: ['general', 'heent', 'respiratory', 'skin'],
    criticalTests: ['serum_tryptase'],
    unnecessaryTests: ['allergy_skin_prick'],
    mustRecognizeFindings: [
      'Acute onset minutes after restaurant meal',
      'Multisystem involvement: skin, airway, cardiovascular',
      'Urticaria and lip swelling',
      'Throat tightness hoarse voice mild wheeze',
      'Hypotension tachycardia hypoxia',
      'Possible peanut in Pad Thai with prior peanut reaction',
      'Elevated tryptase if drawn during event',
    ],
    commonMisses: [
      'Attributing symptoms to panic attack only',
      'Delaying epinephrine to obtain allergy testing',
      'Not recognizing hypotension as anaphylaxis criterion',
      'Treating wheeze alone without addressing systemic reaction',
      'Not asking about food ingredients and prior allergy',
    ],
    correctDiagnosisExplanation: [
      'Peanut-induced anaphylaxis is a severe IgE-mediated reaction with rapid onset after peanut exposure.',
      'Maya has urticaria, angioedema, respiratory compromise, and hypotension after a meal with likely peanut—this is an emergency requiring immediate IM epinephrine.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Panic attack',
        whyLessLikely:
          'Does not explain hives, lip swelling, wheeze, or hypotension immediately after food.',
      },
      {
        diagnosis: 'Food intolerance',
        whyLessLikely:
          'Usually GI-limited without urticaria or shock.',
      },
      {
        diagnosis: 'Isolated asthma exacerbation',
        whyLessLikely:
          'Lacks food trigger and systemic skin/hypotensive features.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Emergency recognition 30, food/allergy history 20, airway/BP 25, diagnosis 25; bonus epinephrine first-line (+10).',
      'IM epinephrine is first-line; position patient supine with legs elevated if hypotensive.',
      'Adjuncts include repeat epinephrine, albuterol, antihistamines, and steroids after initial resuscitation.',
      'Observe for biphasic reaction; prescribe auto-injector and allergist referral.',
      'Allergy testing is for later—not before acute treatment.',
    ],
    vocabTerms: ['anaphylaxis', 'epinephrine', 'tryptase', 'angioedema', 'urticaria'],
  },

  'cvid-recurrent-infections': {
    keyHistoryQuestions: [
      'number of ear infections pneumonias sinuses',
      'recovery after antibiotics school absences',
      'weight gain growth',
      'family history immune problems',
      'hospitalizations IV antibiotics',
      'allergies asthma',
    ],
    keyExamItems: ['general', 'heent', 'respiratory'],
    criticalTests: ['immunoglobulins', 'vaccine_antibody_titers'],
    unnecessaryTests: ['covid'],
    mustRecognizeFindings: [
      'Eight ear infections in one year',
      'Three pneumonias in two years',
      'Recurrent sinopulmonary bacterial pattern',
      'Poor weight gain and small stature',
      'Markedly low IgG IgA IgM',
      'Poor vaccine antibody responses',
      'Family history of immunodeficiency',
    ],
    commonMisses: [
      'Dismissing as normal childhood colds only',
      'Not asking specifically about pneumonia hospitalizations',
      'Skipping quantitative immunoglobulins and vaccine titers',
      'Forgetting family history of immune disease',
      'Not excluding HIV or CF when pattern suggests immunodeficiency',
    ],
    correctDiagnosisExplanation: [
      'Common variable immunodeficiency (CVID) is a primary immunodeficiency with low immunoglobulins and impaired antibody responses leading to recurrent bacterial infections.',
      'Noah\'s recurrent pneumonias, poor growth, hypogammaglobulinemia, and poor vaccine responses fit CVID after excluding HIV and CF.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Recurrent viral infections',
        whyLessLikely:
          'Normal children get colds but not repeated pneumonias with abnormal immunoglobulins.',
      },
      {
        diagnosis: 'Cystic fibrosis',
        whyLessLikely:
          'Can mimic lung disease; normal sweat chloride makes CF less likely here.',
      },
      {
        diagnosis: 'Poor antibiotic adherence',
        whyLessLikely:
          'Does not explain low immunoglobulins and poor vaccine responses.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Infection history 25, serious recurrent pattern 25, immune testing 30, diagnosis 20.',
      'Red flags for primary immunodeficiency include recurrent pneumonias, poor growth, and family history.',
      'Order quantitative immunoglobulins and specific antibody titers to vaccines.',
      'CVID management may include immunoglobulin replacement and infection prevention.',
      'Refer to immunology for long-term care and complication screening.',
    ],
    vocabTerms: ['CVID', 'hypogammaglobulinemia', 'immunoglobulin replacement', 'primary immunodeficiency', 'vaccine titers'],
  },

  'exercise-induced-asthma': {
    keyHistoryQuestions: [
      'symptoms during running timing 10 minutes',
      'chest tightness cough wheeze after exercise',
      'improves with rest',
      'family history asthma',
      'fever rest chest pain syncope',
      'seasonal allergies',
    ],
    keyExamItems: ['general', 'respiratory', 'cardiac'],
    criticalTests: ['exercise_challenge', 'spirometry', 'peak_flow'],
    unnecessaryTests: ['cxr'],
    mustRecognizeFindings: [
      'Six months of symptoms only with exertion',
      'Onset about 10 minutes into running',
      'Post-exercise cough and occasional wheeze',
      'Symptoms resolve with rest',
      'Normal lung exam and resting spirometry',
      'Drop in FEV1 or peak flow after exercise challenge',
      'Mother with asthma',
    ],
    commonMisses: [
      'Labeling as poor fitness without pulmonary testing',
      'Not asking exact timing relative to exercise',
      'Missing family history of atopy or asthma',
      'Diagnosing pneumonia without infectious signs',
      'Skipping exercise challenge when resting spirometry is normal',
    ],
    correctDiagnosisExplanation: [
      'Exercise-induced bronchoconstriction is airway narrowing triggered by exercise, often with normal resting pulmonary function.',
      'Sarah\'s exertional chest tightness, post-exercise wheeze, family asthma history, and objective drop in airflow after exercise support this diagnosis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Poor conditioning',
        whyLessLikely:
          'Does not typically cause wheeze or measurable post-exercise airflow decline.',
      },
      {
        diagnosis: 'Vocal cord dysfunction',
        whyLessLikely:
          'Often inspiratory stridor; exercise challenge here supports bronchoconstriction.',
      },
      {
        diagnosis: 'Cardiac arrhythmia',
        whyLessLikely:
          'No syncope or resting ECG abnormality; symptoms are respiratory and exercise-coupled.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Exercise timing 20, exertional pattern 25, spirometry/challenge 25, diagnosis 30.',
      'Resting spirometry may be normal—exercise or bronchoprovocation testing confirms EIB.',
      'Pre-exercise short-acting bronchodilator and warm-up are key management steps.',
      'Consider coexisting allergic rhinitis or atopy.',
      'Red flags like syncope or chest pain at rest warrant cardiac workup.',
    ],
    vocabTerms: ['exercise-induced bronchoconstriction', 'spirometry', 'FEV1', 'peak flow', 'bronchodilator'],
  },

  'atopic-dermatitis-eczema': {
    keyHistoryQuestions: [
      'chronic itch duration years',
      'flexural elbows knees location',
      'worse winter hot showers',
      'sleep scratching',
      'dry skin',
      'family asthma atopy',
      'fever pus new medications household rash',
    ],
    keyExamItems: ['general', 'skin'],
    criticalTests: ['skin_scraping'],
    unnecessaryTests: ['skin_biopsy'],
    mustRecognizeFindings: [
      'Chronic relapsing pruritus for years',
      'Flexural distribution antecubital popliteal',
      'Xerosis and lichenification from scratching',
      'Worse in winter and after hot water',
      'Nocturnal itch disrupting sleep',
      'Father with asthma (atopic family history)',
      'Negative scraping for fungus and scabies',
    ],
    commonMisses: [
      'Treating as fungal infection without scraping evidence',
      'Not recognizing chronic relapsing course',
      'Missing family atopy history',
      'Ordering biopsy when exam is classic',
      'Not asking about sleep disturbance from itch',
    ],
    correctDiagnosisExplanation: [
      'Atopic dermatitis (eczema) is a chronic inflammatory skin disease in atopic individuals, often beginning in childhood.',
      'Olivia\'s years of flexural itch, dry skin, lichenification, winter flares, and paternal asthma fit eczema; scraping excludes mimics.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Tinea corporis',
        whyLessLikely:
          'Usually annular with positive KOH; chronic bilateral flexural pattern and negative scraping argue against.',
      },
      {
        diagnosis: 'Scabies',
        whyLessLikely:
          'Burrows and household pruritus; no contacts affected and scraping negative.',
      },
      {
        diagnosis: 'Contact dermatitis',
        whyLessLikely:
          'Localized to exposure site; long-standing flexural pattern favors atopic dermatitis.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Chronic itch 25, flexural distribution 25, history/exam 20, diagnosis 30.',
      'Moisturizers and anti-inflammatory topical therapy are foundation of care.',
      'Skin scraping is useful when tinea or scabies is suspected.',
      'Biopsy is not needed for classic presentations.',
      'Screen for asthma and allergies as part of the atopic march.',
    ],
    vocabTerms: ['atopic dermatitis', 'eczema', 'lichenification', 'xerosis', 'atopic march'],
  },
}

export function getDebriefConfigForScenario(scenarioId: string): ScenarioDebriefConfig | null {
  return DEBRIEF_CONFIGS[scenarioId] ?? null
}
