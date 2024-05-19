import { dateNthName, toStringDateTimeFormat } from './formater';


export default (function () {
  /**
   *
   * @function
   * */
  const Int = (function () {
    function convert(input: string | number): number {
      if (typeof input === 'string') {
        const isNumber = /^(\d+)?(\.\d+)?$/.test(input);
        if (!isNumber) {
          throw new Error('Không đúng định dạng số');
        }
      }
      return Math.floor(Number(input));
    }

    return convert;
  })();


  function jdFromDate(dd: number, mm: number, yy: number): number {
    const a = Int((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + Int((153 * m + 2) / 5) + 365 * y + Int(y / 4) - Int(y / 100) + Int(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Int((153 * m + 2) / 5) + 365 * y + Int(y / 4) - 32083;
    }
    return jd;
  }

  function jdToDate(jd: number): [number, number, number] {
    let a: number, b: number, c: number;
    if (jd > 2299160) { // After 1582
      a = jd + 32044;
      b = Int((4 * a + 3) / 146097);
      c = a - Int((b * 146097) / 4);
    } else {
      b = 0;
      c = jd + 32082;
    }
    const d = Int((4 * c + 3) / 1461);
    const e = c - Int((1461 * d) / 4);
    const m = Int((5 * e + 2) / 153);
    const day = e - Int((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Int(m / 10);
    const year = b * 100 + d - 4800 + Int(m / 10);
    return [day, month, year];
  }

  function getNewMoonDay(k: number, timeZone: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
    C1 -= 0.0004 * Math.sin(3 * dr * Mpr);
    C1 += 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
    C1 -= 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
    C1 -= 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
    C1 += 0.0010 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((2 * Mpr + M) * dr);
    let deltat = 0;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    const JdNew = Jd1 + C1 - deltat;
    return Int(JdNew + 0.5 + timeZone / 24);
  }

  function getSunLongitude(jdn: number, timeZone: number): number {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = Math.PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(2 * dr * M);
    DL += 0.000290 * Math.sin(3 * dr * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - Math.PI * 2 * (Int(L / (Math.PI * 2)));
    return Int(L / Math.PI * 6);
  }

  function getLunarMonth11(yy: number, timeZone: number): number {
    const k = Int((jdFromDate(31, 12, yy) - 2415021.076998695) / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  function getLeapMonthOffset(a11: number, timeZone: number): number {
    const k = Int((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc != last && i < 14);
    return i - 1;
  }


  function convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number) {
    const dayNumber = jdFromDate(dd, mm, yy);
    const k = Int((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    let a11 = getLunarMonth11(yy, timeZone);
    let b11 = a11;
    if (a11 >= monthStart) {
      b11 = getLunarMonth11(yy - 1, timeZone);
    } else {
      a11 = getLunarMonth11(yy + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = Int((monthStart - b11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (a11 - b11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(b11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff == leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      yy -= 1;
    }
    return {
      day: lunarDay,
      month: lunarMonth,
      year: yy,
      isLeapMonth: lunarLeap != 0,
    };
  }

  function isLeapYear(year: number) {
    const surplusAsLeap = [0, 3, 6, 9, 11, 14, 17];
    return surplusAsLeap.includes(year % 19);
  }

  function totalDayOfYear(year: number) {
    return isLeapYear(year) ? 355 : 354
  }

  const now = new Date();
  const solarDay = now.getDate();
  const solarMonth = now.getMonth() + 1;
  const solarYear = now.getFullYear();
  const timeZone = 7;
  const DayName = dateNthName[now.getDay()];
  const Days = totalDayOfYear(now.getFullYear());
  const { year, month, day, isLeapMonth } = convertSolar2Lunar(solarDay, solarMonth, solarYear, timeZone);
  return {
    Days,
    DayName,
    Day: day,
    Month: month,
    Year: year,
    isLeapMonth,
    thisYearIsLeap: isLeapYear(now.getFullYear()),
    string: `${day} tháng ${month} (Âm Lịch)` //toStringDateTimeFormat(DayName, day, month, year)
  };
})();