import dayjs from 'dayjs';

const time: Record<string, any> = {};

time.getTimeRange = (timeSelect: number) => {
  let timeObj = [] as string[] | Date[];

  switch (timeSelect) {
    case 1:
      timeObj = time.getPreviousWeek();
      break;
    case 2:
      timeObj = time.getYesterday();
      break;
    case 3:
      timeObj = time.getToday();
      break;
    case 4:
      timeObj = time.getCurrentWeek();
      break;
    case 5:
      timeObj = time.getCurrentMonth();
      break;
    case 6:
      timeObj = time.getPreviousMonth();
      break;
    default:
      timeObj = time.getToday();
      break;
  }

  const timeS = dayjs(timeObj[0]);
  const timeE = dayjs(timeObj[1]);

  return {
    stime: timeS.format('YYYY-MM-DD 00:00:00'),
    etime: timeE.format('YYYY-MM-DD 23:59:59'),
  };
};

time.getToday = () => {
  const startStop = [];
  const nowdate = new Date();
  const year = nowdate.getFullYear();
  const month = nowdate.getMonth() + 1;
  const day = nowdate.getDate();

  startStop.push(year + '-' + month + '-' + day + ' 00:00:00');
  startStop.push(year + '-' + month + '-' + day + ' 23:59:59');

  return startStop;
};

time.getYesterday = () => {
  const startStop = [];
  const day1 = new Date();

  day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
  const s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate();

  startStop.push(s1 + ' 00:00:00');
  startStop.push(s1 + ' 23:59:59');

  return startStop;
};

time.getCurrentWeek = () => {
  const startStop = [];

  const currentDate = new Date();

  const week = currentDate.getDay();

  const month = currentDate.getDate();

  const millisecond = 1000 * 60 * 60 * 24;

  const minusDay = week != 0 ? week - 1 : 6;

  const monday = new Date(currentDate.getTime() - minusDay * millisecond);

  const sunday = new Date(monday.getTime() + 6 * millisecond);

  startStop.push(monday);

  startStop.push(sunday);

  return startStop;
};

time.getCurrentMonth = () => {
  const startStop = [];

  const currentDate = new Date();

  let currentMonth = currentDate.getMonth();

  let currentYear = currentDate.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);

  if (currentMonth == 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }

  const millisecond = 1000 * 60 * 60 * 24;

  const nextMonthDayOne = new Date(currentYear, currentMonth, 1);

  const lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

  startStop.push(firstDay);
  startStop.push(lastDay);

  return startStop;
};

time.getPriorMonthFirstDay = (year: number, month: number) => {
  if (month == 0) {
    month = 11;
    year--;

    return new Date(year, month, 1);
  }

  month--;

  return new Date(year, month, 1);
};

time.getMonthDays = (year: number, month: number) => {
  const relativeDate = new Date(year, month, 1);

  let relativeMonth = relativeDate.getMonth();

  let relativeYear = relativeDate.getFullYear();

  if (relativeMonth == 11) {
    relativeYear++;
    relativeMonth = 0;
  } else {
    relativeMonth++;
  }

  const millisecond = 1000 * 60 * 60 * 24;

  const nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);

  return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
};

time.getPreviousMonth = () => {
  const startStop = [];

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const currentYear = currentDate.getFullYear();

  const priorMonthFirstDay = time.getPriorMonthFirstDay(currentYear, currentMonth);

  const priorMonthLastDay = new Date(
    priorMonthFirstDay.getFullYear(),
    priorMonthFirstDay.getMonth(),
    time.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()),
  );

  startStop.push(priorMonthFirstDay);
  startStop.push(priorMonthLastDay);

  return startStop;
};

time.getPreviousWeek = () => {
  const startStop = [];

  const currentDate = new Date();

  const week = currentDate.getDay();

  const month = currentDate.getDate();

  const millisecond = 1000 * 60 * 60 * 24;

  const minusDay = week != 0 ? week - 1 : 6;

  const currentWeekDayOne = new Date(currentDate.getTime() - millisecond * minusDay);

  const priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);

  const priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - millisecond * 6);

  startStop.push(priorWeekFirstDay);
  startStop.push(priorWeekLastDay);

  return startStop;
};

export default time;
