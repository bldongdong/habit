export function formatTodayLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date());
}

export function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getCurrentYearMonth() {
  const today = new Date();

  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  };
}

export function formatYearMonthLabel(year: number, month: number) {
  const date = new Date(year, month - 1, 1);

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
  }).format(date);
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
