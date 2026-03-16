import type { RecordsByDate } from '../types/habit';

import { getDateKeysForRange } from './date';

export function getWeeklyHabitCount(
  records: RecordsByDate,
  habitKey: 'habit1' | 'habit2',
  weekStartDate: Date,
  weekEndDate: Date
) {
  const weekDateKeys = getDateKeysForRange(weekStartDate, weekEndDate);

  const successCount = weekDateKeys.filter((dateKey) => records[dateKey]?.[habitKey]).length;

  return {
    successCount,
    totalDays: 7,
  };
}
