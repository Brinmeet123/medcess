const REPLY_CLARIFY =
  "I'm not totally sure what you're asking — could you put it simpler? I want to answer what you mean."

function laurenSepsisPyeloKeywords(input: string): string {
  const m = input
  if (m.includes('fever') || m.includes('temperature') || m.includes('hot')) {
    return "I've had fevers bad two days — today I feel like I'm on fire. It comes in waves where I'm roasting, then I shake until my teeth chatter. My wife said I felt scary-hot last night."
  }
  if (
    m.includes('chill') ||
    m.includes('shake') ||
    m.includes('shiver') ||
    m.includes('rigor')
  ) {
    return "The shaking is what brought me in — I can't get it to stop for long. Blankets help for like five minutes and then I'm freezing again. I'm embarrassed how loud my teeth were chattering in triage."
  }
  if (
    m.includes('urin') ||
    m.includes('pee') ||
    m.includes('bladder') ||
    m.includes('dysur')
  ) {
    return "It burns when I pee and I'm running to the bathroom constantly. The stream looks darker, maybe cloudy — I'm not great at judging that stuff honestly. That's been going on alongside the fever."
  }
  if (
    m.includes('flank') ||
    m.includes('kidney') ||
    m.includes('back pain') ||
    m.includes('costovertebral')
  ) {
    return "My sides hurt — especially the right — like someone punched me in the kidney. It hurts more when they tapped my back here in the ER and I jumped. I thought maybe I strained something, but it feels sicker than that."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw up')) {
    return "I'm nauseated most of the time and I barely want water. I dry-heaved this morning. Even saltines sound gross right now — that's not like me usually."
  }
  if (
    /\bwhen\b/.test(m) ||
    m.includes('how long') ||
    m.includes('onset') ||
    m.includes('start') ||
    m.includes('duration')
  ) {
    return "Burning urine started about two days ago, then chills, then today I went downhill fast with shaking and dizziness. I should've come yesterday — tax season made me stupid stubborn."
  }
  if (m.includes('headache') || m.includes('head ')) {
    return "I have a dull headache, not the main problem — it's the fever and shaking scaring me. When I stand too fast I feel woozy like my head's swimming. I haven't had migraines before really."
  }
  if (m.includes('travel') || m.includes('trip') || m.includes('abroad') || m.includes('exposure')) {
    return "No travel — I've been home and work grinding through taxes. Nobody close to me has this pattern. I haven't been in a hospital lately or anything like that."
  }
  if (m.includes('cough') || m.includes('sore throat') || m.includes('cold')) {
    return "No real cold symptoms — no sore throat, no nasty cough. Breathing feels fast because I'm anxious and feverish, but my lungs don't feel 'infected' the way past flu did."
  }
  if (m.includes('weight') || m.includes('appetite')) {
    return "I haven't weighed myself, but I haven't eaten because of nausea. Nothing intentional about weight loss — I just can't keep food down mentally, let alone physically."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('drug') || m.includes('pill')) {
    return "Antacid daily, ibuprofen a few times this week hoping it would help — didn't much. No antibiotics. I take birth control. That's basically it, I'm usually healthy."
  }
  if (m.includes('family') || m.includes('relative')) {
    return "Mom had kidney stones once — painful peeing story but not like this whole-body crash. Dad's fine. Nothing runs in my family that sounds like recurrent sepsis if that's what you're thinking."
  }
  if (
    m.includes('help') ||
    m.includes('better') ||
    m.includes('relief') ||
    m.includes('improves')
  ) {
    return "Warm blankets calmed me briefly during rigors — emotionally if nothing else. Sipping water sometimes settles nausea a minute. Honestly nothing truly fixes it; I feel weaker every wave."
  }
  if (
    m.includes('worse') ||
    m.includes('aggravat') ||
    m.includes('trigger') ||
    m.includes('standing') ||
    m.includes('dizzy')
  ) {
    return "Standing makes me dizzy — my vision went grey in the waiting room once and I grabbed a chair. Moving twists the flank pain worse. Today feels nastier than yesterday without a doubt."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm shaking, burning up, peeing hurts, my sides ache, and I'm dizzy standing. I'm terrified and I need help figuring out what's happening."
  }
  return REPLY_CLARIFY
}

