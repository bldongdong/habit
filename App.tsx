import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { TabBar } from './src/components/TabBar';
import { DEFAULT_HABITS } from './src/constants/habits';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import type { AppTab, Habit } from './src/types/habit';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [habits, setHabits] = useState<Habit[]>(DEFAULT_HABITS);

  const toggleHabit = (habitId: string) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === habitId ? { ...habit, isChecked: !habit.isChecked } : habit
      )
    );
  };

  const updateHabitNames = (habitNames: string[]) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit, index) => ({
        ...habit,
        name: habitNames[index] ?? habit.name,
      }))
    );
  };

  const allHabitsChecked = habits.every((habit) => habit.isChecked);

  const renderScreen = () => {
    if (activeTab === 'history') {
      return <HistoryScreen />;
    }

    if (activeTab === 'settings') {
      return <SettingsScreen habits={habits} onSaveHabitNames={updateHabitNames} />;
    }

    return (
      <HomeScreen
        habits={habits}
        allHabitsChecked={allHabitsChecked}
        onToggleHabit={toggleHabit}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appFrame}>
        <View style={styles.content}>{renderScreen()}</View>
        <TabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f3',
  },
  appFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
});
