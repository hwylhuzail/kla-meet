import { createClient } from '@supabase/supabase-js'
export async function POST(req:Request){
 const f=await req.formData(); const file=f.get('file') as File; const uid=f.get('userId') as string
 if(!file) return Response.json({error:"no file"},{status:400})
 const supa=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
 const path=`${uid}/${Date.now()}-${file.name}`
 const {error}=await supa.storage.from('profile-photos').upload(path,file)
 if(error) return Response.json({error:error.message},{status:500})
 const {data}=supa.storage.from('profile-photos').getPublicUrl(path)
 return Response.json({url:data.publicUrl})
}
