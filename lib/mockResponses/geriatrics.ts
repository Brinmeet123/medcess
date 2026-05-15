const REPLY_VAGUE_FALLBACK =
  "I'm doing my best to answer, but I'm not sure I understood the question. Could you ask it a different way?";

/** Margaret — delirium/UTI; Carla speaks when family/caregiver addressed */
function geriatricsDeliriumMargaret(input: string): string {
  const m = input.toLowerCase();
  if (
    m.includes('daughter') ||
    m.includes('family') ||
    m.includes('carla') ||
    m.includes('caregiver') ||
    m.includes('someone with you') ||
    m.includes('who brought')
  ) {
    return "I'm her daughter Carla. She was fine on the phone three days ago — sharp, joking. This morning she didn't know what day it was and kept dozing mid-sentence. I'm scared because this isn't her normal self at all.";
  }
  if (m.includes('confus') || m.includes('orient') || m.includes('memory')) {
    return "I feel fuzzy, like I'm half asleep even when I'm awake. Dates slide away from me today, and I know that's not how I usually am. I can't quite grab the right words sometimes.";
  }
  if (m.includes('baseline') || m.includes('usual') || m.includes('normally') || m.includes('independent')) {
    return "Normally I live alone and handle my pills and groceries myself. I still drive to the store on quiet mornings. Today everyone's hovering, which tells me something's off even if I can't piece it together.";
  }
  if (
    m.includes('urin') ||
    m.includes('bladder') ||
    m.includes('uti') ||
    m.includes('bathroom') ||
    m.includes('frequency')
  ) {
    return "I've been running to the bathroom more for several days — urgency more than pain, if I'm honest. I thought I was just tired. I'm a little embarrassed talking about it with the room busy.";
  }
  if (m.includes('fever') || m.includes('chill') || m.includes('temperature') || m.includes('hot')) {
    return "I felt warm and chilled on and off — not rigors, just uncomfortable. I'm not sure the exact number. My daughter said I felt hot when she hugged me.";
  }
  if (m.includes('pain') || m.includes('hurt') || m.includes('tender')) {
    return "Not sharp pain like when I broke my wrist years ago. Low belly feels uncomfortable when I need to go, and I'm a little achy all over.";
  }
  if (m.includes('fall') || m.includes('fell') || m.includes('head injury') || m.includes('hit your head')) {
    return "I didn't fall that I remember. No bump on my head today. Sometimes I'm unsteady when I stand fast, but I didn't trip or black out.";
  }
  if (m.includes('sleep') || m.includes('drowsy') || m.includes('sleepy') || m.includes('tired')) {
    return "I'm sleepier than usual — nodding off mid-thought. Last night wasn't great, but today feels different, like I can't stay in the conversation.";
  }
  if (m.includes('med') || m.includes('pill') || m.includes('lisinopril') || m.includes('metformin')) {
    return "I take lisinopril, metformin, and a calcium pill — same doses I've been on a long time, nothing new that I know of. I'm usually good about taking them, but today I'm muddled.";
  }
  if (m.includes('help') || m.includes('better') || m.includes('worse')) {
    return "Resting helps a little with the tired feeling, but the fog doesn't lift like it should. Bright noise and people asking fast questions make it worse — I need things slower today.";
  }
  if (m.includes('walk') || m.includes('mobility') || m.includes('walking') || m.includes('stairs')) {
    return "I still walk on my own usually. Today I held my daughter's arm coming in because I felt weak. Stairs would be a bad idea until I'm steadier.";
  }
  if (m.includes('eat') || m.includes('appetite') || m.includes('drink') || m.includes('fluid')) {
    return "I picked at breakfast — not very hungry. I've tried to sip water because Carla kept reminding me. I'm not nauseated, just not interested.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('start') || m.includes('today')) {
    return "The confusion really showed up today for them — maybe subtle last night, but I can't pin it down. That's what's frightening everyone, how fast it changed.";
  }
  if (m.includes('dizz') || m.includes('lightheaded')) {
    return "A little lightheaded if I sit up too fast — not spinning like the room is turning. I steady myself on the bed rail and it passes.";
  }
  if (m.includes('family history') || m.includes('parents') || m.includes('mother') || m.includes('father')) {
    return "Mom had heart issues later in life. Dad passed from something I think was a stroke in his seventies. Nothing like this confusion picture that I know of.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello… I'm sorry, I'm not quite myself today. I came in because my family was worried.";
  }
  return REPLY_VAGUE_FALLBACK;
}

