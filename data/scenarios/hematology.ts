import type { Scenario } from "@/data/scenarios";

const HEME_SPECIALTY = "Hematology" as const;

export const hematologyScenarios: Scenario[] = [
  {
    id: "heme-itp-olivia-easy-bruising",
    title: "I Bruise From Everything",
    specialty: HEME_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Olivia Grant, 17, develops easy bruising, gum bleeding, and epistaxis without trauma—isolated severe thrombocytopenia with normal coagulation screen suggests ITP before marrow evaluation.",
    cardTeaser: "I keep finding bruises everywhere.",
    objectives: [
      "Recognize mucocutaneous bleeding pattern with isolated thrombocytopenia.",
      "Order CBC with smear and coagulation studies to distinguish platelet disorders from coagulopathy.",
      "Differentiate ITP from leukemia, von Willebrand disease, DIC, and drug-induced thrombocytopenia.",
    ],
    patientPersona: {
      name: "Olivia Grant",
      age: 17,
      gender: "Female",
      chiefComplaint: "I keep finding bruises everywhere.",
      background:
        "Past three weeks purple blotches appear from nothing—backpack strap, volleyball block without real hit, even sleeping weird. Nosebleeds two mornings—bathroom looked like crime scene—plugged with tissue eventually. Gums pink toothbrush every night—freaks her out before homecoming weekend. No big injuries—no fever chills—energy fine actually. Period last week heavier than usual maybe—hard to compare. No family bruise disorder stories parents swear—brother roughhouser never sports these spots. No new prescriptions—occasional ibuprofen cramps—multivitamin gummy kid habit. Never transfused—no prior hospitalizations blood wise. Scared whisper asks if leukemia internet rabbit hole—voice cracks.",
      vitals: {
        heartRate: 88,
        bloodPressure: "112/68",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "Mucocutaneous bleeding without systemic infection",
        "Severe thrombocytopenia with normal PT/aPTT",
        "Splenomegaly absent on exam vignette",
        "No supporting DIC or pancytopenia on CBC pattern described",
      ],
      redFlags: [
        "GI or CNS bleeding with platelets critically low",
        "Fever with neutropenia suggesting alternate diagnosis",
        "Evidence of malignancy or marrow failure",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Drama-aware teenager—humor armor over fear; honest about bleeding when asked plainly.",
      behaviorRules: [
        "Do not say ITP or immune thrombocytopenia as self-diagnosis.",
        "Answer about periods nose gums bruises medications without naming leukemia definitively.",
      ],
      doNotRevealDirectly: [
        "I have ITP",
        "immune thrombocytopenic purpura",
        "my platelets are almost zero",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing teen; no acute distress beyond anxiety.",
        details:
          "Alert, conversant. No scleral icterus. No lymphadenopathy appreciated on limited neck exam.",
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Petechiae lower extremities; scattered ecchymoses varying ages.",
        details:
          "Non-palpable petechiae on anterior shins. Multiple ecchymoses on thighs and forearms without patterned trauma—colors range purple to yellow-green suggesting recurrent events.",
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Oropharynx without active bleeding; no scleral hemorrhage.",
        details:
          "Gingiva mildly friable on toothbrush friction simulation. Nares anterior without active bleed during exam.",
      },
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "CBC: platelets severely low; white blood cell count and hemoglobin within age-appropriate range—pattern suggests isolated thrombocytopenia pending smear.",
        yield: "high",
      },
      {
        testId: "peripheral_blood_smear",
        result:
          "Peripheral smear: thrombocytopenia with enlarged platelets noted; no blasts, no schistocyte pattern suggesting TMA—morphology compatible with destructive platelet process.",
        yield: "high",
      },
      {
        testId: "pt_inr",
        result: "PT/INR: within normal limits.",
        yield: "high",
      },
      {
        testId: "ptt_aptt",
        result: "aPTT: within normal limits—argues against isolated intrinsic coagulation factor deficiency as bleed mechanism.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CBC smear and directed coagulation screen stratify platelet versus factor disorders.",
      imagingDefault: "Imaging not central for isolated petechiae without mass symptoms.",
      bedsideDefault: "Bleeding time replaced by platelet count and clinical severity assessment.",
      procedureDefault: "Bone marrow biopsy not always required in classic youth ITP first presentation—specialist dependent.",
    },
    finalDxId: "immune_thrombocytopenic_purpura",
    requiredMustNotMiss: ["immune_thrombocytopenic_purpura", "acute_leukemia"],
    dxOverrides: [
      {
        dxId: "immune_thrombocytopenic_purpura",
        yield: "correct",
        explanation:
          "Isolated thrombocytopenia with mucocutaneous bleeding and normal coagulation supports ITP over consumptive coagulopathy.",
      },
      {
        dxId: "acute_leukemia",
        yield: "dangerous-miss",
        explanation: "Must exclude leukemia—here anemia and WBC pattern preserved on CBC making less likely but marrow concern if atypical.",
      },
      {
        dxId: "von_willebrand_disease",
        yield: "reasonable",
        explanation: "Mucosal bleeding overlap—often platelet function labs and factor assays needed when clinically suspected.",
      },
      {
        dxId: "drug_induced_thrombocytopenia",
        yield: "reasonable",
        explanation: "Review exposures temporal link—limited new meds in history but always re-ask.",
      },
      {
        dxId: "disseminated_intravascular_coagulation",
        yield: "low",
        explanation: "Expect prolonged PT/aPTT consumptive pattern and critical illness context—absent here.",
      },
    ],
    diagnosisOptions: [
      {
        id: "immune_thrombocytopenic_purpura",
        name: "Immune thrombocytopenic purpura (ITP)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Isolated thrombocytopenia with compatible bleeding and normal coagulation studies.",
      },
      {
        id: "acute_leukemia",
        name: "Acute leukemia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must consider with cytopenias or blasts—CBC pattern here isolates platelets primarily.",
      },
      {
        id: "von_willebrand_disease",
        name: "von Willebrand disease",
        isCorrect: false,
        isDangerous: false,
        explanation: "Bleeding disorder screen with factor activity vWF levels when mucosal bleeding prominent.",
      },
      {
        id: "drug_induced_thrombocytopenia",
        name: "Drug-induced thrombocytopenia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Temporal drug relationship and marrow recovery off agent—still in differential.",
      },
    ],
    teachingPoints: [
      "Grading (100): bleeding pattern recognition 30, CBC 25, platelet/coag clues 20, diagnosis 25.",
      "Normal PT/aPTT with severe mucocutaneous bleeding localizes toward platelet quantity/function over DIC consumptive pathway initially.",
      "Severity dictates observation steroids IVIG versus thrombopoietin agents per pediatric-adult guidelines.",
    ],
  },

  {
    id: "heme-iron-jessica-fatigue-sob",
    title: "I Feel Tired And Short Of Breath",
    specialty: HEME_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 11,
    description:
      "Jessica Khan, 34, a teacher with months of fatigue, exertional dyspnea, menorrhagia, and pica for ice—microcytic anemia with low ferritin indicates iron deficiency.",
    cardTeaser: "I've had no energy lately.",
    objectives: [
      "Link chronic blood loss menorrhagia with iron deficiency microcytosis.",
      "Order iron studies ferritin CBC and reticulocyte count.",
      "Differentiate IDA from thalassemia trait, anemia of chronic disease, hypothyroidism, and B12 deficiency.",
    ],
    patientPersona: {
      name: "Jessica Khan",
      age: 34,
      gender: "Female",
      chiefComplaint: "I've had no energy lately.",
      background:
        "Dragging through whole semester—stairs to third-floor classroom winded embarrassing—students notice she sits demonstrations now. Palpitations once grading papers—maybe coffee anxiety doubts. Periods brutal since copper IUD removed year ago—soaks super tampon couple hours worst days—clots quarter sometimes—ignored 'women tolerate' nonsense. Craves chewing ice—sound weird—freezer pellets during recess duty—boyfriend laughed until worried. Dizzy standing quick occasionally—no syncope. Weight stable—appetite okay—vegetarian-ish weekdays not strict. No GI blood toilet obvious—stools brown—no NSAID ulcer story. No transfusions. Mom anemia vague—details never translated from Urdu well. Takes prenatal leftover iron sporadically—gut upset quit.",
      vitals: {
        heartRate: 102,
        bloodPressure: "108/64",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.4°F",
      },
      keyHistoryPoints: [
        "Symptoms of anemia with compensatory tachycardia",
        "Heavy menstrual bleeding as iron loss",
        "Pica pagophagia clue",
        "Microcytosis hypochromia with low ferritin",
      ],
      redFlags: [
        "GI malignancy bleeding in older adults—age triggers colon evaluation pathways",
        "Heart failure with high-output symptoms",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Dedicated teacher minimizing until cornered—embarrassed about periods and ice craving.",
      behaviorRules: [
        "Do not declare iron deficiency anemia before clinician frames labs.",
        "Answer menstrual bleeding energy ice cravings when asked clearly.",
      ],
      doNotRevealDirectly: [
        "iron deficiency anemia",
        "my ferritin is probably low",
        "I need iron infusion for sure",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mild tachycardia; fatigued appearance; cooperative.",
        details:
          "Conjunctival pallor appreciated. Skin slightly pale—no jaundice. No petechiae rash.",
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Tachycardic regular rhythm; no murmur gallop appreciated quickly.",
        details:
          "Heart rate elevated for resting context. No obvious murmur Heard at urgent cadence—full valvular exam deferred but no loud blowing lesion.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Soft; no splenomegaly appreciated superficially.",
        details: "Non-tender. No hepatosplenomegaly on quick exam.",
      },
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "CBC: microcytic anemia with low MCV and MCH—hemoglobin reduced consistent with iron deficiency pattern pending iron studies.",
        yield: "high",
      },
      {
        testId: "iron_studies",
        result:
          "Iron studies: low serum iron, elevated TIBC—supportive of iron deficiency in appropriate clinical context.",
        yield: "high",
      },
      {
        testId: "ferritin",
        result: "Ferritin: low—consistent with depleted iron stores.",
        yield: "high",
      },
      {
        testId: "reticulocyte_count",
        result:
          "Reticulocyte count: inappropriately low for degree of anemia—marrow iron-limited erythropoiesis pattern.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Iron indices ferritin CBC retic index differentiate marrow failure from deficiency.",
      imagingDefault: "Endoscopy/colon evaluation guided by age risk bleeding symptoms.",
      bedsideDefault: "Orthostatics if symptomatic volume or syncope.",
      procedureDefault: "GI workup when menorrhagia insufficient to explain or alarm features.",
    },
    finalDxId: "iron_deficiency_anemia",
    requiredMustNotMiss: ["iron_deficiency_anemia"],
    dxOverrides: [
      {
        dxId: "iron_deficiency_anemia",
        yield: "correct",
        explanation:
          "Microcytic anemia heavy menses pica low ferritin and low iron studies support IDA.",
      },
      {
        dxId: "thalassemia_trait",
        yield: "reasonable",
        explanation: "Microcytosis with normal iron stores possible—family history MCV discordance prompts hemoglobin electrophoresis when unclear.",
      },
      {
        dxId: "anemia_chronic_disease",
        yield: "low",
        explanation: "Typically normocytic or high ferritin—inflammatory block—pattern here iron depleted.",
      },
      {
        dxId: "hypothyroidism",
        yield: "low",
        explanation: "Can cause fatigue macrocytosis or mixed—thyroid screen reasonable in fatigue anemia workup broadly.",
      },
      {
        dxId: "vitamin_b12_deficiency",
        yield: "low",
        explanation: "Macrocytic pattern typical—not primary morphology described in microcytic case.",
      },
    ],
    diagnosisOptions: [
      {
        id: "iron_deficiency_anemia",
        name: "Iron deficiency anemia",
        isCorrect: true,
        isDangerous: false,
        explanation: "Bleeding source plus iron labs and CBC morphology align.",
      },
      {
        id: "thalassemia_trait",
        name: "Thalassemia trait (minor)",
        isCorrect: false,
        isDangerous: false,
        explanation: "Consider when microcytosis with normal iron—electrophoresis clarifies.",
      },
      {
        id: "anemia_chronic_disease",
        name: "Anemia of chronic disease",
        isCorrect: false,
        isDangerous: false,
        explanation: "Iron availability block pattern not consistent with low ferritin here.",
      },
      {
        id: "vitamin_b12_deficiency",
        name: "Vitamin B12 deficiency",
        isCorrect: false,
        isDangerous: false,
        explanation: "Not primary microcytic driver in this vignette.",
      },
    ],
    teachingPoints: [
      "Grading (100): anemia symptoms 25, bleeding history 25, iron studies 25, diagnosis 25. Bonus: pica ice clue +10.",
      "Treat iron repletion and fix blood loss driver—evaluate GI sources per guidelines when indicated.",
      "Distinguish iron deficiency microcytosis from thalassemia trait with indices iron studies electrophoresis.",
    ],
  },

  {
    id: "heme-hodgkin-andrew-cervical-nodes",
    title: "My Neck Keeps Swelling",
    specialty: HEME_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Andrew Foster, 25, graduate student with progressive rubbery cervical lymphadenopathy, B symptoms, and mild splenomegaly—biopsy demonstrates Reed–Sternberg cells consistent with Hodgkin lymphoma.",
    cardTeaser: "I noticed lumps in my neck.",
    objectives: [
      "Recognize B symptoms with painless progressive lymphadenopathy in young adult.",
      "Obtain CBC inflammatory markers chest imaging and excisional lymph node biopsy.",
      "Differentiate Hodgkin lymphoma from infection tuberculosis NHL and leukemia.",
    ],
    patientPersona: {
      name: "Andrew Foster",
      age: 25,
      gender: "Male",
      chiefComplaint: "I noticed lumps in my neck.",
      background:
        "Left neck lump pea became grape over months—painless rubbery—roommate joked second Adam apple—stopped funny. Night sweats soak shirt couple weekly—weight down belt notch without trying—fatigue lectures blur. Low-grade fever thermometer 100.2 home sometimes—chills theater drama. No sore throat URI story—no cat scratch camping—grad school stress baseline high separates mood from disease maybe. Appetite ghost except wings cravings weird. HIV test senior year negative—no new exposures spoken aloud. No transfusions. Uncle lymphoma vague family grapevine—details unreliable. Ibuprofen finals—nothing exotic. Denies bleeding except razor nick normal.",
      vitals: {
        heartRate: 96,
        bloodPressure: "118/72",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "100.2°F",
      },
      keyHistoryPoints: [
        "Painless cervical lymphadenopathy progression",
        "B symptoms night sweats fever weight loss fatigue",
        "Mild splenomegaly on exam",
        "Biopsy Reed–Sternberg cells diagnostic Hodgkin",
      ],
      redFlags: [
        "Superior vena cava syndrome with mediastinal mass",
        "Neutropenic fever during chemotherapy—not presentation phase",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Grad-student intellect masking denial—jokes deflate worry until direct questions.",
      behaviorRules: [
        "Do not name Hodgkin lymphoma or cancer before clinician leads.",
        "Describe nodes sweats weight energy fevers openly when asked.",
      ],
      doNotRevealDirectly: [
        "Hodgkin lymphoma",
        "Reed-Sternberg",
        "I definitely have cancer",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Thin fatigued young man; low-grade fever in clinic.",
        details:
          "Appears mildly cachectic. Skin warm. No jaundice. Cooperative though anxious.",
      },
      {
        id: "lymph",
        label: "Lymph nodes",
        summary: "Bilateral cervical chains palpable—rubbery mobile left larger.",
        details:
          "Left cervical chain dominant 3 cm rubbery node without erythema suggesting acute infection. Right smaller palpable nodes. Supraclavicular area examined—no obvious Virchow node prominence.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild splenomegaly palpated deep inspiration.",
        details:
          "Spleen tip palpable below costal margin—moderate firmness. Liver edge not strikingly enlarged on quick exam.",
      },
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "CBC: mild normochromic anemia; leukocyte differential without circulating blasts on automated flags—platelets normal range.",
        yield: "helpful",
      },
      {
        testId: "esr_crp",
        result: "ESR and CRP both elevated—inflammatory or lymphoma-associated pattern—nonspecific.",
        yield: "helpful",
      },
      {
        testId: "cxr",
        result:
          "Chest radiograph: prominent mediastinal widening suggesting lymphadenopathy—correlate with CT if planned staging pathway.",
        yield: "high",
      },
      {
        testId: "lymph_node_biopsy",
        result:
          "Excisional lymph node biopsy: classic Hodgkin lymphoma with Reed–Sternberg cells in appropriate background—immunohistochemistry pending institutional panel.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CBC LDH inflammatory markers support but biopsy diagnoses lymphoma.",
      imagingDefault: "CT PET used for staging after diagnosis—CXR may screen mediastinal bulk.",
      bedsideDefault: "Document B symptoms and infection screening before chemotherapy.",
      procedureDefault: "Excisional biopsy preferred over fine needle when lymphoma suspected.",
    },
    finalDxId: "hodgkin_lymphoma",
    requiredMustNotMiss: ["hodgkin_lymphoma", "non_hodgkin_lymphoma"],
    dxOverrides: [
      {
        dxId: "hodgkin_lymphoma",
        yield: "correct",
        explanation:
          "Young adult painless progressive nodes B symptoms mediastinal concern biopsy Reed–Sternberg cells diagnostic.",
      },
      {
        dxId: "acute_viral_syndrome",
        yield: "reasonable",
        explanation: "Reactive nodes possible—months progression and systemic B symptoms less typical isolated viral.",
      },
      {
        dxId: "pulmonary_tuberculosis",
        yield: "reasonable",
        explanation: "Night sweats weight loss overlap—TB testing indicated broadly with risk review.",
      },
      {
        dxId: "non_hodgkin_lymphoma",
        yield: "reasonable",
        explanation: "Biopsy distinguishes Hodgkin from NHL immunophenotype.",
      },
      {
        dxId: "acute_leukemia",
        yield: "low",
        explanation: "Expect circulating blasts cytopenias often—pattern here lymph node led.",
      },
    ],
    diagnosisOptions: [
      {
        id: "hodgkin_lymphoma",
        name: "Hodgkin lymphoma",
        isCorrect: true,
        isDangerous: true,
        explanation: "Biopsy-proven classic Hodgkin with Reed–Sternberg cells.",
      },
      {
        id: "non_hodgkin_lymphoma",
        name: "Non-Hodgkin lymphoma",
        isCorrect: false,
        isDangerous: true,
        explanation: "Remains differential until histology classifies subtype.",
      },
      {
        id: "pulmonary_tuberculosis",
        name: "Pulmonary tuberculosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Consider in B symptoms—lymph node histology redirects.",
      },
      {
        id: "acute_viral_syndrome",
        name: "Acute viral syndrome",
        isCorrect: false,
        isDangerous: false,
        explanation: "Usually acute self-limited—months of nodes atypical alone.",
      },
    ],
    teachingPoints: [
      "Grading (100): B symptoms 30, biopsy 25, painless lymphadenopathy 20, diagnosis 25.",
      "Avoid corticosteroids before biopsy when lymphoma suspected—they distort architecture.",
      "Staging imaging and ABVD or PET-adapted therapy enter after path confirmation.",
    ],
  },

  {
    id: "heme-sickle-marcus-voc",
    title: "My Legs Hurt And I Feel Weak",
    specialty: HEME_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Marcus Johnson, 15, with known HbSS sickle cell disease—severe limb and back pain after dehydration at sports practice—smear and labs consistent with vaso-occlusive crisis.",
    cardTeaser: "My whole body hurts.",
    objectives: [
      "Recognize vaso-occlusive pain pattern in known sickle cell disease.",
      "Identify triggers dehydration exertion infection and support hydration analgesia exchange when indicated.",
      "Distinguish VOC from osteomyelitis trauma leukemia exacerbation acute viral illness.",
    ],
    patientPersona: {
      name: "Marcus Johnson",
      age: 15,
      gender: "Male",
      chiefComplaint: "My whole body hurts.",
      background:
        "Sickle cell SS since newborn screen—hydroxyurea couple years—sometimes pockets pills sorry mom angry. Football tryout stupid pride—hot day forgot water bottle—cramping calves graduated thighs low back vise—familiar devil worse wave. No fall collision—trainer iced denial—Uber here groaning. Low feverish maybe—thermometer blurry. Transfusion once age eight crisis—memories hospital smell. Sister trait carrier healthy—parents hover texts blowing phone. Took oxycodone leftover dental once—avoided since—ibuprofen today useless. Pee darker worried rhabdo googling—maybe dehydration drama.",
      vitals: {
        heartRate: 118,
        bloodPressure: "114/68",
        respiratoryRate: 18,
        oxygenSat: "96%",
        temperature: "99.8°F",
      },
      keyHistoryPoints: [
        "Known HbSS with typical pain crisis presentation",
        "Dehydration exertion trigger",
        "Hemolytic anemia baseline with reticulocytosis",
        "Smear sickle forms during stress hypoxia",
      ],
      redFlags: [
        "Acute chest syndrome",
        "Splenic sequestration in young children",
        "Stroke symptoms priapism",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Teen athlete pride bruised—fears disappointing coach; knows disease vocabulary but avoids melodrama.",
      behaviorRules: [
        "Do not self-label VOC acronym unless doctor frames sickle pain crisis language.",
        "Discuss triggers hydration pain distribution transfusion history plainly.",
      ],
      doNotRevealDirectly: [
        "vaso-occlusive crisis",
        "I'm having VOC for sure",
        "need exchange transfusion now",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Uncomfortable adolescent; mild tachycardia; diaphoretic.",
        details:
          "Distressed with pain. Difficulty finding comfortable position. Skin warm without focal cellulitis lesion.",
      },
      {
        id: "msk",
        label: "Musculoskeletal",
        summary: "Diffuse tenderness lower extremities and lumbar region without focal long bone focality.",
        details:
          "Guarding bilateral thighs and calves. Low back palpation reproduces severe pain. No obvious joint effusion. No open wounds.",
      },
      {
        id: "cardiopulmonary",
        label: "Cardiopulmonary",
        summary: "Lungs clear on quick auscultation; mild tachypnea from pain.",
        details: "SpO2 modestly reduced—repeat on room air consider acute chest evaluation if respiratory symptoms evolve.",
      },
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "CBC: hemoglobin near patient baseline for sickle cohort with mild drop possibly hemoconcentration mixed—reticulocyte count pending.",
        yield: "high",
      },
      {
        testId: "reticulocyte_count",
        result: "Reticulocyte count elevated—marrow erythroid response appropriate for hemolytic state.",
        yield: "helpful",
      },
      {
        testId: "peripheral_blood_smear",
        result:
          "Peripheral smear: sickle forms present—consistent with sickle cell disease acute presentation; target cells Howell-Jolly bodies may appear per splenic status.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CBC retic smear type screen BMP for renal baseline bilirubin hemolysis surveillance.",
      imagingDefault: "Radiographs MRI if focal bone infection suspected—VOC often no focal imaging requirement.",
      bedsideDefault: "IV fluids analgesia per protocol oxygen if hypoxic evaluate acute chest.",
      procedureDefault: "Simple or exchange transfusion for specific complications beyond uncomplicated VOC—specialist criteria.",
    },
    finalDxId: "sickle_cell_vaso_occlusive_crisis",
    requiredMustNotMiss: ["sickle_cell_vaso_occlusive_crisis", "osteomyelitis"],
    dxOverrides: [
      {
        dxId: "sickle_cell_vaso_occlusive_crisis",
        yield: "correct",
        explanation:
          "Known SS disease dehydration exertion typical multifocal bone pain with smear sickle morphology supports VOC.",
      },
      {
        dxId: "osteomyelitis",
        yield: "dangerous-miss",
        explanation: "Salmonella Staph risk in sickle—focal bone exam MRI if fever focality laboratory markers unclear.",
      },
      {
        dxId: "acute_viral_syndrome",
        yield: "reasonable",
        explanation: "Fever viral prodrome may trigger pain crisis overlapping evaluation.",
      },
      {
        dxId: "acute_leukemia",
        yield: "low",
        explanation: "Would expect cytopenia blasts history deviation—less consistent acutely.",
      },
      {
        dxId: "muscle_strain",
        yield: "low",
        explanation: "Diffuse bilateral bone pain without focal muscle tear story—trauma dismissed.",
      },
    ],
    diagnosisOptions: [
      {
        id: "sickle_cell_vaso_occlusive_crisis",
        name: "Sickle cell vaso-occlusive crisis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Typical pain crisis in HbSS after trigger with supportive lab pattern.",
      },
      {
        id: "osteomyelitis",
        name: "Osteomyelitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must consider with focal findings fever bacteremia—broader workup when suspected.",
      },
      {
        id: "acute_leukemia",
        name: "Acute leukemia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Unlikely acute presentation in known sickle without blast crisis elements.",
      },
      {
        id: "acute_viral_syndrome",
        name: "Acute viral syndrome",
        isCorrect: false,
        isDangerous: false,
        explanation: "Fever or viral prodrome can precipitate crisis—does not replace sickle pain as primary diagnosis in HbSS with typical features.",
      },
    ],
    teachingPoints: [
      "Grading (100): pain crisis recognition 30, trigger identification 20, hematology testing 25, diagnosis 25.",
      "Hydration opioid multimodal analgesia incentive spirometry monitor acute chest hypoxia.",
      "Low threshold for infection imaging when exam localizes or fever toxemia.",
    ],
  },

  {
    id: "heme-acute-leukemia-noah-infections",
    title: "I Keep Getting Fevers And Infections",
    specialty: HEME_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Noah Ellis, 9, has escalating infections fatigue bruising and bone pain—peripheral smear with blasts and pancytopenia plus marrow biopsy confirms acute leukemia.",
    cardTeaser: "He keeps getting sick.",
    objectives: [
      "Recognize marrow failure and blast signs recurrent infection bleeding pallor organomegaly.",
      "Obtain CBC peripheral smear and bone marrow evaluation urgently.",
      "Differentiate acute leukemia from viral illness aplastic anemia lymphoma marrow involvement and ITP pattern.",
    ],
    patientPersona: {
      name: "Noah Ellis",
      age: 9,
      gender: "Male",
      chiefComplaint: "He keeps getting sick.",
      background:
        "Mom voice answers intake—Noah slumps chair picking hoodie string—three ear pneumonias four months feels fraudulent exaggeration but documented. Fevers nights Tylenol dance. Pale substitute teacher asked sunscreen joke hurt feelings. Purple dots legs shower—thought allergic soap switched twice—still speckle. Shin bone ache wakens crying—Motrin kisses ritual. Energy cartoon abandon. Appetite ghost except mac cheese bites. One ER course pediatrician 'viral' frustration—antibiotics partial relief coinfection question. No transfusions yet—needle fear theater. Older brother asthma not blood stuff. Vaccines supposedly UTD—mom unsure flu mist year. Ibuprofen around—no herbal weirdness. Noah whispers worried 'am I dying' when mom steps bathroom—overheard hallway.",
      vitals: {
        heartRate: 124,
        bloodPressure: "98/60",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "101.3°F",
      },
      keyHistoryPoints: [
        "Recurrent serious infections pallor petechiae bone pain energy collapse",
        "Hepatosplenomegaly on exam",
        "Pancytopenia with circulating blasts",
        "Bone marrow acute leukemia confirmation",
      ],
      redFlags: [
        "Tumor lysis before therapy initiation",
        "Disseminated infection in neutropenic host",
        "CNS involvement evaluation in ALL pathways",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Nine-year-old quiet scared; mother supplements timeline—both should feel authentic.",
      behaviorRules: [
        "Do not say leukemia as family diagnosis—describe symptoms fears when asked.",
        "Noah answers kid-level symptom questions; mom clarifies infection timeline if prompted.",
      ],
      doNotRevealDirectly: [
        "acute leukemia",
        "I have cancer in my blood",
        "blasts everywhere",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Ill-appearing febrile child; pale; tearful with exam.",
        details:
          "Toxic-appearing but alert. Mom holds hand. Scleral pallor. Petechiae on lower extremities noted.",
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Petechiae bilateral legs; scattered bruises.",
        details:
          "Non-blanching petechiae on shins. Ecchymoses knees without remembered trauma.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Hepatosplenomegaly—liver and spleen palpable below costal margins.",
        details:
          "Firm enlarged liver edge 3 cm below costal margin. Spleen palpable with tip—mild tenderness diffuse from palpation in uncomfortable child.",
      },
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "CBC: pancytopenia with anemia thrombocytopenia and abnormal white cell population—automated flags for blast cells manual review urgent.",
        yield: "high",
      },
      {
        testId: "peripheral_blood_smear",
        result:
          "Peripheral smear: blasts noted—consistent with acute leukemia pending immunophenotyping and marrow confirmation; schistocytes not predominant.",
        yield: "high",
      },
      {
        testId: "bone_marrow_biopsy",
        result:
          "Bone marrow biopsy and aspirate: hypercellular marrow replaced by blast population—acute leukemia classification workup initiated (flow cytogenetics molecular per protocol).",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CBC smear BMP UA LDH uric acid for tumor lysis risk coagulation if bleeding.",
      imagingDefault: "CXR if respiratory infection concern CNS imaging per neurology symptoms.",
      bedsideDefault: "Neutropenic precautions broad antibiotics per febrile neutropenia protocols when applicable.",
      procedureDefault:
        "Central line planning and chemotherapy induction coordinated pediatric oncology emergently after diagnosis.",
    },
    finalDxId: "acute_leukemia",
    requiredMustNotMiss: ["acute_leukemia", "aplastic_anemia"],
    dxOverrides: [
      {
        dxId: "acute_leukemia",
        yield: "correct",
        explanation:
          "Pancytopenia blasts marrow infiltration infections bleeding bone pain and organomegaly fit acute leukemia.",
      },
      {
        dxId: "aplastic_anemia",
        yield: "dangerous-miss",
        explanation:
          "Pancytopenia without blasts alternative—marrow here blastic replacing marrow.",
      },
      {
        dxId: "acute_viral_syndrome",
        yield: "low",
        explanation: "Does not explain blasts marrow failure duration petechiae constellation.",
      },
      {
        dxId: "lymphoma",
        yield: "reasonable",
        explanation: "Marrow involvement can mimic—biopsy classification distinguishes.",
      },
      {
        dxId: "immune_thrombocytopenic_purpura",
        yield: "low",
        explanation: "Isolated thrombocytopenia pattern absent with blasts pancytopenia marrow replacement.",
      },
    ],
    diagnosisOptions: [
      {
        id: "acute_leukemia",
        name: "Acute leukemia",
        isCorrect: true,
        isDangerous: true,
        explanation: "Blasts on smear with pancytopenia and marrow confirmation.",
      },
      {
        id: "aplastic_anemia",
        name: "Aplastic anemia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Marrow failure without blasts—ruled out by marrow aspirate read here.",
      },
      {
        id: "lymphoma",
        name: "Lymphoma",
        isCorrect: false,
        isDangerous: true,
        explanation: "Can involve marrow—biopsy and flow separate Hodgkin/NHL from acute leukemia blasts.",
      },
      {
        id: "immune_thrombocytopenic_purpura",
        name: "Immune thrombocytopenic purpura (ITP)",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain blasts leukocytosis pattern marrow replacement by blasts.",
      },
    ],
    teachingPoints: [
      "Grading (100): marrow failure signs 30, CBC/smear 25, infection recurrence pattern 20, diagnosis 25.",
      "Pediatric acute leukemia induction is urgency with supportive care tumor lysis prophylaxis.",
      "Family communication child life ethics central line infection prevention education.",
    ],
  },
];
