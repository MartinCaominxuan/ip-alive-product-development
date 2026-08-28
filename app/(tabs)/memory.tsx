import { router } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { memories } from "@/data/memories";
import { characterNamesZh } from "@/data/localized-content";
import { useLanguage } from "@/hooks/use-language";
import { useChatHistory } from "@/hooks/use-chat-history";
import { getCharacterViewById } from "@/features/characters";

export default function MemoryScreen() {
  const { language, text } = useLanguage();
  const history = useChatHistory();
  const recentExchanges = history.messages.filter((message)=>message.sender==="character"&&message.language===language).slice(-6).reverse();
  const managedCharacters=["yunzhou","mia","nova"].map((id)=>{const character=getCharacterViewById(id)?.character;return{id,character,summary:history.getSummary(id,language),enabled:history.isMemoryEnabled(id)}});
  const clear=(characterId:string,name:string,allLanguages=false)=>Alert.alert(text(`Forget ${name}'s saved conversation?`,`清除${name}的对话记忆？`),allLanguages?text("This permanently removes saved Chinese and English conversations from this device.","这会从本设备永久删除中英文对话。"):text("This permanently removes the saved conversation in the current language.","这会永久删除当前语言下保存的对话。"),[{text:text("Cancel","取消"),style:"cancel"},{text:text("Forget","清除"),style:"destructive",onPress:()=>history.clearConversation(characterId,allLanguages?undefined:language)}]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}><View><Text style={styles.title}>{text("Memories", "回忆")}</Text><Text style={styles.subtitle}>{text("Moments your relationships made worth keeping.", "值得被留下的陪伴片段。")}</Text></View><LanguageToggle /></View>
      <View style={styles.summary}>
        <Text style={styles.summaryNumber}>{memories.length+recentExchanges.length}</Text><Text style={styles.summaryLabel}>{text("MEMORIES & CONVERSATIONS", "回忆与真实对话")}</Text>
        <View style={styles.timelineLine} />
      </View>
      <Text style={styles.sectionTitle}>{text("Memory controls", "记忆控制")}</Text>
      <Text style={styles.controlIntro}>{text("Choose which characters may save new conversations. Turning memory off does not delete anything already saved.","选择哪些角色可以保存新对话。关闭记忆不会自动删除已经保存的内容。")}</Text>
      {managedCharacters.map(({id,character,summary,enabled})=>{const name=language==="zh"?character?.displayNameZh??character?.displayName:character?.displayName;return <View key={id} style={styles.controlCard}>
        <View style={styles.controlTop}><View style={styles.controlIdentity}><Text style={styles.controlEmoji}>{character?.emoji}</Text><View><Text style={styles.controlName}>{name}</Text><Text style={styles.controlMeta}>{summary.exchangeCount} {text("saved exchanges","段已保存对话")}{summary.lastAt?` · ${summary.lastAt.slice(0,10)}`:""}</Text></View></View><Pressable accessibilityRole="switch" accessibilityState={{checked:enabled}} style={[styles.toggle,enabled&&styles.toggleOn]} onPress={()=>history.setMemoryEnabled(id,!enabled)}><View style={[styles.toggleKnob,enabled&&styles.toggleKnobOn]}/></Pressable></View>
        <Text style={styles.controlStatus}>{enabled?text("New conversations may be remembered on this device.","新对话可以保存在本设备。") : text("Memory paused. New conversations remain in the current session only.","记忆已暂停，新对话只保留在当前会话。")}</Text>
        {summary.latestCharacterText&&<Text numberOfLines={2} style={styles.controlPreview}>{summary.latestCharacterText}</Text>}
        <View style={styles.controlActions}><Pressable disabled={!summary.messageCount} style={[styles.forgetButton,!summary.messageCount&&styles.buttonDisabled]} onPress={()=>clear(id,name??id)}><Text style={styles.forgetText}>{text("Forget this language","清除当前语言")}</Text></Pressable><Pressable disabled={!history.messages.some((message)=>message.characterId===id)} style={[styles.forgetAllButton,!history.messages.some((message)=>message.characterId===id)&&styles.buttonDisabled]} onPress={()=>clear(id,name??id,true)}><Text style={styles.forgetAllText}>{text("Forget all","全部清除")}</Text></Pressable></View>
      </View>})}
      {recentExchanges.length>0&&<><Text style={styles.sectionTitle}>{text("Recent conversations", "最近的真实对话")}</Text>{recentExchanges.map((message)=>{const character=getCharacterViewById(message.characterId)?.character;const name=language==="zh"?character?.displayNameZh??character?.displayName:character?.displayName;return <View key={message.id} style={styles.chatMemory}><View style={styles.chatTop}><Text style={styles.chatName}>{character?.emoji} {name}</Text><Text style={styles.date}>{message.createdAt.slice(0,10)}</Text></View><Text style={styles.chatText}>{message.text}</Text><Text style={styles.persisted}>{text("Saved from conversation", "来自已保存对话")}</Text></View>})}</>}
      <Text style={styles.sectionTitle}>{text("Story memories", "故事回忆")}</Text>
      {memories.map((memory, index) => (
        <Pressable key={memory.id} style={styles.card} onPress={() => router.push({ pathname: "/memory/[id]", params: { id: memory.id } })}>
          <View style={styles.timelineColumn}><View style={styles.dot} />{index < memories.length - 1 && <View style={styles.connector} />}</View>
          <View style={styles.cardBody}>
            <View style={styles.cardTop}><View style={styles.characterPill}><Text>{memory.emoji}</Text><Text style={styles.characterName}>{language === "zh" ? characterNamesZh[memory.characterName] ?? memory.characterName : memory.characterName}</Text></View><Text style={styles.date}>{memory.date}</Text></View>
            <Text style={styles.cardTitle}>{language === "en" ? memory.titleEn : memory.titleZh}</Text>
            <Text style={styles.cardSummary}>{language === "en" ? memory.summaryEn : memory.summaryZh}</Text>
            <Text style={styles.open}>{text("Open memory  ›", "打开回忆  ›")}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F4FA" },
  content: { paddingHorizontal: 18, paddingTop: 60, paddingBottom: 44 },
  header: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  title: { fontSize: 30, fontWeight: "900", color: "#2C2632" },
  subtitle: { maxWidth: 245, marginTop: 5, fontSize: 12, lineHeight: 17, color: "#7A7380" },
  summary: { overflow: "hidden", marginTop: 23, marginBottom: 18, padding: 18, borderRadius: 22, backgroundColor: "#2B213F" },
  summaryNumber: { fontSize: 33, fontWeight: "900", color: "#FFFFFF" },
  summaryLabel: { marginTop: 2, fontSize: 9, fontWeight: "900", letterSpacing: 1.4, color: "#C4B5ED" },
  timelineLine: { position: "absolute", right: -20, top: 30, width: 170, height: 3, transform: [{ rotate: "-12deg" }], backgroundColor: "#745BDD" },
  sectionTitle:{marginTop:5,marginBottom:11,fontSize:17,fontWeight:"900",color:"#342D3A"},controlIntro:{marginTop:-5,marginBottom:12,fontSize:10,lineHeight:15,color:"#7A7380"},controlCard:{marginBottom:10,padding:16,borderRadius:20,backgroundColor:"#FFFFFF"},controlTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},controlIdentity:{flexDirection:"row",alignItems:"center",flex:1},controlEmoji:{width:35,fontSize:23},controlName:{fontSize:13,fontWeight:"900",color:"#352D3C"},controlMeta:{marginTop:2,fontSize:8,color:"#8B8291"},controlStatus:{marginTop:10,fontSize:10,lineHeight:15,color:"#6B6272"},controlPreview:{marginTop:8,padding:10,borderRadius:12,fontSize:10,lineHeight:15,color:"#574D60",backgroundColor:"#F6F2FA"},toggle:{width:42,height:24,padding:3,borderRadius:12,backgroundColor:"#CFC9D4"},toggleOn:{backgroundColor:"#6D4FE3"},toggleKnob:{width:18,height:18,borderRadius:9,backgroundColor:"#FFFFFF"},toggleKnobOn:{alignSelf:"flex-end"},controlActions:{flexDirection:"row",gap:8,marginTop:11},forgetButton:{flex:1,alignItems:"center",paddingVertical:9,borderRadius:13,backgroundColor:"#EEE8FA"},forgetText:{fontSize:9,fontWeight:"800",color:"#5D49A6"},forgetAllButton:{alignItems:"center",paddingHorizontal:14,paddingVertical:9,borderRadius:13,backgroundColor:"#FFF0EF"},forgetAllText:{fontSize:9,fontWeight:"800",color:"#A44C57"},buttonDisabled:{opacity:.35},chatMemory:{marginBottom:9,padding:16,borderRadius:19,backgroundColor:"#EEE8FA"},chatTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},chatName:{fontSize:10,fontWeight:"900",color:"#5D4A85"},chatText:{marginTop:9,fontSize:12,lineHeight:18,color:"#42384C"},persisted:{marginTop:7,fontSize:8,fontWeight:"800",color:"#8877AA"},
  card: { flexDirection: "row", minHeight: 152 },
  timelineColumn: { width: 24, alignItems: "center" },
  dot: { width: 12, height: 12, marginTop: 21, borderRadius: 6, borderWidth: 3, borderColor: "#CDBFFF", backgroundColor: "#6D4FE3" },
  connector: { flex: 1, width: 2, backgroundColor: "#DCD5E8" },
  cardBody: { flex: 1, marginLeft: 7, marginBottom: 13, padding: 16, borderRadius: 20, backgroundColor: "#FFFFFF" },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  characterPill: { flexDirection: "row", alignItems: "center", gap: 5 },
  characterName: { fontSize: 10, fontWeight: "800", color: "#665B70" },
  date: { fontSize: 9, color: "#9A929F" },
  cardTitle: { marginTop: 10, fontSize: 16, fontWeight: "800", color: "#322C38" },
  cardSummary: { marginTop: 5, fontSize: 11, lineHeight: 16, color: "#7A7380" },
  open: { marginTop: 9, fontSize: 10, fontWeight: "800", color: "#6D4FE3" },
});
