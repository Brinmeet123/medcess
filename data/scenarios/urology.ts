import type { Scenario } from "@/data/scenarios";

const URO_SPECIALTY = "Urology" as const;

export const urologyScenarios: Scenario[] = [
  {
    id: "urology-retention-bph-thomas-reynolds",
    title: "I Can't Pee And It Hurts",
    specialty: URO_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    description:
      "Thomas Reynolds, a 72-year-old retired contractor, presents to the ED with painful inability to void, lower abdominal fullness, and a long history of weak stream and nocturia.",
    cardTeaser: "I feel like my bladder is going to explode.",
    objectives: [
      "Recognize acute urinary retention and bladder distention.",
      "Link outlet symptoms to BPH pattern while ruling out infection and other obstruction.",
      "Order bladder volume assessment and basic labs; plan catheterization pathway and follow-up.",
    ],
    patientPersona: {
      name: "Thomas Reynolds",
      age: 72,
      gender: "Male",
      chiefComplaint: "I feel like my bladder is going to explode.",
      background:
        "Retired contractor, usually tough about pain. About 12 hours ago urine stopped coming despite urge; lower belly pressure climbed into constant ache. Years of getting up two to four times at night, weak stream, hesitancy, and feeling he does not finish emptying. Denies fever, chills, and visible blood. No spinal injury or known neurologic disease. ED presentation.",
      vitals: {
        heartRate: 112,
        bloodPressure: "154/88",
        respiratoryRate: 18,
        oxygenSat: "99% on room air",
        temperature: "98.8°F",
      },
      medicationList: ["Antihypertensive from PCP", "Occasional OTC decongestant cold medicine"],
      keyHistoryPoints: [
        "Painful anuria ~12 hours with rising suprapubic discomfort",
        "Chronic LUTS: nocturia, weak stream, incomplete emptying",
        "Distended tender suprapubic region on exam",
        "Bladder scan shows very large post-void type residual before catheter",
        "UA not classic UTI; BMP may show mild creatinine bump from obstructive physiology",
      ],
      redFlags: [
        "Fever with obstructive uropathy suggests urosepsis",
        "Neurologic deficits with retention broaden differential",
        "Gross hematuria with clots can cause mechanical obstruction",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Gruff, embarrassed, anxious about the pressure; answers clearly when asked directly.",
      behaviorRules: [
        "Do not say urinary retention or BPH as diagnoses.",
        "Describe stream, timing, and belly pressure vividly without naming conditions.",
      ],
      doNotRevealDirectly: [
        "BPH",
        "benign prostatic hyperplasia",
        "you need a catheter",
        "acute urinary retention",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Uncomfortable, diaphoretic brow; stable blood pressure.",
        details:
          "Splints lower abdomen. Alert, cooperative, obviously distressed from discomfort. Tachycardic likely from pain and anxiety.",
      },
      {
        id: "abdomen",
        label: "Abdomen / Suprapubic",
        summary: "Suprapubic distention with dull percussion; tender.",
        details:
          "Lower midline fullness appreciated above the pubis. Dull to percussion in that region. Mild tenderness; no peritoneal signs.",
      },
    ],
    testOverrides: [
      {
        testId: "bladder_scan",
        result:
          "Bladder ultrasound / scan: estimated bladder volume very large (hundreds of mL), consistent with significant urinary retention prior to decompression.",
        yield: "high",
      },
      {
        testId: "ua",
        result:
          "Urinalysis: mild RBCs possible from catheter or mucosal irritation; no dense pyuria or nitrite pattern defining UTI here.",
        yield: "helpful",
      },
      {
        testId: "cmp",
        result:
          "BMP: creatinine mildly above prior baseline for patient—suggestive of post-renal stress; electrolytes generally preserved acutely.",
        yield: "helpful",
      },
      {
        testId: "renal_ultrasound",
        result:
          "Renal ultrasound: mild bilateral hydronephrosis compatible with prolonged outlet obstruction; improves after decompression in follow-up scenarios.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "BMP tracks obstructive or prerenal change; UA screens complicating infection.",
      imagingDefault: "Renal ultrasound evaluates hydronephrosis if retention prolonged or labs abnormal.",
      bedsideDefault: "Bladder scan quantifies retention and guides catheter need.",
      procedureDefault: "Urethral catheterization is often immediate management once course is clear.",
    },
    finalDxId: "acute_urinary_retention_bph",
    requiredMustNotMiss: ["acute_urinary_retention_bph", "uti", "prostate_cancer"],
    dxOverrides: [
      {
        dxId: "acute_urinary_retention_bph",
        yield: "correct",
        explanation:
          "Painful inability to void with distended bladder, chronic BPH-type symptoms, and massive residual fits acute retention on an obstructive BPH background.",
      },
      {
        dxId: "uti",
        yield: "reasonable",
        explanation: "Can coexist or precipitate; UA here does not dominate as isolated infection without retention picture.",
      },
      {
        dxId: "prostate_cancer",
        yield: "reasonable",
        explanation: "Consider if atypical features or hard nodule—but classic LUTS and retention pattern strongly suggest BPH physiology first.",
      },
      {
        dxId: "neurogenic_bladder",
        yield: "low",
        explanation: "No neurologic storyline; chronic obstructive symptoms predominate.",
      },
      {
        dxId: "kidney_stone",
        yield: "low",
        explanation: "Colicky flank pain and stone imaging absent; presentation is obstructed emptying, not ureteral colic.",
      },
    ],
    diagnosisOptions: [
      {
        id: "acute_urinary_retention_bph",
        name: "Acute urinary retention due to benign prostatic hyperplasia",
        isCorrect: true,
        isDangerous: false,
        explanation: "Retention with chronic outlet symptoms and bladder distention.",
      },
      {
        id: "uti",
        name: "Urinary tract infection",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important to rule in as contributor; not the full picture of painful retention volume.",
      },
      {
        id: "prostate_cancer",
        name: "Prostate cancer with outlet obstruction",
        isCorrect: false,
        isDangerous: true,
        explanation: "Stay in differential; clinical scenario strongly favors BPH-mediated retention initially.",
      },
      {
        id: "neurogenic_bladder",
        name: "Neurogenic bladder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Less likely without neuro risk factors.",
      },
    ],
    teachingPoints: [
      "Grading (100): retention recognition 30, BPH-type history 25, bladder evaluation 20, diagnosis 25.",
      "Acute painful retention with bladder distention is catheterize-and-reassess urgency; track renal function post-relief.",
      "Outpatient workup: medications (anticholinergics, opioids), prostate exam, PSA discussion in context, flow studies.",
      "Educate on recurrence risk and indications to return for overflow symptoms or fever.",
    ],
  },
  {
    id: "urology-stone-eric-patel",
    title: "My Side Hurts Worse Than Anything",
    specialty: URO_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 13,
    description:
      "Eric Patel, a 41-year-old delivery driver, arrives with sudden severe flank pain radiating to the groin, nausea, and restlessness—classic ureteral colic presentation.",
    cardTeaser: "My side pain is unbearable.",
    objectives: [
      "Recognize ureteral colic pattern and radiation.",
      "Order urinalysis and non-contrast CT for stone evaluation.",
      "Distinguish from pyelonephritis, AAA, and surgical abdomen.",
    ],
    patientPersona: {
      name: "Eric Patel",
      age: 41,
      gender: "Male",
      chiefComplaint: "My side pain is unbearable.",
      background:
        "Sudden left flank grab while unloading boxes—10/10 when it peaks. Pain rides in waves and creeps toward his groin and left testicle. Cannot lie still on the gurney, keeps shifting. Nauseated, dry heaved once. Denies fever. No trauma. Drinks coffee more than water on route days. Ibuprofen at the depot barely touched it.",
      vitals: {
        heartRate: 116,
        bloodPressure: "148/92",
        respiratoryRate: 20,
        oxygenSat: "99% on room air",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "Sudden severe flank pain with colicky waves",
        "Radiation toward groin/testicle",
        "Nausea and restlessness without fever",
        "UA with microscopic hematuria",
        "CT without contrast: ureteral calculus with expected obstructive changes",
      ],
      redFlags: [
        "Fever with obstruction suggests infected system—emergency",
        "Older patient with atypical pain—think AAA",
        "Peritoneal signs redirect workup",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Agitated between pain waves, apologetic for snapping, grateful for help.",
      behaviorRules: [
        "Do not say kidney stone or ureteral stone as diagnosis.",
        "Emphasize colicky pattern and groin radiation when prompted.",
      ],
      doNotRevealDirectly: [
        "kidney stone",
        "nephrolithiasis",
        "CT shows a stone in your ureter",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Writhing, diaphoretic; unable to find a comfortable position.",
        details:
          "Appears in severe pain, repeatedly shifts side to side. Tachycardia likely pain-mediated. Lungs clear.",
      },
      {
        id: "abdomen",
        label: "Abdomen / Flank",
        summary: "Left CVA tenderness; soft abdomen without rebound.",
        details:
          "Positive left costovertebral angle percussion tenderness. Abdomen otherwise soft without guarding; bowel sounds present.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Urinalysis: blood on dipstick; microscopy shows RBCs consistent with microscopic hematuria. Negligible WBCs and no nitrite read as obvious infection pattern.",
        yield: "high",
      },
      {
        testId: "ct_abdomen_pelvis_noncontrast",
        result:
          "CT abdomen/pelvis without contrast: obstructing calculus in the left mid ureter with proximal hydroureteronephrosis. No AAA alternative finding on this protocol.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: WBC at upper normal—stress pattern; no left shift defining sepsis.",
        yield: "low",
      },
      {
        testId: "cmp",
        result: "BMP: creatinine acceptable today; electrolytes intact.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Hematuria common but not universal; leukocytosis should prompt infection reconsideration.",
      imagingDefault: "Non-contrast CT is high yield for ureteral stone when available.",
      bedsideDefault: "Aggressive analgesia and antiemetics while completing workup.",
      procedureDefault: "Urology for persistent obstruction, infection, or intractable pain.",
    },
    finalDxId: "kidney_stone",
    requiredMustNotMiss: ["kidney_stone", "acute_pyelonephritis", "abdominal_aortic_aneurysm"],
    dxOverrides: [
      {
        dxId: "kidney_stone",
        yield: "correct",
        explanation:
          "Sudden colicky flank pain with groin radiation, hematuria, and CT ureteral stone confirms ureteral nephrolithiasis.",
      },
      {
        dxId: "acute_pyelonephritis",
        yield: "dangerous-miss",
        explanation: "Fever and pyuria would pivot; must reassess if vitals change.",
      },
      {
        dxId: "appendicitis",
        yield: "reasonable",
        explanation: "RLQ syndrome not primary; imaging here centers urinary tract stone.",
      },
      {
        dxId: "abdominal_aortic_aneurysm",
        yield: "dangerous-miss",
        explanation: "Vascular catastrophe stays on radar in flank pain—CT here identifies stone instead.",
      },
      {
        dxId: "flank_pain_musculoskeletal",
        yield: "low",
        explanation: "Does not explain hematuria and obstructing calculus on CT.",
      },
    ],
    diagnosisOptions: [
      {
        id: "kidney_stone",
        name: "Ureteral kidney stone (nephrolithiasis / ureteral colic)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Colicky flank pain, hematuria, and CT stone.",
      },
      {
        id: "acute_pyelonephritis",
        name: "Pyelonephritis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Expect fever and infection urine pattern more prominently.",
      },
      {
        id: "appendicitis",
        name: "Appendicitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not match dominant flank-to-groin colic with stone CT.",
      },
      {
        id: "abdominal_aortic_aneurysm",
        name: "Abdominal aortic aneurysm",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must consider in atypical presentations—CT here shows stone.",
      },
    ],
    teachingPoints: [
      "Grading (100): colicky pain recognition 30, radiation pattern 20, CT/UA pathway 25, diagnosis 25.",
      "Non-contrast CT is standard for acute suspected ureteral stone in many ED pathways.",
      "Microscopic hematuria supports the diagnosis but may be absent; lack of fever helps push away infected obstruction initially.",
      "Hydration, analgesia, and tamsulosin discussion are common—individualize.",
    ],
  },
  {
    id: "urology-hematuria-bladder-james-carter",
    title: "I Found Blood In My Urine",
    specialty: URO_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "James Carter, a 67-year-old retired smoker with painless gross hematuria, presents to urology clinic for evaluation of visible blood in his urine.",
    cardTeaser: "My urine looked red.",
    objectives: [
      "Treat painless gross hematuria as a red-flag presentation in a smoker.",
      "Order hematuria-appropriate imaging and cystoscopic evaluation.",
      "Differentiate bladder cancer mimics: stone, infection, renal malignancy, benign prostatic bleeding.",
    ],
    patientPersona: {
      name: "James Carter",
      age: 67,
      gender: "Male",
      chiefComplaint: "My urine looked red.",
      background:
        "Retired auto mechanic. Two episodes of red-orange urine over ten days—no burning, no fever, no flank knife pain. Never formally worked up. Smokes half a pack daily for decades though \"cut back\" last year. No trauma. Erection function okay; no STI history he knows of. Wife pushed him to come because she read blood in urine is serious.",
      vitals: {
        heartRate: 74,
        bloodPressure: "132/80",
        respiratoryRate: 16,
        oxygenSat: "98% on room air",
        temperature: "98.2°F",
      },
      keyHistoryPoints: [
        "Painless gross hematuria without infection symptoms",
        "Tobacco exposure long duration",
        "UA confirms blood; urine cytology suspicious in context",
        "CT urogram shows filling defect / bladder wall irregularity",
        "Cystoscopy demonstrates visible bladder mass",
      ],
      redFlags: [
        "Gross hematuria in a smoker mandates timely malignancy evaluation",
        "Clot retention would be emergency",
        "New edema or hypertension might broaden glomerular workup",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Matter-of-fact, slightly defensive about smoking; worried underneath bravado.",
      behaviorRules: [
        "Do not say bladder cancer or tumor as definitive patient knowledge.",
        "Acknowledge fear when doctor explores impact on family.",
      ],
      doNotRevealDirectly: [
        "bladder cancer",
        "you have a tumor",
        "mass in bladder",
        "it's definitely cancer",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing; no pallor or distress.",
        details: "Comfortable. No CVA tenderness on screening. Lungs clear on limited exam.",
      },
      {
        id: "other",
        label: "External genitourinary",
        summary: "No obvious scrotal lesion; benign brief survey.",
        details:
          "External genitalia without gross lesions on focused exam. Not a substitute for cystoscopic evaluation.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Urinalysis: marked blood on dipstick; many RBCs on microscopy. Few WBCs—bland cystitis pattern not dominant.",
        yield: "high",
      },
      {
        testId: "ct_urogram",
        result:
          "CT urogram: irregular bladder wall thickening / intraluminal filling defect concerning for urothelial malignancy; upper tracts visualized without dominant obstructing stone.",
        yield: "high",
      },
      {
        testId: "cystoscopy",
        result:
          "Cystoscopy: sessile friable mass on lateral bladder wall—biopsy and staging pathway initiated in case log.",
        yield: "high",
      },
      {
        testId: "urine_cytology",
        result:
          "Urine cytology: atypical urothelial cells suspicious for high-grade urothelial carcinoma—correlated with endoscopic findings.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "UA confirms hematuria; coagulation if invasive procedure planned.",
      imagingDefault: "CT urogram evaluates upper tract and bladder lesions.",
      bedsideDefault: "DRE may note prostate size but does not replace cystoscopy for gross hematuria.",
      procedureDefault: "TURBT pathway for bladder lesion in real practice.",
    },
    finalDxId: "bladder_cancer",
    requiredMustNotMiss: ["bladder_cancer", "renal_cell_carcinoma", "uti"],
    dxOverrides: [
      {
        dxId: "bladder_cancer",
        yield: "correct",
        explanation:
          "Painless gross hematuria with smoking exposure, imaging bladder lesion, and cystoscopic mass align with bladder cancer presentation.",
      },
      {
        dxId: "kidney_stone",
        yield: "reasonable",
        explanation: "Stone can bleed but usually with colic; imaging pattern here centers bladder lesion.",
      },
      {
        dxId: "uti",
        yield: "low",
        explanation: "Typically dysuria and infection urine pattern; this urine is blood-predominant without symptoms.",
      },
      {
        dxId: "renal_cell_carcinoma",
        yield: "reasonable",
        explanation: "Must consider renal source—urogram evaluates upper tract in same workup.",
      },
      {
        dxId: "benign_prostatic_hyperplasia",
        yield: "low",
        explanation: "Can cause bleeding but painless gross hematuria in smoker still demands full hematuria workup.",
      },
    ],
    diagnosisOptions: [
      {
        id: "bladder_cancer",
        name: "Bladder cancer",
        isCorrect: true,
        isDangerous: true,
        explanation: "Painless gross hematuria with endoscopic bladder mass.",
      },
      {
        id: "kidney_stone",
        name: "Kidney / ureteral stone",
        isCorrect: false,
        isDangerous: false,
        explanation: "Less consistent with painless visible blood and bladder mass.",
      },
      {
        id: "uti",
        name: "Urinary tract infection",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important mimic diagnostically; lacks infectious symptom cluster here.",
      },
      {
        id: "renal_cell_carcinoma",
        name: "Renal cell carcinoma",
        isCorrect: false,
        isDangerous: true,
        explanation: "Stay on differential until upper tract fully characterized.",
      },
    ],
    teachingPoints: [
      "Grading (100): painless hematuria concern 35, smoking risk 20, cystoscopy/urogram pathway 20, diagnosis 25.",
      "Painless gross hematuria is bladder cancer until proven otherwise—prioritize cystoscopy and urogram.",
      "Smoking is a major modifiable risk; document pack-years and counsel.",
      "Discuss hematuria false negatives on dipstick alone—visible blood mandates formal evaluation.",
    ],
  },
  {
    id: "urology-torsion-noah-brooks",
    title: "My Testicle Suddenly Started Hurting",
    specialty: URO_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Noah Brooks, a 16-year-old student, presents with sudden severe left testicular pain, nausea, and exam findings concerning testicular torsion—a urologic emergency.",
    cardTeaser: "My testicle hurts really bad.",
    objectives: [
      "Recognize acute scrotum as time-sensitive surgical emergency.",
      "Perform focused scrotal history and exam cues (high-riding testis, cremasteric reflex).",
      "Order Doppler scrotal ultrasound and prepare for rapid urology/OR pathway.",
    ],
    patientPersona: {
      name: "Noah Brooks",
      age: 16,
      gender: "Male",
      chiefComplaint: "My testicle hurts really bad.",
      background:
        "Left testicle pain exploded about two hours ago while sitting in class—no sports hit he remembers. Pain kept climbing; nausea joined in. Walks bowlegged because fabric hurts. No fever. Never had this before. Embarrassed with mom in triage but scared.",
      vitals: {
        heartRate: 122,
        bloodPressure: "118/70",
        respiratoryRate: 18,
        oxygenSat: "99% on room air",
        temperature: "98.8°F",
      },
      keyHistoryPoints: [
        "Sudden severe testicular pain ~2 hours with nausea",
        "No convincing trauma story",
        "Exam: high-riding abnormal lie, absent cremasteric on affected side, exquisite tenderness",
        "Doppler ultrasound: decreased or absent testicular blood flow vs normal right",
        "Time window for salvage narrows after six hours from symptom onset—team urgency",
      ],
      redFlags: [
        "Delayed diagnosis risks testicular loss",
        "Mimics include epididymitis—typically more gradual and inflammatory",
        "Fever and pyuria lean infection but do not exclude torsion until evaluated",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Teen voice—pain makes him curt, scared; shy about intimate detail but honest under direct questions.",
      behaviorRules: [
        "Do not pronounce testicular torsion as lay diagnosis.",
        "Give timeline clearly when asked about onset.",
      ],
      doNotRevealDirectly: [
        "testicular torsion",
        "you need surgery right now",
        "your testicle is dying",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Nauseated, guarded gait; distressed.",
        details:
          "Pale and anxious, mildly diaphoretic from pain. Moving carefully to avoid scrotal contact.",
      },
      {
        id: "other",
        label: "Genitourinary / Scrotal",
        summary: "Left hemiscrotum swollen, high-riding testis, absent cremasteric reflex on left.",
        details:
          "Marked left testicular tenderness with abnormal high-riding position compared with right. Left cremasteric reflex not elicited. Right testis normal exam for comparison.",
      },
    ],
    testOverrides: [
      {
        testId: "scrotal_ultrasound_doppler",
        result:
          "Scrotal ultrasound with Doppler: diminished/absent arterial flow to left testis compared with normal flow on right; left testicle appears swollen with subtle heterogeneous echotexture on report.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: mild leukocytosis can appear with ischemic stress; not reliable to distinguish torsion from epididymitis alone.",
        yield: "low",
      },
      {
        testId: "ua",
        result:
          "Urinalysis: essentially bland—does not support infectious epididymitis as primary pattern (though UA cannot exclude torsion).",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "UA marginally helpful—do not delay imaging based on UA alone.",
      imagingDefault: "Doppler ultrasound is diagnostic adjunct; surgical exploration if high suspicion persists despite equivocal ultrasound.",
      bedsideDefault: "Pre-operative preparation and urology emergent consult.",
      procedureDefault: "Bilateral orchidopexy consideration in OR management.",
    },
    finalDxId: "testicular_torsion",
    requiredMustNotMiss: ["testicular_torsion", "epididymitis"],
    dxOverrides: [
      {
        dxId: "testicular_torsion",
        yield: "correct",
        explanation:
          "Sudden severe unilateral pain, high-riding testis, absent cremasteric reflex, and decreased Doppler flow define testicular torsion until proven otherwise.",
      },
      {
        dxId: "epididymitis",
        yield: "dangerous-miss",
        explanation:
          "Common mimic—more gradual, cremasteric often present, increased Doppler flow, urinary symptoms or older age bias; not fitting here.",
      },
      {
        dxId: "incarcerated_inguinal_hernia",
        yield: "reasonable",
        explanation: "Consider if bowel in scrotum pattern—exam ultrasound centered on testicular flow argues torsion.",
      },
      {
        dxId: "testicular_contusion",
        yield: "low",
        explanation: "Requires trauma history; absent here.",
      },
      {
        dxId: "hydrocele",
        yield: "low",
        explanation: "Chronic painless swelling pattern—not this thunderclap presentation.",
      },
    ],
    diagnosisOptions: [
      {
        id: "testicular_torsion",
        name: "Testicular torsion",
        isCorrect: true,
        isDangerous: true,
        explanation: "Acute ischemic presentation with classic exam and Doppler.",
      },
      {
        id: "epididymitis",
        name: "Epididymitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important mimic—usually more gradual with infectious clues and hyperemia on Doppler.",
      },
      {
        id: "incarcerated_inguinal_hernia",
        name: "Incarcerated inguinal hernia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less consistent with absent cremasteric and ischemic Doppler pattern without groin mass story.",
      },
      {
        id: "testicular_contusion",
        name: "Scrotal trauma / contusion",
        isCorrect: false,
        isDangerous: false,
        explanation: "Implies injury mechanism; not reported.",
      },
    ],
    teachingPoints: [
      "Grading (100): surgical emergency recognition 35, cremasteric/reflex-exam cues 20, Doppler ordering 20, diagnosis 25. Bonus: explicitly noting time-sensitive salvage window +10.",
      "Torsion is a race against ischemia—document time zero and expedite urology.",
      "If suspicion remains high, do not anchor on normal ultrasound without experienced read.",
      "Discuss postoperative fertility and contralateral fixation counseling at follow-up.",
    ],
  },
  {
    id: "urology-bph-luts-robert-kim",
    title: "I Keep Running To The Bathroom At Night",
    specialty: URO_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 11,
    description:
      "Robert Kim, a 69-year-old retired teacher, reports progressive nocturia, weak urinary stream, and incomplete emptying—classic BPH-type lower urinary tract symptoms.",
    cardTeaser: "I barely sleep anymore.",
    objectives: [
      "Elicit LUTS pattern: storage vs voiding vs post-micturition symptoms.",
      "Use urinalysis, PSA, and post-void residual to risk-stratify obstruction and guide management.",
      "Differentiate BPH from prostate cancer concern, UTI, diabetes-related polyuria, and overactive bladder.",
    ],
    patientPersona: {
      name: "Robert Kim",
      age: 69,
      gender: "Male",
      chiefComplaint: "I barely sleep anymore.",
      background:
        "Retired high school history teacher. For years stream weakened and end dribble increased; now gets up four to five times nightly. No burning, no blood he saw. Feeling drained teaching grandkids because sleep is shredded. Takes lisinopril for BP. No diabetes diagnosis. Bothered about intimacy but erections still occur—hesitant to bring it up unless asked.",
      vitals: {
        heartRate: 68,
        bloodPressure: "128/76",
        respiratoryRate: 16,
        oxygenSat: "98% on room air",
        temperature: "98.4°F",
      },
      medicationList: ["Lisinopril", "Seasonal OTC antihistamine as needed"],
      keyHistoryPoints: [
        "Chronic progressive nocturia, weak stream, dribbling, incomplete emptying sensation",
        "DRE suggests mildly enlarged smooth prostate",
        "UA bland without infection",
        "Elevated PSA relative to age trend—interpreted in urology context, not sole cancer rule-in",
        "Elevated post-void residual consistent with incomplete bladder emptying",
      ],
      redFlags: [
        "Weight loss bone pain or hard prostate nodule raises cancer concern",
        "Acute retention or gross hematuria changes urgency",
        "Polyuria with glucosuria would pivot to diabetes evaluation",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Polite, tired, a bit sheepish about urinary and sexual topics but honest if clinician normalizes.",
      behaviorRules: [
        "Do not name BPH or prostate enlargement as patient-stated diagnosis.",
        "Offer sexual symptom detail only if doctor asks sensitively.",
      ],
      doNotRevealDirectly: [
        "BPH",
        "your prostate is blocking you",
        "you definitely need surgery",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing fatigued gentleman.",
        details: "No distress at rest. Comfortable seated. Mild dark circles consistent with poor sleep.",
      },
      {
        id: "other",
        label: "Digital rectal exam",
        summary: "Prostate mildly enlarged, smooth, rubbery—no dominant nodule appreciated on brief exam.",
        details:
          "Appropriate consent and positioning assumed. Prostate estimated modest enlargement without asymmetry on this screening maneuver—clinical correlation with labs and symptoms.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Urinalysis: no significant pyuria, nitrites negative; specific gravity normal. Not consistent with UTI driving symptoms.",
        yield: "high",
      },
      {
        testId: "psa",
        result:
          "PSA mildly elevated for age in this case narrative—urology interprets with DRE, trajectory, and shared decision-making rather than single cutoff.",
        yield: "helpful",
      },
      {
        testId: "bladder_scan",
        result:
          "Post-void residual via bladder scan: elevated residual volume after void attempt—consistent with incomplete emptying / outlet resistance pattern.",
        yield: "high",
      },
      {
        testId: "cmp",
        result: "BMP: glucose not in diabetic range here; creatinine normal—supports benign pattern without renal failure from chronic retention yet.",
        yield: "helpful",
      },
      {
        testId: "hba1c",
        result:
          "HbA1c near upper normal / not diagnostic diabetes in this vignette—polyuria from hyperglycemia less likely based on result.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "UA excludes infection; A1c or fasting glucose can separate polyuria mimics.",
      imagingDefault: "Renal US reserved if retention complicated or hydronephrosis suspected.",
      bedsideDefault: "PVR quantifies emptying; symptom scores (IPSS) often used in clinic.",
      procedureDefault: "Medical therapy such as alpha blockade / 5-ARI discussed outpatient.",
    },
    finalDxId: "benign_prostatic_hyperplasia",
    requiredMustNotMiss: ["benign_prostatic_hyperplasia", "prostate_cancer", "uti"],
    dxOverrides: [
      {
        dxId: "benign_prostatic_hyperplasia",
        yield: "correct",
        explanation:
          "Progressive obstructive and irritative LUTS with enlarged prostate on exam, elevated PVR, bland UA fits symptomatic BPH pattern.",
      },
      {
        dxId: "prostate_cancer",
        yield: "dangerous-miss",
        explanation:
          "PSA elevation prompts risk discussion and guideline-based evaluation—not dismissed in real care.",
      },
      {
        dxId: "uti",
        yield: "low",
        explanation: "Bland UA and absence of dysuria make infection unlikely as primary driver.",
      },
      {
        dxId: "type_2_diabetes_mellitus",
        yield: "low",
        explanation: "Glycemic testing here not pointing to hyperglycemic polyuria as main story.",
      },
      {
        dxId: "overactive_bladder",
        yield: "reasonable",
        explanation: "Storage symptoms overlap—PVR elevation here favors outlet component.",
      },
    ],
    diagnosisOptions: [
      {
        id: "benign_prostatic_hyperplasia",
        name: "Benign prostatic hyperplasia (LUTS)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Chronic obstructive pattern with elevated residual and exam.",
      },
      {
        id: "prostate_cancer",
        name: "Prostate cancer",
        isCorrect: false,
        isDangerous: true,
        explanation: "Particularly if PSA trajectory abnormal or exam suspicious—coordinate biopsy decisions in practice.",
      },
      {
        id: "uti",
        name: "Urinary tract infection",
        isCorrect: false,
        isDangerous: false,
        explanation: "UA argues against infection-first narrative.",
      },
      {
        id: "overactive_bladder",
        name: "Overactive bladder syndrome",
        isCorrect: false,
        isDangerous: false,
        explanation: "Explains urgency but not dominant elevated residual pattern without other workup.",
      },
    ],
    teachingPoints: [
      "Grading (100): LUTS pattern 30, history depth 25, urinary studies (UA/PSA/PVR) 20, diagnosis 25.",
      "BPH symptom reducers: discuss fluid timing, caffeine, constipation, and medication review.",
      "PSA shared decision-making: benefits/harms of screening contexts per guidelines in real patients.",
      "Elevated PVR should prompt retention precautions and medication classes that worsen obstruction review.",
    ],
  },
];
