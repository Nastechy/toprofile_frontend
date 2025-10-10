// export const addTokenTOLocalStorage = (token) => {
//     localStorage.setItem("token", JSON.stringify(token));
//   };
//   export const getTokenTOLocalStorage = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       return JSON.parse(token);
//     }
//   };
//   export const removeTokenFromLocalStorage = () => {
//     localStorage.removeItem("token");
//   };

// src/components/utils/storage.js
const hasStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const addTokenTOLocalStorage = (token) => {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem('token', JSON.stringify(token));
  } catch {}
};

export const getTokenTOLocalStorage = () => {
  if (!hasStorage()) return null;
  try {
    const v = window.localStorage.getItem('token');
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
};

export const removeTokenFromLocalStorage = () => {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem('token');
  } catch {
    console.log('kkk');
  }
};