/** Harold — Alzheimer pattern; Daniel for collateral */
function geriatricsAlzheimerHarold(input: string): string {
  const m = input.toLowerCase();
  if (
    m.includes('son') ||
    m.includes('daniel') ||
    m.includes('family') ||
    m.includes('caregiver') ||
    m.includes('someone with you') ||
    (m.includes('collateral') && m.includes('history'))
  ) {
    return "I'm his son Daniel. He repeats the same stories ten minutes apart and he forgot online banking passwords he used forever. I found unpaid notices — he never missed a bill before two years ago.";
  }
  if (m.includes('memory') || m.includes('forget') || m.includes('remember')) {
    return "I lose track of where I put my glasses and keys — classic old guy stuff, I joked at first. Recently it's meetings and passwords, details I used to own. It's embarrassing to admit.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('start') || m.includes('how long')) {
    return "Maybe a couple years if I'm honest — gradual, not like a light switch. My son says it crept faster lately with finances, but there's no single \"stroke-like\" day I recall.";
  }
  if (m.includes('finance') || m.includes('bills') || m.includes('bank')) {
    return "Numbers were my career — taxes, spreadsheets. Lately I second-guess entries and Daniel checks them. That bothers me more than the misplaced keys, honestly.";
  }
  if (m.includes('dizz') || m.includes('faint') || m.includes('stroke')) {
    return "No sudden weakness or slurred speech episode. I haven't passed out. If I felt truly stroke-y, I'd have come in the same day.";
  }
  if (m.includes('sleep') || m.includes('insomnia') || m.includes('nap')) {
    return "I sleep okay, maybe up once for the bathroom. I nap more weekends — who doesn't — but I'm not all-night tossing.";
  }
  if (m.includes('mood') || m.includes('depress') || m.includes('sad')) {
    return "Frustrated more than sad — I'm scared I'm slipping. I still enjoy Sunday football, just not as sharply engaged with the guys' banter.";
  }
  if (m.includes('fall') || m.includes('walk') || m.includes('walking') || m.includes('mobil')) {
    return "I walk the block most mornings — no cane. No falls. Sometimes I slow on uneven sidewalks but I catch myself.";
  }
  if (m.includes('baseline') || m.includes('independent') || m.includes('adl')) {
    return "I dressed and showered alone and cooked simple meals. Shopping lists got harder — I buy duplicates sometimes. Daniel helps with online orders now.";
  }
  if (
    m.includes('family history') ||
    m.includes('dementia') ||
    (m.includes('family') && m.includes('history'))
  ) {
    return "Aunt had what we called \"senior moments\" late in life. No formal Huntington-type stories. Parents died of heart stuff mostly.";
  }
  if (m.includes('med') || m.includes('pill') || m.includes('statin') || m.includes('amlodipine')) {
    return "Atorvastatin and amlodipine only — blood pressure and cholesterol. No sleeping pills or allergy meds I take regularly.";
  }
  if (m.includes('eat') || m.includes('appetite') || m.includes('weight')) {
    return "Appetite's fine — maybe I'm a few pounds up from sitting more. No vomiting or gut trouble.";
  }
  if (m.includes('confus') || m.includes('orient')) {
    return "I'm oriented here, but I blank on three-word recall tests they gave in the waiting packet. That stung.";
  }
  if (m.includes('pain') || m.includes('headache')) {
    return "Headaches aren't the issue. No chronic pain — a little shoulder stiffness sometimes.";
  }
  if (m.includes('help') || m.includes('better') || m.includes('worse')) {
    return "Writing things down helps short term. Fatigue and rushing make repeats worse — slow questions help me track.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my son wanted me checked because I keep misplacing things and repeating myself.";
  }
  return REPLY_VAGUE_FALLBACK;
}

