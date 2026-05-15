/** OB/GYN demo-mode keyword responses — deterministic when DEMO_MODE without AI. */

const REPLY =
  "Sorry — could you ask that a different way? I want to answer what you actually mean."

function obgynJessicaEctopic(input: string): string {
  const m = input
  if (m.includes('lmp') || m.includes('last period') || m.includes('period') || m.includes('menstrual')) {
    return "Last normal-ish period was about six weeks ago—I kept telling myself stress delayed it. Now with this pain I'm scared that story was denial."
  }
  if (m.includes('pregnant') || m.includes('pregnancy')) {
    return "Nobody at home confirmed anything with a stick—I was hoping to schedule a test when finals eased. My chart probably still says 'maybe' until your tests."
  }
  if (m.includes('pain') || m.includes('hurt') || m.includes('cramp')) {
    return "Left low stab deep inside—worse jostling in the Uber. Constant ache layered under the sharp spikes. Standing slowly helps dizziness slightly."
  }
  if (m.includes('bleed') || m.includes('spot')) {
    return "Pink-brown smears—not a period flow—liner stuff yesterday into today. Freaked me out because cramps came with it."
  }
  if (m.includes('sex') || m.includes('partner') || m.includes('intercourse') || m.includes('contracept')) {
    return "Boyfriend and I use condoms—honestly inconsistent one or two stupid nights this month. No IUD—stopped pills over a year ago."
  }
  if (m.includes('dizz') || m.includes('lightheaded') || m.includes('faint')) {
    return "Standing from triage chair the room grayed—not full blackout. I gripped the wall embarrassed."
  }
  if (m.includes('fever') || m.includes('chill') || m.includes('temperature')) {
    return "No real fever story—face hot from pain maybe—no shaking chills I'm aware of."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "Stomach hates itself—nausea from pain—not projectile situation yet."
  }
  if (m.includes('ob') || m.includes('gravida') || m.includes('parity') || m.includes('g1') || m.includes('prior pregn')) {
    return "Never pregnant before—chart should read G1P0 if we count this one possible—I sound like student lecture."
  }
  if (m.includes('timing') || m.includes('when') || m.includes('start')) {
    return "Sharp phase kicked in hard this morning—spotting crept earlier—whole worry snowball hours not days."
  }
  if (m.includes('uti') || m.includes('burn') || m.includes('urinate')) {
    return "Urinating fine—no fire-hose dysuria like my dorm UTI sophomore year."
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Still curled position hurts less than straightening—movement jolts. Nothing magic helps."
  }
  if (m.includes('family') || m.includes('history')) {
    return "No dramatic family OB stories I know—cousin vague hospital trip—details fuzzy."
  }
  if (m.includes('med') || m.includes('pill')) {
    return "Multivitamin when I remember—not on prescriptions daily beyond that."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—my stomach and my calendar are fighting—I hope that's okay to say."
  }
  if (m.includes('rupture') || m.includes('tube') || m.includes('worst')) {
    return "WebMD rabbit hole said something about rupture—I'm trying not to spiral—pain's bad enough honestly."
  }
  return REPLY
}

function obgynEmilyPcos(input: string): string {
  const m = input
  if (m.includes('period') || m.includes('lmp') || m.includes('menstrual') || m.includes('cycle')) {
    return "Maybe three months since a real bleed—I lose count between midterms. Never regular since high school—just worse now."
  }
  if (m.includes('pregnant') || m.includes('pregnancy')) {
    return "Not trying—condoms sometimes parties—would be shocked but scared. Haven't tested this week."
  }
  if (m.includes('hair') || m.includes('hirsut') || m.includes('chin') || m.includes('acne')) {
    return "Plucking chin before class like a ritual—acne crept back along jaw worse than sophomore year. Makeup cakes but feels gross."
  }
  if (m.includes('weight') || m.includes('gain') || m.includes('diet')) {
    return "Dining hall late night ramen—probably twenty-five pounds since moving dorms. I hate scales."
  }
  if (m.includes('pain') || m.includes('pelvic') || m.includes('cramp')) {
    return "No ER-level twisting pain—more annoyance low belly vague—not my main worry."
  }
  if (m.includes('sex') || m.includes('partner') || m.includes('contracept')) {
    return "Partners happen—condoms not perfect—please don't lecture—I already feel dumb."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Exhausted but whose college sleep sane—hard disentangle lazy versus something medical."
  }
  if (m.includes('galactorrhea') || m.includes('breast') || m.includes('nipple')) {
    return "No milky discharge weirdness—checked paranoid once—nothing."
  }
  if (m.includes('family') || m.includes('mom') || m.includes('thyroid')) {
    return "Mom said thyroid meds once—details vague as family group chat health updates."
  }
  if (m.includes('med')) {
    return "Spotify vitamins sporadic—no prescriptions I'm steady on."
  }
  if (m.includes('fever')) {
    return "No fever—this is chronic weird not flu."
  }
  if (m.includes('timing') || m.includes('how long') || m.includes('years')) {
    return "Irregularity years—acne-hair cluster worse since eighteen-ish—ignored until roommates commented."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Cutting dairy influencer phase—no miracle—stress finals flares skin."
  }
  if (m.includes('discharge') || m.includes('bleed')) {
    return "Discharge normal baseline—no scary bleeding marathons."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey—thanks for not sounding judgy yet—periods hate me."
  }
  return REPLY
}

