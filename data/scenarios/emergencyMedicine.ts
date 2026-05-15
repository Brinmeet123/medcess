import type { Scenario } from "@/data/scenarios";

const EM_SPECIALTY = "Emergency Medicine" as const;

export const emergencyMedicineScenarios: Scenario[] = [
  {
    id: "sah-worst-headache-of-my-life",
    title: "Worst Headache of My Life",
    specialty: EM_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Jennifer Ross, a 48-year-old office manager, presents with sudden maximal headache, vomiting, neck stiffness, and photophobia after lifting groceries 30 minutes ago.",
    cardTeaser: "My head suddenly exploded with pain.",
    objectives: [
      "Recognize thunderclap headache as subarachnoid hemorrhage until proven otherwise.",
      "Order emergent non-contrast CT head and consider lumbar puncture if CT negative.",
      "Identify meningeal signs and hypertensive response."
    ],
    patientPersona: {
      name: "Jennifer Ross",
      age: 48,
      gender: "Female",
      chiefComplaint: "My head suddenly exploded with pain.",
      background:
        "Office manager who felt sudden explosive head pain while lifting grocery bags 30 minutes ago. Never had a headache like this. Nauseated, vomited once, hates bright lights in the ER. Terrified.",
      vitals: {
        heartRate: 112,
        bloodPressure: "176/98",
        respiratoryRate: 20,
        oxygenSat: "98%",
        temperature: "99.1°F"
      },
      keyHistoryPoints: [
        "Sudden maximal headache 30 minutes ago during exertion",
        "Pain 10/10, thunderclap onset",
        "Nausea and vomiting",
        "Neck stiffness and photophobia",
        "No prior similar headache",
        "CT head shows subarachnoid blood",
        "No focal weakness"
      ],
      redFlags: [
        "Thunderclap headache maximal at onset",
        "Meningismus and vomiting",
        "Hypertension — consider aneurysmal SAH",
        "Time-sensitive neurosurgical emergency"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Jennifer, holding head, photophobic, scared. Speak in short bursts between nausea.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say subarachnoid hemorrhage or aneurysm.",
        "Emphasize instant onset and worst headache ever when asked.",
        "Mention groceries and lifting only when asked what you were doing."
      ],
      doNotRevealDirectly: [
        "subarachnoid hemorrhage",
        "SAH",
        "brain bleed",
        "ruptured aneurysm",
        "This is a migraine"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Distressed, holding head, photophobic.",
        details:
          "Middle-aged woman in moderate distress, prefers dim lighting, guarding head with both hands. Alert but miserable."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Neck stiffness; no focal deficit.",
        details:
          "Mild nuchal rigidity. Pupils equal and reactive. No facial droop, arm drift, or speech slurring on screening. Photophobia noted."
      }
    ],
    testOverrides: [
      {
        testId: "ct_head",
        result:
          "Non-contrast CT head shows hyperdense blood in the basal cisterns and sulci consistent with acute subarachnoid hemorrhage.",
        yield: "high"
      },
      {
        testId: "lumbar_puncture",
        result:
          "If CT delayed or negative with high suspicion: LP shows elevated opening pressure and xanthochromia.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      },
      {
        testId: "cmp",
        result: "Within normal limits.",
        yield: "low"
      },
      {
        testId: "ecg",
        result: "Sinus tachycardia. No acute ischemic changes.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No acute abnormality if low suspicion.",
      bedsideDefault: "Meningeal signs may be present.",
      procedureDefault: "Neurosurgery consult for confirmed SAH."
    },
    finalDxId: "subarachnoid_hemorrhage",
    requiredMustNotMiss: ["subarachnoid_hemorrhage", "meningitis"],
    dxOverrides: [
      {
        dxId: "subarachnoid_hemorrhage",
        yield: "correct",
        explanation:
          "Thunderclap headache with meningeal signs and subarachnoid blood on CT confirms SAH."
      },
      {
        dxId: "migraine",
        yield: "low",
        explanation: "Migraine lacks thunderclap maximal-at-onset pattern and blood on CT."
      },
      {
        dxId: "meningitis",
        yield: "dangerous-miss",
        explanation: "Can mimic with fever and stiff neck; CT shows hemorrhage here."
      },
      {
        dxId: "tension_headache",
        yield: "low",
        explanation: "Tension headache is gradual and mild-moderate, not explosive 10/10."
      },
      {
        dxId: "cluster_headache",
        yield: "low",
        explanation: "Cluster has unilateral orbital pattern and autonomic features, not SAH picture."
      }
    ],
    diagnosisOptions: [
      {
        id: "subarachnoid_hemorrhage",
        name: "Subarachnoid hemorrhage",
        isCorrect: true,
        isDangerous: true,
        explanation: "Thunderclap headache with CT evidence of subarachnoid blood."
      },
      {
        id: "migraine",
        name: "Migraine",
        isCorrect: false,
        isDangerous: false,
        explanation: "Incorrect for thunderclap onset with subarachnoid blood."
      },
      {
        id: "meningitis",
        name: "Meningitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Considered but CT shows hemorrhage not infection alone."
      }
    ],
    teachingPoints: [
      "Grading (100): Thunderclap 35, emergent CT 25, neck stiffness 15, diagnosis 25. Bonus: aneurysm concern (+10). Deductions: migraine only (-25), miss sudden onset (-15).",
      "Thunderclap headache requires emergent CT to exclude SAH.",
      "LP with xanthochromia if CT negative and suspicion remains high.",
      "Blood pressure management and neurosurgical referral are critical.",
      "Do not anchor on migraine without imaging in sudden severe headache."
    ]
  },
  {
    id: "pe-em-cant-catch-breath",
    title: "I Can't Catch My Breath",
    specialty: EM_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Rachel Morris, a 34-year-old marketing executive on oral contraceptives, presents with sudden dyspnea, pleuritic chest pain, and hypoxia two hours after an 8-hour flight.",
    cardTeaser: "I suddenly became short of breath.",
    objectives: [
      "Identify pulmonary embolism risk factors including OCP and recent travel.",
      "Recognize pleuritic chest pain and unexplained hypoxia.",
      "Order CT pulmonary angiography when suspicion is moderate-high."
    ],
    patientPersona: {
      name: "Rachel Morris",
      age: 34,
      gender: "Female",
      chiefComplaint: "I suddenly became short of breath.",
      background:
        "Marketing executive who returned from a client trip yesterday — 8-hour flight. At her desk today sudden shortness of breath and sharp chest pain worse with deep breaths. On birth control pills. Mild dizziness. Anxious but not primarily panic.",
      vitals: {
        heartRate: 124,
        bloodPressure: "118/74",
        respiratoryRate: 28,
        oxygenSat: "91%",
        temperature: "98.8°F"
      },
      keyHistoryPoints: [
        "Sudden dyspnea 2 hours ago at work",
        "Pleuritic chest pain worse with inspiration",
        "Recent long-haul flight",
        "Oral contraceptive use",
        "Hypoxia and tachycardia",
        "Mild right calf tenderness",
        "CT angiography positive for PE",
        "Elevated D-dimer"
      ],
      redFlags: [
        "Hypoxia with tachycardia",
        "Pleuritic pain after immobilization",
        "OCP use increases thrombotic risk",
        "Hemodynamic instability would worsen prognosis"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Rachel, breathless, speaking in short phrases. Worried but coherent.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say pulmonary embolism or blood clot diagnosis.",
        "Mention flight and birth control when asked risk factors.",
        "Describe sharp pain with deep breaths when asked about chest pain."
      ],
      doNotRevealDirectly: [
        "pulmonary embolism",
        "PE",
        "blood clot in lung",
        "This is just a panic attack"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Tachypneic, mild distress.",
        details: "Young woman sitting upright, mild respiratory distress, speaking in short sentences."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Tachypnea; lungs mostly clear.",
        details:
          "Respiratory rate elevated. Breath sounds clear bilaterally without wheezes or focal crackles. No decreased breath sounds."
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Mild right calf tenderness.",
        details:
          "Right posterior calf mildly tender without marked swelling or erythema. Pulses intact."
      }
    ],
    testOverrides: [
      {
        testId: "ct_pulmonary_angiography",
        result:
          "CT pulmonary angiography shows filling defect in segmental right pulmonary artery consistent with pulmonary embolism.",
        yield: "high"
      },
      {
        testId: "d_dimer",
        result: "D-dimer elevated above threshold.",
        yield: "helpful"
      },
      {
        testId: "ecg",
        result: "Sinus tachycardia. Nonspecific T-wave changes. No ST elevation.",
        yield: "helpful"
      },
      {
        testId: "troponin",
        result: "Within normal limits.",
        yield: "low"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No infiltrate if PE absent.",
      bedsideDefault: "Tachycardia and hypoxia may be present.",
      procedureDefault: "Anticoagulation when PE confirmed and no contraindication."
    },
    finalDxId: "pe",
    requiredMustNotMiss: ["pe", "stemi"],
    dxOverrides: [
      {
        dxId: "pe",
        yield: "correct",
        explanation:
          "Sudden dyspnea, pleuritic pain, hypoxia, risk factors, elevated D-dimer, and CTPA filling defect confirm PE."
      },
      {
        dxId: "pneumonia",
        yield: "low",
        explanation: "No fever, cough, or infiltrate; pleuritic pattern with travel favors PE."
      },
      {
        dxId: "panic",
        yield: "low",
        explanation: "Anxiety does not explain hypoxia and positive CTPA."
      },
      {
        dxId: "pneumothorax",
        yield: "dangerous-miss",
        explanation: "Can cause sudden dyspnea; exam and imaging here support PE."
      },
      {
        dxId: "stemi",
        yield: "dangerous-miss",
        explanation: "Consider in chest pain; troponin and ECG without STEMI, CTPA positive for PE."
      },
      {
        dxId: "asthma",
        yield: "low",
        explanation: "No wheeze or prior asthma history; sudden pleuritic presentation atypical."
      }
    ],
    diagnosisOptions: [
      {
        id: "pe",
        name: "Pulmonary embolism",
        isCorrect: true,
        isDangerous: true,
        explanation: "CTPA-confirmed embolus with classic risk factors."
      },
      {
        id: "panic",
        name: "Panic attack",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain objective hypoxia and clot on imaging."
      },
      {
        id: "pneumonia",
        name: "Pneumonia",
        isCorrect: false,
        isDangerous: false,
        explanation: "No infectious lung findings."
      }
    ],
    teachingPoints: [
      "Grading (100): Clot risk factors 30, pleuritic pain 20, CTPA 25, diagnosis 25. Deductions: panic only (-25), miss travel (-15).",
      "Wells score and D-dimer help risk-stratify before imaging.",
      "CT pulmonary angiography is diagnostic in moderate-high suspicion.",
      "OCP plus recent immobilization are major VTE risk factors.",
      "Consider anticoagulation and evaluate for right heart strain."
    ]
  },
  {
    id: "dka-sugar-out-of-control",
    title: "My Sugar Feels Out of Control",
    specialty: EM_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Brandon Patel, a 19-year-old college student with type 1 diabetes, presents vomiting with abdominal pain after stopping insulin during a viral illness.",
    cardTeaser: "I feel sick and can't stop throwing up.",
    objectives: [
      "Recognize diabetic ketoacidosis in type 1 diabetes with insulin omission.",
      "Order glucose, ketones, and venous blood gas for anion gap acidosis.",
      "Identify Kussmaul respirations and dehydration."
    ],
    patientPersona: {
      name: "Brandon Patel",
      age: 19,
      gender: "Male",
      chiefComplaint: "I feel sick and can't stop throwing up.",
      background:
        "College freshman with type 1 diabetes who stopped taking insulin when he got a stomach bug — thought he did not need it if not eating. Now nauseated, vomiting, abdominal pain, thirsty, urinating constantly, breathing fast. Fruity breath noticed by roommate.",
      vitals: {
        heartRate: 132,
        bloodPressure: "96/60",
        respiratoryRate: 30,
        oxygenSat: "99%",
        temperature: "99.7°F"
      },
      keyHistoryPoints: [
        "Type 1 diabetes; stopped insulin during illness",
        "Nausea, vomiting, abdominal pain",
        "Polyuria, polydipsia, fatigue",
        "Kussmaul breathing and fruity breath",
        "Glucose >450, positive ketones",
        "High anion gap metabolic acidosis",
        "Dry mucous membranes"
      ],
      redFlags: [
        "DKA with hypotension and tachycardia",
        "Insulin omission in T1DM is common precipitant",
        "Monitor potassium during insulin and fluids",
        "Cerebral edema risk in young patients during treatment"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Brandon, weak and nauseated. Apologetic about stopping insulin. Young, scared.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say DKA or diabetic ketoacidosis.",
        "Admit stopped insulin when asked medications honestly.",
        "Describe fast deep breathing and thirst when asked."
      ],
      doNotRevealDirectly: [
        "diabetic ketoacidosis",
        "DKA",
        "your sugar is 500",
        "ketoacidosis"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Ill-appearing, dehydrated.",
        details:
          "Young man appears fatigued with dry mucous membranes and poor skin turgor. Fruity odor to breath."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Kussmaul respirations.",
        details: "Deep, rapid breathing at 30/min. Lungs clear."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Diffuse mild tenderness.",
        details: "Soft abdomen with mild diffuse tenderness. No peritoneal signs."
      }
    ],
    testOverrides: [
      {
        testId: "fingerstick_glucose",
        result: "Fingerstick glucose >450 mg/dL.",
        yield: "high"
      },
      {
        testId: "serum_ketones",
        result: "Serum beta-hydroxybutyrate markedly elevated — positive ketones.",
        yield: "high"
      },
      {
        testId: "cmp",
        result:
          "Glucose >450 mg/dL, low bicarbonate, elevated anion gap metabolic acidosis. Potassium may be normal or high initially.",
        yield: "high"
      },
      {
        testId: "abg",
        result: "Venous pH low with elevated lactate-normal anion gap acidosis from ketones.",
        yield: "high"
      },
      {
        testId: "ua",
        result: "Urinalysis positive for glucose and ketones.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Mild leukocytosis may be present with stress; nonspecific.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "See metabolic panel and ketones.",
      imagingDefault: "Not routinely required.",
      bedsideDefault: "Hyperglycemia and ketosis on point-of-care testing.",
      procedureDefault: "IV fluids and insulin infusion per protocol."
    },
    finalDxId: "dka",
    requiredMustNotMiss: ["dka", "sepsis"],
    dxOverrides: [
      {
        dxId: "dka",
        yield: "correct",
        explanation:
          "T1DM with insulin omission, hyperglycemia, ketones, anion gap acidosis, and Kussmaul breathing confirm DKA."
      },
      {
        dxId: "gastroenteritis",
        yield: "low",
        explanation: "GI illness may precipitate but does not explain hyperglycemia and ketosis."
      },
      {
        dxId: "sepsis",
        yield: "dangerous-miss",
        explanation: "Consider infection trigger; metabolic picture defines DKA here."
      },
      {
        dxId: "pancreatitis",
        yield: "low",
        explanation: "Abdominal pain present but lipase pattern and ketosis point to DKA."
      },
      {
        dxId: "hyperosmolar_syndrome",
        yield: "low",
        explanation: "HHS has extreme hyperglycemia without prominent ketosis; opposite here."
      }
    ],
    diagnosisOptions: [
      {
        id: "dka",
        name: "Diabetic ketoacidosis (DKA)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Hyperglycemia, ketones, and anion gap acidosis in T1DM."
      },
      {
        id: "gastroenteritis",
        name: "Gastroenteritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain ketoacidosis."
      },
      {
        id: "sepsis",
        name: "Sepsis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Metabolic findings specific for DKA."
      }
    ],
    teachingPoints: [
      "Grading (100): Diabetic emergency 30, glucose/ketones 25, Kussmaul 20, diagnosis 25. Bonus: dehydration (+10).",
      "Always check glucose and ketones in vomiting T1DM patients.",
      "Insulin omission plus illness is a classic DKA trigger.",
      "Treat with fluids, insulin, and careful potassium monitoring.",
      "Search for precipitating infection while treating DKA."
    ]
  },
  {
    id: "appendicitis-pain-moved-rlq",
    title: "This Pain Moved to My Right Side",
    specialty: EM_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 10,
    description:
      "Kevin Diaz, a 20-year-old college student, presents with migratory abdominal pain from periumbilical to right lower quadrant with fever and peritoneal signs.",
    cardTeaser: "My stomach pain moved.",
    objectives: [
      "Recognize classic appendicitis migration of pain.",
      "Identify RLQ tenderness, guarding, and rebound.",
      "Obtain CT abdomen/pelvis or ultrasound when diagnosis uncertain."
    ],
    patientPersona: {
      name: "Kevin Diaz",
      age: 20,
      gender: "Male",
      chiefComplaint: "My stomach pain moved.",
      background:
        "College student with pain starting near belly button yesterday, now settled in right lower side. Lost appetite, nauseated, worse when walking to clinic. Low-grade fever. No diarrhea or urinary burning.",
      vitals: {
        heartRate: 108,
        bloodPressure: "122/76",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "100.7°F"
      },
      keyHistoryPoints: [
        "Periumbilical pain migrating to RLQ",
        "Anorexia and nausea",
        "Pain worse with movement",
        "Low-grade fever",
        "RLQ tenderness, rebound, positive Rovsing",
        "Elevated WBC",
        "CT shows inflamed appendix"
      ],
      redFlags: [
        "Peritoneal signs suggest surgical abdomen",
        "Rupture risk if diagnosis delayed",
        "Pregnancy test in reproductive-age females — not applicable here"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Kevin, uncomfortable college kid. Hunched over, guards belly.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say appendicitis.",
        "Describe pain move from middle to right lower when asked location history.",
        "Worse with walking or bump in car when asked."
      ],
      doNotRevealDirectly: [
        "appendicitis",
        "your appendix",
        "surgical abdomen",
        "You need surgery now"
      ]
    },
    physicalExam: [
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "RLQ peritonitis.",
        details:
          "Tenderness maximal in right lower quadrant with guarding and positive rebound. Positive Rovsing sign. McBurney point tender."
      },
      {
        id: "general",
        label: "General",
        summary: "Mild fever, uncomfortable.",
        details: "Appears uncomfortable, prefers stillness. Low-grade fever."
      }
    ],
    testOverrides: [
      {
        testId: "ct_abdomen",
        result:
          "CT abdomen/pelvis shows dilated appendix with wall thickening, periappendiceal fat stranding — acute appendicitis.",
        yield: "high"
      },
      {
        testId: "us_abdomen",
        result: "Ultrasound may show noncompressible tubular appendix in skilled hands.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Elevated white blood cell count with left shift.",
        yield: "helpful"
      },
      {
        testId: "ua",
        result: "Normal urinalysis without pyuria.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Leukocytosis may be present.",
      imagingDefault: "Appendiceal inflammation on CT.",
      bedsideDefault: "RLQ peritoneal signs.",
      procedureDefault: "General surgery consult for appendectomy."
    },
    finalDxId: "appendicitis",
    requiredMustNotMiss: ["appendicitis"],
    dxOverrides: [
      {
        dxId: "appendicitis",
        yield: "correct",
        explanation:
          "Migratory RLQ pain, peritoneal signs, leukocytosis, and CT inflammation confirm appendicitis."
      },
      {
        dxId: "gastroenteritis",
        yield: "low",
        explanation: "Usually diffuse cramping with diarrhea; focal RLQ peritonitis argues against."
      },
      {
        dxId: "kidney_stone",
        yield: "low",
        explanation: "Renal colic is flank pain with hematuria; UA normal here."
      },
      {
        dxId: "mesenteric_adenitis",
        yield: "reasonable",
        explanation: "Can mimic in young patients; CT shows appendix as source here."
      },
      {
        dxId: "crohn_disease",
        yield: "low",
        explanation: "Chronic course; acute migration pattern fits appendicitis."
      }
    ],
    diagnosisOptions: [
      {
        id: "appendicitis",
        name: "Acute appendicitis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Classic history, exam, and CT findings."
      },
      {
        id: "gastroenteritis",
        name: "Gastroenteritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "No diarrhea; focal surgical abdomen."
      },
      {
        id: "kidney_stone",
        name: "Kidney stone",
        isCorrect: false,
        isDangerous: false,
        explanation: "Wrong pain pattern and normal UA."
      }
    ],
    teachingPoints: [
      "Grading (100): Migration 30, RLQ exam 20, imaging 25, diagnosis 25.",
      "Pain migration from periumbilical to RLQ is classic for appendicitis.",
      "CT is accurate; ultrasound useful in pregnancy or radiation avoidance.",
      "Surgical consultation for uncomplicated appendicitis.",
      "Maintain low threshold in young adults with peritoneal signs."
    ]
  },
  {
    id: "aortic-dissection-tearing-chest",
    title: "My Chest Feels Like It's Tearing",
    specialty: EM_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Marcus Evans, a 58-year-old construction supervisor with hypertension, presents with sudden tearing chest pain radiating to the back and unequal arm blood pressures.",
    cardTeaser: "It feels like something ripped inside my chest.",
    objectives: [
      "Recognize tearing chest pain radiating to the back.",
      "Identify blood pressure differential between arms.",
      "Order CT aortic angiography and control blood pressure."
    ],
    patientPersona: {
      name: "Marcus Evans",
      age: 58,
      gender: "Male",
      chiefComplaint: "It feels like something ripped inside my chest.",
      background:
        "Construction supervisor with poorly controlled hypertension who felt sudden ripping chest pain moving equipment at work. Pain goes through to his back. Diaphoretic and terrified. Right arm pressure higher than left on EMS report.",
      vitals: {
        heartRate: 118,
        bloodPressure: "180/100",
        respiratoryRate: 24,
        oxygenSat: "96%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Sudden severe tearing chest pain to back",
        "Exertion at work when started",
        "Uncontrolled hypertension",
        "Right arm BP 180/100 vs left 156/90",
        "Diaphoresis",
        "CT shows aortic dissection",
        "Widened mediastinum on chest X-ray"
      ],
      redFlags: [
        "Aortic dissection is surgical emergency",
        "Do not give thrombolytics for MI mimic",
        "Blood pressure control with beta-blockade",
        "Type A vs B determines management"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Marcus, panicked, clutching chest. Describe tearing sensation vividly but not medically.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say aortic dissection.",
        "Mention pain to back and ripping feeling when asked.",
        "Acknowledge high blood pressure history when asked."
      ],
      doNotRevealDirectly: [
        "aortic dissection",
        "dissecting aorta",
        "Type A dissection",
        "You need heart attack treatment only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Diaphoretic, distressed.",
        details: "Middle-aged man appears terrified, profuse sweating, in severe pain."
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Tachycardic; unequal arm BPs.",
        details:
          "Tachycardia. Blood pressure 180/100 right arm, 156/90 left arm. Heart sounds without clear murmur on hurried exam. Pulses may be asymmetric."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Clear lungs.",
        details: "Lungs clear. Mild tachypnea from pain."
      }
    ],
    testOverrides: [
      {
        testId: "ct_aortic_angiography",
        result:
          "CT angiography chest/abdomen shows intimal flap in ascending aorta with dissection — Stanford type A concern.",
        yield: "high"
      },
      {
        testId: "cxr",
        result: "Chest X-ray with widened mediastinum (>8 cm).",
        yield: "helpful"
      },
      {
        testId: "ecg",
        result: "Nonspecific ST-T changes. No diagnostic STEMI.",
        yield: "helpful"
      },
      {
        testId: "troponin",
        result: "May be mildly elevated from strain; does not exclude dissection.",
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
      imagingDefault: "Mediastinal widening if dissection.",
      bedsideDefault: "Check BP both arms.",
      procedureDefault: "Emergent vascular/cardiac surgery for type A."
    },
    finalDxId: "aortic_dissection",
    requiredMustNotMiss: ["aortic_dissection", "stemi", "pe"],
    dxOverrides: [
      {
        dxId: "aortic_dissection",
        yield: "correct",
        explanation:
          "Tearing pain to back, hypertension, arm BP differential, widened mediastinum, and CT intimal flap confirm dissection."
      },
      {
        dxId: "stemi",
        yield: "dangerous-miss",
        explanation: "Chest pain overlap; tearing radiation and BP asymmetry favor dissection over isolated MI."
      },
      {
        dxId: "pe",
        yield: "dangerous-miss",
        explanation: "Dyspnea possible; tearing pain and mediastinal findings point to aorta."
      },
      {
        dxId: "gerd",
        yield: "low",
        explanation: "Not sudden ripping pain with BP differential."
      },
      {
        dxId: "pneumothorax",
        yield: "low",
        explanation: "Unilateral breath loss; not present."
      },
      {
        dxId: "muscle_strain",
        yield: "low",
        explanation: "Does not cause mediastinal widening or flap on CT."
      }
    ],
    diagnosisOptions: [
      {
        id: "aortic_dissection",
        name: "Aortic dissection",
        isCorrect: true,
        isDangerous: true,
        explanation: "CT-confirmed intimal flap with classic presentation."
      },
      {
        id: "stemi",
        name: "STEMI",
        isCorrect: false,
        isDangerous: true,
        explanation: "ECG not diagnostic; dissection on CTA."
      },
      {
        id: "pe",
        name: "Pulmonary embolism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Wrong pain quality and CTA shows aortic flap."
      }
    ],
    teachingPoints: [
      "Grading (100): Tearing pain 30, unequal BP 25, CTA 20, diagnosis 25. Bonus: hypertension (+10). Deductions: MI only (-20), miss back pain (-15).",
      "Check blood pressure in both arms in acute chest pain.",
      "Tearing pain to the back is classic for aortic dissection.",
      "CT angiography is the key diagnostic study.",
      "Avoid anticoagulation/thrombolysis until dissection excluded."
    ]
  }
];
