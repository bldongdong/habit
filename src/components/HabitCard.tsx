import { Pressable, StyleSheet, Text, View } from 'react-native';

type HabitCardProps = {
  title: string;
  description: string;
  isChecked: boolean;
  onToggle: () => void;
};

export function HabitCard({ title, description, isChecked, onToggle }: HabitCardProps) {
  return (
    <View style={[styles.card, isChecked && styles.cardChecked]}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title} 체크 버튼`}
        onPress={onToggle}
        style={[styles.button, isChecked && styles.buttonChecked]}
      >
        <Text style={[styles.buttonText, isChecked && styles.buttonTextChecked]}>
          {isChecked ? '완료' : '체크1'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4de',
    padding: 20,
    gap: 18,
    shadowColor: '#1c1c1c',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 2,
  },
  cardChecked: {
    borderColor: '#1f7a4d',
    backgroundColor: '#f4fbf6',
  },
  textBlock: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1c',
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: '#5f5f59',
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 108,
    borderRadius: 999,
    backgroundColor: '#1e1e1c',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonChecked: {
    backgroundColor: '#1f7a4d',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonTextChecked: {
    color: '#ffffff',
  },
});
