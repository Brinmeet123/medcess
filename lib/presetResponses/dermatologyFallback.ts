import type { FallbackScenario } from './types'

export const dermatologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'tinea-corporis-spreading',
    titleMatchers: ['rash keeps spreading', 'keeps spreading'],
    complaintMatchers: ['circle', 'ring', 'itchy', 'arm'],
    defaultAnswer:
      "There's this weird itchy circle on my arm — it started small and keeps getting bigger. Kind of red around the edge with clearer skin in the middle. Wrestling season just started and a couple guys on the team had skin stuff too.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "I noticed this round itchy patch on my forearm — looks almost like a ring. It's been there about two weeks and it's slowly getting bigger. Not super painful, just annoying and itchy.",
        patterns: ['what brought you', 'problem', 'notice', 'chief'],
        keywords: ['problem', 'brought', 'notice', 'circle', 'rash'],
      },
      {
        id: 'onset-spread',
        answer:
          "Maybe two weeks ago it was tiny, like a dot. Now it's maybe the size of a golf ball and still spreading outward. I kept thinking it would go away on its own.",
        patterns: ['when start', 'how long', 'spreading', 'grow'],
        keywords: ['when', 'start', 'long', 'spread', 'week'],
      },
      {
        id: 'appearance',
        answer:
          "It's red and kind of scaly around the outside — my mom said it looks like a ring. The middle looks a little more normal than the edge. No pus or anything gross.",
        patterns: ['look like', 'describe', 'appearance', 'shape'],
        keywords: ['look', 'describe', 'shape', 'ring', 'scale'],
      },
      {
        id: 'itch-pain',
        answer:
          "It itches, especially after practice when I'm sweaty. Not really painful — I can wrestle, it just bugs me. No fever or feeling sick.",
        patterns: ['itch', 'pain', 'hurt', 'scratch'],
        keywords: ['itch', 'pain', 'hurt', 'scratch'],
      },
      {
        id: 'wrestling',
        answer:
          "I'm on the varsity wrestling team — we're on the mats every day. A few teammates had rashes lately; coach made us wipe mats more. I wonder if it's from that.",
        patterns: ['wrestling', 'sports', 'team', 'mat', 'contact'],
        keywords: ['wrestl', 'sport', 'team', 'mat', 'contact'],
      },
      {
        id: 'treatments',
        answer:
          "I tried drugstore lotion and some hydrocortisone my mom had — didn't really change anything. Maybe made it less itchy for an hour.",
        patterns: ['tried', 'cream', 'lotion', 'medicine', 'treatment'],
        keywords: ['tried', 'cream', 'lotion', 'treatment', 'otc'],
      },
      {
        id: 'fever',
        answer: "No fever — I feel fine otherwise. Appetite's normal.",
        patterns: ['fever', 'sick', 'temperature'],
        keywords: ['fever', 'sick', 'temperature'],
      },
      {
        id: 'location',
        answer: "Just my right forearm — nowhere else that I've seen.",
        patterns: ['where', 'location', 'spread other'],
        keywords: ['where', 'location', 'arm', 'else'],
      },
      {
        id: 'worse-better',
        answer:
          "Sweating after practice makes it itch more. Nothing makes it go away — it's slowly getting bigger which freaks me out.",
        patterns: ['worse', 'better', 'anything make'],
        keywords: ['worse', 'better', 'help'],
      },
      {
        id: 'allergies',
        answer: "No allergies I know of.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'open',
        answer:
          "Two-week enlarging itchy ring on my arm, wrestling, teammates with rashes, no fever, OTC stuff didn't work.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
      {
        id: 'severity',
        answer:
          "Itch is maybe a 4 out of 10 — annoying not unbearable. The spreading part worries me more than the itch, honestly.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', 'severe', '10'],
      },
      {
        id: 'pus-warmth',
        answer:
          "No pus, no honey-colored crust, skin isn't hot like an infection — coach looked and said it wasn't mat burn.",
        patterns: ['pus', 'drainage', 'warm', 'red streak', 'cellulitis'],
        keywords: ['pus', 'drain', 'warm', 'streak', 'infection'],
      },
      {
        id: 'family',
        answer:
          "My brother had athlete's foot once — not sure if that's related. Nobody with same arm thing.",
        patterns: ['family', 'anyone else', 'brother', 'sister'],
        keywords: ['family', 'brother', 'sister', 'parent'],
      },
      {
        id: 'school-impact',
        answer:
          "I can still wrestle but I'm self-conscious — long sleeves when I can. Afraid they'll bench me if it's contagious.",
        patterns: ['school', 'wrestling practice', 'sport impact'],
        keywords: ['school', 'wrestl', 'practice', 'sport'],
      },
    ],
  },
  {
    key: 'melanoma-mole-changed',
    titleMatchers: ['mole changed', 'think this mole'],
    complaintMatchers: ['mole', "doesn't look"],
    defaultAnswer:
      "This mole on my upper back doesn't look like it used to — it's darker, bigger, and the edges look weird. I'm worried because I'm outside showing houses all day and I barely use sunscreen.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "My mole changed — the color got darker and blotchy, and the shape isn't a neat oval anymore. It's also bigger than it was six months ago. It itches sometimes but doesn't bleed.",
        patterns: ['mole', 'brought', 'problem', 'changed'],
        keywords: ['mole', 'problem', 'changed', 'look'],
      },
      {
        id: 'timeline',
        answer:
          "Over several months — not overnight. I noticed it when my husband said the spot on my back looked different in a photo from last summer.",
        patterns: ['how long', 'when notice', 'months'],
        keywords: ['long', 'when', 'month', 'notice'],
      },
      {
        id: 'abcde',
        answer:
          "The edges look jagged, not smooth. Color is mixed — brown, dark brown, almost black in spots. Definitely bigger — bigger than a pencil eraser now. I think it's changed shape too.",
        patterns: ['color', 'border', 'size', 'shape', 'asymmetric'],
        keywords: ['color', 'border', 'size', 'shape', 'asymmet', 'bigger'],
      },
      {
        id: 'sun',
        answer:
          "I'm a realtor — I'm in the sun showing properties constantly. Sunscreen? Honestly I forget unless I'm at the beach. I burned a lot in my twenties.",
        patterns: ['sun', 'sunscreen', 'tan', 'outdoor'],
        keywords: ['sun', 'sunscreen', 'tan', 'outdoor', 'exposure'],
      },
      {
        id: 'itch-bleed',
        answer:
          "It itches once in a while — I catch myself scratching through my shirt. No bleeding or crust that I've seen.",
        patterns: ['itch', 'bleed', 'crust', 'pain'],
        keywords: ['itch', 'bleed', 'crust', 'pain'],
      },
      {
        id: 'family',
        answer:
          "My aunt had something removed from her face — they said it was skin cancer but I don't know the type. No melanoma that I'm aware of.",
        patterns: ['family', 'skin cancer', 'melanoma'],
        keywords: ['family', 'cancer', 'melanoma', 'parent'],
      },
      {
        id: 'other-moles',
        answer:
          "I have other moles but this one stands out now — it's the only one that changed noticeably.",
        patterns: ['other moles', 'more spots'],
        keywords: ['other', 'mole', 'spot', 'more'],
      },
      {
        id: 'medications',
        answer: "Just blood pressure medicine — amlodipine. No new meds.",
        patterns: ['medications', 'medicines'],
        keywords: ['medication', 'medicine', 'meds'],
      },
      {
        id: 'fever-weight',
        answer: "No fever, no weight loss, feel fine otherwise — just scared about this spot.",
        patterns: ['fever', 'weight', 'night sweat'],
        keywords: ['fever', 'weight', 'sweat', 'sick'],
      },
      {
        id: 'open',
        answer:
          "Changing asymmetric dark mole on back, months of evolution, lots of sun exposure, poor sunscreen, occasional itch, family skin cancer vaguely.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
      {
        id: 'severity',
        answer:
          "The worry is worse than physical pain — maybe 2/10 discomfort, mostly mental stress about cancer.",
        patterns: ['how bad', 'scale', 'severity', 'worry'],
        keywords: ['bad', 'scale', 'worry', 'scared'],
      },
      {
        id: 'tanning',
        answer:
          "I used tanning beds in college a few times — regret that now. Still go to open houses in sundresses without thinking.",
        patterns: ['tanning bed', 'sunburn history'],
        keywords: ['tan', 'tanning', 'burn', 'sunburn'],
      },
      {
        id: 'allergies',
        answer: "No drug allergies.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'exposure',
        answer:
          "Florida sun year-round for work — showings at noon, golf with clients. Hat sometimes, sunscreen rarely.",
        patterns: ['exposure', 'outside work', 'job sun'],
        keywords: ['exposure', 'work', 'outside', 'job'],
      },
    ],
  },
  {
    key: 'acne-vulgaris-face',
    titleMatchers: ["face won't stop", 'breaking out', 'acne'],
    complaintMatchers: ['acne', 'breaking', 'pimples', 'face'],
    defaultAnswer:
      "My face and upper back keep breaking out — blackheads, red bumps, sometimes painful ones. It's been over a year and it gets worse right before my period. I've tried a million drugstore products.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "My acne keeps getting worse — pimples on my cheeks, chin, forehead, and my upper back too. Some are small, some hurt. Makeup helps hide it but it's still embarrassing.",
        patterns: ['acne', 'problem', 'breaking out', 'pimples'],
        keywords: ['acne', 'problem', 'pimple', 'break'],
      },
      {
        id: 'duration',
        answer:
          "More than a year — since sophomore year probably. Not just one breakout, it's constant with bad weeks.",
        patterns: ['how long', 'when start', 'duration'],
        keywords: ['long', 'when', 'year', 'start'],
      },
      {
        id: 'menstrual',
        answer:
          "Yeah, the week before my period it's definitely worse — more red angry ones on my chin. My cycle's regular though.",
        patterns: ['period', 'menstrual', 'cycle', 'hormone'],
        keywords: ['period', 'menstrual', 'cycle', 'monthly', 'hormone'],
      },
      {
        id: 'appearance',
        answer:
          "Blackheads on my nose, white bumps, red papules, sometimes pus-filled ones. A couple deep painful ones on my jaw that linger.",
        patterns: ['look like', 'describe', 'type', 'blackhead'],
        keywords: ['look', 'describe', 'blackhead', 'bump', 'pus'],
      },
      {
        id: 'treatments',
        answer:
          "Salicylic acid wash, benzoyl peroxide spot treatment, charcoal masks — basically everything at Target. Nothing sticks.",
        patterns: ['tried', 'products', 'treatment', 'wash'],
        keywords: ['tried', 'product', 'treatment', 'wash', 'cream'],
      },
      {
        id: 'pain-fever',
        answer:
          "Some spots hurt when you touch them — deep ones. No fever, it's not like being sick.",
        patterns: ['pain', 'hurt', 'fever'],
        keywords: ['pain', 'hurt', 'fever'],
      },
      {
        id: 'face-only',
        answer:
          "Mostly face and upper back — not really my arms or chest.",
        patterns: ['where', 'location', 'spread'],
        keywords: ['where', 'location', 'face', 'back'],
      },
      {
        id: 'worse-better',
        answer:
          "Worse before period and when I'm stressed with exams. Better briefly after some products then it comes back.",
        patterns: ['worse', 'better', 'flare'],
        keywords: ['worse', 'better', 'flare', 'stress'],
      },
      {
        id: 'medications',
        answer: "Birth control? No — not on the pill. No other meds.",
        patterns: ['medications', 'pill', 'birth control'],
        keywords: ['medication', 'pill', 'birth', 'control'],
      },
      {
        id: 'open',
        answer:
          "Year-plus acne face and back, comedones and inflammatory bumps, premenstrual flare, failed OTC, painful deep ones sometimes.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
      {
        id: 'severity',
        answer:
          "On bad weeks it's a 7 emotionally — physically some spots are 5/10 when deep. I avoid photos at parties.",
        patterns: ['how bad', 'scale', 'severity', 'embarrass'],
        keywords: ['bad', 'scale', 'embarrass', 'severe'],
      },
      {
        id: 'diet',
        answer:
          "I tried cutting dairy for a month — maybe helped a little? Not sure. Still eat chocolate, so not perfect.",
        patterns: ['diet', 'dairy', 'food', 'chocolate'],
        keywords: ['diet', 'dairy', 'food', 'eat'],
      },
      {
        id: 'family',
        answer:
          "My mom had bad acne as a teen too — she's sympathetic. Dad doesn't get why I stress about it.",
        patterns: ['family', 'parents acne'],
        keywords: ['family', 'mom', 'parent', 'acne'],
      },
      {
        id: 'allergies',
        answer: "No allergies.",
        patterns: ['allergies'],
        keywords: ['allerg'],
      },
      {
        id: 'fever',
        answer: "No fever — skin only issue.",
        patterns: ['fever', 'sick'],
        keywords: ['fever', 'sick'],
      },
    ],
  },
  {
    key: 'herpes-zoster-burning',
    titleMatchers: ['burns and hurts', 'rash burns', 'burning'],
    complaintMatchers: ['burns', 'stings', 'burning', 'blister'],
    defaultAnswer:
      "My left chest burns like crazy — the pain started before any rash showed up. Now there are blisters but only on the left side, doesn't cross to the right. I had chickenpox as a kid.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "My skin burns and stings — deep burning, not just on the surface. The rash came after two days of pain. Shirts touching it make me wince.",
        patterns: ['burn', 'sting', 'pain', 'chief'],
        keywords: ['burn', 'sting', 'pain', 'hurt'],
      },
      {
        id: 'onset-rash',
        answer:
          "Pain started three days ago on my left chest. Blisters showed up yesterday — grouped little fluid bumps on red skin.",
        patterns: ['when start', 'how long', 'blister', 'rash'],
        keywords: ['when', 'start', 'long', 'blister', 'rash', 'day'],
      },
      {
        id: 'location',
        answer:
          "Only the left side of my chest and around to my back on that side — stops at the middle, doesn't go to the right. Weird band shape.",
        patterns: ['where', 'location', 'side', 'midline'],
        keywords: ['where', 'location', 'left', 'side', 'midline', 'chest'],
      },
      {
        id: 'prodrome',
        answer:
          "Yeah, burning and stabbing pain before I saw anything — I thought I pulled a muscle. Then the spots appeared.",
        patterns: ['before rash', 'prodrome', 'pain first'],
        keywords: ['before', 'first', 'pain', 'prior', 'prodrome'],
      },
      {
        id: 'fever',
        answer: "Low fever yesterday — 99-ish. Felt run down.",
        patterns: ['fever', 'temperature', 'sick'],
        keywords: ['fever', 'temperature', 'sick'],
      },
      {
        id: 'trauma',
        answer: "No injury — didn't fall or get burned. Just started.",
        patterns: ['trauma', 'injury', 'burn'],
        keywords: ['trauma', 'injury', 'hurt'],
      },
      {
        id: 'chickenpox',
        answer:
          "I had chickenpox as a kid — pretty sure everyone my age did. Never had anything like this though.",
        patterns: ['chickenpox', 'shingles before', 'varicella'],
        keywords: ['chickenpox', 'childhood', 'pox', 'prior'],
      },
      {
        id: 'eye',
        answer: "My eye's okay — pain is chest only, not on my face near the eye.",
        patterns: ['eye', 'vision', 'face rash'],
        keywords: ['eye', 'vision', 'face'],
      },
      {
        id: 'medications',
        answer: "Lisinopril and aspirin. Nothing new.",
        patterns: ['medications', 'medicines'],
        keywords: ['medication', 'medicine', 'meds'],
      },
      {
        id: 'open',
        answer:
          "Burning left chest pain then dermatomal vesicles, doesn't cross midline, low fever, chickenpox history, no eye involvement.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
      {
        id: 'severity',
        answer:
          "Pain is 8 or 9 out of 10 — burning stabbing. Rash tenderness adds to it. Hard to sleep on that side.",
        patterns: ['how bad', 'scale', 'severity', 'pain scale'],
        keywords: ['bad', 'scale', 'severe', '10', 'pain'],
      },
      {
        id: 'stress',
        answer:
          "Retired now — not super stressed. Wife thinks maybe immune system with age, I don't know.",
        patterns: ['stress', 'worried', 'life'],
        keywords: ['stress', 'worried', 'life'],
      },
      {
        id: 'allergies',
        answer: "No drug allergies.",
        patterns: ['allergies'],
        keywords: ['allerg'],
      },
      {
        id: 'recent-illness',
        answer:
          "Was fine before this — no hospital stays. Had a cold months ago, nothing recent besides this.",
        patterns: ['recent illness', 'sick before', 'hospital'],
        keywords: ['recent', 'ill', 'hospital', 'cold'],
      },
      {
        id: 'worse-better',
        answer:
          "Loose soft shirt helps a tiny bit. Touching or hot shower makes it scream. Nothing really fixes it yet.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'better', 'help', 'relief'],
      },
    ],
  },
  {
    key: 'stevens-johnson-peeling',
    titleMatchers: ['skin is peeling', 'peeling everywhere'],
    complaintMatchers: ['peeling', 'burning mouth', 'mouth'],
    defaultAnswer:
      "My skin and mouth feel like they're on fire — I started a new seizure medicine two weeks ago and three days ago I got fever, then rash everywhere, mouth sores, even my eyes hurt. Skin's peeling off in patches.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "Everything burns — skin, mouth, eyes. Rash spread fast over three days and now skin is peeling. I can barely eat because of mouth sores.",
        patterns: ['burn', 'mouth', 'skin', 'chief', 'peeling'],
        keywords: ['burn', 'mouth', 'skin', 'peel', 'hurt'],
      },
      {
        id: 'medication',
        answer:
          "My neurologist started me on lamotrigine for seizures about two weeks ago — new drug. Never had a reaction like this before.",
        patterns: ['medication', 'seizure', 'drug', 'new medicine', 'lamotrigine'],
        keywords: ['medication', 'medicine', 'drug', 'seizure', 'new', 'pill'],
      },
      {
        id: 'onset',
        answer:
          "Fever three days ago, then rash — red spots that turned into blisters and peeling. Getting worse daily, not better.",
        patterns: ['when start', 'how long', 'timeline'],
        keywords: ['when', 'start', 'long', 'day', 'timeline'],
      },
      {
        id: 'mucosa',
        answer:
          "Mouth is full of painful sores — lips stuck together in the morning. Eyes burn and feel gritty. Even down there hurts, sorry.",
        patterns: ['mouth', 'eye', 'mucous', 'lip', 'genital'],
        keywords: ['mouth', 'eye', 'lip', 'mucous', 'throat'],
      },
      {
        id: 'rash-spread',
        answer:
          "Started on my chest and face, now arms, trunk — not one spot, everywhere. Skin peels if they touch it gently, which terrified me.",
        patterns: ['spread', 'where', 'body', 'peel'],
        keywords: ['spread', 'where', 'body', 'peel', 'everywhere'],
      },
      {
        id: 'fever',
        answer: "High fever — 102 at home. Chills, feel toxic.",
        patterns: ['fever', 'temperature', 'chills'],
        keywords: ['fever', 'temperature', 'chill'],
      },
      {
        id: 'pain',
        answer:
          "Pain is constant — burning. Worse than any seizure I've had honestly. Pain meds in the ER help a little.",
        patterns: ['pain', 'how bad', 'severity'],
        keywords: ['pain', 'bad', 'severe', 'scale'],
      },
      {
        id: 'prior-drug',
        answer:
          "I've been on other seizure meds before — switched because of side effects, never skin peeling.",
        patterns: ['allergy', 'reaction before', 'other drugs'],
        keywords: ['allerg', 'reaction', 'before', 'prior'],
      },
      {
        id: 'open',
        answer:
          "New lamotrigine two weeks, fever then widespread rash mouth eyes, peeling Nikolsky positive feeling, terrified.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
      {
        id: 'severity',
        answer:
          "Pain is 9/10 — everywhere. Mouth makes eating a 10/10 misery. I've been crying off and on.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', 'severe', '10', 'pain'],
      },
      {
        id: 'seizure-history',
        answer:
          "Seizures since high school — controlled on meds usually. This new drug was supposed to have fewer side effects, ironic.",
        patterns: ['seizure', 'epilepsy', 'neurology'],
        keywords: ['seizure', 'epilepsy', 'convuls'],
      },
      {
        id: 'allergies',
        answer:
          "No known drug allergies before — never hives or anything. That's why this is so shocking.",
        patterns: ['allergies', 'allergic reaction before'],
        keywords: ['allerg', 'reaction'],
      },
      {
        id: 'family',
        answer:
          "Parents flying in — they're terrified. No family history of reactions to seizure meds that I know.",
        patterns: ['family', 'parents'],
        keywords: ['family', 'parent', 'mom', 'dad'],
      },
      {
        id: 'worse-better',
        answer:
          "Dark quiet room helps eyes a little. Any movement of skin hurts. IV pain meds here take edge off briefly.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'better', 'help'],
      },
    ],
  },
]
