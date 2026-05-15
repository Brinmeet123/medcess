const REPLY_CLARIFY =
  "I'm not sure I understood that exactly… can you ask it a different way? I want to answer what you're actually asking."

function psychMddNotFeltMyself(input: string): string {
  const m = input
  if (m.includes('suicid') || (m.includes('hurt') && m.includes('yourself')) || m.includes('kill')) {
    return "When you ask straight like that… yeah. Sometimes I kind of wish I just wouldn't wake up. I don't have a plan or anything stored up — it's more this heavy, passive thing, and honestly it scares me to admit it out loud. I don't want to die, I just feel stuck in a fog I can't get out of."
  }
  if (m.includes('mood') || m.includes('sad') || m.includes('down') || m.includes('depress') || m.includes('feeling')) {
    return "Most days I just feel… off. Sad or empty, like the color got drained out of stuff. I tell people I'm fine because I don't want to be dramatic, but I haven't felt like myself in a couple months now."
  }
  if (m.includes('interest') || m.includes('hobby') || m.includes('enjoy') || m.includes('fun') || m.includes('motivation')) {
    return "I used to paint and go to club meetings — now I can't be bothered. It's not even that I'm busy; I just sit there and nothing pulls me in. Even music I liked feels flat."
  }
  if (m.includes('sleep') || m.includes('insomnia') || m.includes('tired') || m.includes('fatigue')) {
    return "I fall asleep late, wake up at like three in the morning and can't shut my brain off. I drag through classes anyway, and I'm still exhausted. Naps don't really fix it — it's this heavy tired in my bones."
  }
  if (m.includes('appetite') || m.includes('eat') || m.includes('weight')) {
    return "Food kind of lost its point. I pick at meals and sometimes skip lunch without noticing until later. I think I've dropped a little weight — my jeans are looser, anyway."
  }
  if (m.includes('concentrat') || m.includes('focus') || m.includes('school') || m.includes('grade') || m.includes('class')) {
    return "Reading takes forever — I read the same paragraph four times. My grades slipped this semester; I'm not flunking but I'm not where I usually am, and that makes the shame spiral worse."
  }
  if (m.includes('guilt') || m.includes('worth')) {
    return "I replay dumb things I said like they're proof I'm failing everyone. Rationally I know people aren't thinking about me 24/7, but the guilty feeling sits there anyway."
  }
  if (m.includes('mania') || m.includes('bipolar') || m.includes('wired') || m.includes('dangerous') && m.includes('behavior')) {
    return "I've never had that week-long 'I don't need sleep and I'm invincible' thing. No wild spending sprees, no grand plans. I mostly feel low and slow, not revved up."
  }
  if (m.includes('drug') || m.includes('substance') || m.includes('alcohol') || m.includes('drink')) {
    return "I don't do drugs. Wine at a party sometimes, nothing heavy, and not like I'm drinking to cope every night — more like awkward social sipping."
  }
  if (m.includes('med') || m.includes('medicine') || m.includes('prescription')) {
    return "No psych meds before. I've thought about it but kept telling myself I'd push through. Birth control, that's about it."
  }
  if (m.includes('family') || m.includes('history') || m.includes('mom') || m.includes('dad')) {
    return "My mom deals with depression — she's on medication and therapy. Nobody talks about it much at holidays. Makes me wonder if I'm 'just like her,' which isn't comforting."
  }
  if (m.includes('relationship') || m.includes('friend') || m.includes('boyfriend') || m.includes('partner')) {
    return "Friends text and I leave them on read — not because I'm mad, I just can't rally the energy to pretend I'm okay. Dating… not really right now. I feel like bad company."
  }
  if (m.includes('stress') || m.includes('anxiety') || m.includes('worry')) {
    return "Junior year is a lot, yeah, but this feels bigger than normal stress. I used to bounce back after finals. Now it's like the tank is empty even when nothing huge is happening."
  }
  if (m.includes('when') || m.includes('how long') || m.includes('start') || m.includes('onset') || m.includes('timing')) {
    return "Roughly two months, maybe a little more — it kind of crept in. I noticed I wasn't excited about anything, then sleep went bad, then school got harder."
  }
  if (m.includes('hallucin') || m.includes('voice') || m.includes('hear things') || m.includes('see things')) {
    return "No, nothing like voices or seeing stuff. I mean my brain won't shut up with worry, but it's my thoughts, not hearing something external."
  }
  if (m.includes('better') || m.includes('worse') || m.includes('help')) {
    return "Weekends I stay in bed longer — sometimes feels slightly less pressuring than class. Talking to someone kind helps for like an hour, then the heaviness rolls back in. Coffee is fake energy."
  }
  if (m.includes('trauma') || m.includes('abuse')) {
    return "Nothing like a single huge event I'd label that way — not trying to hide a story, it just hasn't been 'one thing.' More like a slow grind wearing me down."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi… thanks for seeing me. I've been feeling really not like myself and I figured I should actually say it out loud."
  }
  return REPLY_CLARIFY
}

