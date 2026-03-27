import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '../../components/ScreenContainer';

type SettingsMenuScreenProps = {
  onOpenHabitSettings: () => void;
  onOpenQuoteSettings: () => void;
  onOpenRateApp: () => void;
  onOpenContact: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  appVersion: string;
};

type MenuItemProps = {
  label: string;
  onPress: () => void;
};

function MenuItem({ label, onPress }: MenuItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuItemLabel}>{label}</Text>
      <Text style={styles.menuItemChevron}>{'>'}</Text>
    </Pressable>
  );
}

export function SettingsMenuScreen({
  onOpenHabitSettings,
  onOpenQuoteSettings,
  onOpenRateApp,
  onOpenContact,
  onOpenPrivacyPolicy,
  onOpenTerms,
  appVersion,
}: SettingsMenuScreenProps) {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>설정</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>설정</Text>
        <View style={styles.menuCard}>
          <MenuItem label="습관 설정" onPress={onOpenHabitSettings} />
          <MenuItem label="인용구 설정" onPress={onOpenQuoteSettings} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>정보</Text>
        <View style={styles.menuCard}>
          <MenuItem label="별점 남기기" onPress={onOpenRateApp} />
          <MenuItem label="문의하기" onPress={onOpenContact} />
          <MenuItem label="개인정보처리방침" onPress={onOpenPrivacyPolicy} />
          <MenuItem label="서비스 이용약관" onPress={onOpenTerms} />
        </View>
      </View>

      <Text style={styles.versionText}>앱 버전정보 {appVersion}</Text>
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
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8a8a84',
    paddingHorizontal: 4,
  },
  menuCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0ea',
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#1f1f1c',
  },
  menuItemChevron: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b1b1aa',
  },
  versionText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    color: '#8a8a84',
  },
});
