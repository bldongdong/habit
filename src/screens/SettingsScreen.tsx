import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '../components/ScreenContainer';
import type { HabitNames } from '../types/habit';

type SettingsScreenProps = {
  habitNames: HabitNames;
  onSaveHabitNames: (habitNames: HabitNames) => void;
};

export function SettingsScreen({ habitNames, onSaveHabitNames }: SettingsScreenProps) {
  const [habitNameInputs, setHabitNameInputs] = useState<string[]>(habitNames);

  useEffect(() => {
    setHabitNameInputs(habitNames);
  }, [habitNames]);

  const updateHabitInput = (index: number, value: string) => {
    setHabitNameInputs((currentValues) =>
      currentValues.map((currentValue, currentIndex) =>
        currentIndex === index ? value : currentValue
      )
    );
  };

  const saveHabitNames = () => {
    const trimmedNames = habitNameInputs.map((name, index) => {
      const trimmedName = name.trim();
      return trimmedName.length > 0 ? trimmedName : habitNames[index] ?? '';
    });

    const nextHabitNames: HabitNames = [
      trimmedNames[0] ?? habitNames[0],
      trimmedNames[1] ?? habitNames[1],
    ];

    setHabitNameInputs(nextHabitNames);
    onSaveHabitNames(nextHabitNames);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>설정 화면</Text>
        <Text style={styles.subtitle}>습관 2개의 이름을 직접 바꿀 수 있습니다.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>습관 이름 설정</Text>

        {habitNames.map((habitName, index) => (
          <View key={`${habitName}-${index}`} style={styles.inputGroup}>
            <Text style={styles.label}>습관 {index + 1}</Text>
            <TextInput
              value={habitNameInputs[index] ?? ''}
              onChangeText={(value) => updateHabitInput(index, value)}
              placeholder={`습관 ${index + 1} 이름`}
              placeholderTextColor="#9a9a93"
              style={styles.input}
            />
          </View>
        ))}

        <Pressable onPress={saveHabitNames} style={styles.saveButton}>
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
    gap: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4f4f4a',
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
  saveButton: {
    marginTop: 6,
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
