import type { AppData, DailyRecord } from '../types/habit';

export const EMPTY_DAILY_RECORD: DailyRecord = {
  habit1: false,
  habit2: false,
};

export const DEFAULT_APP_DATA: AppData = {
  habitNames: ['금주', '운동'],
  records: {},
};
