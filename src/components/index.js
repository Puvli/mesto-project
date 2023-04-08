import "../styles/index.css";
import { closePopup, openPopup } from "./modal.js";
import { enableValidation } from "./validate.js";
import { addCard, createCard, createMyCards } from "./card.js";
import {
  initiateProfile,
  initiateCards,
  updateProfile,
  addNewPhotoCard,
  updateAvatar,
} from "./api.js";
import { checkResponse, renderLoading } from "./utils";
const popupProfile = document.querySelector(".profile-popup");
const profileButton = document.querySelector(".profile-popup__form-button");
const cardSubmitButton = document.querySelector(".card-popup__form-button");
const popupPictures = document.querySelector(".picture-popup");
const cardPopup = document.querySelector(".card-popup");
export const avatarSubmitForm = document.querySelector(".avatar-popup__form");
const avatarEditButton = document.querySelector(".profile__avatar_hovered");
const avatarPopup = document.querySelector(".avatar-popup");
const avatarCloseButton = document.querySelector(".avatar-popup__close-button");
const avatarPopupPicture = document.querySelector(".avatar-popup__picture");

avatarCloseButton.addEventListener("click", function () {
  closePopup(avatarPopup);
});

avatarEditButton.addEventListener("click", function () {
  openPopup(avatarPopup);
});

avatarPopup.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("avatar-popup")) {
    closePopup(avatarPopup);
  }
});

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

export const formProfile = document.querySelector(".profile-popup__form");
const nameInput = formProfile.querySelector(".profile-popup__user-name");
const jobInput = formProfile.querySelector(".profile-popup__user-activity");

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active",
});

export const profileName = document.querySelector(".profile__info-name");
export const profileJob = document.querySelector(".profile__info-activity");
export const profileAvatar = document.querySelector(".profile__avatar");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const btn = formProfile.querySelector(".profile-popup__form-button");
  renderLoading(true, btn);
  const job = jobInput.value;
  const name = nameInput.value;

  updateProfile(name, job)
    .then((res) => {
      profileJob.textContent = res.about;
      profileName.textContent = res.name;
      closePopup(popupProfile);
    })
    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btn);
    });
}

function handleAvatarForm(event) {
  event.preventDefault();
  const btn = avatarSubmitForm.querySelector(".avatar-popup__form-button");
  renderLoading(true, btn);
  const link = avatarPopupPicture.value;

  updateAvatar(link)
    .then((res) => {
      profileAvatar.src = res.avatar;
      closePopup(avatarPopup);
      event.target.reset();
      btn.disabled = true;
      btn.classList.add("popup__button_inactive");
    })
    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btn);
    });
}

const popupProfileOpenButton = document.querySelector(".profile__info-button");
popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupProfile);
  profileButton.disabled = true;
  profileButton.classList.add("popup__button_inactive");
});

const newCard = document.querySelector(".card-popup");

const addingButton = document.querySelector(".profile__add-button");
addingButton.addEventListener("click", function () {
  openPopup(newCard);
});
const popupClosingButton = document.querySelector(".card-popup__close-button");
popupClosingButton.addEventListener("click", function () {
  closePopup(newCard);
});

export const formCardElement = document.querySelector(".card-popup__form");
const itemName = document.querySelector(".card-popup__item-name");
const itemLink = document.querySelector(".card-popup__item-link");

const picturePopup = document.querySelector(".picture-popup");
const pictureButtonClose = document.querySelector(
  ".picture-popup__close-button"
);
pictureButtonClose.addEventListener("click", function () {
  closePopup(picturePopup);
});

export const cards = document.querySelector(".elements");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const itemNewName = itemName.value;
  const itemNewLink = itemLink.value;
  const btn = formCardElement.querySelector(".card-popup__form-button");
  renderLoading(true, btn);
  const newObj = {};
  addNewPhotoCard(itemNewName, itemNewLink)
    .then((res) => {
      console.log("new object", res);
      const card = createMyCards(res);
      addCard(card, cards);
      closePopup(newCard);
      evt.target.reset();
      cardSubmitButton.disabled = true;
      cardSubmitButton.classList.add("popup__button_inactive");
    })
    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btn);
    });
}

formProfile.addEventListener("submit", handleProfileFormSubmit);
formCardElement.addEventListener("submit", handleCardFormSubmit);
avatarSubmitForm.addEventListener("submit", handleAvatarForm);

Promise.all([initiateProfile(), initiateCards()])
  .then(([resProfile, resCard]) => {
    console.log("json", resCard);
    profileName.textContent = resProfile.name;
    profileJob.textContent = resProfile.about;
    jobInput.value = resProfile.about;
    nameInput.value = resProfile.name;
    profileAvatar.src = resProfile.avatar;
    console.log("profile", resProfile);
    for (let i = 0; i < resCard.length; i++) {
      const card = createCard(resCard[i], resProfile._id);
      addCard(card, cards);
      console.log(resCard[i].likes.length);
      console.log(resCard[i]);
    }
  })

  .catch((err) => {
    //попадаем сюда если один из промисов завершаться ошибкой

    console.log(err);
  });

// initiateProfile()
// .then((res) => {
//   if (res.ok) {
//     return res.json();
//   }

//   return Promise.reject(res.status);
// })

// .then((obj) => {
//   profileName.textContent = obj.name;
//   profileJob.textContent = obj.about;
//   profileAvatar.src = obj.avatar;
//   console.log("avatar", obj);
// })

// inititateCards()
// // Promise.all([initiateProfile()])
// .then((res) => {
//   if (res.ok) {
//     return res.json(); // возвращаем вызов метода json
//   }

//   return Promise.reject(res.status);
// })

// .then((res) => {
//   for (let i = 0; i < res.length; i++) {
//     const card = createCard(res[i]);
//     addCard(card, cards);
//     console.log(res[i].likes.length);
//     console.log(res[i]);
//   }
// }
// );
