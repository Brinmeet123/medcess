import type { Scenario } from "@/data/scenarios"

const PSYCH_SPECIALTY = "Psychiatry" as const

export const psychiatryScenarios: Scenario[] = [
  {
    id: "psych-mdd-not-felt-myself",
    title: "I Haven't Felt Like Myself",
    specialty: PSYCH_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    description:
      "Emily Carter, a 22-year-old college student, is seen in outpatient psychiatry for two months of persistent low mood, lost interest, poor sleep, fatigue, guilt, and slipping grades. PHQ-9 is elevated; screening labs are normal.",
    cardTeaser: "I've just felt different lately.",
    objectives: [
      "Elicit SIGECAPS symptoms and functional impact in a college student.",
      "Screen for suicidal ideation with direct, respectful questions.",
      "Use PHQ-9 and basic labs to rule out medical mimics and support severity.",
    ],
    patientPersona: {
      name: "Emily Carter",
      age: 22,
      gender: "Female",
      chiefComplaint: "I've just felt different lately.",
      background:
        "Junior year has become a grind she cannot bounce back from. For about two months she has felt sad or empty most days, stopped caring about clubs and painting, sleeps poorly and wakes early, lives on coffee but still drags through class. Appetite is down and she lost a little weight without trying. Concentration is shot—she stares at lectures and readings. She feels like she disappoints everyone and replays mistakes. She denies ever feeling manic, wired for days without sleep, or doing reckless things. No drugs; wine rarely at parties. When the conversation gets gentle, she admits sometimes wishing she would not wake up, but says she would not do anything and has no plan—still, it terrifies her to say aloud.",
      vitals: {
        heartRate: 72,
        bloodPressure: "108/68",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.2°F",
      },
      keyHistoryPoints: [
        "~2 months of depressed mood and anhedonia",
        "Poor sleep, fatigue, reduced appetite, impaired concentration",
        "Guilt, low motivation, declining grades",
        "PHQ-9 elevated; CBC, TSH, CMP unremarkable",
        "Passive suicidal ideation without plan—needs explicit safety assessment",
        "No history of mania or hypomania",
      ],
      redFlags: [
        "Any active suicidal intent, plan, or means access",
        "Psychosis or severe agitation",
        "Bipolar spectrum if history of mania",
        "Medical causes if focal neuro signs or severe weight loss",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Emily is tired, a little ashamed, and slow to open up. She softens when the clinician is kind. She minimizes at first, then admits more if asked clearly.",
      behaviorRules: [
        "Answer only as Emily. Do not give medical advice or speak as a doctor.",
        "Do not name psychiatric diagnoses or say 'you have major depression.'",
        "If asked about suicide, acknowledge passive thoughts without plan if the question is direct and supportive.",
        "Reveal grades, guilt, sleep, appetite, and hobbies when asked in plain language.",
      ],
      doNotRevealDirectly: [
        "major depressive disorder",
        "clinical depression diagnosis",
        "you need to be hospitalized",
        "just snap out of it",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Fatigued young woman in no acute cardiorespiratory distress.",
        details:
          "Well-nourished appearance but looks tired. Normal gait. No tremor. Heart and lung exam unremarkable at rest.",
      },
    ],
    mentalStatusExam: [
      {
        id: "mse-appearance",
        label: "Appearance & behavior",
        summary: "Appears tired; limited eye contact.",
        details:
          "Sits quietly, shoulders slumped. Poor eye contact early in interview, improves slightly when rapport builds. Cooperative once comfortable; psychomotor slowing none dramatic.",
      },
      {
        id: "mse-mood-affect",
        label: "Mood & affect",
        summary: "Mood depressed; affect constricted.",
        details:
          "Subjectively describes feeling down, empty, and guilty. Affect is constricted and tearful at times; range blunted but appropriate to content.",
      },
      {
        id: "mse-speech-thought",
        label: "Speech & thought",
        summary: "Soft speech; logical linear thought process; no psychosis.",
        details:
          "Speech is soft but fluent. Thought process logical and goal-directed. No overt delusions, ideas of reference, or hallucinations reported.",
      },
      {
        id: "mse-insight-judgment",
        label: "Insight, judgment, orientation",
        summary: "Oriented; fair insight; judgment fair with passive SI disclosure when asked.",
        details:
          "Alert and oriented x3. Partial insight—she links symptoms to 'being off' but doubts whether help will work. Judgment fair; denies intent or plan; agrees to safety planning when discussed.",
      },
    ],
    testOverrides: [
      {
        testId: "phq9",
        result: "PHQ-9 score elevated—consistent with moderate to severe depressive symptoms.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "Within normal limits; no anemia pattern on this screen.",
        yield: "helpful",
      },
      {
        testId: "tsh",
        result: "TSH within normal limits.",
        yield: "helpful",
      },
      {
        testId: "cmp",
        result: "Within normal limits; electrolytes and kidney/liver panel unremarkable.",
        yield: "low",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs unremarkable; no medical explanation found on screening.",
      imagingDefault: "Not indicated without focal neurologic findings.",
      bedsideDefault: "Questionnaires quantify burden but do not replace interview.",
      procedureDefault: "Outpatient safety planning and follow-up unless acute risk emerges.",
    },
    finalDxId: "depression",
    requiredMustNotMiss: ["depression", "hypothyroidism", "bipolar_disorder"],
    dxOverrides: [
      {
        dxId: "depression",
        yield: "correct",
        explanation:
          "Persistent depressed mood, anhedonia, neurovegetative symptoms, and guilt for ~2 months with functional decline, elevated PHQ-9, and normal screening labs support major depressive disorder.",
      },
      {
        dxId: "hypothyroidism",
        yield: "dangerous-miss",
        explanation: "Important medical mimic; normal TSH makes primary hypothyroidism unlikely here.",
      },
      {
        dxId: "adjustment_disorder",
        yield: "reasonable",
        explanation: "Stress can contribute, but severity, pervasiveness, and two-month course favor MDD.",
      },
      {
        dxId: "anxiety",
        yield: "reasonable",
        explanation: "Anxiety may coexist; core syndrome is depressed mood, lost pleasure, and energy collapse.",
      },
      {
        dxId: "bipolar_disorder",
        yield: "dangerous-miss",
        explanation: "Must screen for mania/hypomania before antidepressant monotherapy decisions.",
      },
    ],
    diagnosisOptions: [
      {
        id: "depression",
        name: "Major depressive disorder",
        isCorrect: true,
        isDangerous: true,
        explanation: "Fits SIGECAPS pattern with impairment and elevated PHQ-9; labs do not suggest a medical mimic.",
      },
      {
        id: "adjustment_disorder",
        name: "Adjustment disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Often tied tightly to a stressor within three months with less pervasive episode; her picture is broader.",
      },
      {
        id: "hypothyroidism",
        name: "Hypothyroidism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Can mimic depression; ruled out on screening labs in this case.",
      },
      {
        id: "anxiety",
        name: "Anxiety disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "May be comorbid, but does not explain the dominant anhedonia and neurovegetative pattern.",
      },
    ],
    teachingPoints: [
      "Grading guide (100): SIGECAPS symptoms 35, suicidal thoughts screen 25, functional impact 15, diagnosis 25. Bonus: structured suicide assessment +10. Deduction: misses safety concerns −25.",
      "Normalize the PHQ-9—it is a severity yardstick, not the whole diagnosis.",
      "Always ask directly about suicidal thoughts, intent, plan, and access to means.",
      "Screen for past mania when considering medications that could precipitate mania.",
      "College stress is common; pervasive anhedonia and neurovegetative change still warrant a mood disorder evaluation.",
    ],
  },

  {
    id: "psych-bipolar-manic-no-sleep",
    title: "I Haven't Slept In Days",
    specialty: PSYCH_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 16,
    description:
      "Brandon Ellis, a 29-year-old startup founder, presents to emergency psychiatry with five days of almost no sleep, euphoric mood, grandiosity, excessive spending, and family concern. Vitals show mild tachycardia; drug screen is negative.",
    cardTeaser: "I feel amazing. I don't need sleep.",
    objectives: [
      "Recognize manic syndrome features (DIGFAST) and risky behaviors.",
      "Rule out substances and medical contributors with targeted labs and tox.",
      "Plan for safety and acute stabilization given impaired insight.",
    ],
    patientPersona: {
      name: "Brandon Ellis",
      age: 29,
      gender: "Male",
      chiefComplaint: "I feel amazing. I don't need sleep.",
      background:
        "For roughly five days he has barely slept but feels charged—'like I plugged into a wall.' He talks fast, jumps ideas, and says his startup will triple overnight. He dropped thousands on gear and ads without running it by his cofounder. Sex drive is way up and he posts late-night ideas he regrets only a little. He is irritated when challenged and insists he is finally seeing clearly. Family brought him after he tried to drive long distance on no rest. He denies alcohol or illicit drugs; no new prescriptions he will admit, coffee all day. He has never been treated for mania before but had a bad crash winter after funding stress—he called it burnout, slept all week, not sure if that counts.",
      vitals: {
        heartRate: 102,
        bloodPressure: "128/84",
        respiratoryRate: 18,
        oxygenSat: "98%",
        temperature: "98.6°F",
      },
      keyHistoryPoints: [
        "~5 days minimal sleep without feeling tired",
        "Euphoria, grandiosity, spending, distractibility, pressured speech",
        "Family concern; possible impaired judgment",
        "Urine toxicology negative; CMP/CBC/TSH not suggestive of acute medical crisis",
        "Limited insight into risk; may minimize consequences",
      ],
      redFlags: [
        "Serious financial or sexual risk-taking",
        "Psychomotor exhaustion or delirium if sleep deprivation worsens",
        "Agitation requiring security measures",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Brandon is euphoric, fast-talking, and a little irritable when doubted. Sounds convinced, brushes off danger. Can be charming.",
      behaviorRules: [
        "Answer only as Brandon.",
        "Do not diagnose aloud or say 'you are manic'—describe experience in his words.",
        "Admit spending, energy, and sleep when asked directly; may minimize risk at first.",
        "If asked about substances, deny use credibly in this vignette.",
      ],
      doNotRevealDirectly: [
        "bipolar I disorder",
        "manic episode diagnosis",
        "you must take mood stabilizers",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Alert, energetic, mildly restless; no acute distress from vitals.",
        details:
          "Appears vigorous, slightly sweaty. No nystagmus. Moves quickly in chair. No focal weakness.",
      },
      {
        id: "cardiac",
        label: "Cardiovascular",
        summary: "Mild tachycardia; regular rhythm; no murmur appreciated.",
        details:
          "Heart rate elevated consistent with arousal and caffeine. Blood pressure not hypertensive. No edema.",
      },
    ],
    mentalStatusExam: [
      {
        id: "mse-speech-thought",
        label: "Speech & thought process",
        summary: "Pressured speech; flight of ideas.",
        details:
          "Rapid, loud speech with frequent topic shifts. Line of thought can be followed briefly then leaps; clang associations occasionally.",
      },
      {
        id: "mse-mood-affect",
        label: "Mood & affect",
        summary: "Euphoric mood; expansive irritable affect.",
        details:
          "Subjectively 'on top of the world' but snaps if contradicted. Affect bright and reactive, expansive.",
      },
      {
        id: "mse-perception",
        label: "Perception & thought content",
        summary: "No clear hallucinations; grandiose ideas without fixed system.",
        details:
          "No auditory hallucinations endorsed. Thought content dominated by grandiosity and pressure of speech; no organized persecutory delusion, but sensitivity to perceived slights.",
      },
      {
        id: "mse-insight-judgment",
        label: "Insight & judgment",
        summary: "Limited insight; judgment impaired by impulsivity.",
        details:
          "Does not see need for help; minimizes sleep loss and spending risk. Oriented but over-inclusive answers.",
      },
    ],
    testOverrides: [
      {
        testId: "urine_drug_screen",
        result: "Immunoassay panel negative for common substances of abuse on this sample.",
        yield: "high",
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low",
      },
      {
        testId: "cmp",
        result: "Within normal limits; electrolytes and glucose unremarkable.",
        yield: "low",
      },
      {
        testId: "tsh",
        result: "TSH within normal limits.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "No acute metabolic explanation for presentation.",
      imagingDefault: "Brain imaging not indicated without focal neuro signs.",
      bedsideDefault: "Collateral and observation often as important as single labs.",
      procedureDefault: "Acute stabilization per psychiatry emergency standards; safety for impulsivity.",
    },
    finalDxId: "bipolar_i_manic_episode",
    requiredMustNotMiss: [
      "bipolar_i_manic_episode",
      "substance_induced_mania",
      "hyperthyroidism",
    ],
    dxOverrides: [
      {
        dxId: "bipolar_i_manic_episode",
        yield: "correct",
        explanation:
          "Clear manic syndrome with decreased sleep need, euphoria, grandiosity, spending, distractibility, and pressured speech lasting days; negative tox and normal thyroid screen support primary bipolar I manic episode.",
      },
      {
        dxId: "substance_induced_mania",
        yield: "dangerous-miss",
        explanation: "Must exclude substances; negative screen supports but history can be incomplete early.",
      },
      {
        dxId: "hyperthyroidism",
        yield: "dangerous-miss",
        explanation: "Medical hyperarousal mimic; TSH normal here.",
      },
      {
        dxId: "attention_deficit_hyperactivity_disorder",
        yield: "reasonable",
        explanation: "Chronic inattention differs from episodic mania with mood elevation and grandiosity.",
      },
      {
        dxId: "schizoaffective_disorder",
        yield: "reasonable",
        explanation: "Would need more prominent mood-incongruent psychosis across illness course.",
      },
    ],
    diagnosisOptions: [
      {
        id: "bipolar_i_manic_episode",
        name: "Bipolar I disorder, manic episode",
        isCorrect: true,
        isDangerous: true,
        explanation: "Episodic mania pattern with characteristic symptoms and functional risk.",
      },
      {
        id: "substance_induced_mania",
        name: "Substance-induced mania-like episode",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely with negative screening and story, but must stay in clinical differential early.",
      },
      {
        id: "hyperthyroidism",
        name: "Hyperthyroidism",
        isCorrect: false,
        isDangerous: true,
        explanation: "Tachycardia overlaps; thyroid testing not supportive here.",
      },
      {
        id: "attention_deficit_hyperactivity_disorder",
        name: "ADHD",
        isCorrect: false,
        isDangerous: false,
        explanation: "Does not explain sustained euphoric mania with decreased sleep need.",
      },
    ],
    teachingPoints: [
      "Grading guide (100): DIGFAST symptoms 35, risky behaviors 20, rules out substances 20, diagnosis 25.",
      "Collateral history clarifies spending, sleeplessness, and behavior change when insight is poor.",
      "Negative tox does not replace a thoughtful substance timeline and medication review.",
      "Mania can endanger finances, relationships, and physical health from exhaustion.",
    ],
  },

  {
    id: "psych-schizophrenia-watching",
    title: "I Think Everyone Is Watching Me",
    specialty: PSYCH_SPECIALTY,
    difficulty: "Advanced",
    estimatedMinutes: 17,
    description:
      "Marcus Hill, a 24-year-old recently unemployed man, reports months of paranoia, hearing voices, withdrawal, and declining self-care. Exam suggests formal thought disturbance and negative symptoms. Screening labs are unremarkable.",
    cardTeaser: "I think people are following me.",
    objectives: [
      "Assess psychosis: hallucinations, delusions, disorganization, negative symptoms.",
      "Establish chronicity and functional decline; evaluate safety.",
      "Consider substances and medical mimics with targeted screening.",
    ],
    patientPersona: {
      name: "Marcus Hill",
      age: 24,
      gender: "Male",
      chiefComplaint: "I think people are following me.",
      background:
        "For maybe eight months it has been harder to leave the apartment—he feels watched on the bus and at interviews. Neighbors 'know things' about him. He hears a male voice commenting when he is alone, sometimes telling him he messed up; he is vague whether it speaks to others. Sleep is broken; he forgets showers and skipped bills. He quit a warehouse job after arguing with a supervisor he thought was recording him. He smokes weed sometimes to mellow out—not daily, last time unclear. No prescribed psych meds. Past medical history unremarkable. He bristles if you sound like you do not believe him, then goes quiet.",
      vitals: {
        heartRate: 76,
        bloodPressure: "118/76",
        respiratoryRate: 16,
        oxygenSat: "98%",
        temperature: "98.4°F",
      },
      keyHistoryPoints: [
        "Chronic paranoid ideas and possible auditory hallucinations",
        "Social withdrawal, hygiene decline, job loss",
        "~8 months of worsening functioning",
        "Labs unremarkable on basic screen",
        "Cannabis use intermittent—must weigh intoxication versus primary psychosis",
      ],
      redFlags: [
        "Command hallucinations to harm self or others",
        "Severe agitation or inability to care for basic needs",
        "New focal neurologic deficits",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Marcus is guarded, flat at times, slow to answer. He may trail off or contradict slightly when anxious.",
      behaviorRules: [
        "Answer only as Marcus.",
        "Do not label schizophrenia or psychosis as a diagnosis to the doctor.",
        "Describe fears and voices when asked patiently; may hedge details early.",
      ],
      doNotRevealDirectly: [
        "schizophrenia",
        "you are psychotic",
        "this is a classic case of",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Thin, unkempt; cooperative with effort.",
        details:
          "Poor grooming and casual clothing. No acute illness appearance. Moves slowly at times.",
      },
      {
        id: "neuro",
        label: "Neurologic",
        summary: "No focal deficits on brief screen.",
        details:
          "Pupils equal Round reactive. Face symmetric. Strength full. Gait normal when walks in room. No clear asterixis.",
      },
    ],
    mentalStatusExam: [
      {
        id: "mse-psychosis",
        label: "Perception",
        summary: "Auditory hallucinations reported.",
        details:
          "Endorses hearing a voice commenting on his actions, sometimes negative. Not forthcoming about full content initially; denies visual hallucinations today.",
      },
      {
        id: "mse-thought",
        label: "Thought process & content",
        summary: "Thought blocking; paranoid content.",
        details:
          "Long pauses mid-sentence with need for re-prompting. Thought content includes persecutory ideas about surveillance and neighbors knowing private details.",
      },
      {
        id: "mse-affect-cognition",
        label: "Mood, affect, cognition",
        summary: "Mood 'tense'; flat affect; oriented.",
        details:
          "Mood described as worried underneath. Affect blunted, detached. Oriented to person, place, time; digit span and serial 7s somewhat effortful.",
      },
      {
        id: "mse-insight-judgment",
        label: "Insight & judgment",
        summary: "Poor insight; limited help-seeking.",
        details:
          "Does not see beliefs as illness; hesitant to consider medications. Judgment impaired by paranoia and avoidance.",
      },
    ],
    testOverrides: [
      {
        testId: "urine_drug_screen",
        result: "Panel negative on this sample; cannot exclude very recent use by timing alone.",
        yield: "helpful",
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low",
      },
      {
        testId: "cmp",
        result: "Within normal limits.",
        yield: "low",
      },
      {
        testId: "mri_brain",
        result:
          "Not first-line without focal neurologic signs in this primary psychiatric presentation; would be reserved for atypical features or neurologic findings.",
        yield: "low",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs unremarkable.",
      imagingDefault: "MRI reserved for red flags, not routine first step here.",
      bedsideDefault: "Observation, collateral, and longitudinal course weigh heavily.",
      procedureDefault: "Integrated care planning; safety if agitation worsens.",
    },
    finalDxId: "schizophrenia",
    requiredMustNotMiss: ["schizophrenia", "substance_induced_psychosis", "bipolar_disorder"],
    dxOverrides: [
      {
        dxId: "schizophrenia",
        yield: "correct",
        explanation:
          "Chronic psychotic symptoms with hallucinations, persecutory beliefs, negative symptoms, and marked functional decline for months, with screening labs not explaining illness, fits schizophrenia spectrum presentation.",
      },
      {
        dxId: "substance_induced_psychosis",
        yield: "dangerous-miss",
        explanation: "Must clarify substance timing; intermittent cannabis can confuse the picture.",
      },
      {
        dxId: "bipolar_disorder",
        yield: "dangerous-miss",
        explanation: "Primary mood episodes with psychosis require careful timeline.",
      },
      {
        dxId: "delusional_disorder",
        yield: "reasonable",
        explanation: "Usually more circumscribed; prominent voices and global decline less typical.",
      },
      {
        dxId: "schizoaffective_disorder",
        yield: "reasonable",
        explanation: "Needs documented major mood episode overlap with psychosis across course.",
      },
    ],
    diagnosisOptions: [
      {
        id: "schizophrenia",
        name: "Schizophrenia",
        isCorrect: true,
        isDangerous: true,
        explanation: "Chronic psychosis with decline and typical exam features.",
      },
      {
        id: "substance_induced_psychosis",
        name: "Substance-induced psychosis",
        isCorrect: false,
        isDangerous: true,
        explanation: "Must remain in differential when substances are possible.",
      },
      {
        id: "bipolar_disorder",
        name: "Bipolar disorder with psychotic features",
        isCorrect: false,
        isDangerous: true,
        explanation: "Less likely without clear mood episodes anchoring psychosis.",
      },
      {
        id: "delusional_disorder",
        name: "Delusional disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Delusions tend to be encapsulated with better functioning outside the belief.",
      },
    ],
    teachingPoints: [
      "Grading guide (100): identifies psychosis 30, hallucination characterization 20, functioning decline 25, diagnosis 25.",
      "Ask what voices say, how often, and whether commands appear—safety-critical.",
      "Negative symptoms and functional slide help separate chronic schizophrenia from brief substance psychosis.",
      "Cannabis use requires a careful timeline; do not dismiss primary illness solely because tox is negative once.",
    ],
  },

  {
    id: "psych-ocd-hand-washing",
    title: "I Can't Stop Washing My Hands",
    specialty: PSYCH_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 14,
    description:
      "Sophia Nguyen, an 18-year-old high school senior, describes over a year of contamination fears with excessive handwashing that derails mornings and schoolwork. She has insight that it is excessive. Y-BOCS and brief questionnaires show elevated severity.",
    cardTeaser: "I know it's weird but I can't stop.",
    objectives: [
      "Separate obsessions from compulsions and quantify time and distress.",
      "Assess insight, impairment at school, and differential for anxiety versus psychosis.",
      "Use a validated OCD severity scale to support treatment planning.",
    ],
    patientPersona: {
      name: "Sophia Nguyen",
      age: 18,
      gender: "Female",
      chiefComplaint: "I know it's weird but I can't stop.",
      background:
        "Since junior year the 'dirty' feeling sticks after touching desks, handrails, even her phone. She washes until her knuckles crack—sometimes 30 minutes before she can start homework. If she tries to skip a wash, her chest clamps and she pictures getting sick or getting someone sick. She hides it from most friends and lies that she is 'just skincare obsessed.' Grades slipped from late assignments. She has never heard voices and does not think people are spying. No formal psych treatment; melatonin sometimes for sleep. Parents think she is just anxious about college apps.",
      vitals: {
        heartRate: 84,
        bloodPressure: "112/70",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.3°F",
      },
      keyHistoryPoints: [
        ">1 year contamination obsessions with washing compulsions",
        "Marked distress if rituals blocked",
        "School impairment; insight that behavior is excessive",
        "Elevated Y-BOCS; questionnaires show anxiety symptom burden",
        "No psychosis on review",
      ],
      redFlags: [
        "Severe dehydration skin breakdown or infection",
        "Emerging hopelessness—screen mood and safety",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Sophia is articulate, embarrassed, and anxious. She laughs nervously when discussing rituals.",
      behaviorRules: [
        "Answer only as Sophia.",
        "Never say 'you have OCD' as a diagnosis—describe the thoughts and rituals.",
        "Show insight when asked whether it makes sense.",
      ],
      doNotRevealDirectly: [
        "obsessive compulsive disorder",
        "OCD diagnosis",
        "you need ERP today",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Anxious but cooperative teen; mild tremor none.",
        details: "No acute distress. Appears well hydrated. Normal HEENT and cardiopulmonary quick screen.",
      },
      {
        id: "skin-hands",
        label: "Skin (hands)",
        summary: "Hands erythematous with excoriation at knuckles.",
        details:
          "Repeated washing changes with xerosis and mild fissures at dorsal knuckles. No active purulent infection.",
      },
    ],
    mentalStatusExam: [
      {
        id: "mse-mood-anxiety",
        label: "Mood & anxiety",
        summary: "Anxious mood; worried affect.",
        details:
          "Describes dread when resisting rituals. Affect anxious but congruent; reactive mood when topic shifts away from contamination.",
      },
      {
        id: "mse-thought-insight",
        label: "Thought process & insight",
        summary: "Organized thought; good insight into excessiveness.",
        details:
          "Linear thought process without loose associations. Knows washing is 'over the top' but feels unable to stop—not a delusional conviction of external contamination magic.",
      },
      {
        id: "mse-perception",
        label: "Perception",
        summary: "No hallucinations.",
        details: "Denies hearing voices or seeing things. Intrusions are experienced as her own scary thoughts.",
      },
      {
        id: "mse-judgment",
        label: "Judgment & orientation",
        summary: "Full orientation; judgment intact for safety.",
        details: "Oriented x3. Not acutely suicidal; judgment fair though function impaired by rituals.",
      },
    ],
    testOverrides: [
      {
        testId: "yale_brown_ocs",
        result: "Y-BOCS total score elevated—consistent with clinically severe obsessive-compulsive symptoms.",
        yield: "high",
      },
      {
        testId: "psych_symptom_questionnaires",
        result:
          "Packet shows elevated anxiety-related scores with distress tied to contamination fears and avoidance.",
        yield: "helpful",
      },
      {
        testId: "cbc",
        result: "Within normal limits.",
        yield: "low",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs not required unless comorbid clues.",
      imagingDefault: "Not indicated.",
      bedsideDefault: "Severity scales document baseline for therapy.",
      procedureDefault: "Exposure-based therapy planning with psychiatry or specialized therapist.",
    },
    finalDxId: "obsessive_compulsive_disorder",
    requiredMustNotMiss: ["obsessive_compulsive_disorder", "schizophrenia", "anxiety"],
    dxOverrides: [
      {
        dxId: "obsessive_compulsive_disorder",
        yield: "correct",
        explanation:
          "Obsessions with compulsions causing distress and impairment for over a year, with insight and elevated Y-BOCS, fits OCD.",
      },
      {
        dxId: "anxiety",
        yield: "reasonable",
        explanation: "Generalized anxiety can overlap, but primary pattern is specific contamination intrusions with rituals.",
      },
      {
        dxId: "schizophrenia",
        yield: "dangerous-miss",
        explanation: "Must briefly confirm absence of fixed false beliefs and hallucinations when rituals are extreme.",
      },
      {
        dxId: "autism_spectrum_disorder",
        yield: "reasonable",
        explanation: "Routines occur, but fear-driven contamination loop with preserved insight differs from core ASD presentation here.",
      },
      {
        dxId: "personality_disorder_unspecified",
        yield: "low",
        explanation: "Does not explain acute fear-contamination cycle beginning in adolescence.",
      },
    ],
    diagnosisOptions: [
      {
        id: "obsessive_compulsive_disorder",
        name: "Obsessive-compulsive disorder",
        isCorrect: true,
        isDangerous: false,
        explanation: "Classic contamination OCD with washing compulsions and severity scale confirmation.",
      },
      {
        id: "anxiety",
        name: "Generalized anxiety disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Broad worry pattern less specific than targeted contamination obsessions and rituals.",
      },
      {
        id: "schizophrenia",
        name: "Psychotic disorder",
        isCorrect: false,
        isDangerous: true,
        explanation: "Insight preserved and no primary hallucinations; still must rule out if unclear.",
      },
      {
        id: "autism_spectrum_disorder",
        name: "Autism spectrum disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Developmental history and social communication differences not central to vignette.",
      },
    ],
    teachingPoints: [
      "Grading guide (100): obsessions and compulsions 35, distress and functioning 20, insight clues 20, diagnosis 25.",
      "Ego-dystonic thoughts differentiate many OCD cases from psychotic disorders.",
      "Quantify hours per day lost to rituals—makes impairment real for patients and families.",
      "Skin findings can mirror severity of washing behaviors.",
    ],
  },

  {
    id: "psych-ptsd-reliving",
    title: "I Keep Reliving What Happened",
    specialty: PSYCH_SPECIALTY,
    difficulty: "Intermediate",
    estimatedMinutes: 15,
    description:
      "Sarah Mitchell, a 31-year-old ER nurse, developed nightmares, flashbacks, avoidance, and hypervigilance after a traumatic event eight months ago. PCL-5 is positive; PHQ-9 shows depressive symptoms.",
    cardTeaser: "I can't stop thinking about it.",
    objectives: [
      "Link symptoms to trauma timeline and trauma clusters.",
      "Screen for depression, panic, and safety risks in a healthcare worker.",
      "Use validated PTSD tools to document burden alongside clinical interview.",
    ],
    patientPersona: {
      name: "Sarah Mitchell",
      age: 31,
      gender: "Female",
      chiefComplaint: "I can't stop thinking about it.",
      background:
        "Eight months ago a trauma shift went sideways—she does not want graphic detail but says a patient outcome haunts her. She replays sounds and beeps at home, wakes soaked from dreams, avoids the bay where it happened, and scans rooms like she is still on high alert. She startles when doors slam. Sleep is broken; coffee gets her through shifts but she feels brittle. She used to love overtime; now she trades shifts to stay away from certain rooms. She feels guilty and angry at herself. No drugs; wine a few nights a week 'to turn her brain off.' Passive thoughts that life feels heavy sometimes—no plan.",
      vitals: {
        heartRate: 78,
        bloodPressure: "116/74",
        respiratoryRate: 16,
        oxygenSat: "99%",
        temperature: "98.5°F",
      },
      keyHistoryPoints: [
        "Symptoms began after identified trauma ~8 months ago",
        "Nightmares, flashbacks, avoidance of reminders",
        "Hypervigilance, exaggerated startle, poor sleep",
        "Occupational impairment in nursing role",
        "Positive PTSD screen; depression items elevated",
      ],
      redFlags: [
        "Active suicidal intent or increasing substance use",
        "Severe dissociation interfering with safe patient care",
      ],
    },
    aiInstructions: {
      patientStyle:
        "Sarah is professional, tearful when describing the event, and avoids sensational detail. She appreciates pacing.",
      behaviorRules: [
        "Answer only as Sarah.",
        "Do not say PTSD as a diagnosis—use descriptive words about nightmares and triggers.",
        "If asked about suicide, admit passive heaviness without plan if asked carefully.",
      ],
      doNotRevealDirectly: [
        "PTSD",
        "post-traumatic stress disorder",
        "you have classic PTSD",
      ],
    },
    physicalExam: [
      {
        id: "general",
        label: "General",
        summary: "Alert; mildly tense posture; no acute illness.",
        details:
          "Looks fatigued but groomed. Occasionally scans door. Cardiopulmonary exam unremarkable.",
      },
    ],
    mentalStatusExam: [
      {
        id: "mse-affect-arousal",
        label: "Mood, affect, arousal",
        summary: "Dysphoric anxious mood; tearful; hyperalert.",
        details:
          "Mood low and anxious; bursts of tears when discussing trauma cues. Appears hyperalert—tracks noises in hallway.",
      },
      {
        id: "mse-trauma-screen",
        label: "Trauma-related symptoms (interview)",
        summary: "Intrusions, avoidance, and arousal endorsed.",
        details:
          "Describes nightmares and daytime flashbacks tied to reminders, avoidance of location and situations, sleep fragmentation, exaggerated startle.",
      },
      {
        id: "mse-thought",
        label: "Thought process & content",
        summary: "Logical process; guilt-focused cognitions.",
        details:
          "Thought process organized. Content includes self-blame without formal delusions.",
      },
      {
        id: "mse-cognition-orientation",
        label: "Cognition & orientation",
        summary: "Oriented; attention variable when distressed.",
        details:
          "Oriented x3. Concentration dips when discussing trauma; can redirect with grounding.",
      },
    ],
    testOverrides: [
      {
        testId: "pcl5",
        result: "PCL-5 score positive above clinical cutoff—consistent with significant PTSD symptom burden.",
        yield: "high",
      },
      {
        testId: "phq9",
        result: "PHQ-9 elevated—overlapping depressive symptoms with trauma-related avoidance and sleep loss.",
        yield: "helpful",
      },
    ],
    testDefaultBehavior: {
      labDefault: "Routine labs not required absent other medical concerns.",
      imagingDefault: "Not indicated without focal neuro signs.",
      bedsideDefault: "Validated screens complement, not replace, trauma-informed assessment.",
      procedureDefault: "Evidence-based psychotherapy and medication discussion per patient preference and severity.",
    },
    finalDxId: "post_traumatic_stress_disorder",
    requiredMustNotMiss: ["post_traumatic_stress_disorder", "depression", "acute_stress_disorder"],
    dxOverrides: [
      {
        dxId: "post_traumatic_stress_disorder",
        yield: "correct",
        explanation:
          "Trauma exposure followed by intrusion, avoidance, negative alterations, and hyperarousal beyond one month with positive PCL-5 fits PTSD, with depressive overlap.",
      },
      {
        dxId: "acute_stress_disorder",
        yield: "reasonable",
        explanation: "Similar cluster but typically within first month; her timeline is longer.",
      },
      {
        dxId: "depression",
        yield: "reasonable",
        explanation: "May be comorbid; PHQ-9 elevated, but trauma-cued symptoms are central.",
      },
      {
        dxId: "panic",
        yield: "reasonable",
        explanation: "Panic symptoms can occur; flashbacks are tied to identifiable reminders.",
      },
      {
        dxId: "adjustment_disorder",
        yield: "low",
        explanation: "Usually milder and less classically cluster-defined than this presentation.",
      },
    ],
    diagnosisOptions: [
      {
        id: "post_traumatic_stress_disorder",
        name: "Post-traumatic stress disorder",
        isCorrect: true,
        isDangerous: true,
        explanation: "Trauma-linked symptom clusters with impairment and positive screening tool.",
      },
      {
        id: "acute_stress_disorder",
        name: "Acute stress disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Duration typically shorter than one month after trauma.",
      },
      {
        id: "depression",
        name: "Major depressive disorder",
        isCorrect: false,
        isDangerous: true,
        explanation: "Possible comorbidity; trauma clusters help distinguish primary PTSD.",
      },
      {
        id: "panic",
        name: "Panic disorder",
        isCorrect: false,
        isDangerous: false,
        explanation: "Unexpected panic spells are less central than trauma-linked intrusions.",
      },
    ],
    teachingPoints: [
      "Grading guide (100): trauma relationship 30, avoidance and hyperarousal 25, functional impairment 20, diagnosis 25.",
      "Healthcare workers may minimize trauma impact until functioning breaks—ask about shift changes.",
      "PCL-5 validates burden; clinical interview defines diagnosis.",
      "Safety and substance use screens belong in every trauma assessment.",
    ],
  },
]
