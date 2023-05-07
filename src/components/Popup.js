export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this.closeButton = this.popupSelector.querySelector(".popup__close-button");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
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
    console.log(this.popupSelector);
  }

  close() {
    // console.log("count");
    this.popupSelector.classList.remove("popup_opened");
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this.popupSelector.addEventListener("click", this._overlayClose.bind(this));
  }
}
