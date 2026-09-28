import sharp from 'sharp';
import fs from 'fs';

console.log('Generating PNGs for Uptodown & PWABuilder...');

// Ensure public exists
if (!fs.existsSync('public')) fs.mkdirSync('public');

// Try to use icon.svg if exists, else create yellow icon with KLA text
try {
  if (fs.existsSync('public/icon.svg')) {
    const svg = fs.readFileSync('public/icon.svg');
    await sharp(svg).resize(192,192).png().toFile('public/icon-192.png');
    await sharp(svg).resize(512,512).png().toFile('public/icon-512.png');
    console.log('Generated from icon.svg');
  } else {
    throw new Error('no svg');
  }
} catch (e) {
  // Fallback: create PNG from scratch (no SVG needed)
  console.log('Creating fallback PNGs...');
  const createIcon = async (size, file) => {
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 204, b: 0, alpha: 1 }
      }
    })
    .composite([{
      input: Buffer.from(`<svg width="${size}" height="${size}"><text x="50%" y="55%" font-family="Arial" font-weight="900" font-size="${size*0.3}" text-anchor="middle" fill="black">KLA</text></svg>`),
      blend: 'over'
    }])
    .png().toFile(file);
  };
  await createIcon(192, 'public/icon-192.png');
  await createIcon(512, 'public/icon-512.png');
}

console.log('✅ Icons ready: icon-192.png, icon-512.png - Uptodown compliant');