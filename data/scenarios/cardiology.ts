import type { Scenario } from "@/data/scenarios";
import { medacademyElephantOnChestCaseInfo } from "@/data/caseInfo/medacademyElephantOnChest";
import { medacademyElephantOnChestVocab } from "@/data/caseVocab/medacademyElephantOnChest";
import { medacademyElephantOnChestGuidedReasoning } from "@/data/guidedReasoning/medacademyElephantOnChest";

const CARDIOLOGY_SPECIALTY = "Cardiology" as const;

export const cardiologyScenarios: Scenario[] = [
  {
    id: "stemi-pressure-wont-go-away",
    title: "This Pressure Won't Go Away",
    specialty: CARDIOLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Robert Wilson, a 61-year-old truck driver, presents to the emergency department with 45 minutes of crushing chest pressure that began while lifting heavy boxes.",
    cardTeaser: "My chest feels like someone is sitting on it.",
    objectives: [
      "Recognize acute coronary syndrome as a time-critical emergency.",
      "Elicit radiation, associated symptoms, and cardiac risk factors.",
      "Obtain ECG and troponin and identify STEMI requiring urgent reperfusion."
    ],
    patientPersona: {
      name: "Robert Wilson",
      age: 61,
      gender: "Male",
      chiefComplaint: "My chest feels like someone is sitting on it.",
      background:
        "Long-haul truck driver who was unloading heavy boxes at work when sudden central chest pressure started 45 minutes ago. Hypertensive smoker, anxious but cooperative. Never had pain like this before.",
      vitals: {
        heartRate: 108,
        bloodPressure: "158/94",
        respiratoryRate: 22,
        oxygenSat: "95%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Chest pressure onset 45 minutes ago while carrying heavy boxes",
        "Central pressure quality with radiation to left arm and jaw",
        "Nausea, diaphoresis, shortness of breath, weakness",
        "Hypertension and active smoking history",
        "ECG ST elevation in inferior leads",
        "Elevated troponin",
        "No fever or cough"
      ],
      redFlags: [
        "Acute chest pressure with radiation and diaphoresis",
        "Tachycardia and hypertensive response",
        "ST elevation on ECG with elevated troponin"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Robert, a worried middle-aged man in mild distress. Clutch chest occasionally. Plain language — not medical jargon.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say heart attack, STEMI, or MI.",
        "Reveal radiation, nausea, and sweating when asked specifically.",
        "Mention lifting boxes and timing when asked onset or what you were doing."
      ],
      doNotRevealDirectly: [
        "STEMI",
        "myocardial infarction",
        "heart attack",
        "You need the cath lab",
        "This is just anxiety"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Diaphoretic, uncomfortable, mild distress.",
        details:
          "Middle-aged man appears anxious and diaphoretic, holding his chest. Alert and oriented, speaking in short sentences due to discomfort."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Tachycardic, regular rhythm.",
        details:
          "Heart rate elevated, regular rhythm. No murmur or gallop appreciated on quick exam. No JVD."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear.",
        details:
          "Breath sounds clear bilaterally. Mild tachypnea without wheezes or crackles."
      }
    ],
    testOverrides: [
      {
        testId: "ecg",
        result:
          "ST-segment elevation in leads II, III, and aVF consistent with inferior wall STEMI. Reciprocal changes in lateral leads.",
        yield: "high"
      },
      {
        testId: "troponin",
        result: "Troponin I elevated above the 99th percentile reference range.",
        yield: "high"
      },
      {
        testId: "cxr",
        result: "Normal heart size, clear lung fields, no pulmonary edema or pneumothorax.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      },
      {
        testId: "cmp",
        result: "Electrolytes and renal function within normal limits.",
        yield: "low"
      },
      {
        testId: "d_dimer",
        result: "Not the primary test when STEMI is present on ECG; would be low yield if ACS already confirmed.",
        yield: "inappropriate"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No acute pulmonary abnormality.",
      bedsideDefault: "No additional abnormality.",
      procedureDefault: "Urgent reperfusion strategy indicated for STEMI in real practice."
    },
    finalDxId: "stemi",
    requiredMustNotMiss: ["stemi", "aortic_dissection", "pe"],
    dxOverrides: [
      {
        dxId: "stemi",
        yield: "correct",
        explanation:
          "Acute inferior STEMI fits exertional pressure, radiation, diaphoresis, ST elevations, and elevated troponin."
      },
      {
        dxId: "aortic_dissection",
        yield: "dangerous-miss",
        explanation:
          "Must consider tearing pain and pulse deficits; pressure with inferior ST elevation and troponin favor MI."
      },
      {
        dxId: "pe",
        yield: "dangerous-miss",
        explanation:
          "PE can cause dyspnea and tachycardia, but ECG STEMI pattern and troponin elevation localize to ACS."
      },
      {
        dxId: "gerd",
        yield: "low",
        explanation: "Burning post-meal pain does not explain radiation, diaphoresis, and ECG ST elevation."
      },
      {
        dxId: "panic",
        yield: "low",
        explanation: "Anxiety alone does not produce objective ST elevation and troponin rise."
      },
      {
        dxId: "costochondritis",
        yield: "low",
        explanation: "Reproducible chest wall pain without ischemic ECG or troponin changes."
      }
    ],
    diagnosisOptions: [
      {
        id: "stemi",
        name: "Acute myocardial infarction (STEMI)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Inferior ST elevation with elevated troponin and typical ischemic symptoms."
      },
      {
        id: "gerd",
        name: "GERD",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain ischemic ECG and troponin."
      },
      {
        id: "panic",
        name: "Panic attack",
        isCorrect: false,
        isDangerous: false,
        explanation: "No objective evidence of ischemia."
      }
    ],
    teachingPoints: [
      "Grading (100): Cardiac emergency 30, radiation/risk factors 25, ECG/troponin 25, diagnosis 20. Bonus: urgent reperfusion (+10). Deductions: anxiety only (-25), miss radiation (-15).",
      "Time is muscle — STEMI requires immediate ECG and reperfusion planning.",
      "Classic ACS symptoms include pressure, radiation, nausea, and diaphoresis.",
      "Inferior STEMI may involve the right ventricle — monitor blood pressure closely.",
      "D-dimer is low yield when ECG diagnostic for STEMI."
    ]
  },
  {
    id: "afib-rapid-ventricular-response",
    title: "My Heart Keeps Racing",
    specialty: CARDIOLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 10,
    description:
      "Patricia Nguyen, a 72-year-old retired librarian, presents with four hours of sudden palpitations, irregular heartbeat, mild dyspnea, and lightheadedness.",
    cardTeaser: "My heart suddenly started fluttering.",
    objectives: [
      "Recognize irregular tachycardia on history and exam.",
      "Obtain ECG to diagnose atrial fibrillation with rapid ventricular response.",
      "Consider rate control, anticoagulation, and reversible triggers."
    ],
    patientPersona: {
      name: "Patricia Nguyen",
      age: 72,
      gender: "Female",
      chiefComplaint: "My heart suddenly started fluttering.",
      background:
        "Retired librarian who was reading at home when her heart began racing and fluttering four hours ago. Hypertension on amlodipine. No prior AF diagnosis. Anxious but no chest pain.",
      vitals: {
        heartRate: 146,
        bloodPressure: "128/82",
        respiratoryRate: 18,
        oxygenSat: "98%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Sudden palpitations for 4 hours",
        "Irregular heartbeat sensation",
        "Mild shortness of breath and lightheadedness",
        "No chest pain or fever",
        "History of hypertension",
        "ECG atrial fibrillation with RVR",
        "Normal troponin and electrolytes"
      ],
      redFlags: [
        "Heart rate 146 with hypotension risk if worsens",
        "New atrial fibrillation in elderly patient",
        "Lightheadedness may reflect inadequate cardiac output"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Patricia, polite and a bit frightened. Place hand over chest when describing fluttering.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say atrial fibrillation or AFib.",
        "Describe irregular fast heartbeat when asked about palpitations.",
        "Deny chest pain clearly if asked."
      ],
      doNotRevealDirectly: [
        "atrial fibrillation",
        "AFib",
        "RVR",
        "You need cardioversion",
        "It's just anxiety"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Anxious but comfortable at rest.",
        details: "Elderly woman alert, mildly anxious, no acute respiratory distress."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Irregularly irregular tachycardia.",
        details:
          "Heart rate approximately 146 bpm, irregularly irregular rhythm. No murmur. No peripheral edema."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear.",
        details: "Clear to auscultation bilaterally."
      }
    ],
    testOverrides: [
      {
        testId: "ecg",
        result:
          "Atrial fibrillation with rapid ventricular response, ventricular rate approximately 145 bpm. No ST elevation.",
        yield: "high"
      },
      {
        testId: "troponin",
        result: "Troponin within normal limits — no acute myocardial injury.",
        yield: "helpful"
      },
      {
        testId: "tsh",
        result: "TSH within normal limits.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result: "Electrolytes including potassium and magnesium within normal limits.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "Not routinely required.",
      bedsideDefault: "Irregular tachycardia on palpation.",
      procedureDefault: "Rate/rhythm strategy per protocol."
    },
    finalDxId: "afib_rvr",
    requiredMustNotMiss: ["afib_rvr", "stemi"],
    dxOverrides: [
      {
        dxId: "afib_rvr",
        yield: "correct",
        explanation:
          "Sudden palpitations with irregularly irregular tachycardia and ECG confirming atrial fibrillation with RVR."
      },
      {
        dxId: "stemi",
        yield: "dangerous-miss",
        explanation: "Must exclude ACS; normal troponin and no ST elevation make MI unlikely."
      },
      {
        dxId: "svt",
        yield: "reasonable",
        explanation: "Regular narrow-complex tachycardia; irregular rhythm on exam and ECG favors AF."
      },
      {
        dxId: "panic",
        yield: "low",
        explanation: "Objective irregular tachycardia on ECG is not explained by panic alone."
      },
      {
        dxId: "hyperthyroidism",
        yield: "low",
        explanation: "Normal TSH makes thyrotoxicosis less likely as primary trigger."
      },
      {
        dxId: "pvc",
        yield: "low",
        explanation: "PVCs are intermittent extrasystoles, not sustained irregular tachycardia at 146 bpm."
      }
    ],
    diagnosisOptions: [
      {
        id: "afib_rvr",
        name: "Atrial fibrillation with rapid ventricular response",
        isCorrect: true,
        isDangerous: false,
        explanation: "ECG confirms AF with rapid ventricular rate."
      },
      {
        id: "svt",
        name: "Supraventricular tachycardia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Typically regular rhythm; ECG shows AF."
      },
      {
        id: "panic",
        name: "Panic attack",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain irregular tachycardia on ECG."
      }
    ],
    teachingPoints: [
      "Grading (100): Irregular rhythm 25, ECG 30, risk factors 20, diagnosis 25.",
      "ECG is essential for any sustained palpitations — diagnoses rhythm.",
      "Rate control, rhythm control, and stroke prevention are pillars of AF management.",
      "Check electrolytes, thyroid, and troponin when clinically indicated.",
      "CHA2DS2-VASc guides anticoagulation in non-valvular AF."
    ]
  },
  {
    id: "chf-exacerbation-stairs",
    title: "I Can't Walk Up Stairs Anymore",
    specialty: CARDIOLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Samuel Ortiz, a 68-year-old retired mechanic, is referred to cardiology with weeks of exertional dyspnea, leg swelling, orthopnea, and paroxysmal nocturnal dyspnea.",
    cardTeaser: "I get out of breath doing almost anything.",
    objectives: [
      "Recognize congestive heart failure from volume overload and congestion.",
      "Link orthopnea, PND, and edema to decompensated heart failure.",
      "Order BNP, chest X-ray, and echocardiogram to confirm."
    ],
    patientPersona: {
      name: "Samuel Ortiz",
      age: 68,
      gender: "Male",
      chiefComplaint: "I get out of breath doing almost anything.",
      background:
        "Retired mechanic who noticed progressive shortness of breath over several weeks — stairs and walking to the mailbox leave him winded. Legs swollen, sleeps on three pillows, wakes gasping twice this week. Fatigued. No fever.",
      vitals: {
        heartRate: 102,
        bloodPressure: "150/88",
        respiratoryRate: 22,
        oxygenSat: "93%",
        temperature: "98.5°F"
      },
      keyHistoryPoints: [
        "Progressive exertional dyspnea over weeks",
        "Bilateral leg swelling",
        "Orthopnea — sleeps on three pillows",
        "Paroxysmal nocturnal dyspnea",
        "Fatigue",
        "Elevated JVP and bibasilar crackles",
        "Elevated BNP and reduced EF on echo",
        "Chest X-ray pulmonary congestion"
      ],
      redFlags: [
        "SpO2 93% with crackles and edema",
        "PND and orthopnea suggest pulmonary edema",
        "New or worsening reduced ejection fraction"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Samuel, tired older man who pauses to catch breath between phrases. Matter-of-fact, not dramatic.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say heart failure or CHF.",
        "Describe pillows, swollen legs, and stair limitation when asked.",
        "Deny fever and chest pain unless specifically relevant — no pleuritic pain."
      ],
      doNotRevealDirectly: [
        "heart failure",
        "CHF",
        "ejection fraction",
        "You need a transplant",
        "This is pneumonia"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mild respiratory distress, fatigued.",
        details:
          "Older man with mild tachypnea at rest when talking. No acute distress requiring intubation."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Tachycardic; elevated JVP; no murmur emphasized.",
        details:
          "Jugular venous pressure elevated to the angle of the jaw. Heart rate 102, regular. S3 gallop may be appreciated."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Crackles at lung bases.",
        details: "Fine inspiratory crackles at both lung bases. No wheezing."
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Bilateral pitting edema.",
        details: "2+ pitting edema to mid-shins bilaterally. Pulses intact."
      }
    ],
    testOverrides: [
      {
        testId: "bnp",
        result: "BNP markedly elevated, consistent with volume overload and heart failure.",
        yield: "high"
      },
      {
        testId: "echo",
        result:
          "Left ventricular ejection fraction approximately 30% with global hypokinesis. Mild mitral regurgitation. No pericardial effusion.",
        yield: "high"
      },
      {
        testId: "cxr",
        result: "Cardiomegaly with pulmonary vascular congestion and interstitial edema.",
        yield: "high"
      },
      {
        testId: "ecg",
        result: "Sinus tachycardia. Left ventricular hypertrophy pattern. No acute ST elevation.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits unless renal congestion.",
      imagingDefault: "Congestive changes on chest imaging when CHF present.",
      bedsideDefault: "Volume overload on exam.",
      procedureDefault: "Diuresis and afterload reduction in real management."
    },
    finalDxId: "chf_exacerbation",
    requiredMustNotMiss: ["chf_exacerbation", "pe", "pneumonia"],
    dxOverrides: [
      {
        dxId: "chf_exacerbation",
        yield: "correct",
        explanation:
          "Orthopnea, PND, edema, crackles, elevated BNP, pulmonary congestion, and reduced EF define CHF exacerbation."
      },
      {
        dxId: "pe",
        yield: "dangerous-miss",
        explanation:
          "Can cause dyspnea, but bilateral edema, crackles, and elevated BNP favor CHF over isolated PE."
      },
      {
        dxId: "pneumonia",
        yield: "low",
        explanation: "No fever or focal lobar infiltrate; congestion pattern is cardiogenic."
      },
      {
        dxId: "copd_exacerbation",
        yield: "reasonable",
        explanation: "Causes dyspnea but prominent edema and BNP elevation point to heart failure."
      },
      {
        dxId: "aki",
        yield: "reasonable",
        explanation: "Renal failure can cause volume overload; echo shows primary cardiac dysfunction here."
      },
      {
        dxId: "asthma",
        yield: "low",
        explanation: "Wheezing predominant; exam shows crackles and edema without bronchospasm."
      }
    ],
    diagnosisOptions: [
      {
        id: "chf_exacerbation",
        name: "Congestive heart failure exacerbation",
        isCorrect: true,
        isDangerous: true,
        explanation: "Volume overload with reduced EF and elevated BNP."
      },
      {
        id: "copd_exacerbation",
        name: "COPD exacerbation",
        isCorrect: false,
        isDangerous: false,
        explanation: "No chronic cough or wheeze pattern; BNP and echo support CHF."
      },
      {
        id: "pneumonia",
        name: "Pneumonia",
        isCorrect: false,
        isDangerous: false,
        explanation: "No fever or lobar consolidation."
      }
    ],
    teachingPoints: [
      "Grading (100): Volume overload 30, BNP/echo 25, connect symptoms 20, diagnosis 25.",
      "Orthopnea, PND, and edema are hallmarks of fluid overload in heart failure.",
      "BNP and echocardiogram confirm diagnosis and guide therapy.",
      "Chest X-ray shows congestion; differentiate from pneumonia by clinical context.",
      "Treat with diuretics, afterload reduction, and address triggers."
    ]
  },
  {
    id: "hypertrophic-cardiomyopathy-syncope",
    title: "I Passed Out During Practice",
    specialty: CARDIOLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Jason Patel, a 17-year-old basketball player, collapsed during intense practice with brief loss of consciousness, prior exertional chest tightness, and a family history of sudden death.",
    cardTeaser: "I blacked out during basketball practice.",
    objectives: [
      "Recognize exertional syncope as a red flag in young athletes.",
      "Obtain family history of sudden cardiac death.",
      "Identify hypertrophic cardiomyopathy with murmur and echocardiogram."
    ],
    patientPersona: {
      name: "Jason Patel",
      age: 17,
      gender: "Male",
      chiefComplaint: "I blacked out during basketball practice.",
      background:
        "Starting point guard who collapsed during sprint drills yesterday — out for under a minute, no shaking witnessed. Felt dizzy before going down. Occasional chest tightness with hard exercise. Paternal uncle died suddenly at age 28. Healthy otherwise.",
      vitals: {
        heartRate: 88,
        bloodPressure: "118/70",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Syncope during intense exercise",
        "Brief LOC without seizure activity",
        "Dizziness preceding collapse",
        "Exertional chest tightness",
        "Uncle with sudden death at young age",
        "Harsh systolic murmur louder with Valsalva",
        "Echo asymmetric septal hypertrophy",
        "ECG left ventricular hypertrophy"
      ],
      redFlags: [
        "Exertional syncope in young athlete",
        "Family history of premature sudden death",
        "Murmur increases with Valsalva — HCM hallmark",
        "Risk of sudden cardiac death"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Jason, athletic teenager embarrassed and scared. Casual speech, worried about playing again.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say hypertrophic cardiomyopathy or HCM.",
        "Mention uncle's death only when family history asked.",
        "Describe collapse during practice and dizziness before."
      ],
      doNotRevealDirectly: [
        "hypertrophic cardiomyopathy",
        "HCM",
        "sudden cardiac death",
        "implantable defibrillator",
        "You can keep playing without workup"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing athletic adolescent.",
        details: "Healthy-appearing teenager, no acute distress in clinic today."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Harsh systolic murmur; louder with Valsalva.",
        details:
          "Grade III/VI harsh systolic ejection murmur best at left sternal border. Murmur intensity increases with Valsalva maneuver. No rub."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear.",
        details: "Clear breath sounds."
      }
    ],
    testOverrides: [
      {
        testId: "echo",
        result:
          "Asymmetric septal hypertrophy (septum 22 mm) with systolic anterior motion of mitral valve. LVOT gradient increased with Valsalva. No structural coronary anomaly.",
        yield: "high"
      },
      {
        testId: "ecg",
        result: "Left ventricular hypertrophy with repolarization abnormalities. No acute ST elevation.",
        yield: "high"
      },
      {
        testId: "holter_monitor",
        result: "24-hour monitor may show ventricular ectopy; not required before echo diagnosis in classic case.",
        yield: "helpful"
      },
      {
        testId: "cxr",
        result: "Normal cardiac silhouette for age. Clear lungs.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "Normal chest X-ray.",
      bedsideDefault: "Murmur on auscultation.",
      procedureDefault: "Sports restriction until cardiology clearance."
    },
    finalDxId: "hypertrophic_cardiomyopathy",
    requiredMustNotMiss: ["hypertrophic_cardiomyopathy", "cardiac_arrhythmia"],
    dxOverrides: [
      {
        dxId: "hypertrophic_cardiomyopathy",
        yield: "correct",
        explanation:
          "Exertional syncope, family SCD, murmur louder with Valsalva, LVH on ECG, and asymmetric septal hypertrophy on echo confirm HCM."
      },
      {
        dxId: "vasovagal_syncope",
        yield: "low",
        explanation: "Usually postural or provoked by pain/fear, not mid-sprint collapse with murmur."
      },
      {
        dxId: "cardiac_arrhythmia",
        yield: "dangerous-miss",
        explanation: "Arrhythmia may complicate HCM; echo defines structural substrate."
      },
      {
        dxId: "seizure",
        yield: "low",
        explanation: "No tonic-clonic activity or postictal confusion reported."
      },
      {
        dxId: "dehydration",
        yield: "low",
        explanation: "Does not explain murmur, LVH, and family SCD."
      },
      {
        dxId: "heat_stroke",
        yield: "low",
        explanation: "No hyperthermia; collapse during indoor practice with cardiac findings."
      }
    ],
    diagnosisOptions: [
      {
        id: "hypertrophic_cardiomyopathy",
        name: "Hypertrophic cardiomyopathy",
        isCorrect: true,
        isDangerous: true,
        explanation: "Structural HCM with exertional syncope and family history."
      },
      {
        id: "vasovagal_syncope",
        name: "Vasovagal syncope",
        isCorrect: false,
        isDangerous: false,
        explanation: "Incompatible with exertional collapse and cardiac findings."
      },
      {
        id: "seizure",
        name: "Seizure",
        isCorrect: false,
        isDangerous: false,
        explanation: "No witnessed seizure activity."
      }
    ],
    teachingPoints: [
      "Grading (100): Exertional syncope 25, family history 25, echo 25, diagnosis 25. Bonus: SCD risk (+10).",
      "Exertional syncope in athletes is cardiac until proven otherwise.",
      "Murmur that increases with Valsalva suggests hypertrophic obstructive physiology.",
      "Echocardiogram is diagnostic; restrict athletics pending full evaluation.",
      "Family screening recommended when HCM identified."
    ]
  },
  {
    id: "acute-pericarditis-positional",
    title: "My Chest Hurts When I Lean Back",
    specialty: CARDIOLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 10,
    description:
      "Amanda Lee, a 24-year-old graduate student, presents with two days of sharp positional chest pain worse lying flat and improved leaning forward after a recent viral illness.",
    cardTeaser: "My chest pain changes depending on position.",
    objectives: [
      "Recognize positional pleuritic chest pain pattern of pericarditis.",
      "Identify pericardial friction rub and diffuse ST elevations on ECG.",
      "Differentiate from STEMI and other causes of chest pain."
    ],
    patientPersona: {
      name: "Amanda Lee",
      age: 24,
      gender: "Female",
      chiefComplaint: "My chest pain changes depending on position.",
      background:
        "Graduate student with sharp chest pain for two days after a cold last week. Worse lying flat in bed, better sitting up and leaning forward. Low-grade fever. No exertional symptoms — walked to clinic without dyspnea.",
      vitals: {
        heartRate: 104,
        bloodPressure: "116/74",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "100.2°F"
      },
      keyHistoryPoints: [
        "Sharp chest pain 2 days, positional",
        "Worse supine, better leaning forward",
        "Recent viral URI",
        "Low-grade fever",
        "No exertional trigger",
        "Pericardial friction rub on exam",
        "Diffuse ST elevations on ECG",
        "Elevated inflammatory markers; troponin mildly elevated possible"
      ],
      redFlags: [
        "Diffuse ST elevation can mimic STEMI",
        "Cardiac tamponade if hypotension develops",
        "Fever with rub — consider infectious pericarditis"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Amanda, bright student who is uncomfortable but not panicked. Describe pain with hand gestures for position.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say pericarditis.",
        "Emphasize better leaning forward, worse lying flat.",
        "Mention recent cold when asked about illness."
      ],
      doNotRevealDirectly: [
        "pericarditis",
        "friction rub",
        "You are having a heart attack",
        "STEMI"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mild discomfort, low-grade fever.",
        details: "Young woman sitting upright on exam table, prefers leaning forward slightly."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Pericardial friction rub.",
        details:
          "Triphasic pericardial friction rub heard best at left sternal border with patient leaning forward. Tachycardia regular."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear.",
        details: "Clear breath sounds. Pain pleuritic with deep breath but no consolidation."
      }
    ],
    testOverrides: [
      {
        testId: "ecg",
        result:
          "Diffuse ST-segment elevations in multiple leads without reciprocal depression; PR depression present — pattern consistent with acute pericarditis.",
        yield: "high"
      },
      {
        testId: "troponin",
        result: "Troponin mildly elevated — can occur with myopericarditis; clinical context and ECG pattern favor pericarditis over focal STEMI.",
        yield: "helpful"
      },
      {
        testId: "esr_crp",
        result: "ESR and CRP elevated, consistent with inflammatory pericarditis.",
        yield: "high"
      },
      {
        testId: "cxr",
        result: "Normal heart size. No infiltrate. No large effusion on plain film.",
        yield: "helpful"
      },
      {
        testId: "d_dimer",
        result: "Low yield when classic pericarditis presentation without PE risk predominance.",
        yield: "inappropriate"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Inflammatory markers may be elevated.",
      imagingDefault: "Normal unless effusion large.",
      bedsideDefault: "Friction rub on auscultation leaning forward.",
      procedureDefault: "NSAIDs and colchicine first line in uncomplicated cases."
    },
    finalDxId: "pericarditis",
    requiredMustNotMiss: ["pericarditis", "stemi", "pe"],
    dxOverrides: [
      {
        dxId: "pericarditis",
        yield: "correct",
        explanation:
          "Positional sharp pain after viral illness, friction rub, diffuse ST elevation, and inflammatory markers fit acute pericarditis."
      },
      {
        dxId: "stemi",
        yield: "dangerous-miss",
        explanation:
          "Must distinguish — diffuse ST elevation with positional pain and rub favors pericarditis over coronary occlusion pattern."
      },
      {
        dxId: "pe",
        yield: "dangerous-miss",
        explanation: "Pleuritic pain possible, but pericardial rub and diffuse ST pattern with viral prodrome favor pericarditis."
      },
      {
        dxId: "costochondritis",
        yield: "reasonable",
        explanation: "Chest wall tenderness can mimic; lacks friction rub and typical ECG inflammatory pattern."
      },
      {
        dxId: "gerd",
        yield: "low",
        explanation: "Not positional forward-leaning relief pattern; ECG changes not explained."
      },
      {
        dxId: "pneumonia",
        yield: "low",
        explanation: "Clear lungs and no infiltrate; fever may occur in viral pericarditis."
      }
    ],
    diagnosisOptions: [
      {
        id: "pericarditis",
        name: "Acute pericarditis",
        isCorrect: true,
        isDangerous: false,
        explanation: "Classic positional pain, rub, and diffuse ST elevations."
      },
      {
        id: "stemi",
        name: "STEMI",
        isCorrect: false,
        isDangerous: true,
        explanation: "STEMI shows regional ST elevation with ischemic symptoms, not positional viral prodrome."
      },
      {
        id: "costochondritis",
        name: "Costochondritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Localized wall tenderness without pericardial rub or diffuse ST elevation."
      }
    ],
    teachingPoints: [
      "Grading (100): Positional pattern 30, ECG 25, viral trigger 20, diagnosis 25.",
      "Pericarditis pain is sharp, pleuritic, worse supine, relieved sitting forward.",
      "Diffuse ST elevation with PR depression distinguishes from regional STEMI.",
      "NSAIDs and colchicine are mainstay; monitor for effusion/tamponade.",
      "Mild troponin elevation may reflect myopericarditis."
    ]
  },
  {
    id: "medacademy-cardio-elephant-on-chest",
    title: "MEDacademy Case Two: Cardio - An Elephant on my Chest",
    sourceTitle: "Cardio Case: An Elephant on my Chest",
    specialty: CARDIOLOGY_SPECIALTY,
    difficulty: "Beginner",
    difficultyLabel: "High School / Introductory",
    estimatedMinutes: 20,
    description:
      "A middle-aged man with a history of hypertension, diabetes, and hyperlipidemia presents with crushing retrosternal chest pain (10/10 in intensity) that is radiating down his left arm and left side of his neck. He reports a long history of smoking cigarettes as well as a family history of heart disease. He feels nauseous and light-headed, and he reports shortness of breath. Examination reveals a diaphoretic man in considerable discomfort with diffuse bilateral rales on chest auscultation. ECG reveals convex ST-segment elevation.",
    cardTeaser:
      "A middle-aged man with crushing chest pain, risk factors, and a concerning ECG finding.",
    cardCategory: "Cardiology / Emergency Medicine / Pathology",
    objectives: [
      "Review Clinical Data including vital signs, ECG findings, and serial cardiac labs.",
      "Use Guided Reasoning to connect symptoms, ECG changes, and lab trends.",
      "Identify cardiovascular risk factors in the presentation.",
      "Arrive at a final diagnosis of acute ST-elevation myocardial infarction (STEMI)."
    ],
    attributionNote:
      "Educational case adapted from a MedAcademy cardio case for demonstration purposes.",
    showAttribution: false,
    scoringProfile: "medacademy-150",
    fastPatientReplies: true,
    earlyDiagnosisWarning: true,
    hideVitals: true,
    caseType: "MEDacademy",
    showVocabTab: true,
    sectionLayout: "medacademy",
    caseInfoContent: medacademyElephantOnChestCaseInfo,
    caseVocab: medacademyElephantOnChestVocab,
    guidedReasoning: medacademyElephantOnChestGuidedReasoning,
    patientPersona: {
      name: "Mr. Carter",
      age: 52,
      gender: "Male",
      chiefComplaint:
        "It feels like an elephant is sitting on my chest. The pain is unbearable.",
      background:
        "A middle-aged man with a history of hypertension, diabetes, and hyperlipidemia presents with crushing retrosternal chest pain (10/10 in intensity) that is radiating down his left arm and left side of his neck. He reports a long history of smoking cigarettes as well as a family history of heart disease. He feels nauseous and light-headed, and he reports shortness of breath.",
      keyHistoryPoints: [
        "Crushing retrosternal chest pain (10/10 in intensity)",
        "Pain radiating down left arm and left side of neck",
        "Hypertension, diabetes, and hyperlipidemia",
        "Long history of smoking cigarettes",
        "Family history of heart disease",
        "Nauseous and light-headed",
        "Shortness of breath",
        "ECG reveals convex ST-segment elevation"
      ],
      redFlags: [
        "Crushing chest pain 10/10 with left arm and neck radiation",
        "Hypotension (90/60 mmHg)",
        "Convex ST-segment elevation on ECG",
        "Rising troponin and CK-MB",
        "Diffuse bilateral rales with shortness of breath"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Speak as a middle-aged man in severe distress — plain language, not medical jargon. Use the exact wording from the case whenever possible.",
      behaviorRules: [
        "Answer only as the patient in first person.",
        "Do NOT say heart attack, STEMI, MI, or myocardial infarction.",
        "Use exact case wording when answering about symptoms, history, and exam.",
        "Keep answers brief and conversational (1–3 sentences) unless giving full history."
      ],
      doNotRevealDirectly: [
        "STEMI",
        "myocardial infarction",
        "heart attack",
        "MI",
        "acute coronary syndrome"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Diaphoretic man in considerable discomfort.",
        details: "Examination reveals a diaphoretic man in considerable discomfort."
      },
      {
        id: "respiratory",
        label: "Lungs",
        summary: "Diffuse bilateral rales on chest auscultation.",
        details: "Diffuse bilateral rales on chest auscultation."
      }
    ],
    testOverrides: [
      {
        testId: "ecg",
        result: "ECG reveals convex ST-segment elevation.",
        yield: "high"
      },
      {
        testId: "troponin",
        result:
          "Troponin I/T 0.8 ng/mL at initial draw, rising to >100 ng/mL at 6 hours post initial draw.",
        yield: "high"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Serial cardiac markers are already available in Clinical Data.",
      imagingDefault: "ECG findings are already available in Clinical Data.",
      bedsideDefault: "Vital signs are already available in Clinical Data.",
      procedureDefault: "This MEDacademy case uses pre-provided clinical data rather than ordering tests."
    },
    finalDxId: "stemi",
    requiredMustNotMiss: ["stemi", "aortic_dissection", "pe"],
    dxOverrides: [
      {
        dxId: "stemi",
        yield: "correct",
        explanation:
          "Acute ST-elevation myocardial infarction (STEMI) — supported by crushing chest pain, ST elevation, and rising cardiac markers."
      },
      {
        dxId: "nstemi",
        yield: "reasonable",
        explanation:
          "Elevated troponin suggests myocardial injury, but convex ST-segment elevation favors STEMI over NSTEMI."
      },
      {
        dxId: "unstable_angina",
        yield: "low",
        explanation: "Marked troponin rise and ST elevation indicate myocardial injury beyond unstable angina alone."
      },
      {
        dxId: "chf_exacerbation",
        yield: "reasonable",
        explanation:
          "Shortness of breath and diffuse bilateral rales may suggest acute heart failure as a complication."
      },
      {
        dxId: "aortic_dissection",
        yield: "dangerous-miss",
        explanation: "Must-not-miss in severe chest pain, though radiation pattern and ST elevation favor MI here."
      },
      {
        dxId: "pe",
        yield: "low",
        explanation: "Less likely as the primary diagnosis given ST elevation and serial cardiac marker pattern."
      },
      {
        dxId: "pericarditis",
        yield: "low",
        explanation: "Convex ST-segment elevation with crushing ischemic pain pattern favors STEMI."
      }
    ],
    diagnosisOptions: [
      {
        id: "stemi",
        name: "ST-elevation myocardial infarction (STEMI)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Correct — crushing chest pain, ST elevation, and rising troponin/CK-MB."
      },
      {
        id: "nstemi",
        name: "Non-ST elevation myocardial infarction (NSTEMI)",
        isCorrect: false,
        isDangerous: true,
        explanation: "Related, but ST elevation makes STEMI the best fit."
      },
      {
        id: "unstable_angina",
        name: "Unstable angina",
        isCorrect: false,
        isDangerous: true,
        explanation: "Troponin rise indicates myocardial injury beyond angina alone."
      },
      {
        id: "aortic_dissection",
        name: "Aortic dissection",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important to consider in chest pain but less likely here."
      },
      {
        id: "pe",
        name: "Pulmonary embolism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely given ECG and cardiac marker pattern."
      },
      {
        id: "chf_exacerbation",
        name: "Congestive heart failure exacerbation",
        isCorrect: false,
        isDangerous: true,
        explanation: "May be a complication but not the primary unifying diagnosis."
      }
    ],
    teachingPoints: [
      "Correct diagnosis: Acute ST-elevation myocardial infarction (STEMI).",
      "Crushing retrosternal chest pain with left arm and neck radiation is a classic warning pattern.",
      "ECG reveals convex ST-segment elevation — a major clue for STEMI.",
      "Serial labs show Troponin I/T rising from 0.8 ng/mL to >100 ng/mL with major CK and CK-MB increases.",
      "Risk factors include hypertension, diabetes, hyperlipidemia, smoking, and family history of heart disease.",
      "Low blood pressure, shortness of breath, and diffuse bilateral rales may suggest cardiogenic shock or acute heart failure physiology."
    ]
  }
];
