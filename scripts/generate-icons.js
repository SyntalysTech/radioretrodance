const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const appleSize = 180;

const inputPath = path.join(__dirname, '../logos/logo.png');
const outputDir = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PWA icons from logo...\n');

  // Generate standard icons
  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}.png`);

    await sharp(inputPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 10, g: 10, b: 15, alpha: 1 } // dark background #0a0a0f
      })
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated icon-${size}.png`);
  }

  // Generate Apple touch icon
  const appleOutputPath = path.join(outputDir, `apple-icon-${appleSize}.png`);

  await sharp(inputPath)
    .resize(appleSize, appleSize, {
      fit: 'contain',
      background: { r: 10, g: 10, b: 15, alpha: 1 }
    })
    .png()
    .toFile(appleOutputPath);

  console.log(`✓ Generated apple-icon-${appleSize}.png`);

  // Generate favicon
  const faviconPath = path.join(__dirname, '../public/favicon.ico');

  await sharp(inputPath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 10, g: 10, b: 15, alpha: 1 }
    })
    .png()
    .toFile(path.join(outputDir, 'favicon-32.png'));

  console.log(`✓ Generated favicon-32.png`);

  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
