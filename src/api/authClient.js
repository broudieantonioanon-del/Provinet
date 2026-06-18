// Lightweight client-side auth used by the portal demo.
//
// This replaces the original no-code backend SDK. It keeps users and the
// active session in localStorage so the login / register / portal flow works
// end-to-end when the app is run locally, with no external service required.
//
// To connect a real backend, replace the method bodies below with calls to
// your own API (the rest of the app only depends on this interface).

const USERS_KEY = "portal_users";
const SESSION_KEY = "portal_session";

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  } catch {
    return {};
  }
};

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const nameFromEmail = (email) =>
  (email || "").split("@")[0].replace(/[._-]+/g, " ").trim();

const setSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const auth = {
  // Returns the currently signed-in user, or throws if there is none.
  async me() {
    await wait();
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) {
      const error = new Error("Not authenticated");
      error.status = 401;
      throw error;
    }
    return JSON.parse(raw);
  },

  async loginViaEmailPassword(email, password) {
    await wait();
    const users = readUsers();
    const record = users[email.toLowerCase()];
    if (!record || record.password !== password) {
      throw new Error("Correo o contraseña incorrectos");
    }
    setSession(record.user);
    return record.user;
  },

  // Demo social login: creates / reuses a local account, then redirects.
  loginWithProvider(provider, redirect = "/portal") {
    const email = `usuario.${provider}@example.com`;
    const users = readUsers();
    const user = users[email]?.user || {
      id: crypto.randomUUID(),
      email,
      full_name: nameFromEmail(email),
      role: "user",
    };
    users[email] = { password: null, user };
    writeUsers(users);
    setSession(user);
    window.location.href = redirect;
  },

  async register({ email, password }) {
    await wait();
    const key = email.toLowerCase();
    const users = readUsers();
    if (users[key]) {
      throw new Error("Ya existe una cuenta con este correo");
    }
    const user = {
      id: crypto.randomUUID(),
      email: key,
      full_name: nameFromEmail(key),
      role: "user",
    };
    users[key] = { password, user, verified: false };
    writeUsers(users);
    return { email: key };
  },

  // Demo verification: any 6-digit code is accepted.
  async verifyOtp({ email, otpCode }) {
    await wait();
    if (!/^\d{6}$/.test(otpCode || "")) {
      throw new Error("Código de verificación inválido");
    }
    const key = email.toLowerCase();
    const users = readUsers();
    const record = users[key];
    if (!record) {
      throw new Error("Cuenta no encontrada");
    }
    record.verified = true;
    writeUsers(users);
    setSession(record.user);
    return { access_token: `demo-${record.user.id}` };
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  async resendOtp() {
    await wait();
    return true;
  },

  async resetPasswordRequest() {
    await wait();
    return true;
  },

  async resetPassword({ resetToken, newPassword }) {
    await wait();
    if (!resetToken || !newPassword) {
      throw new Error("No se pudo restablecer la contraseña");
    }
    return true;
  },

  logout(redirect) {
    clearSession();
    localStorage.removeItem("token");
    if (redirect) {
      window.location.href = redirect;
    }
  },

  redirectToLogin(redirect = "/login") {
    window.location.href = redirect;
  },
};
