const FALLBACK =
  "I'm not sure I understood that exactly — could you ask in a simpler way? I want to answer the right thing.";

function urologyRetentionThomas(input: string): string {
  const m = input.toLowerCase();
  if (m.includes('urin') || m.includes('pee') || m.includes('void') || m.includes('bladder')) {
    return "I haven't passed more than a dribble in maybe twelve hours — feels like my bladder's going to burst. Every time I push, nothing real comes out, and the pressure just climbs. That's what scared me into coming tonight.";
  }
  if (m.includes('pain') || m.includes('hurt') || m.includes('tender') || m.includes('belly') || m.includes('abdomen')) {
    return "Low belly pressure that's been building into a throbbing ache — not sharp like a hernia story, more like I'm overfull. I'm shifting in the chair because nothing makes it better.";
  }
  if (m.includes('stream') || m.includes('weak') || m.includes('flow') || m.includes('hesitat')) {
    return "Stream's been lousy for years — start and stop, thin trickle, takes forever at the toilet. I figured it was just getting older until today when it stopped completely.";
  }
  if (m.includes('night') || m.includes('noctur') || m.includes('sleep')) {
    return "I'm up two-to-four times most nights — sometimes more if I drink late. Rarely sleep through anymore. Thought it was normal guy stuff until this retention hit.";
  }
  if (m.includes('fever') || m.includes('chill') || m.includes('burn') || m.includes('infection')) {
    return "No fever I know of — not shaking like when I had flu years ago. Urine doesn't burn like an infection did when I was younger.";
  }
  if (m.includes('blood') || m.includes('hematur') || m.includes('red urine')) {
    return "Haven't noticed red urine — might have strained a little pink once years ago after heavy work, but nothing like that today.";
  }
  if (m.includes('flank') || m.includes('back pain') || m.includes('kidney')) {
    return "Not classic kidney-area spasms — it's the low middle bladder zone that kills. Back feels tight from tensing, not stabbing flank colic.";
  }
  if (m.includes('stone')) {
    return "Never passed a stone that I know of. This doesn't feel like the \"writhing side pain\" guys at work described.";
  }
  if (m.includes('sexual') || m.includes('erect') || m.includes('sex')) {
    return "Sex life slowed down — tougher to maintain what I want, embarrassing to admit. Not the headline today compared to not urinating.";
  }
  if (m.includes('med') || m.includes('pill')) {
    return "BP pill from my PCP — forget the exact name. I grabbed cold medicine sometimes with a decongestant — maybe dumb if that matters. No opioids today.";
  }
  if (m.includes('family') && m.includes('history')) {
    return "Dad had prostate trouble in his seventies. No brothers. Mom's side not really talked about.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('start') || m.includes('how long')) {
    return "Voiding really stopped through the day — last decent pee was morning, then dribbles, then nothing. Pressure got worse hour by hour.";
  }
  if (m.includes('help') || m.includes('better') || m.includes('worse')) {
    return "Walking and jiggling don't help — maybe a hot shower relaxed me slightly yesterday, but today nothing touches it. Pushing harder makes it hurt more.";
  }
  if (m.includes('swell') || m.includes('scrotal')) {
    return "Balls don't feel swollen — it's the bladder line above that's tight. No new groin lump I noticed.";
  }
  if (m.includes('neuro') || m.includes('spine') || m.includes('numb') || m.includes('leg weak')) {
    return "No new numb legs or spinal injury — I'm clumsy from age, not paralyzed. Walked in under my own power, just miserable.";
  }
  if (m.includes('trauma') || m.includes('fall')) {
    return "No hit to the belly or pelvis — wasn't lifting a beam today. This crept from not emptying, not from trauma.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I need help. I can't pee and my lower belly feels like it's going to split.";
  }
  return FALLBACK;
}

