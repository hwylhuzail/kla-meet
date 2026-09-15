export default function Guidelines(){
return (
<div style={{background:"#fff",minHeight:"100vh",fontFamily:"system-ui",padding:"16px",maxWidth:"600px",margin:"0 auto"}}>
<div style={{background:"#7C4DFF",color:"#fff",border:"3px solid #000",padding:"12px",borderRadius:"16px",marginBottom:"12px"}}><b style={{fontSize:"20px"}}>KLA MEET • Community Guidelines</b><p style={{fontSize:"11px"}}>Real People • Real Kampala • Real ID</p></div>
<div style={{display:"flex",flexDirection:"column",gap:"10px",fontSize:"12px",lineHeight:"1.6"}}>
<div style={{border:"3px solid #000",borderRadius:"14px",padding:"12px",background:"#E8F5E9"}}><b>✅ DO:</b><br/>• Verify with real NIN/Passport - face must match 98%<br/>• Use recent photo (last 6 months)<br/>• Be respectful in chat - Luganda/English OK<br/>• Meet in public: Ntinda, Bugolobi, Kololo<br/>• Report fake - we ban in 2h via Supabase</div>
<div style={{border:"3px solid #000",borderRadius:"14px",padding:"12px",background:"#FFEBEE"}}><b>❌ DON'T:</b><br/>• No under 18 - automatic Supabase block<br/>• No fake ID, no other's NIN<br/>• No money requests, no sugar mummy scam<br/>• No nude photos in posts table<br/>• No harassment, no tribal hate<br/>• No escort without verification badge</div>
<div style={{border:"3px solid #000",borderRadius:"14px",padding:"12px",background:"#FFF8E1"}}><b>🪪 ID Verification Flow (Supabase):</b><br/>1. Upload front + back + selfie to bucket 'id-docs'<br/>2. Row created in 'id_verifications' status=pending<br/>3. Ntinda team approves → profiles.id_verified=true<br/>4. You get ID OK badge like Vanessa screenshot</div>
<div style={{border:"3px solid #000",borderRadius:"14px",padding:"12px",background:"#fff"}}><b>🔒 Safety Tips Kampala:</b><br/>• Video call before meet<br/>• Tell friend where you go<br/>• Check ID OK + NIN Verified badge<br/>• Don't share bank/MoMo PIN<br/>• Use KLA MEET chat, not WhatsApp first</div>
</div>
</div>
)
}
