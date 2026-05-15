const REPLY_CLARIFY =
  "I'm not totally sure what you're asking — could you say it another way? I want to answer what you mean."

function gravesKeywords(input: string): string {
  const m = input
  if (m.includes('weight') || m.includes('appetite') || m.includes('eat') || m.includes('lose')) {
    return "I'm losing weight even though I eat constantly — bigger meals, snacks, everything. People at the gym think it's great but I didn't plan this and I'm scared."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "About three months — pants kept getting looser every week. Started subtle, now everyone comments."
  }
  if (m.includes('heat') || m.includes('sweat') || m.includes('hot') || m.includes('cold')) {
    return "I'm always hot — sweating during easy warm-ups, night sweats sometimes. Office AC and I'm still flushed."
  }
  if (m.includes('heart') || m.includes('palpitation') || m.includes('racing')) {
    return "Heart races during class — scary fast. Sometimes fluttery sitting at my desk grading meal plans."
  }
  if (m.includes('tremor') || m.includes('shake') || m.includes('sleep') || m.includes('insomnia')) {
    return "Hands shake holding water bottles. Sleep is awful — wake at 3 a.m. mind spinning."
  }
  if (m.includes('anxiety') || m.includes('mood') || m.includes('stress')) {
    return "Anxious and snappy — not my usual upbeat instructor vibe. Boyfriend says I'm wired tight."
  }
  if (m.includes('eye') || m.includes('neck') || m.includes('throat')) {
    return "Eyes look puffier in photos — coworker noticed. Neck feels full swallowing, not painful though."
  }
  if (m.includes('med') || m.includes('caffeine') || m.includes('coffee')) {
    return "One coffee, occasional pre-workout — nothing new. No prescriptions."
  }
  if (m.includes('family') || m.includes('thyroid')) {
    return "Mom had thyroid surgery — don't know details. Aunt has autoimmune issues."
  }
  if (m.includes('fever') || m.includes('sick')) {
    return "No fever or bad illness before this — felt fine until this spiral."
  }
  if (m.includes('urinat') || m.includes('thirst')) {
    return "Thirst from workouts mostly — not guzzling water nonstop like a diabetes story."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm losing weight while eating more and I feel shaky, hot, and exhausted but wired."
  }
  return REPLY_CLARIFY
}

function hashimotoKeywords(input: string): string {
  const m = input
  if (m.includes('tired') || m.includes('fatigue') || m.includes('exhaust')) {
    return "Exhausted all the time — nap after work and still drag through dinner. Tax season used to be fine; now I'm useless after 4 p.m."
  }
  if (m.includes('cold') || m.includes('heat') || m.includes('temperature')) {
    return "Always cold in the office — sweater when others are in short sleeves. Hands like ice."
  }
  if (m.includes('weight') || m.includes('gain')) {
    return "Up twelve pounds without changing diet much — face puffier, jeans tight."
  }
  if (m.includes('skin') || m.includes('hair') || m.includes('dry')) {
    return "Skin like sandpaper, lotion doesn't last. Ponytail thinner — more hair in the brush."
  }
  if (m.includes('constipation') || m.includes('bowel')) {
    return "Bowels every two to three days — sluggish, not bloody."
  }
  if (m.includes('mood') || m.includes('depress') || m.includes('concentrat') || m.includes('focus')) {
    return "Brain fog at work — miss decimals, have to triple-check. Mood low but I think it's because I'm wiped."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('long')) {
    return "Months — six to nine getting worse slowly. Thought stress until coworkers noticed."
  }
  if (m.includes('sleep') || m.includes('snore')) {
    return "Sleep eight hours, wake unrefreshed. Husband says I snore lightly — not gasping."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "Multivitamin only — no new meds. Extra coffee didn't help."
  }
  if (m.includes('family') || m.includes('thyroid')) {
    return "Sister on thyroid medicine for years. Mom never tested."
  }
  if (m.includes('chest') || m.includes('heart')) {
    return "No chest pain — watch shows heart rate fifties resting sometimes."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I'm always tired and cold and I can't focus at work anymore."
  }
  return REPLY_CLARIFY
}

function t1dmMotherKeywords(input: string): string {
  const m = input
  if (m.includes('water') || m.includes('drink') || m.includes('thirst')) {
    return "He drinks constantly — refills bottles all day. Never satisfied for long. That's the main thing that scared me."
  }
  if (m.includes('urinat') || m.includes('pee') || m.includes('bathroom') || m.includes('night')) {
    return "Pees all the time — wakes twice nightly. Teachers email that he leaves class for the bathroom."
  }
  if (m.includes('weight') || m.includes('thin') || m.includes('lose')) {
    return "Lost weight — clothes baggy, maybe eight pounds. Eats normal kid portions though."
  }
  if (m.includes('tired') || m.includes('fatigue') || m.includes('irritable') || m.includes('mood')) {
    return "Tired after school, irritable with his sister. Grades slipped a little — not like him."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('weeks')) {
    return "Several weeks to a month or two worsening — I blamed summer heat at first."
  }
  if (m.includes('fever') || m.includes('vomit') || m.includes('sick')) {
    return "No fever now — mild cold weeks ago. No vomiting today, breathing normal thank God."
  }
  if (m.includes('family') || m.includes('diabetes')) {
    return "Cousin type 1 at sixteen — that's in my head. No parents with diabetes."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "No regular meds — ibuprofen once for headache. No steroids."
  }
  if (m.includes('pain') || m.includes('belly') || m.includes('burn')) {
    return "No belly pain, no burning when he pees — just frequency."
  }
  if (m.includes('ryan') || m.includes('him') || m.includes('son')) {
    return "Ryan says he's thirsty all the time and too tired for soccer — he wanted me to tell you that."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm here because my thirteen-year-old can't stop drinking water and keeps running to the bathroom."
  }
  return REPLY_CLARIFY
}

