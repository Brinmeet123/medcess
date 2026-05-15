const REPLY_CLARIFY =
  "I'm not totally sure what you're asking — could you say it another way? I want to answer what you mean."

function ironDeficiencyKeywords(input: string): string {
  const m = input
  if (m.includes('tired') || m.includes('fatigue') || m.includes('exhaust') || m.includes('sleep')) {
    return "I'm exhausted no matter how much I sleep — four months now. Teaching first graders wipes me out by noon."
  }
  if (m.includes('breath') || m.includes('dizzy') || m.includes('weak') || m.includes('stairs')) {
    return "I get winded climbing stairs to my classroom. Dizzy if I stand up fast from the reading rug."
  }
  if (m.includes('period') || m.includes('menstrual') || m.includes('bleed') || m.includes('menses')) {
    return "Periods are heavy since my IUD came out — I change pads hourly some days. Clots sometimes."
  }
  if (m.includes('ice') || m.includes('craving') || m.includes('pica') || m.includes('eat strange')) {
    return "I crunch ice from the cafeteria — weird craving. Not dirt, just ice."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "About four months, gradual. Thought it was school stress until summer didn't help."
  }
  if (m.includes('chest') || m.includes('fever') || m.includes('heart')) {
    return "No chest pain or fever — just tired and breathless on exertion."
  }
  if (m.includes('mood') || m.includes('depress')) {
    return "Frustrated I'm tired — not really depressed. I still laugh with coworkers when I have energy."
  }
  if (m.includes('med') || m.includes('vitamin')) {
    return "Multivitamin sometimes — no prescriptions. Extra sleep didn't fix it."
  }
  if (m.includes('family') || m.includes('thyroid')) {
    return "Mom on thyroid medication. Sister healthy."
  }
  if (m.includes('pregnant') || m.includes('pregnancy')) {
    return "Still getting periods, heavy but monthly. Don't think I'm pregnant."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm tired all the time and stairs wipe me out."
  }
  return REPLY_CLARIFY
}

function hypertensionKeywords(input: string): string {
  const m = input
  if (m.includes('pressure') || m.includes('bp') || m.includes('blood pressure')) {
    return "They keep saying it's high — home cuff shows 150s over 90s. I'm here because they said we can't ignore it."
  }
  if (m.includes('headache') || m.includes('vision') || m.includes('chest')) {
    return "Occasional temple headaches — no vision changes, no chest pain."
  }
  if (m.includes('diet') || m.includes('salt') || m.includes('exercise') || m.includes('lifestyle')) {
    return "I taste salty food all day running the restaurant — sedentary between rushes. Little real exercise."
  }
  if (m.includes('family') || m.includes('father') || m.includes('dad')) {
    return "Dad on blood pressure pills since his fifties."
  }
  if (/\bwhen\b/.test(m) || m.includes('long') || m.includes('start')) {
    return "Months of high readings — maybe a year if honest."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "No BP meds yet — hoped diet would fix it."
  }
  if (m.includes('smoke') || m.includes('tobacco')) {
    return "Quit ten years ago."
  }
  if (m.includes('alcohol') || m.includes('drink')) {
    return "Wine or beer with dinner most nights — maybe two."
  }
  if (m.includes('stress') || m.includes('anxiety')) {
    return "Business stress — staffing, costs. Not panic attacks."
  }
  if (m.includes('home') || m.includes('cuff') || m.includes('monitor')) {
    return "Home machine 150s over 90s mornings — wife wants me to log it."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — my blood pressure keeps reading high at home and at the clinic."
  }
  return REPLY_CLARIFY
}