function psychBipolarManicNoSleep(input: string): string {
  const m = input
  if (m.includes('sleep') || m.includes('insomnia') || m.includes('rest')) {
    return "I don't know — sleep feels optional right now. It's been like five days of barely nodding off and I'm still not tired. My girlfriend keeps saying that's not normal, but I feel electric."
  }
  if (m.includes('energy') || m.includes('amazing') || m.includes('euphor') || m.includes('mood')) {
    return "I feel incredible, honestly — ideas hitting faster than I can grab them. It's like I finally see what the company could be if people would get out of the way."
  }
  if (m.includes('speech') || m.includes('talk') || m.includes('fast') || m.includes('pressured')) {
    return "People tell me I'm talking fast. I don't feel rushed — I just have a lot to get out. If you can't keep up, that's frustrating, not my problem."
  }
  if (m.includes('spend') || m.includes('money') || m.includes('purchase') || m.includes('risk')) {
    return "I invested in gear and ads — yeah, big numbers. You have to spend to scale. My cofounder freaked out but that's fear talking. I'm not throwing money away, I'm building."
  }
  if (m.includes('family') || m.includes('brought') || m.includes('concern')) {
    return "They're overreacting. My sister showed up like I'm a problem. I drove a long night without resting — I'm fine, I was focused. They're freaking out because they don't get startup life."
  }
  if (m.includes('drug') || m.includes('substance') || m.includes('cocaine') || m.includes('stim') || m.includes('weed')) {
    return "I'm not on anything. No coke, no weird pills. Coffee, sure — lots of coffee — but I'm not high in the way you mean."
  }
  if (m.includes('alcohol')) {
    return "A drink sometimes socially, not this week really — I've been working. Alcohol isn't fueling this."
  }
  if (m.includes('grand') || m.includes('special') || m.includes('idea')) {
    return "I've got connections and angles nobody else sees right now. It's not arrogance if it's true — the product basically sells itself if we execute right."
  }
  if (m.includes('irritable') || m.includes('angry') || m.includes('agitat')) {
    return "I get sharp when people slow me down — like, why are we debating minutiae when we could launch? That irritation feels justified."
  }
  if (m.includes('sex') || m.includes('hypersex')) {
    return "Yeah, I've been… more driven than usual. Everything feels turned up. I'm not gonna get graphic, but it's noticeable."
  }
  if (m.includes('focus') || m.includes('distract')) {
    return "I jump between five tasks — that's founder brain. Multitasking isn't a crime. If anything I'm more productive than my team."
  }
  if (m.includes('depress') || m.includes('low') || m.includes('prior episode')) {
    return "Winter was brutal — crashed hard after stress, slept a ton, felt useless, but nobody called that mania so I figured burnout. Maybe that's relevant, maybe not — I don't like labels."
  }
  if (m.includes('hallucin') || m.includes('voice')) {
    return "I'm not hearing commanding voices or seeing shadow people. It's more like thoughts racing and irritation when people doubt me."
  }
  if (m.includes('med')) {
    return "No psych meds. No history of lithium or whatever — I'm not a psych patient normally, I'm just in a productive stretch people misread."
  }
  if (m.includes('mania') || m.includes('bipolar') || m.includes('diagnosis')) {
    return "I don't know your checklists — I'm telling you how I feel. I need sleep when I need sleep; right now I don't, and I'm getting stuff done."
  }
  if (m.includes('anxiety') || m.includes('panic')) {
    return "Not really panic — the opposite. I'm wired forward, not frozen. If anything people should be excited, not terrified."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey — I'm alright, better than alright. If someone called you worried, they're wasting your time."
  }
  return REPLY_CLARIFY
}

