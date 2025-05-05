const TOKEN_KEY = 'token';

const Auth = {
  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

export default Auth;
