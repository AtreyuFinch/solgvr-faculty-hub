/**
 * Liturgical season for a given date (Gregorian calendar), so the dashboard
 * can show a warm "Ordinary Time / Lent / …" line. Pure date math — no API.
 */

function easterSunday(year: number): Date {
  // Anonymous Gregorian algorithm (computus)
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=Mar, 4=Apr
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function atMidnight(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export interface Season {
  name: string;
  line: string;
}

export function liturgicalSeason(date: Date): Season {
  const y = date.getFullYear();
  const t = atMidnight(date);

  const easter = easterSunday(y);
  const ashWed = addDays(easter, -46);
  const pentecost = addDays(easter, 49);

  // Advent 1 = the Sunday between Nov 27 and Dec 3
  const advent1 = new Date(y, 10, 27);
  while (advent1.getDay() !== 0) advent1.setDate(advent1.getDate() + 1);

  const christmasDay = new Date(y, 11, 25);
  // Baptism of the Lord ≈ the Sunday after Jan 6 (simplified)
  const baptism = new Date(y + 1, 0, 7);
  while (baptism.getDay() !== 0) baptism.setDate(baptism.getDate() + 1);

  const inRange = (start: Date, end: Date) =>
    t >= atMidnight(start) && t <= atMidnight(end);

  if (inRange(advent1, addDays(christmasDay, -1))) {
    return { name: "Advent", line: "Advent — preparing our hearts, together." };
  }
  if (inRange(christmasDay, baptism)) {
    return { name: "Christmas", line: "Christmas season — joy to our school family!" };
  }
  if (inRange(ashWed, addDays(easter, -1))) {
    return { name: "Lent", line: "Lent — walking with Christ, one prayer at a time." };
  }
  if (inRange(easter, pentecost)) {
    return { name: "Easter", line: "Easter season — He is risen, alleluia!" };
  }
  return {
    name: "Ordinary Time",
    line: "Ordinary Time — growing in faith, one school day at a time.",
  };
}

export function friendlyDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
