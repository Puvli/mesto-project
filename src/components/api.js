const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-22",
  headers: {
    authorization: "a86aba58-abf0-4ce7-8347-0d661387097c",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

// export const initiateProfile = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers,
//   }).then((res) => checkResponse(res));
// };

// export const initiateCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers,
//   }).then((res) => checkResponse(res));
// };

// export const updateProfile = (nameoOfProfile, job) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: nameoOfProfile,
//       about: job,
//     }),
//   }).then((res) => checkResponse(res));
// };

// export const updateAvatar = (link) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar: link,
//     }),
//   }).then((res) => checkResponse(res));
// };

// export const addNewPhotoCard = (cardName, cardLink) => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: "POST",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: cardName,
//       link: cardLink,
//     }),
//   }).then((res) => checkResponse(res));
// };

// export const deleteMyCards = (id) => {
//   return fetch(`${config.baseUrl}/cards/${id}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then((res) => checkResponse(res));
// };

// export const addServerLike = (id) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//     method: "PUT",
//     headers: config.headers,
//   }).then((res) => checkResponse(res));
// };

// export const removeLike = (id) => {
//   return fetch(`${config.baseUrl}/cards/likes/${id}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then((res) => checkResponse(res));
// };

//====================================CLASS=============================================================
export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  initiateProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then((res) => checkResponse(res));
  };

  initiateCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then((res) => checkResponse(res));
  };

  updateProfile = (nameoOfProfile, job) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: nameoOfProfile,
        about: job,
      }),
    }).then((res) => checkResponse(res));
  };

  updateAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => checkResponse(res));
  };

  addNewPhotoCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => checkResponse(res));
  };

  deleteMyCards = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => checkResponse(res));
  };

  addServerLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: config.headers,
    }).then((res) => checkResponse(res));
  };

  removeLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: config.headers,
    }).then((res) => checkResponse(res));
  };
}

export const api = new Api(config);
