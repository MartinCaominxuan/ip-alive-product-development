import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { DEMO_PROFILE, type UserProfile } from "@/features/account/profile";

interface ProfileValue { profile: UserProfile; updateDisplayName: (name: string) => void; pauseProfile:()=>void; resumeProfile:()=>void; resetProfile:()=>void; }
const Context=createContext<ProfileValue|undefined>(undefined);
export function ProfileProvider({children}:{children:ReactNode}){const[profile,setProfile]=useState(DEMO_PROFILE);const[hydrated,setHydrated]=useState(false);useEffect(()=>{void AsyncStorage.getItem("ip-alive:profile:v1").then((raw)=>{if(raw)setProfile({...DEMO_PROFILE,...JSON.parse(raw)})}).finally(()=>setHydrated(true))},[]);useEffect(()=>{if(hydrated)void AsyncStorage.setItem("ip-alive:profile:v1",JSON.stringify(profile))},[profile,hydrated]);const value=useMemo<ProfileValue>(()=>({profile,updateDisplayName:(name)=>{if(name.trim())setProfile((current)=>({...current,displayName:name.trim()}))},pauseProfile:()=>setProfile((current)=>({...current,lifecycleStatus:"paused",pausedAt:new Date().toISOString()})),resumeProfile:()=>setProfile((current)=>({...current,lifecycleStatus:"active",pausedAt:undefined})),resetProfile:()=>setProfile({...DEMO_PROFILE,createdAt:new Date().toISOString(),firstActiveAt:new Date().toISOString()})}),[profile]);return <Context.Provider value={value}>{children}</Context.Provider>}
export function useProfile(){const value=useContext(Context);if(!value)throw new Error("useProfile must be used inside ProfileProvider");return value}
