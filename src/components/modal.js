import { closeByEscape } from "./card";
import { api } from "./api";
import { renderLoading } from "./utils";

export function closePopup(popup) {
  // const openedPopup = document.querySelector(".popup_opened");
  // popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
  // popup.classList.remove("popup_opened");
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  // const openedPopup = document.querySelector(".popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

// export function closeEscButton(popup) {
//   document.addEventListener("keydown", (evt) => {
//     if (evt.key === "Escape") {
//       closePopup(popup);
//     }
//   });
// }

// ========================== CLASS ===========================
let i = 0;
export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.closeButton = this.popupSelector.querySelector(".popup__close-button");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      // this.popupSelector.classList.remove("popup_opened");
      // // this.close(this);
      // console.log("count");
      this.close();
    }
  }

  _overlayClose(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  open() {
    this.popupSelector.classList.add("popup_opened");
    // const openedPopup = document.querySelector(".popup_opened");
    // document.addEventListener("keydown", closeByEscape);
    console.log(this.popupSelector);

    // document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    // i++;
    console.log("count");
    this.popupSelector.classList.remove("popup_opened");
    // document.removeEventListener("keydown", this._handleEscClose.bind(this));
    // this.closeButton.removeEventListener("click", this.close.bind(this));
  }

  setEventListeners(popup) {
    this.closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this.popupSelector.addEventListener("click", this._overlayClose.bind(this));
  }
}

export class PopupWithImage extends Popup {
  // constructor(popupSelector) {
  //   super(popupSelector);
  //   this.popupSelector = popupSelector;
  // }

  open(picture, pictureName) {
    // const picture = this.selector.querySelector(".element__img");
    // const pictureName = this.selector.querySelector(".element__feedback-heading");
    const openingPictureName = document.querySelector(".picture-popup__name");
    const openingPicture = document.querySelector(".picture-popup__image");
    // picture.addEventListener("click", function () {
    openingPicture.src = picture.src;
    openingPictureName.textContent = pictureName.textContent;
    openingPicture.setAttribute("alt", pictureName.textContent);
    this.popupSelector.classList.add("popup_opened");
    // document.addEventListener("keydown", this._handleEscClose.bind(this));
    // this.closeButton.removeEventListener("click", this.close);

    // this.open();
    // });
  }
}

// ========================== CLASS POPUPWITHFORM ========================

export class PopupWithForm extends Popup {
  constructor(popupSelector, callBackForm) {
    super(popupSelector);
    this.callBackForm = callBackForm;
    this.button = this.popupSelector.querySelector(".popup__button");
    this.form = this.popupSelector.querySelector(".popup__form");
  }

  close() {
    // evt.target.reset();
    this.popupSelector.classList.remove("popup_opened");
    this.button.disabled = true;
    this.button.classList.add("popup__button_inactive");
  }

  _getInputValues() {
    const values = [];
    const inputs = Array.from(
      this.popupSelector.querySelectorAll(".popup input")
    );
    inputs.forEach((item) => {
      values.push(item.value);
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    // this.closeButton.addEventListener("click", this.close.bind(this));
    // document.addEventListener("keydown", this._handleEscClose.bind(this));
    // this.popupSelector.addEventListener("click", this._overlayClose.bind(this));
    // const button = this.popupSelector.querySelector(".popup__button");

    this.form.addEventListener("submit", (evt) => {
      this.callBackForm.call(this, evt, this._getInputValues(), this);
    });
  }
}

// ===================================== CLASS USERINFO ===============================

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