function geriatricsOrthostaticRichard(input: string): string {
  const m = input.toLowerCase();
  if (m.includes('dizz') || m.includes('lightheaded') || m.includes('woozy')) {
    return "When I stand up, the room dims for a few seconds — I steady myself on the dresser. It got worse since they upped my water pill, I think. Never fully passed out.";
  }
  if (m.includes('fall') || m.includes('fell') || m.includes('injury')) {
    return "Three falls in three months — clumsy near-syncope, not seizures. Bruised knee twice, no head strike. Last night I caught the counter and slid down slow.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('start') || m.includes('how long')) {
    return "Roughly three months of this dance — worse lately after the clinic tweaked my blood pressure meds. Timing lines up with feeling weaker standing, not lying down.";
  }
  if (
    m.includes('med') ||
    m.includes('pill') ||
    m.includes('hydrochlorothiazide') ||
    m.includes('hctz') ||
    m.includes('metoprolol') ||
    m.includes('tamsulosin')
  ) {
    return "HCTZ, metoprolol, tamsulosin — all long-term except the diuretic dose went up recently. I also take the tamsulosin at night for stream. I wondered if that's too much dropping my pressure.";
  }
  if (m.includes('syncope') || m.includes('blackout') || m.includes('loss of consciousness')) {
    return "No real blackouts — gray vision and I sit fast. Family hasn't seen me totally out.";
  }
  if (m.includes('walk') || m.includes('cane') || m.includes('mobility') || m.includes('stairs')) {
    return "Cane for bad knee days — mostly indoor independence. Stairs are slow; I use the rail. Since the dizzy spells I hug walls more.";
  }
  if (m.includes('baseline') || m.includes('before')) {
    return "Before this stretch I wasn't grabbing furniture every morning. I still walked to the corner mailbox without thinking twice.";
  }
  if (m.includes('confus') || m.includes('memory')) {
    return "Thinking is clear — not confused like my sister-in-law with dementia. This is standing-up dizziness, not forgetting who I am.";
  }
  if (m.includes('family') || m.includes('wife') || m.includes('daughter')) {
    return "Daughter checks in evenings — she noticed I'm \"listing\" after standing from dinner. She worries about a nighttime fall when I'm alone.";
  }
  if (m.includes('family history') || m.includes('parents')) {
    return "Dad had \"heart rhythm issues\" — vague to me. Mom had strokes late but not young. My siblings are older with BP problems.";
  }
  if (m.includes('pain') || m.includes('chest')) {
    return "No chest pressure with the dizziness. Shoulders ache from arthritis but not angina stories.";
  }
  if (m.includes('fluid') || m.includes('drink') || m.includes('eat')) {
    return "I could drink more water — coffee first thing, not enough after. Meals regular — appetite fine.";
  }
  if (m.includes('sleep')) {
    return "Sleep's interrupted by bathroom trips — prostate thing. I still get six hours most nights.";
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Sitting and elevating legs helps. Standing fast in a hot shower makes it worse — I've learned to pause on the mat.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I keep getting dizzy when I stand and I've had a few near-falls.";
  }
  return REPLY_VAGUE_FALLBACK;
}

/** Dorothy — failure to thrive; Priya collateral */
function geriatricsFailureDorothy(input: string): string {
  const m = input.toLowerCase();
  if (
    m.includes('granddaughter') ||
    m.includes('priya') ||
    m.includes('family') ||
    m.includes('caregiver') ||
    (m.includes('collateral') && m.includes('history'))
  ) {
    return "I'm Priya, her granddaughter. Her jeans are falling off — maybe fifteen-plus pounds gone without trying. She says she's fine, but she naps through lunch and I'm finding spoiled food in the fridge.";
  }
  if (m.includes('eat') || m.includes('appetite') || m.includes('food') || m.includes('weight')) {
    return "Nothing tastes exciting — meals feel like chores. Portions got tiny. I see the scale dropping but I don't feel hungry enough to fix it.";
  }
  if (m.includes('walk') || m.includes('mobility') || m.includes('stairs') || m.includes('weak')) {
    return "My legs feel wobbly carrying laundry up. I clutch the railing every step now. A few months ago I still walked to book club.";
  }
  if (m.includes('pain') || m.includes('abdom') || m.includes('nausea')) {
    return "No burning stomach pain — not nauseated. Bowel habits slower maybe but nothing alarming I'm hiding.";
  }
  if (m.includes('fall') || m.includes('fracture')) {
    return "No bad falls — I grab the rail before I go down. Fear of falling keeps me home more.";
  }
  if (m.includes('mood') || m.includes('depress') || m.includes('interest')) {
    return "I lose interest halfway through a novel — used to finish two a week. Could be mood, could be tired — hard to separate.";
  }
  if (m.includes('confus') || m.includes('memory')) {
    return "I forget whether I ate lunch — Priya thinks that's why I miss meals. I'm not as sharp setting reminders as I used to be.";
  }
  if (m.includes('sleep')) {
    return "I reach for an OTC sleep aid some nights — diphenhydramine — I know I shouldn't lean on it. Sleep comes in chunks.";
  }
  if (
    m.includes('med') ||
    m.includes('pill') ||
    m.includes('furosemide') ||
    m.includes('metoprolol') ||
    m.includes('omeprazole') ||
    m.includes('levothyroxine')
  ) {
    return "Diuretic, metoprolol, omeprazole, levothyroxine — all prescribed, plus acetaminophen as needed and occasional sleep stuff from the drugstore. It's a handful.";
  }
  if (m.includes('baseline') || m.includes('before') || m.includes('active')) {
    return "I was the librarian who stayed late shelving — walked everywhere. Cooking every night, stairs slowly but steady. That energy's gone.";
  }
  if (m.includes('family history') || m.includes('cancer')) {
    return "Mom died of something abdominal in her eighties — details fuzzy. Dad heart failure. I'm worried subconsciously about \"bad news\" with weight loss.";
  }
  if (m.includes('dizz') || m.includes('faint')) {
    return "A little dizzy standing — not the main story compared to weakness and not eating.";
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Small snacks when Priya visits help — I'm worse alone weekends when I skip cooking. Gentle reminders to drink help.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('how long')) {
    return "Maybe four to six months sliding — clothes looser, club dropped off, fridge stranger. Not a single crash day.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I'm not eating much and I've lost weight my family noticed.";
  }
  return REPLY_VAGUE_FALLBACK;
}

