export const API_URL = import.meta.env.VITE_API_URL || '/api';
export async function api(path, opts={}){ const r=await fetch(API_URL+path, opts); return r.json(); }
