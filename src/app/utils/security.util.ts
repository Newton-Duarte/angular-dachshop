import { User } from "../models/user.model";

const LOCAL_STORAGE_DACHSHOP_USER = 'dachshop.user';
const LOCAL_STORAGE_DACHSHOP_TOKEN = 'dachshop.token';

export class Security {
  public static set(user: User, token: string) {
    const data = JSON.stringify(user);

    localStorage.setItem(LOCAL_STORAGE_DACHSHOP_USER, btoa(data));
    localStorage.setItem(LOCAL_STORAGE_DACHSHOP_TOKEN, token);
  }

  public static setUser(user: User) {
    const data = JSON.stringify(user);
    localStorage.setItem(LOCAL_STORAGE_DACHSHOP_USER, btoa(data));
  }

  public static setToken(token: string) {
    localStorage.setItem(LOCAL_STORAGE_DACHSHOP_TOKEN, token);
  }

  public static getUser(): User | null {
    const data = localStorage.getItem(LOCAL_STORAGE_DACHSHOP_USER);

    if (data) {
      return JSON.parse(atob(data));
    } else {
      return null;
    }
  }

  public static getToken(): string | null {
    const data = localStorage.getItem(LOCAL_STORAGE_DACHSHOP_TOKEN);

    if (data) {
      return data;
    } else {
      return null;
    }
  }

  public static hasToken(): boolean {
    return !!this.getToken();
  }

  public static clear() {
    localStorage.removeItem(LOCAL_STORAGE_DACHSHOP_USER);
    localStorage.removeItem(LOCAL_STORAGE_DACHSHOP_TOKEN);
  }
}
