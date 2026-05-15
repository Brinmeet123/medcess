import type { Scenario } from "@/data/scenarios";

const ENDOCRINOLOGY_SPECIALTY = "Endocrinology" as const;

export const endocrinologyScenarios: Scenario[] = [
  {
    id: "graves-hyperthyroid-weight-loss",
    title: "Why Am I Losing Weight?",
    specialty: ENDOCRINOLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Jessica Carter, a 29-year-old fitness instructor, presents with three months of unintentional weight loss despite increased appetite, anxiety, palpitations, heat intolerance, and tremor.",
    cardTeaser: "I keep losing weight even though I'm eating more.",
    objectives: [
      "Recognize hyperthyroid symptoms including weight loss with increased appetite.",
      "Order TSH, free T4, and Graves-specific testing when indicated.",
      "Identify ophthalmopathy and diffuse goiter supporting Graves disease."
    ],
    patientPersona: {
      name: "Jessica Carter",
      age: 29,
      gender: "Female",
      chiefComplaint: "I keep losing weight even though I'm eating more.",
      background:
        "Fitness instructor who has dropped two dress sizes in three months while eating constantly. Feels wired, sweaty, and hot when everyone else is cold. Heart races during warm-up. Hands shake holding water bottles. Sleep is broken — wakes at 3 a.m. with mind racing. No recent illness.",
      vitals: {
        heartRate: 116,
        bloodPressure: "132/76",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "98.8°F"
      },
      keyHistoryPoints: [
        "Three months unintentional weight loss with increased appetite",
        "Anxiety, restlessness, insomnia",
        "Palpitations and tachycardia",
        "Heat intolerance and increased sweating",
        "Fine hand tremor",
        "Mild exophthalmos and diffuse goiter",
        "TSH very low, free T4 elevated, TSI positive"
      ],
      redFlags: [
        "Thyroid storm if fever, agitation, and extreme tachycardia",
        "Atrial fibrillation risk with uncontrolled hyperthyroidism",
        "Ophthalmopathy may threaten vision if severe"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Jessica, energetic but frayed. Speak quickly when anxious topics come up.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say Graves or hyperthyroidism.",
        "Mention eating more but losing weight when asked about appetite.",
        "Describe heat and sweating when asked about temperature tolerance."
      ],
      doNotRevealDirectly: [
        "Graves disease",
        "hyperthyroidism",
        "overactive thyroid",
        "TSI positive",
        "This is just anxiety"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Restless, warm skin, tachycardic.",
        details:
          "Young woman appears restless with warm moist skin. Mildly anxious affect. Heart rate elevated."
      },
      {
        id: "heent",
        label: "HEENT / Thyroid",
        summary: "Mild exophthalmos; diffuse thyroid enlargement.",
        details:
          "Mild bilateral proptosis without acute vision complaint today. Thyroid diffusely enlarged, smooth, non-tender. No neck bruit appreciated."
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Fine hand tremor.",
        details: "Outstretched hands show fine postural tremor. No clubbing or edema."
      }
    ],
    testOverrides: [
      {
        testId: "tsh",
        result: "TSH very low (suppressed).",
        yield: "high"
      },
      {
        testId: "free_t4",
        result: "Free T4 elevated.",
        yield: "high"
      },
      {
        testId: "t3",
        result: "T3 elevated.",
        yield: "helpful"
      },
      {
        testId: "tsi",
        result: "Thyroid-stimulating immunoglobulins positive — supports Graves disease.",
        yield: "high"
      },
      {
        testId: "ecg",
        result: "Sinus tachycardia. No acute ischemic changes.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Thyroid panel defines hyperthyroid state.",
      imagingDefault: "Thyroid uptake scan if etiology unclear after labs.",
      bedsideDefault: "Tremor and tachycardia on exam.",
      procedureDefault: "Endocrinology follow-up for antithyroid therapy or definitive treatment."
    },
    finalDxId: "graves_disease",
    requiredMustNotMiss: ["graves_disease", "pheochromocytoma"],
    dxOverrides: [
      {
        dxId: "graves_disease",
        yield: "correct",
        explanation:
          "Weight loss with hyperphagia, hyperthyroid symptoms, low TSH, high T4, positive TSI, and ophthalmopathy confirm Graves."
      },
      {
        dxId: "anxiety",
        yield: "low",
        explanation: "Anxiety alone does not explain suppressed TSH, elevated T4, and goiter."
      },
      {
        dxId: "pheochromocytoma",
        yield: "dangerous-miss",
        explanation: "Can cause palpitations and sweating; thyroid labs here show primary thyroid disease."
      },
      {
        dxId: "thyroiditis",
        yield: "reasonable",
        explanation: "Can cause transient hyperthyroidism; TSI positivity and exam favor Graves."
      },
      {
        dxId: "hyperthyroidism",
        yield: "correct",
        explanation: "Graves is the specific etiology of hyperthyroidism in this case."
      }
    ],
    diagnosisOptions: [
      {
        id: "graves_disease",
        name: "Hyperthyroidism due to Graves disease",
        isCorrect: true,
        isDangerous: false,
        explanation: "Low TSH, high T4, positive TSI, and ophthalmopathy."
      },
      {
        id: "anxiety",
        name: "Anxiety disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain biochemical hyperthyroidism."
      },
      {
        id: "pheochromocytoma",
        name: "Pheochromocytoma",
        isCorrect: false,
        isDangerous: true,
        explanation: "Thyroid studies confirm Graves rather than catecholamine excess."
      }
    ],
    teachingPoints: [
      "Grading (100): Hyperthyroid symptoms 30, thyroid studies 25, Graves findings 20, diagnosis 25. Bonus: eye findings (+10). Deductions: anxiety only (-20), miss heat intolerance (-10).",
      "Weight loss with increased appetite suggests hypermetabolic state, not simple caloric deficit.",
      "TSH is the best initial screen; low TSH with high T4 confirms hyperthyroidism.",
      "TSI and ophthalmopathy support Graves over painless thyroiditis.",
      "Treat to prevent atrial fibrillation and bone loss."
    ]
  },
  {
    id: "hashimoto-hypothyroid-tired-cold",
    title: "I'm Always Tired and Cold",
    specialty: ENDOCRINOLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Melissa Green, a 43-year-old accountant, presents with months of fatigue, weight gain, cold intolerance, dry skin, constipation, and hair thinning.",
    cardTeaser: "I feel exhausted all the time.",
    objectives: [
      "Recognize hypothyroid symptom cluster.",
      "Order TSH and free T4 as initial thyroid evaluation.",
      "Interpret anti-TPO positivity as Hashimoto autoimmune thyroiditis."
    ],
    patientPersona: {
      name: "Melissa Green",
      age: 43,
      gender: "Female",
      chiefComplaint: "I feel exhausted all the time.",
      background:
        "Accountant who slowly feels like she's running on empty — naps after work, still tired. Gained twelve pounds without changing diet much. Always cold in the office while colleagues are fine. Skin dry, hair thinning at the ponytail. Constipated every few days. Brain fog during spreadsheets. No chest pain or fever.",
      vitals: {
        heartRate: 58,
        bloodPressure: "124/78",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "97.5°F"
      },
      keyHistoryPoints: [
        "Months of progressive fatigue",
        "Weight gain and cold intolerance",
        "Dry skin, constipation, hair thinning",
        "Bradycardia and delayed reflexes",
        "TSH elevated, free T4 low",
        "Anti-TPO antibodies positive"
      ],
      redFlags: [
        "Myxedema coma if severe hypotension, hypothermia, altered mental status",
        "Pregnancy requires different TSH targets if applicable",
        "Drug interactions with levothyroxine absorption"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Melissa, tired and soft-spoken. Pause before longer answers.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say Hashimoto or hypothyroidism.",
        "Mention cold intolerance and weight gain when asked.",
        "Admit concentration trouble when asked about work or mood."
      ],
      doNotRevealDirectly: [
        "Hashimoto",
        "hypothyroidism",
        "underactive thyroid",
        "anti-TPO",
        "You just need antidepressants"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Fatigued, mild facial puffiness, bradycardic.",
        details: "Middle-aged woman appears fatigued with mild periorbital puffiness. Bradycardia noted."
      },
      {
        id: "skin",
        label: "Skin / Hair",
        summary: "Dry skin; hair thinning.",
        details: "Skin dry without primary rash. Hair thinning diffusely. No myxedema grossly."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Delayed relaxation of deep tendon reflexes.",
        details: "Achilles reflex shows delayed relaxation phase. Cognition slow but oriented."
      }
    ],
    testOverrides: [
      {
        testId: "tsh",
        result: "TSH elevated.",
        yield: "high"
      },
      {
        testId: "free_t4",
        result: "Free T4 low.",
        yield: "high"
      },
      {
        testId: "anti_tpo",
        result: "Anti-thyroid peroxidase antibodies positive — consistent with Hashimoto thyroiditis.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "Within normal limits; no anemia explaining fatigue.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "TSH and free T4 define hypothyroidism.",
      imagingDefault: "Thyroid ultrasound if nodule suspected.",
      bedsideDefault: "Bradycardia and delayed reflexes.",
      procedureDefault: "Levothyroxine replacement when confirmed."
    },
    finalDxId: "hashimoto_hypothyroidism",
    requiredMustNotMiss: ["hashimoto_hypothyroidism", "anemia", "depression"],
    dxOverrides: [
      {
        dxId: "hashimoto_hypothyroidism",
        yield: "correct",
        explanation:
          "Fatigue, cold intolerance, weight gain, high TSH, low T4, and anti-TPO confirm Hashimoto hypothyroidism."
      },
      {
        dxId: "depression",
        yield: "low",
        explanation: "Mood symptoms may overlap but thyroid labs are abnormal."
      },
      {
        dxId: "anemia",
        yield: "dangerous-miss",
        explanation: "Can cause fatigue; CBC normal and thyroid pattern defines primary issue."
      },
      {
        dxId: "sleep_apnea",
        yield: "reasonable",
        explanation: "Causes fatigue; does not explain low T4 and high TSH."
      },
      {
        dxId: "hypothyroidism",
        yield: "correct",
        explanation: "Hashimoto is the autoimmune etiology here."
      }
    ],
    diagnosisOptions: [
      {
        id: "hashimoto_hypothyroidism",
        name: "Hashimoto thyroiditis with hypothyroidism",
        isCorrect: true,
        isDangerous: false,
        explanation: "High TSH, low T4, positive anti-TPO."
      },
      {
        id: "depression",
        name: "Major depressive disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain thyroid laboratory abnormalities."
      },
      {
        id: "anemia",
        name: "Anemia",
        isCorrect: false,
        isDangerous: true,
        explanation: "CBC without anemia; thyroid studies diagnostic."
      }
    ],
    teachingPoints: [
      "Grading (100): Hypothyroid symptoms 30, thyroid labs 25, autoimmune pattern 20, diagnosis 25.",
      "TSH is the most sensitive initial test for primary hypothyroidism.",
      "Anti-TPO supports Hashimoto autoimmune thyroiditis.",
      "Levothyroxine replaces hormone; monitor TSH until stable.",
      "Differentiate from depression with objective labs and exam."
    ]
  },
  {
    id: "t1dm-cant-stop-drinking-water",
    title: "I Can't Stop Drinking Water",
    specialty: ENDOCRINOLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Ryan Shah, a 13-year-old middle school student, is brought by his mother for weeks of extreme thirst, nocturia, weight loss, and irritability; evaluation shows new-onset type 1 diabetes.",
    cardTeaser: "My son drinks water constantly.",
    objectives: [
      "Recognize polyuria, polydipsia, and weight loss as diabetes mellitus until proven otherwise.",
      "Order fingerstick glucose, HbA1c, and urinalysis.",
      "Distinguish type 1 diabetes from diabetes insipidus and psychogenic polydipsia."
    ],
    patientPersona: {
      name: "Ryan Shah",
      age: 13,
      gender: "Male",
      chiefComplaint: "My son drinks water constantly.",
      background:
        "Mother reports Ryan drinks water constantly, wakes twice nightly to urinate, lost weight over several weeks, and seems tired and irritable at school. No fever. Teachers noticed he leaves class for the bathroom. Previously healthy, no known diabetes in family.",
      vitals: {
        heartRate: 114,
        bloodPressure: "102/66",
        respiratoryRate: 20,
        oxygenSat: "99%",
        temperature: "98.7°F"
      },
      keyHistoryPoints: [
        "Weeks of extreme thirst and polyuria",
        "Nocturia and weight loss",
        "Fatigue and irritability",
        "Dry mucous membranes",
        "Elevated glucose and HbA1c",
        "Positive ketones and glucosuria",
        "No fever"
      ],
      redFlags: [
        "DKA if vomiting, Kussmaul breathing, or acidosis",
        "Cerebral edema risk during pediatric DKA treatment",
        "New-onset T1DM requires insulin and education urgently"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Ryan's mother, worried but organized. Ryan may add short answers if asked directly to the boy.",
      behaviorRules: [
        "Answer primarily as the mother about Ryan's symptoms.",
        "Do NOT say type 1 diabetes or new-onset diabetes.",
        "Describe thirst, urination, and weight loss when asked.",
        "Ryan can say he is thirsty and tired if the learner speaks to him."
      ],
      doNotRevealDirectly: [
        "type 1 diabetes",
        "diabetes mellitus",
        "insulin dependent",
        "his sugar is 400",
        "DKA"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mildly fatigued adolescent; dry mucous membranes.",
        details:
          "13-year-old appears thinner than prior visit notes suggest. Mild fatigue. Dry lips and mucous membranes. No Kussmaul breathing today."
      }
    ],
    testOverrides: [
      {
        testId: "fingerstick_glucose",
        result: "Fingerstick glucose markedly elevated.",
        yield: "high"
      },
      {
        testId: "hba1c",
        result: "HbA1c elevated — consistent with sustained hyperglycemia.",
        yield: "high"
      },
      {
        testId: "serum_ketones",
        result: "Serum ketones positive — monitor for progression to DKA.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result: "Hyperglycemia on BMP; electrolytes require monitoring if ketotic.",
        yield: "high"
      },
      {
        testId: "ua",
        result: "Urinalysis positive for glucose; ketones may be present.",
        yield: "high"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Glucose and HbA1c define diabetes.",
      imagingDefault: "Not routinely required for new diagnosis.",
      bedsideDefault: "Point-of-care glucose essential.",
      procedureDefault: "Insulin initiation and diabetes education; admit if DKA."
    },
    finalDxId: "type_1_diabetes_mellitus",
    requiredMustNotMiss: ["type_1_diabetes_mellitus", "dka"],
    dxOverrides: [
      {
        dxId: "type_1_diabetes_mellitus",
        yield: "correct",
        explanation:
          "Polyuria, polydipsia, weight loss in a lean adolescent with hyperglycemia, elevated HbA1c, and glucosuria confirm new-onset type 1 diabetes."
      },
      {
        dxId: "diabetes_insipidus",
        yield: "low",
        explanation: "Massive dilute urine with normal glucose; Ryan has glucosuria and high glucose."
      },
      {
        dxId: "psychogenic_polydipsia",
        yield: "low",
        explanation: "Psychogenic polydipsia does not cause hyperglycemia and weight loss."
      },
      {
        dxId: "dka",
        yield: "dangerous-miss",
        explanation: "May coexist with ketones; primary diagnosis is new-onset T1DM with ketosis risk."
      },
      {
        dxId: "uti",
        yield: "low",
        explanation: "Frequency without fever or dysuria pattern; glucose defines diagnosis."
      },
      {
        dxId: "viral_uri",
        yield: "low",
        explanation: "No fever or respiratory symptoms."
      }
    ],
    diagnosisOptions: [
      {
        id: "type_1_diabetes_mellitus",
        name: "New-onset type 1 diabetes mellitus",
        isCorrect: true,
        isDangerous: true,
        explanation: "Classic triad with hyperglycemia and glucosuria in adolescent."
      },
      {
        id: "diabetes_insipidus",
        name: "Diabetes insipidus",
        isCorrect: false,
        isDangerous: false,
        explanation: "Normal glucose expected; not present here."
      },
      {
        id: "psychogenic_polydipsia",
        name: "Psychogenic polydipsia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain hyperglycemia."
      }
    ],
    teachingPoints: [
      "Grading (100): Diabetes symptoms 30, glucose testing 25, polyuria-polydipsia link 20, diagnosis 25.",
      "Polyuria plus polydipsia with weight loss in a child is diabetes until proven otherwise.",
      "Fingerstick glucose is the critical first test in clinic or ED.",
      "Positive ketones warrant evaluation for DKA even without full acidosis yet.",
      "Diabetes insipidus has dilute urine and normal glucose."
    ]
  },
  {
    id: "cushing-face-looks-different",
    title: "My Face Looks Different",
    specialty: ENDOCRINOLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Amanda Lewis, a 35-year-old teacher, presents with one year of weight gain, easy bruising, proximal weakness, mood changes, facial fullness, and purple striae.",
    cardTeaser: "I feel like my body changed.",
    objectives: [
      "Recognize cushingoid habitus and proximal muscle weakness.",
      "Screen with late-night salivary cortisol, 24-hour urine cortisol, or dexamethasone suppression.",
      "Differentiate endogenous Cushing from exogenous steroids and simple obesity."
    ],
    patientPersona: {
      name: "Amanda Lewis",
      age: 35,
      gender: "Female",
      chiefComplaint: "I feel like my body changed.",
      background:
        "Teacher who says her face looks different in photos — rounder, puffier. Gained thirty pounds mostly belly and face while arms and legs look thinner. Bruises from minor bumps. Hard to stand from squatting with students. Mood swings and tearful spells. Purple stretch marks on abdomen. Denies taking steroid pills or injections.",
      vitals: {
        heartRate: 96,
        bloodPressure: "154/92",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.5°F"
      },
      keyHistoryPoints: [
        "One year progressive weight gain and facial fullness",
        "Central obesity with thin extremities",
        "Easy bruising and purple striae",
        "Proximal muscle weakness",
        "Mood changes",
        "Elevated cortisol and failed dexamethasone suppression",
        "Hypertension"
      ],
      redFlags: [
        "Severe hypercortisolism increases infection and thrombosis risk",
        "Adrenal-dependent vs ACTH-dependent determines imaging and surgery",
        "Exogenous steroids are common mimic — always ask medication history"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Amanda, self-conscious about appearance. Emotional when discussing body changes.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say Cushing syndrome or cortisol excess.",
        "Mention bruising and stretch marks when asked about skin.",
        "Deny steroid pills unless specifically asked about inhalers, creams, injections."
      ],
      doNotRevealDirectly: [
        "Cushing syndrome",
        "cortisol excess",
        "Cushing disease",
        "pituitary tumor",
        "You're just obese"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Moon facies, central obesity, hypertension.",
        details:
          "Facial rounding with central adiposity. Blood pressure elevated. No acute distress."
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Purple abdominal striae; easy bruising.",
        details:
          "Wide purple striae on lower abdomen. Thin skin with scattered ecchymoses on arms."
      },
      {
        id: "extremities",
        label: "Musculoskeletal",
        summary: "Proximal muscle weakness; thin extremities.",
        details:
          "Difficulty rising from chair without using arms. Muscle bulk reduced in extremities relative to trunk."
      }
    ],
    testOverrides: [
      {
        testId: "urine_cortisol_24h",
        result: "24-hour urine cortisol elevated.",
        yield: "high"
      },
      {
        testId: "late_night_salivary_cortisol",
        result: "Late-night salivary cortisol elevated.",
        yield: "high"
      },
      {
        testId: "dexamethasone_suppression_test",
        result: "Low-dose dexamethasone suppression test failed — cortisol not suppressed.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP may show hyperglycemia; otherwise nonspecific.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Cortisol screening tests define excess.",
      imagingDefault: "Pituitary MRI or adrenal CT after biochemical confirmation.",
      bedsideDefault: "Cushingoid habitus on examination.",
      procedureDefault: "Refer endocrinology for localization after biochemical diagnosis."
    },
    finalDxId: "cushing_syndrome",
    requiredMustNotMiss: ["cushing_syndrome", "exogenous_steroid_effect"],
    dxOverrides: [
      {
        dxId: "cushing_syndrome",
        yield: "correct",
        explanation:
          "Central obesity, striae, bruising, weakness, elevated cortisol, and failed suppression confirm Cushing syndrome."
      },
      {
        dxId: "obesity",
        yield: "low",
        explanation: "Simple obesity lacks purple striae, proximal weakness, and failed suppression."
      },
      {
        dxId: "depression",
        yield: "low",
        explanation: "Mood symptoms present but do not explain cushingoid exam and labs."
      },
      {
        dxId: "pcos",
        yield: "low",
        explanation: "Can cause weight gain and hypertension; lacks classic striae and cortisol excess."
      },
      {
        dxId: "exogenous_steroid_effect",
        yield: "dangerous-miss",
        explanation: "Must exclude; patient denies systemic steroids but always clarify all routes."
      },
      {
        dxId: "metabolic_syndrome",
        yield: "low",
        explanation: "Overlaps with weight and BP but not failed dexamethasone suppression."
      }
    ],
    diagnosisOptions: [
      {
        id: "cushing_syndrome",
        name: "Cushing syndrome",
        isCorrect: true,
        isDangerous: true,
        explanation: "Biochemical cortisol excess with cushingoid features."
      },
      {
        id: "obesity",
        name: "Obesity",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain striae, weakness, and abnormal suppression testing."
      },
      {
        id: "exogenous_steroid_effect",
        name: "Exogenous glucocorticoid use",
        isCorrect: false,
        isDangerous: true,
        explanation: "Most common cause of Cushingoid features; denied here after thorough history."
      }
    ],
    teachingPoints: [
      "Grading (100): Cortisol pattern 30, endocrine testing 25, physical findings 20, diagnosis 25. Bonus: striae (+10).",
      "Purple wide striae and proximal weakness are high-yield Cushing clues.",
      "Screen with late-night salivary cortisol, 24-hour urine cortisol, or low-dose dex suppression.",
      "Always ask about inhalers, joint injections, and topical steroids.",
      "Localization follows biochemical confirmation of hypercortisolism."
    ]
  },
  {
    id: "hyperparathyroid-recurrent-kidney-stones",
    title: "Why Do I Keep Getting Kidney Stones?",
    specialty: ENDOCRINOLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "George Patel, a 57-year-old engineer, presents with recurrent kidney stones, fatigue, constipation, bone pain, and hypercalcemia with elevated PTH.",
    cardTeaser: "I've had multiple kidney stones.",
    objectives: [
      "Recognize recurrent nephrolithiasis as a clue to hyperparathyroidism.",
      "Order serum calcium and PTH when stones recur.",
      "Recall stones, bones, groans, and psychiatric overtones of hypercalcemia."
    ],
    patientPersona: {
      name: "George Patel",
      age: 57,
      gender: "Male",
      chiefComplaint: "I've had multiple kidney stones.",
      background:
        "Engineer with three kidney stones in five years — last one sent him to the ER last month. Chronic fatigue and constipation blamed on travel and diet. Dull ache in hips and knees. Urinates more than he used to. No fever. Drinks coffee all day but not enough water, he admits.",
      vitals: {
        heartRate: 82,
        bloodPressure: "136/84",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Recurrent kidney stones over years",
        "Hypercalcemia with elevated PTH",
        "Fatigue and constipation",
        "Bone pain and mild bone tenderness",
        "Increased urination",
        "Renal ultrasound shows nephrolithiasis",
        "No malignancy history"
      ],
      redFlags: [
        "Severe hypercalcemia can cause altered mental status and arrhythmia",
        "Primary hyperparathyroidism may need parathyroidectomy",
        "Malignancy-related hypercalcemia shows suppressed PTH — opposite here"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as George, practical engineer frustrated by repeat stones. Matter-of-fact.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say hyperparathyroidism or parathyroid adenoma.",
        "Mention bone aches and constipation when asked systemic symptoms.",
        "Admit poor hydration when asked lifestyle."
      ],
      doNotRevealDirectly: [
        "hyperparathyroidism",
        "parathyroid adenoma",
        "PTH tumor",
        "your calcium is high",
        "stones bones groans"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing; mild bone tenderness.",
        details: "Middle-aged man in no acute distress. Alert and cooperative."
      },
      {
        id: "msk",
        label: "Musculoskeletal",
        summary: "Mild diffuse bone tenderness.",
        details:
          "Mild tenderness over sternum and hips without focal joint swelling. Strength intact distally; no obvious fractures."
      }
    ],
    testOverrides: [
      {
        testId: "serum_calcium",
        result: "Serum calcium elevated.",
        yield: "high"
      },
      {
        testId: "pth",
        result: "Parathyroid hormone elevated — inappropriate for hypercalcemia, consistent with primary hyperparathyroidism.",
        yield: "high"
      },
      {
        testId: "vitamin_d",
        result: "Vitamin D level should be checked; may be low-normal in secondary contexts.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result: "CMP confirms hypercalcemia; renal function monitored given stones.",
        yield: "helpful"
      },
      {
        testId: "renal_ultrasound",
        result: "Renal ultrasound shows nephrolithiasis without hydronephrosis today.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Calcium and PTH define hyperparathyroidism.",
      imagingDefault: "Renal ultrasound for stones; sestamibi or neck imaging after diagnosis.",
      bedsideDefault: "Bone tenderness may be present.",
      procedureDefault: "Parathyroidectomy when symptomatic or meeting guidelines."
    },
    finalDxId: "primary_hyperparathyroidism",
    requiredMustNotMiss: ["primary_hyperparathyroidism", "hypercalcemia_malignancy"],
    dxOverrides: [
      {
        dxId: "primary_hyperparathyroidism",
        yield: "correct",
        explanation:
          "Recurrent stones, hypercalcemia, elevated PTH, bone symptoms, and imaging stones confirm primary hyperparathyroidism."
      },
      {
        dxId: "hypercalcemia_malignancy",
        yield: "dangerous-miss",
        explanation: "PTH usually suppressed in malignancy; here PTH is elevated."
      },
      {
        dxId: "vitamin_d_disorder",
        yield: "low",
        explanation: "Vitamin D deficiency causes secondary hyperparathyroidism with low calcium, not high."
      },
      {
        dxId: "aki",
        yield: "low",
        explanation: "Renal disease can affect calcium; pattern here is primary elevated PTH."
      },
      {
        dxId: "osteoporosis",
        yield: "reasonable",
        explanation: "Bone loss may coexist; hyperparathyroidism is the driver to treat."
      }
    ],
    diagnosisOptions: [
      {
        id: "primary_hyperparathyroidism",
        name: "Primary hyperparathyroidism",
        isCorrect: true,
        isDangerous: true,
        explanation: "Hypercalcemia with elevated PTH and recurrent stones."
      },
      {
        id: "hypercalcemia_malignancy",
        name: "Hypercalcemia of malignancy",
        isCorrect: false,
        isDangerous: true,
        explanation: "PTH suppressed in malignancy; opposite laboratory pattern."
      },
      {
        id: "vitamin_d_disorder",
        name: "Vitamin D disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain high calcium with high PTH."
      }
    ],
    teachingPoints: [
      "Grading (100): Stone pattern 25, calcium/PTH 30, endocrine clues 20, diagnosis 25. Bonus: stones-bones-groans (+10).",
      "Recurrent calcium stones warrant serum calcium and PTH.",
      "Primary hyperparathyroidism shows elevated PTH with hypercalcemia.",
      "Stones, bones, abdominal groans, and psychiatric symptoms summarize hypercalcemia.",
      "Parathyroidectomy cures most primary disease when indicated."
    ]
  }
];
