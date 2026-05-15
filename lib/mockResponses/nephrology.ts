const REPLY =
  "Could you ask that a bit more simply? I’m feeling pretty rough and I want to answer the right thing."

function nephDanielStone(input: string): string {
  const m = input
  if (m.includes('pain') || m.includes('hurt') || m.includes('ache')) {
    return "It’s like someone’s squeezing my right side in waves — bad for a couple minutes, eases a notch, then slams again. I can’t lie still; pacing or twisting is the only thing that feels slightly less awful right now."
  }
  if (m.includes('groin') || m.includes('radiat') || m.includes('spread') || m.includes('testicle')) {
    return "Yeah… it kind of sneaks toward my groin on that side, maybe the ball too — weird and scary. I didn’t think back pain would do that until today."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw up')) {
    return "Super nauseous — dry-heaved once in the bathroom, nothing really came up. The pain and nausea hit together like a one-two punch."
  }
  if (m.includes('fever') || m.includes('chill') || m.includes('temperature')) {
    return "No fever that I know of — I’m sweaty from hurting, but I haven’t had chills or felt infected like the flu."
  }
  if (m.includes('urine') || m.includes('pee') || m.includes('blood')) {
    return "I thought my urine looked a little pinkish last time — not bright red, more ‘that’s not normal.’ I wasn’t sure if I was imagining it because I was freaked out."
  }
  if (m.includes('trauma') || m.includes('injury') || m.includes('fall')) {
    return "No fall, no car wreck — I was lifting boxes at work, normal day, then boom this started. Nothing hit me in the back."
  }
  if (m.includes('timing') || m.includes('when') || m.includes('how long') || m.includes('start')) {
    return "About two hours ago mid-route — I was fine, then it was not fine. It’s been relentless since with those up-and-down waves."
  }
  if (m.includes('hydration') || m.includes('water') || m.includes('fluid')) {
    return "I’m usually decent with water on the job, but today I was running behind and barely drank — probably dumb. Right now anything sounds nauseating anyway."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('ibuprofen')) {
    return "I popped ibuprofen at home — did nothing. No weird supplements, no new prescriptions."
  }
  if (m.includes('history') || m.includes('family') || m.includes('prior') || m.includes('stone')) {
    return "Never had this before, never surgery on my belly. My uncle talks about kidney stuff but I always tuned it out — sorry."
  }
  if (m.includes('appetite') || m.includes('eat')) {
    return "Zero appetite — the thought of food makes my stomach turn. I haven’t eaten since lunch and even that feels like a mistake now."
  }
  if (m.includes('bowel') || m.includes('stool') || m.includes('constip')) {
    return "Haven’t noticed weird poop problems — pain is side and back, not classic stomach bug cramps."
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Moving around weirdly helps more than lying flat — like I’m chasing a position that doesn’t exist. Bending, heat on it — nothing truly helps."
  }
  if (m.includes('chest') || m.includes('breath') || m.includes('short')) {
    return "Breathing’s okay — I’m winded because I’m tense and moving, not like heart attack tight chest."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — thanks. This side pain is the worst thing I’ve felt in my life, no exaggeration."
  }
  return REPLY
}

function nephAmandaNephrotic(input: string): string {
  const m = input
  if (m.includes('swell') || m.includes('puffy') || m.includes('edema') || m.includes('leg')) {
    return "My face looks pillowy in the morning and my calves get tight by the end of school — socks leave deep rings. I stopped wearing my favorite rings because they won’t go on."
  }
  if (m.includes('urine') || m.includes('pee') || m.includes('foam')) {
    return "Toilet looks foamy sometimes — embarrassing with three roommates. I tried to flush fast like it’s soap, but it keeps happening and it’s freaking me out a little."
  }
  if (m.includes('weight') || m.includes('gain')) {
    return "Scale says I’m up even though I’m not eating more — clothes fit weird, waistbands dig in. I blamed salt but it’s been weeks now."
  }
  if (m.includes('fatigue') || m.includes('tired') || m.includes('energy')) {
    return "Teaching feels like wading through mud — I smile for the kids, then collapse in my car before driving home."
  }
  if (m.includes('blood pressure') || m.includes('bp ') || m.includes('pressure high')) {
    return "Nurse said it’s high at a walk-in — I figured nerves, but it’s been up at the drugstore machine too. Family has hypertension, so I hoped it wouldn’t hit me yet."
  }
  if (m.includes('fever') || m.includes('infection')) {
    return "No fever, no burning pee, nothing that feels like a UTI. Just fluid and fatigue, which sounds dramatic when I say it out loud."
  }
  if (m.includes('chest') || m.includes('orthopnea') || m.includes('pillow')) {
    return "I’m not gasping for pillows at night — more heaviness in my legs and face than lungs drowning. Stairs wind me but it’s ‘out of shape’ plus whatever this is."
  }
  if (m.includes('med') || m.includes('ibuprofen') || m.includes('nsaid')) {
    return "Ibuprofen here and there for cramps — probably too much if I’m honest. Nobody warned me it could mess with kidneys until I spiraled reading online."
  }
  if (m.includes('dvt') || m.includes('calf') || m.includes('one leg')) {
    return "Both legs, symmetric puff — not one hot angry calf. I worried about clots anyway because anxiety, but it doesn’t look one-sided."
  }
  if (m.includes('appetite')) {
    return "Appetite’s weird — not nauseated, just not interested. Still eating because I know I should."
  }
  if (m.includes('timing') || m.includes('when') || m.includes('how long')) {
    return "Maybe a month creeping, worse last two weeks — the foamy pee thing I noticed more recently than the puffiness."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Mom has thyroid stuff; dad’s side has blood pressure problems. No one talks about kidney disease at reunions."
  }
  if (m.includes('stress')) {
    return "Teaching’s always stressful, but this feels bodily — like I’m wearing a water suit, not just tired from loud kids."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Elevating legs at night helps a tiny bit visually; mornings still wreck my face. Salt probably makes it worse — I tried cutting ramen, pathetic as that sounds."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi… sorry I look puffy. I kept hoping it was allergies until my legs joined the party."
  }
  return REPLY
}

