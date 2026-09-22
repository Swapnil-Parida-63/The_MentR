import sharp from 'sharp';
import fs from 'fs';

async function listAll() {
  const files = fs.readdirSync('public');
  for (const f of files) {
    if (f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.jpeg')) {
      const meta = await sharp('public/' + f).metadata();
      console.log(`${f.padEnd(45)}: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`);
    }
  }
}
listAll();
