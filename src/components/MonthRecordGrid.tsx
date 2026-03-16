import { StyleSheet, Text, View } from 'react-native';

import type { HabitKey, RecordsByDate } from '../types/habit';

type MonthRecordGridProps = {
  dateKeys: string[];
  records: RecordsByDate;
  habitKey: HabitKey;
};

export function MonthRecordGrid({ dateKeys, records, habitKey }: MonthRecordGridProps) {
  return (
    <View style={styles.grid}>
      {dateKeys.map((dateKey) => {
        const dayNumber = Number(dateKey.slice(-2));
        const isChecked = Boolean(records[dateKey]?.[habitKey]);

        return (
          <View key={`${habitKey}-${dateKey}`} style={[styles.cell, isChecked && styles.cellFilled]}>
            <Text style={[styles.dayText, isChecked && styles.dayTextFilled]}>{dayNumber}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  cell: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d8d8d1',
    backgroundColor: '#fbfbf9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFilled: {
    borderColor: '#1f7a4d',
    backgroundColor: '#1f7a4d',
  },
  dayText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#66665f',
  },
  dayTextFilled: {
    color: '#ffffff',
  },
});
