import type { FallbackScenario } from './types'

export const nephrologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'nephro-lithiasis-daniel-flank',
    titleMatchers: ['side hurts', 'flank', 'worse than anything', 'kidney'],
    complaintMatchers: ['back and side', 'unbearable', 'side pain'],
    defaultAnswer:
      "My right side and back started killing me out of nowhere — comes in waves, worse than anything I've had. It creeps toward my groin, I'm nauseous, can't lie still. No fever. I might have seen pink pee once.",
    qa: [
      {
        id: 'chief',
        answer:
          "I'm here because the pain is unbearable — right flank into back, waves, can't get comfortable on the stretcher.",
        patterns: ['what brings', 'chief', 'why are you here'],
        keywords: ['bring', 'chief', 'here'],
      },
      {
        id: 'pain-quality',
        answer:
          "Colicky — ramps up brutal, eases a little, ramps again. Nothing like muscle ache; more like cramp-stab deep inside.",
        patterns: ['pain', 'describe', 'character', 'quality'],
        keywords: ['pain', 'describe', 'quality'],
      },
      {
        id: 'radiation',
        answer:
          "Shoots toward my groin on that side — maybe testicle — freaky. I didn't connect back pain with that route before today.",
        patterns: ['radiat', 'spread', 'groin', 'where'],
        keywords: ['groin', 'radiat', 'spread'],
      },
      {
        id: 'nausea',
        answer:
          "Nausea is real — dry heaved once. Can't think about food.",
        patterns: ['nausea', 'vomit', 'sick'],
        keywords: ['nausea', 'vomit', 'sick'],
      },
      {
        id: 'fever',
        answer:
          "No fever, no chills like infection — just sweaty from hurting.",
        patterns: ['fever', 'temperature', 'chill'],
        keywords: ['fever', 'chill', 'temperature'],
      },
      {
        id: 'urine',
        answer:
          "Looked a little pink last time I peed — not gushing blood, but 'that's off.' Could be dehydration; could be something else — scared me.",
        patterns: ['urine', 'pee', 'blood', 'hematuria'],
        keywords: ['urine', 'pee', 'blood'],
      },
      {
        id: 'urination',
        answer:
          "Stream still happens — small amounts — stings a bit at the end sometimes. Mostly I'm focused on the flank horror show.",
        patterns: ['urination', 'void', 'frequency'],
        keywords: ['urination', 'void', 'frequency'],
      },
      {
        id: 'trauma',
        answer:
          "No injury, no fall off the truck — normal deliveries, then boom pain.",
        patterns: ['trauma', 'injury', 'fall'],
        keywords: ['trauma', 'injury', 'fall'],
      },
      {
        id: 'timing',
        answer:
          "About two hours into shift — sudden. Still going strong.",
        patterns: ['when', 'onset', 'how long', 'start'],
        keywords: ['when', 'start', 'long'],
      },
      {
        id: 'hydration',
        answer:
          "Ran behind on water today — bad plan when you're hauling boxes. Trying to sip now but nausea fights it.",
        patterns: ['hydration', 'water', 'fluid', 'drink'],
        keywords: ['water', 'fluid', 'drink'],
      },
      {
        id: 'medications',
        answer:
          "Ibuprofen earlier — useless. No regular kidney pills.",
        patterns: ['medication', 'medicine', 'drug'],
        keywords: ['med', 'medicine', 'drug'],
      },
      {
        id: 'family',
        answer:
          "Uncle mentions stones — family whisper stuff — I never had one before.",
        patterns: ['family', 'history', 'prior stone'],
        keywords: ['family', 'history', 'stone'],
      },
      {
        id: 'appetite',
        answer:
          "Zero appetite — even smell of hospital food turns my stomach.",
        patterns: ['appetite', 'eat', 'food'],
        keywords: ['appetite', 'eat', 'food'],
      },
      {
        id: 'helps-worse',
        answer:
          "Writhing and pacing beat lying flat — nothing truly fixes it. Heating pad fantasy sounds nice but I'd still hurt.",
        patterns: ['worse', 'better', 'help', 'relief'],
        keywords: ['worse', 'better', 'help'],
      },
      {
        id: 'bowel',
        answer:
          "Bowels quiet-ish — not classic appendix story; pain is flank-side.",
        patterns: ['bowel', 'stool', 'constipation'],
        keywords: ['bowel', 'stool'],
      },
      {
        id: 'chest',
        answer:
          "Lungs feel okay — not heart attack chest; pain is side/back domain.",
        patterns: ['chest', 'heart', 'breathing'],
        keywords: ['chest', 'heart', 'breath'],
      },
      {
        id: 'vague',
        answer:
          "Can you ask one thing? Hard to think through waves.",
        patterns: ['understand', 'repeat', 'explain'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'nephro-nephrotic-amanda-edema',
    titleMatchers: ['face puffy', 'puffy every morning', 'swelling'],
    complaintMatchers: ['face and legs', 'swelling', 'foam'],
    defaultAnswer:
      'Morning face puff, sock lines on legs by evening, foamy toilet water, weight up, teacher-tired. No fever. Occasional ibuprofen for cramps.',
    qa: [
      {
        id: 'chief',
        answer:
          "Swelling won't quit — rings don't fit, kids ask if I'm sick.",
        patterns: ['what brings', 'chief', 'complaint'],
        keywords: ['bring', 'chief', 'complaint'],
      },
      {
        id: 'swelling',
        answer:
          "Periorbital worst AM; legs heavy PM — bilateral, squishy pits when I press.",
        patterns: ['swell', 'edema', 'puff', 'legs'],
        keywords: ['swell', 'edema', 'legs'],
      },
      {
        id: 'urine',
        answer:
          "Foamy pee — like dish soap — embarrassed at work restrooms.",
        patterns: ['urine', 'pee', 'foam', 'protein'],
        keywords: ['urine', 'foam', 'pee'],
      },
      {
        id: 'weight',
        answer:
          "Scale climbed without second dessert — depressing mystery.",
        patterns: ['weight', 'gain', 'pounds'],
        keywords: ['weight', 'gain'],
      },
      {
        id: 'fatigue',
        answer:
          "Standing teaching wipes me — voice fine, body heavy.",
        patterns: ['fatigue', 'tired', 'energy'],
        keywords: ['tired', 'fatigue', 'energy'],
      },
      {
        id: 'bp',
        answer:
          "Blood pressure sneaking high — runs in family; hoped I'd dodge longer.",
        patterns: ['blood pressure', 'hypertension', 'bp'],
        keywords: ['pressure', 'hypertension', 'bp'],
      },
      {
        id: 'fever',
        answer:
          "No fever, no dysuria burning classic UTI vibes.",
        patterns: ['fever', 'infection'],
        keywords: ['fever', 'infection'],
      },
      {
        id: 'chest',
        answer:
          "Not orthopnea drowning — more fluid legs/face than lungs story.",
        patterns: ['chest', 'shortness', 'orthopnea'],
        keywords: ['chest', 'breath', 'orthopnea'],
      },
      {
        id: 'medications',
        answer:
          "Ibuprofen sometimes cramps — probably too much lately.",
        patterns: ['medication', 'nsaid', 'ibuprofen'],
        keywords: ['med', 'nsaid', 'ibuprofen'],
      },
      {
        id: 'dvt',
        answer:
          "Both calves, not one hot cord — worried about clots anyway.",
        patterns: ['dvt', 'calf', 'clot', 'travel'],
        keywords: ['calf', 'clot', 'dvt'],
      },
      {
        id: 'appetite',
        answer:
          "Appetite dull — eating on autopilot.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite', 'eat'],
      },
      {
        id: 'timing',
        answer:
          'Weeks ramp — more obvious last half when foam startled me.',
        patterns: ['when', 'how long', 'duration'],
        keywords: ['when', 'long', 'duration'],
      },
      {
        id: 'family',
        answer:
          'Parents blood pressure thyroid chatter — renal not labeled.',
        patterns: ['family', 'history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'stress',
        answer:
          "Work stress constant — but this feels physical not just burnout.",
        patterns: ['stress', 'anxiety'],
        keywords: ['stress', 'anxiety'],
      },
      {
        id: 'hydration',
        answer:
          "Drinking water — maybe not enough; tried cutting ramen salt superstitiously.",
        patterns: ['hydration', 'water', 'salt'],
        keywords: ['hydration', 'water', 'salt'],
      },
      {
        id: 'helps',
        answer:
          'Legs up couch slight help; mornings still puff.',
        patterns: ['help', 'worse', 'better'],
        keywords: ['help', 'worse'],
      },
      {
        id: 'nausea',
        answer:
          "Not really nauseated — bloated puff more than GI bug.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'vague',
        answer:
          "One topic at a time? Overwhelmed listing symptoms.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'nephro-psgn-jacob-cola-urine',
    titleMatchers: ['urine looks like cola', 'cola', 'dark urine'],
    complaintMatchers: ['dark urine', 'cola', 'puffy'],
    defaultAnswer:
      "Brown cola pee couple days, puffy eyes, tired, headache sometimes. Sore throat two weeks back — antibiotics. BP seemed high here. Scared for school Monday.",
    qa: [
      {
        id: 'chief',
        answer:
          "Mom freaked about toilet color — I admitted it's been weird.",
        patterns: ['what brings', 'chief', 'problem'],
        keywords: ['bring', 'chief', 'problem'],
      },
      {
        id: 'urine',
        answer:
          "Dark brown — cola gross — not much burning.",
        patterns: ['urine', 'pee', 'dark', 'blood'],
        keywords: ['urine', 'dark', 'pee'],
      },
      {
        id: 'throat',
        answer:
          "Strep-ish throat two weeks ago — finished antibiotics — thought I was done.",
        patterns: ['throat', 'strep', 'sore', 'antibiotic'],
        keywords: ['throat', 'strep', 'sore'],
      },
      {
        id: 'swelling',
        answer:
          "Eyelids puffy mornings — middle school nightmare visibility.",
        patterns: ['swell', 'puffy', 'face'],
        keywords: ['swell', 'puffy', 'face'],
      },
      {
        id: 'headache',
        answer:
          "Headache nagging — not migraine screaming.",
        patterns: ['headache', 'head'],
        keywords: ['headache', 'head'],
      },
      {
        id: 'fever',
        answer:
          "Mom says low-ish temp — not raging.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'bp',
        answer:
          "Nurse worried about BP — numbers sounded adult-high — scared me.",
        patterns: ['blood pressure', 'bp', 'hypertension'],
        keywords: ['pressure', 'bp', 'high'],
      },
      {
        id: 'pain',
        answer:
          "Dull back ache sometimes — not main complaint vs pee color.",
        patterns: ['pain', 'flank', 'belly'],
        keywords: ['pain', 'flank', 'belly'],
      },
      {
        id: 'trauma',
        answer:
          "No sports trauma hit kidneys — didn't fall off bike.",
        patterns: ['trauma', 'injury', 'sport'],
        keywords: ['trauma', 'injury', 'sport'],
      },
      {
        id: 'school',
        answer:
          "Worried classmates bully meme my face — anxious about Monday.",
        patterns: ['school', 'class', 'peer'],
        keywords: ['school', 'class'],
      },
      {
        id: 'appetite',
        answer:
          "Food meh — tired appetite.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite', 'eat'],
      },
      {
        id: 'medications',
        answer:
          "Just the antibiotic course — no regular meds.",
        patterns: ['medication', 'medicine'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'family',
        answer:
          "No known kidney disease — cousin lupus whisper unrelated maybe.",
        patterns: ['family', 'history', 'lupus'],
        keywords: ['family', 'history'],
      },
      {
        id: 'timing',
        answer:
          'Dark urine ~2 days; puff parallel; throat 2 weeks back.',
        patterns: ['when', 'how long', 'onset'],
        keywords: ['when', 'long', 'onset'],
      },
      {
        id: 'nausea',
        answer:
          "Little queasy — not projectile.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'hydration',
        answer:
          "Drinking water because adults keep saying — unsure if helps color.",
        patterns: ['hydration', 'water', 'drink'],
        keywords: ['hydration', 'water'],
      },
      {
        id: 'helps',
        answer:
          "Rest blah — distraction video games until tired.",
        patterns: ['help', 'worse', 'better'],
        keywords: ['help', 'better'],
      },
      {
        id: 'vague',
        answer:
          "Kid brain overloaded — one question?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'nephro-aki-george-dehydration',
    titleMatchers: ['weak', "can't catch my breath", 'feel terrible'],
    complaintMatchers: ['weak', 'breath', 'urine'],
    defaultAnswer:
      "Vomiting GI bug, couldn't hydrate, now barely peeing dark bits, dizzy standing, winded walking. Took lisinopril through mess — maybe dumb. No chest pain.",
    qa: [
      {
        id: 'chief',
        answer:
          "Felt terrible days — weakness and breathing off pushed me in.",
        patterns: ['what brings', 'chief'],
        keywords: ['bring', 'chief'],
      },
      {
        id: 'vomit',
        answer:
          "Couldn't keep fluids — everything bounced — dehydrated badly.",
        patterns: ['vomit', 'nausea', 'dehydrat'],
        keywords: ['vomit', 'dehydrat', 'nausea'],
      },
      {
        id: 'urine',
        answer:
          "Output tanked — dark small amounts — frightening.",
        patterns: ['urine', 'pee', 'output', 'oliguria'],
        keywords: ['urine', 'pee', 'output'],
      },
      {
        id: 'weak',
        answer:
          "Weak like flu squared — stairs to bathroom exhaust me.",
        patterns: ['weak', 'fatigue', 'dizzy'],
        keywords: ['weak', 'dizzy', 'fatigue'],
      },
      {
        id: 'breath',
        answer:
          "Short breath without classic heart squeeze — air hunger.",
        patterns: ['breath', 'short', 'sob', 'oxygen'],
        keywords: ['breath', 'short', 'oxygen'],
      },
      {
        id: 'chest',
        answer:
          "No cardiac squeeze pain — rule that in your tests not my story.",
        patterns: ['chest', 'heart', 'pain'],
        keywords: ['chest', 'heart', 'pain'],
      },
      {
        id: 'fever',
        answer:
          "Not hot now — maybe low first sick day.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'medications',
        answer:
          "Lisinopril continued through vomiting — statin nightly usually.",
        patterns: ['medication', 'lisinopril', 'ace'],
        keywords: ['med', 'lisinopril', 'ace'],
      },
      {
        id: 'nsaid',
        answer:
          "Maybe one ibuprofen early — stomach rebelled after.",
        patterns: ['nsaid', 'ibuprofen'],
        keywords: ['nsaid', 'ibuprofen'],
      },
      {
        id: 'timing',
        answer:
          "GI crash few days peak — urine worst yesterday-today.",
        patterns: ['when', 'how long', 'duration'],
        keywords: ['when', 'long', 'duration'],
      },
      {
        id: 'appetite',
        answer:
          "Sips only — appetite dead.",
        patterns: ['appetite', 'eat', 'drink'],
        keywords: ['appetite', 'eat', 'drink'],
      },
      {
        id: 'family',
        answer:
          "Brother vague kidney issues — should've listened at holidays.",
        patterns: ['family', 'history', 'kidney'],
        keywords: ['family', 'history', 'kidney'],
      },
      {
        id: 'hydration',
        answer:
          "Tried sports drinks — came back up — mouth sandpaper dry.",
        patterns: ['hydration', 'water', 'fluid'],
        keywords: ['hydration', 'water', 'fluid'],
      },
      {
        id: 'nausea',
        answer:
          "Constant nausea landscape — heaving drained me.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'helps',
        answer:
          "Propped pillows breathing slightly better — moving kills.",
        patterns: ['help', 'worse', 'better'],
        keywords: ['help', 'worse'],
      },
      {
        id: 'belly',
        answer:
          "Belly sore from heaving — not focal surgical point tenderness story.",
        patterns: ['abdomen', 'belly', 'pain'],
        keywords: ['abdomen', 'belly', 'pain'],
      },
      {
        id: 'fever-sepsis',
        answer:
          "Nobody said infection word — I feel dry not septic TV drama.",
        patterns: ['sepsis', 'infection'],
        keywords: ['sepsis', 'infection'],
      },
      {
        id: 'vague',
        answer:
          "Slow down questions — dizzy fog.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'nephro-ckd-richard-hypertension',
    titleMatchers: ['blood pressure', 'pressure keeps going up', 'bp'],
    complaintMatchers: ['pressure rising', 'hypertension', 'doctor says'],
    defaultAnswer:
      "BP climbing despite meds, diabetes years, ankle puff evenings, food blah, maybe foamy pee sometimes. Ibuprofen nights for knees — know it's maybe stupid. Wife nagging in love.",
    qa: [
      {
        id: 'chief',
        answer:
          "PCP says pressure marching up — home numbers ugly — referral scare.",
        patterns: ['what brings', 'chief', 'complaint'],
        keywords: ['bring', 'chief', 'complaint'],
      },
      {
        id: 'bp',
        answer:
          "Morning cuff readings worse — meds not taming like before.",
        patterns: ['blood pressure', 'hypertension', 'bp'],
        keywords: ['pressure', 'hypertension', 'bp'],
      },
      {
        id: 'diabetes',
        answer:
          "Type 2 long haul — shots and pills — stress eating sabotage.",
        patterns: ['diabetes', 'glucose', 'a1c', 'sugar'],
        keywords: ['diabetes', 'sugar', 'glucose'],
      },
      {
        id: 'swelling',
        answer:
          "Ankles puffy PM — socks imprint skin.",
        patterns: ['swell', 'edema', 'legs'],
        keywords: ['swell', 'edema', 'legs'],
      },
      {
        id: 'fatigue',
        answer:
          "Parking garage stairs wipe me — pride hurt more than calves.",
        patterns: ['fatigue', 'tired', 'weak'],
        keywords: ['fatigue', 'tired', 'weak'],
      },
      {
        id: 'appetite',
        answer:
          "Food gray — wife notices picking.",
        patterns: ['appetite', 'eat', 'food'],
        keywords: ['appetite', 'eat', 'food'],
      },
      {
        id: 'urine',
        answer:
          "Sometimes persistent toilet foam — told myself hydraulic joke.",
        patterns: ['urine', 'pee', 'foam', 'protein'],
        keywords: ['urine', 'foam', 'pee'],
      },
      {
        id: 'chest',
        answer:
          "No angina story — I'd sprint in if true.",
        patterns: ['chest', 'heart', 'pain'],
        keywords: ['chest', 'heart', 'pain'],
      },
      {
        id: 'fever',
        answer:
          "Afebrile energy slump — not flu.",
        patterns: ['fever', 'infection'],
        keywords: ['fever', 'infection'],
      },
      {
        id: 'medications',
        answer:
          "Antihypertensives, metformin, GLP — accountant brain should track better.",
        patterns: ['medication', 'medicine', 'prescription'],
        keywords: ['med', 'medicine', 'prescription'],
      },
      {
        id: 'nsaid',
        answer:
          "Ibuprofen knee nights — bad habit rationalized.",
        patterns: ['nsaid', 'ibuprofen', 'advil'],
        keywords: ['nsaid', 'ibuprofen'],
      },
      {
        id: 'family',
        answer:
          "Dad early death heart-kidney tangle — details buried family silence.",
        patterns: ['family', 'history', 'father'],
        keywords: ['family', 'history', 'father'],
      },
      {
        id: 'timing',
        answer:
          "Pressure creep months; fatigue edema weeks noticeable denial.",
        patterns: ['when', 'how long', 'progression'],
        keywords: ['when', 'long', 'progression'],
      },
      {
        id: 'nocturia',
        answer:
          "Night pee once twice — new normal creeping.",
        patterns: ['nocturia', 'night', 'urinate'],
        keywords: ['nocturia', 'night', 'urinate'],
      },
      {
        id: 'hydration',
        answer:
          "Coffee lake — real water could improve.",
        patterns: ['hydration', 'water', 'fluid'],
        keywords: ['hydration', 'water'],
      },
      {
        id: 'nausea',
        answer:
          "Not really nauseated — anorexia bland different flavor.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'helps',
        answer:
          "Salt cut micro effect — exercise fantasy unexecuted.",
        patterns: ['help', 'worse', 'lifestyle'],
        keywords: ['help', 'lifestyle', 'salt'],
      },
      {
        id: 'vague',
        answer:
          "Too many threads — one branch at a time?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
