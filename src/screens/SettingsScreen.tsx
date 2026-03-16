import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '../components/ScreenContainer';
import type { HabitDetail, Habits } from '../types/habit';

type SettingsScreenProps = {
  habits: Habits;
  onSaveHabits: (habits: Habits) => void;
};

const WEEKLY_TARGET_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

export function SettingsScreen({ habits, onSaveHabits }: SettingsScreenProps) {
  const [habitInputs, setHabitInputs] = useState<Habits>(habits);

  useEffect(() => {
    setHabitInputs(habits);
  }, [habits]);

  const updateHabitField = (
    index: number,
    field: keyof HabitDetail,
    value: string | number
  ) => {
    setHabitInputs((currentHabits) =>
      currentHabits.map((habit, currentIndex) =>
        currentIndex === index ? { ...habit, [field]: value } : habit
      ) as Habits
    );
  };

  const saveHabits = () => {
    const nextHabits: Habits = [
      {
        title: habitInputs[0].title.trim() || habits[0].title,
        description: habitInputs[0].description.trim() || habits[0].description,
        weeklyTarget: habitInputs[0].weeklyTarget || habits[0].weeklyTarget,
      },
      {
        title: habitInputs[1].title.trim() || habits[1].title,
        description: habitInputs[1].description.trim() || habits[1].description,
        weeklyTarget: habitInputs[1].weeklyTarget || habits[1].weeklyTarget,
      },
    ];

    setHabitInputs(nextHabits);
    onSaveHabits(nextHabits);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>설정 화면</Text>
        <Text style={styles.subtitle}>습관 2개의 이름, 설명, 목표를 직접 바꿀 수 있습니다.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>습관 설정</Text>

        {habitInputs.map((habit, index) => (
          <View key={`habit-${index}`} style={styles.habitGroup}>
            <Text style={styles.groupTitle}>습관 {index + 1}</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>이름</Text>
              <TextInput
                value={habit.title}
                onChangeText={(value) => updateHabitField(index, 'title', value)}
                placeholder={`습관 ${index + 1} 이름`}
                placeholderTextColor="#9a9a93"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>상세 설명</Text>
              <TextInput
                value={habit.description}
                onChangeText={(value) => updateHabitField(index, 'description', value)}
                placeholder={`습관 ${index + 1} 설명`}
                placeholderTextColor="#9a9a93"
                style={[styles.input, styles.textarea]}
                multiline
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>목표 설정</Text>
              <Text style={styles.helperText}>(일주일에 몇 번 목표인가요?)</Text>
              <View style={styles.optionRow}>
                {WEEKLY_TARGET_OPTIONS.map((option) => {
                  const isSelected = habit.weeklyTarget === option;

                  return (
                    <Pressable
                      key={option}
                      onPress={() => updateHabitField(index, 'weeklyTarget', option)}
                      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                    >
                      <Text
                        style={[styles.optionButtonText, isSelected && styles.optionButtonTextSelected]}
                      >
                        {option === 7 ? '매일' : option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        ))}

        <Pressable onPress={saveHabits} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>저장</Text>
        </Pressable>
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
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  habitGroup: {
    gap: 14,
    paddingBottom: 4,
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2b2b28',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4f4f4a',
  },
  helperText: {
    fontSize: 13,
    color: '#6d6d67',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d2',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1e1e1c',
    backgroundColor: '#fbfbf9',
  },
  textarea: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    minWidth: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d9d9d2',
    backgroundColor: '#fbfbf9',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionButtonSelected: {
    borderColor: '#1e1e1c',
    backgroundColor: '#1e1e1c',
  },
  optionButtonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#3f3f3a',
  },
  optionButtonTextSelected: {
    color: '#ffffff',
  },
  saveButton: {
    marginTop: 4,
    borderRadius: 16,
    backgroundColor: '#1e1e1c',
    paddingVertical: 15,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
