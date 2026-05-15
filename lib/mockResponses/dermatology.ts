const REPLY_CLARIFY =
  "I'm not totally sure what you're asking — could you say it another way? I want to answer what you mean."

function tineaCorporisKeywords(input: string): string {
  const m = input
  if (m.includes('rash') || m.includes('circle') || m.includes('ring') || m.includes('spot')) {
    return "It's this round itchy patch on my forearm — red scaly edge and clearer-ish middle. Started small like two weeks ago and keeps growing outward. Kind of embarrassing for wrestling."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long') || m.includes('spread')) {
    return "About two weeks — was a tiny dot at first. Slow spread, not overnight. Still getting bigger which is why I'm here."
  }
  if (m.includes('wrestl') || m.includes('sport') || m.includes('team') || m.includes('mat')) {
    return "I'm on varsity wrestling — daily mat contact. A few teammates had skin rashes lately. Coach is big on cleaning mats but I wonder if that's how I got it."
  }
  if (m.includes('itch') || m.includes('pain') || m.includes('hurt')) {
    return "It itches, especially when I'm sweaty after practice. Not really painful — no throbbing or anything. No fever either."
  }
  if (m.includes('tried') || m.includes('cream') || m.includes('lotion') || m.includes('treatment')) {
    return "Drugstore lotion and some hydrocortisone — didn't fix it. Maybe soothed itch for a bit but the ring kept growing."
  }
  if (m.includes('fever') || m.includes('sick')) {
    return "I feel fine — no fever, no chills. Appetite normal."
  }
  if (m.includes('where') || m.includes('location') || m.includes('else')) {
    return "Just my right forearm that I see — nowhere else on my body."
  }
  if (m.includes('worse') || m.includes('better')) {
    return "Sweating after practice makes it itch more. Nothing makes it go away completely."
  }
  if (m.includes('allerg')) {
    return "No allergies I know of."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I've got this weird spreading circle rash on my arm from wrestling, I think."
  }
  return REPLY_CLARIFY
}

function melanomaKeywords(input: string): string {
  const m = input
  if (m.includes('mole') || m.includes('spot') || m.includes('lesion')) {
    return "The mole on my upper back changed — darker, bigger, edges not smooth anymore. Mixed colors, almost black in spots. It itches sometimes."
  }
  if (/\bwhen\b/.test(m) || m.includes('long') || m.includes('change') || m.includes('notice')) {
    return "Over several months — my husband noticed in photos from last summer. Not sudden, but definitely evolving."
  }
  if (m.includes('sun') || m.includes('sunscreen') || m.includes('tan') || m.includes('outdoor')) {
    return "I'm outside constantly showing houses — realtor life. I rarely use sunscreen unless I'm at the beach. Burned a lot when I was younger, honestly."
  }
  if (m.includes('color') || m.includes('border') || m.includes('size') || m.includes('shape') || m.includes('asymmet')) {
    return "Edges look jagged, color is blotchy brown and black, bigger than a pencil eraser now. I'd say it's asymmetric if that matters."
  }
  if (m.includes('itch') || m.includes('bleed') || m.includes('pain')) {
    return "Itches occasionally — I scratch through my shirt. No bleeding or open sore that I've seen."
  }
  if (m.includes('family') || m.includes('cancer')) {
    return "Aunt had skin cancer removed from her face — type unclear. No one said melanoma specifically in my family."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Amlodipine for blood pressure. No new medicines."
  }
  if (m.includes('fever') || m.includes('weight')) {
    return "No fever or weight loss — feel okay except worried sick about this spot."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm here because a mole on my back doesn't look right anymore."
  }
  return REPLY_CLARIFY
}

