const REPLY_CLARIFY =
  "Could you ask that another way? I want to make sure I answer what you mean."

function croupLiamKeywords(input: string): string {
  const m = input
  if (m.includes('liam') && (m.includes('feel') || m.includes('hurt') || m.includes('say'))) {
    return "Liam mumbles: 'Bark in my throat. Scary when I breathe in.' Then he hides in my shirt."
  }
  if (
    m.includes('breath') ||
    m.includes('stridor') ||
    m.includes('noisy') ||
    m.includes('wheez') ||
    m.includes('lung')
  ) {
    return "It's this high whistling when he breathes in — worse if he cries. Barky cough like a seal, not like normal chest cold junk. I'm watching his ribs pull a little."
  }
  if (m.includes('cough') || m.includes('bark')) {
    return "The cough sounds harsh and tight — started overnight after a runny nose few days. Steamy bathroom didn't really change it much."
  }
  if (m.includes('fever') || m.includes('temperature') || m.includes('hot')) {
    return "He's warm, low-grade we'd guess — 100-something on our thermometer. Not the only thing scaring me though — it's the breathing noise."
  }
  if (m.includes('drool') || m.includes('choking') || m.includes('swallow') || m.includes('choke')) {
    return "No puddle drooling like those ER stories — he sips water. No choking on dinner, no sudden 'grab throat' moment we saw."
  }
  if (m.includes('cold') || m.includes('runny') || m.includes('daycare')) {
    return "Daycare's had snotty noses all week — he's had a drippy nose since maybe Wednesday. This breathing thing jumped harder last night."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long') || m.includes('night')) {
    return "Really bad after midnight — maybe 2 a.m. bark fest. Worse nights than days so far, if that helps timing-wise."
  }
  if (m.includes('sleep') || m.includes('tired')) {
    return "Nobody slept — he catnaps on me, startles awake coughing. I'm running on coffee fumes."
  }
  if (m.includes('eat') || m.includes('drink') || m.includes('appetite')) {
    return "Popsicle half eaten, toast skipped. He's drinking sips between coughs — not great, not zero."
  }
  if (m.includes('med') || m.includes('tylenol') || m.includes('medicine')) {
    return "Tylenol once for fever-ish feel — helped mood a tiny bit, not the noise. Honey once because he's over one. No antibiotics."
  }
  if (m.includes('pain') || m.includes('throat') || m.includes('hurt')) {
    return "He points throat 'little ow' when he swallows — but honestly the scary part is how he sounds breathing."
  }
  if (m.includes('diaper') || m.includes('pee') || m.includes('wet')) {
    return "Diapers still wet — we're not here for urine. It's the airway sound that freaked us out."
  }
  if (m.includes('family') || m.includes('history') || m.includes('sibling')) {
    return "His older sister had a bad croup-y night once years back and needed observation — maybe that primes my anxiety."
  }
  if (m.includes('activ') || m.includes('play')) {
    return "Zero toddler chaos today — clingy koala only. Usually even sick he'll try toys."
  }
  if (m.includes('worse') || m.includes('better') || m.includes('help')) {
    return "Crying makes it louder. Propped sleeping angle seems tiny bit easier than flat. Humidifier maybe placebo."
  }
  if (m.includes('vomit') || m.includes('throw up')) {
    return "Gagged once from coughing hard — not stomach bug vomiting on repeat."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — Maya, Liam's mom. Barky cough, noisy breathing in, low fever after a cold — I'm scared."
  }
  return REPLY_CLARIFY
}

