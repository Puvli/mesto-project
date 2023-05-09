export class UserInfo {
  constructor(selectorUser, selectorInformation) {
    this.selectorUser = selectorUser;
    this.selectorInformation = selectorInformation;
  }

  getUserInfo(jobValue, nameValue, api) {
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

  setUserInfo(inputName, inputInform, api) {
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
