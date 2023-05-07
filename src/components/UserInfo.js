import { api } from "./index.js";

export class UserInfo {
  constructor(selectorUser, selectorInformation) {
    this.selectorUser = selectorUser;
    this.selectorInformation = selectorInformation;
  }

  getUserInfo(jobValue, nameValue) {
    return api
      .initiateProfile()
      .then((res) => {
        jobValue.value = res.about;
        nameValue.value = res.name;
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершаться ошибкой

        console.log(err);
      });
  }

  setUserInfo(inputName, inputInform) {
    return api
      .updateProfile(inputName, inputInform)
      .then((res) => {
        this.selectorInformation.textContent = res.about;
        this.selectorUser.textContent = res.name;
        // closePopup(popupProfile);
        console.log("test", res);
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершаться ошибкой

        console.log(err);
      });
  }
}
