import type { Scenario } from "@/data/scenarios";

const ANESTHESIA_SPECIALTY = "Anesthesiology" as const;

export const anesthesiologyScenarios: Scenario[] = [
  {
    id: "opioid-respiratory-depression",
    title: "Why Can't I Catch My Breath?",
    specialty: ANESTHESIA_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Daniel Brooks, a 52-year-old accountant, is in the postoperative recovery room two hours after knee replacement with increasing somnolence, slow breathing, and hypoxia after opioid pain medication.",
    cardTeaser: "I feel really sleepy... and it's hard to breathe.",
    objectives: [
      "Recognize postoperative respiratory depression as an emergency.",
      "Link sedation and hypoventilation to recent opioid administration.",
      "Prioritize monitoring, airway support, and consideration of naloxone."
    ],
    patientPersona: {
      name: "Daniel Brooks",
      age: 52,
      gender: "Male",
      chiefComplaint: "I feel really sleepy... and it's hard to breathe.",
      background:
        "Accountant who underwent elective knee replacement two hours ago. Received IV opioid analgesia in recovery. He is increasingly difficult to keep awake; his wife notes he keeps nodding off mid-sentence. No history of COPD or asthma.",
      vitals: {
        heartRate: 58,
        bloodPressure: "108/70",
        respiratoryRate: 8,
        oxygenSat: "88%",
        temperature: "98.7°F"
      },
      keyHistoryPoints: [
        "Two hours post knee replacement",
        "Recent opioid pain medication in recovery",
        "Increasing drowsiness and slow breathing",
        "Family reports falling asleep while speaking",
        "Pinpoint pupils on exam",
        "RR 8 with SpO2 88%",
        "No chest pain, fever, or prior lung disease"
      ],
      redFlags: [
        "Respiratory rate 8 with hypoxia",
        "Marked sedation with opioid exposure",
        "Risk of respiratory arrest if untreated"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Daniel, very sleepy and slurring words slightly. Short sentences. Sound worried when you talk about breathing.",
      behaviorRules: [
        "Answer only as the patient (or wife only if explicitly asked what family said).",
        "Do NOT name opioid toxicity, naloxone, or respiratory depression.",
        "You are drowsy — pause, lose track of questions occasionally.",
        "Mention knee surgery and pain medicine when asked about today or medications."
      ],
      doNotRevealDirectly: [
        "opioid-induced respiratory depression",
        "naloxone",
        "Narcan",
        "You overdosed",
        "This is pneumonia"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Very sleepy but arousable to voice.",
        details:
          "Middle-aged man in recovery gown, markedly somnolent but opens eyes to sternal rub. No acute distress when aroused; quickly drifts back toward sleep."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Pinpoint pupils; airway patent.",
        details:
          "Pupils pinpoint and sluggishly reactive. Mucous membranes moist. No stridor. Surgical dressing on right knee intact."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Slow shallow respirations; lungs clear.",
        details:
          "Respiratory rate 8, shallow. Breath sounds clear bilaterally without wheezes or crackles. Mild accessory muscle use when prompted to deep breathe."
      }
    ],
    testOverrides: [
      {
        testId: "abg",
        result:
          "pH 7.28, PaCO2 58 mmHg, PaO2 62 mmHg on room air — mild respiratory acidosis with hypercapnia and hypoxemia.",
        yield: "high"
      },
      {
        testId: "capnography",
        result: "End-tidal CO2 elevated at 52 mmHg, consistent with hypoventilation.",
        yield: "high"
      },
      {
        testId: "pulse_ox_continuous",
        result: "SpO2 trending 86–90% on room air; improves with supplemental oxygen and stimulation.",
        yield: "high"
      },
      {
        testId: "cxr",
        result: "Normal heart size and clear lung fields. No infiltrate or effusion.",
        yield: "helpful"
      },
      {
        testId: "ecg",
        result: "Sinus bradycardia at 58 bpm. No ischemic changes.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits. No leukocytosis.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No acute pulmonary abnormality.",
      bedsideDefault: "See scenario-specific monitoring.",
      procedureDefault: "Not indicated unless airway compromise."
    },
    finalDxId: "opioid_respiratory_depression",
    requiredMustNotMiss: ["opioid_respiratory_depression", "pe", "stroke"],
    dxOverrides: [
      {
        dxId: "opioid_respiratory_depression",
        yield: "correct",
        explanation:
          "Postoperative opioid with pinpoint pupils, somnolence, bradypnea, hypercapnia, and hypoxemia fits opioid-induced respiratory depression."
      },
      {
        dxId: "pe",
        yield: "dangerous-miss",
        explanation:
          "PE can cause hypoxia postoperatively, but marked sedation, pinpoint pupils, and hypercapnia point to hypoventilation from opioids."
      },
      {
        dxId: "pneumonia",
        yield: "low",
        explanation: "No fever, infiltrate, or productive cough; clear lungs and normal chest X-ray."
      },
      {
        dxId: "stroke",
        yield: "dangerous-miss",
        explanation:
          "Stroke can alter mental status, but acute post-op opioid timing with bradypnea and miosis is more specific for opioid effect."
      },
      {
        dxId: "sleep_apnea",
        yield: "reasonable",
        explanation:
          "OSA worsens with sedatives, but acute pinpoint pupils and hypercapnia after opioid dose favor primary opioid respiratory depression."
      },
      {
        dxId: "medication_overdose",
        yield: "reasonable",
        explanation:
          "Therapeutic opioid dosing can still cause respiratory depression in susceptible patients; clinical picture aligns."
      }
    ],
    diagnosisOptions: [
      {
        id: "opioid_respiratory_depression",
        name: "Postoperative opioid-induced respiratory depression",
        isCorrect: true,
        isDangerous: true,
        explanation: "Opioid-related sedation, miosis, bradypnea, hypercapnia, and hypoxemia after recent analgesia."
      },
      {
        id: "pe",
        name: "Pulmonary embolism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Hypoxia without dominant sedation/miosis pattern or clear hypercapnia from hypoventilation."
      },
      {
        id: "pneumonia",
        name: "Pneumonia",
        isCorrect: false,
        isDangerous: false,
        explanation: "No infectious signs or infiltrate."
      }
    ],
    teachingPoints: [
      "Grading (100): Respiratory emergency 30, opioid relationship 25, monitoring 20, diagnosis 25. Bonus: naloxone (+10). Deductions: miss low RR (-20), pneumonia without evidence (-15).",
      "Postoperative opioids can cause life-threatening hypoventilation even at standard doses.",
      "Bradypnea, sedation, miosis, hypercapnia, and hypoxemia are key clues.",
      "Continuous pulse oximetry and capnography help detect hypoventilation early.",
      "Naloxone reverses opioid effect while supporting airway and ventilation."
    ]
  },
  {
    id: "spinal-anesthesia-hypotension",
    title: "My Blood Pressure Keeps Dropping",
    specialty: ANESTHESIA_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 10,
    description:
      "Linda Perez, a 67-year-old retired teacher, is in the recovery room after hip surgery with dizziness and hypotension following spinal anesthesia.",
    cardTeaser: "I feel dizzy and weak.",
    objectives: [
      "Recognize spinal anesthesia-related hypotension.",
      "Differentiate from hemorrhage, sepsis, and cardiac causes.",
      "Apply appropriate volume resuscitation and positioning."
    ],
    patientPersona: {
      name: "Linda Perez",
      age: 67,
      gender: "Female",
      chiefComplaint: "I feel dizzy and weak.",
      background:
        "Retired teacher who had hip replacement under spinal anesthesia earlier today. In recovery she feels lightheaded when the head of the bed is raised, with nausea and faintness. No chest pain or shortness of breath.",
      vitals: {
        heartRate: 105,
        bloodPressure: "82/50",
        respiratoryRate: 18,
        oxygenSat: "98%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Recent hip surgery with spinal anesthesia",
        "Dizziness and lightheadedness in recovery",
        "Worse when sitting up",
        "Nausea and feeling faint",
        "Tachycardia with BP 82/50",
        "No chest pain or dyspnea",
        "Pale, diaphoretic, warm skin"
      ],
      redFlags: [
        "Hypotension with tachycardia postoperatively",
        "Must exclude occult hemorrhage",
        "Symptomatic orthostasis after neuraxial block"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Linda, a polite older woman who feels weak and a little scared. Soft voice, mentions nausea when dizzy.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say spinal hypotension or name vasopressors.",
        "Mention spinal anesthesia and hip surgery when asked about the operation.",
        "Describe worse symptoms when head of bed goes up."
      ],
      doNotRevealDirectly: [
        "spinal anesthesia hypotension",
        "sympathetic block",
        "You are bleeding internally",
        "This is a heart attack"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pale, mildly diaphoretic, alert.",
        details:
          "Elderly woman appears pale with mild diaphoresis. Alert and oriented but uncomfortable when upright. Surgical hip dressing dry."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Tachycardic, regular rhythm.",
        details:
          "Heart rate 105, regular rhythm. No murmurs appreciated. Capillary refill slightly delayed at 3 seconds."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear; no distress.",
        details: "Breath sounds clear. No increased work of breathing. SpO2 adequate on room air."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Soft, non-distended.",
        details: "Abdomen soft without distension or tenderness suggesting occult bleeding."
      }
    ],
    testOverrides: [
      {
        testId: "orthostatic_vitals",
        result:
          "Supine BP 90/55, HR 100; sitting BP 78/48, HR 112 with dizziness — positive orthostatic hypotension.",
        yield: "high"
      },
      {
        testId: "ecg",
        result: "Sinus tachycardia without ST elevation or arrhythmia.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Hemoglobin stable compared with preoperative value. No drop suggesting acute hemorrhage.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "Electrolytes within normal limits. No acute kidney injury.",
        yield: "helpful"
      },
      {
        testId: "cxr",
        result: "Clear lungs. Normal cardiac silhouette.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No acute abnormality.",
      bedsideDefault: "Orthostatic vital signs documented.",
      procedureDefault: "IV fluid bolus and leg elevation typical management."
    },
    finalDxId: "spinal_anesthesia_hypotension",
    requiredMustNotMiss: ["spinal_anesthesia_hypotension", "internal_bleeding", "pe"],
    dxOverrides: [
      {
        dxId: "spinal_anesthesia_hypotension",
        yield: "correct",
        explanation:
          "Sympathetic block from spinal anesthesia causes vasodilation and orthostatic hypotension after hip surgery without bleeding or ischemia."
      },
      {
        dxId: "internal_bleeding",
        yield: "dangerous-miss",
        explanation:
          "Must exclude in post-op hypotension; stable hemoglobin and dry dressing make significant hemorrhage less likely here."
      },
      {
        dxId: "sepsis",
        yield: "low",
        explanation: "No fever, source, or leukocytosis acutely in recovery."
      },
      {
        dxId: "pe",
        yield: "dangerous-miss",
        explanation:
          "Can follow orthopedic surgery, but warm skin, clear lungs, and neuraxial timing favor spinal hypotension."
      },
      {
        dxId: "dehydration",
        yield: "reasonable",
        explanation: "NPO status contributes, but predominant picture is orthostasis after spinal block."
      },
      {
        dxId: "unstable_angina",
        yield: "low",
        explanation: "No chest pain or ischemic ECG changes."
      }
    ],
    diagnosisOptions: [
      {
        id: "spinal_anesthesia_hypotension",
        name: "Spinal anesthesia-induced hypotension",
        isCorrect: true,
        isDangerous: false,
        explanation: "Hypotension and orthostasis after spinal anesthesia without bleeding."
      },
      {
        id: "internal_bleeding",
        name: "Internal bleeding",
        isCorrect: false,
        isDangerous: true,
        explanation: "Stable hemoglobin and no abdominal distension argue against major hemorrhage."
      },
      {
        id: "pe",
        name: "Pulmonary embolism",
        isCorrect: false,
        isDangerous: true,
        explanation: "No hypoxia or pleuritic symptoms; pattern fits neuraxial hypotension."
      }
    ],
    teachingPoints: [
      "Grading (100): Anesthesia complication 30, interpret hypotension 30, evaluation 15, diagnosis 25.",
      "Spinal anesthesia blocks sympathetic outflow and causes vasodilation and bradycardia/hypotension.",
      "Leg elevation, IV fluids, and vasopressors treat symptomatic spinal hypotension.",
      "Always assess for concurrent hemorrhage postoperatively.",
      "Orthostatic vitals document positional symptoms."
    ]
  },
  {
    id: "malignant-hyperthermia",
    title: "Something Went Wrong During Surgery",
    specialty: ANESTHESIA_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Tyler Reed, an 18-year-old student, develops sudden hyperthermia, tachycardia, muscle rigidity, and rising end-tidal CO2 under general anesthesia for elective surgery.",
    cardTeaser: "His temperature and heart rate suddenly started rising.",
    objectives: [
      "Recognize malignant hyperthermia as an intraoperative emergency.",
      "Identify hypermetabolic signs: fever, rigidity, hypercarbia, tachycardia.",
      "Initiate dantrolene and supportive cooling without delay."
    ],
    patientPersona: {
      name: "Tyler Reed",
      age: 18,
      gender: "Male",
      chiefComplaint: "His temperature and heart rate suddenly started rising.",
      background:
        "Healthy high school senior undergoing elective shoulder surgery under general anesthesia with volatile anesthetic and succinylcholine used for intubation. OR team reports sudden rise in end-tidal CO2, tachycardia, rigidity, and fever. Patient is not conversant intraoperatively; anesthesia team provides updates.",
      vitals: {
        heartRate: 150,
        bloodPressure: "150/90",
        respiratoryRate: 16,
        oxygenSat: "95%",
        temperature: "104°F"
      },
      keyHistoryPoints: [
        "During general anesthesia for elective surgery",
        "Sudden rise in end-tidal CO2",
        "Generalized muscle rigidity",
        "Temperature 104°F intraoperatively",
        "Tachycardia HR 150",
        "No preoperative infection signs",
        "Triggering agents: volatile anesthetic / succinylcholine exposure"
      ],
      redFlags: [
        "Rapid unexplained hyperthermia under anesthesia",
        "Masseter or generalized rigidity with hypercarbia",
        "Hyperkalemia and elevated CK risk",
        "MH is lethal without dantrolene"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Patient is under general anesthesia — answer as the circulating nurse or anesthesiologist reporting to the learner when they ask questions. Use OR context. Do NOT let the unconscious patient give a normal history.",
      behaviorRules: [
        "Speak as OR staff (nurse or anesthesia provider) reporting intraoperative events.",
        "Do NOT say malignant hyperthermia or dantrolene unless learner states it as their plan (then confirm availability only).",
        "Report vitals, rigidity, CO2, temperature, and drugs given when asked.",
        "Emphasize rapid onset during anesthesia."
      ],
      doNotRevealDirectly: [
        "malignant hyperthermia",
        "dantrolene",
        "MH crisis",
        "This is just sepsis"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Under anesthesia; febrile and rigid.",
        details:
          "Young man on OR table under general anesthesia. Skin hot to touch. Profuse diaphoresis. Jaw and limb musculature rigid on passive movement."
      },
      {
        id: "respiratory",
        label: "Respiratory / Ventilator",
        summary: "Elevated end-tidal CO2 despite controlled ventilation.",
        details:
          "Ventilator shows rising end-tidal CO2 despite increased minute ventilation. Breath sounds present bilaterally. No bronchospasm appreciated."
      },
      {
        id: "other",
        label: "Anesthesia Monitor",
        summary: "Hypermetabolic crisis pattern on monitors.",
        details:
          "Heart rate 150, BP labile. Core temperature 40°C (104°F) and climbing. End-tidal CO2 markedly elevated. No rash or purulent secretions."
      }
    ],
    testOverrides: [
      {
        testId: "end_tidal_co2",
        result: "End-tidal CO2 rapidly rising above 60 mmHg despite increased ventilation — hypermetabolic CO2 production.",
        yield: "high"
      },
      {
        testId: "abg",
        result: "Respiratory and metabolic acidosis with hypercapnia; PaCO2 elevated.",
        yield: "high"
      },
      {
        testId: "ck",
        result: "Creatine kinase markedly elevated, consistent with muscle breakdown.",
        yield: "high"
      },
      {
        testId: "potassium",
        result: "Serum potassium 6.1 mEq/L — hyperkalemia.",
        yield: "high"
      },
      {
        testId: "ua",
        result: "Myoglobinuria with dark urine on Foley — supports rhabdomyolysis.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits. No leukocytosis to suggest primary infection.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Pending or see intraoperative panel.",
      imagingDefault: "Not applicable intraoperatively.",
      bedsideDefault: "Continuous temperature and capnography essential.",
      procedureDefault: "Dantrolene administration is definitive therapy."
    },
    finalDxId: "malignant_hyperthermia",
    requiredMustNotMiss: ["malignant_hyperthermia", "sepsis"],
    dxOverrides: [
      {
        dxId: "malignant_hyperthermia",
        yield: "correct",
        explanation:
          "Acute intraoperative fever, rigidity, tachycardia, hypercarbia, hyperkalemia, and elevated CK after triggering agents is malignant hyperthermia."
      },
      {
        dxId: "sepsis",
        yield: "dangerous-miss",
        explanation:
          "Sepsis causes fever, but rigidity and hypercarbia under anesthesia with volatile agents point to MH."
      },
      {
        dxId: "thyroid_storm",
        yield: "low",
        explanation: "No history of thyrotoxicosis; intraoperative rigidity and ET CO2 rise are atypical."
      },
      {
        dxId: "heat_stroke",
        yield: "low",
        explanation: "OR environment controlled; pattern tied to anesthetic triggers."
      },
      {
        dxId: "neuroleptic_malignant_syndrome",
        yield: "low",
        explanation: "NMS follows antipsychotics, not volatile anesthetics; similar rigidity but different context."
      }
    ],
    diagnosisOptions: [
      {
        id: "malignant_hyperthermia",
        name: "Malignant hyperthermia",
        isCorrect: true,
        isDangerous: true,
        explanation: "Intraoperative hypermetabolic crisis with rigidity, hyperthermia, and hypercarbia."
      },
      {
        id: "sepsis",
        name: "Sepsis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Fever without typical rigidity/hypercarbia pattern under GA with triggering agents."
      },
      {
        id: "neuroleptic_malignant_syndrome",
        name: "Neuroleptic malignant syndrome",
        isCorrect: false,
        isDangerous: false,
        explanation: "Wrong drug context; no recent antipsychotic exposure."
      }
    ],
    teachingPoints: [
      "Grading (100): Emergency 30, MH clues 30, critical testing 15, diagnosis 25. Bonus: dantrolene (+10). Deductions: miss rigidity (-15), delay (-20).",
      "MH is triggered by volatile anesthetics and succinylcholine in susceptible patients.",
      "Tachycardia, hypercarbia, rigidity, fever, hyperkalemia, and elevated CK are hallmarks.",
      "Stop triggers, hyperventilate, cool patient, give dantrolene, and treat hyperkalemia/acidosis.",
      "MH cart and dantrolene availability are essential in every OR."
    ]
  },
  {
    id: "emergence-delirium",
    title: "I Feel Strange After Waking Up",
    specialty: ANESTHESIA_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "Emily Ross, a 6-year-old girl, wakes from tonsillectomy anesthesia agitated, confused, and not recognizing her parents in the pediatric recovery unit.",
    cardTeaser: "She woke up acting completely confused.",
    objectives: [
      "Recognize emergence delirium in the immediate post-anesthesia period.",
      "Rule out hypoglycemia, seizure, and neurologic emergency.",
      "Provide supportive care and safe environment."
    ],
    patientPersona: {
      name: "Emily Ross",
      age: 6,
      gender: "Female",
      chiefComplaint: "She woke up acting completely confused.",
      background:
        "First-grader who had tonsillectomy under general anesthesia earlier today. In PACU she awoke crying, thrashing, and calling for her mother but not recognizing her. No fever. No prior seizures. Parents are frightened.",
      vitals: {
        heartRate: 115,
        bloodPressure: "102/60",
        respiratoryRate: 20,
        oxygenSat: "99%",
        temperature: "98.9°F"
      },
      keyHistoryPoints: [
        "Recent tonsil surgery under general anesthesia",
        "Awoke agitated and disoriented in PACU",
        "Crying, does not recognize parents briefly",
        "Moving all extremities symmetrically",
        "No fever",
        "No seizure history",
        "Normal glucose and labs"
      ],
      redFlags: [
        "Prolonged unresponsiveness or focal deficits suggest stroke",
        "Hypoglycemia must be excluded in confused child",
        "True seizure vs post-anesthetic agitation"
      ]
    },
    aiInstructions: {
      patientStyle:
        "For history, parent speaks. Emily may cry or say confused things ('Where am I?', 'I want to go home') if asked how she feels. Childlike, scared tone.",
      behaviorRules: [
        "Parent answers timeline and surgery questions; Emily answers simple 'how do you feel' with confusion.",
        "Do NOT say emergence delirium.",
        "No fever or seizure activity when asked.",
        "Symptoms began right after waking from anesthesia."
      ],
      doNotRevealDirectly: [
        "emergence delirium",
        "post-anesthesia confusion",
        "She had a stroke",
        "She is seizing"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Agitated, crying child; no fever.",
        details:
          "Six-year-old girl in PACU bed, crying and restless but consolable intermittently. No petechiae or rash. Surgical site at oropharynx without active bleeding."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Agitated but non-focal.",
        details:
          "Moves all four extremities purposefully. Pupils equal and reactive. No gaze deviation or tonic posturing. Briefly disoriented to place and people; improves with calm voice over time."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Post-tonsillectomy oropharynx.",
        details:
          "Mild blood-tinged saliva expected post-op. No stridor. Mucous membranes moist."
      }
    ],
    testOverrides: [
      {
        testId: "glucose",
        result: "Blood glucose 98 mg/dL — normal.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result: "Electrolytes and renal function normal.",
        yield: "helpful"
      },
      {
        testId: "neurologic_exam_bedside",
        result: "Non-focal neurologic examination; no persistent deficit.",
        yield: "high"
      },
      {
        testId: "ct_head",
        result: "Not indicated with typical emergence agitation, normal exam, and clear post-anesthetic timing.",
        yield: "inappropriate"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "Not indicated when exam and labs reassuring.",
      bedsideDefault: "Serial neuro checks in PACU.",
      procedureDefault: "Supportive care first line."
    },
    finalDxId: "emergence_delirium",
    requiredMustNotMiss: ["emergence_delirium", "hypoglycemia", "stroke"],
    dxOverrides: [
      {
        dxId: "emergence_delirium",
        yield: "correct",
        explanation:
          "Acute agitation and confusion immediately after anesthesia in young child with normal glucose, non-focal exam, and self-limited course fits emergence delirium."
      },
      {
        dxId: "hypoglycemia",
        yield: "dangerous-miss",
        explanation: "Must check glucose in confused child; normal level excludes this."
      },
      {
        dxId: "stroke",
        yield: "dangerous-miss",
        explanation: "Unlikely with symmetric movement, no focal signs, and typical PACU timing."
      },
      {
        dxId: "seizure",
        yield: "reasonable",
        explanation:
          "Consider if rhythmic movements; here agitation is waxing/waning without postictal period typical of seizure."
      },
      {
        dxId: "drug_rash",
        yield: "irrelevant",
        explanation: "No rash or medication reaction pattern."
      }
    ],
    diagnosisOptions: [
      {
        id: "emergence_delirium",
        name: "Emergence delirium / post-anesthesia confusion",
        isCorrect: true,
        isDangerous: false,
        explanation: "PACU agitation after GA in pediatric patient with reassuring workup."
      },
      {
        id: "hypoglycemia",
        name: "Hypoglycemia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Normal glucose on testing."
      },
      {
        id: "stroke",
        name: "Stroke",
        isCorrect: false,
        isDangerous: true,
        explanation: "No focal neurologic deficit."
      }
    ],
    teachingPoints: [
      "Grading (100): Post-anesthesia timing 30, rule out neuro emergency 20, diagnosis 30, testing 20.",
      "Emergence delirium is common in young children after volatile anesthetics and ENT surgery.",
      "Check glucose and perform focused neuro exam to exclude emergencies.",
      "Supportive care: calm environment, parental presence, gentle reorientation.",
      "Avoid unnecessary head CT when presentation is classic and exam is non-focal."
    ]
  },
  {
    id: "post-intubation-airway-irritation",
    title: "My Throat Hurts and I Can't Stop Coughing",
    specialty: ANESTHESIA_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "Michael Chen, a 43-year-old sales manager, returns for follow-up one day after general anesthesia with persistent sore throat, dry cough, and hoarseness.",
    cardTeaser: "My throat has been killing me since surgery.",
    objectives: [
      "Link postoperative throat symptoms to recent endotracheal intubation.",
      "Distinguish expected irritation from stridor, infection, or cord injury.",
      "Avoid unnecessary testing when presentation is typical."
    ],
    patientPersona: {
      name: "Michael Chen",
      age: 43,
      gender: "Male",
      chiefComplaint: "My throat has been killing me since surgery.",
      background:
        "Sales manager who had laparoscopic surgery under general anesthesia yesterday with endotracheal intubation. Since waking he has sore throat, dry cough, and hoarse voice. No fever, chest pain, or trouble breathing. Symptoms are annoying but stable.",
      vitals: {
        heartRate: 74,
        bloodPressure: "118/76",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.5°F"
      },
      keyHistoryPoints: [
        "Surgery yesterday under general anesthesia with intubation",
        "Persistent sore throat and dry cough",
        "Mild hoarseness",
        "Throat irritation without dyspnea",
        "No fever",
        "No stridor on exam",
        "Lungs clear"
      ],
      redFlags: [
        "Stridor or dyspnea suggests airway edema or cord injury",
        "Fever with purulent pharyngitis suggests infection",
        "Progressive hoarseness >2 weeks warrants laryngoscopy"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Michael, a professional who is irritated but not panicked. Clear speech unless asked about voice — then sound hoarse.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say post-intubation trauma or laryngitis diagnosis.",
        "Mention intubation and GA when asked about surgery/anesthesia.",
        "Deny fever and breathing problems clearly."
      ],
      doNotRevealDirectly: [
        "post-intubation airway irritation",
        "vocal cord paralysis",
        "strep throat",
        "You need antibiotics"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Comfortable, no respiratory distress.",
        details:
          "Well-appearing man speaking in full sentences with mild hoarseness. No tripod positioning or accessory muscle use."
      },
      {
        id: "heent",
        label: "HEENT / Airway",
        summary: "Mild pharyngeal erythema; hoarse voice; no stridor.",
        details:
          "Oropharynx mildly erythematous without exudate or uvular swelling. Voice hoarse. No stridor audible at rest or with forced inspiration. No drooling."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear.",
        details: "Breath sounds clear bilaterally. No wheezes. Normal respiratory effort."
      }
    ],
    testOverrides: [
      {
        testId: "airway_exam",
        result:
          "Indirect inspection shows mild posterior pharyngeal erythema and edema consistent with recent intubation. No epiglottic swelling.",
        yield: "high"
      },
      {
        testId: "laryngoscopy",
        result:
          "Mild glottic and supraglottic erythema; vocal cords mobile bilaterally. No granuloma or paralysis.",
        yield: "helpful"
      },
      {
        testId: "cxr",
        result: "Clear lung fields. Normal mediastinum.",
        yield: "low"
      },
      {
        testId: "cbc",
        result: "Within normal limits. No leukocytosis.",
        yield: "low"
      },
      {
        testId: "covid",
        result: "Not indicated without infectious symptoms; would be low yield here.",
        yield: "inappropriate"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No pulmonary abnormality.",
      bedsideDefault: "Airway exam reassuring.",
      procedureDefault: "Laryngoscopy reserved if symptoms persist or stridor present."
    },
    finalDxId: "post_intubation_airway_irritation",
    requiredMustNotMiss: ["post_intubation_airway_irritation", "airway_edema"],
    dxOverrides: [
      {
        dxId: "post_intubation_airway_irritation",
        yield: "correct",
        explanation:
          "Hoarse voice, sore throat, and cough within 24 hours of intubation with mild pharyngeal erythema and mobile cords fits post-intubation irritation."
      },
      {
        dxId: "strep_pharyngitis",
        yield: "low",
        explanation: "No fever, exudate, or leukocytosis."
      },
      {
        dxId: "viral_uri",
        yield: "reasonable",
        explanation: "Possible coincidental URI, but timing immediately post-intubation is more specific."
      },
      {
        dxId: "vocal_cord_injury",
        yield: "dangerous-miss",
        explanation:
          "Consider if persistent severe hoarseness or aspiration; laryngoscopy here shows mobile cords."
      },
      {
        dxId: "airway_edema",
        yield: "dangerous-miss",
        explanation: "Would present with stridor or dyspnea; absent here."
      }
    ],
    diagnosisOptions: [
      {
        id: "post_intubation_airway_irritation",
        name: "Post-intubation airway irritation",
        isCorrect: true,
        isDangerous: false,
        explanation: "Typical postoperative sore throat and hoarseness after ETT."
      },
      {
        id: "strep_pharyngitis",
        name: "Strep throat",
        isCorrect: false,
        isDangerous: false,
        explanation: "No fever or exudate."
      },
      {
        id: "vocal_cord_injury",
        name: "Vocal cord injury",
        isCorrect: false,
        isDangerous: true,
        explanation: "Mobile cords on laryngoscopy; no aspiration."
      }
    ],
    teachingPoints: [
      "Grading (100): Intubation link 25, avoid unnecessary tests 20, diagnosis 35, history 20.",
      "Post-intubation sore throat and hoarseness are common and usually self-limited.",
      "Warn patients preoperatively; recommend voice rest and humidification.",
      "Stridor, drooling, or dyspnea require urgent airway evaluation.",
      "Laryngoscopy if symptoms persist beyond 2–3 weeks or worsen."
    ]
  }
];
