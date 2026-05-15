const REPLY_CLARIFY =
  "I'm not totally sure what you're asking — could you say it another way? I want to answer what you need."

function opioidRespiratoryDepressionKeywords(input: string): string {
  const m = input
  if (m.includes('breath') || m.includes('breathing') || m.includes('air') || m.includes('oxygen')) {
    return "It's hard to breathe… like I can't take a deep breath without working at it. I feel sleepy at the same time, which is scary. The nurse said my oxygen wasn't great on the monitor — I didn't feel that until she told me."
  }
  if (m.includes('sleep') || m.includes('drows') || m.includes('tired') || m.includes('awake')) {
    return "I'm so tired I keep nodding off — my wife says I fall asleep while she's asking me questions. I can open my eyes if you shake me, but I want to close them again right away."
  }
  if (m.includes('surgery') || m.includes('knee') || m.includes('operation')) {
    return "Knee replacement about two hours ago — went fine they said. I'm in the recovery room. The pain was bad earlier but they gave me medicine in the IV and after that everything got heavy and slow."
  }
  if (m.includes('pain') || m.includes('med') || m.includes('opioid') || m.includes('morphine') || m.includes('dilaudid')) {
    return "They gave me strong pain medicine in recovery — I don't remember the name. It helped my knee then I got unbelievably sleepy. I haven't taken anything else today."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "The sleepiness got worse over the last hour or so since the pain med. Breathing trouble noticed when my wife said I was breathing slow — maybe the last thirty minutes."
  }
  if (m.includes('chest') || m.includes('heart')) {
    return "No chest pain — nothing crushing or radiating. It's not my heart I'm worried about, it's that I can't stay awake and breathing feels shallow."
  }
  if (m.includes('fever') || m.includes('cough') || m.includes('pneumonia') || m.includes('infection')) {
    return "No fever, no cough really. I don't feel sick like pneumonia — just drugged and slow. Lungs felt clear when they listened, I think."
  }
  if (m.includes('family') || m.includes('wife')) {
    return "My wife is right here — she's freaked out because I keep passing out mid-sentence. She told the nurse my breathing looked shallow too."
  }
  if (m.includes('lung') || m.includes('copd') || m.includes('asthma') || m.includes('smoke')) {
    return "Never had lung disease — quit smoking years ago. Always healthy lungs before today."
  }
  if (m.includes('allerg')) {
    return "No drug allergies I know of."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi… sorry, I'm really sleepy. Knee surgery today and I can barely keep my eyes open — breathing feels hard too."
  }
  return REPLY_CLARIFY
}

function spinalHypotensionKeywords(input: string): string {
  const m = input
  if (m.includes('dizz') || m.includes('faint') || m.includes('lighthead') || m.includes('weak')) {
    return "I feel dizzy and weak — like I might black out. When they raise the bed even a little the room spins. I have to lie flat to feel halfway okay."
  }
  if (m.includes('spinal') || m.includes('epidural') || m.includes('block') || m.includes('back needle')) {
    return "They did a spinal in my back for the hip surgery — numbed me from the waist down. First time I've had that kind of anesthesia. Nobody warned me I'd feel this washed out afterward."
  }
  if (m.includes('surgery') || m.includes('hip')) {
    return "Left hip replacement today. Surgery went okay — it's recovery where I feel awful, dizzy and nauseous."
  }
  if (m.includes('chest') || m.includes('breath') || m.includes('breathing')) {
    return "No chest pain and I can breathe fine. It's not my lungs — it's blood pressure or something, I feel empty."
  }
  if (m.includes('bleed') || m.includes('blood')) {
    return "Dressing is clean — nobody said I'm bleeding internally. I'm pale and weak but I haven't seen blood anywhere."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "Pretty nauseous, especially when they tried to sit me up. They gave something in the IV for nausea — helped a little."
  }
  if (m.includes('fluid') || m.includes('iv') || m.includes('dehydr')) {
    return "They're running IV fluids — nurse said my pressure was low. I haven't eaten since last night before surgery."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Lisinopril at home — held this morning. Just recovery meds and fluids now."
  }
  if (m.includes('worse') || m.includes('sit') || m.includes('stand') || m.includes('position')) {
    return "Worse every time the head of the bed goes up — vision tunnels. Flat is better but still weak."
  }
  if (m.includes('allerg')) {
    return "No allergies."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I'm dizzy after hip surgery. They numbed my spine and I feel like I might faint."
  }
  return REPLY_CLARIFY
}

