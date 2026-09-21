const fs = require('fs');
let path = 'app/welcome/page.tsx';
if(!fs.existsSync(path)) path = 'app/page.tsx';
let content = fs.readFileSync(path,'utf8');

// Replace footer text with links
content = content.replace(/SAFETY/g, `<a href="/safety" style={{color:"inherit", textDecoration:"underline"}}>SAFETY</a>`);
content = content.replace(/GUIDELINES/g, `<a href="/guidelines" style={{color:"inherit", textDecoration:"underline"}}>GUIDELINES</a>`);
content = content.replace(/TERMS/g, `<a href="/terms" style={{color:"inherit", textDecoration:"underline"}}>TERMS</a>`);

// Fix bottom nav - make them active Next.js Links (if using divs)
content = content.replace(/Discover/g, `<a href="/discover">Discover</a>`);
content = content.replace(/Match/g, `<a href="/matches">Match</a>`);

fs.writeFileSync(path, content);
console.log("Fixed: "+path);
