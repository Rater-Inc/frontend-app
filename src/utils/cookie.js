import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setLoginCookie = (
  password,
  nick,
  spaceLink,
  token,
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
  cookies.set(`${spaceLink}_token`, token, {
    expires: expirationDate,
    path: '/',
  });
};

export const setRateCookie = (spaceLink, expirationSeconds = 86400) => {
  const expirationDate = new Date(Date.now() + expirationSeconds * 1000);
  cookies.set(`${spaceLink}_rateInfo`, 'rated', {
    expires: expirationDate,
    path: '/',
  });
};

export const setSpaceDataCookie = (
  mtr,
  ptp,
  spaceLink,
  expirationSeconds = 86400
) => {
  const expirationDate = new Date(Date.now() + expirationSeconds * 1000);
  const spaceData = {
    metric: mtr,
    participant: ptp,
  };
  cookies.set(`${spaceLink}_spaceData`, JSON.stringify(spaceData), {
    expires: expirationDate,
    path: '/',
  });
};