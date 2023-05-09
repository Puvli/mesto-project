import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(picture, pictureName) {
    super.open();
    this.openingPictureName = document.querySelector(".picture-popup__name");
    this.openingPicture = document.querySelector(".picture-popup__image");

    this.openingPicture.src = picture.src;
    this.openingPictureName.textContent = pictureName.textContent;
    this.openingPicture.setAttribute("alt", pictureName.textContent);
    // this.popupSelector.classList.add("popup_opened");
  }
}
