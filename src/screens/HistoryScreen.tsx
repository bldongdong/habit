import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '../components/ScreenContainer';
import type { HabitNames, RecordsByDate } from '../types/habit';
import {
  formatCurrentMonthLabel,
  formatMonthDayLabel,
  getCurrentMonthDateKeysDescending,
} from '../utils/date';

type HistoryScreenProps = {
  habitNames: HabitNames;
  records: RecordsByDate;
};

export function HistoryScreen({ habitNames, records }: HistoryScreenProps) {
  const currentMonthDateKeys = getCurrentMonthDateKeysDescending();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>기록 화면</Text>
        <Text style={styles.subtitle}>{formatCurrentMonthLabel()}</Text>
      </View>

      <View style={styles.tableCard}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.dateHeader]}>날짜</Text>
          <Text style={styles.cell}>{habitNames[0]}</Text>
          <Text style={styles.cell}>{habitNames[1]}</Text>
        </View>

        {currentMonthDateKeys.map((dateKey) => {
          const dailyRecord = records[dateKey];

          return (
            <View key={dateKey} style={styles.row}>
              <Text style={[styles.cell, styles.dateCell]}>{formatMonthDayLabel(dateKey)}</Text>
              <Text style={styles.cell}>{dailyRecord?.habit1 ? 'O' : 'X'}</Text>
              <Text style={styles.cell}>{dailyRecord?.habit2 ? 'O' : 'X'}</Text>
            </View>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#5e5e58',
  },
  tableCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefe9',
    minHeight: 48,
  },
  headerRow: {
    backgroundColor: '#f8f8f5',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: 'center',
    fontSize: 15,
    color: '#2b2b28',
  },
  dateHeader: {
    flex: 1.5,
    fontWeight: '700',
  },
  dateCell: {
    flex: 1.5,
    textAlign: 'left',
    color: '#4f4f4a',
  },
});