function cushingKeywords(input: string): string {
  const m = input
  if (m.includes('face') || m.includes('changed') || m.includes('body')) {
    return "My face looks rounder in school photos — I don't recognize myself. Body feels like it redistributed to belly and face while arms look skinny."
  }
  if (m.includes('weight') || m.includes('gain') || m.includes('fat')) {
    return "Gained thirty pounds in a year — central belly, moon face. Legs look thinner which freaks me out."
  }
  if (m.includes('bruise') || m.includes('stria') || m.includes('stretch') || m.includes('skin')) {
    return "Bruise if I bump a desk — purple stretch marks on my abdomen, wide ones. Skin feels thin."
  }
  if (m.includes('weak') || m.includes('muscle') || m.includes('strength')) {
    return "Hard to stand from squatting with kids — need to push off chair arms. Stairs wind me."
  }
  if (m.includes('mood') || m.includes('depress') || m.includes('cry')) {
    return "Mood swings — tearful then snappy. Husband says I'm different emotionally, not just looks."
  }
  if (m.includes('steroid') || m.includes('prednisone') || m.includes('inhaler')) {
    return "No steroid pills — old asthma inhaler not daily. No joint injections I recall."
  }
  if (/\bwhen\b/.test(m) || m.includes('start') || m.includes('year')) {
    return "About a year progressive — blamed stress until photos shocked me."
  }
  if (m.includes('pressure') || m.includes('hypertension') || m.includes('headache')) {
    return "BP high today — usually normal at physicals. Headaches sometimes."
  }
  if (m.includes('period') || m.includes('menstrual')) {
    return "Periods irregular lately — might be stress, unsure."
  }
  if (m.includes('fever') || m.includes('sick')) {
    return "Not febrile — not infection sick."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my body changed over the last year and I bruise easily with marks on my stomach."
  }
  return REPLY_CLARIFY
}

function hyperparathyroidKeywords(input: string): string {
  const m = input
  if (m.includes('stone') || m.includes('kidney') || m.includes('renal')) {
    return "Three kidney stones in five years — last month ER visit was the worst. I'm done passing them."
  }
  if (m.includes('pain') || m.includes('flank') || m.includes('ache') || m.includes('bone')) {
    return "Flank spasm when a stone hits — between attacks dull hip and knee ache, sternum tender sometimes."
  }
  if (m.includes('tired') || m.includes('fatigue')) {
    return "Fatigue over a year — blamed work travel. Never fully energetic anymore."
  }
  if (m.includes('constipation') || m.includes('bowel')) {
    return "Constipated often — fiber helps a little. No bloody stool."
  }
  if (m.includes('urinat') || m.includes('pee') || m.includes('frequency')) {
    return "Peeing more — once or twice at night. No burning."
  }
  if (m.includes('thirst') || m.includes('water') || m.includes('drink')) {
    return "Coffee all day — probably dehydrated. Not endless thirst like diabetes ads."
  }
  if (/\bwhen\b/.test(m) || m.includes('history') || m.includes('many')) {
    return "Stones recurrent five years — calcium type last time they said."
  }
  if (m.includes('med') || m.includes('vitamin') || m.includes('calcium')) {
    return "Vitamin D gummy sometimes — inconsistent. No prescriptions."
  }
  if (m.includes('family') || m.includes('cancer')) {
    return "Dad had one stone. No cancer history, no night sweats."
  }
  if (m.includes('mood') || m.includes('fog')) {
    return "Foggy some days — wife says grumpy. Nobody linked it to labs yet."
  }
  if (m.includes('weight')) {
    return "Weight stable — not gaining oddly."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — I keep getting kidney stones and I'm tired with bone aches."
  }
  return REPLY_CLARIFY
}

export const endocrinologyKeywordHandlers: Record<string, (input: string) => string> = {
  'graves-hyperthyroid-weight-loss': gravesKeywords,
  'hashimoto-hypothyroid-tired-cold': hashimotoKeywords,
  't1dm-cant-stop-drinking-water': t1dmMotherKeywords,
  'cushing-face-looks-different': cushingKeywords,
  'hyperparathyroid-recurrent-kidney-stones': hyperparathyroidKeywords,
}