function pneumoniaKeywords(input: string): string {
  const m = input
  if (m.includes('cough') || m.includes('sputum') || m.includes('phlegm')) {
    return "Cough eight days — yellow-green junk when I cough. Wears me out."
  }
  if (m.includes('fever') || m.includes('chill') || m.includes('temperature')) {
    return "Fever 101 at home, chills at night."
  }
  if (m.includes('breath') || m.includes('short') || m.includes('oxygen')) {
    return "Short of breath walking to the mailbox — oxygen low here they said."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Eight days — started like cold then chest got productive."
  }
  if (m.includes('covid') || m.includes('flu') || m.includes('test')) {
    return "Home COVID negative twice. Flu shot this fall."
  }
  if (m.includes('smoke') || m.includes('copd')) {
    return "Quit smoking ten years ago — used to smoke a pack daily."
  }
  if (m.includes('chest') && m.includes('pain')) {
    return "Chest sore from coughing — not heart attack pain."
  }
  if (m.includes('tired') || m.includes('fatigue')) {
    return "Exhausted — napping, no energy to garden."
  }
  if (m.includes('travel') || m.includes('exposure')) {
    return "No travel. Grandkids visited — weren't sick that I saw."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I've had a productive cough with fever for over a week."
  }
  return REPLY_CLARIFY
}

function depressionKeywords(input: string): string {
  const m = input
  if (m.includes('sad') || m.includes('mood') || m.includes('down') || m.includes('yourself')) {
    return "Haven't felt like myself two months — sad or numb most days, disconnected."
  }
  if (m.includes('interest') || m.includes('hobby') || m.includes('enjoy') || m.includes('fun')) {
    return "Nothing fun anymore — quit book club and hiking. Can't be bothered."
  }
  if (m.includes('sleep') || m.includes('insomnia')) {
    return "Wake at 3 a.m., nap afternoons, still tired."
  }
  if (m.includes('concentrat') || m.includes('focus') || m.includes('school') || m.includes('thesis')) {
    return "Can't focus on thesis — missed a deadline. Advisor worried."
  }
  if (m.includes('suicide') || m.includes('hurt') || m.includes('kill') || m.includes('harm')) {
    return "Sometimes wish I wouldn't wake up — passive, no plan. Scares me. No pills saved."
  }
  if (m.includes('mania') || m.includes('bipolar') || m.includes('drug') || m.includes('alcohol')) {
    return "No manic episodes ever. No drugs, social wine only."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "About two months after semester stress and a breakup."
  }
  if (m.includes('family') || m.includes('depression')) {
    return "Mom on depression meds. Aunt had postpartum depression hospitalized once."
  }
  if (m.includes('appetite') || m.includes('weight')) {
    return "Eating less — lost a few pounds without trying."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I've been down for months and can't enjoy things anymore."
  }
  return REPLY_CLARIFY
}

function osteoarthritisKeywords(input: string): string {
  const m = input
  if (m.includes('knee') || m.includes('pain') || m.includes('ache')) {
    return "Both knees ache daily — worse downstairs and after walking the dog."
  }
  if (m.includes('stiff') || m.includes('morning')) {
    return "Morning stiffness fifteen-twenty minutes — loosens after moving."
  }
  if (m.includes('worse') || m.includes('walk') || m.includes('stairs') || m.includes('activity')) {
    return "Stairs and long walks flare it. Rest and elevation help short term."
  }
  if (m.includes('swell') || m.includes('red') || m.includes('warm') || m.includes('fever')) {
    return "No fever, no hot red knee — mild puffiness sometimes."
  }
  if (m.includes('injury') || m.includes('twist') || m.includes('fall')) {
    return "No recent injury — gradual years. Old twist decades ago healed."
  }
  if (m.includes('med') || m.includes('ibuprofen')) {
    return "Ibuprofen as needed — helps a little. Tried glucosamine, unsure it worked."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Years of slow wear — worse lately with weight gain."
  }
  if (m.includes('family') || m.includes('arthritis')) {
    return "Dad knee replacement at seventy. Mom hand arthritis."
  }
  if (m.includes('gout') || m.includes('infection')) {
    return "Never gout toe attack. Not infected — not hot."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my knees hurt every day, especially on stairs."
  }
  return REPLY_CLARIFY
}

export const familyMedicineKeywordHandlers: Record<string, (input: string) => string> = {
  'iron-deficiency-tired-months': ironDeficiencyKeywords,
  'essential-hypertension-bp-high': hypertensionKeywords,
  'cap-cough-wont-go-away': pneumoniaKeywords,
  'mdd-feel-down-all-time': depressionKeywords,
  'osteoarthritis-knees-hurt-daily': osteoarthritisKeywords,
}
