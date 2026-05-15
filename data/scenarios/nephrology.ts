import type { Scenario } from "@/data/scenarios";

const NEPH_SPECIALTY = "Nephrology" as const;

export const nephrologyScenarios: Scenario[] = [
  {
    id: "nephro-lithiasis-daniel-flank",
    title: "My Side Hurts Worse Than Anything",
    specialty: NEPH_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    description:
      "Daniel Russo, a 39-year-old delivery driver, presents to the emergency department with sudden severe right flank pain, colicky course, nausea, and urinary symptoms concerning nephrolithiasis.",
    cardTeaser: "My back and side pain is unbearable.",
    objectives: [
      "Recognize classic ureteral colic with flank-to-groin radiation.",
      "Order urinalysis and stone-appropriate imaging; interpret microscopic hematuria.",
      "Distinguish nephrolithiasis from infection, surgical abdomen, and vascular emergencies.",
    ],
    patientPersona: {
      name: "Daniel Russo",
      age: 39,
      gender: "Male",
      chiefComplaint: "My back and side pain is unbearable.",
      background:
        "Out of nowhere about two hours into his shift a stabbing pain grabbed his right side and lower back. It waves—intense for a couple minutes, then eases a notch, then slams again. It seems to sneak toward his groin and testicle on that side. He cannot get comfortable on the stretcher, keeps shifting and pacing when allowed. Nausea hit hard; he retched once, no blood. No fever, no trauma, no prior abdominal surgery. He chugs water usually but was running behind today. Ibuprofen at home did nothing.",
      vitals: {
        heartRate: 112,
        bloodPressure: "154/90",
        respiratoryRate: 20,
        oxygenSat: "99%",
        temperature: "98.8°F",
      },
      keyHistoryPoints: [
        "Sudden severe right flank pain ~2 hours, colicky waves",
        "Radiation toward groin",
        "Nausea, restlessness, no fever",
        "Microhematuria; CT stone protocol shows ureteral calculus",
        "Must not miss AAA, pyelonephritis, surgical abdomen",
      ],
      redFlags: [
        "Unstable vitals or pulsatile abdominal mass (AAA)",
        "Fever with pyuria suggesting pyelonephritis",
        "Peritonitis suggesting appendicitis or other surgical emergency",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Daniel is grimacing, restless, blunt when pacing helps. He answers between waves of pain.",
      behaviorRules: [
        "Answer only as Daniel.",
        "Do not say kidney stone or nephrolithiasis as a diagnosis.",
        "Describe colicky pain, groin radiation, urine color when asked.",
      ],
      doNotRevealDirectly: [
        "nephrolithiasis",
        "you have a stone",
        "CT shows a stone",
        "classic renal colic diagnosis only",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "In obvious distress; unable to find a comfortable position.",
        details:
          "Diaphoretic and writhing. Appears hemodynamically stable but tachycardic from pain. Lungs clear.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Right flank tenderness; no rebound or guarding.",
        details:
          "Soft elsewhere. Positive right costovertebral angle tenderness—moderate. No rigidity. Bowel sounds present.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Urinalysis: blood positive on dipstick; microscopy shows RBCs consistent with microscopic hematuria. Few WBCs; no obvious infection pattern.",
        yield: "high",
      },
      {
        testId: "ct_abdomen_pelvis_noncontrast",
        result:
          "CT abdomen/pelvis without contrast: obstructing calculus in the right distal ureter with mild hydroureteronephrosis proximal to the stone. No alternative surgical abdomen identified.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: mild leukocytosis may reflect stress; no left shift suggesting sepsis.",
        yield: "low",
      },
      {
        testId: "cmp",
        result: "BMP: creatinine within baseline range today; electrolytes preserved.",
        yield: "helpful",
      },
      {
        testId: "renal_ultrasound",
        result:
          "Renal ultrasound: right-sided hydroureteronephrosis without visualization of the distal stone as well as non-contrast CT; useful if radiation contrast concern but CT is diagnostic here.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Labs generally unremarkable aside from hematuria.",
      imagingDefault: "Alternative imaging low yield when high-resolution stone CT available.",
      bedsideDefault: "Pain control and antiemesis prioritized alongside workup.",
      procedureDefault: "Urology consultation if obstruction, infection, or refractory pain.",
    },
    finalDxId: "kidney_stone",
    requiredMustNotMiss: ["kidney_stone", "acute_pyelonephritis", "abdominal_aortic_aneurysm"],
    dxOverrides: [
      {
        dxId: "kidney_stone",
        yield: "correct",
        explanation:
          "Acute colicky flank pain radiating to groin with microscopic hematuria and CT demonstrating ureteral calculus fits nephrolithiasis.",
      },
      {
        dxId: "acute_pyelonephritis",
        yield: "dangerous-miss",
        explanation: "Fever and pyuria would pivot; absent here but must stay in differential if vitals change.",
      },
      {
        dxId: "appendicitis",
        yield: "reasonable",
        explanation: "RLQ picture not dominant; pain localization and hematuria favor urinary tract source.",
      },
      {
        dxId: "abdominal_aortic_aneurysm",
        yield: "dangerous-miss",
        explanation: "Older smokers with atypical back pain need vascular consideration; less typical waves.",
      },
      {
        dxId: "flank_pain_musculoskeletal",
        yield: "low",
        explanation: "Does not explain hematuria and stone on imaging.",
      },
      {
        dxId: "cholecystitis",
        yield: "low",
        explanation: "RUQ/epigastric pain and Murphy sign pattern absent; imaging would differ.",
      },
    ],
    diagnosisOptions: [
      {
        id: "kidney_stone",
        name: "Nephrolithiasis (kidney stone)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Colicky flank pain, hematuria, and confirmatory CT.",
      },
      {
        id: "acute_pyelonephritis",
        name: "Pyelonephritis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Typically includes fever, pyuria, and infection markers.",
      },
      {
        id: "appendicitis",
        name: "Appendicitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not fit dominant flank-to-groin colic with stone CT.",
      },
      {
        id: "abdominal_aortic_aneurysm",
        name: "Abdominal aortic aneurysm",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must consider in atypical presentations; imaging here shows stone.",
      },
    ],
    teachingPoints: [
      "Grading (100): classic colicky pain 30, UA/imaging 25, groin radiation 20, diagnosis 25. Bonus: hematuria as clue +10. Deduction: miss flank-to-groin pattern −15.",
      "Non-contrast CT is standard for suspected ureteral stone in many settings.",
      "Microscopic hematuria supports stone but can be absent.",
      "Pyelonephritis and surgical mimics must be excluded by history, exam, and selective imaging.",
    ],
  },

  {
    id: "nephro-nephrotic-amanda-edema",
    title: "My Face Looks Puffy Every Morning",
    specialty: NEPH_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 15,
    description:
      "Amanda Foster, a 28-year-old teacher, reports progressive facial and leg swelling, foamy urine, and fatigue—laboratory studies show heavy proteinuria, hypoalbuminemia, and hyperlipidemia.",
    cardTeaser: "My face and legs keep swelling.",
    objectives: [
      "Link periorbital edema, foamy urine, and weight gain to glomerular protein loss.",
      "Quantify proteinuria and albumin; evaluate lipids.",
      "Differentiate nephrotic edema from CHF, cirrhosis, CKD overload, and DVT.",
    ],
    patientPersona: {
      name: "Amanda Foster",
      age: 28,
      gender: "Female",
      chiefComplaint: "My face and legs keep swelling.",
      background:
        "Over several weeks her rings got tight and students asked if she was tired—puffy eyes worst in the morning, legs heavy by after-school bus duty. Socks leave deep lines. Her urine looks foamy in the toilet, like dish soap, which embarrassed her enough to Google. Gained weight despite not eating more. Dragging fatigue. No fever, no chest pain, no unilateral calf pain. Takes ibuprofen occasionally for cramps. No known kidney disease.",
      vitals: {
        heartRate: 88,
        bloodPressure: "144/90",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "Progressive periorbital and leg edema over weeks",
        "Foamy urine, weight gain, fatigue",
        "Heavy proteinuria with hypoalbuminemia and hyperlipidemia",
        "HTN modest; differentiate from CHF and cirrhosis",
      ],
      redFlags: [
        "Renal vein thrombosis risk in severe nephrotic protein loss",
        "Infection risk with marked edema",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Amanda is polite, a little self-conscious about appearance, minimizes until asked specifics.",
      behaviorRules: [
        "Answer only as Amanda.",
        "Do not say nephrotic syndrome.",
        "Mention foamy urine and sock lines when prompted.",
      ],
      doNotRevealDirectly: [
        "nephrotic syndrome",
        "your albumin is critically low",
        "you need biopsy today",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Periorbital edema; mild pallor from fatigue.",
        details: "Normoxic. No acute distress; mild hypertension consistent with vitals.",
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Bilateral pitting edema to mid-shins.",
        details: "Symmetric warm edema without erythema; no unilateral cord sign.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild fullness; no acute tenderness.",
        details: "Soft. Fluid sensation mild—ascites not frank on exam.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Urinalysis: marked proteinuria on dipstick; microscopy shows lipiduria oval fat bodies suggestion—nephrotic pattern.",
        yield: "high",
      },
      {
        testId: "urine_protein_creatinine_ratio",
        result:
          "Urine protein/creatinine ratio in nephrotic range—heavy daily proteinuria equivalent.",
        yield: "high",
      },
      {
        testId: "serum_albumin",
        result: "Serum albumin low—hypoalbuminemia consistent with proteinuria losses.",
        yield: "high",
      },
      {
        testId: "lipid",
        result: "Lipid panel: hyperlipidemia with elevated cholesterol and triglycerides.",
        yield: "high",
      },
      {
        testId: "cmp",
        result:
          "CMP: creatinine in acceptable range today; electrolytes mostly preserved. Albumin confirmed low on dedicated measurement.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Quantitative protein and albumin drive diagnosis.",
      imagingDefault: "Renal ultrasound sometimes for size/CMD thickness—not always initial.",
      bedsideDefault: "Edema severity and BP guide urgency.",
      procedureDefault: "Biopsy planning with nephrology when indicated.",
    },
    finalDxId: "nephrotic_syndrome",
    requiredMustNotMiss: ["nephrotic_syndrome", "congestive_heart_failure", "deep_vein_thrombosis"],
    dxOverrides: [
      {
        dxId: "nephrotic_syndrome",
        yield: "correct",
        explanation:
          "Edema, foamy urine, nephrotic-range proteinuria, hypoalbuminemia, and hyperlipidemia satisfy nephrotic syndrome.",
      },
      {
        dxId: "congestive_heart_failure",
        yield: "dangerous-miss",
        explanation: "Can cause edema; lacks heavy proteinuria and has different exam/JVP story typically.",
      },
      {
        dxId: "liver_cirrhosis",
        yield: "reasonable",
        explanation: "Hypoalbuminemia overlaps; foamy heavy proteinuria points to renal leak first.",
      },
      {
        dxId: "chronic_kidney_disease",
        yield: "reasonable",
        explanation: "May coexist; protein loss pattern establishes nephrotic syndrome physiology.",
      },
      {
        dxId: "deep_vein_thrombosis",
        yield: "dangerous-miss",
        explanation: "Unilateral leg swelling would pivot; bilateral pitting with nephrotic labs argues renal edema.",
      },
    ],
    diagnosisOptions: [
      {
        id: "nephrotic_syndrome",
        name: "Nephrotic syndrome",
        isCorrect: true,
        isDangerous: true,
        explanation: "Heavy proteinuria, low albumin, edema, and lipid abnormalities.",
      },
      {
        id: "congestive_heart_failure",
        name: "Congestive heart failure",
        isCorrect: false,
        isDangerous: true,
        explanation: "Would expect more cardiopulmonary congestion narrative; lacks nephrotic proteinuria.",
      },
      {
        id: "liver_cirrhosis",
        name: "Liver disease",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain nephrotic-range proteinuria pattern.",
      },
      {
        id: "deep_vein_thrombosis",
        name: "Deep vein thrombosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Usually unilateral; bilateral edema with massive protein loss fits nephrotic picture.",
      },
    ],
    teachingPoints: [
      "Grading (100): edema pattern 25, urine protein studies 30, foamy urine significance 20, diagnosis 25.",
      "Nephrotic syndrome is a clinical-laboratory syndrome; biopsy defines histology.",
      "Always consider CHF and cirrhosis in edema—urine protein quantity discriminates.",
      "Counsel on infection and thrombosis risks when protein loss is severe.",
    ],
  },

  {
    id: "nephro-psgn-jacob-cola-urine",
    title: "My Urine Looks Like Cola",
    specialty: NEPH_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 13,
    description:
      "Jacob Hernandez, an 11-year-old student, presents with cola-colored urine, edema, and hypertension weeks after sore throat—workup suggests post-streptococcal glomerulonephritis.",
    cardTeaser: "My pee looks like cola—it's freaking me out.",
    objectives: [
      "Connect prior streptococcal illness to nephritic picture.",
      "Interpret urinalysis with RBC casts and serologic/complement abnormalities.",
      "Differentiate PSGN from IgA nephropathy, infection, and lupus nephritis.",
    ],
    patientPersona: {
      name: "Jacob Hernandez",
      age: 11,
      gender: "Male",
      chiefComplaint: "My mom says my urine looks dark—like cola.",
      background:
        "His mom noticed brown-cola urine for two days and brought him in. Jacob says his eyelids look puffy in the mirror and he's been tired—headache off and on, nothing explosive. About two weeks ago he had a wicked sore throat and finished the antibiotic his pediatrician called in; he felt better after a few days. No trauma, no pain with urination until today he mentions a vague ache in his back. He's scared the other kids will notice at school.",
      vitals: {
        heartRate: 102,
        bloodPressure: "138/86",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "99.1°F",
      },
      keyHistoryPoints: [
        "Dark/cola urine ~2 days; facial swelling; headache fatigue",
        "Recent strep pharyngitis ~2 weeks prior",
        "Elevated BP for age; nephritic sediment with RBC casts",
        "Elevated ASO and low complement support post-streptococcal GN",
      ],
      redFlags: [
        "Hypertensive emergency or encephalopathy symptoms",
        "Rapidly worsening renal failure requiring admission",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Jacob is a worried kid; answers short unless asked; mom might interject—stay in Jacob's voice mostly.",
      behaviorRules: [
        "Answer as Jacob (the patient), not the physician.",
        "Do not say post-streptococcal glomerulonephritis.",
        "Mention sore throat timing, pee color, puffy eyes when asked.",
      ],
      doNotRevealDirectly: [
        "PSGN",
        "RBC casts diagnosis",
        "you need dialysis",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mildly ill-appearing; periorbital puffiness.",
        details: "Alert. No respiratory distress. Mild tachycardia.",
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Periorbital edema.",
        details: "Pharynx without active exudate today.",
      },
      {
        id: "cardiovascular",
        label: "Cardiovascular",
        summary: "Blood pressure elevated for age; regular rhythm.",
        details: "No murmur appreciated; pulses intact.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Urinalysis: gross blood; microscopy with dysmorphic RBCs and RBC casts—nephritic sediment.",
        yield: "high",
      },
      {
        testId: "aso_titer",
        result: "ASO titer elevated—supporting recent group A streptococcal infection.",
        yield: "high",
      },
      {
        testId: "complement_c3_c4",
        result: "Complement: low C3 with C4 relatively preserved—pattern seen in post-streptococcal GN.",
        yield: "high",
      },
      {
        testId: "bmp",
        result:
          "BMP: creatinine mildly elevated for acute nephritis context; electrolytes monitored; potassium watch.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Serial BMP and urine monitoring during recovery.",
      imagingDefault: "Renal ultrasound only if atypical features.",
      bedsideDefault: "Blood pressure management and fluid status.",
      procedureDefault: "Nephrology if crescents or rapidly progressive course—beyond this vignette.",
    },
    finalDxId: "post_streptococcal_glomerulonephritis",
    requiredMustNotMiss: [
      "post_streptococcal_glomerulonephritis",
      "iga_nephropathy",
      "systemic_lupus_erythematosus",
    ],
    dxOverrides: [
      {
        dxId: "post_streptococcal_glomerulonephritis",
        yield: "correct",
        explanation:
          "Classic latent period after strep infection with nephritic urine, hypertension, low C3, and elevated ASO.",
      },
      {
        dxId: "iga_nephropathy",
        yield: "reasonable",
        explanation: "Can present with synpharyngitic hematuria; latent period and complement pattern favor PSGN here.",
      },
      {
        dxId: "kidney_stone",
        yield: "low",
        explanation: "Would expect colicky pain hematuria without RBC casts profile.",
      },
      {
        dxId: "uti",
        yield: "reasonable",
        explanation: "Pyuria dominates typically; nephritic casts change the picture.",
      },
      {
        dxId: "systemic_lupus_erythematosus",
        yield: "dangerous-miss",
        explanation: "Lupus nephritis can overlap—longer workup if systemic features.",
      },
    ],
    diagnosisOptions: [
      {
        id: "post_streptococcal_glomerulonephritis",
        name: "Post-streptococcal glomerulonephritis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Post-infectious timing with nephritic labs and serologies.",
      },
      {
        id: "iga_nephropathy",
        name: "IgA nephropathy",
        isCorrect: false,
        isDangerous: false,
        explanation: "Often shorter coupling with URI; complement typically not low like classic PSGN.",
      },
      {
        id: "uti",
        name: "Urinary tract infection",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain RBC casts and full nephritic syndrome.",
      },
      {
        id: "systemic_lupus_erythematosus",
        name: "Lupus nephritis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Consider if systemic symptoms and different serologies.",
      },
    ],
    teachingPoints: [
      "Grading (100): post-infectious timeline 25, urine studies 30, edema/BP findings 20, diagnosis 25.",
      "RBC casts localize pathology to glomerulus.",
      "Supportive care with BP and fluid balance; penicillin for lingering infection if present.",
      "Many children recover renal function; monitor for atypical prolonged low complement.",
    ],
  },

  {
    id: "nephro-aki-george-dehydration",
    title: "I Feel Weak And Can't Catch My Breath",
    specialty: NEPH_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    description:
      "George Mitchell, a 67-year-old retired engineer, presents with weakness, oliguria, and dyspnea after vomiting and dehydration—labs reveal acute kidney injury with hyperkalemia.",
    cardTeaser: "I've felt terrible for days.",
    objectives: [
      "Link prerenal insult from GI losses to rising creatinine and oliguria.",
      "Order BMP/CBC, ECG for hyperkalemia, and urinalysis to categorize AKI.",
      "Differentiate AKI from sepsis, cardiorenal syndrome, and PE.",
    ],
    patientPersona: {
      name: "George Mitchell",
      age: 67,
      gender: "Male",
      chiefComplaint: "I've felt terrible for days.",
      background:
        "Started after a brutal stomach bug—vomiting and barely keeping fluids down for two days at home. Since then he's wiped out, dizzy standing, and peeing much less than usual—dark and small amounts. Winded walking to the bathroom; no chest pressure. Lives alone; tried sports drinks yesterday but nauseated them back. History of blood pressure meds and a statin; took lisinopril through the illness which might have been dumb in hindsight. No fever now.",
      vitals: {
        heartRate: 118,
        bloodPressure: "92/58",
        respiratoryRate: 24,
        oxygenSat: "94%",
        temperature: "98.7°F",
      },
      keyHistoryPoints: [
        "Recent severe vomiting and volume depletion",
        "Oliguria, weakness, dyspnea",
        "Elevated creatinine and BUN with hyperkalemia",
        "Prerenal pattern with possible medication contribution",
      ],
      redFlags: [
        "Severe hyperkalemia with ECG changes",
        "Refractory hypotension suggesting sepsis",
      ],
    },
    aiInstructions: {
      patientStyle:
        "George is dehydrated, winded, honest about mistakes like taking BP meds while vomiting.",
      behaviorRules: [
        "Answer only as George.",
        "Do not say acute kidney injury as diagnosis.",
        "Mention urine amount, vomiting, orthostasis when asked.",
      ],
      doNotRevealDirectly: [
        "acute kidney injury",
        "your potassium is dangerously high",
        "you need dialysis now",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Fatigued; dry mucous membranes; mild tachycardia.",
        details:
          "Ill-appearing but alert. Orthostatic symptoms reported. Lungs with mild tachypnea; no focal crackles.",
      },
      {
        id: "cardiovascular",
        label: "Cardiovascular",
        summary: "Tachycardic; hypotensive.",
        details: "Regular rhythm; no rub. Jugular assessment limited by positioning but not grossly distended.",
      },
    ],
    testOverrides: [
      {
        testId: "bmp",
        result:
          "BMP: creatinine markedly elevated from expected baseline; BUN elevated with prerenal pattern suggestion. Potassium elevated—hyperkalemia present.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: hemoconcentration pattern possible; no overt leukocytosis for sepsis.",
        yield: "helpful",
      },
      {
        testId: "ua",
        result:
          "Urinalysis: hyaline casts may be seen; not heavy nephritic sediment—suggestive of prerenal physiology though ATN possible if prolonged hypoperfusion.",
        yield: "helpful",
      },
      {
        testId: "ecg",
        result:
          "ECG: peaked T waves consistent with hyperkalemia; no ventricular arrhythmia captured on this tracing.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Repeat BMP after fluid resuscitation.",
      imagingDefault: "Chest imaging if cardiac failure uncertain.",
      bedsideDefault: "Cardiac monitor and potassium management.",
      procedureDefault: "Dialysis if refractory hyperkalemia or emergent indications.",
    },
    finalDxId: "aki",
    requiredMustNotMiss: ["aki", "sepsis", "congestive_heart_failure", "pe"],
    dxOverrides: [
      {
        dxId: "aki",
        yield: "correct",
        explanation:
          "Acute rise in creatinine with oliguria after GI losses and hypotension plus urinary pattern supporting prerenal insult.",
      },
      {
        dxId: "sepsis",
        yield: "dangerous-miss",
        explanation: "Must revisit if fever sources or lactate elevation emerge.",
      },
      {
        dxId: "congestive_heart_failure",
        yield: "reasonable",
        explanation: "Cardiorenal overlap possible; volume exam and biomarkers help.",
      },
      {
        dxId: "chronic_kidney_disease",
        yield: "reasonable",
        explanation: "CKD can worsen with insult; acute rise still AKI on top of baseline.",
      },
      {
        dxId: "pe",
        yield: "dangerous-miss",
        explanation: "Dyspnea without clear volume picture warrants vigilance; troponin and risk tools if indicated.",
      },
    ],
    diagnosisOptions: [
      {
        id: "aki",
        name: "Acute kidney injury",
        isCorrect: true,
        isDangerous: true,
        explanation: "Creatinine rise with precipitating dehydration and oliguria.",
      },
      {
        id: "sepsis",
        name: "Sepsis",
        isCorrect: false,
        isDangerous: true,
        explanation: "No dominant fever source or septic profile in this vignette.",
      },
      {
        id: "congestive_heart_failure",
        name: "Heart failure exacerbation",
        isCorrect: false,
        isDangerous: true,
        explanation: "Could contribute to dyspnea; primary driver appears hypovolemia/renal insult.",
      },
      {
        id: "pe",
        name: "Pulmonary embolism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Hypoxia mild; clinical picture centered on dehydration and renal labs.",
      },
    ],
    teachingPoints: [
      "Grading (100): dehydration relationship 30, kidney function testing 25, oliguria identification 20, diagnosis 25. Bonus: hyperkalemia significance +10.",
      "Hold RAAS blockers during vomiting/ diarrhea when possible until volume stable.",
      "ECG in hyperkalemia is not optional in moderate-severe elevations.",
      "Differentiate prerenal from ATN with response to fluids and urine studies.",
    ],
  },

  {
    id: "nephro-ckd-richard-hypertension",
    title: "My Blood Pressure Keeps Going Up",
    specialty: NEPH_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 13,
    description:
      "Richard Kim, a 58-year-old accountant with longstanding diabetes and hypertension, has rising blood pressure, fatigue, mild edema, and labs showing reduced GFR with proteinuria consistent with chronic kidney disease.",
    cardTeaser: "My doctor says my pressure keeps rising.",
    objectives: [
      "Recognize CKD in setting of diabetes and hypertension.",
      "Interpret elevated creatinine, reduced GFR, and proteinuria on urinalysis.",
      "Differentiate CKD from acute CHF, liver disease, nephrotic flare, and drug-induced renal dysfunction.",
    ],
    patientPersona: {
      name: "Richard Kim",
      age: 58,
      gender: "Male",
      chiefComplaint: "My doctor says my pressure keeps rising.",
      background:
        "For years his blood pressure bounced on meds; lately even the max dose his PCP tried isn't taming it. He's more tired climbing stairs, ankles puffy by evening, and food sounds unappetizing—not nausea exactly, just blah. No chest pain. Type 2 diabetes on metformin and a GLP-1; worries about kidneys but never saw nephrology. Takes ibuprofen some nights for knee aches. No fever.",
      vitals: {
        heartRate: 84,
        bloodPressure: "168/96",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "Long-standing diabetes and hypertension",
        "Progressive fatigue, edema, anorexia",
        "Elevated creatinine with reduced GFR and proteinuria",
        "Medication and NSAID review relevant",
      ],
      redFlags: [
        "Rapid unexplained creatinine rise suggesting superimposed AKI",
        "Hyperkalemia or acidosis complications",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Richard is matter-of-fact, slightly defensive about NSAIDs, worried about dialysis rumors.",
      behaviorRules: [
        "Answer only as Richard.",
        "Do not say chronic kidney disease.",
        "Discuss BP trends, pills, swelling, diabetes control when asked.",
      ],
      doNotRevealDirectly: [
        "CKD stage",
        "you need dialysis next month",
        "renal failure label only",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pale, fatigued; mild edema.",
        details: "Chronic illness appearance. Hypertensive on repeat measurement.",
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Bilateral 1+ pitting edema ankles.",
        details: "Symmetric; no cellulitis.",
      },
      {
        id: "cardiovascular",
        label: "Cardiovascular",
        summary: "Regular rate; no murmur; elevated BP.",
        details: "JVP not markedly elevated on quick screen.",
      },
    ],
    testOverrides: [
      {
        testId: "cmp",
        result:
          "CMP: creatinine elevated with eGFR reduced consistent with chronic kidney disease staging discussion; bicarbonate near low normal.",
        yield: "high",
      },
      {
        testId: "ua",
        result:
          "Urinalysis: proteinuria on dipstick with urine albumin-creatinine elevation pattern suggestive of diabetic/chronic nephropathy spectrum.",
        yield: "high",
      },
      {
        testId: "renal_ultrasound",
        result:
          "Renal ultrasound: kidneys small with cortical thinning for age—chronic parenchymal disease pattern; no hydronephrosis.",
        yield: "helpful",
      },
      {
        testId: "cbc",
        result: "CBC: mild normocytic anemia consistent with chronic disease pattern sometimes seen in CKD.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Monitor BMP interval for trends and electrolytes.",
      imagingDefault: "Ultrasound helps anatomy obstruction exclusion.",
      bedsideDefault: "Home BP log and medication reconciliation.",
      procedureDefault: "ACE/ARB optimization when safe; nephrology comanagement.",
    },
    finalDxId: "chronic_kidney_disease",
    requiredMustNotMiss: ["chronic_kidney_disease", "congestive_heart_failure", "drug_induced_renal_dysfunction"],
    dxOverrides: [
      {
        dxId: "chronic_kidney_disease",
        yield: "correct",
        explanation:
          "Longitudinal risk factors with reduced GFR, proteinuria, chronic ultrasound changes, and symptom complex fit CKD.",
      },
      {
        dxId: "congestive_heart_failure",
        yield: "reasonable",
        explanation: "Edema and dyspnea overlap; cardiac testing if congestion dominant.",
      },
      {
        dxId: "liver_cirrhosis",
        yield: "low",
        explanation: "Hypoalbuminemia possible but renal labs and proteinuria anchor kidney primary.",
      },
      {
        dxId: "nephrotic_syndrome",
        yield: "reasonable",
        explanation: "Proteinuria can be heavy in CKD; nephrotic-range workup if massive edema.",
      },
      {
        dxId: "drug_induced_renal_dysfunction",
        yield: "dangerous-miss",
        explanation: "NSAIDs and RAAS drugs can worsen function—always reconcile.",
      },
    ],
    diagnosisOptions: [
      {
        id: "chronic_kidney_disease",
        name: "Chronic kidney disease",
        isCorrect: true,
        isDangerous: true,
        explanation: "Chronic reduction in GFR with proteinuria and typical risk factors.",
      },
      {
        id: "congestive_heart_failure",
        name: "Heart failure",
        isCorrect: false,
        isDangerous: true,
        explanation: "Could coexist; renal numbers and ultrasound pattern favor CKD driver.",
      },
      {
        id: "liver_cirrhosis",
        name: "Liver disease",
        isCorrect: false,
        isDangerous: false,
        explanation: "Not primary explanation for reduced GFR pattern here.",
      },
      {
        id: "nephrotic_syndrome",
        name: "Nephrotic syndrome",
        isCorrect: false,
        isDangerous: false,
        explanation: "May overlap proteinuria severity but clinical picture is CKD progression more than isolated nephrotic crisis.",
      },
    ],
    teachingPoints: [
      "Grading (100): kidney disease risk factors 25, renal testing 25, chronic pattern 25, diagnosis 25.",
      "CKD care spans BP, glycemia, RAAS modulation, anemia, mineral bone, and education.",
      "Avoid nephrotoxins; reassess metformin by eGFR thresholds per guidelines.",
      "Differentiate acute on chronic if creatinine jumps unexpectedly.",
    ],
  },
];
