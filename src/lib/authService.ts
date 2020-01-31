// https://frontarm.com/navi/en/guides/authenticated-routes/#bypassing-the-login-screen

export class AuthService {
  private currentUser;
  private callback;

  constructor() {
    try {
      this.currentUser = JSON.parse(window.localStorage.getItem("auth"));
    } catch (e) {}

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async login(data) {
    window.localStorage.setItem("auth", JSON.stringify(data));
    this.currentUser = data;
    if (this.callback) {
      this.callback(data);
    }
  }

  logout() {
    delete this.currentUser;

    window.localStorage.clear();
    if (this.callback) {
      this.callback(undefined);
    }
  }

  subscribe(callback) {
    this.callback = callback;
    return () => {
      this.callback = undefined;
    };
  }
}
