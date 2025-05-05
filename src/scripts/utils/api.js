const BASE_URL = 'https://story-api.dicoding.dev/v1';

const Api = {
  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    return await response.json();
  },

  async register({ name, email, password }) {
    const response = await fetch('https://story-api.dicoding.dev/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
  
    return response.json();
  },

  async getStories() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/stories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return await response.json();
  }

  

  // nanti bisa tambah: postStory, detailStory, dsb.
};

export default Api;
