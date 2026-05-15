/** Standard medical specialties for case library filtering and scenario metadata. */
export const MEDICAL_SPECIALTIES = [
  "Allergy & Immunology",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Family Medicine",
  "General Surgery",
  "Gastroenterology",
  "Geriatrics",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Neurology",
  "Nephrology",
  "Obstetrics & Gynecology (OB/GYN)",
  "Orthopaedic Surgery",
  "Pediatrics",
  "Psychiatry",
  "Rheumatology",
  "Urology",
] as const;

export type MedicalSpecialty = (typeof MEDICAL_SPECIALTIES)[number];

export const SPECIALTY_FILTER_ALL = "all" as const;
export type SpecialtyFilterValue = typeof SPECIALTY_FILTER_ALL | MedicalSpecialty;

export const SPECIALTY_FILTER_LABEL_ALL = "All Specialties";
