import type { FallbackScenario } from './types'

export const cardiologyFallbackScenarios: FallbackScenario[] = [
  {
    key: 'stemi-pressure-wont-go-away',
    titleMatchers: ['pressure won', 'pressure wont', 'sitting on it'],
    complaintMatchers: ['chest', 'pressure', 'sitting on'],
    defaultAnswer:
      "It feels like somebody's sitting on my chest — heavy pressure right in the middle. It started maybe 45 minutes ago when I was hauling boxes at work. I'm sweaty and a little nauseous, and I'm scared.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "My chest feels like someone is sitting on it — not a sharp stab, more like crushing pressure. It hasn't let up since it started. I'm also short of breath and feel kind of weak.",
        patterns: ['what brought you', 'problem', 'chief complaint', 'happening'],
        keywords: ['problem', 'brought', 'complaint', 'chest'],
      },
      {
        id: 'onset',
        answer:
          "About 45 minutes ago — I was unloading heavy boxes off the truck. It hit sudden, not gradual. I had to stop and sit down, which I never do.",
        patterns: ['when did this start', 'when start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'onset', 'ago'],
      },
      {
        id: 'quality',
        answer:
          "Pressure — like a weight. Maybe a 8 out of 10. Not really burning, more squeezing. It stays there even when I try to rest.",
        patterns: ['what does it feel', 'describe', 'kind of pain', 'quality'],
        keywords: ['feel', 'describe', 'kind', 'quality', 'pain'],
      },
      {
        id: 'radiation',
        answer:
          "Yeah… it goes into my left arm and my jaw feels tight too. I didn't think jaw pain was a thing but the ER nurse asked the same thing.",
        patterns: ['radiate', 'spread', 'arm', 'jaw', 'anywhere else'],
        keywords: ['radiat', 'spread', 'arm', 'jaw', 'else'],
      },
      {
        id: 'associated',
        answer:
          "I'm nauseous, sweating through my shirt, and breathing feels harder than normal. I feel weak, like I could pass out if I stand up fast.",
        patterns: ['shortness of breath', 'nausea', 'sweat', 'other symptoms'],
        keywords: ['breath', 'nausea', 'sweat', 'weak', 'symptom'],
      },
      {
        id: 'worse-better',
        answer:
          "Nothing makes it better — I tried sitting still and it won't ease up. Moving around makes me more short of breath, I think.",
        patterns: ['worse', 'better', 'anything make'],
        keywords: ['worse', 'better', 'help', 'relief'],
      },
      {
        id: 'pmh',
        answer:
          "I have high blood pressure — take lisinopril when I remember. That's about it for regular problems.",
        patterns: ['medical history', 'conditions', 'past medical'],
        keywords: ['medical', 'history', 'condition', 'past'],
      },
      {
        id: 'smoking',
        answer:
          "I smoke — about a pack a day. Been meaning to quit for years. My wife bugs me about it constantly.",
        patterns: ['smoke', 'smoking', 'tobacco'],
        keywords: ['smoke', 'smoking', 'tobacco', 'cigarette'],
      },
      {
        id: 'medications',
        answer:
          "Lisinopril for blood pressure. I took it this morning. No aspirin today until the ambulance guy gave me one to chew.",
        patterns: ['medications', 'medicines', 'meds', 'take'],
        keywords: ['medication', 'medicine', 'meds', 'take', 'pill'],
      },
      {
        id: 'fever-cough',
        answer:
          "No fever, no cough. I felt fine this morning before the boxes. This is just the chest and feeling awful.",
        patterns: ['fever', 'cough', 'sick', 'cold'],
        keywords: ['fever', 'cough', 'cold', 'sick'],
      },
      {
        id: 'similar-before',
        answer:
          "Never like this. I've had heartburn after greasy food but this is totally different — scarier.",
        patterns: ['before', 'similar', 'happened prior'],
        keywords: ['before', 'similar', 'prior', 'ever'],
      },
      {
        id: 'family',
        answer:
          "My dad had a heart attack in his sixties. That's always in the back of my mind, honestly.",
        patterns: ['family history', 'family', 'parents heart'],
        keywords: ['family', 'father', 'dad', 'heart', 'parent'],
      },
      {
        id: 'allergies',
        answer: "No drug allergies I know of.",
        patterns: ['allergies', 'allergic'],
        keywords: ['allerg'],
      },
      {
        id: 'open',
        answer:
          "Heavy central chest pressure 45 minutes since lifting at work, into my arm and jaw, sweaty and nauseous, hypertensive smoker, never had this before.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'afib-rapid-ventricular-response',
    titleMatchers: ['heart keeps racing', 'keeps racing', 'fluttering'],
    complaintMatchers: ['flutter', 'racing', 'palpitation', 'heart'],
    defaultAnswer:
      "My heart suddenly started fluttering and racing about four hours ago — it feels irregular, like it's skipping and pounding at the same time. I'm a little lightheaded but I don't have chest pain.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "It feels like my heart is fluttering and going way too fast — not steady beats. It started all at once while I was reading at home. It's making me anxious.",
        patterns: ['what brought you', 'problem', 'chief complaint'],
        keywords: ['problem', 'brought', 'heart', 'flutter'],
      },
      {
        id: 'onset',
        answer:
          "Four hours ago — sudden. I was calm, just reading, and then bam, my chest felt like a fish flopping.",
        patterns: ['when start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'hour'],
      },
      {
        id: 'chest-pain',
        answer:
          "No real chest pain — pressure from anxiety maybe, but not the crushing pain you hear about with heart attacks.",
        patterns: ['chest pain', 'pain in chest'],
        keywords: ['chest', 'pain'],
      },
      {
        id: 'breathing',
        answer:
          "A little short of breath if I walk fast, but sitting still I'm okay. Mostly it's the heartbeat feeling that bothers me.",
        patterns: ['shortness of breath', 'breathing', 'breath'],
        keywords: ['breath', 'breathing', 'shortness'],
      },
      {
        id: 'lightheaded',
        answer:
          "Kind of lightheaded when I stand up quickly — not passed out though. I feel woozy with how fast it's beating.",
        patterns: ['dizzy', 'lightheaded', 'faint'],
        keywords: ['dizzy', 'lightheaded', 'faint', 'woozy'],
      },
      {
        id: 'irregular',
        answer:
          "It feels irregular — like missed beats then fast runs. I checked my pulse and couldn't count it, it was all over the place.",
        patterns: ['irregular', 'palpitation', 'heartbeat', 'rhythm'],
        keywords: ['irregular', 'palpitat', 'heartbeat', 'rhythm', 'skip'],
      },
      {
        id: 'pmh',
        answer:
          "High blood pressure — I take amlodipine. That's it for chronic stuff.",
        patterns: ['medical history', 'conditions'],
        keywords: ['medical', 'history', 'hypertension', 'pressure'],
      },
      {
        id: 'medications',
        answer:
          "Amlodipine daily. No blood thinners. I don't take anything for the heart rhythm — never had this before.",
        patterns: ['medications', 'medicines', 'meds'],
        keywords: ['medication', 'medicine', 'meds', 'amlodipine'],
      },
      {
        id: 'fever',
        answer: "No fever, no infection feeling.",
        patterns: ['fever', 'temperature', 'sick'],
        keywords: ['fever', 'temperature', 'sick'],
      },
      {
        id: 'thyroid',
        answer:
          "I've lost a little weight but on purpose — diet. No heat intolerance or shaky hands. Never thyroid problems that I know.",
        patterns: ['thyroid', 'weight', 'heat', 'tremor'],
        keywords: ['thyroid', 'weight', 'heat', 'tremor', 'shake'],
      },
      {
        id: 'anxiety',
        answer:
          "I'm anxious because my heart won't calm down — I don't think it's just panic though, I can feel it pounding wrong.",
        patterns: ['anxious', 'stress', 'panic'],
        keywords: ['anxious', 'stress', 'panic', 'nervous'],
      },
      {
        id: 'similar',
        answer:
          "Never had this exact fluttering. Once felt heart race after coffee but it passed in minutes.",
        patterns: ['before', 'similar', 'ever happen'],
        keywords: ['before', 'similar', 'ever', 'prior'],
      },
      {
        id: 'allergies',
        answer: "No allergies.",
        patterns: ['allergies'],
        keywords: ['allerg'],
      },
      {
        id: 'open',
        answer:
          "Sudden irregular fast heartbeat 4 hours, lightheaded, mild SOB, no chest pain, hypertension on amlodipine, scared but stable sitting.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'chf-exacerbation-stairs',
    titleMatchers: ["can't walk up stairs", 'walk up stairs', 'out of breath'],
    complaintMatchers: ['stairs', 'breath', 'swelling', 'tired'],
    defaultAnswer:
      "I get winded doing almost anything now — stairs, walking to the mailbox. My legs are swollen and I sleep on three pillows because I can't breathe flat. I wake up gasping at night sometimes.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "I get out of breath doing almost anything. Stairs are impossible — I have to stop halfway up. Even showering wipes me out lately.",
        patterns: ['what brought you', 'problem', 'chief complaint'],
        keywords: ['problem', 'brought', 'breath', 'breathing'],
      },
      {
        id: 'duration',
        answer:
          "It's been getting worse over a few weeks — not one day, more like slowly declining. Used to walk fine, now I can't.",
        patterns: ['how long', 'when start', 'progressive'],
        keywords: ['long', 'when', 'week', 'progressive'],
      },
      {
        id: 'edema',
        answer:
          "My ankles and shins are puffy — socks leave deep lines. By evening it's worse. I can press my finger in and it leaves a dent.",
        patterns: ['swelling', 'legs', 'ankle', 'edema'],
        keywords: ['swell', 'leg', 'ankle', 'edema', 'feet'],
      },
      {
        id: 'orthopnea',
        answer:
          "I sleep on three pillows now — flat I feel like I'm drowning. If I slip down in bed I wake up coughing.",
        patterns: ['pillows', 'lie flat', 'sleep', 'orthopnea'],
        keywords: ['pillow', 'flat', 'sleep', 'lie', 'bed'],
      },
      {
        id: 'pnd',
        answer:
          "Twice this week I bolted awake gasping for air — scary. Takes a few minutes sitting on the edge of the bed to settle.",
        patterns: ['wake up at night', 'gasping', 'midnight', 'pnd'],
        keywords: ['wake', 'night', 'gasp', 'midnight'],
      },
      {
        id: 'chest-pain',
        answer: "No chest pain — just can't catch my breath and I'm tired all the time.",
        patterns: ['chest pain'],
        keywords: ['chest', 'pain'],
      },
      {
        id: 'fever',
        answer: "No fever. No cough bringing up colored stuff.",
        patterns: ['fever', 'cough', 'infection'],
        keywords: ['fever', 'cough', 'infection'],
      },
      {
        id: 'weight',
        answer:
          "I gained maybe 8 pounds in two weeks — didn't eat more, just swelling I think. Pants tight around the waist.",
        patterns: ['weight', 'gain'],
        keywords: ['weight', 'gain', 'pound'],
      },
      {
        id: 'pmh',
        answer:
          "They told me years ago my heart was 'weak' but I didn't follow up much. High blood pressure too.",
        patterns: ['medical history', 'heart', 'conditions'],
        keywords: ['medical', 'history', 'heart', 'condition'],
      },
      {
        id: 'medications',
        answer:
          "Lisinopril and something for water — furosemide, I think. I miss doses sometimes, bad habit.",
        patterns: ['medications', 'medicines', 'meds'],
        keywords: ['medication', 'medicine', 'meds', 'water', 'pill'],
      },
      {
        id: 'smoking',
        answer: "I quit smoking five years ago — smoked two packs a day before that.",
        patterns: ['smoke', 'smoking'],
        keywords: ['smoke', 'smoking'],
      },
      {
        id: 'exercise',
        answer:
          "I can't exercise — that's the problem. Used to tinker in the garage, now I get winded carrying tools.",
        patterns: ['exercise', 'activity', 'walk'],
        keywords: ['exercise', 'activity', 'walk', 'stair'],
      },
      {
        id: 'open',
        answer:
          "Weeks of worsening exertional dyspnea, leg swelling, three pillows, nighttime gasping, weight gain, history of weak heart and HTN.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'hypertrophic-cardiomyopathy-syncope',
    titleMatchers: ['passed out during practice', 'blacked out', 'passed out'],
    complaintMatchers: ['passed out', 'black out', 'syncope', 'faint'],
    defaultAnswer:
      "I blacked out during basketball practice yesterday — we were doing sprints and I just went down. I was dizzy right before. My chest gets tight when I push hard sometimes. My uncle died young suddenly.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "I passed out during practice — collapsed mid-sprint. Teammates said I was out less than a minute. I don't remember hitting the floor.",
        patterns: ['what happened', 'brought', 'problem', 'passed out'],
        keywords: ['passed', 'out', 'black', 'faint', 'collapse'],
      },
      {
        id: 'onset-exercise',
        answer:
          "During intense practice — wind sprints after warm-up. Not at rest, not in the locker room — full running.",
        patterns: ['exercise', 'practice', 'basketball', 'running'],
        keywords: ['exercise', 'practice', 'basketball', 'sprint', 'run'],
      },
      {
        id: 'prodrome',
        answer:
          "I felt dizzy and weird right before — vision a little dark at the edges. Then I was on the ground with people yelling my name.",
        patterns: ['before', 'dizzy', 'prodrome', 'warning'],
        keywords: ['before', 'dizzy', 'warning', 'prior'],
      },
      {
        id: 'seizure',
        answer:
          "Coach said I wasn't shaking like a seizure — just dropped. I wasn't incontinent, didn't bite my tongue that I know.",
        patterns: ['seizure', 'shaking', 'convulsion'],
        keywords: ['seizure', 'shake', 'convuls', 'jerking'],
      },
      {
        id: 'chest',
        answer:
          "Sometimes with hard exercise my chest feels tight — like it can't get enough blood. I thought I was just out of shape.",
        patterns: ['chest', 'tight', 'pain'],
        keywords: ['chest', 'tight', 'pain', 'pressure'],
      },
      {
        id: 'family',
        answer:
          "My dad's brother — my uncle — died suddenly at 28. They said heart, details fuzzy. That scares my parents and me.",
        patterns: ['family history', 'sudden death', 'uncle', 'family'],
        keywords: ['family', 'uncle', 'sudden', 'death', 'dad'],
      },
      {
        id: 'recovery',
        answer:
          "I woke up confused, headache, embarrassed. EMS checked me, took me to ER, they kept me overnight. Feel okay today but scared to play.",
        patterns: ['after', 'wake up', 'recovery', 'what happened after'],
        keywords: ['after', 'wake', 'recovery', 'hospital'],
      },
      {
        id: 'dehydration',
        answer:
          "I drank water at practice — don't think I was dehydrated. It was indoor, not crazy hot.",
        patterns: ['dehydrated', 'water', 'heat'],
        keywords: ['dehydr', 'water', 'heat', 'fluid'],
      },
      {
        id: 'medications',
        answer: "No meds — healthy kid otherwise.",
        patterns: ['medications', 'medicines'],
        keywords: ['medication', 'medicine', 'meds'],
      },
      {
        id: 'prior-syncope',
        answer:
          "Never full passed out before. Felt lightheaded once standing up fast — different.",
        patterns: ['before', 'similar', 'ever faint'],
        keywords: ['before', 'similar', 'ever', 'faint'],
      },
      {
        id: 'sports',
        answer:
          "Varsity point guard — this is my life. I need to know if I can play again. Coach is freaked out.",
        patterns: ['sports', 'athlete', 'basketball team'],
        keywords: ['sport', 'athlete', 'basketball', 'team'],
      },
      {
        id: 'open',
        answer:
          "Exertional syncope during sprints, dizzy prodrome, exertional chest tightness, uncle sudden death at 28, no seizure signs, wants to play again.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
  {
    key: 'acute-pericarditis-positional',
    titleMatchers: ['lean back', 'hurts when i lean', 'position'],
    complaintMatchers: ['position', 'lean', 'throat', 'sharp chest'],
    defaultAnswer:
      "My chest hurts sharp — weird thing is it changes with how I lie. Flat on my back in bed is awful; if I sit up and lean forward it eases up. I had a cold last week.",
    qa: [
      {
        id: 'chief-complaint',
        answer:
          "Sharp chest pain that depends on position — worse lying flat, better hunched forward. It's been two days and it's wearing me down.",
        patterns: ['what brought you', 'problem', 'chief complaint', 'chest pain'],
        keywords: ['problem', 'brought', 'chest', 'pain'],
      },
      {
        id: 'positional',
        answer:
          "Lying flat on my back at night is the worst — I wake up hurting. Sitting up on the couch with pillows in front of me helps. Leaning forward over a desk actually feels best.",
        patterns: ['position', 'lie flat', 'lean forward', 'worse', 'better'],
        keywords: ['position', 'flat', 'forward', 'lean', 'lie'],
      },
      {
        id: 'onset',
        answer:
          "Started two days ago — a day after my cold started improving. Not during exercise, just sitting studying.",
        patterns: ['when start', 'how long', 'onset'],
        keywords: ['when', 'start', 'long', 'day'],
      },
      {
        id: 'quality',
        answer:
          "Sharp and stabbing — worse when I breathe deep or cough. Not squeezing like a heart attack, I don't think.",
        patterns: ['describe', 'feel like', 'sharp', 'quality'],
        keywords: ['describe', 'sharp', 'stabbing', 'feel'],
      },
      {
        id: 'viral',
        answer:
          "I had a nasty cold last week — runny nose, sore throat, low energy. Mostly better except this chest thing started.",
        patterns: ['cold', 'viral', 'illness', 'flu', 'recent'],
        keywords: ['cold', 'viral', 'ill', 'flu', 'recent', 'uri'],
      },
      {
        id: 'exertion',
        answer:
          "Walking to campus today was fine — pain isn't from running. Stairs didn't trigger it. It's the lying flat that kills me.",
        patterns: ['exercise', 'exertion', 'running', 'stairs'],
        keywords: ['exercise', 'exertion', 'run', 'stair', 'walk'],
      },
      {
        id: 'fever',
        answer:
          "Low fever yesterday — 100-ish. Chills a little. Today a bit better but chest still hurts.",
        patterns: ['fever', 'temperature'],
        keywords: ['fever', 'temperature', 'chill'],
      },
      {
        id: 'breathing',
        answer:
          "Deep breaths make the pain spike — I take shallow breaths. Not truly short of breath at rest though.",
        patterns: ['breath', 'breathing', 'deep breath'],
        keywords: ['breath', 'breathing', 'deep', 'inspir'],
      },
      {
        id: 'chest-pain-cardiac',
        answer:
          "No sweating like my friend's dad with a heart attack. No left arm numbness. I'm 24 and was healthy before the cold.",
        patterns: ['heart attack', 'radiation', 'arm', 'sweat'],
        keywords: ['heart', 'attack', 'arm', 'sweat', 'radiat'],
      },
      {
        id: 'medications',
        answer:
          "Ibuprofen from the drugstore — helps a little. No prescriptions.",
        patterns: ['medications', 'medicines', 'ibuprofen'],
        keywords: ['medication', 'medicine', 'ibuprofen', 'advil'],
      },
      {
        id: 'pmh',
        answer: "No heart problems before. Healthy grad student.",
        patterns: ['medical history', 'conditions'],
        keywords: ['medical', 'history', 'condition'],
      },
      {
        id: 'allergies',
        answer: "No allergies.",
        patterns: ['allergies'],
        keywords: ['allerg'],
      },
      {
        id: 'open',
        answer:
          "Two days sharp positional chest pain, worse supine better leaning forward, post-viral, low-grade fever, deep breath worsens, no exertional trigger.",
        patterns: ['tell me more', 'anything else'],
        keywords: ['more', 'else', 'anything'],
      },
    ],
  },
]
