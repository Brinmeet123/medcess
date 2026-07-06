const REPLY_CLARIFY =
  "Sorry — could you ask that a different way? I want to answer what you mean."

function kevinT2dmKeywords(input: string): string {
  const m = input
  if (m.includes('fatigue') || m.includes('tired') || m.includes('energy')) {
    return "I've been dragging months — afternoons especially brutal at the shop. I blamed stress until the thirst and bathroom trips got honestly embarrassing."
  }
  if (m.includes('thirst') || m.includes('drink') || m.includes('urin') || m.includes('pee')) {
    return "Mouth dry all day — I'm refilling my cup constantly and peeing like crazy even waking me up at night. My wife jokes I live in the bathroom."
  }
  if (m.includes('vision') || m.includes('blur') || m.includes('eye')) {
    return "Menus look fuzzy farther away — I bought stronger readers at the drugstore hoping it was just age. Hasn't fully fixed it."
  }
  if (m.includes('foot') || m.includes('feet') || m.includes('tingle') || m.includes('numb')) {
    return "My toes go tingly at night sometimes — socks feel weird, like the nerves are cranky. Not full numbness walking, more annoying than anything."
  }
  if (m.includes('appetite') || m.includes('hungry') || m.includes('weight')) {
    return "Weirdly hungrier than usual — snacks all day. Belt notch hasn't moved much but I might be up a few pounds if I'm honest."
  }
  if (m.includes('chest') || m.includes('pain')) {
    return "No chest pain — thank goodness. Just this general run-down feeling and the urination thirst stuff."
  }
  if (m.includes('fever') || m.includes('infection') || m.includes('chills')) {
    return "No fevers — not an infection story. It's slow creeping symptoms over months."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long') || m.includes('onset')) {
    return "Maybe three or four months gradual — worse last six weeks. I can't point to one day it 'started'."
  }
  if (m.includes('exercise') || m.includes('walk') || m.includes('stairs')) {
    return "I get winded easier walking the dog — used to be nothing. Probably deconditioning layered in, if I'm making excuses."
  }
  if (m.includes('breath') || m.includes('sob')) {
    return "Breathing is fine sitting — not why I came in. Stairs are harder lately, but that might be weight and laziness mixed."
  }
  if (m.includes('sleep')) {
    return "Sleep is trash because I'm up peeing — not insomnia classic, just bathroom breaks wrecking continuity."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('steroid')) {
    return "Occasional ibuprofen. I stopped lisinopril years ago because it made me cough — probably stupid now — no steroids."
  }
  if (m.includes('family') || m.includes('diabetes') || m.includes('history')) {
    return "Dad had sugar problems in his sixties — pills, not insulin I think. Mom has blood pressure issues."
  }
  if (m.includes('swell') || m.includes('edema')) {
    return "No leg swelling really — maybe face a little puffy in the mirror sometimes, could be paranoia."
  }
  if (m.includes('dizz') || m.includes('lightheaded')) {
    return "Rare lightheaded if I stand fast — maybe dehydration from all the peeing and not keeping up with water intelligently."
  }
  if (m.includes('worse') || m.includes('better') || m.includes('help')) {
    return "Nothing truly fixes it — water helps the dry mouth for five minutes then I'm peeing again, vicious cycle."
  }
  if (m.includes('more') || m.includes('describe') || m.includes('overall')) {
    return "Big picture: thirsty, peeing all the time, tired, vision off, feet tingly — I avoided the doctor like a cliché boss until my wife nagged."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — Kevin. I've felt off for weeks, big thirst, peeing constantly, blurry vision, tingling feet — trying not to catastrophize."
  }
  return REPLY_CLARIFY
}

