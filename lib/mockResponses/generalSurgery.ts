const REPLY =
  "Sorry — could you ask that a little differently? I want to answer what you mean."

function herniaKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I've had this groin lump for years, but today it got hard and really painful after lifting. I can't push it back in anymore and I'm nauseous."
  }
  if (m.includes('lump') || m.includes('bulge') || m.includes('groin')) {
    return "It's been a squishy bulge in my right groin forever — usually I can shove it back watching TV. Today after pallets it's rock hard and won't go back in."
  }
  if (m.includes('reduce') || m.includes('push') || m.includes('tuck')) {
    return "Normally I can lie down and gently push it back — not today. I've tried for hours and it just hurts worse."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "It's a steady gnawing pain in the groin — worse if I cough or move wrong. Not the best pain I've ever had, honestly."
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw')) {
    return "I'm queasy — haven't had a huge vomit yet, but I'm spitting bile taste. Scared it's kinking something."
  }
  if (m.includes('fever') || m.includes('temperature') || m.includes('chills')) {
    return "I feel warm and a little clammy — not a blazing flu, but something's off."
  }
  if (m.includes('lift') || m.includes('work') || m.includes('warehouse') || m.includes('boxes')) {
    return "I lift boxes all day at the warehouse — today I moved heavy pallets and that's when this blew up."
  }
  if (m.includes('bowel') || m.includes('stool') || m.includes('poop') || m.includes('gas')) {
    return "I did have some gas earlier, but I'm worried because nothing feels normal down there now — I'm watching for bloating."
  }
  if (m.includes('surgery') || m.includes('operation') || m.includes('repair')) {
    return "I've never had a hernia repaired — I've been ignoring doctors about it for years, which was stupid."
  }
  if (m.includes('testicle') || m.includes('scrotum') || m.includes('ball')) {
    return "The pain is more in the groin bulge than the testicle, but everything feels miserable — I'm not sure what's what."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('blood pressure') || m.includes('diabetes')) {
    return "I'm on BP and diabetes meds — I'm bad about taking them regularly, I'll admit that."
  }
  if (m.includes('family')) {
    return "My brother had a hernia surgery — my dad died of a heart thing, not related."
  }
  if (m.includes('when') || m.includes('start') || m.includes('timing')) {
    return "It went bad suddenly this afternoon — not slowly over a week."
  }
  if (m.includes('walk') || m.includes('move')) {
    return "I'm walking like a cowboy trying not to jostle it — every step is cautious."
  }
  if (m.includes('help') || m.includes('better') || m.includes('worse')) {
    return "Lying still helps a tiny bit — trying to force it back in makes it worse."
  }
  return REPLY
}

function cholecystitisKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I had this awful upper belly thing after lunch and now the pain moved under my right ribs. I'm throwing up and running a fever."
  }
  if (m.includes('meal') || m.includes('fat') || m.includes('eat') || m.includes('food')) {
    return "We had a greasy team lunch — heavy stuff I usually tolerate. Within an hour I was bloated, then the pain slid to the right side."
  }
  if (m.includes('pain') || m.includes('ruq') || m.includes('right')) {
    return "It started in the middle upper stomach and migrated under my right ribs — sharp pressure. Hurts worse when I take a deep breath."
  }
  if (m.includes('murphy') || m.includes('breath') || m.includes('inhale')) {
    return "When the doctor pressed under my ribs and told me to breathe in, I couldn't finish — it felt like a trap snapping shut."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "I've vomited twice — nausea is constant. Even water sounds gross."
  }
  if (m.includes('fever') || m.includes('chills')) {
    return "I've got chills and felt feverish — coworker thermometer said around 101."
  }
  if (m.includes('chest') || m.includes('heart')) {
    return "It's not my classic 'heart squeezing' fear — it's under the ribs and food-related, though I did worry briefly."
  }
  if (m.includes('bowel') || m.includes('stool') || m.includes('diarrhea')) {
    return "No crazy diarrhea story — last stool yesterday seemed normal before this mess."
  }
  if (m.includes('surgery') || m.includes('pregnancy') || m.includes('c-section')) {
    return "I had a C-section years ago — not sure if scars matter but that's my surgical history."
  }
  if (m.includes('med') || m.includes('ibuprofen') || m.includes('nsaid')) {
    return "I take occasional ibuprofen for tension headaches — not a huge daily NSAID person."
  }
  if (m.includes('family') || m.includes('gall')) {
    return "My mom had her gallbladder out — so yeah, I knew this was in the family bingo card."
  }
  if (m.includes('when') || m.includes('timing')) {
    return "It built over a few hours after lunch — not weeks of gradual stuff."
  }
  if (m.includes('jaundice') || m.includes('yellow') || m.includes('urine')) {
    return "I don't think I'm yellow — urine looks fairly normal, not tea-colored."
  }
  if (m.includes('walk') || m.includes('movement')) {
    return "Walking jostles it — I'm hunched like I'm protecting my side."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Side lying helps a little — fatty food was obviously the trigger looking back."
  }
  return REPLY
}

function sboKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — my belly keeps blowing up like a drum and I'm cramping and vomiting. I haven't had a bowel movement or passed gas in a couple days."
  }
  if (m.includes('disten') || m.includes('swell') || m.includes('bloat')) {
    return "My abdomen is getting tighter and bigger — looks pregnant, embarrassing. Shirt buttons rebel."
  }
  if (m.includes('vomit') || m.includes('nausea')) {
    return "I'm throwing up greenish stuff — nausea is constant. Water even feels risky sometimes."
  }
  if (m.includes('bowel') || m.includes('stool') || m.includes('constipation') || m.includes('gas') || m.includes('fart')) {
    return "Nothing's moving out — no gas, no stool since before yesterday morning. That's what scares me most."
  }
  if (m.includes('surgery') || m.includes('scar') || m.includes('appendix') || m.includes('gallbladder')) {
    return "I've had abdominal surgeries years ago — appendix out, gallbladder out. Mechanics banter was always 'you'll get adhesions' and I ignored it."
  }
  if (m.includes('pain') || m.includes('cramp')) {
    return "Crampy waves that come and go — between waves I'm still miserable, just slightly less."
  }
  if (m.includes('fever')) {
    return "Maybe a little warm — not raging. More tachycardic feeling from distress."
  }
  if (m.includes('laxative') || m.includes('enema')) {
    return "My wife gave me some herbal laxative tea — huge mistake, cramps got worse. Don't tell her I said that."
  }
  if (m.includes('sound') || m.includes('gurgle')) {
    return "High-pitched gut sounds like a horror movie — my grandson laughed nervously because he didn't know what else to do."
  }
  if (m.includes('appetite') || m.includes('eat')) {
    return "Food is off the table mentally — sips of water only."
  }
  if (m.includes('med') || m.includes('aspirin')) {
    return "I take aspirin sometimes for cardiac advice from my doctor — small dose."
  }
  if (m.includes('family') || m.includes('cancer')) {
    return "My dad had colon cancer later in life — different fear package floating in my head."
  }
  if (m.includes('when') || m.includes('timing')) {
    return "The distention built over about two days — vomiting worse since yesterday."
  }
  if (m.includes('walk') || m.includes('move')) {
    return "I walk hunched like I'm 95 — rolling in bed moaned dramatic soap opera style."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Nothing truly helps — big gulps of fluid seemed to amp cramps, lesson learned."
  }
  return REPLY
}

function perirectalKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I've got this awful pain near my rectum and I can barely sit. I've had a fever and it keeps getting worse over a few days."
  }
  if (m.includes('sit') || m.includes('pressure')) {
    return "Sitting is torture — feels like I'm sitting on a golf ball made of fire. Driving my route became impossible."
  }
  if (m.includes('pain') || m.includes('bottom') || m.includes('rectum') || m.includes('butt')) {
    return "It's a throbbing pain on one side near my anus — deep, not just skin surface. Worse with pressure."
  }
  if (m.includes('fever') || m.includes('chills')) {
    return "Fevers and chills are riding along — I cranked the truck heater like irony."
  }
  if (m.includes('bowel') || m.includes('stool') || m.includes('blood')) {
    return "BM this morning hurt like razors — a little bright blood on the paper freaked me out."
  }
  if (m.includes('belly') || m.includes('abdomen') || m.includes('stomach')) {
    return "My belly itself isn't the main drama — it's localized butt cheek hell, thankfully? if that's the word."
  }
  if (m.includes('swelling') || m.includes('lump') || m.includes('mass')) {
    return "There's a hot swollen area — feels squishy-awful — I'm embarrassed describing it."
  }
  if (m.includes('hemorrhoid')) {
    return "My brother joked hemorrhoid creams at Christmas — insult to injury — this feels infect-y-hot not just hemorrhoid annoyance."
  }
  if (m.includes('surgery')) {
    return "No prior butt surgery — virgin territory for this kind of problem, humiliating sentence."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Nothing regular — Tylenol for fever attempt."
  }
  if (m.includes('family') || m.includes('crohn') || m.includes('ibd')) {
    return "Cousin has Crohn's — my brain spiraled Google worst-case, probably unfair."
  }
  if (m.includes('sex') || m.includes('sti')) {
    return "Monogamous years — STI lectures unwelcome but I get why you'd ask."
  }
  if (m.includes('when') || m.includes('timing')) {
    return "Four-day ramp — worse today with pressure feeling like it's going to burst."
  }
  if (m.includes('walk') || m.includes('move')) {
    return "Walking stiff cowboy style — unconscious cheek clench embarrassing."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Side lying slightly less evil — sitting and truck vibration worst."
  }
  return REPLY
}

function perforatedKeywords(input: string): string {
  const m = input.toLowerCase()
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Help — my whole abdomen turned into a board suddenly after I lifted at work. I feel like I'm going to pass out."
  }
  if (m.includes('pain') || m.includes('severe') || m.includes('sudden')) {
    return "Pain was lightning — started sharp and spread everywhere in minutes. Rigid like granite— I can't soften my belly."
  }
  if (m.includes('nsaid') || m.includes('ibuprofen') || m.includes('advil') || m.includes('med')) {
    return "I live on ibuprofen for my back — construction wear and tear, stupid masculine pride, never got scoped."
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "Nausea and dry heaving — nothing left to come up."
  }
  if (m.includes('dizzy') || m.includes('lightheaded') || m.includes('blood pressure')) {
    return "Lightheaded — BP cuff in triage felt scary low vibes — wife insisted Uber, I should've called 911."
  }
  if (m.includes('fever') || m.includes('temperature')) {
    return "Mild temp maybe — but I'm clammy cold sweats more than hot."
  }
  if (m.includes('trauma') || m.includes('lift') || m.includes('fall')) {
    return "No big fall — snapped pain while lifting a truss, dramatic timing."
  }
  if (m.includes('chest') || m.includes('heart')) {
    return "Not classic left arm clutch — this is belly rigidity apocalypse — though cardiac fear flickered unfair."
  }
  if (m.includes('bowel') || m.includes('stool')) {
    return "Bowel story irrelevant noise — global belly catastrophe primary."
  }
  if (m.includes('surgery')) {
    return "No stomach operations — childhood appendix ancient history."
  }
  if (m.includes('family') || m.includes('ulcer')) {
    return "Uncle had bleeding ulcer family reunion warning lore — ignored arrogance."
  }
  if (m.includes('when') || m.includes('timing')) {
    return "Seconds to minutes spread — not gradual months."
  }
  if (m.includes('walk') || m.includes('move')) {
    return "Walking collapsed shuffle — wife half carrying shame hidden sunglasses tears."
  }
  if (m.includes('touch') || m.includes('rebound') || m.includes('rigid')) {
    return "Even sheets brushing hurts — abdomen won't relax voluntarily."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Nothing helps — fetal curl is placebo illusion."
  }
  return REPLY
}

export const generalSurgeryKeywordHandlers: Record<string, (input: string) => string> = {
  'incarcerated-hernia-groin-lump-frank': herniaKeywords,
  'acute-cholecystitis-ruq-maria-torres': cholecystitisKeywords,
  'small-bowel-obstruction-distention-richard-hayes': sboKeywords,
  'perirectal-abscess-sit-pain-kevin-morris': perirectalKeywords,
  'perforated-ulcer-rigid-walter-green': perforatedKeywords,
}
