import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_APP_DATA } from '../constants/habits';
import type {
  AppData,
  HabitDetail,
  HabitKey,
  HabitTitleHistoryByHabit,
  HabitTitleHistoryEntry,
  QuoteLanguage,
} from '../types/habit';

const STORAGE_KEY = 'two-check-app-data';

type LegacyAppData = Partial<AppData> & {
  habitNames?: [string?, string?];
  habitTitleHistory?: HabitTitleHistoryEntry[];
};

function normalizeHabit(
  storedHabit: Partial<HabitDetail> | undefined,
  fallbackHabit: HabitDetail,
  legacyTitle?: string
) {
  const normalizedTitle = storedHabit?.title?.trim() || legacyTitle?.trim() || fallbackHabit.title;

  return {
    habitKey: fallbackHabit.habitKey,
    title: normalizedTitle,
    initialTitle: storedHabit?.initialTitle?.trim() || normalizedTitle,
    description: storedHabit?.description?.trim() || fallbackHabit.description,
    weeklyTarget: storedHabit?.weeklyTarget ?? fallbackHabit.weeklyTarget,
  };
}

function normalizeQuoteLanguage(storedQuoteLanguage: QuoteLanguage | undefined) {
  return storedQuoteLanguage === 'en' ? 'en' : 'kr';
}

function normalizeHistoryEntries(storedHistory: HabitTitleHistoryEntry[] | undefined) {
  if (!storedHistory) {
    return [];
  }

  return storedHistory
    .filter(
      (entry) =>
        (entry.habitKey === 'habit1' || entry.habitKey === 'habit2') &&
        typeof entry.changedAt === 'string' &&
        typeof entry.title === 'string'
    )
    .sort((firstEntry, secondEntry) => firstEntry.changedAt.localeCompare(secondEntry.changedAt));
}

function normalizeHabitTitleHistoryByHabit(
  storedHistoryByHabit: Partial<Record<HabitKey, HabitTitleHistoryEntry[]>> | undefined,
  legacyHistory: HabitTitleHistoryEntry[] | undefined
): HabitTitleHistoryByHabit {
  if (storedHistoryByHabit) {
    return {
      habit1: normalizeHistoryEntries(storedHistoryByHabit.habit1),
      habit2: normalizeHistoryEntries(storedHistoryByHabit.habit2),
    };
  }

  const normalizedLegacyHistory = normalizeHistoryEntries(legacyHistory);

  return {
    habit1: normalizedLegacyHistory.filter((entry) => entry.habitKey === 'habit1'),
    habit2: normalizedLegacyHistory.filter((entry) => entry.habitKey === 'habit2'),
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
      quoteLanguage: normalizeQuoteLanguage(parsedValue.quoteLanguage),
      habitTitleHistoryByHabit: normalizeHabitTitleHistoryByHabit(
        parsedValue.habitTitleHistoryByHabit,
        parsedValue.habitTitleHistory
      ),
    } satisfies AppData;
  } catch {
    return DEFAULT_APP_DATA;
  }
}

export async function saveAppData(appData: AppData) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}