function urologyStoneEric(input: string): string {
  const m = input.toLowerCase();
  if (m.includes('flank') || m.includes('side') || m.includes('back')) {
    return "Left side grabbed me like a vice — wraps from back toward front. It's the worst pain I've ever had, and I've cracked ribs on job sites.";
  }
  if (m.includes('groin') || m.includes('testicle') || m.includes('ball')) {
    return "Pain sneaks toward my left groin and ball — weird deep ache down there riding along with the flank waves. Makes me want to curl up then pace.";
  }
  if (m.includes('pain') || m.includes('colic') || m.includes('wave')) {
    return "Comes in crushing waves — peaks where I'm breathless, eases a hair, then slams again. I can't lie still — rolling makes me feel nuts but standing hurts too.";
  }
  if (m.includes('urin') || m.includes('pee') || m.includes('void')) {
    return "Peeing is miserable — stings a little, dark maybe pink-tinged? I'm not sure in this lighting. Flow's not the issue; it's the flank.";
  }
  if (m.includes('blood')) {
    return "Toilet water looked a little pink once I could focus — not straight red, but not normal. Scared me extra.";
  }
  if (m.includes('stream')) {
    return "Stream itself isn't my chief worry — it's the side pain that owns me. Urine comes in spurts when I can stand over the jug.";
  }
  if (m.includes('nausea') || m.includes('vomit') || m.includes('throw up')) {
    return "Nausea is brutal — dry-heaved in the bathroom. Haven't eaten since breakfast; stomach's empty but still heaving.";
  }
  if (m.includes('fever') || m.includes('chill')) {
    return "No fever sense — face isn't hot like infection. Rigors aren't the main deal; pain is.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('start')) {
    return "Started maybe two hours into my shift — sudden, not a slow cramp. Still raging when EMS brought me here.";
  }
  if (m.includes('sexual') || m.includes('sti') || m.includes('discharge')) {
    return "No penile discharge — not a sex problem I recognize. Haven't had new partners lately, not that I'm proud or ashamed, just facts.";
  }
  if (m.includes('family') && m.includes('history')) {
    return "Uncle passed \"kidney gravel\" twice per family lore. Mom healthy. Figured I drank enough coffee to dodge it — guess not.";
  }
  if (m.includes('med') || m.includes('ibuprofen') || m.includes('aspirin')) {
    return "Ibuprofen at work didn't touch this — maybe blunted nausea slightly, pain still ten out of ten. No weird supplements.";
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Pacing weirdly helps distract for thirty seconds then worse again. Pressure on the sore spot doesn't help. Bending forward sometimes eases a notch — not reliably.";
  }
  if (m.includes('trauma') || m.includes('lift')) {
    return "Heavy box lift right before pain — possible, but no pop injury feeling. More like internal spasm than muscle pull.";
  }
  if (m.includes('night') || m.includes('sleep')) {
    return "Barely slept last night from route stress — today pain makes sleep impossible anyway.";
  }
  if (m.includes('stone') || m.includes('kidney')) {
    return "Docs haven't told me I have a stone yet — I just know this pattern matches what buddies described, but I'm not diagnosing myself out loud.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — please, something for this side pain. It's unbearable.";
  }
  return FALLBACK;
}

