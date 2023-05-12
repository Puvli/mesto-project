import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, callBackForm) {
    super(popupSelector);
    this.callBackForm = callBackForm;
    this.button = this.popupSelector.querySelector(".popup__button");
    this.form = this.popupSelector.querySelector(".popup__form");
    this.buttonText = this.button.textContent;
    this.inputList = Array.from(this.form.querySelectorAll(".popup__input"));
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this.button.textContent = loadingText;
    } else {
      this.button.textContent = this.buttonText;
    }
  }

  _getInputValues() {
    const values = [];
    this.inputList.forEach((item) => {
      values.push(item.value);
    });

    return values;
  }

  close() {
    super.close();
    this.form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      this.callBackForm.call(this, evt, this._getInputValues(), this);
    });
  }
}
