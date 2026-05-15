import type { FallbackScenario } from './types'

export const generalSurgeryFallbackScenarios: FallbackScenario[] = [
  {
    key: 'incarcerated-hernia-groin-lump-frank',
    titleMatchers: ['lump suddenly', 'started hurting'],
    complaintMatchers: ['groin lump', 'really hurts'],
    defaultAnswer:
      "Groin bulge years reducible TV trick tonight failed — warehouse pallets today ballooned rock hard. Nauseous steady ache. Wife drove panicked. Cannot sneak mass back in shame terrified.",
    qa: [
      {
        id: 'pain',
        answer:
          "Constant gnaw not lightning cramp — worse if I cough brace. Right groin epicenter.",
        patterns: ['pain', 'hurt', 'ache'],
        keywords: ['pain', 'hurt', 'ache'],
      },
      {
        id: 'nausea',
        answer:
          "Sick stomach spit bile taste — no big vomit fountain yet.",
        patterns: ['nausea', 'vomit', 'throw'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'bowel',
        answer:
          "Gas pooped earlier morning uncertain — worried blockage vibe honestly.",
        patterns: ['bowel', 'stool', 'poop', 'gas', 'movement'],
        keywords: ['bowel', 'stool', 'gas', 'poop'],
      },
      {
        id: 'fever',
        answer:
          "Warmish not blazing — chills mild. Maybe 99 feeling.",
        patterns: ['fever', 'temperature', 'chill'],
        keywords: ['fever', 'chill', 'temperature'],
      },
      {
        id: 'surgery',
        answer:
          "No hernia operation ever — ignored doctor nag cheap.",
        patterns: ['surgery', 'operation', 'prior', 'repair'],
        keywords: ['surgery', 'operation', 'prior'],
      },
      {
        id: 'location',
        answer:
          "Right groin belt line — bulge firm football smaller.",
        patterns: ['where', 'location', 'groin'],
        keywords: ['where', 'groin', 'location'],
      },
      {
        id: 'appetite',
        answer:
          "Food sound gross — sips water okay.",
        patterns: ['appetite', 'eat', 'food'],
        keywords: ['appetite', 'eat', 'food'],
      },
      {
        id: 'medications',
        answer:
          "Lisinopril forgot weeks — metformin sporadic ashamed.",
        patterns: ['med', 'medicine', 'pill'],
        keywords: ['med', 'medicine', 'pill'],
      },
      {
        id: 'family',
        answer:
          "Brother hernia repaired — dad died heart unrelated.",
        patterns: ['family', 'history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'timing',
        answer:
          "Heavy shift started pain afternoon — hours now stuck.",
        patterns: ['when', 'start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'onset'],
      },
      {
        id: 'helps',
        answer:
          "Lying still mild help — pushing mass hurts worse dumb tries.",
        patterns: ['help', 'relief', 'better', 'reduce'],
        keywords: ['help', 'relief', 'better'],
      },
      {
        id: 'worsens',
        answer:
          "Lifting twisting laughing hurts — driving bump screamed.",
        patterns: ['worse', 'trigger'],
        keywords: ['worse', 'trigger', 'lift'],
      },
      {
        id: 'movement',
        answer:
          "Walking careful wide cowboy stance ridiculous.",
        patterns: ['walk', 'move', 'activity'],
        keywords: ['walk', 'move', 'activity'],
      },
      {
        id: 'lump-history',
        answer:
          "Popped out years soft pushable — today evil brick.",
        patterns: ['lump', 'bulge', 'hernia', 'before'],
        keywords: ['lump', 'bulge', 'before'],
      },
      {
        id: 'scrotum',
        answer:
          "Ball swollen question — primary pain higher groin.",
        patterns: ['testicle', 'scrotum', 'ball'],
        keywords: ['testicle', 'scrotum', 'ball'],
      },
      {
        id: 'open',
        answer:
          "Warehouse seniority useless pride hurt now — overtime irony.",
        patterns: ['anything else', 'more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Pain distracting focus — slow questions?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'acute-cholecystitis-ruq-maria-torres',
    titleMatchers: ['pain went', 'right side'],
    complaintMatchers: ['stomach pain moved', 'upper stomach'],
    defaultAnswer:
      "Greasy team lunch bloating epigastric slid under ribs corkscrew — vomit twice. Pressing there inhalation stop pain nickname Murphy. Feverish kids pickup stress layered.",
    qa: [
      {
        id: 'pain',
        answer:
          "Right upper quadrant knifey constant pressure — epigastric earlier.",
        patterns: ['pain', 'hurt'],
        keywords: ['pain', 'hurt', 'ruq'],
      },
      {
        id: 'nausea',
        answer:
          "Nausea waves — crackers traitor worsening.",
        patterns: ['nausea'],
        keywords: ['nausea'],
      },
      {
        id: 'vomit',
        answer:
          "Threw up lunch bile bitter twice stall horror.",
        patterns: ['vomit', 'throw'],
        keywords: ['vomit', 'throw'],
      },
      {
        id: 'bowel',
        answer:
          "Brown stool yesterday normal — not diarrhea story.",
        patterns: ['bowel', 'stool'],
        keywords: ['bowel', 'stool'],
      },
      {
        id: 'fever',
        answer:
          "Chills office thermometer borrowed 101 feeling.",
        patterns: ['fever', 'chill', 'temperature'],
        keywords: ['fever', 'chill', 'temperature'],
      },
      {
        id: 'surgery',
        answer:
          "C-section years ago — unrelated maybe scar question weird.",
        patterns: ['surgery', 'operation'],
        keywords: ['surgery', 'operation'],
      },
      {
        id: 'location',
        answer:
          "Under right ribs front — back shoulder tip vague whisper not classic.",
        patterns: ['where', 'location', 'right'],
        keywords: ['where', 'location', 'right'],
      },
      {
        id: 'appetite',
        answer:
          "Food terror currently — smell office microwave offense.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite', 'eat'],
      },
      {
        id: 'medications',
        answer:
          "Aleve weekends headaches — not today.",
        patterns: ['med', 'nsaid'],
        keywords: ['med', 'ibuprofen', 'nsaid'],
      },
      {
        id: 'family',
        answer:
          "Mom gallbladder out fifty — genetic bingo worry.",
        patterns: ['family', 'gall'],
        keywords: ['family', 'gall'],
      },
      {
        id: 'timing',
        answer:
          "Started hour after lunch gradual migration few hours.",
        patterns: ['when', 'meal', 'start'],
        keywords: ['when', 'meal', 'start'],
      },
      {
        id: 'helps',
        answer:
          "Fetal side lying mild — nothing magic.",
        patterns: ['help', 'relief', 'better'],
        keywords: ['help', 'relief', 'better'],
      },
      {
        id: 'worsens',
        answer:
          "Deep breath press worse — fatty food obvious trigger hindsight.",
        patterns: ['worse', 'fat', 'deep breath'],
        keywords: ['worse', 'fat', 'breath'],
      },
      {
        id: 'movement',
        answer:
          "Walking jostle hurts — sitting hunched better slight.",
        patterns: ['walk', 'move'],
        keywords: ['walk', 'move'],
      },
      {
        id: 'chest',
        answer:
          "Not cardiac elephant classic — did worry briefly subway.",
        patterns: ['chest', 'heart'],
        keywords: ['chest', 'heart'],
      },
      {
        id: 'jaundice',
        answer:
          "Eyes yellow urine dark not really — friend lied checked mirror.",
        patterns: ['yellow', 'jaundice', 'urine'],
        keywords: ['yellow', 'jaundice', 'urine'],
      },
      {
        id: 'open',
        answer:
          "Administrative deadlines cruel universe timing presentation tomorrow ironic.",
        patterns: ['anything else', 'work'],
        keywords: ['else', 'work', 'stress'],
      },
      {
        id: 'vague',
        answer:
          "Dragging words effort — please simplify questions.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'small-bowel-obstruction-distention-richard-hayes',
    titleMatchers: ['belly keeps swelling', 'keeps swelling'],
    complaintMatchers: ['stomach keeps', 'getting bigger'],
    defaultAnswer:
      "Belly drum tight vomiting greenish — no poop gas two days scary. Appendix scar old shop jokes adhesions fear wife WebMD spiral.",
    qa: [
      {
        id: 'pain',
        answer:
          "Cramp waves clock bad worse between slightly relief tease lie.",
        patterns: ['pain', 'cramp'],
        keywords: ['pain', 'cramp'],
      },
      {
        id: 'nausea',
        answer:
          "Constant nausea mouth metallic — appetite zero.",
        patterns: ['nausea'],
        keywords: ['nausea'],
      },
      {
        id: 'vomit',
        answer:
          "Vomit yesterday bilious green — gross bucket wife heroic.",
        patterns: ['vomit', 'throw'],
        keywords: ['vomit', 'throw', 'bilious'],
      },
      {
        id: 'bowel',
        answer:
          "No fart no stool two days — enema childhood trauma refused.",
        patterns: ['bowel', 'stool', 'gas', 'fart', 'constipation'],
        keywords: ['bowel', 'stool', 'gas', 'constipation'],
      },
      {
        id: 'fever',
        answer:
          "Low grade maybe — not raging appendix fever memory.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'surgery',
        answer:
          "Appendix gallbladder decades ago — mechanic appendix story telling grandkids bored.",
        patterns: ['surgery', 'operation', 'scar'],
        keywords: ['surgery', 'operation', 'scar'],
      },
      {
        id: 'location',
        answer:
          "Whole belly balloon — tenderness diffuse not one spot classic.",
        patterns: ['where', 'location'],
        keywords: ['where', 'location', 'belly'],
      },
      {
        id: 'appetite',
        answer:
          "Water sip only — food imagination torture.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite', 'eat'],
      },
      {
        id: 'medications',
        answer:
          "Aspirin heart doctor said — occasional.",
        patterns: ['med', 'medicine', 'aspirin'],
        keywords: ['med', 'aspirin', 'medicine'],
      },
      {
        id: 'family',
        answer:
          "Colon cancer dad older — different fear baggage.",
        patterns: ['family', 'cancer'],
        keywords: ['family', 'cancer'],
      },
      {
        id: 'timing',
        answer:
          "Distention progressive two days — vomit worse yesterday.",
        patterns: ['when', 'how long', 'start'],
        keywords: ['when', 'long', 'start'],
      },
      {
        id: 'helps',
        answer:
          "Knee chest position joke worthless — nothing real helps.",
        patterns: ['help', 'relief', 'better'],
        keywords: ['help', 'relief', 'better'],
      },
      {
        id: 'worsens',
        answer:
          "Drinking large gulps amps cramp stupid learned lesson.",
        patterns: ['worse', 'eat', 'drink'],
        keywords: ['worse', 'drink', 'eat'],
      },
      {
        id: 'movement',
        answer:
          "Rolling night moaning — walking hunched old man overnight depressing.",
        patterns: ['walk', 'move'],
        keywords: ['walk', 'move', 'roll'],
      },
      {
        id: 'laxative',
        answer:
          "Wife herbal tea laxative mistake cramps worse confession angry.",
        patterns: ['laxative', 'enema'],
        keywords: ['laxative', 'enema'],
      },
      {
        id: 'belly-sounds',
        answer:
          "Gurgling high pitch horror movie — grandson laughed nervously inappropriate.",
        patterns: ['sound', 'gurgle', 'bowel sound'],
        keywords: ['sound', 'gurgle', 'noise'],
      },
      {
        id: 'open',
        answer:
          "Garage tools organized life not intestines ironic curse.",
        patterns: ['anything else', 'more'],
        keywords: ['else', 'more'],
      },
      {
        id: 'vague',
        answer:
          "Fog pain — repeat question slower please.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'perirectal-abscess-sit-pain-kevin-morris',
    titleMatchers: ['severe pain near', 'near my bottom'],
    complaintMatchers: ['hurts to sit', 'sit'],
    defaultAnswer:
      "Four day pressure butt cheek nightmare — sitting driving torture fever chills. Swollen hot lump embarrassing brother hemorrhoid cream insult Christmas flashback.",
    qa: [
      {
        id: 'pain',
        answer:
          "Throb deep near anus lateral — sitting amplifies evil.",
        patterns: ['pain', 'hurt', 'ache'],
        keywords: ['pain', 'hurt', 'ache'],
      },
      {
        id: 'nausea',
        answer:
          "Queasy fever maybe — not vomiting fountain.",
        patterns: ['nausea'],
        keywords: ['nausea'],
      },
      {
        id: 'vomit',
        answer:
          "No vomiting — belly quiet thankfully.",
        patterns: ['vomit'],
        keywords: ['vomit'],
      },
      {
        id: 'bowel',
        answer:
          "Pooped this morning hurt razor — blood smear toilet paper panic.",
        patterns: ['bowel', 'stool', 'blood'],
        keywords: ['bowel', 'stool', 'blood'],
      },
      {
        id: 'fever',
        answer:
          "Shaking chills truck cab heater max irony — thermometer 101-102 wife.",
        patterns: ['fever', 'chill', 'temperature'],
        keywords: ['fever', 'chill', 'temperature'],
      },
      {
        id: 'surgery',
        answer:
          "No butt surgery ever virgin territory humiliating sentence.",
        patterns: ['surgery', 'operation'],
        keywords: ['surgery', 'operation'],
      },
      {
        id: 'location',
        answer:
          "Left cheek hole neighborhood cartographer pain — not midline tailbone.",
        patterns: ['where', 'location', 'rectum'],
        keywords: ['where', 'location', 'rectal'],
      },
      {
        id: 'appetite',
        answer:
          "Pizza disgust — soup okay lukewarm.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite', 'eat'],
      },
      {
        id: 'medications',
        answer:
          "No regular meds — Tylenol fever attempt.",
        patterns: ['med', 'medicine'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'family',
        answer:
          "Crohn cousin — worried inherited nightmare google rabbit hole.",
        patterns: ['family', 'crohn', 'ibd'],
        keywords: ['family', 'crohn', 'ibd'],
      },
      {
        id: 'timing',
        answer:
          "Four day build pressure — worse today fluctuant feeling language learned nurse.",
        patterns: ['when', 'how long', 'start'],
        keywords: ['when', 'long', 'start'],
      },
      {
        id: 'helps',
        answer:
          "Lie side fetal mild — sitting murder.",
        patterns: ['help', 'relief', 'position'],
        keywords: ['help', 'relief', 'position'],
      },
      {
        id: 'worsens',
        answer:
          "Truck vibration route worse — coughing sneeze lightning.",
        patterns: ['worse', 'sit', 'pressure'],
        keywords: ['worse', 'sit', 'pressure'],
      },
      {
        id: 'movement',
        answer:
          "Walking stiff cowboy — scared squeeze cheek unconscious funny sad.",
        patterns: ['walk', 'move'],
        keywords: ['walk', 'move'],
      },
      {
        id: 'belly',
        answer:
          "No abdominal pain — focused butt hell distinct.",
        patterns: ['abdomen', 'belly', 'stomach'],
        keywords: ['abdomen', 'belly', 'stomach'],
      },
      {
        id: 'sexual',
        answer:
          "Monogamous years — STI shame spiral unwelcome intrusive question.",
        patterns: ['sex', 'sti'],
        keywords: ['sex', 'sti'],
      },
      {
        id: 'open',
        answer:
          "Delivery schedule ruined income worry layered pain lasagna.",
        patterns: ['anything else', 'work'],
        keywords: ['else', 'work', 'job'],
      },
      {
        id: 'vague',
        answer:
          "Humiliation brain fog — gentle questioning please.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'perforated-ulcer-rigid-walter-green',
    titleMatchers: ['belly hurts everywhere', 'hurts everywhere'],
    complaintMatchers: ['exploded with pain', 'exploded'],
    defaultAnswer:
      "Snap lightning belly spread granite rigid board — ibuprofen candy years back concrete work stupid pride. Lightheaded cold sweat wife Uber debate ambulance cost foolish regret immediate.",
    qa: [
      {
        id: 'pain',
        answer:
          "Sudden everywhere worst life — cannot localize one spot anymore.",
        patterns: ['pain', 'hurt', 'severe'],
        keywords: ['pain', 'hurt', 'severe'],
      },
      {
        id: 'nausea',
        answer:
          "Nausea bilious — swallow spit only.",
        patterns: ['nausea'],
        keywords: ['nausea'],
      },
      {
        id: 'vomit',
        answer:
          "Heave dry retch — nothing left.",
        patterns: ['vomit', 'throw'],
        keywords: ['vomit', 'throw'],
      },
      {
        id: 'bowel',
        answer:
          "No diarrhea focus — rigid belly terror primary.",
        patterns: ['bowel', 'stool'],
        keywords: ['bowel', 'stool'],
      },
      {
        id: 'fever',
        answer:
          "Low temp maybe — feels cold clammy instead weird.",
        patterns: ['fever', 'temperature', 'chill'],
        keywords: ['fever', 'chill', 'temperature'],
      },
      {
        id: 'surgery',
        answer:
          "No stomach surgery ever — appendix child ancient memory.",
        patterns: ['surgery', 'operation'],
        keywords: ['surgery', 'operation'],
      },
      {
        id: 'location',
        answer:
          "Started epigastric lightning — now whole abdomen rock.",
        patterns: ['where', 'location', 'epigastric'],
        keywords: ['where', 'location', 'epigastric'],
      },
      {
        id: 'appetite',
        answer:
          "Zero appetite forever forecast.",
        patterns: ['appetite', 'eat'],
        keywords: ['appetite', 'eat'],
      },
      {
        id: 'medications',
        answer:
          "Ibuprofen handfuls shift end years — TUMS sometimes futile.",
        patterns: ['med', 'nsaid', 'ibuprofen', 'aspirin'],
        keywords: ['med', 'ibuprofen', 'nsaid', 'aspirin'],
      },
      {
        id: 'family',
        answer:
          "Uncle ulcer bleed story family reunion warning ignored arrogant.",
        patterns: ['family', 'ulcer'],
        keywords: ['family', 'ulcer'],
      },
      {
        id: 'timing',
        answer:
          "Sudden seconds spread minutes horror movie timeline this morning.",
        patterns: ['when', 'start', 'sudden', 'onset'],
        keywords: ['when', 'start', 'sudden', 'onset'],
      },
      {
        id: 'helps',
        answer:
          "Nothing helps — fetal curl pathetic illusion.",
        patterns: ['help', 'relief', 'better'],
        keywords: ['help', 'relief', 'better'],
      },
      {
        id: 'worsens',
        answer:
          "Movement breathing talk jostle amplify — rigid board jokingly granite.",
        patterns: ['worse', 'move', 'touch'],
        keywords: ['worse', 'move', 'touch'],
      },
      {
        id: 'movement',
        answer:
          "Walking impossible hunched wife half carry shame.",
        patterns: ['walk', 'move'],
        keywords: ['walk', 'move'],
      },
      {
        id: 'trauma',
        answer:
          "No fall beam — lift truss triggered snap pain dramatic.",
        patterns: ['trauma', 'fall', 'injury', 'lift'],
        keywords: ['trauma', 'fall', 'lift', 'injury'],
      },
      {
        id: 'heart',
        answer:
          "Not classic heart squeezing arm — belly rigid primary fear though cardiac creep thought fleeting.",
        patterns: ['chest', 'heart'],
        keywords: ['chest', 'heart'],
      },
      {
        id: 'open',
        answer:
          "Construction foreman reputation toughness shattered stretcher tears hidden sunglasses.",
        patterns: ['anything else', 'job'],
        keywords: ['else', 'job', 'work'],
      },
      {
        id: 'vague',
        answer:
          "Breath short answers — torture focus ask tiny bites.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
