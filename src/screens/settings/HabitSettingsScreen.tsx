import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { SettingsHeader } from '../../components/SettingsHeader';
import type { HabitDetail, Habits } from '../../types/habit';

type HabitSettingsScreenProps = {
  habits: Habits;
  onBack: () => void;
  onSaveHabits: (habits: Habits) => void;
};

const WEEKLY_TARGET_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

function normalizeHabitInput(inputHabit: HabitDetail, fallbackHabit: HabitDetail) {
  return {
    habitKey: fallbackHabit.habitKey,
    title: inputHabit.title.trim() || fallbackHabit.title,
    initialTitle: fallbackHabit.initialTitle,
    description: inputHabit.description.trim(),
    weeklyTarget: inputHabit.weeklyTarget || fallbackHabit.weeklyTarget,
  };
}

function areHabitsEqual(firstHabits: Habits, secondHabits: Habits) {
  return JSON.stringify(firstHabits) === JSON.stringify(secondHabits);
}

export function HabitSettingsScreen({
  habits,
  onBack,
  onSaveHabits,
}: HabitSettingsScreenProps) {
  const [habitInputs, setHabitInputs] = useState<Habits>(habits);
  const [showSavedBanner, setShowSavedBanner] = useState(false);
  const hideBannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bannerOpacity = useRef(new Animated.Value(0)).current;

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
    bannerOpacity.setValue(1);

    if (hideBannerTimeoutRef.current) {
      clearTimeout(hideBannerTimeoutRef.current);
    }

    hideBannerTimeoutRef.current = setTimeout(() => {
      Animated.timing(bannerOpacity, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start(() => {
        setShowSavedBanner(false);
      });
    }, 1200);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title="습관 설정" onBack={onBack} />

        <View style={styles.card}>
          {habitInputs.map((habit, index) => (
            <View key={`habit-${index}`} style={styles.habitGroup}>
              <Text style={styles.groupTitle}>습관 {index + 1}</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  이름<Text style={{ color: '#ff3b30' }}> *</Text>
                  </Text>
                <TextInput
                  value={habit.title}
                  onChangeText={(value) => updateHabitField(index, 'title', value)}
                  placeholder={`예: 독서`}
                  placeholderTextColor="#9a9a93"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>상세 설명</Text>
                <TextInput
                  value={habit.description}
                  onChangeText={(value) => updateHabitField(index, 'description', value)}
                  placeholder={`예: 매일 잠들기 전에 책을 10페이지 이상 읽기!`}
                  placeholderTextColor="#9a9a93"
                  style={[styles.input, styles.textarea]}
                  multiline
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  목표 설정<Text style={{ color: '#ff3b30' }}> *</Text>
                  </Text>
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
        <Animated.View style={[styles.banner, { opacity: bannerOpacity }]}>
          <Text style={styles.bannerText}>저장되었습니다.</Text>
        </Animated.View>
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
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 18,
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
    left: 30,
    right: 30,
    bottom: 90,
    borderRadius: 14,
    backgroundColor: 'rgba(31, 122, 77, 0.84)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
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
    backgroundColor: 'transparent',
  },
  saveButton: {
    borderRadius: 18,
    backgroundColor: '#1e1e1c',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    paddingVertical: 16,
    shadowColor: '#111111',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#d9d9d2',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
  saveButtonTextDisabled: {
    color: '#8f8f88',
  },
});
