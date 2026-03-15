import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { AppTab } from '../types/habit';

type TabBarProps = {
  activeTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
};

const TABS: { key: AppTab; label: string }[] = [
  { key: 'home', label: '홈' },
  { key: 'history', label: '기록' },
  { key: 'settings', label: '설정' },
];

export function TabBar({ activeTab, onChangeTab }: TabBarProps) {
  return (
    <View style={styles.wrapper}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            onPress={() => onChangeTab(tab.key)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
          >
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ededE8',
  },
  tabButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    backgroundColor: '#f5f5f3',
  },
  tabButtonActive: {
    backgroundColor: '#1e1e1c',
  },
  tabLabel: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#6e6e68',
  },
  tabLabelActive: {
    color: '#ffffff',
  },
});
