import Auth from '../utils/auth'; // Tambahkan ini untuk ambil token dari localStorage

const BASE_URL = 'https://story-api.dicoding.dev/v1';

const StoryApi = {
  async getStories() {
    const token = Auth.getToken(); // Ambil token dari penyimpanan lokal

    const response = await fetch(`${BASE_URL}/stories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gagal ambil data:', error.message);
      return [];
    }

    const result = await response.json();
    return result.listStory;
  },

  async postStory({ description, photo, lat, lon }) {
    const token = Auth.getToken();
    const formData = new FormData();

    formData.append('description', description);
    formData.append('photo', photo);
    if (lat) formData.append('lat', lat);
    if (lon) formData.append('lon', lon);

    const response = await fetch(`${BASE_URL}/stories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    return response.json();
  }
};

export default StoryApi;
