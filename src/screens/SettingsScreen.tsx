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
  | 'app-intro'
  | 'rate-app'
  | 'contact'
  | 'privacy-policy'
  | 'terms';

const APP_VERSION = '버전 1.0.0';
const APP_INTRO_CONTENT =
  'Double O는 하루에 딱 두 개의 습관만 기록하는 미니멀 습관 앱입니다.\n\n많은 목표보다, 오늘 지킬 수 있는 두 개의 기준에 집중합니다.\n\n동그라미 두 개,\n오늘은 충분해요.';
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

  if (currentRoute === 'app-intro') {
  return (
    <InfoPageScreen
      title="앱소개"
      content={APP_INTRO_CONTENT}
      onBack={() => setCurrentRoute('menu')}
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
      onOpenAppIntro={() => setCurrentRoute('app-intro')}
      onOpenRateApp={() => setCurrentRoute('rate-app')}
      onOpenContact={() => setCurrentRoute('contact')}
      onOpenPrivacyPolicy={() => setCurrentRoute('privacy-policy')}
      onOpenTerms={() => setCurrentRoute('terms')}
      appVersion={APP_VERSION.replace('버전 ', '')}
    />
  );
}