function robertChfKeywords(input: string): string {
  const m = input
  if (m.includes('breath') || m.includes('short') || m.includes('wind') || m.includes('dyspnea')) {
    return "I get winded doing stupid stuff — stairs, hauling trash cans. Used to carry heavy spools on job sites; now I feel old overnight."
  }
  if (m.includes('swell') || m.includes('edema') || m.includes('ankle') || m.includes('leg')) {
    return "Both legs swell like someone's squeezing fluid into my socks — pitting when I press. Loafers don't fit unless I buy bigger cheap ones."
  }
  if (m.includes('pillow') || m.includes('sleep') || m.includes('flat') || m.includes('orthopn')) {
    return "I need three pillows now — flat feels like I'm drowning, stupid worse at night. Wife noticed before I admitted it."
  }
  if (m.includes('wake') || m.includes('night') || m.includes('gasp')) {
    return "Sometimes I wake up gasping — sit on the edge of the bed like a drama king until it settles. Scared the hell out of me the first time."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Naps are new to me — I doze in the recliner halfway through projects. Workshop dust collecting guilt."
  }
  if (m.includes('cough') || m.includes('fever') || m.includes('cold')) {
    return "No real fever — cough is dry tickle occasionally, nothing colorful or infectious-feeling."
  }
  if (m.includes('chest') || m.includes('pain')) {
    return "No squeezing chest pain lately — had an ER 'warning' years ago vague paperwork I lost."
  }
  if (/\bwhen\b/.test(m) || m.includes('progress')) {
    return "Months slope — denial thick — edema obvious lately and stairs worse last couple months if I'm honest."
  }
  if (m.includes('exercise') || m.includes('walk')) {
    return "Dog walks got shorter — bench supervising grandkids like I'm eighty — I'm seventy-one but pride hurts."
  }
  if (m.includes('med') || m.includes('water pill') || m.includes('diuretic')) {
    return "I'm on lisinopril/HCTZ — sometimes I skip pills like an idiot. Neighbor aspirin cult not official cardiologist advice."
  }
  if (m.includes('salt') || m.includes('diet')) {
    return "Chinese takeout weakness — wife says salt is murder. I'm trying, poorly."
  }
  if (m.includes('smoke') || m.includes('copd')) {
    return "Quit cigarettes fifteen years ago — lungs still pay rent mentally."
  }
  if (m.includes('family') || m.includes('heart')) {
    return "Dad heart attack survived sixties — family cardiac bingo anxiety."
  }
  if (m.includes('urin') || m.includes('pee')) {
    return "Peeing isn't massive volume like diabetes buddy story — night trips happen sometimes parallel other junk."
  }
  if (m.includes('dizz')) {
    return "Rare dizzy standing — not the headline compared to breathing ankles pillows."
  }
  if (m.includes('appetite')) {
    return "Appetite still traitor-good — buffet shame alive."
  }
  if (m.includes('worse') || m.includes('help')) {
    return "Feet up helps the ankle puff cosmetically — stairs still humiliate."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — Robert. Less wind in my sails, swollen legs, pillow stack grown, scary night breathing spells."
  }
  return REPLY_CLARIFY
}

function melissaAnemiaKeywords(input: string): string {
  const m = input
  if (m.includes('dizz') || m.includes('lightheaded') || m.includes('stand')) {
    return "I get lightheaded standing at my desk — black speckles vision, better if I sit fast. Embarrassing at work honestly."
  }
  if (m.includes('period') || m.includes('menstrual') || m.includes('bleed') || m.includes('menses')) {
    return "Periods are heavy — super pads hourly worst days, clots gross TMI. I've been living in dark pants paranoia."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Bone tired — spreadsheets swim. Not lazy — I used to crush weekends hiking."
  }
  if (m.includes('breath') || m.includes('stairs')) {
    return "Stairs wind me — coworkers politely slow elevator like I don't notice kindness stab."
  }
  if (m.includes('ice') || m.includes('pica') || m.includes('craving')) {
    return "I crunch ice from the cafeteria machine — weird soothing habit — coworker side-eye."
  }
  if (m.includes('pain') || m.includes('cramp')) {
    return "No focal belly pain outside period misery — nothing appendicitis-ish."
  }
  if (m.includes('stool') || m.includes('blood') || m.includes('melena')) {
    return "I checked stool like paranoid — no black tar, no bright red I could see."
  }
  if (m.includes('med') || m.includes('nsaid') || m.includes('ibuprofen')) {
    return "Omeprazole daily — occasional ibuprofen cramps stupid maybe stomach enemy."
  }
  if (m.includes('sleep')) {
    return "Sleep fragmented heavy flow nights pad changes misery — quantity okay quality trash."
  }
  if (m.includes('family')) {
    return "Mom fibroids surgery lore — sister easy periods universe unfair."
  }
  if (/\bwhen\b/.test(m) || m.includes('months')) {
    return "Months vague worsening — dizziness heavier last few weeks cycles meaner maybe perimenopause dread."
  }
  if (m.includes('exercise') || m.includes('yoga')) {
    return "Yoga Sundays dropped stamina excuses heat lies."
  }
  if (m.includes('swell')) {
    return "No leg swelling — not that picture."
  }
  if (m.includes('urin')) {
    return "Urination normal daytime volume — not bucket diabetes fear."
  }
  if (m.includes('appetite')) {
    return "Appetite meh-bad — sweet craving irony maybe."
  }
  if (m.includes('worse') || m.includes('help')) {
    return "Sitting helps dizziness quick — vitamins from pharmacy didn't move needle."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — Melissa. Lightheaded standing, tired, heavy periods, chewing ice like a weirdo."
  }
  return REPLY_CLARIFY
}