function acneVulgarisKeywords(input: string): string {
  const m = input
  if (m.includes('acne') || m.includes('pimple') || m.includes('break') || m.includes('face')) {
    return "My face and upper back won't stop breaking out — blackheads, red bumps, pus ones sometimes. Deep painful ones on my chin that linger. Over a year now."
  }
  if (/\bwhen\b/.test(m) || m.includes('long') || m.includes('start')) {
    return "More than a year — since around sophomore year. Constant, not just one bad week."
  }
  if (m.includes('period') || m.includes('menstrual') || m.includes('cycle')) {
    return "Definitely worse the week before my period — chin explodes. Cycles are regular though."
  }
  if (m.includes('tried') || m.includes('product') || m.includes('wash') || m.includes('treatment')) {
    return "Tried salicylic wash, benzoyl peroxide, masks — everything from the drugstore aisle. Nothing really sticks."
  }
  if (m.includes('where') || m.includes('location')) {
    return "Face and upper back mainly — not arms or chest much."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Some deep ones hurt to touch. No fever or feeling ill."
  }
  if (m.includes('worse') || m.includes('better') || m.includes('stress')) {
    return "Worse before period and during exams. Products help a day then back."
  }
  if (m.includes('pill') || m.includes('birth') || m.includes('med')) {
    return "Not on birth control. No other meds."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — my acne keeps getting worse and I'm tired of hiding it."
  }
  return REPLY_CLARIFY
}

function herpesZosterKeywords(input: string): string {
  const m = input
  if (m.includes('burn') || m.includes('sting') || m.includes('pain') || m.includes('hurt')) {
    return "Burning, stabbing pain on my left chest — started before any rash. Even a shirt touching it makes me wince. Worst pain I've had in years."
  }
  if (m.includes('rash') || m.includes('blister') || m.includes('vesicle') || m.includes('bump')) {
    return "Grouped fluid-filled blisters on red skin — left chest only. Showed up after two days of pain."
  }
  if (m.includes('left') || m.includes('right') || m.includes('side') || m.includes('midline') || m.includes('where')) {
    return "Only the left side — band around chest and back. Stops at the middle, doesn't cross to the right. Nurse drew a line showing the pattern."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Pain three days ago, blisters since yesterday. Getting worse not better."
  }
  if (m.includes('before') || m.includes('prodrome') || m.includes('prior')) {
    return "Pain definitely came first — thought I pulled a muscle. Rash was second act."
  }
  if (m.includes('fever') || m.includes('sick')) {
    return "Low fever yesterday — felt run down. Not hospitalized sick but off."
  }
  if (m.includes('chickenpox') || m.includes('childhood') || m.includes('pox')) {
    return "Had chickenpox as a kid — never anything like this until now."
  }
  if (m.includes('eye') || m.includes('vision') || m.includes('face')) {
    return "Eye's okay — rash is chest, not on my forehead or nose."
  }
  if (m.includes('med')) {
    return "Lisinopril and aspirin daily. Nothing new."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my chest burns and I have blisters on one side only."
  }
  return REPLY_CLARIFY
}

function sjsKeywords(input: string): string {
  const m = input
  if (m.includes('peel') || m.includes('skin') && (m.includes('burn') || m.includes('rash'))) {
    return "Skin burns everywhere and peels if they touch it gently — red spots turned into blisters and sheets of skin coming off. Terrifying."
  }
  if (m.includes('mouth') || m.includes('lip') || m.includes('throat') || m.includes('eat')) {
    return "Mouth full of painful sores — can barely eat or drink. Lips stuck together in the morning. Throat hurts too."
  }
  if (m.includes('eye')) {
    return "Eyes burn and feel gritty — light hurts. They said ophthalmology needs to see me."
  }
  if (m.includes('med') || m.includes('drug') || m.includes('seizure') || m.includes('pill')) {
    return "Started lamotrigine for seizures two weeks ago — new medicine from my neurologist. Never reacted like this before."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Fever three days ago, then rash spread fast. Worse every day since."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "102 at home — chills, feel toxic. Heart racing in the ER."
  }
  if (m.includes('spread') || m.includes('everywhere') || m.includes('body')) {
    return "Started chest and face, now trunk and arms — not one small spot, widespread."
  }
  if (m.includes('pain') || m.includes('bad') || m.includes('scale')) {
    return "Constant burning — worse than seizures I've had. Pain meds here help a little."
  }
  if (m.includes('allerg') || m.includes('reaction')) {
    return "Never had a drug reaction like this — switched seizure meds before for other reasons, not skin."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Please — my skin and mouth are burning and peeling after a new seizure medicine."
  }
  return REPLY_CLARIFY
}

export const dermatologyKeywordHandlers: Record<string, (input: string) => string> = {
  'tinea-corporis-spreading': tineaCorporisKeywords,
  'melanoma-mole-changed': melanomaKeywords,
  'acne-vulgaris-face': acneVulgarisKeywords,
  'herpes-zoster-burning': herpesZosterKeywords,
  'stevens-johnson-peeling': sjsKeywords,
}
