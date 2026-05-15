const REPLY =
  "I'm not sure I understood — could you ask that a different way? I want to answer what you mean."

function strokeFaceStrangeKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my face went slack on one side and my words aren't coming out right. My right arm feels heavy, too. My wife noticed before I did, and we came straight in."
  }
  if (m.includes('face') || m.includes('drool') || m.includes('drooping')) {
    return "The right side of my face feels stiff and heavy — like I'm trying to smile but only half of me listens. My wife says it looks droopy. It's pretty scary."
  }
  if (m.includes('weak') || m.includes('arm') || m.includes('drift')) {
    return "My right arm is weak — if I try to hold both arms up, that side drifts down. It started at the same time as my face feeling wrong."
  }
  if (m.includes('speech') || m.includes('talk') || m.includes('slur') || m.includes('word')) {
    return "I'm slurring — I can think the words, but they come out thick. My wife keeps finishing my sentences, which annoys me even though she's trying to help."
  }
  if (m.includes('when') || m.includes('start') || m.includes('onset') || m.includes('time')) {
    return "It hit suddenly — maybe 45 to 50 minutes ago at breakfast. Not something that built up over days. No fall and no seizure shaking that I remember."
  }
  if (m.includes('vision') || m.includes('see') || m.includes('eye')) {
    return "My vision doesn't feel like a curtain went over one eye — it's more my face and arm and talking that are wrong. I could read the clock okay when I tried."
  }
  if (m.includes('numb') || m.includes('tingle')) {
    return "Half my face feels numb-cotton weird, and my right hand has a little tingling. It's not classic asleep pins-and-needles like leaning on an elbow."
  }
  if (m.includes('dizzy') || m.includes('vertigo')) {
    return "A little swimmy if I stand fast, but it's not the main thing — the face weakness and slurred speech are what terrify me."
  }
  if (m.includes('seizure') || m.includes('shake') || m.includes('convulsion')) {
    return "No shaking episode — I didn't pass out. I was scared and alert the whole time, which almost makes it worse because I can feel everything not working right."
  }
  if (m.includes('fever') || m.includes('infection')) {
    return "I don't feel sick with a fever — no bad stiff neck either. This feels more like a nerve thing, but I'm not the doctor."
  }
  if (m.includes('blood pressure') || m.includes('bp') || m.includes('diabetes') || m.includes('sugar')) {
    return "I've got high blood pressure and diabetes — I'm bad about taking my pills consistently. I know that's not great. They checked my sugar here quickly."
  }
  if (m.includes('trauma') || m.includes('fall') || m.includes('hit')) {
    return "No head injury — I didn't fall. I was just sitting at the table when this started."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('pill') || m.includes('blood thinner')) {
    return "I'm on a blood pressure medicine and metformin sometimes. I don't take aspirin every day because it bothers my stomach."
  }
  if (m.includes('family') || m.includes('history') || m.includes('stroke')) {
    return "My mom had a stroke later in life. My sister gets bad headaches, but nothing like this sudden face thing."
  }
  if (m.includes('walk') || m.includes('balance') || m.includes('gait') || m.includes('leg')) {
    return "Walking feels a little off, but the right arm is what's obvious. I'm clutching the rail in the hallway more than usual."
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Nothing makes it clearly better — talking louder makes it worse because I get frustrated. Sitting still is slightly less miserable than rushing around."
  }
  return REPLY
}

function migraineTerribleKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I get these brutal headaches a few times a month and they wipe me out. I get weird vision stuff before the pain hits."
  }
  if (m.includes('vision') || m.includes('aura') || m.includes('light') || m.includes('zigzag') || m.includes('blind')) {
    return "Before the headache I get shimmering zigzags and a blind spot that expands over maybe ten minutes — like broken glass in my vision. Then the pain comes in like a hammer."
  }
  if (m.includes('headache') || m.includes('pain') || m.includes('throb')) {
    return "It's usually one-sided pounding — sound and light make it unbearable. Sometimes I vomit. It can last most of the day if I can't sleep it off."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw')) {
    return "Yeah, nausea is part of it — I've thrown up during bad ones. Even water feels like too much when it's peak."
  }
  if (m.includes('sound') || m.includes('light') || m.includes('photophobia') || m.includes('phonophobia')) {
    return "Bright screens and even normal office lights feel like assault. My roommate typing sounds unbearable — I hide in a dark room with sunglasses on indoors like a drama queen."
  }
  if (m.includes('weak') || m.includes('stroke')) {
    return "Between attacks I'm normal strength — no persistent arm weakness. That's what freaked me reading online, but this pattern repeats the same way each time."
  }
  if (m.includes('when') || m.includes('how long') || m.includes('frequency')) {
    return "About two years of this cadence — some months worse around deadlines. The visual prodrome is pretty stereotyped now, which is oddly reassuring and awful at once."
  }
  if (m.includes('fever')) {
    return "No fever with these episodes — if I had fever and a stiff neck I'd be more panicked about infection."
  }
  if (m.includes('dizzy')) {
    return "I can feel woozy with the nausea, but it's tied to the headache — not constant spinning vertigo all week."
  }
  if (m.includes('seizure')) {
    return "I've never had a convulsion — I stay conscious through the aura weirdness, even though it's scary."
  }
  if (m.includes('family') || m.includes('history')) {
    return "My mom had 'sick headaches' when she was younger but never saw a neurologist — different generation. My dad doesn't get them."
  }
  if (m.includes('med') || m.includes('triptan') || m.includes('ibuprofen')) {
    return "Ibuprofen helps mild ones sometimes. I have a triptan for bad attacks — it works maybe half the time if I catch it early enough."
  }
  if (m.includes('worse') || m.includes('trigger') || m.includes('stress')) {
    return "Stress, dehydration, bad sleep, and fluorescent lights are my trifecta. Caffeine is weird — tiny bit during the aura sometimes helps, other times makes me jittery."
  }
  if (m.includes('help') || m.includes('relief')) {
    return "Dark quiet room, cold washcloth, sleep eventually. I cancel everything — which my advisor loves, obviously sarcasm."
  }
  if (m.includes('speech') || m.includes('talk')) {
    return "Mid-headache I can get mushy words — before the headache my speech is fine, which matters for scary internet self-diagnosis."
  }
  if (m.includes('numb')) {
    return "Occasionally my lips feel tingly during attacks — not the same as a stroke face droop story I saw on TV."
  }
  if (m.includes('balance') || m.includes('walk')) {
    return "If the pain is severe I walk carefully — not true coordination loss between episodes though."
  }
  return REPLY
}

function parkinsonHandsKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — my hands shake worse when I'm resting, and I've been slower getting dressed. My wife says my face doesn't show expression like it used to."
  }
  if (m.includes('tremor') || m.includes('shake')) {
    return "Right hand rolls in my lap watching TV — classic pill-rolling maybe. Eating soup isn't as shaky as doing nothing with the hand, which confused me at first."
  }
  if (m.includes('slow') || m.includes('brady') || m.includes('button')) {
    return "Fine movements are brutal — buttons take forever. Cutting food feels like engineering project I used to laugh at younger guys for struggling with."
  }
  if (m.includes('face') || m.includes('expression') || m.includes('mask')) {
    return "She says I look serious when I'm not — less smiling blink. I didn't notice until she showed me a photo side-by-side."
  }
  if (m.includes('walk') || m.includes('gait') || m.includes('step') || m.includes('balance')) {
    return "Steps smaller — turning in hallway I brush the wall sometimes. I don't fall yet touch wood — superstitious engineer nonsense."
  }
  if (m.includes('stiff') || m.includes('rigidity') || m.includes('cogwheel')) {
    return "Arm feels stiff when someone moves it — not painful like arthritis, more like resistance catching gears."
  }
  if (m.includes('when') || m.includes('onset')) {
    return "Gradual over about a year — not overnight stroke. Slow enough I rationalized until embarrassingly late."
  }
  if (m.includes('family') || m.includes('tremor history')) {
    return "Dad had a hand tremor that alcohol helped socially — mine is different worse at rest than when I'm using tools."
  }
  if (m.includes('med') || m.includes('drug') || m.includes('reglan') || m.includes('haloperidol')) {
    return "I took nausea medicine on a cruise years ago — not recently. Otherwise statins and BP stuff."
  }
  if (m.includes('headache')) {
    return "Headaches aren't my main complaint — it's the movement stuff."
  }
  if (m.includes('weak')) {
    return "I wouldn't call it numb stroke weakness — more slow and clumsy precision loss."
  }
  if (m.includes('vision')) {
    return "Reading is fine with glasses updated — no double vision problem."
  }
  if (m.includes('seizure')) {
    return "Never had a seizure — conscious through tremor annoyance."
  }
  if (m.includes('dizzy')) {
    return "Standing fast sometimes woozy — age or BP fluctuation maybe."
  }
  if (m.includes('fever')) {
    return "No fever illness tied to this."
  }
  if (m.includes('speech')) {
    return "Voice softer — wife leans in. Not slurred acute stroke though."
  }
  if (m.includes('help') || m.includes('alcohol')) {
    return "Doing a task briefly steadies the hand a notch — and yeah, a drink at wedding calmed tremor embarrassingly well — not prescribing that lifestyle."
  }
  if (m.includes('smell')) {
    return "Coffee smell weaker maybe — hadn't catalogued until daughter asked weird question."
  }
  return REPLY
}

function seizureSchoolKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I had some kind of episode at school. I don't remember the middle well — people said I was shaking."
  }
  if (m.includes('seizure') || m.includes('shake') || m.includes('convulsion') || m.includes('jerking')) {
    return "Teachers said both arms and legs jerked for a couple minutes — sounds mortifying honestly. I woke up on the gym floor with people around me."
  }
  if (m.includes('tongue') || m.includes('bite') || m.includes('mouth')) {
    return "I bit the side of my tongue — bloody taste after. Nurse cleaned it up — still sore talking."
  }
  if (m.includes('before') || m.includes('aura') || m.includes('warning')) {
    return "Standing in assembly vision tunneled black edges — thought standing locked-knee faint — then blank."
  }
  if (m.includes('after') || m.includes('post') || m.includes('confusion') || m.includes('wake')) {
    return "Foggy maybe an hour — slow names stupid embarrassingly. Better now but wiped out."
  }
  if (m.includes('loss') || m.includes('conscious') || m.includes('pass out')) {
    return "Definitely out middle portion — witnesses describe full story I hate hearing secondhand."
  }
  if (m.includes('fever')) {
    return "Not sick fever — no meningitis stiff neck cartoon."
  }
  if (m.includes('headache')) {
    return "Headache after — slept afternoon home."
  }
  if (m.includes('weak')) {
    return "Jelly legs rest of day — not paralysis fear stroke uncle had."
  }
  if (m.includes('family') || m.includes('epilepsy')) {
    return "Uncle epilepsy pills — parents spiral guilt genetic maybe unfair."
  }
  if (m.includes('drug') || m.includes('alcohol') || m.includes('weed')) {
    return "No party drugs night before — debate nerds reputation matters laugh weak."
  }
  if (m.includes('when') || m.includes('first') || m.includes('prior')) {
    return "Never happened before sixteen — virgin seizure terrifying phrase heard today."
  }
  if (m.includes('weak') && m.includes('one side')) {
    return "Not one-sided weakness afterward on exam — foggy symmetric tired."
  }
  if (m.includes('dizzy') || m.includes('faint') || m.includes('syncope')) {
    return "Thought faint first — prolonged shaking and tongue bite sounds seizure more than simple vasovagal friends get choir."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Just acne cream basically — no ADHD stimulants."
  }
  if (m.includes('vision')) {
    return "Tunnel before drop — scary visual blackout precursor."
  }
  if (m.includes('balance') || m.includes('walk')) {
    return "Unsteady walking leaving — brother arm joking stability."
  }
  if (m.includes('help')) {
    return "Sleep and electrolyte drink helped fog subjective."
  }
  return REPLY
}

function msRelapsingKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my symptoms come in episodes. One eye went weird for a while, and another time my leg felt weak and numb. I'm scared there's something autoimmune like my aunt."
  }
  if (m.includes('vision') || m.includes('eye') || m.includes('color') || m.includes('blur')) {
    return "Winter my left eye colors washed out — fine detail dull — like cheap Instagram filter. Moving eye side to side hurt. Slowly got better over weeks not minutes."
  }
  if (m.includes('weak') || m.includes('leg') || m.includes('walk')) {
    return "Spring right leg dragged stairs — hip flexion weak, numb band below knee. Improved partially then tingling visits again fatigue dependent cruel."
  }
  if (m.includes('numb') || m.includes('tingle') || m.includes('sensory')) {
    return "Pins-and-vibration patches migrating — not classic diabetic stocking symmetric story — side-ish."
  }
  if (m.includes('when') || m.includes('course') || m.includes('relaps')) {
    return "Months now remitting relapsing — partial recovery teasers — not one-and-done stroke day."
  }
  if (m.includes('heat') || m.includes('shower') || m.includes('uhthoff')) {
    return "Hot shower sometimes triggers blur — thought dehydration drama — pattern suspicious."
  }
  if (m.includes('fatigue')) {
    return "Dead afternoon screens — coffee rescue partial — productivity shame designer deadlines."
  }
  if (m.includes('family') || m.includes('lupus')) {
    return "Aunt lupus diagnosed scary — rash arthritis — my presentation different vision leg roulette anxiety."
  }
  if (m.includes('headache')) {
    return "Mild ache behind eye episode — not primary complaint usually."
  }
  if (m.includes('dizzy')) {
    return "Off-balance flare not spinning chronic inner ear."
  }
  if (m.includes('seizure')) {
    return "Never convulsion gratitude small win."
  }
  if (m.includes('speech') || m.includes('cognitive') || m.includes('fog')) {
    return "Word-finding fog fatigue afternoon — not stroke slurred emergency."
  }
  if (m.includes('bladder') || m.includes('bowel')) {
    return "Urgency scare once — thought spinal emergency movie drama."
  }
  if (m.includes('fever')) {
    return "No systemic fever pattern infection."
  }
  if (m.includes('med') || m.includes('birth control')) {
    return "On hormonal birth control years — neurologist curiosity once — shrugged maybe relevance unknown layperson."
  }
  if (m.includes('balance') || m.includes('gait')) {
    return "Tandem walk failed shame clipboard hospital hallway — objective imbalance not dramatic wheelchair."
  }
  if (m.includes('help') || m.includes('steroid')) {
    return "Rest helps — past eye flare improved faster prednisone borrowed relative inappropriate confession sorry ethics."
  }
  if (m.includes('worse') || m.includes('stress')) {
    return "Deadline heat subway vibration commuter hell stack triggers guesswork."
  }
  if (m.includes('stroke')) {
    return "Stroke fear rational minutes symptoms — months relapsing argues different statistically lay gut."
  }
  return REPLY
}

export const neurologyKeywordHandlers: Record<string, (input: string) => string> = {
  'acute-stroke-face-feels-strange': strokeFaceStrangeKeywords,
  'migraine-terrible-headaches-samantha': migraineTerribleKeywords,
  'parkinson-hands-shaking-harold': parkinsonHandsKeywords,
  'seizure-at-school-noah': seizureSchoolKeywords,
  'ms-vision-legs-relapsing-rachel': msRelapsingKeywords,
}
