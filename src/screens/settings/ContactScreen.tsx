import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SettingsHeader } from '../../components/SettingsHeader';

type ContactScreenProps = {
  onBack: () => void;
};

const SUPPORT_EMAIL = 'support@example.com';

export function ContactScreen({ onBack }: ContactScreenProps) {
  const openMailApp = async () => {
    await Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title="문의하기" onBack={onBack} />

        <View style={styles.card}>
          <Text style={styles.label}>문의 이메일</Text>
          <Text style={styles.email}>{SUPPORT_EMAIL}</Text>
          <Text style={styles.description}>
            문의용 이메일 주소입니다. 나중에 실제 운영 주소로 수정해서 사용할 수 있습니다.
          </Text>

          <Pressable onPress={openMailApp} style={styles.mailButton}>
            <Text style={styles.mailButtonText}>메일 보내기</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f3',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c7c76',
  },
  email: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#52524d',
  },
  mailButton: {
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: '#1e1e1c',
    paddingVertical: 14,
  },
  mailButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
