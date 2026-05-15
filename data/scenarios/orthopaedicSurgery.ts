import type { Scenario } from "@/data/scenarios";

const ORTHO_SPECIALTY = "Orthopaedic Surgery" as const;

export const orthopaedicSurgeryScenarios: Scenario[] = [
  {
    id: "ortho-acl-jordan-soccer-pivot",
    title: "I Heard A Pop And Fell",
    specialty: ORTHO_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 12,
    description:
      "Jordan Miller, 19-year-old college soccer midfielder, pivoted during practice yesterday—heard a pop, developed a swollen knee, and now describes instability and difficulty cutting.",
    cardTeaser: "My knee gave out.",
    objectives: [
      "Elicit noncontact pivot mechanism, hemarthrosis, and instability after ACL injury.",
      "Use knee radiographs to exclude fracture and MRI to confirm ligament injury.",
      "Differentiate ACL tear from meniscus injury, MCL injury, patellar instability, and tibial plateau fracture.",
    ],
    patientPersona: {
      name: "Jordan Miller",
      age: 19,
      gender: "Male",
      chiefComplaint: "My knee gave out.",
      background:
        "Yesterday’s indoor practice—cut hard to chase a through-ball, planted right foot, knee buckled inward-ish with a sharp pop heard over crowd noise. Hit turf immediately—not someone’s tackle, just a dumb plant. Knee blew up within an hour—tight swollen like a grapefruit. Could barely finish hobbling to the sideline. Crutches today; full weight feels scary, leg gives way on turns. No locking catching like a bucket-handle story he googled—more wobbly straight-line fine until lateral shuffle tries. Prior knee healthy—no surgeries. Ibuprofen from athletic trainer helped pain not swelling. Worried about scholarship season—voice tight admitting that.",
      vitals: {
        heartRate: 72,
        bloodPressure: "122/76",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.4°F",
      },
      keyHistoryPoints: [
        "Noncontact deceleration/pivot injury with audible pop",
        "Rapid hemarthrosis and activity-limiting effusion",
        "Instability with cutting—cautious weight-bearing",
        "MRI shows complete ACL tear; X-ray without fracture",
        "Neurovascular status intact distally on exam",
      ],
      redFlags: [
        "Multiligamentous knee injury pattern",
        "Vascular compromise or tense compartment (different mechanism)",
        "Inability to extend suggesting locked fragment",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Competitive athlete—stats-minded, scared about season timeline, avoids self-diagnosing 'ACL' loudly.",
      behaviorRules: [
        "Do not say 'I tore my ACL' as a definitive self-diagnosis.",
        "Describe mechanism, weight-bearing, swelling, and instability when asked.",
      ],
      doNotRevealDirectly: [
        "ACL tear",
        "anterior cruciate ligament",
        "the MRI already proves ACL",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Young athletic male using crutches; distressed about timeline.",
        details:
          "Alert, cooperative. Antalgic gait partial weight-bearing with crutches. No systemic illness appearance.",
      },
      {
        id: "knee",
        label: "Knee (injured)",
        summary: "Large effusion, warmth; Lachman positive with firm endpoint lost; guarded ROM.",
        details:
          "Moderate-large tense effusion limiting flexion to roughly 60 degrees pain-limited. Lachman demonstrates increased anterior translation compared with contralateral side. Pivot shift not completed due to pain guarding. Medial joint line palpation tender but primary pain anterior. Patella tracks without apprehension—dislocation story weak clinically on quick check.",
      },
      {
        id: "neurovascular",
        label: "Neurovascular (distal leg)",
        summary: "Warm foot with palpable pulses; sensation grossly intact.",
        details:
          "Dorsalis pedis and posterior tibial pulses palpable bilaterally. Capillary refill brisk. Light touch intact in saphenous/peroneal distributions grossly. Active ankle dorsiflexion intact though hampered by knee pain.",
      },
    ],
    testOverrides: [
      {
        testId: "knee_xray",
        result:
          "Knee radiographs: no acute fracture or tibial plateau depression identified; effusion suggested by suprapatellar density—correlate clinically.",
        yield: "high",
      },
      {
        testId: "mri_knee",
        result:
          "Knee MRI: complete disruption of ACL fibers with typical bone bruise pattern involving lateral femoral condyle and posterior lateral tibial plateau; menisci without displaced tear on this read—clinical correlation for meniscus examination.",
        yield: "high",
      },
      {
        testId: "neurovascular_exam_limbs",
        result:
          "Documented serial neurovascular exam: distal pulses palpable, sensation grossly intact, motor intact to volitional testing—continue monitoring per protocol.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Labs not central for isolated ligament diagnosis unless systemic concern.",
      imagingDefault: "MRI defines soft-tissue knee injury after radiograph fracture screen.",
      bedsideDefault: "Lachman and effusion assessment drive early suspicion before MRI.",
      procedureDefault: "Operative reconstruction planning with sports medicine orthopaedics when indicated.",
    },
    finalDxId: "acl_tear",
    requiredMustNotMiss: ["acl_tear", "meniscus_tear", "tibial_plateau_fracture"],
    dxOverrides: [
      {
        dxId: "acl_tear",
        yield: "correct",
        explanation:
          "Pivot noncontact mechanism, pop, rapid effusion, Lachman laxity, and MRI confirmatory ACL tear pattern.",
      },
      {
        dxId: "meniscus_tear",
        yield: "reasonable",
        explanation: "May coexist; locked knee not prominent—MRI read emphasizes ACL.",
      },
      {
        dxId: "medial_collateral_ligament_injury",
        yield: "reasonable",
        explanation: "Isolated MCL less consistent without valgus contact story—can accompany ACL.",
      },
      {
        dxId: "patellar_dislocation",
        yield: "low",
        explanation: "Would expect patellar instability exam and lateral patella narrative—less pivot hemarthrosis classic ACL.",
      },
      {
        dxId: "tibial_plateau_fracture",
        yield: "dangerous-miss",
        explanation: "Must radiographically exclude—films negative here but remains ED rule-out spectrum in trauma.",
      },
    ],
    diagnosisOptions: [
      {
        id: "acl_tear",
        name: "Anterior cruciate ligament (ACL) tear",
        isCorrect: true,
        isDangerous: true,
        explanation: "Clinical and MRI concordance for complete ACL rupture in pivot athlete.",
      },
      {
        id: "meniscus_tear",
        name: "Meniscus tear",
        isCorrect: false,
        isDangerous: false,
        explanation: "Often concurrent; not sole explanation for complete Lachman/MRI ACL pattern.",
      },
      {
        id: "medial_collateral_ligament_injury",
        name: "Medial collateral ligament (MCL) injury",
        isCorrect: false,
        isDangerous: false,
        explanation: "Mechanism and exam pivot toward cruciate pathology first.",
      },
      {
        id: "patellar_dislocation",
        name: "Patellar dislocation",
        isCorrect: false,
        isDangerous: false,
        explanation: "Exam and history less fitting dominant narrative.",
      },
    ],
    teachingPoints: [
      "Grading (100): noncontact mechanism 25, pop/effusion clues 25, MRI order 25, diagnosis 25.",
      "Always fracture-screen knee radiographs before MRI in acute trauma pathways.",
      "Discuss ACL rehab versus reconstruction timeline and return-to-sport criteria.",
    ],
  },

  {
    id: "ortho-femoral-neck-margaret-kitchen-fall",
    title: "My Hip Hurts After I Fell",
    specialty: ORTHO_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 11,
    description:
      "Margaret Lewis, 78, slips in her kitchen—now cannot bear weight with a shortened externally rotated leg—hip films show femoral neck fracture.",
    cardTeaser: "I can't stand up.",
    objectives: [
      "Recognize classic low-energy femoral neck fracture presentation in older adults.",
      "Order hip/pelvis imaging and perioperative risk labs when admitting for surgery.",
      "Differentiate femoral neck fracture from intertrochanteric fracture, hip dislocation, pelvic injury, and simple strain.",
    ],
    patientPersona: {
      name: "Margaret Lewis",
      age: 78,
      gender: "Female",
      chiefComplaint: "I can't stand up.",
      background:
        "Polished kitchen tile after grandson tracked rain—one careless pivot, feet slid, landed on right hip. Pain immediate—deep boring—can't put any weight on that leg without screaming. Tried crawling to phone—embarrassing hour until neighbor checked in. Head did not hit—no headache—thank goodness. Retired librarian—lives alone stubbornly. Osteoporosis on chart for years—Fosamax-era then generic breaks her tongue on the name. Uses cane sometimes bad weather—today useless. Small bruise on forearm catching herself. Denies prior hip surgery. BP runs high at PCP—today flustered.",
      vitals: {
        heartRate: 96,
        bloodPressure: "144/80",
        respiratoryRate: 18,
        oxygenSat: "99%",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "Low-energy mechanical fall with immediate hip pain",
        "Non-weight-bearing with leg shortening/external rotation deformity",
        "Osteoporosis history increases fragility fracture risk",
        "Radiograph confirms femoral neck fracture",
        "No head strike in this narrative",
      ],
      redFlags: [
        "Multiple fractures or high-energy mechanism",
        "Anticoagulation bleeding risk",
        "Delirium from pain medications or blood loss",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Proud independent elder—apologetic about 'being dramatic,' precise about fall mechanics when calmed.",
      behaviorRules: [
        "Do not say 'I broke my hip' as doctor-certain language—say can't stand severe pain.",
        "Answer weight-bearing and rotation deformity when examiner asks directly.",
      ],
      doNotRevealDirectly: [
        "femoral neck fracture",
        "I need a hip replacement tonight",
        "Garden classification",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Elderly woman on EMS stretcher; distressed with movement.",
        details:
          "Alert, anxious. Holds fractured lower extremity immobile. Skin intact except minor forearm abrasion.",
      },
      {
        id: "hip",
        label: "Hip / pelvis",
        summary: "Shortened right lower extremity with external rotation; severe pain with log-roll.",
        details:
          "Right leg appears shortened. Foot rests in external rotation. Attempted gentle internal rotation produces anguished refusal. No open wound. Pelvic compression not aggressively pursued due to focal femoral neck concern and patient distress.",
      },
      {
        id: "neurovascular",
        label: "Neurovascular (distal extremity)",
        summary: "Foot remains perfused; sensation reduced by pain but no obvious complete nerve loss documented pre-analgesia.",
        details:
          "Dorsalis pedis palpable weak compared with left but present. Light touch grossly present. Motor limited by pain—cannot cooperate with formal strength.",
      },
    ],
    testOverrides: [
      {
        testId: "hip_xray",
        result:
          "Pelvis and hip radiographs: displaced right femoral neck fracture—consider Garden classification and orthopedic operative planning/urgent consult.",
        yield: "high",
      },
      {
        testId: "ct_hip",
        result:
          "CT hip/pelvis (if obtained): confirms femoral neck cortical disruption with displacement—maps fracture geometry for operative approach when plain films sufficient.",
        yield: "helpful",
      },
      {
        testId: "cbc",
        result: "CBC: mild stress leukocytosis; hemoglobin near baseline without acute hemorrhagic shock pattern on ED draw.",
        yield: "helpful",
      },
      {
        testId: "cmp",
        result: "CMP: renal function acceptable for age—electrolytes without critical derangement on this sample.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Preoperative labs when fracture operative pathway imminent.",
      imagingDefault: "AP pelvis and lateral hip standard; CT if occult suspicion.",
      bedsideDefault: "Pain control, DVT prophylaxis planning, orthopedic admission.",
      procedureDefault: "Hemiarthroplasty versus fixation per orthopaedic strategy—case-dependent.",
    },
    finalDxId: "femoral_neck_fracture",
    requiredMustNotMiss: ["femoral_neck_fracture", "hip_dislocation"],
    dxOverrides: [
      {
        dxId: "femoral_neck_fracture",
        yield: "correct",
        explanation:
          "Classic post-fall non-weight-bearing deformity with radiographic femoral neck fracture.",
      },
      {
        dxId: "intertrochanteric_hip_fracture",
        yield: "reasonable",
        explanation: "Similar demographics—different radiographic level—films specify neck here.",
      },
      {
        dxId: "hip_dislocation",
        yield: "dangerous-miss",
        explanation: "Usually high-energy deformity—must consider image before manipulation—X-ray clarifies fracture over pure dislocation.",
      },
      {
        dxId: "pelvic_ring_injury",
        yield: "low",
        explanation: "Pelvic ring exam would differ; isolated femoral neck fracture identified.",
      },
      {
        dxId: "muscle_strain",
        yield: "low",
        explanation: "Does not explain shortening external rotation and inability to bear any weight.",
      },
    ],
    diagnosisOptions: [
      {
        id: "femoral_neck_fracture",
        name: "Femoral neck fracture",
        isCorrect: true,
        isDangerous: true,
        explanation: "Fragility pattern with mechanical fall and confirmatory imaging.",
      },
      {
        id: "intertrochanteric_hip_fracture",
        name: "Intertrochanteric hip fracture",
        isCorrect: false,
        isDangerous: true,
        explanation: "Wrong anatomic level on imaging provided—still requires surgical orthogeriatric care.",
      },
      {
        id: "hip_dislocation",
        name: "Hip dislocation",
        isCorrect: false,
        isDangerous: true,
        explanation: "Imaging shows femoral neck break rather than isolated dislocation.",
      },
      {
        id: "pelvic_ring_injury",
        name: "Pelvic ring injury",
        isCorrect: false,
        isDangerous: true,
        explanation: "Not primary finding on films—hip fracture dominates management.",
      },
    ],
    teachingPoints: [
      "Grading (100): non-weight-bearing recognition 25, deformity 25, X-ray 25, diagnosis 25.",
      "Geriatric fracture liaison and bone health workup follow admission.",
      "Fall prevention and osteoporosis treatment continuity matter postoperatively.",
    ],
  },

  {
    id: "ortho-shoulder-dislocation-brandon-basketball",
    title: "My Shoulder Came Out Of Place",
    specialty: ORTHO_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 10,
    description:
      "Brandon Carter, 23, personal trainer—landed awkwardly during pickup basketball with forced abduction external rotation—anterior shoulder dislocation on X-ray.",
    cardTeaser: "My shoulder popped out.",
    objectives: [
      "Link abduction external rotation mechanism to anterior glenohumeral dislocation.",
      "Obtain shoulder imaging and document axillary nerve neurovascular status before/after reduction.",
      "Differentiate from proximal humerus fracture, rotator cuff tear, and AC separation.",
    ],
    patientPersona: {
      name: "Brandon Carter",
      age: 23,
      gender: "Male",
      chiefComplaint: "My shoulder popped out.",
      background:
        "Diving for a loose ball—arm yanked back overhead when guy landed half on him—sickening clunk—not subtle pop like knuckle crack. Pain instant ten-out-of-ten—arm stuck away from body a little—couldn't lower it to belt line without screaming. Buddy ubered him—still in sweaty jersey ashamed. Trains clients mornings—worried reputation if he baby injured. Never dislocated before—right dominant side affected. No numbness he thinks—maybe fuzziness outer shoulder hard to tell through pain haze. Took nothing yet—hates pills—voice tight macho thing cracking.",
      vitals: {
        heartRate: 88,
        bloodPressure: "126/82",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.2°F",
      },
      keyHistoryPoints: [
        "Abduction external rotation injury during basketball",
        "Squared shoulder contour; arm held away from torso",
        "Anterior dislocation on radiograph",
        "Assess neurovascular status especially axillary nerve territory",
        "Post-reduction repeat exam and films needed in real pathway",
      ],
      redFlags: [
        "Vascular injury requiring urgent intervention",
        "Associated greater tuberosity fracture displaced",
        "Recurrent instability pattern requiring specialist discussion",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Gym culture bravado melting into pain honesty—wants reduction fast, jokes nervously.",
      behaviorRules: [
        "Do not narrate reduction technique as patient.",
        "Avoid saying 'anterior dislocation' as self-certain label before imaging discussion.",
      ],
      doNotRevealDirectly: [
        "anterior shoulder dislocation",
        "Bankart lesion",
        "I need a reduction now doctor",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Muscular young man holding injured arm supported by uninjured hand.",
        details:
          "Diaphoretic from pain. Shoulder girdle muscle spasm evident. cooperative for limited exam.",
      },
      {
        id: "shoulder",
        label: "Shoulder",
        summary: "Loss of normal deltoid roundness; acromion prominent; limited ROM.",
        details:
          "Shoulder appears squared with palpable anterior fullness suggesting humeral head anterior to glenoid. Arm held in slight abduction external rotation. Active range essentially absent. Gentle attempts at passive motion aborted due to pain.",
      },
      {
        id: "neurovascular",
        label: "Neurovascular (axillary distribution)",
        summary: "Light touch lateral shoulder somewhat decreased—document pre-reduction baseline.",
        details:
          "Radial pulse intact. Motor examination limited—wrist extension and deltoid function difficult to isolate due to pain. Reports questionable numbness over lateral shoulder patch—not complete anesthesia.",
      },
    ],
    testOverrides: [
      {
        testId: "shoulder_xray",
        result:
          "Shoulder radiographs: anterior glenohumeral dislocation without acute displaced proximal humerus fracture on these views—post-reduction films typically repeated.",
        yield: "high",
      },
      {
        testId: "neurovascular_exam_limbs",
        result:
          "Focused upper extremity neurovascular documentation: radial pulse palpable; sensory patch alteration suspicious for axillary nerve stretch—reassess after reduction and document trend.",
        yield: "high",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs not required for uncomplicated dislocation unless systemic indication.",
      imagingDefault: "X-ray before and after reduction standard clinic/ED workflow.",
      bedsideDefault: "Early reduction when appropriate lowers neurovascular stretch injury duration.",
      procedureDefault: "Closed reduction with orthopaedics or ED protocol; immobilization and follow-up MRI if instability recurrence.",
    },
    finalDxId: "anterior_shoulder_dislocation",
    requiredMustNotMiss: ["anterior_shoulder_dislocation", "proximal_humerus_fracture"],
    dxOverrides: [
      {
        dxId: "anterior_shoulder_dislocation",
        yield: "correct",
        explanation: "Mechanism, deformity, and X-ray confirmation of anterior dislocation.",
      },
      {
        dxId: "proximal_humerus_fracture",
        yield: "dangerous-miss",
        explanation: "Must exclude fracture-dislocation—here films show dislocation without fracture line described.",
      },
      {
        dxId: "rotator_cuff_tear",
        yield: "reasonable",
        explanation: "May coexist after traumatic dislocation—MRI later if weakness persists.",
      },
      {
        dxId: "acromioclavicular_separation",
        yield: "low",
        explanation: "Superior step-off AC pattern not primary—glenohumeral deformity dominates.",
      },
    ],
    diagnosisOptions: [
      {
        id: "anterior_shoulder_dislocation",
        name: "Anterior shoulder dislocation",
        isCorrect: true,
        isDangerous: true,
        explanation: "Radiographically confirmed anterior glenohumeral dislocation.",
      },
      {
        id: "proximal_humerus_fracture",
        name: "Proximal humerus fracture",
        isCorrect: false,
        isDangerous: true,
        explanation: "Imaging does not show displaced fracture as primary finding.",
      },
      {
        id: "rotator_cuff_tear",
        name: "Rotator cuff tear",
        isCorrect: false,
        isDangerous: false,
        explanation: "May be secondary—does not replace acute dislocation diagnosis.",
      },
      {
        id: "acromioclavicular_separation",
        name: "Acromioclavicular (AC) joint separation",
        isCorrect: false,
        isDangerous: false,
        explanation: "Clinical deformity and films point to glenohumeral joint.",
      },
    ],
    teachingPoints: [
      "Grading (100): mechanism 25, deformity 25, imaging 25, diagnosis 25.",
      "Axillary nerve function must be documented before and after reduction.",
      "Discuss recurrence risk and Bankart/SLAP considerations in follow-up orthopaedic care.",
    ],
  },

  {
    id: "ortho-scaphoid-tyler-foosh-wrist",
    title: "My Wrist Hurts But The X-ray Was Normal",
    specialty: ORTHO_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 13,
    description:
      "Tyler Brooks, 18, landed on an outstretched hand a week ago—snuffbox tenderness persists and initial films were read negative—MRI demonstrates scaphoid fracture.",
    cardTeaser: "My wrist still hurts.",
    objectives: [
      "Treat occult scaphoid fracture risk after FOOSH despite negative initial radiographs.",
      "Localize anatomic snuffbox tenderness and ulnar/radial deviation pain patterns.",
      "Use repeat dedicated scaphoid views and MRI/CT when exam remains suspicious.",
    ],
    patientPersona: {
      name: "Tyler Brooks",
      age: 18,
      gender: "Male",
      chiefComplaint: "My wrist still hurts.",
      background:
        "Basketball practice block went wrong—extended wrist planting—heard ugly wrist crunch not clean pop. ER night one—X-ray 'normal' scribble discharged with splint he half-wore. Snuffbox ache deep thumb side—gripping water bottle for hydration kills him—coach notices weak left passes. High school athlete—scared scholarship chatter nonsense in head—doesn't want drama weak. NSAIDs sporadically—stomach fuss cheap meals. No numbness constant—tinge sometimes when push-up position fail. Weight-bearing push-up test self-torture avoided. No prior wrist fracture.",
      vitals: {
        heartRate: 76,
        bloodPressure: "118/74",
        respiratoryRate: 14,
        oxygenSat: "99%",
        temperature: "98.0°F",
      },
      keyHistoryPoints: [
        "FOOSH mechanism with focal radial wrist pain",
        "Snuffbox tenderness persisting after negative initial films",
        "Painful grip and axial loading",
        "MRI confirms scaphoid fracture—proximal pole perfusion risk teaching point",
      ],
      redFlags: [
        "Proximal pole AVN risk if untreated",
        "Missed fracture leading to nonunion",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Teen athlete minimizing pain to coach—more honest with doctor if respected.",
      behaviorRules: [
        "Do not say 'scaphoid fracture' as locked fact before advanced imaging context.",
        "Describe FOOSH, snuffbox pain, grip limits, prior X-ray report when asked.",
      ],
      doNotRevealDirectly: [
        "scaphoid fracture",
        "avascular necrosis",
        "you need surgery for sure",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Well-appearing teenager with guarded left wrist.",
        details:
          "No systemic signs. Holds wrist slightly flexed protective. Cooperative for directed exam with wincing.",
      },
      {
        id: "wrist",
        label: "Wrist / hand",
        summary: "Snuffbox tenderness; pain with axial loading of thumb metacarpal.",
        details:
          "Focal tenderness in anatomic snuffbox deep to tendons. Pain reproduced with resisted thumb axial load (scaphoid stress maneuver). Wrist extension end-range tender. Swelling mild compared with acute night.",
      },
      {
        id: "neurovascular",
        label: "Neurovascular",
        summary: "Median nerve symptoms not pronounced; radial artery palpable.",
        details:
          "Light touch radial three digits intact grossly. Capillary refill brisk. No acute carpal tunnel crisis on snapshot exam.",
      },
    ],
    testOverrides: [
      {
        testId: "wrist_xray_scaphoid",
        result:
          "Repeat wrist radiographs with scaphoid-focused views: subtle cortical irregularity at scaphoid waist—may remain easy to miss—advanced imaging recommended when exam highly suspicious.",
        yield: "helpful",
      },
      {
        testId: "mri_wrist",
        result:
          "MRI wrist: acute scaphoid waist fracture line with marrow edema—assess displacement and vascular risk patterns with orthopaedic hand service.",
        yield: "high",
      },
      {
        testId: "ct_wrist",
        result:
          "CT wrist (if performed): cortical discontinuity along scaphoid waist correlating with MRI findings—helps surgical planning if displaced.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Labs not indicated for isolated wrist trauma absent systemic concern.",
      imagingDefault: "MRI sensitive for occult scaphoid injury when X-rays negative but exam convincing.",
      bedsideDefault: "Thumb spica immobilization while awaiting definitive classification.",
      procedureDefault: "Operative fixation versus prolonged casting per orthopaedic hand algorithm.",
    },
    finalDxId: "scaphoid_fracture",
    requiredMustNotMiss: ["scaphoid_fracture", "distal_radius_fracture"],
    dxOverrides: [
      {
        dxId: "scaphoid_fracture",
        yield: "correct",
        explanation:
          "FOOSH with snuffbox tenderness and MRI confirmation despite initial X-ray false reassurance.",
      },
      {
        dxId: "wrist_sprain",
        yield: "reasonable",
        explanation: "Early consideration until advanced imaging resolves persistent focal snuffbox findings.",
      },
      {
        dxId: "distal_radius_fracture",
        yield: "dangerous-miss",
        explanation: "Also FOOSH—must explicitly evaluate—MRI clarifies scaphoid pathology dominant.",
      },
      {
        dxId: "wrist_tendinitis",
        yield: "low",
        explanation: "Less consistent with focal snuffbox bony tenderness post acute trauma.",
      },
    ],
    diagnosisOptions: [
      {
        id: "scaphoid_fracture",
        name: "Scaphoid fracture",
        isCorrect: true,
        isDangerous: true,
        explanation: "MRI-confirmed fracture in snuffbox-positive post-FOOSH athlete.",
      },
      {
        id: "wrist_sprain",
        name: "Wrist sprain",
        isCorrect: false,
        isDangerous: false,
        explanation: "Fails to explain MRI cortical break and snuffbox persistence.",
      },
      {
        id: "distal_radius_fracture",
        name: "Distal radius fracture",
        isCorrect: false,
        isDangerous: true,
        explanation: "Should remain differential before MRI—imaging here targets scaphoid.",
      },
      {
        id: "wrist_tendinitis",
        name: "Wrist tendinitis (overuse)",
        isCorrect: false,
        isDangerous: false,
        explanation: "Mechanism and exam findings argue against isolated tendinopathy.",
      },
    ],
    teachingPoints: [
      "Grading (100): FOOSH mechanism 25, snuffbox tenderness 30, advanced imaging 20, diagnosis 25.",
      "Immobilize and protect vascular watershed of scaphoid when suspicious—even with negative early films.",
      "Discuss nonunion prevention and sport RTP only after orthopaedic clearance.",
    ],
  },

  {
    id: "ortho-compartment-david-construction-crush",
    title: "My Leg Pain Won't Go Away",
    specialty: ORTHO_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 14,
    description:
      "David Russo, 31, construction worker with prior crush injury hours ago—pain escalating out of proportion, tense calf/anterior compartment, paresthesias, elevated compartment pressures and CK.",
    cardTeaser: "My leg pain keeps getting worse.",
    objectives: [
      "Identify compartment syndrome as surgical emergency from ischemic compartment physiology.",
      "Elicit pain worsening with passive stretch and neurologic compromise clues.",
      "Measure compartment pressures plus CK; distinguish DVT, cellulitis, isolated fracture, and strain.",
    ],
    patientPersona: {
      name: "David Russo",
      age: 31,
      gender: "Male",
      chiefComplaint: "My leg pain keeps getting worse.",
      background:
        "Job-site rebar stack tipped—pinned left shin against trench wall couple seconds felt longer—bruise huge denim ripped. Supervisor iced it—tough-guy laugh then home shower. Pain climbed anyway—four hours in recliner pretending baseball helped—can't stand toe-down stretch roommate says I'm whining. Shin feels tight like sausage casing—numb patches outer foot weird. Vicodin from old dental useless—scared swallow more. Walked limping earlier—now scared to move. No chest pain—no fever vibe—just leg nightmare escalating faster than injury story feels fair. Boots steel-toe crushed maybe—details fuzzy adrenaline. Construction five years—first 'bad' injury embarrassed admitting.",
      vitals: {
        heartRate: 112,
        bloodPressure: "132/78",
        respiratoryRate: 20,
        oxygenSat: "99%",
        temperature: "98.7°F",
      },
      keyHistoryPoints: [
        "Crush mechanism with progressive pain despite initial calm",
        "Pain out of proportion and worsened with passive toe/ankle stretch",
        "Tense compartment and sensory change",
        "Elevated compartment pressures with elevated CK",
        "Emergent fasciotomy pathway teaching emphasis",
      ],
      redFlags: [
        "Rhabdomyolysis renal injury",
        "Missed compartment leading to irreversible muscle loss",
        "Underlying arterial injury",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Blue-collar worker deferential to 'not bother ER' culture until fear breaks through.",
      behaviorRules: [
        "Do not demand fasciotomy by name—describe unbearable worsening tightness.",
        "Differentiate neuropathic numbness versus 'whole leg asleep' carefully when asked.",
      ],
      doNotRevealDirectly: [
        "compartment syndrome",
        "fasciotomy",
        "I'm going to lose my leg aren't I",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Uncomfortable diaphoretic man with severe pain out of proportion to skin findings.",
        details:
          "Tachycardic. Diaphoretic. Guarding lower leg. Appears exhausted from pain.",
      },
      {
        id: "leg",
        label: "Lower leg (anterior/lateral compartments)",
        summary: "Tense shiny swelling; pain severe with passive toe flexion/extension stretch.",
        details:
          "Left anterior compartment palpably tight compared with contralateral leg. Pain intensifies with passive stretch of superficial posterior compartment via ankle dorsiflexion/toe extension maneuvers. Brisk capillary refill at toes but sensory findings concerning.",
      },
      {
        id: "neurovascular",
        label: "Neurovascular",
        summary: "Reduced light touch first web space; dorsalis pedis palpable but exam limited by pain.",
        details:
          "Hypoesthesia in deep peroneal distribution patch reported—not full foot numb—worsening since arrival.",
      },
    ],
    testOverrides: [
      {
        testId: "compartment_pressure_measurement",
        result:
          "Intracompartmental pressures markedly elevated with delta-pressure concerning for acute compartment syndrome—clinical correlation for emergent surgical decompression.",
        yield: "high",
      },
      {
        testId: "xray_extremity",
        result:
          "Tibia/fibula radiographs: proximal tibial shaft fracture fragmentation present—explains insult but compartment syndrome remains clinical-laboratory-pressure emergency.",
        yield: "helpful",
      },
      {
        testId: "ck",
        result:
          "Serum creatine kinase significantly elevated—consistent with muscle injury/rhabdomyolysis risk; monitor renal function and urine output.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "CBC: leukocytosis mild—stress/injury pattern.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "CK and renal panel trends with pigmenturia screening important in crush.",
      imagingDefault: "Radiographs identify fracture but do not exclude compartment syndrome.",
      bedsideDefault: "Compartment exam and bedside pressure measurement when equivocal—do not delay clinical syndrome.",
      procedureDefault: "Emergent fasciotomy when clinical diagnosis met or sustained pressure elevation—orthopaedic emergent operative.",
    },
    finalDxId: "compartment_syndrome",
    requiredMustNotMiss: ["compartment_syndrome", "deep_vein_thrombosis"],
    dxOverrides: [
      {
        dxId: "compartment_syndrome",
        yield: "correct",
        explanation:
          "Crush plus escalating pain passive-stretch pain tense compartment neuro deficits elevated pressures and CK—traumatic compartment syndrome.",
      },
      {
        dxId: "deep_vein_thrombosis",
        yield: "dangerous-miss",
        explanation: "Leg pain differential—here acute traumatic timeline and exam better fit compartment.",
      },
      {
        dxId: "cellulitis",
        yield: "low",
        explanation: "Skin warmth erythema trail infection—not dominant versus tense trauma compartment.",
      },
      {
        dxId: "isolated_tibia_fracture",
        yield: "reasonable",
        explanation: "Fracture coexists but compartment physiology is the emergency overlay.",
      },
      {
        dxId: "muscle_strain",
        yield: "low",
        explanation: "Pain severity and exam findings exceed strain without complication.",
      },
    ],
    diagnosisOptions: [
      {
        id: "compartment_syndrome",
        name: "Acute compartment syndrome",
        isCorrect: true,
        isDangerous: true,
        explanation: "Clinical and pressure criteria for emergent fasciotomy pathway.",
      },
      {
        id: "deep_vein_thrombosis",
        name: "Deep vein thrombosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less consistent with acute compressive injury exam and pressure readings.",
      },
      {
        id: "cellulitis",
        name: "Cellulitis",
        isCorrect: false,
        isDangerous: false,
        explanation: "Lacks primary infectious skin findings.",
      },
      {
        id: "isolated_tibia_fracture",
        name: "Isolated tibia fracture (without compartment syndrome)",
        isCorrect: false,
        isDangerous: true,
        explanation: "Fracture present but does not supersede compartment emergency features.",
      },
    ],
    teachingPoints: [
      "Grading (100): surgical emergency recognition 35, pain out of proportion 25, compartment evaluation 15, diagnosis 25. Bonus: fasciotomy urgency +10.",
      "Do not anchor solely on normal pulses—perfusion can lag fascial ischemia.",
      "Coordinate immediate orthopaedic evaluation and monitor renal injury labs.",
    ],
  },
];
