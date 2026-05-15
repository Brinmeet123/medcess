const REPLY =
  "Sorry — can you rephrase that? I want to answer what you mean."

function rheumSusanRa(input: string): string {
  const m = input
  if (m.includes('stiff') || m.includes('morning')) {
    return "Mornings are the worst — hands feel frozen solid over an hour before they unlock. Coffee and a hot shower chip away at it, but the first client emails are brutal on my fingers."
  }
  if (m.includes('swell') || m.includes('knuckle') || m.includes('joint') || m.includes('hand')) {
    return "Both hands — knuckles puffy, rings stopped fitting months back. Gripping a stapler or tight jar lid is embarrassing; I bought rubber grippers like I'm eighty."
  }
  if (m.includes('pain') || m.includes('hurt') || m.includes('ache')) {
    return "Deep achy-throb in the joints, not just muscle soreness from typing. Gets a little better if I keep moving gently — sitting in one position makes it re-freeze."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Bone-tired on weekends when I should recover — naps don't fix it. Brain fog creeps in when pain spikes."
  }
  if (m.includes('rash') || m.includes('sun') || m.includes('photosens')) {
    return "No weird face rash — sun doesn't flame my cheeks like my cousin's lupus stories. Just joint misery."
  }
  if (m.includes('fever') || m.includes('chill')) {
    return "I run maybe 99 on bad days — nothing dramatic. No night sweats drenching sheets."
  }
  if (m.includes('trauma') || m.includes('injury')) {
    return "No fall, no twisted wrist — this built quietly then refused to leave."
  }
  if (
    m.includes('family') ||
    m.includes('history') ||
    m.includes('psoriatic') ||
    m.includes('psoriasis')
  ) {
    return "Mom has 'arthritis' vague — nobody says rheumatoid out loud. No psoriasis plaques I've noticed on me."
  }
  if (m.includes('med') || m.includes('nsaid') || m.includes('ibuprofen')) {
    return "Ibuprofen takes the edge off sometimes — not magic. No biologics or methotrexate before — scared of side effects honestly."
  }
  if (m.includes('timing') || m.includes('how long') || m.includes('when')) {
    return "Around eight months now — gradual until I couldn't deny it was my new normal."
  }
  if (m.includes('weak') || m.includes('grip')) {
    return "Grip strength trash — handshake embarrassingly limp some days. Not paralysis — more pain-limited."
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Warm water and gentle fidgeting help; deadlines stress — clench typing flares me. Weekend rest alone stiffens worse."
  }
  if (m.includes('cold')) {
    return "AC vent at desk makes knuckles cranky — not Raynaud color drama, just unhappy joints."
  }
  if (m.includes('appetite') || m.includes('weight')) {
    return "Appetite okay — stress snacking if anything — weight stable, energy garbage."
  }
  if (m.includes('work') || m.includes('job')) {
    return "Admin assistant — constant typing scheduling; hiding stiffness from boss sucks."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — thanks for fitting me in. My hands are betraying me every morning."
  }
  return REPLY
}

