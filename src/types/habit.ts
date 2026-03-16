export type AppTab = 'home' | 'history' | 'settings';

export type HabitNames = [string, string];

export type HabitKey = 'habit1' | 'habit2';

export type DailyRecord = {
  habit1: boolean;
  habit2: boolean;
};

export type RecordsByDate = Record<string, DailyRecord>;

export type AppData = {
  habitNames: HabitNames;
  records: RecordsByDate;
};
