import type { Scenario } from "@/data/scenarios";

const OBGYN_SPECIALTY = "Obstetrics & Gynecology (OB/GYN)" as const;

export const obgynScenarios: Scenario[] = [
  {
    id: "obgyn-ectopic-jessica-missed-period",
    title: "My Lower Belly Hurts And I'm Late",
    specialty: OBGYN_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Jessica Morales, 26, presents to the ED with acute left lower quadrant pain, six-week amenorrhea, spotting, and tachycardia with hypotension—confirm intrauterine pregnancy location urgently.",
    cardTeaser: "My stomach hurts and my period never came.",
    objectives: [
      "Recognize pregnancy of unknown location and ectopic pregnancy as must-not-miss.",
      "Order quantitative beta-hCG and transvaginal ultrasound; interpret absence of IUP with positive hCG.",
      "Differentiate from ovarian torsion, appendicitis, miscarriage, and PID.",
    ],
    patientPersona: {
      name: "Jessica Morales",
      age: 26,
      gender: "Female",
      chiefComplaint: "My stomach hurts and my period never came.",
      background:
        "Left-sided lower belly pain started hard this morning—sharp, worse when she moves—then spread into a constant ache. Last normal period was about six weeks ago; she thought stress from comps was delaying it until the spotting started yesterday—pink smears, not a real flow. Lightheaded standing from the triage chair. Sexually active with her boyfriend; inconsistent condoms—she was embarrassed to say. G1P0, no prior pregnancies carried. No fever or vomiting—just nausea from pain. Denies UTI burning. No prior IUD—stopped pills over a year ago; not tracking ovulation.",
      vitals: {
        heartRate: 116,
        bloodPressure: "94/60",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "98.8°F",
      },
      keyHistoryPoints: [
        "Six-week amenorrhea with new acute pelvic pain",
        "Light vaginal spotting",
        "Tachycardia and relative hypotension",
        "Sexually active; contraception inconsistent",
        "Positive pregnancy testing with no IUP on TV ultrasound",
        "Left lower quadrant tenderness and cervical motion tenderness",
      ],
      redFlags: [
        "Possible ruptured ectopic—peritonitis",
        "Hemodynamic instability",
        "Shoulder tip pain or syncope",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Graduate-student vocabulary when calm; scared and a little ashamed about contraception details unless asked directly.",
      behaviorRules: [
        "Answer only as Jessica.",
        "Do not say ectopic pregnancy or say the pregnancy is definitely in the tube.",
        "Give LMP and sexual history when asked clearly without volunteering a diagnosis.",
      ],
      doNotRevealDirectly: [
        "ectopic pregnancy",
        "I'm pregnant in my tube",
        "the baby is outside the uterus",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Anxious, mildly diaphoretic; appears uncomfortable with slow cautious movements.",
        details:
          "Alert and oriented. Skin cool and clammy at the palms. No scleral icterus. Patient guards lower abdomen during conversation.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Left lower quadrant tenderness with mild guarding; no obvious distension.",
        details:
          "Soft elsewhere. Focal tenderness maximal in left lower quadrant without clear rebound—guarding limits full peritoneal assessment. Bowel sounds present.",
      },
      {
        id: "pelvic",
        label: "Pelvic",
        summary: "Cervical motion tenderness; left adnexal tenderness suspected on bimanual exam.",
        details:
          "Minimal dark blood at introitus. Uterus anteverted, normal size for early gestation uncertain. Cervical motion produces sharp pain. Left adnexal fullness with deep tenderness—patient unable to tolerate full exam.",
      },
    ],
    testOverrides: [
      {
        testId: "pregnancy_test",
        result: "Urine pregnancy test: positive (hCG detected).",
        yield: "high",
      },
      {
        testId: "quantitative_beta_hcg",
        result:
          "Serum quantitative beta-hCG: elevated consistent with early pregnancy—does not confirm intrauterine location; trend serial levels if clinically indicated.",
        yield: "high",
      },
      {
        testId: "transvaginal_ultrasound",
        result:
          "Transvaginal ultrasound: no definite intrauterine gestational sac identified at this quantitative hCG plateau; left adnexal complex mass with surrounding free fluid—findings concerning for ectopic pregnancy. Correlate clinically.",
        yield: "high",
      },
      {
        testId: "cbc",
        result:
          "CBC: hemoglobin at lower-normal range; mild leukocytosis—interpret with clinical picture.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Labs supportive when paired with pregnancy testing and pelvic imaging.",
      imagingDefault: "Ultrasound is primary for pregnancy location in first-trimester pain or bleeding.",
      bedsideDefault: "Trend vital signs and monitor pain and peritoneal signs closely.",
      procedureDefault: "Surgical or medication management per institutional protocol when ectopic confirmed or highly suspected.",
    },
    finalDxId: "ectopic_pregnancy",
    requiredMustNotMiss: [
      "ectopic_pregnancy",
      "ovarian_torsion",
      "appendicitis",
      "spontaneous_abortion",
    ],
    dxOverrides: [
      {
        dxId: "ectopic_pregnancy",
        yield: "correct",
        explanation:
          "Early pregnancy with pain and bleeding, unstable vitals for context, absent IUP on imaging with adnexal pathology and free fluid—classic high-risk ectopic presentation.",
      },
      {
        dxId: "ovarian_torsion",
        yield: "dangerous-miss",
        explanation:
          "Can cause unilateral pain and adnexal mass—pregnancy test positive makes ectopic higher priority but torsion can coexist rarely.",
      },
      {
        dxId: "appendicitis",
        yield: "reasonable",
        explanation:
          "RLQ focus more typical; pain localized left and pregnancy location issues steer away as primary.",
      },
      {
        dxId: "spontaneous_abortion",
        yield: "reasonable",
        explanation:
          "Bleeding common—but absence of IUP with this hCG pattern and adnexal findings is more ectopic than completed abortion.",
      },
      {
        dxId: "pelvic_inflammatory_disease",
        yield: "low",
        explanation: "Fever and purulent discharge less prominent; positive pregnancy test redirects to pregnancy complications first.",
      },
    ],
    diagnosisOptions: [
      {
        id: "ectopic_pregnancy",
        name: "Ectopic pregnancy",
        isCorrect: true,
        isDangerous: true,
        explanation: "Extrauterine implantation threatening tubal rupture—urgent OB/GYN management.",
      },
      {
        id: "ovarian_torsion",
        name: "Ovarian torsion",
        isCorrect: false,
        isDangerous: true,
        explanation: "Surgical emergency but pregnancy location workup takes precedence with positive hCG and this imaging.",
      },
      {
        id: "appendicitis",
        name: "Appendicitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less consistent with dominant left-sided pain and obstetric ultrasound findings.",
      },
      {
        id: "spontaneous_abortion",
        name: "Spontaneous abortion (miscarriage)",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must see intrauterine pregnancy status—here imaging argues against simple threatened abortion alone.",
      },
    ],
    teachingPoints: [
      "Grading (100): pregnancy emergency recognition 35, beta-hCG plus TVUS 25, missed-period clue 15, diagnosis 25. Bonus: rupture risk +10.",
      "Unstable or peritoneal signs with pregnancy of unknown location require emergent OB/GYN consultation.",
      "Always ask LMP, contraception, and pregnancy intention in reproductive-age pelvic pain.",
    ],
  },

  {
    id: "obgyn-pcos-emily-irregular-cycles",
    title: "My Periods Are Completely Unpredictable",
    specialty: OBGYN_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Emily Shah, 19, has long-standing oligomenorrhea, acne, hirsutism, and weight gain—labs and ultrasound support PCOS after exclusion workup.",
    cardTeaser: "My periods are all over the place.",
    objectives: [
      "Link hyperandrogenism and ovulatory dysfunction to PCOS criteria conceptually.",
      "Order testosterone, pelvic ultrasound, TSH, and HbA1c as guided workup.",
      "Distinguish PCOS from thyroid disease, pregnancy, hyperprolactinemia, and adrenal causes.",
    ],
    patientPersona: {
      name: "Emily Shah",
      age: 19,
      gender: "Female",
      chiefComplaint: "My periods are all over the place.",
      background:
        "Periods never ran like clockwork—sometimes months apart without explanation. Lately she thinks the last real bleed was roughly three months ago; she loses track. College stress, dining hall food, late ramen—she gained maybe 25 pounds since starting school. Chin and upper lip hair she plucks every morning; high-school acne calmed then came back angrier along the jaw. No severe pelvic pain that feels like ER stuff—more annoyance and worry about fertility someday. Not trying to conceive. Condoms sometimes at parties—not consistent. No IUD. Takes a multivitamin sporadically. Mom has 'thyroid something' vague. No galactorrhea. Energy low but she blames schedule.",
      vitals: {
        heartRate: 84,
        bloodPressure: "126/78",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "Chronic oligomenorrhea and acne flare",
        "Hirsutism and elevated BMI",
        "No acute pelvic pain",
        "Elevated androgens and polycystic ovarian morphology on ultrasound",
        "Exclude thyroid dysfunction and pregnancy in initial workup",
      ],
      redFlags: [
        "Rapid virilization",
        "Severe unilateral adnexal pain",
        "Signs of disordered eating or heavy bleeding",
      ],
    },
    aiInstructions: {
      patientStyle:
        "College-student casual tone; embarrassed about facial hair; minimizes sexual history unless asked non-judgmentally.",
      behaviorRules: [
        "Do not say PCOS or polycystic ovaries as a firm self-diagnosis.",
        "Answer LMP and contraception when asked; acknowledge uncertainty on dates.",
      ],
      doNotRevealDirectly: [
        "I have PCOS",
        "polycystic ovary syndrome",
        "my ovaries are polycystic",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Overweight BMI; alert; cooperates with exam.",
        details:
          "Central adiposity on inspection. No acanthosis nigricans prominent on quick neck exam. Vitals stable otherwise.",
      },
      {
        id: "skin",
        label: "Skin",
        summary: "Mild inflammatory acne along jawline and cheeks.",
        details:
          "Comedonal and papular inflammatory acne without cystic abscess today. Hirsutism: coarse terminal hair on upper lip and chin consistent with Ferriman-Gallwey elevation without full scoring documented.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Soft, non-tender; no masses palpated superficially.",
        details: "No hepatosplenomegaly appreciated. Bowel sounds normal.",
      },
    ],
    testOverrides: [
      {
        testId: "serum_testosterone_total",
        result: "Total testosterone elevated for adult female reference range—supports hyperandrogenemia in clinical context.",
        yield: "high",
      },
      {
        testId: "transvaginal_ultrasound",
        result:
          "Transvaginal ultrasound: ovaries enlarged with multiple small peripheral follicles—morphology consistent with polycystic ovaries when paired with clinical picture.",
        yield: "high",
      },
      {
        testId: "hba1c",
        result: "HbA1c: borderline elevation—insulin resistance pattern should be addressed with counseling and follow-up.",
        yield: "helpful",
      },
      {
        testId: "tsh",
        result: "TSH within normal limits—no primary hypothyroidism identified on this screen.",
        yield: "helpful",
      },
      {
        testId: "pregnancy_test",
        result: "Urine pregnancy test: negative.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Screen metabolic and endocrine mimics alongside androgen testing.",
      imagingDefault: "Pelvic ultrasound assists ovarian morphology assessment—not diagnostic in isolation.",
      bedsideDefault: "BP and BMI track cardiometabolic risk in PCOS follow-up.",
      procedureDefault: "Not required for initial diagnosis in this outpatient vignette.",
    },
    finalDxId: "pcos",
    requiredMustNotMiss: ["pcos", "hypothyroidism"],
    dxOverrides: [
      {
        dxId: "pcos",
        yield: "correct",
        explanation:
          "Oligomenorrhea with clinical hyperandrogenism and polycystic ovarian morphology after reasonable exclusion of thyroid disease and pregnancy fits PCOS.",
      },
      {
        dxId: "hypothyroidism",
        yield: "dangerous-miss",
        explanation: "Always screen; normal TSH here makes this less likely but remains an important mimic.",
      },
      {
        dxId: "early_pregnancy_normal",
        yield: "low",
        explanation: "Negative pregnancy test reduces likelihood of amenorrhea from early pregnancy.",
      },
      {
        dxId: "hyperprolactinemia",
        yield: "reasonable",
        explanation: "Can cause oligomenorrhea; lacks galactorrhea lead and would need prolactin if suspected.",
      },
      {
        dxId: "adrenal_hyperandrogenism",
        yield: "low",
        explanation: "Rapid virilization absent; testosterone elevation modest and more typical for PCOS spectrum.",
      },
    ],
    diagnosisOptions: [
      {
        id: "pcos",
        name: "Polycystic ovary syndrome (PCOS)",
        isCorrect: true,
        isDangerous: false,
        explanation: "Hyperandrogenism and ovulatory dysfunction with supportive ultrasound findings.",
      },
      {
        id: "hypothyroidism",
        name: "Hypothyroidism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Explained by normal TSH on screening in this case.",
      },
      {
        id: "early_pregnancy_normal",
        name: "Early intrauterine pregnancy",
        isCorrect: false,
        isDangerous: false,
        explanation: "Negative urine pregnancy test argues against.",
      },
      {
        id: "hyperprolactinemia",
        name: "Hyperprolactinemia",
        isCorrect: false,
        isDangerous: false,
        explanation: "Possible alternative cause of oligomenorrhea; not supported without prolactin elevation.",
      },
    ],
    teachingPoints: [
      "Grading (100): PCOS symptom cluster 30, endocrine workup 20, menstrual history 25, diagnosis 25.",
      "PCOS is a diagnosis of exclusion—pregnancy and thyroid disease are first-pass checks.",
      "Discuss weight, glucose risk, contraception, and fertility goals when counseling.",
    ],
  },

  {
    id: "obgyn-miscarriage-ashley-bleeding",
    title: "I'm Bleeding And Cramping",
    specialty: OBGYN_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 13,
    description:
      "Ashley Foster, 31, at roughly eight weeks gestation by dates has worsening bleeding and cramping—ultrasound and hCG pattern indicate pregnancy loss.",
    cardTeaser: "I'm pregnant and bleeding.",
    objectives: [
      "Assess first-trimester bleeding severity and hemodynamic stability.",
      "Use ultrasound and serial hCG interpretation for viability versus ectopic exclusion.",
      "Support patient emotionally while clarifying threatened versus inevitable versus complete abortion concepts.",
    ],
    patientPersona: {
      name: "Ashley Foster",
      age: 31,
      gender: "Female",
      chiefComplaint: "I'm pregnant and bleeding.",
      background:
        "Home pregnancy test turned positive about eight weeks ago—she told her husband that night, cried happy tears, now feels guilty for crying scared. Bright red bleeding soaked two pads today—more than spotting—waves of crampy pain low like bad period. No passing tissue she recognized. G2P1—first kid healthy toddler. No fever. Mild nausea earlier in pregnancy; boobs still sore. Terrified of ectopic because her cousin had one. No recent intercourse trauma. Prenatal vitamin most days; no ibuprofen since she knew.",
      vitals: {
        heartRate: 102,
        bloodPressure: "112/70",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.7°F",
      },
      keyHistoryPoints: [
        "Confirmed early intrauterine pregnancy by dates with escalating bleeding",
        "Cramping and anxiety—not febrile",
        "Ultrasound consistent with nonviable pregnancy",
        "Declining beta-hCG trend when followed",
        "Ectopic remains alternate until location clarified",
      ],
      redFlags: [
        "Heavy hemorrhage or dizziness/syncope",
        "Isolated adnexal mass with pregnancy—think ectopic",
        "Sepsis with retained products",
      ],
    },
    aiInstructions: {
      patientStyle:
        "A worried teacher—articulate when calmer, voice shaky when describing bleeding, needs reassurance without false certainty.",
      behaviorRules: [
        "Do not state 'you are having a miscarriage' as an absolute before tests—describe symptoms unless user frames results.",
        "Allow emotional language; answer quantified pad count if asked.",
      ],
      doNotRevealDirectly: [
        "definite miscarriage before the doctor says the ultrasound shows it",
        "the baby is already gone",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Anxious, tearing; mildly tachycardic; not hypotensive.",
        details:
          "Conversational but interruptible by cramping. Skin pale but warm. Appears mildly volume stressed without shock.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Mild suprapubic tenderness without peritoneal signs.",
        details: "Soft with tenderness across lower midline. No rebound or guarding. No palpable enlarged uterus edge distinctly above symphysis on quick exam.",
      },
      {
        id: "pelvic",
        label: "Pelvic",
        summary: "Active vaginal bleeding; cervix visualized with blood in vault.",
        details:
          "Speculum: moderate blood in vaginal vault; cervix appears slightly open—details and tissue classification per attending documentation. Bimanual tenderness mild.",
      },
    ],
    testOverrides: [
      {
        testId: "quantitative_beta_hcg",
        result:
          "Serial quantitative beta-hCG: declining trend inconsistent with viable intrauterine pregnancy—pregnancy failure pattern when paired with ultrasound.",
        yield: "high",
      },
      {
        testId: "transvaginal_ultrasound",
        result:
          "Transvaginal ultrasound: pregnancy with no fetal cardiac activity and findings diagnostic of nonviability for gestational age—retained products possible depending on completeness.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: hemoglobin stable mild anemia range—monitor if bleeding escalates.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "hCG trends and CBC guide bleeding management.",
      imagingDefault: "First-trimester viability and location require pelvic ultrasound.",
      bedsideDefault: "Quantify bleeding pads per hour orthostatics if symptoms worsen.",
      procedureDefault: "Expectant medical or surgical management per clinical pathway and patient stability.",
    },
    finalDxId: "spontaneous_abortion",
    requiredMustNotMiss: ["spontaneous_abortion", "ectopic_pregnancy"],
    dxOverrides: [
      {
        dxId: "spontaneous_abortion",
        yield: "correct",
        explanation:
          "Symptomatic first-trimester bleeding with nonviable ultrasound and failing hCG supports spontaneous abortion.",
      },
      {
        dxId: "ectopic_pregnancy",
        yield: "dangerous-miss",
        explanation: "Must exclude ectopic when bleeding in pregnancy until IUP viably documented.",
      },
      {
        dxId: "threatened_abortion",
        yield: "reasonable",
        explanation: "Early consideration with bleeding—but ultrasound here shows nonviability beyond threatened course.",
      },
      {
        dxId: "implantation_bleeding",
        yield: "low",
        explanation: "Implantation bleeding is trivial and early; eight-week heavy flow incompatible.",
      },
    ],
    diagnosisOptions: [
      {
        id: "spontaneous_abortion",
        name: "Spontaneous abortion (miscarriage)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Documented pregnancy failure with bleeding and ultrasound correlation.",
      },
      {
        id: "ectopic_pregnancy",
        name: "Ectopic pregnancy",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must have been considered; intrauterine nonviable pregnancy lowers likelihood once imaging clarified.",
      },
      {
        id: "threatened_abortion",
        name: "Threatened abortion",
        isCorrect: false,
        isDangerous: false,
        explanation: "Implies continuing possibility of viable pregnancy—not supported after nonviable findings.",
      },
      {
        id: "implantation_bleeding",
        name: "Implantation bleeding",
        isCorrect: false,
        isDangerous: false,
        explanation: "Inconsistent timing and severity.",
      },
    ],
    teachingPoints: [
      "Grading (100): pregnancy complication recognition 30, ultrasound 20, bleeding severity assessment 25, diagnosis 25.",
      "Heavy bleeding pad counts orthostatics and Rh immune globulin considerations matter in first-trimester loss.",
      "Pair empathy with clear next-step options and return precautions.",
    ],
  },

  {
    id: "obgyn-pid-maria-discharge",
    title: "I Feel Pressure And Burning Down There",
    specialty: OBGYN_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Maria Gomez, 24, has fever, purulent discharge, dyspareunia, and cervical motion tenderness after a new partner—NAAT confirms gonorrhea with leukocytosis.",
    cardTeaser: "I've had pain and discharge.",
    objectives: [
      "Recognize PID clinically and treat as STI-related upper tract infection until proven otherwise.",
      "Order pregnancy test, CBC, and NAAT testing; avoid missing concurrent pregnancy or abscess.",
      "Differentiate sepsis mimics: ectopic, appendicitis, UTI, and ovarian cyst complications.",
    ],
    patientPersona: {
      name: "Maria Gomez",
      age: 24,
      gender: "Female",
      chiefComplaint: "I've had pain and discharge.",
      background:
        "Pelvic pressure and burning deep inside started a few days ago—worse after shift at the cafe. New boyfriend about six weeks; they skipped condoms twice—she knows that was dumb and winces admitting it. Yellow-green discharge staining liners; fishy-ish smell she tries to mask with sprays. Fever to 101 at home with chills. Sex hurt last night—deep ache—not just entrance burning. LMP two weeks ago, normal for her. No IUD. No prior PID diagnosed. Urinary frequency mild but no knife-edge dysuria like past UTIs. Took leftover cranberry pills—no help.",
      vitals: {
        heartRate: 108,
        bloodPressure: "118/72",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "101.4°F",
      },
      keyHistoryPoints: [
        "Fever with pelvic pain and new partner",
        "Purulent discharge and cervical motion tenderness",
        "Positive gonorrhea NAAT and leukocytosis",
        "Pregnancy test negative—still required",
      ],
      redFlags: [
        "Tubo-ovarian abscess",
        "Sepsis",
        "Pregnancy with concurrent infection",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Tired barista—direct when respected; guilt about condoms; defensive if judged.",
      behaviorRules: [
        "Do not name PID or gonorrhea as her diagnosis before 'test results' framing.",
        "Give sexual history when asked plainly.",
      ],
      doNotRevealDirectly: [
        "I have PID",
        "it is gonorrhea for sure",
        "pelvic inflammatory disease",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Febrile, flushed, uncomfortable; tachycardic.",
        details:
          "Ill appearing but alert. Dry mucous membranes borderline. No jaundice. Shivers episodic under warming blanket.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "Lower abdominal tenderness without localized RLQ guarding.",
        details:
          "Diffuse lower quadrant tenderness with palpation—cannot localize single surgical point. Bowel sounds normal. No rebound.",
      },
      {
        id: "pelvic",
        label: "Pelvic",
        summary: "Purulent cervical discharge; cervical motion tenderness and bilateral adnexal tenderness.",
        details:
          "Speculum: mucopurulent discharge from os. Bimanual exam limited by pain with marked cervical motion tenderness and bilateral adnexal thickening—complex cyst cannot be excluded bedside.",
      },
    ],
    testOverrides: [
      {
        testId: "pregnancy_test",
        result: "Urine pregnancy test: negative.",
        yield: "high",
      },
      {
        testId: "sti_gc_ct_naat",
        result:
          "NAAT: positive for Neisseria gonorrhoeae; chlamydia negative on this panel—treat per guidelines and partner notification.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: leukocytosis with neutrophil predominance—consistent with acute pelvic infection.",
        yield: "high",
      },
      {
        testId: "transvaginal_ultrasound",
        result:
          "Transvaginal ultrasound: no tubo-ovarian abscess identified on initial imaging—follow clinically if persistent pain or toxicity.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "NAAT and CBC typically abnormal in acute PID.",
      imagingDefault: "Ultrasound to exclude abscess when severe or nonresponsive.",
      bedsideDefault: "Trend vitals; toxic patients need broader sepsis care.",
      procedureDefault: "Consider admission criteria per severity and oral tolerance.",
    },
    finalDxId: "pelvic_inflammatory_disease",
    requiredMustNotMiss: ["pelvic_inflammatory_disease", "ectopic_pregnancy", "appendicitis"],
    dxOverrides: [
      {
        dxId: "pelvic_inflammatory_disease",
        yield: "correct",
        explanation:
          "Classic cervicitis symptoms, pelvic exam triad pattern, fever, positive gonorrhea testing, and leukocytosis support PID.",
      },
      {
        dxId: "uti",
        yield: "reasonable",
        explanation: "Dysuria can occur; dominant pelvic exam and discharge steer toward PID first.",
      },
      {
        dxId: "ectopic_pregnancy",
        yield: "dangerous-miss",
        explanation: "Negative pregnancy test lowers but never lazily excludes in reproductive-age pelvic pain protocols historically—here negative.",
      },
      {
        dxId: "appendicitis",
        yield: "reasonable",
        explanation: "Consider if focal RLQ and pregnancy negative; diffuse pelvic findings less typical.",
      },
      {
        dxId: "ovarian_cyst_mimic",
        yield: "reasonable",
        explanation: "Functional cyst can hurt; infection signs and GC positive redirect.",
      },
    ],
    diagnosisOptions: [
      {
        id: "pelvic_inflammatory_disease",
        name: "Pelvic inflammatory disease (PID)",
        isCorrect: true,
        isDangerous: true,
        explanation: "Clinical and microbiologic evidence of ascending pelvic infection.",
      },
      {
        id: "uti",
        name: "Urinary tract infection",
        isCorrect: false,
        isDangerous: false,
        explanation: "Less consistent with exam findings and NAAT results.",
      },
      {
        id: "ectopic_pregnancy",
        name: "Ectopic pregnancy",
        isCorrect: false,
        isDangerous: true,
        explanation: "Negative pregnancy test makes unlikely but highlights need to test.",
      },
      {
        id: "appendicitis",
        name: "Appendicitis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely with purulent discharge and bilateral tenderness pattern.",
      },
    ],
    teachingPoints: [
      "Grading (100): PID findings 30, STI testing 25, sexual risk history 20, diagnosis 25.",
      "Treat empirically for GC/chlamydia coverage per guidelines; evaluate for hospitalization if severe.",
      "Partner treatment and condom counseling reduce recurrence.",
    ],
  },

  {
    id: "obgyn-preeclampsia-rebecca-headache-swelling",
    title: "My Head Hurts And My Feet Are Swelling",
    specialty: OBGYN_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "Rebecca Turner, G1P0 at 34 weeks, has severe-range blood pressure, headache, visual changes, edema, and hyperreflexia—preeclampsia with proteinuria.",
    cardTeaser: "My swelling feels worse and my head won't stop hurting.",
    objectives: [
      "Recognize severe features of preeclampsia in third trimester.",
      "Order urinalysis, urine protein quantification, CBC, and CMP for HELLP surveillance.",
      "Differentiate from chronic hypertension, migraine, primary renal disease, and evolving HELLP.",
    ],
    patientPersona: {
      name: "Rebecca Turner",
      age: 29,
      gender: "Female",
      chiefComplaint: "My swelling feels worse and my head won't stop hurting.",
      background:
        "Feet look like loaves in her sneakers for two weeks—socks leave deep rings. Headache started yesterday—band-like then pounding behind eyes—TYLENOL weak relief. Photopsies—little sparkles in the edge of vision when scrolling spreadsheets—scared her into leaving work. RUQ ache after greasy takeout—maybe indigestion but different from heartburn before pregnancy. G1P0, 34 weeks by early dating ultrasound. Prenatal course boring until now—last visit BP 'fine' she thought. No prior preeclampsia history—sister had 'high BP' pregnancy vague. No focal weakness. No trauma. Baby still moving—she thinks. Swollen hands—wedding ring cut off last month joke that stopped being funny.",
      vitals: {
        heartRate: 96,
        bloodPressure: "168/104",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "Third-trimester hypertension with headache and visual symptoms",
        "Progressive edema and RUQ discomfort",
        "Proteinuria on workup; reflexes brisk",
        "Differentiate HELLP with platelets LFTs",
      ],
      redFlags: [
        "Eclampsia seizure risk",
        "HELLP with hepatic rupture or DIC",
        "Fetal distress requiring delivery timing",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Usually precise accountant—now scattered from pain; wants concrete numbers about baby risk without alarmism.",
      behaviorRules: [
        "Do not diagnose preeclampsia aloud—describe symptoms and worry.",
        "Answer obstetric history gestational age clearly when asked.",
      ],
      doNotRevealDirectly: [
        "I have preeclampsia",
        "HELLP",
        "you need delivery tonight for sure",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Alert, anxious; notable bipedal edema to mid-shin.",
        details:
          "Face mild puffiness without obvious airway compromise. Patient avoids bright hallway lights—squints. Appears uncomfortable but conversant.",
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "Hyperreflexia at patellar tendons bilaterally without sustained clonus on quick check.",
        details:
          "Oriented x3. Cranial nerves grossly intact. Visual field confrontation limited by cooperation—reports peripheral shimmer symptoms historically today. No focal weakness.",
      },
      {
        id: "abdomen",
        label: "Abdomen",
        summary: "RUQ mild tenderness deep palpation; hepatomegaly not strikingly palpated.",
        details:
          "Soft abdomen; gravid uterus consistent with third trimester. Mild RUQ discomfort reproduced—consider hepatic capsular stretch spectrum.",
      },
    ],
    testOverrides: [
      {
        testId: "ua",
        result: "Urinalysis: protein 2+; absence of infection pattern—suggests significant proteinuria warranting quantification.",
        yield: "high",
      },
      {
        testId: "urine_protein_creatinine_ratio",
        result: "Urine protein-to-creatinine ratio elevated—meets proteinuria criteria supportive of preeclampsia in clinical context.",
        yield: "high",
      },
      {
        testId: "cbc",
        result:
          "CBC: platelet count sufficient to argue against overt HELLP thrombocytopenia on this draw—repeat if clinical decline.",
        yield: "helpful",
      },
      {
        testId: "cmp",
        result:
          "CMP: transaminases mildly elevated—HELLP spectrum monitoring needed; creatinine acceptable on this sample.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CBC CMP urinalysis and protein quantification guide severity.",
      imagingDefault: "Fetal assessment per OB triage—not CT for this presentation.",
      bedsideDefault: "Blood pressure repetition strict lateralizing symptoms monitoring.",
      procedureDefault: "Magnesium and antihypertensive protocols per OB—beyond scope textually but implied.",
    },
    finalDxId: "preeclampsia",
    requiredMustNotMiss: ["preeclampsia", "hellp_syndrome"],
    dxOverrides: [
      {
        dxId: "preeclampsia",
        yield: "correct",
        explanation:
          "Gestational hypertension with proteinuria and cerebral visual symptoms plus edema after 34 weeks fits preeclampsia with severe features.",
      },
      {
        dxId: "hellp_syndrome",
        yield: "dangerous-miss",
        explanation:
          "Elevated LFTs mandate platelet surveillance—partial overlap; may evolve—watch closely.",
      },
      {
        dxId: "essential_hypertension",
        yield: "reasonable",
        explanation: "New-onset headache pattern with proteinuria makes pregnancy-specific pathology more likely than chronic alone.",
      },
      {
        dxId: "migraine",
        yield: "low",
        explanation: "Visual symptoms overlap but blood pressure and proteinuria redirect.",
      },
      {
        dxId: "chronic_kidney_disease",
        yield: "low",
        explanation: "Proteinuria acute context with pregnancy signs makes renal primary diagnosis less central without baseline.",
      },
    ],
    diagnosisOptions: [
      {
        id: "preeclampsia",
        name: "Preeclampsia",
        isCorrect: true,
        isDangerous: true,
        explanation: "Hypertensive disorder of pregnancy with proteinuria and severe features.",
      },
      {
        id: "hellp_syndrome",
        name: "HELLP syndrome",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must monitor with platelets and smear—LFT elevation raises suspicion without full triad yet.",
      },
      {
        id: "essential_hypertension",
        name: "Essential hypertension",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not alone explain new proteinuria with neurovisual symptoms at 34 weeks.",
      },
      {
        id: "migraine",
        name: "Migraine",
        isCorrect: false,
        isDangerous: false,
        explanation: "Incomplete explanation for hypertension and proteinuria.",
      },
    ],
    teachingPoints: [
      "Grading (100): pregnancy hypertension emergency 35, urine protein studies 20, neuro symptoms 20, diagnosis 25. Bonus: seizure risk +10.",
      "Severe features warrant magnesium for seizure prophylaxis and controlled blood pressure management per OB.",
      "HELLP can present atypically—repeat CBC LFTs when suspicious.",
    ],
  },
];
