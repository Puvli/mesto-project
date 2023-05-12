export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-22",
  headers: {
    authorization: "a86aba58-abf0-4ce7-8347-0d661387097c",
    "Content-Type": "application/json",
  },
};

export const formObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active",
};

export const picturePopup = document.querySelector(".picture-popup");

export const avatarSubmitForm = document.querySelector(".avatar-popup__form");
export const avatarEditButton = document.querySelector(".profile__avatar_hovered");
export const formProfile = document.querySelector(".profile-popup__form");
export const formCardElement = document.querySelector(".card-popup__form");
export const nameInput = formProfile.querySelector(".profile-popup__user-name");
export const jobInput = formProfile.querySelector(".profile-popup__user-activity");
export const userObj = {
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-activity",
  avatarSelector: ".profile__avatar"
}
export const cards = document.querySelector(".elements");
export const addingButton = document.querySelector(".profile__add-button");
export const popupProfileOpenButton = document.querySelector(".profile__info-button");
