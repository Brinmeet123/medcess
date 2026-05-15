/** Standard medical specialties for case library filtering and scenario metadata. */
export const MEDICAL_SPECIALTIES = [
  "Allergy & Immunology",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "General Surgery",
  "Geriatrics",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Nephrology",
  "Neurology",
  "Neurosurgery",
  "Obstetrics & Gynecology (OB/GYN)",
  "Oncology",
  "Ophthalmology",
  "Orthopaedic Surgery",
  "Otolaryngology (ENT)",
  "Pathology",
  "Pediatrics",
  "Physical Medicine & Rehabilitation (PM&R)",
  "Plastic Surgery",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Thoracic Surgery",
  "Urology",
  "Vascular Surgery",
] as const;

export type MedicalSpecialty = (typeof MEDICAL_SPECIALTIES)[number];

export const SPECIALTY_FILTER_ALL = "all" as const;
export type SpecialtyFilterValue = typeof SPECIALTY_FILTER_ALL | MedicalSpecialty;

export const SPECIALTY_FILTER_LABEL_ALL = "All Specialties";
