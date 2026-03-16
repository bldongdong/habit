import { StyleSheet, View } from 'react-native';

type WeeklySegmentedBarProps = {
  count: number;
};

export function WeeklySegmentedBar({ count }: WeeklySegmentedBarProps) {
  let fillColor = '#9e9e9e';

  if (count >= 5) {
    fillColor = '#4caf50';
  } else if (count >= 3) {
    fillColor = '#ff9800';
  }
  
  return (
    <View style={styles.wrapper}>
      {Array.from({ length: 7 }, (_, index) => {
        const isFilled = index < count;

        return (
          <View
            key={index}
            style={[
              styles.segment,
              isFilled
               ? { backgroundColor:fillColor}
               : styles.segmentEmpty
              ]}
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
