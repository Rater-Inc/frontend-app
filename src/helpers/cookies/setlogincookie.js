import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setLoginCookie = (
  password,
  nick,
  spaceLink,
  expirationSeconds = 86400
) => {
  const expirationDate = new Date(Date.now() + expirationSeconds * 1000);

  cookies.set(`${spaceLink}_password`, password, {
    expires: expirationDate,
    path: '/',
  });
  cookies.set(`${spaceLink}_auth`, true, {
    expires: expirationDate,
    path: '/',
  });
  cookies.set(`${spaceLink}_nickname`, nick, {
    expires: expirationDate,
    path: '/',
  });
};