function malignantHyperthermiaKeywords(input: string): string {
  const m = input
  if (m.includes('temp') || m.includes('fever') || m.includes('hot')) {
    return "Core temp is 104°F on the esophageal probe and still climbing — we started external cooling. This happened fast, not gradual warming."
  }
  if (m.includes('co2') || m.includes('capno') || m.includes('ventilat') || m.includes('breath')) {
    return "End-tidal CO2 is through the roof — over 60 and rising despite increasing minute ventilation. Peak pressures are up too. ABG would show respiratory acidosis."
  }
  if (m.includes('rigid') || m.includes('stiff') || m.includes('muscle')) {
    return "He's rigid everywhere — masseter was tight at induction but now limbs are board-like. Passive movement is really difficult. Not normal relaxation under anesthesia."
  }
  if (m.includes('heart') || m.includes('tachycard') || m.includes('rate')) {
    return "Heart rate shot to 150 — sinus tach on the monitor. Blood pressure is labile, not a clean hypotensive picture."
  }
  if (m.includes('anesthetic') || m.includes('gas') || m.includes('sevo') || m.includes('succinyl')) {
    return "Maintenance on sevoflurane, succinylcholine at induction for intubation. Healthy 18-year-old, shoulder scope. No family MH history available."
  }
  if (m.includes('lab') || m.includes('potassium') || m.includes('ck') || m.includes('k ')) {
    return "Stat labs sent — anesthesia worried about potassium and CK. Urine in the Foley is dark, could be myoglobin. MH cart is being brought in."
  }
  if (m.includes('infection') || m.includes('sepsis')) {
    return "He was afebrile pre-op, normal WBC this morning. This started acutely on the table — doesn't smell like sepsis timing."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('sudden')) {
    return "Started maybe ten minutes ago — was stable first hour of the case. Very sudden onset."
  }
  if (m.includes('patient') || m.includes('tyler') || m.includes('who')) {
    return "Tyler Reed, 18, elective shoulder surgery. First time we've seen him — no prior anesthetic records here."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "This is the OR nurse — we have an intraoperative emergency. Temp and CO2 are skyrocketing and the patient is rigid."
  }
  return REPLY_CLARIFY
}

