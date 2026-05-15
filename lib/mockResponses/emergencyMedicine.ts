const REPLY_CLARIFY =
  "I'm not totally sure what you're asking — could you say it another way? I want to answer what you mean."

function sahKeywords(input: string): string {
  const m = input
  if (m.includes('headache') || m.includes('head') || m.includes('pain')) {
    return "It hit like an explosion — worst pain of my life, ten out of ten. All over my head, not just one side. Started the second I lifted grocery bags about thirty minutes ago."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('onset') || m.includes('sudden')) {
    return "Instant — no warning. One moment fine, next moment maximal pain. That's what terrified me. Maybe thirty minutes ago."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw')) {
    return "Yes — threw up once in the waiting room. Nausea won't quit. Haven't eaten since breakfast."
  }
  if (m.includes('neck') || m.includes('stiff') || m.includes('light') || m.includes('photo')) {
    return "Neck feels stiff and the ER lights are brutal — I keep squinting. My husband noticed I couldn't look down well in the car."
  }
  if (m.includes('weak') || m.includes('numb') || m.includes('vision') || m.includes('speech')) {
    return "Arms and legs feel normal — I walked in. Vision's blurry from tears and pain but no sudden blindness. Speech is okay, just slow because it hurts."
  }
  if (m.includes('before') || m.includes('similar') || m.includes('migraine') || m.includes('prior')) {
    return "I get mild tension headaches from screens — nothing like this. Never hospitalized for headache before."
  }
  if (m.includes('trauma') || m.includes('fall') || m.includes('injury')) {
    return "No fall — just awkward lift with heavy bags. No head strike that I know of."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Feel warm and clammy — not sure it's a real fever. More pain than flu."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('drug')) {
    return "Lisinopril for BP, vitamin D. Ibuprofen at home did nothing. No blood thinners."
  }
  if (m.includes('family')) {
    return "Mom had migraines. Dad had a stroke in his seventies. No known brain aneurysm in family."
  }
  if (m.includes('worse') || m.includes('better')) {
    return "Dark and still helps a little. Light, movement, bending — awful."
  }
  if (m.includes('breath')) {
    return "Breathing's fine — I'm panting from pain and fear, not lung trouble."
  }
  if (m.includes('travel')) {
    return "No recent trips — home all weekend."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my head suddenly exploded with pain half an hour ago and I can't stand the lights."
  }
  return REPLY_CLARIFY
}

function peEmKeywords(input: string): string {
  const m = input
  if (m.includes('breath') || m.includes('short') || m.includes('dyspnea') || m.includes('sob')) {
    return "I suddenly can't get a full breath — started two hours ago at my desk. Oxygen on my finger was low. Sitting up helps a bit; lying flat feels worse."
  }
  if (m.includes('chest') || m.includes('pain') || m.includes('pleur')) {
    return "Sharp pain on the right when I breathe deep — like a knife with each inhale. Not burning reflux."
  }
  if (m.includes('travel') || m.includes('flight') || m.includes('fly') || m.includes('plane')) {
    return "Eight-hour flight from Denver yesterday — slept cramped in coach. Landed last night, back at work today."
  }
  if (m.includes('pill') || m.includes('birth') || m.includes('contraceptive')) {
    return "On combined oral contraceptives for years. No smoking. Didn't connect desk job to clots until now."
  }
  if (m.includes('leg') || m.includes('calf') || m.includes('swell')) {
    return "Right calf tender this morning — not huge swelling, just sore when I pressed. Wore heels yesterday maybe."
  }
  if (m.includes('fever') || m.includes('cough') || m.includes('sick')) {
    return "No fever, no cough, no phlegm — lungs sound clear but I still feel air hungry."
  }
  if (m.includes('panic') || m.includes('anxiety') || m.includes('stress')) {
    return "I'm scared, yeah — but this hit while I was working, not during a panic attack. Feels physical."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Birth control pills, occasional ibuprofen. No blood thinners, no recent surgery."
  }
  if (m.includes('family') || m.includes('clot')) {
    return "Sister had a clot after pregnancy. Otherwise cholesterol in mom, that's it."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('onset')) {
    return "Two hours ago, sudden at my computer. Constant since — not wheezing attacks."
  }
  if (m.includes('worse') || m.includes('better')) {
    return "Deep breaths and walking worsen it. Shallow breaths slightly less awful."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "A little queasy from air hunger — haven't vomited."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I can't catch my breath and my chest hurts when I inhale after a long flight."
  }
  return REPLY_CLARIFY
}