function michaelEndocarditisKeywords(input: string): string {
  const m = input
  if (m.includes('fever') || m.includes('temperature')) {
    return "Fevers on and off for weeks — evenings worse sometimes around 101 at home. Tylenol barely touches it. This isn't a quick viral thing like I'm used to riding out."
  }
  if (m.includes('chill') || m.includes('night sweat') || m.includes('sweat')) {
    return "Night sweats soak my shirt — laundry gross, yeah. Chills ride along sometimes with the fever spikes. I'm exhausted cleaning myself up like I'm sick-sick, not workout-sweaty."
  }
  if (
    m.includes('weight') ||
    m.includes('fatigue') ||
    m.includes('tired') ||
    m.includes('cough') ||
    m.includes('breath')
  ) {
    return "I've lost weight without trying — belt notches looser — and I'm winded carrying lumber like I'm out of shape overnight. There's a mild nagging cough sometimes, more breathless than phlegm."
  }
  if (
    m.includes('needle') ||
    m.includes('heroin') ||
    m.includes('iv ') ||
    m.includes('inject') ||
    m.includes('drug use')
  ) {
    return "I've used heroin — sometimes IV — I'm ashamed saying it out loud. My veins look rough. I stopped a few days ago because I felt worse, not from virtue, more fear if that makes sense."
  }
  if (m.includes('headache') || m.includes('head pain')) {
    return "Head pressure sometimes with fevers — not thunderclap worst-ever, more achy. I'm more bothered by pounding heart and getting winded on stairs honestly."
  }
  if (m.includes('travel') || m.includes('trip') || m.includes('exposure') || m.includes('contact')) {
    return "No travel — local construction sites, occasional bar nights. Roommate had a cold; nothing like this marathon fever thing. I don't know TB exposures beyond rumors in old circles."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('appetite')) {
    return "Queasy mornings sometimes but I can still eat small meals — appetite meh. Vomiting not really, just gross sweats that kill hunger."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long') || m.includes('duration')) {
    return "About a month waxing-waning — ignored it like an idiot working overtime. Night sweats got obvious three weeks-ish ago. Nail marks freaked me out last week enough to schedule clinic."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Ibuprofen, occasional Tylenol. Old albuterol inhaler from childhood asthma barely used. No prescriptions otherwise. Antibiotics years ago for tooth infection — finished that course."
  }
  if (m.includes('family') || m.includes('relative')) {
    return "Dad had some heart murmur older — watchful waiting. Mom diabetes. Nobody young with crazy infection histories unless you count me now scared."
  }
  if (
    m.includes('murmur') ||
    m.includes('heart') ||
    m.includes('nail') ||
    m.includes('splinter') ||
    m.includes('skin')
  ) {
    return "Nurse mentioned a new murmur — freaked me out because I never paid attention before. Fingernails have little splinter-looking lines I didn't earn from work injuries."
  }
  if (m.includes('help') || m.includes('better') || m.includes('relief')) {
    return "Rest and fluids take the edge off fatigue slightly. Fever reducers help a degree maybe — showers felt good once until chills slammed back. Nothing fixes the overall 'something is wrong' vibe."
  }
  if (m.includes('worse') || m.includes('exert') || m.includes('trigger')) {
    return "Heavy work makes breathing harder heart pound louder. Hot rooms make flushing worse. Lying flat sometimes feels off — I prop pillows like an old man suddenly."
  }
  if (m.includes('urin') || m.includes('uti')) {
    return "Urination mostly normal — no burning saga. Not the kidney-infection story I've heard coworkers describe. That's partly why I didn't think infection at first, though I guess bodies are weird."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I've had fevers for weeks, night sweats, weight loss, short wind, weird nails, and they heard a new heart murmur. I use drugs sometimes and I'm scared to admit it, but I'm here."
  }
  return REPLY_CLARIFY
}

