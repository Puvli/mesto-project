const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-22",
  headers: {
    authorization: "a86aba58-abf0-4ce7-8347-0d661387097c",
    "Content-Type": "application/json",
  },
};

// export const checkCard = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers,
//   }); 
// }

export const initiateProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
};

export const inititateCards = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-22/cards", {
    headers: {
      authorization: "a86aba58-abf0-4ce7-8347-0d661387097c",
    },
  });
};

export const updateProfile = (nameoOfProfile, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameoOfProfile,
      about: job,
    }),
  });
};

export const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
};

export const addNewPhotoCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  });
};

export const deleteMyCards = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addServerLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const removeLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
};
