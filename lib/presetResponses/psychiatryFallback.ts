import type { FallbackScenario } from './types'

export const psychiatryFallbackScenarios: FallbackScenario[] = [
  {
    key: 'psych-mdd-not-felt-myself',
    titleMatchers: ["haven't felt like myself", 'felt like myself', 'not felt like myself'],
    complaintMatchers: ['felt different', 'different lately'],
    defaultAnswer:
      "I've felt off for a couple months — sad or empty most days, not into my hobbies, sleep is garbage, and school is slipping. I drag myself around and feel guilty all the time. Sometimes I wish I wouldn't wake up, but I don't have a plan — that part scares me to say.",
    qa: [
      {
        id: 'chief',
        answer:
          "I told the front desk I just feel… different lately. Not one dramatic thing — more like the switch flipped and I can't get back to how I used to feel.",
        patterns: ['what brings', 'chief', 'why are you here', 'today'],
        keywords: ['bring', 'chief', 'here', 'today'],
      },
      {
        id: 'mood',
        answer:
          "Mostly down, numb sometimes. I smile when I have to, but it doesn't reach anything real. I used to be lighter — now it's heavy most of the day.",
        patterns: ['mood', 'sad', 'feeling', 'depress'],
        keywords: ['mood', 'sad', 'feeling'],
      },
      {
        id: 'anhedonia',
        answer:
          "I dropped painting and barely answer club chats. It's not 'busy' — I could have time and I still sit there staring at my phone not caring.",
        patterns: ['interest', 'hobby', 'enjoy', 'fun'],
        keywords: ['interest', 'hobby', 'enjoy'],
      },
      {
        id: 'sleep',
        answer:
          "I fall asleep late, then I'm awake at three spiraling. I try to nap between classes and I'm still wiped. Coffee is a joke — it doesn't fix this tired.",
        patterns: ['sleep', 'insomnia', 'tired', 'fatigue'],
        keywords: ['sleep', 'tired', 'insomnia'],
      },
      {
        id: 'appetite',
        answer:
          "Food is meh. I skip meals without noticing until I'm dizzy. I think I've lost a few pounds — nothing dramatic but my clothes fit looser.",
        patterns: ['appetite', 'eat', 'weight'],
        keywords: ['appetite', 'eat', 'weight'],
      },
      {
        id: 'concentration',
        answer:
          "Reading is torture — same page forever. My grades dipped this semester. I'm not failing but I'm embarrassed compared to what I used to do.",
        patterns: ['concentrat', 'focus', 'school', 'grade'],
        keywords: ['focus', 'school', 'grade'],
      },
      {
        id: 'guilt',
        answer:
          "I rake myself over tiny mistakes. I know intellectually people aren't thinking about me constantly, but the guilty tape plays anyway.",
        patterns: ['guilt', 'worth', 'blame'],
        keywords: ['guilt', 'worth'],
      },
      {
        id: 'suicide',
        answer:
          "If you're asking direct… yeah, sometimes passive stuff about not waking up. No plan, no stash of pills. It freaks me out to say, but I'd rather be honest.",
        patterns: ['suicid', 'hurt yourself', 'harm yourself'],
        keywords: ['suicid', 'hurt', 'harm'],
      },
      {
        id: 'mania',
        answer:
          "No week where I didn't need sleep and felt invincible. No wild spending or risky hyper phase — I'm low-energy, not wired.",
        patterns: ['mania', 'bipolar', 'hypomania'],
        keywords: ['mania', 'bipolar'],
      },
      {
        id: 'substance',
        answer:
          "No drugs. Wine at a party here and there — not my coping mechanism nightly or anything.",
        patterns: ['drug', 'alcohol', 'substance'],
        keywords: ['drug', 'alcohol'],
      },
      {
        id: 'medications',
        answer:
          "No psych meds historically — birth control only. I've been white-knuckling, which clearly isn't working.",
        patterns: ['medication', 'medicine', 'prescription'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'family',
        answer:
          "Mom has depression — takes meds, doesn't talk details. Makes me worry I'm 'inherited broken,' which isn't helpful mentally.",
        patterns: ['family', 'mother', 'father', 'history'],
        keywords: ['family', 'history'],
      },
      {
        id: 'relationships',
        answer:
          "I ghost friends not because I'm angry — I don't have energy to perform 'okay.' Dating is paused; I feel like I'd bring someone down.",
        patterns: ['friend', 'relationship', 'boyfriend', 'partner'],
        keywords: ['friend', 'relationship'],
      },
      {
        id: 'stress',
        answer:
          "Junior year stress is real but this is heavier than cramming. I used to rally after midterms — now there's no rally, just flat.",
        patterns: ['stress', 'anxiety', 'worry'],
        keywords: ['stress', 'anxiety'],
      },
      {
        id: 'timing',
        answer:
          "About two months creeping worse — interest died first, then sleep, then grades followed. It's blurry exact dates but that's the ballpark.",
        patterns: ['when', 'how long', 'onset', 'start'],
        keywords: ['when', 'long', 'start'],
      },
      {
        id: 'psychosis',
        answer:
          "No voices, no visions, no secret messages on TV. My brain is mean, but it's thoughts, not hallucinations.",
        patterns: ['hallucin', 'voice', 'see things', 'psychosis'],
        keywords: ['hallucin', 'voice'],
      },
      {
        id: 'trauma',
        answer:
          "No single big trauma I point to — not trying to hide a story. More like a slow grind wearing me out.",
        patterns: ['trauma', 'abuse', 'assault'],
        keywords: ['trauma', 'abuse'],
      },
      {
        id: 'helps-worsens',
        answer:
          "Weekends I hide in my room — slightly less performance pressure. Kind people help short-term. Caffeine is fake energy; nothing lasts.",
        patterns: ['better', 'worse', 'help', 'relief'],
        keywords: ['better', 'worse', 'help'],
      },
      {
        id: 'open',
        answer:
          "Sadness, lost interest, guilt, bad sleep, low appetite, concentration crash, grades down, passive thoughts when honest, no mania, no substances beyond occasional wine.",
        patterns: ['anything else', 'summary', 'overview'],
        keywords: ['else', 'summary'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — that's a lot at once. Can you narrow it? My head feels cottony today.",
        patterns: ['understand', 'repeat', 'explain'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'psych-bipolar-manic-no-sleep',
    titleMatchers: ["haven't slept", 'slept in days', 'no sleep'],
    complaintMatchers: ['feel amazing', "don't need sleep"],
    defaultAnswer:
      "I feel amazing — haven't really slept in days but I'm not tired. Ideas are flying, I spent big on the company, people say I talk fast. Family is dramatic about it. I'm not on drugs.",
    qa: [
      {
        id: 'chief',
        answer:
          "They dragged me here because they're scared — but I feel better than I have in years. I told the triage nurse I don't need sleep like normal people right now.",
        patterns: ['what brings', 'chief', 'why here'],
        keywords: ['bring', 'chief', 'here'],
      },
      {
        id: 'sleep',
        answer:
          "Maybe five days of almost no real sleep — a nap blip here, mostly wired. Everyone says that's impossible; I say they're jealous of my energy.",
        patterns: ['sleep', 'insomnia', 'rest'],
        keywords: ['sleep', 'rest'],
      },
      {
        id: 'mood',
        answer:
          "Euphoric — like the world finally makes sense and we're about to scale. It's not 'happy hour' happy, it's bigger.",
        patterns: ['mood', 'feel', 'amazing'],
        keywords: ['mood', 'feel'],
      },
      {
        id: 'energy',
        answer:
          "I could work straight through — no crash, no brain fog. If anything people slow me down with questions.",
        patterns: ['energy', 'hyper', 'restless'],
        keywords: ['energy', 'hyper'],
      },
      {
        id: 'speech',
        answer:
          "Yeah I talk fast — lots to say. If you can't track, that's a you problem not a me problem. Sorry, that sounded sharp.",
        patterns: ['speech', 'talk', 'fast', 'pressure'],
        keywords: ['speech', 'talk'],
      },
      {
        id: 'grandiosity',
        answer:
          "The product is genius if we execute — I see angles investors are blind to. Not bragging, just accurate.",
        patterns: ['grand', 'special', 'confidence'],
        keywords: ['grand', 'special'],
      },
      {
        id: 'spending',
        answer:
          "Dropped serious cash on gear and ads overnight — you scale or die. My partner panicked but fear keeps companies small.",
        patterns: ['spend', 'money', 'risk'],
        keywords: ['spend', 'money', 'risk'],
      },
      {
        id: 'distractible',
        answer:
          "I bounce tasks — that's multitasking. Five Slack channels, deck edits, call logs — founders live like this.",
        patterns: ['distract', 'focus', 'attention'],
        keywords: ['distract', 'focus'],
      },
      {
        id: 'family',
        answer:
          "Sister thinks I'm 'not myself' — insulting, honestly. They're embarrassed because I called out their risk aversion.",
        patterns: ['family', 'concern', 'brought'],
        keywords: ['family', 'concern'],
      },
      {
        id: 'substances',
        answer:
          "No stimulant binge, no coke, not rolling on MDMA — caffeine, yeah, a lot. Tox screen can pee whatever; I'm clean.",
        patterns: ['drug', 'substance', 'cocaine', 'stimulant'],
        keywords: ['drug', 'substance'],
      },
      {
        id: 'alcohol',
        answer:
          "Social drinks sometimes — not the driver this week. I've been locked in on work.",
        patterns: ['alcohol', 'drink', 'beer', 'wine'],
        keywords: ['alcohol', 'drink'],
      },
      {
        id: 'sex',
        answer:
          "Libido is… elevated. Everything's dialed up. I don't need to overshare graphic detail.",
        patterns: ['sex', 'hypersex'],
        keywords: ['sex'],
      },
      {
        id: 'irritable',
        answer:
          "I snap when people gatekeep — feels justified. Slow people itch at me more than usual.",
        patterns: ['irritable', 'angry', 'agitat'],
        keywords: ['irritable', 'angry'],
      },
      {
        id: 'prior-depression',
        answer:
          "After funding stress last winter I crashed hard — slept all week, felt useless. Burnout, not whatever label you're hunting.",
        patterns: ['depress', 'prior', 'before', 'crash'],
        keywords: ['depress', 'crash'],
      },
      {
        id: 'psychosis',
        answer:
          "I'm not hearing command voices or seeing stuff. Racing thoughts, not hallucinations.",
        patterns: ['hallucin', 'psychosis', 'voice'],
        keywords: ['hallucin', 'voice'],
      },
      {
        id: 'medications',
        answer:
          "No bipolar meds, never been on lithium — I'm telling you this is productivity, not illness.",
        patterns: ['medication', 'lithium', 'prescription'],
        keywords: ['med', 'lithium'],
      },
      {
        id: 'anxiety',
        answer:
          "Not panic frozen — forward motion. If anything anxious people should catch up to my pace.",
        patterns: ['anxiety', 'panic'],
        keywords: ['anxiety', 'panic'],
      },
      {
        id: 'timing',
        answer:
          "This energy stretch about five days — escalating, not months. Before that I was grinding normal-founder tired, not this.",
        patterns: ['when', 'how long', 'onset'],
        keywords: ['when', 'long'],
      },
      {
        id: 'vague',
        answer:
          "You're asking five questions at once — pick one. I'm fine, just accelerated.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'psych-schizophrenia-watching',
    titleMatchers: ['everyone is watching', 'people are following', 'watching me'],
    complaintMatchers: ['following me', 'watching'],
    defaultAnswer:
      "People feel like they're on me — same routes, interviews, neighbors knowing stuff they shouldn't. I hear commentary sometimes when I'm alone. I've pulled back from life, let hygiene slide, lost my job after a fight. Weed sometimes to mellow — not all day.",
    qa: [
      {
        id: 'chief',
        answer:
          "I came because someone pushed me — said I wasn't taking care of myself. Main thing: it doesn't feel safe out there, like I'm being watched or tracked.",
        patterns: ['what brings', 'chief', 'problem'],
        keywords: ['bring', 'problem'],
      },
      {
        id: 'paranoia',
        answer:
          "Can't shake the feeling people clock me — bus, lobby, waiting rooms. I know I can't show proof; it still feels real in my skin.",
        patterns: ['paranoia', 'follow', 'watch', 'track'],
        keywords: ['follow', 'watch'],
      },
      {
        id: 'voices',
        answer:
          "There's a male voice sometimes commenting — not always clear words, more like judging what I'm doing. I hate detailing it — feels like feeding it.",
        patterns: ['voice', 'hear', 'hallucin'],
        keywords: ['voice', 'hear'],
      },
      {
        id: 'withdrawal',
        answer:
          "I stay in more — leaving the apartment takes a push. Crowds feel exposing, like too many eyes.",
        patterns: ['withdraw', 'isolate', 'social'],
        keywords: ['withdraw', 'social'],
      },
      {
        id: 'function',
        answer:
          "Lost my warehouse job after I accused my boss of recording me — maybe I misread, maybe not — either way I'm broke and scared to apply again.",
        patterns: ['work', 'job', 'function'],
        keywords: ['work', 'job'],
      },
      {
        id: 'hygiene',
        answer:
          "Showers slip — sounds pathetic. Eating is whatever's in a bag. I notice and feel ashamed, still hard to start.",
        patterns: ['shower', 'hygiene', 'eat'],
        keywords: ['shower', 'hygiene', 'eat'],
      },
      {
        id: 'sleep',
        answer:
          "Fragmented — up listening, then tired all day. No refreshing sleep in a long time.",
        patterns: ['sleep', 'insomnia'],
        keywords: ['sleep'],
      },
      {
        id: 'substances',
        answer:
          "Weed occasionally to chill — not claiming it's smart. Not daily stoned — timing blurry.",
        patterns: ['weed', 'marijuana', 'drug', 'substance'],
        keywords: ['weed', 'drug'],
      },
      {
        id: 'medications',
        answer:
          "No antipsychotics or mood stabilizers — never stuck with treatment. Partly mistrust, partly avoidance.",
        patterns: ['medication', 'medicine', 'pill'],
        keywords: ['med', 'pill'],
      },
      {
        id: 'family',
        answer:
          "Family history is whisper-culture — uncle had 'episodes.' Nobody says schizophrenia out loud at Thanksgiving.",
        patterns: ['family', 'history', 'relative'],
        keywords: ['family', 'history'],
      },
      {
        id: 'depressed',
        answer:
          "Not classic sad all day — more hollow tense underneath. Flat sometimes when I'm exhausted from guarding.",
        patterns: ['mood', 'depress', 'sad'],
        keywords: ['mood', 'depress'],
      },
      {
        id: 'commands',
        answer:
          "Nothing lately like 'go hurt someone' — commentary is mean, not a direct order I'd obey. Still I get nervous admitting any of it.",
        patterns: ['command', 'harm', 'violence', 'suicid'],
        keywords: ['command', 'harm'],
      },
      {
        id: 'stress',
        answer:
          "Money stress, job loss, feeling exposed — pile-on worse the past year. No neat one trauma label.",
        patterns: ['stress', 'trauma'],
        keywords: ['stress', 'trauma'],
      },
      {
        id: 'anxiety',
        answer:
          "Anxiety is constant, but tangled with feeling watched — not separate test nerves.",
        patterns: ['anxiety', 'worry'],
        keywords: ['anxiety'],
      },
      {
        id: 'timing',
        answer:
          "Maybe eight months downhill — more suspicious, more isolated, harder to fake normal at interviews.",
        patterns: ['when', 'how long', 'start'],
        keywords: ['when', 'long'],
      },
      {
        id: 'relationships',
        answer:
          "Rare texts — easier to ghost than explain why I didn't show. Dating feels impossible with this headspace.",
        patterns: ['friend', 'relationship', 'partner'],
        keywords: ['friend', 'relationship'],
      },
      {
        id: 'treatment',
        answer:
          "Inpatient scares me — sounds extreme. I'm here because someone staged an intervention-lite.",
        patterns: ['hospital', 'admit', 'treatment'],
        keywords: ['hospital', 'treatment'],
      },
      {
        id: 'vague',
        answer:
          "Can you ask one thing? Too many questions makes me shut down.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'psych-ocd-hand-washing',
    titleMatchers: ["can't stop washing", 'stop washing', 'washing my hands'],
    complaintMatchers: ["can't stop", 'weird', 'hand'],
    defaultAnswer:
      "I wash until my hands hurt — contamination thoughts about desks, rails, my phone. If I stop early, panic spikes. I know it's excessive and I'm humiliated. School is suffering.",
    qa: [
      {
        id: 'chief',
        answer:
          "I'm here because… I do this hand-washing thing that's gotten out of control. Sounds silly saying it aloud but it eats my mornings.",
        patterns: ['what brings', 'chief', 'problem'],
        keywords: ['bring', 'problem'],
      },
      {
        id: 'washing',
        answer:
          "I restart washes — certain counts, certain feelings of 'clean' I chase. Knuckles crack and burn; I keep going anyway because stopping feels dangerous.",
        patterns: ['wash', 'soap', 'hand', 'scrub'],
        keywords: ['wash', 'hand', 'soap'],
      },
      {
        id: 'contamination',
        answer:
          "Touch something public and the 'dirty' film sticks mentally — logic says I'm fine, body screams until I rinse it away.",
        patterns: ['contamination', 'germ', 'dirty', 'clean'],
        keywords: ['contamination', 'germ'],
      },
      {
        id: 'intrusions',
        answer:
          "Thoughts shove in — sickness, hurting someone by being careless. I hate them; fighting them makes them louder until I ritual.",
        patterns: ['intrusive', 'thought', 'obsess'],
        keywords: ['thought', 'obsess'],
      },
      {
        id: 'anxiety',
        answer:
          "Panic-y pressure in my chest if I skip a step — not regular worry, more like alarm until I comply.",
        patterns: ['anxiety', 'panic', 'worry'],
        keywords: ['anxiety', 'panic'],
      },
      {
        id: 'school',
        answer:
          "Late to first period sometimes — whole loop at the sink. Grades dropped from missed homework; I used to care about GPA a lot.",
        patterns: ['school', 'homework', 'grade', 'class'],
        keywords: ['school', 'grade'],
      },
      {
        id: 'insight',
        answer:
          "I know it's over the top — that's the awful part. Can't stop anyway; feels like a glitch between knowing and tolerating.",
        patterns: ['know', 'insight', 'excessive', 'weird'],
        keywords: ['insight', 'know'],
      },
      {
        id: 'psychosis',
        answer:
          "Nobody's whispering through vents — it's my fear brain, not external voices. I'm not delusionally sure demons are on me either.",
        patterns: ['hallucin', 'voice', 'psychosis'],
        keywords: ['hallucin', 'psychosis'],
      },
      {
        id: 'family',
        answer:
          "Parents think it's college stress — I haven't showed them timers at the sink; they'd panic.",
        patterns: ['family', 'parent'],
        keywords: ['family', 'parent'],
      },
      {
        id: 'friends',
        answer:
          "I cancel plans or show late — excuses about traffic. Friendship maintenance feels impossible until I fix… this.",
        patterns: ['friend', 'social'],
        keywords: ['friend', 'social'],
      },
      {
        id: 'meds',
        answer:
          "Melatonin sometimes — no SSRIs or therapy meds yet. Ashamed to start the conversation until now.",
        patterns: ['medication', 'medicine'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'timing',
        answer:
          "Over a year escalating — started as extra sanitizer, now it's whole episodes at the sink.",
        patterns: ['when', 'how long', 'start'],
        keywords: ['when', 'long'],
      },
      {
        id: 'better-worse',
        answer:
          "Giving in soothes short-term — long-term destroys my skin and my schedule. Distraction helps a little; the loop returns.",
        patterns: ['worse', 'better', 'help'],
        keywords: ['worse', 'help'],
      },
      {
        id: 'trauma',
        answer:
          "No clean trauma narrative I'm hiding — it spiraled on its own, which makes me angrier at myself honestly.",
        patterns: ['trauma', 'abuse'],
        keywords: ['trauma'],
      },
      {
        id: 'mood',
        answer:
          "Frustrated-trapped more than crying depressed — though bad days I feel hopeless about ever being normal.",
        patterns: ['mood', 'depress', 'sad'],
        keywords: ['mood', 'depress'],
      },
      {
        id: 'stress',
        answer:
          "College apps stress exists — but rituals started before that heat and grew anyway.",
        patterns: ['stress'],
        keywords: ['stress'],
      },
      {
        id: 'ritual-block',
        answer:
          "If someone interrupts mid-ritual I get a surge of panic — sorry — like I'll snap at them even though it's not their fault.",
        patterns: ['interrupt', 'block', 'stop'],
        keywords: ['interrupt', 'stop'],
      },
      {
        id: 'open',
        answer:
          "Contamination fears, washing compulsions, skin damage, school impact, insight intact, no psychosis.",
        patterns: ['anything else', 'summary'],
        keywords: ['else', 'summary'],
      },
      {
        id: 'vague',
        answer:
          "Sorry — brain fog from arguing with the sink all morning. One question at a time?",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
  {
    key: 'psych-ptsd-reliving',
    titleMatchers: ['reliving', 'keep reliving', 'what happened'],
    complaintMatchers: ["can't stop thinking", 'thinking about it', 'nightmare'],
    defaultAnswer:
      "Since a bad shift eight months ago I nightmare, flashback to pieces I don't want, avoid the area at work, startle easy, sleep's wrecked. I'm a nurse — used to handle stress better. Wine sometimes turns the volume down — not proud.",
    qa: [
      {
        id: 'chief',
        answer:
          "I can't stop replaying something from work — not 'busy day' stress, more like my mind hijacked. Figured I should talk before I unravel completely.",
        patterns: ['what brings', 'chief', 'problem'],
        keywords: ['bring', 'problem'],
      },
      {
        id: 'trauma',
        answer:
          "A shift went wrong — patient outcome haunted me. I don't want graphic detail on repeat — suffices to say it broke something in my head.",
        patterns: ['trauma', 'event', 'happened', 'shift'],
        keywords: ['trauma', 'shift', 'event'],
      },
      {
        id: 'nightmare',
        answer:
          "Dreams shove me back — machines, tension in the room, the weight of not fixing it. I wake sweaty and can't settle.",
        patterns: ['nightmare', 'dream', 'sleep'],
        keywords: ['nightmare', 'sleep'],
      },
      {
        id: 'flashback',
        answer:
          "Certain beeps or smells yank me there — like body flash, not just memory. I hate when it happens on the unit.",
        patterns: ['flashback', 'intrusion', 'relive'],
        keywords: ['flashback', 'relive'],
      },
      {
        id: 'avoidance',
        answer:
          "I trade around that bay — long way walking sometimes. I skip shows with medical gore. Avoidance got automatic before I named it.",
        patterns: ['avoid', 'trigger', 'remind'],
        keywords: ['avoid', 'trigger'],
      },
      {
        id: 'hypervigilance',
        answer:
          "I scan rooms, jump at slammed doors — off shift too. Intellectually safe at Target, body disagrees.",
        patterns: ['hyper', 'startle', 'vigil', 'alert'],
        keywords: ['startle', 'alert'],
      },
      {
        id: 'anxiety',
        answer:
          "Anxiety hums under everything — spikes when cues hit. Not random panic without context; tied to reminders.",
        patterns: ['anxiety', 'panic'],
        keywords: ['anxiety', 'panic'],
      },
      {
        id: 'guilt',
        answer:
          "Guilt I should've been quicker, seen more — unfair to myself maybe, feels true anyway. Anger at myself for struggling.",
        patterns: ['guilt', 'blame', 'shame'],
        keywords: ['guilt', 'shame'],
      },
      {
        id: 'depression',
        answer:
          "Heavy mood — joy muted. I still work but I'm not the version of me who picked up extras for colleagues.",
        patterns: ['depress', 'mood', 'sad'],
        keywords: ['depress', 'mood'],
      },
      {
        id: 'suicide',
        answer:
          "Passive heaviness sometimes — no plan, no intent. Being direct because I know the ER drill: honesty beats surprises.",
        patterns: ['suicid', 'harm yourself'],
        keywords: ['suicid', 'harm'],
      },
      {
        id: 'work',
        answer:
          "Still clock in — need income, still care — but I'm brittle. Coworker jokes land wrong; I hide in bathrooms sometimes to breathe.",
        patterns: ['work', 'job', 'nurse', 'shift'],
        keywords: ['work', 'nurse', 'shift'],
      },
      {
        id: 'substance',
        answer:
          "Wine a few nights — dumb coping. No pills, no street drugs. I know alcohol isn't treatment.",
        patterns: ['alcohol', 'drink', 'substance'],
        keywords: ['alcohol', 'drink'],
      },
      {
        id: 'medications',
        answer:
          "No psych meds yet — pride and procrastination. Considering it now because muscle-through failed.",
        patterns: ['medication', 'medicine', 'ssri'],
        keywords: ['med', 'ssri'],
      },
      {
        id: 'family',
        answer:
          "Partner knows I'm off — spare them gritty replay. Parents 'support' in generic ways that miss how stuck I am.",
        patterns: ['family', 'partner', 'support'],
        keywords: ['family', 'partner'],
      },
      {
        id: 'timing',
        answer:
          "Eight months-ish after the shift — didn't bounce back like past bad nights adrenaline-wise.",
        patterns: ['when', 'how long', 'start'],
        keywords: ['when', 'long'],
      },
      {
        id: 'concentration',
        answer:
          "Charting takes longer — reread everything, scared of missing cues again. Memory feels sticky with intrusive clips.",
        patterns: ['concentrat', 'focus', 'memory'],
        keywords: ['focus', 'memory'],
      },
      {
        id: 'hallucinations',
        answer:
          "No voices commanding me, no visions — intrusions feel trauma-linked, not psychosis.",
        patterns: ['hallucin', 'voice', 'see things'],
        keywords: ['hallucin', 'voice'],
      },
      {
        id: 'helps',
        answer:
          "Talking helps short windows — grounding, slower breathing sometimes. Nothing reliably resets sleep yet.",
        patterns: ['help', 'cope', 'better'],
        keywords: ['help', 'cope'],
      },
      {
        id: 'vague',
        answer:
          "That's a big bundle of questions — give me one? Trauma stuff floods if I unpack too fast.",
        patterns: ['understand', 'repeat'],
        keywords: ['understand', 'repeat'],
      },
    ],
  },
]
