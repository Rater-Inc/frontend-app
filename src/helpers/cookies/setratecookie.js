import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setRateCookie = (spaceLink, expirationSeconds = 86400) => {
  const expirationDate = new Date(Date.now() + expirationSeconds * 1000);
  cookies.set(`${spaceLink}_rateInfo`, 'rated', {
    expires: expirationDate,
    path: '/',
  });
};
