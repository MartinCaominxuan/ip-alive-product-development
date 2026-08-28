import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getCharacterViewById, getOpeningLine, getScriptedReply } from "@/features/characters";
import type { CharacterEra } from "@/features/characters";
import { characterNamesZh } from "@/data/localized-content";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/use-language";
import { useAffinity } from "@/hooks/use-affinity";
import { useChatHistory } from "@/hooks/use-chat-history";

export default function ChatScreen() {
  const { language, text } = useLanguage();
  const affinity = useAffinity();
  const history = useChatHistory();
  const { id = "mia" } = useLocalSearchParams<{ id?: string }>();
  const view = getCharacterViewById(id) ?? getCharacterViewById("mia");
  const era: CharacterEra = view?.character.era ?? "modern";
  const characterName = language === "zh" ? view?.character.displayNameZh ?? characterNamesZh[view?.character.displayName ?? "Mia"] ?? "米娅" : view?.character.displayName ?? "Mia";
  const [input, setInput] = useState("");
  const [sessionMessages, setSessionMessages] = useState<{ id: string; sender: "user" | "character"; text: string }[]>([]);
  const savedMessages = history.getConversation(id, language);
  const memoryEnabled = history.isMemoryEnabled(id);
  const combinedMessages = [...savedMessages, ...sessionMessages];
  const messages = combinedMessages.length ? combinedMessages : [{ id: `opening-${language}-${era}`, sender: "character" as const, text: getOpeningLine(era, language) }];
  const quickPrompts = language === "zh"
    ? ["你怎么看手机？", "你的时代是什么样？", "你可以来现在旅行吗？"]
    : ["What do you think of phones?", "What is your era like?", "Can you visit the present?"];
  const eraLabel = useMemo(
    () => ({ ancient: "Ancient · 742", modern: "Modern · 2026", future: "Future · 2189" })[era],
    [era],
  );

  function sendMessage(text = input) {
    const cleanText = text.trim();
    if (!cleanText) return;

    const reply = getScriptedReply(era, cleanText, language);
    const saved = history.appendExchange(id, language, cleanText, reply.text);
    if (!saved) { const now=Date.now(); setSessionMessages((current)=>[...current,{id:`session-user-${now}`,sender:"user",text:cleanText},{id:`session-character-${now+1}`,sender:"character",text:reply.text}]); }
    setInput("");
    affinity.award(id, 3, "chat");
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={84}
    >
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={styles.avatarEmoji}>{view?.character.emoji ?? "🎧"}</Text></View>
        <View style={styles.headerCopy}>
          <Text style={styles.name}>{characterName}</Text>
          <Text style={styles.era}>{eraLabel}</Text>
        </View>
        <LanguageToggle compact />
      </View>

      <View style={styles.notice}>
        <Text style={styles.noticeText}>{memoryEnabled?text("Local scripted replies · Memory saving is on", "本地脚本回复 · 对话记忆已开启"):text("Local scripted replies · This chat will not be saved", "本地脚本回复 · 本次对话不会保存")}</Text>
      </View>

      <ScrollView style={styles.messages} contentContainerStyle={styles.messageContent} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View key={message.id} style={[styles.bubble, message.sender === "user" ? styles.userBubble : styles.characterBubble]}>
            <Text style={[styles.bubbleText, message.sender === "user" && styles.userBubbleText]}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptRow}>
        {quickPrompts.map((prompt) => (
          <Pressable key={prompt} style={styles.prompt} onPress={() => sendMessage(prompt)}>
            <Text style={styles.promptText}>{prompt}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.composer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => sendMessage()}
          placeholder={text(`Message ${characterName}...`, `给${characterName}发消息…`)}
          placeholderTextColor="#98919F"
          style={styles.input}
          returnKeyType="send"
        />
        <Pressable style={[styles.send, !input.trim() && styles.sendDisabled]} onPress={() => sendMessage()} disabled={!input.trim()}>
          <Text style={styles.sendText}>↑</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F5FA" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 18, paddingTop: 58, paddingBottom: 13, backgroundColor: "#FFFFFF" },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "#EEE8FF" },
  avatarEmoji: { fontSize: 24 },
  headerCopy: { flex: 1, marginLeft: 11 },
  name: { fontSize: 17, fontWeight: "800", color: "#2D2733" },
  era: { marginTop: 2, fontSize: 10, fontWeight: "700", color: "#7D7188" },
  offlineBadge: { paddingHorizontal: 8, paddingVertical: 5, borderRadius: 10, backgroundColor: "#E5F5EA" },
  offlineText: { fontSize: 7, fontWeight: "900", color: "#34764A" },
  notice: { alignItems: "center", paddingVertical: 7, backgroundColor: "#ECE8F4" },
  noticeText: { fontSize: 9, color: "#71687A" },
  messages: { flex: 1 },
  messageContent: { padding: 16, gap: 10 },
  bubble: { maxWidth: "82%", paddingHorizontal: 14, paddingVertical: 11, borderRadius: 18 },
  characterBubble: { alignSelf: "flex-start", borderBottomLeftRadius: 5, backgroundColor: "#FFFFFF" },
  userBubble: { alignSelf: "flex-end", borderBottomRightRadius: 5, backgroundColor: "#6D4FE3" },
  bubbleText: { fontSize: 14, lineHeight: 20, color: "#3C3542" },
  userBubbleText: { color: "#FFFFFF" },
  promptRow: { gap: 8, paddingHorizontal: 14, paddingVertical: 10 },
  prompt: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: "#D9D2E7", backgroundColor: "#FFFFFF" },
  promptText: { fontSize: 11, fontWeight: "700", color: "#655B70" },
  composer: { flexDirection: "row", alignItems: "center", gap: 9, paddingHorizontal: 14, paddingTop: 10, paddingBottom: 30, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#DED9E4", backgroundColor: "#FFFFFF" },
  input: { flex: 1, minHeight: 44, paddingHorizontal: 15, borderRadius: 22, fontSize: 14, color: "#332D38", backgroundColor: "#F0EDF3" },
  send: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "#6D4FE3" },
  sendDisabled: { backgroundColor: "#C9C4CE" },
  sendText: { fontSize: 21, fontWeight: "900", color: "#FFFFFF" },
});
