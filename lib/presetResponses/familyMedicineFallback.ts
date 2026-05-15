import type { FallbackScenario } from './types'

export const familyMedicineFallbackScenarios: FallbackScenario[] = [
  {
    key: 'iron-deficiency-tired-months',
    titleMatchers: ['tired for months', 'been tired'],
    complaintMatchers: ['exhausted', 'no matter how much i sleep'],
    defaultAnswer:
      "I'm exhausted no matter how much I sleep — four months of dragging through school days. Stairs to my classroom wind me. Periods got heavy since my IUD came out, and I weirdly crunch ice from the cafeteria.",
    qa: [
      {
        id: 'chief',
        answer:
          "I feel exhausted all the time — that's why I'm here. I sleep eight hours and wake up tired. Teaching first graders takes everything I have lately.",
        patterns: ['what brought you', 'chief', 'problem', 'exhausted', 'tired'],
        keywords: ['exhausted', 'tired', 'brought', 'problem'],
      },
      {
        id: 'onset',
        answer:
          "Maybe four months — gradual. Thought it was end-of-year stress at first, but summer didn't fix it.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'months'],
      },
      {
        id: 'fatigue-exertion',
        answer:
          "Short of breath climbing stairs to my room — used to carry supply bins fine. Dizzy if I stand up fast from the rug with kids.",
        patterns: ['short of breath', 'dizzy', 'weak', 'stairs', 'exercise'],
        keywords: ['breath', 'dizzy', 'weak', 'stairs', 'exercise'],
      },
      {
        id: 'menstrual',
        answer:
          "Periods are heavy — I change pads hourly some days since the IUD came out last year. Clots sometimes, not huge but more than before.",
        patterns: ['period', 'menstrual', 'bleeding', 'menses'],
        keywords: ['period', 'menstrual', 'bleeding', 'menses'],
      },
      {
        id: 'pica',
        answer:
          "I crave chewing ice — cafeteria ice machine, weird I know. Not dirt or anything, just ice crunching.",
        patterns: ['craving', 'pica', 'ice', 'eat strange'],
        keywords: ['craving', 'pica', 'ice', 'eat'],
      },
      {
        id: 'chest-fever',
        answer:
          "No chest pain — heart doesn't hurt. No fever, not sick like flu.",
        patterns: ['chest pain', 'fever', 'heart attack'],
        keywords: ['chest', 'fever', 'heart'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep enough hours — quality feels okay, I just wake up drained. Not insomnia really.",
        patterns: ['sleep', 'insomnia', 'rest'],
        keywords: ['sleep', 'insomnia', 'rest'],
      },
      {
        id: 'mood',
        answer:
          "Mood's okay — frustrated I'm tired, not really depressed. I still laugh with coworkers when I have energy.",
        patterns: ['mood', 'depress', 'sad'],
        keywords: ['mood', 'depress', 'sad'],
      },
      {
        id: 'meds',
        answer:
          "Multivitamin sometimes, no regular prescriptions. Tried extra sleep — didn't help.",
        patterns: ['medication', 'medicine', 'vitamin'],
        keywords: ['med', 'medicine', 'vitamin'],
      },
      {
        id: 'family',
        answer:
          "Mom had thyroid issues — on a pill. Sister healthy. No bleeding disorders I know of.",
        patterns: ['family', 'relative', 'thyroid'],
        keywords: ['family', 'relative', 'thyroid'],
      },
      {
        id: 'diet',
        answer:
          "I eat normal — chicken, rice, veggies. Not vegetarian. Maybe light on red meat lately, no special diet.",
        patterns: ['diet', 'eat', 'meat', 'vegetarian'],
        keywords: ['diet', 'eat', 'meat', 'food'],
      },
      {
        id: 'pregnancy',
        answer:
          "Pretty sure I'm not pregnant — periods still come monthly, just heavy. No morning sickness.",
        patterns: ['pregnant', 'pregnancy', 'missed period'],
        keywords: ['pregnant', 'pregnancy', 'period'],
      },
      {
        id: 'worse-better',
        answer:
          "Resting weekend helps a little — Monday back to wiped. Coffee only gets me to lunch.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'better', 'help'],
      },
      {
        id: 'pain',
        answer:
          "No joint pain — just heaviness and breathless on stairs.",
        patterns: ['pain', 'hurt', 'ache'],
        keywords: ['pain', 'hurt', 'ache'],
      },
      {
        id: 'smoking',
        answer:
          "Never smoked. Husband smokes outside only.",
        patterns: ['smoke', 'tobacco'],
        keywords: ['smoke', 'tobacco'],
      },
      {
        id: 'open',
        answer:
          "Four months fatigue, exertional dyspnea, orthostatic dizziness, heavy menses post-IUD, ice pica, no fever chest pain.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — can you ask one thing at a time? Brain fog today.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'essential-hypertension-bp-high',
    titleMatchers: ['blood pressure', 'pressure was high'],
    complaintMatchers: ['pressure is high', 'bp high'],
    defaultAnswer:
      "They keep telling me my pressure is high — home cuff shows 150s over 90s. Occasional headaches. I run a restaurant, eat salty food, don't exercise much. Dad had high BP.",
    qa: [
      {
        id: 'chief',
        answer:
          "Every visit they say my pressure's high again. I'm here because the nurse said we can't keep ignoring it.",
        patterns: ['what brought you', 'chief', 'pressure', 'blood pressure'],
        keywords: ['pressure', 'brought', 'high', 'blood'],
      },
      {
        id: 'onset',
        answer:
          "Several months of high readings — maybe a year if I'm honest. Was borderline before, now clearly high.",
        patterns: ['when start', 'how long', 'first notice'],
        keywords: ['when', 'long', 'months', 'year'],
      },
      {
        id: 'symptoms',
        answer:
          "Occasional temple headaches — not daily. No chest pain, no vision changes, no nosebleeds.",
        patterns: ['headache', 'chest', 'vision', 'symptom'],
        keywords: ['headache', 'chest', 'vision', 'symptom'],
      },
      {
        id: 'lifestyle',
        answer:
          "Sedentary — desk between lunch and dinner rush. Taste food all day — salty. Wine with dinner sometimes.",
        patterns: ['lifestyle', 'diet', 'salt', 'exercise', 'activity'],
        keywords: ['lifestyle', 'diet', 'salt', 'exercise', 'activity'],
      },
      {
        id: 'family',
        answer:
          "Dad on blood pressure pills since his fifties. Mom fine. I'm overweight — belt tight.",
        patterns: ['family', 'father', 'mother', 'relative'],
        keywords: ['family', 'father', 'mother', 'relative'],
      },
      {
        id: 'meds',
        answer:
          "No BP meds yet — kept hoping diet would fix it. Ibuprofen for knee sometimes.",
        patterns: ['medication', 'medicine', 'pill', 'taking'],
        keywords: ['med', 'medicine', 'pill', 'taking'],
      },
      {
        id: 'smoking',
        answer:
          "Quit smoking ten years ago — half pack a day back then.",
        patterns: ['smoke', 'tobacco'],
        keywords: ['smoke', 'tobacco'],
      },
      {
        id: 'alcohol',
        answer:
          "Beer or wine most nights with dinner — maybe two drinks.",
        patterns: ['alcohol', 'drink', 'wine', 'beer'],
        keywords: ['alcohol', 'drink', 'wine', 'beer'],
      },
      {
        id: 'stress',
        answer:
          "Stress high — staffing, food costs. Not panic attacks, just business pressure.",
        patterns: ['stress', 'anxiety', 'worry'],
        keywords: ['stress', 'anxiety', 'worry'],
      },
      {
        id: 'home-readings',
        answer:
          "Home machine shows 150s over 90s most mornings — wife nags me to write it down.",
        patterns: ['home', 'cuff', 'reading', 'monitor'],
        keywords: ['home', 'cuff', 'reading', 'monitor'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep five to six hours — late close, early vendor delivery. Snore wife says.",
        patterns: ['sleep', 'snore', 'apnea'],
        keywords: ['sleep', 'snore', 'apnea'],
      },
      {
        id: 'fever',
        answer:
          "No fever — feel fine aside headaches sometimes.",
        patterns: ['fever', 'sick'],
        keywords: ['fever', 'sick'],
      },
      {
        id: 'worse-better',
        answer:
          "Nothing makes it feel better — I don't feel sick, numbers just high.",
        patterns: ['worse', 'better'],
        keywords: ['worse', 'better'],
      },
      {
        id: 'timing',
        answer:
          "Pretty constant — worse after salty lunch tasting.",
        patterns: ['constant', 'timing', 'when high'],
        keywords: ['constant', 'timing'],
      },
      {
        id: 'open',
        answer:
          "Chronic elevated BP, headaches occasional, salty diet sedentary, FH hypertension, overweight, no meds yet.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Which part — the restaurant or the numbers? Ask me specific.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'cap-cough-wont-go-away',
    titleMatchers: ["cough won't go away", 'cough wont go'],
    complaintMatchers: ['coughing all week', 'cough all week'],
    defaultAnswer:
      "I've been coughing eight days — yellow gunk, fever to 101, wiped out. Short of breath walking to the mailbox. Retired nurse so I know this isn't a simple cold. COVID tests negative twice.",
    qa: [
      {
        id: 'chief',
        answer:
          "Cough won't quit — over a week now. Productive, wearing me out.",
        patterns: ['what brought you', 'chief', 'cough'],
        keywords: ['cough', 'brought', 'problem'],
      },
      {
        id: 'onset',
        answer:
          "Eight days — started like a cold then chest got junky and fever hit.",
        patterns: ['when start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'days'],
      },
      {
        id: 'sputum-fever',
        answer:
          "Yellow-green sputum — handfuls when I cough. Fever 101 at home, chills at night.",
        patterns: ['sputum', 'phlegm', 'fever', 'temperature'],
        keywords: ['sputum', 'phlegm', 'fever', 'temperature'],
      },
      {
        id: 'breathing',
        answer:
          "Short of breath walking to mailbox — not at rest but activity winded me. Oxygen here was low they said.",
        patterns: ['breath', 'shortness', 'dyspnea', 'oxygen'],
        keywords: ['breath', 'short', 'dyspnea', 'oxygen'],
      },
      {
        id: 'chest-pain',
        answer:
          "Chest sore from coughing — not sharp pleuritic stab. No MI symptoms.",
        patterns: ['chest pain', 'pain'],
        keywords: ['chest', 'pain'],
      },
      {
        id: 'travel-sick',
        answer:
          "No travel. Grandkids visited last week but they weren't sick that I saw.",
        patterns: ['travel', 'contact', 'exposure'],
        keywords: ['travel', 'contact', 'exposure'],
      },
      {
        id: 'smoking',
        answer:
          "Quit ten years ago — smoked a pack a day before. Know that history matters.",
        patterns: ['smoke', 'tobacco', 'copd'],
        keywords: ['smoke', 'tobacco', 'copd'],
      },
      {
        id: 'covid-flu',
        answer:
          "Home COVID tests negative twice. Flu shot this fall — still got sick obviously.",
        patterns: ['covid', 'flu', 'influenza', 'test'],
        keywords: ['covid', 'flu', 'influenza', 'test'],
      },
      {
        id: 'meds',
        answer:
          "Robitussin and tea — not helping much. No antibiotics yet.",
        patterns: ['medication', 'medicine', 'tried'],
        keywords: ['med', 'medicine', 'tried'],
      },
      {
        id: 'fatigue',
        answer:
          "Exhausted — napping afternoons, no energy to garden.",
        patterns: ['tired', 'fatigue', 'energy'],
        keywords: ['tired', 'fatigue', 'energy'],
      },
      {
        id: 'worse-better',
        answer:
          "Worse at night lying down — cough spasms. Mornings bring up the most junk.",
        patterns: ['worse', 'better', 'night', 'morning'],
        keywords: ['worse', 'better', 'night', 'morning'],
      },
      {
        id: 'nurse-background',
        answer:
          "I was an ER nurse twenty years — retired now. Probably overthink but I know red flags.",
        patterns: ['job', 'work', 'nurse', 'occupation'],
        keywords: ['job', 'work', 'nurse', 'occupation'],
      },
      {
        id: 'open',
        answer:
          "8-day productive cough, fever, fatigue, hypoxia with exertion, RLL crackles, former smoker, COVID neg.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Hold on — coughing fit. Ask again?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'mdd-feel-down-all-time',
    titleMatchers: ['feel down', 'down all the time'],
    complaintMatchers: ["haven't felt like myself", 'not felt like myself'],
    defaultAnswer:
      "I haven't felt like myself for two months — sad most days, nothing fun anymore, sleep broken, thesis stalled. I'm scared sometimes I wish I wouldn't wake up but I don't have a plan.",
    qa: [
      {
        id: 'chief',
        answer:
          "I haven't felt like myself — that's the best way to say it. Empty and disconnected from people I care about.",
        patterns: ['what brought you', 'chief', 'yourself', 'feel'],
        keywords: ['yourself', 'feel', 'brought', 'problem'],
      },
      {
        id: 'onset',
        answer:
          "About two months — after spring semester stress piled up. Didn't bounce back over break.",
        patterns: ['when start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'months'],
      },
      {
        id: 'mood-anhedonia',
        answer:
          "Sad or numb most days. Book club, hiking — used to love them, now I bail. Nothing really interests me.",
        patterns: ['sad', 'mood', 'interest', 'hobby', 'enjoy', 'anhedonia'],
        keywords: ['sad', 'mood', 'interest', 'hobby', 'enjoy'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep late, wake at 3 a.m. mind racing, nap afternoons — still tired.",
        patterns: ['sleep', 'insomnia', 'wake'],
        keywords: ['sleep', 'insomnia', 'wake'],
      },
      {
        id: 'fatigue-concentration',
        answer:
          "Fatigue constant. Can't focus on thesis — missed a deadline, advisor emailed concerned.",
        patterns: ['tired', 'fatigue', 'concentrat', 'focus', 'school'],
        keywords: ['tired', 'fatigue', 'concentrat', 'focus', 'school'],
      },
      {
        id: 'suicide',
        answer:
          "Sometimes I think I wouldn't mind not waking up — passive, not a plan. That scares me enough to come in. No pills saved up.",
        patterns: ['suicide', 'hurt yourself', 'kill', 'harm', 'die'],
        keywords: ['suicide', 'hurt', 'kill', 'harm', 'die'],
      },
      {
        id: 'mania-substance',
        answer:
          "Never had manic energy episodes — no days of no sleep feeling invincible. No drugs, wine socially only.",
        patterns: ['mania', 'bipolar', 'drug', 'alcohol', 'substance'],
        keywords: ['mania', 'bipolar', 'drug', 'alcohol', 'substance'],
      },
      {
        id: 'stress',
        answer:
          "Grad school pressure — thesis, funding worry. Broke up with boyfriend month before this worsened.",
        patterns: ['stress', 'relationship', 'school'],
        keywords: ['stress', 'relationship', 'school'],
      },
      {
        id: 'family',
        answer:
          "Mom depression on meds. Dad anxious. Aunt hospitalized after postpartum depression once.",
        patterns: ['family', 'depression', 'mental'],
        keywords: ['family', 'depression', 'mental'],
      },
      {
        id: 'meds',
        answer:
          "No psychiatric meds before. Birth control pill only.",
        patterns: ['medication', 'medicine', 'antidepressant'],
        keywords: ['med', 'medicine', 'antidepressant'],
      },
      {
        id: 'weight-appetite',
        answer:
          "Appetite down — skip meals. Lost a few pounds without trying.",
        patterns: ['appetite', 'weight', 'eat'],
        keywords: ['appetite', 'weight', 'eat'],
      },
      {
        id: 'fever-pain',
        answer:
          "No fever or body pain — this feels emotional and mental heavy.",
        patterns: ['fever', 'pain', 'physical'],
        keywords: ['fever', 'pain', 'physical'],
      },
      {
        id: 'worse-better',
        answer:
          "Being alone worse. Forcing walk with friend helped one afternoon — didn't last.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'better', 'help'],
      },
      {
        id: 'open',
        answer:
          "2 months depressed mood, anhedonia, insomnia, fatigue, poor concentration, passive SI no plan, FH depression, normal medical workup pending.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "I'm not sure how to put it — feelings are hard to label.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'osteoarthritis-knees-hurt-daily',
    titleMatchers: ['knees hurt', 'knee hurt every'],
    complaintMatchers: ['knees ache', 'knee ache'],
    defaultAnswer:
      "Both knees ache every day — worse on stairs and after walking the dog. Morning stiffness under twenty minutes. Crepitus and ibuprofen helps a little. No fever or red hot knee.",
    qa: [
      {
        id: 'chief',
        answer:
          "My knees ache constantly — both sides. Retired mail carrier, probably wore them out.",
        patterns: ['what brought you', 'chief', 'knee', 'ache'],
        keywords: ['knee', 'ache', 'brought', 'pain'],
      },
      {
        id: 'onset',
        answer:
          "Years — slow wear. Worse last year since I gained a little weight and walk the dog more.",
        patterns: ['when start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'years'],
      },
      {
        id: 'pain-pattern',
        answer:
          "Achy stiff — worse going downstairs and after long walks. Better sitting with legs up.",
        patterns: ['worse', 'stairs', 'walk', 'activity', 'mechanical'],
        keywords: ['worse', 'stairs', 'walk', 'activity'],
      },
      {
        id: 'stiffness',
        answer:
          "Morning stiffness maybe fifteen-twenty minutes — loosens after coffee and moving.",
        patterns: ['stiff', 'morning'],
        keywords: ['stiff', 'morning'],
      },
      {
        id: 'swelling-fever',
        answer:
          "No fever. No red hot knee — mild puffiness sometimes but not angry looking.",
        patterns: ['swelling', 'red', 'warm', 'fever'],
        keywords: ['swelling', 'red', 'warm', 'fever'],
      },
      {
        id: 'injury',
        answer:
          "No recent twist or pop — gradual only. Twisted left knee twenty years ago on route, healed.",
        patterns: ['injury', 'fall', 'twist', 'trauma'],
        keywords: ['injury', 'fall', 'twist', 'trauma'],
      },
      {
        id: 'meds',
        answer:
          "Ibuprofen as needed — stomach okay so far. Tried glucosamine — not sure it did anything.",
        patterns: ['medication', 'ibuprofen', 'pain medicine'],
        keywords: ['med', 'ibuprofen', 'pain'],
      },
      {
        id: 'exercise',
        answer:
          "Walk dog twice daily — hurts after. Used to play softball, quit when knees complained.",
        patterns: ['exercise', 'activity', 'walk', 'sport'],
        keywords: ['exercise', 'activity', 'walk', 'sport'],
      },
      {
        id: 'family',
        answer:
          "Dad had knee replacement at seventy. Mom arthritis hands.",
        patterns: ['family', 'arthritis', 'relative'],
        keywords: ['family', 'arthritis', 'relative'],
      },
      {
        id: 'gout-infection',
        answer:
          "Never had gout big toe attack. No infection — knee not hot.",
        patterns: ['gout', 'infection', 'septic'],
        keywords: ['gout', 'infection', 'septic'],
      },
      {
        id: 'sleep-mood',
        answer:
          "Sleep fine. Mood okay — frustrated I can't keep up with grandkids on floor.",
        patterns: ['sleep', 'mood', 'depress'],
        keywords: ['sleep', 'mood', 'depress'],
      },
      {
        id: 'worse-better',
        answer:
          "Rest and ice help short term. Long walks worse next day.",
        patterns: ['better', 'help', 'ice', 'rest'],
        keywords: ['better', 'help', 'ice', 'rest'],
      },
      {
        id: 'timing',
        answer:
          "Daily baseline ache — flares after overdoing activity.",
        patterns: ['constant', 'timing', 'come and go'],
        keywords: ['constant', 'timing'],
      },
      {
        id: 'open',
        answer:
          "Chronic bilateral knee pain, brief AM stiffness, crepitus, no systemic symptoms, postal career, ibuprofen partial relief.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Which knee — both, honestly. Ask me one at a time.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
