const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== STARTING LOGO TRANSPARENCY PROCESS ===");
try {
  // Install jimp
  console.log("Installing jimp image processor...");
  execSync('npm install jimp@0.22.12', { stdio: 'inherit' });
  console.log("Jimp installed successfully.");

  const Jimp = require('jimp');
  const logoPath = path.join(__dirname, 'client/public/mentR_Logo.png');
  
  if (fs.existsSync(logoPath)) {
    console.log("Logo file found at:", logoPath);
    Jimp.read(logoPath).then(image => {
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // If pixel is close to white (RGB > 220), make it fully transparent
        if (r > 220 && g > 220 && b > 220) {
          this.bitmap.data[idx + 3] = 0;
        }
      });
      image.write(logoPath, () => {
        console.log("=== LOGO BACKGROUND REMOVED SUCCESSFULLY ===");
      });
    }).catch(err => {
      console.error("Error reading/processing image with Jimp:", err);
    });
  } else {
    console.error("Logo file not found at:", logoPath);
  }
} catch (err) {
  console.error("Error installing jimp or running process:", err.message);
}
