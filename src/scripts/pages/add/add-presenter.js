import L from 'leaflet';
import StoryApi from '../../data/story-api';

let stream; // Diangkat keluar agar bisa diakses di luar init

const AddPresenter = {
  async init() {
    const video = document.getElementById('camera-stream');
    const canvas = document.getElementById('canvas');
    const takePhotoBtn = document.getElementById('take-photo');
    const form = document.getElementById('story-form');

    let selectedLat = null;
    let selectedLon = null;
    let marker = null;

    // --- Init Kamera ---
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (err) {
      alert('Gagal mengakses kamera: ' + err.message);
    }

    // --- Init Peta ---
    const map = L.map('map').setView([-6.2, 106.8], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    map.on('click', (e) => {
      selectedLat = e.latlng.lat;
      selectedLon = e.latlng.lng;

      document.getElementById('lat').value = selectedLat;
      document.getElementById('lon').value = selectedLon;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }

      marker.bindPopup(`<strong>Lokasi dipilih</strong><br>Lat: ${selectedLat}<br>Lon: ${selectedLon}`).openPopup();
    });

    // --- Ambil Foto dari Stream ---
    let photoBlob = null;

    takePhotoBtn.addEventListener('click', () => {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        photoBlob = blob;
        alert('Foto berhasil diambil!');
      }, 'image/jpeg');
    });

    // --- Submit Form ---
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const description = document.getElementById('description').value;
      const lat = document.getElementById('lat').value;
      const lon = document.getElementById('lon').value;

      if (!photoBlob) {
        alert('Ambil foto terlebih dahulu.');
        return;
      }

      const response = await StoryApi.postStory({
        description,
        photo: photoBlob,
        lat,
        lon
      });

      if (!response.error) {
        alert('Cerita berhasil dikirim!');
        // Hentikan kamera
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        window.location.hash = '#/home';
      } else {
        alert('Gagal kirim cerita: ' + response.message);
      }
    });
  },

  stopCamera() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }
  }
};

export default AddPresenter;
