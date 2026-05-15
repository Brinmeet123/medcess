/** Hematology — DEMO_MODE keyword handlers. */

const REPLY =
  "Can you ask that a simpler way? I want to make sure I answer what you mean."

function hemeOliviaItp(input: string): string {
  const m = input
  if (m.includes('bruise') || m.includes('bleed') || m.includes('petech')) {
    return "Bruises showroom on thighs calves—some I wake up with like bed attacked me. Gums pink toothbrush—nosebleeds twice before school—freaked my sister out."
  }
  if (m.includes('nose') || m.includes('epist')) {
    return "Nose gushed mornings—tissue wads—stopped eventually—scary volume though honest."
  }
  if (m.includes('gum') || m.includes('mouth') || m.includes('brush')) {
    return "Brushing spits pink—never happened before semester—homecoming photos dread."
  }
  if (m.includes('period') || m.includes('menstrual') || m.includes('menses')) {
    return "Last period heavier—maybe—pads changed more—hard compare normal drama."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Parents swear no hemophilia soap opera—brother bruised normal boy stuff."
  }
  if (m.includes('med') || m.includes('drug') || m.includes('ibuprofen')) {
    return "Occasional ibuprofen cramps—multivitamin gummies—no new sketch supplements."
  }
  if (m.includes('fever') || m.includes('sick') || m.includes('infection')) {
    return "No fever chills—energy weirdly okay—internet convinced leukemia anyway—spiraling."
  }
  if (m.includes('trauma') || m.includes('injury') || m.includes('hurt')) {
    return "No big hits—volleyball taps shouldn’t paint bruise murals though."
  }
  if (m.includes('transfus')) {
    return "Never bank blood—ER virgin til maybe today panic."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Not zombie tired—more cosmetic horror anxiety than true weakness."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Three-ish weeks creeping—denial until crop top season impossible."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Pressure on nose helped bleeds—ice on bruises Instagram hacks worthless."
  }
  if (m.includes('appetite') || m.includes('weight') || m.includes('eat')) {
    return "Eating normal—stress chocolate maybe—weight stableish."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—sorry if I sound dramatic—bruises everywhere."
  }
  return REPLY
}

function hemeJessicaIron(input: string): string {
  const m = input
  if (m.includes('fatigue') || m.includes('tired') || m.includes('energy')) {
    return "Dragging months—grading papers fog—stairs winded embarrassing with teens passing."
  }
  if (m.includes('shortness') || m.includes('breath') || m.includes('dyspnea') || m.includes('sob')) {
    return "Short walking hallway—talking while climbing impossible joke now."
  }
  if (m.includes('period') || m.includes('menstrual') || m.includes('bleed')) {
    return "Periods monsoon—super tampon hours not days—clots quarter-ish—ignored like virtue."
  }
  if (m.includes('ice') || m.includes('pica') || m.includes('crave')) {
    return "Crunch freezer ice compulsive—roommate thinks diet phase—it's soothing weirdly."
  }
  if (m.includes('dizz') || m.includes('lightheaded')) {
    return "Stand quick stars—never full fainted—close enough scared."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Mom anemia vague translation—thalassemia word floated once—unclear."
  }
  if (m.includes('transfus')) {
    return "Never transfused—needle drama avoided."
  }
  if (m.includes('gi') || m.includes('stool') || m.includes('blood')) {
    return "BM normal brown—no obvious red toilet fear—NSAIDs occasional headache not buckets."
  }
  if (m.includes('diet') || m.includes('vegetarian') || m.includes('iron')) {
    return "Mostly plant weekdays—not militant—maybe iron dumb on my part."
  }
  if (m.includes('pain') || m.includes('chest')) {
    return "Heart flutter once—could coffee—could drama—uncertain."
  }
  if (m.includes('med')) {
    return "Spare prenatal iron bottles—gut riot quit—bad adherence confession."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Semester blur worsening—denial peak professional woman trope."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Sitting better than moving—coffee fake energy worse crash."
  }
  if (m.includes('fever')) {
    return "No fever story—fatigue anemia flavored."
  }
  if (m.includes('bruise')) {
    return "Bruising not headline—maybe pale skin theatrical."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey—thanks for not eye-rolling my exhaustion yet."
  }
  return REPLY
}

function hemeAndrewHodgkin(input: string): string {
  const m = input
  if (m.includes('lump') || m.includes('node') || m.includes('neck') || m.includes('swell')) {
    return "Neck lumps rubbery—left bigger—painless which should comfort but doesn’t."
  }
  if (m.includes('sweat') || m.includes('night')) {
    return "Night sweats soak shirt—laundry ridiculous—roommate concern real."
  }
  if (m.includes('weight') || m.includes('appetite')) {
    return "Belt notch looser without trying—appetite ghost except stress wings."
  }
  if (m.includes('fever') || m.includes('chill') || m.includes('temp')) {
    return "Low-grade fevers evenings—thermometer 100.2 sometimes—chills theater."
  }
  if (m.includes('fatigue') || m.includes('tired')) {
    return "Lectures blur—advisor thinks burnout—maybe both."
  }
  if (m.includes('pain') || m.includes('hurt')) {
    return "Nodes don’t hurt—odd relief guilt— systemic ache vague."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Uncle ‘lymph something’ family vagueness—genetic lottery dread."
  }
  if (m.includes('hiv') || m.includes('tb')) {
    return "Senior year HIV test negative—TB not formally—should I have?"
  }
  if (m.includes('transfus')) {
    return "Never transfused—research stipend blood not that literal."
  }
  if (m.includes('med')) {
    return "Ibuprofen finals—nothing exotic—no steroids."
  }
  if (m.includes('itch') || m.includes('pruritus')) {
    return "Skin itchy random—maybe dry winter—maybe something else scary."
  }
  if (m.includes('cough') || m.includes('breath')) {
    return "Cough mild—could dorms—could something chest-y—paranoia spike."
  }
  if (m.includes('bleed')) {
    return "Razor nicks normal—no gushing epistaxis."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Months node evolution—B symptom crescendo recent."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Naps help function—stress thesis worse probably."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—lumps and sweats—trying not catastrophize alone."
  }
  return REPLY
}

