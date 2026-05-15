import type { Scenario } from "@/data/scenarios";

const PEDIATRICS_SPECIALTY = "Pediatrics" as const;

export const pediatricsScenarios: Scenario[] = [
  {
    id: "croup-breathing-funny-liam-turner",
    title: "My Child Is Breathing Funny",
    specialty: PEDIATRICS_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Liam Turner, a 3-year-old boy, is brought to the emergency department by his mother with a barking cough, inspiratory stridor, and mild retractions after a recent cold — classic croup pattern with must-not-miss airway differentials.",
    cardTeaser: "He woke up sounding scary.",
    objectives: [
      "Recognize croup by barking cough and inspiratory stridor in a post-URI toddler.",
      "Differentiate viral croup from epiglottitis, foreign body, and lower airway processes.",
      "Use pulse oximetry and selective imaging; understand when airway escalation is needed."
    ],
    patientPersona: {
      name: "Liam Turner (historian: mother Maya Turner)",
      age: 3,
      gender: "Male",
      chiefComplaint: "He woke up sounding scary.",
      background:
        "Maya is translating for Liam, who is clingy and teary. Barky cough started overnight after three days runny nose — worse in the wee hours. No choking on food or toys she saw. No drooling or stiff neck. He sounds worse when he cries; she tried steamy bathroom and honey-age-appropriate fluids with little change. Low-grade fever at home. Daycare had colds last week.",
      vitals: {
        heartRate: 126,
        bloodPressure: "92/58",
        respiratoryRate: 32,
        oxygenSat: "96%",
        temperature: "100.5°F"
      },
      keyHistoryPoints: [
        "Barking cough worse at night following URI",
        "Inspiratory stridor and mild retractions",
        "No drooling toxic appearance or sudden choking",
        "Oxygen saturation acceptable on room air",
        "Steeple sign if lateral neck film obtained"
      ],
      redFlags: [
        "Toxic appearance drooling tripod posture suggests supraglottitis — airway emergency",
        "Sudden onset with choking recalls foreign body",
        "Progressive hypoxia or decreased mental status mandates escalation"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Mostly Maya, worried mother — natural speech, estimates timing, volunteers daycare and steam attempts. If the doctor talks straight to Liam, he answers in very short toddler phrases.",
      behaviorRules: [
        "Do NOT say the word croup or laryngotracheitis.",
        "Maya describes barky cough stridor and what makes noise worse.",
        "Emphasize no drooling or witnessed aspiration when asked dangerous features."
      ],
      doNotRevealDirectly: [
        "it's just epiglottitis",
        "steeple sign",
        "he needs racemic epinephrine and steroids specifically for croup",
        "this is only anxiety"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Tired toddler; mild retractions; no drooling.",
        details:
          "Ill but interactive with parent. Mild subcostal retractions. No tripod posture. Voice hoarse with cough."
      },
      {
        id: "respiratory",
        label: "Respiratory",
        summary: "Inspiratory stridor; barking cough; fair air movement.",
        details:
          "Audible inspiratory stridor at rest worse with crying. Barky cough reproduced on exam. Lung fields with transmitted sounds — no focal wheeze localizing obstruction."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Mucoid rhinorrhea; oropharynx without uvular swelling.",
        details: "Nasal congestion. Oropharynx moist without pooling secretions or muffled voice testing."
      }
    ],
    testOverrides: [
      {
        testId: "pulse_ox_continuous",
        result:
          "Continuous and spot pulse oximetry: oxygen saturation 96% on room air — adequate but merits monitoring during treatment and observation.",
        yield: "high"
      },
      {
        testId: "lateral_neck_xray",
        result:
          "Lateral neck soft tissue radiograph: subglottic narrowing with tapered appearance consistent with classic steeple sign — supportive of viral croup pattern; interpret alongside clinical picture.",
        yield: "helpful"
      },
      {
        testId: "capnography",
        result: "Waveform capnography: adequate ventilation pattern without progressive obstruction signal on brief sampling.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs not central for typical viral croup presentation.",
      imagingDefault: "Lateral neck film optional when diagnosis unclear or atypical features — do not delay critical airway management for imaging when unstable.",
      bedsideDefault: "Pulse oximetry and repeated work-of-breathing assessment are key.",
      procedureDefault: "Airway specialist involvement if rapid deterioration or concern for alternate diagnosis."
    },
    finalDxId: "croup",
    requiredMustNotMiss: ["croup", "epiglottitis", "foreign_body_aspiration"],
    dxOverrides: [
      {
        dxId: "croup",
        yield: "correct",
        explanation:
          "Post-URI toddler with barking cough inspiratory stridor mild retractions and acceptable oxygenation fits laryngotracheitis (croup)."
      },
      {
        dxId: "epiglottitis",
        yield: "dangerous-miss",
        explanation: "Drooling toxic tripod muffled voice absent here — must remain on radar if course changes."
      },
      {
        dxId: "foreign_body_aspiration",
        yield: "dangerous-miss",
        explanation: "No witnessed choking event or sudden focal asymmetric exam — less likely but airway foreign body always in stridor differential."
      },
      {
        dxId: "asthma",
        yield: "low",
        explanation: "Asthma exacerbation emphasizes expiratory wheeze and history — bark predominant inspiratory pattern less typical."
      },
      {
        dxId: "bronchiolitis",
        yield: "reasonable",
        explanation: "Young child overlap; bronchiolitis usually prominent wheeze crackles and bronchiolar process rather than isolated barky upper airway picture."
      }
    ],
    diagnosisOptions: [
      {
        id: "croup",
        name: "Croup (laryngotracheitis)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Clinical syndrome matches viral subglottic inflammation with characteristic cough and stridor."
      },
      {
        id: "epiglottitis",
        name: "Epiglottitis / supraglottitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Incorrect for this non-toxic child without drooling or rapidly progressive supraglottic signs — stay vigilant if evolution."
      },
      {
        id: "foreign_body_aspiration",
        name: "Foreign body aspiration",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less supported without acute choking or asymmetric findings — remains must-not-miss in stridor."
      }
    ],
    teachingPoints: [
      "Rubric (100): barky cough recognition 30, stridor 25, dangerous alternatives excluded 20, diagnosis 25.",
      "Corticosteroids and indicated nebulized epinephrine are mainstays for moderate-severe croup per protocol — simulation stops at diagnosis.",
      "Epiglottitis presents as toxic child drooling with quiet airway fear.",
      "Imaging never trumps a crashing airway — clinical stability guides sequence."
    ]
  },
  {
    id: "otitis-media-ear-ava-morris",
    title: "He Keeps Pulling His Ear",
    specialty: PEDIATRICS_SPECIALTY,
    difficulty: "Beginner",
    estimatedMinutes: 9,
    description:
      "Ava Morris, a 2-year-old girl, presents with fever ear-pulling fussiness and recent URI — otoscopy shows bulging erythematous tympanic membrane consistent with acute otitis media.",
    cardTeaser: "She won't stop grabbing her ear.",
    objectives: [
      "Correlate fever irritability and URI with acute otitis media diagnosis.",
      "Use pneumatic otoscopy / tympanometry documentation of effusion.",
      "Separate AOM from otitis externa teething alone and retained foreign body."
    ],
    patientPersona: {
      name: "Ava Morris (historian: father Jordan Morris)",
      age: 2,
      gender: "Female",
      chiefComplaint: "She won't stop grabbing her ear.",
      background:
        "Jordan is juggling Ava on his lap — she's cranky and batting her right ear. Fever two days maybe 100s at home thermometer inconsistent. Sleep wrecked. Runny nose all week daycare plague. Eating half normal bottles. No bathwater drowning ear pain story. He wonders if molars but fever seems real.",
      vitals: {
        heartRate: 122,
        bloodPressure: "90/55",
        respiratoryRate: 26,
        oxygenSat: "99%",
        temperature: "101.1°F"
      },
      keyHistoryPoints: [
        "Fever and persistent ear manipulation",
        "Irritability poor sleep reduced intake",
        "Recent rhinorrhea daycare URI context",
        "Bulging erythematous TM on exam",
        "Middle ear effusion on tympanometry"
      ],
      redFlags: [
        "Mastoid tenderness swelling suggests complicated infection",
        "Neurologic signs raise intracranial extension rarely",
        "Immunocompromise alters management"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Jordan — worried dad mixing humor and fatigue. Ava only answers in one- or two-word sounds if spoken to gently.",
      behaviorRules: [
        "Do NOT say otitis media or ear infection diagnosis words.",
        "Describe pulling ear fever and daycare cold when asked.",
        "No cotton swab deep cleaning confession unless asked home remedies."
      ],
      doNotRevealDirectly: [
        "she needs amoxicillin",
        "bulging tympanic membrane",
        "this is only teething for sure"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Fussy febrile toddler.",
        details: "Crying improves briefly with distraction. Tugging right ear intermittently. No meningismus."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Right TM bulging erythematous with effusion.",
        details:
          "Pneumatic otoscopy shows poor mobility right TM with bulging and dullness. Left ear mild erythema without bulging. Nasopharynx congested."
      }
    ],
    testOverrides: [
      {
        testId: "otoscopy_pneumatic",
        result:
          "Pneumatic otoscopy: right middle ear purulent effusion pattern with bulging immobile tympanic membrane — consistent with acute otitis media.",
        yield: "high"
      },
      {
        testId: "tympanometry",
        result:
          "Tympanometry: type B flat tracing right ear consistent with middle ear effusion; left ear type A or shallow acceptable pediatric variation.",
        yield: "high"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Routine blood tests rarely needed for straightforward AOM.",
      imagingDefault: "Not indicated for uncomplicated otitis.",
      bedsideDefault: "Hearing follow-up if recurrent effusions.",
      procedureDefault: "Myringotomy only for treatment failure mastoiditis concern."
    },
    finalDxId: "acute_otitis_media",
    requiredMustNotMiss: ["acute_otitis_media", "otitis_externa", "ear_canal_foreign_body"],
    dxOverrides: [
      {
        dxId: "acute_otitis_media",
        yield: "correct",
        explanation: "Fever URI context and bulging immobile TM with effusion documents acute otitis media."
      },
      {
        dxId: "viral_uri",
        yield: "reasonable",
        explanation: "URI explains prodrome but focal purulent middle ear exam elevates bacterial AOM above URI alone."
      },
      {
        dxId: "teething",
        yield: "low",
        explanation: "Teething may irritate but sustained fever and acute TM findings argue against teething as sole cause."
      },
      {
        dxId: "otitis_externa",
        yield: "dangerous-miss",
        explanation: "Canal tenderness tragal pain after swimming not primary here — exam shows TM not canal cellulitis pattern."
      },
      {
        dxId: "ear_canal_foreign_body",
        yield: "reasonable",
        explanation: "Toddlers insert beads — not suggested by bilateral URI with classic TM bulge but inspect canal."
      }
    ],
    diagnosisOptions: [
      {
        id: "acute_otitis_media",
        name: "Acute otitis media",
        isCorrect: true,
        isDangerous: false,
        explanation: "Clinical and otoscopic findings satisfy AOM after URI."
      },
      {
        id: "viral_uri",
        name: "Viral upper respiratory infection only",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain bulging effusive tympanic membrane."
      },
      {
        id: "otitis_externa",
        name: "Otitis externa",
        isCorrect: false,
        isDangerous: true,
        explanation: "Mislocalization risks wrong topical versus systemic therapy — exam here is middle ear not canal."
      }
    ],
    teachingPoints: [
      "Rubric (100): symptom recognition 25, exam findings 30, diagnosis 45.",
      "AAP criteria integrate otoscopy with illness severity and shared decision-making when appropriate.",
      "Recurrent AOM or effusion prompts audiology or ENT referral pathways.",
      "Pain control antipyretics are part of initial humane care regardless antibiotic plan."
    ]
  },
  {
    id: "gastroenteritis-dehydration-noah-garcia",
    title: "My Baby Isn't Wetting Diapers",
    specialty: PEDIATRICS_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Noah Garcia, an 11-month-old boy, presents with gastroenteritis symptoms and clinical dehydration — dry mucosa sunken eyes poor tear production and delayed capillary refill with mild laboratory derangement.",
    cardTeaser: "He hasn't had many wet diapers today.",
    objectives: [
      "Assess dehydration severity using history exam and targeted labs.",
      "Track urine output mental status and perfusion in pediatric gastroenteritis.",
      "Distinguish benign viral gastroenteritis from surgical abdomen bacteremia and metabolic emergencies."
    ],
    patientPersona: {
      name: "Noah Garcia (11 months; historian: mother Elena Garcia)",
      age: 1,
      gender: "Male",
      chiefComplaint: "He hasn't had many wet diapers today.",
      background:
        "Elena looks exhausted — vomiting overnight and mushy stools two days. Solids off. Few wet diapers since morning she counted on one hand worse than usual. He's floppy sleepy between fussing eyes look sunken. No blood she saw stool. Still on formula trying Pedialyte. Sister had similar stomach bug recover fine. No recent antibiotic.",
      vitals: {
        heartRate: 146,
        bloodPressure: "82/50",
        respiratoryRate: 32,
        oxygenSat: "99%",
        temperature: "99.4°F"
      },
      keyHistoryPoints: [
        "Vomiting and diarrhea with decreased oral intake",
        "Reduced urine output by diaper count",
        "Exam consistent with dehydration",
        "Mild electrolyte abnormalities on CMP",
        "No bloody stool or severe abdominal distension"
      ],
      redFlags: [
        "Bilious vomiting bilious suggests surgical pathology",
        "Lethargy with fever in young infant broad evaluation",
        "Hypernatremia or hypoglycemia can complicate resuscitation"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Elena — scared mom, counts diapers approximately, guesses hours. Noah coos whimpers short if examined talk directed at him.",
      behaviorRules: [
        "Do NOT say viral gastroenteritis or dehydration as diagnosis names.",
        "Report vomiting diarrhea wet diapers eyes tears oral intake.",
        "No blood in stool when asked."
      ],
      doNotRevealDirectly: [
        "he needs an IV bolus now",
        "this is intussusception",
        "just give antibiotics"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Ill lethargic infant; depressed tears fontanelle soft.",
        details:
          "Intermittent irritability then listlessness. Dry lips. Tears scant with cry. Fontanelle soft flat. Capillary refill three seconds."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Soft mild diffuse tenderness; active bowel sounds.",
        details: "No distension. No guarding or rebound. No masses palpated superficially."
      }
    ],
    testOverrides: [
      {
        testId: "cmp",
        result:
          "CMP: mild acute kidney injury pattern with BUN creatinine ratio suggestive of prerenal physiology; bicarbonate slightly low consistent with contraction alkalosis or mixed picture; glucose acceptable.",
        yield: "high"
      },
      {
        testId: "glucose",
        result: "Serum glucose: low-normal but adequate — not hypoglycemic crisis on this draw.",
        yield: "helpful"
      },
      {
        testId: "stool_pathogen_panel",
        result:
          "Stool viral panel: positive for norovirus RNA pattern — consistent with community gastroenteritis; no bacterial stool pathogen detected on multiplex.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Electrolytes and glucose guide resuscitation magnitude; repeat per clinical course.",
      imagingDefault: "Ultrasound if intermittent severe pain vomiting bilious or mass concern.",
      bedsideDefault: "ORT or IV fluid trial based on severity and tolerance.",
      procedureDefault: "Escalate if shock ongoing acidosis inability to hydrate."
    },
    finalDxId: "viral_gastroenteritis_with_dehydration",
    requiredMustNotMiss: [
      "viral_gastroenteritis_with_dehydration",
      "sepsis",
      "intussusception"
    ],
    dxOverrides: [
      {
        dxId: "viral_gastroenteritis_with_dehydration",
        yield: "correct",
        explanation:
          "Acute enteric symptoms with clinical dehydration mild lab derangement and viral stool support viral gastroenteritis with dehydration."
      },
      {
        dxId: "sepsis",
        yield: "dangerous-miss",
        explanation: "Young infant toxicity mandates keeping bacteremia sepsis lens open though viral stool helps narrow."
      },
      {
        dxId: "intussusception",
        yield: "dangerous-miss",
        explanation: "Intermittent severe pain vomiting or red currant stool would pivot — pattern here more continuous gastroenteritis."
      },
      {
        dxId: "uti",
        yield: "reasonable",
        explanation: "Fever without localizing GI could rarely be UTI — urinalysis sometimes obtained in ill infant protocols."
      },
      {
        dxId: "formula_intolerance_child",
        yield: "low",
        explanation: "Non-infectious intolerance usually more chronic — acute sick contacts argue infection."
      }
    ],
    diagnosisOptions: [
      {
        id: "viral_gastroenteritis_with_dehydration",
        name: "Viral gastroenteritis with dehydration",
        isCorrect: true,
        isDangerous: true,
        explanation: "Stool virus with exam and labs consistent with significant dehydration from gastroenteritis."
      },
      {
        id: "intussusception",
        name: "Intussusception",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely without episodic severe pain mass or target ultrasound — maintain vigilance if evolution."
      },
      {
        id: "sepsis",
        name: "Sepsis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Keep broader picture in unstable infant; viral confirmation and exam pattern favor gastroenteritis dehydration primarily."
      }
    ],
    teachingPoints: [
      "Rubric (100): dehydration recognition 35, diaper questions 25, exam 15, diagnosis 25.",
      "Clinical dehydration scales guide ORT versus IV therapy.",
      "Hypoglycemia checks matter in sicker toddlers especially poor intake.",
      "Return precautions include no urine bilious vomiting altered mental status."
    ]
  },
  {
    id: "kawasaki-rash-fever-sophia-patel",
    title: "She Has A Rash And High Fever",
    specialty: PEDIATRICS_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Sophia Patel, a 5-year-old girl, presents with prolonged high fever rash mucosal changes and extremity findings concerning for Kawasaki disease with elevated inflammatory markers and need for echocardiography.",
    cardTeaser: "Her fever won't go away.",
    objectives: [
      "Suspect Kawasaki disease with prolonged fever and mucocutaneous criteria.",
      "Order inflammatory labs and echocardiogram for coronary artery risk.",
      "Differentiate from strep exanthem measles viral illness and toxic shock."
    ],
    patientPersona: {
      name: "Sophia Patel (historian: mother Priya Patel)",
      age: 5,
      gender: "Female",
      chiefComplaint: "Her fever won't go away.",
      background:
        "Priya tried alternating Tylenol Motrin — fevers still spike 103s six days straight. Pink rash trunk came day three. Eyes bloodshot both sides without goop. Lips cracked strawberry tongue scary mirror moment. Hands puffy red later peeling not yet massive. Tender neck lump one side. Sophia says tired body aches — kindergarten missed all week. Vaccines UTD.",
      vitals: {
        heartRate: 132,
        bloodPressure: "98/60",
        respiratoryRate: 24,
        oxygenSat: "99%",
        temperature: "103.0°F"
      },
      keyHistoryPoints: [
        "Fever ≥5 days unresponsive pattern",
        "Conjunctival injection mucositis strawberry tongue",
        "Polymorphous rash and extremity changes",
        "Cervical lymphadenopathy",
        "ESR CRP elevation platelets trend later",
        "Echo for coronary artery dimensions"
      ],
      redFlags: [
        "Giant coronary aneurysm morbidity without timely IVIG",
        "Shock phenotype requires alternative including toxic shock",
        "Incomplete Kawasaki still treated when high suspicion"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Priya anxious articulate sometimes interrupting herself. Sophia adds short kid descriptions of feeling hot and sore when doctor addresses her.",
      behaviorRules: [
        "Do NOT say Kawasaki disease or IVIG.",
        "Describe rash eyes lips hands neck node without naming syndrome.",
        "Acknowledge vaccine records when immunization asked."
      ],
      doNotRevealDirectly: [
        "coronary aneurysm",
        "start IVIG now",
        "this is just simple viral rash only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Ill febrile girl; uncomfortable.",
        details: "Tired but alert. Warm with flushed cheeks. Cooperative briefly."
      },
      {
        id: "heent",
        label: "HEENT",
        summary: "Bilateral conjunctival injection; strawberry tongue cracked lips.",
        details:
          "Non-purulent conjunctivitis pattern. Mucosal erythema with fissured lips. Pharyngeal erythema without strep exudate classic appearance."
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Polymorphous truncal rash; extremity erythema edema.",
        details:
          "Blanching pink maculopapular rash. Hands and feet erythematous with edema. No discrete target lesions."
      },
      {
        id: "lymph",
        label: "Lymph nodes",
        summary: "Unilateral tender anterior cervical lymph node.",
        details: "Right anterior cervical node enlarged tender approximately 2 cm."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "CBC: leukocytosis with left shift; platelets toward upper normal now with expectation to rise later in course — follow serial CBC per protocol.",
        yield: "high"
      },
      {
        testId: "esr_crp",
        result: "ESR and CRP markedly elevated — consistent with systemic inflammatory process.",
        yield: "high"
      },
      {
        testId: "echo",
        result:
          "Echocardiogram: coronary arteries within normal z-scores at initial study — repeat imaging per rheumatology cardiology protocol still recommended through convalescence.",
        yield: "high"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Serial labs track platelets and markers through treatment phase.",
      imagingDefault: "Echo timing and repetition per guideline for incomplete and complete presentations.",
      bedsideDefault: "Assess hemodynamic perfusion and shock features.",
      procedureDefault: "IVIG and aspirin in inpatient setting per pediatric protocol — sim stops at diagnosis recognition."
    },
    finalDxId: "kawasaki_disease",
    requiredMustNotMiss: ["kawasaki_disease", "toxic_shock_syndrome", "scarlet_fever"],
    dxOverrides: [
      {
        dxId: "kawasaki_disease",
        yield: "correct",
        explanation:
          "Prolonged fever with multiple clinical criteria and inflammatory labs fits Kawasaki disease requiring coronary risk stratification."
      },
      {
        dxId: "scarlet_fever",
        yield: "reasonable",
        explanation: "Sandpaper rash overlap — mucosal changes prolonged fever extremity edema pattern more Kawasaki than isolated strep exanthem though rapid strep throat still considered."
      },
      {
        dxId: "viral_exanthem",
        yield: "low",
        explanation: "Simple viral illness less often six days high fever with full mucosal extremity constellation and prominent inflammation."
      },
      {
        dxId: "measles",
        yield: "low",
        explanation: "Vaccinated child lacking Koplik prodrome clustering argues against measles foremost."
      },
      {
        dxId: "toxic_shock_syndrome",
        yield: "dangerous-miss",
        explanation: "Hypotension multiorgan desquamation focus — watch if shock emerges."
      }
    ],
    diagnosisOptions: [
      {
        id: "kawasaki_disease",
        name: "Kawasaki disease",
        isCorrect: true,
        isDangerous: true,
        explanation: "Fever duration mucocutaneous findings consistent with KD criteria pathway."
      },
      {
        id: "scarlet_fever",
        name: "Scarlet fever",
        isCorrect: false,
        isDangerous: true,
        explanation: "Important mimic — inadequate alone to explain prolonged fever extremity changes without prominent strep pharyngitis picture."
      },
      {
        id: "viral_exanthem",
        name: "Nonspecific viral exanthem",
        isCorrect: false,
        isDangerous: true,
        explanation: "Undercalls inflammatory coronary-risk disease in this pattern."
      }
    ],
    teachingPoints: [
      "Rubric (100): prolonged fever 25, classic features 30, inflammatory studies 20, diagnosis 25.",
      "Echo identifies coronary abnormalities guiding long-term care.",
      "Incomplete Kawasaki exists — treat when high suspicion despite subtotal criteria.",
      "IVIG timing matters in acute phase to reduce aneurysm risk."
    ]
  },
  {
    id: "septic-arthritis-limp-ethan-brooks",
    title: "He Started Limping And Won't Walk",
    specialty: PEDIATRICS_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Ethan Brooks, a 7-year-old boy, presents with acute hip pain fever and refusal to bear weight — evaluation shows septic arthritis with synovial fluid infection and elevated inflammatory markers.",
    cardTeaser: "He suddenly refuses to walk.",
    objectives: [
      "Recognize septic pediatric hip arthritis as emergency.",
      "Order hip ultrasound and joint aspiration with labs.",
      "Contrast with transient synovitis fracture and osteomyelitis."
    ],
    patientPersona: {
      name: "Ethan Brooks (historian: father Chris Brooks)",
      age: 7,
      gender: "Male",
      chiefComplaint: "He suddenly refuses to walk.",
      background:
        "Chris carried Ethan from parking lot — hip hurt since yesterday worse today. Fever 102 at home. No fall Ethan remembers school recess rough sometimes. Leg held funky bent Ethan says stabbing if moved. Daycare strep note last month unrelated maybe. Motrin helped pain slice not enough.",
      vitals: {
        heartRate: 128,
        bloodPressure: "96/60",
        respiratoryRate: 22,
        oxygenSat: "99%",
        temperature: "102.4°F"
      },
      keyHistoryPoints: [
        "Acute hip pain with refusal to bear weight",
        "Fever suggesting infection over purely mechanical cause",
        "Limited range of motion severe pain with movement",
        "Joint aspiration shows purulent infected synovial fluid",
        "Elevated ESR CRP",
        "Ultrasound documents effusion"
      ],
      redFlags: [
        "Delay in drainage increases osteonecrosis growth compromise",
        "Osteomyelitis adjacent can coexist",
        "Septicemia from hematogenous seeding"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Chris worried practical. Ethan answers simply about pain location 'inside hip' refusal to straighten leg.",
      behaviorRules: [
        "Do NOT say septic arthritis or need for operative washout.",
        "Describe limp fever and how he holds leg.",
        "No major trauma recall when asked injury."
      ],
      doNotRevealDirectly: [
        "Staphylococcus aureus",
        "surgical drainage",
        "just growing pains"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Febrile distressed boy; hip flexed.",
        details: "Holds right hip mildly flexed externally rotated. Toxic-appearing discomfort with minimal movement."
      },
      {
        id: "extremities",
        label: "MSK / hip",
        summary: "Refuses weight-bearing; extreme pain passive ROM.",
        details:
          "Right hip range severely limited with guarding. Knee atraumatic. No obvious long-bone deformity grossly."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result: "CBC: leukocytosis with neutrophil predominance — systemic inflammatory response.",
        yield: "high"
      },
      {
        testId: "esr_crp",
        result: "ESR elevated; CRP significantly elevated — bacterial arthritis compatible territory.",
        yield: "high"
      },
      {
        testId: "hip_ultrasound",
        result:
          "Hip ultrasound: large joint effusion with capsular distention — supports intra-articular fluid collection requiring aspiration.",
        yield: "high"
      },
      {
        testId: "joint_aspiration",
        result:
          "Arthrocentesis synovial fluid: turbid fluid with very high WBC count neutrophil predominance — Gram stain positive for Gram-positive cocci in clusters pending culture.",
        yield: "high"
      },
      {
        testId: "xray_extremity",
        result:
          "Plain radiograph hip: no acute fracture or slipped epiphysis — joint space may be widened subtly; ultrasound primary for effusion.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Blood cultures accompany empiric antibiotics after cultures obtained per protocol.",
      imagingDefault: "MRI if concern for adjacent osteomyelitis or subperiosteal abscess.",
      bedsideDefault: "Avoid repeated painful ROM manipulation.",
      procedureDefault: "Orthopedics for operative drainage when indicated alongside antibiotics."
    },
    finalDxId: "septic_arthritis",
    requiredMustNotMiss: ["septic_arthritis", "transient_synovitis", "osteomyelitis"],
    dxOverrides: [
      {
        dxId: "septic_arthritis",
        yield: "correct",
        explanation:
          "Febrile child with non-weight-bearing painful hip effusion and purulent synovial analysis establishes septic arthritis."
      },
      {
        dxId: "transient_synovitis",
        yield: "dangerous-miss",
        explanation: "Often post-viral afebrile or low fever — this child's higher fever toxicity effusion pus elevates bacterial joint above transient synovitis."
      },
      {
        dxId: "osteomyelitis",
        yield: "reasonable",
        explanation: "Adjacent osteomyelitis can coexist — MRI bone if focal bony tenderness or inadequate response."
      },
      {
        dxId: "pediatric_long_bone_fracture",
        yield: "low",
        explanation: "No trauma clear radiograph negative fracture — maintains limp differential broadly."
      },
      {
        dxId: "juvenile_idiopathic_arthritis",
        yield: "low",
        explanation: "Usually subacute without purulent fluid or acute toxic presentation — less likely here."
      }
    ],
    diagnosisOptions: [
      {
        id: "septic_arthritis",
        name: "Septic arthritis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Purulent hip aspirate with systemic findings confirms bacterial septic arthritis."
      },
      {
        id: "transient_synovitis",
        name: "Transient synovitis of the hip",
        isCorrect: false,
        isDangerous: true,
        explanation: "Dangerous miss if mistaken for benign post-viral hip when bacterial infection present with fever and septic fluid."
      },
      {
        id: "pediatric_long_bone_fracture",
        name: "Occult fracture",
        isCorrect: false,
        isDangerous: true,
        explanation: "Imaging argues against fracture — effusion fluid analysis clinches infectious arthritis."
      }
    ],
    teachingPoints: [
      "Rubric (100): non-weight-bearing 30, joint evaluation 20, fever significance 25, diagnosis 25.",
      "Pediatric septic hip is orthopedic emergency — aspiration source control plus antibiotics.",
      "Kocher criteria historically help distinguish synovitis risk groups — not infallible.",
      "Blood cultures and timely OR consult reduce osteonecrosis sepsis complications."
    ]
  }
];
