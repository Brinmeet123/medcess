import type { Scenario } from "@/data/scenarios";

const FM_SPECIALTY = "Family Medicine" as const;

export const familyMedicineScenarios: Scenario[] = [
  {
    id: "iron-deficiency-tired-months",
    title: "I've Been Tired for Months",
    specialty: FM_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Sarah Ahmed, a 34-year-old elementary school teacher, presents with four months of fatigue, exertional dyspnea, dizziness, and heavy menses with iron deficiency on labs.",
    cardTeaser: "I feel exhausted no matter how much I sleep.",
    objectives: [
      "Recognize chronic fatigue with exertional symptoms as possible anemia.",
      "Ask about menstrual blood loss and pica.",
      "Order CBC and iron studies with appropriate thyroid and pregnancy screening."
    ],
    patientPersona: {
      name: "Sarah Ahmed",
      age: 34,
      gender: "Female",
      chiefComplaint: "I feel exhausted no matter how much I sleep.",
      background:
        "Elementary teacher dragging through the school day for four months. Exhausted despite eight hours in bed. Winded climbing stairs to her classroom. Dizzy standing up fast. Periods heavy since her IUD came out last year — changes pads hourly some days. Crunches ice from the cafeteria — weird craving. No chest pain or fever.",
      vitals: {
        heartRate: 102,
        bloodPressure: "108/66",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Four months progressive fatigue",
        "Shortness of breath on exertion",
        "Orthostatic dizziness",
        "Heavy menstrual bleeding",
        "Pica for ice",
        "Pale conjunctiva and tachycardia",
        "Low hemoglobin, low MCV, low ferritin"
      ],
      redFlags: [
        "Hemodynamic instability or active brisk bleeding",
        "Syncope with chest pain suggests alternate diagnosis",
        "Pregnancy must be excluded in reproductive-age women"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Sarah, tired but cooperative. Slightly embarrassed discussing periods.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say iron deficiency or anemia.",
        "Mention heavy periods when asked menstrual history.",
        "Mention ice craving only when asked about cravings or diet quirks."
      ],
      doNotRevealDirectly: [
        "iron deficiency",
        "anemic",
        "low iron",
        "You need a transfusion",
        "It's just stress"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pale, fatigued, mild tachycardia.",
        details:
          "Well-appearing but tired woman. Conjunctival pallor. Heart rate elevated. No acute distress."
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Tachycardic; no murmur.",
        details: "Regular tachycardia. No gallop or significant murmur on brief exam."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "Hemoglobin low. MCV low (microcytic). RBC count reduced. Platelets normal.",
        yield: "high"
      },
      {
        testId: "iron_studies",
        result:
          "Ferritin low. Serum iron low. Iron saturation reduced. TIBC elevated — consistent with iron deficiency.",
        yield: "high"
      },
      {
        testId: "ferritin",
        result: "Ferritin low.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "Within normal limits.",
        yield: "low"
      },
      {
        testId: "tsh",
        result: "TSH within normal limits.",
        yield: "helpful"
      },
      {
        testId: "pregnancy_test",
        result: "Negative.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "CBC and iron studies define microcytic anemia.",
      imagingDefault: "Not routinely indicated.",
      bedsideDefault: "Pallor and tachycardia may be present.",
      procedureDefault: "Iron replacement and treat bleeding source."
    },
    finalDxId: "iron_deficiency_anemia",
    requiredMustNotMiss: ["iron_deficiency_anemia", "hypothyroidism", "pregnancy"],
    dxOverrides: [
      {
        dxId: "iron_deficiency_anemia",
        yield: "correct",
        explanation:
          "Microcytic anemia with low ferritin, heavy menses, fatigue, and pica confirm iron deficiency anemia."
      },
      {
        dxId: "hypothyroidism",
        yield: "dangerous-miss",
        explanation: "Causes fatigue; normal TSH makes hypothyroidism unlikely as primary cause."
      },
      {
        dxId: "depression",
        yield: "low",
        explanation: "May coexist; objective anemia explains systemic symptoms."
      },
      {
        dxId: "pregnancy",
        yield: "dangerous-miss",
        explanation: "Excluded with negative test; must be considered in workup."
      },
      {
        dxId: "anemia_chronic_disease",
        yield: "low",
        explanation: "Ferritin low with high TIBC favors iron deficiency over chronic disease pattern."
      },
      {
        dxId: "vitamin_b12_deficiency",
        yield: "low",
        explanation: "Typically macrocytic; MCV low here."
      }
    ],
    diagnosisOptions: [
      {
        id: "iron_deficiency_anemia",
        name: "Iron deficiency anemia",
        isCorrect: true,
        isDangerous: false,
        explanation: "Microcytic anemia with low ferritin and menorrhagia."
      },
      {
        id: "hypothyroidism",
        name: "Hypothyroidism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Normal TSH; anemia explains presentation."
      },
      {
        id: "depression",
        name: "Major depressive disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain laboratory anemia."
      }
    ],
    teachingPoints: [
      "Grading (100): Fatigue pattern 25, menstrual history 25, CBC/iron studies 25, diagnosis 25. Bonus: pica (+10). Deduction: miss menses (-15).",
      "Iron deficiency is the most common cause of microcytic anemia worldwide.",
      "Always ask reproductive-age women about menstrual blood loss.",
      "Pica for ice (pagophagia) is a classic clue.",
      "Treat with iron and address the bleeding source."
    ]
  },
  {
    id: "essential-hypertension-bp-high",
    title: "My Blood Pressure Was High Again",
    specialty: FM_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "Michael Torres, a 52-year-old restaurant owner, returns for persistently elevated blood pressure with lifestyle risk factors and normal secondary workup.",
    cardTeaser: "They keep telling me my pressure is high.",
    objectives: [
      "Diagnose essential hypertension after repeated elevated readings.",
      "Assess lifestyle, family history, and end-organ risk.",
      "Order baseline BMP, urinalysis, ECG, lipids, and HbA1c."
    ],
    patientPersona: {
      name: "Michael Torres",
      age: 52,
      gender: "Male",
      chiefComplaint: "They keep telling me my pressure is high.",
      background:
        "Restaurant owner with busy schedule — eats late, salty food tasting all day. Home cuff readings 150s over 90s for months. Occasional temple headaches. No chest pain or vision changes. Desk between lunch and dinner rush, no real exercise. Father on blood pressure pills since fifties. Not on meds yet — hoped diet would fix it.",
      vitals: {
        heartRate: 78,
        bloodPressure: "158/96",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Repeated elevated BP over months",
        "High sodium diet and sedentary lifestyle",
        "Family history of hypertension",
        "Overweight on exam",
        "Normal renal function and urinalysis",
        "Mild hyperlipidemia",
        "Normal ECG"
      ],
      redFlags: [
        "Hypertensive emergency if BP very high with end-organ symptoms",
        "Secondary causes if young, resistant, or hypokalemic",
        "Screen for cardiovascular risk factors"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Michael, practical and slightly defensive about lifestyle. Downplays symptoms.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say essential hypertension.",
        "Admit salty food and little exercise when asked honestly.",
        "Mention father's hypertension when asked family history."
      ],
      doNotRevealDirectly: [
        "essential hypertension",
        "hypertensive",
        "You will need three medications immediately",
        "kidney failure"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Overweight; otherwise well.",
        details:
          "Middle-aged man overweight. No acute distress. No neurologic deficit."
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Elevated BP; regular rhythm.",
        details: "Blood pressure 158/96 in clinic. Heart regular rate without murmur. No peripheral edema."
      }
    ],
    testOverrides: [
      {
        testId: "cmp",
        result: "BMP/CMP: creatinine and electrolytes within normal limits — no renal secondary pattern.",
        yield: "helpful"
      },
      {
        testId: "ua",
        result: "Urinalysis without proteinuria or hematuria.",
        yield: "helpful"
      },
      {
        testId: "ecg",
        result: "Normal sinus rhythm. No LVH strain pattern.",
        yield: "helpful"
      },
      {
        testId: "lipid",
        result: "Mild hyperlipidemia — elevated LDL.",
        yield: "helpful"
      },
      {
        testId: "hba1c",
        result: "HbA1c within normal range.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Baseline metabolic panel and lipids for risk stratification.",
      imagingDefault: "Not first-line for uncomplicated hypertension.",
      bedsideDefault: "Repeated BP measurements in clinic.",
      procedureDefault: "Lifestyle modification and antihypertensive therapy per guidelines."
    },
    finalDxId: "essential_hypertension",
    requiredMustNotMiss: ["essential_hypertension", "secondary_hypertension"],
    dxOverrides: [
      {
        dxId: "essential_hypertension",
        yield: "correct",
        explanation:
          "Persistent elevated BP with risk factors, normal renal labs and UA, and no secondary features confirm essential hypertension."
      },
      {
        dxId: "secondary_hypertension",
        yield: "dangerous-miss",
        explanation: "Consider if resistant or hypokalemic; normal BMP/UA here supports primary hypertension."
      },
      {
        dxId: "anxiety",
        yield: "low",
        explanation: "White-coat component possible but repeated home readings also elevated."
      },
      {
        dxId: "aki",
        yield: "low",
        explanation: "Normal creatinine; renal disease less likely as cause."
      },
      {
        dxId: "hyperthyroidism",
        yield: "low",
        explanation: "No tachycardia, weight loss, or heat intolerance."
      },
      {
        dxId: "pheochromocytoma",
        yield: "low",
        explanation: "No paroxysmal spells; chronic asymptomatic elevation pattern."
      }
    ],
    diagnosisOptions: [
      {
        id: "essential_hypertension",
        name: "Essential hypertension",
        isCorrect: true,
        isDangerous: false,
        explanation: "Chronic elevated BP without secondary cause on baseline workup."
      },
      {
        id: "secondary_hypertension",
        name: "Secondary hypertension",
        isCorrect: false,
        isDangerous: true,
        explanation: "No renal or endocrine clues on initial evaluation."
      },
      {
        id: "anxiety",
        name: "Anxiety",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain persistent home BP elevation."
      }
    ],
    teachingPoints: [
      "Grading (100): Chronic elevated BP 30, lifestyle 25, baseline labs 20, diagnosis 25.",
      "Diagnose hypertension after repeated measurements, not a single reading.",
      "Initial workup includes BMP, urinalysis, and cardiovascular risk assessment.",
      "Lifestyle change is first-line alongside pharmacotherapy when indicated.",
      "Screen for diabetes and dyslipidemia in hypertensive patients."
    ]
  },
  {
    id: "cap-cough-wont-go-away",
    title: "This Cough Won't Go Away",
    specialty: FM_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Linda Brooks, a 61-year-old retired nurse, presents with eight days of productive cough, fever, fatigue, hypoxia, and right lower lobe infiltrate on chest X-ray.",
    cardTeaser: "I've been coughing all week.",
    objectives: [
      "Recognize community-acquired pneumonia with fever, productive cough, and focal exam.",
      "Order chest X-ray and appropriate infectious testing.",
      "Assess severity and need for antibiotics and oxygen."
    ],
    patientPersona: {
      name: "Linda Brooks",
      age: 61,
      gender: "Female",
      chiefComplaint: "I've been coughing all week.",
      background:
        "Retired nurse who knows when a cold is more than a cold. Productive yellow-green cough eight days, fever to 101 at home, wiped out. Short of breath walking to mailbox. No travel. Quit smoking ten years ago. Flu shot this fall. COVID home test negative twice.",
      vitals: {
        heartRate: 106,
        bloodPressure: "126/80",
        respiratoryRate: 22,
        oxygenSat: "94%",
        temperature: "101.2°F"
      },
      keyHistoryPoints: [
        "Eight-day productive cough with fever",
        "Fatigue and exertional dyspnea",
        "Crackles right lower lung",
        "Hypoxia and tachypnea",
        "Elevated WBC",
        "Right lower lobe infiltrate on CXR",
        "Former smoker"
      ],
      redFlags: [
        "Hypoxia and tachypnea suggest moderate severity",
        "Elderly and comorbidities increase complication risk",
        "Sepsis if hypotension or altered mental status"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Linda, experienced nurse patient — uses some medical words but still a patient voice.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say pneumonia.",
        "Describe sputum color and fever when asked.",
        "Mention retired nurse background only when asked occupation."
      ],
      doNotRevealDirectly: [
        "pneumonia",
        "lung infection",
        "need antibiotics for sure",
        "It's just a virus"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Febrile, mild respiratory distress.",
        details: "Ill-appearing older woman with mild increased work of breathing. Fever on exam."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Crackles right lower lung; productive cough.",
        details:
          "Crackles at right lung base. Bronchial breath sounds not fully assessed. Productive cough with yellow sputum during exam."
      }
    ],
    testOverrides: [
      {
        testId: "cxr",
        result: "Chest X-ray shows right lower lobe infiltrate consistent with pneumonia.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "White blood cell count elevated with left shift.",
        yield: "high"
      },
      {
        testId: "covid",
        result: "COVID-19 PCR negative.",
        yield: "helpful"
      },
      {
        testId: "influenza_test",
        result: "Influenza rapid test negative.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Leukocytosis supports bacterial infection.",
      imagingDefault: "CXR confirms infiltrate.",
      bedsideDefault: "Pulse oximetry guides severity.",
      procedureDefault: "Empiric antibiotics for CAP per guidelines when indicated."
    },
    finalDxId: "community_acquired_pneumonia",
    requiredMustNotMiss: ["community_acquired_pneumonia", "covid_19"],
    dxOverrides: [
      {
        dxId: "community_acquired_pneumonia",
        yield: "correct",
        explanation:
          "Fever, productive cough, hypoxia, leukocytosis, and RLL infiltrate confirm community-acquired pneumonia."
      },
      {
        dxId: "viral_uri",
        yield: "low",
        explanation: "URI lacks focal infiltrate and significant hypoxia."
      },
      {
        dxId: "bronchitis",
        yield: "low",
        explanation: "Bronchitis typically no infiltrate; fever and focal crackles favor pneumonia."
      },
      {
        dxId: "covid_19",
        yield: "dangerous-miss",
        explanation: "Consider in differential; PCR negative here with bacterial pattern."
      },
      {
        dxId: "copd_exacerbation",
        yield: "low",
        explanation: "No known COPD; infiltrate on CXR supports pneumonia."
      }
    ],
    diagnosisOptions: [
      {
        id: "community_acquired_pneumonia",
        name: "Community-acquired pneumonia",
        isCorrect: true,
        isDangerous: true,
        explanation: "Clinical and radiographic evidence of lobar pneumonia."
      },
      {
        id: "bronchitis",
        name: "Acute bronchitis",
        isCorrect: false,
        isDangerous: false,
        explanation: "No infiltrate expected; presentation too severe."
      },
      {
        id: "viral_uri",
        name: "Viral upper respiratory infection",
        isCorrect: false,
        isDangerous: false,
        explanation: "Lacks focal consolidation and significant hypoxia."
      }
    ],
    teachingPoints: [
      "Grading (100): Infection signs 25, chest imaging 25, connect findings 25, diagnosis 25.",
      "Fever, productive cough, and focal crackles warrant chest X-ray.",
      "CURB-65 or similar tools help assess severity and disposition.",
      "Empiric antibiotics target common CAP pathogens when bacterial pneumonia confirmed.",
      "Consider influenza and COVID testing per season and epidemiology."
    ]
  },
  {
    id: "mdd-feel-down-all-time",
    title: "I Feel Down All the Time",
    specialty: FM_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Emily Jackson, a 27-year-old graduate student, presents with two months of persistent sadness, anhedonia, sleep disturbance, fatigue, and poor concentration with elevated PHQ-9 and normal medical labs.",
    cardTeaser: "I haven't felt like myself.",
    objectives: [
      "Screen for major depressive disorder with mood and functional questions.",
      "Use PHQ-9 and rule out medical mimics with TSH and CBC.",
      "Assess suicide risk and functional impact."
    ],
    patientPersona: {
      name: "Emily Jackson",
      age: 27,
      gender: "Female",
      chiefComplaint: "I haven't felt like myself.",
      background:
        "Graduate student in sociology who stopped going to book club and avoids friends. Low mood most days for two months, nothing enjoyable anymore. Sleeps late, wakes at 3 a.m., naps but still tired. Can't focus on thesis — missed a deadline. No manic episodes, no drugs or heavy drinking. Denies active suicide plan but admits passive thoughts of not waking up sometimes, which scares her.",
      vitals: {
        heartRate: 72,
        bloodPressure: "118/74",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Two months persistent sadness and anhedonia",
        "Insomnia and fatigue",
        "Poor concentration affecting school",
        "Tearful affect and poor eye contact",
        "PHQ-9 elevated",
        "Normal TSH and CBC",
        "Passive suicidal ideation without plan — requires safety assessment"
      ],
      redFlags: [
        "Active suicidal intent or plan requires emergency intervention",
        "Bipolar disorder if history of mania — antidepressants alone risky",
        "Substance use may mimic or worsen depression"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Emily, quiet and tearful at times. Hesitant on suicide questions but honest if asked directly with care.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say major depressive disorder.",
        "Describe loss of interest in hobbies when asked mood.",
        "If asked about suicide, admit passive thoughts without plan — show fear about them."
      ],
      doNotRevealDirectly: [
        "major depressive disorder",
        "clinical depression diagnosis",
        "You need hospitalization",
        "It's just grad school stress only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General / Mental status",
        summary: "Tearful affect; poor eye contact.",
        details:
          "Young woman appears sad with tearful affect and limited eye contact. Speech soft but coherent. No psychomotor agitation. Thought process linear. No delusions expressed."
      }
    ],
    testOverrides: [
      {
        testId: "phq9",
        result: "PHQ-9 score elevated — consistent with moderate to severe depression.",
        yield: "high"
      },
      {
        testId: "tsh",
        result: "TSH within normal limits.",
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
      }
    ],
    testDefaultBehavior: {
      labDefault: "TSH and CBC rule out medical mimics.",
      imagingDefault: "Not indicated.",
      bedsideDefault: "PHQ-9 documents severity.",
      procedureDefault: "Psychotherapy and/or antidepressant; safety planning if indicated."
    },
    finalDxId: "depression",
    requiredMustNotMiss: ["depression", "hypothyroidism"],
    dxOverrides: [
      {
        dxId: "depression",
        yield: "correct",
        explanation:
          "Persistent depressed mood, anhedonia, sleep and concentration problems for two months with elevated PHQ-9 and normal labs meet MDD criteria."
      },
      {
        dxId: "hypothyroidism",
        yield: "dangerous-miss",
        explanation: "Mimics depression; normal TSH makes hypothyroidism unlikely."
      },
      {
        dxId: "adjustment_disorder",
        yield: "reasonable",
        explanation: "Possible stressor but symptom severity and duration favor MDD."
      },
      {
        dxId: "anxiety",
        yield: "low",
        explanation: "May coexist; dominant picture is depressed mood and anhedonia."
      },
      {
        dxId: "bipolar_disorder",
        yield: "dangerous-miss",
        explanation: "No mania history; screen before initiating antidepressant monotherapy."
      }
    ],
    diagnosisOptions: [
      {
        id: "depression",
        name: "Major depressive disorder",
        isCorrect: true,
        isDangerous: true,
        explanation: "Meets criteria with functional impairment and elevated PHQ-9."
      },
      {
        id: "adjustment_disorder",
        name: "Adjustment disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Less pervasive; duration and severity favor MDD."
      },
      {
        id: "hypothyroidism",
        name: "Hypothyroidism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Normal TSH."
      }
    ],
    teachingPoints: [
      "Grading (100): Mood symptoms 30, functional impact 20, screening tools 20, diagnosis 30. Bonus: suicidality screen (+10).",
      "PHQ-9 is a validated screen; diagnosis requires clinical interview.",
      "Always assess suicide risk with direct questions.",
      "Rule out hypothyroidism and anemia in new depression workup.",
      "Screen for bipolar history before antidepressant monotherapy."
    ]
  },
  {
    id: "osteoarthritis-knees-hurt-daily",
    title: "My Knees Hurt Every Day",
    specialty: FM_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "George Russo, a 66-year-old retired postal worker, presents with chronic bilateral knee pain, brief morning stiffness, crepitus, and osteoarthritis on X-ray.",
    cardTeaser: "My knees ache constantly.",
    objectives: [
      "Recognize mechanical osteoarthritis pattern in older adults.",
      "Differentiate from inflammatory arthritis and septic joint.",
      "Obtain knee X-ray when diagnosis uncertain; use ESR/CRP if inflammatory features."
    ],
    patientPersona: {
      name: "George Russo",
      age: 66,
      gender: "Male",
      chiefComplaint: "My knees ache constantly.",
      background:
        "Retired mail carrier on feet thirty years — knees slowly wore down. Both knees ache daily, worse going downstairs and after walking the dog. Morning stiffness under twenty minutes then loosens up. Rest and ibuprofen help some. No fever, redness, or sudden swelling. Gained weight since retirement. No recent knee injury.",
      vitals: {
        heartRate: 76,
        bloodPressure: "128/82",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.5°F"
      },
      keyHistoryPoints: [
        "Chronic bilateral knee pain worse with activity",
        "Morning stiffness less than 30 minutes",
        "Improves with rest",
        "Crepitus and bony enlargement",
        "No warmth or systemic symptoms",
        "Joint space narrowing and osteophytes on X-ray",
        "Normal inflammatory markers"
      ],
      redFlags: [
        "Hot swollen monoarthritis suggests septic arthritis or gout",
        "Rapid progression or systemic symptoms suggest inflammatory disease",
        "Neurovascular compromise rare but assess if trauma"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as George, friendly retired guy. Downplays pain but describes limits on walking.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say osteoarthritis.",
        "Describe stairs and walking as triggers when asked what worsens pain.",
        "Deny fever or red hot joint when asked."
      ],
      doNotRevealDirectly: [
        "osteoarthritis",
        "bone on bone",
        "you need knee replacement today",
        "rheumatoid arthritis"
      ]
    },
    physicalExam: [
      {
        id: "msk",
        label: "Musculoskeletal",
        summary: "Bilateral knee OA findings.",
        details:
          "Bilateral knees with crepitus, mild bony enlargement, reduced range of motion. No effusion warmth or erythema. Stable gait with mild antalgia."
      },
      {
        id: "general",
        label: "General",
        summary: "Well-appearing; no fever.",
        details: "No acute distress. Afebrile."
      }
    ],
    testOverrides: [
      {
        testId: "knee_xray",
        result:
          "Bilateral knee X-rays show joint space narrowing, osteophytes, and subchondral sclerosis — consistent with osteoarthritis.",
        yield: "high"
      },
      {
        testId: "esr_crp",
        result: "ESR and CRP within normal limits — no significant systemic inflammation.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Inflammatory markers low in uncomplicated OA.",
      imagingDefault: "X-ray supports degenerative changes.",
      bedsideDefault: "Mechanical pain without synovitis on exam.",
      procedureDefault: "Weight loss, exercise, PT, analgesics, joint injection if indicated."
    },
    finalDxId: "osteoarthritis",
    requiredMustNotMiss: ["osteoarthritis", "septic_arthritis", "gout"],
    dxOverrides: [
      {
        dxId: "osteoarthritis",
        yield: "correct",
        explanation:
          "Chronic activity-related knee pain, brief stiffness, crepitus, lack of inflammation, and X-ray changes confirm osteoarthritis."
      },
      {
        dxId: "rheumatoid_arthritis",
        yield: "dangerous-miss",
        explanation: "Symmetric small-joint inflammatory pattern with long AM stiffness; not present."
      },
      {
        dxId: "meniscus_tear",
        yield: "low",
        explanation: "Often acute twisting injury with locking; chronic bilateral pattern favors OA."
      },
      {
        dxId: "gout",
        yield: "dangerous-miss",
        explanation: "Acute hot monoarthritis; no redness or fever here."
      },
      {
        dxId: "septic_arthritis",
        yield: "dangerous-miss",
        explanation: "Would be febrile with hot swollen joint; absent."
      }
    ],
    diagnosisOptions: [
      {
        id: "osteoarthritis",
        name: "Osteoarthritis",
        isCorrect: true,
        isDangerous: false,
        explanation: "Mechanical pain with degenerative X-ray findings."
      },
      {
        id: "rheumatoid_arthritis",
        name: "Rheumatoid arthritis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Inflammatory symmetric pattern and labs not supportive."
      },
      {
        id: "septic_arthritis",
        name: "Septic arthritis",
        isCorrect: false,
        isDangerous: true,
        explanation: "No fever or hot joint."
      }
    ],
    teachingPoints: [
      "Grading (100): Mechanical pain 30, activity relationship 20, X-ray 20, diagnosis 30.",
      "Osteoarthritis pain worsens with use and improves with rest.",
      "Morning stiffness under 30 minutes distinguishes from inflammatory arthritis.",
      "X-ray shows joint space loss and osteophytes; labs often normal.",
      "Red flags: fever, redness, inability to bear weight — consider septic joint."
    ]
  }
];
