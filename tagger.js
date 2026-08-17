const NodeID3 = require('node-id3');

const tags = {
  title: 'Beneath the Chennai Sky',
  artist: 'RIKA AND SRIHARI',
  album: 'Beneath the Chennai Sky',
  image: './album-art.jpg' // Path to the image
};

const file = './track.mp3';

const success = NodeID3.write(tags, file);
if (success) {
  console.log('Successfully updated metadata and embedded album art!');
} else {
  console.log('Failed to update metadata.');
}
