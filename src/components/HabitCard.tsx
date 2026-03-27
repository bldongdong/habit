import { memo, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

type HabitCardProps = {
  title: string;
  description: string;
  isChecked: boolean;
  onToggle: () => void;
};

export const HabitCard = memo(function HabitCard({
  title,
  description,
  isChecked,
  onToggle,
}: HabitCardProps) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const stampScaleValue = useRef(new Animated.Value(isChecked ? 1 : 0.6)).current;
  const stampOpacityValue = useRef(new Animated.Value(isChecked ? 1 : 0)).current;
  const previousCheckedRef = useRef(isChecked);

  useEffect(() => {
    const wasChecked = previousCheckedRef.current;

    if (!wasChecked && isChecked) {
      stampScaleValue.setValue(0.6);
      stampOpacityValue.setValue(0);

      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.05,
            duration: 120,
            useNativeDriver: true,
          }),
          Animated.spring(scaleValue, {
            toValue: 1,
            speed: 18,
            bounciness: 10,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.parallel([
            Animated.timing(stampScaleValue, {
              toValue: 1.12,
              duration: 120,
              useNativeDriver: true,
            }),
            Animated.timing(stampOpacityValue, {
              toValue: 1,
              duration: 90,
              useNativeDriver: true,
            }),
          ]),
          Animated.spring(stampScaleValue, {
            toValue: 1,
            speed: 20,
            bounciness: 8,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else if (wasChecked && isChecked) {
      stampScaleValue.setValue(1);
      stampOpacityValue.setValue(1);
    } else if (!isChecked) {
      stampScaleValue.setValue(0.6);
      stampOpacityValue.setValue(0);
    }

    previousCheckedRef.current = isChecked;
  }, [isChecked, scaleValue, stampOpacityValue, stampScaleValue]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
    onToggle();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        isChecked && styles.cardChecked,
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <View style={styles.textBlock}>
        {isChecked ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.stampWrapper,
              {
                opacity: stampOpacityValue,
                transform: [{ rotate: '-14deg' }, { scale: stampScaleValue }],
              },
            ]}
          >
            <Text style={styles.stampText}>COMPLETE</Text>
          </Animated.View>
        ) : null}

        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title} 체크 버튼`}
        onPress={handlePress}
        style={[styles.button, isChecked && styles.buttonChecked]}
      >
        <Text style={[styles.buttonText, isChecked && styles.buttonTextChecked]}>
          {isChecked ? '완료' : '체크'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}, areHabitCardPropsEqual);

function areHabitCardPropsEqual(
  previousProps: HabitCardProps,
  nextProps: HabitCardProps
) {
  return (
    previousProps.title === nextProps.title &&
    previousProps.description === nextProps.description &&
    previousProps.isChecked === nextProps.isChecked
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    padding: 20,
    gap: 18,
    overflow: 'hidden',
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
  stampWrapper: {
    position: 'absolute',
    top: 30,
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: '#d32f2f',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#0f4f30',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  stampText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#d32f2f',
  },
  textBlock: {
    position: 'relative',
    gap: 8,
    minHeight: 88,
    paddingRight: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: '#5f5f59',
  },
  button: {
    alignSelf: 'flex-end',
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