function davidMalariaKeywords(input: string): string {
  const m = input
  if (
    m.includes('travel') ||
    m.includes('africa') ||
    m.includes('trip') ||
    m.includes('abroad') ||
    m.includes('where')
  ) {
    return "I was in sub-Saharan Africa for research — dusty field buses, mosquitoes despite nets sometimes lazy. Home about two weeks now. Fevers started after I convinced myself it was jet lag too long."
  }
  if (m.includes('fever') || m.includes('temperature') || m.includes('cycle')) {
    return "Fevers cycle — chills, burn up, sweat through sheets. Not a steady low-grade thing; it's dramatic waves freaking my girlfriend out. Thermometer 102-ish at worst so far."
  }
  if (m.includes('chill') || m.includes('shake') || m.includes('rigor')) {
    return "Chills hit before the hot phase — shaking under blankets even when apartment thermostat normal. Roommate thought influenza timeline, but I'm too far post-travel for that excuse."
  }
  if (m.includes('headache') || m.includes('head')) {
    return "Headache pressure behind eyes constant — worse when I cough lights annoy me some though not horror-movie photophobia. Studying screen time impossible lately."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('appetite')) {
    return "Nauseated — cooking smells gag me. Eating crackers only mostly. Not vomiting tons, just retching occasionally dry. Mouth tastes metallic weird."
  }
  if (m.includes('malar') || m.includes('prophyl') || m.includes('doxy') || m.includes('pill prevention')) {
    return "I was supposed to take malaria pills — missed refills, told myself I'd be fine like an arrogant idiot. Dissertation chaos, bad sleep, excuses pile. No fancy post-exposure meds otherwise."
  }
  if (m.includes('mosquito') || m.includes('bite') || m.includes('exposure')) {
    return "Mosquito bites absolutely happened — itchy welts even with half-hearted net use. No tick memorable. Probably drank sketchy hydration choices; who knows."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long') || m.includes('onset')) {
    return "First week home tired-only; second week fever cycles ramped. Today headache nastiest — maybe day fourteen since plane landed if counting messy. I should've come sooner."
  }
  if (m.includes('cough') || m.includes('breath') || m.includes('lung')) {
    return "No big pneumonia cough — throat clearing from dust maybe. Resting oxygen felt okay at triage. Misery is whole-body aches more than lungs screaming."
  }
  if (m.includes('urin') || m.includes('pee') || m.includes('kidney')) {
    return "Urine darker — probably dehydrated from sweating. No classic UTI burn. Back aches vague bed-rest sore, not flank-killer stone story."
  }
  if (m.includes('weight') || m.includes('appetite')) {
    return "Probably down a few pounds from not eating — belt looser slightly. Not trying — thesis stress usually makes me snack worse ironically; this inverted that."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "ADHD med weekdays — skipped lately with nausea. Melatonin sometimes. Ibuprofen stash for headache useless. No antibiotics."
  }
  if (m.includes('family') || m.includes('relative')) {
    return "Sister had dengue in Peace Corps — she's texting paranoid I have something tropical. Dad sickle trait I think — random fact. Mom healthy."
  }
  if (m.includes('help') || m.includes('better')) {
    return "Cold washcloth forehead helps headache short-term. Ginger ale settles stomach marginally. Sleep fragments but when I nap I feel slightly less broken until fever snaps back."
  }
  if (m.includes('worse') || m.includes('light') || m.includes('screen')) {
    return "Bright lights and phone screens spike headache. Heat in building worsens fever feeling. Standing fast gives woozy seconds — embarrassing in lecture hall rows."
  }
  if (m.includes('rash') || m.includes('jaund') || m.includes('yellow')) {
    return "No rash I notice beyond bite marks healing. Girlfriend swears eyes little yellow in harsh bathroom LED — could be lighting panic. No bleeding gums random."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — fevers since getting back from Africa, cyclical chills and sweats, brutal headache, nausea, skipped malaria prevention, maybe eyes a bit yellow. I need help."
  }
  return REPLY_CLARIFY
}

