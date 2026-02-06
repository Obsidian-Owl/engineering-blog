/**
 * Generate circular masked favicon icons from macattak.png
 * Creates multiple sizes for different use cases using Sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateCircularIcon(inputPath, outputPath, size) {
  // Create a circular mask SVG
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`
  );

  // Process image: resize and apply circular mask
  await sharp(inputPath)
    .resize(size, size, {
      fit: 'cover',
      position: 'center',
    })
    .composite([
      {
        input: circleMask,
        blend: 'dest-in',
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ Created ${path.basename(outputPath)} (${size}x${size})`);
}

async function generateFavicon(inputPath, outputPath, size = 32) {
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`
  );

  await sharp(inputPath)
    .resize(size, size, {
      fit: 'cover',
      position: 'center',
    })
    .composite([
      {
        input: circleMask,
        blend: 'dest-in',
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ Created ${path.basename(outputPath)} (${size}x${size})`);
}

async function main() {
  const rootDir = path.join(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const faviconsDir = path.join(rootDir, 'assets', 'img', 'favicons');
  const inputImage = path.join(publicDir, 'macattak.png');

  console.log('🎨 Generating circular favicon icons for Chirpy theme...\n');

  // Verify input exists
  if (!fs.existsSync(inputImage)) {
    console.error(`❌ Error: ${inputImage} not found`);
    process.exit(1);
  }

  // Create favicons directory if it doesn't exist
  if (!fs.existsSync(faviconsDir)) {
    fs.mkdirSync(faviconsDir, { recursive: true });
  }

  try {
    // Generate all required favicon sizes for Chirpy theme
    await generateFavicon(inputImage, path.join(faviconsDir, 'favicon.ico'), 32);
    await generateCircularIcon(inputImage, path.join(faviconsDir, 'favicon-16x16.png'), 16);
    await generateCircularIcon(inputImage, path.join(faviconsDir, 'favicon-32x32.png'), 32);
    await generateCircularIcon(inputImage, path.join(faviconsDir, 'favicon-96x96.png'), 96);
    await generateCircularIcon(inputImage, path.join(faviconsDir, 'apple-touch-icon.png'), 180);
    await generateCircularIcon(inputImage, path.join(faviconsDir, 'android-chrome-192x192.png'), 192);
    await generateCircularIcon(inputImage, path.join(faviconsDir, 'android-chrome-512x512.png'), 512);
    await generateCircularIcon(inputImage, path.join(faviconsDir, 'mstile-150x150.png'), 150);

    // Also update the avatar with circular mask
    const avatarDir = path.join(rootDir, 'assets', 'img');
    await generateCircularIcon(inputImage, path.join(avatarDir, 'avatar.png'), 512);

    console.log('\n✅ All icons generated successfully!');
    console.log('\nFiles created in assets/img/favicons/:');
    console.log('  • favicon.ico (32x32)');
    console.log('  • favicon-16x16.png');
    console.log('  • favicon-32x32.png');
    console.log('  • favicon-96x96.png');
    console.log('  • apple-touch-icon.png (180x180)');
    console.log('  • android-chrome-192x192.png');
    console.log('  • android-chrome-512x512.png');
    console.log('  • mstile-150x150.png');
    console.log('\nAlso updated:');
    console.log('  • assets/img/avatar.png (512x512)');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

main();
