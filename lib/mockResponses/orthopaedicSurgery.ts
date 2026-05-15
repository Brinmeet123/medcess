/** Orthopaedic Surgery — DEMO_MODE keyword interview handlers. */

const REPLY =
  "I’m not sure I follow—can you ask that a little more directly? I want to answer you right."

function orthoJordanAcl(input: string): string {
  const m = input
  if (m.includes('injur') || m.includes('mechan') || m.includes('how') && (m.includes('happen') || m.includes('occur'))) {
    return "I was cutting to a pass—planted my right foot and everything went sideways. Wasn’t a dirty tackle, just a sharp pivot and I collapsed. Heard a pop loud enough teammates looked over."
  }
  if (m.includes('pop') || m.includes('snap') || m.includes('click')) {
    return "Pop was gross—like someone snapped a thick rubber band inside the knee, not a knuckle crack. Still makes my stomach flip remembering."
  }
  if (m.includes('swell') || m.includes('effusion') || m.includes('tight')) {
    return "Swelled fast—trainer said hemar-something—hour later it felt tight like overinflated ball. Couldn’t get compression wrap tight enough."
  }
  if (m.includes('walk') || m.includes('weight') || m.includes('bear') || m.includes('crutch')) {
    return "Flat walking with crutches is doable if I baby it—any lateral shuffle and it threatens to give. Full weight through cuts? Not happening."
  }
  if (m.includes('pain') || m.includes('hurt') || m.includes('ache')) {
    return "Throbs deep—seven-ish resting, spikes nine if I twist wrong. Ibuprofen dulls surface not the wobbly feeling."
  }
  if (m.includes('sport') || m.includes('soccer') || m.includes('play')) {
    return "Midfield—scholarship not huge but pride huge—this timing terrifies me with showcases coming. Sorry—that’s extra stress dump."
  }
  if (m.includes('lock') || m.includes('catch') || m.includes('meniscus')) {
    return "No true locking where knee freezes bent—more unstable straight-line okay until I fake a cut in hallway."
  }
  if (m.includes('numb') || m.includes('nerve') || m.includes('foot') || m.includes('weak')) {
    return "Foot feels normal-ish—maybe hamstring quivers guarding—no dead floppy foot that I notice."
  }
  if (m.includes('prior') || m.includes('before') || m.includes('history')) {
    return "Never surgery—this knee was boring reliable until yesterday. Ankle sprain sophomore that’s it."
  }
  if (m.includes('med') || m.includes('ibuprofen') || m.includes('drug')) {
    return "Trainer ibuprofen plus ice cycles—no opioids—hate feeling foggy before practice mindset."
  }
  if (m.includes('timing') || m.includes('when')) {
    return "Yesterday practice—maybe six hours swelling spiral timeline—calendar blur adrenaline."
  }
  if (m.includes('help') || m.includes('worse') || m.includes('better')) {
    return "Elevation ice calms skin heat—rotation tests worse—sleep sucked side pillow fortress."
  }
  if (m.includes('work') || m.includes('school') || m.includes('class')) {
    return "Skipped two lectures limping—professor passive aggressive email sigh—college athlete stereotype guilt."
  }
  if (m.includes('fever') || m.includes('sick')) {
    return "No fever—this is mechanical knee drama not flu."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey—thanks for seeing me—knee betrayed midseason and I’m spiraling a little."
  }
  return REPLY
}

