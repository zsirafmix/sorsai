import { NUMBER_ARCHETYPES } from './meanings';
import { NumberResult, NumerologyProfile } from './types';

/**
 * Reduce a number to a single digit or master number (11, 22, 33)
 */
export function reduceNumber(n: number, preserveMaster = true): { value: number; isMaster: boolean } {
  let current = Math.abs(Math.floor(n));
  if (current === 0) return { value: 0, isMaster: false };

  while (current > 9) {
    if (preserveMaster && (current === 11 || current === 22 || current === 33)) {
      return { value: current, isMaster: true };
    }
    const digits = current.toString().split('').map(Number);
    current = digits.reduce((sum, d) => sum + d, 0);
  }

  const isMaster = preserveMaster && (current === 11 || current === 22 || current === 33);
  return { value: current, isMaster };
}

/**
 * Helper to build a NumberResult object with archetype data
 */
export function buildNumberResult(value: number, isMaster: boolean): NumberResult {
  const archetype = NUMBER_ARCHETYPES[value] || NUMBER_ARCHETYPES[1];
  return {
    value,
    isMaster,
    title: archetype.title,
    title_hu: archetype.title_hu,
    title_de: archetype.title_de,
    title_fr: archetype.title_fr,
    archetype: archetype.archetype,
    archetype_hu: archetype.archetype_hu,
    keywords: archetype.keywords,
    summary: archetype.summary,
    summary_hu: archetype.summary_hu,
  };
}

/**
 * Calculate Life Path Number from birth date (YYYY-MM-DD)
 * Traditional reduction: reduce year, reduce month, reduce day, then sum and reduce.
 */
export function calculateLifePath(birthDateString: string): NumberResult {
  const parts = birthDateString.split('-').map(Number);
  if (parts.length < 3 || parts.some(isNaN)) {
    return buildNumberResult(1, false);
  }

  const [year, month, day] = parts;
  const redYear = reduceNumber(year, true).value;
  const redMonth = reduceNumber(month, true).value;
  const redDay = reduceNumber(day, true).value;

  const total = redYear + redMonth + redDay;
  const final = reduceNumber(total, true);
  return buildNumberResult(final.value, final.isMaster);
}

/**
 * Birthday number: day of the month reduced (preserving 11, 22)
 */
export function calculateBirthdayNumber(birthDateString: string): NumberResult {
  const parts = birthDateString.split('-').map(Number);
  if (parts.length < 3 || isNaN(parts[2])) {
    return buildNumberResult(1, false);
  }
  const day = parts[2];
  const final = reduceNumber(day, true);
  return buildNumberResult(final.value, final.isMaster);
}

/**
 * Personal Year: Birth Day + Birth Month + Target Year
 */
export function calculatePersonalYear(birthDateString: string, targetYear?: number): NumberResult {
  const parts = birthDateString.split('-').map(Number);
  if (parts.length < 3 || parts.some(isNaN)) {
    return buildNumberResult(1, false);
  }
  const [, month, day] = parts;
  const yearToUse = targetYear || new Date().getFullYear();

  const redMonth = reduceNumber(month, false).value;
  const redDay = reduceNumber(day, false).value;
  const redYear = reduceNumber(yearToUse, false).value;

  const total = redMonth + redDay + redYear;
  // Personal years are strictly 1-9 in standard numerology
  const final = reduceNumber(total, false);
  return buildNumberResult(final.value, false);
}

/**
 * Personal Month: Personal Year + Current Calendar Month
 */
export function calculatePersonalMonth(birthDateString: string, targetDate?: Date): NumberResult {
  const date = targetDate || new Date();
  const personalYear = calculatePersonalYear(birthDateString, date.getFullYear()).value;
  const currentMonth = date.getMonth() + 1; // 1-12
  const redMonth = reduceNumber(currentMonth, false).value;

  const total = personalYear + redMonth;
  const final = reduceNumber(total, false);
  return buildNumberResult(final.value, false);
}

// Pythagorean letter chart
const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

/**
 * Normalize string removing diacritics and accents
 */
export function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

/**
 * Calculate Expression / Name number from full name
 */
export function calculateExpressionNumber(fullName: string): NumberResult {
  const clean = normalizeName(fullName);
  if (!clean) return buildNumberResult(1, false);

  let sum = 0;
  for (const char of clean) {
    sum += PYTHAGOREAN_MAP[char] || 0;
  }

  const final = reduceNumber(sum, true);
  return buildNumberResult(final.value, final.isMaster);
}

/**
 * Calculate Soul Urge (vowels sum)
 */
export function calculateSoulUrge(fullName: string): NumberResult {
  const clean = normalizeName(fullName);
  if (!clean) return buildNumberResult(1, false);

  let sum = 0;
  for (const char of clean) {
    if (VOWELS.has(char)) {
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }

  if (sum === 0) return buildNumberResult(1, false);
  const final = reduceNumber(sum, true);
  return buildNumberResult(final.value, final.isMaster);
}

/**
 * Calculate Personality number (consonants sum)
 */
export function calculatePersonalityNumber(fullName: string): NumberResult {
  const clean = normalizeName(fullName);
  if (!clean) return buildNumberResult(1, false);

  let sum = 0;
  for (const char of clean) {
    if (!VOWELS.has(char)) {
      sum += PYTHAGOREAN_MAP[char] || 0;
    }
  }

  if (sum === 0) return buildNumberResult(1, false);
  const final = reduceNumber(sum, true);
  return buildNumberResult(final.value, final.isMaster);
}

/**
 * Complete Numerology Profile Generator
 */
export function generateNumerologyProfile(fullName: string, birthDate: string): NumerologyProfile {
  return {
    lifePath: calculateLifePath(birthDate),
    birthdayNumber: calculateBirthdayNumber(birthDate),
    personalYear: calculatePersonalYear(birthDate),
    personalMonth: calculatePersonalMonth(birthDate),
    expressionNumber: calculateExpressionNumber(fullName),
    soulUrge: calculateSoulUrge(fullName),
    personalityNumber: calculatePersonalityNumber(fullName),
    calculatedAt: new Date().toISOString()
  };
}
