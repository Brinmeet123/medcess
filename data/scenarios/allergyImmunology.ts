import type { Scenario } from "@/data/scenarios";

const ALLERGY_SPECIALTY = "Allergy & Immunology" as const;

export const allergyImmunologyScenarios: Scenario[] = [
  {
    id: "spring-allergic-rhinitis",
    title: "Spring Is Destroying Me",
    specialty: ALLERGY_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "You are evaluating Ethan Parker, a 16-year-old high school student in a pediatric clinic with weeks of sneezing, runny nose, and itchy eyes that worsen outdoors and during soccer.",
    cardTeaser: "I've been sneezing nonstop, and my nose won't stop running.",
    objectives: [
      "Take a focused allergic rhinitis history including seasonal and outdoor triggers.",
      "Distinguish allergic rhinitis from infectious and nonallergic causes.",
      "Select appropriate allergy testing and avoid unnecessary imaging."
    ],
    patientPersona: {
      name: "Ethan Parker",
      age: 16,
      gender: "Male",
      chiefComplaint: "I've been sneezing nonstop, and my nose won't stop running.",
      background:
        "Ethan is a high school student and varsity soccer player. Symptoms started about three weeks ago and flare after school and at outdoor practice. He feels better indoors and had similar problems last spring. He is annoyed but cooperative.",
      vitals: {
        heartRate: 76,
        bloodPressure: "112/68",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Symptoms began ~3 weeks ago in spring",
        "Worse outdoors, after school, and during soccer",
        "Sneezing fits, watery itchy eyes, nasal congestion, itchy throat",
        "Clear nasal drainage without fever or purulent discharge",
        "Improves indoors",
        "Similar symptoms last spring",
        "No thick green mucus or body aches"
      ],
      redFlags: [
        "Prolonged symptoms without fever may still need infection exclusion",
        "Purulent discharge and facial pain would suggest sinusitis",
        "Wheezing or exertional dyspnea would raise asthma concern"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Ethan, a tired but friendly teenage boy. Use casual, natural language. Sound like a real kid, not a textbook.",
      behaviorRules: [
        "Answer only as the patient. Do NOT speak as a doctor or give medical advice.",
        "Do NOT mention disease names or diagnoses.",
        "Answer only what was asked; add one small natural detail when it fits.",
        "Reveal specifics (triggers, eye symptoms, last spring) when asked clearly.",
        "If asked for a diagnosis, say you are a simulated patient and cannot give real medical advice."
      ],
      doNotRevealDirectly: [
        "seasonal allergic rhinitis",
        "hay fever",
        "pollen allergy",
        "You need antihistamines",
        "This is bacterial sinusitis"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing adolescent, no acute distress.",
        details:
          "Alert, cooperative teenager in no respiratory distress. Allergic shiners (dark circles) under both eyes."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Allergic facies with pale swollen turbinates and clear rhinorrhea.",
        details:
          "Pale, boggy, swollen nasal mucosa with clear watery discharge. Mild bilateral conjunctival injection without purulent discharge. Oropharynx mildly cobblestoned posteriorly. Tympanic membranes normal."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear; no wheezing today.",
        details:
          "Breath sounds clear bilaterally. No wheezes, crackles, or increased work of breathing at rest."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result: "Within normal limits. No leukocytosis.",
        yield: "low"
      },
      {
        testId: "serum_ige",
        result: "Total IgE mildly elevated above reference range.",
        yield: "helpful"
      },
      {
        testId: "allergy_skin_prick",
        result: "Positive wheal-and-flare reactions to grass and tree pollen extracts.",
        yield: "high"
      },
      {
        testId: "nasal_swab",
        result: "No pathogenic bacteria or respiratory viruses detected.",
        yield: "helpful"
      },
      {
        testId: "sinus_ct",
        result: "Not indicated for uncomplicated seasonal symptoms without persistent purulence, facial pain, or fever.",
        yield: "inappropriate"
      },
      {
        testId: "cxr",
        result: "Normal heart size and clear lung fields.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No acute abnormality.",
      bedsideDefault: "No significant abnormality.",
      procedureDefault: "Not indicated in this case."
    },
    finalDxId: "seasonal_allergic_rhinitis",
    requiredMustNotMiss: ["bacterial_sinusitis", "asthma"],
    dxOverrides: [
      {
        dxId: "seasonal_allergic_rhinitis",
        yield: "correct",
        explanation:
          "Spring onset with outdoor/soccer triggers, itchy eyes, clear rhinorrhea, allergic exam, elevated IgE, and positive pollen skin tests fit seasonal allergic rhinitis."
      },
      {
        dxId: "viral_uri",
        yield: "reasonable",
        explanation:
          "URI can cause rhinorrhea, but lack of fever, myalgias, and purulence plus seasonal recurrence and allergy testing favor rhinitis."
      },
      {
        dxId: "bacterial_sinusitis",
        yield: "dangerous-miss",
        explanation:
          "Must consider when purulent discharge, facial pain, or fever persist, but this presentation lacks those features."
      },
      {
        dxId: "nonallergic_rhinitis",
        yield: "reasonable",
        explanation:
          "Causes congestion without clear atopy; positive pollen testing and itch make allergic rhinitis more likely."
      },
      {
        dxId: "asthma",
        yield: "dangerous-miss",
        explanation:
          "Coexists with atopy; ask about cough or wheeze with exercise. Lungs are clear today but asthma can accompany allergic disease."
      },
      {
        dxId: "allergic_conjunctivitis",
        yield: "reasonable",
        explanation:
          "Explains itchy red eyes and often occurs with rhinitis; overall picture is allergic rhinoconjunctivitis."
      }
    ],
    diagnosisOptions: [
      {
        id: "seasonal_allergic_rhinitis",
        name: "Seasonal allergic rhinitis",
        isCorrect: true,
        isDangerous: false,
        explanation: "Best fit for spring symptoms, outdoor triggers, allergic exam, and positive pollen testing."
      },
      {
        id: "bacterial_sinusitis",
        name: "Acute bacterial sinusitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Typically includes purulent discharge, facial pain, and often fever lasting >10 days."
      },
      {
        id: "viral_uri",
        name: "Viral upper respiratory infection",
        isCorrect: false,
        isDangerous: false,
        explanation: "Usually shorter with systemic symptoms; lacks classic seasonal allergic itch and recurrence."
      }
    ],
    teachingPoints: [
      "Grading (100): History 30, allergic trigger pattern 25, appropriate testing 15, correct diagnosis 30. Deductions: bacterial sinusitis without fever/purulence (-15), early sinus CT (-10), missing seasonal trigger (-20).",
      "Seasonal allergic rhinitis presents with sneezing, itchy eyes, clear rhinorrhea, and outdoor triggers.",
      "Allergic shiners and pale boggy turbinates support an allergic rather than infectious picture.",
      "Skin prick or specific IgE testing confirms sensitization; sinus CT is not first-line for uncomplicated rhinitis.",
      "Coexisting asthma should be screened in atopic patients with cough or exertional symptoms."
    ]
  },
  {
    id: "peanut-anaphylaxis",
    title: "Something I Ate Is Wrong",
    specialty: ALLERGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Maya Singh, an 18-year-old college freshman, presents to the emergency department 15 minutes after eating Pad Thai with lip swelling, throat tightness, hives, and hypotension.",
    cardTeaser: "My lips feel funny, and my throat feels tight.",
    objectives: [
      "Recognize anaphylaxis as an immediate emergency.",
      "Obtain food and allergy exposure history without delaying treatment.",
      "Identify airway and hemodynamic compromise and prioritize epinephrine."
    ],
    patientPersona: {
      name: "Maya Singh",
      age: 18,
      gender: "Female",
      chiefComplaint: "My lips feel funny, and my throat feels tight.",
      background:
        "College freshman who ate Pad Thai at a restaurant about 15 minutes ago. She is anxious and frightened. She thinks there may have been peanut in the dish and had a reaction to peanuts as a child.",
      vitals: {
        heartRate: 122,
        bloodPressure: "92/60",
        respiratoryRate: 24,
        oxygenSat: "93%",
        temperature: "98.8°F"
      },
      keyHistoryPoints: [
        "Onset ~15 minutes after eating Pad Thai",
        "Lip swelling, throat tightness, itchy skin, hives",
        "Trouble swallowing and mild wheezing",
        "Possible peanut exposure; childhood peanut reaction",
        "Hypotension and tachycardia on presentation",
        "No fever"
      ],
      redFlags: [
        "Throat tightness and hoarse voice (airway involvement)",
        "Hypotension",
        "Hypoxia",
        "Multisystem reaction after food exposure"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Maya, scared and breathless but trying to cooperate. Short, urgent sentences when discussing breathing or throat.",
      behaviorRules: [
        "Answer only as the patient. Do NOT speak as a doctor.",
        "Do NOT name anaphylaxis or tell the doctor what drug to give.",
        "You may say you are terrified; do not downplay throat or breathing symptoms.",
        "Mention Pad Thai and possible peanut only when asked about food or allergies.",
        "If asked for a diagnosis, say you are a simulated patient."
      ],
      doNotRevealDirectly: [
        "anaphylaxis",
        "epinephrine",
        "EpiPen",
        "You are having a peanut allergy attack",
        "This is just anxiety"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Anxious, flushed, in moderate distress.",
        details:
          "Young woman appears frightened and diaphoretic. Audible mild inspiratory stridor not present but voice is hoarse. No fever."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Lip swelling and urticaria; no angioedema of tongue visible.",
        details:
          "Upper lip edema with facial flushing. Oropharynx difficult to fully visualize due to distress; patient reports throat tightness. No tonsillar exudate."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Mild expiratory wheezes bilaterally.",
        details:
          "Increased work of breathing with scattered mild wheezes. No focal crackles. Accessory muscle use mild."
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Diffuse urticarial wheals.",
        details:
          "Generalized erythematous raised wheals across trunk and arms. No blistering or purpura."
      }
    ],
    testOverrides: [
      {
        testId: "serum_tryptase",
        result: "Elevated serum tryptase consistent with mast cell activation if drawn during acute event.",
        yield: "helpful"
      },
      {
        testId: "ecg",
        result: "Sinus tachycardia. No ischemic ST changes.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Nonspecific; no leukocytosis to suggest primary infection.",
        yield: "low"
      },
      {
        testId: "cxr",
        result: "Clear lung fields. No infiltrate or pneumothorax.",
        yield: "low"
      },
      {
        testId: "cmp",
        result: "Within normal limits aside from mild hemoconcentration from dehydration.",
        yield: "low"
      },
      {
        testId: "allergy_skin_prick",
        result: "Allergy testing should not delay acute treatment; schedule after stabilization.",
        yield: "inappropriate"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits unless otherwise specified.",
      imagingDefault: "No acute cardiopulmonary abnormality.",
      bedsideDefault: "See scenario-specific results.",
      procedureDefault: "Defer until patient stabilized."
    },
    finalDxId: "peanut_anaphylaxis",
    requiredMustNotMiss: ["peanut_anaphylaxis", "angioedema"],
    dxOverrides: [
      {
        dxId: "peanut_anaphylaxis",
        yield: "correct",
        explanation:
          "Acute multisystem reaction minutes after likely peanut exposure with urticaria, airway symptoms, wheeze, and hypotension is peanut-induced anaphylaxis."
      },
      {
        dxId: "panic",
        yield: "low",
        explanation:
          "Anxiety can cause tachycardia, but does not explain hypotension, hives, lip swelling, and wheeze after food exposure."
      },
      {
        dxId: "asthma",
        yield: "reasonable",
        explanation:
          "Wheezing is present, but food trigger with urticaria and hypotension indicates anaphylaxis rather than isolated asthma."
      },
      {
        dxId: "food_intolerance",
        yield: "low",
        explanation:
          "Intolerance rarely causes hypotension, urticaria, and airway compromise within minutes."
      },
      {
        dxId: "angioedema",
        yield: "dangerous-miss",
        explanation:
          "Overlaps with lip swelling; anaphylaxis includes angioedema plus systemic features requiring epinephrine."
      },
      {
        dxId: "viral_urticaria",
        yield: "low",
        explanation:
          "Viral rashes usually accompany fever and URI symptoms, not acute hypotension after a meal."
      }
    ],
    diagnosisOptions: [
      {
        id: "peanut_anaphylaxis",
        name: "Peanut-induced anaphylaxis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Food-triggered multisystem reaction with airway compromise and hypotension."
      },
      {
        id: "panic",
        name: "Panic attack",
        isCorrect: false,
        isDangerous: false,
        explanation: "Cannot explain urticaria, angioedema, wheeze, and hypotension after eating."
      },
      {
        id: "food_intolerance",
        name: "Food intolerance",
        isCorrect: false,
        isDangerous: false,
        explanation: "Typically GI-limited without hypotension or hives."
      }
    ],
    teachingPoints: [
      "Grading (100): Emergency recognition 30, food/allergy history 20, airway/BP danger 25, correct diagnosis 25. Bonus: epinephrine first-line (+10). Deductions: panic only (-25), delay for allergy testing (-20), miss hypotension (-20).",
      "Anaphylaxis is clinical: acute onset with skin/mucosal, respiratory, or cardiovascular involvement after exposure.",
      "IM epinephrine is first-line; antihistamines and steroids are adjuncts and do not replace epinephrine.",
      "Do not delay treatment for allergy testing or tryptase; tryptase may support the diagnosis if drawn timely.",
      "Prescribe epinephrine auto-injector and allergist follow-up after stabilization."
    ]
  },
  {
    id: "cvid-recurrent-infections",
    title: "Another Infection Again?",
    specialty: ALLERGY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Noah Martinez, an 8-year-old boy, is referred to pediatric immunology for recurrent ear infections, pneumonias, poor growth, and a family history of immune problems.",
    cardTeaser: "He gets infections constantly.",
    objectives: [
      "Characterize frequency and severity of infections.",
      "Recognize a primary immunodeficiency pattern.",
      "Order immunoglobulins and vaccine antibody responses."
    ],
    patientPersona: {
      name: "Noah Martinez",
      age: 8,
      gender: "Male",
      chiefComplaint: "He gets infections constantly.",
      background:
        "Third-grade student brought by his mother to immunology clinic. He has had eight ear infections in the past year, three pneumonias in two years, frequent sinus infections, slow recovery after antibiotics, frequent school absences, and poor weight gain. Maternal uncle has immune problems.",
      vitals: {
        heartRate: 88,
        bloodPressure: "98/62",
        respiratoryRate: 18,
        oxygenSat: "98%",
        temperature: "99.0°F"
      },
      keyHistoryPoints: [
        "8 ear infections in past year",
        "3 pneumonias in last 2 years",
        "Recurrent sinus infections",
        "Slow recovery after antibiotics",
        "Misses school often; poor weight gain",
        "Family history of immune problems (maternal uncle)",
        "No known allergies or asthma diagnosis"
      ],
      redFlags: [
        "Invasive or recurrent bacterial pneumonias",
        "Failure to thrive / poor growth",
        "Low immunoglobulins or poor vaccine responses",
        "Family history of immunodeficiency"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Noah's mother for history questions; Noah may answer simple comfort questions briefly. Sound worried but organized.",
      behaviorRules: [
        "For medical history, speak as the mother ('he' / 'my son'). Noah only answers simple questions about how he feels today.",
        "Do NOT name CVID or immunodeficiency.",
        "Provide infection counts and pneumonia history when asked specifically.",
        "If asked for a diagnosis, say you are simulated patients."
      ],
      doNotRevealDirectly: [
        "CVID",
        "immunodeficiency",
        "IgG is low",
        "He just has normal kid colds",
        "cystic fibrosis"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Thin-appearing child, no acute distress today.",
        details:
          "Eight-year-old boy appears smaller than expected for age (low weight percentile). Alert, interactive, no respiratory distress at rest. Low-grade temperature."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Mild cervical lymphadenopathy; small tonsils.",
        details:
          "Shotty anterior cervical lymph nodes. Tonsils appear small. Tympanic membranes without acute effusion today."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Lungs clear today.",
        details:
          "Clear to auscultation bilaterally. No wheezes or crackles on today's exam between infections."
      }
    ],
    testOverrides: [
      {
        testId: "immunoglobulins",
        result: "IgG markedly low; IgA and IgM below age-appropriate reference ranges.",
        yield: "high"
      },
      {
        testId: "vaccine_antibody_titers",
        result: "Poor protective antibody responses to prior immunizations (e.g., tetanus, pneumococcal).",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "Within normal limits today; no leukopenia.",
        yield: "helpful"
      },
      {
        testId: "cxr",
        result: "Mild peribronchial scarring in right lower lobe consistent with prior infection; no acute infiltrate.",
        yield: "helpful"
      },
      {
        testId: "hiv_test",
        result: "Negative for HIV-1/2 antibodies/antigen.",
        yield: "helpful"
      },
      {
        testId: "sweat_chloride",
        result: "Normal sweat chloride; does not support cystic fibrosis.",
        yield: "helpful"
      },
      {
        testId: "lymphocyte_subset",
        result: "B-cell numbers low-normal; T cells present in adequate numbers for age.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Pending immunology panel.",
      imagingDefault: "No acute infiltrate.",
      bedsideDefault: "No acute distress.",
      procedureDefault: "Not indicated unless specific suspicion."
    },
    finalDxId: "cvid",
    requiredMustNotMiss: ["cvid", "hiv_infection", "cystic_fibrosis"],
    dxOverrides: [
      {
        dxId: "cvid",
        yield: "correct",
        explanation:
          "Recurrent bacterial sinopulmonary infections, poor growth, low immunoglobulins, and impaired vaccine responses fit common variable immunodeficiency."
      },
      {
        dxId: "cystic_fibrosis",
        yield: "dangerous-miss",
        explanation:
          "Also causes recurrent lung disease and poor growth; sweat chloride testing helps distinguish."
      },
      {
        dxId: "hiv_infection",
        yield: "dangerous-miss",
        explanation:
          "Must be excluded in recurrent infections; negative HIV test makes this less likely."
      },
      {
        dxId: "recurrent_viral_infections",
        yield: "low",
        explanation:
          "Frequent mild colds are common in children but do not explain pneumonias and marked hypogammaglobulinemia."
      },
      {
        dxId: "primary_ciliary_dyskinesia",
        yield: "reasonable",
        explanation:
          "Causes recurrent sinopulmonary disease; immunoglobulin levels are typically normal."
      },
      {
        dxId: "asthma",
        yield: "low",
        explanation:
          "May coexist but does not explain low antibody levels and invasive bacterial infections."
      }
    ],
    diagnosisOptions: [
      {
        id: "cvid",
        name: "Common variable immunodeficiency (CVID)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Recurrent serious infections with hypogammaglobulinemia and poor vaccine responses."
      },
      {
        id: "recurrent_viral_infections",
        name: "Recurrent viral infections (normal childhood)",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not account for pneumonias, poor growth, and abnormal immunoglobulins."
      },
      {
        id: "cystic_fibrosis",
        name: "Cystic fibrosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Consider in differential; normal sweat chloride makes CF less likely here."
      }
    ],
    teachingPoints: [
      "Grading (100): Infection history 25, recurrent serious pattern 25, immunoglobulin/vaccine testing 30, correct diagnosis 20. Deductions: normal childhood illness (-20), miss pneumonia history (-15), no immune testing (-25).",
      "Warning signs for primary immunodeficiency include recurrent pneumonias, poor growth, and family history.",
      "Check quantitative immunoglobulins and specific antibody responses to vaccines.",
      "CVID is a diagnosis of exclusion with low IgG/IgA/IgM and impaired vaccine responses.",
      "Management includes infection prevention, Ig replacement when indicated, and subspecialty follow-up."
    ]
  },
  {
    id: "exercise-induced-asthma",
    title: "Coach Thinks I'm Out of Shape",
    specialty: ALLERGY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Sarah Johnson, a 17-year-old track athlete, presents to sports medicine with six months of chest tightness and cough starting about 10 minutes into running, with improvement at rest.",
    cardTeaser: "I get short of breath during practice.",
    objectives: [
      "Link symptoms to exercise timing and recovery with rest.",
      "Differentiate exercise-induced bronchoconstriction from poor conditioning.",
      "Order spirometry or exercise challenge when suspicion is high."
    ],
    patientPersona: {
      name: "Sarah Johnson",
      age: 17,
      gender: "Female",
      chiefComplaint: "I get short of breath during practice.",
      background:
        "High school track athlete frustrated that her coach thinks she is out of shape. For six months she gets chest tightness and cough about 10 minutes into runs, sometimes hears wheezing afterward, and feels better with rest. Mother has asthma. No fever, rest chest pain, or syncope.",
      vitals: {
        heartRate: 72,
        bloodPressure: "110/70",
        respiratoryRate: 15,
        oxygenSat: "99%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Symptoms ~6 months during running",
        "Onset ~10 minutes into exercise",
        "Chest tightness and post-exercise cough",
        "Occasional wheezing after practice",
        "Improves with rest",
        "Mother with asthma",
        "No fever, rest pain, or fainting"
      ],
      redFlags: [
        "Syncope or chest pain at rest would suggest cardiac causes",
        "Fever or productive cough would suggest infection",
        "Symptoms at rest suggest uncontrolled persistent asthma"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Sarah, a motivated athlete who is embarrassed and a bit defensive about her fitness. Natural teenage speech.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say exercise-induced asthma or bronchoconstriction.",
        "Emphasize timing with running and relief with rest when asked.",
        "Mention mother's asthma only when family history is asked."
      ],
      doNotRevealDirectly: [
        "exercise-induced asthma",
        "EIB",
        "I'm just out of shape",
        "pneumonia",
        "You need an inhaler before exercise"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing athletic adolescent.",
        details:
          "Fit-appearing teenager in no distress at rest. Speaking in full sentences comfortably in clinic."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Clear lungs at rest.",
        details:
          "Chest expansion symmetric. Breath sounds clear without wheezes, rhonchi, or crackles while resting after clinic walk-in."
      },
      {
        id: "cardiac",
        label: "Cardiac",
        summary: "Normal heart exam.",
        details:
          "Regular rate and rhythm. No murmurs, gallops, or rubs. No peripheral edema."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Normal oropharynx.",
        details: "Oropharynx without erythema or exudate. No nasal polyps noted."
      }
    ],
    testOverrides: [
      {
        testId: "spirometry",
        result: "Pre-bronchodilator spirometry within normal limits at rest.",
        yield: "helpful"
      },
      {
        testId: "exercise_challenge",
        result: "Post-exercise FEV1 falls >10–15% from baseline consistent with exercise-induced bronchoconstriction.",
        yield: "high"
      },
      {
        testId: "peak_flow",
        result: "Peak flow drops approximately 18% compared with pre-exercise value.",
        yield: "high"
      },
      {
        testId: "cxr",
        result: "Normal cardiac silhouette and clear lungs.",
        yield: "low"
      },
      {
        testId: "ecg",
        result: "Normal sinus rhythm. No arrhythmia or ischemic changes.",
        yield: "low"
      },
      {
        testId: "cbc",
        result: "Within normal limits; hemoglobin normal.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits.",
      imagingDefault: "No acute abnormality.",
      bedsideDefault: "Normal at rest.",
      procedureDefault: "Exercise testing may be required to demonstrate bronchoconstriction."
    },
    finalDxId: "exercise_induced_asthma",
    requiredMustNotMiss: ["exercise_induced_asthma", "cardiac_arrhythmia"],
    dxOverrides: [
      {
        dxId: "exercise_induced_asthma",
        yield: "correct",
        explanation:
          "Exertional chest tightness and cough with post-exercise wheeze, normal rest exam, and positive exercise challenge fit exercise-induced bronchoconstriction."
      },
      {
        dxId: "poor_conditioning",
        yield: "low",
        explanation:
          "Deconditioning causes breathlessness but not typical post-exercise wheeze and reversible airflow drop on testing."
      },
      {
        dxId: "vocal_cord_dysfunction",
        yield: "reasonable",
        explanation:
          "Mimics asthma with inspiratory symptoms; exercise challenge and wheeze pattern favor EIB."
      },
      {
        dxId: "panic",
        yield: "low",
        explanation:
          "Anxiety can affect performance but does not explain objective post-exercise airflow decline."
      },
      {
        dxId: "anemia",
        yield: "low",
        explanation:
          "Would cause fatigue with normal CBC and more global exertional intolerance."
      },
      {
        dxId: "pneumonia",
        yield: "low",
        explanation:
          "Requires infectious symptoms and infiltrate; absent here."
      }
    ],
    diagnosisOptions: [
      {
        id: "exercise_induced_asthma",
        name: "Exercise-induced asthma (exercise-induced bronchoconstriction)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Exertional symptoms with positive exercise challenge and family atopy."
      },
      {
        id: "poor_conditioning",
        name: "Poor physical conditioning",
        isCorrect: false,
        isDangerous: false,
        explanation: "Unlikely with wheeze and abnormal post-exercise pulmonary testing."
      },
      {
        id: "vocal_cord_dysfunction",
        name: "Vocal cord dysfunction",
        isCorrect: false,
        isDangerous: false,
        explanation: "Consider if inspiratory stridor predominates; testing here supports EIB."
      }
    ],
    teachingPoints: [
      "Grading (100): Exercise timing 20, exertional pattern 25, spirometry/exercise challenge 25, correct diagnosis 30. Deductions: poor fitness only (-20), miss family asthma (-10), pneumonia without infection (-15).",
      "Exercise-induced bronchoconstriction often has normal resting spirometry.",
      "Diagnosis is supported by drop in FEV1 or peak flow after exercise.",
      "Pre-exercise bronchodilator and warm-up are mainstays of management.",
      "Family history of atopy increases asthma risk."
    ]
  },
  {
    id: "atopic-dermatitis-eczema",
    title: "This Rash Never Goes Away",
    specialty: ALLERGY_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 10,
    description:
      "Olivia Chen, a 7-year-old girl, is seen in pediatric clinic for years of itchy rash behind the knees and elbows that worsens in winter and disrupts sleep.",
    cardTeaser: "She scratches all night.",
    objectives: [
      "Recognize chronic pruritic flexural rash pattern.",
      "Differentiate atopic dermatitis from infection and contact dermatitis.",
      "Use history and exam before invasive testing."
    ],
    patientPersona: {
      name: "Olivia Chen",
      age: 7,
      gender: "Female",
      chiefComplaint: "She scratches all night.",
      background:
        "Second-grader brought by her father for chronic itchy rash for several years, worse in winter and after hot baths. Rash mainly in antecubital and popliteal fossae. Sleep is disrupted. Skin is very dry. Father has asthma; no one else at home has the rash.",
      vitals: {
        heartRate: 84,
        bloodPressure: "96/60",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "98.5°F"
      },
      keyHistoryPoints: [
        "Chronic itchy rash for years",
        "Flexural distribution (elbows and knees)",
        "Worse in winter and after hot showers",
        "Dry skin and nocturnal scratching",
        "Father with asthma (family atopy)",
        "No fever, pus, new medications, or household contacts with rash"
      ],
      redFlags: [
        "Honey-colored crusting suggests impetigo superinfection",
        "Diffuse body rash in contacts suggests scabies",
        "Systemic symptoms with rash could suggest drug reaction"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Olivia's father for most history; Olivia can say it itches and hurts when she scratches. Warm, concerned parent tone.",
      behaviorRules: [
        "Speak as the father for timeline, sleep, and treatments.",
        "Olivia may answer simple questions about itch in childlike language.",
        "Do NOT say eczema or atopic dermatitis.",
        "Mention winter flare and flexural areas when location is asked."
      ],
      doNotRevealDirectly: [
        "eczema",
        "atopic dermatitis",
        "ringworm",
        "scabies",
        "She needs steroids"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing child, no fever.",
        details:
          "Interactive 7-year-old in no acute distress. Afebrile. Well hydrated."
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Dry skin with flexural erythema and excoriations.",
        details:
          "Xerosis generalized. Erythematous, lichenified plaques with excoriation marks in antecubital and popliteal fossae. No honey-colored crusting, vesicles, or burrows. No signs of cellulitis."
      }
    ],
    testOverrides: [
      {
        testId: "serum_ige",
        result: "Total IgE mildly elevated.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "Mild peripheral eosinophilia.",
        yield: "helpful"
      },
      {
        testId: "skin_scraping",
        result: "Negative for fungal elements and scabies mites.",
        yield: "helpful"
      },
      {
        testId: "allergy_skin_prick",
        result: "May show sensitization to dust mite or environmental allergens; supports atopic diathesis.",
        yield: "helpful"
      },
      {
        testId: "skin_biopsy",
        result: "Not routinely required when classic history and exam are present.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Within normal limits unless atopy workup ordered.",
      imagingDefault: "Not applicable.",
      bedsideDefault: "Clinical diagnosis supported by exam.",
      procedureDefault: "Biopsy reserved for atypical or treatment-resistant cases."
    },
    finalDxId: "atopic_dermatitis",
    requiredMustNotMiss: ["tinea_corporis", "scabies", "impetigo"],
    dxOverrides: [
      {
        dxId: "atopic_dermatitis",
        yield: "correct",
        explanation:
          "Chronic relapsing pruritus in flexures with xerosis, lichenification, and family atopy is classic atopic dermatitis."
      },
      {
        dxId: "contact_dermatitis",
        yield: "reasonable",
        explanation:
          "Localized to contact area; bilateral flexural chronic pattern favors atopic dermatitis."
      },
      {
        dxId: "tinea_corporis",
        yield: "dangerous-miss",
        explanation:
          "Annular scaly plaque; negative scraping and chronic flexural history argue against tinea."
      },
      {
        dxId: "scabies",
        yield: "dangerous-miss",
        explanation:
          "Intense itch with burrows and household spread; no contacts affected and scraping negative."
      },
      {
        dxId: "impetigo",
        yield: "dangerous-miss",
        explanation:
          "Honey crust and rapid spread; absent here but watch for superinfection."
      },
      {
        dxId: "psoriasis",
        yield: "low",
        explanation:
          "Typically extensor surfaces with thick silvery scale, not classic flexural childhood pattern."
      },
      {
        dxId: "drug_rash",
        yield: "low",
        explanation:
          "Requires new medication temporal link; none reported."
      }
    ],
    diagnosisOptions: [
      {
        id: "atopic_dermatitis",
        name: "Atopic dermatitis (eczema)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Chronic flexural pruritus with xerosis and atopy fits eczema."
      },
      {
        id: "tinea_corporis",
        name: "Tinea corporis (ringworm)",
        isCorrect: false,
        isDangerous: false,
        explanation: "Usually annular with positive fungal scraping."
      },
      {
        id: "scabies",
        name: "Scabies",
        isCorrect: false,
        isDangerous: false,
        explanation: "Household contacts pruritic with burrows; not present here."
      }
    ],
    teachingPoints: [
      "Grading (100): Chronic itch pattern 25, flexural distribution 25, history/exam use 20, correct diagnosis 30. Deductions: fungal without evidence (-15), miss chronic pattern (-15), miss family atopy (-10).",
      "Atopic dermatitis is a clinical diagnosis in typical presentations.",
      "Emollients and topical anti-inflammatory therapy are foundation of care.",
      "Skin scraping helps exclude tinea and scabies when diagnosis is unclear.",
      "Family history of asthma/allergies supports the atopic triad."
    ]
  }
];
