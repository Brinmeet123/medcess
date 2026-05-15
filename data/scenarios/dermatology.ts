import type { Scenario } from "@/data/scenarios";

const DERMATOLOGY_SPECIALTY = "Dermatology" as const;

export const dermatologyScenarios: Scenario[] = [
  {
    id: "tinea-corporis-spreading",
    title: "This Rash Keeps Spreading",
    specialty: DERMATOLOGY_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "Ethan Collins, a 15-year-old wrestler, presents with a two-week enlarging itchy circular rash on his arm after teammates had similar skin problems.",
    cardTeaser: "I noticed this weird itchy circle on my arm.",
    objectives: [
      "Recognize classic annular tinea corporis morphology.",
      "Obtain exposure history in athletes (skin-to-skin contact).",
      "Confirm with KOH preparation before unnecessary biopsy."
    ],
    patientPersona: {
      name: "Ethan Collins",
      age: 15,
      gender: "Male",
      chiefComplaint: "I noticed this weird itchy circle on my arm.",
      background:
        "High school wrestler with a small round itchy spot on his forearm two weeks ago that slowly grew outward. Mild itch only. Several teammates recently had skin rashes. OTC lotion did not help. No fever.",
      vitals: {
        heartRate: 72,
        bloodPressure: "112/68",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Two-week enlarging circular rash",
        "Raised scaly border with central clearing",
        "Wrestling exposure; teammates with skin issues",
        "Mild itch, no fever or pain",
        "Failed OTC lotion",
        "KOH positive for fungal elements",
        "No cellulitis or drainage"
      ],
      redFlags: [
        "Rapid spread with fever would suggest bacterial superinfection",
        "Bullous or purulent lesions need alternate diagnosis"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Ethan, a teenage athlete embarrassed about the rash. Casual, not medical.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say ringworm or tinea.",
        "Mention wrestling and teammates when asked about sports or exposure.",
        "Describe ring shape and itch when asked about the rash."
      ],
      doNotRevealDirectly: [
        "ringworm",
        "tinea corporis",
        "fungal infection",
        "You need antibiotics for cellulitis"
      ]
    },
    physicalExam: [
      {
        id: "skin",
        label: "Skin",
        summary: "Annular erythematous plaque with scaly raised border.",
        details:
          "On the right forearm, a roughly 4 cm circular erythematous plaque with an active raised scaly border and partial central clearing. No purulence, honey crust, or surrounding warmth."
      },
      {
        id: "general",
        label: "General",
        summary: "Well-appearing adolescent, no fever.",
        details: "No acute distress. Afebrile."
      }
    ],
    testOverrides: [
      {
        testId: "koh_prep",
        result: "KOH preparation positive for septate hyphae — supports dermatophyte infection.",
        yield: "high"
      },
      {
        testId: "skin_scraping",
        result: "Microscopy of scale from active border shows fungal elements.",
        yield: "high"
      },
      {
        testId: "wood_lamp",
        result: "No characteristic fluorescence; not required for diagnosis when KOH positive.",
        yield: "low"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      },
      {
        testId: "skin_biopsy",
        result: "Not indicated when classic morphology and positive KOH confirm dermatophyte infection.",
        yield: "inappropriate"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "Not applicable.",
      bedsideDefault: "See dermatologic testing.",
      procedureDefault: "Topical antifungals first line for localized tinea corporis."
    },
    finalDxId: "tinea_corporis",
    requiredMustNotMiss: ["tinea_corporis", "cellulitis"],
    dxOverrides: [
      {
        dxId: "tinea_corporis",
        yield: "correct",
        explanation:
          "Annular plaque with central clearing, scaly border, wrestling exposure, and positive KOH fit tinea corporis."
      },
      {
        dxId: "atopic_dermatitis",
        yield: "low",
        explanation: "Eczema favors flexures and chronic bilaterality, not single enlarging ring."
      },
      {
        dxId: "psoriasis",
        yield: "low",
        explanation: "Psoriasis plaques are typically extensor with silvery scale, not central clearing ring."
      },
      {
        dxId: "contact_dermatitis",
        yield: "reasonable",
        explanation: "Can be pruritic but usually corresponds to contact pattern, not classic ringworm morphology."
      },
      {
        dxId: "cellulitis",
        yield: "dangerous-miss",
        explanation: "Must consider if fever, warmth, and purulence; absent here."
      },
      {
        dxId: "lyme_disease",
        yield: "low",
        explanation: "Erythema migrans expands but lacks scaly raised border and KOH-positive fungi."
      }
    ],
    diagnosisOptions: [
      {
        id: "tinea_corporis",
        name: "Tinea corporis (ringworm)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Classic ring lesion with positive KOH."
      },
      {
        id: "cellulitis",
        name: "Cellulitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "No fever, warmth, or purulence."
      },
      {
        id: "atopic_dermatitis",
        name: "Atopic dermatitis (eczema)",
        isCorrect: false,
        isDangerous: false,
        explanation: "Wrong morphology and distribution."
      }
    ],
    teachingPoints: [
      "Grading (100): Ring lesion 25, sports exposure 25, KOH 25, diagnosis 25. Deductions: cellulitis (-15), immediate biopsy (-10).",
      "Tinea corporis shows annular plaque with active scaly border and central clearing.",
      "Obtain scale from the active border for KOH prep.",
      "Wrestling and close contact sports increase dermatophyte transmission.",
      "Topical antifungals treat limited disease; evaluate for superinfection if systemic symptoms."
    ]
  },
  {
    id: "melanoma-mole-changed",
    title: "I Think This Mole Changed",
    specialty: DERMATOLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Karen Mitchell, a 54-year-old real estate agent, is concerned about a pigmented lesion on her shoulder that has darkened, enlarged, and developed irregular borders over months.",
    cardTeaser: "My mole doesn't look the way it used to.",
    objectives: [
      "Apply ABCDE criteria for melanoma screening.",
      "Obtain sun exposure and sunscreen history.",
      "Perform dermoscopy and excisional biopsy when melanoma suspected."
    ],
    patientPersona: {
      name: "Karen Mitchell",
      age: 54,
      gender: "Female",
      chiefComplaint: "My mole doesn't look the way it used to.",
      background:
        "Real estate agent who spends much time outdoors showing homes. Noticed a mole on her upper back changing over several months — darker, larger, irregular edges, occasional itch. Rarely uses sunscreen. Anxious about skin cancer.",
      vitals: {
        heartRate: 74,
        bloodPressure: "126/78",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Mole changing over months — color, size, border",
        "Asymmetric pigmented lesion >6 mm",
        "Multiple colors within lesion",
        "Frequent sun exposure, poor sunscreen use",
        "Dermoscopy concerning; biopsy malignant melanocytes",
        "Occasional itch, no bleeding"
      ],
      redFlags: [
        "ABCDE-positive lesion requires biopsy",
        "Delay increases metastatic risk",
        "Full skin exam for additional primaries"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Karen, professional woman worried but composed. Mention showing houses outdoors.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say melanoma or cancer until biopsy is your own worry in general terms.",
        "Describe changes in color, size, shape when asked.",
        "Admit inconsistent sunscreen honestly."
      ],
      doNotRevealDirectly: [
        "melanoma",
        "this is definitely cancer",
        "ABCDE",
        "You need chemotherapy today"
      ]
    },
    physicalExam: [
      {
        id: "skin",
        label: "Skin",
        summary: "Asymmetric multicolored pigmented lesion >6 mm.",
        details:
          "Upper back: 9 mm macule with asymmetry, irregular borders, and variegated brown-black-pink coloration. No ulceration on today's exam. Full skin survey without other obvious lesions noted briefly."
      },
      {
        id: "general",
        label: "General",
        summary: "Well-appearing, no lymphadenopathy on quick exam.",
        details: "No palpable cervical or axillary lymphadenopathy on screening exam."
      }
    ],
    testOverrides: [
      {
        testId: "dermoscopy",
        result:
          "Dermoscopy shows atypical pigment network, irregular dots/globules, and blue-white veil — high suspicion for melanoma.",
        yield: "high"
      },
      {
        testId: "skin_biopsy",
        result:
          "Excisional biopsy demonstrates malignant melanocytes invading the dermis — melanoma confirmed pending staging.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      },
      {
        testId: "ct_chest",
        result: "Not first-line before histologic diagnosis and staging workup per guidelines.",
        yield: "inappropriate"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "Staging imaging only after confirmed melanoma diagnosis.",
      bedsideDefault: "Document lesion with photography when possible.",
      procedureDefault: "Excisional biopsy with appropriate margins per pathology."
    },
    finalDxId: "melanoma",
    requiredMustNotMiss: ["melanoma"],
    dxOverrides: [
      {
        dxId: "melanoma",
        yield: "correct",
        explanation:
          "Changing asymmetric multicolored lesion with ABCDE features and biopsy-proven malignant melanocytes."
      },
      {
        dxId: "benign_nevus",
        yield: "low",
        explanation: "Benign nevi are stable, symmetric, and uniform in color."
      },
      {
        dxId: "seborrheic_keratosis",
        yield: "low",
        explanation: "Typically waxy stuck-on appearance without invasive melanocyte atypia on biopsy."
      },
      {
        dxId: "basal_cell_carcinoma",
        yield: "low",
        explanation: "BCC is pearly or ulcerated, not typically variegated pigmented macule."
      },
      {
        dxId: "dysplastic_nevus",
        yield: "reasonable",
        explanation: "Can look atypical clinically; biopsy distinguishes from melanoma."
      }
    ],
    diagnosisOptions: [
      {
        id: "melanoma",
        name: "Melanoma",
        isCorrect: true,
        isDangerous: true,
        explanation: "Biopsy-proven with ABCDE clinical features."
      },
      {
        id: "benign_nevus",
        name: "Benign nevus",
        isCorrect: false,
        isDangerous: false,
        explanation: "Would be stable without malignant histology."
      },
      {
        id: "seborrheic_keratosis",
        name: "Seborrheic keratosis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Different morphology and histology."
      }
    ],
    teachingPoints: [
      "Grading (100): ABCDE 35, sun history 20, biopsy 20, diagnosis 25. Bonus: warning signs (+10).",
      "Any changing pigmented lesion warrants dermoscopy and biopsy.",
      "ABCDE: Asymmetry, Border, Color, Diameter, Evolution.",
      "Sun protection and full skin exam are essential.",
      "Staging and wide local excision follow confirmed melanoma diagnosis."
    ]
  },
  {
    id: "acne-vulgaris-face",
    title: "My Face Won't Stop Breaking Out",
    specialty: DERMATOLOGY_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "Sophia Ramirez, a 17-year-old student, presents with over a year of worsening facial and back acne with flares around her menstrual periods despite OTC products.",
    cardTeaser: "My acne keeps getting worse.",
    objectives: [
      "Classify acne severity from exam findings.",
      "Ask about menstrual flares and prior treatments.",
      "Differentiate acne vulgaris from rosacea and folliculitis."
    ],
    patientPersona: {
      name: "Sophia Ramirez",
      age: 17,
      gender: "Female",
      chiefComplaint: "My acne keeps getting worse.",
      background:
        "High school junior with acne over a year on face and upper back — blackheads, whiteheads, red bumps, occasional painful deep ones. Worse the week before her period. Tried several drugstore washes and spot treatments without success. Embarrassed about appearance.",
      vitals: {
        heartRate: 72,
        bloodPressure: "110/68",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Acne >1 year face and upper back",
        "Open and closed comedones, papules, pustules, mild nodules",
        "Worsens premenstrually",
        "Failed multiple OTC products",
        "No fever",
        "Clinical diagnosis; labs normal if checked"
      ],
      redFlags: [
        "Severe nodules/cysts or scarring — consider isotretinoin referral",
        "Signs of PCOS if irregular cycles and hirsutism"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Sophia, self-conscious teenager. Honest about trying products. Don't sound clinical.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say acne vulgaris or hormonal diagnosis names.",
        "Mention period flare when asked timing or cycles.",
        "Describe types of bumps when asked what the rash looks like."
      ],
      doNotRevealDirectly: [
        "moderate acne vulgaris",
        "isotretinoin",
        "PCOS",
        "you need Accutane"
      ]
    },
    physicalExam: [
      {
        id: "skin",
        label: "Skin",
        summary: "Moderate inflammatory acne on face and back.",
        details:
          "Face and upper back with numerous open comedones, closed comedones, inflammatory papules, and pustules. Few small tender nodules on chin. No flushing across cheeks. No follicular pustules limited to beard area only."
      },
      {
        id: "general",
        label: "General",
        summary: "Well-appearing adolescent.",
        details: "No hirsutism or acanthosis nigricans on quick screening."
      }
    ],
    testOverrides: [
      {
        testId: "hormone_panel",
        result: "Androgen panel within normal limits for age; no indication for PCOS workup on initial presentation.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits unless endocrine suspicion.",
      imagingDefault: "Not applicable.",
      bedsideDefault: "Clinical diagnosis by morphology and distribution.",
      procedureDefault: "Topical retinoid plus antimicrobial; consider oral therapy for moderate disease."
    },
    finalDxId: "acne_vulgaris",
    requiredMustNotMiss: ["acne_vulgaris"],
    dxOverrides: [
      {
        dxId: "acne_vulgaris",
        yield: "correct",
        explanation:
          "Comedones plus inflammatory papules/pustules on face and back with menstrual flare fits moderate acne vulgaris."
      },
      {
        dxId: "rosacea",
        yield: "low",
        explanation: "Rosacea features centrofacial erythema and telangiectasia, not dominant comedones."
      },
      {
        dxId: "folliculitis",
        yield: "low",
        explanation: "Superficial pustules around hairs without prominent comedonal acne pattern."
      },
      {
        dxId: "contact_dermatitis",
        yield: "low",
        explanation: "Pruritic dermatitis from product; lacks classic comedonal acne morphology."
      },
      {
        dxId: "hyperthyroidism",
        yield: "irrelevant",
        explanation: "Not suggested by history or exam."
      }
    ],
    diagnosisOptions: [
      {
        id: "acne_vulgaris",
        name: "Moderate acne vulgaris",
        isCorrect: true,
        isDangerous: false,
        explanation: "Comedonal and inflammatory acne on sebaceous areas."
      },
      {
        id: "rosacea",
        name: "Rosacea",
        isCorrect: false,
        isDangerous: false,
        explanation: "No centrofacial flushing pattern."
      },
      {
        id: "folliculitis",
        name: "Folliculitis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Lacks comedones and typical distribution."
      }
    ],
    teachingPoints: [
      "Grading (100): Acne pattern 30, menstrual link 20, history 20, diagnosis 30.",
      "Moderate acne includes papules, pustules, and comedones — may need combination therapy.",
      "Menstrual flares suggest hormonal component; consider antiandrogen therapy in appropriate patients.",
      "Rosacea lacks comedones and affects central face with flushing.",
      "Reserve hormone workup for irregular menses, hirsutism, or treatment failure with suspicion."
    ]
  },
  {
    id: "herpes-zoster-burning",
    title: "This Rash Burns and Hurts",
    specialty: DERMATOLOGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 10,
    description:
      "David Reynolds, a 63-year-old retired electrician, presents with three days of burning left chest pain followed by a painful blistering rash in a dermatomal distribution.",
    cardTeaser: "My skin burns and stings.",
    objectives: [
      "Recognize dermatomal unilateral vesicular rash of herpes zoster.",
      "Identify prodromal pain before eruption.",
      "Start antiviral therapy early when indicated."
    ],
    patientPersona: {
      name: "David Reynolds",
      age: 63,
      gender: "Male",
      chiefComplaint: "My skin burns and stings.",
      background:
        "Retired electrician who felt burning pain on the left chest for two days before blisters appeared. Rash only on one side, does not cross the sternum. Low-grade fever. No recent trauma. Had chickenpox as a child.",
      vitals: {
        heartRate: 82,
        bloodPressure: "132/80",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "99.2°F"
      },
      keyHistoryPoints: [
        "Burning pain preceded rash by ~2 days",
        "Vesicular rash left chest in dermatomal band",
        "Does not cross midline",
        "Tender to touch",
        "Low-grade fever",
        "PCR positive for varicella zoster virus"
      ],
      redFlags: [
        "Involvement of eye (V1) requires urgent ophthalmology",
        "Immunocompromised patients at risk for dissemination"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as David, older man in real pain, irritable from burning sensation. Plain speech.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say shingles or zoster.",
        "Emphasize pain before rash and one-sided only.",
        "Mention chickenpox in childhood only if past illness asked."
      ],
      doNotRevealDirectly: [
        "shingles",
        "herpes zoster",
        "varicella",
        "postherpetic neuralgia"
      ]
    },
    physicalExam: [
      {
        id: "skin",
        label: "Skin",
        summary: "Grouped vesicles on erythematous base in left T4 dermatome.",
        details:
          "Clustered vesicles and bullae on erythematous base along left anterior chest in a dermatomal distribution stopping at the sternum. Tender. No lesions on right chest."
      },
      {
        id: "general",
        label: "General",
        summary: "Mild low-grade fever, uncomfortable.",
        details: "No respiratory distress. Low-grade temperature."
      }
    ],
    testOverrides: [
      {
        testId: "varicella_zoster_pcr",
        result: "PCR positive for varicella zoster virus from vesicle fluid.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "Mild leukocytosis; otherwise unremarkable.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "PCR confirms when clinical diagnosis uncertain.",
      imagingDefault: "Not routinely required.",
      bedsideDefault: "Clinical diagnosis often sufficient in classic cases.",
      procedureDefault: "Antivirals within 72 hours of rash onset when eligible."
    },
    finalDxId: "herpes_zoster",
    requiredMustNotMiss: ["herpes_zoster"],
    dxOverrides: [
      {
        dxId: "herpes_zoster",
        yield: "correct",
        explanation:
          "Prodromal dermatomal pain with unilateral vesicles and positive VZV PCR is herpes zoster."
      },
      {
        dxId: "contact_dermatitis",
        yield: "low",
        explanation: "Contact dermatitis is pruritic, not dermatomal vesicles with severe pain."
      },
      {
        dxId: "cellulitis",
        yield: "low",
        explanation: "Cellulitis is spreading erythema without grouped vesicles in dermatome."
      },
      {
        dxId: "herpes_simplex",
        yield: "low",
        explanation: "HSV recurs at mucocutaneous sites, not classic thoracic dermatome."
      },
      {
        dxId: "impetigo",
        yield: "low",
        explanation: "Honey crust and superficial infection, not dermatomal vesicles."
      }
    ],
    diagnosisOptions: [
      {
        id: "herpes_zoster",
        name: "Herpes zoster (shingles)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Unilateral dermatomal vesicles with VZV PCR positive."
      },
      {
        id: "contact_dermatitis",
        name: "Contact dermatitis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Wrong distribution and morphology."
      },
      {
        id: "cellulitis",
        name: "Cellulitis",
        isCorrect: false,
        isDangerous: false,
        explanation: "No spreading bacterial cellulitis pattern."
      }
    ],
    teachingPoints: [
      "Grading (100): Dermatomal pattern 30, unilateral 20, testing 20, diagnosis 30.",
      "Herpes zoster is reactivation of VZV in a single dermatome.",
      "Antiviral therapy within 72 hours may reduce duration and postherpetic neuralgia.",
      "Ophthalmic (V1) involvement needs urgent eye evaluation.",
      "PCR confirms when diagnosis unclear; classic cases may be clinical."
    ]
  },
  {
    id: "stevens-johnson-peeling",
    title: "My Skin Is Peeling Everywhere",
    specialty: DERMATOLOGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Ashley Kim, a 22-year-old college student, presents to the emergency department with fever, painful rash, mucosal sores, and skin peeling after starting a new seizure medication two weeks ago.",
    cardTeaser: "My skin and mouth feel like they're burning.",
    objectives: [
      "Recognize Stevens-Johnson syndrome as a drug-induced mucocutaneous emergency.",
      "Identify new antiepileptic drug as trigger.",
      "Stop offending agent and arrange supportive care and biopsy."
    ],
    patientPersona: {
      name: "Ashley Kim",
      age: 22,
      gender: "Female",
      chiefComplaint: "My skin and mouth feel like they're burning.",
      background:
        "College student started lamotrigine for seizures two weeks ago. Three days ago developed fever, then painful red rash spreading quickly with mouth and eye irritation. Skin peeling in spots. Terrified.",
      vitals: {
        heartRate: 118,
        bloodPressure: "100/64",
        respiratoryRate: 22,
        oxygenSat: "97%",
        temperature: "102.2°F"
      },
      keyHistoryPoints: [
        "New seizure medication ~2 weeks ago",
        "Fever then rapidly spreading painful rash",
        "Mucosal involvement mouth and eyes",
        "Skin peeling and positive Nikolsky sign",
        "Biopsy consistent with SJS",
        "Hypotension and tachycardia concerning for severity"
      ],
      redFlags: [
        "SJS/TEN is life-threatening — stop culprit drug immediately",
        "Mucosal involvement and epidermal detachment",
        "Ophthalmology for eye involvement",
        "ICU-level supportive care may be required"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Ashley, scared young woman in pain. Short sentences when mouth hurts. Crying is okay.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say Stevens-Johnson or TEN.",
        "Mention new seizure medicine when medications asked.",
        "Describe mouth pain and skin peeling when asked symptoms."
      ],
      doNotRevealDirectly: [
        "Stevens-Johnson syndrome",
        "TEN",
        "toxic epidermal necrolysis",
        "stop the drug — you have SJS"
      ]
    },
    physicalExam: [
      {
        id: "skin",
        label: "Skin",
        summary: "Widespread erythematous lesions with epidermal detachment.",
        details:
          "Diffuse erythematous and purpuric macules with bullae and areas of skin detachment. Positive Nikolsky sign. Approximate involved BSA significant on exam."
      },
      {
        id: "heent",
        label: "HEENT / Mucosa",
        summary: "Painful oral and ocular mucositis.",
        details:
          "Painful erosions on buccal mucosa and lips. Conjunctival injection bilaterally. Difficulty eating."
      },
      {
        id: "general",
        label: "General",
        summary: "Ill-appearing, febrile, tachycardic.",
        details: "Appears toxic with fever and tachycardia. Mild hypotension."
      }
    ],
    testOverrides: [
      {
        testId: "skin_biopsy",
        result: "Skin biopsy shows full-thickness epidermal necrosis consistent with Stevens-Johnson syndrome.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "Mild anemia of inflammation; white count variable.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result: "Mild transaminitis; monitor for fluid losses and renal function.",
        yield: "helpful"
      },
      {
        testId: "cxr",
        result: "Clear lungs unless aspiration from mucositis — monitor clinically.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Monitor CBC, CMP, and cultures if infection suspected.",
      imagingDefault: "As clinically indicated.",
      bedsideDefault: "Calculate involved body surface area; Nikolsky sign.",
      procedureDefault: "Stop offending drug; burn-unit level care for extensive detachment."
    },
    finalDxId: "stevens_johnson_syndrome",
    requiredMustNotMiss: ["stevens_johnson_syndrome", "toxic_epidermal_necrolysis"],
    dxOverrides: [
      {
        dxId: "stevens_johnson_syndrome",
        yield: "correct",
        explanation:
          "Drug trigger, fever, mucosal erosions, epidermal detachment, and biopsy confirming SJS."
      },
      {
        dxId: "toxic_epidermal_necrolysis",
        yield: "dangerous-miss",
        explanation:
          "Spectrum with SJS; TEN has >30% BSA detachment — same drug trigger and management principles."
      },
      {
        dxId: "drug_rash",
        yield: "reasonable",
        explanation: "Simple morbilliform drug rash lacks mucosal involvement and detachment."
      },
      {
        dxId: "staphylococcal_scalded_skin",
        yield: "low",
        explanation: "SSSS in young children, superficial split without prominent drug trigger or mucosal necrosis pattern."
      },
      {
        dxId: "viral_exanthem",
        yield: "low",
        explanation: "Viral rashes rarely cause Nikolsky positive epidermal necrosis with new AED."
      }
    ],
    diagnosisOptions: [
      {
        id: "stevens_johnson_syndrome",
        name: "Stevens-Johnson syndrome (SJS)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Drug-induced mucocutaneous emergency with biopsy confirmation."
      },
      {
        id: "toxic_epidermal_necrolysis",
        name: "Toxic epidermal necrolysis (TEN)",
        isCorrect: false,
        isDangerous: true,
        explanation: "Same spectrum; >30% BSA detachment defines TEN."
      },
      {
        id: "drug_rash",
        name: "Simple drug eruption",
        isCorrect: false,
        isDangerous: false,
        explanation: "Lacks mucosal necrosis and epidermal detachment."
      }
    ],
    teachingPoints: [
      "Grading (100): Drug trigger 30, emergency severity 30, biopsy/support 15, diagnosis 25. Bonus: mucosal significance (+10).",
      "SJS/TEN are severe cutaneous adverse reactions often triggered by medications (e.g., AEDs, sulfa, allopurinol).",
      "Stop the offending drug immediately; never rechallenge.",
      "Mucosal involvement (oral, ocular, genital) is a hallmark.",
      "Supportive care, wound care, infection prevention, and ophthalmology consult are critical."
    ]
  }
];
