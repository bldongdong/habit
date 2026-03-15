import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '../components/ScreenContainer';
import type { HabitNames, RecordsByDate } from '../types/habit';
import {
  formatMonthDayLabel,
  formatYearMonthLabel,
  getCurrentYearMonth,
  getDateKeysDescendingForMonth,
} from '../utils/date';

type HistoryScreenProps = {
  habitNames: HabitNames;
  records: RecordsByDate;
};

export function HistoryScreen({ habitNames, records }: HistoryScreenProps) {
  const currentYearMonth = getCurrentYearMonth();
  const [viewedYear, setViewedYear] = useState(currentYearMonth.year);
  const [viewedMonth, setViewedMonth] = useState(currentYearMonth.month);
  const [yearInput, setYearInput] = useState(String(currentYearMonth.year));
  const [monthInput, setMonthInput] = useState(String(currentYearMonth.month));

  const currentMonthDateKeys = getDateKeysDescendingForMonth(viewedYear, viewedMonth);
  const daysInMonth = currentMonthDateKeys.length;

  const moveToPreviousMonth = () => {
    if (viewedMonth === 1) {
      const nextYear = viewedYear - 1;
      setViewedYear(nextYear);
      setViewedMonth(12);
      setYearInput(String(nextYear));
      setMonthInput('12');
      return;
    }

    const nextMonth = viewedMonth - 1;
    setViewedMonth(nextMonth);
    setMonthInput(String(nextMonth));
  };

  const moveToNextMonth = () => {
    if (viewedMonth === 12) {
      const nextYear = viewedYear + 1;
      setViewedYear(nextYear);
      setViewedMonth(1);
      setYearInput(String(nextYear));
      setMonthInput('1');
      return;
    }

    const nextMonth = viewedMonth + 1;
    setViewedMonth(nextMonth);
    setMonthInput(String(nextMonth));
  };

  const applyViewedMonth = () => {
    const nextYear = Number(yearInput);
    const nextMonth = Number(monthInput);

    if (!Number.isInteger(nextYear) || !Number.isInteger(nextMonth)) {
      return;
    }

    if (nextMonth < 1 || nextMonth > 12) {
      return;
    }

    setViewedYear(nextYear);
    setViewedMonth(nextMonth);
    setYearInput(String(nextYear));
    setMonthInput(String(nextMonth));
  };

  const habit1SuccessCount = currentMonthDateKeys.filter(
    (dateKey) => records[dateKey]?.habit1
  ).length;
  const habit2SuccessCount = currentMonthDateKeys.filter(
    (dateKey) => records[dateKey]?.habit2
  ).length;
  const totalSuccessCount = habit1SuccessCount + habit2SuccessCount;

  const calculateSuccessRate = (successCount: number, totalCount: number) => {
    if (totalCount === 0) {
      return 0;
    }

    return Math.round((successCount / totalCount) * 100);
  };

  const habit1SuccessRate = calculateSuccessRate(habit1SuccessCount, daysInMonth);
  const habit2SuccessRate = calculateSuccessRate(habit2SuccessCount, daysInMonth);
  const totalSuccessRate = calculateSuccessRate(totalSuccessCount, daysInMonth * 2);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>기록 화면</Text>
        <Text style={styles.subtitle}>{formatYearMonthLabel(viewedYear, viewedMonth)}</Text>
      </View>

      <View style={styles.monthControlCard}>
        <Text style={styles.sectionTitle}>월간 기록</Text>

        <View style={styles.navigationRow}>
          <Pressable onPress={moveToPreviousMonth} style={styles.monthButton}>
            <Text style={styles.monthButtonText}>이전 달</Text>
          </Pressable>
          <Pressable onPress={moveToNextMonth} style={styles.monthButton}>
            <Text style={styles.monthButtonText}>다음 달</Text>
          </Pressable>
        </View>

        <View style={styles.pickerRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>연도</Text>
            <TextInput
              keyboardType="numeric"
              value={yearInput}
              onChangeText={setYearInput}
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>월</Text>
            <TextInput
              keyboardType="numeric"
              value={monthInput}
              onChangeText={setMonthInput}
              style={styles.input}
            />
          </View>
          <Pressable onPress={applyViewedMonth} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>이동</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.dashboardRow}>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardLabel}>{habitNames[0]} 성공률</Text>
          <Text style={styles.dashboardValue}>{habit1SuccessRate}%</Text>
        </View>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardLabel}>{habitNames[1]} 성공률</Text>
          <Text style={styles.dashboardValue}>{habit2SuccessRate}%</Text>
        </View>
        <View style={styles.dashboardCard}>
          <Text style={styles.dashboardLabel}>총 성공률</Text>
          <Text style={styles.dashboardValue}>{totalSuccessRate}%</Text>
        </View>
      </View>

      <View style={styles.visualCard}>
        <View style={styles.visualSection}>
          <Text style={styles.visualTitle}>{habitNames[0]} 기록</Text>
          <View style={styles.grid}>
            {currentMonthDateKeys
              .slice()
              .reverse()
              .map((dateKey) => (
                <View
                  key={`habit1-${dateKey}`}
                  style={[
                    styles.gridCell,
                    records[dateKey]?.habit1 && styles.gridCellFilled,
                  ]}
                />
              ))}
          </View>
        </View>

        <View style={styles.visualSection}>
          <Text style={styles.visualTitle}>{habitNames[1]} 기록</Text>
          <View style={styles.grid}>
            {currentMonthDateKeys
              .slice()
              .reverse()
              .map((dateKey) => (
                <View
                  key={`habit2-${dateKey}`}
                  style={[
                    styles.gridCell,
                    records[dateKey]?.habit2 && styles.gridCellFilled,
                  ]}
                />
              ))}
          </View>
        </View>
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
  monthControlCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 18,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  navigationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  monthButton: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#f5f5f3',
    paddingVertical: 12,
  },
  monthButtonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#2b2b28',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  inputGroup: {
    flex: 1,
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#5f5f59',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d2',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e1e1c',
    backgroundColor: '#fbfbf9',
  },
  applyButton: {
    borderRadius: 14,
    backgroundColor: '#1e1e1c',
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  dashboardRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dashboardCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 10,
  },
  dashboardLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5f5f59',
  },
  dashboardValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  visualCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 18,
    gap: 18,
  },
  visualSection: {
    gap: 12,
  },
  visualTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2b2b28',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  gridCell: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dbdbd4',
    backgroundColor: '#ffffff',
  },
  gridCellFilled: {
    borderColor: '#1f7a4d',
    backgroundColor: '#1f7a4d',
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
