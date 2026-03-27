export function createDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatTodayLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date());
}

export function getTodayKey() {
  return createDateKey(new Date());
}

export function getCurrentYearMonth() {
  const today = new Date();

  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };
}

export function getCurrentDay() {
  return new Date().getDate();
}

export function formatYearMonthLabel(year: number, month: number) {
  const date = new Date(year, month - 1, 1);

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
  }).format(date);
}

export function formatMonthDayLabel(dateKey: string) {
  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
}

export function formatFullDateLabel(dateKey: string) {
  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
}

export function formatShortDateLabel(dateKey: string) {
  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
}

export function formatHistoryDateLabel(dateKey: string) {
  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatWeekRangeLabel(startDate: Date, endDate: Date) {
  const startMonth = startDate.getMonth() + 1;
  const startDay = startDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();

  return `${startMonth}월 ${startDay}일 - ${endMonth}월 ${endDay}일`;
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getDateKeysDescendingForMonth(year: number, month: number) {
  const lastDate = getDaysInMonth(year, month);
  const dateKeys: string[] = [];

  for (let day = lastDate; day >= 1; day -= 1) {
    const monthText = String(month).padStart(2, '0');
    const dateText = String(day).padStart(2, '0');
    dateKeys.push(`${year}-${monthText}-${dateText}`);
  }

  return dateKeys;
}

export function shiftYearMonth(year: number, month: number, monthOffset: number) {
  const date = new Date(year, month - 1 + monthOffset, 1);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}

export function isFutureYearMonth(year: number, month: number) {
  const currentYearMonth = getCurrentYearMonth();

  if (year > currentYearMonth.year) {
    return true;
  }

  if (year === currentYearMonth.year && month > currentYearMonth.month) {
    return true;
  }

  return false;
}

export function shiftDateByDays(date: Date, dayOffset: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + dayOffset);
  return nextDate;
}

export function getStartOfWeek(date: Date) {
  const dayOfWeek = date.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return shiftDateByDays(date, -daysSinceMonday);
}

export function getEndOfWeek(date: Date) {
  const startOfWeek = getStartOfWeek(date);
  return shiftDateByDays(startOfWeek, 6);
}

export function getDateKeysForRange(startDate: Date, endDate: Date) {
  const dateKeys: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateKeys.push(createDateKey(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateKeys;
}
