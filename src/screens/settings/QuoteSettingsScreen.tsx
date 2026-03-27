import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { SettingsHeader } from '../../components/SettingsHeader';
import type { QuoteLanguage } from '../../types/habit';

type QuoteSettingsScreenProps = {
  quoteLanguage: QuoteLanguage;
  onBack: () => void;
  onSaveQuoteLanguage: (quoteLanguage: QuoteLanguage) => void;
};

export function QuoteSettingsScreen({
  quoteLanguage,
  onBack,
  onSaveQuoteLanguage,
}: QuoteSettingsScreenProps) {
  const [quoteLanguageInput, setQuoteLanguageInput] = useState<QuoteLanguage>(quoteLanguage);
  const [showSavedBanner, setShowSavedBanner] = useState(false);
  const hideBannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bannerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setQuoteLanguageInput(quoteLanguage);
  }, [quoteLanguage]);

  useEffect(() => {
    return () => {
      if (hideBannerTimeoutRef.current) {
        clearTimeout(hideBannerTimeoutRef.current);
      }
    };
  }, []);

  const hasChanges = quoteLanguageInput !== quoteLanguage;

  const saveQuoteLanguage = () => {
    if (!hasChanges) {
      return;
    }

    onSaveQuoteLanguage(quoteLanguageInput);
    setShowSavedBanner(true);
    bannerOpacity.setValue(1);

    if (hideBannerTimeoutRef.current) {
      clearTimeout(hideBannerTimeoutRef.current);
    }

    hideBannerTimeoutRef.current = setTimeout(() => {
      Animated.timing(bannerOpacity, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start(() => {
        setShowSavedBanner(false);
      });
    }, 1200);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <SettingsHeader title="인용구 설정" onBack={onBack} />

        <View style={styles.card}>
          <Text style={styles.helperText}>표시할 명언 언어를 선택할 수 있습니다.</Text>
          <View style={styles.optionRow}>
            <Pressable
              onPress={() => setQuoteLanguageInput('kr')}
              style={[
                styles.optionButton,
                quoteLanguageInput === 'kr' && styles.optionButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  quoteLanguageInput === 'kr' && styles.optionButtonTextSelected,
                ]}
              >
                한글
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setQuoteLanguageInput('en')}
              style={[
                styles.optionButton,
                quoteLanguageInput === 'en' && styles.optionButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  quoteLanguageInput === 'en' && styles.optionButtonTextSelected,
                ]}
              >
                영문
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {showSavedBanner ? (
        <Animated.View style={[styles.banner, { opacity: bannerOpacity }]}>
          <Text style={styles.bannerText}>저장되었습니다.</Text>
        </Animated.View>
      ) : null}

      <View style={styles.floatingFooter}>
        <Pressable
          onPress={saveQuoteLanguage}
          disabled={!hasChanges}
          style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
        >
          <Text style={[styles.saveButtonText, !hasChanges && styles.saveButtonTextDisabled]}>
            저장
          </Text>
        </Pressable>
      </View>
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
    paddingBottom: 150,
    gap: 16,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 14,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#6d6d67',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d9d9d2',
    backgroundColor: '#fbfbf9',
    paddingVertical: 14,
  },
  optionButtonSelected: {
    borderColor: '#1e1e1c',
    backgroundColor: '#1e1e1c',
  },
  optionButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#3f3f3a',
  },
  optionButtonTextSelected: {
    color: '#ffffff',
  },
  banner: {
    position: 'absolute',
    left: 30,
    right: 30,
    bottom: 90,
    borderRadius: 14,
    backgroundColor: 'rgba(31, 122, 77, 0.84)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  bannerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  floatingFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  saveButton: {
    borderRadius: 18,
    backgroundColor: '#1e1e1c',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    paddingVertical: 16,
    shadowColor: '#111111',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#d9d9d2',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
  saveButtonTextDisabled: {
    color: '#8f8f88',
  },
});
