import type { Scenario } from "@/data/scenarios";

const GER_SPECIALTY = "Geriatrics" as const;

export const geriatricsScenarios: Scenario[] = [
  {
    id: "geriatrics-delirium-uti-margaret-russo",
    title: "Grandma Has Been More Confused Today",
    specialty: GER_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    description:
      "Margaret Russo, an 84-year-old retired teacher, is brought to the ED by family for acute confusion, urinary symptoms, and low-grade fever.",
    cardTeaser: "I'm not sure why everyone is fussing — I just feel tired and foggy.",
    objectives: [
      "Recognize delirium as an acute change from baseline in an older adult.",
      "Use caregiver collateral history and screen for infection, especially UTI.",
      "Order targeted labs and imaging while prioritizing reversible causes and safety.",
    ],
    patientPersona: {
      name: "Margaret Russo",
      age: 84,
      gender: "Female",
      chiefComplaint: 'Her daughter: "She\'s acting completely different."',
      background:
        "Retired elementary teacher, lives alone and usually manages her own medications and bills. Today she is disoriented, intermittently sleepy, and her speech wanders. Daughter Carla reports this started today; over the past few days Margaret has been going to the bathroom more often and complains of urgency. No falls or head trauma. Setting: emergency department.",
      vitals: {
        heartRate: 108,
        bloodPressure: "104/62",
        respiratoryRate: 20,
        oxygenSat: "97% on room air",
        temperature: "100.8°F",
      },
      medicationList: ["Lisinopril", "Metformin", "Calcium supplements"],
      baselineFunctionalStatus:
        "Prior to today: independent with all ADLs and most IADLs, still drives locally, walks without an assistive device, and shops on her own.",
      cognitiveBaseline:
        "Baseline: fully oriented, no prior diagnosis of dementia; family says she was sharp on the phone three days ago.",
      keyHistoryPoints: [
        "Acute confusional change today vs baseline",
        "Collateral history: talking strangely, sleepier, not herself",
        "Several days of urinary frequency and urgency",
        "Low-grade fever and tachycardia; blood pressure on the low-normal side",
        "Suprapubic tenderness on exam without focal neuro deficits",
        "UA with leukocyte esterase and nitrites; CBC with leukocytosis",
      ],
      redFlags: [
        "Acute altered mental status in an older adult (stroke and sepsis must be considered)",
        "Hypotension or hemodynamic instability would escalate urgency",
        "New focal neurologic deficits would change the workup",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Margaret is foggy, polite, and a bit frustrated. She loses track of details and may contradict herself. Carla (daughter) sounds worried when relevant.",
      behaviorRules: [
        "Answer as Margaret unless the doctor clearly asks what family noticed; then you may speak briefly as Carla about observations.",
        "Do NOT name delirium, UTI, or infection as a diagnosis.",
        "Show uncertainty about time and exact sequence because of confusion.",
      ],
      doNotRevealDirectly: [
        "delirium",
        "UTI",
        "urinary tract infection",
        "You have sepsis",
        "It is definitely a stroke",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Ill-appearing, acutely confused; low-grade fever.",
        details:
          "Elderly woman appears fatigued and intermittently drowsy but arousable. Not in acute respiratory distress. Warm to touch.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild suprapubic tenderness.",
        details:
          "Soft abdomen with mild suprapubic tenderness. No guarding or rebound. Bowel sounds present.",
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Disoriented; non-focal strength and sensation.",
        details:
          "Disoriented to date and place; person intact. CN II–XII grossly intact. Motor 5/5 bilaterally without lateralizing findings. No clear focal deficit on screening exam.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result:
          "Positive leukocyte esterase and nitrites; WBC esterase activity elevated. Many WBCs on microscopy. Bacteriuria consistent with urinary tract infection.",
        yield: "high",
      },
      {
        testId: "cbc",
        result:
          "Leukocytosis with neutrophil predominance (WBC about 15 K/uL). Hemoglobin and platelets within acceptable range for age.",
        yield: "high",
      },
      {
        testId: "cmp",
        result:
          "Creatinine at upper baseline for age; glucose not severely elevated. Electrolytes without dramatic derangement.",
        yield: "helpful",
      },
      {
        testId: "ct_head",
        result:
          "No acute hemorrhage or large territorial infarct. Chronic small vessel changes and age-related volume loss without a new mass lesion.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CBC and metabolic panel help assess infection and organ function.",
      imagingDefault: "CT head often used in acute confusion to exclude hemorrhagic stroke or mass.",
      bedsideDefault: "Orthostatic vitals and infection-focused exam may clarify contributors.",
      procedureDefault: "Urinalysis and culture are central when UTI is suspected.",
    },
    finalDxId: "delirium_secondary_to_uti",
    requiredMustNotMiss: ["stroke", "delirium_secondary_to_uti", "dehydration"],
    dxOverrides: [
      {
        dxId: "delirium_secondary_to_uti",
        yield: "correct",
        explanation:
          "Acute confusion with infection-compatible UA, leukocytosis, urinary symptoms, and exam tenderness fits delirium precipitated by UTI in an older adult.",
      },
      {
        dxId: "stroke",
        yield: "dangerous-miss",
        explanation: "Must be considered with acute AMS; nonfocal exam and CT without acute infarct lowers immediate probability but vigilance remains.",
      },
      {
        dxId: "alzheimer_disease",
        yield: "low",
        explanation: "Typically insidious; here the change is acute with systemic and urinary findings pointing away from pure degenerative dementia today.",
      },
      {
        dxId: "medication_related_confusion",
        yield: "reasonable",
        explanation: "Polypharmacy always merits review, but infection data strongly supports an organic precipitant.",
      },
      {
        dxId: "dehydration",
        yield: "reasonable",
        explanation: "Can contribute to delirium, but UA and leukocytosis argue a urinary source is driving much of the presentation.",
      },
    ],
    diagnosisOptions: [
      {
        id: "delirium_secondary_to_uti",
        name: "Delirium secondary to urinary tract infection",
        isCorrect: true,
        isDangerous: false,
        explanation: "Acute AMS with UTI evidence and supporting systemic findings.",
      },
      {
        id: "stroke",
        name: "Ischemic stroke",
        isCorrect: false,
        isDangerous: true,
        explanation: "Consider in acute AMS; nonfocal exam and CT imaging pattern are less typical for dominant presentation.",
      },
      {
        id: "alzheimer_disease",
        name: "Alzheimer disease",
        isCorrect: false,
        isDangerous: false,
        explanation: "Wrong tempo for today; collateral history emphasizes acute change.",
      },
      {
        id: "medication_related_confusion",
        name: "Medication-related confusion",
        isCorrect: false,
        isDangerous: false,
        explanation: "Possible contributor but infection workup is positive.",
      },
    ],
    teachingPoints: [
      "Grading (100): Acute change from baseline 30, collateral history 25, infection-focused workup (UA/CBC/CMP context) 20, synthesis/diagnosis 25.",
      "Delirium is a medical emergency pattern: find and treat precipitants (infection, meds, metabolic, pain, constipation, environment).",
      "Anticholinergic and sedating medications can worsen confusion; review polypharmacy after stabilization.",
      "Fall risk rises with confusion and hypotension; reassess mobility and safety before discharge.",
    ],
  },
  {
    id: "geriatrics-alzheimer-harold-green",
    title: "Dad Keeps Forgetting Things",
    specialty: GER_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 13,
    description:
      "Harold Green, a 76-year-old retired accountant, is evaluated in memory clinic for progressive memory problems reported by his son.",
    cardTeaser: "I forget where I put things — maybe I'm just stressed.",
    objectives: [
      "Elicit a progressive cognitive-history pattern and functional decline.",
      "Assess ADLs/IADLs and behavioral changes with collateral history.",
      "Order a reversible-dementia workup and document objective cognitive impairment.",
    ],
    patientPersona: {
      name: "Harold Green",
      age: 76,
      gender: "Male",
      chiefComplaint: 'His son: "He repeats the same things constantly."',
      background:
        "Retired accountant who initially lived fully independently. Over roughly two years he has mislaid keys and glasses, repeats questions and stories, and needed help with taxes and online banking. Son Daniel accompanies him; Harold minimizes some deficits. No sudden onset, no witnessed seizure, no stepwise strokes. Setting: memory clinic.",
      vitals: {
        heartRate: 72,
        bloodPressure: "128/78",
        respiratoryRate: 16,
        oxygenSat: "98% on room air",
        temperature: "98.2°F",
      },
      medicationList: ["Atorvastatin", "Amlodipine"],
      baselineFunctionalStatus:
        "Two years ago: independent with ADLs/IADLs, managed complex finances and medications. Now: needs prompting and help with bills, shopping, and organizing medications.",
      cognitiveBaseline:
        "Previously sharp with numbers and memory for appointments; now short-term memory is clearly worse per family and testing.",
      keyHistoryPoints: [
        "Gradual progressive memory decline over two years",
        "Repetition, misplacing items, difficulty managing finances",
        "Collateral history from son with examples",
        "MMSE shows impairment for education level",
        "MRI shows generalized atrophy disproportionate to age expectations",
        "TSH and B12 not pointing to reversible causes",
      ],
      redFlags: [
        "Rapid progression, early prominent visual hallucinations, or marked fluctuation would suggest alternate diagnoses",
        "Gait changes early in the course can broaden the differential",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Harold is cooperative, slightly defensive, jokes to cover embarrassment. Daniel is earnest and concrete about examples.",
      behaviorRules: [
        "Do not say Alzheimer disease or dementia as a definitive label.",
        "Provide progressive timeline details only when asked.",
        "Daniel may clarify behaviors Harold underreports when family is addressed directly.",
      ],
      doNotRevealDirectly: [
        "Alzheimer",
        "dementia diagnosis",
        "You have Alzheimer's",
        "MRI shows Alzheimer",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-nourished, comfortable, normal affect.",
        details:
          "Appears stated age, in no distress. Conversational but occasionally tangential.",
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Short-term memory deficits; otherwise nonfocal.",
        details:
          "CN grossly intact. Motor symmetric. Gait normal with good cadence. Montreal-style recall impaired on office testing; mild short-term memory lapses in conversation.",
      },
    ],
    testOverrides: [
      {
        testId: "mmse",
        result:
          "Score consistent with cognitive impairment for his prior educational level (multiple errors in orientation, recall, and attention tasks).",
        yield: "high",
      },
      {
        testId: "mri_brain",
        result:
          "Generalized cerebral volume loss and widened sulci/ventricles beyond typical aging. No acute infarct. Non-specific chronic small vessel changes.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "Within normal limits; no anemia pattern explaining cognition.",
        yield: "low",
      },
      {
        testId: "tsh",
        result: "Euthyroid.",
        yield: "helpful",
      },
      {
        testId: "serum_b12",
        result: "Normal vitamin B12 level.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Reversible causes include B12, thyroid, and metabolic contributors.",
      imagingDefault: "MRI supports neurodegenerative pattern but does not replace history.",
      bedsideDefault: "Office cognitive screens quantify impairment.",
      procedureDefault: "LP not routinely indicated on this presentation.",
    },
    finalDxId: "alzheimer_disease",
    requiredMustNotMiss: ["alzheimer_disease", "depression", "vitamin_b12_deficiency"],
    dxOverrides: [
      {
        dxId: "alzheimer_disease",
        yield: "correct",
        explanation:
          "Insidious progressive episodic memory impairment with ADL decline, objective cognitive testing impairment, and supporting MRI pattern fits Alzheimer disease.",
      },
      {
        dxId: "vascular_dementia",
        yield: "reasonable",
        explanation: "Consider with vascular risk, but course lacks clear stepwise events and focal signs here.",
      },
      {
        dxId: "depression",
        yield: "reasonable",
        explanation: "Pseudodementia can mimic; mood and motivation need attention, but two-year progressive pattern and imaging favor neurodegeneration.",
      },
      {
        dxId: "vitamin_b12_deficiency",
        yield: "low",
        explanation: "Reversible cause excluded with normal B12 in this case.",
      },
    ],
    diagnosisOptions: [
      {
        id: "alzheimer_disease",
        name: "Alzheimer disease",
        isCorrect: true,
        isDangerous: false,
        explanation: "Progressive amnestic syndrome with functional decline and objective testing.",
      },
      {
        id: "vascular_dementia",
        name: "Vascular dementia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Possible comorbidity but not the best single explanation for this course.",
      },
      {
        id: "depression",
        name: "Major depressive disorder (pseudodementia pattern)",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must screen; chronic progressive cognitive decline makes this less likely as the sole driver.",
      },
      {
        id: "vitamin_b12_deficiency",
        name: "Vitamin B12 deficiency",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important to rule out; labs are normal here.",
      },
    ],
    teachingPoints: [
      "Grading (100): Progressive decline pattern 30, ADL/IADL impact 20, reversible workup (B12, TSH, labs) 25, diagnosis synthesis 25.",
      "Collateral history is essential when insight is limited; ask for specific examples (finances, medication errors, getting lost).",
      "Discuss driving safety, advance care planning, and caregiver strain in geriatric follow-up.",
      "Polypharmacy review: avoid anticholinergics and unnecessary sedatives that worsen cognition.",
    ],
  },
  {
    id: "geriatrics-orthostatic-falls-richard-bennett",
    title: "I Fell Again Last Night",
    specialty: GER_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Richard Bennett, an 82-year-old retired postal worker with hypertension and BPH, reports recurrent dizziness on standing and multiple recent falls after antihypertensive intensification.",
    cardTeaser: "I get dizzy when I stand up — I've stumbled a few times.",
    objectives: [
      "Link symptoms to orthostatic blood pressure change and medication burden.",
      "Quantify fall history, injury risk, and gait safety.",
      "Use orthostatic vitals and ECG while considering competing causes.",
    ],
    patientPersona: {
      name: "Richard Bennett",
      age: 82,
      gender: "Male",
      chiefComplaint: "I keep getting dizzy.",
      background:
        "Retired postal worker who walks with a cane for knee arthritis but usually gets around his apartment. Over three months he has had several falls without passing out. Dizziness is worst within a minute of standing. His clinic recently increased hydrochlorothiazide and he takes metoprolol and tamsulosin for blood pressure and urinary symptoms. Nurses documented orthostatic readings today. Setting: outpatient geriatrics clinic.",
      vitals: {
        heartRate: 78,
        bloodPressure: "142/80 (supine); 108/64 (standing at 3 minutes, clinic)",
        respiratoryRate: 16,
        oxygenSat: "96% on room air",
        temperature: "98.0°F",
      },
      medicationList: ["Hydrochlorothiazide", "Metoprolol", "Tamsulosin"],
      baselineFunctionalStatus:
        "Three months ago: ambulated independently with a cane indoors; showered alone. Now: more cautious, sometimes grasps walls after standing; daughter worries when he is alone evenings.",
      cognitiveBaseline:
        "Baseline cognition intact; he manages pillboxes with a labeled organizer and follows conversations normally.",
      keyHistoryPoints: [
        "Recurrent falls over three months",
        "Lightheadedness with positional change, no LOC",
        "Recent antihypertensive intensification plus beta-blocker and alpha blocker",
        "Documented orthostatic blood pressure drop (supine vs standing)",
        "Mild gait instability on exam",
      ],
      redFlags: [
        "Syncope with prolonged QT or arrhythmia must be considered",
        "Focal deficits or stair-step neuro changes suggest alternate etiologies",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Matter-of-fact, a bit embarrassed about falls, downplays near-syncope.",
      behaviorRules: [
        "Do not label orthostatic hypotension as the definitive diagnosis.",
        "Offer orthostatic symptom details when asked about timing with standing.",
      ],
      doNotRevealDirectly: [
        "orthostatic hypotension",
        "your medications are causing this",
        "stop all BP meds",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Comfortable supine; slower to stabilize when upright.",
        details:
          "No acute distress. When standing, reports dizziness and reaches for the exam table briefly.",
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Mild gait instability; nonfocal.",
        details:
          "CN intact. Strength symmetric. Romberg not formally needed to detect obvious unsteadiness with narrow base gait; mild instability turning.",
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Regular rate; no murmur appreciated.",
        details: "Heart sounds regular. No obvious volume overload. Orthostatic vitals documented by staff.",
      },
    ],
    testOverrides: [
      {
        testId: "orthostatic_vitals",
        result:
          "Supine BP about 142/80; after standing 3 minutes BP about 108/64 with symptomatic lightheadedness — meets orthostatic hypotension pattern.",
        yield: "high",
      },
      {
        testId: "ecg",
        result: "Sinus rhythm without acute ischemic ST changes; QT appears within typical limits on machine read.",
        yield: "helpful",
      },
      {
        testId: "cbc",
        result: "Mild normocytic indices without anemia explaining symptoms.",
        yield: "low",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CBC may help if bleeding or anemia suspected.",
      imagingDefault: "Brain imaging not required unless focal neuro signs.",
      bedsideDefault: "Orthostatic measurements are the core diagnostic step.",
      procedureDefault: "No procedure indicated in-clinic.",
    },
    finalDxId: "orthostatic_hypotension",
    requiredMustNotMiss: ["orthostatic_hypotension", "stroke", "cardiac_arrhythmia"],
    dxOverrides: [
      {
        dxId: "orthostatic_hypotension",
        yield: "correct",
        explanation:
          "Symptomatic standing blood pressure drop after antihypertensive intensification with recurrent pre-syncopal falls fits orthostatic hypotension.",
      },
      {
        dxId: "cardiac_arrhythmia",
        yield: "reasonable",
        explanation: "Consider if palpitations, syncope, or ECG abnormality—ECG here reassuring but not exhaustive.",
      },
      {
        dxId: "stroke",
        yield: "low",
        explanation: "No focal deficits or sudden isolated neuro event pattern.",
      },
      {
        dxId: "benign_paroxysmal_positional_vertigo",
        yield: "low",
        explanation: "Brief spinning vertigo with head turns is less consistent than dizziness on standing.",
      },
      {
        dxId: "dehydration",
        yield: "reasonable",
        explanation: "Volume depletion can worsen orthostasis; assess intake and concurrent illness.",
      },
    ],
    diagnosisOptions: [
      {
        id: "orthostatic_hypotension",
        name: "Orthostatic hypotension with recurrent falls",
        isCorrect: true,
        isDangerous: false,
        explanation: "Positional symptoms with measured BP fall and medication context.",
      },
      {
        id: "cardiac_arrhythmia",
        name: "Cardiac arrhythmia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important to exclude with syncope; less supported by positional pattern.",
      },
      {
        id: "stroke",
        name: "Ischemic stroke",
        isCorrect: false,
        isDangerous: true,
        explanation: "Not supported without focal findings.",
      },
      {
        id: "benign_paroxysmal_positional_vertigo",
        name: "Benign paroxysmal positional vertigo",
        isCorrect: false,
        isDangerous: false,
        explanation: "Positional vertigo differs from orthostatic presyncope here.",
      },
    ],
    teachingPoints: [
      "Grading (100): Medication and polypharmacy risk 30, orthostatic vitals 25, falls and function 20, diagnosis 25.",
      "Alpha blockers, diuretics, and beta blockers can synergize; deprescribing or dose adjustment needs goals-of-care BP targets.",
      "Fall mitigation: home safety, lighting, footwear, PT, bone health, and vision review.",
      "Reassess standing BP after medication changes; educate slow orthostatic maneuvers.",
    ],
  },
  {
    id: "geriatrics-failure-thrive-dorothy-mitchell",
    title: "I Haven't Been Eating Much",
    specialty: GER_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Dorothy Mitchell, an 88-year-old retired librarian with polypharmacy, presents with unintentional weight loss, poor intake, and weakness. Her granddaughter is very concerned.",
    cardTeaser: "I just don't have an appetite like I used to.",
    objectives: [
      "Recognize failure to thrive as a geriatric syndrome with multidimensional contributors.",
      "Assess nutrition, mood, cognition, swallowing, and chronic disease burden.",
      "Use targeted labs, screening tools, and functional metrics to build a care plan.",
    ],
    patientPersona: {
      name: "Dorothy Mitchell",
      age: 88,
      gender: "Female",
      chiefComplaint: 'Her granddaughter: "She\'s lost a lot of weight."',
      background:
        "Lives alone in a walk-up apartment. Was active in her book club until a few months ago. Progressive weight loss without trying, appetite down, feels weak and moves less. Denies abdominal pain. Takes multiple medications for chronic conditions (full list in chart). Granddaughter Priya has been bringing groceries and notices clothes fitting loosely. Setting: geriatric clinic.",
      vitals: {
        heartRate: 102,
        bloodPressure: "108/62",
        respiratoryRate: 18,
        oxygenSat: "97% on room air",
        temperature: "98.4°F",
      },
      medicationList: [
        "Furosemide 20 mg daily",
        "Metoprolol succinate 50 mg daily",
        "Omeprazole 20 mg daily",
        "Levothyroxine 75 mcg daily",
        "Acetaminophen as needed",
        "Over-the-counter sleep aid (diphenhydramine) some nights",
      ],
      baselineFunctionalStatus:
        "Six months ago: walked two blocks to the library, cooked daily, managed stairs slowly but steadily. Now: naps more, struggles carrying groceries, showers less often from fatigue, uses more handrails.",
      cognitiveBaseline:
        "Mild forgetfulness long-standing but able to manage bills until recently; granddaughter wonders if she skips meals because she forgets.",
      keyHistoryPoints: [
        "Unintentional weight loss and anorexia without abdominal pain",
        "Functional decline, weakness, less mobility",
        "Polypharmacy including sedating OTC use",
        "Low albumin on CMP",
        "MNA-SF suggests high malnutrition risk; PHQ-9 shows mild depressive symptoms",
      ],
      redFlags: [
        "Occult malignancy remains on differential until appropriate evaluation",
        "Unintentional weight loss with focal abdominal findings would warrant targeted imaging",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Soft-spoken, minimizes problems, tired. Priya is polite but firm about observable weight change.",
      behaviorRules: [
        "Do not announce cancer or malnutrition syndromes as final diagnoses.",
        "Discuss eating, mood, and walking when prompted.",
      ],
      doNotRevealDirectly: [
        "failure to thrive",
        "you have cancer",
        "severe malnutrition",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Frail appearance; chronologic vs physiologic age mismatch.",
        details:
          "Thin habitus, clothes loose at waist. Appears fatigued but alert. No jaundice on brief survey.",
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Muscle wasting without edema.",
        details:
          "Temporal and shoulder girdle wasting noted. Grip feels reduced symmetrically. No pitting edema.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Benign abdomen.",
        details: "Soft, non-tender, no masses palpated on limited exam.",
      },
    ],
    testOverrides: [
      {
        testId: "cbc",
        result: "Mild normocytic anemia; otherwise no acute leukemia pattern.",
        yield: "helpful",
      },
      {
        testId: "cmp",
        result:
          "Albumin low (about 2.9 g/dL). Creatinine stable. Electrolytes generally acceptable; glucose not severely deranged.",
        yield: "high",
      },
      {
        testId: "phq9",
        result:
          "Score suggests mild depression with prominent anhedonia and low energy contributing to intake.",
        yield: "helpful",
      },
      {
        testId: "serum_albumin",
        result: "Low albumin consistent with nutritional stress or inflammation pattern in context.",
        yield: "high",
      },
      {
        testId: "mna_short_form",
        result:
          "MNA-SF in malnutrition risk range: significant weight loss, decreased food intake, and reduced mobility on screen.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CMP/CBC highlight protein-calorie deficit and comorbid contributors.",
      imagingDefault: "Directed imaging if red-flag symptoms develop.",
      bedsideDefault: "Nutrition and mood screens structure rehabilitation and supports.",
      procedureDefault: "Consider swallow evaluation if aspiration clues emerge.",
    },
    finalDxId: "geriatric_failure_to_thrive",
    requiredMustNotMiss: ["geriatric_failure_to_thrive", "colon_cancer", "depression"],
    dxOverrides: [
      {
        dxId: "geriatric_failure_to_thrive",
        yield: "correct",
        explanation:
          "Multifactorial weight loss, functional decline, low albumin, and screening results fit failure to thrive / geriatric malnutrition syndrome.",
      },
      {
        dxId: "colon_cancer",
        yield: "dangerous-miss",
        explanation: "Must remain in differential for unintentional weight loss; age-appropriate evaluation plans follow risk and symptoms.",
      },
      {
        dxId: "depression",
        yield: "reasonable",
        explanation: "Contributes to intake and energy; integrated management matters even when not sole etiology.",
      },
      {
        dxId: "vascular_dementia",
        yield: "low",
        explanation: "Could impair meal preparation but does not alone explain albumin and rapid weight trajectory.",
      },
      {
        dxId: "anemia_chronic_disease",
        yield: "low",
        explanation: "May coexist; not the unifying syndrome name for global decline here.",
      },
    ],
    diagnosisOptions: [
      {
        id: "geriatric_failure_to_thrive",
        name: "Failure to thrive / geriatric malnutrition",
        isCorrect: true,
        isDangerous: false,
        explanation: "Syndrome of declining nutrition, function, and reserve.",
      },
      {
        id: "colon_cancer",
        name: "Colon cancer",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must consider in weight loss; additional workup driven by risk and findings.",
      },
      {
        id: "depression",
        name: "Major depressive disorder",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important comorbid driver of appetite; screen shows symptoms.",
      },
      {
        id: "vascular_dementia",
        name: "Vascular dementia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Possible contributor to function but not primary unifying diagnosis.",
      },
    ],
    teachingPoints: [
      "Grading (100): Geriatric syndrome recognition 30, nutrition assessment 20, functional impact 25, diagnosis synthesis 25.",
      "Review polypharmacy: diuretics affecting intake, PPIs, sedating antihistamines, and drug–drug interactions.",
      "Address social determinants: meals, transportation, caregiver burden, and advanced care preferences.",
      "Strength training and protein targets can parallel medical optimization.",
    ],
  },
  {
    id: "geriatrics-stroke-eleanor-foster",
    title: "I Suddenly Can't Move My Arm",
    specialty: GER_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 15,
    description:
      "Eleanor Foster, an 81-year-old former nurse on warfarin, presents to the ED with sudden focal deficits. Family witnessed abrupt face droop and arm weakness.",
    cardTeaser: "My right arm feels heavy — my words won't come out right.",
    objectives: [
      "Recognize acute ischemic stroke signs and activate time-sensitive pathways.",
      "Clarify symptom onset timing and anticoagulation status.",
      "Obtain emergent neuroimaging and anticoagulation labs while coordinating care.",
    ],
    patientPersona: {
      name: "Eleanor Foster",
      age: 81,
      gender: "Female",
      chiefComplaint: 'Her daughter: "Her face suddenly drooped."',
      background:
        "Retired nurse, lives with daughter after minor hip strain last year. While talking at breakfast she suddenly slurred speech, right face drooped, and could not lift her right arm well. Symptom onset about 45 minutes before arrival. No headache like the worst of her life. On warfarin for prior atrial fibrillation. Setting: emergency department.",
      vitals: {
        heartRate: 92,
        bloodPressure: "188/96",
        respiratoryRate: 18,
        oxygenSat: "95% on room air",
        temperature: "98.6°F",
      },
      medicationList: ["Warfarin", "Metoprolol"],
      baselineFunctionalStatus:
        "Baseline: independent with ADLs, walked with occasional cane outdoors after hip recovery, prepared simple meals.",
      cognitiveBaseline:
        "Baseline: fully oriented, no memory clinic history; very medication-savvy given nursing background until this event.",
      keyHistoryPoints: [
        "Sudden focal deficits: facial droop, right arm weakness, dysarthria",
        "Witnessed onset about 45 minutes prior",
        "Hypertension in triage; on warfarin",
        "Exam shows cortical/localizing pattern",
        "CT shows early ischemic change; CTA supports large vessel consideration; elevated INR context for therapy decisions",
      ],
      redFlags: [
        "Anticoagulation complicates reperfusion decisions—team-based protocols required",
        "Rapid deterioration or herniation signs demand escalation",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Frightened but tries to stay professional; speech effortful, frustration visible.",
      behaviorRules: [
        "Do not say stroke definitively as the patient.",
        "Provide time-last-known-well details when asked.",
      ],
      doNotRevealDirectly: [
        "tPA",
        "thrombolysis",
        "you are having a stroke",
        "clot buster",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Distressed, hypertensive, dysarthric.",
        details:
          "Appears anxious, follows commands inconsistently when stressed. Blood pressure elevated. Face asymmetric.",
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Left hemispheric pattern: face/arm > leg involvement.",
        details:
          "Right facial droop (central pattern). Right arm drift and weakness. Dysarthria. Visual fields grossly intact to confrontation. No seizure activity witnessed.",
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Irregularly irregular rhythm suspected; rate controlled.",
        details:
          "Pulse irregular. No murmur focused on in acute setting; monitor rhythm.",
      },
    ],
    testOverrides: [
      {
        testId: "ct_head",
        result:
          "Early ischemic changes in left MCA territory without hemorrhage on non-contrast CT. ASPECTS interpretation left to stroke team. No mass effect.",
        yield: "high",
      },
      {
        testId: "cta_head_neck",
        result:
          "Large vessel occlusion concern in left MCA segment correlating with deficits—stroke team notification documented.",
        yield: "high",
      },
      {
        testId: "mri_brain",
        result:
          "If obtained: diffusion restriction in left MCA distribution consistent with acute infarct (timing and logistics facility-dependent).",
        yield: "high",
      },
      {
        testId: "pt_inr",
        result:
          "INR elevated into anticoagulated range for warfarin; impacts reperfusion eligibility per protocol.",
        yield: "high",
      },
      {
        testId: "fingerstick_glucose",
        result: "Point-of-care glucose normal; hypoglycemia excluded as mimic.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Coagulation studies and glucose are part of emergent stroke evaluation.",
      imagingDefault: "Non-contrast CT and vascular imaging guide acute management.",
      bedsideDefault: "ABCs, neuro checks, blood pressure goals per protocol.",
      procedureDefault: "Reperfusion therapies per institutional pathway.",
    },
    finalDxId: "stroke",
    requiredMustNotMiss: ["stroke", "hypoglycemia", "bell_palsy"],
    dxOverrides: [
      {
        dxId: "stroke",
        yield: "correct",
        explanation:
          "Sudden focal face/arm deficits with early ischemic imaging pattern and vascular imaging findings support acute ischemic stroke.",
      },
      {
        dxId: "tia",
        yield: "low",
        explanation: "Deficits persist at evaluation; not TIA by typical definitions at this moment.",
      },
      {
        dxId: "bell_palsy",
        yield: "low",
        explanation: "Does not explain arm weakness or speech pattern in isolation.",
      },
      {
        dxId: "hypoglycemia",
        yield: "dangerous-miss",
        explanation: "Always exclude; normal glucose here.",
      },
    ],
    diagnosisOptions: [
      {
        id: "stroke",
        name: "Acute ischemic stroke (elderly patient, anticoagulated)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Time-sensitive focal neuro deficits with confirmatory imaging pattern.",
      },
      {
        id: "tia",
        name: "Transient ischemic attack",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely while deficits continue.",
      },
      {
        id: "bell_palsy",
        name: "Bell palsy",
        isCorrect: false,
        isDangerous: false,
        explanation: "Facial nerve palsy without limb weakness is a different pattern.",
      },
      {
        id: "hypoglycemia",
        name: "Hypoglycemia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Mimic excluded with normal glucose.",
      },
    ],
    teachingPoints: [
      "Grading (100): Stroke recognition 35, timing / last-known-well 20, emergent imaging and coags 20, diagnosis 25.",
      "Geriatric-specific complexity: frailty, fall risk after event, medication interactions, and heightened bleeding risk on anticoagulation.",
      "Post-acute planning: rehab, dysphagia screening, caregiver training, and secondary prevention adherence.",
      "Medication review: anticoagulation strategy transitions should be coordinated—never change warfarin ad hoc without protocol.",
    ],
  },
];
