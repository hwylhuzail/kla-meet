import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import About from './components/landing/About'
import HowItWorks from './components/landing/HowItWorks'
import Safety from './components/landing/Safety'
import Faqs from './components/landing/Faqs'
import PrivacyModal from './components/modals/PrivacyModal'
import TermsModal from './components/modals/TermsModal'
import PostModal from './components/modals/PostModal'
import PersonModal from './components/modals/PersonModal'
import Discover from './components/tabs/Discover'
import AdminPanel from './components/admin/AdminPanel'

const ADMIN_EMAILS = ["huzayirukalungi4@gmail.com", "alexmakkoali@gmail.com"]
const WORLD = [ /* your 4 worlds */ ]

export default function App(){
  const [view,setView]=useState('landing')
  const [tab,setTab]=useState('discover')
  const [isPremium,setIsPremium]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [posts,setPosts]=useState([])
  const [user,setUser]=useState(null)
  const [showPrivacy,setShowPrivacy]=useState(false)
  const [showTerms,setShowTerms]=useState(false)
  const [agreed,setAgreed]=useState(false)
  //... other states

  //... all your functions fetchPosts, handleLike etc stay same

  if(view==='landing'){
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="bg-black text-white px-4 py-3 flex justify-between items-center">
          <h1 className="font-black text-xs">KLA-MEET • Keep Love Alive</h1>
          <button onClick={()=>{setView('app'); setTab('discover')}} className="bg-[#FFC300] text-black px-4 py-2 rounded-full font-bold text-xs">Enter App</button>
        </header>
        <div className="max-w-md mx-auto p-6 space-y-4">
          <About />
          <HowItWorks />
          <Safety />
          <Faqs />
          {/* Sign Up with checkbox */}
          <div className="bg-[#FFC300] rounded-[24px] p-5">
            {/* your inputs */}
            <div className="mt-3 bg-black rounded-xl p-3 flex gap-2">
              <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} className="w-5 h-5" />
              <p className="text-[10px] text-white">I agree to <button onClick={()=>setShowTerms(true)} className="underline text-[#FFC300]">Terms</button> and <button onClick={()=>setShowPrivacy(true)} className="underline text-[#FFC300]">Privacy</button></p>
            </div>
            <button disabled={!agreed} onClick={handleSignup} className={`mt-3 w-full rounded-full py-3 font-black text-xs ${agreed?'bg-black text-white':'bg-zinc-400'}`}>Sign Up</button>
          </div>
        </div>
        {showPrivacy && <PrivacyModal onClose={()=>setShowPrivacy(false)} onAgree={()=>setAgreed(true)} />}
        {showTerms && <TermsModal onClose={()=>setShowTerms(false)} onAgree={()=>setAgreed(true)} />}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-28">
      {/* header */}
      {tab==='discover' && <Discover posts={posts} WORLD={WORLD} onSelect={setSelectedPost} isAdmin={isAdmin} />}
      {tab==='admin' && <AdminPanel posts={posts} allProfiles={allProfiles} />}
      {/* other tabs */}
      {showPostModal && <PostModal />}
      {selectedPost && <PersonModal post={selectedPost} isAdmin={isAdmin} onClose={()=>setSelectedPost(null)} onLike={handleLike} />}
      <nav className="fixed bottom-0 left-0 right-0 bg-black flex justify-around py-2">
        {/* your bottom nav - same as before */}
      </nav>
    </div>
  )
}