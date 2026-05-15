import type { FallbackScenario } from './types'

export const infectiousDiseaseFallbackScenarios: FallbackScenario[] = [
  {
    key: 'sepsis-pyelo-shaking-lauren-mitchell',
    titleMatchers: ["can't stop shaking", 'stop shaking', 'shaking'],
    complaintMatchers: ['shaking', 'feel terrible'],
    defaultAnswer:
      "I'm scared — I can't stop shaking and I feel like I'm burning up. Peeing hurts like razor blades and my sides ache if I move wrong. I got dizzy standing in triage and I keep feeling nauseous, like I barely want water.",
    qa: [
      {
        id: 'fever',
        answer:
          "I've been running fevers the last two days — today's the worst. It comes in waves where I'm roasting, then I shake so hard my teeth chatter. I didn't take my temperature at home; I just knew I was hot.",
        patterns: ['fever', 'temperature', 'hot', 'burning up'],
        keywords: ['fever', 'temperature'],
      },
      {
        id: 'chills',
        answer:
          "The chills are brutal — like cold from the inside. My wife piled blankets on me and I still couldn't get warm during the shaking spells. I honestly thought I was having a panic attack at first, but it keeps coming back.",
        patterns: ['chill', 'rigor', 'shake', 'shiver'],
        keywords: ['chill', 'shake'],
      },
      {
        id: 'urination',
        answer:
          "Yeah, it burns when I pee and I feel like I have to go again two minutes later. The urine looks darker than usual — maybe a little cloudy, I'm not totally sure. That's been going on about two days with the fever.",
        patterns: ['urin', 'pee', 'void', 'dysur', 'bladder'],
        keywords: ['urin', 'pee'],
      },
      {
        id: 'flank',
        answer:
          "Both sides of my back hurt, but the right is worse — like someone punched me in the kidney. It hurts more if someone taps there in the ER, I jumped. I thought maybe I pulled something, but it feels sick, not muscular.",
        patterns: ['flank', 'back pain', 'kidney', 'side'],
        keywords: ['flank', 'kidney'],
      },
      {
        id: 'nausea',
        answer:
          "I'm nauseated most of the day — I haven't really eaten since yesterday. I dry-heaved a little this morning. Even water tastes weird and my mouth feels dry, like I can't keep up.",
        patterns: ['nausea', 'vomit', 'throw up', 'sick to stomach'],
        keywords: ['nausea', 'vomit'],
      },
      {
        id: 'timing',
        answer:
          "Symptoms started about two days ago with burning urine, then chills kicked in. This morning I went downhill fast — shaking worse, more dizzy, just couldn't tough it out at my desk anymore. I wish I'd come in yesterday.",
        patterns: ['when', 'how long', 'onset', 'start', 'duration', 'timeline'],
        keywords: ['when', 'long', 'start'],
      },
      {
        id: 'headache',
        answer:
          "I have a dull headache, yeah, but it's not the main thing — it's the fever and shaking that freak me out. My head feels tight when I'm lightheaded, like my brain is sloshing when I stand too fast.",
        patterns: ['headache', 'head hurt', 'head pain'],
        keywords: ['headache', 'head'],
      },
      {
        id: 'travel-exposure',
        answer:
          "No travel — I've been stuck in tax season at work and home. Nobody at home is sick like this. I haven't been in the hospital recently and I don't work around sick people, beyond colleagues with colds in the office.",
        patterns: ['travel', 'trip', 'abroad', 'exposure', 'sick contact'],
        keywords: ['travel', 'exposure'],
      },
      {
        id: 'cough',
        answer:
          "My breathing feels fast because I'm anxious and hot, but I don't have a cough or sore throat. No funky phlegm — honestly I wish it was \"just a cold\" because this feels scarier.",
        patterns: ['cough', 'phlegm', 'sore throat'],
        keywords: ['cough'],
      },
      {
        id: 'weight-appetite',
        answer:
          "I haven't weighed myself, but I've barely eaten so I'm probably a little down. Nothing purposeful — just nausea and feeling awful. No intentional dieting if that's what you mean.",
        patterns: ['weight', 'appetite', 'eating'],
        keywords: ['weight', 'appetite'],
      },
      {
        id: 'medications',
        answer:
          "I take a daily antacid for reflux and ibuprofen sometimes for headaches — a few doses this week hoping it would help, didn't really. No antibiotics — I don't even know what I'd be treating. Birth control pill, that's it.",
        patterns: ['medication', 'medicine', 'drug', 'pill', 'prescription'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'family-history',
        answer:
          "My mom had kidney stones once — painful urination story but not like this. Dad's healthy. No weird immune problems I'm aware of. I don't think anyone in my family had sepsis or anything dramatic like that.",
        patterns: ['family', 'relative', 'genetic', 'history'],
        keywords: ['family', 'relative'],
      },
      {
        id: 'what-helps',
        answer:
          "Warm blankets during the rigors help a tiny bit psychologically. Water sips sometimes settle my stomach for a minute. Nothing really fixes it — the shaking keeps coming back and I feel weaker each wave.",
        patterns: ['help', 'better', 'relief', 'improve'],
        keywords: ['help', 'better'],
      },
      {
        id: 'what-worsens',
        answer:
          "Standing makes me dizzy and my vision greyed once in the waiting room — scared me. Moving makes the flank ache spike. The fever spikes feel like they're getting closer together today compared to yesterday.",
        patterns: ['worse', 'aggrav', 'trigger', 'precipitat'],
        keywords: ['worse'],
      },
      {
        id: 'gi-other',
        answer:
          "Bowel movements have been kind of loose but I don't have wild diarrhea or blood. Belly is mostly nausea, not localized cramping like food poisoning stories. My husband had a stomach bug last month — I didn't catch it then.",
        patterns: ['diarrhea', 'stool', 'bowel', 'abdominal pain'],
        keywords: ['diarrhea', 'bowel'],
      },
      {
        id: 'obgyn-stone',
        answer:
          "Not pregnant — periods normal last month. I've never been told I have a kidney stone before, though my mom's history makes me wonder. The pain feels higher and sicker than what people describe as a stone, if that makes sense.",
        patterns: ['pregnan', 'stone', 'uti prior', 'surgery'],
        keywords: ['pregnan', 'stone'],
      },
      {
        id: 'occupation-stress',
        answer:
          "I'm an accountant — it's tax crunch time so I've been sitting a lot, stressed, not drinking enough water maybe. I kept trying to work through it yesterday like an idiot. First time I've ever been this sick.",
        patterns: ['occupation', 'work', 'job', 'stress'],
        keywords: ['work', 'job'],
      },
      {
        id: 'general-vague',
        answer:
          "Overall I just feel toxic — hot, shaky, weak, and my sides hurt when I move. I'm usually the person who pushes through colds; this doesn't feel like a cold at all. My wife finally made me come in because she didn't like how pale I looked.",
        patterns: ['tell me more', 'anything else', 'describe', 'overall', 'symptoms'],
        keywords: ['symptom', 'describe', 'more'],
      },
      {
        id: 'hello',
        answer:
          "Hi — I'm shaking, burning up, and my urine hurts… I feel like I'm going to pass out if I stand too long. I'm trying not to spiral but I'm really scared. I need to know this isn't \"nothing.\"",
        patterns: ['hello', 'hi ', 'hey '],
        keywords: ['hello', 'hi'],
      },
    ],
  },
  {
    key: 'endocarditis-fever-michael-perez',
    titleMatchers: ["fever just won't", "fever just won", 'fever for weeks'],
    complaintMatchers: ['fevers for weeks'],
    defaultAnswer:
      "I've had off-and-on fevers for like a month — nights are the worst with sweat through my shirt. I'm tired all the time and my belt's loose without trying. There's a weird new heart noise, I think, and my nails look messed up with little red lines.",
    qa: [
      {
        id: 'fever',
        answer:
          "The fevers aren't constant — they creep up evenings, sometimes 101 at home. I'll feel hot, cold, hot again. I've taken Tylenol and it barely touches it. Today in clinic it's there again, low-grade but I know it's not normal for weeks.",
        patterns: ['fever', 'temperature', 'hot'],
        keywords: ['fever'],
      },
      {
        id: 'chills-night-sweats',
        answer:
          "Chills sometimes ride along with the fever spikes — not as violent as flu memories. Night sweats soak my shirt a few times a week; my wife noticed the laundry smell. I'm embarrassed admitting how gross it is.",
        patterns: ['chill', 'night sweat', 'sweat'],
        keywords: ['chill', 'sweat'],
      },
      {
        id: 'weight-fatigue-cough',
        answer:
          "I've dropped weight without trying — pants fit loose, face looks thinner in the mirror maybe. I'm wiped carrying lumber at work. I've had a mild cough and breathlessness on stairs — not pneumonia loud, more like I can't catch my wind easily.",
        patterns: ['weight', 'fatigue', 'tired', 'cough', 'breath'],
        keywords: ['weight', 'cough'],
      },
      {
        id: 'ivdu-risk',
        answer:
          "I've used heroin off and on — mostly snorting but sometimes IV when money's tight and I'm stupid. My veins look crappy and I'm ashamed. I stopped a few days ago when I felt worse, not because I'm magically clean, just scared.",
        patterns: ['drug', 'heroin', 'needle', 'iv ', 'inject', 'substance'],
        keywords: ['drug', 'needle'],
      },
      {
        id: 'dental-procedures',
        answer:
          "No recent dentist — can't afford it. I know you're supposed to with heart stuff but I haven't had work done. No dialysis lines or hospital stays recently either. Construction site scrapes happen but nothing deep needing ER.",
        patterns: ['dental', 'teeth', 'mouth', 'procedure'],
        keywords: ['dental'],
      },
      {
        id: 'headache',
        answer:
          "Headaches sometimes with the fevers — pressure behind my eyes, not the worst headache of my life. I'm more bothered by feeling winded and heart pounding. Lights don't kill me like meningitis TV drama, I don't think.",
        patterns: ['headache', 'head pain'],
        keywords: ['headache'],
      },
      {
        id: 'travel-exposure',
        answer:
          "No travel — I work local sites, beer after shift sometimes. Roommate had a cold last week; nothing like this. I don't know anyone with TB or weird infections unless you count people on the street I used to hang with.",
        patterns: ['travel', 'trip', 'exposure', 'contact'],
        keywords: ['travel', 'exposure'],
      },
      {
        id: 'nausea',
        answer:
          "I feel queasy some mornings but I can still eat — appetite is meh. No projectile vomiting. I get sweaty and nauseated when the fever spikes hit together — hard to separate what causes what.",
        patterns: ['nausea', 'vomit', 'appetite'],
        keywords: ['nausea', 'appetite'],
      },
      {
        id: 'timing',
        answer:
          "About a month of this waxing-waning stuff — first I thought it was exhaustion from overtime. Three weeks ago night sweats started. Last week I noticed splinter-looking marks on nails and got nervous. Today I finally came in.",
        patterns: ['when', 'how long', 'onset', 'duration'],
        keywords: ['when', 'long'],
      },
      {
        id: 'medications',
        answer:
          "Ibuprofen for aches, Tylenol for fever sometimes. No prescriptions except an albuterol inhaler I barely use since teen asthma. No antibiotics recently — I got clindamycin years ago for tooth infection, finished it.",
        patterns: ['medication', 'medicine', 'pill', 'rx'],
        keywords: ['med', 'medicine'],
      },
      {
        id: 'family-history',
        answer:
          "Dad had a heart valve problem older age — murmur thing, he's on watch. Mom diabetes. No young people in my family with weird infections I know of. I never got my teeth sorted like I should.",
        patterns: ['family', 'relative', 'history'],
        keywords: ['family'],
      },
      {
        id: 'skin-nails-murmur',
        answer:
          "Tiny red-brown lines under a couple fingernails — looks like I slammed them in a toolbox but I didn't. My chest feels fluttery sometimes and the triage nurse said something about a new murmur; I didn't know I had an old baseline to compare.",
        patterns: ['nail', 'skin', 'rash', 'murmur', 'heart sound'],
        keywords: ['nail', 'murmur'],
      },
      {
        id: 'what-helps',
        answer:
          "Rest and fluids take the edge off the fatigue a little. Fever pills shave one degree maybe — nothing dramatic. Cool shower felt good once until I started shaking again — weird, I know.",
        patterns: ['help', 'better', 'relief'],
        keywords: ['help', 'better'],
      },
      {
        id: 'what-worsens',
        answer:
          "Physical work flares the breathing and pounding heart. Lying flat sometimes feels worse — I prop up on pillows. Hot rooms make me feel flushed faster. I'm worried I'm making my heart angry by ignoring this.",
        patterns: ['worse', 'exert', 'trigger'],
        keywords: ['worse'],
      },
      {
        id: 'general-vague',
        answer:
          "Big picture: fevers that won't quit, soaking sweats, weight falling off, new heart noise, nails looking weird, and I get winded easier. I'm scared it's something bad because IV use makes me think the worst, even though I'm hoping you're going to tell me I'm dramatic.",
        patterns: ['tell me more', 'describe', 'overall', 'anything else'],
        keywords: ['symptom', 'describe'],
      },
      {
        id: 'urination-negative',
        answer:
          "Peeing is mostly normal — no burning, no urgency saga. Flank doesn't hurt like a kidney infection story I've heard. That's part of why I didn't think UTI, though I'm not a doctor so maybe that means nothing.",
        patterns: ['urin', 'uti', 'bladder', 'kidney'],
        keywords: ['urin'],
      },
      {
        id: 'hello',
        answer:
          "Hey — I've had fevers for weeks, night sweats, weight loss, weird nails, and I feel short of breath easier than I should. I use drugs sometimes and I'm embarrassed, but I need help figuring out what's wrong.",
        patterns: ['hello', 'hi ', 'hey '],
        keywords: ['hello', 'hi'],
      },
    ],
  },
  {
    key: 'malaria-return-travel-david-khan',
    titleMatchers: ['sick after my trip', 'after my trip', 'feel sick after'],
    complaintMatchers: ['fevers since i got back'],
    defaultAnswer:
      "I got home from Africa about two weeks ago and these fevers started ramping up — I'll feel freezing, then roasting, then drenched. Headache like a vise, body aches, nauseous. I didn't take malaria pills like I was supposed to — stupid, I know — and my girlfriend says my eyes look a little yellow.",
    qa: [
      {
        id: 'travel',
        answer:
          "I was in sub-Saharan Africa for fieldwork — dusty bus rides, mosquito nets, the whole cliché. Got home roughly two weeks ago. I felt tired at first like jet lag, then cyclic fevers took over. No other countries afterward, straight back to school.",
        patterns: ['travel', 'trip', 'africa', 'abroad', 'where'],
        keywords: ['travel', 'africa'],
      },
      {
        id: 'fever-pattern',
        answer:
          "Fevers come in cycles — I'll shake, burn up, then sweat through my shirt. It's not a steady 99 every day; it's dramatic waves, maybe every day or two, hard to count because classes blur together. Thermometer hit 102-something yesterday.",
        patterns: ['fever', 'temperature', 'pattern', 'cycle'],
        keywords: ['fever', 'cycle'],
      },
      {
        id: 'chills',
        answer:
          "Chills hit before the hot phase — teeth chatter under blankets even though it's warm in the apartment. My roommate thought I had the flu but antiviral timeline doesn't match since I'm two weeks post-travel and it's still swinging.",
        patterns: ['chill', 'rigor', 'shake'],
        keywords: ['chill'],
      },
      {
        id: 'headache',
        answer:
          "Headache is frontal mostly — constant pressure behind my eyes worse when I cough. Lights bother me a little but I'm not screaming photophobia like meningitis Google results; I'm just sensitive and irritable.",
        patterns: ['headache', 'head pain'],
        keywords: ['headache'],
      },
      {
        id: 'nausea',
        answer:
          "I'm nauseated — smell of cooking makes me gag. Ate crackers mostly yesterday. No blood in vomit — I haven't vomited much, just retching. My abdomen isn't localized tender, just blah.",
        patterns: ['nausea', 'vomit', 'appetite'],
        keywords: ['nausea'],
      },
      {
        id: 'prophylaxis',
        answer:
          "I was supposed to take malaria prophylaxis — I ran out early, kept forgetting refills, told myself I'd be fine. I'm not proud; dissertation stress, bad sleep, classic grad student excuses. No PEP for anything else post-trip beyond updating vaccines before I left.",
        patterns: ['malar', 'prophyl', 'pill', 'doxycycline', 'malarone'],
        keywords: ['malar', 'pill'],
      },
      {
        id: 'exposure-mosquito',
        answer:
          "Mosquito bites definitely happened — woke up itchy most nights even with net sometimes half-on stupidly. No tick bites I recall. Didn't drink untreated water on purpose but brushed teeth with tap sometimes because I'm an idiot.",
        patterns: ['mosquito', 'bite', 'net', 'exposure', 'water'],
        keywords: ['mosquito', 'exposure'],
      },
      {
        id: 'timing',
        answer:
          "First week home I was jet-lagged-tired only. Second week fevers started small then turned into these obvious cycles. Today is worse headache; I almost missed my lab meeting. Roughly fourteen days since landing if you're counting.",
        patterns: ['when', 'how long', 'onset', 'duration'],
        keywords: ['when', 'long'],
      },
      {
        id: 'cough-breathing',
        answer:
          "No real cough — maybe cleared throat from dust. Breathing okay at rest, oxygen felt fine at triage. I'm not gasping like pneumonia memories from undergrad flu — more whole-body misery than lung-focused.",
        patterns: ['cough', 'breath', 'lung', 'oxygen'],
        keywords: ['cough'],
      },
      {
        id: 'urination',
        answer:
          "Urine darker than usual, maybe concentrated because I'm not drinking enough. No burning UTI feeling. Side pain isn't prominent — vague achy back from bed-rest but not classic kidney stone agony.",
        patterns: ['urin', 'pee', 'kidney'],
        keywords: ['urin'],
      },
      {
        id: 'weight-appetite',
        answer:
          "I think I lost a few pounds — belts looser, face tired. Eating poorly because nothing sounds good. Not trying to lose weight; thesis stress usually makes me gain from vending machine, ironically.",
        patterns: ['weight', 'appetite'],
        keywords: ['weight'],
      },
      {
        id: 'medications',
        answer:
          "ADHD stimulant prescription weekdays — skipped lately because nausea. Occasional melatonin. No antibiotics. Brought ibuprofen from my desk drawer hoping headaches would vanish — didn't.",
        patterns: ['medication', 'medicine', 'pill'],
        keywords: ['med'],
      },
      {
        id: 'family-history',
        answer:
          "Dad has sickle trait they said — not sure relevance. Mom healthy. Sister got dengue years ago in Peace Corps — she's paranoid I have something tropical and pushed me to come in tonight.",
        patterns: ['family', 'relative', 'history'],
        keywords: ['family'],
      },
      {
        id: 'what-helps',
        answer:
          "Cold washcloth on forehead helps headache briefly. Sleep is fragmented but when I doze I feel slightly less achy. Fluids with electrolytes taste better than plain water — ginger ale settles stomach a notch.",
        patterns: ['help', 'better', 'relief'],
        keywords: ['help'],
      },
      {
        id: 'what-worsens',
        answer:
          "Screens and fluorescent lights spike my headache. Standing quickly makes me woozy. Heat in the apartment makes the fever phase feel suffocating. Stress about deadlines makes everything feel amplified emotionally.",
        patterns: ['worse', 'trigger', 'aggrav'],
        keywords: ['worse'],
      },
      {
        id: 'rash-bleeding',
        answer:
          "No obvious rash — maybe mosquito bite marks healing. No bleeding gums randomly. I bruise easy usually; nothing new scary. My girlfriend noticed sclera a bit yellow in bright bathroom light; could be lighting, we're not sure.",
        patterns: ['rash', 'bleed', 'bruise', 'jaund'],
        keywords: ['rash'],
      },
      {
        id: 'general-vague',
        answer:
          "Overall: post-Africa grad student who skipped prophylaxis now with cyclical fevers, body aches, pounding head, nausea, and maybe a tint of yellow. I'm hoping it's something mundane but my sister's dengue story freaks me out.",
        patterns: ['tell me more', 'describe', 'overall'],
        keywords: ['describe', 'symptom'],
      },
      {
        id: 'hello',
        answer:
          "Hi — I've had fevers since coming back from Africa, bad headaches, chills and sweats, and I didn't take malaria prevention like I should. I'm scared and embarrassed and I need help.",
        patterns: ['hello', 'hi ', 'hey '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'hiv-opportunistic-cough-jason-reed',
    titleMatchers: ['losing weight and coughing', 'weight and coughing'],
    complaintMatchers: ['getting sicker', 'sicker and sicker'],
    defaultAnswer:
      "I've been wasting away — pants sag, night sweats ruin my sheets, cough won't quit months now. My mouth has white gunk I can't brush off and I catch everything going around the kitchen. I've never officially been told HIV — honestly I avoided testing — and I'm terrified what this means for my kid seeing me weak.",
    qa: [
      {
        id: 'weight-night-sweats',
        answer:
          "Weight's been dropping a few months — coworkers joked I look 'cut' but it's not gym cuts. Night sweats soak my shirt several nights weekly; smelled like fear honestly. I feel clammy daytime too, low-grade fevers maybe.",
        patterns: ['weight', 'night sweat', 'sweat', 'fever'],
        keywords: ['weight', 'sweat'],
      },
      {
        id: 'cough-breathing',
        answer:
          "Dry-ish cough forever it feels like — months, not days. Sometimes tight chest walking to the bus. Not coughing blood that I've seen. Oxygen felt a little low at intake; I get winded carrying trays faster than before.",
        patterns: ['cough', 'breath', 'lung', 'sputum'],
        keywords: ['cough'],
      },
      {
        id: 'oral-thrush',
        answer:
          "White patches on my tongue and cheeks — scraping leaves red sores; gross metallic taste. Hurts with spicy shift-meal leftovers. Thought it was dehydration or vaping at first, but it keeps spreading.",
        patterns: ['mouth', 'tongue', 'thrush', 'white', 'swallow'],
        keywords: ['mouth', 'thrush'],
      },
      {
        id: 'infections-recurrent',
        answer:
          "I've had two sinus things, a skin boil, mouth thrush now — feels like my immune system clocked out. Never hospitalized. Didn't finish one antibiotic course because money; stupid, I know. Coworker flu wiped me harder than them.",
        patterns: ['infection', 'immune', 'recurrent', 'sick'],
        keywords: ['infection'],
      },
      {
        id: 'sexual-exposure',
        answer:
          "I'm not trying to hide stuff — I've had male partners receptive sometimes, inconsistent condoms. No IV drugs. Never tested HIV; scared of paperwork, judgment, whatever lame excuses. Partner three years ago mentioned PrEP once; I laughed it off then.",
        patterns: ['sex', 'partner', 'hiv', 'prep', 'condom', 'sti'],
        keywords: ['sex', 'partner'],
      },
      {
        id: 'fever-chills',
        answer:
          "Fevers low grade mostly — hot flashes at work near the grill. True teeth-chattering chills less often than sweats. I take Tylenol PM to sleep through sweating; helps a little, not really.",
        patterns: ['fever', 'chill', 'temperature'],
        keywords: ['fever', 'chill'],
      },
      {
        id: 'headache',
        answer:
          "Pressure headaches few times weekly — not classic migraines with aura. Neck a little stiff when stressed; nothing meningitis dramatic. Mostly I'm tired and cough-y, headache is side note.",
        patterns: ['headache', 'head pain'],
        keywords: ['headache'],
      },
      {
        id: 'travel-exposure',
        answer:
          "No travel — born here, restaurant job downtown. TB? My coworker did time years ago — not sure if that's relevant. No shelters lately. Kitchen TB test last year for health card negative.",
        patterns: ['travel', 'tb', 'exposure', 'contact'],
        keywords: ['travel', 'tb'],
      },
      {
        id: 'nausea-appetite',
        answer:
          "Appetite garbage — food smells weird, nausea comes and goes. Lost taste partially maybe thrush. Dropped fifteen pounds ballpark without trying — scared to step on scale exact.",
        patterns: ['nausea', 'appetite', 'eating'],
        keywords: ['nausea', 'appetite'],
      },
      {
        id: 'timing',
        answer:
          "Cough crept up three-plus months, thrush last few weeks obvious, sweats escalated last month. Finally came because dish shift left me breathless carrying bins upstairs — panic moment.",
        patterns: ['when', 'how long', 'onset', 'duration'],
        keywords: ['when', 'long'],
      },
      {
        id: 'medications',
        answer:
          "Naproxen sometimes for back pain, multivitamin sporadically. Tried nystatin mouth rinse from urgent care past weekend — mild help maybe. No HAART — nobody prescribed anything because I never got labs.",
        patterns: ['medication', 'medicine', 'pill'],
        keywords: ['med'],
      },
      {
        id: 'family-history',
        answer:
          "Dad heart disease. Mom lupus — autoimmune stuff that scares me maybe it's genetic bad luck. No known HIV family, though we don't discuss that stuff at holidays honestly.",
        patterns: ['family', 'relative', 'history'],
        keywords: ['family'],
      },
      {
        id: 'urination',
        answer:
          "Peeing mostly normal — no dysuria saga. Urine smell strong when dehydrated from sweating at work. Flank pain not really — more chest and fatigue story.",
        patterns: ['urin', 'uti', 'kidney'],
        keywords: ['urin'],
      },
      {
        id: 'what-helps',
        answer:
          "Rest days help a little — can't afford many. Cool mist humidifier at night eases cough briefly. Warm tea soothes throat until thrush sting returns. Nothing fixes the sweats.",
        patterns: ['help', 'better', 'relief'],
        keywords: ['help'],
      },
      {
        id: 'what-worsens',
        answer:
          "Kitchen heat and smoky proteins trigger cough. Long shifts crush me — I drag home. Emotional stress about bills spikes palpitations sweaty palms. Lying flat makes cough worse; I sleep propped.",
        patterns: ['worse', 'trigger', 'exacerbat'],
        keywords: ['worse'],
      },
      {
        id: 'tb-sarcoid-cancer-fear',
        answer:
          "I'm scared it's TB or cancer — uncle died lung cancer younger than he should have. Sarcoidosis I barely understand; friend mentioned it. I need tests because guessing on WebMD is making me spiral at 3 a.m.",
        patterns: ['tuberculosis', 'cancer', 'sarcoid', 'worry'],
        keywords: ['cancer', 'tuberculosis'],
      },
      {
        id: 'general-vague',
        answer:
          "Big picture: months cough, wasting, soaking nights, thrush, frequent infections, queer guy who dodged testing. I'm ashamed and exhausted and hoping you'll be straight with me about next steps without judging.",
        patterns: ['tell me more', 'describe', 'overall'],
        keywords: ['describe', 'symptom'],
      },
      {
        id: 'hello',
        answer:
          "Hello — I'm losing weight, coughing forever, night sweats, weird mouth white patches, and I feel like my body is falling apart. Restaurant worker, never diagnosed HIV, scared to hear the truth.",
        patterns: ['hello', 'hi ', 'hey '],
        keywords: ['hello'],
      },
    ],
  },
  {
    key: 'bacterial-meningitis-neck-emma-rodriguez',
    titleMatchers: ['neck hurts', 'lights hurt', 'lights hurt my eyes'],
    complaintMatchers: ['head and neck hurt'],
    defaultAnswer:
      "My head feels like it's splitting since this morning — worst I've ever had — and my neck is stiff as a board. Light from the hallway makes me want to scream, I'm nauseated, and I'm confused about simple stuff my roommate asks. I noticed a few tiny purple dots on my legs after my shower; maybe I'm overreacting.",
    qa: [
      {
        id: 'headache',
        answer:
          "Headache exploded this morning — not a slow migraine build. Pressure everywhere, especially back of head. Any jostling makes me whimper. I can't focus on my phone screen long; that never happens to me.",
        patterns: ['headache', 'head pain', 'head hurt'],
        keywords: ['headache', 'head'],
      },
      {
        id: 'neck-stiffness',
        answer:
          "Neck stiffness is real — I can't tuck chin to chest without horrible pain. My roommate tried joking 'stop being dramatic' until she saw me wince. Turning side-to-side is almost impossible; feels locked.",
        patterns: ['neck', 'stiff', 'mening', 'rigidity'],
        keywords: ['neck', 'stiff'],
      },
      {
        id: 'photophobia',
        answer:
          "Lights torture me — I wore sunglasses in the waiting area. Even phone brightness lowest setting stings. Sounds aren't as bad, but fluorescent buzz spikes anxiety with the headache.",
        patterns: ['light', 'photo', 'brightness', 'sensitive'],
        keywords: ['light'],
      },
      {
        id: 'fever-chills',
        answer:
          "Feeling feverish — hot skin, chills layering hoodie weirdly. Temp in triage high, I didn't catch the number, nurse looked serious. Shivering between sweat bursts — classic awful sick, not normal hangover.",
        patterns: ['fever', 'temperature', 'chill', 'hot'],
        keywords: ['fever', 'chill'],
      },
      {
        id: 'nausea',
        answer:
          "Nausea constant — dry-heaved in the triage bathroom, bitter taste. Haven't kept water down great — sips only. Movement makes vomiting urge worse; lying still slightly better but neck hurts any position.",
        patterns: ['nausea', 'vomit', 'throw up'],
        keywords: ['nausea'],
      },
      {
        id: 'confusion',
        answer:
          "I'm fuzzy — lost track what day it is for a minute, weird for me. Answer questions slower. Roommate says I repeated a sentence. I'm scared because I'm pre-med and usually sharp; this feels wrong neurologically.",
        patterns: ['confus', 'mental', 'orient', 'thinking'],
        keywords: ['confus'],
      },
      {
        id: 'rash-petechiae',
        answer:
          "Tiny purple-red pin dots on ankles and calves after shower — not itchy, doesn't blanch when pressed maybe? Could be razor irritation but I've never seen this pattern. No big spreading rash like allergy hives.",
        patterns: ['rash', 'petech', 'spot', 'purple', 'skin'],
        keywords: ['rash'],
      },
      {
        id: 'timing',
        answer:
          "Headache/neck nightmare ramped through morning — maybe three hours worsening. Yesterday I felt rundown URI-ish; today catastrophic. Roommate drove me because walking jostled pain.",
        patterns: ['when', 'how long', 'onset', 'duration'],
        keywords: ['when', 'start'],
      },
      {
        id: 'dorm-contacts',
        answer:
          "Live in undergrad dorm — crowded bathrooms, parties last weekend. One friend had a 'bad cold' — not sure specifics. I kissed someone casually Friday; no tick bites, no animal exposures weirdly relevant?",
        patterns: ['dorm', 'college', 'contact', 'exposure', 'sick'],
        keywords: ['dorm', 'contact'],
      },
      {
        id: 'travel',
        answer:
          "No recent flights — stayed campus spring semester crunch. Family visit hometown month ago, healthy then. No international travel since childhood vacation; nothing exotic.",
        patterns: ['travel', 'trip', 'abroad'],
        keywords: ['travel'],
      },
      {
        id: 'medications',
        answer:
          "Birth control pill daily. Occasional ibuprofen midterm weeks. No immunosuppressants. Missed meningitis booster sophomore year because clinic line long — stupid procrastination now haunting me maybe.",
        patterns: ['medication', 'medicine', 'vaccine', 'shot'],
        keywords: ['med', 'vaccine'],
      },
      {
        id: 'family-history',
        answer:
          "Mom autoimmune thyroid — not meningitis relevance maybe. Dad migraines — mine feels nothing like his aura stories. Little brother had concussion sports; different category. No complement disorders I'm aware of.",
        patterns: ['family', 'relative', 'history'],
        keywords: ['family'],
      },
      {
        id: 'cough-uri',
        answer:
          "Mild sniffles few days — roommate plague usual. Cough not productive major. Not classic pneumonia story dominating; headache neck stiffness overshadow everything else.",
        patterns: ['cough', 'cold', 'uri', 'sinus'],
        keywords: ['cough'],
      },
      {
        id: 'urination',
        answer:
          "Urination normal — no UTI burning. Period not due — irrelevant? Pelvic pain no. Lower back pain is general misery, not kidney stone flank specific.",
        patterns: ['urin', 'uti', 'bladder'],
        keywords: ['urin'],
      },
      {
        id: 'weight-appetite',
        answer:
          "No weight loss journey — appetite zero today from nausea only. Usually stable athletic build track club. Energy crashed this morning unlike anything prior.",
        patterns: ['weight', 'appetite'],
        keywords: ['weight'],
      },
      {
        id: 'what-helps',
        answer:
          "Dark quiet room helps photophobia slightly — still hurts. Cold pack on forehead numb pain minute maybe. Nothing truly helps; even anti-nausea they gave in triage hasn't kicked in fully, or maybe I'm too anxious.",
        patterns: ['help', 'better', 'relief'],
        keywords: ['help'],
      },
      {
        id: 'what-worsens',
        answer:
          "Movement, light, sound, even talking loud worsens headache. Neck flexion brutal. Standing increases nausea. Stress thinking about finals makes me cry which makes head pound more — vicious cycle.",
        patterns: ['worse', 'trigger', 'aggrav'],
        keywords: ['worse'],
      },
      {
        id: 'general-vague',
        answer:
          "Overall sudden devastating headache, stiff painful neck, light sensitivity, fever, puking urge, confusion moments, scary spots on legs — I'm crying typing this out mentally because I know meningitis stories and I'm trying not to panic.",
        patterns: ['tell me more', 'describe', 'overall', 'symptoms'],
        keywords: ['symptom', 'describe'],
      },
      {
        id: 'hello',
        answer:
          "Hi — my head and neck hurt horribly, lights kill me, I'm nauseous and confused, and I need help fast. I'm really scared something serious is happening.",
        patterns: ['hello', 'hi ', 'hey '],
        keywords: ['hello'],
      },
    ],
  },
]
