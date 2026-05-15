const REPLY_CLARIFY =
  "I'm not totally sure what you mean — could you ask that a different way? I want to answer the right thing."

function springAllergicRhinitisKeywords(input: string): string {
  const m = input

  if (m.includes('sneez') || m.includes('runny') || m.includes('nose') || m.includes('rhin')) {
    return "Yeah, I'm sneezing constantly and my nose won't stop running — it's clear stuff, not gross green. My friends joke that I should wear a tissue box on my head. It's been like this for weeks and it's worse outside."
  }
  if (m.includes('eye') || m.includes('itch') && m.includes('water')) {
    return "My eyes are super itchy and watery — I keep rubbing them which probably makes them redder. No goop or infection stuff, just tears when I sneeze. Sunglasses help a little outdoors."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long') || m.includes('onset')) {
    return "I'm not totally sure of the exact day, but about three weeks ago it got bad. It seems to flare whenever I'm outside for a while, especially after school and at soccer. Last spring was basically the same story."
  }
  if (m.includes('worse') || m.includes('trigger') || m.includes('soccer') || m.includes('outside')) {
    return "Definitely worse outdoors — soccer practice is brutal. Indoors with the AC on I feel a little better, which is weird. Pollen or whatever is in the air seems to get me."
  }
  if (m.includes('better') || m.includes('help') || m.includes('relief')) {
    return "Being inside helps some, and cool air calms my nose a bit. Nothing makes it disappear completely though. I haven't found a medicine that really fixes it."
  }
  if (m.includes('fever') || m.includes('ache') || m.includes('chills') || m.includes('flu')) {
    return "No fever or body aches — I don't feel like I have a real cold. It's mostly sneezing, congestion, and itchy eyes driving me crazy."
  }
  if (m.includes('green') || m.includes('thick') || m.includes('pus') || m.includes('purulent')) {
    return "No, it's clear and watery, not thick green stuff like when my brother had a sinus infection. That's actually why I wasn't sure it was a regular infection."
  }
  if (m.includes('cough') || m.includes('wheez') || m.includes('breath')) {
    return "Not really short of breath — I mouth-breathe at night when I'm stuffed up, but no wheezing that I've noticed. It's more nose and eyes than lungs."
  }
  if (m.includes('before') || m.includes('last spring') || m.includes('previous') || m.includes('similar')) {
    return "Yeah, last spring was almost identical — sneezing, itchy eyes, same timing when everything bloomed. I hoped I'd grow out of it but here we are again."
  }
  if (m.includes('allerg') || m.includes('test')) {
    return "Nobody's ever tested me for allergies officially. My mom gets hay fever in spring too so we figured it's that. I don't know specific triggers by name."
  }
  if (m.includes('family') || m.includes('mom') || m.includes('dad')) {
    return "My mom gets sneezy in spring — she calls it hay fever. My dad's fine. No one mentioned asthma for me."
  }
  if (m.includes('med') || m.includes('take') || m.includes('tried')) {
    return "Just tissues and sometimes saline spray from the store. Helps for like ten minutes. No prescription stuff yet."
  }
  if (m.includes('sleep') || m.includes('school')) {
    return "Sleep's okay — stuffy nose in the morning. School's annoying when I'm sneezing in class; on the field it's worse because I'm outside."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — sorry if I sneeze on you. I've been miserable for weeks with this nose and these itchy eyes."
  }
  return REPLY_CLARIFY
}

function peanutAnaphylaxisKeywords(input: string): string {
  const m = input

  if (m.includes('eat') || m.includes('food') || m.includes('peanut') || m.includes('thai') || m.includes('meal')) {
    return "I had Pad Thai at a restaurant maybe fifteen minutes ago. I think there was peanut in the sauce — I didn't ask. I had a reaction to peanuts when I was little but I thought I was fine now. I'm really scared."
  }
  if (m.includes('lip') || m.includes('throat') || m.includes('swallow') || m.includes('tongue')) {
    return "My lips feel huge and tingly, and my throat feels tight like I can't swallow right. My voice sounds hoarse. It's terrifying — I've never felt this in my throat before."
  }
  if (m.includes('hive') || m.includes('rash') || m.includes('itch') || m.includes('skin')) {
    return "I'm covered in raised itchy bumps that came up super fast. My face is flushed and hot. It feels like my whole skin is on fire underneath."
  }
  if (m.includes('breath') || m.includes('wheez') || m.includes('air')) {
    return "I feel short of breath and I hear a little wheeze when I breathe out. I can still talk but it's harder than normal and that panics me more."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long') || m.includes('ago')) {
    return "Like fifteen minutes ago — right after I finished eating. It went from 'my mouth feels weird' to this in minutes. That's why I'm so frightened."
  }
  if (m.includes('dizz') || m.includes('faint') || m.includes('lighthead') || m.includes('pressure')) {
    return "I feel dizzy and like I might pass out. My heart is pounding — the nurse said my blood pressure was low and that freaked me out more."
  }
  if (m.includes('allerg') || m.includes('before') || m.includes('child')) {
    return "Peanuts made my lips swell when I was a kid — we avoided them for years. I haven't eaten peanuts on purpose in a long time. Tonight might have been hidden in the food."
  }
  if (m.includes('panic') || m.includes('anxious') || m.includes('stress')) {
    return "I'm panicking, yeah — but this isn't just nerves. My lips are swelling and I can't swallow normally. Something is physically wrong and I know it."
  }
  if (m.includes('fever') || m.includes('sick') || m.includes('cold')) {
    return "No fever — I felt fine before dinner. This hit right after food, not like a gradual illness."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "I feel nauseous but haven't thrown up. My stomach is upset but the throat and skin stuff is worse."
  }
  if (m.includes('med') || m.includes('epi') || m.includes('inhaler')) {
    return "I don't take regular meds. We don't have an EpiPen anymore because I thought I outgrew it — maybe that was a mistake."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Please — I ate something and my throat and lips are swelling. I need help."
  }
  return REPLY_CLARIFY
}

