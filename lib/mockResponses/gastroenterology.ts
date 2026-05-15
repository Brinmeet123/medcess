const REPLY_CLARIFY =
  "I'm not totally sure what you're asking — could you say it another way? I want to answer what you mean."

function pancreatitisKeywords(input: string): string {
  const m = input
  if (m.includes('pain') || m.includes('hurt') || m.includes('ache') || m.includes('belly') || m.includes('abdom')) {
    return "Pain's right under my ribs middle — crushing, worst I've had. Can't straighten up fully. Started sudden eight hours ago."
  }
  if (m.includes('back') || m.includes('radiat')) {
    return "Shoots straight through to my back between the blades — that's what scares me most."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw')) {
    return "Thrown up four times — bile last time. Nausea constant."
  }
  if (m.includes('eat') || m.includes('food') || m.includes('meal')) {
    return "Staff pasta after close made it worse — eating amps the pain."
  }
  if (m.includes('alcohol') || m.includes('drink')) {
    return "Heavy weekends with crew — shots after closing. Probably too much."
  }
  if (m.includes('heart') || m.includes('chest')) {
    return "Not Hollywood left-arm clutch — more gut and back. Still worried cardiac."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Eight hours — getting worse. Not intermittent."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Clammy more than hot — not sure real fever."
  }
  if (m.includes('stool') || m.includes('bowel')) {
    return "Haven't had normal BM — gut too locked up and mad."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my stomach pain is unbearable and goes through to my back."
  }
  return REPLY_CLARIFY
}

function pudKeywords(input: string): string {
  const m = input
  if (m.includes('burn') || m.includes('pain') || m.includes('stomach')) {
    return "Burning gnaw under breastbone two months — like hot coal inside."
  }
  if (m.includes('eat') || m.includes('meal') || m.includes('food') || m.includes('night')) {
    return "Worse few hours after lunch — wakes me at 2 some nights. Crackers calm it briefly."
  }
  if (m.includes('ibuprofen') || m.includes('nsaid') || m.includes('aspirin') || m.includes('med')) {
    return "Ibuprofen for lawyer headaches several days a week — bad combo I bet."
  }
  if (m.includes('blood') || m.includes('stool') || m.includes('vomit') || m.includes('black')) {
    return "No vomiting, no black stool I saw — stool normal color."
  }
  if (m.includes('fever') || m.includes('weight')) {
    return "No fever. Weight stable."
  }
  if (/\bwhen\b/.test(m) || m.includes('long')) {
    return "Two months gradual — not one sudden night."
  }
  if (m.includes('coffee') || m.includes('caffeine')) {
    return "Coffee on trial prep worsens burn — on half-caf now."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I keep getting burning pain in my stomach after I eat."
  }
  return REPLY_CLARIFY
}

function ucKeywords(input: string): string {
  const m = input
  if (m.includes('diarrhea') || m.includes('bathroom') || m.includes('stool')) {
    return "Bloody diarrhea six weeks — sprint from class. Toilet water pink."
  }
  if (m.includes('blood') || m.includes('mucus')) {
    return "Blood and mucus mixed in — not just red on paper."
  }
  if (m.includes('urgency') || m.includes('hold')) {
    return "Can't hold it — mortifying in seminars."
  }
  if (m.includes('weight') || m.includes('fatigue') || m.includes('tired')) {
    return "Lost ten pounds, exhausted — thesis suffering."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Low-grade off and on near 100."
  }
  if (m.includes('pain') || m.includes('cramp')) {
    return "Low belly cramps before I go — eases sometimes after."
  }
  if (m.includes('travel') || m.includes('antibiotic')) {
    return "No travel, no recent antibiotics."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I've had diarrhea for weeks with blood and urgency."
  }
  return REPLY_CLARIFY
}

function hepatitisBKeywords(input: string): string {
  const m = input
  if (m.includes('yellow') || m.includes('jaundice') || m.includes('eye')) {
    return "Family says eyes yellow — I see it mirror now. Skin tint off in sun."
  }
  if (m.includes('urine') || m.includes('dark') || m.includes('pee')) {
    return "Urine dark like cola — freaked me out."
  }
  if (m.includes('fatigue') || m.includes('tired') || m.includes('appetite')) {
    return "Wiped out two weeks, no appetite for protein meals I usually crush."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "Nauseated — vomited once."
  }
  if (m.includes('sex') || m.includes('partner')) {
    return "New partner last month — condoms not every time honestly."
  }
  if (m.includes('alcohol') || m.includes('drink')) {
    return "Rare beer — not heavy drinker."
  }
  if (m.includes('pain') || m.includes('ruq') || m.includes('right')) {
    return "Dull ache under right ribs."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Thermometer hit 100 sometimes."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my family says my eyes turned yellow."
  }
  return REPLY_CLARIFY
}

function colonCancerKeywords(input: string): string {
  const m = input
  if (m.includes('full') || m.includes('satiety') || m.includes('appetite')) {
    return "Fill up fast — half plate and I'm done. Used to love potlucks."
  }
  if (m.includes('weight') || m.includes('loss')) {
    return "Twelve pounds gone without trying — belts loose."
  }
  if (m.includes('bowel') || m.includes('stool') || m.includes('constipation') || m.includes('diarrhea')) {
    return "Bowel habits messy — some weeks stuck, some loose."
  }
  if (m.includes('blood') || m.includes('bleed') || m.includes('hemorrhoid')) {
    return "Red on toilet paper twice — told myself hemorrhoids."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Tired shelving books volunteer — need sit breaks."
  }
  if (m.includes('family') || m.includes('cancer') || m.includes('brother')) {
    return "Brother died colon cancer at fifty-eight — terrified this is same."
  }
  if (m.includes('pain') || m.includes('bloat')) {
    return "Vague belly discomfort bloating — not sharp."
  }
  if (m.includes('fever') || m.includes('nausea')) {
    return "No fever. Some morning queasy."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I feel full all the time and something feels off."
  }
  return REPLY_CLARIFY
}

export const gastroenterologyKeywordHandlers: Record<string, (input: string) => string> = {
  'acute-pancreatitis-pain-through-back': pancreatitisKeywords,
  'peptic-ulcer-burn-after-eating': pudKeywords,
  'ulcerative-colitis-running-bathroom': ucKeywords,
  'acute-hepatitis-b-yellow-eyes': hepatitisBKeywords,
  'colon-cancer-feel-full-all-time': colonCancerKeywords,
}
