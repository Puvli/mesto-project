export class Popup {
  constructor(popupSelector) {
    this.popupSelector = document.querySelector(popupSelector);
    this.closeButton = this.popupSelector.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClose(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  open() {
    this.popupSelector.classList.add("popup_opened");
    console.log(this.popupSelector);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", this.close.bind(this));
    this.popupSelector.addEventListener("click", this._handleClose.bind(this));
  }
}
