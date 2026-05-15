import type { FallbackScenario } from './types'

export const rheumatologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'rheum-ra-susan-morning-stiffness',
    titleMatchers: ['hands feel stiff', 'stiff every morning', 'morning stiff'],
    complaintMatchers: ['fingers frozen', 'wake up', 'stiff'],
    defaultAnswer:
      "Over an hour every morning my hands feel frozen — both sides, knuckles puffy, jars are impossible. Eight months of this and I'm drained. Warm water and moving helps eventually; no sun rash.",
    qa: [
      {
        id: 'chief',
        answer:
          "I told intake my fingers feel frozen when I wake — sounds dramatic but accurate.",
        patterns: ['what brings', 'chief', 'today'],
        keywords: ['bring', 'chief', 'today'],
      },
      {
        id: 'stiffness',
        answer:
          "Stiffness runs more than an hour before I can type normally — worst part of my day every day.",
        patterns: ['stiff', 'morning', 'duration'],
        keywords: ['stiff', 'morning', 'duration'],
      },
      {
        id: 'hands',
        answer:
          "Both hands — MCPs whatever the knuckle names — symmetric misery. Rings buried in jewelry dish.",
        patterns: ['hand', 'knuckle', 'swell', 'joint'],
        keywords: ['hand', 'swell', 'joint'],
      },
      {
        id: 'pain',
        answer:
          "Deep achy pain — gentle movement loosens slightly; sitting still rechills them.",
        patterns: ['pain', 'hurt', 'ache'],
        keywords: ['pain', 'hurt', 'ache'],
      },
      {
        id: 'fatigue',
        answer:
          "Tired beyond sleep payback — weekends vanish recovering for Monday typing.",
        patterns: ['fatigue', 'tired', 'energy'],
        keywords: ['fatigue', 'tired'],
      },
      {
        id: 'rash',
        answer:
          "No malar sun rash — this is hands-centric thank goodness.",
        patterns: ['rash', 'sun', 'lupus'],
        keywords: ['rash', 'sun'],
      },
      {
        id: 'fever',
        answer:
          "Maybe 99 sometimes — not flu sweats story.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'trauma',
        answer:
          "No injury triggered — slow burn then refusal to leave.",
        patterns: ['trauma', 'injury', 'fall'],
        keywords: ['trauma', 'injury'],
      },
      {
        id: 'family',
        answer:
          "Mom vague arthritis lore — no clear RA label spoken aloud.",
        patterns: ['family', 'history', 'genetic'],
        keywords: ['family', 'history'],
      },
      {
        id: 'meds',
        answer:
          "OTC ibuprofen partial — scared of stronger immune pills honestly.",
        patterns: ['medication', 'nsaid', 'ibuprofen'],
        keywords: ['med', 'nsaid'],
      },
      {
        id: 'timing',
        answer:
          "Eight-ish months — denial clock embarrassing.",
        patterns: ['when', 'how long', 'onset'],
        keywords: ['when', 'long', 'onset'],
      },
      {
        id: 'grip',
        answer:
          "Grip weak — handshakes apologetic — pride wound.",
        patterns: ['grip', 'weak', 'strength'],
        keywords: ['grip', 'weak'],
      },
      {
        id: 'work',
        answer:
          "Administrative typing all day — hiding stiffness from boss exhausting.",
        patterns: ['work', 'job', 'typing'],
        keywords: ['work', 'job', 'typing'],
      },
      {
        id: 'help',
        answer:
          "Heat packs warm sink helps; stress deadlines worsen.",
        patterns: ['help', 'worse', 'better'],
        keywords: ['help', 'worse'],
      },
      {
        id: 'cold',
        answer:
          "Office AC vent mean — stiffens faster under vent.",
        patterns: ['cold', 'ac', 'weather'],
        keywords: ['cold', 'weather'],
      },
      {
        id: 'appetite',
        answer:
          "Eating fine — energy garbage separate issue.",
        patterns: ['appetite', 'eat', 'weight'],
        keywords: ['appetite', 'eat', 'weight'],
      },
      {
        id: 'psoriasis',
        answer:
          "No plaques I’ve seen — nails kinda ridges maybe stress?",
        patterns: ['psoriasis', 'skin', 'nail'],
        keywords: ['psoriasis', 'nail'],
      },
      {
        id: 'vague',
        answer:
          "Ask one angle? Brain fog today.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'rheum-sle-rachel-photosensitivity',
    titleMatchers: ['face rash', 'rash in the sun', 'sunlight'],
    complaintMatchers: ['skin reacts', 'sun', 'photosens'],
    defaultAnswer:
      "Sun fries my cheeks and nose bridge — spares laugh lines oddly — mouth sores come and go, joints ache typing, hair shedding, fatigue through grad seminars.",
    qa: [
      {
        id: 'chief',
        answer:
          "Skin hates sunlight — sounds poetic until it’s miserable.",
        patterns: ['what brings', 'chief'],
        keywords: ['bring', 'chief'],
      },
      {
        id: 'rash',
        answer:
          "Malar flush after short walk campus — hat sunscreen insufficient sometimes.",
        patterns: ['rash', 'sun', 'photo'],
        keywords: ['rash', 'sun', 'photo'],
      },
      {
        id: 'fatigue',
        answer:
          "Reading comprehension tanked — coffee traitor mid-afternoon.",
        patterns: ['fatigue', 'tired', 'brain'],
        keywords: ['fatigue', 'tired'],
      },
      {
        id: 'joints',
        answer:
          "Small joints ache — wrists protest typing marathons.",
        patterns: ['joint', 'pain', 'arthritis'],
        keywords: ['joint', 'pain'],
      },
      {
        id: 'mouth',
        answer:
          "Inner lip ulcers citrus sting — annoying recurring.",
        patterns: ['mouth', 'ulcer', 'sore'],
        keywords: ['mouth', 'ulcer'],
      },
      {
        id: 'hair',
        answer:
          "Shower hair clumps — vanity panic layered on everything.",
        patterns: ['hair', 'thin', 'alopecia'],
        keywords: ['hair', 'thin'],
      },
      {
        id: 'fever',
        answer:
          "Low-grade blah days — not influenza spikes.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'urine',
        answer:
          "Haven’t noticed blood cola urine — fear kidney questions though.",
        patterns: ['urine', 'kidney', 'pee'],
        keywords: ['urine', 'kidney'],
      },
      {
        id: 'meds',
        answer:
          "Birth control steady — vitamins sporadic — occasional NSAID cramps.",
        patterns: ['medication', 'medicine', 'pill'],
        keywords: ['med', 'pill'],
      },
      {
        id: 'family',
        answer:
          "Cousin autoimmune whisper — specifics family allergic.",
        patterns: ['family', 'history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'timing',
        answer:
          "Months stack — rash spotlight recent denial broken.",
        patterns: ['when', 'how long'],
        keywords: ['when', 'long'],
      },
      {
        id: 'stress',
        answer:
          "Finals weeks flare — stress multiplier or coincidence?",
        patterns: ['stress', 'school', 'exam'],
        keywords: ['stress', 'school'],
      },
      {
        id: 'chest',
        answer:
          "Breathing fine mostly — pleurisy terror read online not lived yet.",
        patterns: ['chest', 'breath', 'lung'],
        keywords: ['chest', 'breath'],
      },
      {
        id: 'cold',
        answer:
          "Cold hands ache minor — sun’s main villain my story.",
        patterns: ['cold', 'raynaud'],
        keywords: ['cold', 'raynaud'],
      },
      {
        id: 'weak',
        answer:
          "Weakness more fatigue fog than paralysis fright.",
        patterns: ['weak', 'strength'],
        keywords: ['weak', 'strength'],
      },
      {
        id: 'help',
        answer:
          "Sunscreen hats shade help face; admitting symptoms helps anxiety paradoxically.",
        patterns: ['help', 'worse'],
        keywords: ['help', 'worse'],
      },
      {
        id: 'appetite',
        answer:
          "Eating okay — nausea minimal.",
        patterns: ['appetite', 'nausea'],
        keywords: ['appetite', 'nausea'],
      },
      {
        id: 'vague',
        answer:
          "One question? Overstim brain.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'rheum-gout-anthony-first-mtp',
    titleMatchers: ['big toe', 'toe on fire', 'gout'],
    complaintMatchers: ['toe unbearable', 'sudden toe'],
    defaultAnswer:
      "Right big toe joint exploded overnight — red hot, sheet touch torture. Wine dinner steaks yesterday. No twist injury. Uncle warned me jokes about rich food.",
    qa: [
      {
        id: 'chief',
        answer:
          "Toe went nuclear overnight — worst pain ever.",
        patterns: ['what brings', 'chief'],
        keywords: ['bring', 'chief'],
      },
      {
        id: 'toe',
        answer:
          "First MTP whatever the joint — cannot wear shoe — barefoot hobble shame.",
        patterns: ['toe', 'foot', 'mtp', 'big'],
        keywords: ['toe', 'foot', 'mtp'],
      },
      {
        id: 'pain',
        answer:
          "10/10 throbbing synced pulse — tears real.",
        patterns: ['pain', 'hurt', 'severe'],
        keywords: ['pain', 'severe'],
      },
      {
        id: 'swell',
        answer:
          "Balloon red hot — border infection appearance scary.",
        patterns: ['swell', 'red', 'hot'],
        keywords: ['swell', 'red', 'hot'],
      },
      {
        id: 'diet',
        answer:
          "Steak wine celebration dinner — probably cocky dietary choices.",
        patterns: ['diet', 'steak', 'alcohol', 'wine', 'purine'],
        keywords: ['steak', 'alcohol', 'wine'],
      },
      {
        id: 'trauma',
        answer:
          "No injury twist — woke into fire.",
        patterns: ['trauma', 'injury', 'twist'],
        keywords: ['trauma', 'injury'],
      },
      {
        id: 'fever',
        answer:
          "Mild off — not septic drama mostly.",
        patterns: ['fever', 'chill'],
        keywords: ['fever', 'chill'],
      },
      {
        id: 'history',
        answer:
          "First attack this vicious — family jokes now karma.",
        patterns: ['prior', 'before', 'history'],
        keywords: ['prior', 'history'],
      },
      {
        id: 'meds',
        answer:
          "Dental pain pills weak sauce — no allopurinol ever.",
        patterns: ['medication', 'allopurinol', 'colchicine'],
        keywords: ['med', 'allopurinol'],
      },
      {
        id: 'timing',
        answer:
          "3 a.m. cruel start — still noon screaming.",
        patterns: ['when', 'start', 'onset'],
        keywords: ['when', 'onset'],
      },
      {
        id: 'walk',
        answer:
          "Weight-bearing impossible — borrowed crutch theatrical.",
        patterns: ['walk', 'bear', 'weight'],
        keywords: ['walk', 'bear'],
      },
      {
        id: 'stiff',
        answer:
          "Stiff locked joint — not whole-body RA morning.",
        patterns: ['stiff', 'morning'],
        keywords: ['stiff', 'morning'],
      },
      {
        id: 'rash',
        answer:
          "No cellulitis rash spread — localized joint.",
        patterns: ['rash', 'cellulitis', 'skin'],
        keywords: ['rash', 'skin'],
      },
      {
        id: 'hydration',
        answer:
          "Hydration spotty busy host — hindsight lecture myself.",
        patterns: ['hydration', 'water'],
        keywords: ['hydration', 'water'],
      },
      {
        id: 'family',
        answer:
          "Uncle gout punchline family reunions — genetics smug now.",
        patterns: ['family', 'gout', 'history'],
        keywords: ['family', 'gout'],
      },
      {
        id: 'work',
        answer:
          "Restaurant owner — on feet cruel irony — staff covering tonight.",
        patterns: ['work', 'job', 'restaurant'],
        keywords: ['work', 'job'],
      },
      {
        id: 'help',
        answer:
          "Elevation contradictory advice swirl — stress ownership doesn't help inflammation culture.",
        patterns: ['help', 'worse'],
        keywords: ['help', 'worse'],
      },
      {
        id: 'vague',
        answer:
          "Focus question — pain steals IQ.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'rheum-pmr-linda-proximal-pain',
    titleMatchers: ['shoulders and hips', 'ache constantly', 'stiff everywhere'],
    complaintMatchers: ['stiff everywhere', 'shoulder', 'hip'],
    defaultAnswer:
      "Shoulders and hips ache and stiffen — over an hour mornings — hot shower helps some. Rising from chair embarrassing push. Fatigue afternoons. No dramatic weakness more pain-limited. Worried about giant headache stories.",
    qa: [
      {
        id: 'chief',
        answer:
          "I feel stiff everywhere meaning shoulders hips mainly — translator for my chaos.",
        patterns: ['what brings', 'chief'],
        keywords: ['bring', 'chief'],
      },
      {
        id: 'proximal',
        answer:
          "Bilateral shoulder tops and hips — dressing bra war — grandson hugs angle hurt.",
        patterns: ['shoulder', 'hip', 'proximal', 'girdle'],
        keywords: ['shoulder', 'hip', 'girdle'],
      },
      {
        id: 'morning',
        answer:
          "Hour-plus glue — shower kindness partial.",
        patterns: ['morning', 'stiff', 'duration'],
        keywords: ['morning', 'stiff'],
      },
      {
        id: 'weak',
        answer:
          "Feels weak but can cheat lift groceries — pain limits not dead muscles I hope.",
        patterns: ['weak', 'strength', 'muscle'],
        keywords: ['weak', 'strength'],
      },
      {
        id: 'fatigue',
        answer:
          "Afternoon nap gravity — retired guilt free theoretically yet not.",
        patterns: ['fatigue', 'tired'],
        keywords: ['fatigue', 'tired'],
      },
      {
        id: 'gca',
        answer:
          "Headache mild — vision fine — jaw claudication not loud — know doctors vigilant.",
        patterns: ['headache', 'jaw', 'vision', 'temporal'],
        keywords: ['headache', 'jaw', 'vision'],
      },
      {
        id: 'thyroid',
        answer:
          "Thyroid pill stable — not blaming hashimoto today.",
        patterns: ['thyroid', 'tsh', 'cold'],
        keywords: ['thyroid', 'cold'],
      },
      {
        id: 'fibro',
        answer:
          "Friend fibro tender points — my hurt more shoulder-hip belt.",
        patterns: ['fibromyalgia', 'fibro', 'tender'],
        keywords: ['fibromyalgia', 'fibro'],
      },
      {
        id: 'timing',
        answer:
          "Worsening couple months — denial retired with me.",
        patterns: ['when', 'how long'],
        keywords: ['when', 'long'],
      },
      {
        id: 'family',
        answer:
          "Sister arthritis vague mail — genetics postcard.",
        patterns: ['family', 'history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'meds',
        answer:
          "Vitamins calcium acetaminophen sometimes — no prednisone yet.",
        patterns: ['medication', 'prednisone', 'steroid'],
        keywords: ['med', 'prednisone'],
      },
      {
        id: 'fever',
        answer:
          "Low vague temp days — infection not headline.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'weight',
        answer:
          "Weight stable — appetite comfort.",
        patterns: ['weight', 'loss', 'appetite'],
        keywords: ['weight', 'appetite'],
      },
      {
        id: 'help',
        answer:
          "Heat gentle movement helps — cold car cruel.",
        patterns: ['help', 'worse', 'cold'],
        keywords: ['help', 'worse', 'cold'],
      },
      {
        id: 'rash',
        answer:
          "No rash flags — joint narrative.",
        patterns: ['rash', 'sun'],
        keywords: ['rash', 'sun'],
      },
      {
        id: 'work',
        answer:
          "Volunteer reading kids — stairs getting mean transit.",
        patterns: ['work', 'activity'],
        keywords: ['work', 'activity'],
      },
      {
        id: 'swelling',
        answer:
          "Not giant swollen knees — more ache-stiff belt.",
        patterns: ['swell', 'joint swell'],
        keywords: ['swell', 'joint'],
      },
      {
        id: 'vague',
        answer:
          "Slow questions — fog courtesy.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'rheum-scleroderma-melissa-raynaud',
    titleMatchers: ['fingers change colors', 'cold', 'raynaud'],
    complaintMatchers: ['change color', 'tight', 'hands'],
    defaultAnswer:
      "Cold triggers white-blue-red fingers years — skin shiny tight contractures — reflux swallow stuck drama — winded stairs earlier — feared lung internet spiral.",
    qa: [
      {
        id: 'chief',
        answer:
          "Hands color-shift and feel tight shrink-wrapped — chief complaints fused.",
        patterns: ['what brings', 'chief'],
        keywords: ['bring', 'chief'],
      },
      {
        id: 'raynaud',
        answer:
          "Parking deck white blue red parade — sequence textbook uncanny.",
        patterns: ['raynaud', 'cold', 'color', 'finger'],
        keywords: ['cold', 'color', 'finger'],
      },
      {
        id: 'skin',
        answer:
          "Shiny tight skin fists harder — wedding ring retired sad milestone.",
        patterns: ['skin', 'tight', 'scler'],
        keywords: ['skin', 'tight'],
      },
      {
        id: 'reflux',
        answer:
          "Heartburn stairs not just wings — swallow chicken stuck mid-chest.",
        patterns: ['reflux', 'heartburn', 'swallow', 'gerd'],
        keywords: ['reflux', 'heartburn', 'swallow'],
      },
      {
        id: 'lung',
        answer:
          "Winded stairs sooner — cough rare — scared interstitial rabbit holes.",
        patterns: ['breath', 'lung', 'cough', 'oxygen'],
        keywords: ['breath', 'lung', 'cough'],
      },
      {
        id: 'eye',
        answer:
          "Dry gritty contacts afternoons — drops dependency.",
        patterns: ['eye', 'dry', 'sicca'],
        keywords: ['eye', 'dry'],
      },
      {
        id: 'pain',
        answer:
          "Achy tightening more than RA sausage knuckles friend shows.",
        patterns: ['pain', 'ache', 'joint'],
        keywords: ['pain', 'joint'],
      },
      {
        id: 'timing',
        answer:
          "Raynaud years minimized — tightening undeniable recently.",
        patterns: ['when', 'years', 'progression'],
        keywords: ['when', 'years'],
      },
      {
        id: 'family',
        answer:
          "Aunt thyroid maybe — no scleroderma label spoken.",
        patterns: ['family', 'history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'meds',
        answer:
          "PPI periodic — calcium — immune drug names scare.",
        patterns: ['medication', 'ppi', 'prednisone'],
        keywords: ['med', 'ppi'],
      },
      {
        id: 'stress',
        answer:
          'Tax season accountant — stress oxygen thief.',
        patterns: ['stress', 'work', 'job'],
        keywords: ['stress', 'work'],
      },
      {
        id: 'rash',
        answer:
          "Not lupus malar sun rash — cold vasospasm drama.",
        patterns: ['rash', 'sun', 'lupus'],
        keywords: ['rash', 'sun'],
      },
      {
        id: 'fever',
        answer:
          "No fever storyline — chronic not acute infection.",
        patterns: ['fever', 'infection'],
        keywords: ['fever', 'infection'],
      },
      {
        id: 'weak',
        answer:
          "Grip files harder — weakness shame minimization.",
        patterns: ['weak', 'grip'],
        keywords: ['weak', 'grip'],
      },
      {
        id: 'help',
        answer:
          "Gloves warmers help digits — spicy food reflux enemy.",
        patterns: ['help', 'worse'],
        keywords: ['help', 'worse'],
      },
      {
        id: 'stiff',
        answer:
          "Stiff skin contracture angle — less joint effusion puff.",
        patterns: ['stiff', 'contracture'],
        keywords: ['stiff', 'contracture'],
      },
      {
        id: 'morning',
        answer:
          "Mornings hands wooden — less RA hour gel classic — more rubber suit.",
        patterns: ['morning', 'wake'],
        keywords: ['morning', 'wake'],
      },
      {
        id: 'vague',
        answer:
          "One topic please — emotional bandwidth thin.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