function williamCkdKeywords(input: string): string {
  const m = input
  if (m.includes('fatigue') || m.includes('tired') || m.includes('energy')) {
    return "Energy evaporated slow-motion — not depression I'm arguing — hobbies dying anyway retired pathetic excuse."
  }
  if (m.includes('appetite') || m.includes('eat') || m.includes('taste')) {
    return "Food tastes like cardboard — appetite half what it was. Garlic breath wife mentions confusion apology."
  }
  if (m.includes('itch') || m.includes('skin')) {
    return "Itchy back ruins sleep — scalding shower scratch cycle brief relief lotion failure collection."
  }
  if (m.includes('swell') || m.includes('edema') || m.includes('sock')) {
    return "Socks imprint ankles afternoons recliner puff — wife noticed before pride cracked."
  }
  if (m.includes('urin') || m.includes('foam') || m.includes('pee')) {
    return "Urine foamier — nights up more — prostate joke wrong anatomy internal eye roll."
  }
  if (
    m.includes('diabetes') ||
    m.includes('blood pressure') ||
    m.includes('hypertension') ||
    m.includes('med')
  ) {
    return "Type two pills spotty compliance shame — lisinopril HCTZ years supposedly. Home BP lazy log 150s."
  }
  if (m.includes('breath')) {
    return "Breathing mostly fine — mild stairs winded could be old man fitness kidney overlap who knows."
  }
  if (m.includes('pain') || m.includes('chest') || m.includes('flank')) {
    return "No chest pain — vague flank ache muscle paranoia google kidney location amateur."
  }
  if (m.includes('fever')) {
    return "No fever — weight inching up fluid maybe denial."
  }
  if (/\bwhen\b/.test(m)) {
    return "Six months fatigue creep — itch edema joined recently louder."
  }
  if (m.includes('sleep')) {
    return "Sleep trash itch bathroom ping pong brain."
  }
  if (m.includes('walk') || m.includes('exercise')) {
    return "Dog walk shortened route cane refusal pride stupid."
  }
  if (m.includes('family')) {
    return "Mom dialysis fear stories — dad different cancer tragedy."
  }
  if (m.includes('nsaid')) {
    return "Ibuprofen knee — kidney lecture ignored classic."
  }
  if (m.includes('dizz')) {
    return "Rare lightheaded — anemia kidney friend warned anecdote."
  }
  if (m.includes('worse') || m.includes('help')) {
    return "Cold showers itch cycle theatrical brief — no real fix."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — William. Energy gone, itchy, swelling, foamy urine worries, diabetic checklist shame."
  }
  return REPLY_CLARIFY
}

function thomasNephroticKeywords(input: string): string {
  const m = input
  if (m.includes('swell') || m.includes('edema') || m.includes('leg') || m.includes('ankle')) {
    return "Legs ankles doughy — clogs leave ridges — face puffy mornings mirror crack denial."
  }
  if (m.includes('urine') || m.includes('foam') || m.includes('pee')) {
    return "Toilet foam beer head disgusting chef joke fails wife audience."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Kitchen double shifts cement legs — not out-of-shape excuse anymore frightening."
  }
  if (m.includes('weight')) {
    return "Scale up ten — blamed pasta profession cruelty irony."
  }
  if (m.includes('breath') || m.includes('flat')) {
    return "Breathing mostly okay — lying flat little tight maybe imagination paranoid."
  }
  if (m.includes('pain') || m.includes('knee')) {
    return "Knees ache hours standing — NSAID crutch regret confession."
  }
  if (m.includes('liver') || m.includes('alcohol') || m.includes('hepat')) {
    return "No known liver disease — LFTs fine vague years ago physical honesty stretch."
  }
  if (m.includes('chest')) {
    return "No chest pain — 3 a.m. cardiac WebMD hobby shame."
  }
  if (m.includes('calf') || m.includes('clot') || m.includes('dvt')) {
    return "Calves symmetric — not one sausage leg photo Google DVT panic avoided."
  }
  if (/\bwhen\b/.test(m) || m.includes('week')) {
    return "Weeks worsening — foam noticed month maybe schedule blur."
  }
  if (m.includes('ibuprofen') || m.includes('med') || m.includes('nsaid')) {
    return "Ibuprofen handfuls long shifts — chef culture kidney lesson dread."
  }
  if (m.includes('family')) {
    return "Mom diabetes dad blood pressure — kidney biopsy lore absent."
  }
  if (m.includes('appetite')) {
    return "Appetite cruel-good — hunger while puffing paradox."
  }
  if (m.includes('sleep')) {
    return "Sleep leg heaviness pillow between knees cope MacGyver."
  }
  if (m.includes('exercise')) {
    return "Exercise fantasy abandoned — kitchen marathon only."
  }
  if (m.includes('dizz')) {
    return "Mild dizzy rare — sidebar symptom."
  }
  if (m.includes('salt') || m.includes('worse') || m.includes('help')) {
    return "Salt profession sabotage — feet up mornings minor cosmetic win."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — Thomas. Swelling legs foamy urine weight gain chef scared."
  }
  return REPLY_CLARIFY
}

