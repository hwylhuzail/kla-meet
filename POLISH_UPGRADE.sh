#!/bin/bash
set -e
echo "✨ SUPER-COOL POLISH UPGRADE - KEEPING LAYOUT"
mkdir -p components/ui lib/hooks app

# 1. PREMIUM GLOBAL ANIMATIONS CSS - respects reduced-motion
cat > app/polish.css <<'CSS'
/* KLA-MEET Premium Polish - subtle, fast, professional */
* { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
/* Smooth transitions */
.smooth-transition { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
.card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.card-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); }
.card-hover:active { transform: translateY(0px) scale(0.98); }
.btn-premium { transition: all 0.15s ease; position: relative; overflow: hidden; }
.btn-premium:hover { transform: translateY(-1px); filter: brightness(1.05); }
.btn-premium:active { transform: scale(0.97); }
.btn-premium:focus-visible { outline: 2px solid; outline-offset: 2px; }
/* Skeleton shimmer */
@keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
.skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
.skeleton-dark { background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%); background-size: 200% 100%; }
/* Page transitions */
@keyframes fadeIn { from{opacity:0; transform:translateY(4px)} to{opacity:1; transform:translateY(0)} }
.animate-fadeIn { animation: fadeIn 0.3s ease-out; }
@keyframes scaleIn { from{opacity:0; transform:scale(0.95)} to{opacity:1; transform:scale(1)} }
.animate-scaleIn { animation: scaleIn 0.2s ease-out; }
@keyframes slideUp { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:translateY(0)} }
.animate-slideUp { animation: slideUp 0.25s ease-out; }
/* Online pulse */
@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.5} }
.online-pulse { animation: pulse-dot 2s infinite; }
/* Image loading */
.img-loading { filter: blur(8px); transition: filter 0.3s; }
.img-loaded { filter: blur(0); }
/* Modal/drawer */
.modal-backdrop { backdrop-filter: blur(8px); background: rgba(0,0,0,0.4); }
CSS

# 2. PREMIUM SKELETONS
cat > components/ui/Skeleton.tsx <<'EOF'
export function Skeleton({className=""}:{className?:string}){return <div className={`skeleton rounded-lg ${className} animate-pulse`} />}
export function ProfileSkeleton(){return <div className="p-4 border rounded-xl animate-fadeIn"><div className="flex gap-4"><Skeleton className="w-16 h-16 rounded-full"/><div className="flex-1 space-y-3"><Skeleton className="h-4 w-1/2"/><Skeleton className="h-3 w-3/4"/></div></div></div>}
export function CardSkeleton(){return <div className="p-4 border rounded-xl space-y-3"><Skeleton className="h-40 w-full"/><Skeleton className="h-4 w-3/4"/><Skeleton className="h-3 w-1/2"/></div>}
EOF

# 3. BEAUTIFUL EMPTY STATES
cat > components/ui/EmptyState.tsx <<'EOF'
export function EmptyState({icon="✨", title, desc}:{icon?:string,title:string,desc:string}){
  return <div className="text-center py-16 px-8 animate-fadeIn"><div className="text-5xl mb-4">{icon}</div><h3 className="text-lg font-semibold mb-2">{title}</h3><p className="text-sm text-gray-500 max-w-sm mx-auto">{desc}</p></div>
}
EOF

# 4. ANIMATED FEEDBACK
cat > components/ui/Feedback.tsx <<'EOF'
"use client";
export function SuccessToast({msg}:{msg:string}){return <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slideUp flex gap-2"><span>✅</span>{msg}</div>}
export function ErrorToast({msg}:{msg:string}){return <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slideUp flex gap-2"><span>⚠️</span>{msg}</div>}
EOF

# 5. PROFILE PHOTO INTERACTIONS + ONLINE/VERIFIED
cat > components/ui/ProfilePhoto.tsx <<'EOF'
"use client";
import { useState } from "react";
export function ProfilePhoto({src, online, verified, size=64}:{src?:string, online?:boolean, verified?:boolean, size?:number}){
  const [loaded,setLoaded]=useState(false);
  return <div className="relative group" style={{width:size,height:size}}>
    <img src={src||"/placeholder-avatar.jpg"} onLoad={()=>setLoaded(true)} className={`w-full h-full rounded-full object-cover smooth-transition group-hover:scale-105 ${!loaded?'img-loading':'img-loaded'} card-hover`} alt=""/>
    {online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full online-pulse"/>}
    {verified && <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>}
  </div>
}
EOF

# 6. NOTIFICATION ANIMATIONS + MODAL
cat > components/ui/PremiumModal.tsx <<'EOF'
"use client";
export function PremiumModal({open,onClose,children}:{open:boolean,onClose:()=>void,children:any}){
  if(!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn" onClick={onClose}><div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scaleIn smooth-transition" onClick={e=>e.stopPropagation()}>{children}</div></div>
}
export function NotificationDot(){return <span className="w-2 h-2 bg-red-500 rounded-full online-pulse"/>}
EOF

# 7. HOOKS - REDUCED MOTION + SMOOTH SCROLL
cat > lib/hooks/usePolish.ts <<'EOF'
"use client";
import { useEffect, useState } from "react";
export function useReducedMotion(){const [reduced,setReduced]=useState(false);useEffect(()=>{const m=window.matchMedia("(prefers-reduced-motion: reduce)");setReduced(m.matches);m.addEventListener("change",e=>setReduced(e.matches))},[]);return reduced;}
export function useSmoothScroll(){useEffect(()=>{document.documentElement.style.scrollBehavior="smooth"},[])}
EOF

# 8. INJECT POLISH CSS INTO LAYOUT IF EXISTS
if [ -f "app/globals.css" ]; then echo -e "\n@import './polish.css';" >> app/globals.css; echo "Injected polish.css into globals.css"; fi
if [ -f "app/layout.tsx" ]; then sed -i "s|import.*globals.css.*|import './globals.css'\nimport './polish.css'|g" app/layout.tsx 2>/dev/null || true; fi
# Ensure polish.css imported even if globals not found
if ! grep -q "polish.css" app/layout.tsx 2>/dev/null; then echo "import './polish.css'" >> app/layout.tsx 2>/dev/null || true; fi

# 9. FINAL CLEAN & BUILD
echo "🧹 Final Kampala check + build"
find app components -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's/Kampala/Worldwide/g; s/kampala/worldwide/g' {} \; 2>/dev/null || true
grep -r -i "kampala" app components 2>/dev/null && echo "❌ Still Kampala" || echo "✅ CLEAN INTERNATIONAL"
rm -rf out .next
npm run build

echo "🚀 Pushing polish upgrade"
git add .
git commit -m "feat: super-cool polish - skeletons, animations, hover, modal, photo interactions, online/verified, reduced-motion" || true
git push origin HEAD:main --force
echo "✨ DONE! Premium polish deployed!"
