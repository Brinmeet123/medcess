import type { FallbackScenario } from './types'

export const emergencyMedicineFallbackScenarios: FallbackScenario[] = [
  {
    key: 'sah-worst-headache-of-my-life',
    titleMatchers: ['worst headache', 'head suddenly exploded'],
    complaintMatchers: ['head exploded', 'worst headache'],
    defaultAnswer:
      "My head just blew up with pain about half an hour ago — worst thing I've ever felt. I was lifting grocery bags and it hit me like a hammer. I'm nauseated, the lights in here are killing me, and my neck feels stiff.",
    qa: [
      {
        id: 'chief',
        answer:
          "It felt like my head suddenly exploded — not a slow build, it was instant. I was carrying groceries from the car and had to sit down in the driveway. I've never had a headache even close to this.",
        patterns: ['what brought you', 'chief', 'problem', 'happening'],
        keywords: ['problem', 'brought', 'happening', 'headache'],
      },
      {
        id: 'onset',
        answer:
          "Maybe thirty minutes ago — one second I was fine, the next it was full force. No warning, no aura, nothing. That's what scares me, how fast it happened.",
        patterns: ['when start', 'onset', 'how long', 'sudden'],
        keywords: ['when', 'start', 'sudden', 'long', 'minutes'],
      },
      {
        id: 'severity',
        answer:
          "Ten out of ten — I'm not being dramatic. It's the worst pain of my life. I can't think straight through it.",
        patterns: ['how bad', 'scale', 'severity', 'rate'],
        keywords: ['bad', 'scale', '10', 'severe', 'rate'],
      },
      {
        id: 'location',
        answer:
          "It's all over my head — not just one side. Kind of like pressure from the inside out. When I move my neck wrong it spikes.",
        patterns: ['where', 'location', 'which part'],
        keywords: ['where', 'location', 'part'],
      },
      {
        id: 'nausea-vomit',
        answer:
          "Yeah, I threw up once in the waiting room — bile, nothing much in my stomach. Nausea hasn't let up. The smell of the ER doesn't help.",
        patterns: ['nausea', 'vomit', 'throw up', 'sick stomach'],
        keywords: ['nausea', 'vomit', 'throw', 'sick'],
      },
      {
        id: 'neck-photo',
        answer:
          "My neck feels stiff — hard to look at the bright lights without squinting. My husband said I was holding the back of my head in the car.",
        patterns: ['neck', 'stiff', 'light', 'photophobia'],
        keywords: ['neck', 'stiff', 'light', 'bright'],
      },
      {
        id: 'prior',
        answer:
          "I get occasional tension headaches from screen work — nothing like this. No migraines that I know of. Never hospitalized for headache.",
        patterns: ['before', 'similar', 'prior', 'history headache', 'migraine'],
        keywords: ['before', 'similar', 'prior', 'migraine', 'history'],
      },
      {
        id: 'trauma',
        answer:
          "No fall, no car accident — just lifting bags. Heavy Costco run, awkward grip. Pain started right then.",
        patterns: ['trauma', 'injury', 'hit', 'fall', 'accident'],
        keywords: ['trauma', 'injury', 'fall', 'accident', 'hit'],
      },
      {
        id: 'vision-neuro',
        answer:
          "Vision's blurry from the pain and tears, but I don't think I'm blind. Arms and legs feel normal — I walked in, barely.",
        patterns: ['vision', 'weakness', 'numb', 'speech', 'stroke'],
        keywords: ['vision', 'weak', 'numb', 'speech', 'arm', 'leg'],
      },
      {
        id: 'fever',
        answer:
          "I feel warm and clammy but nobody told me I have a high fever. More sick-scared than flu-sick.",
        patterns: ['fever', 'temperature', 'chills'],
        keywords: ['fever', 'temperature', 'chills'],
      },
      {
        id: 'meds',
        answer:
          "Lisinopril for blood pressure, vitamin D. I took two ibuprofen at home — didn't touch it. No blood thinners.",
        patterns: ['medication', 'medicine', 'drug', 'take anything'],
        keywords: ['med', 'medicine', 'drug', 'pill'],
      },
      {
        id: 'family',
        answer:
          "My mom had migraines. Dad had a stroke in his seventies. Nobody with brain aneurysm that I was told about.",
        patterns: ['family', 'mother', 'father', 'relative'],
        keywords: ['family', 'mother', 'father', 'relative'],
      },
      {
        id: 'worse-better',
        answer:
          "Dark quiet helps a tiny bit. Movement, light, bending over — awful. Lying still is the least bad.",
        patterns: ['worse', 'better', 'anything make'],
        keywords: ['worse', 'better', 'help'],
      },
      {
        id: 'timing',
        answer:
          "Started while lifting groceries, peaked immediately, hasn't backed off. Thirty minutes feels like hours.",
        patterns: ['timing', 'course', 'constant', 'come and go'],
        keywords: ['timing', 'constant', 'come', 'go'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing's okay — it's my head, not my lungs. I'm breathing fast because I'm panicked, I think.",
        patterns: ['breath', 'short of breath', 'dyspnea'],
        keywords: ['breath', 'short', 'dyspnea'],
      },
      {
        id: 'travel',
        answer:
          "No recent travel — was at home all weekend. Worked from home Friday.",
        patterns: ['travel', 'flight', 'trip'],
        keywords: ['travel', 'flight', 'trip'],
      },
      {
        id: 'open',
        answer:
          "Sudden 10/10 headache lifting groceries, vomiting, stiff neck, hates lights, never before, ibuprofen useless.",
        patterns: ['anything else', 'tell me more', 'missed'],
        keywords: ['else', 'more', 'anything'],
      },
      {
        id: 'vague',
        answer:
          "I'm sorry — ask me one thing at a time. The pain is so loud in my head it's hard to track everything you're asking.",
        patterns: ['understand', 'repeat', 'clarify'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'pe-em-cant-catch-breath',
    titleMatchers: ["can't catch my breath", 'catch my breath'],
    complaintMatchers: ['short of breath', 'suddenly became short'],
    defaultAnswer:
      "I was at my desk and suddenly I couldn't get a full breath — like the air wouldn't go in. Sharp pain in my chest when I breathe deep. I flew back from Denver yesterday, long flight, and I'm on the pill.",
    qa: [
      {
        id: 'chief',
        answer:
          "About two hours ago at work it hit out of nowhere — short of breath, chest hurts when I inhale. Not a slow cold thing, sudden. I'm scared I'm going to pass out.",
        patterns: ['what brought you', 'chief', 'problem', 'breath'],
        keywords: ['breath', 'problem', 'brought', 'short'],
      },
      {
        id: 'onset',
        answer:
          "Two hours ago, sitting at my computer. I stood up to get water and felt dizzy and winded. Hasn't really improved.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'hours'],
      },
      {
        id: 'pain',
        answer:
          "Sharp, like a stitch in my right chest — worse when I take a deep breath or laugh. Not burning like heartburn.",
        patterns: ['chest pain', 'pain', 'hurt', 'pleuritic'],
        keywords: ['pain', 'chest', 'hurt', 'sharp'],
      },
      {
        id: 'travel',
        answer:
          "I got off an eight-hour flight from Denver yesterday — client visit. Sat the whole way, fell asleep cramped. Landed last night.",
        patterns: ['travel', 'flight', 'fly', 'trip', 'plane'],
        keywords: ['travel', 'flight', 'fly', 'plane', 'trip'],
      },
      {
        id: 'ocp',
        answer:
          "I'm on combined birth control pills — years now. Doctor said watch smoking, I don't smoke. Didn't think desk job counted as risky.",
        patterns: ['birth control', 'pill', 'contraceptive', 'hormone'],
        keywords: ['birth', 'pill', 'contraceptive', 'control'],
      },
      {
        id: 'leg',
        answer:
          "My right calf was a little sore this morning — figured it was heels. Not swollen like a sausage, just tender when I pressed it.",
        patterns: ['leg', 'calf', 'swelling', 'clot'],
        keywords: ['leg', 'calf', 'swell', 'clot'],
      },
      {
        id: 'fever-cough',
        answer:
          "No fever, no cough, no phlegm. Lungs feel clear in my head but I still can't breathe right.",
        patterns: ['fever', 'cough', 'sick', 'cold'],
        keywords: ['fever', 'cough', 'cold', 'sick'],
      },
      {
        id: 'breathing',
        answer:
          "I can't catch my breath — even talking to you I pause. Oxygen thing on my finger was low they said. Feels worse lying flat so I'm sitting up.",
        patterns: ['breath', 'shortness', 'dyspnea', 'oxygen'],
        keywords: ['breath', 'short', 'oxygen', 'dyspnea'],
      },
      {
        id: 'severity',
        answer:
          "Breathing discomfort is an 8 — chest pain maybe 6 when I breathe shallow. Dizziness comes in waves, maybe 4.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', 'severe'],
      },
      {
        id: 'panic',
        answer:
          "I'm anxious — who wouldn't be — but I wasn't having a panic attack at my desk. I know my body; this feels physical, not just nerves.",
        patterns: ['anxiety', 'panic', 'stress', 'nervous'],
        keywords: ['anxiety', 'panic', 'stress', 'nervous'],
      },
      {
        id: 'meds',
        answer:
          "Birth control, occasional ibuprofen for cramps. No blood thinners, no recent surgery.",
        patterns: ['medication', 'medicine', 'drug'],
        keywords: ['med', 'medicine', 'drug'],
      },
      {
        id: 'family',
        answer:
          "My sister had a blood clot after pregnancy — on blood thinners for a while. Mom has high cholesterol, that's it.",
        patterns: ['family', 'clot', 'relative'],
        keywords: ['family', 'clot', 'relative'],
      },
      {
        id: 'worse-better',
        answer:
          "Deep breaths and walking make it worse. Sitting still and shallow breathing is slightly less awful — not a fix.",
        patterns: ['worse', 'better', 'anything make'],
        keywords: ['worse', 'better'],
      },
      {
        id: 'timing',
        answer:
          "Constant since it started — not coming in waves like asthma used to in a friend of mine.",
        patterns: ['constant', 'come and go', 'timing'],
        keywords: ['constant', 'come', 'go'],
      },
      {
        id: 'location',
        answer:
          "Breathlessness everywhere; chest pain mostly right side lower ribs when I inhale.",
        patterns: ['where', 'location'],
        keywords: ['where', 'location'],
      },
      {
        id: 'nausea',
        answer:
          "A little nauseated from not breathing well — haven't vomited.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'open',
        answer:
          "Sudden SOB at work, pleuritic chest pain, flight yesterday, OCPs, calf tenderness, hypoxic, no fever cough.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Can you ask that again slower? I'm breathless and it's hard to focus on long questions.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'dka-sugar-out-of-control',
    titleMatchers: ['sugar feels out of control', 'sugar out of control'],
    complaintMatchers: ['throwing up', "can't stop throwing"],
    defaultAnswer:
      "I've got type 1 diabetes and I stopped my insulin when I got a stomach bug — stupid, I know. Now I can't stop vomiting, my stomach hurts, I'm thirsty all the time, and my breathing feels weird and fast. My roommate said my breath smells fruity.",
    qa: [
      {
        id: 'chief',
        answer:
          "I feel awful — throwing up every couple hours, crampy belly pain, crazy thirsty, peeing constantly. I'm a type 1 diabetic and I think I messed up my insulin.",
        patterns: ['what brought you', 'chief', 'problem', 'sick'],
        keywords: ['problem', 'sick', 'brought', 'vomit'],
      },
      {
        id: 'diabetes',
        answer:
          "Type 1 since I was eleven — insulin pump usually, but I pulled it off when I couldn't keep food down. Thought I'd skip insulin if I wasn't eating. Bad idea.",
        patterns: ['diabetes', 'insulin', 'type 1', 'blood sugar'],
        keywords: ['diabetes', 'insulin', 'sugar', 'type'],
      },
      {
        id: 'onset',
        answer:
          "Stomach bug started two days ago — roommate had it too. Vomiting got worse today; breathing got fast last few hours.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'days'],
      },
      {
        id: 'breathing',
        answer:
          "I'm breathing fast and deep — like after a sprint, but I'm lying in bed. Roommate said it looked scary. I feel air hungry.",
        patterns: ['breath', 'breathing', 'respiratory'],
        keywords: ['breath', 'breathing'],
      },
      {
        id: 'nausea-vomit',
        answer:
          "Can't keep water down reliably — vomited bile three times since midnight. Nausea constant.",
        patterns: ['nausea', 'vomit', 'throw up'],
        keywords: ['nausea', 'vomit', 'throw'],
      },
      {
        id: 'abdominal',
        answer:
          "Whole belly aches — crampy, not one sharp spot. Maybe a 5 out of 10. Worse after vomiting.",
        patterns: ['abdominal', 'belly', 'stomach pain'],
        keywords: ['abdominal', 'belly', 'stomach', 'pain'],
      },
      {
        id: 'thirst-urine',
        answer:
          "So thirsty I'd drink a gallon if I could keep it down. Peeing every twenty minutes even while dehydrated — that's what freaks me out.",
        patterns: ['thirst', 'urinate', 'pee', 'polyuria', 'polydipsia'],
        keywords: ['thirst', 'urinate', 'pee', 'drink'],
      },
      {
        id: 'meds',
        answer:
          "Normally lispro in pump and long-acting at night — haven't taken basal since yesterday morning. No other meds.",
        patterns: ['medication', 'medicine', 'insulin dose'],
        keywords: ['med', 'insulin', 'medicine'],
      },
      {
        id: 'fever',
        answer:
          "Felt warm at home — maybe low fever with the bug. Chills once.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'severity',
        answer:
          "Overall misery 8/10 — weakness is the worst part. Belly pain moderate. Breathing feels wrong, hard to rate.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', 'severe'],
      },
      {
        id: 'family',
        answer:
          "Dad has type 2 — different beast. No one else type 1 in family.",
        patterns: ['family', 'diabetes family'],
        keywords: ['family', 'diabetes'],
      },
      {
        id: 'alcohol-drugs',
        answer:
          "No drinking — I'm nineteen. No drugs. This isn't a hangover.",
        patterns: ['alcohol', 'drug', 'drink'],
        keywords: ['alcohol', 'drug', 'drink'],
      },
      {
        id: 'worse-better',
        answer:
          "Trying to drink anything comes back up — worse. Lying still is only slightly better than moving to bathroom again.",
        patterns: ['worse', 'better'],
        keywords: ['worse', 'better'],
      },
      {
        id: 'timing',
        answer:
          "Vomiting worsening over 48 hours; breathing change today. Insulin stopped yesterday.",
        patterns: ['timing', 'course'],
        keywords: ['timing', 'course'],
      },
      {
        id: 'travel',
        answer:
          "No travel — college campus, dorm. Roommate sick too.",
        patterns: ['travel', 'trip'],
        keywords: ['travel', 'trip'],
      },
      {
        id: 'open',
        answer:
          "T1DM, stopped insulin with GI illness, vomiting, abdominal pain, polydipsia, polyuria, Kussmaul breathing, fruity breath, dehydrated.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "I'm really tired — ask me simpler? I want to fix whatever I did wrong with my diabetes.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'appendicitis-pain-moved-rlq',
    titleMatchers: ['pain moved', 'moved to my right'],
    complaintMatchers: ['stomach pain moved', 'pain moved'],
    defaultAnswer:
      "Pain started around my belly button yesterday, then today it slid down to my right lower side. I don't want to eat, I'm nauseated, and walking into the ER made it worse. No diarrhea.",
    qa: [
      {
        id: 'chief',
        answer:
          "My stomach pain moved — started in the middle yesterday, now it's stuck on the right low side. Walking and bouncing in the car killed me.",
        patterns: ['what brought you', 'chief', 'problem', 'stomach'],
        keywords: ['stomach', 'pain', 'brought', 'problem'],
      },
      {
        id: 'migration',
        answer:
          "Yesterday it was periumbilical — like around the belly button. This morning it migrated right lower. That's why I came in — heard that's bad.",
        patterns: ['move', 'migrate', 'shift', 'belly button'],
        keywords: ['move', 'migrate', 'shift', 'button'],
      },
      {
        id: 'onset',
        answer:
          "About twenty-four hours total — gradual at first, sharper today. Fever since last night they said.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'hours'],
      },
      {
        id: 'appetite',
        answer:
          "Haven't wanted food since yesterday lunch — even pizza smells gross. That's weird for me.",
        patterns: ['appetite', 'eat', 'food', 'hungry'],
        keywords: ['appetite', 'eat', 'food', 'hungry'],
      },
      {
        id: 'nausea',
        answer:
          "Nauseated — almost vomited once, didn't. No diarrhea, bowel movement normal yesterday.",
        patterns: ['nausea', 'vomit', 'diarrhea', 'bowel'],
        keywords: ['nausea', 'vomit', 'diarrhea', 'bowel'],
      },
      {
        id: 'location',
        answer:
          "Right lower belly now — pressing hurts. Middle pain mostly gone.",
        patterns: ['where', 'location', 'which side'],
        keywords: ['where', 'location', 'right', 'lower'],
      },
      {
        id: 'severity',
        answer:
          "Right now 7/10 at rest, 9 if I walk or cough. Cough test hurt bad when nurse asked.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', 'severe'],
      },
      {
        id: 'fever',
        answer:
          "Felt feverish last night — 100-something at urgent care kiosk. Chills a little.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'urinary',
        answer:
          "Peeing normal, no burning. No blood in urine that I saw.",
        patterns: ['urine', 'urinary', 'burning', 'pee'],
        keywords: ['urine', 'urinary', 'burning', 'pee'],
      },
      {
        id: 'meds',
        answer:
          "No regular meds — took Tylenol once for pain, didn't help much.",
        patterns: ['medication', 'medicine'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'family',
        answer:
          "Mom had her appendix out as a teen — same story she says. Otherwise healthy family.",
        patterns: ['family', 'appendix'],
        keywords: ['family', 'appendix'],
      },
      {
        id: 'worse-better',
        answer:
          "Movement, walking, car bumps — worse. Lying still on my back is least bad but still hurts.",
        patterns: ['worse', 'better', 'movement'],
        keywords: ['worse', 'better', 'movement', 'walk'],
      },
      {
        id: 'timing',
        answer:
          "Constant now — was crampy on and off yesterday, steady ache today.",
        patterns: ['constant', 'come and go', 'timing'],
        keywords: ['constant', 'come', 'go'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing fine — belly pain when I breathe deep on the right side.",
        patterns: ['breath', 'shortness'],
        keywords: ['breath', 'short'],
      },
      {
        id: 'travel',
        answer:
          "No recent travel — campus housing.",
        patterns: ['travel', 'trip'],
        keywords: ['travel', 'trip'],
      },
      {
        id: 'open',
        answer:
          "Periumbilical to RLQ migration, anorexia, nausea, fever, worse with movement, no diarrhea dysuria.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — hurts to talk long. What do you need to know?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'aortic-dissection-tearing-chest',
    titleMatchers: ['chest feels like it', 'tearing'],
    complaintMatchers: ['ripped inside', 'something ripped'],
    defaultAnswer:
      "It feels like something tore inside my chest — sudden, ripping, goes straight through to my back. I was moving equipment at the job site. I'm soaked in sweat and my blood pressure was different in each arm on the ambulance.",
    qa: [
      {
        id: 'chief',
        answer:
          "Like something ripped inside my chest — not pressure like heartburn, a tear. Hit me in one second while I was lifting. Pain blasts through to my back between the shoulders.",
        patterns: ['what brought you', 'chief', 'problem', 'chest'],
        keywords: ['chest', 'problem', 'brought', 'rip', 'tear'],
      },
      {
        id: 'onset',
        answer:
          "Maybe forty-five minutes ago at work — moving a compressor. Instant max pain, no build-up.",
        patterns: ['when start', 'onset', 'sudden'],
        keywords: ['when', 'start', 'sudden'],
      },
      {
        id: 'radiation',
        answer:
          "Straight through to my upper back — between the shoulder blades. Not down the arm like my buddy's heart attack.",
        patterns: ['radiat', 'back', 'spread', 'arm'],
        keywords: ['radiat', 'back', 'spread', 'arm'],
      },
      {
        id: 'quality',
        answer:
          "Tearing, ripping — I told the guys it felt like leather splitting. Worst pain of my life.",
        patterns: ['describe', 'feel like', 'quality', 'character'],
        keywords: ['describe', 'feel', 'tearing', 'ripping'],
      },
      {
        id: 'severity',
        answer:
          "Ten plus — I almost passed out. Can't find a position that helps.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', '10', 'severe'],
      },
      {
        id: 'hypertension',
        answer:
          "I've got high blood pressure — supposed to take meds, I miss doses when shifts run long. Last clinic visit was high, don't remember the number.",
        patterns: ['blood pressure', 'hypertension', 'high bp', 'history'],
        keywords: ['pressure', 'hypertension', 'high', 'bp'],
      },
      {
        id: 'bp-arms',
        answer:
          "EMS said right arm higher than left — freaked me out. Felt pulses maybe different, I don't know medical stuff.",
        patterns: ['arm', 'blood pressure different', 'unequal'],
        keywords: ['arm', 'unequal', 'pressure', 'different'],
      },
      {
        id: 'sweat',
        answer:
          "Drenched — shirt soaked like I ran a mile in heat. Cold clammy sweat, not fever sweat.",
        patterns: ['sweat', 'clammy', 'diaphoresis'],
        keywords: ['sweat', 'clammy', 'drench'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing fast from pain — lungs feel okay, not asthma tight.",
        patterns: ['breath', 'shortness'],
        keywords: ['breath', 'short'],
      },
      {
        id: 'fever',
        answer:
          "No fever — this is pain, not infection.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'meds',
        answer:
          "Amlodipine when I remember, ibuprofen sometimes for knee. No cocaine, no meth.",
        patterns: ['medication', 'medicine', 'drug'],
        keywords: ['med', 'medicine', 'drug'],
      },
      {
        id: 'family',
        answer:
          "Dad died of a heart attack at sixty-two. No one said aortic problem in family.",
        patterns: ['family', 'heart', 'relative'],
        keywords: ['family', 'heart', 'relative'],
      },
      {
        id: 'mi-vs',
        answer:
          "Buddy had crushing MI — mine's tearing to the back, different. No nitro at home.",
        patterns: ['heart attack', 'mi', 'crushing'],
        keywords: ['heart', 'attack', 'crushing'],
      },
      {
        id: 'worse-better',
        answer:
          "Nothing helps — morphine in ambulance took edge off maybe 10%. Moving makes it worse.",
        patterns: ['worse', 'better', 'anything make'],
        keywords: ['worse', 'better'],
      },
      {
        id: 'timing',
        answer:
          "Constant since onset — not waxing waning.",
        patterns: ['constant', 'come and go'],
        keywords: ['constant', 'come', 'go'],
      },
      {
        id: 'travel',
        answer:
          "No travel — local construction site downtown.",
        patterns: ['travel', 'flight'],
        keywords: ['travel', 'flight'],
      },
      {
        id: 'nausea',
        answer:
          "Nauseated from pain — didn't vomit.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'open',
        answer:
          "Sudden tearing chest to back, exertion, uncontrolled HTN, unequal arm BPs, diaphoresis, terrified.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "God — ask quick, the pain is unbearable when I talk too long.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
