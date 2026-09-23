export const PREMIUM_PRICE = 20000
export function isProfileComplete(){
 const d = JSON.parse(localStorage.getItem('kla_profile')||'{}')
 return d.bio && d.pics && d.gender && d.interests && d.age && localStorage.getItem('kla_location_ok')==='1'
}
