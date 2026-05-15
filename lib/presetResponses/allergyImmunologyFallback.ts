import type { FallbackScenario } from './types'

export const allergyImmunologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'spring-allergic-rhinitis',
    titleMatchers: ['spring is destroying', 'spring allergic'],
    complaintMatchers: ['sneezing', 'nose', 'running', 'allerg'],
    defaultAnswer:
      "Honestly I'm just miserable — I can't stop sneezing and my nose keeps dripping. It's been going on for weeks and soccer practice makes it worse. I feel a little better when I'm inside with the AC.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "What's bothering me most is sneezing over and over, and this runny nose that won't quit. My eyes water and itch too. It started a few weeks ago and it's been pretty constant.",
        patterns: ['what brought you', 'why are you here', 'what seems to be the problem', 'chief complaint'],
        keywords: ['problem', 'brought', 'complaint', 'here'],
      },
      {
        id: 'onset',
        answer:
          "I'm not totally sure of the exact day, but maybe about three weeks ago? It kind of crept up as the weather warmed up. I remember thinking it was worse after I'd been outside at school.",
        patterns: ['when did this start', 'when did it start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'onset', 'began'],
      },
      {
        id: 'triggers-outdoor',
        answer:
          "Yeah — after school and especially at soccer practice it's brutal. If I'm on the field for a while I start sneezing like crazy. Being indoors with the windows closed helps a bit, which is weird but true.",
        patterns: ['what makes it worse', 'anything make it worse', 'triggers', 'outside', 'soccer'],
        keywords: ['worse', 'trigger', 'outside', 'outdoor', 'soccer', 'school'],
      },
      {
        id: 'better-indoor',
        answer:
          "It definitely eases up when I'm inside, like at home with the AC on. Cool air seems to calm my nose a little. Nothing makes it go away completely though.",
        patterns: ['what makes it better', 'anything help', 'relieve'],
        keywords: ['better', 'help', 'relieve', 'indoor', 'inside'],
      },
      {
        id: 'eyes',
        answer:
          "My eyes are super itchy and watery — I keep rubbing them which probably doesn't help. They're kind of red too. No gunk or pus, just tears running down when I sneeze.",
        patterns: ['eyes', 'vision', 'itchy eyes', 'watery'],
        keywords: ['eye', 'eyes', 'itch', 'watery', 'vision'],
      },
      {
        id: 'nasal-quality',
        answer:
          "It's clear, watery stuff — not thick and not green. My nose is stuffed up but what drips out is thin. My throat gets itchy from all the post-nasal drip, honestly.",
        patterns: ['nasal', 'discharge', 'mucus', 'snot', 'congestion'],
        keywords: ['nasal', 'discharge', 'mucus', 'congestion', 'runny', 'drip'],
      },
      {
        id: 'fever-infection',
        answer:
          "No fever that I know of. I don't feel like I have the flu — no body aches or chills. It's mostly my head, nose, and eyes driving me nuts.",
        patterns: ['fever', 'body aches', 'chills', 'flu', 'infection'],
        keywords: ['fever', 'ache', 'chills', 'sick', 'infection'],
      },
      {
        id: 'prior-spring',
        answer:
          "Now that you mention it, I had something really similar last spring. Same sneezing and itchy eyes when everything started blooming. I kind of hoped it wouldn't come back this year.",
        patterns: ['before', 'previous', 'last year', 'last spring', 'happened before'],
        keywords: ['before', 'previous', 'last', 'spring', 'year', 'similar'],
      },
      {
        id: 'cough-breathing',
        answer:
          "I don't really have a cough or trouble breathing — it's more sneezing and congestion. Sometimes I breathe through my mouth at night because my nose is blocked.",
        patterns: ['cough', 'shortness of breath', 'wheez', 'breathing'],
        keywords: ['cough', 'breath', 'wheez', 'breathing'],
      },
      {
        id: 'medications',
        answer:
          "I've just been using tissues and sometimes saline spray from the drugstore. No prescription stuff. It helps for like ten minutes then I'm sneezing again.",
        patterns: ['medications', 'medicines', 'taking anything', 'tried anything'],
        keywords: ['medication', 'medicine', 'meds', 'take', 'tried'],
      },
      {
        id: 'allergies',
        answer:
          "Nobody's ever told me I'm allergic to anything specific. I've never had a bad reaction to food or anything scary like that. Pollen maybe? I don't know the medical word for it.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg', 'allergy'],
      },
      {
        id: 'family',
        answer:
          "My mom gets hay fever-ish stuff in the spring too — she jokes that we're allergic to our lawn. My dad's fine. No asthma that I know of.",
        patterns: ['family history', 'anyone in your family', 'parents'],
        keywords: ['family', 'parent', 'mom', 'dad', 'sibling'],
      },
      {
        id: 'severity',
        answer:
          "It's annoying enough that I can't focus in class sometimes because I'm sneezing every minute. I'd say it's like a 6 out of 10 — not the worst pain ever, but it never stops.",
        patterns: ['how bad', 'scale', 'severity', 'rate'],
        keywords: ['bad', 'severe', 'scale', '10'],
      },
      {
        id: 'sleep-school',
        answer:
          "Sleep's okay-ish — I wake up with a stuffy nose but it's not as bad as daytime outside. School's rough when my eyes are watering in class; teammates tease me on the field.",
        patterns: ['sleep', 'school', 'work', 'activity'],
        keywords: ['sleep', 'school', 'class', 'soccer', 'activity'],
      },
      {
        id: 'green-mucus',
        answer:
          "No, it's not green or thick like when my brother had a sinus infection. It's clear and runny. That's one thing that made me think it wasn't a regular cold.",
        patterns: ['green', 'yellow', 'purulent', 'thick'],
        keywords: ['green', 'yellow', 'thick', 'pus', 'purulent'],
      },
      {
        id: 'open',
        answer:
          "I guess overall I feel like my face is itchy and leaky — nose, eyes, throat. No fever, and it flares whenever I'm outdoors a lot. Last spring was the same story.",
        patterns: ['tell me more', 'anything else', 'what else'],
        keywords: ['more', 'else', 'anything', 'symptom'],
      },
    ],
  },
  {
    key: 'peanut-anaphylaxis',
    titleMatchers: ['something i ate', 'ate is wrong', 'peanut'],
    complaintMatchers: ['lips', 'throat tight', 'tight', 'swelling'],
    defaultAnswer:
      "I ate Pad Thai like fifteen minutes ago and now my lips feel huge and my throat feels tight. I'm scared — my skin is itchy and bumpy and I feel dizzy. Please help me.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "My lips feel swollen and tingly, and my throat feels tight like I can't swallow right. My chest feels weird too and I'm really scared. It started right after I ate.",
        patterns: ['what brought you', 'what is going on', 'chief complaint', 'problem today'],
        keywords: ['problem', 'brought', 'complaint', 'happening'],
      },
      {
        id: 'onset-food',
        answer:
          "Maybe fifteen minutes ago? I was at this Thai place with friends and had Pad Thai. Almost as soon as I finished, my mouth felt funny and then everything escalated fast.",
        patterns: ['when did this start', 'how long ago', 'when start'],
        keywords: ['when', 'start', 'long', 'ago'],
      },
      {
        id: 'food-exposure',
        answer:
          "Pad Thai — I didn't think about peanuts. The sauce might have peanut in it, I'm not sure. I used to react to peanuts as a little kid but I thought I was fine now. I'm kicking myself.",
        patterns: ['what did you eat', 'food', 'restaurant', 'peanut', 'pad thai'],
        keywords: ['eat', 'food', 'meal', 'peanut', 'thai', 'restaurant'],
      },
      {
        id: 'lip-throat',
        answer:
          "My lips are puffy and my tongue feels thick. Swallowing feels scary — like my throat is closing even though I can still talk a little. My voice sounds weird to me, kind of hoarse.",
        patterns: ['throat', 'lips', 'swallow', 'tongue'],
        keywords: ['throat', 'lip', 'swallow', 'tongue', 'tight'],
      },
      {
        id: 'skin-hives',
        answer:
          "I'm covered in these raised itchy bumps — they came up really fast. My face is red and hot. It feels like ants under my skin everywhere.",
        patterns: ['rash', 'hives', 'itch', 'skin'],
        keywords: ['rash', 'hive', 'itch', 'skin', 'bump'],
      },
      {
        id: 'breathing',
        answer:
          "I feel short of breath and I hear a little wheeze when I breathe out. It's not like I can't get air at all, but it's harder than normal and that terrifies me.",
        patterns: ['shortness of breath', 'breathing', 'wheez', 'airway'],
        keywords: ['breath', 'breathing', 'wheez', 'air'],
      },
      {
        id: 'dizziness-bp',
        answer:
          "I feel lightheaded, like I might pass out. When I stood up to come in I got dizzy. My heart is racing — I can feel it pounding in my chest.",
        patterns: ['dizzy', 'lightheaded', 'faint', 'blood pressure', 'feel faint'],
        keywords: ['dizzy', 'lightheaded', 'faint', 'pressure', 'heart'],
      },
      {
        id: 'prior-allergy',
        answer:
          "When I was little, peanuts made my lips swell and my mom said I had a reaction. We avoided peanuts for years. I haven't eaten them on purpose since — tonight might have been accidental.",
        patterns: ['allergies', 'allergic before', 'peanut before', 'reaction before'],
        keywords: ['allerg', 'peanut', 'before', 'child', 'reaction'],
      },
      {
        id: 'fever',
        answer:
          "No fever — I felt fine before dinner. This isn't like being sick with a cold. It hit right after food.",
        patterns: ['fever', 'temperature', 'chills'],
        keywords: ['fever', 'temperature', 'chills'],
      },
      {
        id: 'anxiety',
        answer:
          "I'm absolutely panicking, yeah — but this isn't just nerves. My body is doing things I've never felt, and I can't swallow normally. I'm terrified.",
        patterns: ['anxious', 'panic', 'stress', 'nervous'],
        keywords: ['anxious', 'panic', 'stress', 'nervous', 'scared'],
      },
      {
        id: 'medications',
        answer:
          "I don't take anything regular. I didn't take an EpiPen — we don't carry one anymore because I thought I outgrew it. I haven't taken anything since this started.",
        patterns: ['medications', 'medicines', 'epipen', 'epinephrine'],
        keywords: ['medication', 'medicine', 'meds', 'epi', 'inhaler'],
      },
      {
        id: 'vomiting',
        answer:
          "I feel nauseous but I haven't thrown up. My stomach is upset but the throat and skin stuff is worse right now.",
        patterns: ['nausea', 'vomit', 'throw up'],
        keywords: ['nausea', 'vomit', 'throw'],
      },
      {
        id: 'open',
        answer:
          "I ate Thai food, my lips and throat swelled, I'm itchy all over, a little wheezy, and I feel like I might pass out. It started minutes after eating and I'm really scared.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'cvid-recurrent-infections',
    titleMatchers: ['another infection', 'infection again'],
    complaintMatchers: ['infections constantly', 'infections', 'ear infection'],
    defaultAnswer:
      "I'm his mom — Noah gets sick all the time. Ear infections over and over, pneumonias, sinus stuff. He misses school and he's small for his age. I'm worried something's wrong with his immune system.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "We were sent here because he keeps getting infections — it feels constant. Ear infections, lung infections, sinuses. He's on antibiotics and then a few weeks later we're back again.",
        patterns: ['what brought', 'why are you here', 'problem', 'concern'],
        keywords: ['problem', 'brought', 'concern', 'here'],
      },
      {
        id: 'ear-infections',
        answer:
          "I'd say about eight ear infections in the last year — I've lost count of the amoxicillin courses. His pediatrician said that's way more than normal. Sometimes he needs stronger antibiotics.",
        patterns: ['ear infection', 'ears', 'otitis'],
        keywords: ['ear', 'otitis', 'hearing'],
      },
      {
        id: 'pneumonia',
        answer:
          "He's had pneumonia three times in the past two years — two needed chest X-rays and one was bad enough we were in the hospital briefly. That's what really scared us.",
        patterns: ['pneumonia', 'lung infection', 'chest infection'],
        keywords: ['pneumonia', 'lung', 'chest'],
      },
      {
        id: 'sinus',
        answer:
          "Constant sinus congestion and green drainage between the big infections. Antibiotics clear it partly but it comes back. He snores and breathes through his mouth at night.",
        patterns: ['sinus', 'sinusitis', 'nasal'],
        keywords: ['sinus', 'nasal', 'congestion'],
      },
      {
        id: 'recovery',
        answer:
          "He never bounces back quickly. Other kids are fine in a few days; Noah is tired and coughing for weeks. We keep him home from school more than I'd like to admit.",
        patterns: ['recover', 'recovery', 'better after antibiotics', 'slow'],
        keywords: ['recover', 'recovery', 'slow', 'better', 'antibiotic'],
      },
      {
        id: 'growth',
        answer:
          "He's always been on the small side. His weight gain has been slow — the pediatrician charts him low. He eats okay when he's not sick, but he's thin.",
        patterns: ['weight', 'growth', 'gain', 'tall', 'percentile'],
        keywords: ['weight', 'growth', 'gain', 'small', 'thin'],
      },
      {
        id: 'school',
        answer:
          "He misses school a lot when he's on antibiotics or febrile. His teacher knows him as 'the kid who's always out.' He tries hard but he's behind sometimes.",
        patterns: ['school', 'miss', 'absent'],
        keywords: ['school', 'miss', 'absent', 'day'],
      },
      {
        id: 'family-immune',
        answer:
          "My brother — his uncle on my side — has some immune problem, I don't know the name. He's on special treatments. That made our pediatrician send us here.",
        patterns: ['family history', 'family', 'relatives', 'immune'],
        keywords: ['family', 'uncle', 'immune', 'history', 'relative'],
      },
      {
        id: 'allergies-asthma',
        answer:
          "No asthma diagnosis and no food allergies we know of. He hasn't needed an inhaler. It's mostly infections, not wheezing between illnesses.",
        patterns: ['asthma', 'allergies', 'wheez', 'eczema'],
        keywords: ['asthma', 'allerg', 'wheez', 'eczema'],
      },
      {
        id: 'hospital',
        answer:
          "One pneumonia needed a night in the hospital for oxygen — that was last winter. Otherwise ER visits for high fevers with ear infections. Never in the ICU.",
        patterns: ['hospital', 'er', 'emergency', 'admitted'],
        keywords: ['hospital', 'admit', 'er', 'emergency'],
      },
      {
        id: 'today',
        answer:
          "Today he's okay — low-grade temp, no bad cough right now. We're here between flares because the pattern is the problem, not one emergency today.",
        patterns: ['how is he today', 'right now', 'currently'],
        keywords: ['today', 'now', 'currently', 'feel'],
      },
      {
        id: 'medications',
        answer:
          "Antibiotics when he's infected — lately amoxicillin-clavulanate. Daily multivitamin. No steroids or immune medicines yet.",
        patterns: ['medications', 'medicines'],
        keywords: ['medication', 'medicine', 'meds'],
      },
      {
        id: 'open',
        answer:
          "Recurrent ears, pneumonias, sinuses, slow recovery, poor weight gain, and immune issues in the family. We're hoping you can tell us why this keeps happening.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'exercise-induced-asthma',
    titleMatchers: ['coach thinks', 'out of shape', 'exercise'],
    complaintMatchers: ['short of breath', 'practice', 'running'],
    defaultAnswer:
      "I get winded and tight-chested when I run — usually about ten minutes into practice. My coach thinks I'm slacking but I'm trying hard. It eases up when I stop and rest.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "During track practice I get short of breath and this tight feeling in my chest. I cough a lot after hard runs. It's been going on for months and it's embarrassing.",
        patterns: ['what brought', 'problem', 'why are you here'],
        keywords: ['problem', 'brought', 'complaint', 'here'],
      },
      {
        id: 'onset-duration',
        answer:
          "Maybe six months? It started mid-season last year and never really went away. It's not every single day — only when I'm running hard.",
        patterns: ['when did this start', 'how long'],
        keywords: ['when', 'start', 'long', 'month'],
      },
      {
        id: 'timing-exercise',
        answer:
          "Usually about ten minutes into a run or interval workout. Warm-up jogging is fine, then bam — chest tightness and I can't keep my pace. If I stop and walk, it improves over five or ten minutes.",
        patterns: ['during exercise', 'when running', 'practice', 'timing'],
        keywords: ['exercise', 'run', 'practice', 'workout', 'minute'],
      },
      {
        id: 'chest-tightness',
        answer:
          "It's a squeezing tightness, not sharp stabbing pain. Like a band around my chest. No pain when I'm sitting in class or sleeping.",
        patterns: ['chest', 'tight', 'pain', 'feel like'],
        keywords: ['chest', 'tight', 'pain', 'pressure'],
      },
      {
        id: 'cough-wheeze',
        answer:
          "I cough a lot after sprints — sometimes for twenty minutes. My teammates say I wheeze sometimes; I can hear a faint whistle when I breathe out after practice.",
        patterns: ['cough', 'wheez'],
        keywords: ['cough', 'wheez'],
      },
      {
        id: 'better-rest',
        answer:
          "Yeah, if I stop running and rest it gets better. I haven't needed the ER or anything. Using my friend's inhaler once helped but I don't have my own.",
        patterns: ['what makes it better', 'better', 'rest', 'relieve'],
        keywords: ['better', 'rest', 'relieve', 'help', 'stop'],
      },
      {
        id: 'worse',
        answer:
          "Cold dry air makes it worse — outdoor track in winter was awful. All-out sprints are worse than slow distance days. Stress before a meet doesn't help either.",
        patterns: ['what makes it worse', 'worse', 'trigger'],
        keywords: ['worse', 'trigger', 'cold', 'sprint'],
      },
      {
        id: 'family-asthma',
        answer:
          "My mom has asthma — she uses an inhaler when she gets a cold. My dad doesn't. Nobody told me I have asthma officially.",
        patterns: ['family history', 'family', 'asthma', 'parents'],
        keywords: ['family', 'asthma', 'mom', 'parent'],
      },
      {
        id: 'fever-infection',
        answer:
          "No fever or sickness right now. I haven't had pneumonia or anything. It's really tied to running.",
        patterns: ['fever', 'sick', 'infection', 'cold'],
        keywords: ['fever', 'sick', 'infection', 'cold'],
      },
      {
        id: 'syncope',
        answer:
          "I've never fainted. No passing out during runs. I get dizzy once in a while if I push through, but I stop before anything scary.",
        patterns: ['faint', 'pass out', 'syncope', 'dizzy'],
        keywords: ['faint', 'pass', 'syncope', 'dizzy'],
      },
      {
        id: 'rest-pain',
        answer:
          "At rest I'm fine — that's what's frustrating. I can watch TV and feel normal. It's specifically when I'm exercising hard.",
        patterns: ['at rest', 'when not exercising', 'rest pain'],
        keywords: ['rest', 'sitting', 'not exercising'],
      },
      {
        id: 'conditioning',
        answer:
          "I'm not out of shape — I train six days a week and my times were improving before this. My coach doesn't believe how hard it hits me. I want to compete at state.",
        patterns: ['conditioning', 'fit', 'shape', 'coach'],
        keywords: ['conditioning', 'fit', 'shape', 'coach', 'train'],
      },
      {
        id: 'medications',
        answer:
          "No regular meds. I tried a friend's albuterol inhaler once after practice and it helped my chest open up, which was kind of a clue maybe?",
        patterns: ['medications', 'inhaler', 'medicines'],
        keywords: ['medication', 'inhaler', 'medicine', 'meds'],
      },
      {
        id: 'allergies',
        answer:
          "Seasonal allergies in spring — sneezing. No food allergies. Nothing else weird health-wise.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'open',
        answer:
          "Chest tightness and cough about ten minutes into running, wheeze sometimes after, better with rest, six months, mom has asthma. I need to figure this out before season peaks.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'atopic-dermatitis-eczema',
    titleMatchers: ['rash never goes away', 'never goes away', 'eczema'],
    complaintMatchers: ['scratches', 'rash', 'itch'],
    defaultAnswer:
      "I'm her dad — Olivia has had this itchy rash for years, mostly behind her knees and inside her elbows. She scratches until she bleeds at night. We're exhausted and nothing over-the-counter sticks.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "She scratches all night long — we hear her rubbing against the sheets. The rash never fully goes away, it just flares. She's tired and cranky in the morning.",
        patterns: ['what brought', 'problem', 'concern', 'chief'],
        keywords: ['problem', 'brought', 'concern', 'scratch'],
      },
      {
        id: 'duration',
        answer:
          "Since she was a toddler, honestly — several years. It's not a new thing. Some months are better, but it's always there in the creases of her arms and legs.",
        patterns: ['how long', 'when did it start', 'duration', 'chronic'],
        keywords: ['long', 'when', 'year', 'chronic', 'start'],
      },
      {
        id: 'location',
        answer:
          "Mainly the insides of her elbows and behind her knees — the bendy spots. Sometimes a patch on her neck. Not really on her face except when she's flaring badly.",
        patterns: ['where', 'location', 'spread'],
        keywords: ['where', 'location', 'elbow', 'knee', 'flexural'],
      },
      {
        id: 'itch',
        answer:
          "The itch is the worst part — she says it burns and itches at the same time. She scratches until we see scratch marks and little scabs. It breaks my heart.",
        patterns: ['itch', 'itchy', 'scratch'],
        keywords: ['itch', 'scratch', 'pruritus'],
      },
      {
        id: 'winter-shower',
        answer:
          "Winter is terrible — heating dries her skin. Hot baths make her pink and itchy afterward; we've switched to lukewarm quick showers but she still flares.",
        patterns: ['worse', 'winter', 'shower', 'bath', 'hot'],
        keywords: ['worse', 'winter', 'shower', 'bath', 'hot', 'dry'],
      },
      {
        id: 'sleep',
        answer:
          "Sleep is a disaster. She wakes up scratching at 2 a.m. We've tried gloves and cream. My wife and I take turns calming her down.",
        patterns: ['sleep', 'night', 'bed'],
        keywords: ['sleep', 'night', 'bed', 'wake'],
      },
      {
        id: 'dry-skin',
        answer:
          "Her skin is always dry, even between flares — little flakes on her legs. We lotion her twice a day but it comes back.",
        patterns: ['dry', 'moisturizer', 'lotion', 'xerosis'],
        keywords: ['dry', 'lotion', 'moistur', 'skin'],
      },
      {
        id: 'infection-signs',
        answer:
          "No honey-colored crust or pus lately. No fever. When she scratches open, we watch for infection but it's been dry scabs, not impetigo.",
        patterns: ['pus', 'crust', 'fever', 'infection', 'cellulitis'],
        keywords: ['pus', 'crust', 'fever', 'infection', 'impetigo'],
      },
      {
        id: 'medications',
        answer:
          "No new medicines — no antibiotics or anything recent. We've used hydrocortisone from the store and heavy moisturizers. Nothing prescription that's worked long-term.",
        patterns: ['medications', 'new medicine', 'cream', 'steroid'],
        keywords: ['medication', 'medicine', 'cream', 'steroid', 'drug'],
      },
      {
        id: 'family-atopy',
        answer:
          "I have asthma — inhaler when I need it. My wife has seasonal allergies. Nobody else in the house has this rash.",
        patterns: ['family history', 'asthma', 'allergies', 'eczema'],
        keywords: ['family', 'asthma', 'allerg', 'eczema', 'atopy'],
      },
      {
        id: 'household',
        answer:
          "No one else is itchy — her brother is fine. We wondered about scabies but the doctor at urgent care said it didn't look like that.",
        patterns: ['anyone else', 'household', 'contacts', 'scabies'],
        keywords: ['anyone', 'household', 'contact', 'brother', 'scabies'],
      },
      {
        id: 'appearance',
        answer:
          "Red patches in the folds, scratch marks, and spots where the skin looks a little thicker from rubbing. Not ring-shaped, more patchy and dry.",
        patterns: ['look like', 'describe the rash', 'appearance'],
        keywords: ['look', 'describe', 'rash', 'appearance'],
      },
      {
        id: 'open',
        answer:
          "Years of itchy flexural rash, worse in winter, scratches all night, very dry skin, dad has asthma, no fever or pus, no one else affected. We need something that actually works.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
]
