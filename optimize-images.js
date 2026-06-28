const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public/images/services');

async function optimizeInPlace() {
  console.log("🚀 Starting image optimization...\n");

  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const filePath = path.join(imagesDir, file);
      const outputPath = path.join(imagesDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

      try {
        await sharp(filePath)
          .resize(1400, null, { withoutEnlargement: true, fit: 'inside' }) // Max width 1400px
          .webp({ quality: 82, effort: 4 }) // Good quality + compression
          .toFile(outputPath);

        // Delete original file
        fs.unlinkSync(filePath);

        console.log(`✅ Optimized & replaced: ${file} → ${path.basename(outputPath)}`);
      } catch (err) {
        console.error(`❌ Failed to optimize ${file}:`, err.message);
      }
    }
  }

  console.log("\n🎉 Optimization completed! All images are now WebP.");
}

optimizeInPlace().catch(console.error);