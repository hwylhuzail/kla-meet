export default function Privacy(){
return (
<div style={{background:"#fff",minHeight:"100vh",fontFamily:"system-ui",padding:"16px",maxWidth:"600px",margin:"0 auto"}}>
<div style={{background:"#FFC107",border:"3px solid #000",padding:"12px",borderRadius:"16px",marginBottom:"12px"}}><b style={{fontSize:"20px"}}>KLA MEET • Privacy Policy</b><p style={{fontSize:"11px"}}>Last updated: May 2026 • Supabase Secure • Uganda Data Protection Act 2019</p></div>
<div style={{border:"3px solid #000",borderRadius:"16px",padding:"14px",lineHeight:"1.6",fontSize:"12px"}}>
<h3 style={{fontWeight:900}}>1. Data We Collect</h3>
<p>• Profile: name, age (18+ only), location (Kampala), bio, photos, interests.<br/>• ID Verification: NIN, Passport, Student ID photos → stored in Supabase bucket 'id-docs' (private, encrypted). Selfie + face match score.<br/>• Usage: swipes, matches, posts, likes → table 'matches' & 'posts' in Supabase.<br/>• Device: IP, browser for safety.</p>
<h3 style={{fontWeight:900,marginTop:"12px"}}>2. How We Store</h3>
<p>All data in Supabase (EU + US servers). ID images NOT public. Only Ntinda verification team can view pending IDs. Profile photos in 'profile-photos' public bucket.</p>
<h3 style={{fontWeight:900,marginTop:"12px"}}>3. 18+ Verification</h3>
<p>We collect government ID to prove 18+. Face match 98%+ required. No ID = no access. Underage reports banned in 2h.</p>
<h3 style={{fontWeight:900,marginTop:"12px"}}>4. Your Rights</h3>
<p>You can request delete: email kla-meet@support.com → we delete from Supabase profiles, posts, id_verifications within 48h. Uganda Data Protection Act compliant.</p>
<h3 style={{fontWeight:900,marginTop:"12px"}}>5. No Selling</h3>
<p>We never sell ID, NIN, or photos to third parties. Supabase RLS protects.</p>
<p style={{marginTop:"12px",background:"#FFF8E1",padding:"8px",borderRadius:"10px"}}>Contact: kla-meet support in Ntinda, Kampala • privacy@kla-meet.ug • +256 700 000000</p>
</div>
</div>
)
}
