import { memo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const STAMP_SIZE = 130;
const STROKE_WIDTH = 10;
const CENTER = STAMP_SIZE / 2;
const RADIUS = (STAMP_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type CircleStampOverlayProps = {
  opacity: Animated.Value;
  scale: Animated.Value;
  progress: Animated.Value;
};

export const CircleStampOverlay = memo(function CircleStampOverlay({
  opacity,
  scale,
  progress,
}: CircleStampOverlayProps) {
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [{ rotate: '-100deg' }, { scale }],
        },
      ]}
    >
      <Svg height={STAMP_SIZE} width={STAMP_SIZE} viewBox={`0 0 ${STAMP_SIZE} ${STAMP_SIZE}`}>
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS - 3}
          fill="rgba(211, 47, 47, 0.05)"
        />
        <AnimatedCircle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="transparent"
          stroke="#d32f2f"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-102 ${CENTER} ${CENTER})`}
        />
      </Svg>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: -3,
    left: 10,
    width: STAMP_SIZE,
    height: STAMP_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
