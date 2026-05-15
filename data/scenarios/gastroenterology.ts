import type { Scenario } from "@/data/scenarios";

const GI_SPECIALTY = "Gastroenterology" as const;

export const gastroenterologyScenarios: Scenario[] = [
  {
    id: "acute-pancreatitis-pain-through-back",
    title: "This Pain Shoots Through My Back",
    specialty: GI_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Anthony Marino, a 46-year-old restaurant manager, presents to the ED with eight hours of severe epigastric pain radiating to the back, vomiting, and heavy weekend alcohol use.",
    cardTeaser: "My stomach pain is unbearable.",
    objectives: [
      "Recognize acute pancreatitis from epigastric pain radiating to the back.",
      "Order lipase (and supportive labs) promptly.",
      "Identify alcohol and gallstones as common etiologies."
    ],
    patientPersona: {
      name: "Anthony Marino",
      age: 46,
      gender: "Male",
      chiefComplaint: "My stomach pain is unbearable.",
      background:
        "Restaurant manager with sudden crushing pain in the upper middle belly eight hours ago — shoots straight through to his back between the shoulder blades. Nauseated, vomited four times. Tried crackers — made it worse after he nibbled staff meal. Drinks heavily on closing nights. No fever yet — feels clammy. Terrified it's his heart.",
      vitals: {
        heartRate: 118,
        bloodPressure: "148/90",
        respiratoryRate: 24,
        oxygenSat: "98%",
        temperature: "99.5°F"
      },
      keyHistoryPoints: [
        "Severe epigastric pain 8 hours with back radiation",
        "Nausea and repeated vomiting",
        "Pain worse after eating",
        "Heavy alcohol use weekends",
        "Epigastric tenderness, guarding, hypoactive bowel sounds",
        "Lipase markedly elevated",
        "CT shows pancreatic inflammation"
      ],
      redFlags: [
        "Severe pancreatitis with organ failure or necrosis",
        "Cannot exclude MI without ECG in epigastric pain",
        "Hemodynamic instability requires ICU level care"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Anthony, miserable and guarded. Short sentences between nausea.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say pancreatitis.",
        "Emphasize back radiation when asked about pain pattern.",
        "Admit alcohol when asked honestly, not unprompted as diagnosis."
      ],
      doNotRevealDirectly: [
        "pancreatitis",
        "pancreas",
        "lipase",
        "gallstone pancreatitis",
        "You're having a heart attack"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Uncomfortable, diaphoretic.",
        details: "Middle-aged man in moderate distress, holding epigastrium. Mild diaphoresis."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Epigastric tenderness with guarding.",
        details:
          "Tenderness maximal in epigastrium with voluntary guarding. Bowel sounds decreased. No rebound explicitly elicited to avoid unnecessary pain."
      }
    ],
    testOverrides: [
      {
        testId: "lipase",
        result: "Serum lipase markedly elevated, diagnostic for acute pancreatitis.",
        yield: "high"
      },
      {
        testId: "amylase",
        result: "Serum amylase elevated.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result:
          "Mild transaminitis (AST/ALT mildly elevated). Electrolytes pending resuscitation.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "White count mildly elevated with left shift.",
        yield: "helpful"
      },
      {
        testId: "us_ruq",
        result:
          "RUQ ultrasound: no cholecystitis today; gallstones may or may not be visualized — correlate with clinical picture and labs.",
        yield: "helpful"
      },
      {
        testId: "ct_abdomen",
        result:
          "CT abdomen/pelvis with contrast per protocol: pancreatic inflammation and peripancreatic stranding consistent with acute pancreatitis.",
        yield: "high"
      },
      {
        testId: "ecg",
        result: "No acute ST elevation; sinus tachycardia.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Lipase elevation drives diagnosis.",
      imagingDefault: "CT confirms severity and complications if indicated.",
      bedsideDefault: "Epigastric tenderness common.",
      procedureDefault: "IV fluids, analgesia, and monitoring; address etiology."
    },
    finalDxId: "pancreatitis",
    requiredMustNotMiss: ["pancreatitis", "stemi", "cholecystitis"],
    dxOverrides: [
      {
        dxId: "pancreatitis",
        yield: "correct",
        explanation:
          "Epigastric pain radiating to back with vomiting, alcohol use, markedly elevated lipase, and CT inflammation confirms acute pancreatitis."
      },
      {
        dxId: "cholecystitis",
        yield: "dangerous-miss",
        explanation:
          "RUQ pain pattern more typical; here pain is epigastric with back radiation and lipase is diagnostic for pancreatitis."
      },
      {
        dxId: "peptic_ulcer_disease",
        yield: "low",
        explanation: "Can cause epigastric pain but not typical lipase elevation and CT pancreas findings."
      },
      {
        dxId: "stemi",
        yield: "dangerous-miss",
        explanation: "Consider in epigastric pain; ECG without ischemia and lipase points to pancreas."
      },
      {
        dxId: "gastritis",
        yield: "low",
        explanation: "Does not explain magnitude of lipase or imaging."
      },
      {
        dxId: "bowel_obstruction",
        yield: "low",
        explanation: "Distention and obstipation prominent; not present."
      }
    ],
    diagnosisOptions: [
      {
        id: "pancreatitis",
        name: "Acute pancreatitis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Elevated lipase with classic presentation and CT findings."
      },
      {
        id: "cholecystitis",
        name: "Acute cholecystitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Wrong pain localization and enzymology supports pancreatitis."
      },
      {
        id: "stemi",
        name: "ST-elevation MI",
        isCorrect: false,
        isDangerous: true,
        explanation: "ECG not diagnostic; lipase markedly abnormal."
      }
    ],
    teachingPoints: [
      "Grading (100): Pain pattern 30, lipase 25, alcohol risk 20, diagnosis 25. Bonus: gallstone etiology teaching (+10). Deduction: miss back radiation (-15).",
      "Epigastric pain boring through to the back suggests pancreatitis until proven otherwise.",
      "Lipase is more specific than amylase in many settings.",
      "Always obtain ECG in severe epigastric pain to exclude ACS.",
      "Gallstones and alcohol are leading causes — evaluate both."
    ]
  },
  {
    id: "peptic-ulcer-burn-after-eating",
    title: "My Stomach Burns After I Eat",
    specialty: GI_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 10,
    description:
      "Jennifer Park, a 39-year-old attorney, presents with two months of burning epigastric pain related to meals, night symptoms, frequent NSAIDs, and positive H. pylori testing.",
    cardTeaser: "I keep getting burning pain in my stomach.",
    objectives: [
      "Differentiate ulcer-type dyspepsia from GERD and functional dyspepsia.",
      "Ask about NSAIDs and test for H. pylori.",
      "Recognize alarm features that warrant urgent endoscopy."
    ],
    patientPersona: {
      name: "Jennifer Park",
      age: 39,
      gender: "Female",
      chiefComplaint: "I keep getting burning pain in my stomach.",
      background:
        "Attorney with burning pain high in the belly for two months — worse a few hours after big lunches and sometimes wakes her at 2 a.m. Eating a cracker or small meal briefly soothes it, then it creeps back. Pops ibuprofen several days a week for stress headaches. No vomiting, no fever. Coffee makes it gnaw worse.",
      vitals: {
        heartRate: 72,
        bloodPressure: "118/76",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.4°F"
      },
      keyHistoryPoints: [
        "Two months burning epigastric pain",
        "Worse delayed postprandially and at night",
        "Temporary relief with small intake",
        "Frequent NSAID use for headaches",
        "H. pylori testing positive",
        "Possible mild anemia on CBC",
        "Mild epigastric tenderness"
      ],
      redFlags: [
        "Melena, hematemesis, or unintended weight loss need urgent evaluation",
        "Age over 55 with new dyspepsia may warrant endoscopy per guidelines",
        "Iron deficiency anemia may signal chronic blood loss"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Jennifer, professional, precise about timing. Slightly embarrassed about NSAID habit.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say ulcer or H. pylori.",
        "Mention NSAIDs for headaches when asked medications.",
        "Describe food relief pattern when asked what helps."
      ],
      doNotRevealDirectly: [
        "peptic ulcer",
        "H. pylori",
        "stomach ulcer",
        "You need surgery tomorrow"
      ]
    },
    physicalExam: [
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild epigastric tenderness.",
        details: "Soft abdomen with mild focal tenderness in epigastrium. No peritoneal signs. No masses."
      }
    ],
    testOverrides: [
      {
        testId: "h_pylori_test",
        result: "H. pylori stool antigen (or equivalent) positive — active infection.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "Hemoglobin at low-normal or mildly reduced — possible chronic blood loss if ulcer bleeding.",
        yield: "helpful"
      },
      {
        testId: "upper_endoscopy",
        result:
          "EGD shows clean-based gastric ulcer with surrounding erythema — biopsies consistent with peptic disease; H. pylori confirmed if biopsied.",
        yield: "high"
      },
      {
        testId: "stool_occult_blood",
        result: "Fecal occult blood test weakly positive or intermittently positive.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result: "Within normal limits.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "CBC may show anemia with chronic bleed.",
      imagingDefault: "Endoscopy is diagnostic when performed.",
      bedsideDefault: "Epigastric tenderness may be minimal.",
      procedureDefault: "Eradicate H. pylori; PPI; stop offending NSAIDs."
    },
    finalDxId: "peptic_ulcer_disease",
    requiredMustNotMiss: ["peptic_ulcer_disease", "gastritis"],
    dxOverrides: [
      {
        dxId: "peptic_ulcer_disease",
        yield: "correct",
        explanation:
          "Classic ulcer symptoms with NSAIDs and confirmed H. pylori support PUD; endoscopy shows ulcer."
      },
      {
        dxId: "gerd",
        yield: "reasonable",
        explanation: "Burning pain but postprandial delay and night hunger relief more typical of ulcer than pure reflux."
      },
      {
        dxId: "gastritis",
        yield: "reasonable",
        explanation: "Overlaps; ulcer is structural diagnosis when endoscopy performed."
      },
      {
        dxId: "functional_dyspepsia",
        yield: "low",
        explanation: "Positive H. pylori and ulcer on EGD explain organic disease."
      },
      {
        dxId: "cholecystitis",
        yield: "low",
        explanation: "Biliary colic RUQ; epigastric burning pattern different."
      }
    ],
    diagnosisOptions: [
      {
        id: "peptic_ulcer_disease",
        name: "Peptic ulcer disease",
        isCorrect: true,
        isDangerous: false,
        explanation: "Symptom pattern with H. pylori and endoscopic ulcer."
      },
      {
        id: "gerd",
        name: "GERD",
        isCorrect: false,
        isDangerous: false,
        explanation: "Less consistent with delayed postprandial pattern and ulcer confirmation."
      },
      {
        id: "functional_dyspepsia",
        name: "Functional dyspepsia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Organic ulcer and H. pylori present."
      }
    ],
    teachingPoints: [
      "Grading (100): Ulcer symptoms 25, medication history 25, H. pylori test 25, diagnosis 25.",
      "NSAIDs and H. pylori are major PUD risk factors — always ask.",
      "Test-and-treat or endoscopy strategy depends on age and alarm features.",
      "PPI plus eradication therapy when H. pylori positive.",
      "Stop NSAIDs or add gastroprotection when unavoidable."
    ]
  },
  {
    id: "ulcerative-colitis-running-bathroom",
    title: "I Keep Running to the Bathroom",
    specialty: GI_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Daniel Rivera, a 24-year-old graduate student, presents with six weeks of bloody diarrhea, urgency, cramping, fatigue, and weight loss with continuous colonic inflammation on colonoscopy.",
    cardTeaser: "I've had diarrhea for weeks.",
    objectives: [
      "Recognize inflammatory bowel disease pattern versus IBS and infection.",
      "Order inflammatory markers, stool studies, and colonoscopy.",
      "Differentiate ulcerative colitis from Crohn disease by distribution."
    ],
    patientPersona: {
      name: "Daniel Rivera",
      age: 24,
      gender: "Male",
      chiefComplaint: "I've had diarrhea for weeks.",
      background:
        "Graduate student sprinting to the restroom between classes for six weeks. Stool mixed with blood and mucus, urgent tenesmus. Crampy lower belly pain. Down ten pounds without trying — clothes loose. Exhausted grading papers. No travel. Symptoms worsening — embarrassed to date or share apartment bathroom.",
      vitals: {
        heartRate: 102,
        bloodPressure: "110/70",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "100.2°F"
      },
      keyHistoryPoints: [
        "Six weeks bloody diarrhea with urgency",
        "Weight loss and fatigue",
        "Low-grade fever",
        "Lower abdominal tenderness, pale",
        "ESR/CRP elevated, anemia",
        "Colonoscopy continuous inflammation from rectum",
        "Stool pathogens negative"
      ],
      redFlags: [
        "Toxic megacolon if severe colitis with distention",
        "Fulminant bleeding or hemodynamic instability",
        "High-grade dysplasia surveillance after diagnosis"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Daniel, embarrassed but frank. Young grad-student voice.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say ulcerative colitis.",
        "Mention blood in stool when asked about diarrhea details.",
        "Weight loss only when asked appetite or weight."
      ],
      doNotRevealDirectly: [
        "ulcerative colitis",
        "Crohn",
        "inflammatory bowel disease",
        "colonoscopy shows UC"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pale, low-grade fever.",
        details: "Young man appears fatigued with conjunctival pallor. Low-grade fever."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild lower abdominal tenderness.",
        details: "Soft abdomen with mild tenderness in lower quadrants. No rebound. No masses."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result: "Normocytic anemia. Elevated platelets possible with inflammation.",
        yield: "high"
      },
      {
        testId: "esr_crp",
        result: "ESR and CRP elevated — active inflammation.",
        yield: "high"
      },
      {
        testId: "stool_pathogen_panel",
        result:
          "Stool PCR/culture negative for common bacterial pathogens; C. difficile negative.",
        yield: "high"
      },
      {
        testId: "colonoscopy",
        result:
          "Colonoscopy: continuous mucosal inflammation starting in rectum and extending proximally — biopsy consistent with ulcerative colitis.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "Albumin may be low with chronic inflammation; electrolytes monitored.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Anemia and inflammatory markers support IBD versus IBS.",
      imagingDefault: "Colonoscopy is key diagnostic study.",
      bedsideDefault: "Exclude infection before immunosuppression.",
      procedureDefault: "Medical therapy for UC; GI follow-up."
    },
    finalDxId: "ulcerative_colitis",
    requiredMustNotMiss: ["ulcerative_colitis", "infectious_colitis"],
    dxOverrides: [
      {
        dxId: "ulcerative_colitis",
        yield: "correct",
        explanation:
          "Chronic bloody diarrhea, systemic symptoms, elevated inflammatory markers, and continuous colitis from rectum on colonoscopy confirm UC."
      },
      {
        dxId: "infectious_colitis",
        yield: "dangerous-miss",
        explanation: "Must rule out; negative stool pathogens and prolonged course favor IBD."
      },
      {
        dxId: "crohn_disease",
        yield: "reasonable",
        explanation: "Crohn can overlap; continuous rectal involvement without skip lesions favors UC."
      },
      {
        dxId: "irritable_bowel_syndrome",
        yield: "low",
        explanation: "No blood, weight loss, or elevated inflammatory markers in IBS."
      },
      {
        dxId: "celiac_disease",
        yield: "low",
        explanation: "Typically steatorrhea pattern and different serology; chronic bloody stool atypical."
      }
    ],
    diagnosisOptions: [
      {
        id: "ulcerative_colitis",
        name: "Ulcerative colitis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Colonoscopy shows continuous colonic inflammation from rectum."
      },
      {
        id: "infectious_colitis",
        name: "Infectious colitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Stool studies negative; subacute course with weight loss favors IBD."
      },
      {
        id: "irritable_bowel_syndrome",
        name: "Irritable bowel syndrome",
        isCorrect: false,
        isDangerous: false,
        explanation: "Alarm features present — not IBS alone."
      }
    ],
    teachingPoints: [
      "Grading (100): IBD pattern 30, colonoscopy 25, blood/weight loss 20, diagnosis 25.",
      "Blood plus weight loss and no pathogen is not IBS.",
      "UC is continuous from rectum; Crohn may skip areas.",
      "Rule out infection including C. diff before steroids.",
      "IBD requires long-term gastroenterology management."
    ]
  },
  {
    id: "acute-hepatitis-b-yellow-eyes",
    title: "My Eyes Look Yellow",
    specialty: GI_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 12,
    description:
      "Brian Foster, a 31-year-old personal trainer, presents with two weeks of fatigue, dark urine, nausea, jaundice, and acute hepatitis B serology.",
    cardTeaser: "My family says my eyes turned yellow.",
    objectives: [
      "Recognize acute hepatitis from jaundice and transaminitis.",
      "Order hepatitis serology and liver panel.",
      "Take sexual and other exposure history for HBV."
    ],
    patientPersona: {
      name: "Brian Foster",
      age: 31,
      gender: "Male",
      chiefComplaint: "My family says my eyes turned yellow.",
      background:
        "Personal trainer who felt run-down two weeks — thought overtraining. Urine dark like cola. Skin and eyes yellow per girlfriend. Nauseated, no appetite for protein shakes. New partner in last month — no IV drugs. Rare beer, not a heavy drinker. Freaked out clients will notice.",
      vitals: {
        heartRate: 96,
        bloodPressure: "118/72",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "100.1°F"
      },
      keyHistoryPoints: [
        "Jaundice with scleral icterus",
        "Dark urine, fatigue, nausea, anorexia",
        "Low-grade fever",
        "New sexual partner",
        "RUQ mild tenderness",
        "AST/ALT markedly elevated",
        "HBsAg positive, acute hepatitis B pattern",
        "RUQ ultrasound no biliary obstruction"
      ],
      redFlags: [
        "Acute liver failure with encephalopathy or INR elevation",
        "Need partner notification and long-term HBV follow-up",
        "Fulminant hepatitis is rare but emergent"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Brian, health-focused but scared. Avoid medical jargon.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say hepatitis B.",
        "Mention dark urine and partner when asked risk or urine.",
        "Describe jaundice from family observation when asked appearance."
      ],
      doNotRevealDirectly: [
        "hepatitis B",
        "HBsAg",
        "liver failure",
        "You are contagious forever"
      ]
    },
    physicalExam: [
      {
        id: "heent",
        label: "HEENT",
        summary: "Scleral icterus.",
        details: "Icterus of sclera. Mucous membranes mildly icteric."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild RUQ tenderness.",
        details: "Mild right upper quadrant tenderness. Liver edge may be soft and tender. No ascites."
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Jaundice.",
        details: "Visible yellow tone to skin in natural light."
      }
    ],
    testOverrides: [
      {
        testId: "lft",
        result:
          "AST and ALT significantly elevated. Total and direct bilirubin elevated consistent with hepatocellular injury and cholestasis.",
        yield: "high"
      },
      {
        testId: "hepatitis_panel",
        result:
          "Hepatitis B surface antigen positive with acute serologic pattern — acute hepatitis B consistent. HAV IgM negative; HCV negative.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "Transaminitis as above; INR monitored for synthetic function.",
        yield: "high"
      },
      {
        testId: "us_ruq",
        result:
          "RUQ ultrasound: no gallstones or common bile duct dilation — no obstruction pattern.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "WBC may be normal; hemoglobin normal unless hemolysis coexists.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Hepatitis panel defines etiology.",
      imagingDefault: "RUQ US excludes obstructive jaundice.",
      bedsideDefault: "Jaundice and tender liver edge.",
      procedureDefault: "Supportive care, isolation precautions, partner testing, follow-up serology."
    },
    finalDxId: "acute_hepatitis_b",
    requiredMustNotMiss: ["acute_hepatitis_b", "drug_induced_liver_injury"],
    dxOverrides: [
      {
        dxId: "acute_hepatitis_b",
        yield: "correct",
        explanation:
          "Jaundice with hepatocellular labs and positive HBsAg confirms acute hepatitis B in clinical context."
      },
      {
        dxId: "hepatitis_a",
        yield: "reasonable",
        explanation: "IgM anti-HAV negative here; HBV serology positive."
      },
      {
        dxId: "alcoholic_hepatitis",
        yield: "low",
        explanation: "Minimal alcohol history; serologic HBV diagnosis."
      },
      {
        dxId: "drug_induced_liver_injury",
        yield: "dangerous-miss",
        explanation: "Always review supplements; hepatitis panel points to HBV here."
      },
      {
        dxId: "cholecystitis",
        yield: "low",
        explanation: "Ultrasound without stones or duct dilation; enzymatic hepatitis pattern."
      }
    ],
    diagnosisOptions: [
      {
        id: "acute_hepatitis_b",
        name: "Acute hepatitis B",
        isCorrect: true,
        isDangerous: true,
        explanation: "HBsAg positive with acute hepatitis syndrome."
      },
      {
        id: "hepatitis_a",
        name: "Hepatitis A",
        isCorrect: false,
        isDangerous: true,
        explanation: "Serology shows HBV, not HAV."
      },
      {
        id: "cholecystitis",
        name: "Acute cholecystitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "RUQ US does not show obstructive or gallstone disease pattern."
      }
    ],
    teachingPoints: [
      "Grading (100): Jaundice pattern 25, hepatitis testing 25, exposure risk 20, diagnosis 30.",
      "Dark urine and pale stools (if present) suggest conjugated hyperbilirubinemia workup.",
      "HBV risk includes sexual and blood exposure — take nonjudgmental history.",
      "RuQ ultrasound assesses biliary obstruction in jaundice.",
      "Monitor synthetic function and mental status for acute liver failure."
    ]
  },
  {
    id: "colon-cancer-feel-full-all-time",
    title: "I Feel Full All the Time",
    specialty: GI_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Margaret Ellis, a 66-year-old retired librarian, presents with progressive fatigue, early satiety, weight loss, altered bowel habits, rectal bleeding, family history of colon cancer, and a colon mass on colonoscopy.",
    cardTeaser: "I get full quickly and something feels off.",
    objectives: [
      "Recognize alarm symptoms for colorectal malignancy.",
      "Order CBC, occult blood, colonoscopy, and staging CT when indicated.",
      "Address family history and screening implications."
    ],
    patientPersona: {
      name: "Margaret Ellis",
      age: 66,
      gender: "Female",
      chiefComplaint: "I get full quickly and something feels off.",
      background:
        "Retired librarian who fills up halfway through dinner — thought it was aging. Lost twelve pounds without trying. Bowel habits flip between constipated and loose. Saw red on toilet paper twice — assumed hemorrhoids. Brother died of colon cancer at 58. More tired shelving books at volunteer gig. Worried but put off appointment until daughter insisted.",
      vitals: {
        heartRate: 94,
        bloodPressure: "122/78",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.6°F"
      },
      keyHistoryPoints: [
        "Early satiety and progressive fatigue",
        "Unintentional weight loss",
        "Change in bowel habits",
        "Occult or visible blood per rectum",
        "Family history of colon cancer",
        "Pale appearance, mild abdominal tenderness",
        "Iron deficiency pattern anemia, positive occult blood",
        "Colonoscopy mass lesion"
      ],
      redFlags: [
        "Obstruction or perforation if worsening distention or pain",
        "Iron deficiency anemia in postmenopausal woman is GI bleed until proven otherwise",
        "Staging and oncology referral after tissue diagnosis"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Margaret, warm, a little scared, deferential.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say colon cancer.",
        "Mention brother's cancer when asked family.",
        "Blood in stool when asked bowel habits specifically."
      ],
      doNotRevealDirectly: [
        "colon cancer",
        "tumor",
        "mass",
        "you are stage four"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Pale, fatigued appearance.",
        details: "Older woman appears pale and fatigued. No jaundice. No marked cachexia yet."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild nonspecific tenderness.",
        details: "Soft abdomen with mild diffuse tenderness without guarding. No palpable masses superficially."
      }
    ],
    testOverrides: [
      {
        testId: "cbc",
        result:
          "Microcytic anemia consistent with iron deficiency — low hemoglobin, low MCV. Ferritin low.",
        yield: "high"
      },
      {
        testId: "iron_studies",
        result: "Iron studies consistent with iron deficiency anemia.",
        yield: "high"
      },
      {
        testId: "stool_occult_blood",
        result: "Fecal immunochemical test strongly positive.",
        yield: "high"
      },
      {
        testId: "colonoscopy",
        result:
          "Colonoscopy reveals friable mass lesion in sigmoid colon — biopsies adenococarcinoma pending pathology.",
        yield: "high"
      },
      {
        testId: "ct_abdomen",
        result:
          "CT chest/abdomen/pelvis for staging: focal colonic wall thickening/mass without clear distant metastases on this noncontrast-limited report — complete staging per oncology protocol.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "Generally normal; albumin may be normal early.",
        yield: "low"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Iron deficiency anemia prompts GI workup.",
      imagingDefault: "CT aids staging after diagnosis.",
      bedsideDefault: "Occult blood and symptoms warrant urgent colonoscopy.",
      procedureDefault: "Surgical and oncology referral pathway."
    },
    finalDxId: "colon_cancer",
    requiredMustNotMiss: ["colon_cancer", "iron_deficiency_anemia"],
    dxOverrides: [
      {
        dxId: "colon_cancer",
        yield: "correct",
        explanation:
          "Alarm symptoms, iron deficiency, positive occult blood, and colon mass confirm colorectal cancer."
      },
      {
        dxId: "irritable_bowel_syndrome",
        yield: "low",
        explanation: "No weight loss or anemia expected as primary IBS; alarm features present."
      },
      {
        dxId: "hemorrhoids",
        yield: "low",
        explanation: "Does not explain weight loss, early satiety, or mass."
      },
      {
        dxId: "diverticulosis",
        yield: "low",
        explanation: "May bleed but not typical early satiety and mass."
      },
      {
        dxId: "gastritis",
        yield: "low",
        explanation: "May cause dyspepsia but mass and colon findings localize disease."
      },
      {
        dxId: "ulcerative_colitis",
        yield: "low",
        explanation: "Continuous colitis; mass biopsy shows malignancy."
      }
    ],
    diagnosisOptions: [
      {
        id: "colon_cancer",
        name: "Colorectal cancer",
        isCorrect: true,
        isDangerous: true,
        explanation: "Colonoscopy mass with systemic alarm symptoms and iron deficiency."
      },
      {
        id: "irritable_bowel_syndrome",
        name: "Irritable bowel syndrome",
        isCorrect: false,
        isDangerous: false,
        explanation: "Inconsistent with iron deficiency and mass lesion."
      },
      {
        id: "hemorrhoids",
        name: "Hemorrhoids",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain the full syndrome."
      }
    ],
    teachingPoints: [
      "Grading (100): Cancer warning signs 30, colonoscopy 25, weight loss/blood 20, diagnosis 25. Bonus: family history (+10).",
      "Iron deficiency anemia in older adults warrants GI evaluation for bleeding source.",
      "Early satiety, weight loss, and bowel change are alarm features.",
      "Colonoscopy is diagnostic and allows biopsy.",
      "Family history increases screening urgency and genetic counseling if indicated."
    ]
  }
];