function obgynAshleyMiscarriage(input: string): string {
  const m = input
  if (m.includes('bleed') || m.includes('blood') || m.includes('pad')) {
    return "Bright red today—not spotting—two pads soaked and I'm shaky telling you. Clots maybe small—panic blurred details."
  }
  if (m.includes('cramp') || m.includes('pain')) {
    return "Low waves like worst period—comes goes—constant undertow ache now."
  }
  if (m.includes('pregnant') || m.includes('week') || m.includes('gestation')) {
    return "Positive test roughly eight weeks ago—happy cry—now guilt for being frightened instead of serene."
  }
  if (m.includes('ob') || m.includes('gravida') || m.includes('parity') || m.includes('prior')) {
    return "Toddler at home healthy—this is second pregnancy if still counts—G2P1 numbers I memorized from intake clipboard."
  }
  if (m.includes('tissue') || m.includes('pass')) {
    return "Nothing obvious blob recognizable—maybe clots—too scared to fish through pad."
  }
  if (m.includes('fever') || m.includes('chill')) {
    return "No fever—chills maybe anxiety buzz—not septic drama I think."
  }
  if (m.includes('uti') || m.includes('burn') || m.includes('urinate')) {
    return "Urinating okay—this is bleeding cramp spiral not bladder story."
  }
  if (m.includes('movement') || m.includes('baby') || m.includes('kick')) {
    return "Felt flutters earlier week—today harder notice through panic—partner asked same in car."
  }
  if (m.includes('lmp') || m.includes('period')) {
    return "LMP math fuzzy post-positive test—dating by early positive and app guess."
  }
  if (m.includes('sex') || m.includes('intercourse')) {
    return "Nothing rough trauma story—normal married pattern."
  }
  if (m.includes('med') || m.includes('prenatal')) {
    return "Prenatal vitamin most nights—stopped ibuprofen when strip turned positive."
  }
  if (m.includes('cousin') || m.includes('family') || m.includes('ectopic')) {
    return "Cousin had ectopic—terrifies me—maybe I'm catastrophizing."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Lying side pillow between knees slightly dulls—standing gushes worse emotionally."
  }
  if (m.includes('discharge') || m.includes('odor')) {
    return "Blood smell sure—no fishy infection vibe—hopefully irrelevant detail."
  }
  if (m.includes('timing') || m.includes('when')) {
    return "Bleeding ramped today—yesterday spotted—denial phase embarrassing."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—I'm pregnant bleeding—sorry I'm crying."
  }
  return REPLY
}

