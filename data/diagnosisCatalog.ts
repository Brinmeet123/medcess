export type DxCategory =
  | "Cardiac"
  | "Pulmonary"
  | "Neurology"
  | "GI"
  | "Infectious"
  | "Endocrine"
  | "Renal"
  | "Hematology"
  | "Psych"
  | "MSK"
  | "Other";

export type DiagnosisItem = {
  id: string;
  name: string;
  category: DxCategory;
  brief: string;          // 1-line description
  typicalClues: string[]; // common features
  common: boolean;
};

export const diagnosisCatalog: DiagnosisItem[] = [
  // Cardiac
  {
    id: "stemi",
    name: "ST-elevation myocardial infarction (STEMI)",
    category: "Cardiac",
    brief: "Acute coronary occlusion causing myocardial injury.",
    typicalClues: ["Exertional chest pressure", "Radiation to arm/jaw", "ECG ST elevation", "Elevated troponin"],
    common: true,
  },
  {
    id: "nstemi",
    name: "Non-ST elevation myocardial infarction (NSTEMI)",
    category: "Cardiac",
    brief: "Myocardial infarction without ST elevation on ECG.",
    typicalClues: ["Chest pain", "Elevated troponin", "No ST elevation"],
    common: true,
  },
  {
    id: "unstable_angina",
    name: "Unstable angina",
    category: "Cardiac",
    brief: "Chest pain from coronary artery disease, not meeting MI criteria.",
    typicalClues: ["Chest pain", "Normal troponin", "ECG changes"],
    common: true,
  },
  {
    id: "aortic_dissection",
    name: "Aortic dissection",
    category: "Cardiac",
    brief: "Tear in the aortic wall, life-threatening emergency.",
    typicalClues: ["Tearing chest pain", "Hypertension", "Pulse deficit", "Widened mediastinum"],
    common: false,
  },
  {
    id: "pericarditis",
    name: "Pericarditis",
    category: "Cardiac",
    brief: "Inflammation of the pericardium.",
    typicalClues: ["Sharp chest pain", "Worse lying flat", "Pericardial rub", "Diffuse ST elevation"],
    common: false,
  },

  // Pulmonary
  {
    id: "pe",
    name: "Pulmonary embolism (PE)",
    category: "Pulmonary",
    brief: "Blood clot blocking pulmonary artery.",
    typicalClues: ["Dyspnea", "Chest pain", "Tachycardia", "Elevated D-dimer"],
    common: true,
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    category: "Pulmonary",
    brief: "Lung infection causing inflammation.",
    typicalClues: ["Fever", "Cough", "Chest X-ray infiltrate", "Elevated WBC"],
    common: true,
  },
  {
    id: "pneumothorax",
    name: "Pneumothorax",
    category: "Pulmonary",
    brief: "Collapsed lung from air in pleural space.",
    typicalClues: ["Sudden dyspnea", "Chest pain", "Decreased breath sounds", "Hyperresonance"],
    common: false,
  },
  {
    id: "copd_exacerbation",
    name: "COPD exacerbation",
    category: "Pulmonary",
    brief: "Acute worsening of chronic obstructive pulmonary disease.",
    typicalClues: ["Dyspnea", "Wheezing", "COPD history", "Increased sputum"],
    common: true,
  },
  {
    id: "asthma",
    name: "Asthma",
    category: "Pulmonary",
    brief: "Chronic reversible airway inflammation with wheeze and bronchospasm.",
    typicalClues: ["Wheezing", "Cough", "Dyspnea", "Reversible obstruction on spirometry"],
    common: true,
  },

  // Neurology
  {
    id: "stroke",
    name: "Ischemic stroke",
    category: "Neurology",
    brief: "Brain tissue death from blocked blood supply.",
    typicalClues: ["Focal neurologic deficit", "Sudden onset", "CT head negative early", "Risk factors"],
    common: true,
  },
  {
    id: "tia",
    name: "Transient ischemic attack (TIA)",
    category: "Neurology",
    brief: "Temporary stroke symptoms that resolve.",
    typicalClues: ["Focal deficit", "Resolves <24h", "No CT changes"],
    common: true,
  },
  {
    id: "migraine",
    name: "Migraine",
    category: "Neurology",
    brief: "Severe headache with associated symptoms.",
    typicalClues: ["Unilateral headache", "Photophobia", "Nausea", "Aura"],
    common: true,
  },
  {
    id: "meningitis",
    name: "Meningitis",
    category: "Neurology",
    brief: "Infection of the meninges.",
    typicalClues: ["Headache", "Fever", "Neck stiffness", "Altered mental status"],
    common: false,
  },
  {
    id: "subarachnoid_hemorrhage",
    name: "Subarachnoid hemorrhage (SAH)",
    category: "Neurology",
    brief: "Bleeding into subarachnoid space.",
    typicalClues: ["Thunderclap headache", "Neck stiffness", "CT head positive", "Bloody CSF"],
    common: false,
  },

  // GI
  {
    id: "gerd",
    name: "Gastroesophageal reflux disease (GERD)",
    category: "GI",
    brief: "Acid reflux causing burning chest discomfort.",
    typicalClues: ["Burning pain", "Post-meal", "Worse lying down", "Relief with antacids"],
    common: true,
  },
  {
    id: "pancreatitis",
    name: "Acute pancreatitis",
    category: "GI",
    brief: "Inflammation of the pancreas.",
    typicalClues: ["Epigastric pain", "Radiation to back", "Elevated lipase", "Nausea/vomiting"],
    common: true,
  },
  {
    id: "appendicitis",
    name: "Appendicitis",
    category: "GI",
    brief: "Inflammation of the appendix.",
    typicalClues: ["RLQ pain", "Fever", "Elevated WBC", "CT findings"],
    common: true,
  },
  {
    id: "cholecystitis",
    name: "Acute cholecystitis",
    category: "GI",
    brief: "Inflammation of the gallbladder.",
    typicalClues: ["RUQ pain", "Fever", "Elevated WBC", "Positive Murphy's sign"],
    common: true,
  },

  // Infectious
  {
    id: "sepsis",
    name: "Sepsis",
    category: "Infectious",
    brief: "Life-threatening organ dysfunction from infection.",
    typicalClues: ["Fever", "Hypotension", "Tachycardia", "Elevated lactate"],
    common: true,
  },
  {
    id: "uti",
    name: "Urinary tract infection (UTI)",
    category: "Infectious",
    brief: "Bacterial infection of urinary system.",
    typicalClues: ["Dysuria", "Frequency", "Positive urine culture", "Pyuria"],
    common: true,
  },

  // Endocrine
  {
    id: "dka",
    name: "Diabetic ketoacidosis (DKA)",
    category: "Endocrine",
    brief: "Severe hyperglycemia with metabolic acidosis.",
    typicalClues: ["Hyperglycemia", "Ketones", "Acidosis", "Altered mental status"],
    common: false,
  },
  {
    id: "hypoglycemia",
    name: "Hypoglycemia",
    category: "Endocrine",
    brief: "Low blood sugar.",
    typicalClues: ["Altered mental status", "Sweating", "Tremor", "Low glucose"],
    common: true,
  },

  // Renal
  {
    id: "aki",
    name: "Acute kidney injury (AKI)",
    category: "Renal",
    brief: "Sudden decline in kidney function.",
    typicalClues: ["Elevated creatinine", "Oliguria", "Volume depletion", "Nephrotoxins"],
    common: true,
  },

  // Psych
  {
    id: "panic",
    name: "Panic attack",
    category: "Psych",
    brief: "Acute anxiety episode with physical symptoms.",
    typicalClues: ["Palpitations", "Fear", "Tingling", "Hyperventilation", "No organic findings"],
    common: true,
  },
  {
    id: "anxiety",
    name: "Anxiety disorder",
    category: "Psych",
    brief: "Persistent excessive worry and anxiety.",
    typicalClues: ["Worry", "Restlessness", "Fatigue", "Difficulty concentrating"],
    common: true,
  },

  // MSK
  {
    id: "muscle_strain",
    name: "Muscle strain",
    category: "MSK",
    brief: "Injury to muscle or tendon.",
    typicalClues: ["Pain with movement", "Localized tenderness", "No systemic symptoms"],
    common: true,
  },

  // Other
  {
    id: "costochondritis",
    name: "Costochondritis",
    category: "Other",
    brief: "Inflammation of costochondral joints.",
    typicalClues: ["Chest wall tenderness", "Reproducible pain", "No cardiac findings"],
    common: true,
  },

  // Allergy & Immunology
  {
    id: "seasonal_allergic_rhinitis",
    name: "Seasonal allergic rhinitis",
    category: "Other",
    brief: "IgE-mediated nasal inflammation triggered by seasonal allergens.",
    typicalClues: ["Itchy watery eyes", "Clear rhinorrhea", "Outdoor trigger", "Pollen skin test positive"],
    common: true,
  },
  {
    id: "viral_uri",
    name: "Viral upper respiratory infection",
    category: "Infectious",
    brief: "Self-limited viral illness of the upper airways.",
    typicalClues: ["Fever", "Myalgias", "Purulent discharge less common early", "Short duration"],
    common: true,
  },
  {
    id: "bacterial_sinusitis",
    name: "Acute bacterial sinusitis",
    category: "Infectious",
    brief: "Bacterial infection of the paranasal sinuses.",
    typicalClues: ["Facial pain", "Purulent nasal discharge", "Fever", "Symptoms >10 days or worsening"],
    common: true,
  },
  {
    id: "nonallergic_rhinitis",
    name: "Nonallergic rhinitis",
    category: "Other",
    brief: "Nasal symptoms without clear allergic trigger or elevated IgE.",
    typicalClues: ["Nasal congestion", "No itch", "No seasonal pattern", "Negative allergy testing"],
    common: true,
  },
  {
    id: "allergic_conjunctivitis",
    name: "Allergic conjunctivitis",
    category: "Other",
    brief: "IgE-mediated conjunctival inflammation.",
    typicalClues: ["Bilateral itchy eyes", "Watery discharge", "Seasonal symptoms", "No fever"],
    common: true,
  },
  {
    id: "peanut_anaphylaxis",
    name: "Peanut-induced anaphylaxis",
    category: "Other",
    brief: "Severe IgE-mediated systemic reaction to peanut protein.",
    typicalClues: ["Food trigger", "Urticaria", "Airway symptoms", "Hypotension", "Elevated tryptase"],
    common: true,
  },
  {
    id: "food_intolerance",
    name: "Food intolerance",
    category: "Other",
    brief: "Non-IgE adverse reaction to food, usually without anaphylaxis.",
    typicalClues: ["GI symptoms", "No urticaria", "No hypotension", "Gradual onset"],
    common: true,
  },
  {
    id: "angioedema",
    name: "Angioedema",
    category: "Other",
    brief: "Deep dermal/submucosal swelling, may be allergic or bradykinin-mediated.",
    typicalClues: ["Lip or face swelling", "May lack urticaria", "ACE inhibitor association possible"],
    common: false,
  },
  {
    id: "viral_urticaria",
    name: "Viral urticaria",
    category: "Infectious",
    brief: "Hives associated with viral illness.",
    typicalClues: ["Fever", "URI symptoms", "Diffuse rash", "No food trigger"],
    common: false,
  },
  {
    id: "cvid",
    name: "Common variable immunodeficiency (CVID)",
    category: "Infectious",
    brief: "Primary immunodeficiency with low immunoglobulins and poor vaccine responses.",
    typicalClues: ["Recurrent sinopulmonary infections", "Low IgG/IgA/IgM", "Poor antibody titers", "Failure to thrive"],
    common: false,
  },
  {
    id: "cystic_fibrosis",
    name: "Cystic fibrosis",
    category: "Pulmonary",
    brief: "Autosomal recessive disorder causing thick secretions and recurrent lung disease.",
    typicalClues: ["Chronic cough", "Positive sweat chloride", "Failure to thrive", "Recurrent pneumonia"],
    common: false,
  },
  {
    id: "primary_ciliary_dyskinesia",
    name: "Primary ciliary dyskinesia",
    category: "Pulmonary",
    brief: "Motile cilia defect causing recurrent respiratory infections.",
    typicalClues: ["Chronic otitis", "Sinusitis", "Bronchiectasis", "Situs inversus possible"],
    common: false,
  },
  {
    id: "hiv_infection",
    name: "HIV infection",
    category: "Infectious",
    brief: "Retroviral infection causing progressive immunodeficiency.",
    typicalClues: ["Risk factors", "Weight loss", "Opportunistic infections", "Positive HIV test"],
    common: false,
  },
  {
    id: "recurrent_viral_infections",
    name: "Recurrent viral infections (normal childhood)",
    category: "Infectious",
    brief: "Frequent mild viral illnesses typical in young children.",
    typicalClues: ["Self-limited URI", "Normal growth", "Normal immunoglobulins", "No invasive infections"],
    common: true,
  },
  {
    id: "exercise_induced_asthma",
    name: "Exercise-induced asthma (exercise-induced bronchoconstriction)",
    category: "Pulmonary",
    brief: "Bronchospasm triggered by exertion, often with normal resting spirometry.",
    typicalClues: ["Symptoms with exercise", "Wheezing after exertion", "Improves with rest", "Positive exercise challenge"],
    common: true,
  },
  {
    id: "poor_conditioning",
    name: "Poor physical conditioning (deconditioning)",
    category: "Other",
    brief: "Reduced exercise tolerance from lack of fitness rather than pathology.",
    typicalClues: ["Gradual improvement with training", "Normal pulmonary testing", "No wheeze"],
    common: true,
  },
  {
    id: "vocal_cord_dysfunction",
    name: "Vocal cord dysfunction",
    category: "Pulmonary",
    brief: "Paradoxical vocal fold motion mimicking asthma.",
    typicalClues: ["Inspiratory stridor", "Normal spirometry between episodes", "Often young athlete"],
    common: false,
  },
  {
    id: "atopic_dermatitis",
    name: "Atopic dermatitis (eczema)",
    category: "Other",
    brief: "Chronic pruritic inflammatory skin disease in atopic patients.",
    typicalClues: ["Flexural rash", "Dry skin", "Chronic relapsing course", "Family atopy"],
    common: true,
  },
  {
    id: "contact_dermatitis",
    name: "Contact dermatitis",
    category: "Other",
    brief: "Localized skin inflammation from irritant or allergic contact.",
    typicalClues: ["Localized to contact area", "New exposure", "Sharp borders"],
    common: true,
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    category: "Other",
    brief: "Chronic immune-mediated plaques with silvery scale.",
    typicalClues: ["Extensor surfaces", "Plaques with scale", "Nail pitting"],
    common: true,
  },
  {
    id: "tinea_corporis",
    name: "Tinea corporis (ringworm)",
    category: "Infectious",
    brief: "Superficial fungal infection of the skin.",
    typicalClues: ["Annular plaque", "Central clearing", "Positive KOH or culture"],
    common: true,
  },
  {
    id: "scabies",
    name: "Scabies",
    category: "Infectious",
    brief: "Sarcoptes infestation causing intense nocturnal pruritus.",
    typicalClues: ["Burrows", "Household contacts itchy", "Positive skin scraping"],
    common: true,
  },
  {
    id: "impetigo",
    name: "Impetigo",
    category: "Infectious",
    brief: "Superficial bacterial skin infection with honey-colored crust.",
    typicalClues: ["Honey crust", "Localized lesions", "Contagious"],
    common: true,
  },
  {
    id: "drug_rash",
    name: "Drug eruption",
    category: "Other",
    brief: "Rash temporally linked to a new medication.",
    typicalClues: ["New drug within days", "Morbilliform rash", "Resolves after stopping drug"],
    common: true,
  },
  {
    id: "cardiac_arrhythmia",
    name: "Cardiac arrhythmia",
    category: "Cardiac",
    brief: "Abnormal heart rhythm causing palpitations or syncope.",
    typicalClues: ["Palpitations", "Syncope with exercise", "ECG abnormality"],
    common: false,
  },
];

