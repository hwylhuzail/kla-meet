export default function About(){
  return (
    <div className="bg-zinc-100 rounded-[24px] p-5 mx-6">
      <h3 className="font-black text-sm">📖 About KLA-MEET</h3>
      <p className="text-[11px] mt-2 leading-relaxed text-zinc-700">
        KLA-MEET is a friendship community started in Uganda to help you make new friends nearby.
        Whether you are new in Kampala, studying in Mukono, or working in Arua, find verified friends
        for coffee, study groups, gym, and city hangouts. No fake profiles, no adult content — just real friendship.
      </p>
      <div className="mt-3 flex gap-2">
        <span className="text-[9px] bg-black text-white px-2.5 py-1 rounded-full font-bold">Kampala</span>
        <span className="text-[9px] bg-black text-white px-2.5 py-1 rounded-full font-bold">Entebbe</span>
        <span className="text-[9px] bg-black text-white px-2.5 py-1 rounded-full font-bold">Jinja</span>
        <span className="text-[9px] bg-black text-white px-2.5 py-1 rounded-full font-bold">Arua</span>
      </div>
    </div>
  )
}