"use client";
export function SuccessToast({msg}:{msg:string}){return <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slideUp flex gap-2"><span>✅</span>{msg}</div>}
export function ErrorToast({msg}:{msg:string}){return <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slideUp flex gap-2"><span>⚠️</span>{msg}</div>}
