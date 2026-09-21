"use client";
import { useState } from "react";
export function ProfilePhoto({src, online, verified, size=64}:{src?:string, online?:boolean, verified?:boolean, size?:number}){
  const [loaded,setLoaded]=useState(false);
  return <div className="relative group" style={{width:size,height:size}}>
    <img src={src||"/placeholder-avatar.jpg"} onLoad={()=>setLoaded(true)} className={`w-full h-full rounded-full object-cover smooth-transition group-hover:scale-105 ${!loaded?'img-loading':'img-loaded'} card-hover`} alt=""/>
    {online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full online-pulse"/>}
    {verified && <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>}
  </div>
}
