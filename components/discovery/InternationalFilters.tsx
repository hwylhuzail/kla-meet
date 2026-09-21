"use client";
export default function InternationalFilters(){
  return <div className="flex gap-2 flex-wrap"><select className="border rounded px-3 py-2"><option>Worldwide</option><option>New York</option><option>Tokyo</option><option>London</option><option>Paris</option><option>Dubai</option></select><select className="border rounded px-3 py-2"><option>All Genders</option><option>Female</option><option>Male</option><option>Non-binary</option></select><select className="border rounded px-3 py-2"><option>All Languages</option><option>English</option><option>Spanish</option><option>French</option></select></div>
}
