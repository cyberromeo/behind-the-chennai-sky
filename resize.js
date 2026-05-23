const sharp = require('sharp');

async function main() {
  try {
    await sharp('album-art.jpg')
      .resize(800, 800) // Square aspect ratio
      .jpeg({ quality: 80 })
      .toFile('og-image.jpg');
    console.log('Created square og-image.jpg successfully!');
  } catch (err) {
    console.error('Error resizing image:', err);
  }
}

main();