function jasonHivOppKeywords(input: string): string {
  const m = input
  if (
    m.includes('weight') ||
    m.includes('night sweat') ||
    m.includes('sweat') ||
    m.includes('fever')
  ) {
    return "Clothes fit looser months now — not proud 'cut' vibes, more wasted. Night sweats ruin sheets several nights weekly. Daytime low-grade fevers maybe — flushes near the grill at work."
  }
  if (m.includes('cough') || m.includes('breath') || m.includes('lung')) {
    return "Cough drags on months — tight chest walking fast. Not coughing blood I've noticed. Pulse ox a little low at check-in which scared me carrying trays isn't supposed to wind me."
  }
  if (
    m.includes('mouth') ||
    m.includes('thrush') ||
    m.includes('white') ||
    m.includes('tongue')
  ) {
    return "White patches in mouth scrape off leaving sore spots — metallic gross taste. Spicy shift leftovers sting. Thought dehydration first; not improving obviously."
  }
  if (
    m.includes('infection') ||
    m.includes('sick often') ||
    m.includes('immune')
  ) {
    return "I've had repeat crap — sinus junk, a boil, thrush now — like immune system quit. Coworkers bounce back faster from colds. One antibiotic course I didn't finish because broke; dumb."
  }
  if (
    m.includes('sex') ||
    m.includes('partner') ||
    m.includes('hiv') ||
    m.includes('sti')
  ) {
    return "I've slept with men sometimes receptive, condoms inconsistent honest. Never tested HIV — coward excuses about stigma paperwork. No needles — restaurant knives only occupational hazard jokes."
  }
  if (m.includes('chill') || m.includes('shake')) {
    return "Occasional teeth chatter with fever spikes but sweats dominate story more. Blankets paradoxically comfort then overheat me — Goldilocks nonsense."
  }
  if (m.includes('headache') || m.includes('head')) {
    return "Pressure headaches intermittent — not classic aura migraines. Neck stress tension sometimes stiff; not meningitis TV stiffness dominating."
  }
  if (m.includes('travel') || m.includes('tb') || m.includes('exposure')) {
    return "No travel. Coworker did jail years ago — TB crossed my mind reading internet garbage. Health department TB test for restaurant card was negative last year."
  }
  if (m.includes('nausea') || m.includes('appetite') || m.includes('eating')) {
    return "Food gross most days — nausea waves. Maybe fifteen pounds off ballpark afraid to weigh exact. Smell of fryer sometimes triggers gag reflex lately."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long')) {
    return "Cough months creeping; thrush weeks obvious; sweats escalating last month. Finally came after winded carrying dish bins stairs — panic clarity moment."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Naproxen as needed back pain. Tried nystatin mouth rinse urgent care — mild maybe. No HIV meds because never diagnosed — avoidance bite me probably."
  }
  if (m.includes('family') || m.includes('relative')) {
    return "Mom lupus autoimmune — crosses mind maybe related. Dad heart stuff. Family doesn't chat STI topics at Thanksgiving honestly."
  }
  if (m.includes('urin') || m.includes('uti')) {
    return "Peeing fine — no fire bladder infection feeling. Kidney flank pain not feature — fatigue cough mouth grossness are the headlines."
  }
  if (m.includes('help') || m.includes('better')) {
    return "Propped sleep helps cough some. Humidifier nights minor ease. Rest days rare because rent — when I get one I feel slightly human until sweats return."
  }
  if (m.includes('worse') || m.includes('heat') || m.includes('work')) {
    return "Kitchen heat and smoke worsen cough stamina. Long closes destroy me home shaky-legged. Stress about money spikes palpitations sweaty palms annoying."
  }
  if (m.includes('cancer') || m.includes('tuberculosis') || m.includes('worry')) {
    return "Brain spirals TB cancer sarcoid WebMD roulette — uncle died lung cancer young haunts me. Need facts because guessing destroying sleep worse than shifts."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — losing weight, chronic cough, night sweats, thrush, frequent infections, never tested HIV, restaurant cook ashamed and scared."
  }
  return REPLY_CLARIFY
}

