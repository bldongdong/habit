import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MonthRecordGrid } from '../components/MonthRecordGrid';
import { ScreenContainer } from '../components/ScreenContainer';
import { StatusDot } from '../components/StatusDot';
import { WeeklySegmentedBar } from '../components/WeeklySegmentedBar';
import type { Habits, RecordsByDate } from '../types/habit';
import {
  formatMonthDayLabel,
  formatWeekRangeLabel,
  formatYearMonthLabel,
  getCurrentDay,
  getCurrentYearMonth,
  getDateKeysDescendingForMonth,
  getEndOfWeek,
  getStartOfWeek,
  isFutureYearMonth,
  shiftDateByDays,
  shiftYearMonth,
} from '../utils/date';
import { getWeeklyHabitCount } from '../utils/weekly';

type HistoryScreenProps = {
  habits: Habits;
  records: RecordsByDate;
};

export function HistoryScreen({ habits, records }: HistoryScreenProps) {
  const currentDate = useMemo(() => new Date(), []);
  const currentYearMonth = getCurrentYearMonth();
  const currentWeekStart = useMemo(() => getStartOfWeek(currentDate), [currentDate]);

  const [viewedWeekStart, setViewedWeekStart] = useState(currentWeekStart);
  const [viewedYear, setViewedYear] = useState(currentYearMonth.year);
  const [viewedMonth, setViewedMonth] = useState(currentYearMonth.month);

  const viewedWeekEnd = getEndOfWeek(viewedWeekStart);
  const isViewingCurrentWeek = viewedWeekStart.getTime() === currentWeekStart.getTime();
  const isViewingCurrentMonth =
    viewedYear === currentYearMonth.year && viewedMonth === currentYearMonth.month;
  const isViewingFutureMonth = isFutureYearMonth(viewedYear, viewedMonth);

  const moveToPreviousWeek = () => {
    setViewedWeekStart((currentWeek) => shiftDateByDays(currentWeek, -7));
  };

  const moveToNextWeek = () => {
    if (isViewingCurrentWeek) {
      return;
    }

    setViewedWeekStart((currentWeek) => shiftDateByDays(currentWeek, 7));
  };

  const moveToPreviousMonth = () => {
    const previousMonth = shiftYearMonth(viewedYear, viewedMonth, -1);
    setViewedYear(previousMonth.year);
    setViewedMonth(previousMonth.month);
  };

  const moveToNextMonth = () => {
    const nextMonth = shiftYearMonth(viewedYear, viewedMonth, 1);

    if (isFutureYearMonth(nextMonth.year, nextMonth.month)) {
      return;
    }

    setViewedYear(nextMonth.year);
    setViewedMonth(nextMonth.month);
  };

  const currentMonthDateKeys = getDateKeysDescendingForMonth(viewedYear, viewedMonth);
  const visibleDateKeys = isViewingFutureMonth
    ? []
    : isViewingCurrentMonth
      ? currentMonthDateKeys.filter((dateKey) => {
          const day = Number(dateKey.slice(-2));
          return day <= getCurrentDay();
        })
      : currentMonthDateKeys;
  const monthGridDateKeys = currentMonthDateKeys.slice().reverse();
  const daysInMonth = currentMonthDateKeys.length;

  const habit1SuccessCount = currentMonthDateKeys.filter(
    (dateKey) => records[dateKey]?.habit1
  ).length;
  const habit2SuccessCount = currentMonthDateKeys.filter(
    (dateKey) => records[dateKey]?.habit2
  ).length;

  const calculateSuccessRate = (successCount: number, totalCount: number) => {
    if (totalCount === 0) {
      return 0;
    }

    return Math.round((successCount / totalCount) * 100);
  };

  const habit1SuccessRate = calculateSuccessRate(habit1SuccessCount, daysInMonth);
  const habit2SuccessRate = calculateSuccessRate(habit2SuccessCount, daysInMonth);
  const totalSuccessRate = calculateSuccessRate(
    habit1SuccessCount + habit2SuccessCount,
    daysInMonth * 2
  );

  const habit1Weekly = getWeeklyHabitCount(records, 'habit1', viewedWeekStart, viewedWeekEnd);
  const habit2Weekly = getWeeklyHabitCount(records, 'habit2', viewedWeekStart, viewedWeekEnd);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>기록 화면</Text>
      </View>

      <View style={styles.successCard}>
        <Text style={styles.sectionTitle}>성공률</Text>

        <View style={styles.summaryBlock}>
          <Text style={styles.summaryBlockTitle}>이번 주 목표 달성</Text>
          <View style={styles.weeklyGoalRow}>
            <View style={styles.weeklyGoalCard}>
              <Text style={styles.weeklyGoalTitle}>{habits[0].title}</Text>
              <Text style={styles.weeklyGoalValue}>
                  <Text style={styles.weeklyGoalValueMain}>{habit1Weekly.successCount} 회</Text>
                  <Text style={styles.weeklyGoalValueSub}> / {habits[0].weeklyTarget}회 목표</Text>
              </Text>
            </View>

            <View style={styles.weeklyGoalCard}>
              <Text style={styles.weeklyGoalTitle}>{habits[1].title}</Text>
              <Text style={styles.weeklyGoalValue}>
                <Text style={styles.weeklyGoalValueMain}>{habit2Weekly.successCount} 회</Text>
                <Text style={styles.weeklyGoalValueSub}> / {habits[1].weeklyTarget}회 목표</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryBlock}>
          <Text style={styles.summaryBlockTitle}>이번 달 진행률</Text>
          <View style={styles.progressCardsRow}>
            <View style={styles.progressCard}>
              <Text style={styles.progressLabel}>{habits[0].title} 진행률</Text>
              <Text style={styles.progressValue}>{habit1SuccessRate}%</Text>
            </View>
            <View style={styles.progressCard}>
              <Text style={styles.progressLabel}>{habits[1].title} 진행률</Text>
              <Text style={styles.progressValue}>{habit2SuccessRate}%</Text>
            </View>
            <View style={styles.progressCard}>
              <Text style={styles.progressLabel}>총 진행률</Text>
              <Text style={styles.progressValue}>{totalSuccessRate}%</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>이번 주 진행</Text>
          <View style={styles.navigationGroup}>
            <Pressable onPress={moveToPreviousWeek} style={styles.navButton}>
              <Text style={styles.navButtonText}>{'<'}</Text>
            </Pressable>
            <Text style={styles.navigationLabel}>
              {formatWeekRangeLabel(viewedWeekStart, viewedWeekEnd)}
            </Text>
            <Pressable
              onPress={moveToNextWeek}
              style={[styles.navButton, isViewingCurrentWeek && styles.navButtonDisabled]}
              disabled={isViewingCurrentWeek}
            >
              <Text
                style={[
                  styles.navButtonText,
                  isViewingCurrentWeek && styles.navButtonTextDisabled,
                ]}
              >
                {'>'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.trackerSection}>
          <View style={styles.trackerHeader}>
            <Text style={styles.trackerLabel}>{habits[0].title}</Text>
            <Text style={styles.trackerValue}>
              {habit1Weekly.successCount === 0
                ? '시작 전'
                : `${habit1Weekly.successCount} / ${habit1Weekly.totalDays}일`}
            </Text>
          </View>
          <WeeklySegmentedBar count={habit1Weekly.successCount} />
        </View>

        <View style={styles.trackerSection}>
          <View style={styles.trackerHeader}>
            <Text style={styles.trackerLabel}>{habits[1].title}</Text>
            <Text style={styles.trackerValue}>
              {habit2Weekly.successCount === 0
                ? '시작 전'
                : `${habit2Weekly.successCount} / ${habit2Weekly.totalDays}일`}
            </Text>
          </View>
          <WeeklySegmentedBar count={habit2Weekly.successCount} />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>이번 달 진행</Text>
          <View style={styles.navigationGroup}>
            <Pressable onPress={moveToPreviousMonth} style={styles.navButton}>
              <Text style={styles.navButtonText}>{'<'}</Text>
            </Pressable>
            <Text style={styles.navigationLabel}>{formatYearMonthLabel(viewedYear, viewedMonth)}</Text>
            <Pressable
              onPress={moveToNextMonth}
              style={[styles.navButton, isViewingCurrentMonth && styles.navButtonDisabled]}
              disabled={isViewingCurrentMonth}
            >
              <Text
                style={[
                  styles.navButtonText,
                  isViewingCurrentMonth && styles.navButtonTextDisabled,
                ]}
              >
                {'>'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.trackerSection}>
          <View style={styles.trackerHeader}>
            <Text style={styles.trackerLabel}>{habits[0].title}</Text>
            <Text style={styles.trackerValue}>
              {habit1SuccessCount} / {daysInMonth}일
            </Text>
          </View>
          <MonthRecordGrid dateKeys={monthGridDateKeys} records={records} habitKey="habit1" />
        </View>

        <View style={styles.trackerSection}>
          <View style={styles.trackerHeader}>
            <Text style={styles.trackerLabel}>{habits[1].title}</Text>
            <Text style={styles.trackerValue}>
              {habit2SuccessCount} / {daysInMonth}일
            </Text>
          </View>
          <MonthRecordGrid dateKeys={monthGridDateKeys} records={records} habitKey="habit2" />
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>날짜별 기록</Text>

        {visibleDateKeys.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>기록이 없습니다.</Text>
          </View>
        ) : (
          <View style={styles.tableCard}>
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.dateHeader]}>날짜</Text>
              <Text style={styles.cell}>{habits[0].title}</Text>
              <Text style={styles.cell}>{habits[1].title}</Text>
            </View>

            {visibleDateKeys.map((dateKey) => {
              const dailyRecord = records[dateKey];

              return (
                <View key={dateKey} style={styles.row}>
                  <Text style={[styles.cell, styles.dateCell]}>{formatMonthDayLabel(dateKey)}</Text>
                  <View style={styles.statusCell}>
                    <StatusDot success={Boolean(dailyRecord?.habit1)} />
                  </View>
                  <View style={styles.statusCell}>
                    <StatusDot success={Boolean(dailyRecord?.habit2)} />
                  </View>
                </View>
              );
            })}
          </View>
        )}
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
  successCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 18,
    gap: 18,
  },
  sectionCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 18,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  summaryBlock: {
    gap: 14,
  },
  summaryBlockTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5f5f59',
  },
  weeklyGoalRow: {
    flexDirection: 'row',
    gap: 12,
  },
  weeklyGoalCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#f8f8f5',
    padding: 16,
    gap: 8,
  },
  weeklyGoalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2b2b28',
  },
  weeklyGoalValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  weeklyGoalCaption: {
    fontSize: 14,
    color: '#5f5f59',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#ecece6',
  },
  progressCardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  progressCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#f8f8f5',
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 10,
  },
  progressLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: '#5f5f59',
  },
  progressValue: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  sectionHeaderRow: {
    gap: 14,
  },
  navigationGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#f0f0ed',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2b2b28',
  },
  navButtonTextDisabled: {
    color: '#b3b3ad',
  },
  navigationLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#2b2b28',
  },
  trackerSection: {
    gap: 10,
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  trackerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2b2b28',
  },
  trackerValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4f4f4a',
  },
  tableCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e9e9e3',
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
  statusCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
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
  emptyState: {
    borderRadius: 18,
    backgroundColor: '#f8f8f5',
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 15,
    color: '#6a6a64',
  },
  weeklyGoalValueMain: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  weeklyGoalValueSub: {
    fontSize: 14,
    color: '#888',
  },
});
