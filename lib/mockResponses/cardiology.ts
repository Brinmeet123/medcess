const REPLY_CLARIFY =
  "I'm not totally sure what you mean — could you ask that a different way? I want to make sure I answer right."

function stemiPressureKeywords(input: string): string {
  const m = input
  if (m.includes('chest') || m.includes('pressure') || m.includes('pain') || m.includes('hurt')) {
    return "It feels like someone is sitting on my chest — heavy pressure right in the middle, maybe an 8 out of 10. It won't let up. Not really sharp, more squeezing."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long') || m.includes('onset')) {
    return "About 45 minutes ago — I was unloading heavy boxes at work. Hit sudden while I was lifting. I had to stop, which never happens to me."
  }
  if (m.includes('radiat') || m.includes('arm') || m.includes('jaw') || m.includes('spread')) {
    return "Yeah, it goes into my left arm and my jaw feels tight too. I didn't know jaw could be involved — that's part of why I got scared and came in."
  }
  if (m.includes('breath') || m.includes('sweat') || m.includes('nausea') || m.includes('weak')) {
    return "I'm sweating through my shirt, a little nauseous, short of breath, and weak. Feels awful — not like anything I've had before."
  }
  if (m.includes('smoke') || m.includes('tobacco')) {
    return "I smoke about a pack a day. Yeah, I know it's bad — my wife nags me. Still do it."
  }
  if (m.includes('blood pressure') || m.includes('hypertension') || m.includes('medical') || m.includes('history')) {
    return "High blood pressure — I take lisinopril when I remember. Dad had a heart attack in his sixties. Otherwise truck driver, no fancy medical history."
  }
  if (m.includes('fever') || m.includes('cough')) {
    return "No fever, no cough. Felt normal this morning until the boxes."
  }
  if (m.includes('worse') || m.includes('better')) {
    return "Nothing helps — sitting still doesn't fix it. Moving makes me more winded I think."
  }
  if (m.includes('anxious') || m.includes('panic') || m.includes('stress')) {
    return "I'm scared, sure — but this isn't just nerves. My chest is crushing me and my arm feels wrong."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — my chest feels like somebody's sitting on it. Started less than an hour ago at work."
  }
  return REPLY_CLARIFY
}

function afibRvrKeywords(input: string): string {
  const m = input
  if (m.includes('heart') || m.includes('palpitat') || m.includes('flutter') || m.includes('racing')) {
    return "My heart started fluttering and racing four hours ago — feels irregular, like skipped beats then pounding. I can feel it in my throat."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Sudden — four hours ago while reading at home. Calm setting, not exercising. Hasn't stopped since."
  }
  if (m.includes('chest') && m.includes('pain')) {
    return "No real chest pain — anxious tightness maybe, not the crushing pain they warn about."
  }
  if (m.includes('breath') || m.includes('dizz') || m.includes('lighthead') || m.includes('faint')) {
    return "A little short of breath walking, and lightheaded when I stand fast. Haven't passed out."
  }
  if (m.includes('irregular') || m.includes('rhythm') || m.includes('pulse')) {
    return "Totally irregular — I tried counting my pulse and gave up. Nurse said it's fast and irregular on the monitor too."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('amlodipine')) {
    return "Amlodipine for blood pressure. No blood thinners, never had rhythm problems before."
  }
  if (m.includes('thyroid') || m.includes('weight') || m.includes('heat')) {
    return "No known thyroid issues — weight loss is diet on purpose. Hands don't shake."
  }
  if (m.includes('fever') || m.includes('sick')) {
    return "Not sick — no fever."
  }
  if (m.includes('anxious') || m.includes('panic')) {
    return "I'm anxious because my heart won't slow down — but the fluttering feels physical, not just worry."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my heart's been racing and fluttering for hours and I'm frightened."
  }
  return REPLY_CLARIFY
}

function chfExacerbationKeywords(input: string): string {
  const m = input
  if (m.includes('breath') || m.includes('breathing') || m.includes('stair') || m.includes('walk')) {
    return "I get winded doing almost anything — stairs, mailbox, showering. Used to handle it fine, last few weeks it's been brutal."
  }
  if (m.includes('swell') || m.includes('leg') || m.includes('ankle') || m.includes('edema')) {
    return "Legs swollen to the shins — socks dig in, dents when I press. Worse every evening."
  }
  if (m.includes('pillow') || m.includes('flat') || m.includes('sleep') || m.includes('night')) {
    return "Sleep on three pillows — flat feels like drowning. Woke up gasping twice this week, had to sit on the bed edge."
  }
  if (/\bwhen\b/.test(m) || m.includes('long') || m.includes('progress')) {
    return "Worsening over weeks, not one day. Slow decline — kept thinking I'd bounce back."
  }
  if (m.includes('chest') && m.includes('pain')) {
    return "No chest pain — just can't breathe right and I'm exhausted."
  }
  if (m.includes('fever') || m.includes('cough') || m.includes('pneumonia')) {
    return "No fever. Cough only when I wake up gasping, not green phlegm."
  }
  if (m.includes('weight') || m.includes('gain')) {
    return "Gained about 8 pounds in two weeks — pants tight, think it's fluid."
  }
  if (m.includes('heart') || m.includes('history') || m.includes('medical')) {
    return "Told years ago my heart was weak — didn't follow up. High blood pressure. On lisinopril and a water pill I sometimes skip."
  }
  if (m.includes('smoke')) {
    return "Quit five years ago — smoked heavy before that."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I'm short of breath with swollen legs and I can't sleep flat anymore."
  }
  return REPLY_CLARIFY
}

