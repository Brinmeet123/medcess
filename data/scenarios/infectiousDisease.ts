import type { Scenario } from "@/data/scenarios";

const INFECTIOUS_DISEASE_SPECIALTY = "Infectious Disease" as const;

export const infectiousDiseaseScenarios: Scenario[] = [
  {
    id: "sepsis-pyelo-shaking-lauren-mitchell",
    title: "I Can't Stop Shaking",
    specialty: INFECTIOUS_DISEASE_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Lauren Mitchell, a 43-year-old accountant, presents with rigors, high fever, dysuria, flank pain, and shock physiology concerning for urosepsis from pyelonephritis.",
    cardTeaser: "I've been shaking and feel terrible.",
    objectives: [
      "Recognize sepsis with likely urinary source from history and exam.",
      "Order lactate, blood cultures, and urinalysis early.",
      "Differentiate pyelonephritis from uncomplicated cystitis and non-infectious mimics."
    ],
    patientPersona: {
      name: "Lauren Mitchell",
      age: 43,
      gender: "Female",
      chiefComplaint: "I've been shaking and feel terrible.",
      background:
        "Tax season stress — two days burning urine frequency ignored stupid. Chills started muggy basement laundry yesterday — today shaking so hard teeth chatter wife wrapped blankets useless. Flank ache like punched kidney either side confused. Nausea sips water dizzy standing. No travel no hospital recent.",
      vitals: {
        heartRate: 132,
        bloodPressure: "88/54",
        respiratoryRate: 26,
        oxygenSat: "95%",
        temperature: "103.1°F"
      },
      keyHistoryPoints: [
        "Fever and rigors acute worsening",
        "Dysuria urgency pyuria history",
        "Costovertebral angle tenderness",
        "Hypotension tachycardia suggesting septic shock physiology",
        "Elevated lactate and leukocytosis",
        "Urine nitrites leukocytes; blood and urine cultures positive E. coli pattern"
      ],
      redFlags: [
        "Hypotension despite fluids mandates aggressive resuscitation and source control planning",
        "Sterile pyuria does not exclude infection if partially treated",
        "Emphysematous pyelonephritis and obstruction require imaging escalation"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Lauren — exhausted, shakes in voice, accountant precision cracking.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say sepsis or pyelonephritis.",
        "Describe flank pain and burning urine when asked urinary symptoms.",
        "Rigors when asked chills shaking."
      ],
      doNotRevealDirectly: [
        "you are in septic shock",
        "E. coli bacteremia",
        "start antibiotics immediately per protocol",
        "this is just anxiety"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Ill-appearing; rigors; delayed capillary refill.",
        details:
          "Toxic appearance, dry mucous membranes, tachypnea. Capillary refill delayed beyond three seconds."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "CVA tenderness; mild suprapubic discomfort.",
        details:
          "Right greater than left costovertebral angle percussion tenderness. Soft bowel sounds. No rigidity."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result: "CBC: leukocytosis with left shift — WBC 19 K/µL.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP: acute kidney injury pattern with creatinine elevated from baseline — prerenal component likely.",
        yield: "helpful"
      },
      {
        testId: "serum_lactate",
        result: "Serum lactate elevated — 3.8 mmol/L — consistent with tissue hypoperfusion.",
        yield: "high"
      },
      {
        testId: "blood_culture",
        result: "Blood cultures positive for Gram-negative rods — consistent with E. coli bacteremia after speciation.",
        yield: "high"
      },
      {
        testId: "ua",
        result: "Urinalysis: positive leukocyte esterase and nitrites; many WBCs and bacteria.",
        yield: "high"
      },
      {
        testId: "urine_culture",
        result: "Urine culture: Escherichia coli — susceptible pending full sensitivities.",
        yield: "high"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Lactate guides perfusion; cultures before antibiotics if delay avoidable but do not postpone antibiotics for unstable patients in real practice.",
      imagingDefault: "Renal ultrasound or CT if concern for obstruction or abscess.",
      bedsideDefault: "Fluid resuscitation and frequent reassessment of perfusion.",
      procedureDefault: "Consider source control if obstructive uropathy."
    },
    finalDxId: "sepsis_secondary_pyelonephritis",
    requiredMustNotMiss: ["sepsis_secondary_pyelonephritis", "sepsis", "kidney_stone"],
    dxOverrides: [
      {
        dxId: "sepsis_secondary_pyelonephritis",
        yield: "correct",
        explanation:
          "Fever, CVA tenderness, urinary findings, bacteremia, and shock physiology localize infection to pyelonephritis with systemic sepsis."
      },
      {
        dxId: "uti",
        yield: "low",
        explanation:
          "Uncomplicated cystitis does not explain hypotension lactate and flank tenderness severity."
      },
      {
        dxId: "kidney_stone",
        yield: "dangerous-miss",
        explanation:
          "Obstructive uropathy can coexist — imaging when fever with colic but urinary infection signs dominate here."
      },
      {
        dxId: "influenza",
        yield: "low",
        explanation: "Influenza lacks pyuria and CVA tenderness pattern with uropathogen bacteremia."
      },
      {
        dxId: "gastroenteritis",
        yield: "low",
        explanation: "Prominent urinary symptoms and urine microscopy contradict isolated gastroenteritis."
      },
      {
        dxId: "appendicitis",
        yield: "low",
        explanation: "RLQ focal syndrome absent; urinary source demonstrated."
      }
    ],
    diagnosisOptions: [
      {
        id: "sepsis_secondary_pyelonephritis",
        name: "Sepsis secondary to pyelonephritis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Bacteremic urosepsis with upper tract exam and laboratory evidence."
      },
      {
        id: "uti",
        name: "Uncomplicated urinary tract infection",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain shock physiology and systemic findings."
      },
      {
        id: "kidney_stone",
        name: "Nephrolithiasis",
        isCorrect: false,
        isDangerous: true,
        explanation: "May coexist but infection with positive cultures drives presentation."
      }
    ],
    teachingPoints: [
      "Grading (100): sepsis recognition 30, urinary source 25, cultures and lactate 20, diagnosis 25. Hypotension bonus +10. Miss flank pain -15.",
      "qSOFA and SOFA frameworks contextualize organ dysfunction beyond SIRS language.",
      "Blood cultures and urine culture guide therapy in bacteremic pyelonephritis.",
      "Obstructive uropathy with infection is a urologic emergency until decompressed.",
      "Early antibiotics and fluids reduce mortality — cultures should not indefinitely delay treatment when unstable."
    ]
  },
  {
    id: "endocarditis-fever-michael-perez",
    title: "This Fever Just Won't Go Away",
    specialty: INFECTIOUS_DISEASE_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Michael Perez, a 36-year-old construction worker with IV drug use, has weeks of fevers, B-symptoms, new murmur, and peripheral stigmata with bacteremia and valvular vegetation on echocardiography.",
    cardTeaser: "I've had fevers for weeks.",
    objectives: [
      "Suspect infective endocarditis in prolonged fever with risk factors.",
      "Obtain multiple blood cultures before antibiotics when stable enough.",
      "Use Duke criteria thinking — echo and microbiology central."
    ],
    patientPersona: {
      name: "Michael Perez",
      age: 36,
      gender: "Male",
      chiefComplaint: "I've had fevers for weeks.",
      background:
        "Fevers ride roller coaster month — sometimes 99 denial macho sometimes soaked sheets night sweats. Lost belt notch weight not trying. Ribs winded stairs job usually easy — lungs scratchy cough sometimes. Nail splinters noticed shower mirror detective. Arm veins scar embarrassed construction buddies joke — heroin stretch truth shrink patient honesty. Denies dentist cleaning recently.",
      vitals: {
        heartRate: 112,
        bloodPressure: "118/70",
        respiratoryRate: 18,
        oxygenSat: "97%",
        temperature: "101.2°F"
      },
      keyHistoryPoints: [
        "Fevers and night sweats weeks",
        "Unintentional weight loss fatigue",
        "IV drug use risk",
        "New cardiac murmur and splinter hemorrhages",
        "Blood cultures positive",
        "Echocardiography vegetation"
      ],
      redFlags: [
        "Acute valve regurgitation hemodynamic collapse requires emergent surgery consultation",
        "Septic emboli to brain spleen kidneys broaden workup",
        "Methicillin-resistant organisms change empiric therapy"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Michael — guarded about drug use initially, worker roughness softens when scared.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say endocarditis.",
        "Admit needle risk when asked substance honestly pressed.",
        "Splinters nails when asked skin hands."
      ],
      doNotRevealDirectly: [
        "infective endocarditis",
        "Duke criteria",
        "vegetation",
        "this is only viral flu"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Chronic illness appearance; low-grade fever.",
        details: "Temporal wasting subtle. Diaphoresis history per patient. Alert."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "New holosystolic murmur loudest at tricuspid area.",
        details:
          "Tachycardic regular rhythm. New regurgitant murmur noted compared to prior chart unavailable — loudest left lower sternal border."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Scattered inspiratory crackles.",
        details: "Lungs with mild bibasilar crackles — no consolidation dullness."
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Splinter hemorrhages — nail beds.",
        details: "Painless linear hemorrhages under several fingernails — non-blanching."
      }
    ],
    testOverrides: [
      {
        testId: "blood_culture",
        result:
          "Blood cultures positive — Gram-positive cocci in clusters after drawn from two sites before antibiotics.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: normocytic anemia and leukocytosis with left shift.",
        yield: "helpful"
      },
      {
        testId: "echo",
        result:
          "Transthoracic echocardiogram: vegetation on tricuspid valve with moderate regurgitation — tricuspid involvement common in injection drug use.",
        yield: "high"
      },
      {
        testId: "esr_crp",
        result: "ESR and CRP markedly elevated — inflammatory markers consistent with endocarditis workup.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Persistently positive blood cultures define diagnosis pathway.",
      imagingDefault: "TTE initial; TEE if prosthetic valve or high suspicion with negative TTE.",
      bedsideDefault: "Examine for Janeway lesions Osler nodes Roth spots when syndrome suspected.",
      procedureDefault: "Long-course IV antibiotics and valve surgery if indicated."
    },
    finalDxId: "infective_endocarditis",
    requiredMustNotMiss: ["infective_endocarditis", "pulmonary_tuberculosis", "lymphoma"],
    dxOverrides: [
      {
        dxId: "infective_endocarditis",
        yield: "correct",
        explanation:
          "Prolonged fever IV drug use murmur splinter hemorrhages positive cultures and vegetation confirm infective endocarditis."
      },
      {
        dxId: "pulmonary_tuberculosis",
        yield: "dangerous-miss",
        explanation: "TB causes night sweats weight loss — lack of cavitary CXR findings here and endocarditis stigmata redirect."
      },
      {
        dxId: "lymphoma",
        yield: "reasonable",
        explanation: "B-symptom overlap — infectious vegetations on echo and bacteremia distinguish."
      },
      {
        dxId: "community_acquired_pneumonia",
        yield: "low",
        explanation: "Mild crackles but prolonged fevers murmur and cultures argue against isolated CAP."
      },
      {
        dxId: "influenza",
        yield: "low",
        explanation: "Viral syndrome does not span weeks with positive blood cultures."
      }
    ],
    diagnosisOptions: [
      {
        id: "infective_endocarditis",
        name: "Infective endocarditis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Major Duke criteria met with microbiology and echo vegetation."
      },
      {
        id: "pulmonary_tuberculosis",
        name: "Pulmonary tuberculosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain positive blood cultures for typical endocarditis organisms and valvular vegetation pattern."
      },
      {
        id: "influenza",
        name: "Influenza",
        isCorrect: false,
        isDangerous: false,
        explanation: "Incompatible with chronic course and objective bacteremia."
      }
    ],
    teachingPoints: [
      "Grading (100): prolonged infection 25, IV drug risk 25, cultures and echo 25, diagnosis 25.",
      "Three sets blood cultures before antibiotics when hemodynamically permissible.",
      "Tricuspid valve involvement disproportionately associated with injection drug use.",
      "Embolic phenomenon warrants CNS and abdominal imaging surveillance in select cases.",
      "Surgery for heart failure uncontrolled infection or embolic stroke large vegetation sometimes indicated."
    ]
  },
  {
    id: "malaria-return-travel-david-khan",
    title: "I Feel Sick After My Trip",
    specialty: INFECTIOUS_DISEASE_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "David Khan, a 27-year-old graduate student, presents two weeks after return from sub-Saharan Africa with cyclic fevers, headache, myalgias, and smear-positive malaria without chemoprophylaxis.",
    cardTeaser: "I've had fevers since I got back.",
    objectives: [
      "Take a detailed travel and prophylaxis history in returning febrile travelers.",
      "Order thick and thin smears plus rapid antigen testing.",
      "Treat species-specific and monitor for severe malaria features."
    ],
    patientPersona: {
      name: "David Khan",
      age: 27,
      gender: "Male",
      chiefComplaint: "I've had fevers since I got back.",
      background:
        "Research trip dusty brilliant exhausting — forgot malaria pills arrogant budget grad student coffee stereotype. Two weeks home fevers spike chills sweat off repeat headache temples crush. Muscle aches like gym first week exaggeration nausea food gross. Wife notices eyes yellow tint freaks WebMD hepatitis spiral. No rash bleed gums uncertain.",
      vitals: {
        heartRate: 118,
        bloodPressure: "108/66",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "102.6°F"
      },
      keyHistoryPoints: [
        "Travel to malaria-endemic region",
        "No chemoprophylaxis adherence",
        "Cyclic fever pattern with rigors",
        "Hemolysis suggesting jaundice splenomegaly exam",
        "Thick smear thin smear positive Plasmodium",
        "Rapid antigen supportive"
      ],
      redFlags: [
        "Parasitemia high percentage altered mental status respiratory failure defines severe malaria",
        "P. falciparum requires inpatient monitoring even if initially stable",
        "Exchange transfusion rarely for hyperparasitemia"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as David — sleep-deprived grad humor, guilty about skipping prophylaxis.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say malaria.",
        "Africa travel when asked where trip.",
        "Skipped pills when asked prevention meds."
      ],
      doNotRevealDirectly: [
        "Plasmodium falciparum",
        "thick smear",
        "artesunate now",
        "just jet lag only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Fatigued; febrile; scleral icterus mild.",
        details: "Ill but ambulatory. Mild scleral icterus. No acute respiratory distress."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild splenomegaly.",
        details: "Spleen palpable two cm below costal margin — soft."
      }
    ],
    testOverrides: [
      {
        testId: "malaria_blood_smear",
        result:
          "Thick and thin blood smears: Plasmodium species identified — ring forms with high parasitemia percentage pending lab quantification.",
        yield: "high"
      },
      {
        testId: "malaria_antigen_rapid",
        result: "Rapid malaria antigen test positive — supports diagnosis while awaiting microscopy refinement.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: thrombocytopenia and anemia consistent with hemolysis and consumption.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP: indirect hyperbilirubinemia pattern — elevated LDH suggests hemolysis.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Repeat smears if initial negative with strong clinical suspicion.",
      imagingDefault: "Not central; chest X-ray if respiratory symptoms.",
      bedsideDefault: "Monitor glucose cerebral malaria in pediatrics or adults with altered mentation.",
      procedureDefault: "IV artesunate or quinine per protocol and species resistance geography."
    },
    finalDxId: "malaria",
    requiredMustNotMiss: ["malaria", "dengue_fever", "influenza"],
    dxOverrides: [
      {
        dxId: "malaria",
        yield: "correct",
        explanation:
          "Endemic exposure without prophylaxis cyclic fevers hemolysis smear-positive parasitemia establishes malaria."
      },
      {
        dxId: "dengue_fever",
        yield: "dangerous-miss",
        explanation:
          "Dengue overlaps geographically — thrombocytopenia possible both but parasites on smear clinch malaria."
      },
      {
        dxId: "influenza",
        yield: "low",
        explanation: "Influenza lacks travel incubation smear findings hemolysis pattern."
      },
      {
        dxId: "acute_hepatitis_b",
        yield: "low",
        explanation: "Jaundice overlap — acute HBV serology absent parasitemia explains illness."
      }
    ],
    diagnosisOptions: [
      {
        id: "malaria",
        name: "Malaria",
        isCorrect: true,
        isDangerous: true,
        explanation: "Smear-documented Plasmodium after endemic travel."
      },
      {
        id: "dengue_fever",
        name: "Dengue fever",
        isCorrect: false,
        isDangerous: true,
        explanation: "Negative for dengue focus here with parasites on blood smear."
      },
      {
        id: "influenza",
        name: "Influenza",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain microscopic parasitemia."
      }
    ],
    teachingPoints: [
      "Grading (100): travel history 30, malaria testing 25, cyclic fever 20, diagnosis 25.",
      "CDC provides geographic resistance maps guiding therapy.",
      "G6PD screening matters before primaquine for hypnozoite radical cure in vivax ovale.",
      "Chemoprophylaxis adherence counseling prevents repeat episodes.",
      "Severe malaria criteria include parasitemia thresholds shock ARDS renal failure bleeding."
    ]
  },
  {
    id: "hiv-opportunistic-cough-jason-reed",
    title: "I've Been Losing Weight and Coughing",
    specialty: INFECTIOUS_DISEASE_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Jason Reed, a 39-year-old restaurant worker with thrush, weight loss, night sweats, and pulmonary infiltrates, is diagnosed with untreated HIV and opportunistic pulmonary process.",
    cardTeaser: "I've been getting sicker and sicker.",
    objectives: [
      "Recognize AIDS-defining illness clues without prior HIV diagnosis.",
      "Order HIV testing with consent and CD4 viral load.",
      "Link oral candidiasis and low CD4 to opport infection risk."
    ],
    patientPersona: {
      name: "Jason Reed",
      age: 39,
      gender: "Male",
      chiefComplaint: "I've been getting sicker and sicker.",
      background:
        "Cough months chalked smoker roommate secondhand excuse quit years. Shirts looser notch hungry sweaty nights satin sheets uncomfortable. Cheese pizza mouth white scrapes tongue brush worthless. Oral sex receptive occasional — embarrassed disclosure relevance maybe. Never tested HIV thought plague history people not me arrogance. Fevers low grade shift work ignored.",
      vitals: {
        heartRate: 106,
        bloodPressure: "116/72",
        respiratoryRate: 18,
        oxygenSat: "95%",
        temperature: "100.4°F"
      },
      keyHistoryPoints: [
        "Progressive weight loss night sweats",
        "Chronic cough hypoxemia mild",
        "Oral candidiasis on exam",
        "No established HIV care",
        "HIV screen positive confirmatory testing",
        "CD4 very low with diffuse infiltrates on CXR"
      ],
      redFlags: [
        "Respiratory failure from PCP requires steroids adjunct timing per protocol",
        "IRIS when starting ART amidst untreated opportunistic infection",
        "TB must be evaluated before empiric steroids in HIV pneumonia in endemic settings"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Jason — service industry fatigue, shame mixing courage reluctantly.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say HIV or AIDS.",
        "White mouth patches when asked mouth tongue.",
        "Sexual history only if asked exposure risk."
      ],
      doNotRevealDirectly: [
        "HIV opportunistic infection",
        "Pneumocystis",
        "start Bactrim",
        "you just need vitamins"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Cachectic; low-grade fever.",
        details: "Thin appearance. Mild temporal wasting. Alert oriented."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Oral thrush.",
        details: "Curdy white plaques on buccal mucosa and tongue that scrape leaving erythema."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Bibasilar crackles.",
        details: "Tachypnea mild. Crackles at lung bases. SpO2 95% room air."
      }
    ],
    testOverrides: [
      {
        testId: "hiv_test",
        result:
          "Fourth-generation HIV Ag/Ab screen reactive — confirmatory HIV-1 RNA PCR positive.",
        yield: "high"
      },
      {
        testId: "cd4_count",
        result: "CD4 count 58 cells/µL — severe immunosuppression placing patient at opportunistic infection risk.",
        yield: "high"
      },
      {
        testId: "hiv_viral_load",
        result: "HIV viral load high — over 250,000 copies/mL — consistent with untreated infection.",
        yield: "high"
      },
      {
        testId: "cxr",
        result:
          "Chest X-ray: bilateral diffuse interstitial infiltrates — pattern concerning for opportunistic pneumonitis such as PCP in clinical context.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: lymphopenia possible; otherwise nonspecific.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Lactate dehydrogenase often elevated in PCP though nonspecific.",
      imagingDefault: "HRCT refines pattern when CXR ambiguous.",
      bedsideDefault: "ABG if hypoxemia disproportionate to exam.",
      procedureDefault: "Bronchoscopy with BAL when diagnosis uncertain — empiric therapy often starts earlier clinically."
    },
    finalDxId: "hiv_opportunistic_infection",
    requiredMustNotMiss: ["hiv_opportunistic_infection", "pulmonary_tuberculosis", "lung_cancer"],
    dxOverrides: [
      {
        dxId: "hiv_opportunistic_infection",
        yield: "correct",
        explanation:
          "Advanced untreated HIV with thrush profound CD4 and pulmonary infiltrates defines HIV with opportunistic infection presentation."
      },
      {
        dxId: "pulmonary_tuberculosis",
        yield: "dangerous-miss",
        explanation:
          "TB must be in differential with cavitary or upper lobe patterns — CXR here diffuse interstitial more PCP-typical."
      },
      {
        dxId: "lung_cancer",
        yield: "reasonable",
        explanation: "Weight loss cough raises malignancy — young thrush and CD4 redirect to immunodeficiency."
      },
      {
        dxId: "community_acquired_pneumonia",
        yield: "low",
        explanation: "Duration oral thrush and CD4 count argue against routine bacterial pneumonia alone."
      }
    ],
    diagnosisOptions: [
      {
        id: "hiv_opportunistic_infection",
        name: "HIV with opportunistic infection",
        isCorrect: true,
        isDangerous: true,
        explanation: "Confirmed HIV with severe immunosuppression and pulmonary opportunistic pattern."
      },
      {
        id: "pulmonary_tuberculosis",
        name: "Pulmonary tuberculosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must rule out TB with nucleic acid testing and clinical features — alternative inpatient pathway."
      },
      {
        id: "lung_cancer",
        name: "Lung cancer",
        isCorrect: false,
        isDangerous: true,
        explanation: "Infectious immunodeficiency picture better explains findings than primary malignancy alone."
      }
    ],
    teachingPoints: [
      "Grading (100): immunocompromise clues 25, HIV testing 25, opportunistic signs 25, diagnosis 25.",
      "Routine HIV screening expanded demographics reduces late presenters.",
      "PCP treatment includes trimethoprim-sulfamethoxazole and corticosteroids if severe hypoxemia per guideline thresholds.",
      "TB evaluation before steroids when endemic risk unless instability dictates alternate pathway.",
      "Linkage to care and ART after opportunistic infection management reduces mortality."
    ]
  },
  {
    id: "bacterial-meningitis-neck-emma-rodriguez",
    title: "My Neck Hurts and The Lights Hurt My Eyes",
    specialty: INFECTIOUS_DISEASE_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Emma Rodriguez, a 19-year-old college student, presents with fulminant headache, fever, meningismus, photophobia, and confusion; CSF shows neutrophilic pleocytosis with low glucose and positive Gram stain.",
    cardTeaser: "My head and neck hurt really badly.",
    objectives: [
      "Treat bacterial meningitis as emergency with rapid antibiotics after blood cultures.",
      "Perform CT before LP when mass effect risk factors exist — adapt if unstable.",
      "Recognize meningococcal risk in congregate settings."
    ],
    patientPersona: {
      name: "Emma Rodriguez",
      age: 19,
      gender: "Female",
      chiefComplaint: "My head and neck hurt really badly.",
      background:
        "Dorm rush sluggish headaches days ignored midterms. This morning skull vise hot knife neck wooden board cannot chin chest. Lights dorm hallway scream photophobia sunglasses inside drama roommate laughed then scared. Nausea bile toilet confused what day calculus exam irony. Rash tiny purple dots ankles noticed shower unclear relevance scared Google.",
      vitals: {
        heartRate: 128,
        bloodPressure: "102/60",
        respiratoryRate: 22,
        oxygenSat: "98%",
        temperature: "103.0°F"
      },
      keyHistoryPoints: [
        "Severe headache fever rapid progression",
        "Neck stiffness and photophobia",
        "Altered mental status confusion",
        "Petechial concerns raising meningococcemia worry",
        "CSF neutrophilic pleocytosis low glucose high protein",
        "Gram-positive diplococci pattern on stain pending culture"
      ],
      redFlags: [
        "Septic shock and coma require ICU airway support",
        "Rifampin chemoprophylaxis for close contacts in meningococcal cases public health",
        "Herniation if LP performed with mass lesion — CT first with papilledema immunocompromise"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Emma — young, photophobia wincing, confusion mixing details.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say meningitis.",
        "Neck stiffness when asked move neck light hurt eyes.",
        "Dorm living when asked contacts crowded."
      ],
      doNotRevealDirectly: [
        "bacterial meningitis",
        "lumbar puncture now",
        "ceftriaxone",
        "this is migraine only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Toxic febrile; confused.",
        details: "Appears severely ill. Oriented to person not time. Tachycardic."
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Nuchal rigidity; photophobia.",
        details:
          "Cannot flex neck fully — Kernig and Brudzinski signs positive in sim. Pupils reactive. No focal motor deficit."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result: "CBC: leukocytosis with pronounced neutrophilia.",
        yield: "high"
      },
      {
        testId: "blood_culture",
        result: "Blood cultures drawn pre-antibiotics positive — organism identification pending.",
        yield: "high"
      },
      {
        testId: "ct_head",
        result:
          "CT head without contrast: no mass lesion midline shift hemorrhage — safe to proceed to lumbar puncture if clinically indicated.",
        yield: "helpful"
      },
      {
        testId: "lumbar_puncture",
        result:
          "CSF: opening pressure elevated — neutrophilic pleocytosis, low CSF glucose, elevated protein. Gram stain positive with organisms consistent with bacterial meningitis — speciation and sensitivities pending from culture.",
        yield: "high"
      }
    ],
    testDefaultBehavior: {
      labDefault: "CSF PCR panels broaden viral and atypical pathogen consideration if lymphocytic pattern emerges.",
      imagingDefault: "CT head before LP when immunocompromise, papilledema, focal deficit, or seizure — per local protocol.",
      bedsideDefault: "Do not delay empiric therapy for dangerously ill patients while awaiting LP if protocol supports blood culture first.",
      procedureDefault:
        "Dexamethasone adjunct for some bacterial meningitis presentations when aligned with guideline timing relative to antibiotics."
    },
    finalDxId: "bacterial_meningitis",
    requiredMustNotMiss: ["bacterial_meningitis", "subarachnoid_hemorrhage", "viral_meningitis"],
    dxOverrides: [
      {
        dxId: "bacterial_meningitis",
        yield: "correct",
        explanation:
          "Acute meningismus, photophobia, fever, confusion, and purulent-profile CSF with positive Gram stain support bacterial meningitis."
      },
      {
        dxId: "viral_meningitis",
        yield: "reasonable",
        explanation:
          "Overlaps headache fever neck stiffness — typically lymphocytic CSF without bacterial Gram stain pattern; less convincing here."
      },
      {
        dxId: "subarachnoid_hemorrhage",
        yield: "dangerous-miss",
        explanation: "Thunderclap presentations overlap — CT negative here lowers probability but suspicion can persist rarely."
      },
      {
        dxId: "encephalitis",
        yield: "reasonable",
        explanation: "Altered mentation raises parenchymal inflammation — meningeal signs and CSF neutrophilia argue for meningitis spectrum primarily."
      },
      {
        dxId: "migraine",
        yield: "low",
        explanation: "Migraine does not explain fever nuchal rigidity toxic appearance and CSF findings."
      }
    ],
    diagnosisOptions: [
      {
        id: "bacterial_meningitis",
        name: "Bacterial meningitis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Classic acute bacterial CNS infection pattern with confirmatory CSF and stain."
      },
      {
        id: "viral_meningitis",
        name: "Viral meningitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely with acute toxicity and CSF pattern described — still in broader meningitis differential."
      },
      {
        id: "subarachnoid_hemorrhage",
        name: "Subarachnoid hemorrhage",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must consider with sudden severe headache — CT without blood here redirects but does not eliminate every presentation nuance."
      }
    ],
    teachingPoints: [
      "Grading (100): emergency recognition 30, LP when appropriate 25, meningeal signs 20, diagnosis 25 — immediate antibiotics bonus +10.",
      "Blood cultures before antibiotics when seconds allow — do not delay antibiotics for unstable patients.",
      "Dexamethasone timing follows organism-specific guideline recommendations.",
      "Public health prophylaxis applies to close contacts in select meningococcal scenarios.",
      "Immunization history and exposure clustering inform empiric coverage choices."
    ]
  }
];