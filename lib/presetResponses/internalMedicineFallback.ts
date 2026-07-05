import type { FallbackScenario } from './types'

export const internalMedicineFallbackScenarios: FallbackScenario[] = [
  {
    key: 't2dm-off-weeks-kevin-sharma',
    titleMatchers: ["haven't felt right", 'felt right', 'felt off'],
    complaintMatchers: ['felt off lately', 'just felt off'],
    defaultAnswer:
      "I've been dragging for months — brutal thirst, peeing all day and night, blurry vision new readers, feet tingly sometimes. Hungrier than usual weirdly. Blood pressure was high routine screen once. Dad had sugar problems — I'm hoping I'm not dramatic.",
    qa: [
      {
        id: 'fatigue',
        answer:
          "Fatigue is this heavy afternoon slump — not sleepy exactly, more wiped. Coffee doesn't fix it. I blamed stress until the bathroom breaks got ridiculous.",
        patterns: ['tired', 'fatigue', 'energy', 'exhaust'],
        keywords: ['tired', 'fatigue'],
      },
      {
        id: 'urination',
        answer:
          "I'm up twice nightly peeing — conference calls embarrassing bathroom exits. Streams normal color I think, just volume insane. I drink water because mouth dry all the time.",
        patterns: ['urin', 'pee', 'void', 'thirst', 'drink'],
        keywords: ['urin', 'thirst'],
      },
      {
        id: 'vision',
        answer:
          "Menu font fuzzy at restaurant distance — cheaters stronger drugstore pair helped bit. Optometrist overdue classic avoidance.",
        patterns: ['vision', 'blur', 'eye'],
        keywords: ['vision', 'blur'],
      },
      {
        id: 'feet',
        answer:
          "Sock-line tingling toes nights — not full numb walking numb. Thought bad shoes then summer sandals same story.",
        patterns: ['feet', 'foot', 'tingle', 'numb', 'neuro'],
        keywords: ['feet', 'tingle'],
      },
      {
        id: 'appetite',
        answer:
          "Hungrier — snacks between shop invoices weird for me. Weight stable belt same lying to myself maybe five pounds up honestly uncertain.",
        patterns: ['appetite', 'hungry', 'eat', 'weight'],
        keywords: ['appetite', 'weight'],
      },
      {
        id: 'pain',
        answer:
          "No chest pain thank goodness — occasional muscle ache between desk and loading dock nothing cardiac drama.",
        patterns: ['pain', 'chest'],
        keywords: ['pain'],
      },
      {
        id: 'fever',
        answer:
          "No fever chills — not sick-like infection timeline more gradual grind.",
        patterns: ['fever', 'chill', 'infection'],
        keywords: ['fever'],
      },
      {
        id: 'timing',
        answer:
          "Three four months gradual — worsening last six weeks pushed me schedule appointment. Can't pinpoint single day lightning bolt.",
        patterns: ['when', 'how long', 'start', 'onset'],
        keywords: ['when', 'long'],
      },
      {
        id: 'exercise',
        answer:
          "Used walk dog evenings — now winded excuse heat. Gym membership dust joke not relevant.",
        patterns: ['exercise', 'walk', 'activity', 'stairs'],
        keywords: ['exercise', 'walk'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing fine at rest — not why I'm here. Unless climbing stairs faster than usual winded maybe deconditioning lie.",
        patterns: ['breath', 'short', 'sob'],
        keywords: ['breath'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep fragmented bathroom trips — wife annoyed light sleeper. Otherwise insomnia mild stress usual business owner.",
        patterns: ['sleep', 'insomnia', 'night'],
        keywords: ['sleep'],
      },
      {
        id: 'meds',
        answer:
          "Ibuprofen occasional back strain — no steroids. Lisinopril stopped years ago side effect cough maybe regret now. No supplements beyond multivitamin sporadic.",
        patterns: ['med', 'medicine', 'drug', 'pill'],
        keywords: ['med'],
      },
      {
        id: 'family',
        answer:
          "Dad type two diagnosed sixties — metformin life. Mom hypertension. Sister thin lucky genes unfair.",
        patterns: ['family', 'history', 'parent', 'diabetes'],
        keywords: ['family', 'diabetes'],
      },
      {
        id: 'swelling',
        answer:
          "No ankle puffiness — not that story. Maybe face mildly puffy mirror insecure paranoid uncertain.",
        patterns: ['swell', 'edema', 'ankle'],
        keywords: ['swell'],
      },
      {
        id: 'dizziness',
        answer:
          "Rare lightheaded standing fast dehydrated thirst — not spinning vertigo mostly.",
        patterns: ['dizz', 'lightheaded'],
        keywords: ['dizz'],
      },
      {
        id: 'worse-help',
        answer:
          "Nothing helps thirst pee cycle honestly — chugging water temporary mouth relief then bathroom again vicious.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'help'],
      },
      {
        id: 'vague',
        answer:
          "Big picture: months off-feeling business owner ignoring body until vision bathroom nerve stuff piled undeniable anxious.",
        patterns: ['more', 'describe', 'overall', 'anything else'],
        keywords: ['more', 'describe'],
      },
      {
        id: 'hello',
        answer:
          "Hi — Kevin. Just off for weeks thirst peeing fatigue blur feet tingling — wife made me come.",
        patterns: ['hello', 'hi ', 'hey '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'chf-sob-robert-daniels',
    titleMatchers: ['short of breath', 'more short', 'shortness'],
    complaintMatchers: ["can't do what i used to"],
    defaultAnswer:
      "I get winded stacking stairs — used haul wire spools no problem. Ankles puffy socks leave marks. Three pillows now or I wake up gasping like I forgot how to breathe — scary as hell. Wife says I look gray tired.",
    qa: [
      {
        id: 'breathing',
        answer:
          "Shortness hauling garbage cans driveway — rests mid-task embarrassing. Sitting fine mostly talking complete sentences weird clinician test.",
        patterns: ['breath', 'short', 'wind', 'dyspnea'],
        keywords: ['breath', 'short'],
      },
      {
        id: 'swelling',
        answer:
          "Both legs sock imprints donut ankles evening — finger poke pits skin slow bounce. Loafers tight purchased wider cheap Walmart.",
        patterns: ['swell', 'edema', 'ankle', 'leg'],
        keywords: ['swell'],
      },
      {
        id: 'sleep-pillow',
        answer:
          "Three pillows creep — flat panics woke once drowning dream sensation settled window open winter cold wife furious.",
        patterns: ['pillow', 'sleep', 'flat', 'orthopn', 'night'],
        keywords: ['pillow', 'sleep'],
      },
      {
        id: 'pnd',
        answer:
          "Wake gasping couple times monthly — sits edge bed few minutes improves — thought panic attacks dismissed stupid male pride.",
        patterns: ['wake', 'gasping', 'night', 'paroxysm'],
        keywords: ['wake', 'night'],
      },
      {
        id: 'fatigue',
        answer:
          "Naps alien concept retired guy suddenly napping TV chair ashamed. Workshop projects stall half-done.",
        patterns: ['fatigue', 'tired', 'weak'],
        keywords: ['fatigue'],
      },
      {
        id: 'fever-cough',
        answer:
          "No fever — cough dry tickle sometimes allergies maybe not green phlegm infection vibe.",
        patterns: ['fever', 'cough', 'cold'],
        keywords: ['fever'],
      },
      {
        id: 'chest-pain',
        answer:
          "No squeezing chest pain — had heart scare ER decade ago 'observe' vague note lost records sorry.",
        patterns: ['chest', 'pain', 'heart'],
        keywords: ['chest'],
      },
      {
        id: 'timing',
        answer:
          "Months slope worse — edema obvious last month maybe denial. Stair symptom two three months if honest.",
        patterns: ['when', 'how long', 'progress'],
        keywords: ['when'],
      },
      {
        id: 'exercise',
        answer:
          "Walk dog quarter mile now pause — used miles. Grandkids park bench supervising pathetic image.",
        patterns: ['exercise', 'walk', 'activity'],
        keywords: ['exercise'],
      },
      {
        id: 'meds',
        answer:
          "Lisinopril HCTZ combo — sometimes skip stupid stubborn. Aspirin 81 cardiologist never officially but neighbor swears.",
        patterns: ['med', 'medicine', 'pill', 'water pill'],
        keywords: ['med'],
      },
      {
        id: 'salt',
        answer:
          "Wife salts food heavy — takeout Chinese weakness — trying cut back guilt lecture cycle.",
        patterns: ['salt', 'diet', 'sodium'],
        keywords: ['salt'],
      },
      {
        id: 'smoking',
        answer:
          "Quit fifteen years — still soul misses cigarettes stress trigger vivid dreams weird confession.",
        patterns: ['smoke', 'tobacco'],
        keywords: ['smoke'],
      },
      {
        id: 'family',
        answer:
          "Dad heart attack sixties survived. Mom stroke eighties. Brothers healthy jerks.",
        patterns: ['family', 'history', 'heart'],
        keywords: ['family'],
      },
      {
        id: 'urination',
        answer:
          "Peeing normal amounts daytime — not gallons diabetes friend story. Night urination sometimes parallel edema diuretic timing confusion.",
        patterns: ['urin', 'pee', 'night'],
        keywords: ['urin'],
      },
      {
        id: 'dizziness',
        answer:
          "Lightheaded rare standing quick — mostly breathing ankle story dominant.",
        patterns: ['dizz', 'lightheaded'],
        keywords: ['dizz'],
      },
      {
        id: 'appetite',
        answer:
          "Appetite okay — wedding buffet still tempting moral failing humor.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite'],
      },
      {
        id: 'worse-help',
        answer:
          "Elevating feet Netflix marathon helps edema cosmetic not breathing. Nothing fixes stairs honestly.",
        patterns: ['worse', 'help', 'better'],
        keywords: ['help'],
      },
      {
        id: 'vague',
        answer:
          "Retired electrician pride wounded — progressive breathlessness edema pillows night gasping trying not catastrophize alone.",
        patterns: ['more', 'describe', 'overall'],
        keywords: ['more'],
      },
      {
        id: 'hello',
        answer:
          "Hey — Robert. Can't do stairs like before ankles swollen pillow stack grown night breathing spells.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'iron-anemia-dizziness-melissa-chen',
    titleMatchers: ['dizzy when i stand', 'feel dizzy', 'lightheaded'],
    complaintMatchers: ['lightheaded'],
    defaultAnswer:
      "Lightheaded standing desk black specks vision fixes sitting — months embarrassing. Stairs winded like out shape joke. Periods crime scene heavy super pads hourly some days. Ice chewing coworker thinks I'm weird diet.",
    qa: [
      {
        id: 'dizziness',
        answer:
          "Standing quick register black tunnel few seconds — never full fainted knocked wood. Better sitting slow deep breath dramatic.",
        patterns: ['dizz', 'lightheaded', 'stand', 'orthost'],
        keywords: ['dizz', 'stand'],
      },
      {
        id: 'fatigue',
        answer:
          "Bone tired admin spreadsheets blur — not depression swear motivation fine weekends hobbyless though noticeable.",
        patterns: ['fatigue', 'tired', 'energy'],
        keywords: ['fatigue'],
      },
      {
        id: 'menses',
        answer:
          "Periods flooding — super plus hourly change worst days clots quarter-sized I think gross TMI sorry gynecologist someday fear.",
        patterns: ['period', 'menstrual', 'bleed', 'menses'],
        keywords: ['period', 'bleed'],
      },
      {
        id: 'breathing',
        answer:
          "Stairs office breathless — coworkers take elevator together politely slow me embarrassed.",
        patterns: ['breath', 'stairs', 'exertion'],
        keywords: ['breath'],
      },
      {
        id: 'pica',
        answer:
          "Crunch ice compulsive cafeteria cups — weird soothing mouthfeel maybe anemia internet scared me.",
        patterns: ['ice', 'craving', 'pica'],
        keywords: ['ice'],
      },
      {
        id: 'pain',
        answer:
          "No pelvic cramping outside period misery — no belly pinpoint pain appendicitis style.",
        patterns: ['pain', 'cramp', 'belly'],
        keywords: ['pain'],
      },
      {
        id: 'gi-bleed',
        answer:
          "Stool brown normal paranoid checked — no black tar scary melena. No bright red I saw.",
        patterns: ['stool', 'blood', 'melena', 'gi'],
        keywords: ['stool', 'blood'],
      },
      {
        id: 'meds',
        answer:
          "Omeprazole daily reflux — occasional ibuprofen period cramps stupid maybe. No blood thinners.",
        patterns: ['med', 'medicine', 'nsaid'],
        keywords: ['med'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep okay quantity — quality disrupted period pad changes night heavy flow nights misery.",
        patterns: ['sleep', 'night'],
        keywords: ['sleep'],
      },
      {
        id: 'family',
        answer:
          "Mom fibroids surgery history — sister easy periods unfair universe.",
        patterns: ['family', 'fibroid', 'history'],
        keywords: ['family'],
      },
      {
        id: 'timing',
        answer:
          "Dizziness months vague — worsened last weeks cycle heavier maybe perimenopause google rabbit hole.",
        patterns: ['when', 'how long', 'months'],
        keywords: ['when'],
      },
      {
        id: 'exercise',
        answer:
          "Used yoga Sundays — dropped stamina excuses heat summer lies.",
        patterns: ['exercise', 'yoga', 'gym'],
        keywords: ['exercise'],
      },
      {
        id: 'swelling',
        answer:
          "No leg edema — not puffy ankle story. Face normal I think.",
        patterns: ['swell', 'edema'],
        keywords: ['swell'],
      },
      {
        id: 'urination',
        answer:
          "Urination normal frequency daytime — not gallons.",
        patterns: ['urin', 'pee'],
        keywords: ['urin'],
      },
      {
        id: 'appetite',
        answer:
          "Appetite variable — sweet cravings maybe iron cliché uncertain joke.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite'],
      },
      {
        id: 'worse-help',
        answer:
          "Iron vitamins pharmacy random months no miracle — sitting relieves dizziness temporarily.",
        patterns: ['worse', 'help', 'iron vitamin'],
        keywords: ['help'],
      },
      {
        id: 'vague',
        answer:
          "Office admin embarrassed heavy periods orthostasis dyspnea — hoping not something awful but scared enough present today.",
        patterns: ['more', 'describe'],
        keywords: ['more'],
      },
      {
        id: 'hello',
        answer:
          "Hello — Melissa. Lightheaded standing tired stairs heavy periods months.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'ckd-fatigue-william-foster',
    titleMatchers: ["can't stop feeling tired", 'stop feeling tired', 'feeling tired'],
    complaintMatchers: ['energy has slowly disappeared', 'energy disappeared'],
    defaultAnswer:
      "Energy drained months — not depression I argue hobbies died anyway retired excuse weak. Food tastes like cardboard appetite meh. Itchy back showers scalding temporary relief. Socks tight afternoon swelling. Diabetes pills spotty compliance honestly. Wife dragged labs nag champion.",
    qa: [
      {
        id: 'fatigue',
        answer:
          "Fatigue sloth mascot — morning coffee ritual traitor now. Napping reading chair novel halfway forever unfinished.",
        patterns: ['fatigue', 'tired', 'energy'],
        keywords: ['fatigue'],
      },
      {
        id: 'appetite',
        answer:
          "Nothing satisfying — metallic mouth flavor wife notices garlic smell confusion maybe unrelated.",
        patterns: ['appetite', 'eat', 'taste', 'nausea'],
        keywords: ['appetite'],
      },
      {
        id: 'itch',
        answer:
          "Back torso scratches raw sleep disruption — lotion pharmacy rows failure steroid cream brief placebo.",
        patterns: ['itch', 'scratch', 'skin'],
        keywords: ['itch'],
      },
      {
        id: 'swelling',
        answer:
          "Ankles puff office recliner afternoons — socks elastic torture marks.",
        patterns: ['swell', 'edema', 'ankle'],
        keywords: ['swell'],
      },
      {
        id: 'urination',
        answer:
          "Urine foamier wife comments awkward dinner table — frequency nights increased maybe prostate joke except anatomy wrong.",
        patterns: ['urin', 'foamy', 'pee', 'night'],
        keywords: ['urin'],
      },
      {
        id: 'dm-htn',
        answer:
          "Type two metformin glyburide forget doses shame spiral — lisinopril HCTZ prescribed years pharmacy auto-refill mostly compliant blood pressure home machine 150s lazy log.",
        patterns: ['diabetes', 'blood pressure', 'hypertension', 'med'],
        keywords: ['diabetes', 'pressure'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing mostly okay — mild stairs winded could deconditioning kidney thing overlapping unsure.",
        patterns: ['breath', 'short'],
        keywords: ['breath'],
      },
      {
        id: 'pain',
        answer:
          "No chest pain — flank ache vague maybe muscle paranoid kidney location google.",
        patterns: ['pain', 'chest', 'flank'],
        keywords: ['pain'],
      },
      {
        id: 'fever',
        answer:
          "No fever weight stable actually up few pounds fluid maybe denial.",
        patterns: ['fever', 'weight'],
        keywords: ['fever'],
      },
      {
        id: 'timing',
        answer:
          "Six months fatigue creep gradual — itching edema joined last month noticeably worse.",
        patterns: ['when', 'how long', 'months'],
        keywords: ['when'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep interrupted itch bathroom — dreamless heavy slump.",
        patterns: ['sleep', 'insomnia'],
        keywords: ['sleep'],
      },
      {
        id: 'exercise',
        answer:
          "Walking dog shortened route — cane unnecessary pride refuses.",
        patterns: ['walk', 'exercise'],
        keywords: ['walk'],
      },
      {
        id: 'family',
        answer:
          "Mom dialysis stories feared — dad cancer not renal different tragedy.",
        patterns: ['family', 'kidney', 'dialysis'],
        keywords: ['family'],
      },
      {
        id: 'meds',
        answer:
          "OTC ibuprofen occasional knee — probably kidney enemy nurse scolded before ignored.",
        patterns: ['med', 'nsaid'],
        keywords: ['med'],
      },
      {
        id: 'dizziness',
        answer:
          "Rare lightheaded — anemia kidney friend warned me maybe.",
        patterns: ['dizz'],
        keywords: ['dizz'],
      },
      {
        id: 'worse-help',
        answer:
          "Cold showers itch scratch cycle — brief relief theater.",
        patterns: ['worse', 'help'],
        keywords: ['help'],
      },
      {
        id: 'vague',
        answer:
          "Retired teacher intellectualizing declining body — fatigue itch edema protein history risk hoping fixable not fatalistic spiral.",
        patterns: ['more', 'describe'],
        keywords: ['more'],
      },
      {
        id: 'hello',
        answer:
          "Hi — William. Energy gone itching swelling foamy urine worries diabetes history.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'nephrotic-edema-thomas-rivera',
    titleMatchers: ['legs keep swelling', 'legs swelling', 'ankles'],
    complaintMatchers: ['puffing up', 'keep puffing'],
    defaultAnswer:
      "Legs ankles doughy pitting — kitchen clogs leaving sock ridges gross. Urine foam toilet bowl embarrassing chef humor dark. Weight up pants tight notch. Ibuprofen knee overuse probably stupid self-medicate confession.",
    qa: [
      {
        id: 'swelling',
        answer:
          "Bilateral puff pitting finger test — face puffy mornings mirror denial cracked.",
        patterns: ['swell', 'edema', 'leg', 'ankle', 'pitting'],
        keywords: ['swell'],
      },
      {
        id: 'urine',
        answer:
          "Foam layer toilet after stirring gross metaphor — bubbles beer head wife disgusted jokes fail.",
        patterns: ['urine', 'foam', 'pee'],
        keywords: ['urine', 'foam'],
      },
      {
        id: 'fatigue',
        answer:
          "Closing shift legs cement — not out shape excuse anymore frightening.",
        patterns: ['fatigue', 'tired'],
        keywords: ['fatigue'],
      },
      {
        id: 'weight',
        answer:
          "Scale ten up weeks — blamed pasta profession irony.",
        patterns: ['weight', 'gain'],
        keywords: ['weight'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing okay — lying flat little tight maybe imagination paranoid.",
        patterns: ['breath', 'flat', 'orthopn'],
        keywords: ['breath'],
      },
      {
        id: 'pain',
        answer:
          "Knees ache standing hours — NSAID crutch regret possibly.",
        patterns: ['pain', 'knee'],
        keywords: ['pain'],
      },
      {
        id: 'liver',
        answer:
          "No jaundice history — LFTs 'fine' vague years ago routine physical shrink honesty.",
        patterns: ['liver', 'hepat', 'alcohol'],
        keywords: ['liver'],
      },
      {
        id: 'chest',
        answer:
          "No chest pain — cardiac anxiety hypochondria occasional 3 a.m.",
        patterns: ['chest'],
        keywords: ['chest'],
      },
      {
        id: 'dvt',
        answer:
          "Calves symmetric pain low — not one sausage leg DVT google photo.",
        patterns: ['calf', 'dvt', 'clot', 'travel'],
        keywords: ['calf', 'clot'],
      },
      {
        id: 'timing',
        answer:
          "Weeks worsening edema — foam urine noticed maybe month vague culinary schedule blur.",
        patterns: ['when', 'how long', 'week'],
        keywords: ['when'],
      },
      {
        id: 'meds',
        answer:
          "Ibuprofen handfuls long shifts — chef culture toxic maybe kidney lesson incoming scared.",
        patterns: ['med', 'nsaid', 'ibuprofen'],
        keywords: ['med'],
      },
      {
        id: 'family',
        answer:
          "Mom diabetes dad hypertension — no biopsy kidney family lore.",
        patterns: ['family', 'history'],
        keywords: ['family'],
      },
      {
        id: 'appetite',
        answer:
          "Appetite ironically good — food irony cruel puffiness.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep legs heavy discomfort rolling pillows between knees cope strategy.",
        patterns: ['sleep'],
        keywords: ['sleep'],
      },
      {
        id: 'exercise',
        answer:
          "Exercise zero beyond kitchen marathon — intentions laughable.",
        patterns: ['exercise', 'gym'],
        keywords: ['exercise'],
      },
      {
        id: 'dizziness',
        answer:
          "Mild lightheaded rare — not primary complaint.",
        patterns: ['dizz'],
        keywords: ['dizz'],
      },
      {
        id: 'worse-help',
        answer:
          "Salt tasting profession enemy — elevation feet marginally mornings.",
        patterns: ['worse', 'salt', 'help'],
        keywords: ['worse', 'help'],
      },
      {
        id: 'vague',
        answer:
          "Chef pride body betrayal edema foam urine — hoping not heart failure cirrhosis spiral but scared enough here.",
        patterns: ['more', 'describe'],
        keywords: ['more'],
      },
      {
        id: 'hello',
        answer:
          "Hey — Thomas. Legs swelling foamy urine weight gain kitchen worker.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'medacademy-pathology-cells-going-wild',
    titleMatchers: ['cells going wild', 'medacademy', 'pathology'],
    complaintMatchers: ['broke my hip', 'short of breath', 'blood clot'],
    defaultAnswer:
      "I was in the hospital because I broke my hip after a fall. While I was here, I had shortness of breath and chest pain.",
    qa: [
      {
        id: 'full-history',
        answer: `A 59 y/o female fell and sustained a subtrochanteric hip fracture requiring fixation. During the hospitalization, she had an episode of shortness of breath and chest pain. CT scan was ordered to rule out a pulmonary embolism (PE). The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm. The PE was ruled out.

History of Present Illness:
She denies weight loss and hemoptysis, but has been complaining of hoarseness for the past two weeks. She has chronic low back pain, headache, and changes in mentation/coordination. She has a 65-70 pack year smoking history.

Past Medical History:
Chronic back pain
HTN
Hypothyroidism
Hx of GI bleed 2004 with negative endoscopy
Hx of diverticular abscess requiring colon resection in 1982

Family History:
No cancer in the family.`,
        patterns: [
          'full patient history',
          'full history',
          'patient history',
          'your history',
          'summarize the patient history',
          'summarize patient history',
          'all the history',
          'what do we know about the patient',
          'what is your history',
          'tell me your history',
          'give me your history',
        ],
        keywords: ['history', 'summarize'],
      },
      {
        id: 'physical-exam',
        answer: `Physical Examination:

Mild raspy voice

HEENT: pupils equal, round, and reactive to light, extraocular movements intact (EOMI), oropharynx (OP) clear

Neck: Supple non-palpable thyroid

Lungs: Clear to auscultation and percussion

Cardiac: regular rate & rhythm (RRR) w/o murmurs

Abd: Well healed surgical scar, no masses, liver edge not palpated

Limbs: No edema

Neuro: Cranial nerves (CN) intact, no focal weakness`,
        patterns: [
          'physical exam',
          'physical examination',
          'exam findings',
          'what did you find on exam',
          'give me the physical',
          'what is the pe',
        ],
        keywords: ['exam', 'physical'],
      },
      {
        id: 'smoking',
        answer: 'She has a 65-70 pack year smoking history.',
        patterns: ['smok', 'cigarette', 'tobacco', 'pack'],
        keywords: ['smok', 'tobacco'],
      },
      {
        id: 'weight',
        answer: 'She denies weight loss.',
        patterns: ['weight loss', 'lost weight', 'losing weight'],
        keywords: ['weight'],
      },
      {
        id: 'hemoptysis',
        answer: 'She denies hemoptysis.',
        patterns: ['hemoptysis', 'blood in sputum', 'cough blood', 'coughing blood'],
        keywords: ['blood', 'hemoptysis'],
      },
      {
        id: 'hoarseness',
        answer: 'She has been complaining of hoarseness for the past two weeks.',
        patterns: ['hoarse', 'raspy', 'voice'],
        keywords: ['voice', 'hoarse'],
      },
      {
        id: 'back',
        answer: 'She has chronic low back pain.',
        patterns: ['back pain', 'chronic low back', 'low back pain'],
        keywords: ['back'],
      },
      {
        id: 'headache',
        answer: 'She has headache.',
        patterns: ['headache', 'head pain'],
        keywords: ['headache'],
      },
      {
        id: 'neuro',
        answer: 'She has changes in mentation/coordination.',
        patterns: ['confusion', 'coordination', 'mentation', 'off', 'dizzy', 'weak'],
        keywords: ['confusion', 'coordination', 'mentation'],
      },
      {
        id: 'family',
        answer: 'No cancer in the family.',
        patterns: ['family history', 'family cancer', 'cancer in family'],
        keywords: ['family'],
      },
      {
        id: 'pmh',
        answer:
          'Chronic back pain, HTN, hypothyroidism, Hx of GI bleed 2004 with negative endoscopy, and Hx of diverticular abscess requiring colon resection in 1982.',
        patterns: ['medical history', 'past medical', 'history of', 'hypertension', 'hypothyroid', 'colon', 'gi bleed', 'pmh'],
        keywords: ['history', 'hypertension'],
      },
      {
        id: 'hello',
        answer:
          "Hi — I'm Patricia. I broke my hip and now I'm having shortness of breath and chest pain in the hospital.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
]
