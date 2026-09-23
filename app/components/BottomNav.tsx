export default function BottomNav(){
  return(
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-2 text-xs z-50">
      <a href="/">Discover</a>
      <a href="/liked-you">Liked</a>
      <a href="/chat">Chat</a>
      <a href="/settings">Settings</a>
    </div>
  )
}
