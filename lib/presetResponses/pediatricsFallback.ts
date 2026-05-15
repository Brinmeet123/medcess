import type { FallbackScenario } from './types'

export const pediatricsFallbackScenarios: FallbackScenario[] = [
  {
    key: 'croup-breathing-funny-liam-turner',
    titleMatchers: ['breathing funny', 'child is breathing'],
    complaintMatchers: ['woke up sounding scary', 'sounding scary'],
    defaultAnswer:
      "I'm Maya, Liam's mom — he woke up with this awful seal-bark cough and a whistling noise when he breathes in. No drooling thank God, but he's working harder to breathe and I'm panicking. Daycare's had runny noses all week.",
    qa: [
      {
        id: 'chief-breathing',
        answer:
          "He sounds nothing like his normal sick — it's this harsh bark when he coughs and a high noise breathing in, worse when he cries. Steamy bathroom didn't really fix it.",
        patterns: ['breath', 'stridor', 'noise', 'cough', 'sound'],
        keywords: ['breath', 'cough'],
      },
      {
        id: 'cough',
        answer:
          "The cough is deep and barking, not loose junky like bronchitis TV stuff — sorry, I'm not clinical, that's just how it sounds. Louder last night than yesterday afternoon.",
        patterns: ['cough', 'bark', 'seal'],
        keywords: ['cough'],
      },
      {
        id: 'fever',
        answer:
          "Low-grade I'd say — our thermometer said 100-something this morning. Not scary-high like when he had flu two years ago, but enough he's warm and flushed.",
        patterns: ['fever', 'temperature', 'hot'],
        keywords: ['fever'],
      },
      {
        id: 'drooling-choking',
        answer:
          "No drooling puddle scenario — he's drinking sips. No choking on food or Lego, I'd have noticed. He was eating fine before bedtime.",
        patterns: ['drool', 'choke', 'aspirat', 'swallow'],
        keywords: ['drool'],
      },
      {
        id: 'cold-uri',
        answer:
          "Runny nose and cranky maybe three four days — we figured daycare crud. Then overnight the breathing thing jumped out. My husband thought allergies at first, nah.",
        patterns: ['cold', 'runny', 'uri', 'daycare'],
        keywords: ['cold', 'daycare'],
      },
      {
        id: 'timing',
        answer:
          "Barky stuff really hit after midnight — like 2 a.m. scary TV mom moment. Declined gradual daytime, spiked night. We're maybe six hours into scary now at triage.",
        patterns: ['when', 'start', 'night', 'how long'],
        keywords: ['when', 'night'],
      },
      {
        id: 'sleep',
        answer:
          "Basically no real sleep for either of us — he dozes ten minutes whimpers awake. Propped on my chest kind of helps emotionally not medically maybe.",
        patterns: ['sleep', 'rest'],
        keywords: ['sleep'],
      },
      {
        id: 'appetite',
        answer:
          "Toast yesterday fine — today not interested. Popsicle half eaten. I don't know if that's throat or just feeling junky.",
        patterns: ['eat', 'appetite', 'drink', 'fluid'],
        keywords: ['appetite', 'drink'],
      },
      {
        id: 'medications',
        answer:
          "Honey for age over one yes last night one spoonful. Tylenol once maybe helped fever edge not noise. No antibiotics — pediatrician closed.",
        patterns: ['med', 'medicine', 'tylenol', 'honey'],
        keywords: ['med'],
      },
      {
        id: 'activity',
        answer:
          "He just wants held — won't run/play. Clingy Velcro. Usually wild toddler energy even sick.",
        patterns: ['activ', 'play', 'energy', 'cling'],
        keywords: ['activ'],
      },
      {
        id: 'pain',
        answer:
          "He says throat 'hurts little' in toddler words mostly pointing when swallow hurts. Main scare is breathing not pain scale.",
        patterns: ['pain', 'hurt', 'sore'],
        keywords: ['pain'],
      },
      {
        id: 'to-liam',
        answer:
          "Liam whispers: 'Doggy bark in my throat. Scary.' Then hides face in my shoulder.",
        patterns: ['liam', 'son', 'child', 'himself', 'talk to'],
        keywords: ['liam'],
      },
      {
        id: 'family-history',
        answer:
          "His sister had croup-ish once nurse said — nebulizer kid hospital observation years ago. My asthma adult not his yet knock wood.",
        patterns: ['family', 'history', 'sibling', 'asthma'],
        keywords: ['family'],
      },
      {
        id: 'worse-better',
        answer:
          "Crying makes noise worse definitely — also lying totally flat seems nastier, we propped crib mattress. Cool mist humidifier maybe trivial help unsure.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse'],
      },
      {
        id: 'vomiting',
        answer:
          "Dry-heave once from coughing hard — not vomiting streak. No belly pain dominant story.",
        patterns: ['vomit', 'nausea', 'throw'],
        keywords: ['vomit'],
      },
      {
        id: 'diapers-uri',
        answer:
          "Diapers wet normal-ish — pee concern not why we're here. No burning urine complaints obviously he's three.",
        patterns: ['diaper', 'urine', 'pee', 'wet'],
        keywords: ['diaper'],
      },
      {
        id: 'vague',
        answer:
          "Big picture: post-daycare cold blew into terrifying upper breathing noise overnight — I'm terrified of epiglottitis WebMD poison but no drooling. Need reassurance what's happening.",
        patterns: ['more', 'describe', 'overall', 'else', 'summary'],
        keywords: ['more', 'describe'],
      },
      {
        id: 'hello',
        answer:
          "Hi — I'm Maya. Liam's breathing sounds awful, barky cough, noisy breathing in, low fever after a cold. I'm really scared.",
        patterns: ['hello', 'hi ', 'hey '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'otitis-media-ear-ava-morris',
    titleMatchers: ['pulling his ear', 'pulling her ear', 'grabbing her ear'],
    complaintMatchers: ["won't stop grabbing"],
    defaultAnswer:
      "I'm Jordan — Ava keeps yanking her right ear like she's mad at it. Fever couple days, awful sleep, barely eating. Daycare's a Petri dish lately. I'm hoping it's not something stuck in there.",
    qa: [
      {
        id: 'ear-focus',
        answer:
          "Right ear mostly — she digs knuckle in whines. Left ear sometimes too but right's the drama queen side.",
        patterns: ['ear', 'pull', 'grab'],
        keywords: ['ear'],
      },
      {
        id: 'fever',
        answer:
          "Our forehead scanner said 101-ish yesterday evening — bouncing 99-101 I don't log obsessively. Feels warm definitely.",
        patterns: ['fever', 'temperature', 'hot'],
        keywords: ['fever'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep's destroyed — up hourly screaming. Rocking chair marathon. Coffee me zombie.",
        patterns: ['sleep', 'night'],
        keywords: ['sleep'],
      },
      {
        id: 'appetite',
        answer:
          "Bottles half normal — pushes away favorite puree chicken thing. Fluid okayish if distracted with Elmo cup.",
        patterns: ['eat', 'drink', 'appetite', 'bottle'],
        keywords: ['appetite'],
      },
      {
        id: 'uri',
        answer:
          "Snot faucet week before ear drama — daycare had three kids out supposedly 'just allergies' sure okay.",
        patterns: ['cold', 'runny', 'daycare', 'nose'],
        keywords: ['cold', 'daycare'],
      },
      {
        id: 'timing',
        answer:
          "Ear grabbing maybe 36-48 hours hard to timestamp — fever parallel. Today's worse than yesterday afternoon behaviorally.",
        patterns: ['when', 'long', 'start'],
        keywords: ['when'],
      },
      {
        id: 'swimming-qtip',
        answer:
          "No recent pool — bathtubs normal. We don't Q-tip deep learned that lesson. No blood discharge I saw.",
        patterns: ['swim', 'bath', 'q tip', 'water'],
        keywords: ['swim'],
      },
      {
        id: 'pain',
        answer:
          "She cries when I accidentally bump ear washing hair. Generally fussy constantly not pinpoint sharp.",
        patterns: ['pain', 'hurt'],
        keywords: ['pain'],
      },
      {
        id: 'vomiting',
        answer:
          "Spit-up tiny once fever high — not GI sick pattern mainly. Stools normal daycare toddler gross but usual.",
        patterns: ['vomit', 'diarrhea'],
        keywords: ['vomit'],
      },
      {
        id: 'medications',
        answer:
          "Tylenol last night helped mood window maybe. No amoxicillin stash. Teething gel once desperate probably useless.",
        patterns: ['med', 'tylenol', 'motrin'],
        keywords: ['med'],
      },
      {
        id: 'teething',
        answer:
          "Molars rumbling I thought — but fever feels real not just gums. Chewing fist still.",
        patterns: ['teeth', 'teething', 'gum', 'molar'],
        keywords: ['teeth'],
      },
      {
        id: 'to-ava',
        answer:
          "Ava: 'Ear. Ow.' Points right. Then buries face.",
        patterns: ['ava', 'daughter', 'she say', 'ask her'],
        keywords: ['ava'],
      },
      {
        id: 'family',
        answer:
          "Elder brother tubes history — ENT said ears run family. My wife had swimmers ear adult.",
        patterns: ['family', 'history', 'tubes'],
        keywords: ['family'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing fine — not why we're here. No cough scary. Just ear face misery.",
        patterns: ['breath', 'cough', 'lung'],
        keywords: ['breath'],
      },
      {
        id: 'activity',
        answer:
          "Clingy limp potato — wants carried not walking play normal.",
        patterns: ['play', 'walk', 'activ'],
        keywords: ['activ'],
      },
      {
        id: 'diapers',
        answer:
          "Wet diapers still happening — urine okay. Not dehydration scenario.",
        patterns: ['diaper', 'wet', 'pee'],
        keywords: ['diaper'],
      },
      {
        id: 'worse-help',
        answer:
          "Elevating head sleep slight maybe placebo. Warm washcloth ear outside minute relief. Nothing miracle.",
        patterns: ['worse', 'help', 'better'],
        keywords: ['help'],
      },
      {
        id: 'vague',
        answer:
          "Stressed dad summary: fever crab ear pulling post-snot week daycare vector — worried infection versus bead in ear versus I'm overreacting.",
        patterns: ['more', 'overall', 'describe'],
        keywords: ['describe'],
      },
      {
        id: 'hello',
        answer:
          "Hey — Jordan here. Two-year-old Ava won't stop grabbing her ear, fever, miserable since cold.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'gastroenteritis-dehydration-noah-garcia',
    titleMatchers: ["isn't wetting", 'not wetting', 'wet diapers'],
    complaintMatchers: ['wet diapers'],
    defaultAnswer:
      "I'm Elena — Noah's 11 months. He's been puking and pooping two days, barely keeping Pedialyte, diapers scary dry today. He's floppy tired not right. Sister had same bug better already.",
    qa: [
      {
        id: 'diapers',
        answer:
          "Maybe two light wet diapers since 6 a.m. — should be more honestly. Urine pale yellow yesterday stronger orange today paranoid mom observation.",
        patterns: ['diaper', 'wet', 'urine', 'pee'],
        keywords: ['diaper'],
      },
      {
        id: 'vomit',
        answer:
          "Vomit after most formula attempts — projectile couple times gross couch RIP. Not green black scary color I don't think.",
        patterns: ['vomit', 'throw', 'nausea'],
        keywords: ['vomit'],
      },
      {
        id: 'stool',
        answer:
          "Explosive loose yellow-brown stools many times — lost count sorry. No blood I saw. Smell awful sorry TMI.",
        patterns: ['stool', 'diarrhea', 'poop'],
        keywords: ['diarrhea'],
      },
      {
        id: 'fever',
        answer:
          "Mild temp 99s mostly — not blazing. Warm forehead inconsistent readings low-grade.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever'],
      },
      {
        id: 'fluid',
        answer:
          "Pedialyte syringe little sips battles. Breast offer fusses — supply dipping stress probably. Ice chip not age great tried spoon melt.",
        patterns: ['fluid', 'drink', 'formula', 'breast', 'pedialyte'],
        keywords: ['drink'],
      },
      {
        id: 'sleep',
        answer:
          "Sleeps fragments exhausted between cry — not deep normal two naps.",
        patterns: ['sleep', 'letharg', 'tired'],
        keywords: ['sleep'],
      },
      {
        id: 'eyes-tears',
        answer:
          "Crying dry-ish eyes — fewer tears than drama warrants if that tracks. Sunken look grandma noticed FaceTime.",
        patterns: ['eye', 'tear', 'sunken'],
        keywords: ['eye'],
      },
      {
        id: 'timing',
        answer:
          "Started vomit first 48 hours-ish timeline mushy — diarrhea joined sooner after. Today worst lethargy hour-by-hour.",
        patterns: ['when', 'start', 'how long'],
        keywords: ['when'],
      },
      {
        id: 'meds',
        answer:
          "No antibiotics recent. Zofran? We don't have. Tylenol once fussy — unsure helped.",
        patterns: ['med', 'medicine'],
        keywords: ['med'],
      },
      {
        id: 'family-contacts',
        answer:
          "Four-year-old sister stomach bug same house recovering — school note gastro last week. Dad fine weird immune.",
        patterns: ['family', 'sick contact', 'daycare'],
        keywords: ['family'],
      },
      {
        id: 'pain',
        answer:
          "Crying cramps maybe gas — pulls knees sometimes. Not localized scream appendicitis movie scenario at least.",
        patterns: ['pain', 'belly', 'abdomen'],
        keywords: ['pain'],
      },
      {
        id: 'breathing',
        answer:
          "Breathing fast but I think because crying dehydrated — lung clear as far as panicky mom ears hear.",
        patterns: ['breath', 'lung'],
        keywords: ['breath'],
      },
      {
        id: 'activity',
        answer:
          "Floppy interactive weak — not tracking toys usual bright-eyed. Alarm bell.",
        patterns: ['activ', 'alert', 'play'],
        keywords: ['activ'],
      },
      {
        id: 'formula-change',
        answer:
          "Same formula month — didn't switch brands. Started new jar green beans puree day before first vomit coincidence maybe.",
        patterns: ['formula', 'food', 'change', 'milk'],
        keywords: ['formula'],
      },
      {
        id: 'to-baby',
        answer:
          "Noah whimpers weak cry — not forming words obviously. Smiles gone mostly.",
        patterns: ['noah', 'baby', 'him'],
        keywords: ['noah'],
      },
      {
        id: 'help-worse',
        answer:
          "Nothing stays down worsens cycle — Pedialyte minute peace then vomit. Holds mama vertical slightly calmer sometimes.",
        patterns: ['help', 'worse'],
        keywords: ['worse'],
      },
      {
        id: 'vague',
        answer:
          "Scared mom: GI bug plus dehydration signs few wet diapers sunken eyes — hoping IV not needed but take seriously.",
        patterns: ['more', 'describe', 'overall'],
        keywords: ['more'],
      },
      {
        id: 'hello',
        answer:
          "Hi — Elena. Baby Noah 11 months, vomiting diarrhea, barely any wet diapers, very lethargic.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'kawasaki-rash-fever-sophia-patel',
    titleMatchers: ['rash and high fever', 'rash and fever'],
    complaintMatchers: ["fever won't go away", 'fever wont go away'],
    defaultAnswer:
      "I'm Priya — Sophia's had this stubborn high fever six days straight, pink rash, bloodshot eyes without goopy pinkeye, cracked lips strawberry tongue terrifies me, hands puffy. Kindergarten missed all week.",
    qa: [
      {
        id: 'fever',
        answer:
          "Tylenol Motrin merry-go-round — still spikes 103. Clock watching mom losing mind. Nights worst.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever'],
      },
      {
        id: 'rash',
        answer:
          "Pink blotches trunk arms — not hives itchy really. Changes spots day-to-day blurry memory honestly.",
        patterns: ['rash', 'skin'],
        keywords: ['rash'],
      },
      {
        id: 'eyes',
        answer:
          "Both eyes red like missed sleep festival — no thick yellow discharge crust. Visine crossed mind stupid.",
        patterns: ['eye', 'conjunct'],
        keywords: ['eye'],
      },
      {
        id: 'mouth',
        answer:
          "Lips cracked bleeding corners slightly. Tongue super red bumpy — Google rabbit hole avoided mostly failed.",
        patterns: ['lip', 'mouth', 'tongue'],
        keywords: ['tongue'],
      },
      {
        id: 'hands-feet',
        answer:
          "Hands feet puffy red gloves socks look — not peeling big sheets yet fingers sore stiff.",
        patterns: ['hand', 'foot', 'swell'],
        keywords: ['hand'],
      },
      {
        id: 'node',
        answer:
          "Big sore lump right neck side — hurts her turning head. One side only noticeable.",
        patterns: ['lymph', 'node', 'neck lump'],
        keywords: ['neck'],
      },
      {
        id: 'timing',
        answer:
          "Day one fever only we thought virus — rash day three eyes lips hands followed stacking horror. Today day six.",
        patterns: ['when', 'how long', 'day'],
        keywords: ['when'],
      },
      {
        id: 'pain',
        answer:
          "Says body achy tired — throat scratchy not strep screaming pain subjective kid vague.",
        patterns: ['pain', 'ache', 'hurt'],
        keywords: ['pain'],
      },
      {
        id: 'sore-throat',
        answer:
          "Not classic white pus tonsils I peered flashlight amateur — red generally.",
        patterns: ['throat', 'strep', 'swallow'],
        keywords: ['throat'],
      },
      {
        id: 'cough-breath',
        answer:
          "Mild cough not pneumonia loud. Breathing okay saturations home OKish.",
        patterns: ['cough', 'breath'],
        keywords: ['cough'],
      },
      {
        id: 'appetite',
        answer:
          "Popsicles yes real food meh — juice boxes dehydration worry.",
        patterns: ['eat', 'drink', 'appetite'],
        keywords: ['appetite'],
      },
      {
        id: 'meds',
        answer:
          "Alternating acetaminophen ibuprofen per old handout — beyond that nothing prescription.",
        patterns: ['med', 'tylenol', 'motrin'],
        keywords: ['med'],
      },
      {
        id: 'daycare-school',
        answer:
          "Kindergarten class — several kids URI week before maybe unrelated. No international travel.",
        patterns: ['school', 'daycare', 'class'],
        keywords: ['school'],
      },
      {
        id: 'vaccine',
        answer:
          "Immunizations current including MMR — pediatrician sticker chart pride. Still scared obviously.",
        patterns: ['vaccine', 'shot', 'mmr'],
        keywords: ['vaccine'],
      },
      {
        id: 'family',
        answer:
          "No known autoimmune vasculitis family — South Asian statistically cardiac awareness culture joke not funny sorry stress talking.",
        patterns: ['family', 'history'],
        keywords: ['family'],
      },
      {
        id: 'to-sophia',
        answer:
          "Sophia: 'I'm hot. My hands feel tight. Can I watch iPad?' Typical brave kid understatement.",
        patterns: ['sophia', 'daughter', 'ask her'],
        keywords: ['sophia'],
      },
      {
        id: 'diapers',
        answer:
          "Potty trained mostly — urine output decreased maybe dehydration overlapping — harder quantify.",
        patterns: ['urine', 'pee', 'potty'],
        keywords: ['urine'],
      },
      {
        id: 'worse-help',
        answer:
          "Cool compress skin briefly comfort. Lights bother eyes little. Nothing kills fever sustainable.",
        patterns: ['worse', 'help'],
        keywords: ['help'],
      },
      {
        id: 'vague',
        answer:
          "Multi-symptom scary prolonged fever rash mucosa extremities — need hospital brains not just me spiraling.",
        patterns: ['more', 'describe'],
        keywords: ['describe'],
      },
      {
        id: 'hello',
        answer:
          "Hello — Priya. Sophia five, six days high fever, rash, red eyes, weird mouth and hands.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'septic-arthritis-limp-ethan-brooks',
    titleMatchers: ['limping', "won't walk", 'refuses to walk'],
    complaintMatchers: ['refuses to walk'],
    defaultAnswer:
      "I'm Chris — Ethan went from running yesterday to won't put weight on his leg today, fever 102, hip held weird bent. No fall he remembers. Motrin barely dented.",
    qa: [
      {
        id: 'walk',
        answer:
          "Zero weight-bearing — I carried him stretcher. Hop tries collapses screams even thinking about it.",
        patterns: ['walk', 'limp', 'bear weight', 'leg'],
        keywords: ['walk'],
      },
      {
        id: 'pain-loc',
        answer:
          "Says 'inside hip' butt area vague points front groin sometimes — seven-year-old GPS imperfect.",
        patterns: ['pain', 'hip', 'where'],
        keywords: ['pain'],
      },
      {
        id: 'fever',
        answer:
          "102.4 home ear — hot miserable chills vibe. Motrin brought 100.8 briefly maybe.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever'],
      },
      {
        id: 'trauma',
        answer:
          "No obvious injury — recess monkey bars Friday nothing dramatic witnessed. Coach didn't report collision.",
        patterns: ['trauma', 'fall', 'injury'],
        keywords: ['trauma'],
      },
      {
        id: 'timing',
        answer:
          "Complained sore vague yesterday — today refusal apex morning school nurse call.",
        patterns: ['when', 'start', 'yesterday'],
        keywords: ['when'],
      },
      {
        id: 'movement',
        answer:
          "Straightening leg nightmarish he shrieks — even me gently moving during story triggered.",
        patterns: ['movement', 'range', 'flex'],
        keywords: ['movement'],
      },
      {
        id: 'recent-infection',
        answer:
          "Class strep note month ago he finished antibiotics — not sore throat now though. Skinned knee dirty Monday small.",
        patterns: ['strep', 'infection', 'antibiotic'],
        keywords: ['strep'],
      },
      {
        id: 'activity',
        answer:
          "Normally soccer nut — today Netflix unmoving princess compromise joke fails.",
        patterns: ['sport', 'play', 'school'],
        keywords: ['play'],
      },
      {
        id: 'appetite',
        answer:
          "Toast nibble fever appetite garbage.",
        patterns: ['eat', 'appetite'],
        keywords: ['appetite'],
      },
      {
        id: 'vomit',
        answer:
          "No vomiting diarrhea — GI clean thank goodness confusing picture localization MSK.",
        patterns: ['vomit', 'diarrhea'],
        keywords: ['vomit'],
      },
      {
        id: 'rash',
        answer:
          "No rash — skin clear besides knee bandaid tan line joke.",
        patterns: ['rash', 'skin'],
        keywords: ['rash'],
      },
      {
        id: 'meds',
        answer:
          "Ibuprofen this morning dose weight-based chart — hesitant repeat until seen.",
        patterns: ['med', 'motrin', 'ibuprofen'],
        keywords: ['med'],
      },
      {
        id: 'daycare',
        answer:
          "Public elementary — lice letters not infection arthritis letters obviously.",
        patterns: ['school', 'daycare', 'class'],
        keywords: ['school'],
      },
      {
        id: 'family',
        answer:
          "No JIA family — dad gout ancient unrelated maybe.",
        patterns: ['family', 'arthritis'],
        keywords: ['family'],
      },
      {
        id: 'sleep',
        answer:
          "Barely slept pain positioning pillows fortress failed.",
        patterns: ['sleep'],
        keywords: ['sleep'],
      },
      {
        id: 'to-ethan',
        answer:
          "Ethan: 'It feels like someone's stabbing when I stand.' Quiet after.",
        patterns: ['ethan', 'son', 'ask him'],
        keywords: ['ethan'],
      },
      {
        id: 'breathing',
        answer:
          "Lungs fine — not short of breath story. Focus hip fever.",
        patterns: ['breath'],
        keywords: ['breath'],
      },
      {
        id: 'diapers',
        answer:
          "Seven-year-old bladder — normal peeing I think pain distracted.",
        patterns: ['urine', 'pee'],
        keywords: ['urine'],
      },
      {
        id: 'worse-help',
        answer:
          "Ice pack hip ten seconds rejected violently. Elevating leg slight less scream maybe placebo.",
        patterns: ['help', 'worse', 'ice'],
        keywords: ['help'],
      },
      {
        id: 'vague',
        answer:
          "Father summary: acute febrile non-weight-bearing painful hip child — scared septic joint not growing pains dismissive pediatric tropes.",
        patterns: ['more', 'describe', 'overall'],
        keywords: ['more'],
      },
      {
        id: 'hello',
        answer:
          "Hey — Chris. Ethan seven, hip pain fever, won't walk since today.",
        patterns: ['hello', 'hi '],
        keywords: ['hello'],
      },
    ],
  },
]
