import { StyleSheet, Text, View } from 'react-native';

export default function MeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Me Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9F3',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
});