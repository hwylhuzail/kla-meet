export default function BottomNav(){
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-2 text-xs z-50">
      <a href="/" className="flex flex-col items-center">💘<span>Discover</span></a>
      <a href="/liked-you" className="flex flex-col items-center">❤️<span>Liked</span></a>
      <a href="/chat" className="flex flex-col items-center">💬<span>Msgs</span></a>
      <a href="/settings" className="flex flex-col items-center">⚙️<span>Profile</span></a>
    </div>
  )
}
