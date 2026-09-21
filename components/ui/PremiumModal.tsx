"use client";
export function PremiumModal({open,onClose,children}:{open:boolean,onClose:()=>void,children:any}){
  if(!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn" onClick={onClose}><div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scaleIn smooth-transition" onClick={e=>e.stopPropagation()}>{children}</div></div>
}
export function NotificationDot(){return <span className="w-2 h-2 bg-red-500 rounded-full online-pulse"/>}