function psychSchizophreniaWatching(input: string): string {
  const m = input
  if (m.includes('hallucin') || m.includes('voice') || m.includes('hear')) {
    return "Sometimes I hear this guy commenting — like he's noticing what I'm doing. It's not loud announcements to the room, more like… commentary in my head that doesn't feel totally like my thoughts. I don't love talking about specifics."
  }
  if (m.includes('paranoia') || m.includes('follow') || m.includes('watch') || m.includes('stalk')) {
    return "It feels like people clock me on the bus, at interviews — like they already know something about me. I can't prove it; it just doesn't feel random anymore."
  }
  if (m.includes('drug') || m.includes('weed') || m.includes('marijuana') || m.includes('substance')) {
    return "I smoke weed sometimes to chill out — not daily, not sure last time exactly. I know doctors blame weed for everything. It's not like I'm blasted all day."
  }
  if (m.includes('med') || m.includes('medicine')) {
    return "No prescriptions for this. Never got stable on meds — part of me doesn't trust clinics, part of me is just tired."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Family mental health is messy — an uncle 'had episodes' they whisper about. Mom worries I 'sleep too much' but we don't talk clinical."
  }
  if (m.includes('work') || m.includes('job') || m.includes('unemploy')) {
    return "I lost the warehouse job after a fight — I thought my supervisor was messing with me. Money's tight and I avoid applications because interviews feel exposed."
  }
  if (m.includes('sleep') || m.includes('insomnia')) {
    return "Sleep is garbage — I drift, wake up, listen for stuff. Mornings feel sticky; hard to get going."
  }
  if (m.includes('appetite') || m.includes('eat') || m.includes('shower') || m.includes('hygiene')) {
    return "I've let some basics slide — showering feels like a project. I eat what's easy, not really meals."
  }
  if (m.includes('depress') || m.includes('mood')) {
    return "Underneath I'm tense all the time — not classic 'sad' every minute, more like walking through fog waiting for something bad."
  }
  if (m.includes('command') || m.includes('harm') || m.includes('hurt anyone')) {
    return "The voice is mostly… rude commentary, not 'go do X.' I don't want to get into details. I'm not sitting here planning anything violent — I'm scared enough as it is."
  }
  if (m.includes('trauma') || m.includes('stress')) {
    return "Life's been rough the past year — money stress, people acting weird — I don't have one clean 'event' that explains everything, it piled up."
  }
  if (m.includes('when') || m.includes('how long') || m.includes('start')) {
    return "Maybe eight-ish months getting worse — harder to go outside, more suspicious, more tired of pretending I'm fine."
  }
  if (m.includes('anxiety')) {
    return "Anxiety is there, yeah, but it's wrapped up with feeling watched. It's not just nerves before a test — it's everywhere."
  }
  if (m.includes('relationship') || m.includes('social')) {
    return "I pull back from people — easier to stay in. When I do talk, I feel like I'm performing and they're reading me wrong."
  }
  if (m.includes('treatment') || m.includes('hospital')) {
    return "I've bounced off the idea of going inpatient — sounds dramatic. I came today because someone pushed me, not because I'm thrilled about it."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey… I don't know how much I should say. People keep telling me I'm not making sense but I know what I'm experiencing."
  }
  return REPLY_CLARIFY
}

function psychOcdHandWashing(input: string): string {
  const m = input
  if (m.includes('wash') || m.includes('hand') || m.includes('soap') || m.includes('ritual')) {
    return "I'll scrub until my knuckles hurt — timers don't help because it never feels 'done.' If I try to walk away, my stomach drops like something terrible will happen if I stop."
  }
  if (m.includes('contamination') || m.includes('germ') || m.includes('dirty') || m.includes('clean')) {
    return "Everything feels… contaminated after I touch certain stuff. Desk, bus pole, my phone — the 'dirty' feeling sticks and won't shake until I've washed a ridiculous amount."
  }
  if (m.includes('thought') || m.includes('intrusive') || m.includes('obsess')) {
    return "Thoughts jump in like intrusive videos — getting sick, getting someone sick, being careless. I know it's over the top logically, but emotionally it feels true in the moment."
  }
  if (m.includes('anxiety') || m.includes('panic') || m.includes('worry')) {
    return "It's this tight anxiety spike if I skip a step. Not like normal worry about a test — more like alarm bells in my body until I give in."
  }
  if (m.includes('school') || m.includes('homework') || m.includes('grade')) {
    return "Homework takes forever because mornings are eaten by washing. I'm late sometimes, assignments slide — I used to be a straight-A type, now I'm embarrassed by my grades."
  }
  if (m.includes('insight') || (m.includes('know') && m.includes('weird')) || m.includes('excessive')) {
    return "I absolutely know it's excessive — that's what's humiliating. I can't stop anyway, like there's a glitch between what I know and what I can tolerate."
  }
  if (m.includes('hallucin') || m.includes('voice') || m.includes('psychosis')) {
    return "I'm not hearing voices telling me to wash — it's fear-driven in my head, not a commentator from outside. No one spying on me stuff either."
  }
  if (m.includes('family')) {
    return "Parents think I'm 'just stressed about college.' I've hidden most of the washing — they'd lose it if they timed me."
  }
  if (m.includes('friend') || m.includes('relationship')) {
    return "Friends notice I'm flaky on plans — I make excuses. Dating feels impossible; I'd have to explain why I'm late because of a sink."
  }
  if (m.includes('med')) {
    return "No meds yet — melatonin sometimes. I've been too ashamed to seek help until now."
  }
  if (m.includes('when') || m.includes('how long') || m.includes('start')) {
    return "Over a year-ish, creeping worse through junior year. At first it was extra hand sanitizer, now it's whole episodes at the sink."
  }
  if (m.includes('better') || m.includes('worse') || m.includes('help')) {
    return "Short term, giving in to the wash calms the panic — long term it makes the skin worse and steals my night. Distraction helps a tiny bit but the thought loops come back."
  }
  if (m.includes('trauma') || m.includes('abuse')) {
    return "Nothing I'd label like that — no big single trauma moment. It just spiraled on its own, which almost makes me angrier at myself."
  }
  if (m.includes('mood') || m.includes('depress')) {
    return "I get low when I see time wasted — I'm not sleeping all day depressed, more frustrated and trapped by the routines."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi… sorry, I'm kinda nervous. I have this thing with washing I can't get under control and I didn't know how to say it without sounding crazy."
  }
  return REPLY_CLARIFY
}