function cvidRecurrentInfectionsKeywords(input: string): string {
  const m = input

  if (m.includes('ear') || m.includes('otitis')) {
    return "About eight ear infections in the last year — we've lost count of the antibiotics. His pediatrician said that's way too many. Sometimes we need stronger medicine."
  }
  if (m.includes('pneumonia') || m.includes('lung') || m.includes('chest infection')) {
    return "Three pneumonias in two years — one needed a hospital night for oxygen. That's what really pushed us to immunology. Chest X-rays keep showing something from old infections."
  }
  if (m.includes('sinus') || m.includes('nasal') || m.includes('congestion')) {
    return "Constant sinus problems between the big infections — green drainage, snoring, mouth breathing at night. Antibiotics help partly then it comes back."
  }
  if (m.includes('recover') || m.includes('antibiotic') || m.includes('slow')) {
    return "He never bounces back quickly like other kids. A cold that takes them three days takes him weeks. We're on antibiotics more than I want to admit."
  }
  if (m.includes('weight') || m.includes('growth') || m.includes('small') || m.includes('gain')) {
    return "He's always been small for his age — slow weight gain on the growth charts. He eats when he's well but he's thin and we're worried."
  }
  if (m.includes('school') || m.includes('miss') || m.includes('absent')) {
    return "He misses a lot of school — fevers, ear pain, pneumonia recovery. His teacher knows him as the kid who's always out sick."
  }
  if (m.includes('family') || m.includes('uncle') || m.includes('immune')) {
    return "My brother has some immune problem — he's on special treatment. The pediatrician said that family history matters and sent us here."
  }
  if (m.includes('asthma') || m.includes('allerg')) {
    return "No asthma diagnosis, no food allergies we know of. It's bacterial infections over and over, not wheezing between illnesses."
  }
  if (m.includes('hospital') || m.includes('er') || m.includes('admit')) {
    return "One pneumonia needed a hospital night for oxygen last winter. Otherwise ER visits for high fevers with ears — never ICU, thank God."
  }
  if (m.includes('today') || m.includes('right now') || m.includes('currently')) {
    return "Today he's okay between flares — low-grade temp, lungs clear on exam. We're here because the pattern over years is the problem."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Antibiotics when he's infected — lately amoxicillin-clavulanate. Multivitamin. No immune treatments yet."
  }
  if (m.includes('infection') || m.includes('sick') || m.includes('often')) {
    return "It feels constant — ears, lungs, sinuses. We can't go more than a few weeks without another course of antibiotics. Something's not right with how he fights infection."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm Noah's mom. We're here because he keeps getting serious infections and we're scared something's wrong with his immune system."
  }
  return REPLY_CLARIFY
}

