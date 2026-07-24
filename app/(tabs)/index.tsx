import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>IP ALIVE</Text>

      <Text style={styles.title}>
        Your character is waiting.
      </Text>

      <Text style={styles.description}>
        Build a relationship that continues beyond the collectible.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFF9F3',
  },
  eyebrow: {
    marginBottom: 16,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#755B4A',
  },
  title: {
    marginBottom: 16,
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
    color: '#29211C',
  },
  description: {
    maxWidth: 320,
    fontSize: 17,
    lineHeight: 26,
    color: '#6D625B',
  },
});