function nephJacobPsgn(input: string): string {
  const m = input
  if (m.includes('urine') || m.includes('pee') || m.includes('dark') || m.includes('cola')) {
    return "It’s been brown-ish — like cola, gross to say — my mom freaked first. Doesn’t sting much peeing, just looks terrifying in the bowl."
  }
  if (m.includes('throat') || m.includes('strep') || m.includes('sore')) {
    return "Like two weeks ago my throat was on fire — doctor called in antibiotics and it chilled out after a few days, I thought I was done with it."
  }
  if (m.includes('swell') || m.includes('puffy') || m.includes('face')) {
    return "My eyelids look weird in the morning mirror — puffy, like I slept wrong, except it’s been days. Kids might notice at school and I hate that thought."
  }
  if (m.includes('headache') || m.includes('head')) {
    return "Head hurts sometimes — not the worst ever, more nagging. Mom worries because I’m not usually a headache kid."
  }
  if (m.includes('fever') || m.includes('temp')) {
    return "I felt warm-ish but not crazy high — mom checked with that forehead thing, borderline numbers."
  }
  if (m.includes('blood pressure') || m.includes('bp')) {
    return "Nurse here made a face about my pressure — didn’t tell me numbers, just ‘high for your age’ — that scared me more than I showed."
  }
  if (m.includes('pain') || m.includes('belly') || m.includes('flank')) {
    return "Kind of a dull ache in my back sometimes, not screaming like a stitch. Not where I was expecting pee problems to hurt."
  }
  if (m.includes('exercise') || m.includes('sport') || m.includes('trauma')) {
    return "No sports injury, no tackle — I’m more gaming and soccer sometimes, nothing hit my kidneys."
  }
  if (m.includes('food') || m.includes('eat') || m.includes('appetite')) {
    return "Food’s meh — tired kills hunger. I still eat cereal because mom enforces breakfast."
  }
  if (m.includes('rash') || m.includes('joint')) {
    return "No weird rash or swollen joints — not like my cousin’s lupus talk; that stuff sounds scarier in a different way."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Dark pee two days, puffiness kinda parallel — maybe three? Timeline fuzzy; school blurs days."
  }
  if (m.includes('family')) {
    return "Mom’s healthy mostly; dad has high cholesterol. Nobody famous for kidneys that I know."
  }
  if (m.includes('nausea')) {
    return "A little queasy sometimes — not puke city, just off."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Rest makes me notice my face more; moving around distracts until I’m tired again. Drinking water because everyone says to — not sure it helps color."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi… my mom made me come. My pee looks super wrong."
  }
  return REPLY
}