function exerciseInducedAsthmaKeywords(input: string): string {
  const m = input

  if (m.includes('run') || m.includes('exercise') || m.includes('practice') || m.includes('track')) {
    return "It hits about ten minutes into a hard run or intervals — warm-up is fine, then chest tightness and I can't keep pace. Stopping and walking helps over five or ten minutes. My coach thinks I'm slacking but I'm not."
  }
  if (m.includes('chest') || m.includes('tight') || m.includes('pressure')) {
    return "It's a squeezing tightness in my chest, not sharp pain. No pain at rest sitting in class — only when I'm pushing hard running."
  }
  if (m.includes('cough') || m.includes('wheez')) {
    return "I cough a lot after sprints — sometimes twenty minutes. I hear a faint wheeze breathing out after practice. A friend's inhaler once helped which was kind of telling."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long') || m.includes('month')) {
    return "About six months — started mid-season last year and never left. Only happens with hard running, not walking around school."
  }
  if (m.includes('better') || m.includes('rest') || m.includes('relief')) {
    return "Rest fixes it — if I stop running it eases up. I haven't passed out or needed the ER. Using albuterol once opened my chest up fast."
  }
  if (m.includes('worse') || m.includes('cold') || m.includes('trigger')) {
    return "Cold dry outdoor track air was awful. All-out sprints worse than easy days. Stress before meets doesn't help either."
  }
  if (m.includes('family') || m.includes('mom') || m.includes('asthma')) {
    return "My mom has asthma — uses an inhaler when she gets sick. Nobody said I have asthma officially yet."
  }
  if (m.includes('faint') || m.includes('syncope') || m.includes('pass out')) {
    return "Never fainted. I stop before anything that scary. No chest pain just sitting around."
  }
  if (m.includes('fever') || m.includes('pneumonia') || m.includes('infection')) {
    return "No fever or pneumonia — this is tied to running, not being sick. Lungs feel fine when I'm not exercising."
  }
  if (m.includes('shape') || m.includes('condition') || m.includes('coach') || m.includes('fit')) {
    return "I train six days a week — I'm not out of shape. Times were improving before this. Coach doesn't get how hard it hits me."
  }
  if (m.includes('med') || m.includes('inhaler')) {
    return "No regular meds. Borrowed a friend's albuterol once after practice and it helped a lot — I don't have my own prescription."
  }
  if (m.includes('breath') || m.includes('shortness')) {
    return "Short of breath during hard practice — not at rest. Like I can't get enough air when I'm sprinting even though I'm trained."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I'm here because I get winded and tight-chested when I run and my coach thinks I'm out of shape."
  }
  return REPLY_CLARIFY
}

function atopicDermatitisKeywords(input: string): string {
  const m = input

  if (m.includes('itch') || m.includes('scratch')) {
    return "She itches constantly — scratches until she bleeds sometimes. We hear her rubbing the sheets at 2 a.m. It's the worst part, worse than how it looks."
  }
  if (m.includes('where') || m.includes('location') || m.includes('elbow') || m.includes('knee')) {
    return "Mostly inside her elbows and behind her knees — the bendy spots. Sometimes her neck. Not really face except bad flares."
  }
  if (m.includes('long') || m.includes('when') || m.includes('start') || m.includes('chronic') || m.includes('year')) {
    return "Years — since toddlerhood. Not new. Some months better but never fully gone in those creases."
  }
  if (m.includes('winter') || m.includes('shower') || m.includes('bath') || m.includes('hot') || m.includes('worse')) {
    return "Winter is terrible with dry heat indoors. Hot baths make her pink and itchier — we do lukewarm quick showers now but she still flares."
  }
  if (m.includes('sleep') || m.includes('night')) {
    return "Sleep is a disaster — she wakes scratching. We've tried gloves and thick cream. My wife and I take turns calming her."
  }
  if (m.includes('dry') || m.includes('lotion') || m.includes('moistur')) {
    return "Skin's always dry with little flakes — we lotion twice daily but it comes back. Doctor said barrier cream helps but she still flares."
  }
  if (m.includes('crust') || m.includes('pus') || m.includes('fever') || m.includes('infection') || m.includes('impetigo')) {
    return "No honey crust or pus lately, no fever. When she scratches open we watch for infection but it's been dry scabs not impetigo."
  }
  if (m.includes('ring') || m.includes('fungus') || m.includes('tinea')) {
    return "It's not ring-shaped — patchy red dry areas in the folds. Urgent care said it didn't look like ringworm."
  }
  if (m.includes('anyone else') || m.includes('household') || m.includes('scabies') || m.includes('contact')) {
    return "No one else at home is itchy — her brother's fine. We wondered scabies but no burrows and no spread to us."
  }
  if (m.includes('family') || m.includes('asthma') || m.includes('allerg')) {
    return "I have asthma — inhaler when needed. My wife has seasonal allergies. Family atopy but only Olivia has this rash."
  }
  if (m.includes('med') || m.includes('cream') || m.includes('steroid') || m.includes('drug')) {
    return "No new medicines. Store hydrocortisone and heavy moisturizers — nothing prescription that's stuck long-term."
  }
  if (m.includes('look') || m.includes('describe') || m.includes('rash')) {
    return "Red patches in the folds, scratch marks, skin a little thickened where she rubs. Dry overall — not blistery, not rings."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm Olivia's dad. She scratches all night and this rash behind her knees and elbows won't go away."
  }
  return REPLY_CLARIFY
}

export const allergyImmunologyKeywordHandlers: Record<string, (input: string) => string> = {
  'spring-allergic-rhinitis': springAllergicRhinitisKeywords,
  'peanut-anaphylaxis': peanutAnaphylaxisKeywords,
  'cvid-recurrent-infections': cvidRecurrentInfectionsKeywords,
  'exercise-induced-asthma': exerciseInducedAsthmaKeywords,
  'atopic-dermatitis-eczema': atopicDermatitisKeywords,
}
