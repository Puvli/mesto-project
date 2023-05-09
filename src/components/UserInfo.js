export class UserInfo {
  constructor( nameSelector, jobSelector, avatarSelector ) {
    this._nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      about: this.jobElement.textContent,
      userId: this._userId,
    };
  };

  setUserInfo(name, about, avatar, _id) {
    this._nameElement.textContent = name;
    this.jobElement.textContent = about;
    this._avatarElement.src = avatar;
    this._userId = _id;
  }
}
