export default function handler(req,res){
  res.setHeader('Content-Type','text/html')
  res.send(`<html><head><meta name="viewport" content="width=device-width"><style>body{background:#000;color:#fff;font-family:sans-serif;text-align:center;padding:50px} a{background:#FFD400;color:#000;padding:14px 28px;border-radius:30px;text-decoration:none;font-weight:bold;display:inline-block;margin-top:20px}</style></head><body><h1>Email Verified ✅</h1><p>Your KLA-MEET account is activated!</p><a href="/discover">Go to Discover →</a></body></html>`)
}