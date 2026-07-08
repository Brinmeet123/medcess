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
    essentialInterviewQuestions: [
      'onset timing and what patient was doing',
      'pain quality and location',
      'radiation to arm jaw or back',
      'associated shortness of breath sweating nausea',
      'cardiac risk factors and medications',
      'family history of heart disease',
    ],
    optionalInterviewQuestions: [
      'exertional triggers and rest relief',
      'prior similar episodes',
    ],
    irrelevantInterviewQuestions: [
      'recent skin rash',
      'childhood illnesses',
    ],
    keyExamItems: ['general', 'cardiac', 'respiratory'],
    criticalTests: ['ecg', 'troponin'],
    essentialTests: ['ecg', 'troponin'],
    optionalTests: ['cxr', 'bmp'],
    unnecessaryTests: ['cbc'],
    redFlags: [
      'Exertional chest pressure with radiation',
      'Diaphoresis or nausea with chest pain',
      'ECG ST changes or troponin elevation',
    ],
    keyEvidence: [
      'Crushing or pressure-like chest pain',
      'Radiation to left arm or jaw',
      'Elevated troponin',
      'ECG ST-segment changes',
    ],
    idealReasoning:
      "The patient's crushing chest pain, radiation to the left arm, shortness of breath, and elevated troponin strongly support acute myocardial infarction. GERD is less likely because it would not explain the elevated troponin or ECG changes. Anxiety could cause chest discomfort, but it would not explain objective cardiac findings.",
    correctDiagnosis: 'Acute Myocardial Infarction',
    acceptableDiagnoses: ['STEMI', 'NSTEMI', 'Acute coronary syndrome'],
    expectedDifferential: ['Acute myocardial infarction', 'Unstable angina', 'Pulmonary embolism', 'Aortic dissection', 'GERD'],
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

  'stemi-pressure-wont-go-away': {
    keyHistoryQuestions: [
      'onset timing 45 minutes exertion',
      'pressure quality central chest',
      'radiation arm jaw',
      'nausea sweating shortness breath',
      'hypertension smoking risk',
      'fever cough',
    ],
    keyExamItems: ['general', 'cardiac', 'respiratory'],
    criticalTests: ['ecg', 'troponin'],
    unnecessaryTests: ['d_dimer'],
    mustRecognizeFindings: [
      'Sudden chest pressure while lifting heavy boxes',
      'Radiation to left arm and jaw',
      'Diaphoresis nausea dyspnea weakness',
      'Hypertension and smoking history',
      'Inferior ST elevation on ECG',
      'Elevated troponin',
      'Clear lungs on exam',
    ],
    commonMisses: [
      'Diagnosing panic attack without ECG and troponin',
      'Missing radiation to arm or jaw',
      'Delaying ECG in acute chest pressure',
      'Ordering D-dimer instead of ACS workup when STEMI present',
      'Not recognizing need for urgent reperfusion',
    ],
    correctDiagnosisExplanation: [
      'STEMI is acute transmural myocardial infarction with ST elevation on ECG and biomarker rise.',
      'Robert\'s exertional pressure, radiation, autonomic symptoms, inferior ST elevation, and troponin confirm acute MI.',
    ],
    differentialComparison: [
      {
        diagnosis: 'GERD',
        whyLessLikely:
          'Lacks typical burning post-prandial pattern; does not explain ST elevation and troponin.',
      },
      {
        diagnosis: 'Pulmonary embolism',
        whyLessLikely:
          'May cause tachycardia and dyspnea but not inferior STEMI pattern with troponin rise.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Cardiac emergency 30, radiation/risk 25, ECG/troponin 25, diagnosis 20; bonus reperfusion (+10).',
      'First ECG within 10 minutes of arrival for suspected ACS.',
      'STEMI requires reperfusion (PCI or fibrinolysis) when not contraindicated.',
      'Inferior MI — watch for right ventricular involvement and hypotension with nitrates.',
    ],
    vocabTerms: ['STEMI', 'troponin', 'acute coronary syndrome', 'reperfusion', 'inferior MI'],
  },

  'afib-rapid-ventricular-response': {
    keyHistoryQuestions: [
      'sudden palpitations 4 hours',
      'irregular heartbeat',
      'chest pain yes or no',
      'shortness breath lightheaded',
      'hypertension medications',
      'thyroid symptoms',
    ],
    keyExamItems: ['cardiac', 'general'],
    criticalTests: ['ecg'],
    unnecessaryTests: ['cxr'],
    mustRecognizeFindings: [
      'Sudden onset fluttering palpitations',
      'Irregularly irregular pulse ~146',
      'ECG atrial fibrillation with RVR',
      'Normal troponin',
      'Normal electrolytes and TSH',
      'No chest pain',
      'Mild dyspnea and lightheadedness',
    ],
    commonMisses: [
      'Not obtaining ECG for palpitations',
      'Assuming anxiety without rhythm documentation',
      'Missing rate control and anticoagulation discussion',
      'Confusing with regular SVT',
    ],
    correctDiagnosisExplanation: [
      'Atrial fibrillation with RVR is chaotic atrial activity with rapid ventricular response causing palpitations.',
      'Patricia\'s irregular tachycardia on exam and ECG confirming AF with rate ~145 establish the diagnosis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'SVT',
        whyLessLikely:
          'Typically regular narrow-complex tachycardia; ECG shows irregular AF.',
      },
      {
        diagnosis: 'Panic attack',
        whyLessLikely:
          'Objective irregular tachycardia on ECG exceeds panic physiology alone.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Irregular rhythm 25, ECG 30, risk factors 20, diagnosis 25.',
      'Rate control with beta-blockers or calcium channel blockers is first-line for RVR.',
      'Consider anticoagulation based on stroke risk (CHA2DS2-VASc).',
      'Troponin and TSH help exclude MI and thyrotoxicosis triggers.',
    ],
    vocabTerms: ['atrial fibrillation', 'RVR', 'CHA2DS2-VASc', 'rate control', 'cardioversion'],
  },

  'chf-exacerbation-stairs': {
    keyHistoryQuestions: [
      'progressive dyspnea weeks',
      'leg swelling orthopnea PND',
      'pillows at night',
      'fatigue fever',
      'weight gain',
    ],
    keyExamItems: ['cardiac', 'respiratory', 'extremities'],
    criticalTests: ['bnp', 'echo', 'cxr'],
    unnecessaryTests: ['covid'],
    mustRecognizeFindings: [
      'Exertional dyspnea worsening over weeks',
      'Bilateral leg edema',
      'Orthopnea and paroxysmal nocturnal dyspnea',
      'Elevated JVP and bibasilar crackles',
      'Elevated BNP',
      'Pulmonary congestion on chest X-ray',
      'Reduced ejection fraction on echocardiogram',
    ],
    commonMisses: [
      'Not asking about pillows or nighttime waking',
      'Missing peripheral edema on exam',
      'Skipping BNP or echocardiogram',
      'Treating as pneumonia without infiltrate',
      'Not connecting fatigue and congestion',
    ],
    correctDiagnosisExplanation: [
      'CHF exacerbation is decompensated heart failure with fluid retention and pulmonary congestion.',
      'Samuel\'s orthopnea, PND, edema, crackles, elevated BNP, congested X-ray, and EF 30% fit CHF exacerbation.',
    ],
    differentialComparison: [
      {
        diagnosis: 'COPD exacerbation',
        whyLessLikely:
          'Wheezing and chronic cough predominant; prominent BNP and reduced EF favor CHF.',
      },
      {
        diagnosis: 'Pneumonia',
        whyLessLikely:
          'No fever or lobar infiltrate; pattern is vascular congestion.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Volume overload 30, BNP/echo 25, connect symptoms 20, diagnosis 25.',
      'Ask about orthopnea, PND, and edema in every dyspnea history.',
      'BNP supports heart failure; echo defines systolic function.',
      'Loop diuretics and afterload reduction are cornerstone of acute decompensation.',
    ],
    vocabTerms: ['heart failure', 'BNP', 'ejection fraction', 'orthopnea', 'pulmonary edema'],
  },

  'hypertrophic-cardiomyopathy-syncope': {
    keyHistoryQuestions: [
      'syncope during exercise',
      'seizure activity witnessed',
      'prodrome dizziness',
      'chest tightness exertion',
      'family sudden death',
      'dehydration heat',
    ],
    keyExamItems: ['cardiac', 'general'],
    criticalTests: ['echo', 'ecg'],
    unnecessaryTests: ['cxr'],
    mustRecognizeFindings: [
      'Loss of consciousness during intense basketball practice',
      'Brief LOC without seizure activity',
      'Exertional chest tightness',
      'Uncle sudden death at age 28',
      'Harsh systolic murmur louder with Valsalva',
      'LVH on ECG',
      'Asymmetric septal hypertrophy on echo',
    ],
    commonMisses: [
      'Labeling as vasovagal without cardiac workup',
      'Not asking family history of sudden death',
      'Skipping echocardiogram in exertional syncope',
      'Missing murmur change with Valsalva',
      'Clearing athlete without cardiology evaluation',
    ],
    correctDiagnosisExplanation: [
      'Hypertrophic cardiomyopathy is genetic myocardial hypertrophy with risk of obstruction and sudden death.',
      'Jason\'s exertional syncope, family SCD, characteristic murmur, LVH, and septal hypertrophy confirm HCM.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Vasovagal syncope',
        whyLessLikely:
          'Occurs with triggers like pain or prolonged standing, not mid-sprint with pathologic murmur.',
      },
      {
        diagnosis: 'Seizure',
        whyLessLikely:
          'No tonic-clonic activity or postictal state described.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Exertional syncope 25, family history 25, echo 25, diagnosis 25; bonus SCD risk (+10).',
      'Any syncope during exertion in young athletes requires cardiac evaluation including echo.',
      'Murmur increasing with Valsalva suggests dynamic LVOT obstruction.',
      'Restrict strenuous sports until risk stratification and consider ICD if high risk.',
    ],
    vocabTerms: ['hypertrophic cardiomyopathy', 'Valsalva', 'sudden cardiac death', 'LVOT obstruction', 'echocardiogram'],
  },

  'acute-pericarditis-positional': {
    keyHistoryQuestions: [
      'positional chest pain worse supine',
      'better leaning forward',
      'recent viral illness',
      'exertional symptoms',
      'fever',
      'pleuritic pain',
    ],
    keyExamItems: ['cardiac', 'respiratory'],
    criticalTests: ['ecg', 'esr_crp'],
    unnecessaryTests: ['d_dimer'],
    mustRecognizeFindings: [
      'Sharp chest pain 2 days positional',
      'Worse lying flat improved leaning forward',
      'Recent viral URI',
      'Low-grade fever',
      'Pericardial friction rub',
      'Diffuse ST elevations with PR depression on ECG',
      'Elevated ESR/CRP',
    ],
    commonMisses: [
      'Missing positional component of pain',
      'Confusing diffuse ST elevation with STEMI',
      'Not auscultating with patient leaning forward for rub',
      'Ignoring recent viral prodrome',
      'Ordering PE workup as primary diagnosis without supporting features',
    ],
    correctDiagnosisExplanation: [
      'Acute pericarditis is inflammation of the pericardium causing pleuritic positional chest pain.',
      'Amanda\'s post-viral sharp pain, forward-leaning relief, friction rub, diffuse ST elevation, and inflammatory markers fit pericarditis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'STEMI',
        whyLessLikely:
          'STEMI shows regional ST elevation with ischemic pressure and diaphoresis, not positional viral prodrome.',
      },
      {
        diagnosis: 'Costochondritis',
        whyLessLikely:
          'Localized reproducible tenderness without friction rub or diffuse ECG changes.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Positional pattern 30, ECG 25, viral trigger 20, diagnosis 25.',
      'Listen for pericardial rub with patient sitting up and leaning forward.',
      'Diffuse ST elevation with PR depression favors pericarditis over regional STEMI.',
      'NSAIDs and colchicine are first-line; monitor for effusion.',
    ],
    vocabTerms: ['pericarditis', 'friction rub', 'PR depression', 'colchicine', 'myopericarditis'],
  },

  'tinea-corporis-spreading': {
    keyHistoryQuestions: [
      'ring shape spreading over weeks',
      'wrestling teammates skin problems',
      'itch fever pain',
      'otc treatments tried',
      'location arm',
    ],
    keyExamItems: ['skin', 'general'],
    criticalTests: ['koh_prep', 'skin_scraping'],
    unnecessaryTests: ['skin_biopsy'],
    mustRecognizeFindings: [
      'Annular plaque with raised scaly border',
      'Central clearing',
      'Two-week enlargement',
      'Wrestling exposure and teammate rashes',
      'Mild itch without fever',
      'KOH positive for fungal elements',
      'No purulence or cellulitis warmth',
    ],
    commonMisses: [
      'Diagnosing cellulitis without systemic or bacterial features',
      'Ordering biopsy before KOH in classic ringworm',
      'Not asking about contact sports exposure',
      'Missing central clearing when describing lesion',
      'Treating with antibiotics instead of antifungal',
    ],
    correctDiagnosisExplanation: [
      'Tinea corporis is a dermatophyte infection of glabrous skin causing annular plaques.',
      'Ethan\'s enlarging ring with scaly border, wrestling exposure, and positive KOH confirm tinea corporis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Eczema',
        whyLessLikely:
          'Atopic dermatitis favors flexures and chronic bilaterality, not solitary expanding ring.',
      },
      {
        diagnosis: 'Cellulitis',
        whyLessLikely:
          'No fever, warmth, purulence, or rapid painful spread.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Ring lesion 25, sports exposure 25, KOH 25, diagnosis 25.',
      'Scrape the active border for KOH — center may be false negative.',
      'Treat with topical antifungals for localized disease; keep wrestling gear clean.',
      'Biopsy is unnecessary when morphology and KOH are classic.',
    ],
    vocabTerms: ['tinea corporis', 'KOH preparation', 'dermatophyte', 'annular plaque'],
  },

  'melanoma-mole-changed': {
    keyHistoryQuestions: [
      'mole change color size border months',
      'sun exposure sunscreen',
      'itch bleeding',
      'family skin cancer',
    ],
    keyExamItems: ['skin', 'general'],
    criticalTests: ['dermoscopy', 'skin_biopsy'],
    unnecessaryTests: ['ct_chest'],
    mustRecognizeFindings: [
      'Asymmetric pigmented lesion',
      'Irregular borders and multiple colors',
      'Diameter greater than 6 mm',
      'Evolution over months',
      'High sun exposure with poor sunscreen',
      'Dermoscopy atypical features',
      'Biopsy malignant melanocytes',
    ],
    commonMisses: [
      'Not applying ABCDE framework',
      'Skipping biopsy for changing pigmented lesion',
      'Not asking about sun and tanning history',
      'Reassuring without histology',
      'Missing full skin exam for second lesions',
    ],
    correctDiagnosisExplanation: [
      'Melanoma is malignant proliferation of melanocytes that may metastasize if delayed.',
      'Karen\'s evolving asymmetric multicolored lesion with concerning dermoscopy and biopsy-proven malignancy is melanoma.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Benign nevus',
        whyLessLikely:
          'Stable symmetric uniform lesions; biopsy shows malignancy here.',
      },
      {
        diagnosis: 'Seborrheic keratosis',
        whyLessLikely:
          'Waxy stuck-on appearance without invasive melanoma on histology.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): ABCDE 35, sun history 20, biopsy 20, diagnosis 25; bonus warning signs (+10).',
      'Any changing mole requires biopsy — do not observe ABCDE-positive lesions.',
      'Dermoscopy improves triage but does not replace histology.',
      'Staging imaging follows confirmed diagnosis per guidelines.',
    ],
    vocabTerms: ['melanoma', 'ABCDE', 'dermoscopy', 'excisional biopsy', 'Breslow thickness'],
  },

  'acne-vulgaris-face': {
    keyHistoryQuestions: [
      'duration face back',
      'menstrual flare',
      'comedones papules pustules',
      'products tried',
      'fever',
    ],
    keyExamItems: ['skin', 'general'],
    criticalTests: [],
    unnecessaryTests: ['ct_chest'],
    mustRecognizeFindings: [
      'Open and closed comedones',
      'Inflammatory papules and pustules',
      'Face and upper back distribution',
      'Premenstrual worsening',
      'Failed OTC therapies',
      'No centrofacial flushing of rosacea',
      'Clinical diagnosis without systemic illness',
    ],
    commonMisses: [
      'Not asking about menstrual cycle flares',
      'Confusing rosacea without comedones',
      'Over-ordering labs without endocrine signs',
      'Underestimating moderate severity needing combination therapy',
      'Not documenting prior treatments',
    ],
    correctDiagnosisExplanation: [
      'Acne vulgaris arises from follicular hyperkeratinization, sebum, Cutibacterium acnes, and inflammation.',
      'Sophia\'s comedones plus inflammatory lesions on sebaceous skin with menstrual flares fits moderate acne vulgaris.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Rosacea',
        whyLessLikely:
          'Centrofacial erythema and telangiectasia without prominent comedones.',
      },
      {
        diagnosis: 'Folliculitis',
        whyLessLikely:
          'Localized pustules around hairs without widespread comedonal acne.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Acne pattern 30, menstrual link 20, history 20, diagnosis 30.',
      'Moderate acne often needs topical retinoid plus antibacterial (benzoyl peroxide or antibiotic).',
      'Hormonal therapy may help menstrual flares in appropriate patients.',
      'Reserve hormone panel for irregular cycles or hyperandrogen signs.',
    ],
    vocabTerms: ['acne vulgaris', 'comedone', 'retinoid', 'benzoyl peroxide', 'isotretinoin'],
  },

  'herpes-zoster-burning': {
    keyHistoryQuestions: [
      'burning pain before rash',
      'unilateral dermatomal',
      'vesicles',
      'fever',
      'eye symptoms',
    ],
    keyExamItems: ['skin', 'general'],
    criticalTests: ['varicella_zoster_pcr'],
    unnecessaryTests: ['cxr'],
    mustRecognizeFindings: [
      'Prodromal burning pain before eruption',
      'Grouped vesicles on erythematous base',
      'Left chest dermatomal distribution',
      'Stops at midline',
      'Tender to touch',
      'Low-grade fever',
      'PCR positive for varicella zoster',
    ],
    commonMisses: [
      'Missing prodromal pain history',
      'Not recognizing dermatomal distribution',
      'Treating as cellulitis with antibiotics only',
      'Missing ophthalmic involvement when V1 affected',
      'Delaying antivirals beyond 72 hours without justification',
    ],
    correctDiagnosisExplanation: [
      'Herpes zoster is reactivation of latent varicella zoster virus in a sensory ganglion.',
      'David\'s unilateral dermatomal vesicles after burning pain with positive VZV PCR is shingles.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Contact dermatitis',
        whyLessLikely:
          'Pruritic eczematous patch without dermatomal vesicles or severe neuropathic pain.',
      },
      {
        diagnosis: 'Cellulitis',
        whyLessLikely:
          'Spreading bacterial erythema without grouped vesicles in dermatome.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Dermatomal 30, unilateral 20, testing 20, diagnosis 30.',
      'Antivirals within 72 hours of rash may reduce complications.',
      'Assess for Hutchinson sign if nose tip involved (V1).',
      'Postherpetic neuralgia prevention includes early treatment and vaccines.',
    ],
    vocabTerms: ['herpes zoster', 'dermatome', 'varicella zoster virus', 'postherpetic neuralgia', 'acyclovir'],
  },

  'stevens-johnson-peeling': {
    keyHistoryQuestions: [
      'new medication seizure drug',
      'fever rash onset',
      'mouth eye involvement',
      'skin peeling',
      'timing drug start',
    ],
    keyExamItems: ['skin', 'heent', 'general'],
    criticalTests: ['skin_biopsy', 'cbc', 'cmp'],
    unnecessaryTests: ['covid'],
    mustRecognizeFindings: [
      'New antiepileptic started two weeks ago',
      'Rapidly spreading painful rash with fever',
      'Oral and ocular mucosal erosions',
      'Skin peeling and positive Nikolsky sign',
      'Biopsy full-thickness epidermal necrosis',
      'Tachycardia hypotension fever',
      'Toxic appearance',
    ],
    commonMisses: [
      'Not linking rash to new medication',
      'Underestimating emergency and need to stop drug',
      'Missing mucosal involvement significance',
      'Treating as simple viral rash',
      'Delaying ophthalmology for eye involvement',
    ],
    correctDiagnosisExplanation: [
      'Stevens-Johnson syndrome is a severe cutaneous adverse reaction with epidermal necrosis, often drug-induced.',
      'Ashley\'s new AED, fever, mucosal erosions, detachment, and biopsy confirming SJS fit the diagnosis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Simple drug eruption',
        whyLessLikely:
          'Morbilliform rash without mucosal necrosis or epidermal detachment.',
      },
      {
        diagnosis: 'Toxic epidermal necrolysis',
        whyLessLikely:
          'Same spectrum; TEN defined by >30% BSA detachment — management overlaps.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Drug trigger 30, emergency 30, biopsy/support 15, diagnosis 25; bonus mucosa (+10).',
      'Stop the causative drug immediately — never rechallenge.',
      'SJS/TEN require burn-unit level supportive care when extensive.',
      'Ophthalmology consult is mandatory for ocular involvement.',
    ],
    vocabTerms: ['Stevens-Johnson syndrome', 'Nikolsky sign', 'toxic epidermal necrolysis', 'lamotrigine', 'SCAR'],
  },

  'graves-hyperthyroid-weight-loss': {
    keyHistoryQuestions: [
      'weight loss despite increased appetite',
      'heat intolerance and sweating',
      'palpitations tremor insomnia',
      'anxiety restlessness',
      'eye symptoms neck fullness',
      'onset over months',
      'family thyroid history',
    ],
    keyExamItems: ['general', 'heent', 'extremities'],
    criticalTests: ['tsh', 'free_t4', 'tsi'],
    unnecessaryTests: ['cbc'],
    mustRecognizeFindings: [
      'Unintentional weight loss with hyperphagia',
      'Heat intolerance and diaphoresis',
      'Palpitations and tachycardia',
      'Fine tremor and insomnia',
      'Diffuse goiter and mild exophthalmos',
      'Suppressed TSH with elevated free T4',
      'Positive thyroid-stimulating immunoglobulins',
    ],
    commonMisses: [
      'Diagnosing anxiety without thyroid labs',
      'Missing heat intolerance in review of systems',
      'Not examining thyroid or eyes',
      'Skipping TSI when Graves suspected',
      'Attributing weight loss to intentional fitness goals',
    ],
    correctDiagnosisExplanation: [
      'Graves disease is autoimmune stimulation of the thyroid causing hyperthyroidism, often with ophthalmopathy.',
      'Jessica\'s hypermetabolic symptoms, suppressed TSH, elevated T4, positive TSI, and exam findings confirm Graves hyperthyroidism.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Anxiety disorder',
        whyLessLikely:
          'Anxiety does not cause suppressed TSH, elevated T4, goiter, or positive TSI.',
      },
      {
        diagnosis: 'Pheochromocytoma',
        whyLessLikely:
          'Episodic hypertension and catecholamine excess; thyroid studies here show primary thyroid disease.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Hyperthyroid symptoms 30, thyroid studies 25, Graves findings 20, diagnosis 25; bonus eye findings (+10); deductions anxiety only (-20), miss heat (-10).',
      'Weight loss with increased appetite suggests hyperthyroidism over caloric deficit.',
      'TSH is the best initial screening test for thyroid dysfunction.',
      'TSI supports Graves when hyperthyroidism is confirmed.',
    ],
    vocabTerms: ['Graves disease', 'TSI', 'exophthalmos', 'thyrotoxicosis', 'methimazole'],
  },

  'hashimoto-hypothyroid-tired-cold': {
    keyHistoryQuestions: [
      'fatigue duration and progression',
      'cold intolerance weight gain',
      'constipation dry skin hair thinning',
      'concentration mood changes',
      'bradycardia symptoms',
      'family thyroid disease',
      'medications affecting thyroid',
    ],
    keyExamItems: ['general', 'skin', 'neuro'],
    criticalTests: ['tsh', 'free_t4', 'anti_tpo'],
    unnecessaryTests: ['ct_head'],
    mustRecognizeFindings: [
      'Progressive fatigue over months',
      'Weight gain and cold intolerance',
      'Dry skin constipation hair thinning',
      'Bradycardia and delayed reflexes',
      'Elevated TSH with low free T4',
      'Anti-TPO antibodies positive',
      'Facial puffiness without acute illness',
    ],
    commonMisses: [
      'Treating as depression without checking TSH',
      'Not asking about constipation and dry skin',
      'Missing delayed relaxation of reflexes',
      'Forgetting family history of autoimmune thyroid disease',
      'Skipping anti-TPO when Hashimoto is suspected',
    ],
    correctDiagnosisExplanation: [
      'Hashimoto thyroiditis is autoimmune destruction of thyroid tissue leading to hypothyroidism.',
      'Melissa\'s hypothyroid symptoms, high TSH, low T4, and positive anti-TPO confirm Hashimoto hypothyroidism.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Major depressive disorder',
        whyLessLikely:
          'Overlapping fatigue and mood symptoms but normal thyroid labs expected; here TSH and T4 are abnormal.',
      },
      {
        diagnosis: 'Anemia',
        whyLessLikely:
          'Causes fatigue; CBC normal and thyroid pattern is diagnostic.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Hypothyroid symptoms 30, thyroid labs 25, autoimmune pattern 20, diagnosis 25.',
      'TSH is the most sensitive initial test for primary hypothyroidism.',
      'Anti-TPO antibodies support Hashimoto etiology.',
      'Levothyroxine replacement normalizes TSH over weeks.',
    ],
    vocabTerms: ['Hashimoto thyroiditis', 'anti-TPO', 'hypothyroidism', 'levothyroxine', 'myxedema'],
  },

  't1dm-cant-stop-drinking-water': {
    keyHistoryQuestions: [
      'polyuria polydipsia duration',
      'nocturia weight loss',
      'fatigue irritability school performance',
      'family diabetes history',
      'vomiting abdominal pain breathing changes',
      'fever urinary symptoms',
      'medications steroids',
    ],
    keyExamItems: ['general'],
    criticalTests: ['fingerstick_glucose', 'hba1c', 'ua'],
    unnecessaryTests: ['ct_head'],
    mustRecognizeFindings: [
      'Excessive thirst and urination for weeks',
      'Nocturia and unintentional weight loss',
      'Fatigue and irritability in adolescent',
      'Dry mucous membranes',
      'Elevated glucose and HbA1c',
      'Glucosuria with ketones',
      'Lean child without fever',
    ],
    commonMisses: [
      'Missing glucose test in polydipsia workup',
      'Confusing with diabetes insipidus without checking glucose',
      'Not asking about nocturia and weight loss',
      'Ignoring positive ketones as DKA risk',
      'Attributing frequency to UTI without glucosuria context',
    ],
    correctDiagnosisExplanation: [
      'Type 1 diabetes mellitus results from autoimmune insulin deficiency with hyperglycemia and osmotic symptoms.',
      'Ryan\'s polyuria, polydipsia, weight loss, hyperglycemia, elevated HbA1c, and glucosuria confirm new-onset type 1 diabetes.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Diabetes insipidus',
        whyLessLikely:
          'Large volumes of dilute urine with normal glucose; Ryan has hyperglycemia and glucosuria.',
      },
      {
        diagnosis: 'Psychogenic polydipsia',
        whyLessLikely:
          'Excessive water intake without hyperglycemia or weight loss; labs show diabetes here.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Diabetes symptoms 30, glucose testing 25, polyuria-polydipsia 20, diagnosis 25.',
      'Classic triad in children: polyuria, polydipsia, weight loss.',
      'Fingerstick glucose is essential at first presentation.',
      'Check ketones to assess DKA risk at diagnosis.',
    ],
    vocabTerms: ['type 1 diabetes', 'polyuria', 'HbA1c', 'glucosuria', 'diabetic ketoacidosis'],
  },

  'cushing-face-looks-different': {
    keyHistoryQuestions: [
      'central weight gain facial changes',
      'easy bruising purple striae',
      'proximal muscle weakness',
      'mood changes',
      'exogenous steroid use all routes',
      'hypertension hyperglycemia symptoms',
      'menstrual changes',
    ],
    keyExamItems: ['general', 'skin', 'extremities'],
    criticalTests: ['late_night_salivary_cortisol', 'urine_cortisol_24h', 'dexamethasone_suppression_test'],
    unnecessaryTests: ['lipid'],
    mustRecognizeFindings: [
      'Moon facies and central obesity',
      'Purple abdominal striae wider than stretch marks from growth',
      'Easy bruising and thin skin',
      'Proximal muscle weakness',
      'Elevated urine and salivary cortisol',
      'Failed low-dose dexamethasone suppression',
      'Hypertension without exogenous steroid history',
    ],
    commonMisses: [
      'Labeling simple obesity without striae and suppression testing',
      'Not asking about inhalers injections topical steroids',
      'Missing proximal weakness on exam',
      'Skipping biochemical confirmation before imaging',
      'Ignoring psychiatric symptoms without cortisol workup',
    ],
    correctDiagnosisExplanation: [
      'Cushing syndrome is chronic glucocorticoid excess from endogenous overproduction or exogenous exposure.',
      'Amanda\'s cushingoid habitus, striae, weakness, elevated cortisol, and failed suppression confirm Cushing syndrome.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Obesity',
        whyLessLikely:
          'Lacks purple striae, proximal weakness, and abnormal cortisol suppression testing.',
      },
      {
        diagnosis: 'Exogenous glucocorticoids',
        whyLessLikely:
          'Most common cause of cushingoid features; thorough history negative after all routes reviewed.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Cortisol pattern 30, endocrine testing 25, physical findings 20, diagnosis 25; bonus striae (+10).',
      'Purple wide striae and proximal weakness are high-yield clues.',
      'Screen with late-night salivary cortisol or 24-hour urine cortisol.',
      'Localization follows biochemical confirmation of hypercortisolism.',
    ],
    vocabTerms: ['Cushing syndrome', 'dexamethasone suppression', 'moon facies', 'striae', 'hypercortisolism'],
  },

  'hyperparathyroid-recurrent-kidney-stones': {
    keyHistoryQuestions: [
      'number and type of kidney stones',
      'flank pain history',
      'fatigue constipation bone pain',
      'urinary frequency',
      'calcium supplement vitamin D use',
      'family stone or hypercalcemia history',
      'malignancy symptoms weight loss',
    ],
    keyExamItems: ['general', 'msk'],
    criticalTests: ['serum_calcium', 'pth', 'renal_ultrasound'],
    unnecessaryTests: ['ecg'],
    mustRecognizeFindings: [
      'Recurrent nephrolithiasis over years',
      'Hypercalcemia on laboratory testing',
      'Elevated PTH inappropriate for calcium',
      'Fatigue and constipation',
      'Bone pain and mild bone tenderness',
      'Renal ultrasound showing stones',
      'No malignancy history',
    ],
    commonMisses: [
      'Treating stones without checking serum calcium',
      'Not ordering PTH when calcium is elevated',
      'Missing bone pain and constipation as hypercalcemia clues',
      'Confusing with malignancy without suppressed PTH',
      'Attributing fatigue to dehydration alone',
    ],
    correctDiagnosisExplanation: [
      'Primary hyperparathyroidism is autonomous PTH secretion causing hypercalcemia, stones, and bone disease.',
      'George\'s recurrent stones, hypercalcemia, elevated PTH, and bone symptoms confirm primary hyperparathyroidism.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Hypercalcemia of malignancy',
        whyLessLikely:
          'PTH typically suppressed; here PTH is elevated with hypercalcemia.',
      },
      {
        diagnosis: 'Vitamin D deficiency',
        whyLessLikely:
          'Causes secondary hyperparathyroidism with low or normal calcium, not hypercalcemia.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Stone pattern 25, calcium/PTH 30, endocrine clues 20, diagnosis 25; bonus stones-bones-groans (+10).',
      'Recurrent calcium stones should prompt serum calcium and PTH.',
      'Remember stones, bones, abdominal groans, and psychiatric symptoms.',
      'Parathyroidectomy is curative for most primary disease when indicated.',
    ],
    vocabTerms: ['primary hyperparathyroidism', 'PTH', 'hypercalcemia', 'nephrolithiasis', 'parathyroidectomy'],
  },

  'sah-worst-headache-of-my-life': {
    keyHistoryQuestions: [
      'thunderclap onset maximal at start',
      'what patient was doing at onset exertion',
      'nausea vomiting photophobia',
      'neck stiffness meningismus',
      'prior similar headache',
      'focal neurologic symptoms',
      'anticoagulation trauma',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['ct_head', 'lumbar_puncture'],
    unnecessaryTests: ['cbc'],
    mustRecognizeFindings: [
      'Thunderclap headache 10/10 at onset',
      'Sudden onset during lifting groceries',
      'Neck stiffness and photophobia',
      'Vomiting without prior similar headache',
      'Hypertension and distress',
      'CT shows subarachnoid blood',
      'No focal weakness on screening exam',
    ],
    commonMisses: [
      'Diagnosing migraine without emergent CT',
      'Not asking about sudden maximal onset',
      'Ignoring neck stiffness as meningeal sign',
      'Delaying neuroimaging for analgesia only',
      'Missing exertional context at onset',
    ],
    correctDiagnosisExplanation: [
      'Subarachnoid hemorrhage is bleeding into the subarachnoid space, often from ruptured aneurysm.',
      'Jennifer\'s thunderclap headache with vomiting, photophobia, neck stiffness, and subarachnoid blood on CT confirms SAH.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Migraine',
        whyLessLikely:
          'Migraine rarely reaches maximal intensity instantly; prior similar headaches are usually present.',
      },
      {
        diagnosis: 'Meningitis',
        whyLessLikely:
          'Can overlap with meningeal signs, but CT demonstrates hemorrhage rather than infection alone.',
      },
      {
        diagnosis: 'Tension headache',
        whyLessLikely:
          'Typically bilateral band-like gradual pain, not explosive 10/10 thunderclap.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Thunderclap 35, emergent CT 25, neck stiffness 15, diagnosis 25; bonus aneurysm concern (+10).',
      'Thunderclap headache is SAH until proven otherwise — non-contrast CT first.',
      'LP for xanthochromia if CT negative and suspicion remains high.',
      'Control blood pressure and consult neurosurgery urgently.',
    ],
    vocabTerms: ['thunderclap headache', 'subarachnoid hemorrhage', 'xanthochromia', 'meningismus', 'aneurysm'],
  },

  'pe-em-cant-catch-breath': {
    keyHistoryQuestions: [
      'sudden dyspnea onset',
      'pleuritic chest pain with inspiration',
      'recent long flight immobilization',
      'oral contraceptive use',
      'leg swelling or calf pain',
      'fever cough infectious symptoms',
      'prior clot or thrombophilia',
    ],
    keyExamItems: ['respiratory', 'extremities', 'general'],
    criticalTests: ['ct_pulmonary_angiography', 'd_dimer'],
    unnecessaryTests: ['cbc'],
    mustRecognizeFindings: [
      'Sudden shortness of breath at rest',
      'Pleuritic chest pain worse with deep breath',
      'Hypoxia and tachycardia',
      'Recent 8-hour flight',
      'Oral contraceptive use',
      'Mild right calf tenderness',
      'Elevated D-dimer and CTPA filling defect',
    ],
    commonMisses: [
      'Attributing presentation to panic attack only',
      'Not asking about recent travel',
      'Missing OCP as VTE risk factor',
      'Skipping CTPA when suspicion moderate-high',
      'Anchoring on pneumonia without fever or infiltrate',
    ],
    correctDiagnosisExplanation: [
      'Pulmonary embolism is obstruction of pulmonary arterial flow, usually from venous thromboembolism.',
      'Rachel\'s sudden dyspnea, pleuritic pain, hypoxia, flight and OCP risks, and positive CTPA confirm PE.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Panic attack',
        whyLessLikely:
          'Does not explain objective hypoxia, pleuritic pattern, and clot on angiography.',
      },
      {
        diagnosis: 'Pneumonia',
        whyLessLikely:
          'No fever, productive cough, or infiltrate; immobilization and pleuritic pain favor PE.',
      },
      {
        diagnosis: 'STEMI',
        whyLessLikely:
          'Troponin and ECG without STEMI; CTPA shows pulmonary artery filling defect.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Risk factors 30, pleuritic pain 20, CTPA 25, diagnosis 25; deductions panic only (-25), miss travel (-15).',
      'Wells criteria and D-dimer guide need for CTPA.',
      'Treat anticoagulation when PE confirmed unless contraindicated.',
      'Investigate leg DVT and consider admission.',
    ],
    vocabTerms: ['pulmonary embolism', 'CTPA', 'D-dimer', 'Virchow triad', 'pleuritic pain'],
  },

  'dka-sugar-out-of-control': {
    keyHistoryQuestions: [
      'type 1 diabetes and insulin use',
      'insulin omission during illness',
      'vomiting abdominal pain',
      'polyuria polydipsia',
      'Kussmaul breathing fruity breath',
      'recent illness precipitant',
      'medications alcohol drugs',
    ],
    keyExamItems: ['general', 'respiratory', 'abdomen'],
    criticalTests: ['fingerstick_glucose', 'serum_ketones', 'cmp', 'abg'],
    unnecessaryTests: ['ct_abdomen'],
    mustRecognizeFindings: [
      'Type 1 diabetes with stopped insulin during GI illness',
      'Vomiting and abdominal pain',
      'Polyuria and polydipsia despite dehydration',
      'Kussmaul respirations and fruity breath',
      'Dry mucous membranes hypotension tachycardia',
      'Glucose greater than 450 with positive ketones',
      'High anion gap metabolic acidosis',
    ],
    commonMisses: [
      'Treating as gastroenteritis without checking glucose and ketones',
      'Not asking about insulin adherence',
      'Missing Kussmaul breathing as metabolic acidosis',
      'Forgetting potassium monitoring before insulin',
      'Confusing with HHS without prominent ketosis',
    ],
    correctDiagnosisExplanation: [
      'Diabetic ketoacidosis is insulin deficiency with hyperglycemia, ketogenesis, and anion gap acidosis.',
      'Brandon\'s T1DM, insulin omission, hyperglycemia, ketones, acidosis, and Kussmaul breathing confirm DKA.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Gastroenteritis',
        whyLessLikely:
          'May precipitate DKA but does not alone explain extreme hyperglycemia and ketosis.',
      },
      {
        diagnosis: 'Hyperosmolar syndrome',
        whyLessLikely:
          'HHS features extreme hyperglycemia with minimal ketosis; opposite metabolic picture here.',
      },
      {
        diagnosis: 'Sepsis',
        whyLessLikely:
          'Infection may trigger DKA; ketonemia and anion gap pattern define DKA in this case.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Diabetic emergency 30, glucose/ketones 25, Kussmaul 20, diagnosis 25; bonus dehydration (+10).',
      'Always check glucose and ketones in vomiting type 1 diabetic patients.',
      'Fluids, insulin, and potassium replacement per protocol.',
      'Search for precipitating infection while treating.',
    ],
    vocabTerms: ['DKA', 'Kussmaul respirations', 'anion gap acidosis', 'beta-hydroxybutyrate', 'insulin omission'],
  },

  'appendicitis-pain-moved-rlq': {
    keyHistoryQuestions: [
      'periumbilical pain migrating to RLQ',
      'anorexia nausea',
      'pain worse with movement',
      'fever timing',
      'diarrhea urinary symptoms',
      'duration and progression',
    ],
    keyExamItems: ['abdomen', 'general'],
    criticalTests: ['ct_abdomen', 'cbc'],
    unnecessaryTests: ['lipid'],
    mustRecognizeFindings: [
      'Pain migration from periumbilical to RLQ',
      'Anorexia and nausea',
      'Low-grade fever',
      'RLQ tenderness guarding rebound',
      'Positive Rovsing sign',
      'Elevated WBC',
      'CT inflamed appendix',
    ],
    commonMisses: [
      'Not asking about pain migration pattern',
      'Missing peritoneal signs on exam',
      'Delaying imaging with atypical early presentation',
      'Confusing with gastroenteritis when pain is focal',
      'Skipping pregnancy test in reproductive-age patients (not applicable here)',
    ],
    correctDiagnosisExplanation: [
      'Acute appendicitis is inflammation of the appendix, often requiring appendectomy.',
      'Kevin\'s migratory RLQ pain, peritoneal signs, leukocytosis, and CT inflammation confirm appendicitis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Gastroenteritis',
        whyLessLikely:
          'Usually diffuse cramping with diarrhea; focal RLQ peritonitis argues against.',
      },
      {
        diagnosis: 'Kidney stone',
        whyLessLikely:
          'Flank colic with hematuria; normal UA and migratory periumbilical history favor appendix.',
      },
      {
        diagnosis: 'Mesenteric adenitis',
        whyLessLikely:
          'Can mimic in youth after URI; CT identifies appendix as source here.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Migration 30, RLQ exam 20, imaging 25, diagnosis 25.',
      'Classic migration from periumbilical to McBurney point.',
      'CT accurate; ultrasound alternative in pregnancy.',
      'Surgical consult when diagnosis confirmed.',
    ],
    vocabTerms: ['appendicitis', 'Rovsing sign', 'McBurney point', 'periumbilical migration', 'peritonitis'],
  },

  'aortic-dissection-tearing-chest': {
    keyHistoryQuestions: [
      'tearing ripping chest pain quality',
      'radiation to back',
      'sudden onset during exertion',
      'hypertension history adherence',
      'blood pressure both arms',
      'syncope neurologic symptoms',
      'cocaine stimulant use',
    ],
    keyExamItems: ['general', 'cardiac', 'respiratory'],
    criticalTests: ['ct_aortic_angiography', 'cxr'],
    unnecessaryTests: ['lipid'],
    mustRecognizeFindings: [
      'Sudden tearing chest pain radiating to back',
      'Exertion at work when pain began',
      'Uncontrolled hypertension history',
      'Diaphoresis and severe distress',
      'Unequal arm blood pressures',
      'Possible pulse asymmetry',
      'CT intimal flap and widened mediastinum on CXR',
    ],
    commonMisses: [
      'Treating as STEMI without excluding dissection',
      'Not measuring BP in both arms',
      'Missing back radiation on history',
      'Giving anticoagulation or thrombolysis before imaging',
      'Ignoring hypertension as risk factor',
    ],
    correctDiagnosisExplanation: [
      'Aortic dissection is a tear in the aortic intima with blood entering the media, creating a false lumen.',
      'Marcus\'s tearing pain to the back, hypertension, arm BP differential, widened mediastinum, and CT flap confirm dissection.',
    ],
    differentialComparison: [
      {
        diagnosis: 'STEMI',
        whyLessLikely:
          'ECG nonspecific without diagnostic STEMI; tearing pain and BP asymmetry favor dissection; CTA shows flap.',
      },
      {
        diagnosis: 'Pulmonary embolism',
        whyLessLikely:
          'Pleuritic dyspnea pattern without tearing radiation or mediastinal widening on imaging.',
      },
      {
        diagnosis: 'GERD',
        whyLessLikely:
          'Not sudden ripping pain with hemodynamic asymmetry and intimal flap.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Tearing pain 30, unequal BP 25, CTA 20, diagnosis 25; bonus HTN (+10); deductions MI only (-20), miss back pain (-15).',
      'Check BP in both arms in acute chest pain.',
      'CT angiography is diagnostic; avoid thrombolysis until excluded.',
      'Beta-blockade and urgent surgical consult for type A.',
    ],
    vocabTerms: ['aortic dissection', 'intimal flap', 'mediastinal widening', 'Stanford classification', 'pulse deficit'],
  },

  'iron-deficiency-tired-months': {
    keyHistoryQuestions: [
      'fatigue duration and progression',
      'exertional dyspnea and dizziness',
      'menstrual blood loss',
      'pica or dietary iron intake',
      'pregnancy possibility',
      'GI bleeding symptoms',
      'family history anemia or bleeding',
    ],
    keyExamItems: ['general', 'cardiac'],
    criticalTests: ['cbc', 'iron_studies', 'ferritin'],
    unnecessaryTests: ['ct_head'],
    mustRecognizeFindings: [
      'Four months progressive fatigue',
      'Exertional shortness of breath',
      'Heavy menstrual bleeding post-IUD removal',
      'Pica for ice',
      'Conjunctival pallor and tachycardia',
      'Low hemoglobin with low MCV',
      'Low ferritin and reduced iron saturation',
    ],
    commonMisses: [
      'Not asking about menstrual blood loss',
      'Skipping iron studies after microcytic CBC',
      'Missing pica as clue to iron deficiency',
      'Forgetting pregnancy test in reproductive-age woman',
      'Attributing symptoms to depression without labs',
    ],
    correctDiagnosisExplanation: [
      'Iron deficiency anemia results from inadequate iron for hemoglobin synthesis, often from blood loss.',
      'Sarah\'s chronic fatigue, microcytic anemia, low ferritin, heavy menses, and pagophagia confirm iron deficiency anemia.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Hypothyroidism',
        whyLessLikely:
          'Causes fatigue but TSH is normal; does not explain microcytosis and low ferritin.',
      },
      {
        diagnosis: 'Major depressive disorder',
        whyLessLikely:
          'May overlap mood-wise but does not explain objective anemia and iron studies.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Fatigue 25, menstrual history 25, CBC/iron 25, diagnosis 25; bonus pica (+10); miss menses (-15).',
      'Always ask reproductive-age women about menstrual blood loss.',
      'Ferritin is the best lab for iron stores; low with high TIBC supports deficiency.',
      'Treat iron repletion and address bleeding source.',
    ],
    vocabTerms: ['iron deficiency anemia', 'ferritin', 'microcytic anemia', 'menorrhagia', 'pagophagia'],
  },

  'essential-hypertension-bp-high': {
    keyHistoryQuestions: [
      'home and clinic blood pressure readings',
      'headache vision chest symptoms',
      'diet sodium alcohol',
      'physical activity',
      'family history hypertension',
      'current medications NSAIDs',
      'sleep apnea symptoms',
    ],
    keyExamItems: ['general', 'cardiac'],
    criticalTests: ['cmp', 'ua', 'ecg'],
    unnecessaryTests: ['ct_head'],
    mustRecognizeFindings: [
      'Repeated elevated BP over months',
      'Home readings in hypertensive range',
      'Overweight and high sodium sedentary lifestyle',
      'Family history of hypertension',
      'Normal renal function and urinalysis',
      'Mild hyperlipidemia',
      'Normal ECG without acute changes',
    ],
    commonMisses: [
      'Relying on single office reading',
      'Not assessing home BP log',
      'Skipping baseline BMP and urinalysis',
      'Missing lifestyle and family history',
      'Ignoring cardiovascular risk factor screening',
    ],
    correctDiagnosisExplanation: [
      'Essential hypertension is chronically elevated BP without identifiable secondary cause after initial evaluation.',
      'Michael\'s persistent elevated readings, risk factors, and normal secondary workup confirm essential hypertension.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Secondary hypertension',
        whyLessLikely:
          'Suggested by hypokalemia, renal disease, or resistant HTN; BMP and UA normal here.',
      },
      {
        diagnosis: 'White-coat hypertension',
        whyLessLikely:
          'Possible component but home readings also elevated.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Chronic elevated BP 30, lifestyle 25, baseline eval 20, diagnosis 25.',
      'Confirm hypertension with multiple readings over time.',
      'Initial workup: BMP, urinalysis, lipids, HbA1c, and ECG as indicated.',
      'Lifestyle modification plus antihypertensives when indicated.',
    ],
    vocabTerms: ['essential hypertension', 'JNC guidelines', 'albuminuria', 'cardiovascular risk'],
  },

  'cap-cough-wont-go-away': {
    keyHistoryQuestions: [
      'cough duration and sputum character',
      'fever chills',
      'dyspnea and activity limitation',
      'smoking and COPD history',
      'COVID and influenza exposure or testing',
      'recent travel',
      'comorbidities',
    ],
    keyExamItems: ['general', 'respiratory'],
    criticalTests: ['cxr', 'cbc'],
    unnecessaryTests: ['lipid'],
    mustRecognizeFindings: [
      'Eight-day productive cough',
      'Fever and fatigue',
      'Hypoxia and tachypnea',
      'Right lower lobe crackles',
      'Elevated white blood cell count',
      'Right lower lobe infiltrate on chest X-ray',
      'Negative COVID testing in context',
    ],
    commonMisses: [
      'Treating as bronchitis without chest X-ray',
      'Not checking oxygen saturation',
      'Missing focal lung exam findings',
      'Delaying antibiotics when bacterial CAP confirmed',
      'Forgetting severity assessment for disposition',
    ],
    correctDiagnosisExplanation: [
      'Community-acquired pneumonia is acute infection of lung parenchyma acquired outside the hospital.',
      'Linda\'s fever, productive cough, hypoxia, leukocytosis, and RLL infiltrate confirm CAP.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Acute bronchitis',
        whyLessLikely:
          'Usually no infiltrate or significant hypoxia; self-limited viral course.',
      },
      {
        diagnosis: 'Viral URI',
        whyLessLikely:
          'Lacks focal consolidation and marked systemic illness.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Infection signs 25, imaging 25, connect findings 25, diagnosis 25.',
      'Obtain chest X-ray when CAP suspected with fever and focal exam.',
      'Assess severity with vitals, oxygen, and clinical scores.',
      'Empiric antibiotics target typical CAP pathogens when bacterial pneumonia diagnosed.',
    ],
    vocabTerms: ['community-acquired pneumonia', 'infiltrate', 'CURB-65', 'empiric antibiotics'],
  },

  'mdd-feel-down-all-time': {
    keyHistoryQuestions: [
      'depressed mood duration',
      'anhedonia and loss of interest',
      'sleep appetite weight changes',
      'concentration and functional impairment',
      'suicidal ideation plan intent',
      'mania or substance use history',
      'psychosocial stressors',
    ],
    keyExamItems: ['general'],
    criticalTests: ['phq9', 'tsh'],
    unnecessaryTests: ['ct_head'],
    mustRecognizeFindings: [
      'Two months persistent low mood',
      'Anhedonia and social withdrawal',
      'Insomnia and fatigue',
      'Poor concentration affecting academics',
      'Elevated PHQ-9',
      'Normal TSH and CBC',
      'Passive suicidal ideation without plan — requires safety assessment',
    ],
    commonMisses: [
      'Not screening for suicide with direct questions',
      'Diagnosing adjustment disorder without full symptom duration',
      'Skipping TSH to rule out hypothyroidism',
      'Not assessing functional impairment',
      'Missing bipolar history before starting antidepressant',
    ],
    correctDiagnosisExplanation: [
      'Major depressive disorder requires depressed mood or anhedonia plus associated symptoms causing functional impairment.',
      'Emily\'s two-month syndrome, elevated PHQ-9, normal medical labs, and functional decline meet MDD criteria.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Adjustment disorder',
        whyLessLikely:
          'Linked to stressor within three months and usually less pervasive; severity here favors MDD.',
      },
      {
        diagnosis: 'Hypothyroidism',
        whyLessLikely:
          'Normal TSH; thyroid disease ruled out as primary mimic.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Mood symptoms 30, functional impact 20, screening 20, diagnosis 30; bonus suicidality (+10).',
      'PHQ-9 screens but diagnosis requires clinical interview.',
      'Always ask suicide risk directly and document safety plan.',
      'Rule out medical mimics with TSH and CBC.',
    ],
    vocabTerms: ['major depressive disorder', 'PHQ-9', 'anhedonia', 'suicide risk assessment', 'SSRI'],
  },

  'osteoarthritis-knees-hurt-daily': {
    keyHistoryQuestions: [
      'pain location bilateral versus unilateral',
      'mechanical versus inflammatory pattern',
      'morning stiffness duration',
      'swelling redness fever',
      'prior injury',
      'functional limitation',
      'medications tried',
    ],
    keyExamItems: ['msk', 'general'],
    criticalTests: ['knee_xray'],
    unnecessaryTests: ['mri_spine'],
    mustRecognizeFindings: [
      'Chronic bilateral knee pain worse with activity',
      'Morning stiffness under thirty minutes',
      'Crepitus and bony enlargement without warmth',
      'No fever or systemic symptoms',
      'Joint space narrowing and osteophytes on X-ray',
      'Normal ESR and CRP',
      'Improves with rest',
    ],
    commonMisses: [
      'Not distinguishing inflammatory from mechanical pain',
      'Missing septic arthritis red flags',
      'Skipping imaging when diagnosis uncertain',
      'Ordering inflammatory labs without exam indication',
      'Overlooking weight and exercise counseling',
    ],
    correctDiagnosisExplanation: [
      'Osteoarthritis is degenerative joint disease with cartilage loss and osteophyte formation.',
      'George\'s activity-related pain, brief stiffness, exam crepitus, and radiographic changes confirm osteoarthritis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Rheumatoid arthritis',
        whyLessLikely:
          'Long morning stiffness, symmetric small joints, and elevated inflammatory markers; absent here.',
      },
      {
        diagnosis: 'Septic arthritis',
        whyLessLikely:
          'Presents with fever, hot swollen joint, and inability to bear weight; not present.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Mechanical pain 30, activity relationship 20, X-ray 20, diagnosis 30.',
      'Pain worse with use and better with rest suggests osteoarthritis.',
      'Brief morning stiffness distinguishes from inflammatory arthritis.',
      'Red flags: fever, redness, inability to bear weight — evaluate for septic joint.',
    ],
    vocabTerms: ['osteoarthritis', 'osteophyte', 'joint space narrowing', 'crepitus', 'NSAID'],
  },

  'acute-pancreatitis-pain-through-back': {
    keyHistoryQuestions: [
      'epigastric pain timing and severity',
      'radiation to back',
      'nausea vomiting',
      'alcohol and gallstone risk factors',
      'food exacerbation',
      'fever and hemodynamic status',
      'similar prior episodes',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['lipase', 'ct_abdomen'],
    unnecessaryTests: ['knee_xray'],
    mustRecognizeFindings: [
      'Severe epigastric pain radiating to back',
      'Nausea and repeated vomiting',
      'Pain worsened by eating',
      'Heavy alcohol use',
      'Epigastric tenderness with guarding',
      'Marked lipase elevation',
      'CT showing pancreatic inflammation',
    ],
    commonMisses: [
      'Not ordering lipase early in epigastric pain',
      'Missing back radiation on history',
      'Confusing with MI without ECG',
      'Assuming gastritis without enzymes',
      'Ignoring alcohol as precipitant',
    ],
    correctDiagnosisExplanation: [
      'Acute pancreatitis is pancreatic inflammation often from gallstones or alcohol with lipase elevation.',
      "Anthony's epigastric-back pain, vomiting, alcohol use, and lipase/CT findings confirm acute pancreatitis.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Acute cholecystitis',
        whyLessLikely:
          'RUQ-focused pain and ultrasound finding cholecystitis; epigastric radiation with high lipase points to pancreas.',
      },
      {
        diagnosis: 'ST-elevation MI',
        whyLessLikely:
          'ECG without STEMI; predominant lipase elevation and CT pancreas findings.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Pain pattern 30, lipase 25, alcohol 20, diagnosis 25; bonus gallstones (+10); deduction miss back (-15).',
      'Boring pain to the back is classic for pancreatitis.',
      'Lipase preferred over amylase in many centers.',
      'ECG remains important in epigastric pain to exclude ACS.',
    ],
    vocabTerms: ['acute pancreatitis', 'lipase', 'peripancreatic stranding', 'gallstone pancreatitis', 'Ranson criteria'],
  },

  'peptic-ulcer-burn-after-eating': {
    keyHistoryQuestions: [
      'dyspepsia timing versus meals',
      'nocturnal pain',
      'NSAID and aspirin use',
      'H. pylori risk',
      'alarm bleeding weight loss',
      'relief with food or antacids',
      'prior ulcer or H. pylori treatment',
    ],
    keyExamItems: ['abdomen'],
    criticalTests: ['h_pylori_test', 'upper_endoscopy'],
    unnecessaryTests: ['ct_head'],
    mustRecognizeFindings: [
      'Burning epigastric pain for weeks',
      'Worse delayed postprandially and at night',
      'Relief with small meals',
      'Frequent NSAID use',
      'Positive H. pylori test',
      'Possible mild anemia',
      'Endoscopic ulcer',
    ],
    commonMisses: [
      'Not asking about NSAIDs',
      'Skipping H. pylori testing in dyspepsia',
      'Missing alarm features needing urgent endoscopy',
      'Attributing symptoms to stress alone',
      'Treating long-term without eradication when indicated',
    ],
    correctDiagnosisExplanation: [
      'Peptic ulcer disease is mucosal break in stomach or duodenum often driven by H. pylori or NSAIDs.',
      "Jennifer's meal-related burning pattern, NSAIDs, positive H. pylori, and endoscopic ulcer confirm PUD.",
    ],
    differentialComparison: [
      {
        diagnosis: 'GERD',
        whyLessLikely:
          'Retrosubsternal burning and postural symptoms dominate GERD; her pattern and ulcer on EGD fit PUD.',
      },
      {
        diagnosis: 'Functional dyspepsia',
        whyLessLikely:
          'Organic ulcer and H. pylori exclude functional diagnosis as primary.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Ulcer symptoms 25, med history 25, H. pylori 25, diagnosis 25.',
      'Always review NSAID and aspirin exposure.',
      'Test-and-treat versus endoscopy depends on age and alarms.',
      'Eradication plus PPI heals most H. pylori ulcers.',
    ],
    vocabTerms: ['peptic ulcer disease', 'H. pylori', 'NSAID gastropathy', 'PPI', 'test-and-treat'],
  },

  'ulcerative-colitis-running-bathroom': {
    keyHistoryQuestions: [
      'diarrhea duration and blood',
      'urgency tenesmus',
      'weight loss fatigue fever',
      'travel and antibiotics',
      'joint skin symptoms',
      'family IBD history',
      'prior similar episodes',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['colonoscopy', 'stool_pathogen_panel', 'esr_crp'],
    unnecessaryTests: ['knee_xray'],
    mustRecognizeFindings: [
      'Weeks of bloody diarrhea with urgency',
      'Weight loss and fatigue',
      'Low-grade fever',
      'Pale appearance anemia',
      'Elevated inflammatory markers',
      'Negative stool pathogens',
      'Continuous colitis from rectum on colonoscopy',
    ],
    commonMisses: [
      'Labeling chronic bloody diarrhea as IBS',
      'Starting steroids without ruling out infection',
      'Skipping colonoscopy for definitive diagnosis',
      'Not assessing nutritional status',
      'Forgetting extraintestinal manifestations',
    ],
    correctDiagnosisExplanation: [
      'Ulcerative colitis is idiopathic continuous colonic inflammation beginning distally.',
      "Daniel's bloody diarrhea, systemic signs, elevated markers, and colonoscopy distribution confirm UC.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Infectious colitis',
        whyLessLikely:
          'Negative stool workup and subacute course with weight loss favor IBD.',
      },
      {
        diagnosis: 'Crohn disease',
        whyLessLikely:
          'Continuous inflammation from rectum without skip areas favors UC.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): IBD pattern 30, colonoscopy 25, blood/weight loss 20, diagnosis 25.',
      'Blood plus weight loss is not IBS.',
      'Rule out C. difficile before immunosuppression.',
      'UC requires long-term gastroenterology care and cancer surveillance.',
    ],
    vocabTerms: ['ulcerative colitis', 'continuous colitis', 'mesalamine', 'infliximab', 'toxic megacolon'],
  },

  'acute-hepatitis-b-yellow-eyes': {
    keyHistoryQuestions: [
      'jaundice onset',
      'dark urine pale stools',
      'anorexia nausea fatigue',
      'sexual blood exposure tattoos',
      'alcohol medications supplements',
      'travel raw shellfish',
      'sick contacts',
    ],
    keyExamItems: ['heent', 'abdomen', 'skin'],
    criticalTests: ['hepatitis_panel', 'lft', 'us_ruq'],
    unnecessaryTests: ['colonoscopy'],
    mustRecognizeFindings: [
      'Scleral icterus and jaundice',
      'Fatigue nausea anorexia',
      'Dark urine',
      'Low-grade fever',
      'Markedly elevated transaminases',
      'HBsAg positive acute pattern',
      'RUQ ultrasound without obstruction',
    ],
    commonMisses: [
      'Not ordering hepatitis serologies in jaundice',
      'Missing sexual exposure history',
      'Confusing obstructive pattern without imaging',
      'Ignoring synthetic function and encephalopathy monitoring',
      'Failing to counsel on transmission prevention',
    ],
    correctDiagnosisExplanation: [
      'Acute hepatitis B is HBV infection with hepatocellular injury and icterus.',
      "Brian's jaundice, transaminitis, and positive HBsAg with exposure history confirm acute HBV.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Hepatitis A',
        whyLessLikely: 'Serology shows acute HBV pattern; HAV IgM negative.',
      },
      {
        diagnosis: 'Alcoholic hepatitis',
        whyLessLikely: 'Minimal alcohol; viral serology explains illness.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Jaundice 25, hepatitis labs 25, exposure 20, diagnosis 30.',
      'HBV, HAV, HCV testing belongs in acute jaundice workup.',
      'RUQ US excludes obstructive cholestasis.',
      'Monitor INR and mental status for acute liver failure.',
    ],
    vocabTerms: ['hepatitis B', 'HBsAg', 'anti-HBc IgM', 'fulminant hepatitis', 'tenofovir'],
  },

  'colon-cancer-feel-full-all-time': {
    keyHistoryQuestions: [
      'early satiety and appetite change',
      'unintentional weight loss',
      'bowel habit change',
      'rectal bleeding or melanotic stool',
      'iron deficiency symptoms',
      'family colorectal cancer polyposis',
      'prior screening colonoscopy',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['colonoscopy', 'stool_occult_blood', 'cbc'],
    unnecessaryTests: ['phq9'],
    mustRecognizeFindings: [
      'Early satiety and fatigue',
      'Weight loss without dieting',
      'Altered bowel habits',
      'Blood per rectum',
      'Family history of young-onset colon cancer',
      'Iron deficiency anemia',
      'Positive FIT and colon mass on endoscopy',
    ],
    commonMisses: [
      'Attributing bleeding to hemorrhoids without exam or workup',
      'Delaying colonoscopy for alarm features',
      'Ignoring family history for screening intensity',
      'Missing iron deficiency as bleed clue',
      'Assuming functional bowel symptoms in older adults',
    ],
    correctDiagnosisExplanation: [
      'Colorectal cancer often presents with occult bleeding, iron deficiency, and change in bowel habits.',
      "Margaret's alarms, iron deficiency, positive occult blood, and mass lesion confirm colorectal cancer.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Irritable bowel syndrome',
        whyLessLikely:
          'No weight loss or anemia expected; mass and pathology contradict IBS alone.',
      },
      {
        diagnosis: 'Hemorrhoids',
        whyLessLikely:
          'Does not explain mass, iron deficiency, and early satiety pattern.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Warning signs 30, colonoscopy 25, weight/blood 20, diagnosis 25; bonus family hx (+10).',
      'Iron deficiency anemia in adults merits GI blood loss evaluation.',
      'Colonoscopy diagnoses and allows tissue sampling.',
      'Early detection improves outcomes — emphasize screening guidelines.',
    ],
    vocabTerms: ['colorectal cancer', 'FIT', 'adenocarcinoma', 'CEA', 'Lynch syndrome'],
  },

  'acute-stroke-face-feels-strange': {
    keyHistoryQuestions: [
      'time last known well and sudden versus gradual onset',
      'facial weakness arm weakness and speech changes',
      'witness description and seizure or trauma exclusion',
      'vascular risk factors hypertension diabetes atrial fibrillation',
      'anticoagulation antiplatelet medication review',
      'prior similar transient events',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['ct_head', 'cta_head_neck', 'glucose', 'fingerstick_glucose'],
    unnecessaryTests: ['lipid', 'tsh'],
    mustRecognizeFindings: [
      'Sudden focal neuro deficit involving face arm and language',
      'Central pattern facial weakness not isolated to seventh nerve',
      'Slurred speech and expressive aphasia elements',
      'Arm drift or weakness contralateral to facial droop',
      'Hypertension and diabetes as stroke risk factors',
      'Non-contrast CT may appear early normal with infarct on MRI DWI',
      'CTA suggesting large vessel occlusion when present',
    ],
    commonMisses: [
      'Anchoring on Bell palsy despite limb involvement and aphasia',
      'Forgetting to document last known well time for reperfusion',
      'Not obtaining glucose before attributing deficit to stroke',
      'Omitting vessel imaging when large vessel occlusion suspected',
      'Assuming early non-contrast CT normal excludes treatable acute stroke',
    ],
    correctDiagnosisExplanation: [
      'Acute ischemic stroke is focal brain infarction from arterial occlusion or hypoperfusion with time-dependent treatment options.',
      "Charles's abrupt hemiface and arm involvement with dysarthria/aphasia and MRI diffusion lesion confirms acute ischemic stroke over mimics.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Bell palsy',
        whyLessLikely:
          'Isolated peripheral facial nerve palsy does not produce arm weakness and aphasia; forehead may be involved in peripheral palsy.',
      },
      {
        diagnosis: 'Hypoglycemia',
        whyLessLikely:
          'Focal deficit may mimic stroke but normal glucose excludes common reversible mimic.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): stroke symptoms 35, sudden onset 20, emergent imaging 25, diagnosis 20; thrombolysis window bonus +10; Bell palsy only anchor -20; miss speech -15.',
      'Activate stroke team early — door-to-imaging and door-to-needle metrics matter.',
      'CT excludes hemorrhage; MRI DWI confirms ischemia; CTA maps thrombus location.',
      'Blood pressure management follows protocol — avoid casual lowering in acute window without guidance.',
    ],
    vocabTerms: ['last known well', 'NIHSS', 'LVO', 'DWI', 'tPA'],
  },

  'migraine-terrible-headaches-samantha': {
    keyHistoryQuestions: [
      'headache frequency duration and disability',
      'visual sensory or speech prodrome before pain',
      'photophobia phonophobia nausea and vomiting',
      'relief with sleep darkness hydration or medications',
      'red flags thunderclap onset fever stiff neck',
      'menstrual association caffeine sleep deprivation',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['neurologic_exam_bedside'],
    unnecessaryTests: ['ct_pulmonary_angiography'],
    mustRecognizeFindings: [
      'Recurrent episodic disabling headaches over years',
      'Reversible visual aura before headache in stereotyped pattern',
      'Photophobia and phonophobia with nausea',
      'Resolution through sleep and environment dark quiet room',
      'Completely normal detailed neurologic exam between attacks',
      'MRI without explanatory structural lesion when obtained',
    ],
    commonMisses: [
      'Ordering routine brain MRI for every classic primary headache without red flags',
      'Mislabeling migraine as sinusitis from facial pressure descriptors',
      'Missing secondary headache features that demand urgent imaging',
      'Underestimating functional impact in young women leading to inadequate treatment plan',
      'Not asking aura specifics distinguishing migrainous aura from TIA amaurosis fugax timing',
    ],
    correctDiagnosisExplanation: [
      'Migraine with aura is recurrent headache disorder with reversible focal cortical symptoms preceding or accompanying head pain.',
      "Samantha's scintillating visual symptoms followed by unilateral throbbing headache with nausea and sensory sensitivity between normal exams defines migraine with aura.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Tension-type headache',
        whyLessLikely: 'Lacks prolonged visual aura and severe migrainous nausea photophobia pattern.',
      },
      {
        diagnosis: 'Brain tumor',
        whyLessLikely:
          'Progressive exam abnormalities or seizure would be expected; stereotyped reversible aura with normal MRI argues against mass.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): aura 30, associated symptoms 25, history use 20, diagnosis 25.',
      'Red flags — thunderclap onset systemic illness focal persistent deficit papilledema immunosuppression.',
      'Neuro exam between attacks is key low-cost test.',
      'Acute and preventive pharmacologic and behavioral strategies improve quality of life.',
    ],
    vocabTerms: ['aura', 'photophobia', 'phonophobia', 'triptan', 'CGRP antagonist'],
  },

  'parkinson-hands-shaking-harold': {
    keyHistoryQuestions: [
      'rest versus action tremor and which body parts',
      'rigidity slowness gait freezing and falls',
      'reduced facial expression micrographia hyposmia',
      'medication review especially dopamine blocking antiemetics antipsychotics',
      'family history tremor and alcohol responsiveness',
      'sleep acting out dreams constipation autonomic symptoms',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['neurologic_exam_bedside', 'dat_scan'],
    unnecessaryTests: ['ct_pulmonary_angiography'],
    mustRecognizeFindings: [
      'Resting pill-rolling asymmetric tremor',
      'Cogwheel rigidity on passive movement',
      'Bradykinesia on rapid alternating movements',
      'Hypomimia masked facies',
      'Reduced arm swing and shuffling steps',
      'DaTscan supporting presynaptic dopaminergic deficit when obtained',
    ],
    commonMisses: [
      'Calling essential tremor without noting action predominance and bilateral symmetry tendency',
      'Missing drug-induced parkinsonism from metoclopramide or antipsychotics on med list',
      'Attributing slow gait to normal aging without timed up-and-go or pull test',
      'Skipping mood sleep and autonomic screening important to quality of life',
      'Expecting imaging alone to diagnose PD — clinical exam remains gold standard',
    ],
    correctDiagnosisExplanation: [
      'Parkinson disease is progressive neurodegeneration with Lewy pathology causing rest tremor rigidity bradykinesia.',
      "Harold's rest tremor cogwheel rigidity bradykinesia masked facies and supportive DaTscan fit idiopathic Parkinson disease.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Essential tremor',
        whyLessLikely:
          'Postural kinetic tremor often bilateral with head or voice involvement improves transiently with alcohol — lacks prominent rest tremor and rigidity here.',
      },
      {
        diagnosis: 'Medication-induced parkinsonism',
        whyLessLikely:
          'Temporal relation to dopamine blockers absent recently — still always verify medication reconciliation.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): rest tremor 25, rigidity bradykinesia 25, clinical findings 25, diagnosis 25.',
      'UK brain bank clinical criteria anchor diagnosis before advanced imaging.',
      'DaTscan helps tremor disclosures distinguishing ET from PD when exam ambiguous.',
      'Atypical features — poor levodopa response early postural instability vertical gaze palsy prompt alternate diagnoses.',
    ],
    vocabTerms: ['bradykinesia', 'cogwheel rigidity', 'hypomimia', 'DaTscan', 'levodopa'],
  },

  'seizure-at-school-noah': {
    keyHistoryQuestions: [
      'witnessed movements and duration both sides',
      'loss of consciousness tongue biting incontinence',
      'postictal confusion sleepiness duration',
      'prodrome triggers sleep deprivation illness alcohol drugs',
      'prior similar events or family epilepsy',
      'head trauma pregnancy sickle cell context',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['fingerstick_glucose', 'glucose', 'eeg', 'ct_head'],
    unnecessaryTests: ['colonoscopy'],
    mustRecognizeFindings: [
      'Generalized convulsive shaking witnessed bilaterally',
      'Transient loss of consciousness',
      'Postictal confusion and fatigue afterward',
      'Lateral tongue laceration suggesting bite during convulsion',
      'Afebrile first-time event in adolescence',
      'EEG demonstrating generalized epileptiform discharges',
      'Normal metabolic panel without provoking hypoglycemia or severe hyponatremia',
    ],
    commonMisses: [
      'Mislabeling seizure as vasovagal without detailed witness interview',
      'Skipping glucose check in all patients with altered LOC or convulsion',
      'Discharging without EEG or neurology follow-up plan for first unprovoked seizure',
      'Missing substance use that lowers threshold in teenager',
      'Neglecting driving water safety counseling while laws vary by jurisdiction',
    ],
    correctDiagnosisExplanation: [
      'Generalized tonic-clonic seizure is bilateral convulsive activity with postictal phase often from idiopathic genetic epilepsy or acquired cause in some.',
      "Noah's witnessed bilateral convulsion tongue trauma postictal confusion and EEG epileptiform activity support new-onset generalized tonic-clonic seizure after excluding acute metabolic cause.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Vasovagal syncope',
        whyLessLikely:
          'Brief LOC with quick recovery typical; prolonged convulsive activity and lateral tongue bite favor seizure.',
      },
      {
        diagnosis: 'Hypoglycemic seizure',
        whyLessLikely: 'Rapidly corrected hypoglycemia can mimic seizure but glucose normal here.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): seizure features 30, EEG 25, postictal state 20, diagnosis 25.',
      'First seizure evaluation includes glucose labs toxicology context age-appropriate imaging.',
      'Lateral tongue bite has higher specificity for seizure than medial bite patterns described in syncope literature.',
      'Shared decision on antiseizure medication after discussing recurrence risk benefits and side effects.',
    ],
    vocabTerms: ['postictal', 'Todd paralysis', 'epileptiform', 'ASM', 'first unprovoked seizure'],
  },

  'ms-vision-legs-relapsing-rachel': {
    keyHistoryQuestions: [
      'discrete relapses versus gradual progression',
      'unilateral painful vision loss and uhtoff phenomena heat sensitivity',
      'sensory levels weakness bladder bowel changes',
      'multisystem symptoms fatigue cognitive fog',
      'autoimmune family history and prior neurologic workup',
      'infectious prodrome mononucleosis-like illness vaccination proximity',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['mri_brain', 'mri_spine', 'lumbar_puncture'],
    unnecessaryTests: ['colonoscopy'],
    mustRecognizeFindings: [
      'Relapsing remitting neurological episodes over time',
      'Prior monocular subacute visual disturbance with color desaturation and movement pain',
      'Objective hyperreflexia and sensory disturbance on exam',
      'Disseminated white matter demyelinating lesions on MRI brain and cord',
      'CSF oligoclonal bands showing intrathecal IgG synthesis',
      'VEP delay reflecting prior optic nerve demyelination',
    ],
    commonMisses: [
      'Anchoring on anxiety or deconditioning without objective reflex asymmetry',
      'Skipping spine MRI missing cord lesions for dissemination criteria',
      'Forgetting B12 copper thyroid and lupus serologies as treatable mimics',
      'Confusing ADEM monophasic illness with adult relapsing course',
      'Overlooking NMOSD aquaporin-4 antibody context if severe optic or cord events',
    ],
    correctDiagnosisExplanation: [
      'Multiple sclerosis is immune-mediated demyelination of CNS with relapses and MRI evidence of dissemination in space and time.',
      "Rachel's relapsing optic and myelopathic symptoms plaques on brain and spine MRI and oligoclonal bands fulfill demyelinating diagnosis criteria.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Stroke',
        whyLessLikely:
          'Vascular territory deficits acute single timecourse not multiphasic demyelinating plaques pattern.',
      },
      {
        diagnosis: 'Vitamin B12 deficiency',
        whyLessLikely:
          'Can cause cord and neuro findings — check levels but demyelinating plaque morphology and OCB support MS layered workup.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): relapsing pattern 30, MRI 25, visual clues optic neuritis 20, diagnosis 25; optic neuritis clue bonus +10.',
      'McDonald criteria integrate clinical MRI and CSF parameters over time.',
      'Optic neuritis common first relapse — pain with eye movement and color desaturation.',
      'High efficacy DMT early may reduce long-term disability in aggressive MS.',
    ],
    vocabTerms: ['demyelination', 'oligoclonal bands', 'Dawson fingers', 'Uhthoff', 'DMT'],
  },

  'incarcerated-hernia-groin-lump-frank': {
    keyHistoryQuestions: [
      'chronic groin bulge and prior reducibility',
      'acute pain onset and heavy lifting trigger',
      'ability to reduce mass currently versus baseline',
      'nausea vomiting obstipation signs',
      'fever tachycardia skin changes over mass',
      'previous hernia repair attempts or bedside reduction risks',
    ],
    keyExamItems: ['general', 'abdomen', 'other'],
    criticalTests: ['abdominal_exam_focused', 'ct_abdomen', 'cbc'],
    unnecessaryTests: ['ct_head', 'phq9'],
    mustRecognizeFindings: [
      'Long-standing reducible inguinal hernia history',
      'New nonreducible tender firm groin mass after exertion',
      'Nausea suggesting possible obstructive physiology',
      'CT showing bowel loop within inguinal sac',
      'Mild leukocytosis with risk of strangulation evolution',
      'Tachycardia as stress response and early sepsis marker',
      'Distinct scrotal exam need to exclude torsion in males',
    ],
    commonMisses: [
      'Assuming muscle strain without groin exam in lifters',
      'Labeling hydrocele without imaging distinguishing hernia bowel',
      'Attempting forceful reduction without ruling out peritonitis',
      'Missing strangulated hernia signs of skin changes fever lactate',
      'Omitting surgical consult while awaiting unnecessary additional tests',
    ],
    correctDiagnosisExplanation: [
      'Incarcerated inguinal hernia is irreducible hernia sac contents unable to return to peritoneal cavity with risk of strangulation.',
      "Frank's chronic hernia now acutely painful nonreducible after lifting with CT incarcerated bowel matches incarceration requiring urgent operative evaluation.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Strangulated inguinal hernia',
        whyLessLikely:
          'Strangulation implies ischemic bowel — may evolve from incarceration; cannot be excluded without exploration if toxicity rises.',
      },
      {
        diagnosis: 'Testicular torsion',
        whyLessLikely:
          'Acute scrotal emergency — imaging here demonstrates hernia incarceration; still requires careful testicular assessment.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): surgical urgency 30, nonreducible history 25, imaging 20, diagnosis 25; strangulation bonus +10; miss groin history -15.',
      'Time matters — bowel ischemia converts elective hernia into emergency.',
      'Ultrasound complements CT in selected patients especially radiation concerns.',
      'Always reconcile medication anticoagulation before bedside manipulation decisions.',
    ],
    vocabTerms: ['incarceration', 'strangulation', 'inguinal canal', 'reducible', 'manual reduction'],
  },

  'acute-cholecystitis-ruq-maria-torres': {
    keyHistoryQuestions: [
      'fatty meal or large food trigger',
      'pain migration epigastrium to right upper quadrant',
      'fever nausea vomiting pattern',
      'Murphy sign inspiratory arrest history',
      'prior similar biliary colic episodes',
      'pregnancy medications lipid disorders',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['us_ruq', 'cbc', 'lipase', 'cmp'],
    unnecessaryTests: ['ct_pulmonary_angiography'],
    mustRecognizeFindings: [
      'Postprandial often fatty trigger',
      'Epigastric pain shifting to RUQ',
      'Fever and leukocytosis',
      'Positive Murphy sign on exam',
      'Ultrasound gallstones wall thickening pericholecystic fluid',
      'Normal lipase arguing against pancreatitis as primary',
      'Mild transaminitis compatible with gallbladder inflammation',
    ],
    commonMisses: [
      'Anchoring on GERD without ultrasound in febrile focal RUQ patient',
      'Ordering only lipase without RUQ imaging',
      'Ignoring Murphy sign technique sensitivity',
      'Missing gangrene or emphysematous change when septic',
      'Forgetting anticoagulation impact on cholecystostomy pathways',
    ],
    correctDiagnosisExplanation: [
      'Acute cholecystitis is cystic duct obstruction with gallbladder inflammation often calculous.',
      "Maria's meal trigger migratory pain fever RUQ exam and confirmatory ultrasound establish acute cholecystitis.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Acute pancreatitis',
        whyLessLikely:
          'Lipase normal and ultrasound gallbladder inflammation present — pancreatitis less likely primary.',
      },
      {
        diagnosis: 'Peptic ulcer disease',
        whyLessLikely:
          'Ulcer may cause epigastric pain but fever Murphy and gallbladder imaging findings localize to biliary tree.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): RUQ pattern 30, ultrasound 25, meal relationship 20, diagnosis 25.',
      'Tokyo guidelines help severity and urgency stratification in real care.',
      'Early laparoscopic cholecystectomy when safe reduces recurrence.',
      'Common bile duct stones require ERCP pathway when cholestasis dominates.',
    ],
    vocabTerms: ['Murphy sign', 'pericholecystic fluid', 'cholelithiasis', 'Tokyo', 'laparoscopic cholecystectomy'],
  },

  'small-bowel-obstruction-distention-richard-hayes': {
    keyHistoryQuestions: [
      'distention onset and cramping pattern',
      'last bowel movement and flatus passage',
      'vomiting bilious versus feculent',
      'prior abdominal surgeries adhesions risk',
      'history hernias malignancy radiation',
      'prior similar obstruction episodes',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['abdominal_xray', 'ct_abdomen', 'cbc', 'cmp'],
    unnecessaryTests: ['phq9'],
    mustRecognizeFindings: [
      'Progressive abdominal distention',
      'Cramping colicky pain with vomiting',
      'Obstipation — no stool or flatus',
      'Prior surgery predisposing to adhesions',
      'Dilated loops and air-fluid levels on plain film',
      'CT transition point suggesting mechanical obstruction',
      'Tachycardia suggesting dehydration or sepsis evolving',
    ],
    commonMisses: [
      'Calling simple constipation without imaging in complete obstruction pattern',
      'Missing closed loop strangulation on CT when present',
      'Providing aggressive laxatives contraindicated in obstruction',
      'Under-resuscitating emesis and third spacing losses',
      'Underestimating ileus without transition but patient looks obstructed',
    ],
    correctDiagnosisExplanation: [
      'Small bowel obstruction is mechanical blockage of small intestine often from adhesions hernia or tumor.',
      "Richard's surgical adhesions risk obstipation distention emesis and CT transition represent adhesive small bowel obstruction.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Paralytic ileus',
        whyLessLikely:
          'Ileus often postoperative diffuse dilation without clear transition — CT shows mechanical point here.',
      },
      {
        diagnosis: 'Gastroenteritis',
        whyLessLikely:
          'Diarrhea common and obstruction imaging absent — here obstipation and air-fluid levels contradict.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): obstruction pattern 30, surgical history 20, imaging 25, diagnosis 25.',
      'Partial obstruction sometimes trial NPO NG suction IV fluids before surgery.',
      'Peritoneal signs mandate exploration without prolonged observation.',
      'Recurrent adhesive SBO may merit lyse adhesions surgery elective planning.',
    ],
    vocabTerms: ['transition point', 'air-fluid level', 'adhesions', 'NG tube', 'strangulated obstruction'],
  },

  'perirectal-abscess-sit-pain-kevin-morris': {
    keyHistoryQuestions: [
      'localized perianal pain duration progression',
      'worse sitting versus bowel movement pain',
      'fever chills systemic symptoms',
      'prior hemorrhoid fissure fistula history',
      'immunosuppression diabetes IVDU',
      'sexual practices and STI exposures if relevant',
    ],
    keyExamItems: ['general', 'abdomen', 'other'],
    criticalTests: ['perianal_exam_focused', 'cbc', 'ct_abdomen'],
    unnecessaryTests: ['tsh'],
    mustRecognizeFindings: [
      'Progressive localized perianal pain',
      'Fever with leukocytosis',
      'Fluctuant erythematous perianal mass',
      'Pain disproportionately worse sitting',
      'Absence of diffuse abdominal peritonitis initially',
      'CT pelvic fluid collection when deep extension questioned',
      'Cryptoglandular infection source conceptually',
    ],
    commonMisses: [
      'Prescribing steroids or antibiotics alone without drainage for mature abscess',
      'Mislabeling thrombosed hemorrhoid when fluctuance and fever dominate',
      'Missing necrotizing fasciitis pain out of proportion',
      'Skipping exam due to discomfort delaying diagnosis',
      'Confusing pilonidal midline abscess location without inspection',
    ],
    correctDiagnosisExplanation: [
      'Perirectal abscess is bacterial infection with pus in perianal spaces often cryptoglandular origin.',
      "Kevin's localized tender fluctuant mass fever leukocytosis and imaging collection define perirectal abscess.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Hemorrhoids',
        whyLessLikely:
          'Thrombosed hemorrhoid painful but infection systemic signs and abscess cavity differ unless superinfected.',
      },
      {
        diagnosis: 'Anal fissure',
        whyLessLikely:
          'Linear tear produces defecation pain — dominant fluctuant mass and fever point to abscess.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): infection pattern 25, fluctuant mass 25, exam use 25, diagnosis 25.',
      'Drainage is definitive for accessible abscess — antibiotics supplement cellulitis.',
      'Evaluate for fistula after infection resolves.',
      'Consider HIV and diabetes in recurrent or atypical infections.',
    ],
    vocabTerms: ['fluctuance', 'cryptoglandular', 'ischiorectal', 'incision and drainage', 'fistula'],
  },

  'perforated-ulcer-rigid-walter-green': {
    keyHistoryQuestions: [
      'sudden versus gradual pain onset',
      'NSAID aspirin use duration quantity',
      'history peptic ulcer H pylori prior endoscopy',
      'prior GI bleed melena hematemesis',
      'radiation pattern shoulder referred pain',
      'beta blocker masking tachycardia consideration',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['cxr', 'ct_abdomen', 'cbc', 'cmp'],
    unnecessaryTests: ['phq9'],
    mustRecognizeFindings: [
      'Sudden severe generalized abdominal pain',
      'Rigid abdomen rebound guarding diffuse',
      'Pneumoperitoneum on upright chest film',
      'NSAID chronic use raising ulcer perforation risk',
      'Hypotension tachycardia suggesting septic shock physiology',
      'Leukocytosis left shift',
      'Elderly or immunosuppressed may have muted exam',
    ],
    commonMisses: [
      'Delaying surgery for CT when exam classic and unstable',
      'Attributing to musculoskeletal strain without inspection or imaging',
      'Missing perforated diverticulitis without CT localization',
      'Forgetting steroid or NSAID contribution in elderly silent abdomen',
      'Inadequate resuscitation before anesthetic induction',
    ],
    correctDiagnosisExplanation: [
      'Perforated peptic ulcer is full-thickness defect leaking air and gastric duodenal contents causing chemical then bacterial peritonitis.',
      "Walter's sudden board-like abdomen NSAID history and subdiaphragmatic free air identify perforated peptic ulcer as leading diagnosis.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Acute pancreatitis',
        whyLessLikely:
          'No widespread pneumoperitoneum hallmark — pancreatitis does not produce free air under diaphragm typically.',
      },
      {
        diagnosis: 'Bowel obstruction perforation',
        whyLessLikely:
          'Can cause free air — CT often clarifies primary pathology whether colonic versus gastroduodenal.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): surgical abdomen 35, imaging 20, NSAID risk 20, diagnosis 25; peritonitis bonus +10.',
      'Upright CXR remains rapid pneumoperitoneum screen.',
      'Triple therapy risk review — NSAIDs steroids anticoagulation synergize ulcer bleeding perforation.',
      'Early operative repair and washout reduce sepsis mortality.',
    ],
    vocabTerms: ['pneumoperitoneum', 'peritonitis', 'rigid abdomen', 'omental patch', 'H pylori'],
  },

  'sepsis-pyelo-shaking-lauren-mitchell': {
    keyHistoryQuestions: [
      'fever rigors onset trajectory',
      'dysuria hematuria frequency',
      'flank or suprapubic pain',
      'nausea vomiting oral intake',
      'lightheadedness or syncope',
      'recent hospitalization antibiotics catheters',
      'pregnancy kidney stones urinary tract anomalies',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['cbc', 'cmp', 'serum_lactate', 'blood_culture', 'ua', 'urine_culture'],
    unnecessaryTests: ['ct_head', 'cxr'],
    mustRecognizeFindings: [
      'High fever with rigors',
      'Hypotension and tachycardia',
      'Costovertebral angle tenderness',
      'Urinalysis positive nitrites and leukocytes',
      'Bacteremic pattern with urine pathogen',
      'Elevated lactate',
    ],
    commonMisses: [
      'Anchoring on influenza or viral syndrome without urinary localization',
      'Missing flank pain as upper urinary tract clue',
      'Under-recognizing hypotension as septic physiology',
      'Delaying lactate or cultures in unstable patients',
      'Calling it uncomplicated cystitis despite shock',
    ],
    correctDiagnosisExplanation: [
      'Sepsis secondary to pyelonephritis means systemic life-threatening organ dysfunction triggered by kidney/renal parenchymal urinary infection.',
      'Lauren\'s fever, flank pain, pyuria with nitrites, Gram-negative bacteremia, tachycardia, hypotension, and lactate elevation fit urosepsis from pyelonephritis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Influenza',
        whyLessLikely: 'Lacks dominant urinary symptoms and urine microscopy corroborating bacterial cystitis/pyelonephritis.',
      },
      {
        diagnosis: 'Nephrolithiasis without infection',
        whyLessLikely:
          'Stone pain can mimic flank pain, but positive urinalysis for infection and bacteremia localize to infectious pyelonephritis.',
      },
      {
        diagnosis: 'Gastroenteritis',
        whyLessLikely: 'Dysuria and CVA tenderness with uropathogen in blood and urine argue against isolated GI infection.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): sepsis signs 30, urinary source 25, cultures and lactate 20, diagnosis 25 — hypotension bonus +10, miss flank pain -15.',
      'qSOFA and SOFA contextualize dysfunction beyond SIRS language in contemporary sepsis frameworks.',
      'Early IV fluids and antimicrobials after cultures when feasible — do not let blood cultures stall stabilization.',
      'Imaging for obstruction or abscess when clinical picture suggests complicated pyelonephritis.',
    ],
    vocabTerms: ['sepsis', 'pyelonephritis', 'lactate', 'urosepsis', 'costovertebral angle tenderness'],
  },

  'endocarditis-fever-michael-perez': {
    keyHistoryQuestions: [
      'fever pattern duration weight change',
      'night sweats fatigue',
      'injection drug use dental procedures indwelling lines',
      'dyspnea cough hemoptysis',
      'skin lesions nail changes',
      'new murmur exertional tolerance',
      'immunocompromise HIV',
    ],
    keyExamItems: ['general', 'cardiac', 'respiratory', 'extremities'],
    criticalTests: ['blood_culture', 'echo', 'cbc', 'esr_crp'],
    unnecessaryTests: ['ct_head', 'colonoscopy'],
    mustRecognizeFindings: [
      'Prolonged fevers beyond typical viral recovery',
      'Risk factor injection drug use',
      'New regurgitant murmur especially tricuspid predilection',
      'Splinter hemorrhages peripheral stigmata',
      'Positive blood cultures',
      'Valvular vegetation on echocardiography',
    ],
    commonMisses: [
      'Labeling prolonged fever as viral without culture discipline',
      'Not sensitively acquiring substance use history',
      'Skipping echocardiography when endocarditis suspected',
      'Forgetting septic embolic complications',
      'Ignoring murmur evolution',
    ],
    correctDiagnosisExplanation: [
      'Infective endocarditis is infection of cardiac valves or endocardium with bacteremia and clinically embolic or immunologic phenomena.',
      'Michael\'s month of fevers, weight loss, splinter hemorrhages, new murmur, positive cultures, and vegetation on echo satisfy major clinical elements of infective endocarditis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Pulmonary tuberculosis',
        whyLessLikely:
          'TB causes constitutional symptoms; lacks vegetations and typical valve infection microbiology pattern when endocarditis criteria met.',
      },
      {
        diagnosis: 'Lymphoma',
        whyLessLikely:
          'B-symptom overlap — bacteremia and echocardiographic vegetation redirect to infectious endocarditis first.',
      },
      {
        diagnosis: 'Community-acquired pneumonia',
        whyLessLikely:
          'Focal consolidation and acute shorter respiratory syndrome dominate typical pneumonia — this case centers valvular infection.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): prolonged infection 25, IV drug risk 25, cultures and echo 25, diagnosis 25.',
      'Obtain multiple sets blood cultures from separate sites before antibiotics when safe.',
      'Tricuspid involvement is classically associated with injection drug use.',
      'TEE sensitivity when prosthetic valve or TTE negative with high suspicion.',
    ],
    vocabTerms: ['infective endocarditis', 'Duke criteria', 'vegetation', 'splinter hemorrhage', 'transthoracic echocardiogram'],
  },

  'malaria-return-travel-david-khan': {
    keyHistoryQuestions: [
      'travel geography timing return date',
      'malaria chemoprophylaxis adherence insect precautions',
      'fever periodicity rigors sweating',
      'headache myalgias prostration',
      'nausea jaundice dark urine',
      'prior malaria blood transfusion',
      'sick contacts vaccines',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['malaria_blood_smear', 'malaria_antigen_rapid', 'cbc', 'cmp'],
    unnecessaryTests: ['echo', 'ct_head'],
    mustRecognizeFindings: [
      'Recent sub-Saharan Africa travel',
      'No prophylaxis compliance',
      'Cyclic fever with chills',
      'Hemolysis jaundice splenomegaly pattern',
      'Thick thin smear positive Plasmodium',
      'Rapid antigen concordant',
    ],
    commonMisses: [
      'Ignoring travel in febrile patient',
      'Not ordering malaria diagnostics in endemic returnee',
      'Confusing with uncomplicated viral syndrome',
      'Delaying treatment while awaiting full lab detail in unstable patient',
      'Missing severe malaria warning signs',
    ],
    correctDiagnosisExplanation: [
      'Malaria is Plasmodium parasitemia transmitted by Anopheles mosquitoes, classically febrile after endemic exposure.',
      'David\'s return from endemic region without prophylaxis, cyclic rigors, hemolysis markers, splenomegaly, and smear-confirmed parasites establish malaria.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Dengue fever',
        whyLessLikely:
          'Overlapping geography and thrombocytopenia possible — blood smear demonstrating Plasmodium excludes isolated dengue.',
      },
      {
        diagnosis: 'Influenza',
        whyLessLikely: 'Lacks travel-incubation story and microscopic parasitemia.',
      },
      {
        diagnosis: 'Acute viral hepatitis',
        whyLessLikely:
          'Jaundice overlap — parasitemia and cyclic fever with splenomegaly favor malaria over hepatitis alone.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): travel 30, malaria tests 25, cyclic fever 20, diagnosis 25.',
      'Repeat smears if suspicion extreme and first negative.',
      'Species and resistance geography dictate therapy choice.',
      'Severe malaria surveillance includes mental status parasitemia hypoglycemia renal failure respiratory failure.',
    ],
    vocabTerms: ['Plasmodium', 'thick smear', 'thin smear', 'parasitemia', 'chemoprophylaxis'],
  },

  'hiv-opportunistic-cough-jason-reed': {
    keyHistoryQuestions: [
      'weight loss appetite night sweats',
      'cough duration sputum hemoptysis',
      'oral lesions thrush odynophagia',
      'recurrent infections opportunistic history',
      'sexual exposure IV drug partner status',
      'TB contacts incarceration shelter',
      'prior HIV testing PrEP',
    ],
    keyExamItems: ['general', 'heent', 'respiratory'],
    criticalTests: ['hiv_test', 'cd4_count', 'hiv_viral_load', 'cxr', 'cbc'],
    unnecessaryTests: ['lipid', 'ecg'],
    mustRecognizeFindings: [
      'Progressive wasting and night sweats',
      'Chronic cough with hypoxemia',
      'Oral thrush on examination',
      'Reactive HIV screening with high viral load',
      'Profound CD4 depletion',
      'Diffuse bilateral infiltrates pattern',
    ],
    commonMisses: [
      'Attributing oral plaques only to poor hygiene absent evaluation',
      'Skipping HIV testing in adult with thrush and B-symptoms',
      'Missing TB evaluation before steroids where guideline dictates',
      'Anchoring on lung cancer without immunology assessment in young patient',
      'Ignoring sexual history sensitively',
    ],
    correctDiagnosisExplanation: [
      'HIV with opportunistic infection describes advanced untreated HIV allowing pathogens uncommon in immunocompetent hosts.',
      'Jason\'s thrush, weight loss, night sweats, chronic cough, very low CD4, high viral load, and opportunistic-appearing infiltrates fit this framework.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Pulmonary tuberculosis',
        whyLessLikely:
          'Must be evaluated — diffuse infiltrates and CD4 pattern here emphasize PCP-type risk but TB testing remains critical in real practice.',
      },
      {
        diagnosis: 'Lung cancer',
        whyLessLikely:
          'Malignancy remains in broader differential but immunodeficiency markers and thrush redirect first.',
      },
      {
        diagnosis: 'Community-acquired pneumonia',
        whyLessLikely:
          'Acute bacterial consolidation pattern less dominant than chronic symptoms with oral candidiasis and CD4 collapse.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): immunocompromise clues 25, HIV testing 25, opportunistic signs 25, diagnosis 25.',
      'Routine screening in broader populations identifies patients before AIDS-defining illness.',
      'PCP treatment includes cotrimoxazole and guideline-based corticosteroids when severe hypoxemia.',
      'Linkage to outpatient HIV specialty reduces mortality.',
    ],
    vocabTerms: ['opportunistic infection', 'PCP', 'CD4 count', 'viral load', 'oral candidiasis'],
  },

  'bacterial-meningitis-neck-emma-rodriguez': {
    keyHistoryQuestions: [
      'headache onset tempo maximal intensity',
      'neck stiffness photophobia phonophobia',
      'fever vomiting confusion',
      'rash petechiae',
      'recent URI sick contacts dorm military',
      'immunizations asplenia complement deficiency',
      'pregnancy immunosuppression',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['cbc', 'blood_culture', 'ct_head', 'lumbar_puncture'],
    unnecessaryTests: ['echo', 'colonoscopy', 'lipid'],
    mustRecognizeFindings: [
      'Rapid severe headache with fever',
      'Meningismus and photophobia',
      'Altered mental status',
      'Petechial concern in young adult cluster living',
      'CSF neutrophilia with low glucose',
      'Positive CSF Gram stain bacterial pattern',
    ],
    commonMisses: [
      'Treating as migraine without considering meningeal signs',
      'Delaying antibiotics to complete every test first in unstable patient',
      'Skipping LP contraindication screening when needed',
      'Forgetting public health prophylaxis in select meningococcal exposures',
      'Failing to examine for rash',
    ],
    correctDiagnosisExplanation: [
      'Bacterial meningitis is CNS bacterial infection with inflammation producing fever, meningismus, and often altered mentation.',
      'Emma\'s hyperacute headache, neck stiffness, photophobia, fever, confusion, neutrophilic CSF with low glucose, and positive Gram stain align with bacterial meningitis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Viral meningitis',
        whyLessLikely:
          'Often lymphocytic CSF milder course — bacterial pattern on stain and acute toxicity argues against isolated viral meningitis here.',
      },
      {
        diagnosis: 'Migraine',
        whyLessLikely: 'Lacks fever meningismus and CSF pleocytosis pattern of bacterial meningitis.',
      },
      {
        diagnosis: 'Subarachnoid hemorrhage',
        whyLessLikely:
          'Thunderclap headache remains must-not-miss — non-contrast CT here reduces emergent SAH likelihood before LP.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): emergency 30, LP 25, meningeal signs 20, diagnosis 25 — empiric antibiotics bonus +10.',
      'CT before LP when mass effect risk — but antibiotics should not wait dangerously for unstable patients per protocol.',
      'Dexamethasone adjunct follows bacterial pathogen-specific guideline timing.',
      'Blood cultures complement CSF cultures before antibiotics when moments allow.',
    ],
    vocabTerms: ['meningismus', 'photophobia', 'CSF', 'Gram stain', 'empiric antibiotics'],
  },

  'croup-breathing-funny-liam-turner': {
    keyHistoryQuestions: [
      'cough quality bark seal-like vs wet',
      'stridor timing inspiratory vs expiratory',
      'URI prodrome and sick contacts daycare',
      'drooling toxic appearance voice muffling',
      'choking or sudden aspiration event',
      'fever pattern and response to home care',
      'prior episodes steroids hospital',
    ],
    keyExamItems: ['general', 'respiratory', 'heent'],
    criticalTests: ['pulse_ox_continuous', 'lateral_neck_xray', 'airway_exam'],
    unnecessaryTests: ['ct_head', 'lumbar_puncture', 'blood_culture'],
    mustRecognizeFindings: [
      'Post-URI barking cough in toddler',
      'Inspiratory stridor with mild retractions',
      'Absence of drooling tripod toxic supraglottic picture',
      'Acceptable oxygen saturation in mild-moderate presentation',
      'Steeple sign supportive when film obtained',
      'Clinical diagnosis remains primary for classic features',
    ],
    commonMisses: [
      'Anchoring on asthma wheeze without listening for bark upper airway',
      'Forgetting foreign body in sudden stridor histories',
      'Missing epiglottitis red flags of toxic drooling quiet airway',
      'Over-relying on normal saturations while ignoring work of breathing',
      'Unnecessary imaging delaying care if atypical severe airway',
    ],
    correctDiagnosisExplanation: [
      'Croup is viral subglottic inflammation producing barking cough and often inspiratory stridor in young children after URI.',
      "Liam's overnight bark cough URI prodrome inspiratory stridor mild retractions without drooling fits croup clinically with imaging supportive if obtained.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Epiglottitis',
        whyLessLikely:
          'Typically toxic appearing with pooling drool tripod posture and rapid airway threat — absent in this comfortable-interactive pattern without muffled voice.',
      },
      {
        diagnosis: 'Foreign body aspiration',
        whyLessLikely:
          'Often sudden onset with choking or focal pulmonary findings — here gradual post-URI course argues against primary aspiration.',
      },
      {
        diagnosis: 'Bronchiolitis',
        whyLessLikely:
          'Lower airway process emphasizes wheeze crackles and younger infant peak — prominent bark and inspiratory stridor localize upper airway croup.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): barky cough 30, stridor 25, rule out dangerous mimics 20, diagnosis 25.',
      'Dexamethasone and nebulized epinephrine algorithms stratify mild versus severe airway obstruction.',
      'Escalate to subspecialty airway team if hypoxia fatigue decreased arousal or silent chest.',
      'Lateral neck film steeple sign supports but does not replace clinical judgment.',
    ],
    vocabTerms: ['stridor', 'subglottic stenosis pattern', 'steeple sign', 'laryngotracheitis'],
  },

  'otitis-media-ear-ava-morris': {
    keyHistoryQuestions: [
      'fever duration peaks antipyretic response',
      'ear pulling unilateral vs bilateral',
      'sleep appetite fluid intake changes',
      'recent URI rhinorrhea daycare exposures',
      'swimming ear cleaning q-tips trauma',
      'prior ear infections tubes',
      'immunization status',
    ],
    keyExamItems: ['general', 'heent'],
    criticalTests: ['otoscopy_pneumatic', 'tympanometry'],
    unnecessaryTests: ['ct_head', 'blood_culture', 'cxr'],
    mustRecognizeFindings: [
      'Fever irritability after URI',
      'Persistent ear manipulation pain behavior',
      'Bulging erythematous immobile tympanic membrane',
      'Middle ear effusion documented',
      'Tympanometry type B pattern supportive',
    ],
    commonMisses: [
      'Calling viral URI without pneumatic exam',
      'Missing otitis externa canal tenderness pattern',
      'Attributing high fever solely to teething',
      'Forgetting foreign body in toddler canal',
      'Under-documenting mobility on pneumatic otoscopy',
    ],
    correctDiagnosisExplanation: [
      'Acute otitis media is bacterial middle ear infection with effusion often post-nasopharyngeal URI in young children.',
      "Ava's fever irritability post-URI daycare exposure and bulging immobile TM with effusion satisfy acute otitis media.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Viral URI only',
        whyLessLikely:
          'Explains congestion but not bulging middle ear purulent effusion on careful exam.',
      },
      {
        diagnosis: 'Otitis externa',
        whyLessLikely:
          'Pain with tragal movement canal swelling predominant — TM exam here shows middle ear infection.',
      },
      {
        diagnosis: 'Teething alone',
        whyLessLikely:
          'May cause fussiness but sustained fever and acute TM findings exceed teething alone.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): symptoms 25, exam 30, diagnosis 45.',
      'Pneumatic otoscopy mobility distinguishes AOM from otitis with effusion watchful waiting contexts.',
      'Shared decision-making applies to selected mild presentations per guideline age.',
      'Analgesia is mandatory humane care.',
    ],
    vocabTerms: ['tympanic membrane', 'effusion', 'pneumatic otoscopy', 'tympanometry'],
  },

  'gastroenteritis-dehydration-noah-garcia': {
    keyHistoryQuestions: [
      'vomit frequency bilious character',
      'stool frequency consistency blood mucus',
      'wet diapers hours fluid trial tolerance',
      'tears oral mucosa mental status',
      'urine color oral intake formula breast',
      'sick contacts recent travel antibiotic',
      'prior similar illnesses weight baseline',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['cmp', 'glucose', 'stool_pathogen_panel'],
    unnecessaryTests: ['echo', 'mri_brain', 'ct_head'],
    mustRecognizeFindings: [
      'Vomiting diarrhea decreased intake',
      'Reduced urine output by caregiver report',
      'Dry mucous membranes sunken eyes poor tears',
      'Tachycardia delayed capillary refill',
      'Mild metabolic derangement on CMP',
      'Stool PCR viral pathogen consistent',
    ],
    commonMisses: [
      'Skipping diaper output quantification over time',
      'Ignoring bilious vomiting surgical red flag if it were present',
      'Missing hypoglycemia point-of-care when ill infant',
      'Equating irritability solely with benign viral without perfusion exam',
      'Delayed reassessment after fluid challenge',
    ],
    correctDiagnosisExplanation: [
      'Viral gastroenteritis with dehydration is enteric infection causing GI losses exceeding intake with clinical and sometimes laboratory signs of hypovolemia.',
      "Noah's gastro symptoms decreased wet diapers sunken dry exam tachycardia mild CMP changes and norovirus stool support viral gastroenteritis with dehydration.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Intussusception',
        whyLessLikely:
          'Often episodic severe pain vomiting lethargy currant jelly stool — here continuous gastroenteritis pattern without surgical abdomen cues.',
      },
      {
        diagnosis: 'Sepsis',
        whyLessLikely:
          'Must stay mindful in toxic infant — viral stool and exam can still coexist with bacteremia rarely, broader thresholds in real nursery protocols.',
      },
      {
        diagnosis: 'UTI',
        whyLessLikely:
          'Fever without localizing GI sometimes prompts urinalysis — dominant enteric history and dehydration picture favor gastroenteritis first.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): dehydration recognition 35, diaper history 25, exam 15, diagnosis 25.',
      'Oral rehydration therapy effective for many moderate cases when tolerated.',
      'Clinical dehydration scores standardize communication across teams.',
      'Return precautions include no urine for hours bilious vomiting altered sensorium.',
    ],
    vocabTerms: ['oral dehydration solution', 'capillary refill', 'prerenal azotemia', 'norovirus'],
  },

  'kawasaki-rash-fever-sophia-patel': {
    keyHistoryQuestions: [
      'fever duration daily pattern medications',
      'rash morphology evolution',
      'conjunctive discharge vs injection',
      'oral changes tongue lips',
      'extremity swelling peeling pain',
      'cervical node tenderness unilateral',
      'vaccine sick contact travel measuring',
    ],
    keyExamItems: ['general', 'heent', 'skin'],
    criticalTests: ['cbc', 'esr_crp', 'echo'],
    unnecessaryTests: ['ct_head', 'lumbar_puncture', 'skin_biopsy'],
    mustRecognizeFindings: [
      'Fever five or more days prominent',
      'Bilateral non-purulent conjunctivitis',
      'Mucositis strawberry tongue cracked lips',
      'Polymorphous rash extremity changes',
      'Cervical lymphadenopathy',
      'Elevated inflammatory markers',
      'Echo for coronary artery evaluation',
    ],
    commonMisses: [
      'Stopping workup at simple viral exanthem without day count',
      'Forgetting echo in complete or incomplete high-suspicion KD',
      'Ignoring shock variant requiring ICU pathway',
      'Confusing scarlet fever pharyngitis centrality without full KD stigmata',
      'Neglecting repeat labs for rising platelets convalescent phase',
    ],
    correctDiagnosisExplanation: [
      'Kawasaki disease is childhood medium-vessel vasculitis with mucocutaneous criteria and coronary artery risk.',
      "Sophia's prolonged fever conjunctival injection mucositis rash extremity involvement node and labs align with Kawasaki clinical pathway requiring echo.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Scarlet fever',
        whyLessLikely:
          'Classic strep pharyngitis centrality sandpaper rash — mucosal extremity constellation plus prolonged fever raises KD foremost.',
      },
      {
        diagnosis: 'Measles',
        whyLessLikely:
          'Koplik prodrome and under-immunization context missing — vaccine history modestly reassuring though vigilance for outbreaks remains public health.',
      },
      {
        diagnosis: 'Toxic shock syndrome',
        whyLessLikely:
          'Hypotension multiorgan and desquamation focus differ — watch for shock features if evolves.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): prolonged fever 25, classic features 30 inflammatory labs 20, diagnosis 25.',
      'IVIG in acute phase reduces coronary aneurysm risk per pediatric protocol.',
      'Incomplete Kawasaki treated when suspicion high despite subthreshold criteria.',
      'Long-term cardiology follow-up based on coronary z-scores.',
    ],
    vocabTerms: ['Kawasaki criteria', 'IVIG', 'z-score', 'CAL', 'mucositis'],
  },

  'septic-arthritis-limp-ethan-brooks': {
    keyHistoryQuestions: [
      'refusal weight-bearing abrupt vs gradual',
      'focal joint hip knee localization',
      'fever height antipyretic effect',
      'trauma fall sports playground',
      'recent infection pharyngitis skin wound',
      'pain with passive movement parent report',
      'stiffness morning duration',
    ],
    keyExamItems: ['general', 'extremities'],
    criticalTests: ['cbc', 'esr_crp', 'hip_ultrasound', 'joint_aspiration', 'xray_extremity'],
    unnecessaryTests: ['sleep_study', 'phq9', 'spirometry'],
    mustRecognizeFindings: [
      'Acute hip pain with flexed position',
      'Fever suggesting infection',
      'Severe pain limited passive range',
      'Joint effusion on ultrasound',
      'Purulent synovial fluid Gram positive pattern',
      'Elevated acute phase reactants',
      'Plain film excluding fracture slip',
    ],
    commonMisses: [
      'Calling transient synovitis without adequate septic rule-out in febrile toxic child',
      'Skipping aspiration when effusion present',
      'Missing adjacent osteomyelitis requiring MRI',
      'Underestimating urgency of orthopedic involvement',
      'Anchoring on minor trauma without fever labs fluid',
    ],
    correctDiagnosisExplanation: [
      'Septic arthritis is bacterial infection within a joint space needing drainage and antibiotics to protect cartilage growth plate.',
      "Ethan's febrile hip refusal to walk severe motion pain effusion and purulent aspirate confirm septic arthritis over benign synovitis.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Transient synovitis',
        whyLessLikely:
          'Often low or no fever post viral milder exam — high fever purulent fluid pushes to bacterial septic arthritis.',
      },
      {
        diagnosis: 'Osteomyelitis',
        whyLessLikely:
          'May coexist or mimic — MRI bone if localized tenderness persistent bacteremia or poor response.',
      },
      {
        diagnosis: 'Juvenile idiopathic arthritis',
        whyLessLikely:
          'Chronic inflammatory course without acute purulent synovial Gram stain pattern here.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): non-weight-bearing 30, joint evaluation 20, fever 25, diagnosis 25.',
      'Kocher criteria risk stratify but do not replace aspiration in ambiguous febrile limp.',
      'Staphylococcus aureus common organism; antibiotics tailored to cultures.',
      'Surgical drainage timing balances organism load joint location and clinical stability.',
    ],
    vocabTerms: ['arthrocentesis', 'synovial fluid', 'Kocher criteria', 'effusion', 'S aureus'],
  },

  't2dm-off-weeks-kevin-sharma': {
    keyHistoryQuestions: [
      'polyuria polydipsia timing volume nocturia',
      'weight change appetite vision change',
      'paresthesias foot care trauma ulcers',
      'family history metabolic disease gestational diabetes partners',
      'medications steroids supplements',
      'infection fever thirst acceleration',
      'prior screening labs doctor avoidance',
    ],
    keyExamItems: ['general', 'neuro', 'cardiac'],
    criticalTests: ['hba1c', 'fingerstick_glucose', 'cmp', 'ua', 'lipid'],
    unnecessaryTests: ['ct_head', 'lumbar_puncture', 'covid'],
    mustRecognizeFindings: [
      'Hyperglycemic symptom cluster',
      'Obesity metabolic risk phenotype',
      'Elevated HbA1c diagnostic range',
      'Glucosuria supporting osmotic diuresis',
      'Early peripheral sensory deficit',
      'Dyslipidemia pattern on labs',
    ],
    commonMisses: [
      'Anchoring on stress without glucose A1c confirmation',
      'Missing neuropathy foot exam milestone',
      'Confusing diabetes insipidus dilute polyuria without glucosuria',
      'Skipping urine assessment for glucosuria albuminuria planning',
      'Ignoring statin BP weight comprehensive risk reduction',
    ],
    correctDiagnosisExplanation: [
      'Type 2 diabetes mellitus reflects insulin resistance with relative insulinopenia causing chronic hyperglycemia and microvascular risk.',
      "Kevin's symptoms obesity family history very high HbA1c hyperglycemia glucosuria and neuropathy screening abnormality support type 2 diabetes mellitus.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Hyperthyroidism',
        whyLessLikely:
          'Can cause weight loss tremor sometimes polyuria — does not produce glucosuria and marked HbA1c elevation together.',
      },
      {
        diagnosis: 'Diabetes insipidus',
        whyLessLikely:
          'Massive dilute polyuria without hyperglycemia — laboratory hyperglycemia redirects to diabetes mellitus.',
      },
      {
        diagnosis: 'Medication-induced hyperglycemia',
        whyLessLikely:
          'Steroids and some drugs raise glucose — still meets diabetes diagnostic criteria and needs structured therapy if persistent.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): symptom recognition 30, HbA1c 25, metabolic risk 20, diagnosis 25 — neuropathy bonus +10.',
      'Diagnose with A1c random glucose fasting glucose or OGTT per ADA framework.',
      'Initial visit plans eye foot urine albumin creatinine ratio eGFR blood pressure lipids.',
      'Screen sleep apnea fatty liver disease given metabolic clustering.',
    ],
    vocabTerms: ['HbA1c', 'polyuria', 'glucosuria', 'peripheral neuropathy', 'metabolic syndrome'],
  },

  'chf-sob-robert-daniels': {
    keyHistoryQuestions: [
      'dyspnea exertional progression orthopnea pillow count',
      'paroxysmal nocturnal dyspnea timing',
      'edema distribution weight gain sodium intake',
      'chest pain ischemia prior MI revascularization',
      'medication adherence diuretic symptoms',
      'sleep snoring CPAP',
      'infection fever productive cough',
    ],
    keyExamItems: ['general', 'respiratory', 'cardiac', 'extremities'],
    criticalTests: ['bnp', 'cxr', 'ecg', 'echo', 'cmp'],
    unnecessaryTests: ['ct_head', 'colonoscopy'],
    mustRecognizeFindings: [
      'Exertional dyspnea worsening functional class',
      'Orthopnea and nocturnal dyspnea episodes',
      'Elevated jugular venous pressure',
      'Pulmonary crackles volume overload',
      'Peripheral edema symmetric',
      'Elevated natriuretic peptide',
      'Imaging congestion reduced EF echo',
    ],
    commonMisses: [
      'Attributing dyspnea solely to deconditioning or age',
      'Underestimating orthopnea pillow history specificity',
      'Forgetting BNP as adjunct not replacement for echo',
      'Missing ischemia precipitant if acute change',
      'Skipping edema JVP integration with CXR',
    ],
    correctDiagnosisExplanation: [
      'Congestive heart failure is pump failure or filling abnormality producing congestion breathlessness edema and often reduced cardiac output symptoms.',
      "Robert's orthopnea edema crackles JVP elevation elevated BNP pulmonary congestion and reduced ejection fraction echo establish congestive heart failure.",
    ],
    differentialComparison: [
      {
        diagnosis: 'COPD',
        whyLessLikely:
          'Obstructive wheeze hyperinflation pattern — smoking may coexist but volume overload exam biomarkers echo redirect.',
      },
      {
        diagnosis: 'Pneumonia',
        whyLessLikely: 'Expect fever focal infiltrate purulent sputum more often.',
      },
      {
        diagnosis: 'Kidney sodium retention alone',
        whyLessLikely:
          'Renal failure contributes fluid — clinical echo BNP still identify heart failure syndrome driving congestion.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): volume overload 30, BNP and echo 25, orthopnea clues 20, diagnosis 25.',
      'HFrEF guideline-directed medical therapy four pillars reduce mortality hospitalization.',
      'HFpEF requires different pathway diuretics comorbidity control.',
      'Address ischemia arrhythmia dietary sodium precipitants.',
    ],
    vocabTerms: ['BNP', 'orthopnea', 'ejection fraction', 'JVP', 'volume overload'],
  },

  'iron-anemia-dizziness-melissa-chen': {
    keyHistoryQuestions: [
      'menstrual volume frequency clots flooding',
      'pregnancy possibility postmenopausal bleeding alarm',
      'GI bleed melena hematochezia NSAID use',
      'diet iron pica restless legs',
      'fatigue dyspnea on exertion chest pain syncope',
      'thyroid cold constipation weight',
      'family hematologic disorder celiac',
    ],
    keyExamItems: ['general', 'cardiac'],
    criticalTests: ['cbc', 'iron_studies', 'ferritin', 'cmp', 'tsh'],
    unnecessaryTests: ['ct_head', 'mri_brain'],
    mustRecognizeFindings: [
      'Exertional intolerance and orthostatic dizziness',
      'Heavy menstrual bleeding history',
      'Conjunctival pallor tachycardia',
      'Microcytosis hypochromia on CBC',
      'Low ferritin iron saturation pattern',
      'Normal TSH removing hypothyroid primary mimic',
    ],
    commonMisses: [
      'Omitting menstrual quantification',
      'Ignoring stool blood NSAID GI risk',
      'Ordering iron without ferritin confirmation',
      'Mislabeling anxiety alone without CBC',
      'Stopping iron when hemoglobin normalizes before repletion completes',
    ],
    correctDiagnosisExplanation: [
      'Symptomatic iron deficiency anemia reflects inadequate marrow iron for hemoglobin often from chronic blood loss.',
      "Melissa's menorrhagia microcytosis low hemoglobin low ferritin and systemic symptoms fit symptomatic iron deficiency anemia.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Dehydration',
        whyLessLikely:
          'Orthostasis possible — chronic microcytic pattern and ferritin low anchor blood loss anemia.',
      },
      {
        diagnosis: 'Hypothyroidism',
        whyLessLikely: 'Fatigue overlap — normal TSH makes primary hypothyroid unlikely root.',
      },
      {
        diagnosis: 'Arrhythmia',
        whyLessLikely:
          'Palpitations possible — objective anemia and high output physiology explain tachycardia.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): anemia symptoms 25, menstrual history 25, CBC iron studies 25, diagnosis 25.',
      'Treat source menorrhagia GI evaluation when indicated.',
      'Continue iron months after Hgb corrects repleting ferritin stores.',
      'IV iron when oral fails malabsorption or severe symptomatic anemia.',
    ],
    vocabTerms: ['ferritin', 'microcytic anemia', 'menorrhagia', 'TIBC', 'pica'],
  },

  'ckd-fatigue-william-foster': {
    keyHistoryQuestions: [
      'fatigue appetite change pruritus nausea metallic taste',
      'edema timing weight BP home readings',
      'diabetes control A1c medications adherence',
      'NSAID herbal nephrotoxin exposure contrast',
      'urine foam color frequency nocturia',
      'prior creatinine baseline trajectory',
      'cardiac chest pain orthopnea overlap',
    ],
    keyExamItems: ['general', 'cardiac', 'extremities'],
    criticalTests: ['cmp', 'cbc', 'ua', 'renal_ultrasound', 'urine_protein_creatinine_ratio'],
    unnecessaryTests: ['colonoscopy', 'stress_test'],
    mustRecognizeFindings: [
      'Uremic symptom cluster fatigue itch anorexia',
      'Hypertension diabetes as CKD risks',
      'Elevated creatinine reduced eGFR',
      'Proteinuria on urinalysis',
      'Anemia of chronic kidney disease pattern',
      'Small echogenic kidneys chronic imaging',
    ],
    commonMisses: [
      'Labeling depression without renal labs in at-risk patient',
      'Missing AKI superimposed acute rises',
      'Ignoring hyperkalemia acidosis metabolic panels',
      'Continuing nephrotoxins after eGFR reveals advanced CKD',
      'Skipping urine quantification for albuminuria staging',
    ],
    correctDiagnosisExplanation: [
      'Chronic kidney disease is prolonged reduction in kidney function or structural damage with complications across stages.',
      "William's proteinuria rising creatinine reduced eGFR risk factors uremic symptoms edema and imaging chronicity fit CKD.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Heart failure',
        whyLessLikely:
          'Can coexist — predominant creatinine proteinuria timeline and kidney ultrasound favor CKD diagnosis anchor.',
      },
      {
        diagnosis: 'Depression',
        whyLessLikely:
          'Mood symptoms overlap — labs anchor organic renal contributors requiring treatment.',
      },
      {
        diagnosis: 'Malignancy',
        whyLessLikely:
          'B symptoms weight loss warrant vigilance — dominant renal lab panel here prioritizes CKD pathway first.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): CKD symptoms 25, risk factors 25, kidney studies 25, diagnosis 25.',
      'KDIGO staging guides monitoring frequency mineral bone anemia acid base.',
      'Renoprotection RAAS modulation glycemic BP control nephrotoxin avoidance.',
      'Advance care planning dialysis transplant early appropriate stages.',
    ],
    vocabTerms: ['eGFR', 'albuminuria', 'uremia', 'erythropoietin deficiency', 'CKD-MBD'],
  },

  'nephrotic-edema-thomas-rivera': {
    keyHistoryQuestions: [
      'edema onset distribution morning facial swelling',
      'urine foam color volume change weight gain',
      'NSAID use infection rash joint pain',
      'family kidney disease diabetes lupus',
      'DVT pain calf asymmetry travel immobilization',
      'hepatitis alcohol liver disease stigmata',
      'blood pressure headaches vision changes',
    ],
    keyExamItems: ['general', 'extremities', 'abdomen'],
    criticalTests: ['ua', 'urine_protein_creatinine_ratio', 'serum_albumin', 'cmp', 'lipid'],
    unnecessaryTests: ['spirometry', 'sleep_study'],
    mustRecognizeFindings: [
      'Pitting edema periorbital involvement',
      'Foamy heavy proteinuria history',
      'Nephrotic-range protein quantification',
      'Hypoalbuminemia',
      'Hyperlipidemia',
      'Absence of classic chronic liver findings primary narrative',
    ],
    commonMisses: [
      'Calling edema only dietary sodium without urine protein',
      'Missing nephrotic thrombotic risk education',
      'Over-diuresis collapsing intravascular volume',
      'Ignoring drug toxin secondary causes NSAIDs',
      'Equating bilateral edema with heart failure without protein workup',
    ],
    correctDiagnosisExplanation: [
      'Nephrotic syndrome is glomerular permeability defect causing heavy proteinuria hypoalbumin edema and often hyperlipidemia.',
      "Thomas's foamy urine nephrotic-range proteinuria severe hypoalbumin pitting edema and lipid elevations satisfy nephrotic syndrome.",
    ],
    differentialComparison: [
      {
        diagnosis: 'Congestive heart failure',
        whyLessLikely:
          'Right-left HF edema possible — lacks dominant congestion biomarkers echo story described and heavy proteinuria redirects.',
      },
      {
        diagnosis: 'Cirrhosis',
        whyLessLikely:
          'Hyp low albumin edema overlap — lacks primary portal hypertension narrative and proteinuria magnitude favors renal leak.',
      },
      {
        diagnosis: 'DVT',
        whyLessLikely:
          'Unilateral calf swelling pain suggests venous clot — bilateral pitting with proteinuria favors fluid from hypo-oncotic pressure.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): edema 25, urine protein 25, foamy urine 25, diagnosis 25 — triad bonus +10.',
      'Renal biopsy indication after specialist evaluation classifies histology.',
      'Infection and thrombosis risk heightened in severe nephrotic states.',
      'Immunosuppression when primary glomerular disease indicated differs by pathology.',
    ],
    vocabTerms: ['proteinuria', 'hypoalbuminemia', 'nephrotic range', 'hyperlipidemia', 'oncotic pressure'],
  },

  'psych-mdd-not-felt-myself': {
    keyHistoryQuestions: [
      'two months duration persistent low mood',
      'loss interest hobbies motivation grades',
      'sleep fatigue appetite concentration guilt',
      'no manic history substances',
      'passive suicidal thoughts plan intent means',
      'functional impact school relationships',
      'stress timing appetite weight',
    ],
    keyExamItems: ['general', 'mse-appearance', 'mse-mood-affect', 'mse-speech-thought', 'mse-insight-judgment'],
    criticalTests: ['phq9', 'tsh', 'cbc', 'cmp'],
    unnecessaryTests: ['mri_brain', 'ct-head'],
    mustRecognizeFindings: [
      'SIGECAPS pattern for two months',
      'Anhedonia and neurovegetative symptoms',
      'Elevated PHQ-9 with unremarkable medical labs',
      'Appears tired with poor eye contact and soft speech',
      'Mood depressed, affect constricted, logical thought process without psychosis',
      'Passive SI without plan when assessed with care',
      'No mania history to suggest bipolar depression',
    ],
    commonMisses: [
      'Not using direct, respectful suicide risk assessment',
      'Skipping functional impact (school, relationships)',
      'Assuming “stress only” without screening for pervasive depressive syndrome',
      'Not asking about past manic or hypomanic symptoms',
      'Ordering broad neuroimaging without focal neurologic concern',
    ],
    correctDiagnosisExplanation: [
      'Major depressive disorder is a mood episode with depressed mood or loss of interest plus associated symptoms causing distress or impairment.',
      'Emily’s two-month course of sadness, anhedonia, neurovegetative signs, guilt, and academic decline—with an elevated PHQ-9 and normal TSH/CBC/CMP—fits MDD better than purely situational distress or a medical mimic.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Hypothyroidism',
        whyLessLikely: 'Can mimic depression; normal TSH makes this less likely as the primary driver.',
      },
      {
        diagnosis: 'Adjustment disorder',
        whyLessLikely:
          'Symptoms can follow stressors, but pervasive SIGECAPS pattern for two months with marked impairment more strongly supports MDD.',
      },
      {
        diagnosis: 'Anxiety disorder',
        whyLessLikely: 'Worry can coexist, but the core story centers on depressed mood, anhedonia, and energy/motivation collapse.',
      },
      {
        diagnosis: 'Bipolar depression',
        whyLessLikely: 'Requires history of mania/hypomania; she denies classic manic symptoms.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): SIGECAPS symptoms 35, suicide screen 25, functional impact 15, diagnosis 25. Bonus: structured suicide assessment +10. Deduction: misses safety concerns -25.',
      'Use plain language, normalize distress, then ask directly about suicidal thoughts, intent, plan, and access to lethal means.',
      'Document onset, duration, prior episodes, bipolar history, substances, and medical contributors.',
      'PHQ-9 quantifies severity; diagnosis still requires a clinical interview.',
      'Communication tip: move from open-ended narrative to focused safety questions without sounding rushed or judgmental.',
      'Lower-yield early testing includes neuroimaging unless red flags for organic disease.',
    ],
    vocabTerms: ['anhedonia', 'PHQ-9', 'SIGECAPS', 'passive suicidal ideation', 'constricted affect'],
  },

  'psych-bipolar-manic-no-sleep': {
    keyHistoryQuestions: [
      'sleep need decreased energy increased five days',
      'grandiosity spending distractibility pressured speech',
      'risky behaviors sex driving substances',
      'family concern first episode prior mood episodes',
      'drug alcohol use supplements',
    ],
    keyExamItems: ['general', 'cardiac', 'mse-speech-thought', 'mse-mood-affect', 'mse-perception', 'mse-insight-judgment'],
    criticalTests: ['urine_drug_screen', 'tsh', 'cbc', 'cmp'],
    unnecessaryTests: ['mri_brain'],
    mustRecognizeFindings: [
      'Manic pattern: euphoria, decreased sleep need, grandiosity, spending, distractibility',
      'Pressured speech and flight of ideas on exam',
      'Mild tachycardia without acute medical crisis explanation',
      'Negative urine drug screen with reassuring baseline labs',
      'Limited insight into severity',
      'Family collateral about functional decline and risk',
    ],
    commonMisses: [
      'Treating presentation as benign “high energy” without safety planning',
      'Skipping substance screening in mania evaluation',
      'Not asking about financial, sexual, or driving risks',
      'Missing past depressive or hypomanic episodes that change classification',
      'Not collateralizing with concerned family when insight is poor',
    ],
    correctDiagnosisExplanation: [
      'Bipolar I disorder, manic episode, involves a distinct period of abnormally elevated mood with hallmark manic signs and marked impairment.',
      'Brandon’s days of minimal sleep with euphoria, grandiosity, spending, distractibility, and pressured speech—without explanatory substances and with lab reassurance—fits a manic episode requiring urgent psychiatric stabilization planning.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Substance-induced mania',
        whyLessLikely: 'Negative drug screen and credible denial reduce but do not eliminate risk; still must keep follow-up about new exposures.',
      },
      {
        diagnosis: 'Hyperthyroidism',
        whyLessLikely: 'Can cause irritability and tachycardia; normal thyroid labs reduce likelihood as primary cause.',
      },
      {
        diagnosis: 'ADHD',
        whyLessLikely: 'Distractibility overlaps, but classic mania includes mood elevation, decreased sleep need, and episodic course.',
      },
      {
        diagnosis: 'Schizoaffective disorder',
        whyLessLikely: 'Prominent mood-incongruent psychosis across phases would be more central; this vignette emphasizes manic syndrome features.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): DIGFAST features 35, risky behaviors 20, substance rule-out 20, diagnosis 25.',
      'Mania is a medical emergency for judgment and safety risks even when vitals look modestly abnormal.',
      'Collateral history often clarifies spending, sleepless streaks, and behavior changes.',
      'Communication tip: stay calm, set boundaries, and avoid debating grandiose claims—focus on safety and concrete timelines.',
      'Lower priority: routine brain MRI without focal neurological concern.',
    ],
    vocabTerms: ['flight of ideas', 'pressured speech', 'grandiosity', 'DIGFAST', 'insight'],
  },

  'psych-schizophrenia-watching': {
    keyHistoryQuestions: [
      'eight months paranoia withdrawal voices functioning',
      'hallucinations content command safety',
      'substance use timeline medications',
      'family mental illness decline self care',
      'sleep appetite weight trauma head injury',
    ],
    keyExamItems: ['general', 'neuro', 'mse-psychosis', 'mse-thought', 'mse-affect-cognition', 'mse-insight-judgment'],
    criticalTests: ['urine_drug_screen', 'cbc', 'cmp'],
    unnecessaryTests: ['mri_brain'],
    mustRecognizeFindings: [
      'Auditory hallucinations with paranoid beliefs and social withdrawal',
      'Functional decline and self-care impairment over months',
      'Flat affect, delayed responses, thought blocking, poor insight',
      'No lab explanation on basic workup; tox not showing obvious acute intoxication',
      'Chronicity over months rather than isolated brief episode',
    ],
    commonMisses: [
      'Attributing psychosis to “personality” without assessing safety and timeline',
      'Not asking what the voices say, how often, and if commands occur',
      'Skipping a structured substance review and medication list',
      'Not assessing capacity, suicidal or homicidal ideation, and neglect risk',
      'Ordering imaging reflexively without neurological red flags',
    ],
    correctDiagnosisExplanation: [
      'Schizophrenia involves psychotic symptoms with functional decline for a prolonged period, not better explained by mood episodes alone or substances.',
      'Marcus’s chronic auditory hallucinations, paranoia, withdrawal, and negative symptoms with poor insight fit schizophrenia in the context of unremarkable screening labs.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Substance-induced psychosis',
        whyLessLikely:
          'Substances can mimic psychosis; negative screening and chronic course without clear temporal link reduce this as primary.',
      },
      {
        diagnosis: 'Bipolar disorder with psychotic features',
        whyLessLikely: 'Usually tied to discrete mood episodes; prominent chronic negative symptoms and flat baseline argue toward schizophrenia spectrum.',
      },
      {
        diagnosis: 'Delusional disorder',
        whyLessLikely: 'Often preserves functioning outside a circumscribed delusion; pervasive hallucinations and broad decline are less typical.',
      },
      {
        diagnosis: 'Schizoaffective disorder',
        whyLessLikely: 'Needs a major mood episode overlapping psychosis for substantial periods; mood dominance is not this vignette’s emphasis.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): identify psychosis 30, hallucination details 20, functioning decline 25, diagnosis 25.',
      'Ask permission before deep trauma questions; psychosis interviews need pacing and safety checks.',
      'Communication tip: use simple reflections, avoid arguing with fixed beliefs, and validate fear.',
      'Baseline labs and tox screen address common mimics; MRI is lower yield without focal neuro signs.',
      'Document command hallucinations and any homicidal or self-harm content as safety-critical.',
    ],
    vocabTerms: ['auditory hallucination', 'thought blocking', 'negative symptoms', 'paranoia', 'insight'],
  },

  'psych-ocd-hand-washing': {
    keyHistoryQuestions: [
      'contamination fears compulsions hand washing duration',
      'intrusions distress insight time school impairment',
      'what happens if ritual interrupted',
      'prior tics developmental anxiety trauma',
      'family ocd depression medications',
    ],
    keyExamItems: ['general', 'skin-hands', 'mse-mood-anxiety', 'mse-thought-insight', 'mse-perception', 'mse-judgment'],
    criticalTests: ['yale_brown_ocs', 'psych_symptom_questionnaires'],
    unnecessaryTests: ['mri_brain', 'ct-head'],
    mustRecognizeFindings: [
      'Obsessions with compulsions aimed at reducing anxiety',
      'Excessive washing with eczema or excoriation risk on hands',
      'Preserved insight that rituals are excessive',
      'Elevated Y-BOCS severity consistent with clinically significant OCD',
      'Academic impairment from time lost to rituals',
    ],
    commonMisses: [
      'Mislabeling ego-dystonic rituals as primary psychosis',
      'Underestimating impairment in school attendance and homework time',
      'Not separating normal worry from specific obsessional loops',
      'Skipping severity rating with a validated OCD scale',
      'Forgetting to screen for comorbid depression or anxiety that changes treatment',
    ],
    correctDiagnosisExplanation: [
      'OCD includes obsessions and/or compulsions that consume time, cause distress, or impair functioning, often with preserved insight.',
      'Sophia’s year-long contamination fears with washing rituals, anxiety spikes when interrupted, school impact, and a markedly elevated Y-BOCS score fit OCD.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Generalized anxiety disorder',
        whyLessLikely: 'GAD worries are broader; discrete contamination obsessions with ritualistic washing are more specific for OCD.',
      },
      {
        diagnosis: 'Autism spectrum disorder',
        whyLessLikely: 'Rigid routines occur, but developmental social communication history and breadth of restricted interests differ; her core loop is fear-contamination driven.',
      },
      {
        diagnosis: 'Psychotic disorder',
        whyLessLikely: 'She recognizes rituals as excessive and does not endorse fixed delusional logic as primary.',
      },
      {
        diagnosis: 'Personality disorder traits',
        whyLessLikely: 'Longstanding interpersonal patterns differ from fear-driven ritual cycles with onset tied to contamination cognitions.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): obsessions and compulsions 35, distress and functioning 20, insight clues 20, diagnosis 25.',
      'Severity scales guide exposure planning and monitor response.',
      'Communication tip: normalize shame, ask concrete examples of daily rituals, and quantify minutes or hours lost.',
      'Lower priority: neuroimaging without neurologic findings.',
    ],
    vocabTerms: ['obsession', 'compulsion', 'Y-BOCS', 'ego-dystonic', 'contamination fear'],
  },

  'psych-ptsd-reliving': {
    keyHistoryQuestions: [
      'trauma eight months nightmares flashbacks triggers',
      'avoidance reminders hypervigilance startle sleep',
      'functional impact work relationships safety',
      'prior mental health substance use dissociation',
      'depressive symptoms panic guilt shame',
    ],
    keyExamItems: ['general', 'mse-affect-arousal', 'mse-trauma-screen', 'mse-thought', 'mse-cognition-orientation'],
    criticalTests: ['pcl5', 'phq9'],
    unnecessaryTests: ['mri_brain'],
    mustRecognizeFindings: [
      'Trauma-linked intrusive memories and nightmares',
      'Avoidance of reminders and hyperarousal with poor sleep',
      'Hyperalertness and exaggerated startle on exam',
      'Positive PCL-5 PTSD screen with depressive overlap on PHQ-9',
      'Occupational stress in healthcare setting after index event',
    ],
    commonMisses: [
      'Calling it “just stress” without linking symptoms to a trauma timeline',
      'Screening only depression while missing avoidance and re-experiencing clusters',
      'Not asking about safety if passive suicidal ideation appears',
      'Skipping triggers that predict flashbacks at work',
      'Ordering broad imaging without neurologic concern',
    ],
    correctDiagnosisExplanation: [
      'PTSD follows exposure to traumatic events and persists with intrusion, avoidance, negative alterations, and arousal beyond one month.',
      'Sarah’s eight-month course with nightmares, flashbacks, avoidance, hypervigilance, and a positive PTSD checklist after a trauma fits PTSD, with PHQ-9 capturing overlapping depressive burden.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Acute stress disorder',
        whyLessLikely: 'Symptoms begin immediately after trauma but typically resolve within a month; her course is longer.',
      },
      {
        diagnosis: 'Major depression',
        whyLessLikely: 'Depression may coexist, but the trauma-cued intrusion and avoidance pattern is central.',
      },
      {
        diagnosis: 'Panic disorder',
        whyLessLikely: 'Panic attacks can occur, but PTSD flashbacks tie to specific trauma reminders rather than spontaneous panic alone.',
      },
      {
        diagnosis: 'Adjustment disorder',
        whyLessLikely: 'Usually less intense and less classically trauma-clustered than this intrusive-avoidant-arousal triad over months.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): trauma link 30, avoidance and hyperarousal 25, functional impairment 20, diagnosis 25.',
      'Validated PTSD screens help quantify burden but do not replace a careful trauma-informed interview.',
      'Communication tip: lead with choice and pacing; warn before trauma details and pause if distress spikes.',
      'Assess safety, substance use, and occupational impairment in high-stress roles like nursing.',
      'Lower priority: neuroimaging without focal neuro signs.',
    ],
    vocabTerms: ['hypervigilance', 'flashback', 'avoidance', 'PCL-5', 're-experiencing'],
  },

  'nephro-lithiasis-daniel-flank': {
    keyHistoryQuestions: [
      'sudden flank pain colicky waves two hours',
      'radiation groin testicle nausea restlessness',
      'fever dysuria trauma prior stones surgery',
      'hydration occupation driving vibration maybe',
      'medication nsaid opioid allergy',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['ua', 'ct_abdomen_pelvis_noncontrast'],
    unnecessaryTests: ['mri_brain', 'echocardiogram'],
    mustRecognizeFindings: [
      'Sudden severe colicky flank pain with inability to lie still',
      'Flank and CVA tenderness without rebound',
      'Microscopic hematuria on urinalysis',
      'CT without contrast showing ureteral calculus with obstructive pattern',
      'No fever arguing against pyelonephritis in this vignette',
      'Groin radiation supporting ureteral colic',
    ],
    commonMisses: [
      'Underestimating vascular catastrophes when atypical features appear',
      'Skipping urinalysis before imaging in classic stone presentation',
      'Treating only pain without assessing obstruction and renal function',
      'Assuming abdominal tenderness equals surgical abdomen without mapping radiation',
      'Not documenting hematuria as supportive clue',
    ],
    correctDiagnosisExplanation: [
      'Nephrolithiasis with ureteral colic classically causes sudden severe waves of flank pain radiating toward the groin, often with nausea and microscopic hematuria.',
      'Daniel’s exam, lack of fever, hematuria, and stone on non-contrast CT align with nephrolithiasis rather than pyelonephritis or AAA.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Pyelonephritis',
        whyLessLikely: 'Usually includes fever and more infection-predominant urinalysis pattern.',
      },
      {
        diagnosis: 'Appendicitis',
        whyLessLikely: 'Pain pattern and CT findings localize urinary tract stone rather than RLQ inflammation.',
      },
      {
        diagnosis: 'AAA',
        whyLessLikely: 'Catastrophic pain can overlap; CT stone protocol or vascular imaging strategy differs when suspicion high.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): colicky pain recognition 30, UA/imaging 25, groin radiation 20, diagnosis 25; hematuria bonus +10; miss flank-to-groin pattern −15.',
      'Non-contrast CT is high yield for acute stone evaluation in many adults.',
      'Pair pain control with hydration and monitoring for infection or complete obstruction.',
      'Lower priority: broad cardiac testing unless alternative ACS features dominate.',
    ],
    vocabTerms: ['nephrolithiasis', 'costovertebral angle', 'hematuria', 'hydroureteronephrosis', 'ureteral colic'],
  },

  'nephro-nephrotic-amanda-edema': {
    keyHistoryQuestions: [
      'facial puffiness morning leg swelling weeks',
      'foamy urine weight gain fatigue',
      'chest orthopnea liver history nsaid',
      'unilateral calf swelling plane travel',
      'blood pressure medications periods pregnancy',
    ],
    keyExamItems: ['general', 'extremities', 'abdomen'],
    criticalTests: ['ua', 'urine_protein_creatinine_ratio', 'serum_albumin', 'lipid'],
    unnecessaryTests: ['ct-head', 'sinus_ct'],
    mustRecognizeFindings: [
      'Progressive periorbital and bilateral pitting edema over weeks',
      'Foamy urine with heavy proteinuria on dipstick awaiting quantification',
      'Nephrotic-range urine protein ratio',
      'Hypoalbuminemia supporting oncotic edema physiology',
      'Hyperlipidemia on lipid panel',
      'Mild abdominal fullness without acute tenderness',
    ],
    commonMisses: [
      'Diagnosing decompensated heart failure without quantifying urine protein',
      'Attributing edema solely to dietary salt without proteinuria workup',
      'Missing NSAID contribution to glomerular injury in some patients',
      'Forgetting thrombosis risk counseling when protein loss is severe',
      'Skipping lipid panel that completes nephrotic laboratory picture',
    ],
    correctDiagnosisExplanation: [
      'Nephrotic syndrome reflects glomerular permeability defects producing heavy proteinuria, hypoalbuminemia, edema, and commonly hyperlipidemia.',
      'Amanda’s foamy urine, pitting edema, nephrotic-range protein loss, low albumin, and dyslipidemia meet the clinical-laboratory definition.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Congestive heart failure',
        whyLessLikely: 'Pulmonary congestion and JVP elevation more central; heavy proteinuria anchors renal leak.',
      },
      {
        diagnosis: 'Cirrhosis',
        whyLessLikely: 'Ascites and portal hypertension pattern differs; proteinuria magnitude favors renal etiology.',
      },
      {
        diagnosis: 'DVT',
        whyLessLikely: 'Unilateral swelling and pain predominate rather than symmetric pitting edema with nephrotic labs.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): edema pattern 25, urine protein quantification 30, foamy urine 20, diagnosis 25.',
      'Quantify proteinuria with random ratio or timed collection before committing to biopsy plans.',
      'Useful tests: UA, UPCR, albumin, lipids, BMP; ultrasound when anatomy indications.',
      'Lower priority: shotgun imaging unrelated to nephrotic evaluation',
    ],
    vocabTerms: ['nephrotic syndrome', 'proteinuria', 'hypoalbuminemia', 'hyperlipidemia', 'edema'],
  },

  'nephro-psgn-jacob-cola-urine': {
    keyHistoryQuestions: [
      'cola urine dark blood two days',
      'facial swelling headache blood pressure',
      'recent sore throat antibiotic two weeks',
      'dysuria trauma exercise hematuria',
      'family kidney disease joint rash sun',
    ],
    keyExamItems: ['general', 'heent', 'cardiovascular'],
    criticalTests: ['ua', 'aso_titer', 'complement_c3_c4', 'bmp'],
    unnecessaryTests: ['ct-head', 'knee_xray'],
    mustRecognizeFindings: [
      'Gross nephritic urine color with RBC casts on microscopy',
      'Periorbital edema and hypertension disproportionate for age',
      'Recent streptococcal pharyngitis latent period',
      'Elevated ASO supporting antecedent infection',
      'Low C3 pattern favoring immune-complex PSGN',
      'Mild creatinine rise monitoring for decline',
    ],
    commonMisses: [
      'Mislabeling gross hematuria as simple UTI without microscopy',
      'Ignoring blood pressure in pediatric nephritic presentations',
      'Not connecting latent interval after strep to immune complex GN',
      'Skipping complement serologies that distinguish PSGN clues',
      'Forgetting lupus serologies if systemic features evolve',
    ],
    correctDiagnosisExplanation: [
      'Post-streptococcal glomerulonephritis is an immune-complex mediated nephritis that often follows streptococcal infection with latent onset of hypertension, edema, and cola urine.',
      'Jacob’s pharyngitis timing, nephritic sediment, ASO rise, and hypocomplementemia support PSGN over isolated stone disease.',
    ],
    differentialComparison: [
      {
        diagnosis: 'IgA nephropathy',
        whyLessLikely: 'Often synpharyngitic hematuria; PSGN shows latent period and typical complement consumption.',
      },
      {
        diagnosis: 'Nephrolithiasis',
        whyLessLikely: 'Colicky pain and calculi imaging pattern differ from nephritic casts and complement changes.',
      },
      {
        diagnosis: 'UTI',
        whyLessLikely: 'Pyuria and bacteriuria predominate; lacks RBC cast picture.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): post-infectious timeline 25, urine studies 30, edema/BP findings 20, diagnosis 25.',
      'RBC casts localize injury to glomeruli—never dismiss gross blood without microscopy in children.',
      'Useful tests: UA with microscopy, BMP, ASO, C3/C4; renal ultrasound if atypical or severe.',
      'Lower priority: unrelated routine imaging without indication',
    ],
    vocabTerms: ['post-streptococcal GN', 'RBC casts', 'complement', 'ASO', 'nephritic'],
  },

  'nephro-aki-george-dehydration': {
    keyHistoryQuestions: [
      'vomiting dehydration poor intake days',
      'oliguria dark urine weakness dyspnea',
      'chest pain fever orthostasis medications',
      'ace inhibitor nsaid contrast exposure',
      'prior creatinine baseline cardiac history',
    ],
    keyExamItems: ['general', 'cardiovascular'],
    criticalTests: ['bmp', 'ua', 'ecg'],
    unnecessaryTests: ['ct-head', 'mri_spine'],
    mustRecognizeFindings: [
      'Hypotension and tachycardia with dry mucous membranes',
      'Reduced urine output after GI losses',
      'Elevated creatinine and BUN with hyperkalemia',
      'ECG changes of hyperkalemia',
      'Urinalysis supportive of prerenal physiology though monitor for ATN',
      'Exclusion anchors for sepsis absent in vignette but revisit if clinical change',
    ],
    commonMisses: [
      'Continuing RAAS blockers during vomiting without monitoring',
      'Ignoring ECG in setting of elevated potassium',
      'Missing sepsis if hypotension evolves with new fever',
      'Assuming dyspnea is only anxiety without volume/renal overlap',
      'Not repeating labs after fluid resuscitation',
    ],
    correctDiagnosisExplanation: [
      'Acute kidney injury denotes abrupt reduction in kidney function—here precipitated by prerenal hypoperfusion from vomiting and inadequate intake with medication context.',
      'Oliguria, azotemia, hyperkalemia, and supportive ECG match AKI complicating dehydration.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Sepsis',
        whyLessLikely: 'Infection signs not central; renal pattern tied to volume depletion.',
      },
      {
        diagnosis: 'Heart failure',
        whyLessLikely: 'Could exacerbate renal perfusion; primary story is GI losses with prerenal pattern.',
      },
      {
        diagnosis: 'Pulmonary embolism',
        whyLessLikely: 'Mild hypoxia; lacks primary clot story though vigilance remains.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): dehydration linkage 30, kidney labs 25, oliguria 20, diagnosis 25; hyperkalemia bonus +10.',
      'Treat hyperkalemia and optimize volume before long discussions.',
      'Useful tests: BMP, ECG, UA, CBC; chest imaging if alternate cardiopulmonary driver suspected.',
      'Lower priority: neuroimaging without neurologic indication',
    ],
    vocabTerms: ['acute kidney injury', 'prerenal', 'hyperkalemia', 'BUN', 'creatinine'],
  },

  'nephro-ckd-richard-hypertension': {
    keyHistoryQuestions: [
      'longstanding hypertension diabetes progression',
      'fatigue edema appetite medications nsaid',
      'home blood pressure readings chest symptoms',
      'family kidney disease contrast procedures',
      'urine froth nocturia weight change',
    ],
    keyExamItems: ['general', 'extremities', 'cardiovascular'],
    criticalTests: ['cmp', 'ua', 'renal_ultrasound', 'cbc'],
    unnecessaryTests: ['sinus_ct', 'allergy_skin_prick'],
    mustRecognizeFindings: [
      'Long-term diabetes and hypertension risk for CKD',
      'Reduced eGFR with elevated creatinine chronically',
      'Proteinuria on urinalysis albumin pattern',
      'Small kidneys with cortical thinning suggesting chronicity',
      'Anemia pattern sometimes accompanying CKD',
      'Mild peripheral edema with poor appetite in uremic prodrome spectrum',
    ],
    commonMisses: [
      'Ignoring acute-on-chronic rise if creatinine jumps',
      'Continuing NSAIDs without counseling in advanced CKD',
      'Attributing fatigue solely to aging without renal labs',
      'Missing cardiovascular comorbidity overlap',
      'Skipping patient education about RRT trajectory early enough',
    ],
    correctDiagnosisExplanation: [
      'Chronic kidney disease reflects prolonged kidney damage with reduced GFR and often proteinuria across months to years.',
      'Richard’s risk factors, chronic ultrasound pattern, proteinuria, and stable-but-reduced GFR story align with CKD rather than isolated acute insult.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Heart failure',
        whyLessLikely: 'Overlap in edema; CKD labs and renal imaging pattern dominate.',
      },
      {
        diagnosis: 'Cirrhosis',
        whyLessLikely: 'Lacks portal hypertension stigmata story; protein pattern renal-anchored.',
      },
      {
        diagnosis: 'Nephrotic syndrome flare',
        whyLessLikely: 'Can coexist with CKD but isolated nephrotic crisis is not the headline here.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): risk factors 25, renal testing 25, chronic pattern recognition 25, diagnosis 25.',
      'Useful tests: BMP with eGFR trends, urine protein quantification, renal ultrasound, CBC for anemia.',
      'Lower priority: allergy testing or unrelated imaging unless comorbid indication',
    ],
    vocabTerms: ['chronic kidney disease', 'eGFR', 'proteinuria', 'diabetic kidney disease', 'RAAS inhibition'],
  },

  'rheum-ra-susan-morning-stiffness': {
    keyHistoryQuestions: [
      'morning stiffness duration over one hour',
      'symmetric hand swelling pip mcp jar grip',
      'fatigue inflammatory improvement with movement',
      'psoriasis ibd family seronegative concern',
      'fever joint count oral ulcers rash photosensitivity',
    ],
    keyExamItems: ['general', 'extremities-hands'],
    criticalTests: ['esr_crp', 'rheumatoid_factor', 'anti_cyclic_citrullinated_peptide', 'hand_xray_bilateral'],
    unnecessaryTests: ['ct-head', 'quantiferon_tb'],
    mustRecognizeFindings: [
      'Symmetric MCP/PIP inflammatory synovitis with prolonged morning stiffness',
      'Elevated inflammatory markers ESR/CRP',
      'Positive RF and anti-CCP supporting seropositive RA',
      'Radiographic erosions or osteopenic changes at MCPs',
      'Functional impairment opening jars typing prolonged workday',
      'Lacks psoriasis plaques dominant narrative and lupus-specific rashes',
    ],
    commonMisses: [
      'Attributing prolonged stiffness to osteoarthritis alone',
      'Not quantifying morning stiffness duration precisely',
      'Skipping serologic workup in persistent inflammatory polyarthritis',
      'Missing infection red flags in acute monoarticular presentation elsewhere',
      'Delaying synthetic DMARD discussion when diagnosis firm',
    ],
    correctDiagnosisExplanation: [
      'Rheumatoid arthritis is a chronic inflammatory symmetric polyarthritis often involving wrists and MCPs with prolonged morning stiffness and characteristic autoantibodies.',
      'Susan’s eight-month course hand involvement exam serology and imaging changes align with RA over OA or viral polyarthritis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Osteoarthritis',
        whyLessLikely: 'Brief stiffness favors mechanical OA; strong RF/CCP and erosions argue for inflammatory RA.',
      },
      {
        diagnosis: 'Psoriatic arthritis',
        whyLessLikely: 'May lack overt psoriasis; seropositive symmetric MCP picture is more classic for RA.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): inflammatory joint pattern 30, morning stiffness duration 25, autoimmune testing 20, diagnosis 25.',
      'Useful tests: ESR/CRP, RF, anti-CCP, hand imaging, baseline CBC/creatinine before DMARDs.',
      'Lower priority: unrelated infectious screens without exposure clues.',
    ],
    vocabTerms: ['synovitis', 'anti-CCP', 'rheumatoid factor', 'morning stiffness', 'erosion'],
  },

  'rheum-sle-rachel-photosensitivity': {
    keyHistoryQuestions: [
      'malar rash sparing nasolabial folds photosensitivity',
      'oral ulcers arthritis fatigue alopecia',
      'urine color foaming blood pressure headache neuro',
      'medication hydralazine isoniazid drug lupus',
      'family autoimmune infections recent',
    ],
    keyExamItems: ['skin', 'extremities', 'oral'],
    criticalTests: ['ana_ifa', 'anti_double_stranded_dna', 'complement_c3_c4', 'cbc', 'ua'],
    unnecessaryTests: ['ct-head', 'sinus_ct'],
    mustRecognizeFindings: [
      'Photosensitive malar rash with nasolabial sparing clue',
      'Mucosal ulcers arthralgias and systemic fatigue',
      'Positive ANA and anti-dsDNA with hypocomplementemia',
      'Screening cytopenias on CBC and urinalysis for renal involvement',
      'Multisystem waxing course in young woman',
    ],
    commonMisses: [
      'Dismissing rash as cosmetic rosacea without systemic evaluation',
      'Not screening urine and blood pressure in new SLE workup',
      'Forgetting medication-induced lupus differential when relevant',
      'Ordering only ANA without disease-specific antibodies and complements',
      'Missing infection triggers when immunosuppression considered later',
    ],
    correctDiagnosisExplanation: [
      'Systemic lupus erythematosus is heterogeneous autoimmune disease with immune complex–mediated organ risk.',
      'Rachel’s mucocutaneous findings multisystem symptoms and dsDNA/complement pattern support SLE classification considerations.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Rosacea',
        whyLessLikely: 'Central flushing prominence without robust multisystem autoantibody profile.',
      },
      {
        diagnosis: 'Dermatomyositis',
        whyLessLikely: 'Characteristic violaceous rashes and proximal weakness with CK elevation dominate there.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): multisystem clues 30, autoimmune testing 25, photosensitivity 20, diagnosis 25.',
      'Useful tests: CBC complement anti-dsDNA urinalysis renal function ANA with reflex.',
      'Lower priority: broad tumor markers without alarm symptoms.',
    ],
    vocabTerms: ['ANA', 'anti-dsDNA', 'hypocomplementemia', 'malar rash', 'photosensitivity'],
  },

  'rheum-gout-anthony-first-mtp': {
    keyHistoryQuestions: [
      'first metatarsophalangeal acute overnight pain',
      'erythema swelling sheet touch intolerable',
      'fever systemic symptoms trauma cellulitis',
      'diet alcohol organ meat shellfish purines',
      'prior similar attacks diuretics renal history',
    ],
    keyExamItems: ['general', 'extremities-foot'],
    criticalTests: ['joint_aspiration', 'serum_uric_acid', 'cbc', 'foot_xray'],
    unnecessaryTests: ['echocardiogram', 'mri_brain'],
    mustRecognizeFindings: [
      'Acute monoarthritis classic podagra first MTP',
      'Crystal analysis MSU needle negative birefringence when polarized microscopy available',
      'Dietary alcohol red meat trigger context',
      'Gram stain and culture consideration if septic suspicion',
      'Hyperuricemia supportive though may normalize during flare',
    ],
    commonMisses: [
      'Treating hot swollen joint as cellulitis without joint aspirate when diagnosis unclear',
      'Missing septic arthritis in febrile toxic patients',
      'Relying on serum uric acid alone for acute diagnosis',
      'Skipping joint drainage if tense effusion with infection concern',
      'Forgetting to discuss flare prophylaxis timing around urate-lowering initiation',
    ],
    correctDiagnosisExplanation: [
      'Acute gout is inflammatory monoarthritis caused by monosodium urate crystals—first MTP is classic.',
      'Anthony’s overnight podagra precipitant diet crystal demonstration anchors the diagnosis over pseudogout when aspirate reviewed.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Septic arthritis',
        whyLessLikely: 'Urgent exclusion if toxic—this vignette crystal-proven and less systemic toxicity.',
      },
      {
        diagnosis: 'Pseudogout',
        whyLessLikely: 'CPP crystals differ on polarized microscopy and joint pattern may vary.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): acute monoarthritis 25, dietary trigger 20, joint aspiration 30, diagnosis 25.',
      'Useful: arthrocentesis with crystal analysis CBC serum urate imaging for fracture alternative.',
      'Lower priority: unrelated cardiac imaging without indication.',
    ],
    vocabTerms: ['podagra', 'monosodium urate', 'birefringence', 'arthrocentesis', 'hyperuricemia'],
  },

  'rheum-pmr-linda-proximal-pain': {
    keyHistoryQuestions: [
      'proximal shoulder hip girdle pain stiffness',
      'morning duration hour plus dressing dysfunction',
      'true weakness headache jaw scalp vision gca',
      'medication statin hypothyroid myalgia overlap',
      'weight loss cancer red flag review',
    ],
    keyExamItems: ['general', 'shoulder', 'hip'],
    criticalTests: ['esr_crp', 'ck', 'cbc'],
    unnecessaryTests: ['ct-head', 'skin_scraping'],
    mustRecognizeFindings: [
      'Age typically over 50 with proximal girdle symptoms',
      'Marked ESR/CRP elevation with normal CK distinguishing myositis',
      'Pain-limited effort without objective profound weakness pattern',
      'Consider giant cell arteritis symptoms simultaneously',
      'Functional tasks rising from chair brushing hair illustrative',
    ],
    commonMisses: [
      "Calling PMR fibromyalgia without checking inflammatory markers",
      'Ignoring GCA visual jaw claudication prompts',
      'Misattributing elevated inflammatory markers to infection without focal source',
      'Forgetting steroid-responsive expectation as therapeutic probe when appropriate',
      'Missing hypothyroid mimic if TSH not assessed when atypical',
    ],
    correctDiagnosisExplanation: [
      'Polymyalgia rheumatica is an inflammatory syndrome of proximal pain stiffness in older adults with characteristic laboratory markers.',
      'Linda’s proximal symptoms high ESR/CRP and normal CK support PMR over primary myositis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Fibromyalgia',
        whyLessLikely: 'Typically normal ESR/CRP and widespread tenderness without true synovitis or lab inflammation.',
      },
      {
        diagnosis: 'Inflammatory myopathy',
        whyLessLikely: 'Expect CK elevation and measurable weakness out of proportion to pain alone.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): age pattern 25, inflammatory markers 25, proximal symptoms 25, diagnosis 25.',
      'Useful: ESR CRP CK CBC consider temporal artery evaluation symptom-driven.',
      'Lower priority: shotgun rheumatologic panels without directed history.',
    ],
    vocabTerms: ['polymyalgia rheumatica', 'ESR', 'CRP', 'giant cell arteritis', 'creatine kinase'],
  },

  'rheum-scleroderma-melissa-raynaud': {
    keyHistoryQuestions: [
      'raynaud cold triphasic color change digital pits',
      'skin tightening sclerodactyly contractures microstomia',
      'reflux dysphagia heartburn pulmonary symptoms',
      'occupational vibration cigarettes estrogen',
      'overlap rashes arthritis muscle weakness',
    ],
    keyExamItems: ['skin-hands', 'general-face'],
    criticalTests: ['ana_ifa', 'anti_centromere', 'anti_scl70', 'pulmonary_function_tests'],
    unnecessaryTests: ['koh_prep', 'allergy_skin_prick'],
    mustRecognizeFindings: [
      'Raynaud with digital ulcers or skin fibrosis beyond isolated vasospasm',
      'Sclerodactyly shiny tight skin reduced oral aperture',
      'Esophageal reflux dysphagia systemic sclerosis phenotype',
      'Autoantibody profile with anti-Scl-70 supporting diffuse fibrotic risk subset',
      'PFT abnormalities prompting ILD imaging surveillance',
    ],
    commonMisses: [
      'Labeling long-standing Raynaud primary without skin exam or nailfold capillaroscopy pathway',
      'Treating GERD as isolated without systemic evaluation when scleroderma suspected',
      'Skipping pulmonary function testing in diffuse antibody-positive patients',
      'Forgetting blood pressure education for renal crisis albeit different crisis mechanism subset',
      'Underestimating hand function impact contractures have on work',
    ],
    correctDiagnosisExplanation: [
      'Systemic sclerosis manifests vasculopathy and fibrosis of skin and internal organs with characteristic autoantibodies.',
      'Melissa’s fibrosing skin esophageal symptoms Raynaud severity and Scl-70 positivity fit systemic sclerosis over primary Raynaud.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Primary Raynaud phenomenon',
        whyLessLikely: 'Lacks progressive sclerodactyly and scleroderma-associated autoantibody.',
      },
      {
        diagnosis: 'Mixed connective tissue disease',
        whyLessLikely: 'Overlap serology U1 RNP centric features not emphasized in this vignette.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): Raynaud pattern 25, skin findings 25, autoimmune testing 25, diagnosis 25.',
      'Useful: ANA subset antibodies PFTs HRCT if abnormal symptoms renal monitoring education.',
      'Lower priority: fungal scrapes unrelated rash workup unless distinct lesion.',
    ],
    vocabTerms: ['Raynaud phenomenon', 'sclerodactyly', 'anti-Scl-70', 'interstitial lung disease', 'esophageal dysmotility'],
  },

  'obgyn-ectopic-jessica-missed-period': {
    keyHistoryQuestions: [
      'lmp missed period weeks pregnant possibility',
      'unilateral pelvic pain sharp spotting vaginal bleeding',
      'sexual activity contraception iud prior ectopic',
      'dizziness syncope shoulder pain peritoneal symptoms',
      'fever discharge uti gastrointestinal symptoms',
    ],
    keyExamItems: ['general', 'abdomen', 'pelvic'],
    criticalTests: ['pregnancy_test', 'quantitative_beta_hcg', 'transvaginal_ultrasound', 'cbc'],
    unnecessaryTests: ['knee_xray', 'sinus_ct'],
    mustRecognizeFindings: [
      'Early pregnancy with pelvic pain and bleeding is ectopic until intrauterine pregnancy clarified',
      'Hemodynamic instability or peritoneal signs imply rupture risk and urgency',
      'Cervical motion tenderness and adnexal findings on exam heighten suspicion',
      'Positive hCG without IUP on ultrasound is a pregnancy-of-unknown-location pathway',
      'Left-sided pain still warrants broad surgical differentials during workup',
    ],
    commonMisses: [
      'Anchoring on miscarriage without imaging location',
      'Not ordering quantitative hCG with transvaginal ultrasound together',
      'Minimizing sexual history impact on risk stratification',
      'Forgetting repeat vital signs during ED stay',
      'Delaying obstetrics consultation when imaging suggests ectopic',
    ],
    correctDiagnosisExplanation: [
      'Ectopic pregnancy is implantation outside the uterine cavity—often tubal—with rupture risk and hemorrhagic shock potential.',
      'Jessica’s amenorrhea, pelvic pain, spotting, unstable vitals for context, and absent IUP with concerning adnexal findings align with ectopic pregnancy over simple threatened abortion.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Ovarian torsion',
        whyLessLikely: 'Pregnancy test positive with free fluid mass pattern shifts priority to pregnancy complication workup first.',
      },
      {
        diagnosis: 'Spontaneous abortion',
        whyLessLikely: 'Intrauterine products usually seen in completed uterine loss—here ultrasound did not show IUP at expected threshold.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): pregnancy emergency recognition 35, beta-hCG and TVUS 25, missed-period clue 15, diagnosis 25. Bonus: rupture risk +10.',
      'Useful: urine and serum hCG CBC type screen Rh typing and urgent OB/GYN coordination.',
      'Lower priority: CT abdomen pelvis as first-line in stable first-trimester pregnancy evaluation—ultrasound-centered.',
    ],
    vocabTerms: ['beta-hCG', 'pregnancy of unknown location', 'tubal pregnancy', 'cervical motion tenderness', 'rupture'],
  },

  'obgyn-pcos-emily-irregular-cycles': {
    keyHistoryQuestions: [
      'menstrual pattern months between periods lmp dating',
      'acne hirsutism hair growth voice change virilization pace',
      'weight change diet exercise insulin resistance clues',
      'contraception sexual activity pregnancy possibility',
      'thyroid symptoms family diabetes medications',
    ],
    keyExamItems: ['general', 'skin', 'abdomen'],
    criticalTests: ['serum_testosterone_total', 'transvaginal_ultrasound', 'tsh', 'hba1c', 'pregnancy_test'],
    unnecessaryTests: ['ct-head', 'quantiferon_tb'],
    mustRecognizeFindings: [
      'Chronic oligomenorrhea plus hyperandrogen skin exam suggests PCOS after mimics excluded',
      'Polycystic ovarian morphology supports phenotype—not sole diagnostic',
      'Metabolic screening with HbA1c aligns with cardiometabolic comorbidity risk',
      'Normal TSH reduces hypothyroidism as driver here',
      'Negative pregnancy test helps interpret amenorrhea',
    ],
    commonMisses: [
      'Labeling PCOS without pregnancy and thyroid screening',
      'Ordering only ultrasound without androgen or glucose assessment',
      'Dismissing fertility or mood impact in young patients',
      'Underestimating need for lipid BP counseling longer term',
      'Missing medication-induced hyperandrogenism when relevant',
    ],
    correctDiagnosisExplanation: [
      'PCOS is a common endocrine syndrome of hyperandrogenism and ovulatory dysfunction with exclusion of related disorders.',
      'Emily’s long irregular cycles acne and hirsutism with elevated testosterone and polycystic ovarian imaging after TSH pregnancy and metabolic screen fits PCOS.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Hypothyroidism',
        whyLessLikely: 'TSH normal here; would cause cycle changes without this androgenic picture.',
      },
      {
        diagnosis: 'Hyperprolactinemia',
        whyLessLikely: 'May oligomenorrhea—galactorrhea and prolactin not driving this vignette.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): PCOS symptom recognition 30, endocrine workup 20, menstrual abnormalities 25, diagnosis 25.',
      'Useful: testosterone pelvic ultrasound TSH pregnancy test HbA1c blood pressure weight counseling.',
      'Lower priority: unrelated imaging without focal symptoms.',
    ],
    vocabTerms: ['hyperandrogenism', 'oligomenorrhea', 'insulin resistance', 'polycystic ovaries', 'Rotterdam criteria'],
  },

  'obgyn-miscarriage-ashley-bleeding': {
    keyHistoryQuestions: [
      'gestational age dating pretrial bleeding pad count',
      'cramping tissue passage fever chills discharge odor',
      'prior pregnancy losses rh status bleeding disorder meds',
      'abdominal pain localization ectopic red flags',
      'partner support safety IPV concerns if relevant',
    ],
    keyExamItems: ['general', 'abdomen', 'pelvic'],
    criticalTests: ['transvaginal_ultrasound', 'quantitative_beta_hcg', 'cbc'],
    unnecessaryTests: ['ct-head', 'lipid'],
    mustRecognizeFindings: [
      'First-trimester bleeding requires hemodynamic assessment and quantified blood loss',
      'Ultrasound determines IUP viability and guides ectopic exclusion',
      'Declining hCG with nonviable ultrasound documents completed or completing loss',
      'Emotional support and clear return precautions matter as much as documentation',
      'Rh immune globulin decisions follow institutional protocol when indicated',
    ],
    commonMisses: [
      'Underestimating bleeding severity without pad counts and orthostatics',
      'Skipping ectopic pregnancy consideration before definitive imaging',
      'No follow-up plan for repeat hCG or tissue review pathways',
      'Neglecting contraception discussion once stable',
      'Dismissing trauma or coagulopathy clues if bleeding disproportionate',
    ],
    correctDiagnosisExplanation: [
      'Spontaneous abortion is pregnancy loss before viability—often with bleeding cramping and ultrasound documentation of nonviability or retained tissue.',
      'Ashley’s worsening bleeding cramping prior confirmed early pregnancy with ultrasound showing nonviability and failing hCG aligns with miscarriage management pathways.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Ectopic pregnancy',
        whyLessLikely: 'Must be ruled out early—here intrauterine nonviable gestation clarifies course once seen.',
      },
      {
        diagnosis: 'Threatened abortion',
        whyLessLikely: 'Implies possible continuation—imaging here progressed beyond threatened spectrum.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): pregnancy complication recognition 30, ultrasound 20, bleeding severity 25, diagnosis 25.',
      'Useful: TVUS quantitative hCG CBC Rh type type screen transfusion thresholds if heavy.',
      'Lower priority: lipid or unrelated chronic panels during acute bleed.',
    ],
    vocabTerms: ['threatened abortion', 'inevitable abortion', 'missed abortion', 'completed abortion', 'RhIg'],
  },

  'obgyn-pid-maria-discharge': {
    keyHistoryQuestions: [
      'pelvic pain discharge odor fever chills',
      'new partners barrier contraception sti history',
      'lmp pregnancy possibility dyspareunia urinary symptoms',
      'prior pid iud procedures postpartum procedures',
      'oral tolerance vomiting sepsis concerns',
    ],
    keyExamItems: ['general', 'abdomen', 'pelvic'],
    criticalTests: ['pregnancy_test', 'sti_gc_ct_naat', 'cbc', 'transvaginal_ultrasound'],
    unnecessaryTests: ['ct-head', 'hip_ultrasound'],
    mustRecognizeFindings: [
      'Fever purulent discharge cervicitis and cervical motion tenderness suggest PID',
      'NAAT-directed gonorrhea chlamydia testing guides therapy and partner treatment',
      'Leukocytosis supports bacterial inflammatory picture',
      'Ultrasound helps exclude tubo-ovarian abscess when severe',
      'Negative pregnancy test still mandatory in pelvic pain evaluation',
    ],
    commonMisses: [
      'Treating only dysuria as simple UTI without exam',
      'No partner notification or empiric dual pathogen coverage per guidelines',
      'Missing abscess signs needing admission drainage consideration',
      'Forgetting re-test of cure or reinfection mitigation counseling',
      'Omitting HIV syphilis screening per local protocol when indicated',
    ],
    correctDiagnosisExplanation: [
      'PID is infection ascending from cervix to endometrium tubes and ovaries—often STI-associated with pelvic exam findings.',
      'Maria’s fevers purulent discharge dyspareunia exam tenderness and positive gonorrhea NAAT with leukocytosis support PID over isolated cyst or UTI.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Urinary tract infection',
        whyLessLikely: 'Mucopurulent cervicitis and motion tenderness outweigh isolated cystitis odds.',
      },
      {
        diagnosis: 'Ovarian cyst complication',
        whyLessLikely: 'Infection markers and NAAT positivity pivot to PID; imaging here does not show abscess.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): PID findings 30, STI testing 25, sexual risk history 20, diagnosis 25.',
      'Useful: pregnancy test NAAT CBC ultrasound if toxicity or uncertain exam treatment per CDC-style breadth.',
      'Lower priority: unrelated musculoskeletal films without focal injury story.',
    ],
    vocabTerms: ['cervical motion tenderness', 'NAAT', 'PID', 'GC', 'chlamydia', 'tubo-ovarian abscess'],
  },

  'obgyn-preeclampsia-rebecca-headache-swelling': {
    keyHistoryQuestions: [
      'gestational age prenatal bp baseline headache visual changes',
      'ruq pain nausea vomiting epigastric pain',
      'edema progression fetal movement urine symptoms',
      'past pregnancy hypertension renal disease migraine history',
      'medications supplements aspirin use at home bp readings',
    ],
    keyExamItems: ['general', 'neuro', 'abdomen'],
    criticalTests: ['ua', 'urine_protein_creatinine_ratio', 'cbc', 'cmp'],
    unnecessaryTests: ['ct-head', 'sinus_ct'],
    mustRecognizeFindings: [
      'Severe range BP with neurovisual symptoms after 20 weeks suggests preeclampsia with severe features',
      'Proteinuria on UA and elevated protein-to-creatinine ratio supports diagnosis adjunct',
      'RUQ pain transaminitis raises HELLP surveillance with platelet check',
      'Hyperreflexia milder than eclampsia but part of pre-eclampsia exam spectrum in triage',
      'Fetal well-being assessment parallels maternal stabilization institutionally',
    ],
    commonMisses: [
      'Attributing headache only to migraine without BP and urine check',
      'Not quantifying proteinuria after dipstick positive',
      'Skipping LFT platelet recheck when transaminases begin rising',
      'Discharging home with severe-range pressures and symptoms',
      'Ignoring patient-reported decreased fetal movement',
    ],
    correctDiagnosisExplanation: [
      'Preeclampsia is new hypertension in pregnancy after 20 weeks often with proteinuria or organ dysfunction endpoints.',
      'Rebecca’s third-trimester severe blood pressure headache scotomata edema RUQ discomfort proteinuria and reflex changes fit preeclampsia with severe features pending full HELLP labs monitoring.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Chronic hypertension',
        whyLessLikely: 'New proteinuria and neuro symptoms in third trimester pivot to pregnancy-specific syndrome.',
      },
      {
        diagnosis: 'Migraine',
        whyLessLikely: 'May coexist but does not replace pregnancy hypertension proteinuria evaluation.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): pregnancy hypertension emergency 35, urine protein studies 20, neuro symptoms 20, diagnosis 25. Bonus: seizure risk +10.',
      'Useful: UA UPCR CBC CMP MgSO4 and antihypertensive pathways per OB fetal monitoring timing delivery decisions.',
      'Lower priority: outpatient neurology workup before obstetric stabilization.',
    ],
    vocabTerms: ['preeclampsia', 'proteinuria', 'severe features', 'HELLP', 'magnesium sulfate', 'eclampsia'],
  },

  'ortho-acl-jordan-soccer-pivot': {
    keyHistoryQuestions: [
      'noncontact pivot deceleration planting mechanism pop timing',
      'hemarthrosis swelling minutes hours weight bearing instability',
      'prior knee surgery locking catching meniscus sensation',
      'medications anticoagulation bleeding disorder sickle trait',
      'neurovascular symptoms foot numbness cold pulse',
    ],
    keyExamItems: ['general', 'knee', 'neurovascular'],
    criticalTests: ['knee_xray', 'mri_knee', 'neurovascular_exam_limbs'],
    unnecessaryTests: ['ct-head', 'quantiferon_tb'],
    mustRecognizeFindings: [
      'Pivoting athlete with audible pop and rapid effusion suggests cruciate injury',
      'Positive Lachman exam with MRI ACL discontinuity seals diagnosis',
      'Radiographs fracture-screen before MRI pathway',
      'Instability with planned return to cutting sports informs surgical counseling',
      'Distal neurovascular integrity documented in acute knee trauma',
    ],
    commonMisses: [
      'Stopping at normal X-ray without MRI in classic ACL story',
      'Anchoring on meniscal locking without ligament exam',
      'Missing multiligament or vascular limb threat in high-energy variants',
      'Omitting occupational impact and PT expectations discussion',
      'Underestimating concurrent bone bruise recovery time even after surgery',
    ],
    correctDiagnosisExplanation: [
      'ACL tear is complete or partial disruption of the anterior cruciate ligament—often noncontact pivot in young athletes with effusion and laxity.',
      'Jordan’s noncontact pop rapid hemarthrosis laxity on Lachman and MRI ACL rupture with typical contusion pattern fit ACL tear over isolated meniscus or patellar dislocation.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Meniscus tear',
        whyLessLikely: 'May coexist but cruciate exam and MRI primary finding emphasize ACL disruption.',
      },
      {
        diagnosis: 'Tibial plateau fracture',
        whyLessLikely: 'Radiographs negative here—must rule out in trauma but not current diagnosis.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): noncontact mechanism 25, pop/swelling 25, MRI 25, diagnosis 25.',
      'Useful: knee radiographs MRI focused neurovascular checks orthopaedic sports follow-up.',
      'Lower priority: unrelated infectious serologies without systemic signs.',
    ],
    vocabTerms: ['Lachman', 'pivot shift', 'hemarthrosis', 'bone bruise', 'ACL reconstruction'],
  },

  'ortho-femoral-neck-margaret-kitchen-fall': {
    keyHistoryQuestions: [
      'fall height surface head strike anticoagulation',
      'weight bearing status pain location rotation deformity',
      'osteoporosis treatment prior fractures vision balance',
      'medications anticoagulant steroid use alcohol',
      'systemic hypotension blood loss symptoms',
    ],
    keyExamItems: ['general', 'hip', 'neurovascular'],
    criticalTests: ['hip_xray', 'cbc', 'cmp'],
    unnecessaryTests: ['mri_brain', 'sinus_ct'],
    mustRecognizeFindings: [
      'Elderly low-energy fall with non-weight-bearing painful hip and external rotation shortening points to proximal femur fracture',
      'AP pelvis and lateral hip image the lesion—CT for occult or surgical mapping',
      'Orthogeriatric comorbidity optimization improves outcomes',
      'Distinguish femoral neck versus intertrochanteric level for implant choice',
      'Neurovascular check remains standard despite intact pulses often',
    ],
    commonMisses: [
      'Assuming pulled muscle in shortened extremity',
      'Not obtaining pelvis imaging after mechanical fall non-weight-bearing',
      'Missing anticoagulation reversal needs preoperatively when applicable',
      'Ignoring delirium risk post fracture surgery in elders',
      'Forgetting DVT prophylaxis planning',
    ],
    correctDiagnosisExplanation: [
      'Femoral neck fracture is a proximal femoral injury often in older adults with osteoporosis after falls—presentation with shortened externally rotated leg.',
      'Margaret’s mechanical fall osteoporosis background inability to bear weight deformity and radiographic femoral neck break align with operative hip fracture management pathway.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Hip dislocation',
        whyLessLikely: 'Usually high-energy without fracture—or fracture-dislocation—imaging here shows neck fracture pattern.',
      },
      {
        diagnosis: 'Muscle strain',
        whyLessLikely: 'Does not produce classic shortening external rotation and zero weight-bearing tolerance.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): non-weight-bearing 25, deformity 25, X-ray 25, diagnosis 25.',
      'Useful: AP pelvis lateral hip CBC CMP type screen orthopaedic consult perioperative risk stratification.',
      'Lower priority: knee-only films missing the hip lesion.',
    ],
    vocabTerms: ['femoral neck', 'Garden classification', 'intertrochanteric', 'osteoporosis', 'orthogeriatrics'],
  },

  'ortho-shoulder-dislocation-brandon-basketball': {
    keyHistoryQuestions: [
      'abduction external rotation mechanism contact versus noncontact',
      'prior shoulder instability reductions',
      'numbness weakness distal pulses sensory patches',
      'occupational lifting timeline return to sport',
      'associated head trauma neuro symptoms',
    ],
    keyExamItems: ['general', 'shoulder', 'neurovascular'],
    criticalTests: ['shoulder_xray', 'neurovascular_exam_limbs'],
    unnecessaryTests: ['knee_xray', 'lipid'],
    mustRecognizeFindings: [
      'Anterior shoulder dislocation classically follows ABER force in athletes',
      'Squared shoulder deformity and limited active motion suggest dislocation before film',
      'Axillary nerve function checks precede and follow reduction',
      'Radiographs confirm direction and exclude large tuberosity fracture',
      'Immobilization and recurrence counseling after reduction',
    ],
    commonMisses: [
      'Skipping post-reduction neuro reassessment',
      'Confusing AC separation deformity with glenohumeral dislocation',
      'Assuming spontaneous reduction without imaging documentation',
      'Missing concurrent rotator cuff tear consideration in older adults',
      'Returning early to contact sport without orthopaedic clearance',
    ],
    correctDiagnosisExplanation: [
      'Anterior glenohumeral dislocation displaces humeral head anteriorly—common after basketball falls forcing the arm backward.',
      'Brandon’s ABER injury obvious deformity and confirming X-ray demonstrate anterior dislocation over isolated cuff tear or AC injury.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Proximal humerus fracture',
        whyLessLikely: 'Films highlight dislocation without displaced fracture description—coexistence needs scrutiny.',
      },
      {
        diagnosis: 'Rotator cuff tear',
        whyLessLikely: 'May follow trauma but initial presentation dominated by joint dislocation.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): mechanism 25, deformity 25, imaging 25, diagnosis 25.',
      'Useful: shoulder series neurovascular documentation reduction with repeat exam orthopaedic follow-up MRI if recurrent instability.',
      'Lower priority: unrelated metabolic lipid screening acutely.',
    ],
    vocabTerms: ['ABER', 'axillary nerve', 'Bankart', 'glenohumeral', 'closed reduction'],
  },

  'ortho-scaphoid-tyler-foosh-wrist': {
    keyHistoryQuestions: [
      'foosh height axial load snuffbox pain duration',
      'prior xray location discharge instructions immobilization adherence',
      'grip weakness occupational sport demands',
      'numbness median nerve ulnar distribution',
      'repeat injury training loads',
    ],
    keyExamItems: ['general', 'wrist', 'neurovascular'],
    criticalTests: ['wrist_xray_scaphoid', 'mri_wrist'],
    unnecessaryTests: ['ct-head', 'covid'],
    mustRecognizeFindings: [
      'Persistent snuffbox tenderness after FOOSH mandates scaphoid vigilance despite early films',
      'Repeat dedicated views and MRI/CT reduce missed fracture risk',
      'Proximal pole fractures carry AVN teaching importance',
      'Thumb spica immobilization protects while staging care',
      'Return-to-play only after orthopaedic fracture union risk assessment',
    ],
    commonMisses: [
      'Accepting one negative film without follow-up in high-risk exam',
      'Diagnosing sprain without advanced imaging when focal tenderness persists',
      'Missing concurrent distal radius injury evaluation',
      'Allowing full weight bearing through wrist prematurely',
      'Ignoring nutritional bone health in young athletes with delayed healing',
    ],
    correctDiagnosisExplanation: [
      'Scaphoid fracture is carpal injury classically from FOOSH—snuffbox tenderness sensitive and early radiographs falsely negative often.',
      'Tyler’s persistent snuffbox findings with MRI-confirmed waist fracture align with occult scaphoid break after initial false reassurance.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Wrist sprain',
        whyLessLikely: 'Improving sprain unlikely with focal deep snuffbox pain a week later and MRI fracture line.',
      },
      {
        diagnosis: 'Distal radius fracture',
        whyLessLikely: 'Should be considered—but imaging emphasis and MRI show scaphoid disruption dominant.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): FOOSH 25, snuffbox tenderness 30, advanced imaging 20, diagnosis 25.',
      'Useful: scaphoid-view radiographs MRI wrist thumb spica orthopaedic hand consult.',
      'Lower priority: unrelated infectious testing during isolated wrist evaluation.',
    ],
    vocabTerms: ['snuffbox', 'scaphoid waist', 'FOOSH', 'thumb spica', 'nonunion'],
  },

  'ortho-compartment-david-construction-crush': {
    keyHistoryQuestions: [
      'crush duration weight extrication fracture sensation timeline',
      'pain severity analgesic response passive stretch worsening',
      'numbness weakness foot drop pulses skin changes',
      'pigmenturia hydration urine output medications',
      'occupational tight boots casts splints pressure',
    ],
    keyExamItems: ['general', 'leg', 'neurovascular'],
    criticalTests: ['compartment_pressure_measurement', 'ck', 'xray_extremity', 'cbc'],
    unnecessaryTests: ['sinus_ct', 'phq9'],
    mustRecognizeFindings: [
      'Escalating pain out of proportion after crush injury is compartment syndrome until proven otherwise',
      'Pain with passive stretch and tense compartment are key exam anchors',
      'Pressure measurement supports but clinical diagnosis can proceed without delay',
      'CK elevation and rhabdomyolysis risk parallel renal monitoring',
      'Fasciotomy is time-critical—not a tomorrow problem when criteria met',
    ],
    commonMisses: [
      'Attributing symptoms solely to fracture analgesia gaps',
      'Relying on intact pulses to rule out compartment syndrome',
      'Delaying orthopaedic surgery consult for pressure confirmation bureaucracy',
      'Confusing cellulitis without erythema warmth trail',
      'Missing urine myoglobin monitoring and IV fluid resuscitation alignment',
    ],
    correctDiagnosisExplanation: [
      'Acute compartment syndrome is elevated intracompartmental pressure compromising perfusion—surgical fasciotomy emergency.',
      'David’s crush with worsening pain passive-stretch pain tense compartment sensory changes elevated pressures and CK constitute traumatic compartment syndrome.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Deep vein thrombosis',
        whyLessLikely: 'Acute traumatic timeline and compartment exam/pressures argue against primary DVT.',
      },
      {
        diagnosis: 'Cellulitis',
        whyLessLikely: 'Lacks infectious skin progression; pain pattern centers on compartment physiology.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): surgical emergency 35, pain out of proportion 25, compartment evaluation 15, diagnosis 25. Bonus: fasciotomy urgency +10.',
      'Useful: compartment pressures extremity films CK BMP creatinine trend urine output monitoring emergent orthopaedic surgery.',
      'Lower priority: psychiatric questionnaires or sinus imaging unrelated to limb ischemia.',
    ],
    vocabTerms: ['compartment syndrome', 'fasciotomy', 'passive stretch pain', 'rhabdomyolysis', 'delta pressure'],
  },

  'heme-itp-olivia-easy-bruising': {
    keyHistoryQuestions: [
      'mucosal bleeding gums nose periods duration',
      'trauma medication supplements herbal ibuprofen new drugs',
      'fever infection weight loss night sweats',
      'family bleeding disorder platelet history',
      'transfusion prior pregnancies sick contacts',
    ],
    keyExamItems: ['general', 'skin', 'heent'],
    criticalTests: ['cbc', 'peripheral_blood_smear', 'pt_inr', 'ptt_aptt'],
    unnecessaryTests: ['ct-head', 'knee_xray'],
    mustRecognizeFindings: [
      'Petechiae and mucosal bleeding with isolated thrombocytopenia',
      'Normal PT aPTT argues against DIC or isolated factor deficiency first-line',
      'Smear without blasts supports destructive platelet process over acute leukemia on initial screen',
      'Absence of massive splenomegaly fits common ITP picture though not absolute',
      'Severity guides observation steroids IVIG TPO agonists per pediatric-adult risk',
    ],
    commonMisses: [
      'Assuming normal teen bruising without quantifying platelets',
      'Ordering only PT without aPTT in mucosal bleed',
      'Missing medication-induced thrombocytopenia re-review',
      'Delaying bleeding precautions when counts critically low',
      'Skipping pregnancy implications in reproductive-age patients',
    ],
    correctDiagnosisExplanation: [
      'ITP is immune-mediated platelet destruction often presenting with mucocutaneous bleeding and isolated thrombocytopenia.',
      'Olivia’s easy bruising epistaxis gum bleeding severe thrombocytopenia with normal coagulation and smear pattern aligns with ITP over DIC or leukemia on initial data.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Acute leukemia',
        whyLessLikely: 'Typically additional cytopenias or circulating blasts—CBC pattern here isolates platelets primarily.',
      },
      {
        diagnosis: 'Disseminated intravascular coagulation',
        whyLessLikely: 'Expect prolonged coagulation tests consumptive pattern and critical illness context.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): bleeding pattern 30, CBC 25, platelet clues 20, diagnosis 25.',
      'Useful: CBC manual smear PT aPTT careful medication history pregnancy test when relevant specialist follow-up.',
      'Lower priority: unrelated musculoskeletal imaging without focal findings.',
    ],
    vocabTerms: ['thrombocytopenia', 'petechiae', 'purpura', 'ITP', 'DIC', 'mucosal bleeding'],
  },

  'heme-iron-jessica-fatigue-sob': {
    keyHistoryQuestions: [
      'menorrhagia clots gynecology contraception fibroids',
      'pica ice pagophagia dietary iron',
      'gi bleeding melena hematochezia nsaids',
      'pregnancy vegetarian bariatric surgery',
      'family thalassemia iron history',
    ],
    keyExamItems: ['general', 'cardiac', 'abdomen'],
    criticalTests: ['cbc', 'iron_studies', 'ferritin', 'reticulocyte_count'],
    unnecessaryTests: ['ct-head', 'mri_brain'],
    mustRecognizeFindings: [
      'Microcytic anemia with heavy menses as iron loss driver',
      'Low ferritin confirms iron deficiency over anemia of chronic inflammation pattern',
      'Tachycardia pallor exertional dyspnea fit symptomatic anemia',
      'Retic inadequacy supports marrow limited by iron not hemolysis compensation',
      'Pica ice subtle high-yield historical clue',
    ],
    commonMisses: [
      'Treating fatigue as depression alone without CBC',
      'Ignoring menorrhagia as pathologic blood loss',
      'Confusing thalassemia trait microcytosis without iron studies electrophoresis when unclear',
      'Omitting GI evaluation when age or alarm features warrant',
      'Using empiric iron without confirming deficiency when unclear',
    ],
    correctDiagnosisExplanation: [
      'Iron deficiency anemia develops when iron stores cannot support erythropoiesis—often menstrual or GI loss.',
      'Jessica’s microcytosis menorrhagia pica ice fatigue dyspnea with low ferritin and iron pattern supports IDA.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Thalassemia trait',
        whyLessLikely: 'Microcytosis with iron deficiency indices argues against isolated trait without iron overlap.',
      },
      {
        diagnosis: 'Anemia of chronic disease',
        whyLessLikely: 'Usually higher ferritin or normocytic pattern—inflammatory block not primary Labs here.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): anemia symptoms 25, bleeding history 25, iron studies 25, diagnosis 25. Bonus: pica ice +10.',
      'Useful: CBC iron panel ferritin reticulocyte evaluate blood loss sources GI when indicated.',
      'Lower priority: neuroimaging unrelated to anemia presentation.',
    ],
    vocabTerms: ['ferritin', 'TIBC', 'microcytic', 'menorrhagia', 'pagophagia', 'iron deficiency'],
  },

  'heme-hodgkin-andrew-cervical-nodes': {
    keyHistoryQuestions: [
      'lymph node growth painless versus tender',
      'b symptoms fevers sweats weight appetite',
      'hiv tb risk exposures pruritus alcohol pain nodes',
      'chest symptoms cough mediastinal mass',
      'family lymphoma autoimmune medications',
    ],
    keyExamItems: ['general', 'lymph', 'abdomen'],
    criticalTests: ['lymph_node_biopsy', 'cbc', 'esr_crp', 'cxr'],
    unnecessaryTests: ['skin_scraping', 'otoscopy_pneumatic'],
    mustRecognizeFindings: [
      'Progressive painless rubbery nodes with systemic B symptoms in young adult',
      'Excisional biopsy with Reed–Sternberg histology anchors Hodgkin diagnosis',
      'Mediastinal widening on CXR raises staging urgency',
      'Mild splenomegaly can occur—distinguishing infectious mono reactive from lymphoma requires pathology',
      'Avoid empiric steroids before biopsy when lymphoma suspected',
    ],
    commonMisses: [
      'Anchoring on viral illness for months of adenopathy',
      'Settling for needle aspirate without adequate tissue architecture',
      'Ignoring TB testing in fevers night sweats pathways',
      'Missing alcohol-induced node pain clue when present',
      'Skipping staging discussion after pathology returns',
    ],
    correctDiagnosisExplanation: [
      'Hodgkin lymphoma is lymphoid malignancy with classic Hodgkin cells on histology often in young adults with B symptoms.',
      'Andrew’s progressive cervical lymphadenopathy night sweats weight loss low grade fever splenomegaly mediastinal concern and Reed–Sternberg biopsy establish Hodgkin.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Non-Hodgkin lymphoma',
        whyLessLikely: 'Biopsy immunophenotype separates NHL subtypes—histology here classic Hodgkin.',
      },
      {
        diagnosis: 'Tuberculosis',
        whyLessLikely: 'Overlapping B symptoms—node biopsy redirects from granulomatous TB without lymphoma.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): B symptoms 30, biopsy 25, painless adenopathy 20, diagnosis 25.',
      'Useful: excisional node biopsy CBC ESR/CRP CXR CT PET staging infectious screens per protocol.',
      'Lower priority: topical dermatology testing unrelated to node syndrome.',
    ],
    vocabTerms: ['B symptoms', 'Reed–Sternberg', 'excisional biopsy', 'mediastinal mass', 'staging'],
  },

  'heme-sickle-marcus-voc': {
    keyHistoryQuestions: [
      'known genotype hydroxyurea adherence transfusion history',
      'pain location crisis pattern triggers dehydration exertion cold',
      'fever respiratory symptoms chest pain acute chest concern',
      'focal bone tenderness infection versus infarction',
      'priapism neurologic deficits stroke symptoms',
    ],
    keyExamItems: ['general', 'msk', 'cardiopulmonary'],
    criticalTests: ['cbc', 'peripheral_blood_smear', 'reticulocyte_count'],
    unnecessaryTests: ['sinus_ct', 'phq9'],
    mustRecognizeFindings: [
      'Vaso-occlusive crisis produces severe bone and soft tissue pain in HbSS with triggers',
      'Reticulocytosis and sickle forms support hemolytic marrow response',
      'Differentiate VOC from osteomyelitis using focal exam fever MRI cultures when indicated',
      'Hydration analgesia oxygen monitor acute chest hypoxia incentive spirometry',
      'Avoid mislabeling as simple musculoskeletal strain in known sickle patient',
    ],
    commonMisses: [
      'Undertreating pain biased by opioid stigma',
      'Missing acute chest syndrome evolving hypoxia',
      'Ignoring infection as precipitant requiring antibiotics when febrile',
      'Failing to review vaccines penicillin hydroxyurea adherence',
      'Delaying specialty consultation for exchange indications when criteria met',
    ],
    correctDiagnosisExplanation: [
      'Vaso-occlusive crisis is painful sickling episode of microvascular occlusion in patients with sickle cell disease.',
      'Marcus’s known SS disease dehydration exertion diffuse pain typical of prior crises with sickle cells and retic response supports VOC workup pathway.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Osteomyelitis',
        whyLessLikely: 'Requires focal signs bacteremia imaging—maintain threshold in febrile focal bone pain.',
      },
      {
        diagnosis: 'Acute leukemia',
        whyLessLikely: 'Unexpected blasts cytopenia pattern mismatch in steady-state sickle without evolution story.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): crisis recognition 30, trigger 20, hematology testing 25, diagnosis 25.',
      'Useful: CBC reticulocyte smear BMP bilirubin type screen oxygen saturation CXR if respiratory symptoms cultures if febrile.',
      'Lower priority: psychometric screens unrelated to acute limb crisis.',
    ],
    vocabTerms: ['vaso-occlusive', 'HbSS', 'acute chest syndrome', 'hydroxyurea', 'reticulocyte'],
  },

  'heme-acute-leukemia-noah-infections': {
    keyHistoryQuestions: [
      'infection frequency fever duration neutropenia clues',
      'bruising bleeding gum bone pain pallor energy',
      'hepatosplenomegaly lymphadenopathy masses',
      'transfusion vaccine exposures family malignancy',
      'medications herbal toxins radiation',
    ],
    keyExamItems: ['general', 'skin', 'abdomen'],
    criticalTests: ['cbc', 'peripheral_blood_smear', 'bone_marrow_biopsy'],
    unnecessaryTests: ['knee_xray', 'allergy_skin_prick'],
    mustRecognizeFindings: [
      'Recurrent serious infections with pancytopenia and blast forms suggest marrow replacement',
      'Petechiae bruising bone pain organomegaly pediatric oncologic urgency',
      'Bone marrow biopsy confirms acute leukemia subtype workup flows',
      'Tumor lysis labs LDH uric acid renal monitoring pre-induction',
      'Supportive care antibiotics transfusion neutropenic precautions while staging',
    ],
    commonMisses: [
      'Repeated viral diagnosis without smear in prolonged cytopenia',
      'Assuming ITP with isolated platelet problem ignoring anemia or blasts',
      'Delaying oncology referral for marrow confirmation',
      'Missing family psychosocial support child life involvement',
      'Forgetting CNS prophylaxis pathway context in ALL later (protocol dependent)',
    ],
    correctDiagnosisExplanation: [
      'Acute leukemia is clonal expansion of marrow blasts causing cytopenias infections bleeding and often hepatosplenomegaly.',
      'Noah’s infections fatigue bruising petechiae bone pain pancytopenia blasts on smear and marrow replacement pattern define acute leukemia urgency.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Aplastic anemia',
        whyLessLikely: 'Pancytopenia without leukemic blasts expected—marrow here blastic.',
      },
      {
        diagnosis: 'Immune thrombocytopenic purpura',
        whyLessLikely: 'Does not explain anemia leukopenia blasts marrow infiltration pattern.',
      },
    ],
    clinicalPearls: [
      'Rubric (100): marrow failure signs 30, CBC smear 25, infection pattern 20, diagnosis 25.',
      'Useful: CBC smear marrow aspirate biopsy flow cytogenetics BMP LDH uric acid type screen infection coverage per febrile neutropenia.',
      'Lower priority: environmental allergy testing unrelated to blast crisis presentation.',
    ],
    vocabTerms: ['blast', 'pancytopenia', 'bone marrow', 'induction chemotherapy', 'tumor lysis'],
  },

  'geriatrics-delirium-uti-margaret-russo': {
    keyHistoryQuestions: [
      'acute vs chronic cognitive change and last time normal',
      'caregiver observations and safety concerns',
      'urinary symptoms dysuria frequency urgency',
      'fever chills rigors systemic symptoms',
      'medications recent changes anticholinergics sedatives',
      'hydration intake GI losses',
      'falls head injury gait changes',
    ],
    keyExamItems: ['general', 'abdomen', 'neuro'],
    criticalTests: ['ua', 'cbc', 'cmp', 'ct_head'],
    unnecessaryTests: ['mri_brain'],
    mustRecognizeFindings: [
      'AMS is acute compared with sharp baseline on recent family contact',
      'Urinary frequency several days and tenderness on abdominal exam',
      'UA with positive LE and nitrites compatible with UTI',
      'Leukocytosis without an alternative dominant explanation on initial data',
      'CT head without hemorrhage—helpful to contextualize but does not replace infection recognition',
    ],
    commonMisses: [
      'Attributing confusion to normal aging without infection workup',
      'Skipping collateral history that establishes acute change',
      'Over-focusing on imaging before basic infection labs',
      'Ignoring polypharmacy that may worsen delirium after stabilization',
      'Underestimating fall risk during confused state',
    ],
    correctDiagnosisExplanation: [
      'Delirium is an acute alteration in attention and awareness due to medical causes; UTI is a classic precipitant in older adults.',
      'Margaret’s acute change, urinary symptoms, feverish vitals with tachycardia, UA evidence, leukocytosis, and collateral history fit delirium secondary to UTI best among options.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Ischemic stroke',
        whyLessLikely:
          'Important to consider with acute AMS; screening exam here is nonfocal and CT does not show acute territorial infarct pattern as the leading explanation.',
      },
      {
        diagnosis: 'Medication-related confusion',
        whyLessLikely:
          'Always review meds, but positive urinary markers and systemic leukocytosis point to infection as a major precipitant.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: Delirium reflects brain vulnerability plus a stressor; infection is a frequent reversible driver in elders.',
      'Why it fits: acute time course, caregiver discrepancy from baseline, localizing urinary findings, supportive lab pattern.',
      'Key clues: today’s change, repetition and inattention, urinary frequency, fever/tachycardia, UA positivity, leukocytosis, mild suprapubic tenderness.',
      'Missed clues if you skip them: baseline independence three days prior, medication list review after stabilization, orthostatic vitals if hypotension evolves.',
      'Learning points: use CAM framework cues, treat suspected infection early, reorient gently, minimize restraints, involve PT for safety.',
      'Useful tests: urinalysis, CBC, BMP, CT head when acute focal concern or before anticoagulation—context dependent.',
      'Unnecessary tests: routine MRI for typical nonfocal delirium without red flags.',
      'Geriatric care considerations: caregiver education, delirium precautions, fall precautions, medication simplification.',
      'Medication review considerations: anticholinergic burden, unnecessary sedatives, duplicate therapies, renal dosing as age-related clearance falls.',
      'Rubric (100): acute change 30, collateral 25, infection workup 20, diagnosis 25.',
    ],
    vocabTerms: ['delirium', 'UTI', 'CAM', 'polypharmacy', 'collateral history'],
  },

  'geriatrics-alzheimer-harold-green': {
    keyHistoryQuestions: [
      'memory complaint onset pace gradual vs sudden',
      'IADL impairments finances driving medications',
      'behavioral psychiatric safety hallucinations sleep',
      'family history dementia PD onset',
      'mood motivation energy sleep guilt',
      'neurologic gait weakness focal signs TIA history',
      'caregiver strain and supervision needs',
    ],
    keyExamItems: ['general', 'neuro'],
    criticalTests: ['mmse', 'mri_brain', 'tsh', 'serum_b12', 'cbc'],
    unnecessaryTests: ['ct_head', 'lumbar_puncture'],
    mustRecognizeFindings: [
      'two-year progressive memory decline with functional loss',
      'son’s examples of repetition misplacement bill pay errors',
      'objective cognitive testing impairment',
      'MRI atrophy pattern supporting neurodegenerative change',
      'reversible labs not explaining syndrome',
    ],
    commonMisses: [
      'Taking patient denial at face value without collateral',
      'Skipping reversible dementia labs in a new evaluation',
      'Blaming normal aging for two-year bill-pay failure',
      'Not screening depression thoroughly',
      'Ignoring driving and financial safety',
    ],
    correctDiagnosisExplanation: [
      'Alzheimer disease is the most common neurodegenerative dementia, typically amnestic-predominant with insidious progression.',
      'Harold’s gradual course, short-term memory symptoms with functional decline, MMSE impairment, and MRI atrophy align best with Alzheimer pathology as working diagnosis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Vascular dementia',
        whyLessLikely:
          'Often stepwise with focal events; this history is smoother without clear strokes.',
      },
      {
        diagnosis: 'Vitamin B12 deficiency',
        whyLessLikely: 'Excluded when B12 is normal; still important to check routinely.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: progressive episodic memory impairment with instrumental decline is the classic prodrome.',
      'Why it fits: collateral concrete examples, chronicity, objective testing, neuroimaging support.',
      'Key clues: repeating stories, misplacing items, tax errors, MMSE deficit, MRI atrophy, normal thyroid and B12.',
      'Missed clues: subtle executive errors, medication mix-ups, unsafe driving anecdotes, sleep fragmentation.',
      'Learning points: disclose empathetically, discuss cholinesterase inhibitors where indicated, supervise finances, plan for future care.',
      'Useful tests: MMSE/MoCA, MRI, TSH, B12, CMP as adjunct.',
      'Unnecessary tests: lumbar puncture not routine without atypical flags.',
      'Geriatric care considerations: ADL supports, legal capacity questions, respite for caregivers, home safety.',
      'Medication review considerations: reduce anticholinergics, treat pain and constipation, avoid sedative stacking.',
      'Rubric (100): progressive pattern 30, ADLs 20, reversible workup 25, diagnosis 25.',
    ],
    vocabTerms: ['MCI', 'amnesia', 'IADL', 'neurodegeneration', 'MoCA'],
  },

  'geriatrics-orthostatic-falls-richard-bennett': {
    keyHistoryQuestions: [
      'falls timing injury head strike syncope',
      'dizziness relation to standing duration',
      'fluid intake illness diarrhea bleeding',
      'medication changes diuretics beta blockers alpha blockers',
      'alcohol orthostatic symptoms at home',
      'neurologic deficits focal weakness speech changes',
      'baseline mobility assist devices PT history',
    ],
    keyExamItems: ['general', 'cardiac', 'neuro'],
    criticalTests: ['orthostatic_vitals', 'ecg', 'cbc'],
    unnecessaryTests: ['mri_brain'],
    mustRecognizeFindings: [
      'recurrent falls without LOC but presyncope',
      'symptoms worsened after antihypertensive intensification',
      'documented orthostatic BP drop',
      'polypharmacy with agents that worsen orthostasis',
      'mild gait instability raising injury risk',
    ],
    commonMisses: [
      'Not measuring orthostatic vitals objectively',
      'Ignoring synergistic BP drugs with alpha blocker and diuretic',
      'Stopping evaluation after normal non-positional exam',
      'Missing home hazards and footwear problems',
      'Forgetting to ask about volume losses',
    ],
    correctDiagnosisExplanation: [
      'Orthostatic hypotension is defined by a symptomatic or physiologically meaningful BP fall with standing often worsened by meds and autonomic aging.',
      'Richard’s positional dizziness, fall pattern, and measured orthostatic change after regimen adjustment fit this diagnosis well.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Cardiac arrhythmia',
        whyLessLikely:
          'Important if true syncope; here symptoms align with standing and orthostatic measurements.',
      },
      {
        diagnosis: 'BPPV',
        whyLessLikely: 'Brief spinning vertigo with head movement is not the main story.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: cerebral hypoperfusion on standing produces lightheadedness and falls.',
      'Why it fits: reproducible orthostatic change, medication culprits, fall history.',
      'Key clues: three-month falls, worse on standing, HCTZ/metoprolol/tamsulosin, orthostatic vitals, gait instability.',
      'Missed clues: sodium intake, evening doses, evening polyuria, vision impairment.',
      'Learning points: deprescribe thoughtfully, compression stockings, volume if appropriate, PT, slow position changes.',
      'Useful tests: orthostatic vitals, ECG; labs if anemia/bleed suspected.',
      'Unnecessary tests: MRI without neuro signs.',
      'Geriatric care considerations: bone health, injury prevention, caregiver night checks.',
      'Medication review considerations: reconcile BP goals with symptoms; time diuretics carefully; avoid duplicate antihypertensives.',
      'Rubric (100): medication risk 30, orthostatics 25, falls 20, diagnosis 25.',
    ],
    vocabTerms: ['orthostatic hypotension', 'alpha blocker', 'polypharmacy', 'fall risk', 'deprescribing'],
  },

  'geriatrics-failure-thrive-dorothy-mitchell': {
    keyHistoryQuestions: [
      'weight change timeline clothes fitting',
      'appetite nausea swallowing pain',
      'mood interest guilt energy',
      'mobility weakness falls fear',
      'GI symptoms blood stool constipation',
      'social isolation food access cooking ability',
      'full medication and OTC list especially sedatives',
    ],
    keyExamItems: ['general', 'extremities', 'abdomen'],
    criticalTests: ['cmp', 'serum_albumin', 'cbc', 'phq9', 'mna_short_form'],
    unnecessaryTests: ['ct_head'],
    mustRecognizeFindings: [
      'unintentional weight loss with muscle wasting',
      'functional decline walking cooking bathing',
      'low albumin on labs',
      'MNA-SF high risk PHQ9 depressive symptoms contributory',
      'polypharmacy including sedating antihistamine',
    ],
    commonMisses: [
      'Labeling as normal aging without quantifying weight',
      'Skipping nutrition screen or mood screen',
      'Not reviewing OTC sleep aids',
      'Skipping frailty-informed cancer risk discussion',
      'Ignoring caregiver burnout',
    ],
    correctDiagnosisExplanation: [
      'Failure to thrive describes multifactorial decline with weight loss frailty and function loss often driven by nutrition mood cognition and chronic illness interplay.',
      'Dorothy’s weight loss, weakness, exam wasting, albumin, and screens support a geriatric malnutrition / failure-to-thrive syndrome framework.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Colon cancer',
        whyLessLikely:
          'Must remain on radar; not excluded by this snapshot alone—age-appropriate evaluation follows risk and alarm features.',
      },
      {
        diagnosis: 'Hyperthyroidism',
        whyLessLikely: 'Not highlighted without tachycardia tremor weight loss pattern with low TSH—TSH can be added in broader workup.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: a syndrome requiring multimodal interventions, not a single pill.',
      'Why it fits: documented loss, low intake, weakness, albumin drop, screen results, IADL loss.',
      'Key clues: loose clothing, reduced walking, naps, polypharmacy, diphenhydramine, albumin, MNA-SF, PHQ-9.',
      'Missed clues: dentition dysgeusia poverty food insecurity late diuretic dosing.',
      'Learning points: combine dietitian PT mental health and med reconciliation for synergy.',
      'Useful tests: CMP albumin CBC depression screen nutrition assessment.',
      'Unnecessary tests: brain CT without neuro indication.',
      'Geriatric care considerations: meals programs PERS button home PT caregiver respite.',
      'Medication review considerations: diuretic timing PPI necessity analgesic ladder sedative removal.',
      'Rubric (100): syndrome recognition 30, nutrition 20, function 25, diagnosis 25.',
    ],
    vocabTerms: ['failure to thrive', 'MNA-SF', 'sarcopenia', 'polypharmacy', 'frailty'],
  },

  'geriatrics-stroke-eleanor-foster': {
    keyHistoryQuestions: [
      'exact time last known well witnessed onset',
      'facial arm leg weakness pattern speech vision',
      'headache seizure head trauma',
      'anticoagulation INR warfarin adherence bleeding history',
      'prior afib strokes TIAs',
      'blood pressure history and recent changes',
      'family observation baseline function',
    ],
    keyExamItems: ['general', 'neuro', 'cardiac'],
    criticalTests: ['ct_head', 'cta_head_neck', 'pt_inr', 'fingerstick_glucose'],
    unnecessaryTests: ['pft', 'stress_test'],
    mustRecognizeFindings: [
      'sudden central facial weakness with arm weakness and dysarthria',
      'symptom onset about 45 minutes before arrival',
      'warfarin use elevating bleeding risk discussions',
      'CT shows early ischemia without hemorrhage',
      'CTA supports large vessel pathology context',
    ],
    commonMisses: [
      'Ambiguous timing of onset delaying pathways',
      'Skipping glucose check as mimic',
      'Ignoring anticoagulation status for therapy eligibility',
      'Underestimating caregiver training needs after discharge',
      'Treating hypertension too aggressively acutely without protocol',
    ],
    correctDiagnosisExplanation: [
      'Acute ischemic stroke is sudden focal brain infarction due to arterial occlusion or hypoperfusion; older adults remain thrombolysis/thrombectomy candidates when protocols align.',
      'Eleanor’s abrupt deficits, exam pattern, early CT ischemic changes, and CTA findings support acute ischemic stroke in context of AF and anticoagulation complexity.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Bell palsy',
        whyLessLikely: 'Peripheral pattern without limb weakness; not consistent.',
      },
      {
        diagnosis: 'Hypoglycemia',
        whyLessLikely: 'Excluded with normal point-of-care glucose.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: LMCA syndrome can produce face/arm > leg weakness with speech issues.',
      'Why it fits: sudden onset witnessed deficits imaging concordance.',
      'Key clues: face droop arm drift slurred speech time course warfarin elevated INR early CT change CTA vessel concern.',
      'Missed clues: last dose of warfarin medication list accuracy swallow safety screening',
      'Learning points: activate stroke team document times avoid delays for mimic checks that are fast',
      'Useful tests: noncontrast CT CTA coags glucose',
      'Unnecessary tests: pulmonary function testing not acute priority',
      'Geriatric care considerations: frailty informed goals code status discussion rehab intensity caregiver capacity',
      'Medication review considerations: anticoagulation transitions interaction vigilance fall prevention after weakness',
      'Rubric (100): stroke signs 35 timing 20 emergent imaging coags 20 diagnosis 25',
    ],
    vocabTerms: ['last known well', 'MCA', 'thrombectomy', 'warfarin', 'NIHSS'],
  },

  'urology-retention-bph-thomas-reynolds': {
    keyHistoryQuestions: [
      'duration inability void and last successful void',
      'suprapubic pain fullness trajectory',
      'baseline stream strength hesitancy nocturia sensation emptying',
      'fever dysuria hematuria infection clues',
      'neurologic disease spinal surgery anticholinergic opioid meds',
      'prior urology visits catheters prostate history',
      'fluid intake and precipitating constipation alcohol',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['bladder_scan', 'ua', 'cmp'],
    unnecessaryTests: ['ct_head', 'colonoscopy'],
    mustRecognizeFindings: [
      'painful urinary retention about twelve hours',
      'distended tender suprapubic exam',
      'chronic weak stream nocturia incomplete emptying history',
      'massive residual on bladder scan before catheter',
      'possible mild creatinine bump from obstruction',
    ],
    commonMisses: [
      'Missing chronic LUTS as BPH-risk backdrop',
      'Ordering imaging before bedside bladder volume',
      'Assuming UTI without retention physiology',
      'Ignoring anticholinergic contributors before discharge med reconciliation',
      'Skipping post-relief renal function recheck planning',
    ],
    correctDiagnosisExplanation: [
      'Acute urinary retention is sudden painful inability to void with bladder distention; BPH is a dominant cause in older men with outlet symptoms.',
      'Thomas’s trajectory—hours of blocked voiding, chronic stream and nocturia pattern, exam distention, enormous residual—fits retention on obstructive BPH background.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Prostate cancer',
        whyLessLikely:
          'Consider with alarm features; here chronic typical LUTS and event retention align first with BPH physiology pending formal prostate evaluation.',
      },
      {
        diagnosis: 'Neurogenic bladder',
        whyLessLikely: 'No neurologic storyline or classic neuro risk factors on history.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: outlet obstruction plus bladder decompensation leads to painful overdistention.',
      'Why it fits: hours anuria, suprapubic pain, chronic stream symptoms, scan volume, exam fullness.',
      'Key clues: weak stream years, nocturia, incomplete emptying sensation, tachycardia from discomfort, UA not primary infection pattern.',
      'Missed clues: precipitating constipation, anticholinergics from OTC cold meds, alcohol excess, opioid bowel regimen',
      'Learning points: catheter timeline, renal follow-up, alpha blocker discussion, 5-ARI expectations, recurrence education',
      'Useful tests: bladder scan, UA, BMP, renal ultrasound if hydronephrosis concern',
      'Unnecessary tests: CT head in isolated retention without neuro indication',
      'Urgency considerations: fever with obstructive picture is infected system emergency',
      'Rubric (100): retention 30, BPH history 25, bladder evaluation 20, diagnosis 25',
    ],
    vocabTerms: ['LUTS', 'PVR', 'BOO', 'catheterization', 'BPH'],
  },

  'urology-stone-eric-patel': {
    keyHistoryQuestions: [
      'onset character colic versus steady pain',
      'radiation groin testicle',
      'nausea vomiting appetite',
      'fever rigors infection screen',
      'prior stone history fluid habits',
      'urine color trauma anticoagulation',
      'analgesic response opioid tolerance',
    ],
    keyExamItems: ['general', 'abdomen'],
    criticalTests: ['ua', 'ct_abdomen_pelvis_noncontrast', 'cmp'],
    unnecessaryTests: ['ct_head', 'colonoscopy'],
    mustRecognizeFindings: [
      'sudden severe flank pain with waves',
      'groin radiation and restlessness',
      'CVA tenderness ipsilateral',
      'microscopic hematuria on UA',
      'CT without contrast ureteral stone with obstructive changes',
    ],
    commonMisses: [
      'Anchoring on musculoskeletal back pain without stone imaging',
      'Missing fever as infected obstruction red flag',
      'Skipping rapid analgesia and antiemesis while arranging CT',
      'Forgetting stone prevention follow-up after acute episode',
      'Ignoring aspirin NSAID risks if contraindicated',
    ],
    correctDiagnosisExplanation: [
      'Ureteral calculus causes flank colic from obstruction and ureteral smooth muscle spasm, often with hematuria.',
      'Eric’s colicky flank-to-groin pain, CVA tenderness, hematuria, and CT ureteral stone align with ureteral nephrolithiasis.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Pyelonephritis',
        whyLessLikely: 'Expect fever and pyuria more definitively; monitor if vitals change.',
      },
      {
        diagnosis: 'Abdominal aortic aneurysm',
        whyLessLikely: 'Important vascular mimic; CT stone protocol here clarifies calculus instead.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: stone migration produces intermittent severe colic with hematuria.',
      'Why it fits: waves of pain, nausea, restlessness, UA blood, CT calculus.',
      'Key clues: flank pain, groin radiation, CVA tenderness, absence of fever, obstructive CT pattern.',
      'Missed clues: occupational dehydration, prior stone events, family history, high dietary sodium patterns',
      'Learning points: NSAID-first pathways when safe, shared decision on tamsulosin, return precautions for fever',
      'Useful tests: noncontrast CT stone protocol, UA, BMP',
      'Unnecessary tests: contrast CT as initial stone test',
      'Urgency considerations: infected obstructed kidney requires emergent decompression pathway',
      'Rubric (100): colicky pain 30, radiation 20, CT 25, diagnosis 25',
    ],
    vocabTerms: ['nephrolithiasis', 'CVA', 'hydroureteronephrosis', 'tamsulosin', 'hematuria'],
  },

  'urology-hematuria-bladder-james-carter': {
    keyHistoryQuestions: [
      'gross versus microscopic hematuria timing',
      'pain dysuria fever infection symptoms',
      'tobacco occupational exposures aromatic amines',
      'prior pelvic radiation cyclophosphamide',
      'anticoagulation trauma exercise related urine color',
      'weight loss bone pain constitutional B symptoms',
      'family GU cancer history prior hematuria workup',
    ],
    keyExamItems: ['general', 'other'],
    criticalTests: ['ua', 'ct_urogram', 'cystoscopy', 'urine_cytology'],
    unnecessaryTests: ['ct_head', 'phq9'],
    mustRecognizeFindings: [
      'painless gross hematuria in older smoker',
      'UA confirms blood without UTI dominance',
      'CT urogram bladder lesion concern',
      'cystoscopic bladder mass',
      'cytology suspicious for urothelial carcinoma',
    ],
    commonMisses: [
      'Attributing painless gross blood to benign prostatitis without workup',
      'Skipping cystoscopy while relying on imaging alone',
      'Not quantifying pack-years and cessation counseling',
      'Dismissing cytology or tissue diagnosis pathway',
      'Forgetting upper tract evaluation on urogram',
    ],
    correctDiagnosisExplanation: [
      'Bladder urothelial cancer classically presents with painless gross hematuria; smoking is a leading modifiable risk.',
      'James’s painless visible blood, tobacco burden, imaging bladder defect, and cystoscopic mass converge on bladder cancer.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Kidney stone',
        whyLessLikely: 'Often painful with colic; urogram here highlights bladder lesion.',
      },
      {
        diagnosis: 'Renal cell carcinoma',
        whyLessLikely: 'Remains differential until upper tract fully imaged—urogram helps rule in or out.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: urothelial malignancy friable vessels bleed into urine without infection pain.',
      'Why it fits: smoker, painless gross blood, bladder mass on cystoscopy, supportive imaging.',
      'Key clues: visible blood, no fever, no flank colic, cytology, urogram findings.',
      'Missed clues: workplace chemical exposure dipstick-only prior evaluations anticoagulation dose',
      'Learning points: timely urology referral TURBT pathway smoking cessation surveillance nuances',
      'Useful tests: UA, CT urogram, cystoscopy, urine cytology',
      'Unnecessary tests: psych screening unrelated to hematuria chief complaint initially',
      'Urgency considerations: clot retention or anemia warrants emergent stabilization',
      'Rubric (100): painless hematuria concern 35, smoking risk 20, cystoscopy pathway 20, diagnosis 25',
    ],
    vocabTerms: ['urothelial carcinoma', 'CT urogram', 'cystoscopy', 'TURBT', 'pack-years'],
  },

  'urology-torsion-noah-brooks': {
    keyHistoryQuestions: [
      'exact onset time last normal testis',
      'sudden versus gradual pain progression',
      'nausea vomiting',
      'fever urinary symptoms pyuria history',
      'trauma sports twist heavy lifting',
      'prior similar episode cryptorchidism repair',
      'sexual activity STI history if age appropriate sensitive framing',
    ],
    keyExamItems: ['general', 'other'],
    criticalTests: ['scrotal_ultrasound_doppler', 'ua'],
    unnecessaryTests: ['ct_abdomen', 'colonoscopy'],
    mustRecognizeFindings: [
      'sudden severe unilateral testicular pain under two to six hours',
      'high-riding testis abnormal lie',
      'absent cremasteric reflex ipsilateral',
      'nausea out of proportion without classic UTI',
      'Doppler reduced testicular blood flow',
    ],
    commonMisses: [
      'Waiting for UA results before imaging in classic exam',
      'Mislabeling as epididymitis without flow documentation',
      'Not documenting time zero for salvage window teaching',
      'Skipping bilateral fixation discussion in counseling later',
      'Underestimating adolescent embarrassment delaying presentation',
    ],
    correctDiagnosisExplanation: [
      'Testicular torsion is spermatic cord twist compromising arterial inflow—urologic emergency.',
      'Noah’s thunderclap onset, nausea, high-riding testis, absent cremasteric reflex, and decreased Doppler flow fit torsion.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Epididymitis',
        whyLessLikely:
          'Typically gradual with fever or pyuria and increased Doppler flow—incongruent here.',
      },
      {
        diagnosis: 'Hydrocele',
        whyLessLikely: 'Usually painless chronic swelling—not hyperacute severe pain.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: ischemia from twisted cord threatens testicular viability in hours.',
      'Why it fits: sudden pain, exam position reflex loss nausea low flow ultrasound.',
      'Key clues: adolescent age, absent trauma, writhing pain, ipsilateral absent cremasteric reflex, abnormal Doppler',
      'Missed clues: bell-clapper anatomy prior intermittent torsion episodes delayed transport',
      'Learning points: time window teaching manual detorsion temporizing OR urgency ultrasound equivocal surgical exploration',
      'Useful tests: Doppler scrotal ultrasound UA adjunct',
      'Unnecessary tests: abdominal CT not first-line for classic acute scrotum',
      'Urgency considerations: OR notification parallel to imaging when suspicion sky-high',
      'Rubric (100): emergency recognition 35, cremasteric exam 20, Doppler 20, diagnosis 25, time-window note bonus plus ten',
    ],
    vocabTerms: ['bell-clapper', 'cremasteric reflex', 'Doppler', 'orchidopexy', 'acute scrotum'],
  },

  'urology-bph-luts-robert-kim': {
    keyHistoryQuestions: [
      'nocturia frequency daytime voids urgency',
      'stream strength hesitancy intermittency dribbling',
      'sensation incomplete emptying straining',
      'dysuria hematuria infection symptoms',
      'fluid intake evening caffeine alcohol',
      'erectile ejaculatory changes if patient comfortable',
      'metabolic symptoms diabetes thirst weight polyuria',
      'family prostate cancer screening preferences',
    ],
    keyExamItems: ['general', 'other'],
    criticalTests: ['ua', 'psa', 'bladder_scan', 'cmp'],
    unnecessaryTests: ['ct_head', 'lumbar_puncture'],
    mustRecognizeFindings: [
      'years of progressive weak stream nocturia dribbling incomplete emptying',
      'mild prostate enlargement smooth DRE',
      'bland UA',
      'elevated PSA interpreted in shared decision context not isolation',
      'elevated PVR documenting retention of urine after void',
    ],
    commonMisses: [
      'Labeling all storage symptoms OAB without measuring residual',
      'Skipping PSA counseling harms benefits',
      'Not treating constipation worsening outlet symptoms',
      'Missing new hard nodule or weight loss',
      'Ignoring medication anticholinergic burden',
    ],
    correctDiagnosisExplanation: [
      'BPH causes static and dynamic outlet obstruction producing voiding and storage LUTS and sometimes elevated residual.',
      'Robert’s gradual stream decline nocturia elevated PVR enlarged prostate and clean UA match symptomatic BPH.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Prostate cancer',
        whyLessLikely:
          'PSA elevation merits evaluation pathway but chronic classic LUTS plus smooth exam favors benign etiology initially.',
      },
      {
        diagnosis: 'Overactive bladder',
        whyLessLikely:
          'Can overlap urgency symptoms but elevated residual pushes toward outlet obstruction contribution.',
      },
    ],
    clinicalPearls: [
      'Diagnosis explanation: prostatic enlargement narrows urethra raising resistance and postvoid residual.',
      'Why it fits: chronic symptom course DRE volume symptoms elevated PVR negative UA.',
      'Key clues: five nightly voids weak stream dribble sleep disruption',
      'Missed clues: ACE inhibitor nighttime coughing masking sleep IPSS score not captured',
      'Learning points: alpha blocker 5ARI combination indications priapism drug review anticholinergic caution with high PVR',
      'Useful tests: UA PSA PVR BMP HbA1c when polyuria mimic',
      'Unnecessary tests: lumbar puncture unrelated',
      'Urgency considerations: urinary retention with inability void acute ED visit not clinic stall',
      'Rubric (100): LUTS 30, history 25, urinary studies 20, diagnosis 25',
    ],
    vocabTerms: ['IPSS', 'PVR', 'LUTS', 'alpha blocker', '5-alpha reductase'],
  },

  'medacademy-pathology-cells-going-wild': {
    keyHistoryQuestions: [
      'smoking history pack-years',
      'hoarseness voice change',
      'hemoptysis cough blood',
      'weight loss',
      'headache mentation coordination',
      'chronic low back pain',
      'family history cancer',
      'past medical history',
    ],
    essentialInterviewQuestions: [
      'smoking history',
      'hoarseness or voice change',
      'hemoptysis',
      'weight loss',
      'chronic low back pain',
      'headache',
      'mentation or coordination changes',
      'family history of cancer',
      'past medical history',
    ],
    optionalInterviewQuestions: ['full patient history', 'physical exam'],
    keyExamItems: [],
    criticalTests: ['ct_angiogram_chest', 'lung_mass_biopsy', 'pet_scan', 'mri_brain'],
    essentialTests: [
      'ct_chest',
      'ct_angiogram_chest',
      'lung_mass_biopsy',
      'ebus_lymph_node',
      'pet_scan',
      'mri_brain',
      'bone_scan',
      'mri_spine',
      'cbc',
      'cmp',
    ],
    optionalTests: ['cxr', 'pft'],
    unnecessaryTests: ['d_dimer'],
    mustRecognizeFindings: [
      '65-70 pack year smoking history',
      '3.1 cm right infrahilar mass',
      'Subcarinal lymph nodes measuring 1.2 cm',
      'PE ruled out',
      'Hoarseness for two weeks',
      'Headache and changes in mentation/coordination',
      'Chronic low back pain',
    ],
    commonMisses: [
      'Stopping workup after PE is ruled out without addressing the lung mass',
      'Missing smoking history or hoarseness',
      'Not ordering tissue biopsy for confirmation',
      'Skipping PET scan or brain MRI for staging',
      'Selecting pulmonary embolism as the final diagnosis',
    ],
    correctDiagnosisExplanation: [
      'Correct diagnosis: Primary lung cancer / lung carcinoma with concern for nodal involvement and possible metastatic disease.',
      'This case starts with shortness of breath and chest pain during hospitalization, so pulmonary embolism was considered. However, the PE was ruled out.',
      'The major finding is the right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm.',
      'The 65-70 pack year smoking history, hoarseness, headache, changes in mentation/coordination, and chronic low back pain make lung cancer with possible spread a major concern.',
      'Biopsy is needed to confirm malignancy and classify the tumor type, while staging studies such as PET scan, brain MRI, and lymph node sampling help determine spread.',
    ],
    differentialComparison: [
      {
        diagnosis: 'Pulmonary embolism',
        whyLessLikely: 'Initial concern for shortness of breath and chest pain, but the PE was ruled out.',
      },
      {
        diagnosis: 'Pneumonia',
        whyLessLikely: 'Lungs clear on exam and CT shows a mass rather than consolidation.',
      },
      {
        diagnosis: 'Benign lung mass',
        whyLessLikely: 'Smoking history, lymph nodes, and systemic symptoms favor malignancy.',
      },
    ],
    clinicalPearls: [
      'Rubric (150): Interview 45, Clinical Data Review 55, Diagnosis 35, Clinical Reasoning 15.',
      'Incidental lung mass on PE protocol CT is a classic pivot point in this case.',
      'Hoarseness may reflect mediastinal involvement.',
      'Neurologic symptoms warrant brain MRI to evaluate possible spread.',
      'Biopsy is required before final histologic classification.',
    ],
    vocabTerms: [
      'right infrahilar mass',
      'subcarinal lymph nodes',
      'pack year',
      'hoarseness',
      'hemoptysis',
      'PET scan',
      'pulmonary embolism',
      'biopsy',
      'mentation',
      'staging',
    ],
    correctDiagnosis:
      'Primary lung cancer / lung carcinoma with concern for nodal involvement and possible metastatic disease.',
    acceptableDiagnoses: [
      'Lung cancer',
      'Lung carcinoma',
      'Non-small cell lung cancer',
      'Small cell lung cancer',
      'Primary bronchogenic carcinoma',
      'Suspected lung carcinoma',
      'Lung cancer with possible metastasis',
    ],
    expectedDifferential: [
      'Lung cancer',
      'Lung carcinoma',
      'Non-small cell lung cancer',
      'Small cell lung cancer',
      'Pulmonary embolism',
      'Pneumonia',
      'Tuberculosis',
      'Metastatic cancer',
      'Lymphoma',
      'Benign lung mass',
    ],
    redFlags: [
      '65-70 pack year smoking with right infrahilar mass',
      'Subcarinal lymph nodes',
      'Hoarseness',
      'Headache and changes in mentation/coordination',
    ],
    keyEvidence: [
      '65-70 pack year smoking history',
      '3.1 cm right infrahilar mass',
      'Subcarinal lymph nodes measuring 1.2 cm',
      'PE ruled out',
      'Hoarseness, headache, mentation/coordination changes',
    ],
    idealReasoning:
      'Connect smoking and mass to lung cancer, recognize PE was excluded, evaluate nodes and systemic symptoms for staging and possible metastasis, and confirm with biopsy.',
  },
  'medacademy-cardio-elephant-on-chest': {
    keyHistoryQuestions: [
      'crushing chest pain',
      'pain radiation left arm neck',
      'hypertension diabetes hyperlipidemia',
      'smoking history',
      'family history heart disease',
      'nausea light-headedness',
      'shortness of breath',
    ],
    essentialInterviewQuestions: [
      'Guided Reasoning: chest pain pattern',
      'Guided Reasoning: ECG ST-segment elevation',
      'Guided Reasoning: troponin trend',
      'Guided Reasoning: cardiovascular risk factors',
    ],
    optionalInterviewQuestions: ['Review Clinical Data sections'],
    keyExamItems: [],
    criticalTests: [],
    essentialTests: [],
    optionalTests: [],
    unnecessaryTests: [],
    mustRecognizeFindings: [
      'Crushing retrosternal chest pain (10/10 in intensity)',
      'Pain radiating to left arm and neck',
      'ECG reveals convex ST-segment elevation',
      'Troponin I/T rising from 0.8 ng/mL to >100 ng/mL',
      'Creatine Kinase and CK-MB rise significantly',
      'Hypertension, diabetes, hyperlipidemia, smoking, family history',
      'Blood Pressure: 90/60 mmHg',
      'Shortness of breath and diffuse bilateral rales',
    ],
    commonMisses: [
      'Not connecting ST elevation with rising troponin',
      'Missing hypotension as a concerning vital sign',
      'Overlooking risk factors listed in the presentation',
      'Not reviewing serial lab trends in Clinical Data',
      'Selecting NSTEMI instead of STEMI despite ST elevation',
    ],
    correctDiagnosisExplanation: [
      'This patient presents with crushing retrosternal chest pain (10/10 in intensity) radiating down his left arm and left side of his neck, nausea, light-headedness, shortness of breath, diaphoresis, diffuse bilateral rales, and ECG showing convex ST-segment elevation.',
      'He also has major risk factors including hypertension, diabetes, hyperlipidemia, long history of smoking cigarettes, and family history of heart disease.',
      'Serial labs show Troponin I/T rising from 0.8 ng/mL at the initial draw to >100 ng/mL at 6 hours post initial draw, along with major increases in Creatine Kinase and CK-MB.',
      'Together, these findings strongly support acute myocardial infarction, specifically STEMI.',
    ],
    differentialComparison: [
      {
        diagnosis: 'NSTEMI',
        whyLessLikely:
          'Troponin is elevated, but convex ST-segment elevation on ECG favors STEMI over NSTEMI in this case.',
      },
      {
        diagnosis: 'Unstable angina',
        whyLessLikely: 'Marked troponin rise indicates myocardial injury beyond angina alone.',
      },
      {
        diagnosis: 'Pulmonary embolism',
        whyLessLikely: 'Less likely as the primary diagnosis given ST elevation and cardiac marker pattern.',
      },
    ],
    clinicalPearls: [
      'Rubric (150): Guided Reasoning 55, Clinical Data Review 55, Diagnosis 30, Clinical Reasoning 10.',
      'Guided Reasoning is scored out of 100 points (20 questions × 5 points each).',
      'Convex ST-segment elevation with ischemic chest pain is a STEMI pattern.',
      'Serial troponin and CK-MB trends confirm ongoing heart muscle injury.',
      'Low blood pressure with rales may suggest cardiogenic shock or acute heart failure physiology.',
    ],
    vocabTerms: [
      'convex ST-segment elevation',
      'Troponin I/T',
      'CK-MB',
      'Creatine Kinase',
      'crushing retrosternal chest pain',
      'diffuse bilateral rales',
      'hypertension',
      'hyperlipidemia',
      'diaphoretic',
      'radiating pain',
    ],
    correctDiagnosis: 'Acute ST-elevation myocardial infarction (STEMI)',
    acceptableDiagnoses: [
      'Acute myocardial infarction',
      'Myocardial infarction',
      'MI',
      'STEMI',
      'ST-elevation myocardial infarction',
      'Heart attack',
      'Acute coronary syndrome with ST elevation',
    ],
    expectedDifferential: [
      'ST-elevation myocardial infarction (STEMI)',
      'Non-ST elevation myocardial infarction (NSTEMI)',
      'Unstable angina',
      'Aortic dissection',
      'Pulmonary embolism',
      'Congestive heart failure exacerbation',
    ],
    redFlags: [
      'Crushing chest pain 10/10 with radiation',
      'Hypotension 90/60 mmHg',
      'Convex ST-segment elevation',
      'Troponin rising to >100 ng/mL',
      'Diffuse bilateral rales',
    ],
    keyEvidence: [
      'Crushing retrosternal chest pain (10/10) with left arm and neck radiation',
      'ECG reveals convex ST-segment elevation',
      'Troponin I/T 0.8 ng/mL → >100 ng/mL at 6 hours',
      'Creatine Kinase and CK-MB rise significantly',
      'Hypertension, diabetes, hyperlipidemia, smoking, family history of heart disease',
      'Blood Pressure: 90/60 mmHg',
      'Shortness of breath and diffuse bilateral rales',
    ],
    idealReasoning:
      'Connect crushing chest pain and radiation to a heart emergency, use ECG ST elevation and rising cardiac markers to support STEMI, and recognize major cardiovascular risk factors.',
  },
}

export function getDebriefConfigForScenario(scenarioId: string): ScenarioDebriefConfig | null {
  return DEBRIEF_CONFIGS[scenarioId] ?? null
}
