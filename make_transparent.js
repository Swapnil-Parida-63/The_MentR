const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const logFile = path.join(__dirname, 'log_transparency.txt');
function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

fs.writeFileSync(logFile, '=== STARTING LOGO TRANSPARENCY PROCESS ===\n');

try {
  let Jimp;
  try {
    Jimp = require('jimp');
    log("Jimp is already installed.");
  } catch (e) {
    log("Jimp is not installed. Installing jimp...");
    execSync('npm install jimp@0.22.12', { stdio: 'inherit' });
    Jimp = require('jimp');
    log("Jimp installed successfully.");
  }

  const sourcePath = path.join(__dirname, 'client/public/Gemini_Generated_Image_mm0n9tmm0n9tmm0n.png');
  const outputPath = path.join(__dirname, 'client/public/mentR_Logo.png');
  
  if (fs.existsSync(sourcePath)) {
    log("Source logo file found at: " + sourcePath);
    Jimp.read(sourcePath).then(image => {
      log("Image loaded successfully. Dimensions: " + image.bitmap.width + "x" + image.bitmap.height);
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // If pixel is close to white (RGB > 240), make it fully transparent
        if (r > 240 && g > 240 && b > 240) {
          this.bitmap.data[idx + 3] = 0;
        }
      });
      image.write(outputPath, () => {
        log("=== NEW TRANSPARENT LOGO WRITTEN SUCCESSFULLY ===");
      });
    }).catch(err => {
      log("Error processing image with Jimp: " + err.message);
    });
  } else {
    log("Source logo file not found at: " + sourcePath);
  }
} catch (err) {
  log("Fatal error in transparency process: " + err.message);
}