function orthoMargaretHip(input: string): string {
  const m = input
  if (m.includes('fall') || m.includes('injur') || m.includes('mechan')) {
    return "Kitchen tile betrayal—wet prints—slid and slammed hip like dropped sack of flour. Pride hurt almost as much."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Deep boring ache—ten if they nudge rotation—anything stronger than pills talk scares me but honesty: unbearable movement."
  }
  if (m.includes('weight') || m.includes('bear') || m.includes('stand') || m.includes('walk')) {
    return "Cannot bear weight—tried once with countertop screamed—embarrassed neighbor heard me through wall probably."
  }
  if (m.includes('short') || m.includes('rotate') || m.includes('turn') || m.includes('leg position') || m.includes('toe')) {
    return "Leg looks wrong shortened—foot flops outward like broken doll—sorry visual ugly."
  }
  if (m.includes('head') || m.includes('concussion') || m.includes('dizzy')) {
    return "Head never hit—luck—just hip and dignity shattered."
  }
  if (m.includes('osteoporosis') || m.includes('bone') || m.includes('den')) {
    return "Doctor years ago said bones thin like bookshelf paper—meds tongue-twisters I forget renew sometimes bad daughter energy."
  }
  if (m.includes('med') || m.includes('thin') || m.includes('blood')) {
    return "Baby aspirin cardio recommendation years back—no heavy blood thinners I know—list at home blurry."
  }
  if (m.includes('prior') || m.includes('replace') || m.includes('surgery')) {
    return "Never hip surgery—arthritic grumbles sometimes—nothing metal inside."
  }
  if (m.includes('numb') || m.includes('foot') || m.includes('circulation')) {
    return "Foot cold panic sometimes—pulses maybe weaker right—hard focus through pain honest."
  }
  if (m.includes('timing') || m.includes('when')) {
    return "Hours crawling to phone shame timeline—afternoon fall—now night ER blur."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Still absolutely worst—immobility slight relief—any roll agony."
  }
  if (m.includes('fever') || m.includes('chill')) {
    return "Shocky shivery maybe pain not infection—uncertain distinction."
  }
  if (m.includes('family') || m.includes('alone')) {
    return "Live alone stubborn—neighbor heroic check—daughter flight tomorrow worried phone tag."
  }
  if (m.includes('work') || m.includes('job') || m.includes('librarian')) {
    return "Retired—books gentler than tile—irony not lost."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hello—I hate needing help but hip won’t negotiate."
  }
  return REPLY
}

function orthoBrandonShoulder(input: string): string {
  const m = input
  if (m.includes('injur') || m.includes('mechan') || m.includes('basketball')) {
    return "Dove for ball—arm wrenched backward overhead—buddy’s knee half my shoulder nightmare physics."
  }
  if (m.includes('pop') || m.includes('clunk')) {
    return "Sickening clunk—not clean—buddy heard it courtside swore later—wish exaggeration."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Pain whiteout ten—breathing shallow trying not move—macho trainer façade crumbling."
  }
  if (m.includes('move') || m.includes('rom') || m.includes('lift') || m.includes('arm')) {
    return "Arm stuck slightly away—cannot tuck to belt—lowering attempt electric scream."
  }
  if (m.includes('deform') || m.includes('shoulder') || m.includes('shape') || m.includes('look')) {
    return "Shoulder looks flat squared—prominent bump friend called weird—mirror avoidance Uber ride."
  }
  if (m.includes('numb') || m.includes('tingle') || m.includes('nerve')) {
    return "Outer shoulder patch fuzzy maybe numb—hard isolate through pain fog—could be imagination."
  }
  if (m.includes('sport') || m.includes('train') || m.includes('work')) {
    return "Personal trainer job—dominant side—clients tomorrow cancel if I’m baby in sling—panic layered."
  }
  if (m.includes('prior') || m.includes('before') || m.includes('dislocat')) {
    return "Never dislocated—sprained ankle bro culture—this new horror genre."
  }
  if (m.includes('med')) {
    return "Tough idiot took nothing yet—stubborn—maybe dumb."
  }
  if (m.includes('swell') || m.includes('bruise')) {
    return "Swelling building—muscle spasm visible—bruising unsure jersey still on embarrassing."
  }
  if (m.includes('timing') || m.includes('when')) {
    return "Tonight pickup game—two hours ago maybe—time bends pain distortion."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Supporting elbow with other hand only relief—gravity enemy."
  }
  if (m.includes('fever')) {
    return "No fever—shoulder only apocalypse."
  }
  if (m.includes('neck')) {
    return "Neck stiff compensating—primary villain shoulder though."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey doc—shoulder’s dislocated-feeling—sorry if I yell during exam."
  }
  return REPLY
}

