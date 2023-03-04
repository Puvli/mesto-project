import { openPopup, closePopup } from "./modal.js";

const picturePopup = document.querySelector(".picture-popup");
const openingPicture = document.querySelector(".picture-popup__image");
const openingPictureName = document.querySelector(".picture-popup__name");
const cardTemplate = document.querySelector(".template").content;

export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function deleteCards(temp) {
  const delButton = temp.querySelector(".element__bucket");
  delButton.addEventListener("click", function () {
    temp.remove();
  });
}

export function addLike(card) {
  const likeButton = card.querySelector(".element__feedback-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__feedback-like_active");
  });
}

export function openPictures(card) {
  const picture = card.querySelector(".element__img");
  // const openingPicture = document.querySelector(".picture-popup__image");
  const pictureName = card.querySelector(".element__feedback-heading");
  // const openingPictureName = document.querySelector(".picture-popup__name");
  picture.setAttribute("alt", pictureName.textContent);
  picture.addEventListener("click", function () {
    openingPicture.src = picture.src;
    openingPictureName.textContent = pictureName.textContent;
    openingPicture.setAttribute("alt", pictureName.textContent);

    openPopup(picturePopup);
    // closeByEscape();
  });
}

export function createCard(obj) {
  // const cardTemplate = document.querySelector(".template").content;
  const template = cardTemplate.querySelector(".element").cloneNode(true);
  template.querySelector(".element__img").src = obj.link;
  template.querySelector(".element__feedback-heading").textContent = obj.name;
  openPictures(template);
  addLike(template);
  deleteCards(template);
  return template;
}

export function addCard(card, container) {
  container.prepend(card);
}
