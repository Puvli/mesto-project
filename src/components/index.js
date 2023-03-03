import "../styles/index.css";
import { initialCards } from "./initialCards.js";
import { closePopup, openPopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { addCard, createCard } from "./card.js";

const addButton = new URL("../images/AddButtonVector.svg", import.meta.url);
const closeIcon = new URL("../images/Close-Icon.svg", import.meta.url);
const coloredLike = new URL("../images/ColoredLike.svg", import.meta.url);
const editPen = new URL("../images/editPen.svg", import.meta.url);
const group = new URL("../images/Group.svg", import.meta.url);
const like = new URL("../images/Like.svg", import.meta.url);
const logo = new URL("../images/logo.svg", import.meta.url);
const vector = new URL("../images/Vector.svg", import.meta.url);
const jak = new URL("../images/image.jpg", import.meta.url);
const bucket = new URL("../images/image.jpg", import.meta.url);

const images = [
  { name: "add", link: addButton },
  { name: "close", link: closeIcon },
  { name: "editPen", link: editPen },
  { name: "group", link: group },
  { name: "like", link: like },
  { name: "logo", link: logo },
  { name: "vector", link: vector },
  { name: "coloredLike", link: coloredLike },
  { name: "Jak", link: jak },
];

const popupProfile = document.querySelector(".profile-popup");

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
  if (evt.target.classList.contains("profile-popup")) {
    closePopup(popupProfile);
  }
});

const popupProfileCloseButton = document.querySelector(
  ".profile-popup__close-button"
);
popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

const formProfile = document.querySelector(".profile-popup__form");

const nameInput = formProfile.querySelector(".profile-popup__user-name");
const jobInput = formProfile.querySelector(".profile-popup__user-activity");
nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active",
});

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__form-button",
//   inactiveButtonClass: "popup__form-button_inactive",
//   inputErrorClass: "popup_type_error",
//   errorClass: "popup__error_active",
// });

// enableValidation({
//   formSelector: ".card-popup__form",
//   inputSelector: ".card-popup__input",
//   submitButtonSelector: ".popup__form-button",
//   inactiveButtonClass: "popup__form-button_inactive",
//   inputErrorClass: "card-popup_type_error",
//   errorClass: "card-popup__error_active",
// });

const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-activity");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const job = jobInput.value;
  const name = nameInput.value;
  profileJob.textContent = `${job}`;
  profileName.textContent = `${name}`;
  closePopup(popupProfile);
}

const popupProfileOpenButton = document.querySelector(".profile__info-button");
popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupProfile);
  const button = Array.from(document.querySelectorAll(".popup__button"));
  button[1].disabled = false;
  button[1].classList.remove("popup__button_inactive");
  formProfile.addEventListener("submit", handleProfileFormSubmit);

  // closeByEscape();
});

const newCard = document.querySelector(".card-popup");

const addingButton = document.querySelector(".profile__add-button");
addingButton.addEventListener("click", function () {
  openPopup(newCard);
  // closeByEscape();
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

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const itemNewName = itemName.value;
  const itemNewLink = itemLink.value;
  const submitButton = document.querySelector(".popup__button");
  const newObj = {};
  newObj["name"] = itemNewName;
  newObj["link"] = itemNewLink;
  const card = createCard(newObj);
  addCard(card, cards);
  closePopup(newCard);
  itemName.value = "";
  itemLink.value = "";
  submitButton.disabled = true;
  submitButton.classList.add("popup__button_inactive");
}

formProfile.addEventListener("submit", handleProfileFormSubmit);
formCardElement.addEventListener("submit", handleCardFormSubmit);
