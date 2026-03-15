export type AppTab = 'home' | 'history' | 'settings';

export type HabitNames = [string, string];

export type DailyRecord = {
  habit1: boolean;
  habit2: boolean;
};

export type RecordsByDate = Record<string, DailyRecord>;

export type AppData = {
  habitNames: HabitNames;
  records: RecordsByDate;
};
