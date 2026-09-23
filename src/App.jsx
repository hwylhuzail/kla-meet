export default function App() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',fontFamily:'system-ui',background:'#fff'}}>
      <div className="phone" style={{width:360,border:'3px solid #000',borderRadius:28,padding:20,background:'#fff'}}>
        <h1 style={{fontWeight:900,fontSize:22}}>KLA-MEET 🌍 International</h1>
        <p style={{marginTop:8,color:'#666'}}>Discover • Near • Chat (Premium 20K)</p>
        <p style={{marginTop:12,fontSize:13}}>✅ Build OK - White screen fixed</p>
        <p style={{marginTop:4,fontSize:12,color:'green'}}>If you see this on Vercel, deployment works!</p>
        <button onClick={()=>alert('Next: Add your onboarding flow')} style={{marginTop:16,width:'100%',padding:12,background:'#000',color:'#fff',borderRadius:12,fontWeight:700}}>Continue →</button>
        <p style={{marginTop:12,fontSize:11,textAlign:'center',color:'#999'}}>© 2026 International</p>
      </div>
    </div>
  )
}
