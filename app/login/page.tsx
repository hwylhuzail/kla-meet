'use client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  
  const handleLogin = () => {
    // your supabase login logic here
    router.push('/auth')
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Go to Auth</button>
    </div>
  )
}