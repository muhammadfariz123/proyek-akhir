import StoryApi from '../../data/story-api';
import '../../../styles/pages/add-page.css'; // tambahkan ini agar pakai styling eksternal

const AddPage = {
  async render() {
    return `
      <section class="add-container">
        <h1 class="add-title">📸 Tambah Cerita</h1>
        <form id="story-form" class="add-form">
          <label for="name">Nama:</label>
          <input type="text" id="name" name="name" required />

          <label for="description">Deskripsi:</label>
          <textarea id="description" name="description" required></textarea>

          <label for="photo">Foto:</label>
          <div class="camera-wrapper">
            <video id="camera-stream" autoplay playsinline></video>
            <canvas id="canvas" style="display:none;"></canvas>
            <button type="button" id="take-photo" class="btn">Ambil Foto</button>
          </div>

          <label>Lokasi:</label>
          <div id="map" class="map-area"></div>

          <input type="hidden" id="lat" name="lat">
          <input type="hidden" id="lon" name="lon">

          <button type="submit" class="btn submit-btn">Kirim Cerita</button>
        </form>
      </section>
    `;
  },

  async afterRender() {
    const AddPresenter = (await import('./add-presenter')).default;
    AddPresenter.init();

    // Pastikan kamera mati ketika user keluar dari halaman
    window.addEventListener('hashchange', () => {
      AddPresenter.stopCamera();
    });
  }
};

export default AddPage;
