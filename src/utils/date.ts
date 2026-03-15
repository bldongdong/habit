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

export function formatCurrentMonthLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
  }).format(new Date());
}

export function getCurrentMonthDateKeysDescending() {
  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const lastDate = new Date(year, monthIndex + 1, 0).getDate();
  const dateKeys: string[] = [];

  for (let day = lastDate; day >= 1; day -= 1) {
    const month = String(monthIndex + 1).padStart(2, '0');
    const date = String(day).padStart(2, '0');
    dateKeys.push(`${year}-${month}-${date}`);
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
