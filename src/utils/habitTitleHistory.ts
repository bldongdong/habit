import type { HabitDetail, HabitTitleHistoryEntry } from '../types/habit';

export function getDisplayTitleForRange(
  habit: HabitDetail,
  changes: HabitTitleHistoryEntry[] | undefined,
  rangeEndDateKey: string
) {
  if (!changes || changes.length === 0) {
    return habit.initialTitle || habit.title;
  }

  for (let index = changes.length - 1; index >= 0; index -= 1) {
    if (changes[index].changedAt <= rangeEndDateKey) {
      return changes[index].title;
    }
  }

  return habit.initialTitle || habit.title;
}

export function getChangesInRange(
  changes: HabitTitleHistoryEntry[] | undefined,
  rangeStartDateKey: string,
  rangeEndDateKey: string
) {
  if (!changes || changes.length === 0) {
    return [];
  }

  const result: HabitTitleHistoryEntry[] = [];

  for (let index = changes.length - 1; index >= 0; index -= 1) {
    const changedAt = changes[index].changedAt;

    if (changedAt > rangeEndDateKey) {
      continue;
    }

    if (changedAt < rangeStartDateKey) {
      break;
    }

    result.push(changes[index]);
  }

  return result;
}