function urologyHematuriaJames(input: string): string {
  const m = input.toLowerCase();
  if (m.includes('blood') || m.includes('red') || m.includes('urin') || m.includes('pee')) {
    return "Toilet looked rusty-orange twice — maybe a tablespoon of alarm each time. Not clots plugging me, just frightening color. Wife made me come.";
  }
  if (m.includes('pain') || m.includes('burn') || m.includes('dysuria')) {
    return "No burning like infection — not even much discomfort besides anxiety sitting in my chest. That's what worries me: painless blood.";
  }
  if (m.includes('flank') || m.includes('colic')) {
    return "No horrible side spasm — not that flank-to-groin roller coaster guys talk about. Just the scary urine color.";
  }
  if (m.includes('fever')) {
    return "No fever chills — felt normal temp-wise. Energy okay, maybe tired from worrying.";
  }
  if (m.includes('stream') || m.includes('weak')) {
    return "Stream might be a tad weaker lately — chalked up to age — not the dramatic retention story. Main fear is the blood.";
  }
  if (m.includes('night') || m.includes('noctur')) {
    return "Up once nightly for years — not crazy frequency. Nothing new there compared to the blood episodes.";
  }
  if (m.includes('smoke') || m.includes('tobacco')) {
    return "Half pack most days still — I \"cut back\" but stress eating cigarettes after retirement. Ashamed telling you, but it's honest.";
  }
  if (m.includes('sexual') || m.includes('erect') || m.includes('sti')) {
    return "Erections still happen — no pain with sex, no discharge. Haven't had STI testing since marriage ages ago — wife same partner.";
  }
  if (m.includes('weight') || m.includes('appetite')) {
    return "Weight steady — appetite fine. No bone pain I can clock.";
  }
  if (m.includes('family') && m.includes('history')) {
    return "Dad died heart stuff. Mom mild diabetes. No one told me about bladder cancer in family — doesn't mean it didn't happen.";
  }
  if (m.includes('med') || m.includes('aspirin') || m.includes('blood thinner')) {
    return "Baby aspirin for cardiac prevention per old doc — not on warfarin. Ibuprofen occasionally for back.";
  }
  if (m.includes('trauma') || m.includes('exercise')) {
    return "Didn't run a marathon or get kicked — urine colored without injury story unless straining counts.";
  }
  if (m.includes('timing') || m.includes('when')) {
    return "First episode ten days ago, second this week — random timing, both morning voids I think.";
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Hydrating extra hasn't cleared color — scared me more when it persisted. Nothing makes it better yet because I don't know what \"it\" is.";
  }
  if (m.includes('swell')) {
    return "No leg swelling or scrotal edema — outward exam stuff seems normal to me.";
  }
  if (m.includes('occupation') || m.includes('work')) {
    return "Mechanic decades — solvents, diesel fumes, who knows what exposures. Never wore masks like today back then.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello — my urine turned red and I'm scared.";
  }
  return FALLBACK;
}

function urologyTorsionNoah(input: string): string {
  const m = input.toLowerCase();
  if (m.includes('testicle') || m.includes('ball') || m.includes('scrot')) {
    return "Left nut feels like it's being squeezed in a vise — sudden, vicious. Fabric from underwear makes it worse; I'm walking wide-legged.";
  }
  if (m.includes('pain') || m.includes('hurt') || m.includes('severe')) {
    return "Ten-out-of-ten — worse than when I broke my wrist. Comes in spikes if I move wrong. I'm trying not to cry in front of people.";
  }
  if (m.includes('swell') || m.includes('high') || m.includes('ride')) {
    return "Left side sits higher or feels wrong compared with right — hard to explain, just unnatural position. Mom noticed I was limping.";
  }
  if (m.includes('nausea') || m.includes('vomit')) {
    return "Nausea hit fast with the pain — gagged in the bathroom. Haven't eaten lunch — too sick.";
  }
  if (m.includes('fever') || m.includes('urin') || m.includes('burn')) {
    return "No fever chills that I notice — more adrenaline and nausea. Urinating stings a little maybe, but that's not the headline.";
  }
  if (m.includes('urination') || m.includes('frequency')) {
    return "Didn't count pees — pain overshadows everything. Stream existed but I'm scared to focus on details.";
  }
  if (m.includes('sexual') || m.includes('sex') || m.includes('sti')) {
    return "Not sexually active yet — no discharge worries. Please don't judge; I'm sixteen and this is mortifying.";
  }
  if (m.includes('trauma') || m.includes('hit') || m.includes('sports')) {
    return "No tackle or nut-shot today — sitting in class when it exploded. Coach didn't hit me, I swear.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('hour')) {
    return "About two hours now since onset — clock feels both fast and frozen. I know time matters and I'm freaking out about that.";
  }
  if (m.includes('prior') || m.includes('before') || m.includes('ever')) {
    return "Never had this pain before — right side totally fine for comparison.";
  }
  if (m.includes('family') && m.includes('history')) {
    return "No one told me about torsion in family — dad shrugs about \"growing pains\" which is useless.";
  }
  if (m.includes('med')) {
    return "No regular prescriptions — vitamin gummies sometimes. Tried parent's ibuprofen in the car, didn't dent the pain.";
  }
  if (m.includes('stream')) {
    return "Didn't pay attention to stream quality before — this is acute, not slow dribble over years.";
  }
  if (m.includes('flank')) {
    return "Not really flank — localized to the groin testicle nightmare.";
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Supporting scrotum with my hand slightly eases pressure for a second — movement jostle makes it murder.";
  }
  if (m.includes('blood') || m.includes('trauma')) {
    return "No blood in urine that I saw — no major skin tear.";
  }
  if (m.includes('time') && (m.includes('sensitive') || m.includes('window') || m.includes('salvage'))) {
    return "I heard nurses whispering about hours mattering — that terrifies me. I showed up as soon as Mom could leave work.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — my left testicle suddenly hurts worse than anything.";
  }
  return FALLBACK;
}

