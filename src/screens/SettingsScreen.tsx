import { useState } from 'react';

import { ContactScreen } from './settings/ContactScreen';
import { HabitSettingsScreen } from './settings/HabitSettingsScreen';
import { QuoteSettingsScreen } from './settings/QuoteSettingsScreen';
import { SettingsMenuScreen } from './settings/SettingsMenuScreen';
import { InfoPageScreen } from './settings/InfoPageScreen';
import type { Habits, QuoteLanguage } from '../types/habit';

type SettingsScreenProps = {
  habits: Habits;
  quoteLanguage: QuoteLanguage;
  onSaveHabits: (habits: Habits) => void;
  onSaveQuoteLanguage: (quoteLanguage: QuoteLanguage) => void;
};

type SettingsRoute =
  | 'menu'
  | 'habit-settings'
  | 'quote-settings'
  | 'rate-app'
  | 'contact'
  | 'privacy-policy'
  | 'terms';

const APP_VERSION = '버전 1.0.0';
const RATE_APP_PLACEHOLDER =
  '앱스토어 또는 플레이스토어 링크를 나중에 연결할 수 있는 자리입니다. 현재는 별점 남기기 placeholder 화면입니다.';
const PRIVACY_POLICY_PLACEHOLDER =
  '개인정보처리방침 내용을 여기에 작성하세요. 현재는 앱스토어 제출 전 임시 placeholder 텍스트입니다.';
const TERMS_PLACEHOLDER =
  '서비스 이용약관 내용을 여기에 작성하세요. 현재는 앱스토어 제출 전 임시 placeholder 텍스트입니다.';

export function SettingsScreen({
  habits,
  quoteLanguage,
  onSaveHabits,
  onSaveQuoteLanguage,
}: SettingsScreenProps) {
  const [currentRoute, setCurrentRoute] = useState<SettingsRoute>('menu');

  if (currentRoute === 'habit-settings') {
    return (
      <HabitSettingsScreen
        habits={habits}
        onBack={() => setCurrentRoute('menu')}
        onSaveHabits={onSaveHabits}
      />
    );
  }

  if (currentRoute === 'quote-settings') {
    return (
      <QuoteSettingsScreen
        quoteLanguage={quoteLanguage}
        onBack={() => setCurrentRoute('menu')}
        onSaveQuoteLanguage={onSaveQuoteLanguage}
      />
    );
  }

  if (currentRoute === 'rate-app') {
    return (
      <InfoPageScreen
        title="별점 남기기"
        content={RATE_APP_PLACEHOLDER}
        onBack={() => setCurrentRoute('menu')}
      />
    );
  }

  if (currentRoute === 'contact') {
    return <ContactScreen onBack={() => setCurrentRoute('menu')} />;
  }

  if (currentRoute === 'privacy-policy') {
    return (
      <InfoPageScreen
        title="개인정보처리방침"
        content={PRIVACY_POLICY_PLACEHOLDER}
        onBack={() => setCurrentRoute('menu')}
      />
    );
  }

  if (currentRoute === 'terms') {
    return (
      <InfoPageScreen
        title="서비스 이용약관"
        content={TERMS_PLACEHOLDER}
        onBack={() => setCurrentRoute('menu')}
      />
    );
  }

  return (
    <SettingsMenuScreen
      onOpenHabitSettings={() => setCurrentRoute('habit-settings')}
      onOpenQuoteSettings={() => setCurrentRoute('quote-settings')}
      onOpenRateApp={() => setCurrentRoute('rate-app')}
      onOpenContact={() => setCurrentRoute('contact')}
      onOpenPrivacyPolicy={() => setCurrentRoute('privacy-policy')}
      onOpenTerms={() => setCurrentRoute('terms')}
      appVersion={APP_VERSION.replace('버전 ', '')}
    />
  );
}