function orthoTylerScaphoid(input: string): string {
  const m = input
  if (m.includes('fall') || m.includes('foosh') || m.includes('injur') || m.includes('hand')) {
    return "FOOSH blocking layup gone wrong—wrist bent backward—heard gross crunch not hero soundtrack."
  }
  if (m.includes('xray') || m.includes('x-ray') || m.includes('film') || m.includes('normal')) {
    return "ER doc said films negative—maybe—felt rushed—splint half-worn like bracelet shame."
  }
  if (m.includes('snuff') || m.includes('thumb') || m.includes('radial')) {
    return "Thumb-side wrist dip hurts deep—pressing there makes me yelp—holds grip hostage."
  }
  if (m.includes('grip') || m.includes('lift') || m.includes('bottle')) {
    return "Gripping water hurts—passing ball practice weak left—coach side-eye crushing confidence."
  }
  if (m.includes('swell') || m.includes('bruise')) {
    return "Swelling mild now—week later—initial puffy freaky."
  }
  if (m.includes('numb') || m.includes('tingle')) {
    return "Occasional tingle palm side push-up fail—not constant numb dead hand."
  }
  if (m.includes('sport') || m.includes('basketball') || m.includes('school')) {
    return "High school ball—scared whisper college watchers—probably ego noise."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Dull baseline—sharp grips—maybe five resting eight loading."
  }
  if (m.includes('med') || m.includes('ibuprofen')) {
    return "Ibuprofen sporadic—stomach whiny—avoid pills pride stupid."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Week pain now—initial incident—denial curve embarrassing."
  }
  if (m.includes('work') || m.includes('practice')) {
    return "Practice modified—wrap tape fantasy stability—know it’s fake."
  }
  if (m.includes('better') || m.includes('worse') || m.includes('help')) {
    return "Immobilizing brace from ER helped mentally not physically—overall worse gripping daily."
  }
  if (m.includes('prior') || m.includes('wrist')) {
    return "Never broke wrist before—ankle tweak middle school ancient history."
  }
  if (m.includes('weak')) {
    return "Weak pushing off—confidence shot—muscle maybe fine fear not."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey—wrist still screaming after ‘normal’ X-ray—confused angry mix."
  }
  return REPLY
}

function orthoDavidCompartment(input: string): string {
  const m = input
  if (m.includes('injur') || m.includes('crush') || m.includes('work') || m.includes('construction')) {
    return "Rebar stack collapsed on shin pinned trench wall—seconds felt eternal—adrenaline masked then betrayal pain arrived."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Pain climbing hourly—out of proportion boss words—pain meds dental stash laughable useless."
  }
  if (m.includes('swell') || m.includes('tight') || m.includes('tense')) {
    return "Shin feels shrink-wrapped—tight shiny—pressing doesn’t indent normal."
  }
  if (m.includes('numb') || m.includes('tingle') || m.includes('nerve')) {
    return "Top of foot between toes numb-ish patch—creepy—pins when I wiggle toes slowly."
  }
  if (m.includes('move') || m.includes('stretch') || m.includes('passive')) {
    return "Anyone moving my toes gently lights inferno—shouldn’t hurt that bad right?"
  }
  if (m.includes('walk') || m.includes('weight') || m.includes('bear')) {
    return "Was limping earlier—now scared weighting—like leg angry balloon."
  }
  if (m.includes('weak')) {
    return "Weak pushing off—not paralysis drama—fear overshadows strength test."
  }
  if (m.includes('timing') || m.includes('hour')) {
    return "Injury afternoon—worsening evening—now night escalating unfair curve."
  }
  if (m.includes('fever') || m.includes('infection')) {
    return "No fever sense—skin not streaky red infection movie—unless missing subtle."
  }
  if (m.includes('med')) {
    return "Old dental opioids untouched mostly—hate opioids industry reputation—maybe stupid brave."
  }
  if (m.includes('urine') || m.includes('dark') || m.includes('kidney')) {
    return "Haven’t looked urine—dehydrated maybe—construction heat day blurred."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Elevation ice earlier lie comforted—now nothing helps tightening spiral."
  }
  if (m.includes('boot') || m.includes('steel')) {
    return "Steel toe absorbed maybe—shin took reality—boot scuffed trophy."
  }
  if (m.includes('sport')) {
    return "Not athlete—work grunt—irrelevant maybe."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—leg pain monster escalating—need real help."
  }
  return REPLY
}

export const orthopaedicSurgeryKeywordHandlers: Record<string, (input: string) => string> = {
  'ortho-acl-jordan-soccer-pivot': orthoJordanAcl,
  'ortho-femoral-neck-margaret-kitchen-fall': orthoMargaretHip,
  'ortho-shoulder-dislocation-brandon-basketball': orthoBrandonShoulder,
  'ortho-scaphoid-tyler-foosh-wrist': orthoTylerScaphoid,
  'ortho-compartment-david-construction-crush': orthoDavidCompartment,
}