function urologyBphRobertkim(input: string): string {
  const m = input.toLowerCase();
  if (m.includes('night') || m.includes('noctur') || m.includes('sleep')) {
    return "I'm up four or five times nightly — kills my deep sleep. I'm a zombie teaching the grandkids board games. Barely rest anymore.";
  }
  if (m.includes('stream') || m.includes('weak') || m.includes('flow') || m.includes('hesitat')) {
    return "Stream's thin and hesitant — have to push, then it stops, then trickles again. Takes minutes to finish what used to be seconds.";
  }
  if (m.includes('dribbl') || m.includes('empty') || m.includes('incomplete')) {
    return "Dribble in my boxers after I think I'm done — embarrassing. Feels like a puddle left inside no matter how long I shake.";
  }
  if (m.includes('urin') || m.includes('frequency') || m.includes('urgency')) {
    return "Daytime I go more than buddies on golf outings — urgency hits suddenly if I've had coffee. Night frequency is the worst socially because I'm exhausted.";
  }
  if (m.includes('pain') || m.includes('burn')) {
    return "Doesn't really burn — more mechanical frustration than infection pain. No knife flank pain either.";
  }
  if (m.includes('blood')) {
    return "Never saw red urine — if dipstick shows something micro, that's news to me.";
  }
  if (m.includes('flank')) {
    return "Flanks quiet — story is all bladder and stream mechanics.";
  }
  if (m.includes('fever')) {
    return "No fevers — this is chronic annoyance, not acute sick.";
  }
  if (m.includes('sexual') || m.includes('erect') || m.includes('ejacul')) {
    return "Erections still happen — maybe weaker — ejaculation less forceful last year or two. I wouldn't mention unless you're asking directly.";
  }
  if (m.includes('diabetes') || m.includes('thirst') || m.includes('sugar')) {
    return "No diabetes diagnosis — not chugging water from thirst like my buddy with DM. Just peeing from this bladder pattern.";
  }
  if (m.includes('family') && m.includes('history')) {
    return "Father prostate issues older age — biopsy talk I overheard vaguely. Makes me wonder but I'm not assuming worst.";
  }
  if (m.includes('med') || m.includes('lisinopril')) {
    return "Lisinopril for blood pressure — stable. Occasional antihistamine for allergies summers — wonder if that worsens stream sometimes.";
  }
  if (m.includes('timing') || m.includes('when') || m.includes('how long')) {
    return "Years of gradual worsening — not one bad day. Stream trouble predates the crazy nocturia by a while.";
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Cutting evening coffee helps a notch — alcohol before bed makes nights worse. Double voiding sometimes reduces dribble, not always.";
  }
  if (m.includes('swell')) {
    return "No scrotal swelling — external stuff looks normal to my amateur eye.";
  }
  if (m.includes('retention') || m.includes('unable to pee') || m.includes('cannot pee')) {
    return "Haven't been totally blocked thankfully — more endless incomplete. If I couldn't go at all I'd run to ER.";
  }
  if (m.includes('weight') || m.includes('bone')) {
    return "Weight steady — no bone pain. Energy low from sleep loss not from cancer fear yet.";
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi — I'm exhausted from running to the bathroom at night.";
  }
  return FALLBACK;
}

export const urologyKeywordHandlers: Record<string, (input: string) => string> = {
  'urology-retention-bph-thomas-reynolds': urologyRetentionThomas,
  'urology-stone-eric-patel': urologyStoneEric,
  'urology-hematuria-bladder-james-carter': urologyHematuriaJames,
  'urology-torsion-noah-brooks': urologyTorsionNoah,
  'urology-bph-luts-robert-kim': urologyBphRobertkim,
};
