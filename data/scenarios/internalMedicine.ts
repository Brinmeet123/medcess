import type { Scenario } from "@/data/scenarios";

const INTERNAL_MEDICINE_SPECIALTY = "Internal Medicine" as const;

export const internalMedicineScenarios: Scenario[] = [
  {
    id: "t2dm-off-weeks-kevin-sharma",
    title: "I Haven't Felt Right For Weeks",
    specialty: INTERNAL_MEDICINE_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Kevin Sharma, a 56-year-old small business owner with metabolic risk, presents with gradual hyperglycemic symptoms including polyuria polydipsia fatigue blurred vision and early neuropathy — consistent with undiagnosed type 2 diabetes mellitus.",
    cardTeaser: "I've just felt off lately.",
    objectives: [
      "Recognize classic hyperglycemic symptoms and metabolic syndrome context.",
      "Order HbA1c and glucose confirmation with urinalysis and baseline CMP.",
      "Differentiate type 2 diabetes from hyperthyroidism diabetes insipidus and medication mimics."
    ],
    patientPersona: {
      name: "Kevin Sharma",
      age: 56,
      gender: "Male",
      chiefComplaint: "I've just felt off lately.",
      background:
        "Desk and storefront stress — months of dragging through afternoons. Thirst ridiculous refilling Stanley cup hourly. Peeing constantly wakes him twice nightly, embarrassing at work. Vision slightly blurry new readers stronger maybe. Feet tingly socks at night sometimes. Hungrier than usual yet belt same notch denial. No fever chest pain. Dad had 'sugar' in sixties. Avoided physicals.",
      vitals: {
        heartRate: 88,
        bloodPressure: "146/88",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.7°F"
      },
      keyHistoryPoints: [
        "Gradual polyuria polydipsia fatigue",
        "Visual blurring and hunger",
        "Peripheral paresthesias",
        "Overweight no prior diabetes label",
        "HbA1c markedly elevated",
        "Glucosuria with hyperglycemia"
      ],
      redFlags: [
        "DKA presentation in adult possible LADA — ketone assessment if ill",
        "Hyperosmolar crisis in profound dehydration",
        "Infection unmasked by hyperglycemia"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Tired pragmatic businessman, minimizes until pressed, jokes about coffee pee breaks.",
      behaviorRules: [
        "Do NOT say diabetes or type 2.",
        "Describe thirst urination vision feet tingling when asked.",
        "Avoid textbook phrase polydipsia unless mirroring doctor wording."
      ],
      doNotRevealDirectly: [
        "your A1c is double digits",
        "start metformin tonight",
        "this is just anxiety only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Overweight; fatigued appearance.",
        details: "BMI elevated abdominal adiposity. Alert conversational. No acanthosis recorded in note though primary care may revisit skin folds."
      },
      {
        id: "neuro",
        label: "Neurologic / feet",
        summary: "Mild decreased distal sensation.",
        details:
          "Monofilament screening reduced sensation bilateral feet distal surfaces — early peripheral neuropathy pattern without ulceration."
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Regular rhythm; no murmur.",
        details: "Blood pressure elevated. Heart sounds regular without rub gallop."
      }
    ],
    testOverrides: [
      {
        testId: "fingerstick_glucose",
        result:
          "Fingerstick glucose (fasting context): 248 mg/dL — markedly elevated confirming hyperglycemia in clinic.",
        yield: "high"
      },
      {
        testId: "hba1c",
        result: "Hemoglobin A1c: 9.2% — diagnostic of chronically poor glycemic control consistent with diabetes mellitus.",
        yield: "high"
      },
      {
        testId: "cmp",
        result:
          "CMP: glucose elevated on chemistry panel; creatinine within acceptable range; electrolytes without derangement; mild ALT upper normal possibly NAFLD-associated.",
        yield: "helpful"
      },
      {
        testId: "ua",
        result: "Urinalysis: glucosuria with ketones negative; mild protein — suggest repeat quantification and albuminuria screening in follow-up care.",
        yield: "high"
      },
      {
        testId: "lipid",
        result: "Lipid panel: triglycerides and LDL patterns consistent with diabetic dyslipidemia risk — guideline-directed statin discussion appropriate long term.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "HbA1c defines chronic control; random or fasting glucose confirms hyperglycemia.",
      imagingDefault: "Not routinely required for uncomplicated new diagnosis.",
      bedsideDefault: "Foot exam monofilament vibration annually after diagnosis established.",
      procedureDefault: "Diabetes self-management education referral."
    },
    finalDxId: "type_2_diabetes_mellitus",
    requiredMustNotMiss: ["type_2_diabetes_mellitus", "hyperthyroidism", "diabetes_insipidus"],
    dxOverrides: [
      {
        dxId: "type_2_diabetes_mellitus",
        yield: "correct",
        explanation:
          "Hyperglycemic symptoms obesity family risk elevated A1c glucosuria and neuropathy findings establish type 2 diabetes mellitus."
      },
      {
        dxId: "hyperthyroidism",
        yield: "dangerous-miss",
        explanation: "Can cause weight loss tremor polyuria alternative mechanism — less consistent with A1c elevation and glucosuria together."
      },
      {
        dxId: "diabetes_insipidus",
        yield: "low",
        explanation: "Massive dilute polyuria with normoglycemia — hyperglycemia and glucosuria redirect to diabetes mellitus."
      },
      {
        dxId: "psychogenic_polydipsia",
        yield: "low",
        explanation: "Dilutes labs without hyperglycemia — not supported by glucose and A1c."
      },
      {
        dxId: "exogenous_steroid_effect",
        yield: "reasonable",
        explanation: "Steroids worsen glucose — no steroid history volunteered absent elicitation."
      },
      {
        dxId: "anxiety",
        yield: "low",
        explanation: "Stress overlaps fatigue but objective hyperglycemia on testing is primary."
      },
      {
        dxId: "uti",
        yield: "low",
        explanation: "Dysuria not prominent — hyperglycemia drives polydipsia more than infection unless later complication."
      }
    ],
    diagnosisOptions: [
      {
        id: "type_2_diabetes_mellitus",
        name: "Type 2 diabetes mellitus",
        isCorrect: true,
        isDangerous: true,
        explanation: "A1c and clinical syndrome satisfy diagnosis."
      },
      {
        id: "hyperthyroidism",
        name: "Hyperthyroidism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain HbA1c elevation and glucosuria pattern."
      },
      {
        id: "anxiety",
        name: "Anxiety disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Insufficient alone for documented hyperglycemia."
      }
    ],
    teachingPoints: [
      "Rubric (100): diabetes symptoms 30, HbA1c 25, metabolic risk 20, diagnosis 25 — neuropathy bonus +10.",
      "Dual fasting/random criteria or A1c threshold define diagnosis per ADA guidance.",
      "Initial workup includes renal function lipids urine albumin creatinine ratio planning.",
      "Screen comorbid sleep apnea NAFLD hypertension in metabolic syndrome."
    ]
  },
  {
    id: "chf-sob-robert-daniels",
    title: "I Keep Getting More Short Of Breath",
    specialty: INTERNAL_MEDICINE_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Robert Daniels, a 71-year-old retired electrician with progressive exertional dyspnea orthopnea and edema — clinic presentation consistent with congestive heart failure with reduced ejection fraction and volume overload on exam and testing.",
    cardTeaser: "I can't do what I used to.",
    objectives: [
      "Recognize heart failure congestion orthopnea and elevated JVP.",
      "Order BNP natriuretic peptide echocardiogram and CXR.",
      "Differentiate CHF from COPD pneumonia and renal sodium retention alone."
    ],
    patientPersona: {
      name: "Robert Daniels",
      age: 71,
      gender: "Male",
      chiefComplaint: "I can't do what I used to.",
      background:
        "Stairs to bedroom steal breath now — was fine last season. Ankles puffy socks imprint angry. Three pillows sneaky became normal — wife noticed. Wakes winded once or twice gasping scary then settles. Fatigued shelving hobbies. No fever cough colored sputum. Former smoker quit fifteen years. MI never labeled but ER 'warning' decade ago vague.",
      vitals: {
        heartRate: 102,
        bloodPressure: "152/92",
        respiratoryRate: 22,
        oxygenSat: "93%",
        temperature: "98.5°F"
      },
      keyHistoryPoints: [
        "Progressive dyspnea on exertion",
        "Orthopnea and PND symptoms",
        "Bilateral leg edema",
        "Crackles JVD on exam",
        "Elevated BNP",
        "CXR congestion reduced EF echo"
      ],
      redFlags: [
        "STEMI equivalent or flash pulmonary edema requires emergency care",
        "Cardiogenic shock mandates escalation",
        "Consider ischemia arrhythmia precipitant"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Matter-of-fact retired tradesman embarrassed needing pillows downplaying until breathlessness undeniable.",
      behaviorRules: [
        "Do NOT say heart failure or CHF.",
        "Describe pillow stacking ankle swelling night breath spells with sensory detail.",
        "No textbook 'orthopnea' label unless doctor uses word first."
      ],
      doNotRevealDirectly: [
        "BNP is sky high",
        "you need Lasix IV now in clinic",
        "this is only deconditioning"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mild respiratory distress; conversational dyspnea.",
        details: "Sitting forward comfortable. Mild tachypnea. Trace diaphoresis with exertion walking to scale."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Bibasilar crackles.",
        details: "Lung bases with fine inspiratory crackles — no localized consolidation dullness."
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Elevated JVP; regular tachycardia.",
        details: "Internal jugular distension with hepatojugular reflex subtle. S3 gallop soft. No loud murmur."
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Pitting edema bilaterally to mid-shin.",
        details: "Warm with 2+ pitting edema symmetric. Skin intact."
      }
    ],
    testOverrides: [
      {
        testId: "bnp",
        result: "BNP markedly elevated — consistent with symptomatic heart failure and volume overload.",
        yield: "high"
      },
      {
        testId: "cxr",
        result: "Chest X-ray: cardiomegaly with cephalization and interstitial edema pattern consistent with pulmonary venous congestion.",
        yield: "high"
      },
      {
        testId: "ecg",
        result: "ECG: sinus tachycardia with left ventricular hypertrophy pattern and nonspecific ST-T changes — ischemia not definitive on tracing alone.",
        yield: "helpful"
      },
      {
        testId: "echo",
        result:
          "Echocardiogram: left ventricular systolic dysfunction with ejection fraction approximately 35% — regional wall motion review suggests prior silent ischemic insult versus global cardiomyopathy classification per cardiologist.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP: creatinine at upper baseline with mild hyponatremia sometimes seen in congestive states — monitor diuretic response.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "BNP NT-proBNP support diagnosis when echocardiography available.",
      imagingDefault: "CXR congestion pattern supports therapy direction.",
      bedsideDefault: "Daily weights hypertension diabetes comorbidity optimization.",
      procedureDefault: "Quadruple guideline-directed medical therapy and device discussion in cardiology."
    },
    finalDxId: "congestive_heart_failure",
    requiredMustNotMiss: ["congestive_heart_failure", "pneumonia", "copd"],
    dxOverrides: [
      {
        dxId: "congestive_heart_failure",
        yield: "correct",
        explanation:
          "Volume overload exam BNP elevation pulmonary congestion echo reduced EF confirms congestive heart failure etiology for dyspnea edema orthopnea."
      },
      {
        dxId: "copd",
        yield: "reasonable",
        explanation: "Smoking history overlap — wheeze dominant exam less crepitant edema BNP pattern argues CHF first."
      },
      {
        dxId: "pneumonia",
        yield: "dangerous-miss",
        explanation: "Fever focal infiltrate absent — maintain if hypoxic cough productive pivot."
      },
      {
        dxId: "aki",
        yield: "reasonable",
        explanation: "Renal failure contributes fluid retention — here integrated with heart failure cardiorenal syndrome concept."
      },
      {
        dxId: "idiopathic_pulmonary_fibrosis",
        yield: "low",
        explanation: "Chronic fibrotic disease without typical crackle Velcro IPF isolation — CHF treatment trial clarifies."
      }
    ],
    diagnosisOptions: [
      {
        id: "congestive_heart_failure",
        name: "Congestive heart failure",
        isCorrect: true,
        isDangerous: true,
        explanation: "Clinical radiographic biomarker and echocardiographic evidence align."
      },
      {
        id: "copd",
        name: "COPD",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely without obstructive wheeze dominant isolated picture and with congestion findings."
      },
      {
        id: "pneumonia",
        name: "Pneumonia",
        isCorrect: false,
        isDangerous: true,
        explanation: "No focal consolidation fever pattern — consider if presentation evolves."
      }
    ],
    teachingPoints: [
      "Rubric (100): fluid overload recognition 30, BNP and echo 25, orthopnea clues 20, diagnosis 25.",
      "GDMT for HFrEF improves mortality — sim ends at diagnosis.",
      "Differentiate heart failure with preserved EF by echo diastolic parameters when EF not reduced.",
      "Address precipitants ischemia diet sodium adherent meds."
    ]
  },
  {
    id: "iron-anemia-dizziness-melissa-chen",
    title: "I Feel Dizzy When I Stand Up",
    specialty: INTERNAL_MEDICINE_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Melissa Chen, a 48-year-old office administrator with heavy menstrual bleeding presents with iron deficiency anemia manifesting as fatigue exertional dyspnea orthostatic dizziness pallor and microcytic indices.",
    cardTeaser: "I've been getting lightheaded.",
    objectives: [
      "Link menorrhagia to iron deficiency anemia in middle-aged woman.",
      "Order CBC iron studies and evaluate thyroid overlap symptoms.",
      "Differentiate anemia from dehydration primary arrhythmia and anxiety somatization alone."
    ],
    patientPersona: {
      name: "Melissa Chen",
      age: 48,
      gender: "Female",
      chiefComplaint: "I've been getting lightheaded.",
      background:
        "Months of standing desk dizziness black speckles vision resolves sitting. Stairs stairs winded embarrassing fitness drop. Periods 'crime scene' heavy super plus hourly some cycle days clots quarter-sized maybe bigger guesses. ICE chewing coworker side-eye. Weak lifting grocery bags. Not pregnant per home tests. No melena bright red stool she looked anxious. Omeprazole chronic reflux.",
      vitals: {
        heartRate: 106,
        bloodPressure: "106/62",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Orthostatic dizziness fatigue dyspnea on exertion",
        "Heavy menstrual bleeding",
        "Pallor tachycardia",
        "Microcytic anemia low ferritin",
        "Normal TSH"
      ],
      redFlags: [
        "GI malignancy bleeding in age-appropriate bleeding workup",
        "Hemodynamic instability from severe anemia",
        "Pancytopenia alternative marrow pathology"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Organized admin, apologizes for TMI on periods, minimizes until symptoms pile undeniable.",
      behaviorRules: [
        "Do NOT say anemia or iron deficiency.",
        "Heavy periods when menstrual history questioned.",
        "Ice craving when diet quirks cravings asked."
      ],
      doNotRevealDirectly: [
        "ferritin is rock bottom",
        "you need transfusion today",
        "this is just perimenopause only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pallor; mild tachycardia.",
        details: "Conjunctival pallor. Comfortable seated. Orthostatic vitals deferred in note but symptoms classic."
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Tachycardic regular; soft flow murmur physiologic.",
        details: "Systolic flow murmur soft — hyperdynamic state possible anemia."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "CBC: hemoglobin 8.7 g/dL — moderate anemia. MCV low microcytic. Platelets elevated reactive pattern sometimes iron deficiency.",
        yield: "high"
      },
      {
        testId: "iron_studies",
        result:
          "Iron studies: ferritin low serum iron low TIBC high saturation low — classic iron deficiency pattern from blood loss.",
        yield: "high"
      },
      {
        testId: "ferritin",
        result: "Ferritin: low — confirms depleted iron stores.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP: otherwise unremarkable without renal explanation for pallor.",
        yield: "low"
      },
      {
        testId: "tsh",
        result: "TSH: normal — hypothyroidism unlikely primary driver of microcytosis here.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Ferritin best iron store marker; consider CRP interpretation inflammation.",
      imagingDefault: "Endoscopy colonoscopy age-based when GI source concern menorrhagia insufficient explanation.",
      bedsideDefault: "Oral iron replacement with response monitoring.",
      procedureDefault: "Gynecology for menorrhagia ablation hormonal IUD discussion."
    },
    finalDxId: "iron_deficiency_anemia",
    requiredMustNotMiss: ["iron_deficiency_anemia", "hypothyroidism", "dehydration"],
    dxOverrides: [
      {
        dxId: "iron_deficiency_anemia",
        yield: "correct",
        explanation:
          "Microcytic hypochromic indices with low ferritin heavy menses and systemic symptoms define symptomatic iron deficiency anemia."
      },
      {
        dxId: "hypothyroidism",
        yield: "dangerous-miss",
        explanation: "Fatigue overlap — normal TSH in this case lowers probability as root cause."
      },
      {
        dxId: "dehydration",
        yield: "low",
        explanation: "Orthostasis possible but chronic heavy bleeding indices redirect to anemia."
      },
      {
        dxId: "cardiac_arrhythmia",
        yield: "reasonable",
        explanation: "Palpitations possible — exam and CBC clarify anemia-mediated tachycardia pattern."
      },
      {
        dxId: "anxiety",
        yield: "low",
        explanation: "Objective anemia explains dizziness better than primary anxiety alone."
      }
    ],
    diagnosisOptions: [
      {
        id: "iron_deficiency_anemia",
        name: "Symptomatic iron deficiency anemia",
        isCorrect: true,
        isDangerous: true,
        explanation: "Low hemoglobin microcytosis low ferritin with menorrhagia source clinically."
      },
      {
        id: "hypothyroidism",
        name: "Hypothyroidism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain microcytosis and iron studies pattern when TSH normal."
      },
      {
        id: "anxiety",
        name: "Anxiety disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "May coexist but does not explain documented anemia."
      }
    ],
    teachingPoints: [
      "Rubric (100): anemia symptoms 25, menstrual history 25, CBC and iron studies 25, diagnosis 25.",
      "Iron replacement duration continues months after hemoglobin normalizes repleting stores.",
      "Evaluate GI sources when menorrhagia inadequate or GI risk factors.",
      "IV iron when malabsorption oral intolerance or severe symptomatic anemia per protocol."
    ]
  },
  {
    id: "ckd-fatigue-william-foster",
    title: "I Can't Stop Feeling Tired",
    specialty: INTERNAL_MEDICINE_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "William Foster, a 64-year-old retired teacher with long-standing diabetes and hypertension, presents with progressive fatigue anorexia pruritus and edema — laboratory findings consistent with chronic kidney disease and proteinuria.",
    cardTeaser: "My energy has slowly disappeared.",
    objectives: [
      "Recognize uremic constellation and CKD complications in high-risk patient.",
      "Order CMP urinalysis CBC and renal imaging when indicated.",
      "Differentiate CKD from heart failure depression and occult malignancy."
    ],
    patientPersona: {
      name: "William Foster",
      age: 64,
      gender: "Male",
      chiefComplaint: "My energy has slowly disappeared.",
      background:
        "Months sandbag tired not depressed he insists — lost joy grading hypothetically retired anyway. Picky appetite nothing tastes right. Itchy back showers scalding relief temporary. Socks tight edema afternoon. Type two diabetes pills only compliance fair. Lisinopril HCTZ years. No fever night sweats labeled convincingly. Wife nagged labs — avoided.",
      vitals: {
        heartRate: 86,
        bloodPressure: "156/94",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Fatigue anorexia pruritus edema",
        "Diabetes hypertension ACE exposure",
        "Elevated creatinine reduced eGFR",
        "Proteinuria urinalysis",
        "Renal ultrasound chronic medical kidney appearance"
      ],
      redFlags: [
        "Rapid rise creatinine suggesting AKI superimposed",
        "Hyperkalemia emergency",
        "Nephrotic range proteinuria pivoting biopsy discussion"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Former teacher articulate minimizer, intellectualizes denial, dry humor when uncomfortable.",
      behaviorRules: [
        "Do NOT say chronic kidney disease or renal failure.",
        "Itching edema poor energy diet bland when elicited.",
        "Mentions diabetes BP meds when risk factors asked."
      ],
      doNotRevealDirectly: [
        "you need dialysis soon",
        "creatinine doubled",
        "just depression only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pallorous fatigued; mild edema.",
        details: "Chronically ill appearance. Pale mucosa. Trace periorbital puffiness."
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Hypertensive; regular rhythm.",
        details: "Elevated BP. No gallop appreciated. JVP not grossly elevated."
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Mild bilateral lower extremity edema.",
        details: "Dependent 1+ pitting edema bilaterally. No stasis ulcers."
      }
    ],
    testOverrides: [
      {
        testId: "cmp",
        result:
          "CMP: creatinine 2.4 mg/dL elevated from prior PCP values — eGFR approximately 28 mL/min/1.73m² staging CKD G4 territory; bicarbonate low-normal; potassium borderline monitor.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: normocytic anemia hemoglobin 10.1 g/dL — anemia of CKD pattern mixed possible iron studies if indicated.",
        yield: "high"
      },
      {
        testId: "ua",
        result:
          "Urinalysis: 2+ protein; cellular casts not seen on dipstick microscopy pending — quantification with albumin creatinine ratio recommended.",
        yield: "high"
      },
      {
        testId: "renal_ultrasound",
        result:
          "Renal ultrasound: kidneys small with cortical thinning echogenicity consistent with chronic medical renal disease — no hydronephrosis.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "CKD mineral bone disorder labs PTH vitamin D phosphorus pacing by stage.",
      imagingDefault: "Rule out obstruction once; repeat if clinical change.",
      bedsideDefault: "BP glycemic control RAAS modification nephrotoxin avoidance.",
      procedureDefault: "Nephrology referral staging preparation education transplant options when advancing."
    },
    finalDxId: "chronic_kidney_disease",
    requiredMustNotMiss: ["chronic_kidney_disease", "congestive_heart_failure", "depression"],
    dxOverrides: [
      {
        dxId: "chronic_kidney_disease",
        yield: "correct",
        explanation:
          "Progressive renal dysfunction proteinuria hypertension diabetes context fatigue edema pruritus and small kidneys support chronic kidney disease."
      },
      {
        dxId: "congestive_heart_failure",
        yield: "dangerous-miss",
        explanation: "Overlap edema fatigue — less prominent JVP PND BNP not emphasized here; can coexist cardorenally."
      },
      {
        dxId: "depression",
        yield: "reasonable",
        explanation: "Anhedonia wording overlaps — laboratory anchored organ dysfunction present."
      },
      {
        dxId: "liver_cirrhosis",
        yield: "low",
        explanation: "Ascites edema overlap — lacks stigmata alcohol hepatitis narrative here."
      },
      {
        dxId: "lung_cancer",
        yield: "low",
        explanation: "Malignancy fatigue weight loss — proteinuria reduced GFR pattern primarily renal."
      }
    ],
    diagnosisOptions: [
      {
        id: "chronic_kidney_disease",
        name: "Chronic kidney disease",
        isCorrect: true,
        isDangerous: true,
        explanation: "Reduced GFR proteinuria chronic ultrasound findings with symptom complex."
      },
      {
        id: "congestive_heart_failure",
        name: "Congestive heart failure",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important comorbid consideration; labs here anchor CKD as unifying renal pattern."
      },
      {
        id: "depression",
        name: "Major depressive disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not replace objective renal impairment and proteinuria."
      }
    ],
    teachingPoints: [
      "Rubric (100): CKD symptom recognition 25, risk factors 25, kidney studies 25, diagnosis 25.",
      "KDIGO staging guides frequency monitoring complications.",
      "Avoid NSAIDs contrast overload in advanced CKD unless careful risk-benefit.",
      "Prepare patient early for renal replacement education."
    ]
  },
  {
    id: "nephrotic-edema-thomas-rivera",
    title: "My Legs Keep Swelling",
    specialty: INTERNAL_MEDICINE_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Thomas Rivera, a 42-year-old chef with progressive edema foamy urine weight gain and fatigue — nephrotic syndrome pattern with heavy proteinuria hypoalbuminemia and hyperlipidemia on testing.",
    cardTeaser: "My legs and ankles keep puffing up.",
    objectives: [
      "Recognize nephrotic syndrome triad history foamy urine edema.",
      "Quantify proteinuria albumin and lipid profile.",
      "Differentiate from heart failure cirrhosis CKD fluid overload and DVT."
    ],
    patientPersona: {
      name: "Thomas Rivera",
      age: 42,
      gender: "Male",
      chiefComplaint: "My legs and ankles keep puffing up.",
      background:
        "Kitchen double shifts swelling pretzel ankles stool break pity. Urine bubbly foam photo gross apologies. Weight up ten pounds scale denial blamed carbs. Dragging tired not snorer apnea ruled spouse peace. No chest pressure LFTs never 'bad' doctor said years ago vague. No travel calf pain DVT WebMD panic skim. Ibuprofen before shifts knee overuse maybe stupid.",
      vitals: {
        heartRate: 88,
        bloodPressure: "144/90",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.7°F"
      },
      keyHistoryPoints: [
        "Progressive pitting edema and periorbital puffiness",
        "Foamy urine",
        "Nephrotic proteinuria quantification",
        "Hypoalbuminemia",
        "Hyperlipidemia",
        "NSAID kidney insult consideration"
      ],
      redFlags: [
        "Renal vein thrombosis in nephrotic state",
        "Infection risk including spontaneous bacterial peritonitis if ascites confusion mimic",
        "Biopsy planning when indication met"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Chef hustler humor dark jokes about urine foam, downplays until edema affects shifts.",
      behaviorRules: [
        "Do NOT say nephrotic syndrome.",
        "Foamy pee socks tight weight gain when prompted.",
        "NSAID use when pain medications asked."
      ],
      doNotRevealDirectly: [
        "biopsy shows minimal change",
        "albumin is 1.9",
        "just eat less salt only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Puffy face; bilateral leg edema.",
        details: "Periorbital edema mild. Comfortable oxygenation. Heavy muscular build with fluid excess layering."
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "2+ pitting edema to knees bilaterally.",
        details: "Warm symmetric pitting. No erythema cord sign."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Soft; no ascites clinically obvious.",
        details: "No shifting dullness appreciated superficially — distinguish cirrhotic ascites if evolves."
      }
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Urinalysis: 4+ protein; lipiduria oval bodies possible microscopy — heavy proteinuria pattern on dipstick awaiting quantification.",
        yield: "high"
      },
      {
        testId: "urine_protein_creatinine_ratio",
        result:
          "Urine protein-to-creatinine ratio: nephrotic range — approximately 6.5 g/g equivalent heavy daily protein loss.",
        yield: "high"
      },
      {
        testId: "cmp",
        result:
          "CMP: albumin chemistry low via separate quantification; creatinine near upper normal with AKI-CKD distinction by curve; electrolytes generally preserved initially.",
        yield: "high"
      },
      {
        testId: "serum_albumin",
        result: "Serum albumin: 2.1 g/dL — severe hypoalbuminemia supporting oncotic edema physiology.",
        yield: "high"
      },
      {
        testId: "lipid",
        result: "Lipid panel: total cholesterol and LDL elevated — hyperlipidemia of nephrotic syndrome.",
        yield: "high"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Quantify proteinuria albumin creatinine ratio serially during therapy.",
      imagingDefault: "Renal ultrasound; exclude thrombosis if concern flank pain hematuria.",
      bedsideDefault: "Salt restriction diuretic cautious with intravascular depletion.",
      procedureDefault: "Renal biopsy when indication after specialist evaluation."
    },
    finalDxId: "nephrotic_syndrome",
    requiredMustNotMiss: ["nephrotic_syndrome", "congestive_heart_failure", "deep_vein_thrombosis"],
    dxOverrides: [
      {
        dxId: "nephrotic_syndrome",
        yield: "correct",
        explanation:
          "Nephrotic-range proteinuria hypoalbumin edema hyperlipidemia satisfies nephrotic syndrome until histology classifies lesion."
      },
      {
        dxId: "congestive_heart_failure",
        yield: "dangerous-miss",
        explanation: "Right HF edema overlap — absent dominant JVP orthopnea here and heavy proteinuria redirect."
      },
      {
        dxId: "liver_cirrhosis",
        yield: "reasonable",
        explanation: "Hypoalbumin edema overlap — no chronic liver risk stigmata portal hypertension narrative primary."
      },
      {
        dxId: "chronic_kidney_disease",
        yield: "reasonable",
        explanation: "CKD may coexist — nephrotic syndrome is pattern atop renal pathology spectrum."
      },
      {
        dxId: "deep_vein_thrombosis",
        yield: "dangerous-miss",
        explanation: "Unilateral painful swelling would pivot — bilateral pitting proteinuria argues nephrotic edema first."
      }
    ],
    diagnosisOptions: [
      {
        id: "nephrotic_syndrome",
        name: "Nephrotic syndrome",
        isCorrect: true,
        isDangerous: true,
        explanation: "Triad laboratory features with edema confirm clinical nephrotic syndrome."
      },
      {
        id: "congestive_heart_failure",
        name: "Congestive heart failure",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important edema mimic — lacks hallmark ventricular failure story and proteinuria explains edema."
      },
      {
        id: "liver_cirrhosis",
        name: "Liver cirrhosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Hypoalbuminemia overlaps but heavy proteinuria nephrotic range anchors renal leak primary."
      }
    ],
    teachingPoints: [
      "Rubric (100): edema pattern 25, urine protein workup 25, foamy urine clue 25, diagnosis 25 — triad bonus +10.",
      "Primary versus secondary causes span minimal change diabetes amyloid lupus drugs infection.",
      "Anticoagulation thrombosis risk elevated in severe nephrotic protein loss context per guideline nuance.",
      "ACE inhibitor sometimes after specialist balance unless contraindicated acute kidney injury."
    ]
  }
];
