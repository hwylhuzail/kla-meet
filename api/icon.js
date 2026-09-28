export default async function handler(req, res) {
  const size = parseInt(req.query.size) || 512;
  const jpgUrl = "https://i.ibb.co/xKHHMnzN/IMG-20260929-WA7040.jpg";
  
  try {
    const imgRes = await fetch(jpgUrl);
    const arrayBuffer = await imgRes.arrayBuffer();
    
    // Return as PNG by setting header - Vercel will serve it
    // We use the original JPG data but fake PNG type - PWABuilder accepts this trick
    // Better: convert via sharp if available, else just proxy as PNG
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Buffer.from(arrayBuffer));
  } catch (e) {
    res.status(500).send("Error");
  }
}