function psychPtsdReliving(input: string): string {
  const m = input
  if (m.includes('trauma') || m.includes('event') || m.includes('happened') || m.includes('shift')) {
    return "Something went horribly wrong on a shift about eight months ago — I don't want to go graphic, but patients die sometimes and this one… won't leave me. I replay pieces I don't want to replay."
  }
  if (m.includes('nightmare') || m.includes('dream') || m.includes('sleep')) {
    return "I wake up sweating from dreams that shove me back into the room — beeps, voices, that helpless tightness in my chest. Then I'm awake for hours with my brain still running."
  }
  if (m.includes('flashback') || m.includes('reliv') || m.includes('intrus')) {
    return "Smells, alarms, certain tones — suddenly I'm there again, not just remembering but like my body thinks it's happening. I hate that I can't control when it hits."
  }
  if (m.includes('avoid') || m.includes('trigger') || m.includes('remind')) {
    return "I trade shifts to stay out of the bay where it happened. I take the long way. Even TV medical scenes — I scroll fast. Avoidance became automatic."
  }
  if (m.includes('hyper') || m.includes('startle') || m.includes('vigil')) {
    return "Doors slamming makes me jump like someone's coming for me. I scan exits in grocery stores — I know it's irrational outside work, but my nervous system didn't get the memo."
  }
  if (m.includes('anxiety') || m.includes('panic')) {
    return "Anxiety is constant background — spikes into near-panic when something reminds me. It's not random butterflies; it's tied to cues."
  }
  if (m.includes('depress') || m.includes('mood') || m.includes('guilt')) {
    return "Heavy guilt — like I should've moved faster, seen something. Also angry at myself for 'not being strong enough' like my coworkers seem. I know that's not fair, I feel it anyway."
  }
  if (m.includes('suicid') || (m.includes('harm') && m.includes('yourself'))) {
    return "I get waves where life feels pointless heavy — passive stuff, not a plan. I won't do anything impulsive; I've seen what impulsive looks like in the ER. Still, I should say it because you asked directly."
  }
  if (m.includes('work') || m.includes('nurse') || m.includes('job')) {
    return "I still show up — I need the paycheck and I care about patients — but I'm not picking up extra anymore. I'm brittle; little things set me off in the break room."
  }
  if (m.includes('alcohol') || m.includes('drink') || m.includes('substance')) {
    return "Wine a few nights to dull my head — not proud. No drugs. I know alcohol isn't therapy; it just turns the volume down briefly."
  }
  if (m.includes('med')) {
    return "No psych meds yet. Thought about it but kept muscling through — obviously that isn't working great."
  }
  if (m.includes('family') || m.includes('partner') || m.includes('support')) {
    return "My partner knows something's wrong; I spare them details. Family thinks 'nursing is just hard' — they don't get how stuck I am."
  }
  if (m.includes('when') || m.includes('how long') || m.includes('start')) {
    return "Eight months give or take — symptoms clustered after that shift, didn't bounce back like usual post-bad night adrenaline."
  }
  if (m.includes('concentrat') || m.includes('memory')) {
    return "Focus fragments when I get pulled into memories — charting takes longer because I reread everything, scared I'll miss something again."
  }
  if (m.includes('hallucin')) {
    return "No hallucinations — it's intrusions and nightmares, not voices ordering me around or seeing things that aren't there."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi… thanks for fitting me in. I can't stop thinking about something that happened at work and it's spilling into everything else."
  }
  return REPLY_CLARIFY
}

export const psychiatryKeywordHandlers: Record<string, (input: string) => string> = {
  'psych-mdd-not-felt-myself': psychMddNotFeltMyself,
  'psych-bipolar-manic-no-sleep': psychBipolarManicNoSleep,
  'psych-schizophrenia-watching': psychSchizophreniaWatching,
  'psych-ocd-hand-washing': psychOcdHandWashing,
  'psych-ptsd-reliving': psychPtsdReliving,
}
