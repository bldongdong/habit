import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { SettingsHeader } from '../../components/SettingsHeader';

type InfoPageScreenProps = {
  title: string;
  content: string;
  onBack: () => void;
};

export function InfoPageScreen({ title, content, onBack }: InfoPageScreenProps) {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title={title} onBack={onBack} />

        <View style={styles.card}>
          <Text style={styles.contentText}>{content}</Text>
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
  },
  contentText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#40403b',
  },
});
