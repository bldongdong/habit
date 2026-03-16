import { StyleSheet, Text, View } from 'react-native';

import { HabitCard } from '../components/HabitCard';
import { ScreenContainer } from '../components/ScreenContainer';
import type { DailyRecord, HabitKey, HabitNames } from '../types/habit';
import { formatTodayLabel } from '../utils/date';

type HomeScreenProps = {
  habitNames: HabitNames;
  todayRecord: DailyRecord;
  habit1Streak: number;
  habit2Streak: number;
  allHabitsChecked: boolean;
  onToggleHabit: (habitKey: HabitKey) => void;
};

export function HomeScreen({
  habitNames,
  todayRecord,
  habit1Streak,
  habit2Streak,
  allHabitsChecked,
  onToggleHabit,
}: HomeScreenProps) {
  const shouldShowHabit1Streak = habit1Streak >= 3;
  const shouldShowHabit2Streak = habit2Streak >= 3;
  const shouldShowStreakSection = shouldShowHabit1Streak || shouldShowHabit2Streak;

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.date}>{formatTodayLabel()}</Text>
        <Text style={styles.title}>오늘의 두 가지</Text>
        <Text style={styles.subtitle}>많이 말고, 중요한 두 가지만</Text>
        {shouldShowStreakSection ? (
          <View style={styles.streakSection}>
            {shouldShowHabit1Streak ? (
              <Text style={styles.streakText}>
                {habitNames[0]} 🔥 {habit1Streak}
              </Text>
            ) : null}
            {shouldShowHabit2Streak ? (
              <Text style={styles.streakText}>
                {habitNames[1]} 🔥 {habit2Streak}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <View style={styles.cardList}>
        <HabitCard
          habitName={habitNames[0]}
          isChecked={todayRecord.habit1}
          onToggle={() => onToggleHabit('habit1')}
        />
        <HabitCard
          habitName={habitNames[1]}
          isChecked={todayRecord.habit2}
          onToggle={() => onToggleHabit('habit2')}
        />
      </View>

      {allHabitsChecked ? (
        <View style={styles.messageCard}>
          <Text style={styles.messageTitle}>좋아요.</Text>
          <Text style={styles.messageText}>오늘의 기준을 지켰어요.</Text>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#6a6a64',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 24,
    color: '#5c5c56',
  },
  streakSection: {
    marginTop: 4,
    gap: 6,
  },
  streakText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#454540',
  },
  cardList: {
    gap: 14,
  },
  messageCard: {
    borderRadius: 20,
    backgroundColor: '#f1f7f2',
    borderWidth: 1,
    borderColor: '#dcebdd',
    padding: 20,
    gap: 6,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f7a4d',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#356346',
  },
});
