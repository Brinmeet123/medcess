import type { FallbackScenario } from './types'

export const neurologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'acute-stroke-face-feels-strange',
    titleMatchers: ['face feels strange', 'my face'],
    complaintMatchers: ['face suddenly', 'feels funny'],
    defaultAnswer:
      "My right face went slack at breakfast like Novocain wearing off wrong side — wife said I'm slurring. Right arm heavy lifting coffee. Scared — about fifty minutes till EMS. No fall, no shaking fit. Sugar and BP problems for years — meds sloppy honestly.",
    qa: [
      {
        id: 'chief',
        answer:
          "Face slack right side — wife clocked it before I saw mirror. Words feel sticky coming out. Right arm won't hold coffee like usual.",
        patterns: ['what brought', 'chief', 'problem', 'why here'],
        keywords: ['brought', 'chief', 'problem'],
      },
      {
        id: 'headache',
        answer:
          "Head hurts some tension way — not thunder worst-ever style. Main scare is face and arm honestly.",
        patterns: ['headache', 'head pain'],
        keywords: ['headache', 'head'],
      },
      {
        id: 'weakness',
        answer:
          "Right arm drifts down if I hold both out — sneaky weak. Leg feels okay-ish maybe little heavy unclear.",
        patterns: ['weak', 'strength', 'arm'],
        keywords: ['weak', 'strength', 'arm'],
      },
      {
        id: 'vision',
        answer:
          "Vision seems okay reading clock — no blackout patch like aunt's detached retina story.",
        patterns: ['vision', 'see', 'eye', 'blind'],
        keywords: ['vision', 'see', 'eye'],
      },
      {
        id: 'numbness',
        answer:
          "Right face numb-cotton weird — can feel wife touch but motor wrong. Hand tingling faint.",
        patterns: ['numb', 'tingling'],
        keywords: ['numb', 'tingle'],
      },
      {
        id: 'speech',
        answer:
          "Slushy speech — I hear myself wrong. Wife finishes sentences irritatingly helpful.",
        patterns: ['speech', 'talk', 'slur', 'word'],
        keywords: ['speech', 'talk', 'slur'],
      },
      {
        id: 'dizziness',
        answer:
          "Little swimmy standing quick — not room spinning hours like inner ear junk years ago.",
        patterns: ['dizzy', 'vertigo'],
        keywords: ['dizzy', 'vertigo'],
      },
      {
        id: 'seizure',
        answer:
          "No shaking — conscious whole time weird show except scared.",
        patterns: ['seizure', 'shake', 'convulsion'],
        keywords: ['seizure', 'convulse'],
      },
      {
        id: 'family',
        answer:
          "Mom stroke sixty-five — dad heart attack. Sister migraines not this.",
        patterns: ['family', 'history', 'stroke'],
        keywords: ['family', 'history'],
      },
      {
        id: 'medications',
        answer:
          "Lisinopril sometimes, metformin hit or miss — bad I know. Aspirin sometimes stomach avoids.",
        patterns: ['med', 'medicine', 'pill'],
        keywords: ['med', 'medicine', 'pill'],
      },
      {
        id: 'timing',
        answer:
          "Fifty-some minutes maybe since bite bagel — sudden not crawling week.",
        patterns: ['when', 'start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'onset'],
      },
      {
        id: 'fever',
        answer:
          "No chills infection vibe — thermometer at home normal-ish yesterday.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'balance',
        answer:
          "Walking wobbly from arm-face not ear balance — railing helped hallway.",
        patterns: ['balance', 'walk', 'gait', 'fall'],
        keywords: ['balance', 'walk', 'fall'],
      },
      {
        id: 'helps',
        answer:
          "Nothing helps — sitting still slightly less awful than moving.",
        patterns: ['help', 'relief', 'better'],
        keywords: ['help', 'better', 'relief'],
      },
      {
        id: 'worsens',
        answer:
          "Trying talk louder worse — effort frustrates tears almost.",
        patterns: ['worse', 'trigger'],
        keywords: ['worse', 'trigger'],
      },
      {
        id: 'trauma',
        answer:
          "No hit head — table breakfast calm boring until wasn't.",
        patterns: ['trauma', 'fall', 'hit', 'injury'],
        keywords: ['trauma', 'fall', 'hit'],
      },
      {
        id: 'open',
        answer:
          "Mail route forty years — wanted garden retirement not hospital fluorescent.",
        patterns: ['anything else', 'more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Foggy focusing — one question please.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'migraine-terrible-headaches-samantha',
    titleMatchers: ['terrible headaches', 'keep getting'],
    complaintMatchers: ['headaches shut', 'shut me down'],
    defaultAnswer:
      "Migraine-level hammer builds after zigzag lights — blind spot grows ten minutes then pain nuclear one side. Sound of keyboard kills me — vomit sometimes. Dark bedroom and sleep rescue usually. Between fine — thesis deadline anyway cruel timing.",
    qa: [
      {
        id: 'chief',
        answer:
          "Headaches hijack life — can't read screen, can't teach section. Lights zigzag before pain every few weeks.",
        patterns: ['what brought', 'chief', 'problem'],
        keywords: ['chief', 'problem', 'brought'],
      },
      {
        id: 'headache',
        answer:
          "Throbbing one temple — swaps sometimes feels unfair. Hours long — worst middle.",
        patterns: ['headache', 'pain', 'throb'],
        keywords: ['headache', 'pain', 'throb'],
      },
      {
        id: 'weakness',
        answer:
          "No real arm weakness — exhaustion yes but power normal between attacks.",
        patterns: ['weak'],
        keywords: ['weak'],
      },
      {
        id: 'vision',
        answer:
          "Shimmer curtain jagged edges — can't read through spot. Fades then headache hits.",
        patterns: ['vision', 'aura', 'light', 'zigzag', 'blind'],
        keywords: ['vision', 'aura', 'light', 'see'],
      },
      {
        id: 'numbness',
        answer:
          "Lips tingled once weird — not full hand numbness stroke TV fear.",
        patterns: ['numb'],
        keywords: ['numb'],
      },
      {
        id: 'speech',
        answer:
          "Words mushy mid-attack — before pain mostly okay.",
        patterns: ['speech', 'talk'],
        keywords: ['speech', 'talk'],
      },
      {
        id: 'dizziness',
        answer:
          "Queasy dizzy spiral with nausea — vertigo chronic no.",
        patterns: ['dizzy'],
        keywords: ['dizzy'],
      },
      {
        id: 'seizure',
        answer:
          "Never shook floor unconscious — cousin epilepsy different beast.",
        patterns: ['seizure'],
        keywords: ['seizure'],
      },
      {
        id: 'family',
        answer:
          "Mom 'sick headaches' young — skipped doctor culture. Dad fine.",
        patterns: ['family', 'history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'medications',
        answer:
          "OTC ibuprofen worthless severe ones — prescribed triptan helps half time.",
        patterns: ['med', 'medicine', 'pill'],
        keywords: ['med', 'medicine', 'pill'],
      },
      {
        id: 'timing',
        answer:
          "Two years on and off — stereotyped prodrome then pain clockwork awful.",
        patterns: ['when', 'how long', 'frequency'],
        keywords: ['when', 'long', 'often'],
      },
      {
        id: 'fever',
        answer:
          "No fever with these — different sick.",
        patterns: ['fever'],
        keywords: ['fever'],
      },
      {
        id: 'balance',
        answer:
          "Stumble if head pounding brutal — not cerebellar constant sway.",
        patterns: ['balance', 'walk'],
        keywords: ['balance', 'walk'],
      },
      {
        id: 'helps',
        answer:
          "Dark room cold washcloth silence eventually sleep — caffeine paradox touch during prodrome only.",
        patterns: ['help', 'relief', 'better'],
        keywords: ['help', 'relief', 'better'],
      },
      {
        id: 'worsens',
        answer:
          "Stress exam week LED screens perfume hallway — roommate candle rage.",
        patterns: ['worse', 'trigger'],
        keywords: ['worse', 'trigger', 'stress'],
      },
      {
        id: 'red-flag',
        answer:
          "Never instant worst-ever ten-ten — grateful small favor scared reading WebMD.",
        patterns: ['worst', 'sudden', 'thunderclap'],
        keywords: ['worst', 'sudden', 'thunder'],
      },
      {
        id: 'open',
        answer:
          "Statistics brain ironic disease variable — advisor unsympathetic deadlines.",
        patterns: ['anything else', 'more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — lights sound bothering even answering.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'parkinson-hands-shaking-harold',
    titleMatchers: ['hands keep shaking', 'hand tremor'],
    complaintMatchers: ['tremor keeps', 'shaking'],
    defaultAnswer:
      "Right hand rolls pills in lap watching news — worse rest than eating soup. Buttons warfare. Face quiet wife says — walking smaller steps. Engineer hates imprecision year creeping symptoms.",
    qa: [
      {
        id: 'chief',
        answer:
          "Tremor embarrassing restaurant — rest worse than purposeful screwdriving oddly.",
        patterns: ['what brought', 'chief'],
        keywords: ['chief', 'brought'],
      },
      {
        id: 'headache',
        answer:
          "No notable headaches — not why I'm here.",
        patterns: ['headache'],
        keywords: ['headache'],
      },
      {
        id: 'weakness',
        answer:
          "Not weak numb stroke — slow small movements micro second delay.",
        patterns: ['weak', 'slow'],
        keywords: ['weak', 'slow'],
      },
      {
        id: 'vision',
        answer:
          "Reading fine glasses updated — no double vision.",
        patterns: ['vision'],
        keywords: ['vision'],
      },
      {
        id: 'numbness',
        answer:
          "No stocking numbness — peripheral neuropathy coworker has different.",
        patterns: ['numb'],
        keywords: ['numb'],
      },
      {
        id: 'speech',
        answer:
          "Voice softer wife leans in — not slurred stroke.",
        patterns: ['speech', 'voice'],
        keywords: ['speech', 'voice'],
      },
      {
        id: 'dizziness',
        answer:
          "Standing quick mild woozy — orthostatic maybe age.",
        patterns: ['dizzy'],
        keywords: ['dizzy'],
      },
      {
        id: 'seizure',
        answer:
          "Never seizure — conscious through tremor annoyance.",
        patterns: ['seizure'],
        keywords: ['seizure'],
      },
      {
        id: 'family',
        answer:
          "Father essential tremor cocktails helped culturally — mine rest not action.",
        patterns: ['family', 'history', 'tremor'],
        keywords: ['family', 'history'],
      },
      {
        id: 'medications',
        answer:
          "Metoclopramide cruise years back nausea — none recent. Statins long time.",
        patterns: ['med', 'medicine'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'timing',
        answer:
          "Year gradual — maybe eighteen months noticing slope.",
        patterns: ['when', 'long', 'progress'],
        keywords: ['when', 'long', 'progress'],
      },
      {
        id: 'fever',
        answer:
          "No fever infection story.",
        patterns: ['fever'],
        keywords: ['fever'],
      },
      {
        id: 'balance',
        answer:
          "Turning tight hallway brush wall sometimes — festination learned word daughter googled.",
        patterns: ['balance', 'gait', 'walk', 'fall'],
        keywords: ['balance', 'gait', 'walk', 'fall'],
      },
      {
        id: 'helps',
        answer:
          "Moving hand task briefly dampens tremor — alcohol occasional same not recommending.",
        patterns: ['help', 'better', 'alcohol'],
        keywords: ['help', 'better', 'alcohol'],
      },
      {
        id: 'worsens',
        answer:
          "Stress public observation worse — cold exam room paradox calms joke.",
        patterns: ['worse', 'stress'],
        keywords: ['worse', 'stress'],
      },
      {
        id: 'smell',
        answer:
          "Whiff test coffee weak maybe — didn't catalog before spouse noticed.",
        patterns: ['smell', 'odor'],
        keywords: ['smell', 'odor'],
      },
      {
        id: 'open',
        answer:
          "Micrographia signature shaky — contracts unreadable embarrassment.",
        patterns: ['write', 'handwriting', 'more'],
        keywords: ['write', 'sign', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Engineer precision failing body — frustrating topic.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'seizure-at-school-noah',
    titleMatchers: ['seizure at school', 'collapsed'],
    complaintMatchers: ['collapsed', 'shaking'],
    defaultAnswer:
      "Assembly standing tunnel vision — woke floor metallic blood taste. Teachers said jerked both sides tongue mess. Foggy hour names slow. Never before sixteen scared girlfriend texting fifty times.",
    qa: [
      {
        id: 'chief',
        answer:
          "Mom filling forms — I remember assembly fuzzy then gym lights ceiling.",
        patterns: ['what brought', 'chief', 'parent'],
        keywords: ['brought', 'chief', 'happened'],
      },
      {
        id: 'headache',
        answer:
          "Headache after pounding — slept afternoon.",
        patterns: ['headache'],
        keywords: ['headache'],
      },
      {
        id: 'weakness',
        answer:
          "Jelly legs rest day — not paralyzed stroke uncle.",
        patterns: ['weak'],
        keywords: ['weak'],
      },
      {
        id: 'vision',
        answer:
          "Black tunnel before drop — seizure? faint? scary blur.",
        patterns: ['vision', 'blackout'],
        keywords: ['vision', 'black', 'tunnel'],
      },
      {
        id: 'numbness',
        answer:
          "Tongue sore numb side bite — gross details.",
        patterns: ['numb', 'tongue'],
        keywords: ['numb', 'tongue'],
      },
      {
        id: 'speech',
        answer:
          "Slurred hour post weird — teachers thought drugs insulting.",
        patterns: ['speech', 'confusion'],
        keywords: ['speech', 'confuse'],
      },
      {
        id: 'dizziness',
        answer:
          "Lightheaded before maybe — choir faint stereotype feared.",
        patterns: ['dizzy', 'faint', 'syncope'],
        keywords: ['dizzy', 'faint', 'syncope'],
      },
      {
        id: 'seizure',
        answer:
          "Witnessed shaking both arms legs — bit tongue side bloody.",
        patterns: ['seizure', 'shake', 'convulsion', 'witness'],
        keywords: ['seizure', 'shake', 'convulse'],
      },
      {
        id: 'family',
        answer:
          "Uncle epilepsy meds — parents scared genetic blame themselves.",
        patterns: ['family', 'history', 'epilepsy'],
        keywords: ['family', 'history', 'epilepsy'],
      },
      {
        id: 'medications',
        answer:
          "No ADHD stimulants — clean dermatology cream only.",
        patterns: ['med', 'drug'],
        keywords: ['med', 'drug'],
      },
      {
        id: 'timing',
        answer:
          "First time ever this morning — timeline hours ago still tired.",
        patterns: ['when', 'first', 'prior'],
        keywords: ['when', 'first', 'before'],
      },
      {
        id: 'fever',
        answer:
          "No sick fever — not meningitis cartoon stiff neck.",
        patterns: ['fever'],
        keywords: ['fever'],
      },
      {
        id: 'balance',
        answer:
          "Unsteady walking discharge — brother arm steady joke.",
        patterns: ['balance', 'walk'],
        keywords: ['balance', 'walk'],
      },
      {
        id: 'helps',
        answer:
          "Sleep helped fog — Gatorade tasted okay.",
        patterns: ['help', 'better'],
        keywords: ['help', 'better'],
      },
      {
        id: 'worsens',
        answer:
          "Flashing assembly lights maybe trigger guess — pure speculation.",
        patterns: ['worse', 'trigger'],
        keywords: ['worse', 'trigger'],
      },
      {
        id: 'substance',
        answer:
          "No weed party last night — debate team nerds swear.",
        patterns: ['alcohol', 'drug', 'marijuana', 'party'],
        keywords: ['alcohol', 'drug', 'weed'],
      },
      {
        id: 'open',
        answer:
          "Driving learner permit terror now — license future dream crushed dramatic teen.",
        patterns: ['anything else', 'more', 'school'],
        keywords: ['else', 'school', 'drive'],
      },
      {
        id: 'vague',
        answer:
          "Embarrassed hallway gossip — short answers okay?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'ms-vision-legs-relapsing-rachel',
    titleMatchers: ['vision gets weird', 'legs feel weak'],
    complaintMatchers: ['come and go', 'symptoms come'],
    defaultAnswer:
      "Left eye color washout painful moving eyeball winter — improved. Spring right leg drags stairs numb band. Fatigue screen work brutal — aunt lupus shadow scares. Flare calm flare unfair whack-a-mole year.",
    qa: [
      {
        id: 'chief',
        answer:
          "Episodes stack not linear — vision leg sensory roulette exhausting explaining bosses.",
        patterns: ['what brought', 'chief', 'problem'],
        keywords: ['chief', 'problem', 'brought'],
      },
      {
        id: 'headache',
        answer:
          "Headache mild eye episode — not migraine bomb usually.",
        patterns: ['headache'],
        keywords: ['headache'],
      },
      {
        id: 'weakness',
        answer:
          "Right leg hip flexor weak flare — foot drop scary stairs.",
        patterns: ['weak', 'leg', 'walk'],
        keywords: ['weak', 'leg', 'walk'],
      },
      {
        id: 'vision',
        answer:
          "One eye color dull Central Park autumn photo looked gray sad — ache looking lateral.",
        patterns: ['vision', 'eye', 'blur', 'color'],
        keywords: ['vision', 'eye', 'blur', 'color'],
      },
      {
        id: 'numbness',
        answer:
          "Band numb knee down buzzing — Lhermitte sparkles neck bend sometimes.",
        patterns: ['numb', 'tingle', 'sensory'],
        keywords: ['numb', 'tingle', 'sensory'],
      },
      {
        id: 'speech',
        answer:
          "Word-find fog fatigue afternoon — not stroke slurred.",
        patterns: ['speech', 'word', 'cog'],
        keywords: ['speech', 'word', 'fog'],
      },
      {
        id: 'dizziness',
        answer:
          "Off-balance heat shower worse — hot yoga disaster guessed.",
        patterns: ['dizzy', 'heat', 'uhthoff'],
        keywords: ['dizzy', 'heat', 'hot'],
      },
      {
        id: 'seizure',
        answer:
          "Never seizure activity — grateful lottery ticket.",
        patterns: ['seizure'],
        keywords: ['seizure'],
      },
      {
        id: 'family',
        answer:
          "Aunt lupus butterfly rash — ANA obsession reading forums unhealthy.",
        patterns: ['family', 'lupus', 'autoimmune'],
        keywords: ['family', 'lupus', 'autoimmune'],
      },
      {
        id: 'medications',
        answer:
          "Birth control years — neurologist once asked if I was on anything hormonal; shrugged it off then.",
        patterns: ['med', 'medicine', 'pill'],
        keywords: ['med', 'pill', 'birth'],
      },
      {
        id: 'timing',
        answer:
          "Months relapsing remitting — partial recovery between cruel teaser.",
        patterns: ['when', 'how long', 'episodes'],
        keywords: ['when', 'long', 'episode'],
      },
      {
        id: 'fever',
        answer:
          "No infection fever pattern — different chronic.",
        patterns: ['fever'],
        keywords: ['fever'],
      },
      {
        id: 'balance',
        answer:
          "Tandem walk failed neuro borrowed clipboard — pride hurt worse.",
        patterns: ['balance', 'gait'],
        keywords: ['balance', 'gait'],
      },
      {
        id: 'helps',
        answer:
          "Rest steroid pack primary helped eye faster — unofficial cousin leftover wrong don't tell.",
        patterns: ['help', 'steroid', 'better'],
        keywords: ['help', 'better', 'steroid'],
      },
      {
        id: 'worsens',
        answer:
          "Deadline stress heat screens vibration commute subway hate.",
        patterns: ['worse', 'trigger', 'stress'],
        keywords: ['worse', 'stress', 'trigger'],
      },
      {
        id: 'bladder',
        answer:
          "Bathroom urgency flare once — scared spinal cord drama.",
        patterns: ['bladder', 'bowel', 'urine'],
        keywords: ['bladder', 'urine', 'bathroom'],
      },
      {
        id: 'open',
        answer:
          "Graphic design color career irony eye symptoms cruel joke universe.",
        patterns: ['anything else', 'work', 'more'],
        keywords: ['else', 'work', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Symptom laundry list overwhelms me listing — guided questions help.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
