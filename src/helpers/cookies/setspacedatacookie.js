import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
