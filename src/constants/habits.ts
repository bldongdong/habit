import type { Habit } from '../types/habit';

export const DEFAULT_HABITS: Habit[] = [
  {
    id: 'no-alcohol',
    name: '금주',
    isChecked: false,
  },
  {
    id: 'exercise',
    name: '운동',
    isChecked: false,
  },
];
