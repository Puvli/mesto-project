import { Section } from "./Section";
import "../styles/index.css";
import {
  closePopup,
  openPopup,
  Popup,
  PopupWithForm,
  UserInfo,
} from "./modal.js";
import { /*enableValidation,*/ FormValidator } from "./validate.js";
import {
  addCard,
  /*createCard, createMyCards,*/ Card,
  cardTemplate,
} from "./card.js";
import {
  /*initiateProfile,
  initiateCards,
  updateProfile,
  addNewPhotoCard,
  updateAvatar,*/
  api,
} from "./api.js";
import { renderLoading } from "./utils";

// ===============================CLASS=================================

function rendererOfCards(items, id, templateSelector, elements) {
  for (let i = 0; i < items.length; i++) {
    // const card = createCard(resCard[i], resProfile._id);
    const card = new Card(items[i], templateSelector);
    addCard(card.outputCard(id), elements);
    //console.log(resCard[i].likes.length);
    // console.log("card", resCard[i]);
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
const cardSubmitButton = document.querySelector(".card-popup__form-button");
const popupPictures = document.querySelector(".picture-popup");
const cardPopup = document.querySelector(".card-popup");
export const avatarSubmitForm = document.querySelector(".avatar-popup__form");
const avatarEditButton = document.querySelector(".profile__avatar_hovered");
const avatarPopup = document.querySelector(".avatar-popup");
const avatarCloseButton = document.querySelector(".avatar-popup__close-button");
const avatarPopupPicture = document.querySelector(".avatar-popup__picture");
const popupForAvatar = new Popup(avatarPopup);
// avatarCloseButton.addEventListener("click", function () {
//   closePopup(avatarPopup);
// });
popupForAvatar.setEventListeners();
// popupForAvatar._handleEscClose();
avatarEditButton.addEventListener("click", function () {
  // openPopup(avatarPopup);
  popupForAvatar.open();
});

// avatarPopup.addEventListener("click", function (evt) {
//   if (evt.target.classList.contains("avatar-popup")) {
//     closePopup(avatarPopup);
//   }
// });

// popupPictures.addEventListener("click", function (evt) {
//   if (evt.target.classList.contains("picture-popup")) {
//     closePopup(popupPictures);
//   }
// });

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

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_inactive",
//   inputErrorClass: "popup__input_error",
//   errorClass: "popup__error-message_active",
// });

export const profileName = document.querySelector(".profile__info-name");
export const profileJob = document.querySelector(".profile__info-activity");
export const profileAvatar = document.querySelector(".profile__avatar");

const user = new UserInfo(profileName, profileJob);

function handleProfileFormSubmit(evt, arr, cls) {
  evt.preventDefault();
  const btn = formProfile.querySelector(".profile-popup__form-button");
  renderLoading(true, btn);
  const job = arr[1];
  const name = arr[0];

  // api
  //   .updateProfile(name, job)
  //   .then((res) => {
  //     profileJob.textContent = res.about;
  //     profileName.textContent = res.name;
  //     // closePopup(popupProfile);
  //     console.log("test", res);
  //   })
  //   .catch((err) => {
  //     //попадаем сюда если один из промисов завершаться ошибкой

  //     console.log(err);
  //   })
  //   .finally(() => {
  //     renderLoading(false, btn);
  //     cls.close();
  //   });

  user.setUserInfo(name, job).finally(() => {
    renderLoading(false, btn);
    cls.close();
  });
}

function handleAvatarForm(event) {
  event.preventDefault();
  const btn = avatarSubmitForm.querySelector(".avatar-popup__form-button");
  renderLoading(true, btn);
  const link = avatarPopupPicture.value;

  api
    .updateAvatar(link)
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

// const popupProfileOpenButton = document.querySelector(".profile__info-button");
// popupProfileOpenButton.addEventListener("click", function () {
//   jobInput.value = profileJob.textContent;
//   nameInput.value = profileName.textContent;
//   openPopup(popupProfile);
//   profileButton.disabled = true;
//   profileButton.classList.add("popup__button_inactive");
// });

const newCard = document.querySelector(".card-popup");

const addingButton = document.querySelector(".profile__add-button");
addingButton.addEventListener("click", function () {
  openPopup(newCard);
});
const popupClosingButton = document.querySelector(".card-popup__close-button");
popupClosingButton.addEventListener("click", function () {
  closePopup(newCard);
});

// export const formCardElement = document.querySelector(".card-popup__form");
const itemName = document.querySelector(".card-popup__item-name");
const itemLink = document.querySelector(".card-popup__item-link");

const picturePopup = document.querySelector(".picture-popup");
const pictureButtonClose = document.querySelector(
  ".picture-popup__close-button"
);
// pictureButtonClose.addEventListener("click", function () {
//   closePopup(picturePopup);
// });

export const cards = document.querySelector(".elements");

function handleCardFormSubmit(evt, arr, cls) {
  evt.preventDefault();
  const itemNewName = arr[0];
  const itemNewLink = arr[1];
  const btn = formCardElement.querySelector(".card-popup__form-button");
  renderLoading(true, btn);
  // const newObj = {};
  api
    .addNewPhotoCard(itemNewName, itemNewLink)
    .then((res) => {
      console.log("new object", res);
      const card = new Card(res, cardTemplate);
      section.addItem(card.outputCard(0), cards);
      // closePopup(newCard);
      evt.target.reset();
      // cls.close();
      // cardSubmitButton.disabled = true;
      // cardSubmitButton.classList.add("popup__button_inactive");
    })
    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    })
    .finally(() => {
      renderLoading(false, btn);
      cls.close();
    });
}

// formProfile.addEventListener("submit", handleProfileFormSubmit);
// formCardElement.addEventListener("submit", handleCardFormSubmit);
avatarSubmitForm.addEventListener("submit", handleAvatarForm);

//============================CLASS========================================

const popupForProfile = new PopupWithForm(
  popupProfile,
  handleProfileFormSubmit
);
popupForProfile.setEventListeners();

const popupForCard = new PopupWithForm(cardPopup, handleCardFormSubmit);
popupForCard.setEventListeners();

// const user = new UserInfo(profileJob, profileName);

const popupProfileOpenButton = document.querySelector(".profile__info-button");
popupProfileOpenButton.addEventListener("click", function () {
  // jobInput.value = profileJob.textContent;
  // nameInput.value = profileName.textContent;
  // openPopup(popupProfile);
  user.getUserInfo(jobInput, nameInput).finally(() => {
    popupForProfile.open();
    profileButton.disabled = true;
    profileButton.classList.add("popup__button_inactive");
  });
});
