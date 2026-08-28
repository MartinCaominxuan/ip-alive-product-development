import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/use-language";
import { useProfile } from "@/hooks/use-profile";

export default function ProfileScreen() {
  const { text } = useLanguage();
  const { profile, updateDisplayName } = useProfile();
  const [name, setName] = useState(profile.displayName);
  const date = new Date(profile.createdAt).toLocaleDateString();
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.header}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ {text("Me", "我的")}</Text></Pressable><LanguageToggle /></View>
    <Text style={styles.eyebrow}>{text("ACCOUNT IDENTITY", "账号身份")}</Text><Text style={styles.title}>{text("My profile", "我的档案")}</Text>
    <View style={styles.modeCard}><Text style={styles.mode}>{text("DEMO ENVIRONMENT", "演示环境")}</Text><Text style={styles.modeText}>{text("This profile uses isolated demo data. A production account will begin its permanent history on the registration date—never after a trial period.", "此档案使用独立的演示数据。正式账号会从注册当天开始永久记录，不设置试用期后才开始记录。")}</Text></View>
    <Text style={styles.label}>{text("Display name", "显示名称")}</Text><TextInput value={name} onChangeText={setName} style={styles.input} placeholder={text("Your name", "你的名字")} />
    <Pressable style={styles.save} onPress={() => updateDisplayName(name)}><Text style={styles.saveText}>{text("Save name", "保存名称")}</Text></Pressable>
    <View style={styles.details}>
      <Detail label={text("Account ID", "账号 ID")} value={profile.id} />
      <Detail label={text("Status", "账号状态")} value={text("Demo profile", "演示档案")} />
      <Detail label={text("History begins", "记录起点")} value={date} />
      <Detail label={text("Time zone", "时区")} value={profile.timezone} />
    </View>
    <Pressable style={styles.summary} onPress={() => router.push("/annual-summary" as never)}><View><Text style={styles.summaryTitle}>{text("Annual story", "年度故事")}</Text><Text style={styles.summaryText}>{text("See the history created by your real actions", "查看由真实行动生成的年度记录")}</Text></View><Text style={styles.arrow}>›</Text></Pressable>
  </ScrollView>;
}
function Detail({label,value}:{label:string;value:string}){return <View style={styles.detail}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:"#F6F3F9"},content:{padding:20,paddingTop:56,paddingBottom:50},header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},back:{fontSize:15,fontWeight:"800",color:"#6D50D8"},eyebrow:{marginTop:24,fontSize:9,fontWeight:"900",letterSpacing:1.4,color:"#7458D4"},title:{marginTop:5,fontSize:30,fontWeight:"900",color:"#2F2935"},modeCard:{marginTop:18,padding:18,borderRadius:22,backgroundColor:"#29203F"},mode:{fontSize:10,fontWeight:"900",letterSpacing:1.4,color:"#C8B9FF"},modeText:{marginTop:8,fontSize:11,lineHeight:18,color:"#DED6E8"},label:{marginTop:21,fontSize:11,fontWeight:"800",color:"#655D6B"},input:{marginTop:7,paddingHorizontal:15,height:50,borderRadius:16,backgroundColor:"#FFF",fontSize:16,fontWeight:"700",color:"#302A35"},save:{alignSelf:"flex-start",marginTop:10,paddingHorizontal:18,paddingVertical:11,borderRadius:16,backgroundColor:"#7055DA"},saveText:{fontSize:12,fontWeight:"900",color:"#FFF"},details:{marginTop:18,paddingHorizontal:17,borderRadius:22,backgroundColor:"#FFF"},detail:{paddingVertical:14,borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:"#E6E0EA"},detailLabel:{fontSize:9,fontWeight:"800",color:"#8A818F"},detailValue:{marginTop:4,fontSize:13,fontWeight:"700",color:"#3D3542"},summary:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:14,padding:17,borderRadius:20,backgroundColor:"#E8E1F8"},summaryTitle:{fontSize:14,fontWeight:"900",color:"#493875"},summaryText:{marginTop:4,fontSize:9,color:"#776B91"},arrow:{fontSize:28,color:"#6D50C5"}});