function emergenceDeliriumKeywords(input: string): string {
  const m = input
  if (m.includes('confus') || m.includes('agitat') || m.includes('behavior') || m.includes('acting')) {
    return "She woke up screaming and didn't know where she was — didn't recognize me for a minute. Pulling at the IV, crying for home. Starting to calm if I hold her hand."
  }
  if (m.includes('surgery') || m.includes('tonsil') || m.includes('adenoid')) {
    return "Tonsillectomy today for sleep apnea snoring — general anesthesia. Surgery part went fine according to the surgeon."
  }
  if (/\bwhen\b/.test(m) || m.includes('wake') || m.includes('start')) {
    return "The second she woke in PACU — maybe thirty minutes ago. Was fine going to sleep for surgery. Only after anesthesia."
  }
  if (m.includes('fever') || m.includes('seizure') || m.includes('shake')) {
    return "No fever. Never had a seizure before — this is flailing and crying, not rhythmic shaking with postictal sleep."
  }
  if (m.includes('neuro') || m.includes('weak') || m.includes('stroke') || m.includes('move')) {
    return "She moves all four limbs, talks in sentences between sobs. Nurse said pupils equal. No one-sided weakness."
  }
  if (m.includes('pain') || m.includes('throat')) {
    return "She says her throat hurts but she's more scared than focused on pain. Some blood-tinged spit they said is normal."
  }
  if (m.includes('med') || m.includes('anesthesia')) {
    return "Just anesthesia and a little pain medicine in recovery — seemed to upset her more briefly. No new antibiotics."
  }
  if (m.includes('before') || m.includes('prior') || m.includes('previous anesthesia')) {
    return "Ear tubes at age three — no wild wake-up then. First time we've seen this agitation."
  }
  if (m.includes('better') || m.includes('improv') || m.includes('calm')) {
    return "Slightly calmer last few minutes with soft voice and mom at bedside — still not fully oriented."
  }
  if (m.includes('feel') && (m.includes('you') || m.includes('emily'))) {
    return "Mommy? Where am I? I want to go home… my throat hurts…"
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi, I'm Emily's mom — she woke up from tonsil surgery completely confused and terrified."
  }
  return REPLY_CLARIFY
}

function postIntubationAirwayKeywords(input: string): string {
  const m = input
  if (m.includes('throat') || m.includes('sore') || m.includes('hurt')) {
    return "My throat feels raw — like sandpaper every time I swallow. Started right when I woke up from anesthesia yesterday. Talking a lot for work makes it worse."
  }
  if (m.includes('cough')) {
    return "Dry cough I can't stop — tickle triggers it every few minutes. Nothing coming up, no blood. Coughing makes the soreness spike."
  }
  if (m.includes('hoarse') || m.includes('voice') || m.includes('raspy')) {
    return "Voice is hoarse — coworkers noticed on a video call. I sound like I have laryngitis but I wasn't sick before surgery."
  }
  if (m.includes('surgery') || m.includes('intub') || m.includes('tube') || m.includes('anesthesia')) {
    return "Laparoscopic gallbladder yesterday — general anesthesia with a breathing tube. Surgeon said throat irritation is common. Surgery itself was smooth."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Right after waking in recovery yesterday — still hoarse this morning, day one post-op."
  }
  if (m.includes('breath') || m.includes('stridor') || m.includes('wheez')) {
    return "No trouble breathing — no wheeze or scary tightness. Walked stairs fine. Just throat and cough annoying me."
  }
  if (m.includes('fever') || m.includes('strep') || m.includes('infection')) {
    return "No fever at home. Throat looks red in the mirror but no white patches. Doesn't feel like strep — more irritated from the tube."
  }
  if (m.includes('chest')) {
    return "No chest pain — lungs feel fine."
  }
  if (m.includes('better') || m.includes('worse') || m.includes('help')) {
    return "Warm tea and lozenges help a bit. Morning is worst. Talking a lot makes it worse."
  }
  if (m.includes('med') || m.includes('ibuprofen')) {
    return "Ibuprofen takes the edge off. No antibiotics."
  }
  if (m.includes('allerg')) {
    return "No drug allergies."
  }
  if (m.includes('before') || m.includes('colonoscopy') || m.includes('prior anesthesia')) {
    return "Colonoscopy years ago — mild sore throat one day. This time it's hanging on longer."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — throat's been killing me since surgery yesterday. Hoarse and coughing but I can breathe okay."
  }
  return REPLY_CLARIFY
}

export const anesthesiologyKeywordHandlers: Record<string, (input: string) => string> = {
  'opioid-respiratory-depression': opioidRespiratoryDepressionKeywords,
  'spinal-anesthesia-hypotension': spinalHypotensionKeywords,
  'malignant-hyperthermia': malignantHyperthermiaKeywords,
  'emergence-delirium': emergenceDeliriumKeywords,
  'post-intubation-airway-irritation': postIntubationAirwayKeywords,
}
