import type { Scenario } from "@/data/scenarios";

const GENERAL_SURGERY_SPECIALTY = "General Surgery" as const;

export const generalSurgeryScenarios: Scenario[] = [
  {
    id: "incarcerated-hernia-groin-lump-frank",
    title: "This Lump Suddenly Started Hurting",
    specialty: GENERAL_SURGERY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Frank Russo, a 63-year-old warehouse worker, presents to the ED with a long-standing groin hernia that is now acutely painful, firm, and no longer reducible after lifting heavy boxes.",
    cardTeaser: "I've had a groin lump before, but now it really hurts.",
    objectives: [
      "Recognize incarcerated inguinal hernia as a surgical urgency.",
      "Differentiate from scrotal emergencies and infection.",
      "Select imaging and counsel on risk of strangulation."
    ],
    patientPersona: {
      name: "Frank Russo",
      age: 63,
      gender: "Male",
      chiefComplaint: "I've had a groin lump before, but now it really hurts.",
      background:
        "Groin bulge popped out off and on years — usually pushed back watching TV night routine. Today heavy warehouse pallets — mass ballooned angry hard. Nauseated, steady gnaw pain. Cannot tuck it back in hours tried lying flat gentle shame. Low fever feeling not raging. Wife drove white-knuckle highway.",
      vitals: {
        heartRate: 108,
        bloodPressure: "146/84",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "99.1°F"
      },
      keyHistoryPoints: [
        "Chronic reducible inguinal bulge now acutely painful",
        "Heavy lifting precipitant",
        "Nonreducible firm mass since episode",
        "Nausea without high fever initially",
        "CT shows incarcerated bowel loop in hernia sac",
        "Mild leukocytosis"
      ],
      redFlags: [
        "Overlying skin erythema, fever, tachycardia, peritonitis suggest strangulation",
        "Tender nonreducible groin mass is hernia emergency until proven otherwise",
        "Testicular torsion must be considered in acute groin/scrotal pain"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Frank — gruff, embarrassed about groin topic, scared but hiding.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say incarcerated or strangulated hernia.",
        "Mention cannot push lump back when asked reducible or what changed.",
        "Describe lifting boxes when asked trigger or onset."
      ],
      doNotRevealDirectly: [
        "incarcerated hernia",
        "strangulation",
        "you need emergency surgery",
        "this is only a pulled muscle"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mild distress; tachycardic.",
        details:
          "Diaphoresis mild. Alert. Guarding minimal from groin pain not diffuse peritonitis voice yet."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild diffuse tenderness without rebound.",
        details:
          "Soft except mild periumbilical discomfort from obstructive nausea pattern. No obvious distention."
      },
      {
        id: "other",
        label: "Groin",
        summary: "Tender inguinal mass; not reducible.",
        details:
          "Right inguinal firm tender mass below inguinal ligament — does not reduce with gentle supine attempt. Overlying skin mildly erythematous not frankly necrotic in sim."
      }
    ],
    testOverrides: [
      {
        testId: "abdominal_exam_focused",
        result:
          "Focused exam: tender right inguinal hernia mass nonreducible with cough impulse blunted — concerning for incarcerated groin hernia pending imaging.",
        yield: "high"
      },
      {
        testId: "ct_abdomen",
        result:
          "CT abdomen/pelvis: bowel loop within right inguinal hernia sac with proximal dilated small bowel and transition — compatible with incarcerated inguinal hernia.",
        yield: "high"
      },
      {
        testId: "us_abdomen",
        result:
          "Groin ultrasound: hernia sac with bowel content — noncompressible segment — correlates with CT incarceration findings.",
        yield: "helpful"
      },
      {
        testId: "cbc",
        result: "CBC: leukocytosis mild — 14 K/µL — may reflect bowel compromise stress.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "WBC may rise with strangulation or inflammation.",
      imagingDefault: "CT defines anatomy when incarceration suspected.",
      bedsideDefault: "Manual reduction contraindicated if peritonitis or toxic appearance.",
      procedureDefault: "Surgical consult for hernia repair and bowel viability assessment."
    },
    finalDxId: "incarcerated_inguinal_hernia",
    requiredMustNotMiss: ["incarcerated_inguinal_hernia", "strangulated_inguinal_hernia", "testicular_torsion"],
    dxOverrides: [
      {
        dxId: "incarcerated_inguinal_hernia",
        yield: "correct",
        explanation:
          "Chronic hernia now acutely painful, nonreducible, with CT showing trapped bowel loop fits incarcerated inguinal hernia."
      },
      {
        dxId: "strangulated_inguinal_hernia",
        yield: "dangerous-miss",
        explanation:
          "Must evaluate for compromised bowel — worsening pain, systemic toxicity, lactate, and skin changes escalate concern; surgical urgency either way."
      },
      {
        dxId: "testicular_torsion",
        yield: "dangerous-miss",
        explanation:
          "Acute groin pain in male requires scrotal exam and Doppler consideration — mass here is hernia-pattern on imaging."
      },
      {
        dxId: "hydrocele",
        yield: "low",
        explanation: "Chronic painless transilluminating scrotal fluid — not acute firm tender incarceration."
      },
      {
        dxId: "inguinal_lymphadenopathy",
        yield: "low",
        explanation: "Nodes may be tender but CT shows incarcerated bowel not isolated adenopathy."
      }
    ],
    diagnosisOptions: [
      {
        id: "incarcerated_inguinal_hernia",
        name: "Incarcerated inguinal hernia",
        isCorrect: true,
        isDangerous: true,
        explanation: "Irreducible painful groin hernia with bowel loop trapped on imaging."
      },
      {
        id: "strangulated_inguinal_hernia",
        name: "Strangulated inguinal hernia",
        isCorrect: false,
        isDangerous: true,
        explanation: "Evolution of incarceration with bowel ischemia must be ruled out operatively if concern rises."
      },
      {
        id: "testicular_torsion",
        name: "Testicular torsion",
        isCorrect: false,
        isDangerous: true,
        explanation: "Imaging demonstrates hernia incarceration rather than isolated torsion picture."
      }
    ],
    teachingPoints: [
      "Grading (100): surgical urgency 30, nonreducible history 25, imaging 20, diagnosis 25. Strangulation risk bonus +10. Miss groin chronic history -15.",
      "Inability to reduce a previously reducible hernia with pain is ominous.",
      "CT confirms anatomy; ultrasound may aid bedside if radiation avoided in pregnancy variants elsewhere.",
      "Early surgical management prevents progression to strangulation and necrosis.",
      "Always document testicular exam in male acute groin pain."
    ]
  },
  {
    id: "acute-cholecystitis-ruq-maria-torres",
    title: "The Pain Went To My Right Side",
    specialty: GENERAL_SURGERY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Maria Torres, a 47-year-old administrative assistant, develops postprandial epigastric pain migrating to the right upper quadrant with fever, Murphy sign, and ultrasound showing gallstones and gallbladder wall thickening.",
    cardTeaser: "My upper stomach pain moved.",
    objectives: [
      "Recognize acute calculous cholecystitis from history and exam.",
      "Order RUQ ultrasound and interpret supportive labs.",
      "Differentiate from hepatitis, pancreatitis, and peptic disease."
    ],
    patientPersona: {
      name: "Maria Torres",
      age: 47,
      gender: "Female",
      chiefComplaint: "My upper stomach pain moved.",
      background:
        "Team lunch greasy celebration — epigastric pressure bloating first then pain slid under right ribs like knife corkscrew. Nausea vomit twice bathroom stall. Deep breath makes tender spot scream doctor pressed — Murphy whatever they called. No cardiac squeezing history. Occasional pizza bloat never this war. Kids texting worried pickup timing.",
      vitals: {
        heartRate: 102,
        bloodPressure: "132/78",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "100.9°F"
      },
      keyHistoryPoints: [
        "Fatty meal trigger",
        "Epigastric to RUQ migration",
        "Fever and leukocytosis",
        "Positive Murphy sign",
        "RUQ ultrasound gallstones and wall thickening",
        "Lipase not pancreatitis range"
      ],
      redFlags: [
        "Sepsis and emphysematous gallbladder require escalation",
        "Common duct stones with cholestasis change management",
        "Atypical cardiac symptoms in diabetic patients — ECG if doubt"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Maria — professional, precise pain description, anxious about missing work.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say cholecystitis or gallstones.",
        "Mention fatty lunch when asked meals.",
        "RUQ pain worse pressing inhale when exam described."
      ],
      doNotRevealDirectly: [
        "cholecystitis",
        "ultrasound gallstones",
        "you need lap chole tonight",
        "this is only heartburn"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Febrile; mild distress with RUQ pain.",
        details:
          "Ill appearing mild. No jaundice sclera grossly on quick inspection in sim."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "RUQ tenderness; Murphy sign positive.",
        details:
          "Right upper quadrant focal tenderness with inspiratory arrest on deep palpation. Mild guarding without generalized rigidity."
      }
    ],
    testOverrides: [
      {
        testId: "us_ruq",
        result:
          "Right upper quadrant ultrasound: gallstones present, gallbladder wall thickening, pericholecystic fluid, positive sonographic Murphy — compatible with acute cholecystitis.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: leukocytosis with neutrophil predominance.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP: mild AST/ALT elevation consistent with hepatic inflammation secondary to gallbladder disease; bilirubin near normal in this presentation.",
        yield: "helpful"
      },
      {
        testId: "lipase",
        result: "Lipase within normal limits — does not suggest acute pancreatitis as primary diagnosis.",
        yield: "high"
      },
      {
        testId: "lft",
        result: "Hepatic panel mild transaminitis without dramatic cholestatic pattern isolated in this dataset.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "WBC and LFTs support inflammation versus pancreatitis.",
      imagingDefault: "RUQ ultrasound first-line for suspected cholecystitis.",
      bedsideDefault: "Murphy sign sensitivity improves when solicited carefully.",
      procedureDefault: "Surgical consultation for cholecystectomy timing — urgent if severe."
    },
    finalDxId: "cholecystitis",
    requiredMustNotMiss: ["cholecystitis", "pancreatitis"],
    dxOverrides: [
      {
        dxId: "cholecystitis",
        yield: "correct",
        explanation:
          "Fatty meal-associated epigastric pain localizing to RUQ with fever, Murphy sign, ultrasound gallstones and wall thickening defines acute cholecystitis."
      },
      {
        dxId: "pancreatitis",
        yield: "dangerous-miss",
        explanation:
          "Must exclude pancreatitis — normal lipase and RUQ ultrasound pattern favor cholecystitis."
      },
      {
        dxId: "gastritis",
        yield: "low",
        explanation: "Dyspepsia possible but fever, focal RUQ exam, and ultrasound are not typical isolated gastritis."
      },
      {
        dxId: "acute_hepatitis_b",
        yield: "low",
        explanation:
          "Hepatitis can cause RUQ pain but prominent ultrasound cholecystitis findings and meal relationship localize to gallbladder."
      },
      {
        dxId: "peptic_ulcer_disease",
        yield: "low",
        explanation: "Epigastric pain without RUQ ultrasound abnormalities would be more typical; here imaging confirms gallbladder."
      }
    ],
    diagnosisOptions: [
      {
        id: "cholecystitis",
        name: "Acute cholecystitis",
        isCorrect: true,
        isDangerous: true,
        explanation: "Classic biliary colic evolution with imaging confirmation."
      },
      {
        id: "pancreatitis",
        name: "Acute pancreatitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Lipase not elevated; pain pattern and ultrasound localize to gallbladder."
      },
      {
        id: "peptic_ulcer_disease",
        name: "Peptic ulcer disease",
        isCorrect: false,
        isDangerous: true,
        explanation: "Focal RUQ findings and ultrasound not explained by ulcer alone."
      }
    ],
    teachingPoints: [
      "Grading (100): RUQ pattern 30, ultrasound 25, meal relation 20, diagnosis 25.",
      "RUQ ultrasound is cornerstone; HIDA if equivocal in selected cases.",
      "Antibiotics and surgical timing depend on severity scores and comorbidity.",
      "Pancreatitis must be excluded with lipase especially if epigastric radiation.",
      "Female sex and atypical GI symptoms still warrant cardiac consideration when features overlap."
    ]
  },
  {
    id: "small-bowel-obstruction-distention-richard-hayes",
    title: "My Belly Keeps Swelling",
    specialty: GENERAL_SURGERY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Richard Hayes, a 71-year-old retired mechanic with prior abdominal surgery, presents with progressive distention, cramping, vomiting, and obstipation; imaging shows dilated small bowel with a transition point.",
    cardTeaser: "My stomach keeps getting bigger and hurts.",
    objectives: [
      "Recognize small bowel obstruction pattern and adhesions risk.",
      "Interpret KUB and CT for obstruction versus ileus.",
      "Identify surgical indications including strangulation concern."
    ],
    patientPersona: {
      name: "Richard Hayes",
      age: 71,
      gender: "Male",
      chiefComplaint: "My stomach keeps getting bigger and hurts.",
      background:
        "Belly blowing up like bad tire pump two days — cramps waves nausea green vomit yesterday. No poop no fart worried — wife timing bathroom jokes died fast. Appendix scar appendix out thirty years — gallbladder scar too shop injury stitch story. Tried laxative tea stupid — worse cramp. Walk bent gasping dramatic.",
      vitals: {
        heartRate: 112,
        bloodPressure: "138/84",
        respiratoryRate: 22,
        oxygenSat: "98%",
        temperature: "99.0°F"
      },
      keyHistoryPoints: [
        "Progressive distention with cramping and vomiting",
        "Obstipation — no stool or flatus",
        "Prior abdominal operations — adhesive risk",
        "High-pitched bowel sounds early exam",
        "Dilated loops and air-fluid levels on imaging",
        "CT transition point consistent with mechanical obstruction"
      ],
      redFlags: [
        "Peritoneal signs, fever, lactate elevation suggest strangulated obstruction",
        "Closed-loop obstruction on CT requires urgent surgery",
        "Hypovolemia from third spacing and emesis needs resuscitation"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Richard — mechanic metaphors, worried but tries tough guy.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say bowel obstruction or adhesion.",
        "Mention no gas or stool when asked bowel movements.",
        "Prior surgery when asked history operations."
      ],
      doNotRevealDirectly: [
        "small bowel obstruction",
        "adhesions",
        "NG tube",
        "just constipation only"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Mild tachycardia; uncomfortable with distention.",
        details: "Dry mucous membranes if severe dehydration — moderate distress in sim."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Distended; high-pitched bowel sounds early.",
        details:
          "Tympanic distention diffusely tender without focal peritonitis unless complication. Hyperactive high-pitched sounds before possible transition to ileus quiet phase."
      }
    ],
    testOverrides: [
      {
        testId: "abdominal_xray",
        result:
          "Abdominal X-ray: dilated small bowel loops with multiple air-fluid levels — mechanical obstruction pattern.",
        yield: "high"
      },
      {
        testId: "ct_abdomen",
        result:
          "CT abdomen/pelvis: small bowel dilation with transition point — likely adhesive small bowel obstruction given surgical history.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: leukocytosis mild — monitor for ischemic bowel if rising.",
        yield: "helpful"
      },
      {
        testId: "cmp",
        result: "CMP: prerenal azotemia possible from dehydration — electrolytes guide resuscitation.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Lactate trends if strangulation worried clinically.",
      imagingDefault: "CT defines transition and complications.",
      bedsideDefault: "Nasogastric decompression and NPO common initial measures.",
      procedureDefault: "Surgery if strangulated, complete obstruction refractory, or peritonitis."
    },
    finalDxId: "small_bowel_obstruction",
    requiredMustNotMiss: ["small_bowel_obstruction", "ileus"],
    dxOverrides: [
      {
        dxId: "small_bowel_obstruction",
        yield: "correct",
        explanation:
          "Prior surgery, obstipation, vomiting, distention, and CT transition point fit adhesive small bowel obstruction."
      },
      {
        dxId: "ileus",
        yield: "dangerous-miss",
        explanation:
          "Ileus lacks clear mechanical transition — CT shows transition point here favoring obstruction."
      },
      {
        dxId: "gastroenteritis",
        yield: "low",
        explanation: "Diarrhea usually present; obstipation and imaging pattern oppose isolated gastroenteritis."
      },
      {
        dxId: "colon_cancer",
        yield: "reasonable",
        explanation: "Malignant obstruction more often colonic in older adults — CT helps localize level."
      }
    ],
    diagnosisOptions: [
      {
        id: "small_bowel_obstruction",
        name: "Small bowel obstruction",
        isCorrect: true,
        isDangerous: true,
        explanation: "Mechanical obstruction with dilated small bowel and transition on CT."
      },
      {
        id: "ileus",
        name: "Ileus (paralytic ileus)",
        isCorrect: false,
        isDangerous: true,
        explanation: "CT demonstrates transition point inconsistent with paralytic ileus alone."
      },
      {
        id: "gastroenteritis",
        name: "Gastroenteritis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain obstipation and obstructive imaging."
      }
    ],
    teachingPoints: [
      "Grading (100): obstruction pattern 30, surgical history 20, imaging 25, diagnosis 25.",
      "Prior laparotomy is adhesive SBO's classic substrate.",
      "Air-fluid levels on X-ray prompt CT for transition and complications.",
      "Strangulation signs — peritoneal findings, fever, tachycardia, acidosis.",
      "Partial versus complete obstruction and response to conservative trial guide surgery timing."
    ]
  },
  {
    id: "perirectal-abscess-sit-pain-kevin-morris",
    title: "I Have Severe Pain Near My Bottom",
    specialty: GENERAL_SURGERY_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Kevin Morris, a 36-year-old delivery driver, has progressive perianal pain worsened by sitting, fever, and a fluctuant tender mass — perirectal abscess on exam and imaging.",
    cardTeaser: "It hurts to sit.",
    objectives: [
      "Recognize perianal abscess from localized infection exam.",
      "Differentiate from hemorrhoids, fissure, and pilonidal disease.",
      "Plan incisional drainage and antibiotics when indicated."
    ],
    patientPersona: {
      name: "Kevin Morris",
      age: 36,
      gender: "Male",
      chiefComplaint: "It hurts to sit.",
      background:
        "Four days pressure ache near hole — ignored truck seat cushion swap futile. Now throbbing constant can't drive route finished early. Fever chills oscillate. No belly pain confusion different story. Embarrassed mechanic brother joked hemorrhoid cream Christmas — insult injury. Fluctuant spot hurts blink ridiculous.",
      vitals: {
        heartRate: 106,
        bloodPressure: "126/74",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "101.5°F"
      },
      keyHistoryPoints: [
        "Localized perianal pain worse sitting progressive",
        "Fever with systemic symptoms",
        "Fluctuant erythematous perianal mass on exam",
        "No diffuse abdominal tenderness",
        "Leukocytosis on labs",
        "CT or exam defines fluid collection needing drainage"
      ],
      redFlags: [
        "Necrotizing soft tissue infection requires urgent OR and broad antibiotics",
        "Supralevator extension complicates drainage approach",
        "Immunosuppression increases necrotizing infection risk"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Kevin — jokes deflect embarrassment, pain obvious when moves.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say abscess or incision and drainage.",
        "Worse sitting when asked position aggravates.",
        "Fever chills when asked systemic symptoms."
      ],
      doNotRevealDirectly: [
        "perirectal abscess",
        "incision and drainage",
        "this is only hemorrhoids for sure"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Febrile; uncomfortable shifting weight.",
        details: "Tachycardia mild. Toxic appearance moderate not septic shock in sim."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Soft; no generalized peritonitis.",
        details: "Bowel sounds present. No rebound or guarding cephalad of pelvis."
      },
      {
        id: "other",
        label: "Perianal",
        summary: "Fluctuant tender erythematous mass.",
        details:
          "Left lateral perianal induration with fluctuance — exquisite tenderness limits full internal exam without procedural sedation in real practice."
      }
    ],
    testOverrides: [
      {
        testId: "perianal_exam_focused",
        result:
          "Perianal examination: 3 cm fluctuant erythematous mass lateral to anal verge — clinical perirectal abscess requiring drainage planning.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: leukocytosis 16 K/µL consistent with invasive infection.",
        yield: "high"
      },
      {
        testId: "ct_abdomen",
        result:
          "CT pelvis: fluid collection in perirectal space with surrounding fat stranding — corresponds to physical exam abscess.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Leukocytosis supports bacterial abscess.",
      imagingDefault: "CT assists if deep or recurrent abscess; not always mandatory if obvious superficial.",
      bedsideDefault: "Avoid delay when classic fluctuant perianal abscess in toxic patient.",
      procedureDefault: "Incision and drainage is definitive; antibiotics adjunct."
    },
    finalDxId: "perirectal_abscess",
    requiredMustNotMiss: ["perirectal_abscess", "cellulitis"],
    dxOverrides: [
      {
        dxId: "perirectal_abscess",
        yield: "correct",
        explanation:
          "Focal perianal pain, fever, fluctuant mass, and leukocytosis with imaging fluid collection define perirectal abscess."
      },
      {
        dxId: "hemorrhoids",
        yield: "dangerous-miss",
        explanation:
          "Hemorrhoids can bleed or thrombose but systemic fever with fluctuant infection mass suggests abscess requiring drainage."
      },
      {
        dxId: "anal_fissure",
        yield: "low",
        explanation: "Fissure causes pain with defecation and linear tear — not dominant fluctuant mass."
      },
      {
        dxId: "pilonidal_abscess",
        yield: "reasonable",
        explanation: "Midline natal cleft predilection — exam location here lateral perianal favors cryptoglandular perirectal source."
      },
      {
        dxId: "cellulitis",
        yield: "low",
        explanation: "Erysipelas without collection less likely with clear fluctuance and pelvic fluid on CT."
      }
    ],
    diagnosisOptions: [
      {
        id: "perirectal_abscess",
        name: "Perirectal abscess",
        isCorrect: true,
        isDangerous: true,
        explanation: "Localized infection with purulent collection on exam and imaging."
      },
      {
        id: "hemorrhoids",
        name: "Hemorrhoids",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain fever, leukocytosis, and abscess cavity."
      },
      {
        id: "anal_fissure",
        name: "Anal fissure",
        isCorrect: false,
        isDangerous: false,
        explanation: "Lacks dominant abscess mass pattern."
      }
    ],
    teachingPoints: [
      "Grading (100): infection pattern 25, fluctuant mass 25, exam use 25, diagnosis 25.",
      "Cryptoglandular origin common — search for fistula after inflammation resolves.",
      "Antibiotics do not replace drainage for mature abscess.",
      "Necrotizing infection must be considered if pain out of proportion or crepitus.",
      "Occupations with prolonged sitting may delay care — emphasize early evaluation."
    ]
  },
  {
    id: "perforated-ulcer-rigid-walter-green",
    title: "My Belly Hurts Everywhere",
    specialty: GENERAL_SURGERY_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Walter Green, a 59-year-old construction worker with chronic NSAID use for back pain, develops sudden generalized abdominal pain with rigid abdomen and free intraperitoneal air on upright chest X-ray.",
    cardTeaser: "My stomach suddenly exploded with pain.",
    objectives: [
      "Recognize perforated viscus and diffuse peritonitis.",
      "Order upright chest X-ray or CT for pneumoperitoneum.",
      "Link NSAID use to peptic ulcer perforation risk."
    ],
    patientPersona: {
      name: "Walter Green",
      age: 59,
      gender: "Male",
      chiefComplaint: "My stomach suddenly exploded with pain.",
      background:
        "Pop snap pain standing truss lift — spread whole belly lightning second. Rigid board belly self-diagnosis TV drama. Ibuprofen handfuls years bad back concrete life — never scoped stomach stupid pride. Nausea bilious taste. Blood pressure cuff squeezed faint vibe. Wife Uber not ambulance stubborn wallet wrong priorities.",
      vitals: {
        heartRate: 124,
        bloodPressure: "96/60",
        respiratoryRate: 24,
        oxygenSat: "98%",
        temperature: "100.0°F"
      },
      keyHistoryPoints: [
        "Sudden severe generalized abdominal pain",
        "Rigid abdomen with rebound on exam",
        "Chronic NSAID use for musculoskeletal pain",
        "Upright chest X-ray shows free subdiaphragmatic air",
        "Leukocytosis and tachycardia hypotension suggesting sepsis physiology",
        "CT confirms pneumoperitoneum if X-ray equivocal elsewhere"
      ],
      redFlags: [
        "Septic shock and multiorgan failure from delayed perforation",
        "Elderly or steroid users may mask peritoneal signs — maintain suspicion",
        "Alternative causes include perforated diverticulitis and malignancy"
      ]
    },
    aiInstructions: {
      patientStyle:
        "Answer as Walter — tough guy crumbling, short breath sentences pain.",
      behaviorRules: [
        "Answer only as the patient.",
        "Do NOT say perforated ulcer or free air.",
        "Mention ibuprofen frequent when asked medications.",
        "Sudden spread pain when asked onset."
      ],
      doNotRevealDirectly: [
        "perforated peptic ulcer",
        "pneumoperitoneum",
        "emergency laparotomy",
        "just muscle strain"
      ]
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Toxic; tachycardic; hypotensive.",
        details:
          "Diaphoretic. Appears severely ill. Pallor suggested clinical context."
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Rigid; diffuse guarding and rebound.",
        details:
          "Board-like rigidity with widespread rebound tenderness — maximal epigastric but patient reports global pain. Hypoactive bowel sounds late pattern possible."
      }
    ],
    testOverrides: [
      {
        testId: "cxr",
        result:
          "Upright chest X-ray: lucency under both hemidiaphragms consistent with free intraperitoneal air (pneumoperitoneum).",
        yield: "high"
      },
      {
        testId: "ct_abdomen",
        result:
          "CT abdomen/pelvis with oral/IV contrast protocol: free air with extraluminal fluid — perforated hollow viscus likely duodenal/gastric ulcer in clinical context.",
        yield: "high"
      },
      {
        testId: "cbc",
        result: "CBC: leukocytosis left shift — 18 K/µL.",
        yield: "high"
      },
      {
        testId: "cmp",
        result: "CMP: acute kidney injury trend possible from hypovolemia; bicarbonate may fall if sepsis progresses.",
        yield: "helpful"
      }
    ],
    testDefaultBehavior: {
      labDefault: "Lactate and base deficit quantify perfusion.",
      imagingDefault: "Upright CXR sensitive for free air; CT if diagnosis unclear.",
      bedsideDefault: "Broad-spectrum antibiotics and fluid resuscitation pre-op.",
      procedureDefault: "Urgent surgical repair versus omental patch by team."
    },
    finalDxId: "perforated_peptic_ulcer",
    requiredMustNotMiss: ["perforated_peptic_ulcer", "appendicitis", "mesenteric_ischemia"],
    dxOverrides: [
      {
        dxId: "perforated_peptic_ulcer",
        yield: "correct",
        explanation:
          "Sudden peritonitis with pneumoperitoneum and NSAID-associated ulcer risk fits perforated peptic ulcer until OR confirms."
      },
      {
        dxId: "pancreatitis",
        yield: "low",
        explanation: "Pancreatitis causes epigastric pain but free air under diaphragm localizes to perforation."
      },
      {
        dxId: "appendicitis",
        yield: "dangerous-miss",
        explanation:
          "Perforated appendicitis can free air rarely localized — diffuse rigid abdomen with epigastric NSAID story favors upper GI perforation pattern; CT clarifies."
      },
      {
        dxId: "bowel_obstruction",
        yield: "low",
        explanation: "Obstruction may perforate but pneumoperitoneum here with sudden pain and rigid exam is primary perforation presentation."
      },
      {
        dxId: "mesenteric_ischemia",
        yield: "dangerous-miss",
        explanation:
          "Ischemia can perforate — not classic free air without infarction progression; clinical picture still mandates operative exploration if toxic."
      }
    ],
    diagnosisOptions: [
      {
        id: "perforated_peptic_ulcer",
        name: "Perforated peptic ulcer",
        isCorrect: true,
        isDangerous: true,
        explanation: "Pneumoperitoneum with NSAID history and diffuse peritonitis."
      },
      {
        id: "pancreatitis",
        name: "Acute pancreatitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Does not explain intraperitoneal free air on upright imaging."
      },
      {
        id: "appendicitis",
        name: "Acute appendicitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Low probability given epigastric thunderclap with global rigidity and pneumoperitoneum pattern."
      }
    ],
    teachingPoints: [
      "Grading (100): surgical abdomen 35, imaging 20, NSAID risk 20, diagnosis 25. Peritonitis signs bonus +10.",
      "NSAIDs increase peptic ulcer and perforation risk especially with polypharmacy.",
      "Upright chest film remains classic pneumoperitoneum screen.",
      "Rigid abdomen is peritonitis until proven otherwise — resuscitate and operate in parallel when unstable.",
      "Consider stress ulcer prophylaxis in ICU patients — different context related learning."
    ]
  }
];