function emmaMeningitisKeywords(input: string): string {
  const m = input
  if (m.includes('headache') || m.includes('head pain') || m.includes('head hurt')) {
    return "Headache exploded this morning — worst ever, pressure everywhere especially occipital. Jostling kills me — roommate drove because walking bounced pain unbearably."
  }
  if (
    m.includes('neck') ||
    m.includes('stiff') ||
    m.includes('mening') ||
    m.includes('rigidity')
  ) {
    return "Neck stiff like board — can't touch chin to chest without agony. Turning side to side nearly impossible. Roommate thought drama until she saw me wince trying."
  }
  if (m.includes('light') || m.includes('photo') || m.includes('bright')) {
    return "Lights are torture — wore sunglasses in waiting area. Phone lowest brightness still stings. Fluorescent buzz spikes anxiety tied with headache vicious loop."
  }
  if (m.includes('fever') || m.includes('temperature') || m.includes('chill')) {
    return "Feeling burning feverish with chills layering hoodie weird. Nurse looked concerned at triage vitals — numbers blurred because I couldn't focus reading screen."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw')) {
    return "Nausea constant — dry-heaved triage bathroom bitter taste. Water sips mostly fail staying down — movement triggers gag hard."
  }
  if (m.includes('confus') || m.includes('think') || m.includes('orient')) {
    return "Mentally fuzzy — lost day momentarily, repeating myself roommate says. Pre-med usually sharp; this wrong feeling terrifies career-identity ironic stress."
  }
  if (
    m.includes('rash') ||
    m.includes('petech') ||
    m.includes('purple') ||
    m.includes('spots')
  ) {
    return "Tiny purple pin dots ankles calves post-shower — maybe razor maybe not — doesn't itch. No giant hives allergic pattern; scared because meningitis articles mention rashes."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long') || m.includes('onset')) {
    return "Catastrophe escalated over few morning hours — yesterday dragged URI-ish today nightmare headache neck. Can't pin exact minute — fuzzy — worsened fast enough to scare."
  }
  if (m.includes('dorm') || m.includes('college') || m.includes('contact')) {
    return "Dorm life crowded bathrooms weekend parties — friend 'bad cold' recently vague. Kissed someone Friday casually; feels irrelevant but you asked exposures maybe."
  }
  if (m.includes('travel') || m.includes('trip')) {
    return "No flights recently — campus bubble finals crunch. Hometown visit month ago healthy. No tropical adventures since childhood Disney nothing helpful."
  }
  if (m.includes('med') || m.includes('vaccine') || m.includes('shot')) {
    return "Birth control daily. Ibuprofen midterm weeks occasional. Missed meningitis booster sophomore — long clinic lines procrastination haunting irony now anxious."
  }
  if (m.includes('family') || m.includes('relative')) {
    return "Dad migraines — different beast without fever stiffness. Mom thyroid autoimmune. Brother concussion sports unrelated. No known complement disorders."
  }
  if (m.includes('cough') || m.includes('cold') || m.includes('uri')) {
    return "Mild sniffle week — nothing impressive until today's neurological horror overshadows. Not productive pneumonia cough dominating history."
  }
  if (m.includes('urin') || m.includes('uti')) {
    return "Peeing normal — no burning. Period timing maybe irrelevant. Not kidney stone classic flank — misery cephalic cervical giant headline."
  }
  if (m.includes('weight') || m.includes('appetite')) {
    return "No chronic weight loss — appetite zero today nausea only. Usually stable athlete. Energy crater sudden unlike prior healthy baseline."
  }
  if (m.includes('help') || m.includes('better')) {
    return "Dark quiet room helps photophobia little bit — still hurts. Cold forehead pack numbs seconds maybe. Anti-nausea not fully working or anxiety overwhelming — unsure which."
  }
  if (m.includes('worse') || m.includes('movement') || m.includes('trigger')) {
    return "Any movement, light, loud talking worsens. Neck flexion brutal. Crying about finals stress ironically intensifies head pounding — vicious emotionally."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — sudden worst headache, stiff painful neck, lights kill me, fever nausea confusion maybe, scared spots legs — need help fast."
  }
  return REPLY_CLARIFY
}

export const infectiousDiseaseKeywordHandlers: Record<string, (input: string) => string> = {
  'sepsis-pyelo-shaking-lauren-mitchell': laurenSepsisPyeloKeywords,
  'endocarditis-fever-michael-perez': michaelEndocarditisKeywords,
  'malaria-return-travel-david-khan': davidMalariaKeywords,
  'hiv-opportunistic-cough-jason-reed': jasonHivOppKeywords,
  'bacterial-meningitis-neck-emma-rodriguez': emmaMeningitisKeywords,
}
