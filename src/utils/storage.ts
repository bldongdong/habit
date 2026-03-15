import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_APP_DATA } from '../constants/habits';
import type { AppData } from '../types/habit';

const STORAGE_KEY = 'two-check-app-data';

export async function loadAppData() {
  const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return DEFAULT_APP_DATA;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as Partial<AppData>;

    return {
      habitNames: [
        parsedValue.habitNames?.[0] ?? DEFAULT_APP_DATA.habitNames[0],
        parsedValue.habitNames?.[1] ?? DEFAULT_APP_DATA.habitNames[1],
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