const MEDACADEMY_FULL_HISTORY = `A 59 y/o female fell and sustained a subtrochanteric hip fracture requiring fixation. During the hospitalization, she had an episode of shortness of breath and chest pain. CT scan was ordered to rule out a pulmonary embolism (PE). The radiology report described a right infrahilar mass of 3.1 cm and subcarinal lymph nodes measuring 1.2 cm (see Figure 1). The PE was ruled out.

History of Present Illness:
She denies weight loss and hemoptysis, but has been complaining of hoarseness for the past two weeks. She has chronic low back pain, headache, and changes in mentation/coordination. She has a 65-70 pack year smoking history.

Past Medical History:
Chronic back pain
HTN
Hypothyroidism
Hx of GI bleed 2004 with negative endoscopy
Hx of diverticular abscess requiring colon resection in 1982

Family History:
No cancer in the family.`

const MEDACADEMY_PHYSICAL_EXAM = `Physical Examination:

Mild raspy voice

HEENT: pupils equal, round, and reactive to light, extraocular movements intact (EOMI), oropharynx (OP) clear

Neck: Supple non-palpable thyroid

Lungs: Clear to auscultation and percussion

Cardiac: regular rate & rhythm (RRR) w/o murmurs

Abd: Well healed surgical scar, no masses, liver edge not palpated

Limbs: No edema

Neuro: Cranial nerves (CN) intact, no focal weakness`

function medacademyCellsGoingWildKeywords(input: string): string {
  const m = input.toLowerCase()
  if (
    m.includes('full patient history') ||
    m.includes('full history') ||
    m.includes('patient history') ||
    m.includes('summarize') && m.includes('history') ||
    m.includes('all the history') ||
    m.includes('what do we know about the patient') ||
    (m.includes('history') && (m.includes('your') || m.includes('give me') || m.includes('tell me') || m.includes('what is')))
  ) {
    return MEDACADEMY_FULL_HISTORY
  }
  if (
    m.includes('physical exam') ||
    m.includes('physical examination') ||
    m.includes('exam findings') ||
    m.includes('what did you find on exam') ||
    m.includes('give me the physical') ||
    (m.includes('what is the pe') && !m.includes('pulmonary'))
  ) {
    return MEDACADEMY_PHYSICAL_EXAM
  }
  if (m.includes('smok') || m.includes('cigarette') || m.includes('tobacco') || m.includes('pack')) {
    return 'She has a 65-70 pack year smoking history.'
  }
  if (m.includes('weight loss') || m.includes('lost weight') || m.includes('losing weight')) {
    return 'She denies weight loss.'
  }
  if (m.includes('hemoptysis') || m.includes('cough blood') || m.includes('blood in sputum') || m.includes('coughing blood')) {
    return 'She denies hemoptysis.'
  }
  if (m.includes('hoarse') || m.includes('raspy') || m.includes('voice')) {
    return 'She has been complaining of hoarseness for the past two weeks.'
  }
  if (m.includes('back pain') || m.includes('chronic low back') || m.includes('low back pain')) {
    return 'She has chronic low back pain.'
  }
  if (m.includes('headache') || m.includes('head pain')) {
    return 'She has headache.'
  }
  if (m.includes('confusion') || m.includes('coordination') || m.includes('mentation')) {
    return 'She has changes in mentation/coordination.'
  }
  if (m.includes('family history') || m.includes('family cancer') || (m.includes('family') && m.includes('cancer'))) {
    return 'No cancer in the family.'
  }
  if (m.includes('medical history') || m.includes('past medical') || m.includes('hypertension') || m.includes('hypothyroid') || m.includes('colon') || m.includes('gi bleed') || m.includes('pmh')) {
    return 'Chronic back pain, HTN, Hypothyroidism, Hx of GI bleed 2004 with negative endoscopy, and Hx of diverticular abscess requiring colon resection in 1982.'
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm Patricia. I broke my hip and now I'm having shortness of breath and chest pain in the hospital."
  }
  return REPLY_CLARIFY
}

export const internalMedicineKeywordHandlers: Record<string, (input: string) => string> = {
  't2dm-off-weeks-kevin-sharma': kevinT2dmKeywords,
  'chf-sob-robert-daniels': robertChfKeywords,
  'iron-anemia-dizziness-melissa-chen': melissaAnemiaKeywords,
  'ckd-fatigue-william-foster': williamCkdKeywords,
  'nephrotic-edema-thomas-rivera': thomasNephroticKeywords,
  'medacademy-pathology-cells-going-wild': medacademyCellsGoingWildKeywords,
}
