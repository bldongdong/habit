import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { HabitCard } from '../components/HabitCard';
import { ScreenContainer } from '../components/ScreenContainer';
import type { DailyRecord, HabitKey, Habits, QuoteLanguage } from '../types/habit';
import { formatTodayLabel } from '../utils/date';
import { getTodaysQuote } from '../utils/quotes';

type HomeScreenProps = {
  habits: Habits;
  quoteLanguage: QuoteLanguage;
  todayRecord: DailyRecord;
  habit1Streak: number;
  habit2Streak: number;
  allHabitsChecked: boolean;
  onToggleHabit: (habitKey: HabitKey) => void;
};

export function HomeScreen({
  habits,
  quoteLanguage,
  todayRecord,
  habit1Streak,
  habit2Streak,
  allHabitsChecked,
  onToggleHabit,
}: HomeScreenProps) {
  const shouldShowHabit1Streak = habit1Streak >= 3;
  const shouldShowHabit2Streak = habit2Streak >= 3;
  const shouldShowStreakSection = shouldShowHabit1Streak || shouldShowHabit2Streak;
  const todaysQuote = getTodaysQuote(quoteLanguage);
  const [toastTrigger, setToastTrigger] = useState(0);
  const previousAllHabitsCheckedRef = useRef(allHabitsChecked);

  useEffect(() => {
    const wasAllHabitsChecked = previousAllHabitsCheckedRef.current;

    if (!wasAllHabitsChecked && allHabitsChecked) {
      setToastTrigger((currentTrigger) => currentTrigger + 1);
    }

    previousAllHabitsCheckedRef.current = allHabitsChecked;
  }, [allHabitsChecked]);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.date}>{formatTodayLabel()}</Text>
        <Text style={styles.title}>오늘의 두 가지</Text>
        {todaysQuote ? (
          <View style={styles.quoteSection}>
            <Text style={styles.quoteText}>"{todaysQuote.quote}"</Text>
            {todaysQuote.author ? (
              <Text style={styles.quoteAuthor}>- {todaysQuote.author}</Text>
            ) : null}
          </View>
        ) : (
          <Text style={styles.subtitle}>많이 말고, 중요한 두 가지만</Text>
        )}
        {shouldShowStreakSection ? (
          <View style={styles.streakSection}>
            {shouldShowHabit1Streak ? (
              <Text style={styles.streakText}>
                {habits[0].title} 🔥 {habit1Streak} 일 연속 성공 중!
              </Text>
            ) : null}
            {shouldShowHabit2Streak ? (
              <Text style={styles.streakText}>
                {habits[1].title} 🔥 {habit2Streak} 일 연속 성공 중!
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <View style={styles.cardList}>
        <HabitCard
          title={habits[0].title}
          description={habits[0].description}
          isChecked={todayRecord.habit1}
          onToggle={() => onToggleHabit('habit1')}
        />
        <HabitCard
          title={habits[1].title}
          description={habits[1].description}
          isChecked={todayRecord.habit2}
          onToggle={() => onToggleHabit('habit2')}
        />
      </View>

      <TodayCompleteToast trigger={toastTrigger} />
    </ScreenContainer>
  );
}

function TodayCompleteToast({ trigger }: { trigger: number }) {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.96)).current;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger === 0) {
      return undefined;
    }

    opacityValue.stopAnimation();
    scaleValue.stopAnimation();
    opacityValue.setValue(0);
    scaleValue.setValue(0.96);
    setIsVisible(true);

    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 140,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 140,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    animation.start(({ finished }) => {
      if (finished) {
        setIsVisible(false);
      }
    });

    return () => {
      animation.stop();
    };
  }, [opacityValue, scaleValue, trigger]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        {
          opacity: opacityValue,
          transform: [{ scale: scaleValue }],
        },
      ]}
    >
      <Text style={styles.toastText}>동그라미 두 개,{'\n'}오늘은 충분해요 :)</Text>
    </Animated.View>
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
  quoteSection: {
    gap: 4,
  },
  quoteText: {
    fontSize: 17,
    lineHeight: 25,
    color: '#4c4c47',
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#8a8a84',
    alignSelf: 'flex-end',
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
  toast: {
    position: 'absolute',
    top: '42%',
    left: 20,
    right: 20,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(30, 30, 28, 0.88)',
    paddingHorizontal: 40,
    paddingVertical: 20,
    shadowColor: '#1c1c1c',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 4,
  },
  toastText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center'
  },
});
