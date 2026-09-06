import { describe, it, expect } from 'vitest';
import {
  reduceNumber,
  calculateLifePath,
  calculateBirthdayNumber,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculateExpressionNumber,
  calculateSoulUrge,
  calculatePersonalityNumber,
  normalizeName
} from '../src/lib/numerology/engine';

describe('Numerology Engine Tests', () => {
  it('should reduce numbers correctly preserving master numbers 11, 22, 33', () => {
    expect(reduceNumber(15).value).toBe(6);
    expect(reduceNumber(29).value).toBe(11); // 2+9=11 (master)
    expect(reduceNumber(11).value).toBe(11); // master
    expect(reduceNumber(22).value).toBe(22); // master
    expect(reduceNumber(33).value).toBe(33); // master
    // Non-preserving reduction
    expect(reduceNumber(11, false).value).toBe(2);
    expect(reduceNumber(22, false).value).toBe(4);
    expect(reduceNumber(33, false).value).toBe(6);
  });

  it('should calculate Life Path Number correctly', () => {
    // 1990-10-15:
    // Year: 1+9+9+0 = 19 -> 1+9 = 10 -> 1
    // Month: 10 -> 1
    // Day: 15 -> 6
    // Sum: 1 + 1 + 6 = 8
    const res = calculateLifePath('1990-10-15');
    expect(res.value).toBe(8);
    expect(res.isMaster).toBe(false);
  });

  it('should preserve Master Number in Life Path if reached', () => {
    // 1985-05-11:
    // Year: 1+9+8+5 = 23 -> 5
    // Month: 5
    // Day: 11 (master)
    // Sum: 5 + 5 + 11 = 21 -> 3
    const res = calculateLifePath('1985-05-11');
    expect(res.value).toBe(3);
  });

  it('should calculate Birthday Number correctly', () => {
    expect(calculateBirthdayNumber('1994-07-14').value).toBe(5); // 1+4 = 5
    expect(calculateBirthdayNumber('1994-07-11').value).toBe(11); // 11 is master
    expect(calculateBirthdayNumber('1994-07-22').value).toBe(22); // 22 is master
  });

  it('should calculate Personal Year and Personal Month', () => {
    // Birth date: July 14. Target Year: 2026
    // Month: 7 -> 7
    // Day: 14 -> 5
    // Year 2026: 2+0+2+6 = 10 -> 1
    // Total: 7 + 5 + 1 = 13 -> 4
    const py = calculatePersonalYear('1994-07-14', 2026);
    expect(py.value).toBe(4);

    // Personal Month for March (Month 3):
    // Personal Year 4 + Month 3 = 7
    const marchDate = new Date(2026, 2, 15); // March 15
    const pm = calculatePersonalMonth('1994-07-14', marchDate);
    expect(pm.value).toBe(7);
  });

  it('should normalize names removing accents and diacritics', () => {
    expect(normalizeName('Kovács Ágnes')).toBe('KOVACSAGNES');
    expect(normalizeName('Müller François')).toBe('MULLERFRANCOIS');
    expect(normalizeName('Béla & 123')).toBe('BELA');
  });

  it('should calculate Expression, Soul Urge and Personality numbers', () => {
    const name = 'Anna'; // A=1, N=5, N=5, A=1 -> 1+5+5+1 = 12 -> 3
    const exp = calculateExpressionNumber(name);
    expect(exp.value).toBe(3);

    // Vowels in 'Anna': A (1) + A (1) = 2
    const soul = calculateSoulUrge(name);
    expect(soul.value).toBe(2);

    // Consonants in 'Anna': N (5) + N (5) = 10 -> 1
    const pers = calculatePersonalityNumber(name);
    expect(pers.value).toBe(1);
  });
});