function obgynMariaPid(input: string): string {
  const m = input
  if (m.includes('discharge') || m.includes('odor')) {
    return "Yellow-green staining liners—smell I perfume over shamefully. Not my normal baseline discharge."
  }
  if (m.includes('pain') || m.includes('hurt') || m.includes('pressure') || m.includes('burn')) {
    return "Deep ache during sex last night—burning pressure up inside not classic pee fire."
  }
  if (m.includes('fever') || m.includes('chill') || m.includes('hot')) {
    return "Thermometer hit 101 at apartment—shivered under blankets like flu but pelvis center."
  }
  if (m.includes('sex') || m.includes('partner') || m.includes('condom')) {
    return "New boyfriend few months—condoms skipped twice—voice small admitting—already judging myself harsher than you."
  }
  if (m.includes('lmp') || m.includes('period')) {
    return "Period like two weeks ago normal-ish—this isn't period blood pattern."
  }
  if (m.includes('pregnant') || m.includes('pregnancy')) {
    return "Don't feel pregnant—no missed period scare—nausea minimal."
  }
  if (m.includes('urine') || m.includes('uti') || m.includes('frequency')) {
    return "Peeing bit more—different from knife UTI freshman year—no pure burning tip."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "Queasy from fever maybe—not really vomiting story."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Pressure built few work shifts—today worst."
  }
  if (m.includes('med')) {
    return "Cranberry gummies useless joke—no antibiotics yet."
  }
  if (m.includes('iud') || m.includes('prior')) {
    return "Never had PID diagnosed—no IUD—cafe job not fancy insurance til now."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Heat pad couch slight ease—walking shifts aggravate."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Mom old-school won't discuss gyn stuff—no helpful genetics."
  }
  if (m.includes('bleed') || m.includes('spot')) {
    return "Bleeding minimal weird spotting not headline—discharge dominates."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—downstairs misery fever—thanks for quick work."
  }
  return REPLY
}

function obgynRebeccaPreeclampsia(input: string): string {
  const m = input
  if (m.includes('head') || m.includes('headache') || m.includes('migraine')) {
    return "Band squeezing then stabbing behind eyes—TYLENOL barely touches—light glare kills me in triage hallway."
  }
  if (m.includes('vision') || m.includes('blur') || m.includes('spot') || m.includes('sparkle')) {
    return "Peripheral sparkles scrolling spreadsheets yesterday—ignored until scary—like camera flash ghosts."
  }
  if (m.includes('swell') || m.includes('edema') || m.includes('feet') || m.includes('ankle')) {
    return "Shoes betrayed me weeks—socks dent calves—hands puffy—wedding ring cut off joke not funny now."
  }
  if (m.includes('ruq') || m.includes('right upper') || m.includes('epigastric') || m.includes('stomach')) {
    return "Right upper nag after fried dinner—different from pregnancy reflux—gnaws uneasy."
  }
  if (m.includes('week') || m.includes('pregnant') || m.includes('gestation') || m.includes('trimester')) {
    return "Thirty-four weeks—G1P0—dating scan early matched."
  }
  if (m.includes('ob') || m.includes('prenatal') || m.includes('bp') || m.includes('blood pressure')) {
    return "Office visit weeks ago 'fine' they said—home cuff lazy purchase procrastinated—hindsight cringe."
  }
  if (m.includes('fever')) {
    return "No fever—head and pressure headline."
  }
  if (m.includes('urine') || m.includes('protein')) {
    return "Haven't noticed foam—I pee normal subjective—labs tell truth I guess."
  }
  if (m.includes('movement') || m.includes('baby') || m.includes('kick')) {
    return "Still squirming I think—paranoid counting—tell me if I should watch closer."
  }
  if (m.includes('family') || m.includes('preeclamp') || m.includes('sister')) {
    return "Sister 'high BP pregnancy' vague—family shares diagnoses like rumor mill."
  }
  if (m.includes('med')) {
    return "Prenatal vitamins—no aspirin stash—OTC label paranoia."
  }
  if (m.includes('timing') || m.includes('when')) {
    return "Headache visual junk yesterday bloated—feet worse two weeks—today forced leave work."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Dark quiet room slight help—standing swelling rages—salty yesterday dinner regret."
  }
  if (m.includes('seizure') || m.includes('worst')) {
    return "Scared of seizure stories online—trying not borrow trouble—head pressure frightening enough."
  }
  if (m.includes('pain') && !m.includes('head')) {
    return "Outside head/RUQ ache—no contractions timed—wrong flavor pain maybe irrelevant."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—third trimester hitting me like truck—head and swelling won't quit."
  }
  return REPLY
}

export const obgynKeywordHandlers: Record<string, (input: string) => string> = {
  'obgyn-ectopic-jessica-missed-period': obgynJessicaEctopic,
  'obgyn-pcos-emily-irregular-cycles': obgynEmilyPcos,
  'obgyn-miscarriage-ashley-bleeding': obgynAshleyMiscarriage,
  'obgyn-pid-maria-discharge': obgynMariaPid,
  'obgyn-preeclampsia-rebecca-headache-swelling': obgynRebeccaPreeclampsia,
}
