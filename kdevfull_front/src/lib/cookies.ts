import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'auth-token';

export const cookieUtils = {
  setToken: (token: string) => {
    Cookies.set(TOKEN_COOKIE_NAME, token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  },

  getToken: (): string | undefined => {
    return Cookies.get(TOKEN_COOKIE_NAME);
  },

  removeToken: () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
  }
};
