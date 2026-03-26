import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { TabBar } from './src/components/TabBar';
import { DEFAULT_APP_DATA, EMPTY_DAILY_RECORD } from './src/constants/habits';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import type { AppData, AppTab, DailyRecord, HabitKey, Habits } from './src/types/habit';
import { getTodayKey } from './src/utils/date';
import { loadAppData, saveAppData } from './src/utils/storage';
import { getHabitStreak } from './src/utils/streak';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [appData, setAppData] = useState<AppData>(DEFAULT_APP_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepareAppData() {
      const storedAppData = await loadAppData();
      setAppData(storedAppData);
      setIsLoading(false);
    }

    prepareAppData();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    saveAppData(appData);
  }, [appData, isLoading]);

  const todayKey = getTodayKey();
  const todayRecord: DailyRecord = appData.records[todayKey] ?? EMPTY_DAILY_RECORD;

  const toggleHabit = (habitKey: HabitKey) => {
    setAppData((currentAppData) => {
      const currentRecord = currentAppData.records[todayKey] ?? EMPTY_DAILY_RECORD;

      return {
        ...currentAppData,
        records: {
          ...currentAppData.records,
          [todayKey]: {
            ...currentRecord,
            [habitKey]: !currentRecord[habitKey],
          },
        },
      };
    });
  };

  const toggleRecord = (dateKey: string, habitKey: HabitKey) => {
    setAppData((currentAppData) => {
      const currentRecord = currentAppData.records[dateKey] ?? EMPTY_DAILY_RECORD;

      return {
        ...currentAppData,
        records: {
          ...currentAppData.records,
          [dateKey]: {
            ...currentRecord,
            [habitKey]: !currentRecord[habitKey],
          },
        },
      };
    });
  };

  const updateHabits = (habits: Habits) => {
    setAppData((currentAppData) => ({
      ...currentAppData,
      habits,
    }));
  };

  const allHabitsChecked = todayRecord.habit1 && todayRecord.habit2;
  const habit1Streak = getHabitStreak(appData.records, 'habit1');
  const habit2Streak = getHabitStreak(appData.records, 'habit2');

  const renderScreen = () => {
    if (activeTab === 'history') {
      return (
        <HistoryScreen
          habits={appData.habits}
          records={appData.records}
          onToggleRecord={toggleRecord}
        />
      );
    }

    if (activeTab === 'settings') {
      return <SettingsScreen habits={appData.habits} onSaveHabits={updateHabits} />;
    }

    return (
      <HomeScreen
        habits={appData.habits}
        todayRecord={todayRecord}
        habit1Streak={habit1Streak}
        habit2Streak={habit2Streak}
        allHabitsChecked={allHabitsChecked}
        onToggleHabit={toggleHabit}
      />
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.appFrame, styles.loadingContainer]}>
          <ActivityIndicator color="#1e1e1c" />
          <Text style={styles.loadingText}>기록을 불러오는 중입니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: '#5e5e58',
  },
});
