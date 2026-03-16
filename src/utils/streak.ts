import type { HabitKey, RecordsByDate } from '../types/habit';

function createDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getHabitStreak(records: RecordsByDate, habitKey: HabitKey) {
  let streak = 0;
  const currentDate = new Date();

  while (true) {
    const dateKey = createDateKey(currentDate);
    const dailyRecord = records[dateKey];

    if (!dailyRecord?.[habitKey]) {
      break;
    }

    streak += 1;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}
