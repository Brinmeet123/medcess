import type { FallbackScenario } from './types'

export const endocrinologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'graves-hyperthyroid-weight-loss',
    titleMatchers: ['losing weight', 'why am i losing'],
    complaintMatchers: ['losing weight', 'eating more'],
    defaultAnswer:
      "I've lost two dress sizes in three months but I'm starving all the time — I eat constantly. I'm sweaty, shaky, my heart races during warm-up, and I can't sleep. Everyone at the gym says I look great but I feel wired and weird.",
    qa: [
      {
        id: 'chief',
        answer:
          "I keep losing weight even though I'm eating more than ever — bigger meals, snacks, the works. I'm a fitness instructor so people think it's intentional, but I didn't try to drop this fast.",
        patterns: ['what brought you', 'chief', 'problem', 'weight'],
        keywords: ['weight', 'problem', 'brought', 'losing'],
      },
      {
        id: 'onset',
        answer:
          "Maybe three months — gradual at first, then people started commenting. Pants kept getting looser every week.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'months'],
      },
      {
        id: 'appetite',
        answer:
          "Huge appetite — I'm embarrassed how much I eat. Still dropping weight which makes no sense to me.",
        patterns: ['appetite', 'eating', 'hungry', 'food'],
        keywords: ['appetite', 'eat', 'hungry', 'food'],
      },
      {
        id: 'heat-sweat',
        answer:
          "I'm always hot — classroom with AC and I'm flushed. Night sweats soak my sheets sometimes.",
        patterns: ['heat', 'cold', 'sweat', 'temperature'],
        keywords: ['heat', 'cold', 'sweat', 'hot'],
      },
      {
        id: 'heart-palpitations',
        answer:
          "Heart races — during yoga warm-up it hits scary speeds. Sometimes fluttery in my chest when I'm sitting still.",
        patterns: ['heart', 'palpitation', 'racing', 'pulse'],
        keywords: ['heart', 'palpitation', 'racing', 'pulse'],
      },
      {
        id: 'tremor-sleep',
        answer:
          "Hands shake holding water bottles — clients notice. Sleep is garbage; I wake at 3 a.m. mind racing.",
        patterns: ['tremor', 'shake', 'sleep', 'insomnia'],
        keywords: ['tremor', 'shake', 'sleep', 'insomnia'],
      },
      {
        id: 'mood',
        answer:
          "Anxious and restless — snap at my boyfriend over nothing then cry. Not like my usual upbeat self.",
        patterns: ['mood', 'anxiety', 'stress', 'feel emotionally'],
        keywords: ['mood', 'anxiety', 'stress', 'feel'],
      },
      {
        id: 'eyes-neck',
        answer:
          "Eyes feel puffy — coworker said they look bigger in photos. Neck feels full when I swallow, not painful.",
        patterns: ['eye', 'vision', 'neck', 'throat', 'swelling'],
        keywords: ['eye', 'neck', 'throat', 'swell'],
      },
      {
        id: 'fever-illness',
        answer:
          "No fever, no bad cold before this. Felt healthy except this spiral.",
        patterns: ['fever', 'sick', 'illness', 'infection'],
        keywords: ['fever', 'sick', 'illness'],
      },
      {
        id: 'meds-caffeine',
        answer:
          "Pre-workout sometimes, one coffee — not crazy amounts. No new prescriptions.",
        patterns: ['medication', 'caffeine', 'coffee', 'drug', 'supplement'],
        keywords: ['med', 'caffeine', 'coffee', 'drug', 'supplement'],
      },
      {
        id: 'family',
        answer:
          "Mom had thyroid removed in her forties — don't know why exactly. Aunt with autoimmune stuff.",
        patterns: ['family', 'thyroid', 'relative'],
        keywords: ['family', 'thyroid', 'relative'],
      },
      {
        id: 'worse-better',
        answer:
          "Heat and stress make heart race worse. Eating doesn't fix the weight loss — that's the scary part.",
        patterns: ['worse', 'better', 'anything make'],
        keywords: ['worse', 'better'],
      },
      {
        id: 'timing',
        answer:
          "Pretty constant now — used to be just around period, but this is daily for months.",
        patterns: ['constant', 'come and go', 'timing'],
        keywords: ['constant', 'come', 'go'],
      },
      {
        id: 'pain',
        answer:
          "No real pain — discomfort is internal buzzing energy, not sharp pain.",
        patterns: ['pain', 'hurt'],
        keywords: ['pain', 'hurt'],
      },
      {
        id: 'urination-thirst',
        answer:
          "Peeing normal I think — thirsty from workouts mostly. Not guzzling water constantly.",
        patterns: ['urinat', 'thirst', 'water'],
        keywords: ['urinat', 'thirst', 'water'],
      },
      {
        id: 'open',
        answer:
          "Three-month weight loss despite eating more, heat, sweat, tremor, insomnia, palpitations, anxious, neck/eyes feel different.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — say that again? My brain feels like it's buzzing.",
        patterns: ['understand', 'repeat', 'clarify'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'hashimoto-hypothyroid-tired-cold',
    titleMatchers: ['always tired', 'tired and cold'],
    complaintMatchers: ['exhausted', 'tired all the time'],
    defaultAnswer:
      "I'm exhausted no matter how much I sleep — I nap after work and still drag. Gained weight, always cold in the office, skin's like sandpaper, constipated, and my ponytail feels thinner. Brain fog at work is killing me.",
    qa: [
      {
        id: 'chief',
        answer:
          "I feel exhausted all the time — that's why I'm here. Used to power through tax season; now I need a nap at 4 p.m. every day.",
        patterns: ['what brought you', 'chief', 'exhausted', 'fatigue'],
        keywords: ['exhausted', 'tired', 'fatigue', 'brought'],
      },
      {
        id: 'onset',
        answer:
          "Months — maybe six to nine, slowly worse. Thought it was stress until coworkers noticed I was off my game.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'months'],
      },
      {
        id: 'weight',
        answer:
          "Up about twelve pounds without really changing how I eat — jeans tight, face puffier in photos.",
        patterns: ['weight', 'gain', 'lose weight'],
        keywords: ['weight', 'gain', 'pound'],
      },
      {
        id: 'cold',
        answer:
          "Always cold — I wear a sweater when everyone else is fine. Hands and feet like ice.",
        patterns: ['cold', 'heat', 'temperature intolerance'],
        keywords: ['cold', 'heat', 'temperature'],
      },
      {
        id: 'skin-hair',
        answer:
          "Skin dry and flaky, lotion doesn't last. Hair thinning — more in the brush, ponytail smaller.",
        patterns: ['skin', 'hair', 'dry', 'thinning'],
        keywords: ['skin', 'hair', 'dry', 'thin'],
      },
      {
        id: 'constipation',
        answer:
          "Bowels every two to three days — hard to go. Not bloody, just sluggish.",
        patterns: ['constipation', 'bowel', 'stool'],
        keywords: ['constipation', 'bowel', 'stool'],
      },
      {
        id: 'mood-concentration',
        answer:
          "Foggy at work — miss decimal places, have to double-check everything. Mood low but I think it's because I'm tired.",
        patterns: ['mood', 'depress', 'concentrat', 'memory', 'focus'],
        keywords: ['mood', 'depress', 'concentrat', 'focus', 'memory'],
      },
      {
        id: 'heart-chest',
        answer:
          "No chest pain. Heart feels slow sometimes when I check my watch — fifties resting.",
        patterns: ['chest pain', 'heart', 'palpitation'],
        keywords: ['chest', 'heart', 'pain'],
      },
      {
        id: 'fever',
        answer:
          "No fever — not acutely sick, just worn down chronically.",
        patterns: ['fever', 'sick', 'infection'],
        keywords: ['fever', 'sick'],
      },
      {
        id: 'meds',
        answer:
          "Just a multivitamin. No new meds. Tried more coffee — didn't help fatigue.",
        patterns: ['medication', 'medicine', 'drug'],
        keywords: ['med', 'medicine', 'drug'],
      },
      {
        id: 'family',
        answer:
          "Sister has hypothyroid on levothyroxine. Mom never tested. Dad healthy.",
        patterns: ['family', 'thyroid', 'relative'],
        keywords: ['family', 'thyroid', 'relative'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep eight hours — wake unrefreshed. Snore a little per husband, not gasping.",
        patterns: ['sleep', 'snore', 'apnea'],
        keywords: ['sleep', 'snore', 'apnea'],
      },
      {
        id: 'worse-better',
        answer:
          "Mornings are hardest. Weekends I rest more but still tired — rest doesn't fix it.",
        patterns: ['worse', 'better', 'morning'],
        keywords: ['worse', 'better', 'morning'],
      },
      {
        id: 'urination-thirst',
        answer:
          "Normal peeing and thirst — not guzzling water like my nephew with diabetes scare.",
        patterns: ['urinat', 'thirst', 'water'],
        keywords: ['urinat', 'thirst', 'water'],
      },
      {
        id: 'pain',
        answer:
          "Achy sometimes but no sharp pain — general heaviness.",
        patterns: ['pain', 'hurt', 'ache'],
        keywords: ['pain', 'hurt', 'ache'],
      },
      {
        id: 'open',
        answer:
          "Months fatigue, weight gain, cold intolerance, dry skin, constipation, hair thinning, bradycardia feeling, brain fog, no fever.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "I'm sorry — what was the question? I'm drawing a blank today.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 't1dm-cant-stop-drinking-water',
    titleMatchers: ["can't stop drinking", 'drinking water constantly'],
    complaintMatchers: ['son drinks', 'water constantly'],
    defaultAnswer:
      "My son Ryan can't stop drinking water — refills his bottle all day, wakes up twice at night to pee. He's lost weight, looks tired, and teachers say he's irritable. No fever — I'm scared because my cousin has diabetes.",
    qa: [
      {
        id: 'chief',
        answer:
          "He drinks water constantly — I'm not exaggerating. We go through bottles like crazy. That's why we're here.",
        patterns: ['what brought you', 'chief', 'water', 'drinking'],
        keywords: ['water', 'drinking', 'brought', 'son'],
      },
      {
        id: 'thirst-urine',
        answer:
          "Extreme thirst and peeing all the time — he wakes me up at night heading to the bathroom. Teachers email that he leaves class to go.",
        patterns: ['thirst', 'urinat', 'pee', 'bathroom', 'night'],
        keywords: ['thirst', 'urinat', 'pee', 'bathroom', 'night'],
      },
      {
        id: 'onset',
        answer:
          "Several weeks — maybe a month or two getting worse. I thought summer heat at first.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'weeks'],
      },
      {
        id: 'weight',
        answer:
          "He's thinner — clothes baggy. Scale at home says he dropped maybe eight pounds. He eats normal portions though.",
        patterns: ['weight', 'lose', 'thin', 'appetite'],
        keywords: ['weight', 'lose', 'thin', 'appetite'],
      },
      {
        id: 'fatigue-mood',
        answer:
          "Tired after school, naps sometimes. Snappy with his sister — not like him. Grades slipped a little.",
        patterns: ['tired', 'fatigue', 'mood', 'irritable'],
        keywords: ['tired', 'fatigue', 'mood', 'irritable'],
      },
      {
        id: 'fever-illness',
        answer:
          "No fever, no bad cough. He had a mild cold weeks ago but nothing now.",
        patterns: ['fever', 'sick', 'vomit', 'diarrhea'],
        keywords: ['fever', 'sick', 'vomit', 'diarrhea'],
      },
      {
        id: 'from-ryan',
        answer:
          "(Ryan) I'm thirsty all the time and tired. I don't feel like playing soccer lately.",
        patterns: ['ryan', 'ask him', 'son say', 'patient say'],
        keywords: ['ryan', 'him', 'boy'],
      },
      {
        id: 'family-diabetes',
        answer:
          "Cousin type 1 diagnosed at sixteen — that's in the back of my mind. No parents with diabetes.",
        patterns: ['family', 'diabetes', 'relative'],
        keywords: ['family', 'diabetes', 'relative'],
      },
      {
        id: 'meds',
        answer:
          "No medicines except children's ibuprofen once for headache. No steroids.",
        patterns: ['medication', 'medicine', 'drug'],
        keywords: ['med', 'medicine', 'drug'],
      },
      {
        id: 'vomit-breathing',
        answer:
          "No vomiting today. Breathing normal — not fast or weird. That would terrify me.",
        patterns: ['vomit', 'breath', 'breathing', 'kussmaul'],
        keywords: ['vomit', 'breath', 'breathing'],
      },
      {
        id: 'pain',
        answer:
          "He says belly fine — no pain urinating, no burning.",
        patterns: ['pain', 'belly', 'abdominal', 'burning urine'],
        keywords: ['pain', 'belly', 'urine', 'burn'],
      },
      {
        id: 'worse-better',
        answer:
          "Nothing helps thirst — water doesn't satisfy for long. Sugary drinks he craves sometimes which I limited.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'better', 'help'],
      },
      {
        id: 'timing',
        answer:
          "Pretty constant all day — worse evenings he says.",
        patterns: ['constant', 'timing', 'come and go'],
        keywords: ['constant', 'timing'],
      },
      {
        id: 'open',
        answer:
          "Weeks polyuria polydipsia, weight loss, fatigue, irritability, no fever, cousin T1DM, dry lips on exam.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Can you repeat that? I'm juggling his answers and my worry.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'cushing-face-looks-different',
    titleMatchers: ['face looks different', 'body changed'],
    complaintMatchers: ['face', 'body changed'],
    defaultAnswer:
      "I feel like my body changed — rounder face in photos, belly bigger but arms look skinny. Bruise if I bump a desk. Purple stretch marks on my stomach. Hard to get up from squatting with kids. Mood swings bad this year.",
    qa: [
      {
        id: 'chief',
        answer:
          "I feel like my body changed — coworkers say my face looks different. I don't recognize myself in the staff-room mirror lately.",
        patterns: ['what brought you', 'chief', 'changed', 'face'],
        keywords: ['changed', 'face', 'body', 'brought'],
      },
      {
        id: 'onset',
        answer:
          "Over about a year — slow enough I blamed stress and age until jeans and school photos shocked me.",
        patterns: ['when start', 'onset', 'how long'],
        keywords: ['when', 'start', 'long', 'year'],
      },
      {
        id: 'weight',
        answer:
          "Gained thirty pounds — belly and face mostly. Legs and arms look thinner which is weird.",
        patterns: ['weight', 'gain', 'fat', 'obese'],
        keywords: ['weight', 'gain', 'fat'],
      },
      {
        id: 'skin-bruise',
        answer:
          "Bruise from tiny bumps — door handle, student backpack. Purple stretch marks on abdomen, not from pregnancy.",
        patterns: ['bruise', 'stria', 'stretch', 'skin', 'mark'],
        keywords: ['bruise', 'stria', 'stretch', 'skin', 'mark'],
      },
      {
        id: 'weakness',
        answer:
          "Hard to stand from squatting on the rug — need arm on chair. Stairs wind me more.",
        patterns: ['weak', 'muscle', 'strength', 'climb'],
        keywords: ['weak', 'muscle', 'strength'],
      },
      {
        id: 'mood',
        answer:
          "Mood swings — tearful then irritable. Husband says I seem different emotionally, not just looks.",
        patterns: ['mood', 'depress', 'anxiety', 'cry'],
        keywords: ['mood', 'depress', 'anxiety', 'cry'],
      },
      {
        id: 'steroids',
        answer:
          "No steroid pills — I checked. Inhaler for mild asthma years ago, not daily now. No joint injections I remember.",
        patterns: ['steroid', 'prednisone', 'inhaler', 'cream', 'injection'],
        keywords: ['steroid', 'prednisone', 'inhaler', 'cream'],
      },
      {
        id: 'menstrual',
        answer:
          "Periods irregular last few months — might be stress, not sure.",
        patterns: ['period', 'menstrual', 'cycle'],
        keywords: ['period', 'menstrual', 'cycle'],
      },
      {
        id: 'fever',
        answer:
          "No fever — not sick like infection.",
        patterns: ['fever', 'sick'],
        keywords: ['fever', 'sick'],
      },
      {
        id: 'blood-pressure',
        answer:
          "Nurse today said BP high — usually normal at annual physicals. Headaches sometimes.",
        patterns: ['blood pressure', 'hypertension', 'headache'],
        keywords: ['pressure', 'hypertension', 'headache'],
      },
      {
        id: 'heat-cold',
        answer:
          "Neither hot nor cold unusual — more about shape and bruising.",
        patterns: ['heat', 'cold', 'temperature'],
        keywords: ['heat', 'cold'],
      },
      {
        id: 'urination-thirst',
        answer:
          "Maybe peeing more — drink water at school. Not crazy thirst like diabetes stories.",
        patterns: ['urinat', 'thirst', 'diabetes'],
        keywords: ['urinat', 'thirst', 'diabetes'],
      },
      {
        id: 'family',
        answer:
          "Mom overweight, dad BP issues. No Cushing I know of — never heard that word.",
        patterns: ['family', 'relative'],
        keywords: ['family', 'relative'],
      },
      {
        id: 'worse-better',
        answer:
          "Diet tried — didn't change face shape. Exercise hurts knees now.",
        patterns: ['worse', 'better', 'diet', 'exercise'],
        keywords: ['worse', 'better', 'diet'],
      },
      {
        id: 'pain',
        answer:
          "Back ache sometimes from weight — no kidney stone pain.",
        patterns: ['pain', 'back', 'stone'],
        keywords: ['pain', 'back'],
      },
      {
        id: 'open',
        answer:
          "Year weight gain, moon face, central obesity, thin arms, bruising, purple striae, proximal weakness, mood change, HTN, no exogenous steroids.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "This is embarrassing — can you ask one thing at a time?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'hyperparathyroid-recurrent-kidney-stones',
    titleMatchers: ['kidney stones', 'getting kidney stones'],
    complaintMatchers: ['kidney stones', 'multiple kidney'],
    defaultAnswer:
      "I've had three kidney stones in five years — last one was brutal in the ER. I'm tired all the time, constipated, and my hips ache. Pee more than I used to. I know I should drink more water but I'm an engineer glued to my desk.",
    qa: [
      {
        id: 'chief',
        answer:
          "Multiple kidney stones — third one last month sent me to the ER. I'm tired of passing them.",
        patterns: ['what brought you', 'chief', 'stone', 'kidney'],
        keywords: ['stone', 'kidney', 'brought'],
      },
      {
        id: 'stones-history',
        answer:
          "Three in five years — calcium type they said last time. Never needed surgery, passed with pain meds and fluids.",
        patterns: ['how many', 'history', 'previous stone', 'recurrent'],
        keywords: ['many', 'history', 'previous', 'recurrent'],
      },
      {
        id: 'onset-fatigue',
        answer:
          "Fatigue gradual over a year — blamed travel and age. Stones come in flares when one passes.",
        patterns: ['when start', 'fatigue', 'tired', 'how long'],
        keywords: ['when', 'fatigue', 'tired', 'long'],
      },
      {
        id: 'bone-pain',
        answer:
          "Dull ache hips and knees — not arthritis diagnosis yet. Sternum tender sometimes.",
        patterns: ['bone', 'joint', 'pain', 'ache', 'hip'],
        keywords: ['bone', 'joint', 'pain', 'hip', 'ache'],
      },
      {
        id: 'constipation',
        answer:
          "Constipated often — metamucil helps a little. Not bloody stools.",
        patterns: ['constipation', 'bowel'],
        keywords: ['constipation', 'bowel'],
      },
      {
        id: 'urination',
        answer:
          "Urinating more frequently — especially nights once or twice. No burning.",
        patterns: ['urinat', 'pee', 'frequency', 'night'],
        keywords: ['urinat', 'pee', 'frequency', 'night'],
      },
      {
        id: 'thirst-hydration',
        answer:
          "Coffee all day — probably dehydrated, I know. Not endless thirst like diabetes ads.",
        patterns: ['thirst', 'water', 'drink', 'hydration'],
        keywords: ['thirst', 'water', 'drink', 'hydration'],
      },
      {
        id: 'abdominal',
        answer:
          "Occasional vague belly discomfort — might be constipation. Stone pain is flank when it hits.",
        patterns: ['abdominal', 'belly', 'flank'],
        keywords: ['abdominal', 'belly', 'flank'],
      },
      {
        id: 'fever',
        answer:
          "No fever with stones unless ER thought infection once — cultures negative.",
        patterns: ['fever', 'infection'],
        keywords: ['fever', 'infection'],
      },
      {
        id: 'weight',
        answer:
          "Weight stable — not gaining like Cushing stories online.",
        patterns: ['weight', 'gain', 'lose'],
        keywords: ['weight', 'gain', 'lose'],
      },
      {
        id: 'mood',
        answer:
          "Irritable when calcium? Nobody said that — I feel foggy some days, wife says grumpy.",
        patterns: ['mood', 'depress', 'memory', 'concentration'],
        keywords: ['mood', 'depress', 'memory', 'concentration'],
      },
      {
        id: 'meds',
        answer:
          "No prescriptions — vitamin D gummy sometimes inconsistent.",
        patterns: ['medication', 'vitamin', 'calcium supplement'],
        keywords: ['med', 'vitamin', 'calcium', 'supplement'],
      },
      {
        id: 'family',
        answer:
          "Dad kidney stones once in his fifties. No parathyroid talk in family.",
        patterns: ['family', 'stone', 'relative'],
        keywords: ['family', 'stone', 'relative'],
      },
      {
        id: 'malignancy',
        answer:
          "No cancer history, no weight loss, no night sweats — just stones and draggy fatigue.",
        patterns: ['cancer', 'malignancy', 'weight loss', 'night sweat'],
        keywords: ['cancer', 'malignancy', 'tumor'],
      },
      {
        id: 'worse-better',
        answer:
          "Stone attacks are worst — flank spasm, nausea. Between attacks just fatigue and constipation.",
        patterns: ['worse', 'better', 'stone attack'],
        keywords: ['worse', 'better', 'attack'],
      },
      {
        id: 'open',
        answer:
          "Recurrent stones, fatigue, constipation, bone ache, polyuria-ish, hypercalcemia workup pending, engineer poor hydration.",
        patterns: ['anything else', 'tell me more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — flank pain flashback. What did you need?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
