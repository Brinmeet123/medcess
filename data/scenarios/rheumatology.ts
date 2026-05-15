import type { Scenario } from "@/data/scenarios";

const RHEUM_SPECIALTY = "Rheumatology" as const;

export const rheumatologyScenarios: Scenario[] = [
  {
    id: "rheum-ra-susan-morning-stiffness",
    title: "My Hands Feel Stiff Every Morning",
    specialty: RHEUM_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    description:
      "Susan Miller, a 46-year-old administrative assistant, reports eight months of prolonged morning hand stiffness, symmetric joint swelling, and fatigue with positive RF and anti-CCP.",
    cardTeaser: "My fingers feel frozen when I wake up.",
    objectives: [
      "Elicit inflammatory arthritis features: prolonged morning stiffness, symmetric small joints.",
      "Order appropriate serologies and hand imaging.",
      "Differentiate RA from OA, psoriatic arthritis, lupus, and viral mimics.",
    ],
    patientPersona: {
      name: "Susan Miller",
      age: 46,
      gender: "Female",
      chiefComplaint: "My fingers feel frozen when I wake up.",
      background:
        "For most of a year she has woken with her hands stuck in a claw-like stuck feeling for well over an hour—coffee, shower, still cheesy-gritty before they loosen. Both hands: knuckles puffy, rings quit fitting months ago. Jars and laptop trackpad hurt; she pops lids with a rubber gripper at home. Body-wide tired in a way sleep does not fix. Gentle movement and warm water eventually help; sitting still makes it worse. No recent injury, no psoriasis rash she knows of, no sun rash. Tried OTC NSAIDs with partial help, scared missing work.",
      vitals: {
        heartRate: 84,
        bloodPressure: "124/78",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "99.0°F",
      },
      keyHistoryPoints: [
        "Morning stiffness >1 hour for months",
        "Symmetric hand (MCP/PIP) swelling and grip loss",
        "Inflammatory pattern improves with use",
        "RF and anti-CCP positive; ESR/CRP elevated",
        "Hand X-rays with early erosive changes possible",
      ],
      redFlags: [
        "Mononeuritis or extra-articular RA emergencies",
        "Single hot joint needing infection exclusion",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Susan is organized, slightly embarrassed about grip weakness, practical about work impact.",
      behaviorRules: [
        "Answer only as Susan.",
        "Do not say rheumatoid arthritis or RA as a diagnosis.",
        "Give timing of stiffness and both-hand involvement when asked clearly.",
      ],
      doNotRevealDirectly: [
        "rheumatoid arthritis",
        "you have RA",
        "RF and CCP prove it",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Alert; mild low-grade temperature sensation; no distress at rest.",
        details:
          "Comfortable sitting. No rash appreciated. Gait normal.",
      },
      {
        id: "extremities-hands",
        label: "Upper extremities (hands)",
        summary: "Symmetric MCP and PIP swelling with warmth and tenderness.",
        details:
          "Soft tissue swelling over several MCPs and PIPs bilaterally. Decreased grip strength on squeeze. Mild warmth without erythema of entire hand.",
      },
    ],
    testOverrides: [
      {
        testId: "esr_crp",
        result: "ESR and CRP both elevated — consistent with active systemic inflammation.",
        yield: "high",
      },
      {
        testId: "rheumatoid_factor",
        result: "Rheumatoid factor: positive.",
        yield: "high",
      },
      {
        testId: "anti_cyclic_citrullinated_peptide",
        result: "Anti-CCP antibodies: positive — supports rheumatoid arthritis serology.",
        yield: "high",
      },
      {
        testId: "hand_xray_bilateral",
        result:
          "Hand/wrist radiographs: juxta-articular osteopenia with early marginal erosions at several MCP joints bilaterally.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Inflammatory markers often elevated in active inflammatory arthritis.",
      imagingDefault: "X-ray stages joint damage; ultrasound/MRI more sensitive early.",
      bedsideDefault: "Joint count and function scores document activity.",
      procedureDefault: "DMARD/biologic planning with rheumatology monitoring.",
    },
    finalDxId: "rheumatoid_arthritis",
    requiredMustNotMiss: ["rheumatoid_arthritis", "systemic_lupus_erythematosus", "septic_arthritis"],
    dxOverrides: [
      {
        dxId: "rheumatoid_arthritis",
        yield: "correct",
        explanation:
          "Symmetric small joint inflammatory polyarthritis with prolonged morning stiffness, positive RF/anti-CCP, and erosive radiographic changes align with RA.",
      },
      {
        dxId: "osteoarthritis",
        yield: "reasonable",
        explanation:
          "Hand OA can coexist but typically brief stiffness, DIP involvement, lacks strong serologies and erosive RA pattern.",
      },
      {
        dxId: "systemic_lupus_erythematosus",
        yield: "dangerous-miss",
        explanation:
          "SLE arthritis usually non-erosive; different systemic and serologic profile — less likely here with CCP positivity.",
      },
      {
        dxId: "psoriatic_arthritis",
        yield: "reasonable",
        explanation:
          "Possible without obvious plaque; nail changes or DIP asymmetry would pivot—symmetric MCP picture favors RA.",
      },
      {
        dxId: "viral_arthritis",
        yield: "low",
        explanation: "Self-limited; eight-month course and serologies argue against isolated viral mimic.",
      },
    ],
    diagnosisOptions: [
      {
        id: "rheumatoid_arthritis",
        name: "Rheumatoid arthritis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Classic seropositive inflammatory polyarthritis with imaging damage.",
      },
      {
        id: "osteoarthritis",
        name: "Osteoarthritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Mechanical pattern and lacks characteristic autoantibodies.",
      },
      {
        id: "systemic_lupus_erythematosus",
        name: "Systemic lupus erythematosus",
        isCorrect: false,
        isDangerous: true,
        explanation: "Consider when cytopenias nephritis or high-titer ANA dominate; not this serologic picture.",
      },
      {
        id: "psoriatic_arthritis",
        name: "Psoriatic arthritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Entheseal or DIP patterns more typical; may lack classic RA serologies.",
      },
    ],
    teachingPoints: [
      "Grading (100): inflammatory joint pattern 30, morning stiffness duration 25, autoimmune testing 20, diagnosis 25.",
      "Prolonged morning stiffness and MCP/MET involvement suggest inflammation over OA.",
      "Anti-CCP is more specific than RF; both negative does not exclude RA early.",
      "Baseline radiographs help stage; early therapy improves long-term outcomes.",
    ],
  },

  {
    id: "rheum-sle-rachel-photosensitivity",
    title: "My Face Gets A Rash In The Sun",
    specialty: RHEUM_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 15,
    description:
      "Rachel Kim, a 24-year-old graduate student, has photosensitive malar rash, mucosal ulcers, arthritis symptoms, and autoimmune serologies consistent with systemic lupus erythematosus.",
    cardTeaser: "My skin reacts badly to sunlight.",
    objectives: [
      "Recognize multisystem SLE features including photosensitivity and immunologic markers.",
      "Order ANA, anti-dsDNA, complement, CBC, and urinalysis for organ involvement.",
      "Differentiate from rosacea, dermatomyositis, RA, and viral illness.",
    ],
    patientPersona: {
      name: "Rachel Kim",
      age: 24,
      gender: "Female",
      chiefComplaint: "My skin reacts badly to sunlight.",
      background:
        "For months she has dragged through seminars with bone-tired fatigue and achy wrists when typing. Weekends at the lake leave her cheeks flaming red across the bridge of nose while oddly sparing the laugh lines her roommate pointed out—that scared her when she looked at photos. Mouth sores come and go on the inner lip, sting with citrus. Hair shedding clogs the shower more than before. Sunscreen helps some but not enough; even walking campus without a hat flares it. Symptoms wax and wane with stress and finals.",
      vitals: {
        heartRate: 92,
        bloodPressure: "122/76",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "99.4°F",
      },
      keyHistoryPoints: [
        "Photosensitive malar distribution rash",
        "Oral ulcers arthralgias fatigue hair thinning",
        "ANA and anti-dsDNA positive; hypocomplementemia",
        "UA and CBC screen for nephritis/cytopenias",
      ],
      redFlags: [
        "Lupus nephritis with rising creatinine or active sediment",
        "Neuropsychiatric SLE or serositis requiring escalation",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Rachel is bright, anxious about labels, uses precise student vocabulary, jokes nervously.",
      behaviorRules: [
        "Answer only as Rachel.",
        "Do not say lupus or SLE as diagnosis.",
        "Describe rash distribution and sun trigger when asked.",
      ],
      doNotRevealDirectly: [
        "systemic lupus",
        "you have SLE",
        "malar butterfly rash textbook only",
      ],
    },
    physicalExam: [
      {
        id: "skin",
        label: "Skin",
        summary: "Erythematous malar flush sparing nasolabial folds.",
        details:
          "Macular erythema over malar prominences and nasal bridge with relative sparing of nasolabial folds. No scaly psoriasis plaques.",
      },
      {
        id: "extremities",
        label: "Extremities",
        summary: "Mild tenderness with hand MCPs without gross deformity.",
        details: "Symmetric mild synovitis difficulty on exam; no rheumatoid nodules.",
      },
      {
        id: "oral",
        label: "Oral mucosa",
        summary: "Shallow oral ulcer on buccal mucosa.",
        details: "Painful shallow ulceration visible with gentle inspection.",
      },
    ],
    testOverrides: [
      {
        testId: "ana_ifa",
        result: "ANA: positive at significant titer with speckled pattern.",
        yield: "high",
      },
      {
        testId: "anti_double_stranded_dna",
        result: "Anti-dsDNA antibodies: positive.",
        yield: "high",
      },
      {
        testId: "complement_c3_c4",
        result: "Complement C3 and C4: low — consumption pattern seen in active lupus overlap.",
        yield: "high",
      },
      {
        testId: "cbc",
        result:
          "CBC: mild leukopenia at lower limit — common lupus-associated cytopenia; monitor trend.",
        yield: "helpful",
      },
      {
        testId: "ua",
        result:
          "Urinalysis: trace protein without gross active nephritic sediment today — renal involvement remains on surveillance.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Serial complement and anti-dsDNA track some patients' activity.",
      imagingDefault: "Not routine unless organ-specific indication.",
      bedsideDefault: "Sun protection education and symptom diary.",
      procedureDefault: "Renal biopsy only when nephritis criteria met.",
    },
    finalDxId: "systemic_lupus_erythematosus",
    requiredMustNotMiss: ["systemic_lupus_erythematosus", "dermatomyositis", "acute_viral_syndrome"],
    dxOverrides: [
      {
        dxId: "systemic_lupus_erythematosus",
        yield: "correct",
        explanation:
          "Multisystem young woman with malar photosensitive rash oral ulcers arthritis fatigue hypocomplementemia and anti-dsDNA positivity fits SLE.",
      },
      {
        dxId: "rosacea",
        yield: "reasonable",
        explanation: "Flushing without robust systemic serologies; nasolabial sparing less classic for rosacea.",
      },
      {
        dxId: "dermatomyositis",
        yield: "dangerous-miss",
        explanation: "Consider with Gottron sign and proximal weakness—prominent here is rash and lupus serologies.",
      },
      {
        dxId: "rheumatoid_arthritis",
        yield: "low",
        explanation:
          "Anti-CCP absent in this vignette focus; erosions not emphasized—SLE serology dominates.",
      },
      {
        dxId: "acute_viral_syndrome",
        yield: "reasonable",
        explanation: "Can cause malaise—lacks persistent multisystem autoantibody profile.",
      },
    ],
    diagnosisOptions: [
      {
        id: "systemic_lupus_erythematosus",
        name: "Systemic lupus erythematosus",
        isCorrect: true,
        isDangerous: true,
        explanation: "Clinical and laboratory criteria consistent with SLE spectrum.",
      },
      {
        id: "rosacea",
        name: "Rosacea",
        isCorrect: false,
        isDangerous: false,
        explanation: "Typically centrofacial without strong ANA/dsDNA/complement pattern.",
      },
      {
        id: "dermatomyositis",
        name: "Dermatomyositis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Skin and muscle findings differ; Gottron papules and high CK more central.",
      },
      {
        id: "rheumatoid_arthritis",
        name: "Rheumatoid arthritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Serologic and cutaneous pattern not primary RA.",
      },
    ],
    teachingPoints: [
      "Grading (100): multisystem clues 30, autoimmune testing 25, photosensitivity 20, diagnosis 25.",
      "SLE is clinical diagnosis supported by ACR/EULAR classification criteria integration.",
      "Always screen urine and blood pressure for silent nephritis.",
      "Sun protection and UV avoidance are therapeutic adjuncts.",
    ],
  },

  {
    id: "rheum-gout-anthony-first-mtp",
    title: "My Big Toe Feels Like It's On Fire",
    specialty: RHEUM_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Anthony Russo, a 58-year-old restaurant owner, develops abrupt first MTP podagra after dietary indulgence; synovial fluid shows monosodium urate crystals.",
    cardTeaser: "My toe suddenly became unbearable.",
    objectives: [
      "Recognize acute monoarthritis classic for gout.",
      "Aspirate joint when septic arthritis must be excluded; interpret crystals.",
      "Differentiate from cellulitis pseudogout and infection.",
    ],
    patientPersona: {
      name: "Anthony Russo",
      age: 58,
      gender: "Male",
      chiefComplaint: "My toe suddenly became unbearable.",
      background:
        "Woke at 3 a.m. feeling like his right big toe joint was crushed under a steamroller. Sheet touching it made him yelp—slept with foot hanging off bed. Red hot swollen at the joint line; can't wear a shoe. Yesterday hosted a wine dinner with tomahawk steaks celebration—not his usual weekday. No injury no twist. Took leftover pain pills from dental work, barely touched it. Never had this exact attack before; uncle jokes about rich-man foot.",
      vitals: {
        heartRate: 88,
        bloodPressure: "142/88",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "99.1°F",
      },
      keyHistoryPoints: [
        "Sudden first MTP monoarthritis overnight",
        "Erythema extreme tenderness, podagra",
        "Purulent meal alcohol trigger context",
        "Aspiration shows negatively birefringent needle crystals MSU",
      ],
      redFlags: [
        "Septic arthritis requiring urgent antibiotics and washout",
        "Systemic infection signs",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Anthony is loud when hurting, grim humor, embarrassed about steak binge.",
      behaviorRules: [
        "Answer only as Anthony.",
        "Do not say gout as diagnosis.",
        "Admit dietary context if asked directly.",
      ],
      doNotRevealDirectly: [
        "gout",
        "urate crystals",
        "MSU crystals on aspiration",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Uncomfortable; afebrile appearance aside from local inflammation.",
        details: "Using crutches awkwardly in clinic. No acute systemic toxicity in vignette.",
      },
      {
        id: "extremities-foot",
        label: "Foot (right)",
        summary: "First MTP hot swollen erythematous — exquisite tenderness.",
        details:
          "Effusion tense over first MTP joint. Cannot dorsiflex toe without pain. Comparison side normal.",
      },
    ],
    testOverrides: [
      {
        testId: "joint_aspiration",
        result:
          "Synovial fluid: leukocytosis consistent with inflammation; Gram stain negative; polarized microscopy demonstrates needle-shaped negatively birefringent monosodium urate crystals.",
        yield: "high",
      },
      {
        testId: "serum_uric_acid",
        result:
          "Serum uric acid: elevated — though may be normal in acute attack, supports hyperuricemia tendency.",
        yield: "helpful",
      },
      {
        testId: "cbc",
        result: "CBC: mild leukocytosis without left shift suggesting bacteremia pattern.",
        yield: "low",
      },
      {
        testId: "foot_xray",
        result:
          "Foot X-ray: soft tissue swelling without acute fracture; chronic gouty erosions not yet prominent.",
        yield: "low",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Uric acid trend off flare for long-term management.",
      imagingDefault: "X-ray for fracture mimic; dual-energy CT if chronic diagnostic question.",
      bedsideDefault: "Crystal analysis remains gold standard when fluid obtained.",
      procedureDefault: "Co-drainage if septic concern until cultures clarify.",
    },
    finalDxId: "gout",
    requiredMustNotMiss: ["gout", "septic_arthritis", "cellulitis"],
    dxOverrides: [
      {
        dxId: "gout",
        yield: "correct",
        explanation:
          "Acute first MTP inflammatory monoarthritis with MSU crystals on polarized microscopy diagnoses gout.",
      },
      {
        dxId: "septic_arthritis",
        yield: "dangerous-miss",
        explanation: "Must exclude when fever or systemic toxicity—Gram stain/culture critical if uncertain.",
      },
      {
        dxId: "cellulitis",
        yield: "reasonable",
        explanation: "Erythema overlaps but joint-centric excruciation and crystals localize arthritis.",
      },
      {
        dxId: "pseudogout_cppd",
        yield: "reasonable",
        explanation: "CPP rhomboid positive birefringent crystals and other joints—aspiration distinguishes.",
      },
      {
        dxId: "muscle_strain",
        yield: "low",
        explanation: "Trauma history absent; crystal proof refutes soft tissue only explanation.",
      },
    ],
    diagnosisOptions: [
      {
        id: "gout",
        name: "Acute gout",
        isCorrect: true,
        isDangerous: false,
        explanation: "Crystal-proven acute podagra.",
      },
      {
        id: "septic_arthritis",
        name: "Septic arthritis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Emergency until excluded by aspirate and clinical course.",
      },
      {
        id: "cellulitis",
        name: "Cellulitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less joint-focused; lacks crystal findings.",
      },
      {
        id: "pseudogout_cppd",
        name: "Pseudogout",
        isCorrect: false,
        isDangerous: false,
        explanation: "Different crystal morphology on microscopy.",
      },
    ],
    teachingPoints: [
      "Grading (100): acute monoarthritis 25, dietary trigger 20, joint aspiration 30, diagnosis 25.",
      "Never assume gout without considering septic joint in febrile toxic patient.",
      "MSU = needle negative birefringence under polarized light (convention-dependent phrasing in teaching).",
      "Urate-lowering therapy timing per guideline after flare management.",
    ],
  },

  {
    id: "rheum-pmr-linda-proximal-pain",
    title: "My Shoulders And Hips Ache Constantly",
    specialty: RHEUM_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 13,
    description:
      "Linda Carter, a 68-year-old retired teacher, describes proximal shoulder and hip girdle pain and stiffness with marked ESR/CRP elevation and normal CK — polymyalgia rheumatica pattern.",
    cardTeaser: "I feel stiff everywhere.",
    objectives: [
      "Recognize PMR age and proximal girdle symptom distribution.",
      "Order inflammatory markers and CK to contrast myositis.",
      "Differentiate from fibromyalgia OA myositis and hypothyroidism.",
    ],
    patientPersona: {
      name: "Linda Carter",
      age: 68,
      gender: "Female",
      chiefComplaint: "I feel stiff everywhere.",
      background:
        "Progressive ache across tops of shoulders and both hips — dressing hard: can't fasten back bra clip, toilet rise needs counter push. Mornings brutal for hour-plus until hot shower loosens. Feels weak on stairs but can still lift grandson if she cheats form—more pain limitation than true paralysis. Fatigue clouds afternoons. No fever rigors. No dramatic weight loss she admits. Thyroid pill stable years. Worried she is 'falling apart' quietly.",
      vitals: {
        heartRate: 84,
        bloodPressure: "132/78",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "99.2°F",
      },
      keyHistoryPoints: [
        "Age >65 proximal girdle pain stiffness",
        "Elevated ESR and CRP with normal CK",
        "Pain limited active ROM without objective weakness pattern of myositis",
        "Giant cell arteritis awareness if headache jaw claudication vision",
      ],
      redFlags: [
        "GCA visual symptoms — emergency steroids",
        "Atypical features prompting malignancy workup",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Linda warm, self-deprecating, downplays until asked functional chores.",
      behaviorRules: [
        "Answer only as Linda.",
        "Do not say polymyalgia rheumatica.",
        "Contrast shoulder hip involvement from fibromyalgia widespread tender points if asked.",
      ],
      doNotRevealDirectly: [
        "polymyalgia rheumatica",
        "you need steroids immediately for PMR label only",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pleasant elderly woman; moves shoulders carefully.",
        details: "No temporal artery prominence appreciated superficially today.",
      },
      {
        id: "shoulder",
        label: "Shoulders",
        summary: "Painful active abduction and internal rotation bilaterally.",
        details:
          "Passive ROM somewhat preserved—pain limits effort. No gross muscle atrophy.",
      },
      {
        id: "hip",
        label: "Hips / gait",
        summary: "Antalgic slow rise from chair; painful log-roll.",
        details:
          "No true focal neurologic deficit—strength formally near full against resistance though painful.",
      },
    ],
    testOverrides: [
      {
        testId: "esr_crp",
        result:
          "ESR markedly elevated; CRP elevated — prominent inflammatory serology for age.",
        yield: "high",
      },
      {
        testId: "ck",
        result: "Creatine kinase: normal — argues against significant myositis overlap on lab screen.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: mild normocytic anemia may accompany chronic inflammation.",
        yield: "low",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Rapid response of markers to low-dose steroids supports PMR clinically.",
      imagingDefault: "Ultrasound PMR shoulder findings sometimes adjunct.",
      bedsideDefault: "Temporal artery exam and symptom review each visit.",
      procedureDefault: "Biopsy if GCA suspected.",
    },
    finalDxId: "polymyalgia_rheumatica",
    requiredMustNotMiss: [
      "polymyalgia_rheumatica",
      "inflammatory_myopathy",
      "rheumatoid_arthritis",
    ],
    dxOverrides: [
      {
        dxId: "polymyalgia_rheumatica",
        yield: "correct",
        explanation:
          "Older adult with proximal inflammatory pain stiffness and high ESR/CRP with normal CK fits PMR.",
      },
      {
        dxId: "fibromyalgia",
        yield: "reasonable",
        explanation: "Widespread pain but typically normal inflammatory markers and different exam.",
      },
      {
        dxId: "osteoarthritis",
        yield: "reasonable",
        explanation: "Mechanical joints possible; inflammatory markers this high atypical for pure OA.",
      },
      {
        dxId: "inflammatory_myopathy",
        yield: "dangerous-miss",
        explanation: "Would expect elevated CK and weakness pattern — screened here.",
      },
      {
        dxId: "hypothyroidism",
        yield: "reasonable",
        explanation: "Can cause myalgia stiffness—TSH not elevated in scenario focus.",
      },
    ],
    diagnosisOptions: [
      {
        id: "polymyalgia_rheumatica",
        name: "Polymyalgia rheumatica",
        isCorrect: true,
        isDangerous: true,
        explanation: "Proximal inflammatory syndrome in older adult with markers.",
      },
      {
        id: "fibromyalgia",
        name: "Fibromyalgia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Normal markers expected; tender point phenotype differs.",
      },
      {
        id: "osteoarthritis",
        name: "Osteoarthritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain dramatic inflammatory laboratory findings alone.",
      },
      {
        id: "inflammatory_myopathy",
        name: "Inflammatory myopathy",
        isCorrect: false,
        isDangerous: true,
        explanation: "CK typically elevated with clearer weakness — not primary here.",
      },
    ],
    teachingPoints: [
      "Grading (100): age pattern 25, inflammatory markers 25, proximal symptoms 25, diagnosis 25.",
      "PMR and giant cell arteritis are linked—ask vision jaw tongue scalp symptoms.",
      "Low-dose corticosteroids dramatic response supports diagnosis when used carefully.",
      "Normal CK helps distinguish from myositis on initial screen.",
    ],
  },

  {
    id: "rheum-scleroderma-melissa-raynaud",
    title: "My Fingers Change Colors In The Cold",
    specialty: RHEUM_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Melissa Green, a 41-year-old accountant, has chronic Raynaud phenomenon, skin tightening, esophageal symptoms, and positive ANA with anti-Scl-70 consistent with systemic sclerosis.",
    cardTeaser: "My hands change color and feel tight.",
    objectives: [
      "Recognize Raynaud triphasic color change and scleroderma skin and vascular involvement.",
      "Order appropriate autoantibodies and pulmonary function testing for ILD risk.",
      "Differentiate primary Raynaud from connective tissue disease overlap.",
    ],
    patientPersona: {
      name: "Melissa Green",
      age: 41,
      gender: "Female",
      chiefComplaint: "My hands change color and feel tight.",
      background:
        "Years of winter fingers going white-blue-red in the office parking deck clutching a cold steering wheel—thought she was just sensitive until tips started tiny scars last year. Skin on fingers looks shiny and tight; making a fist harder; wedding ring retired. Heartburn climbing stairs not just spicy food—burnt chest and sour mornings. Swallowing dry chicken feels stuck mid-chest sometimes. Eyes dry intermittently. Family thinks she's anxious; she thinks her body is slowly shrink-wrapping.",
      vitals: {
        heartRate: 82,
        bloodPressure: "128/78",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.7°F",
      },
      keyHistoryPoints: [
        "Raynaud with digital changes-skin tightening",
        "GERD/dysphagia reflux spectrum",
        "ANA positive anti-Scl-70 positive (diffuse pattern often)",
        "PFT screening for restrictive physiology",
      ],
      redFlags: [
        "New exertional hypoxia or ILD progression",
        "Scleroderma renal crisis blood pressure screening",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Melissa precise, slightly clinical language from internet reading, guarded emotion.",
      behaviorRules: [
        "Answer only as Melissa.",
        "Do not say scleroderma or systemic sclerosis as diagnosis.",
        "Describe color changes cold trigger and skin tightening when asked.",
      ],
      doNotRevealDirectly: [
        "systemic sclerosis",
        "Anti-Scl-70 does not define your whole future alone",
        "you will need transplant",
      ],
    },
    physicalExam: [
      {
        id: "skin-hands",
        label: "Skin (hands)",
        summary: "Sclerodactyly with tight shiny skin and flexion contractures.",
        details:
          "Thickening distal to MCPs. Digital pits noted.",
      },
      {
        id: "general-face",
        label: "Face / mouth",
        summary: "Masked facies; reduced oral opening (microstomia).",
        details:
          "Skin taut periorally; reduced oral aperture on smile attempt. Telangiectasias subtle on exam.",
      },
    ],
    testOverrides: [
      {
        testId: "ana_ifa",
        result: "ANA: positive with nucleolar pattern noted on reporting consistent with scleroderma spectrum.",
        yield: "high",
      },
      {
        testId: "anti_centromere",
        result: "Anti-centromere antibody: negative — limited pattern less favored serologically in this vignette.",
        yield: "helpful",
      },
      {
        testId: "anti_scl70",
        result: "Anti-Scl-70 (anti-topoisomerase I): positive — associated with diffuse cutaneous systemic sclerosis and ILD vigilance.",
        yield: "high",
      },
      {
        testId: "pulmonary_function_tests",
        result:
          "PFTs: mild restrictive pattern with DLCO reduced — suggests interstitial lung process screening abnormality warranting high-resolution CT discussion.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Serial monitoring of organ function per rheumatology pulmonology co-management.",
      imagingDefault: "HRCT chest when PFTs abnormal or progression symptoms.",
      bedsideDefault: "Blood pressure home monitoring education for renal crisis awareness.",
      procedureDefault: "Endoscopy if severe reflux stricture concern.",
    },
    finalDxId: "systemic_sclerosis",
    requiredMustNotMiss: [
      "systemic_sclerosis",
      "systemic_lupus_erythematosus",
      "mixed_connective_tissue_disease",
    ],
    dxOverrides: [
      {
        dxId: "systemic_sclerosis",
        yield: "correct",
        explanation:
          "Raynaud sclerodactyly esophageal dysmotility symptoms with Scl-70 positivity fits systemic sclerosis.",
      },
      {
        dxId: "primary_raynaud_phenomenon",
        yield: "reasonable",
        explanation:
          "Isolated Raynaud lacks progressive skin tightening and scleroderma antibody.",
      },
      {
        dxId: "systemic_lupus_erythematosus",
        yield: "reasonable",
        explanation:
          "Overlap possible; dominant fibrosing skin and Scl-70 points scleroderma first.",
      },
      {
        dxId: "rheumatoid_arthritis",
        yield: "low",
        explanation: "Inflammatory erosive hand arthritis pattern differs from sclerodactyly.",
      },
      {
        dxId: "mixed_connective_tissue_disease",
        yield: "dangerous-miss",
        explanation:
          "Overlap connective tissue disease shares features—anti-U1 RNP would differentiate if suspected.",
      },
    ],
    diagnosisOptions: [
      {
        id: "systemic_sclerosis",
        name: "Systemic sclerosis (scleroderma)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Clinical fibrosing phenotype with hallmark antibody.",
      },
      {
        id: "primary_raynaud_phenomenon",
        name: "Primary Raynaud phenomenon",
        isCorrect: false,
        isDangerous: false,
        explanation: "Lacks scleroderma skin findings and autoantibody profile.",
      },
      {
        id: "systemic_lupus_erythematosus",
        name: "Systemic lupus erythematosus",
        isCorrect: false,
        isDangerous: true,
        explanation: "Different dominant rashes serologies and pathology.",
      },
      {
        id: "mixed_connective_tissue_disease",
        name: "Mixed CTD overlap",
        isCorrect: false,
        isDangerous: false,
        explanation: "Consider when high anti-RNP with mixed features.",
      },
    ],
    teachingPoints: [
      "Grading (100): Raynaud pattern 25, skin findings 25, autoimmune testing 25, diagnosis 25.",
      "Scl-70 links to diffuse skin and ILD risk; anti-centromere often limited cutaneous but overlaps exist.",
      "GERD management and pulmonary screening are essentials of care.",
      "Educate on blood pressure changes for renal crisis vigilance.",
    ],
  },
];
