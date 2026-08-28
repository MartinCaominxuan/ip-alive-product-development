import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext,type ReactNode,useContext,useEffect,useMemo,useState } from "react";

import type { ActivityEvent,ActivityType } from "@/features/progression/activity-summary";
import { useProfile } from "@/hooks/use-profile";

interface ActivityValue{events:ActivityEvent[];record:(type:ActivityType,uniqueKey:string,options?:{characterId?:string;value?:number;metadata?:Record<string,string|number|boolean>})=>boolean;}
const Context=createContext<ActivityValue|undefined>(undefined);
export function ActivityLedgerProvider({children}:{children:ReactNode}){const{profile}=useProfile();const[events,setEvents]=useState<ActivityEvent[]>([]);const[hydrated,setHydrated]=useState(false);useEffect(()=>{void AsyncStorage.getItem("ip-alive:activity-ledger:v1").then((raw)=>{if(raw)setEvents(JSON.parse(raw))}).finally(()=>setHydrated(true))},[]);useEffect(()=>{if(hydrated)void AsyncStorage.setItem("ip-alive:activity-ledger:v1",JSON.stringify(events))},[events,hydrated]);useEffect(()=>{if(hydrated)setEvents((current)=>current.some((event)=>event.id===`account-created:${profile.id}`)?current:[{id:`account-created:${profile.id}`,type:"account-created",occurredAt:profile.createdAt},...current])},[hydrated,profile.createdAt,profile.id]);const value=useMemo<ActivityValue>(()=>({events,record:(type,uniqueKey,options={})=>{const id=`${type}:${uniqueKey}`;if(events.some((event)=>event.id===id))return false;setEvents((current)=>current.some((event)=>event.id===id)?current:[...current,{id,type,occurredAt:new Date().toISOString(),...options}]);return true}}),[events]);return <Context.Provider value={value}>{children}</Context.Provider>}
export function useActivityLedger(){const value=useContext(Context);if(!value)throw new Error("useActivityLedger must be used inside ActivityLedgerProvider");return value}
