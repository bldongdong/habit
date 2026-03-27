import type { AppData, DailyRecord } from '../types/habit';

export const EMPTY_DAILY_RECORD: DailyRecord = {
  habit1: false,
  habit2: false,
};

export const DEFAULT_APP_DATA: AppData = {
  habits: [
    {
      habitKey: 'habit1',
      title: '금주',
      initialTitle: '금주',
      description: '소주 한잔도 마시지 말자',
      weeklyTarget: 7,
    },
    {
      habitKey: 'habit2',
      title: '운동',
      initialTitle: '운동',
      description: '하루 30분 이상 몸을 움직이자',
      weeklyTarget: 3,
    },
  ],
  records: {},
  quoteLanguage: 'kr',
  habitTitleHistoryByHabit: {
    habit1: [],
    habit2: [],
  },
};
