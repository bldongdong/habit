import { StyleSheet, View } from 'react-native';

type WeeklySegmentedBarProps = {
  count: number;
};

export function WeeklySegmentedBar({ count }: WeeklySegmentedBarProps) {
  return (
    <View style={styles.wrapper}>
      {Array.from({ length: 7 }, (_, index) => {
        const isFilled = index < count;

        return (
          <View
            key={index}
            style={[styles.segment, isFilled ? styles.segmentFilled : styles.segmentEmpty]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 6,
  },
  segment: {
    flex: 1,
    height: 8,
    borderRadius: 999,
  },
  segmentFilled: {
    backgroundColor: '#4caf50',
  },
  segmentEmpty: {
    backgroundColor: '#e5e5e5',
  },
});
