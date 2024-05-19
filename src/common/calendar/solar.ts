import { dateNthName, monthNthName, toStringDateTimeFormat } from './formater';
import time from '../module/time-converter';

export default (function () {
  const now = new Date();
  const DayName = dateNthName[now.getDay()];
  const Day = now.getDate();
  const Month = monthNthName[now.getMonth()];
  const Year = now.getFullYear();
  return {
    getToDay: () => {
      const now = new Date();
      return {
        day: time(now.getDay()),
        month: (now.getMonth() + 1)
      };
    },
    DayName,
    Day,
    Month,
    Year, string: toStringDateTimeFormat(DayName, Day, now.getMonth() + 1, Year)
  };
})();
