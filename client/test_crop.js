import sharp from 'sharp';

async function generateCleanMascot() {
  const image = sharp('public/Icon sized mascot.png');
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  
  const outData = Buffer.from(data);
  const visited = new Uint8Array(width * height);
  const queue = [];
  
  for (let x = 0; x < width; x++) {
    queue.push([x, 0]);
    queue.push([x, height - 1]);
    visited[0 * width + x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]);
    queue.push([width - 1, y]);
    visited[y * width + 0] = 1;
    visited[y * width + (width - 1)] = 1;
  }
  
  const isBg = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    return (r >= 238 && g >= 238 && b >= 240);
  };
  
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const pIdx = (cy * width + cx) * channels;
    
    if (isBg(cx, cy)) {
      outData[pIdx + 3] = 0;
      
      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1]
      ];
      
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nIndex = ny * width + nx;
          if (!visited[nIndex]) {
            visited[nIndex] = 1;
            if (isBg(nx, ny)) {
              queue.push([nx, ny]);
            }
          }
        }
      }
    }
  }
  
  // Smooth bilinear anti-aliased edge feathering
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * channels;
      if (outData[idx + 3] > 0) {
        const r = outData[idx], g = outData[idx+1], b = outData[idx+2];
        if (r > 225 && g > 225 && b > 230) {
          const hasZeroNeighbor = 
            outData[((y-1)*width + x)*channels + 3] === 0 ||
            outData[((y+1)*width + x)*channels + 3] === 0 ||
            outData[(y*width + (x-1))*channels + 3] === 0 ||
            outData[(y*width + (x+1))*channels + 3] === 0;
          if (hasZeroNeighbor) {
            const whiteness = (r + g + b) / (3 * 255);
            outData[idx + 3] = Math.round(Math.pow(1 - whiteness, 1.2) * 255);
          }
        }
      }
    }
  }
  
  // Clean WebP WITHOUT artificial harsh sharpening
  await sharp(outData, { raw: { width, height, channels } })
    .trim()
    .webp({ quality: 95, effort: 6 })
    .toFile('public/Icon sized mascot.webp');
    
  await sharp(outData, { raw: { width, height, channels } })
    .trim()
    .png()
    .toFile('public/Icon sized mascot.png');
    
  console.log('Generated clean, smooth mascot assets');
}

generateCleanMascot();
