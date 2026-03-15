import { StyleSheet, View } from 'react-native';

type StatusDotProps = {
  success: boolean;
};

export function StatusDot({ success }: StatusDotProps) {
  return <View style={[styles.dot, success ? styles.successDot : styles.failDot]} />;
}

const styles = StyleSheet.create({
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  successDot: {
    backgroundColor: '#1f7a4d',
  },
  failDot: {
    backgroundColor: '#1e1e1c',
  },
});
