import type { Scenario } from "@/data/scenarios";

const NEUROLOGY_SPECIALTY = "Neurology" as const;

export const neurologyScenarios: Scenario[] = [
  {
    id: "acute-stroke-face-feels-strange",
    title: "My Face Feels Strange",
    specialty: NEUROLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Charles Bennett, a 68-year-old retired mail carrier with hypertension and diabetes, presents to the ED 50 minutes after sudden right facial droop, right arm weakness, and slurred speech.",
    cardTeaser: "My face suddenly feels funny.",
    objectives: [
      "Recognize acute ischemic stroke as a time-critical emergency.",
      "Differentiate central facial weakness from Bell palsy and stroke mimics.",
      "Select emergent neuroimaging and vessel imaging when appropriate."
    ],
    patientPersona: {
      name: "Charles Bennett",
      age: 68,
      gender: "Male",
      chiefComplaint: "My face suddenly feels funny.",
      background:
        "Retired mail carrier — finished breakfast when the right side of his face went slack and words came out wrong. Right arm felt heavy lifting coffee cup. Wife called 911; no fall, no seizure, no head injury. Anxious but alert. Long-standing blood pressure and sugar issues — pills inconsistent.",
      vitals: {
        heartRate: 92,
        bloodPressure: "184/96",
        respiratoryRate: 18,
        oxygenSat: "98%",
        temperature: "98.7°F"
      },
      keyHistoryPoints: [
        "Sudden onset focal symptoms about 50 minutes prior",
        "Right facial droop and slurred speech per wife",
        "Right arm weakness and drift",
        "Hypertension and diabetes mellitus",
        "Non-contrast CT may be early negative",
        "MRI shows diffusion restriction; CTA suggests vessel occlusion"
      ],
      redFlags: [
        "Last known well time defines reperfusion eligibility",
        "ABC stroke screen — anticoagulation and glucose matter",
        "Large vessel occlusion may warrant thrombectomy pathways",
        "Rapid blood pressure management per protocol — not casual"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Charles, frightened but cooperative older man. Speech may be slightly slurred in longer answers.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say stroke, CVA, or thrombolysis.",
        "Describe facial droop and arm heaviness when asked weakness or face.",
        "Mention wife noticed speech when asked witness or speech."
      ],
      doNotRevealDirectly: [
        "ischemic stroke",
        "tPA",
        "large vessel occlusion",
        "this is Bell palsy only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Hypertensive, anxious, no acute distress from cardiorespiratory standpoint.",
        details:
          "Elderly man seated on stretcher. Alert. Mild expressive language difficulty — word-finding pauses."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Right facial droop, arm drift, dysarthria.",
        details:
          "Central-type right facial weakness with forehead sparing pattern difficult to fully assess verbally — lower face prominently affected. Right arm pronator drift. Slurred speech with effort; follows commands. No seizure activity witnessed in ED."
      }
    ],
    testOverrides: [
      {
        testId: "ct_head",
        result:
          "Non-contrast CT head: no hemorrhage. Early ischemic change subtle or not yet visible — does not exclude acute infarct within treatment window.",
        yield: "high"
      },
      {
        testId: "cta_head_neck",
        result:
          "CTA head and neck: findings concerning for intracranial large vessel thrombus — correlate clinically and with perfusion imaging if available.",
        yield: "high"
      },
      {
        testId: "mri_brain",
        result:
          "MRI brain with DWI: acute diffusion restriction in territory consistent with ischemic infarction.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC within normal limits — no infection mimicking stroke.",
        yield: "low"
      },
      {
        testId: "glucose",
        result: "Serum glucose not hypoglycemic — does not explain focal deficit.",
        yield: "helpful"
      },
      {
        testId: "fingerstick_glucose",
        result: "Point-of-care glucose within expected range — not a hypoglycemic mimic.",
        yield: "helpful"
      },
      {
        testId: "ecg",
        result: "ECG: rhythm without acute STEMI pattern; may show LV strain or prior infarct — secondary workup for cardioembolic risk in real practice.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs screen for mimics such as severe hypoglycemia or infection.",
      imagingDefault: "Non-contrast CT excludes hemorrhage before reperfusion decisions.",
      bedsideDefault: "NIHSS documentation and last known well time are critical.",
      procedureDefault: "Reperfusion therapy and stroke team activation per institutional protocol."
    },
    finalDxId: "stroke",
    requiredMustNotMiss: ["stroke", "hypoglycemia", "tia"],
    dxOverrides: [
      {
        dxId: "stroke",
        yield: "correct",
        explanation:
          "Sudden focal facial weakness, arm drift, and aphasia/dysarthria in a vascular risk patient with imaging showing acute infarction fit acute ischemic stroke."
      },
      {
        dxId: "bell_palsy",
        yield: "dangerous-miss",
        explanation:
          "Bell palsy is peripheral seventh nerve palsy — typically no arm weakness or aphasia; acute limb deficits and cortical speech localize centrally."
      },
      {
        dxId: "hypoglycemia",
        yield: "dangerous-miss",
        explanation: "Must rule out with glucose; normal glucose here with persistent focal signs points to stroke."
      },
      {
        dxId: "postictal_todd_paralysis",
        yield: "low",
        explanation: "No witnessed seizure or postictal confusion as predominant story; sudden maximal deficit at rest."
      },
      {
        dxId: "primary_brain_tumor",
        yield: "low",
        explanation: "Tumor usually subacute progressive; hyperacute onset favors vascular event."
      },
      {
        dxId: "tia",
        yield: "low",
        explanation: "TIA symptoms resolve — persisting exam findings exceed TIA by completion."
      }
    ],
    diagnosisOptions: [
      {
        id: "stroke",
        name: "Acute ischemic stroke",
        isCorrect: true,
        isDangerous: true,
        explanation: "Acute focal neuro deficit with infarction on MRI and vascular imaging concern."
      },
      {
        id: "bell_palsy",
        name: "Bell palsy",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain arm weakness and speech pattern with cortical signs."
      },
      {
        id: "tia",
        name: "Transient ischemic attack (TIA)",
        isCorrect: false,
        isDangerous: true,
        explanation: "Ongoing deficits — not transient."
      }
    ],
    teachingPoints: [
      "Grading (100): stroke recognition 35, sudden onset 20, emergent imaging 25, diagnosis 20. Bonus: thrombolysis/thrombectomy window (+10). Deductions: Bell palsy anchor only (-20), miss speech deficit (-15).",
      "Time last known well drives reperfusion decisions — activate stroke protocols early.",
      "Non-contrast CT primarily excludes hemorrhage; MRI DWI confirms infarct.",
      "Central facial weakness with limb or language involvement argues against isolated Bell palsy.",
      "Hypertension and diabetes are major modifiable stroke risks long term."
    ]
  },
  {
    id: "migraine-terrible-headaches-samantha",
    title: "I Keep Getting Terrible Headaches",
    specialty: NEUROLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Samantha Lee, a 24-year-old graduate student, describes disabling recurrent headaches for two years with visual aura, photophobia, and nausea; neuro exam normal between attacks.",
    cardTeaser: "My headaches completely shut me down.",
    objectives: [
      "Diagnose migraine with aura from history.",
      "Distinguish migraine from secondary headache red flags.",
      "Use targeted testing — neuro exam first; MRI when indicated."
    ],
    patientPersona: {
      name: "Samantha Lee",
      age: 24,
      gender: "Female",
      chiefComplaint: "My headaches completely shut me down.",
      background:
        "PhD statistics — stress high but headaches started before program. Every few weeks zigzag lights and blind spot expand over ten minutes then hammering one-sided throb. Nausea, can't stand light or sound — hides under quilt. Dark room and sleep eventually help. Between episodes feels normal. Roommate thinks she overreacts; professors don't get it.",
      vitals: {
        heartRate: 72,
        bloodPressure: "112/68",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.2°F"
      },
      keyHistoryPoints: [
        "Recurrent episodic headaches ~2 years",
        "Visual aura — flashing and scintillating before pain",
        "Photophobia, phonophobia, nausea",
        "Episodes last hours; improves with darkness and rest",
        "Normal examination between attacks",
        "MRI brain normal when obtained"
      ],
      redFlags: [
        "Thunderclap onset or worst-ever headache needs emergency workup",
        "New focal neuro signs or papilledema are not migraine until proven",
        "Immunosuppression or cancer changes imaging threshold"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Samantha — articulate, frustrated, a bit defensive when judged. Not dramatizing.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say migraine or aura diagnosis labels.",
        "Describe zigzag vision when asked vision or before headache.",
        "Light and sound sensitivity when asked what makes worse."
      ],
      doNotRevealDirectly: [
        "migraine with aura",
        "you need an MRI for a tumor for sure",
        "this is just anxiety"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well appearing, no distress today.",
        details: "Young woman in clinic between headache episodes. Conversant, normotensive."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Non-focal, symmetric.",
        details:
          "Mental status intact. Cranial nerves II–XII grossly intact — visual fields full by confrontation. Motor 5/5 throughout. Reflexes symmetric. Gait normal. No meningismus."
      }
    ],
    testOverrides: [
      {
        testId: "neurologic_exam_bedside",
        result:
          "Structured neuro exam between attacks: normal — supports primary headache diagnosis when classic history.",
        yield: "high"
      },
      {
        testId: "mri_brain",
        result:
          "MRI brain without contrast: no mass, hemorrhage, or structural lesion — reassuring in typical migraine presentation.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "CBC normal — no anemia or infection suggesting secondary cause for headache.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs low yield in typical episodic headache with aura.",
      imagingDefault: "MRI reserved for red flags or atypical features.",
      bedsideDefault: "Detailed headache diary and trigger identification help management.",
      procedureDefault: "Acute and preventive therapies chosen after diagnosis in real practice."
    },
    finalDxId: "migraine",
    requiredMustNotMiss: ["migraine", "subarachnoid_hemorrhage"],
    dxOverrides: [
      {
        dxId: "migraine",
        yield: "correct",
        explanation:
          "Recurrent episodic unilateral pounding headache with visual aura, nausea, and photophonophobia, normal exam between attacks, fits migraine with aura."
      },
      {
        dxId: "tension_headache",
        yield: "low",
        explanation: "Tension-type lacks prolonged visual aura and severe photophobia pattern typical here."
      },
      {
        dxId: "cluster_headache",
        yield: "low",
        explanation: "Cluster attacks are shorter with autonomic features — lacrimation and nasal congestion on one side."
      },
      {
        dxId: "primary_brain_tumor",
        yield: "dangerous-miss",
        explanation: "Must consider if progressive headaches or focal signs — MRI normal and stereotyped aura argues against."
      }
    ],
    diagnosisOptions: [
      {
        id: "migraine",
        name: "Migraine with aura",
        isCorrect: true,
        isDangerous: false,
        explanation: "Typical aura followed by migraine headache with associated symptoms."
      },
      {
        id: "tension_headache",
        name: "Tension-type headache",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain scintillating scotoma and vomiting-level attacks."
      },
      {
        id: "primary_brain_tumor",
        name: "Brain mass / tumor headache",
        isCorrect: false,
        isDangerous: true,
        explanation: "No progressive neuro deficit and imaging normal in this case."
      }
    ],
    teachingPoints: [
      "Grading (100): aura pattern 30, associated symptoms 25, history-based reasoning 20, diagnosis 25.",
      "Migraine aura is typically gradual, reversible, and stereotyped across attacks.",
      "MRI is not required for every classic primary migraine if neuro exam normal and no red flags.",
      "Secondary headache red flags include thunderclap onset, fever, focality, papilledema, cancer, age >50 new onset.",
      "Shared decision making on lifestyle, acute abortive, and prevention."
    ]
  },
  {
    id: "parkinson-hands-shaking-harold",
    title: "My Hands Keep Shaking",
    specialty: NEUROLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Harold Jacobs, a 72-year-old retired engineer, reports a year's progression of resting tremor, stiffness, slow movements, and masked facies; exam shows pill-rolling tremor, cogwheel rigidity, and shuffling gait.",
    cardTeaser: "My hand tremor keeps getting worse.",
    objectives: [
      "Recognize parkinsonism: tremor at rest, rigidity, bradykinesia.",
      "Differentiate Parkinson disease from essential tremor and drug-induced syndromes.",
      "Know role of DaTscan as supportive not standalone diagnosis."
    ],
    patientPersona: {
      name: "Harold Jacobs",
      age: 72,
      gender: "Male",
      chiefComplaint: "My hand tremor keeps getting worse.",
      background:
        "Engineer mind hates imprecision — right hand shakes parked in lap during TV news. Buttons torture him mornings. Walking smaller steps, wife says face stopped smiling like old days. No sudden stroke-like event. Metoclopramide years ago nausea cruise — not lately. No Wilson disease family nonsense he knows — adult kids fine.",
      vitals: {
        heartRate: 76,
        bloodPressure: "128/76",
        respiratoryRate: 14,
        oxygenSat: "98%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Gradual course over ~12 months",
        "Resting pill-rolling tremor, starting unilateral",
        "Bradykinesia — dressing slower",
        "Reduced facial expression per family",
        "Cogwheel rigidity and shuffling on exam",
        "DaTscan supportive of presynaptic dopaminergic deficit"
      ],
      redFlags: [
        "Early falls, rapid progression, or early dementia suggests atypical parkinsonism",
        "Symptoms purely unilateral with cortical signs need imaging",
        "Drug-induced parkinsonism from dopamine blockers reversible"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Harold — precise, slightly withdrawn speech, engineer details.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say Parkinson disease.",
        "Describe tremor at rest versus eating when asked.",
        "Mention micrographia or small steps only if asked writing or gait."
      ],
      doNotRevealDirectly: [
        "Parkinson",
        "L-DOPA",
        "DaTscan positive",
        "this is only essential tremor for sure"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mild hypomimia, normal vitals.",
        details: "Elderly man with reduced blink and facial animation. Normal orthostatics in sim."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Parkinsonian features.",
        details:
          "Resting 4–5 Hz tremor in right hand — pill-rolling. Increased tone with cogwheeling at right wrist. Bradykinesia on rapid alternating movements. Mild shuffling gait with reduced arm swing. No resting tremor in head typical of essential tremor."
      }
    ],
    testOverrides: [
      {
        testId: "neurologic_exam_bedside",
        result:
          "Detailed movement disorder exam: asymmetric resting tremor, rigidity, bradykinesia — parkinsonism clinically established.",
        yield: "high"
      },
      {
        testId: "dat_scan",
        result:
          "DaTscan: reduced tracer uptake in putamen bilaterally (asymmetric) — supportive of nigrostriatal degeneration as in idiopathic Parkinson disease — clinical correlation required.",
        yield: "high"
      },
      {
        testId: "mri_brain",
        result:
          "MRI brain: age-related changes without structural lesion explaining parkinsonism — does not substitute for clinical diagnosis.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Metabolic screens if atypical; ceruloplasmin if Wilson suspected young patient.",
      imagingDefault: "MRI to exclude vascular or normal-pressure hydrocephalus if atypical.",
      bedsideDefault: "Levodopa response trial guides diagnosis in practice.",
      procedureDefault: "Multidisciplinary care — PT, meds, advanced therapies later."
    },
    finalDxId: "parkinson_disease",
    requiredMustNotMiss: ["parkinson_disease", "medication_induced_tremor"],
    dxOverrides: [
      {
        dxId: "parkinson_disease",
        yield: "correct",
        explanation:
          "Asymmetric rest tremor, cogwheel rigidity, bradykinesia, postural gait change in older adult fits idiopathic Parkinson disease; DaTscan supportive."
      },
      {
        dxId: "essential_tremor",
        yield: "dangerous-miss",
        explanation:
          "Essential tremor is predominantly kinetic/postural, often bilateral hands and improves briefly with alcohol — not this resting pill-rolling pattern with rigidity."
      },
      {
        dxId: "medication_induced_tremor",
        yield: "reasonable",
        explanation:
          "Dopamine-blocking drugs cause parkinsonism — no recent exposure in history but always review meds."
      },
      {
        dxId: "stroke",
        yield: "low",
        explanation: "Sudden vascular event not described — gradual progressive course over a year."
      },
      {
        dxId: "wilson_disease",
        yield: "low",
        explanation: "Typical age and presentation not suggestive; young patients with liver/psychiatric features need screening."
      }
    ],
    diagnosisOptions: [
      {
        id: "parkinson_disease",
        name: "Parkinson disease",
        isCorrect: true,
        isDangerous: true,
        explanation: "Cardinal motor features of parkinsonism with supportive imaging."
      },
      {
        id: "essential_tremor",
        name: "Essential tremor",
        isCorrect: false,
        isDangerous: false,
        explanation: "Action tremor predominant without prominent rigidity expected."
      },
      {
        id: "medication_induced_tremor",
        name: "Medication-induced parkinsonism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must review dopamine-blocking drugs; not supported by recent exposure here."
      }
    ],
    teachingPoints: [
      "Grading (100): resting tremor 25, rigidity/bradykinesia 25, clinical synthesis 25, diagnosis 25.",
      "TRAP features — tremor at rest, rigidity, akinesia/bradykinesia, postural instability late.",
      "DaTscan distinguishes presynaptic parkinsonian syndromes from essential tremor in unclear cases.",
      "Neuroleptic and antiemetic exposure can mimic PD — reversible when drug stopped.",
      "Atypical features warrant MRI and consideration of progressive supranuclear palsy, MSA, Lewy body spectrum."
    ]
  },
  {
    id: "seizure-at-school-noah",
    title: "I Had a Seizure at School",
    specialty: NEUROLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 13,
    description:
      "Noah Patel, a 16-year-old high school student, is brought to the ED after witnessed generalized convulsive activity with postictal confusion and tongue bite; first seizure, afebrile.",
    cardTeaser: "I collapsed and people said I was shaking.",
    objectives: [
      "Identify generalized tonic-clonic seizure features versus syncope.",
      "Order glucose, labs, and EEG in first unprovoked seizure workup.",
      "Provide safety counseling and neurology follow-up."
    ],
    patientPersona: {
      name: "Noah Patel",
      age: 16,
      gender: "Male",
      chiefComplaint: "I collapsed and people said I was shaking.",
      background:
        "Junior varsity debate — morning assembly stiff standing, vision tunneled, woke on gym floor with bloody mouth bitter taste. Teachers said arms legs jerked both sides couple minutes. Didn't pee pants friend confirms embarrassed separately. Foggy hour — names fuzzy. Never happened before. No drugs girlfriend would kill, denies booze yesterday. No sick fever.",
      vitals: {
        heartRate: 114,
        bloodPressure: "122/74",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "98.9°F"
      },
      keyHistoryPoints: [
        "Witnessed bilateral tonic-clonic movements",
        "Loss of consciousness",
        "Postictal confusion and fatigue",
        "Lateral tongue laceration",
        "First lifetime event, no fever",
        "EEG with generalized epileptiform discharges",
        "Labs and CT unrevealing for acute alternative"
      ],
      redFlags: [
        "Status epilepticus requires emergent treatment algorithm",
        "Sepsis, eclampsia, trauma, or intracranial bleed are must-not-miss if context fits",
        "Driving restrictions and bathtub drowning risk counseling matter"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Noah — teenage mix of shame and bravado. Short sentences postictal tired.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say seizure or epilepsy diagnosis outright.",
        "Describe shaking and confusion when asked what happened.",
        "Deny fever when asked infection."
      ],
      doNotRevealDirectly: [
        "generalized tonic-clonic seizure",
        "epilepsy",
        "start keppra now",
        "this was just vasovagal"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Postictal fatigue; mild oral trauma.",
        details: "Tired adolescent, cooperative. Heart tachycardic resolving. Lateral tongue bite with mild bleeding controlled."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Non-focal post-event.",
        details:
          "Mental status near baseline except mild slowing. Cranial nerves intact. Motor symmetric. No persistent Todd paralysis on repeat exam."
      }
    ],
    testOverrides: [
      {
        testId: "fingerstick_glucose",
        result: "Point-of-care glucose normal — rules out hypoglycemic seizure mimic acutely.",
        yield: "high"
      },
      {
        testId: "glucose",
        result: "Serum glucose normal.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP: electrolytes and renal function within normal limits — no hyponatremic trigger identified.",
        yield: "helpful"
      },
      {
        testId: "ct_head",
        result:
          "CT head without contrast: no hemorrhage, mass, or acute infarct — first unprovoked seizure workup may still need MRI outpatient per guidelines.",
        yield: "high"
      },
      {
        testId: "eeg",
        result:
          "EEG: generalized spike-and-wave or polyspike discharges — consistent with epileptiform activity supporting generalized epilepsy syndrome workup.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC normal — no leukocytosis suggesting infection as trigger.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Evaluate metabolic and toxic triggers in first seizure ED visit.",
      imagingDefault: "Emergent CT if trauma, immunocompromise, or focal deficit; MRI epilepsy protocol often outpatient.",
      bedsideDefault: "Observational period monitors recurrence.",
      procedureDefault: "ASMs considered after risk stratification with neurology."
    },
    finalDxId: "generalized_tonic_clonic_seizure",
    requiredMustNotMiss: ["generalized_tonic_clonic_seizure", "hypoglycemia"],
    dxOverrides: [
      {
        dxId: "generalized_tonic_clonic_seizure",
        yield: "correct",
        explanation:
          "Witnessed bilateral convulsive activity with LOC, tongue bite, postictal confusion, and EEG epileptiform activity supports new-onset generalized tonic-clonic seizure."
      },
      {
        dxId: "vasovagal_syncope",
        yield: "dangerous-miss",
        explanation:
          "Syncope may have brief jerks but prolonged symmetric convulsion and tongue lateral bite favor seizure over simple faint."
      },
      {
        dxId: "hypoglycemia",
        yield: "dangerous-miss",
        explanation: "Essential to rule out — glucose normal in this case."
      },
      {
        dxId: "toxic_ingestion",
        yield: "reasonable",
        explanation: "Stimulant or toxin can provoke seizure — history and toxicology contextual."
      },
      {
        dxId: "cardiac_arrhythmia",
        yield: "low",
        explanation: "Cardiac syncope less consistent with prolonged convulsive phase and tongue trauma."
      }
    ],
    diagnosisOptions: [
      {
        id: "generalized_tonic_clonic_seizure",
        name: "New-onset generalized tonic-clonic seizure",
        isCorrect: true,
        isDangerous: true,
        explanation: "Witnessed convulsion with postictal state and EEG correlation."
      },
      {
        id: "vasovagal_syncope",
        name: "Vasovagal syncope",
        isCorrect: false,
        isDangerous: true,
        explanation: "Typical syncope is brief LOC without sustained convulsive activity and lateral tongue bite."
      },
      {
        id: "hypoglycemia",
        name: "Hypoglycemic seizure",
        isCorrect: false,
        isDangerous: true,
        explanation: "Glucose testing is normal here."
      }
    ],
    teachingPoints: [
      "Grading (100): seizure features 30, EEG 25, postictal recognition 20, diagnosis 25.",
      "Provoked vs unprovoked first seizure changes recurrence risk and workup depth.",
      "Lateral tongue bite is more specific for seizure than syncope though not universal.",
      "EEG helps classify epilepsy type — MRI brain often follows in teenagers with first unprovoked seizure.",
      "Counsel on safety: no driving per local law, showers with supervision, sleep deprivation triggers."
    ]
  },
  {
    id: "ms-vision-legs-relapsing-rachel",
    title: "My Vision Gets Weird and My Legs Feel Weak",
    specialty: NEUROLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Rachel Simmons, a 28-year-old graphic designer, reports relapsing episodes of monocular visual blur and leg weakness with sensory symptoms over months; exam shows hyperreflexia and MRI shows demyelinating plaques with CSF oligoclonal bands.",
    cardTeaser: "My symptoms come and go.",
    objectives: [
      "Recognize relapsing-remitting multiple sclerosis pattern.",
      "Connect optic neuritis-type visual symptoms with disseminated CNS lesions.",
      "Interpret MRI and CSF oligoclonal bands in demyelinating disease workup."
    ],
    patientPersona: {
      name: "Rachel Simmons",
      age: 28,
      gender: "Female",
      chiefComplaint: "My symptoms come and go.",
      background:
        "Remote work — first episode winter: left colors dull through one eye ache with eye movement, faded weeks. Spring right leg dragged stairs numb below knee. Now tingling returns when tired. Never lost bowel bladder. Thought carpal tunnel copy-paste job — ortho said weird. No prior neurologic diagnosis. Aunt lupus — scares her. Energy crashes afternoon — coffee only partial fix.",
      vitals: {
        heartRate: 78,
        bloodPressure: "118/74",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.3°F"
      },
      keyHistoryPoints: [
        "Relapsing sensory-motor episodes over months",
        "Monocular visual disturbance with pain on eye movement — past episode",
        "Partial improvement between flares — not static",
        "Hyperreflexia and mild gait imbalance on exam",
        "MRI shows periventricular/juxtacortical demyelinating plaques",
        "CSF oligoclonal bands positive"
      ],
      redFlags: [
        "Cord compression with bladder dysfunction needs emergency MRI",
        "Acute neuromyelitis optica spectrum presents differently — aquaporin-4 antibody context",
        "Progressive multifocal leukoencephalopathy in immunosuppression"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Rachel — visual creative, anxious, tracks symptom timing carefully.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say multiple sclerosis or MS.",
        "Describe blur and color washout when asked vision.",
        "Leg numbness and weakness when asked walking or weakness."
      ],
      doNotRevealDirectly: [
        "multiple sclerosis",
        "McDonald criteria",
        "start copaxone",
        "this is vitamin B12 only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Young woman, mild fatigue.",
        details: "Alert, conversation fluent. No acute distress."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Hyperreflexia, sensory attenuation, gait imbalance.",
        details:
          "Bilateral brisk patellas, mild impairment pinprick left leg distally. Rhomberg equivocal. Gait shows mild wide-based stance on tandem attempt. Upper extremities strong."
      }
    ],
    testOverrides: [
      {
        testId: "mri_brain",
        result:
          "MRI brain with contrast: multiple periventricular and juxtacortical white matter lesions perpendicular to ventricles — morphology typical for demyelination; some lesions enhance with gadolinium suggest acute inflammation.",
        yield: "high"
      },
      {
        testId: "mri_spine",
        result:
          "MRI cervical spine: demyelinating plaques in spinal cord consistent with dissemination in space — clinical correlation.",
        yield: "high"
      },
      {
        testId: "lumbar_puncture",
        result:
          "CSF: elevated IgG index with oligoclonal bands positive — intrathecal IgG synthesis supportive of multiple sclerosis diagnosis when paired with clinical and MRI criteria.",
        yield: "high"
      },
      {
        testId: "visual_evoked_potentials",
        result:
          "VEP: prolonged P100 latency in one eye — prior optic pathway demyelination consistent with remote optic neuritis.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "B12, thyroid, ANA may exclude mimics depending on presentation.",
      imagingDefault: "Brain and spine MRI define dissemination in space and time.",
      bedsideDefault: "Document objective findings in each relapse for DMT decisions.",
      procedureDefault: "High-efficacy vs platform therapy per shared decision making."
    },
    finalDxId: "multiple_sclerosis",
    requiredMustNotMiss: ["multiple_sclerosis", "stroke", "systemic_lupus_erythematosus"],
    dxOverrides: [
      {
        dxId: "multiple_sclerosis",
        yield: "correct",
        explanation:
          "Relapsing neurologic episodes in young woman with optic pathway symptoms, MRI demyelinating lesions disseminated in CNS, and CSF oligoclonal bands support relapsing MS."
      },
      {
        dxId: "stroke",
        yield: "dangerous-miss",
        explanation:
          "Stroke can cause focal deficit but not typical relapsing remitting multi-site course over months without fixed vascular territory on imaging described."
      },
      {
        dxId: "systemic_lupus_erythematosus",
        yield: "reasonable",
        explanation:
          "CNS lupus can mimic demyelination — serology and systemic features differentiate; consider if rash and arthritis dominate."
      },
      {
        dxId: "peripheral_neuropathy",
        yield: "low",
        explanation: "Length-dependent neuropathy does not explain monocular visual episodes and cord plaques."
      },
      {
        dxId: "vitamin_b12_deficiency",
        yield: "reasonable",
        explanation: "B12 deficiency can cause cord and neuro symptoms — check levels in demyelination workup."
      }
    ],
    diagnosisOptions: [
      {
        id: "multiple_sclerosis",
        name: "Multiple sclerosis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Disseminated demyelination on MRI with CSF oligoclonal bands and relapsing clinical course."
      },
      {
        id: "stroke",
        name: "Stroke",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain relapsing multiphasic symptoms and demyelinating plaque pattern."
      },
      {
        id: "systemic_lupus_erythematosus",
        name: "Systemic lupus erythematosus (CNS)",
        isCorrect: false,
        isDangerous: true,
        explanation: "Possible mimic — MS pattern with typical lesions and OCBs better fit MS here."
      }
    ],
    teachingPoints: [
      "Grading (100): relapsing pattern 30, MRI 25, visual pathway clues 20, diagnosis 25. Bonus: optic neuritis history (+10).",
      "Dissemination in time and space — clinical, MRI, and sometimes CSF.",
      "Optic neuritis presents with subacute monocular vision loss and pain with eye movement.",
      "VEP can document prior optic pathway demyelination.",
      "Always consider mimics: NMO spectrum, ADEM, sarcoid, vascular, nutritional."
    ]
  }
];
