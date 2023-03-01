import { initialCards } from "./initialCards.js";
import { closeEscButton, closePopup, openPopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { addCard, createCard } from "./card.js";
const popupProfile = document.querySelector(".popup");

const popupPictures = document.querySelector(".picture-popup");
const cardPopup = document.querySelector(".card-popup");

popupPictures.addEventListener("click", function (evt) {
  if (!evt.target.classList.contains("picture-popup__image")) {
    closePopup(popupPictures);
  }
});

cardPopup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card-popup")) {
    closePopup(cardPopup);
  }
});

popupProfile.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(popupProfile);
  }
});

const popupProfileCloseButton = document.querySelector(".popup__close-button");
popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

const popupProfileOpenButton = document.querySelector(".profile__info-button");
popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupProfile);
  closeEscButton(popupProfile);
});

const formProfile = document.querySelector(".popup__form");

const nameInput = formProfile.querySelector(".popup__user-name");
const jobInput = formProfile.querySelector(".popup__user-activity");
nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "popup_type_error",
  errorClass: "popup__error_active",
});

enableValidation({
  formSelector: ".card-popup__form",
  inputSelector: ".card-popup__input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "card-popup_type_error",
  errorClass: "card-popup__error_active",
});

const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-activity");

function formSubmitHandler(evt) {
  evt.preventDefault();
  const job = jobInput.value;
  const name = nameInput.value;
  profileJob.textContent = `${job}`;
  profileName.textContent = `${name}`;
  closePopup(popupProfile);
}

const newCard = document.querySelector(".card-popup");

const addingButton = document.querySelector(".profile__add-button");
addingButton.addEventListener("click", function () {
  openPopup(newCard);
  closeEscButton(newCard);
});
const popupClosingButton = document.querySelector(".card-popup__close-button");
popupClosingButton.addEventListener("click", function () {
  closePopup(newCard);
});

const formCardElement = document.querySelector(".card-popup__form");
const itemName = document.querySelector(".card-popup__item-name");
const itemLink = document.querySelector(".card-popup__item-link");

const picturePopup = document.querySelector(".picture-popup");
const pictureButtonClose = document.querySelector(
  ".picture-popup__close-button"
);
pictureButtonClose.addEventListener("click", function () {
  closePopup(picturePopup);
});

const cards = document.querySelector(".elements");

for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i]);
  addCard(card, cards);
}

function formCardHandler(evt) {
  evt.preventDefault();
  const itemNewName = itemName.value;
  const itemNewLink = itemLink.value;
  const newObj = {};
  newObj["name"] = itemNewName;
  newObj["link"] = itemNewLink;
  const card = createCard(newObj);
  addCard(card, cards);
  closePopup(newCard);
  itemName.value = "";
  itemLink.value = "";
}

formProfile.addEventListener("submit", formSubmitHandler);
formCardElement.addEventListener("submit", formCardHandler);