function dkaKeywords(input: string): string {
  const m = input
  if (m.includes('diabetes') || m.includes('insulin') || m.includes('sugar') || m.includes('type')) {
    return "Type 1 since childhood — usually on a pump. Stopped insulin when I couldn't eat with a stomach bug. Dumb move, I know now."
  }
  if (m.includes('vomit') || m.includes('nausea') || m.includes('throw')) {
    return "Vomiting every few hours — can't keep much down. Nausea constant since the bug started."
  }
  if (m.includes('breath') || m.includes('breathing')) {
    return "Breathing fast and deep even lying down — roommate said it looked like I ran a mile. Feels like I can't get enough air."
  }
  if (m.includes('thirst') || m.includes('urinat') || m.includes('pee') || m.includes('drink')) {
    return "Insanely thirsty and peeing constantly even though I'm dehydrated — that's what made me come in."
  }
  if (m.includes('abdom') || m.includes('belly') || m.includes('stomach')) {
    return "Crampy belly pain all over — maybe 5/10, worse after vomiting. Not one sharp point."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Normally insulin pump — haven't taken basal since yesterday. No other meds."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "GI bug two days, vomiting worse today, weird breathing started hours ago. Insulin stopped yesterday."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Maybe low-grade with the virus — felt warm at dorm."
  }
  if (m.includes('alcohol') || m.includes('drug')) {
    return "No drinking or drugs — college kid with a stomach bug and bad insulin choices."
  }
  if (m.includes('family')) {
    return "Dad has type 2. No other type 1 in family."
  }
  if (m.includes('worse') || m.includes('better')) {
    return "Anything by mouth comes back — worse. Lying still only slightly better."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm type 1, stopped insulin, can't stop vomiting, and my breathing feels wrong."
  }
  return REPLY_CLARIFY
}

function appendicitisKeywords(input: string): string {
  const m = input
  if (m.includes('pain') || m.includes('belly') || m.includes('abdom') || m.includes('stomach')) {
    return "Started around belly button yesterday, today it's right lower — sharp and constant. Walking into the ER made me want to double over."
  }
  if (m.includes('move') || m.includes('migrat') || m.includes('shift')) {
    return "Yeah it migrated — middle first, now right low. Mom said that's how her appendix was."
  }
  if (m.includes('appetite') || m.includes('eat') || m.includes('food')) {
    return "No appetite since yesterday — even pizza smells bad. That's weird for me."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('diarrhea')) {
    return "Nauseated, almost vomited once. No diarrhea — one normal BM yesterday."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Feverish last night — around 100 at a kiosk. Little chills."
  }
  if (m.includes('urine') || m.includes('pee') || m.includes('burning')) {
    return "Urinating fine, no burning. No blood I saw."
  }
  if (/\bwhen\b/.test(m) || m.includes('start')) {
    return "About twenty-four hours — worse today than yesterday."
  }
  if (m.includes('worse') || m.includes('walk') || m.includes('movement')) {
    return "Walking, coughing, car bumps — kill. Lying still is least bad."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Tylenol once — didn't help much. No regular meds."
  }
  if (m.includes('family')) {
    return "Mom's appendix out as a teen — same migration story she tells."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — stomach pain moved to my right side and I can't eat."
  }
  return REPLY_CLARIFY
}

function aorticDissectionKeywords(input: string): string {
  const m = input
  if (m.includes('chest') || m.includes('pain') || m.includes('tear') || m.includes('rip')) {
    return "Sudden ripping chest pain — like something tore inside. Goes straight through to my upper back. Ten out of ten, worst ever."
  }
  if (m.includes('back') || m.includes('radiat')) {
    return "Blasts to between the shoulder blades — not down the arm like my buddy's heart attack."
  }
  if (m.includes('pressure') || m.includes('hypertension') || m.includes('high bp')) {
    return "I have high blood pressure — miss pills when work runs long. Last clinic said it was high."
  }
  if (m.includes('arm') || m.includes('unequal') || m.includes('different')) {
    return "EMS said right arm pressure higher than left — scared me. Pulses felt funny but I'm not the expert."
  }
  if (m.includes('sweat') || m.includes('clammy') || m.includes('diaphor')) {
    return "Soaked through my shirt — cold sweat from pain, not exercise."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('onset')) {
    return "About forty-five minutes ago moving equipment at the site — instant, no warning."
  }
  if (m.includes('breath')) {
    return "Breathing fast from pain — lungs feel clear, not asthma."
  }
  if (m.includes('fever')) {
    return "No fever — pure pain."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Amlodipine when I remember. No cocaine. Ibuprofen for knee sometimes."
  }
  if (m.includes('family') || m.includes('heart')) {
    return "Dad died of heart attack at sixty-two. Nobody said aortic disease."
  }
  if (m.includes('worse') || m.includes('better')) {
    return "Nothing really helps — even morphine barely took the edge off."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Please — my chest feels like something ripped and the pain shoots to my back."
  }
  return REPLY_CLARIFY
}

export const emergencyMedicineKeywordHandlers: Record<string, (input: string) => string> = {
  'sah-worst-headache-of-my-life': sahKeywords,
  'pe-em-cant-catch-breath': peEmKeywords,
  'dka-sugar-out-of-control': dkaKeywords,
  'appendicitis-pain-moved-rlq': appendicitisKeywords,
  'aortic-dissection-tearing-chest': aorticDissectionKeywords,
}
