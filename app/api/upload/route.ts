import { createClient } from '@supabase/supabase-js'
export async function POST(req:Request){
 const f=await req.formData(); const file=f.get('file') as File
 if(!file) return Response.json({error:"no file"},{status:400})
 const token=req.headers.get('authorization')?.replace(/^Bearer\s+/i,'')
 if(!token) return Response.json({error:"authentication required"},{status:401})
 const authClient=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
 const {data:{user},error:authError}=await authClient.auth.getUser(token)
 if(authError||!user) return Response.json({error:"invalid session"},{status:401})
 const supa=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
 const path=`${user.id}/${Date.now()}-${file.name}`
 const {error}=await supa.storage.from('profile-photos').upload(path,file)
 if(error) return Response.json({error:error.message},{status:500})
 const {data}=supa.storage.from('profile-photos').getPublicUrl(path)
 return Response.json({url:data.publicUrl})
}
