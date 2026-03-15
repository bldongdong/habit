import { StyleSheet, Text, View } from 'react-native';

import { PlaceholderCard } from '../components/PlaceholderCard';
import { ScreenContainer } from '../components/ScreenContainer';

export function HistoryScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>기록 화면</Text>
        <Text style={styles.subtitle}>나중에 날짜별 기록이 들어올 자리입니다.</Text>
      </View>

      <PlaceholderCard
        title="기록 준비 중"
        description="이 영역에는 앞으로 날짜별 체크 기록이나 간단한 달력 형태의 정보가 들어올 수 있습니다."
      />
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
});