function hcmSyncopeKeywords(input: string): string {
  const m = input
  if (m.includes('pass') || m.includes('black') || m.includes('faint') || m.includes('collapse') || m.includes('syncope')) {
    return "I blacked out during basketball sprints yesterday — down less than a minute. Don't remember hitting the floor. Coach and teammates freaked out."
  }
  if (m.includes('exercise') || m.includes('practice') || m.includes('basketball') || m.includes('sprint')) {
    return "Full-intensity practice — wind sprints after warm-up. Not standing around dehydrated — actually running hard."
  }
  if (m.includes('dizz') || m.includes('before') || m.includes('prior')) {
    return "Felt dizzy right before — vision dark at edges — then I was on the ground hearing people yell my name."
  }
  if (m.includes('seizure') || m.includes('shake') || m.includes('convuls')) {
    return "No shaking — coach said it wasn't like a seizure. Didn't bite tongue, wasn't incontinent."
  }
  if (m.includes('chest') || m.includes('tight')) {
    return "Sometimes chest gets tight when I push hard in games — thought I was out of shape. Might be related, I don't know."
  }
  if (m.includes('family') || m.includes('uncle') || m.includes('sudden') || m.includes('death')) {
    return "My uncle on my dad's side died suddenly at 28 — heart, they said. Parents are terrified this is connected."
  }
  if (m.includes('dehydr') || m.includes('heat') || m.includes('water')) {
    return "Drank water at practice — indoor gym, not crazy hot. Don't think it was heat."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "No medications — healthy otherwise."
  }
  if (m.includes('play') || m.includes('sport') || m.includes('athlete')) {
    return "Varsity basketball is everything to me — I need to know if I can play. Scared and embarrassed."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I passed out at practice yesterday and I'm here to figure out why."
  }
  return REPLY_CLARIFY
}

function pericarditisKeywords(input: string): string {
  const m = input
  if (m.includes('position') || m.includes('flat') || m.includes('lean') || m.includes('forward') || m.includes('lie')) {
    return "Pain changes with position — awful lying flat in bed, better sitting up and leaning forward over a desk. That's the weirdest part."
  }
  if (m.includes('chest') || m.includes('pain') || m.includes('sharp')) {
    return "Sharp stabbing chest pain two days — worse deep breaths. Not exertional; I walked to clinic fine."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Started two days ago, day after my cold improved. Sudden for this type of pain, not gradual weeks."
  }
  if (m.includes('cold') || m.includes('viral') || m.includes('ill') || m.includes('flu')) {
    return "Had a cold last week — runny nose, sore throat, fatigue. Mostly better then this chest thing started."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Low fever around 100 yesterday. Chills a bit. Feeling slightly better today except chest."
  }
  if (m.includes('breath') || m.includes('breathing')) {
    return "Deep breaths hurt — I breathe shallow. Not truly winded sitting still though."
  }
  if (m.includes('exercise') || m.includes('run') || m.includes('stair')) {
    return "Not from running — stairs and walking okay. It's lying flat that kills me."
  }
  if (m.includes('heart attack') || m.includes('radiat') || m.includes('arm') || m.includes('sweat')) {
    return "No sweating like a heart attack story, no arm going numb. I'm young and this started after a cold."
  }
  if (m.includes('med') || m.includes('ibuprofen')) {
    return "Ibuprofen from the store helps a little. No prescriptions."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my chest hurts and it gets worse when I lie flat, better when I lean forward."
  }
  return REPLY_CLARIFY
}

export const cardiologyKeywordHandlers: Record<string, (input: string) => string> = {
  'stemi-pressure-wont-go-away': stemiPressureKeywords,
  'afib-rapid-ventricular-response': afibRvrKeywords,
  'chf-exacerbation-stairs': chfExacerbationKeywords,
  'hypertrophic-cardiomyopathy-syncope': hcmSyncopeKeywords,
  'acute-pericarditis-positional': pericarditisKeywords,
}
