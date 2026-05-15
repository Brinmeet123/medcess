import type { FallbackScenario } from './types'

export const gastroenterologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'acute-pancreatitis-pain-through-back',
    titleMatchers: ['pain shoots through', 'shoots through my back'],
    complaintMatchers: ['stomach pain unbearable', 'unbearable'],
    defaultAnswer:
      "My upper belly pain is unbearable — started like a belt squeezing and shoots straight through to my back. I've vomited four times and even crackers after shift meal made it worse. I drink heavy on closing nights; I'm scared it's my heart.",
    qa: [
      {
        id: 'chief',
        answer:
          "The pain is right up in the middle under my ribs — worst pain I've had. I drove here hunched over the wheel.",
        patterns: ['what brought you', 'chief', 'problem', 'pain'],
        keywords: ['pain', 'brought', 'problem', 'unbearable'],
      },
      {
        id: 'back-radiation',
        answer:
          "It goes straight through to my back — between my shoulder blades. That's what freaks me out.",
        patterns: ['back', 'radiat', 'through', 'shoulder'],
        keywords: ['back', 'radiat', 'through'],
      },
      {
        id: 'onset-timing',
        answer:
          "About eight hours ago — sudden bad, not a slow burn. Getting worse not better.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'hours'],
      },
      {
        id: 'nausea-vomit',
        answer:
          "Nauseated from the start — thrown up four times. Nothing left but bile last time.",
        patterns: ['nausea', 'vomit', 'throw up'],
        keywords: ['nausea', 'vomit', 'throw'],
      },
      {
        id: 'food-worse',
        answer:
          "I nibbled staff pasta — mistake. Eating definitely ramps it up.",
        patterns: ['eat', 'food', 'worse', 'meal'],
        keywords: ['eat', 'food', 'worse', 'meal'],
      },
      {
        id: 'alcohol',
        answer:
          "I drink a lot weekends — shots with staff after close. Probably too much honestly.",
        patterns: ['alcohol', 'drink', 'beer', 'wine', 'liquor'],
        keywords: ['alcohol', 'drink', 'beer', 'wine'],
      },
      {
        id: 'fever',
        answer:
          "Felt flushed — not sure I have a real fever. Clammy more than anything.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'bowel',
        answer:
          "Haven't had a good BM — belly too angry. Not diarrhea explosions.",
        patterns: ['bowel', 'stool', 'diarrhea', 'constipation'],
        keywords: ['bowel', 'stool', 'diarrhea'],
      },
      {
        id: 'chest-heart',
        answer:
          "Not classic left arm pain — more gut and back. Still scared it's cardiac.",
        patterns: ['chest', 'heart', 'mi', 'attack'],
        keywords: ['chest', 'heart', 'attack'],
      },
      {
        id: 'meds',
        answer:
          "Tums and chalky stuff — worthless. No blood thinners.",
        patterns: ['medication', 'medicine', 'pill'],
        keywords: ['med', 'medicine', 'pill'],
      },
      {
        id: 'family',
        answer:
          "Mom gallbladder out. Dad heart stents at sixty — another reason I'm freaked.",
        patterns: ['family', 'relative', 'history'],
        keywords: ['family', 'relative', 'history'],
      },
      {
        id: 'abdominal-pain-detail',
        answer:
          "Sharp and constant — can't find comfy position except knees up a little.",
        patterns: ['describe pain', 'quality', 'severity'],
        keywords: ['describe', 'quality', 'severe'],
      },
      {
        id: 'smoking',
        answer:
          "Half a pack — I know, bad with booze.",
        patterns: ['smoke', 'tobacco'],
        keywords: ['smoke', 'tobacco'],
      },
      {
        id: 'weight-appetite',
        answer:
          "No appetite — who wants food with this pain.",
        patterns: ['appetite', 'weight', 'eating'],
        keywords: ['appetite', 'weight', 'eat'],
      },
      {
        id: 'worse-better',
        answer:
          "Moving around worse. Pressure on belly worse. Nothing really helps.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'better', 'help'],
      },
      {
        id: 'open',
        answer:
          "8-hour epigastric pain through back, vomiting, worse eating, heavy weekend alcohol, clammy, no BM.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — hard to think through this. One question at a time?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'peptic-ulcer-burn-after-eating',
    titleMatchers: ['stomach burns', 'burns after i eat'],
    complaintMatchers: ['burning pain', 'burning'],
    defaultAnswer:
      "Burning right under my breastbone for two months — worse a few hours after a big lunch or at 2 a.m. Small snack calms it briefly. I live on ibuprofen for lawyer headaches — probably stupid.",
    qa: [
      {
        id: 'chief',
        answer:
          "Burning gnaw pain here — middle high belly. Keeps coming back.",
        patterns: ['what brought you', 'chief', 'burn'],
        keywords: ['burn', 'brought', 'pain'],
      },
      {
        id: 'timing-meals',
        answer:
          "Worse few hours after eating — like acid but deeper. Wakes me some nights.",
        patterns: ['after eat', 'meal', 'night', 'wake'],
        keywords: ['eat', 'meal', 'night', 'wake'],
      },
      {
        id: 'relief',
        answer:
          "Half a banana or crackers dulls it maybe twenty minutes — then back.",
        patterns: ['relief', 'better', 'antacid', 'help'],
        keywords: ['relief', 'better', 'help', 'antacid'],
      },
      {
        id: 'nsaid',
        answer:
          "Ibuprofen several days a week for stress headaches — probably doesn't help my stomach.",
        patterns: ['ibuprofen', 'nsaid', 'aspirin', 'medicine'],
        keywords: ['ibuprofen', 'nsaid', 'aspirin', 'med'],
      },
      {
        id: 'vomit-blood',
        answer:
          "No vomiting. No black stool I noticed — stool brown normal-ish.",
        patterns: ['vomit', 'blood', 'stool', 'black', 'melena'],
        keywords: ['vomit', 'blood', 'stool', 'melena'],
      },
      {
        id: 'fever',
        answer:
          "No fever — not sick-flush, just gut burn.",
        patterns: ['fever', 'sick'],
        keywords: ['fever', 'sick'],
      },
      {
        id: 'weight',
        answer:
          "Weight stable — appetite okay except when it hurts.",
        patterns: ['weight', 'appetite', 'loss'],
        keywords: ['weight', 'appetite', 'loss'],
      },
      {
        id: 'coffee',
        answer:
          "Coffee on trial prep days makes burn gnaw worse — switched to half-caf.",
        patterns: ['coffee', 'caffeine', 'diet'],
        keywords: ['coffee', 'caffeine', 'diet'],
      },
      {
        id: 'stress',
        answer:
          "Trial stress high — not sure if stress causes this or I just notice more.",
        patterns: ['stress', 'anxiety'],
        keywords: ['stress', 'anxiety'],
      },
      {
        id: 'family',
        answer:
          "Dad reflux. Mom had \"ulcer\" years ago — vague family story.",
        patterns: ['family', 'ulcer', 'relative'],
        keywords: ['family', 'ulcer', 'relative'],
      },
      {
        id: 'alcohol',
        answer:
          "Glass of wine dinners — not heavy drinker.",
        patterns: ['alcohol', 'drink'],
        keywords: ['alcohol', 'drink'],
      },
      {
        id: 'gerd-symptoms',
        answer:
          "Sometimes sour taste — but pain is more focal than heartburn only.",
        patterns: ['reflux', 'heartburn', 'gerd'],
        keywords: ['reflux', 'heartburn', 'gerd'],
      },
      {
        id: 'onset',
        answer:
          "Two months — gradual, not one sudden attack.",
        patterns: ['when start', 'how long'],
        keywords: ['when', 'long', 'months'],
      },
      {
        id: 'pregnancy',
        answer:
          "Not pregnant — tubes tied after second kid.",
        patterns: ['pregnant', 'pregnancy'],
        keywords: ['pregnant', 'pregnancy'],
      },
      {
        id: 'open',
        answer:
          "2-month epigastric burn, postprandial and nocturnal, NSAIDs, brief relief food, no melena fever weight loss.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Could you rephrase? Legal brain isn't helping my stomach today.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'ulcerative-colitis-running-bathroom',
    titleMatchers: ['running to the bathroom', 'keep running'],
    complaintMatchers: ['diarrhea for weeks', 'diarrhea'],
    defaultAnswer:
      "Bloody diarrhea six weeks — sprint to bathroom between classes. Urgency horrible, cramps low belly. Lost ten pounds, exhausted. Embarrassed roommate hears me all night.",
    qa: [
      {
        id: 'chief',
        answer:
          "Diarrhea won't stop — that's why I'm here. Can't plan anything.",
        patterns: ['what brought you', 'chief', 'diarrhea'],
        keywords: ['diarrhea', 'brought', 'problem'],
      },
      {
        id: 'blood-stool',
        answer:
          "Blood mixed in — mucus too sometimes. Toilet water pink.",
        patterns: ['blood', 'stool', 'rectal', 'bleed'],
        keywords: ['blood', 'stool', 'bleed'],
      },
      {
        id: 'urgency',
        answer:
          "Can't hold it — bolt from seminar row. Humiliating.",
        patterns: ['urgency', 'accident', 'hold'],
        keywords: ['urgency', 'hold', 'accident'],
      },
      {
        id: 'onset',
        answer:
          "Six weeks — started watery then blood showed up week two.",
        patterns: ['when start', 'how long'],
        keywords: ['when', 'long', 'weeks'],
      },
      {
        id: 'pain',
        answer:
          "Crampy low belly before I go — eases after movement sometimes.",
        patterns: ['pain', 'cramp', 'abdominal'],
        keywords: ['pain', 'cramp', 'abdominal'],
      },
      {
        id: 'fever',
        answer:
          "Low-grade off and on — 99-100 at home.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'weight-appetite',
        answer:
          "Down ten pounds — food grosses me out when flaring.",
        patterns: ['weight', 'appetite', 'loss'],
        keywords: ['weight', 'appetite', 'loss'],
      },
      {
        id: 'travel',
        answer:
          "No travel — desk grad school life.",
        patterns: ['travel', 'trip', 'camping'],
        keywords: ['travel', 'trip'],
      },
      {
        id: 'antibiotics',
        answer:
          "No recent antibiotics — docs note clean a year ago dental.",
        patterns: ['antibiotic', 'c diff'],
        keywords: ['antibiotic', 'c diff'],
      },
      {
        id: 'meds',
        answer:
          "Imodium helps an hour then worse — stopped. Multivitamin.",
        patterns: ['medication', 'medicine', 'loperamide'],
        keywords: ['med', 'medicine', 'imodium'],
      },
      {
        id: 'family',
        answer:
          "Cousin \"colon issues\" — nobody talks specifics. Parents healthy.",
        patterns: ['family', 'ibd', 'crohn'],
        keywords: ['family', 'ibd', 'colon'],
      },
      {
        id: 'nausea-vomit',
        answer:
          "Queasy sometimes — vomit rare.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'joint-skin',
        answer:
          "Knees achy — figured dehydration. No weird rashes.",
        patterns: ['joint', 'rash', 'eye', 'arthritis'],
        keywords: ['joint', 'rash', 'eye'],
      },
      {
        id: 'stress-mood',
        answer:
          "Depressed about symptoms — who wouldn't be.",
        patterns: ['mood', 'depress', 'stress'],
        keywords: ['mood', 'depress', 'stress'],
      },
      {
        id: 'worse-better',
        answer:
          "Stressful days worse. Rice boring diet slightly calmer mornings.",
        patterns: ['worse', 'better', 'diet'],
        keywords: ['worse', 'better', 'diet'],
      },
      {
        id: 'open',
        answer:
          "6-week bloody diarrhea urgency cramps weight loss fatigue low fever no travel antibiotics.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — long questions make me need the bathroom.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'acute-hepatitis-b-yellow-eyes',
    titleMatchers: ['eyes look yellow', 'eyes yellow', 'yellow'],
    complaintMatchers: ['eyes turned yellow', 'yellow'],
    defaultAnswer:
      "Family says my eyes look yellow — urine dark like cola two weeks. Nauseated, can't finish meals, wiped out. New relationship last month — I'm scared and embarrassed to tell clients.",
    qa: [
      {
        id: 'chief',
        answer:
          "They dragged me here for yellow eyes — I didn't notice at first.",
        patterns: ['what brought you', 'chief', 'yellow'],
        keywords: ['yellow', 'brought', 'eyes'],
      },
      {
        id: 'jaundice-skin',
        answer:
          "Girlfriend says skin tint yellow in daylight — I see it in mirror now.",
        patterns: ['jaundice', 'skin', 'icterus'],
        keywords: ['jaundice', 'skin', 'icterus'],
      },
      {
        id: 'urine',
        answer:
          "Urine dark brown — freaked me out first morning I saw it.",
        patterns: ['urine', 'dark', 'pee'],
        keywords: ['urine', 'dark', 'pee'],
      },
      {
        id: 'stool',
        answer:
          "Stools maybe pale — not paying attention honestly.",
        patterns: ['stool', 'clay', 'pale'],
        keywords: ['stool', 'pale', 'clay'],
      },
      {
        id: 'fatigue-appetite',
        answer:
          "Fatigue two weeks — thought overtraining. Zero appetite for chicken meals.",
        patterns: ['fatigue', 'tired', 'appetite'],
        keywords: ['fatigue', 'tired', 'appetite'],
      },
      {
        id: 'nausea',
        answer:
          "Nauseated most days — vomited once morning.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'fever',
        answer:
          "Low fever thermometer 100 — comes and goes.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'pain',
        answer:
          "Dull ache under right ribs — not gallstone colic sharp.",
        patterns: ['pain', 'ruq', 'right side'],
        keywords: ['pain', 'ruq', 'right'],
      },
      {
        id: 'alcohol',
        answer:
          "Rare beer — not a heavy drinker. Gym bro stereotype wrong here.",
        patterns: ['alcohol', 'drink'],
        keywords: ['alcohol', 'drink'],
      },
      {
        id: 'drugs-tattoo',
        answer:
          "No IV drugs. Tattoo ten years ago clean shop.",
        patterns: ['drug', 'needle', 'tattoo', 'iv'],
        keywords: ['drug', 'needle', 'tattoo'],
      },
      {
        id: 'sexual',
        answer:
          "New partner last month — we weren't careful every time I'll admit.",
        patterns: ['sex', 'partner', 'exposure'],
        keywords: ['sex', 'partner', 'exposure'],
      },
      {
        id: 'meds-supplements',
        answer:
          "Protein powder usual brand. No new Chinese herbs.",
        patterns: ['medication', 'supplement', 'herb'],
        keywords: ['med', 'supplement', 'herb'],
      },
      {
        id: 'travel-food',
        answer:
          "No Mexico trip. Ate oysters fundraiser week ago — not sure if relevant.",
        patterns: ['travel', 'shellfish', 'food'],
        keywords: ['travel', 'shellfish', 'food'],
      },
      {
        id: 'family',
        answer:
          "No liver disease family I know.",
        patterns: ['family', 'hepatitis', 'liver'],
        keywords: ['family', 'liver', 'hepatitis'],
      },
      {
        id: 'weight',
        answer:
          "Maybe down three pounds — scale bouncing.",
        patterns: ['weight', 'loss'],
        keywords: ['weight', 'loss'],
      },
      {
        id: 'open',
        answer:
          "Jaundice dark urine fatigue nausea new partner low fever RUQ ache rare alcohol.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "I'm anxious — ask simpler please?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'colon-cancer-feel-full-all-time',
    titleMatchers: ['feel full all', 'full all the time'],
    complaintMatchers: ['full quickly', 'something feels off'],
    defaultAnswer:
      "I fill up halfway through dinner lately — something feels off. Down twelve pounds without trying. Bowel habits flip between loose and stuck. Saw blood on toilet paper twice. Brother died colon cancer young — daughter made this appointment.",
    qa: [
      {
        id: 'chief',
        answer:
          "I get full quickly — like my stomach shrunk. Plus energy tanked.",
        patterns: ['what brought you', 'chief', 'full'],
        keywords: ['full', 'brought', 'quickly'],
      },
      {
        id: 'early-satiety',
        answer:
          "Half plate normal meal — done. Used to love potlucks.",
        patterns: ['satiety', 'appetite', 'eating'],
        keywords: ['satiety', 'appetite', 'eat'],
      },
      {
        id: 'weight',
        answer:
          "Twelve pounds gone — not trying. Belts loose.",
        patterns: ['weight', 'loss', 'pound'],
        keywords: ['weight', 'loss', 'pound'],
      },
      {
        id: 'bowel',
        answer:
          "Some weeks constipated, some loose — pattern messy. Not pure diarrhea.",
        patterns: ['bowel', 'stool', 'constipation', 'diarrhea', 'habit'],
        keywords: ['bowel', 'stool', 'constipation', 'diarrhea'],
      },
      {
        id: 'blood',
        answer:
          "Bright red on paper twice — figured hemorrhoids from straining.",
        patterns: ['blood', 'rectal', 'bleed', 'hemorrhoid'],
        keywords: ['blood', 'rectal', 'bleed', 'hemorrhoid'],
      },
      {
        id: 'pain',
        answer:
          "Vague belly ache — not sharp. Bloated off and on.",
        patterns: ['pain', 'bloat', 'cramp'],
        keywords: ['pain', 'bloat', 'cramp'],
      },
      {
        id: 'fatigue',
        answer:
          "Tired shelving volunteer books — need sit breaks.",
        patterns: ['fatigue', 'tired', 'weak'],
        keywords: ['fatigue', 'tired', 'weak'],
      },
      {
        id: 'family',
        answer:
          "Brother died colon cancer fifty-eight — scared me for years.",
        patterns: ['family', 'cancer', 'colon', 'relative'],
        keywords: ['family', 'cancer', 'colon', 'relative'],
      },
      {
        id: 'fever',
        answer:
          "No fever I know of.",
        patterns: ['fever', 'sick'],
        keywords: ['fever', 'sick'],
      },
      {
        id: 'nausea-vomit',
        answer:
          "Queasy some mornings — no vomiting.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'meds',
        answer:
          "Lisinopril, calcium chew — stomach okay until lately.",
        patterns: ['medication', 'medicine', 'aspirin'],
        keywords: ['med', 'medicine', 'aspirin'],
      },
      {
        id: 'smoking',
        answer:
          "Never smoked.",
        patterns: ['smoke', 'tobacco'],
        keywords: ['smoke', 'tobacco'],
      },
      {
        id: 'screening',
        answer:
          "Never had colonoscopy — scared of procedure. Regret now.",
        patterns: ['colonoscopy', 'screening', 'colon'],
        keywords: ['colonoscopy', 'screening', 'colon'],
      },
      {
        id: 'diet',
        answer:
          "High fiber before — lately bland because gut feels fussy.",
        patterns: ['diet', 'fiber', 'food'],
        keywords: ['diet', 'fiber', 'food'],
      },
      {
        id: 'worse-better',
        answer:
          "Large meals worse. Small snacks okay short while.",
        patterns: ['worse', 'better', 'meal'],
        keywords: ['worse', 'better', 'meal'],
      },
      {
        id: 'open',
        answer:
          "Early satiety weight loss bowel change blood brother colon CA iron fatigue.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "I'm nervous — daughter holding my hand in waiting room.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
