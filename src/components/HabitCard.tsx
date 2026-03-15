import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Habit } from '../types/habit';

type HabitCardProps = {
  habit: Habit;
  onToggle: (habitId: string) => void;
};

export function HabitCard({ habit, onToggle }: HabitCardProps) {
  return (
    <View style={[styles.card, habit.isChecked && styles.cardChecked]}>
      <View style={styles.textBlock}>
        <Text style={styles.label}>오늘의 습관</Text>
        <Text style={styles.name}>{habit.name}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${habit.name} 체크 버튼`}
        onPress={() => onToggle(habit.id)}
        style={[styles.button, habit.isChecked && styles.buttonChecked]}
      >
        <Text style={[styles.buttonText, habit.isChecked && styles.buttonTextChecked]}>
          {habit.isChecked ? '완료' : '체크'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    padding: 20,
    gap: 16,
    shadowColor: '#1c1c1c',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 2,
  },
  cardChecked: {
    borderColor: '#1f7a4d',
    backgroundColor: '#f4fbf6',
  },
  textBlock: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: '#70706c',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 108,
    borderRadius: 999,
    backgroundColor: '#1e1e1c',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonChecked: {
    backgroundColor: '#1f7a4d',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonTextChecked: {
    color: '#ffffff',
  },
});
