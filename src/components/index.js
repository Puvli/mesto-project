import { Section } from "./Section";
import "../styles/index.css";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { addCard, Card, cardTemplate } from "./card.js";
import { Api } from "./Api.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-22",
  headers: {
    authorization: "a86aba58-abf0-4ce7-8347-0d661387097c",
    "Content-Type": "application/json",
  },
};

export const api = new Api(config);

function rendererOfCards(items, id, templateSelector, elements) {
  for (let i = 0; i < items.length; i++) {
    const card = new Card(items[i], templateSelector);
    addCard(card.outputCard(id), elements);
  }
}

let section;

Promise.all([api.initiateProfile(), api.initiateCards()])
  .then(([resProfile, resCard]) => {
    console.log("json", resCard);
    profileName.textContent = resProfile.name;
    profileJob.textContent = resProfile.about;
    profileAvatar.src = resProfile.avatar;
    console.log("profile", resProfile);
    section = new Section(
      {
        items: resCard,
        renderer: rendererOfCards(resCard, resProfile._id, cardTemplate, cards),
      },
      cardTemplate
    );

    section.output();
  })

  .catch((err) => {
    //попадаем сюда если один из промисов завершаться ошибкой

    console.log(err);
  });

const popupProfile = document.querySelector(".profile-popup");
const profileButton = document.querySelector(".profile-popup__form-button");
const cardPopup = document.querySelector(".card-popup");
export const avatarSubmitForm = document.querySelector(".avatar-popup__form");
const avatarEditButton = document.querySelector(".profile__avatar_hovered");
const avatarPopup = document.querySelector(".avatar-popup");

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
export const formCardElement = document.querySelector(".card-popup__form");
const nameInput = formProfile.querySelector(".profile-popup__user-name");
const jobInput = formProfile.querySelector(".profile-popup__user-activity");
const profileValid = new FormValidator(
  {
    /*formSelector: ".popup__form",*/
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error-message_active",
  },
  formProfile
);

profileValid.enableValidation();

const cardValid = new FormValidator(
  {
    /*formSelector: ".popup__form",*/
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error-message_active",
  },
  formCardElement
);
cardValid.enableValidation();

const avatarValid = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__input_error",
    errorClass: "popup__error-message_active",
  },
  avatarSubmitForm
);
avatarValid.enableValidation();

export const profileName = document.querySelector(".profile__info-name");
export const profileJob = document.querySelector(".profile__info-activity");
export const profileAvatar = document.querySelector(".profile__avatar");

const user = new UserInfo(profileName, profileJob);

function handleProfileFormSubmit(evt, arr, cls) {
  evt.preventDefault();
  cls.renderLoading(true);
  const job = arr[1];
  const name = arr[0];

  user.setUserInfo(name, job).finally(() => {
    cls.renderLoading(false);
    cls.close();
  });
}

function handleAvatarForm(event, arr, cls) {
  event.preventDefault();
  cls.renderLoading(true);
  const link = arr[0];

  api
    .updateAvatar(link)
    .then((res) => {
      profileAvatar.src = res.avatar;
      cls.close();
      event.target.reset();
    })
    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    })
    .finally(() => {
      cls.renderLoading(false);
    });
}

const newCard = document.querySelector(".card-popup");

const popupClosingButton = document.querySelector(".card-popup__close-button");
popupClosingButton.addEventListener("click", function () {
  closePopup(newCard);
});

export const cards = document.querySelector(".elements");

function handleCardFormSubmit(evt, arr, cls) {
  evt.preventDefault();
  const itemNewName = arr[0];
  const itemNewLink = arr[1];

  cls.renderLoading(true);

  api
    .addNewPhotoCard(itemNewName, itemNewLink)
    .then((res) => {
      console.log("new object", res);
      const card = new Card(res, cardTemplate);
      section.addItem(card.outputCard(0), cards);
    })
    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    })
    .finally(() => {
      cls.renderLoading(false);

      cls.close();
    });
}

const popupForAvatar = new PopupWithForm(avatarPopup, handleAvatarForm);

popupForAvatar.setEventListeners();
avatarEditButton.addEventListener("click", function () {
  popupForAvatar.open();
});

const popupForProfile = new PopupWithForm(
  popupProfile,
  handleProfileFormSubmit
);
popupForProfile.setEventListeners();

const popupForCard = new PopupWithForm(cardPopup, handleCardFormSubmit);
popupForCard.setEventListeners();

const addingButton = document.querySelector(".profile__add-button");
addingButton.addEventListener("click", function () {
  popupForCard.open();
});

const popupProfileOpenButton = document.querySelector(".profile__info-button");
popupProfileOpenButton.addEventListener("click", function () {
  popupForProfile.open();

  user.getUserInfo(jobInput, nameInput).finally(() => {
    profileButton.disabled = true;
    profileButton.classList.add("popup__button_inactive");
  });
});
