import Auth from '../../utils/auth';
import Api from '../../utils/api';

const LoginPage = {
  async render() {
    return `
      <section class="login-page">
        <h2>Login</h2>
        <form id="loginForm">
          <input type="email" id="email" placeholder="Email" required />
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
        <p id="loginMessage"></p>
      </section>
    `;
  },

  async afterRender() {
    // 🔐 Cek jika user sudah login
    const token = Auth.getToken();
    if (token) {
      window.location.hash = '#/home';
      return;
    }

    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const result = await Api.login({ email, password });

        if (!result.error) {
          Auth.saveToken(result.loginResult.token);
          window.location.hash = '#/home';
        } else {
          message.textContent = result.message;
        }
      } catch (err) {
        message.textContent = 'Login gagal: ' + err.message;
      }
    });
  }
};

export default LoginPage;
