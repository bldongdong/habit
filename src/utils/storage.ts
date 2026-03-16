import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_APP_DATA } from '../constants/habits';
import type { AppData, HabitDetail } from '../types/habit';

const STORAGE_KEY = 'two-check-app-data';

type LegacyAppData = Partial<AppData> & {
  habitNames?: [string?, string?];
};

function normalizeHabit(
  storedHabit: Partial<HabitDetail> | undefined,
  fallbackHabit: HabitDetail,
  legacyTitle?: string
) {
  return {
    title: storedHabit?.title?.trim() || legacyTitle?.trim() || fallbackHabit.title,
    description: storedHabit?.description?.trim() || fallbackHabit.description,
    weeklyTarget: storedHabit?.weeklyTarget ?? fallbackHabit.weeklyTarget,
  };
}

export async function loadAppData() {
  const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return DEFAULT_APP_DATA;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as LegacyAppData;

    return {
      habits: [
        normalizeHabit(
          parsedValue.habits?.[0],
          DEFAULT_APP_DATA.habits[0],
          parsedValue.habitNames?.[0]
        ),
        normalizeHabit(
          parsedValue.habits?.[1],
          DEFAULT_APP_DATA.habits[1],
          parsedValue.habitNames?.[1]
        ),
      ],
      records: parsedValue.records ?? {},
    } satisfies AppData;
  } catch {
    return DEFAULT_APP_DATA;
  }
}

export async function saveAppData(appData: AppData) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}
