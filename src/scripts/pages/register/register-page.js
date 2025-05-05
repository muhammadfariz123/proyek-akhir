import Api from '../../utils/api';

const RegisterPage = {
  async render() {
    return `
      <section>
        <h2>Register</h2>
        <form id="registerForm">
          <label for="name">Nama:</label>
          <input type="text" id="name" name="name" required />
          
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />
          
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required minlength="8"/>
          
          <button type="submit">Daftar</button>
        </form>
        <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </section>
    `;
  },

  async afterRender() {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;

      try {
        const response = await Api.register({ name, email, password });
        if (!response.error) {
          alert('Registrasi berhasil! Silakan login.');
          window.location.href = '#/login';
        } else {
          alert('Gagal registrasi: ' + response.message);
        }
      } catch (err) {
        alert('Terjadi kesalahan: ' + err.message);
      }
    });
  }
};

export default RegisterPage;