function otitisAvaKeywords(input: string): string {
  const m = input
  if (
    m.includes('ava') &&
    (m.includes('say') || m.includes('she') || m.includes('daughter'))
  ) {
    return "Ava: 'Ear. Ow.' Points right side, then fusses."
  }
  if (m.includes('ear') || m.includes('pull')) {
    return "She keeps digging at her right ear — whines louder if I touch that side washing hair."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Fever-y off and on two days — 101-ish peak on our forehead scanner, not perfect science."
  }
  if (m.includes('sleep') || m.includes('night')) {
    return "Sleep's wrecked — up constantly, only calms in the rocker so long."
  }
  if (m.includes('eat') || m.includes('drink') || m.includes('bottle') || m.includes('appetite')) {
    return "Half the bottles she'd normally crush — distracted sips only. Favorite puree rejected dramatic."
  }
  if (m.includes('cold') || m.includes('runny') || m.includes('daycare')) {
    return "Thick daycare URI week — snot river before the ear drama escalated."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long')) {
    return "Ear grabbing maybe since yesterday afternoon heavy — fever parallelish timing blurry honest."
  }
  if (m.includes('swim') || m.includes('bath') || m.includes('pool')) {
    return "No pool lately — normal baths. We don't deep Q-tip ears since the nurse lecture."
  }
  if (m.includes('cough') || m.includes('breath')) {
    return "Lungs sound fine to my amateur mom ears — cough minimal. This is ear-meltdown central."
  }
  if (m.includes('vomit') || m.includes('diarrhea')) {
    return "Tiny spit-up once when fever peaked — not GI sick pattern mostly."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Tylenol last night — maybe bought us a calmer hour. No ear drops prescription yet."
  }
  if (m.includes('teeth') || m.includes('teething')) {
    return "Molars brewing maybe — but fever + ear grab seems more than gums only, I could be wrong."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Generally crabby pain vibe — not sharp knee boo-boo story she can explain."
  }
  if (m.includes('diaper') || m.includes('wet')) {
    return "Wet diapers still happening — hydration okayish despite eating trash."
  }
  if (m.includes('family') || m.includes('tubes') || m.includes('history')) {
    return "Older brother had tubes — family ear drama genetics maybe."
  }
  if (m.includes('activ') || m.includes('play')) {
    return "No playing — limp clingy potato on dad lap."
  }
  if (m.includes('worse') || m.includes('help')) {
    return "Warm washcloth outer ear minute relief. Nothing magic."
  }
  if (m.includes('describe') || m.includes('more') || m.includes('overall')) {
    return "Stressed dad version: post-URI fever, ear yanking, miserable toddler — worried infection versus something stuck."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — Jordan. Ava won't stop grabbing her ear, fever, awful after daycare cold."
  }
  return REPLY_CLARIFY
}

function dehyNoahKeywords(input: string): string {
  const m = input
  if (m.includes('diaper') || m.includes('wet') || m.includes('urine') || m.includes('pee')) {
    return "Way fewer wet diapers than normal — like two light ones since early morning, should be more. Urine darker maybe."
  }
  if (m.includes('vomit') || m.includes('throw')) {
    return "Pukes after most formula tries — projectile couple times. Nothing black-green scary I noticed."
  }
  if (m.includes('diarrhea') || m.includes('stool') || m.includes('poop')) {
    return "Runny diapers many times — lost count. No blood I saw, awful smell sorry."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Mild temps mostly 99s — not the headline versus dehydration vibe."
  }
  if (m.includes('drink') || m.includes('fluid') || m.includes('formula') || m.includes('breast')) {
    return "Pedialyte syringe battles — breast offer refused half time. Everything comes back up cyclically."
  }
  if (m.includes('sleep') || m.includes('letharg') || m.includes('alert')) {
    return "Floppy between cries — not tracking faces like usual bright baby scary difference."
  }
  if (m.includes('eye') || m.includes('tear') || m.includes('sunken')) {
    return "Eyes look sunken grandma said FaceTime — tears sparse when crying feels wrong."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long')) {
    return "Two days GI mess — vomiting first, diarrhea joined, today weakest."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "No recent antibiotics. Tylenol once — unclear helped."
  }
  if (m.includes('family') || m.includes('sick') || m.includes('sibling')) {
    return "Big sister same bug earlier this week already better — household gastro wave."
  }
  if (m.includes('pain') || m.includes('belly')) {
    return "Pulls knees gas pain vibes — not one spot screaming appendicitis movie."
  }
  if (m.includes('breath')) {
    return "Breathing faster when upset — not primary lung problem story in my head."
  }
  if (m.includes('daycare')) {
    return "Home with me today — sister school germ vector probably."
  }
  if (m.includes('blood') || m.includes('stool blood')) {
    return "No red blood stool — I stared paranoid."
  }
  if (m.includes('eat') || m.includes('appetite')) {
    return "Solids basically refused yesterday-today — gut hates everything."
  }
  if (m.includes('activ') || m.includes('play')) {
    return "No playing — wants held limp sack."
  }
  if (m.includes('formula') || m.includes('new food')) {
    return "Same formula weeks — did intro pea puree coincidence timing maybe irrelevant."
  }
  if (m.includes('worse') || m.includes('help')) {
    return "Vertical hold slightly calmer tiny bit — fluids won't stay down mostly."
  }
  if (m.includes('describe') || m.includes('more')) {
    return "Elena: 11-month-old vomiting diarrhea few wet diapers sunken eyes scary sleepy — ER felt right."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — Elena, Noah's mom. Barely wet diapers, vomiting diarrhea, very floppy."
  }
  return REPLY_CLARIFY
}

