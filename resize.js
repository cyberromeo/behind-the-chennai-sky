const sharp = require('sharp');

async function main() {
  try {
    await sharp('album-art.jpg')
      .resize(1200, 630)
      .jpeg({ quality: 80 })
      .toFile('og-image.jpg');
    console.log('Created og-image.jpg successfully!');
  } catch (err) {
    console.error('Error resizing image:', err);
  }
}

main();