function nephGeorgeAki(input: string): string {
  const m = input
  if (m.includes('diarrhea') || m.includes('diarrhoea') || m.includes('loose stool')) {
    return "Some loose stool first day with the bug — mostly vomiting dominated — sorry for TMI."
  }
  if (m.includes('cramp') || m.includes('stomach')) {
    return "Stomach muscles hurt from heaving — different ache than 'appendix point' stories I've heard."
  }
  if (m.includes('vomit') || m.includes('throw up') || m.includes('dehydrat') || m.includes('fluid')) {
    return "Stomach bug wrecked me — couldn’t keep water down two days straight. I tried sips and sports junk; it came back up. Probably dehydrated myself stupid."
  }
  if (
    m.includes('urine') ||
    m.includes('pee') ||
    m.includes('olig') ||
    m.includes('output') ||
    m.includes('urination')
  ) {
    return "Barely peeing — little dark squirts when I can. That’s what scared me most; I know that’s not normal for me."
  }
  if (m.includes('weak') || m.includes('dizzy') || m.includes('orthost')) {
    return "Standing fast makes the room slide sideways — weak like after flu but heavier. Walking to the bathroom leaves me winded."
  }
  if (m.includes('breath') || m.includes('short') || m.includes('sob')) {
    return "Can’t catch a comfortable breath — not sharp chest pain, more like I’m panting after nothing. Oxygen felt lower at triage; numbers freaked me."
  }
  if (m.includes('chest') || m.includes('heart')) {
    return "No squeezing heart classic pain — more fatigue and air hunger. If it were cardiac I’d say, I’m not trying to be brave."
  }
  if (m.includes('fever') || m.includes('infection')) {
    return "No fever now — was hotter first day of vomiting maybe; hard to remember through the haze."
  }
  if (m.includes('med') || m.includes('lisinopril') || m.includes('ace')) {
    return "Still took my lisinopril through the puking — in hindsight dumb, but I didn’t think stopping everything was safe either. Also statin at night usually."
  }
  if (m.includes('nsaid') || m.includes('ibuprofen') || m.includes('advil')) {
    return "Didn’t live on NSAIDs lately — maybe one dose early on for ache, then my stomach rebelled."
  }
  if (m.includes('timing') || m.includes('when') || m.includes('how long')) {
    return "GI hell maybe three days ago peak — weak since, urine dropped last day especially. Came in when walking winded me."
  }
  if (m.includes('appetite') || m.includes('drink')) {
    return "Sips only — anything more triggers gag. Dry mouth constantly; skin feels papery."
  }
  if (m.includes('family') || m.includes('kidney')) {
    return "Brother has ‘kidney stuff’ — vague family lore — I never paid attention. Should’ve, maybe."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Lying propped helps breathing slightly; moving kills me. IV sounds amazing if you’re offering — anything to feel less dried out."
  }
  if (m.includes('pain') && m.includes('abdomen')) {
    return "Belly sore from heaving, not sharp surgical focal pain — more beaten-up feeling."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I’ve felt awful for days; the pee thing finally pushed me in."
  }
  return REPLY
}

function nephRichardCkd(input: string): string {
  const m = input
  if (m.includes('blood pressure') || m.includes('bp') || m.includes('hypertension')) {
    return "Numbers keep climbing — home cuff is ugly mornings. I’m on meds, dose got bumped, still marching up; my PCP sounded worried enough to refer."
  }
  if (m.includes('diabetes') || m.includes('sugar') || m.includes('a1c')) {
    return "Type 2 maybe eight years — metformin plus the shot weekly thing. Control ‘okay’ on paper but I cheat snacks under stress; accountant hours don’t help."
  }
  if (m.includes('swell') || m.includes('leg') || m.includes('edema')) {
    return "Ankles puffy evening — socks mark my skin. Not dramatic drowning but new enough to notice tying shoes."
  }
  if (m.includes('fatigue') || m.includes('tired') || m.includes('weak')) {
    return "Climbing stairs at the office parking garage wipes me — used to jog this, now I pause mid-flight like an old man."
  }
  if (m.includes('appetite') || m.includes('eat') || m.includes('food')) {
    return "Food looks gray — not nauseated exactly, just uninterested. Wife says I pick at dinner."
  }
  if (m.includes('urine') || m.includes('pee') || m.includes('froth') || m.includes('foamy')) {
    return "Sometimes bubbles in the bowl stick around — I told myself it’s just force of stream; secretly wondered if kidneys complaining."
  }
  if (m.includes('chest') || m.includes('pain')) {
    return "No chest pain episodes — I’d sprint to ER if that happened; different anxiety."
  }
  if (m.includes('fever')) {
    return "No fever, no infection story — sluggish metabolic creep feels more accurate."
  }
  if (m.includes('med') || m.includes('nsaid') || m.includes('ibuprofen')) {
    return "Ibuprofen some nights for knees — I know, probably bad long-term; it’s the quick fix when I can’t sleep."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Dad died younger than he should — heart and kidneys tangled, family murky on details. Mom’s healthy but watches my sugar like a hawk."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Pressure creeping months; fatigue and swelling more recent weeks — maybe I ignored earlier signs as ‘getting older.’"
  }
  if (m.includes('nocturia') || m.includes('night')) {
    return "Up once or twice peeing — not insane, but noticeable vs years ago."
  }
  if (m.includes('hydration') || m.includes('water')) {
    return "Coffee hydrates according to nobody — I drink water when headaches nag; could be better."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Sodium cutting helped BP microscopically — not enough. Exercise plans exist theoretically; knees argue."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — my BP’s acting like I’m not even medicated; figured I should stop ignoring it."
  }
  return REPLY
}

export const nephrologyKeywordHandlers: Record<string, (input: string) => string> = {
  'nephro-lithiasis-daniel-flank': nephDanielStone,
  'nephro-nephrotic-amanda-edema': nephAmandaNephrotic,
  'nephro-psgn-jacob-cola-urine': nephJacobPsgn,
  'nephro-aki-george-dehydration': nephGeorgeAki,
  'nephro-ckd-richard-hypertension': nephRichardCkd,
}
