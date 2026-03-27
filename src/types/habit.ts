export type AppTab = 'home' | 'history' | 'settings';
export type QuoteLanguage = 'kr' | 'en';

export type HabitDetail = {
  habitKey: HabitKey;
  title: string;
  initialTitle: string;
  description: string;
  weeklyTarget: number;
};

export type Habits = [HabitDetail, HabitDetail];

export type HabitKey = 'habit1' | 'habit2';

export type HabitTitleHistoryEntry = {
  habitKey: HabitKey;
  changedAt: string;
  title: string;
};

export type HabitTitleHistoryByHabit = Record<HabitKey, HabitTitleHistoryEntry[]>;

export type DailyRecord = {
  habit1: boolean;
  habit2: boolean;
};

export type RecordsByDate = Record<string, DailyRecord>;

export type AppData = {
  habits: Habits;
  records: RecordsByDate;
  quoteLanguage: QuoteLanguage;
  habitTitleHistoryByHabit: HabitTitleHistoryByHabit;
};
