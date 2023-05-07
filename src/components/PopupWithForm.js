import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callBackForm) {
    super(popupSelector);
    this.callBackForm = callBackForm;
    this.button = this.popupSelector.querySelector(".popup__button");
    this.form = this.popupSelector.querySelector(".popup__form");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.button.textContent = "Сохранение...";
    } else {
      this.button.textContent = "Сохранить";
      if (this.button.classList.contains("card-popup__form-button")) {
        this.button.textContent = "Создать";
      }
    }
  }

  _getInputValues() {
    const values = [];
    const inputs = Array.from(
      this.popupSelector.querySelectorAll(".popup__input")
    );
    inputs.forEach((item) => {
      values.push(item.value);
    });

    return values;
  }

  close() {
    const inputs = Array.from(
      this.popupSelector.querySelectorAll(".popup__input")
    );
    inputs.forEach((item) => {
      item.value = "";
    });
    this.popupSelector.classList.remove("popup_opened");
    this.button.disabled = true;
    this.button.classList.add("popup__button_inactive");
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      this.callBackForm.call(this, evt, this._getInputValues(), this);
    });
  }
}
