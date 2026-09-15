"use client"
export default function Verify(){
  return (
    <div style={{maxWidth:"400px",margin:"40px auto",padding:"20px",color:"#fff",textAlign:"center"}}>
      <h2>Get Verified ✓</h2>
      <p style={{opacity:0.7}}>Upload selfie + ID to get blue tick. Reduces fake profiles.</p>
      <div style={{background:"#222",padding:"20px",borderRadius:"12px",marginTop:"20px"}}>
        <p>📸 Selfie Verification</p><button style={{background:"#ff3366",padding:"10px 20px",borderRadius:"20px",marginTop:"10px"}}>Take Selfie</button>
        <p style={{marginTop:"20px"}}>🪪 ID (18+)</p><button style={{background:"#333",padding:"10px 20px",borderRadius:"20px",marginTop:"10px"}}>Upload ID (Blurry auto-deleted)</button>
      </div>
      <a href="/" style={{color:"#ff3366",display:"block",marginTop:"20px"}}>Back</a>
    </div>
  )
}