/** Eleanor — stroke; daughter for witness account */
function geriatricsStrokeEleanor(input: string): string {
  const m = input.toLowerCase();
  if (
    m.includes('daughter') ||
    m.includes('family') ||
    m.includes('witness') ||
    m.includes('someone saw') ||
    m.includes('who saw')
  ) {
    return "I'm her daughter — we were at breakfast. Her mouth drooped on the right and words slurred mid-sentence. She couldn't lift her right arm to butter toast. I noted the time and called 911.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('onset') || m.includes('how long ago')) {
    return "This hit maybe 45 minutes before we walked through your doors — sudden, not building all morning. Last-known-well was basically breakfast conversation before the face changed.";
  }
  if (m.includes('weak') || m.includes('arm') || m.includes('leg') || m.includes('face') || m.includes('drool')) {
    return "Right arm feels heavy — I can barely hold a pen. Face feels uneven when I try to smile. Speech comes out thick, not crisp like usual.";
  }
  if (m.includes('warfarin') || m.includes('coumadin') || m.includes('blood thinner') || m.includes('inr')) {
    return "I'm on warfarin for AFib forever, basically. I usually track INR but today is chaos — you'll need a lab. I didn't skip doses on purpose.";
  }
  if (m.includes('headache') || m.includes('worst headache')) {
    return "No thunderclap headache — not like my nursing days seeing SAH. Head feels tense from stress, not explosive.";
  }
  if (m.includes('seizure') || m.includes('shake')) {
    return "No shaking episode — no biting tongue that I know. Sudden weakness, not convulsion.";
  }
  if (m.includes('vision') || m.includes('see')) {
    return "Vision seems off tracking to the right field maybe — hard to separate from panic. No painless monocular blackout story.";
  }
  if (m.includes('walk') || m.includes('fall')) {
    return "They wheeled me — I didn't fall. Walking feels unsafe with the arm not cooperating.";
  }
  if (m.includes('baseline') || m.includes('before')) {
    return "I managed my meds and cooked at home — nursing retired but habits stuck. This is a cliff, not a slow decline.";
  }
  if (m.includes('confus') || m.includes('memory')) {
    return "Scared enough that I'm scattered, but I know where I am. Main problem is motor and speech, not forgetting grandchildren.";
  }
  if (m.includes('med') || m.includes('metoprolol') || m.includes('pill')) {
    return "Warfarin and metoprolol regularly. No new street drugs — come on, I'm eighty-one and a former nurse.";
  }
  if (m.includes('pain')) {
    return "Frustration more than pain — shoulder aches from how I'm holding it, not crushing chest pain.";
  }
  if (m.includes('family history') || m.includes('stroke')) {
    return "Sister had a stroke at seventy-eight — recovered partially. Parents died younger, not stroke-heavy that I recall.";
  }
  if (m.includes('blood pressure') || m.includes('pressure')) {
    return "Mine runs high — EMS said it was up today. I know that's not great in this setting but I can't quote exact prehospital numbers.";
  }
  if (m.includes('sleep')) {
    return "Slept okay last night — this wasn't sleep paralysis or waking weak. It was sudden at the table.";
  }
  if (m.includes('eat') || m.includes('sugar') || m.includes('hypogly')) {
    return "I ate toast — not fasting. sugars aren't my usual problem but I'd let you check if you must.";
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Stress and rushing questions make speech worse — calm, one topic at a time helps me stay with you.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — something's wrong with my face and arm — it came on suddenly.";
  }
  return REPLY_VAGUE_FALLBACK;
}

export const geriatricsKeywordHandlers: Record<string, (input: string) => string> = {
  'geriatrics-delirium-uti-margaret-russo': geriatricsDeliriumMargaret,
  'geriatrics-alzheimer-harold-green': geriatricsAlzheimerHarold,
  'geriatrics-orthostatic-falls-richard-bennett': geriatricsOrthostaticRichard,
  'geriatrics-failure-thrive-dorothy-mitchell': geriatricsFailureDorothy,
  'geriatrics-stroke-eleanor-foster': geriatricsStrokeEleanor,
};
