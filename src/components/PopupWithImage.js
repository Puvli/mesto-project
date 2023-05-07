import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(picture, pictureName) {
    const openingPictureName = document.querySelector(".picture-popup__name");
    const openingPicture = document.querySelector(".picture-popup__image");

    openingPicture.src = picture.src;
    openingPictureName.textContent = pictureName.textContent;
    openingPicture.setAttribute("alt", pictureName.textContent);
    this.popupSelector.classList.add("popup_opened");
  }
}
