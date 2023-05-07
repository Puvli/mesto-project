
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
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  };

  initiateCards = () => {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  };

  updateProfile = (nameoOfProfile, job) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: nameoOfProfile,
        about: job,
      }),
    }).then((res) => this.checkResponse(res));
  };

  updateAvatar = (link) => {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this.checkResponse(res));
  };

  addNewPhotoCard = (cardName, cardLink) => {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => this.checkResponse(res));
  };

  deleteMyCards = (id) => {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  };

  addServerLike = (id) => {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  };

  removeLike = (id) => {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.checkResponse(res));
  };
}

