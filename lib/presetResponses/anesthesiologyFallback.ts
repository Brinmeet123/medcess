import type { FallbackScenario } from './types'

export const anesthesiologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'opioid-respiratory-depression',
    titleMatchers: ["can't catch my breath", 'catch my breath', 'sleepy breathe'],
    complaintMatchers: ['sleepy', 'breathe', 'breath', 'hard to breathe'],
    defaultAnswer:
      "I'm so tired I can barely keep my eyes open… and when I try to take a deep breath it feels like work. My wife says I keep nodding off while she's talking to me. I had knee surgery a couple hours ago.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "I feel really sleepy, and it's hard to breathe — like I can't get a full breath in. I'm not in bad chest pain or anything, I'm just… heavy and drowsy. It's scary because I keep drifting off.",
        patterns: ['what brought you', 'what is the problem', 'chief complaint', 'why are you here'],
        keywords: ['problem', 'brought', 'complaint', 'here'],
      },
      {
        id: 'breathing',
        answer:
          "My breathing feels slow and shallow. I notice it when I try to talk — I run out of air faster than normal. Nobody said my oxygen was low until the nurse put that thing on my finger and looked worried.",
        patterns: ['shortness of breath', 'breathing', 'breath', 'hard to breathe'],
        keywords: ['breath', 'breathing', 'air', 'oxygen'],
      },
      {
        id: 'surgery-timing',
        answer:
          "I had my knee replaced about two hours ago. They said it went fine. I've been in the recovery area since — that's when the heavy sleepiness really kicked in.",
        patterns: ['surgery', 'operation', 'knee', 'when was surgery'],
        keywords: ['surgery', 'operation', 'knee', 'replacement', 'post'],
      },
      {
        id: 'medications',
        answer:
          "They gave me something strong for pain in recovery — IV, I think. I don't remember the name. It helped the knee but after that I got unbelievably sleepy. I haven't taken anything at home today.",
        patterns: ['medications', 'pain medicine', 'opioid', 'morphine', 'what did they give'],
        keywords: ['medication', 'medicine', 'pain', 'opioid', 'iv', 'dose'],
      },
      {
        id: 'sedation-family',
        answer:
          "My wife is here — she says I keep falling asleep mid-sentence and she has to shake me to answer her. She said my breathing looked slow too, which freaked her out.",
        patterns: ['family', 'wife', 'falling asleep', 'somnolent'],
        keywords: ['family', 'wife', 'asleep', 'sleep', 'nodding'],
      },
      {
        id: 'chest-pain-fever',
        answer:
          "No chest pain. No fever that I know of — I don't feel hot or sick like the flu. It's more like I'm drugged-sleepy, if that makes sense.",
        patterns: ['chest pain', 'fever', 'heart attack'],
        keywords: ['chest', 'fever', 'heart', 'pain'],
      },
      {
        id: 'lung-history',
        answer:
          "I've never been diagnosed with COPD or asthma. I don't smoke much — quit years ago. Lungs were always fine before today.",
        patterns: ['lung disease', 'copd', 'asthma', 'smoke', 'pulmonary'],
        keywords: ['lung', 'copd', 'asthma', 'smoke', 'pulmonary'],
      },
      {
        id: 'pain-level',
        answer:
          "The knee hurts but it's dull right now — the sleepiness is worse than the pain honestly. Earlier the pain was sharper before they medicated me.",
        patterns: ['pain', 'how bad', 'scale'],
        keywords: ['pain', 'hurt', 'knee', 'scale'],
      },
      {
        id: 'allergies',
        answer:
          "No drug allergies that I know of. Penicillin never bothered me. I didn't take anything weird — just what they gave me here.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'worse-better',
        answer:
          "It seems worse since the pain medicine — I was awake enough right after surgery to eat a cracker. Now I can barely stay awake. Sitting up makes me dizzier.",
        patterns: ['worse', 'better', 'changed'],
        keywords: ['worse', 'better', 'changed'],
      },
      {
        id: 'nausea',
        answer:
          "A little queasy but I haven't thrown up. Mostly it's the breathing and sleepiness that scare me.",
        patterns: ['nausea', 'vomit', 'sick stomach'],
        keywords: ['nausea', 'vomit', 'sick'],
      },
      {
        id: 'open',
        answer:
          "Knee surgery two hours ago, strong pain medicine in recovery, now super sleepy, slow breathing, wife says I nod off constantly. No chest pain or fever.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'spinal-anesthesia-hypotension',
    titleMatchers: ['blood pressure keeps dropping', 'blood pressure dropping'],
    complaintMatchers: ['dizzy', 'weak', 'faint', 'hypotension'],
    defaultAnswer:
      "I feel dizzy and weak, like I might pass out. They did something in my back for the hip surgery and ever since I've been lightheaded, especially when they try to sit me up.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "I feel dizzy and weak — like the room spins when they raise the bed. I almost fainted when they tried to sit me up a little. My stomach is queasy too.",
        patterns: ['what brought you', 'problem', 'chief complaint'],
        keywords: ['problem', 'brought', 'dizzy', 'weak'],
      },
      {
        id: 'anesthesia-type',
        answer:
          "They numbed me from the waist down with a needle in my back — spinal, they called it. I was awake for the hip replacement but sedated a bit. I remember the block going in.",
        patterns: ['spinal', 'epidural', 'anesthesia', 'block'],
        keywords: ['spinal', 'epidural', 'anesthesia', 'block', 'back'],
      },
      {
        id: 'surgery',
        answer:
          "Hip replacement today — left hip. Surgery itself went okay from what they told me. It's afterward in recovery where I've felt awful.",
        patterns: ['surgery', 'hip', 'operation'],
        keywords: ['surgery', 'hip', 'operation', 'replacement'],
      },
      {
        id: 'orthostasis',
        answer:
          "Whenever the head of the bed goes up I get worse — vision tunnels, nausea, have to lie flat again. Flat I feel a little better but still weak.",
        patterns: ['sit up', 'standing', 'position', 'orthostatic'],
        keywords: ['sit', 'stand', 'position', 'head', 'bed'],
      },
      {
        id: 'chest-sob',
        answer:
          "No chest pain. I can breathe fine — it's not shortness of breath. It's more lightheadedness and weakness.",
        patterns: ['chest pain', 'shortness of breath', 'breathing'],
        keywords: ['chest', 'breath', 'breathing'],
      },
      {
        id: 'bleeding',
        answer:
          "The hip dressing looks clean — nobody said I'm bleeding. I haven't seen blood in the urine or anything. I'm pale though, I can tell in the mirror.",
        patterns: ['bleeding', 'blood loss', 'hemorrhage'],
        keywords: ['bleed', 'blood', 'hemorrhage'],
      },
      {
        id: 'nausea',
        answer:
          "Yes, pretty nauseous — they gave me a little medicine for that in the IV. It helps a bit but the dizziness is still there.",
        patterns: ['nausea', 'vomit'],
        keywords: ['nausea', 'vomit', 'sick'],
      },
      {
        id: 'fluids',
        answer:
          "I've had IV fluids — the nurse said my pressure was low and they're running fluid in. I haven't eaten much since last night before surgery.",
        patterns: ['fluids', 'iv', 'dehydration', 'drink'],
        keywords: ['fluid', 'iv', 'dehydr', 'drink', 'eat'],
      },
      {
        id: 'medications',
        answer:
          "Just what they give me in recovery — nausea med, fluids. I take lisinopril at home but they held some of my morning pills.",
        patterns: ['medications', 'medicines', 'home meds'],
        keywords: ['medication', 'medicine', 'meds', 'pill'],
      },
      {
        id: 'past-anesthesia',
        answer:
          "I had my gallbladder out years ago — general anesthesia that time. Never had a spinal before today. I didn't expect to feel this wiped and dizzy.",
        patterns: ['anesthesia before', 'previous surgery', 'past operations'],
        keywords: ['before', 'previous', 'anesthesia', 'surgery'],
      },
      {
        id: 'allergies',
        answer:
          "No allergies to medicines that I know of.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'severity',
        answer:
          "I'd say the dizziness is a 7 when they sit me up — scary. Lying flat it's more like a 4. I don't want to fall.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', 'severe', '10'],
      },
      {
        id: 'open',
        answer:
          "Hip surgery with spinal today, dizzy and weak in recovery, worse when upright, nauseous, no chest pain or trouble breathing, fluids running.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'malignant-hyperthermia',
    titleMatchers: ['something went wrong', 'went wrong during surgery'],
    complaintMatchers: ['temperature', 'heart rate rising', 'rigidity'],
    defaultAnswer:
      "I'm the circulating nurse — we're in the OR. The patient's temp and heart rate shot up suddenly, he's rigid, and end-tidal CO2 is climbing despite ventilation. Anesthesia is scrambling.",
    qa: [
      {
        id: 'situation',
        answer:
          "We're mid-case — shoulder arthroscopy. Suddenly EtCO2 jumped, heart rate went to 150, and the temperature probe reads 104°F and still rising. The surgeon noticed the arms feel stiff.",
        patterns: ['what happened', 'what is going on', 'situation', 'update'],
        keywords: ['happened', 'going', 'situation', 'wrong'],
      },
      {
        id: 'vitals',
        answer:
          "Heart rate 150, blood pressure labile around 150/90, temp 40°C on esophageal probe, SpO2 about 95%. Ventilator shows high peak pressures and rising CO2.",
        patterns: ['vitals', 'heart rate', 'temperature', 'blood pressure'],
        keywords: ['vital', 'heart', 'temp', 'pressure', 'rate'],
      },
      {
        id: 'rigidity',
        answer:
          "Generalized rigidity — masseter was tight during intubation but now whole body feels board-like. Passive movement of the limbs is difficult. Not the typical relaxation we expect under anesthesia.",
        patterns: ['rigid', 'rigidity', 'stiff', 'masseter'],
        keywords: ['rigid', 'stiff', 'rigidity', 'masseter', 'muscle'],
      },
      {
        id: 'co2',
        answer:
          "End-tidal CO2 is way up — over 60 and climbing even after increasing minute ventilation. ABG if we send it will show respiratory acidosis. Anesthesia is bagging but CO2 won't come down.",
        patterns: ['co2', 'carbon dioxide', 'capnography', 'hypercarbia'],
        keywords: ['co2', 'carbon', 'capno', 'tidal', 'ventilat'],
      },
      {
        id: 'anesthetic-agents',
        answer:
          "He's on sevoflurane and got succinylcholine for intubation at induction. No known MH history — family history wasn't available pre-op. This is a healthy 18-year-old kid.",
        patterns: ['anesthetic', 'gas', 'succinylcholine', 'volatile', 'medications given'],
        keywords: ['anesthetic', 'gas', 'sevo', 'succinyl', 'volatile', 'agent'],
      },
      {
        id: 'infection',
        answer:
          "No signs of infection pre-op — afebrile, normal white count this morning, URI weeks ago resolved. This felt instantaneous during maintenance anesthesia.",
        patterns: ['infection', 'sepsis', 'fever before'],
        keywords: ['infection', 'sepsis', 'fever', 'uri'],
      },
      {
        id: 'labs',
        answer:
          "We sent a stat potassium and CK — anesthesia mentioned potassium might be high. Urine in the Foley is getting dark. We're trying to get the MH cart.",
        patterns: ['labs', 'potassium', 'ck', 'blood test'],
        keywords: ['lab', 'potassium', 'ck', 'k', 'test'],
      },
      {
        id: 'timing',
        answer:
          "Started maybe ten minutes ago — was stable for the first hour of the case. Very rapid onset, not gradual like warming from blankets alone.",
        patterns: ['when', 'onset', 'how long', 'start'],
        keywords: ['when', 'start', 'long', 'onset', 'sudden'],
      },
      {
        id: 'urine',
        answer:
          "Foley output looks tea-colored — anesthesia said that could be myoglobin. We're increasing fluids and cooling blankets are coming.",
        patterns: ['urine', 'myoglobin', 'foley'],
        keywords: ['urine', 'foley', 'myoglobin', 'dark'],
      },
      {
        id: 'open',
        answer:
          "Intraoperative sudden fever, tachycardia, rigidity, skyrocketing EtCO2 on sevoflurane case with succinylcholine — healthy teen, no infection prodrome.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'emergence-delirium',
    titleMatchers: ['strange after waking', 'feel strange', 'woke up confused'],
    complaintMatchers: ['confused', 'agitated', 'woke up', 'tonsils'],
    defaultAnswer:
      "I'm her mom — Emily woke up from tonsil surgery and doesn't know where she is. She's crying, thrashing, and didn't recognize me for a minute. No fever. We're terrified.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "She woke up acting completely confused — crying, pulling at the IV, calling for me but not knowing it was me. She's never acted like this before. It started the moment they brought her to recovery.",
        patterns: ['what happened', 'problem', 'brought', 'confused'],
        keywords: ['confused', 'problem', 'woke', 'agitated'],
      },
      {
        id: 'surgery',
        answer:
          "Tonsillectomy and adenoids today — she had sleep apnea snoring so ENT recommended it. General anesthesia, outpatient. Surgery went fine they said.",
        patterns: ['surgery', 'tonsils', 'operation', 'adenoid'],
        keywords: ['surgery', 'tonsil', 'adenoid', 'ent'],
      },
      {
        id: 'timing',
        answer:
          "Literally as soon as she woke in the recovery room — maybe twenty minutes ago. She was fine going to sleep for surgery. This is only after anesthesia.",
        patterns: ['when', 'start', 'how long', 'wake'],
        keywords: ['when', 'start', 'wake', 'long'],
      },
      {
        id: 'behavior',
        answer:
          "She's agitated — kicking sheets, sobbing, saying she wants to go home but doesn't know where home is. Now she's calming a little if I hold her hand.",
        patterns: ['behavior', 'agitated', 'crying', 'acting'],
        keywords: ['agitat', 'cry', 'behavior', 'thrash'],
      },
      {
        id: 'fever-seizure',
        answer:
          "No fever — temp was normal. She's never had a seizure before. This looks like panic and confusion, not shaking rhythmically, though she did flail.",
        patterns: ['fever', 'seizure', 'shaking'],
        keywords: ['fever', 'seizure', 'shake', 'convuls'],
      },
      {
        id: 'neuro',
        answer:
          "She moves arms and legs both sides. She's talking in sentences between cries. Pupils look normal to me. Nurse said neuro exam was okay.",
        patterns: ['weakness', 'neuro', 'stroke', 'focal'],
        keywords: ['weak', 'neuro', 'stroke', 'focal', 'move'],
      },
      {
        id: 'medications',
        answer:
          "Just anesthesia meds — they gave pain medicine in recovery and she got more upset briefly. No new antibiotics or weird drugs at home.",
        patterns: ['medications', 'medicines', 'drugs'],
        keywords: ['medication', 'medicine', 'drug', 'anesthesia'],
      },
      {
        id: 'allergies',
        answer:
          "No known drug allergies. She had amoxicillin before for ear infections fine.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'prior-anesthesia',
        answer:
          "She had ear tubes at age three under gas — no problems waking up then. This is the first time we've seen this agitation.",
        patterns: ['anesthesia before', 'previous surgery'],
        keywords: ['before', 'previous', 'anesthesia', 'surgery'],
      },
      {
        id: 'pain',
        answer:
          "She says her throat hurts but she's not pointing to her throat much — more scared and confused than complaining of pain.",
        patterns: ['pain', 'throat hurt', 'sore'],
        keywords: ['pain', 'throat', 'hurt', 'sore'],
      },
      {
        id: 'improving',
        answer:
          "A little better last five minutes with me talking softly — still not fully herself. Nurse says sometimes kids wake up wild.",
        patterns: ['better', 'improving', 'calming'],
        keywords: ['better', 'improv', 'calm'],
      },
      {
        id: 'emily-voice',
        answer:
          "I want my mommy… where am I? It hurts… I wanna go home…",
        patterns: ['how do you feel', 'emily', 'sweetheart'],
        keywords: ['feel', 'you', 'child'],
      },
      {
        id: 'open',
        answer:
          "Six-year-old post-tonsillectomy, woke confused and agitated in PACU, no fever, moves all limbs, never seized before, calming with parent.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'post-intubation-airway-irritation',
    titleMatchers: ['throat hurts', "can't stop coughing", 'stop coughing'],
    complaintMatchers: ['throat', 'cough', 'hoarse', 'sore throat'],
    defaultAnswer:
      "My throat has been killing me since yesterday's surgery — dry cough I can't shake and my voice sounds raspy. I can breathe fine, I'm just annoyed.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "My throat feels raw and sore, and I keep coughing — dry cough, nothing coming up. My voice is hoarse like I smoked a pack. It started right after I woke up from anesthesia.",
        patterns: ['what brought you', 'problem', 'chief complaint', 'throat'],
        keywords: ['throat', 'problem', 'brought', 'cough'],
      },
      {
        id: 'surgery-anesthesia',
        answer:
          "Laparoscopic gallbladder removal yesterday — outpatient. They put me completely asleep and said they put a breathing tube in. Surgery itself was fine.",
        patterns: ['surgery', 'anesthesia', 'intubation', 'tube', 'operation'],
        keywords: ['surgery', 'anesthesia', 'intub', 'tube', 'gallbladder', 'operation'],
      },
      {
        id: 'onset',
        answer:
          "As soon as I woke up in recovery my throat burned. It's worse today than yesterday evening a little — still hoarse this morning.",
        patterns: ['when start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'yesterday'],
      },
      {
        id: 'cough',
        answer:
          "Dry cough every few minutes — tickle in my throat triggers it. No blood, no phlegm. Coughing makes the soreness spike.",
        patterns: ['cough', 'coughing'],
        keywords: ['cough', 'coughing'],
      },
      {
        id: 'voice',
        answer:
          "Hoarse — coworkers noticed on a call. Speaking loudly makes it worse. Swallowing solids is a bit uncomfortable but liquids okay.",
        patterns: ['hoarse', 'voice', 'raspy'],
        keywords: ['hoarse', 'voice', 'raspy', 'speak'],
      },
      {
        id: 'breathing-stridor',
        answer:
          "No trouble breathing — I can walk upstairs fine. No wheezing or scary tightness. Just irritation and cough.",
        patterns: ['shortness of breath', 'breathing', 'stridor', 'wheez'],
        keywords: ['breath', 'breathing', 'stridor', 'wheez', 'dyspnea'],
      },
      {
        id: 'fever-infection',
        answer:
          "No fever — I checked at home, 98.5. No pus on my tonsils that I can see in the mirror. Doesn't feel like strep, more like I scraped my throat.",
        patterns: ['fever', 'infection', 'strep', 'pus'],
        keywords: ['fever', 'infection', 'strep', 'pus', 'temperature'],
      },
      {
        id: 'chest-pain',
        answer:
          "No chest pain — lungs feel fine. It's all throat and voice.",
        patterns: ['chest pain', 'chest'],
        keywords: ['chest', 'pain'],
      },
      {
        id: 'better-worse',
        answer:
          "Warm tea and lozenges help a little. Talking a lot for work makes it worse. Morning is roughest.",
        patterns: ['better', 'worse', 'help', 'relieve'],
        keywords: ['better', 'worse', 'help', 'relieve'],
      },
      {
        id: 'medications',
        answer:
          "Ibuprofen helps the soreness some. Surgeon said throat irritation is common. No antibiotics.",
        patterns: ['medications', 'medicines', 'taking'],
        keywords: ['medication', 'medicine', 'meds', 'ibuprofen'],
      },
      {
        id: 'allergies',
        answer:
          "No drug allergies.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'anesthesia-history',
        answer:
          "I've had anesthesia once before for a colonoscopy — mild sore throat then too but shorter. This time it's more persistent.",
        patterns: ['anesthesia before', 'previous intubation'],
        keywords: ['before', 'previous', 'anesthesia', 'intub'],
      },
      {
        id: 'severity',
        answer:
          "Throat pain maybe 6/10 when I swallow. Coughing is annoying more than painful. Not emergency scary — just won't quit.",
        patterns: ['how bad', 'scale', 'severity'],
        keywords: ['bad', 'scale', 'severe', '10'],
      },
      {
        id: 'open',
        answer:
          "Post-op day 1 after lap chole with ETT — sore throat, hoarse voice, dry cough since waking, no fever or dyspnea, improving slowly with lozenges.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
]