function hemeMarcusSickle(input: string): string {
  const m = input
  if (m.includes('pain') || m.includes('hurt') || m.includes('ache')) {
    return "Legs vise—low back gnaw—whole body orchestra familiar evil louder today."
  }
  if (m.includes('sickle') || m.includes('crisis') || m.includes('disease')) {
    return "SS since baby screen—hydroxyurea supposed—pill pocket inconsistent—mom furious rightfully."
  }
  if (m.includes('dehydrat') || m.includes('water') || m.includes('sport') || m.includes('football')) {
    return "Tryout stupidity—hot field—forgot water—cramp snowball classic self-sabotage."
  }
  if (m.includes('fever')) {
    return "Low fever maybe—thermometer fuzzy—could pain mimic."
  }
  if (m.includes('transfus')) {
    return "Transfusion once little kid crisis—hospital smell trauma flash."
  }
  if (m.includes('family') || m.includes('history')) {
    return "Sister trait only—parents carriers story simplified."
  }
  if (m.includes('weak')) {
    return "Weak like drained battery—not sudden paralysis scary different."
  }
  if (m.includes('numb')) {
    return "No numb story—just deep bone wail."
  }
  if (m.includes('trauma') || m.includes('fall')) {
    return "No tackle snap—self-inflicted dehydration dumbness."
  }
  if (m.includes('breath') || m.includes('chest')) {
    return "Breathing okayish—slight air hunger—scared acute chest syndrome googling."
  }
  if (m.includes('med')) {
    return "Ibuprofen weak sauce today—hydroxyurea missed doses shame spiral."
  }
  if (m.includes('timing') || m.includes('when')) {
    return "Hours escalating since practice—Uber grimace."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Heat pad placebo—movement worsens—fetal curl classic."
  }
  if (m.includes('walk') || m.includes('weight')) {
    return "Limps earlier—now frightened jostle."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hey—sickle monster back—sorry if I’m loud."
  }
  return REPLY
}

function hemeNoahLeukemia(input: string): string {
  const m = input
  const parentVoice = m.includes('parent') || m.includes('mom') || m.includes('mother') || m.includes('family history')
  if (m.includes('infection') || m.includes('fever') || m.includes('sick') || m.includes('ear') || m.includes('pneumonia')) {
    return parentVoice
      ? "I'm his mom—three ear infections pneumonia scares since winter—antibiotics help then sick again—pediatrician said viral til I got loud."
      : "I keep missing school—ears hurt lungs sting—fevers at night—Tylenol Dance Mom invented."
  }
  if (m.includes('bruise') || m.includes('bleed') || m.includes('petech')) {
    return "Purple dots legs—thought soap allergy—switched twice—still freckle wrong color."
  }
  if (m.includes('bone') || m.includes('pain')) {
    return "Shin ache wakes me—Mom rubs Motrin—still cry sometimes—feel baby stupid."
  }
  if (m.includes('tired') || m.includes('energy') || m.includes('fatigue')) {
    return "Cartoons boring now—stairs tired—teacher noticed pale sub teacher joke hurt."
  }
  if (m.includes('belly') || m.includes('liver') || m.includes('spleen') || m.includes('stomach')) {
    return "Doctor pressed tummy uncomfortable—full feeling—I don’t words right—sorry."
  }
  if (m.includes('transfus')) {
    return "Never blood yet—needle fear graphic novel villain."
  }
  if (m.includes('vaccine') || m.includes('shot')) {
    return "Mom thinks shots current—flu mist missed maybe—paperwork chaos."
  }
  if (m.includes('appetite') || m.includes('eat') || m.includes('weight')) {
    return "Mac cheese bites only—hunger ghost."
  }
  if (m.includes('sibling') || m.includes('brother')) {
    return "Brother asthma normal—why me weird blood stuff unfair kid brain."
  }
  if (m.includes('med')) {
    return "Just kid Motrin sometimes—no herbs mom not that type."
  }
  if (m.includes('fever') && m.includes('how')) {
    return "Fever hops 101—nights worst—school mornings debates."
  }
  if (m.includes('timing') || m.includes('how long')) {
    return "Months worsening—mom grinds pediatrician appointments—sorry whiny truth."
  }
  if (m.includes('help') || m.includes('worse')) {
    return "Sleep cuddling mom helps fear—daylight worse honestly."
  }
  if (m.includes('scared') || m.includes('worried')) {
    return "Whispered bathroom ‘dying?’—overheard—I’m nine shouldn’t think that."
  }
  if (/\b(hello|hi|hey)\b/.test(m)) {
    return "Hi—Noah—mom holding my hand—scared."
  }
  return REPLY
}

export const hematologyKeywordHandlers: Record<string, (input: string) => string> = {
  'heme-itp-olivia-easy-bruising': hemeOliviaItp,
  'heme-iron-jessica-fatigue-sob': hemeJessicaIron,
  'heme-hodgkin-andrew-cervical-nodes': hemeAndrewHodgkin,
  'heme-sickle-marcus-voc': hemeMarcusSickle,
  'heme-acute-leukemia-noah-infections': hemeNoahLeukemia,
}
