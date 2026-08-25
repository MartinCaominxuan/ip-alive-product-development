import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { LanguageProvider } from '@/hooks/use-language';
import { GameProgressProvider } from '@/hooks/use-game-progress';
import { AffinityProvider } from '@/hooks/use-affinity';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <LanguageProvider>
      <GameProgressProvider><AffinityProvider><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="character/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="shop" options={{ headerShown: false }} />
          <Stack.Screen name="mail/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="memory/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="me/[section]" options={{ headerShown: false }} />
          <Stack.Screen name="wardrobe/[id]" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider></AffinityProvider></GameProgressProvider>
    </LanguageProvider>
  );
}