function rheumRachelSle(input: string): string {
  const m = input
  if (m.includes('rash') || m.includes('sun') || m.includes('photo') || m.includes('face')) {
    return "Cheeks and bridge of nose burn after sun like sunburn but angrier — weirdly spares the smile-line creases my roommate noticed in brunch photos. Wide-brim hat helps if I'm disciplined."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Seminar brain fog — reading same paragraph four times. Coffee stops working halfway through lab write-ups."
  }
  if (m.includes('joint') || m.includes('pain') || m.includes('wrist')) {
    return "Wrists and small joints ache typing — not red-hot swollen giant joints, more constant gnaw. Flares with stress weeks."
  }
  if (m.includes('mouth') || m.includes('ulcer') || m.includes('sore')) {
    return "Little lip ulcers sting with orange juice — come-and-go stupid annoyances I didn't connect to anything until WebMD rabbit hole at 2 a.m."
  }
  if (m.includes('hair') || m.includes('thin')) {
    return "Shower drain clogging more — ponytail feels thinner; vanity panic layered on fatigue."
  }
  if (m.includes('fever') || m.includes('temp')) {
    return "Low-grade icky days — not influenza high spikes usually — fuzzy borderline temps."
  }
  if (m.includes('urine') || m.includes('kidney')) {
    return "Haven't noticed cola urine — peed fine — doctors asking scary kidney questions make my stomach drop."
  }
  if (m.includes('chest') || m.includes('breath')) {
    return "Breathing okay climbing stairs — not pleurisy story I've read about — lungs feel unrelated right now."
  }
  if (m.includes('med') || m.includes('birth control') || m.includes('drug')) {
    return "Birth control years, occasional NSAID — no weird new prescription last month besides vitamins I forget."
  }
  if (m.includes('family') || m.includes('lupus') || m.includes('autoimmune')) {
    return "Cousin vague 'immune thing' — family health communication is emoji-level detail."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Months creeping — rash attention maybe six weeks spotlight but fatigue longer denial."
  }
  if (m.includes('stress') || m.includes('school')) {
    return "Grad school pace brutal — symptoms spike finals weeks — correlation or causation who knows."
  }
  if (m.includes('cold')) {
    return "Cold makes hands ache but not white-blue circus like some Raynaud TikToks — sun's the villain here."
  }
  if (m.includes('weak')) {
    return "Weak more fatigue-hangover than can't lift fork — different weakness texture."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Sunscreen hats help face some; ignoring symptoms made anxiety worse — admitting feels huge."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — my skin and sun are fighting and I'm losing."
  }
  return REPLY
}

function rheumAnthonyGout(input: string): string {
  const m = input
  if (m.includes('toe') || m.includes('foot') || m.includes('mtp') || m.includes('big')) {
    return "Right big toe joint — overnight hell — feels like crushed glass inside. Sheet weight unbearable — slept half off mattress dangling foot."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Ten-out-of-ten when it grabs — throbbing syncs with heartbeat. Tears in my eyes and I'm not dramatic usually."
  }
  if (m.includes('swell') || m.includes('red') || m.includes('hot')) {
    return "Red balloon joint — hot as poker — shoe impossible; hobbled clinic barefoot in sneaker one-foot hop embarrassing."
  }
  if (m.includes('diet') || m.includes('steak') || m.includes('alcohol') || m.includes('wine')) {
    return "Hosted wine dinner — tomahawk steaks celebration yesterday — probably not smart with family history whisper jokes about rich food foot."
  }
  if (m.includes('trauma') || m.includes('injury')) {
    return "No stub injury — woke from sleep into fire — blame steak not soccer."
  }
  if (m.includes('fever') || m.includes('chill')) {
    return "Mild off feeling — not raging septic TV fever — mostly local misery."
  }
  if (m.includes('prior') || m.includes('before') || m.includes('history')) {
    return "First attack this bad — uncle jokes about gout — I rolled eyes until karma."
  }
  if (m.includes('med') || m.includes('ibuprofen') || m.includes('allopurinol')) {
    return "Dental leftover pain pill barely touched it — never on uric meds before."
  }
  if (m.includes('timing') || m.includes('when')) {
    return "Started middle night — about 3 a.m. — still screaming noon."
  }
  if (m.includes('walk') || m.includes('bear')) {
    return "Can't bear weight normally — crutch borrowed from gym closet ridiculous scene."
  }
  if (m.includes('stiff') || m.includes('morning')) {
    return "Stiff means can't move toe without electric jolt — not RA whole-body morning paste."
  }
  if (m.includes('rash')) {
    return "No spreading skin infection rash — localized joint angry."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Ice conflicting advice — elevation hurts mentally but slight relief. Stress owning restaurant doesn't help inflammation culture."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my toe's trying to kill me."
  }
  return REPLY
}