function kawasakiSophiaKeywords(input: string): string {
  const m = input
  if (
    m.includes('sophia') &&
    (m.includes('say') || m.includes('feel') || m.includes('daughter'))
  ) {
    return "Sophia: 'I'm so hot. My hands feel tight. Can we go home soon?'"
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "High fevers six days — Motrin Tylenol dance not keeping it down, spikes 103 still."
  }
  if (m.includes('rash') || m.includes('skin')) {
    return "Pink rash trunk spreading arms — not really itchy hives, more blotchy sick kid pattern."
  }
  if (m.includes('eye') || m.includes('red eye')) {
    return "Both eyes bloodshot without gunky bacterial pinkeye drainage I get myself sometimes."
  }
  if (m.includes('lip') || m.includes('mouth') || m.includes('tongue')) {
    return "Lips cracked corners raw — tongue bright red strawberry look horrifying mirror moment."
  }
  if (m.includes('hand') || m.includes('foot') || m.includes('swell')) {
    return "Hands feet puffy red — gloves-socks angry color, stiff feeling she complains vague."
  }
  if (m.includes('lymph') || m.includes('neck') || m.includes('node')) {
    return "Right neck lump tender — hurts turning head sideways."
  }
  if (/\bwhen\b/.test(m) || m.includes('how long')) {
    return "Fever day one thought virus — rash eyes mouth stack day three onward now day six panic."
  }
  if (m.includes('pain') || m.includes('throat')) {
    return "Says body tired achy — throat scratchy not classic strep screaming."
  }
  if (m.includes('cough') || m.includes('breath')) {
    return "Mild cough — oxygen fine home pulse ox toy. Not pneumonia centerpiece."
  }
  if (m.includes('eat') || m.includes('drink')) {
    return "Popsicles yes real food meh — pushing fluids worry."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Alternating acetaminophen ibuprofen per clinic handout — nothing stronger."
  }
  if (m.includes('school') || m.includes('daycare')) {
    return "Kindergarten — plenty classmates had colds week prior maybe red herring."
  }
  if (m.includes('vaccine') || m.includes('shot')) {
    return "Vaccines up to date including measles shots — still terrified obviously."
  }
  if (m.includes('family') || m.includes('history')) {
    return "No known weird autoimmune family except grandma thyroid cliché unrelated maybe."
  }
  if (m.includes('urine') || m.includes('pee') || m.includes('potty')) {
    return "Potty trained mostly — peeing less with sickness harder quantify busy worrying other stuff."
  }
  if (m.includes('sleep')) {
    return "Broken sleep fever sweat soaked pajamas laundry mountain."
  }
  if (m.includes('worse') || m.includes('help')) {
    return "Cool cloth skin soothing minute. Lights bother eyes little. Fever won't stay away."
  }
  if (m.includes('vomit')) {
    return "No vomiting — GI surprisingly quiet for how sick she looks."
  }
  if (m.includes('describe') || m.includes('more')) {
    return "Priya: prolonged fever rash mucous membrane freak show extremities — need real answers not Dr Google."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — Priya. Sophia's had high fevers days with rash red eyes mouth hands."
  }
  return REPLY_CLARIFY
}

