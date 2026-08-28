import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { LanguageProvider } from '@/hooks/use-language';
import { GameProgressProvider } from '@/hooks/use-game-progress';
import { AffinityProvider } from '@/hooks/use-affinity';
import { LifeProgressProvider } from '@/hooks/use-life-progress';
import { ProfileProvider } from '@/hooks/use-profile';
import { ActivityLedgerProvider } from '@/hooks/use-activity-ledger';
import { StoryEventsProvider } from '@/hooks/use-story-events';
import { ChatHistoryProvider } from '@/hooks/use-chat-history';
import { UnlockProvider } from '@/hooks/use-unlocks';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const open = (notification: Notifications.Notification) => { const url = notification.request.content.data?.url; if (typeof url === 'string') router.push(url as never); };
    const last = Notifications.getLastNotificationResponse(); if (last?.notification) open(last.notification);
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => open(response.notification));
    return () => subscription.remove();
  }, []);

  return (
    <LanguageProvider>
      <ProfileProvider><ChatHistoryProvider><ActivityLedgerProvider><UnlockProvider><GameProgressProvider><AffinityProvider><StoryEventsProvider><LifeProgressProvider><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="character/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="shop" options={{ headerShown: false }} />
          <Stack.Screen name="mail/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="memory/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="me/[section]" options={{ headerShown: false }} />
          <Stack.Screen name="wardrobe/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="life" options={{ headerShown: false }} />
          <Stack.Screen name="data-management" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
          <Stack.Screen name="annual-summary" options={{ headerShown: false }} />
          <Stack.Screen name="quality-center" options={{ headerShown: false }} />
          <Stack.Screen name="unlock" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider></LifeProgressProvider></StoryEventsProvider></AffinityProvider></GameProgressProvider></UnlockProvider></ActivityLedgerProvider></ChatHistoryProvider></ProfileProvider>
    </LanguageProvider>
  );
}
