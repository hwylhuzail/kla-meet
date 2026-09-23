"use client";
import { useState, useEffect } from "react";
export function usePresence(){const [online,setOnline]=useState(true);useEffect(()=>{setOnline(true)},[]);return {online, lastActive: new Date()}}
