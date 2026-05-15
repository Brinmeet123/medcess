import type { FallbackScenario } from './types'

export const geriatricsFallbackScenarios: FallbackScenario[] = [
  {
    key: 'geriatrics-delirium-uti-margaret-russo',
    titleMatchers: ['grandma has been more confused', 'more confused today'],
    complaintMatchers: ['not quite myself', 'foggy', 'daughter worried'],
    defaultAnswer:
      "I'm muddled today — not my usual sharp self. I've been running to the bathroom more for days. My daughter says I wasn't like this earlier this week.",
    qa: [
      {
        id: 'collateral',
        answer:
          "My daughter Carla says I was fine on the phone three days ago. This morning I mixed up the date and kept falling asleep mid-conversation — that's not me.",
        patterns: ['daughter', 'family', 'caregiver', 'who brought'],
        keywords: ['daughter', 'family', 'noticed'],
      },
      {
        id: 'confusion',
        answer:
          "I feel fuzzy and slow. Words don't line up right. I know something's wrong but I can't track every detail you're asking.",
        patterns: ['confus', 'orient', 'memory', 'thinking'],
        keywords: ['confusion', 'memory', 'orient'],
      },
      {
        id: 'urinary',
        answer:
          "More urgency and frequency for several days — embarrassingly often. Burning isn't the main thing; it's the rushing feeling.",
        patterns: ['urin', 'bladder', 'uti', 'bathroom'],
        keywords: ['urinary', 'bladder', 'frequency'],
      },
      {
        id: 'timing',
        answer:
          "The big change my family saw was today — maybe hints yesterday, but not a week of this. That's what's scaring them.",
        patterns: ['when', 'start', 'onset', 'today'],
        keywords: ['timing', 'today', 'when'],
      },
      {
        id: 'fever',
        answer:
          "Felt flushed and chilly — I don't know numbers. Carla thought I had a fever when she hugged me.",
        patterns: ['fever', 'temperature', 'hot', 'chill'],
        keywords: ['fever', 'temperature', 'chills'],
      },
      {
        id: 'baseline',
        answer:
          "I live alone, drive locally, manage my own medications normally — until today I didn't need this much help.",
        patterns: ['baseline', 'usual', 'independent', 'function'],
        keywords: ['baseline', 'independent', 'usual'],
      },
      {
        id: 'medications',
        answer:
          "Lisinopril, metformin, calcium — same routine long time. Nothing new I recall, but I'm fuzzy on specifics today.",
        patterns: ['medication', 'medicine', 'pill', 'lisinopril'],
        keywords: ['medications', 'pills', 'meds'],
      },
      {
        id: 'falls',
        answer:
          "No fall today and no head bump I'm aware of. A little unsteady standing fast — I grab the rail.",
        patterns: ['fall', 'fell', 'head injury'],
        keywords: ['falls', 'fall', 'injury'],
      },
      {
        id: 'pain',
        answer:
          "Low belly discomfort more than sharp pain, especially when my bladder is full. Generally achy but not screaming pain.",
        patterns: ['pain', 'hurt', 'tender'],
        keywords: ['pain', 'hurts'],
      },
      {
        id: 'sleep',
        answer:
          "Sleepier than usual — nodding off in the chair. Last night wasn't great but today is different.",
        patterns: ['sleep', 'drowsy', 'tired'],
        keywords: ['sleep', 'drowsy'],
      },
      {
        id: 'eating',
        answer:
          "Barely touched breakfast — not very hungry. Sipped some water because Carla kept reminding me.",
        patterns: ['eat', 'appetite', 'food'],
        keywords: ['eating', 'appetite'],
      },
      {
        id: 'walking',
        answer:
          "I usually walk fine. Today I held Carla's arm coming in — felt weak, not just lazy.",
        patterns: ['walk', 'mobility', 'stairs'],
        keywords: ['walking', 'mobility'],
      },
      {
        id: 'dizziness',
        answer:
          "Lightheaded if I pop up too fast — not spinning vertigo. I pause and it eases.",
        patterns: ['dizz', 'lightheaded'],
        keywords: ['dizzy', 'lightheaded'],
      },
      {
        id: 'familyhx',
        answer:
          "Parents older cardiac and stroke history — nothing quite like this confusion story that I remember.",
        patterns: ['family history', 'parents', 'mother', 'father'],
        keywords: ['family', 'history'],
      },
      {
        id: 'betterworse',
        answer:
          "Quiet and slower questions help. Chaos and rushing make it harder to stay with you.",
        patterns: ['worse', 'better', 'relief'],
        keywords: ['better', 'worse'],
      },
      {
        id: 'hello',
        answer:
          "Hello — I'm sorry, I'm not myself today. My family insisted we come in.",
        patterns: ['hello', 'hi ', 'hey'],
        keywords: ['hello', 'hi'],
      },
    ],
  },
  {
    key: 'geriatrics-alzheimer-harold-green',
    titleMatchers: ['dad keeps forgetting', 'forgetting things'],
    complaintMatchers: ['repeat', 'misplace', 'finances'],
    defaultAnswer:
      "I've been misplacing things and repeating myself — embarrassing for a former accountant. It's been gradual over a couple of years, not sudden.",
    qa: [
      {
        id: 'collateral',
        answer:
          "Daniel here — Dad repeats questions in the same visit and forgot passwords he used for a decade. I found unpaid notices he'd usually catch instantly.",
        patterns: ['son', 'family', 'daniel', 'caregiver'],
        keywords: ['son', 'family'],
      },
      {
        id: 'memory',
        answer:
          "Short-term memory is the hole — keys, glasses, why I walked into the kitchen. Long-ago stories I can still tell, weirdly.",
        patterns: ['memory', 'forget', 'repeat'],
        keywords: ['memory', 'forgetting'],
      },
      {
        id: 'timing',
        answer:
          "Roughly two years of slipping — steeper lately with bills and tech stuff, but no one bad afternoon that started it all.",
        patterns: ['when', 'start', 'how long', 'gradual'],
        keywords: ['timing', 'progressive'],
      },
      {
        id: 'finance',
        answer:
          "Taxes and online banking spook me now — I second guess numbers I used to own. Daniel supervises transfers.",
        patterns: ['financ', 'bills', 'bank'],
        keywords: ['finances', 'money'],
      },
      {
        id: 'baseline',
        answer:
          "I showered alone and cooked simple meals until recently. Shopping lists duplicated items — son noticed before I fully did.",
        patterns: ['baseline', 'adl', 'independent'],
        keywords: ['baseline', 'independent'],
      },
      {
        id: 'walking',
        answer:
          "Still walk the block mornings — no cane, no falls. Legs aren't the problem.",
        patterns: ['walk', 'fall', 'mobility'],
        keywords: ['walking', 'falls'],
      },
      {
        id: 'confusion-acute',
        answer:
          "No sudden slurred speech or one-sided weakness — not a \"wake up stroked\" story. This has been slow.",
        patterns: ['stroke', 'sudden', 'weak'],
        keywords: ['stroke', 'sudden'],
      },
      {
        id: 'mood',
        answer:
          "Frustrated and a little depressed about losing skills — but I still enjoy football Sundays, just less sharp bantering.",
        patterns: ['mood', 'depress', 'sad'],
        keywords: ['mood', 'depression'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep okay — up once for bathroom. Weekend naps increased but not insomnia hell.",
        patterns: ['sleep', 'insomnia'],
        keywords: ['sleep'],
      },
      {
        id: 'medications',
        answer:
          "Atorvastatin and amlodipine only — no sleepers or antihistamine cocktails regularly.",
        patterns: ['medication', 'medicine', 'pill'],
        keywords: ['medications', 'pills'],
      },
      {
        id: 'eating',
        answer:
          "Appetite normal — maybe a few pounds up from sitting more. No GI red flags.",
        patterns: ['eat', 'appetite', 'weight'],
        keywords: ['eating', 'weight'],
      },
      {
        id: 'familyhx',
        answer:
          "Aunt late-life memory issues vaguely — no young-onset dementia family saga I know of.",
        patterns: ['family history', 'dementia'],
        keywords: ['family', 'history'],
      },
      {
        id: 'dizziness',
        answer:
          "No chronic dizziness — not the issue bringing me here.",
        patterns: ['dizz', 'lightheaded'],
        keywords: ['dizziness'],
      },
      {
        id: 'pain',
        answer:
          "Mild shoulder stiffness — not bad headaches. Pain isn't driving this visit.",
        patterns: ['pain', 'headache'],
        keywords: ['pain'],
      },
      {
        id: 'betterworse',
        answer:
          "Writing lists helps short term. Multitasking and rushing make repeats obvious faster — embarrassing.",
        patterns: ['better', 'worse', 'help'],
        keywords: ['better', 'worse'],
      },
      {
        id: 'hello',
        answer:
          "Hi — my son wanted me evaluated because I keep losing track and repeating stories.",
        patterns: ['hello', 'hi ', 'hey'],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'geriatrics-orthostatic-falls-richard-bennett',
    titleMatchers: ['fell again last night', 'fell again'],
    complaintMatchers: ['dizzy', 'orthostatic', 'falls'],
    defaultAnswer:
      "I get lightheaded standing up — had a few stumbles last months after they bumped my water pill. I never fully passed out.",
    qa: [
      {
        id: 'dizziness',
        answer:
          "Dim vision for seconds when I stand — bracing on furniture. Worse since diuretic dose went up.",
        patterns: ['dizz', 'lightheaded', 'standing'],
        keywords: ['dizzy', 'standing'],
      },
      {
        id: 'falls',
        answer:
          "Three near-falls lately — grabbed counters, bruised a knee. No head strikes I know of.",
        patterns: ['fall', 'fell', 'injury'],
        keywords: ['falls', 'fell'],
      },
      {
        id: 'medications',
        answer:
          "HCTZ recently increased, plus metoprolol and tamsulosin. I wondered if that's stacking to drop my pressure.",
        patterns: ['medication', 'hydrochlorothiazide', 'metoprolol', 'tamsulosin'],
        keywords: ['medications', 'pills'],
      },
      {
        id: 'syncope',
        answer:
          "Gray-out, sit fast — not minutes unconscious on the floor.",
        patterns: ['syncope', 'blackout', 'loss of consciousness'],
        keywords: ['syncope', 'blackout'],
      },
      {
        id: 'timing',
        answer:
          "Three months of this pattern, worsening since clinic changed BP meds — lines up for me.",
        patterns: ['when', 'how long', 'start'],
        keywords: ['timing', 'months'],
      },
      {
        id: 'walking',
        answer:
          "Cane for bad knee days — indoor independence usually. Stairs slower, hugging rails more now.",
        patterns: ['walk', 'cane', 'mobility'],
        keywords: ['walking', 'mobility'],
      },
      {
        id: 'baseline',
        answer:
          "Before this I wasn't grabbing walls every morning — still walked to the mailbox fine.",
        patterns: ['baseline', 'before', 'function'],
        keywords: ['baseline', 'before'],
      },
      {
        id: 'confusion',
        answer:
          "Thinking clear — not confused like delirium. It's positional blood pressure stuff as far as I can tell.",
        patterns: ['confus', 'memory'],
        keywords: ['confusion', 'memory'],
      },
      {
        id: 'family',
        answer:
          "Daughter noticed me swaying after standing from dinner — worried about nighttime falls alone.",
        patterns: ['family', 'daughter'],
        keywords: ['family', 'daughter'],
      },
      {
        id: 'fluids',
        answer:
          "Could drink more water — coffee first, forget after. Meals normal appetite.",
        patterns: ['fluid', 'drink', 'dehydrat'],
        keywords: ['fluids', 'water'],
      },
      {
        id: 'sleep',
        answer:
          "Bathroom trips interrupt sleep — prostate, you know. Still ~six hours most nights.",
        patterns: ['sleep'],
        keywords: ['sleep'],
      },
      {
        id: 'pain-chest',
        answer:
          "No classic chest pressure with the dizziness — arthritis shoulders separate issue.",
        patterns: ['chest pain', 'pain'],
        keywords: ['pain', 'chest'],
      },
      {
        id: 'familyhx',
        answer:
          "Dad \"heart rhythm\" problems vague. Siblings older with hypertension.",
        patterns: ['family history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'eating',
        answer:
          "Eating fine — not nauseated. Dizziness isn't after meals specifically.",
        patterns: ['eat', 'appetite'],
        keywords: ['eating', 'appetite'],
      },
      {
        id: 'betterworse',
        answer:
          "Sitting and slow changes of position help. Hot shower standing fast makes it worse.",
        patterns: ['better', 'worse', 'help'],
        keywords: ['better', 'worse'],
      },
      {
        id: 'hello',
        answer:
          "Hey — dizzy standing and a few recent stumbles brought me in.",
        patterns: ['hello', 'hi ', 'hey'],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'geriatrics-failure-thrive-dorothy-mitchell',
    titleMatchers: ["haven't been eating", 'eating much', 'failure to thrive'],
    complaintMatchers: ['lost weight', 'appetite', 'weak'],
    defaultAnswer:
      "I'm not hungry like I used to be — clothes hang loose. My granddaughter worries I skip meals when I'm alone.",
    qa: [
      {
        id: 'collateral',
        answer:
          "Priya here — she's lost noticeable weight and naps through lunch. I find moldy leftovers — she forgets she cooked.",
        patterns: ['granddaughter', 'priya', 'family'],
        keywords: ['granddaughter', 'family'],
      },
      {
        id: 'eating',
        answer:
          "Food tastes blah — small portions. Scale dropping scares me but I don't feel driven to eat.",
        patterns: ['eat', 'appetite', 'food', 'weight'],
        keywords: ['eating', 'appetite'],
      },
      {
        id: 'walking',
        answer:
          "Legs weak on stairs with laundry — I used to walk to book club. Handrails mandatory now.",
        patterns: ['walk', 'stairs', 'mobility', 'weak'],
        keywords: ['walking', 'weakness'],
      },
      {
        id: 'pain-abdomen',
        answer:
          "No real abdominal pain or vomiting — not hiding classic obstruction symptoms.",
        patterns: ['pain', 'abdom', 'nausea'],
        keywords: ['pain', 'abdomen'],
      },
      {
        id: 'falls',
        answer:
          "No major falls — fear keeps me cautious before I go down.",
        patterns: ['fall', 'fell'],
        keywords: ['falls'],
      },
      {
        id: 'mood',
        answer:
          "Book club dropped off — hard to finish novels I loved. Maybe depression overlaps — unsure.",
        patterns: ['mood', 'depress', 'interest'],
        keywords: ['mood', 'depression'],
      },
      {
        id: 'memory',
        answer:
          "Forget if I ate lunch — Priya thinks that's why I skip food sometimes.",
        patterns: ['memory', 'forget', 'confus'],
        keywords: ['memory', 'confusion'],
      },
      {
        id: 'medications',
        answer:
          "Furosemide, metoprolol, omeprazole, levothyroxine — many moving parts — plus Tylenol PRN and occasional diphenhydramine sleep aid from the store.",
        patterns: ['medication', 'pill', 'diphenhydramine'],
        keywords: ['medications', 'pills'],
      },
      {
        id: 'sleep',
        answer:
          "Fragmented sleep — OTC sleep aid some nights I know I shouldn't lean on.",
        patterns: ['sleep', 'insomnia'],
        keywords: ['sleep'],
      },
      {
        id: 'baseline',
        answer:
          "Six months ago still cooking daily and walking further — energy fell off since.",
        patterns: ['baseline', 'before', 'active'],
        keywords: ['baseline', 'before'],
      },
      {
        id: 'familyhx',
        answer:
          "Mom died with something abdominal — vague on details. Fear of \"bad news\" lurks with weight loss.",
        patterns: ['family history', 'cancer'],
        keywords: ['family', 'history'],
      },
      {
        id: 'dizziness',
        answer:
          "Mild dizzy standing but not the headline — weakness and intake are.",
        patterns: ['dizz'],
        keywords: ['dizziness'],
      },
      {
        id: 'timing',
        answer:
          "Four to six months decline — gradual clothes fitting differently, less socializing.",
        patterns: ['when', 'how long'],
        keywords: ['timing', 'months'],
      },
      {
        id: 'betterworse',
        answer:
          "Priya visiting with small meals helps weekends — worse alone when I skip cooking motivation.",
        patterns: ['better', 'worse', 'help'],
        keywords: ['better', 'worse'],
      },
      {
        id: 'confusion-delirium',
        answer:
          "Not acutely flopping confused today — more chronic low energy and forgetful meals.",
        patterns: ['delirium', 'acute'],
        keywords: ['confusion', 'acute'],
      },
      {
        id: 'hello',
        answer:
          "Hello — I'm eating poorly and losing weight my family noticed.",
        patterns: ['hello', 'hi ', 'hey'],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'geriatrics-stroke-eleanor-foster',
    titleMatchers: ["suddenly can't move my arm", 'move my arm'],
    complaintMatchers: ['drooped', 'slurred', 'weakness'],
    defaultAnswer:
      "My face and right arm failed me at breakfast — speech thick. Daughter saw it start and called 911. I'm frightened.",
    qa: [
      {
        id: 'collateral',
        answer:
          "I'm her daughter — right face droop, slurred speech, right arm wouldn't lift. I wrote the time down for EMS.",
        patterns: ['daughter', 'family', 'witness'],
        keywords: ['daughter', 'witnessed'],
      },
      {
        id: 'timing',
        answer:
          "Sudden at the table — maybe 45 minutes before we arrived here. Last-known-normal was basically right before the face changed.",
        patterns: ['when', 'onset', 'time', 'minutes'],
        keywords: ['timing', 'onset'],
      },
      {
        id: 'weakness',
        answer:
          "Right arm heavy — hard to squeeze your hand. Face feels uneven smiling.",
        patterns: ['weak', 'arm', 'face', 'droo'],
        keywords: ['weakness', 'arm', 'face'],
      },
      {
        id: 'warfarin',
        answer:
          "Warfarin forever for AFib — INR usually tracked but today's chaos; you'll need labs before anything invasive.",
        patterns: ['warfarin', 'coumadin', 'blood thinner', 'inr'],
        keywords: ['warfarin', 'inr'],
      },
      {
        id: 'headache',
        answer:
          "No worst-headache-of-life story — tension from fear maybe, not thunderclap how I learned SAH.",
        patterns: ['headache', 'thunderclap'],
        keywords: ['headache'],
      },
      {
        id: 'seizure',
        answer:
          "No convulsions — weakness without shaking episode.",
        patterns: ['seizure', 'shake'],
        keywords: ['seizure'],
      },
      {
        id: 'vision',
        answer:
          "Tracking feels sloppy to the right — hard to separate anxiety from true field cut.",
        patterns: ['vision', 'see', 'field'],
        keywords: ['vision'],
      },
      {
        id: 'walking',
        answer:
          "Didn't walk in — weakness too risky. No fall before EMS.",
        patterns: ['walk', 'fall'],
        keywords: ['walking', 'fall'],
      },
      {
        id: 'baseline',
        answer:
          "Independent ADLs before — cooked, meds organized. This is a cliff event.",
        patterns: ['baseline', 'before', 'independent'],
        keywords: ['baseline', 'independent'],
      },
      {
        id: 'memory',
        answer:
          "Scattered from fear but I know who I am and why I'm here — problem is motor and speech mainly.",
        patterns: ['memory', 'confus'],
        keywords: ['memory', 'confusion'],
      },
      {
        id: 'medications',
        answer:
          "Warfarin and metoprolol steady — no new street meds nonsense.",
        patterns: ['medication', 'metoprolol'],
        keywords: ['medications'],
      },
      {
        id: 'pain',
        answer:
          "Mostly distress not pain — shoulder aches holding it oddly.",
        patterns: ['pain'],
        keywords: ['pain'],
      },
      {
        id: 'familyhx',
        answer:
          "Sister stroke at 78 partial recovery — makes this scarier watching myself.",
        patterns: ['family history', 'stroke'],
        keywords: ['family', 'history'],
      },
      {
        id: 'bloodpressure',
        answer:
          "Runs high historically — EMS said elevated today; exact numbers fuzzy to me mid-crisis.",
        patterns: ['blood pressure', 'hypertension'],
        keywords: ['pressure', 'blood'],
      },
      {
        id: 'sleep',
        answer:
          "Slept fine overnight — not wake-up weak. Sudden at breakfast.",
        patterns: ['sleep'],
        keywords: ['sleep'],
      },
      {
        id: 'glucose',
        answer:
          "Ate toast — not fasting hypoglycemia story.",
        patterns: ['glucose', 'sugar', 'hypogly'],
        keywords: ['glucose', 'sugar'],
      },
      {
        id: 'betterworse',
        answer:
          "Calm single-topic questions help me answer— rushing makes speech worse.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'better'],
      },
      {
        id: 'hello',
        answer:
          "Hello — my face and arm went wrong suddenly this morning.",
        patterns: ['hello', 'hi ', 'hey'],
        keywords: ['hello'],
      },
    ],
  },
]
