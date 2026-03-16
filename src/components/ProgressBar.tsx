import { StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';

type ProgressBarProps = {
  count: number;
  total: number;
};

export function ProgressBar({ count, total }: ProgressBarProps) {
  const progressWidth = `${Math.min(count / total, 1) * 100}%`;
  let color = '#9e9e9e'; // 기본 회색

  if (count >= 5) {
    color = '#4caf50';
  } else if (count >= 3) {
    color = '#ff9800';
  }

  const fillStyle: ViewStyle = {
    width: progressWidth as `${number}%`,
    backgroundColor: color,
  };

  return (
    <View style={styles.track}>
      <View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
