import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import PrivacyPage from './Privacy'

import About from './components/landing/About'
import HowItWorks from './components/landing/HowItWorks'
import Safety from './components/landing/Safety'
import Pricing from './components/landing/Pricing'
import Faqs from './components/landing/Faqs'

import DiscoverTab from './components/tabs/Discover'
import ChatTab from './components/tabs/Chat'
import NearbyTab from './components/tabs/Nearby'
import PremiumTab from './components/tabs/Premium'
import ProfileTab from './components/tabs/Profile'

const ADMIN_EMAILS = ["huzayirukalungi4@gmail.com", "alexmakkoali@gmail.com"]

export default function App(){
  if(typeof window!== 'undefined' && window.location.pathname === '/privacy'){
    return <PrivacyPage />
  }
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [isPremium,setIsPremium]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [posts,setPosts]=useState([])
  const [user,setUser]=useState(null)
  const [form,setForm]=useState({name:'',email:'',password:'',bio:'',age:'22',city:'Kampala',photos:['']})
  const [agreed,setAgreed]=useState(false)

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      if(data?.user){
        setUser(data.user)
        if(ADMIN_EMAILS.includes(data.user.email?.toLowerCase().trim())){ setIsAdmin(true); setIsPremium(true) }
      }
    })
    supabase.from('posts').select('*').order('created_at',{ascending:false}).then(({data})=>{ if(data) setPosts(data) })
  },[])

  const handleTab = (t) => {
    if(t==='admin' && !isAdmin) return
    if((t==='nearby' || t==='chat') && !isPremium && !isAdmin){ setTab('premium'); return }
    setTab(t)
  }

  const handleSignup = async () => {
    if(!agreed) return alert('18+ agree required')
    if(parseInt(form.age)<18) return alert('18+ only')
    const { data } = await supabase.auth.signUp({email:form.email.trim(), password:form.password ||