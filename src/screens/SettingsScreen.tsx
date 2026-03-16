import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { HabitDetail, Habits } from '../types/habit';

type SettingsScreenProps = {
  habits: Habits;
  onSaveHabits: (habits: Habits) => void;
};

const WEEKLY_TARGET_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

function normalizeHabitInput(inputHabit: HabitDetail, fallbackHabit: HabitDetail) {
  return {
    title: inputHabit.title.trim() || fallbackHabit.title,
    description: inputHabit.description.trim() || fallbackHabit.description,
    weeklyTarget: inputHabit.weeklyTarget || fallbackHabit.weeklyTarget,
  };
}

function areHabitsEqual(firstHabits: Habits, secondHabits: Habits) {
  return JSON.stringify(firstHabits) === JSON.stringify(secondHabits);
}

export function SettingsScreen({ habits, onSaveHabits }: SettingsScreenProps) {
  const [habitInputs, setHabitInputs] = useState<Habits>(habits);
  const [showSavedBanner, setShowSavedBanner] = useState(false);
  const hideBannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setHabitInputs(habits);
  }, [habits]);

  useEffect(() => {
    return () => {
      if (hideBannerTimeoutRef.current) {
        clearTimeout(hideBannerTimeoutRef.current);
      }
    };
  }, []);

  const normalizedHabitInputs = useMemo<Habits>(
    () => [
      normalizeHabitInput(habitInputs[0], habits[0]),
      normalizeHabitInput(habitInputs[1], habits[1]),
    ],
    [habitInputs, habits]
  );

  const hasChanges = !areHabitsEqual(normalizedHabitInputs, habits);

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
    if (!hasChanges) {
      return;
    }

    onSaveHabits(normalizedHabitInputs);
    setHabitInputs(normalizedHabitInputs);
    setShowSavedBanner(true);

    if (hideBannerTimeoutRef.current) {
      clearTimeout(hideBannerTimeoutRef.current);
    }

    hideBannerTimeoutRef.current = setTimeout(() => {
      setShowSavedBanner(false);
    }, 1600);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
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
                          style={[
                            styles.optionButtonText,
                            isSelected && styles.optionButtonTextSelected,
                          ]}
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
        </View>
      </ScrollView>

      {showSavedBanner ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>저장되었습니다.</Text>
        </View>
      ) : null}

      <View style={styles.floatingFooter}>
        <Pressable
          onPress={saveHabits}
          disabled={!hasChanges}
          style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
        >
          <Text style={[styles.saveButtonText, !hasChanges && styles.saveButtonTextDisabled]}>
            저장
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f3',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 150,
    gap: 16,
  },
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
  banner: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 102,
    borderRadius: 14,
    backgroundColor: '#1f7a4d',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#103b24',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  bannerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  floatingFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: 'rgba(245, 245, 243, 0.96)',
  },
  saveButton: {
    borderRadius: 18,
    backgroundColor: '#1e1e1c',
    paddingVertical: 16,
    shadowColor: '#111111',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#d8d8d2',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  saveButtonTextDisabled: {
    color: '#8b8b85',
  },
});