function rheumLindaPmr(input: string): string {
  const m = input
  if (m.includes('shoulder') || m.includes('hip') || m.includes('proximal')) {
    return "Bridges tops of shoulders and both hips — dressing war — bathroom counter push to stand — grandson hug awkward angle pain."
  }
  if (m.includes('stiff') || m.includes('morning')) {
    return "Hour-plus glue after waking — hot shower largest kindness — still rusty till lunch."
  }
  if (m.includes('weak') || m.includes('strength')) {
    return "Feels weak but I can lift grocery bags if I cheat legs — more pain gatekeeping than true paralysis fear."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Afternoon pillow gravity — retired teacher guilt napping — body demands."
  }
  if (m.includes('fever') || m.includes('weight') || m.includes('temperature')) {
    return "No drenching night sweats — weight loss not drastic — appetite normal comfort food. Low-ish temp vague days sometimes — not infection feeling."
  }
  if (m.includes('headache') || m.includes('jaw') || m.includes('vision')) {
    return "Headache mild nag — vision okay — jaw claudication not pronounced — know doctors worry that combo though."
  }
  if (m.includes('thyroid') || m.includes('cold') || m.includes('hair')) {
    return "Thyroid pill stable years — hair not falling oddly — cold intolerance usual old-lady baseline."
  }
  if (m.includes('fibro') || m.includes('tender')) {
    return "Hurt all over story yes — but stiffness pattern heavy shoulders hips not random point puzzles friend's fibro described."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Progressive couple months worsening — denial retired alongside me finally."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Sister arthritis vague — genetics mystery casserole."
  }
  if (m.includes('med')) {
    return "Vitamin D calcium stalwart — occasional acetaminophen — no prednisone before."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Heat gentle movement soften edges — still cold car stiffens cruel."
  }
  if (m.includes('work')) {
    return "Retired — volunteer reading wrangles kids — stairs getting mean."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I feel stiff everywhere and it's stealing joy."
  }
  return REPLY
}

function rheumMelissaSclero(input: string): string {
  const m = input
  if (
    m.includes('cold') ||
    m.includes('raynaud') ||
    m.includes('color') ||
    m.includes('finger')
  ) {
    return "Parking deck winter — fingers go corpse white then dusky then angry red — jewelry quit because knuckles don't cooperate — coworkers thought I was dramatic till they saw blue phase."
  }
  if (m.includes('skin') || m.includes('tight') || m.includes('shiny')) {
    return "Skin on hands looks stretched shiny — making fist like thick rubber glove — mouth opening smaller smiling for photos weird."
  }
  if (m.includes('heartburn') || m.includes('reflux') || m.includes('swallow')) {
    return "Heartburn hiking stairs not just wings night — swallowing dry chicken sticks mid-chest — Tums ritual failing glamorously."
  }
  if (m.includes('breath') || m.includes('lung') || m.includes('cough')) {
    return "Winded earlier than should be stairs — cough rare — scared it means something lung-ish — Internet scared me more."
  }
  if (m.includes('dry') || m.includes('eye')) {
    return "Eyes gritty contact lens drama some afternoons — saline drops buddy."
  }
  if (m.includes('pain') || m.includes('ache')) {
    return "Deep joint-adjacent ache — different from RA stories friend tells — more tightening less swollen knuckle sausage."
  }
  if (m.includes('timing') || m.includes('years') || m.includes('how long')) {
    return "Raynaud years dismissed — skin tightening last couple years undeniable — progression slow emotional whiplash."
  }
  if (m.includes('family') || m.includes('history')) {
    return "No obvious scleroderma label family — autoimmune whispers maybe aunt thyroid."
  }
  if (m.includes('med')) {
    return "PPI on and off — calcium — no immunosuppressant yet — scared of names."
  }
  if (m.includes('stress') || m.includes('work')) {
    return "Tax season accountant — stress default — fingers punish deadlines."
  }
  if (m.includes('rash') || m.includes('sun')) {
    return "Sun not lupus malar story — more vascular color dance cold triggered."
  }
  if (m.includes('fever')) {
    return "No fever narrative — chronic creep not acute infection."
  }
  if (m.includes('weak')) {
    return "Weakness subtle — gripping files harder — embarrassment minimization."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Hand warmers glove layers help Raynaud — spicy food worsens reflux comedy."
  }
  if (m.includes('weakness') && m.includes('muscle')) {
    return "No sudden can't-rise weakness — more contracture frustration than strength crash."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my hands change colors and skin feels shrink-wrapped."
  }
  return REPLY
}

export const rheumatologyKeywordHandlers: Record<string, (input: string) => string> = {
  'rheum-ra-susan-morning-stiffness': rheumSusanRa,
  'rheum-sle-rachel-photosensitivity': rheumRachelSle,
  'rheum-gout-anthony-first-mtp': rheumAnthonyGout,
  'rheum-pmr-linda-proximal-pain': rheumLindaPmr,
  'rheum-scleroderma-melissa-raynaud': rheumMelissaSclero,
}