function septicEthanKeywords(input: string): string {
  const m = input
  if ((m.includes('ethan') || m.includes('son')) && (m.includes('say') || m.includes('feel'))) {
    return "Ethan whispers: 'Stabbing when I try stand.' Then goes quiet."
  }
  if (m.includes('walk') || m.includes('limp') || m.includes('weight')) {
    return "Won't bear weight at all — I carried him in. Hip held funky bent like afraid straighten."
  }
  if (m.includes('pain') || m.includes('hip') || m.includes('leg')) {
    return "Pain deep hip groin area seven-year-old GPS — worse any movement even gentle."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "102.4 home — hot miserable chills Motrin shaved edge briefly."
  }
  if (m.includes('trauma') || m.includes('fall') || m.includes('injury')) {
    return "No obvious fall story he remembers — recess Friday normal chaos nothing acute witnessed."
  }
  if (/\bwhen\b/.test(m) || m.includes('yesterday')) {
    return "Started vague sore yesterday — today refusal walk morning school nurse called."
  }
  if (m.includes('joint') || m.includes('movement') || m.includes('range')) {
    return "Moving leg for exam scream territory — holds hip flexed slightly abducted like he's protecting it."
  }
  if (m.includes('strep') || m.includes('infection') || m.includes('antibiotic')) {
    return "Finished strep antibiotics month ago class outbreak — throat fine now weird maybe relevant."
  }
  if (m.includes('school') || m.includes('sport')) {
    return "Usually soccer obsessed — today zero interest movement terror."
  }
  if (m.includes('appetite') || m.includes('eat')) {
    return "Toast nibble appetite garbage fever."
  }
  if (m.includes('vomit') || m.includes('diarrhea')) {
    return "No GI symptoms — hip fever localization drama."
  }
  if (m.includes('rash')) {
    return "Skin clear besides skinned knee bandaid tan line joke."
  }
  if (m.includes('med') || m.includes('motrin')) {
    return "Ibuprofen this morning weight-based — scared repeat dose before doctor say."
  }
  if (m.includes('family') || m.includes('arthritis')) {
    return "No juvenile arthritis family lore — dad gout old man joke."
  }
  if (m.includes('sleep')) {
    return "Barely slept pain positioning fail."
  }
  if (m.includes('breath')) {
    return "Breathing normal — not why we're here."
  }
  if (m.includes('urine') || m.includes('pee')) {
    return "Peeing I think fine — pain distraction huge."
  }
  if (m.includes('worse') || m.includes('help')) {
    return "Ice pack rejected violently. Elevation slight less shriek maybe."
  }
  if (m.includes('describe') || m.includes('more')) {
    return "Chris: febrile kid sudden non-weight-bearing hip — terrified not 'growing pains' dismissal."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — Chris. Ethan won't walk, hip hurts bad, fever since today."
  }
  return REPLY_CLARIFY
}

export const pediatricsKeywordHandlers: Record<string, (input: string) => string> = {
  'croup-breathing-funny-liam-turner': croupLiamKeywords,
  'otitis-media-ear-ava-morris': otitisAvaKeywords,
  'gastroenteritis-dehydration-noah-garcia': dehyNoahKeywords,
  'kawasaki-rash-fever-sophia-patel': kawasakiSophiaKeywords,
  'septic-arthritis-limp-ethan-brooks': septicEthanKeywords,
}
