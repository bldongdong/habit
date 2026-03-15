import { StyleSheet, Text, View } from 'react-native';

import { HabitCard } from '../components/HabitCard';
import { ScreenContainer } from '../components/ScreenContainer';
import type { Habit } from '../types/habit';
import { formatTodayLabel } from '../utils/date';

type HomeScreenProps = {
  habits: Habit[];
  allHabitsChecked: boolean;
  onToggleHabit: (habitId: string) => void;
};

export function HomeScreen({
  habits,
  allHabitsChecked,
  onToggleHabit,
}: HomeScreenProps) {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.date}>{formatTodayLabel()}</Text>
        <Text style={styles.title}>오늘의 두 가지</Text>
        <Text style={styles.subtitle}>많이 말고, 중요한 두 가지만</Text>
      </View>

      <View style={styles.cardList}>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} onToggle={onToggleHabit} />
        ))}
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
