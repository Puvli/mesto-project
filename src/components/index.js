import { Section } from "./Section";
import "../styles/index.css";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { addCard, Card, cardTemplate } from "./Card.js";
import { Api } from "./Api.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-22",
  headers: {
    authorization: "a86aba58-abf0-4ce7-8347-0d661387097c",
    "Content-Type": "application/json",
  },
};

const picturePopup = document.querySelector(".picture-popup");
const popupImage = new PopupWithImage(".picture-popup");
// picture.addEventListener("click", function () {
popupImage.setEventListeners(picturePopup);

function callListener(picture, pictureName) {
  popupImage.open(picture, pictureName);
  // popupImage.setEventListeners(picturePopup);
}
// });

export const api = new Api(config);
// ===============================CLASS=================================

// const cardTest = new Section()

// function createCard(item) {
//   const cardElement = new Card(item, templateSelector, api, callListener);
//   return cardElement;
// }

// function rendererOfCards(items, id, templateSelector, elements) {
//   for (let i = 0; i < items.length; i++) {
//     const card = new Card(items[i], templateSelector, api, callListener);
//     addCard(card.outputCard(id), elements);
//     // return card.outputCard(id);
//   }
// }

function createCard(items, id, templateSelector) {
  const mas = [];
  if (items.length) {
    for (let i = 0; i < items.length; i++) {
      const card = new Card(items[i], templateSelector, api, callListener);
      // return card.outputCard(id);
      mas.push(card.outputCard(id));
    }
  } else {
    const card = new Card(items, templateSelector, api, callListener);
    return card.outputCard(id);
  }
  return mas;
}

let section;

Promise.all([api.initiateProfile(), api.initiateCards()])
  .then(([resProfile, resCard]) => {
    console.log("json", resCard);
    user.setUserInfo(
      resProfile.name,
      resProfile.about,
      resProfile.avatar,
      resProfile._id
    );
    // profileName.textContent = resProfile.name;
    // profileJob.textContent = resProfile.about;
    // profileAvatar.src = resProfile.avatar;

    console.log("profile", resProfile);

    section = new Section(
      {
        items: resCard,
        // renderer: rendererOfCards(resCard, resProfile._id, cardTemplate, cards),
        renderer: createCard.call(this, resCard, resProfile._id, cardTemplate),
      },
      cards,
      resProfile._id,
      cardTemplate
    );
    // addCard(card.outputCard(resProfile._id), cards);
    // for (let i = 0; i < resCard.length; i++) {
    // section.output();
    section.renderItems();
    // }
  })

  .catch((err) => {
    //попадаем сюда если один из промисов завершаться ошибкой

    console.log(err);
  });

// const popupProfile = document.querySelector(".profile-popup");
// const profileButton = document.querySelector(".profile-popup__form-button");

// const cardPopup = document.querySelector(".card-popup");
export const avatarSubmitForm = document.querySelector(".avatar-popup__form");
const avatarEditButton = document.querySelector(".profile__avatar_hovered");
// const avatarPopup = document.querySelector(".avatar-popup");

export const formProfile = document.querySelector(".profile-popup__form");
export const formCardElement = document.querySelector(".card-popup__form");
const nameInput = formProfile.querySelector(".profile-popup__user-name");
const jobInput = formProfile.querySelector(".profile-popup__user-activity");

const formObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-message_active",
};

const profileValid = new FormValidator(formObj, formProfile);

profileValid.enableValidation();

const cardValid = new FormValidator(formObj, formCardElement);
cardValid.enableValidation();

const avatarValid = new FormValidator(formObj, avatarSubmitForm);
avatarValid.enableValidation();

export const profileName = document.querySelector(".profile__info-name");
export const profileJob = document.querySelector(".profile__info-activity");
export const profileAvatar = document.querySelector(".profile__avatar");
// const userObj = {
//   nameSelector: ".profile__info-name",
//   nameJob: ".profile__info-activity",
//   nameAvatar: ".profile__avatar",
// };
const user = new UserInfo(
  ".profile__info-name",
  ".profile__info-activity",
  ".profile__avatar"
);

function handleProfileFormSubmit(evt, arr, cls) {
  evt.preventDefault();
  cls.renderLoading(true);
  const job = arr[1];
  const name = arr[0];
  api.updateProfile(name, job).then((res) => {
    user.setUserInfo(res.name, res.about, res.avatar, res._id);
    cls.close().finally(() => {
      cls.renderLoading(false);
    });
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

// const newCard = document.querySelector(".card-popup");

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
      // const card = new Card(res, cardTemplate, api, callListener);
      // createCard(res, 0, cardTemplate);
      // section.addItem(card.outputCard(0)/*, cards*/);
      section.addItem(createCard(res, 0, cardTemplate));
      cls.close();
    })
    .catch((err) => {
      //попадаем сюда если один из промисов завершаться ошибкой

      console.log(err);
    })
    .finally(() => {
      cls.renderLoading(false);
    });
}

const popupForAvatar = new PopupWithForm(".avatar-popup", handleAvatarForm);

popupForAvatar.setEventListeners();
avatarEditButton.addEventListener("click", function () {
  popupForAvatar.open();
  avatarValid.resetValidation();
});

const popupForProfile = new PopupWithForm(
  ".profile-popup",
  handleProfileFormSubmit
);
popupForProfile.setEventListeners();

const popupForCard = new PopupWithForm(".card-popup", handleCardFormSubmit);
popupForCard.setEventListeners();

const addingButton = document.querySelector(".profile__add-button");
addingButton.addEventListener("click", function () {
  popupForCard.open();
  cardValid.resetValidation();
});

const popupProfileOpenButton = document.querySelector(".profile__info-button");
popupProfileOpenButton.addEventListener("click", function () {
  popupForProfile.open();
  profileValid.resetValidation();

  // user.getUserInfo(jobInput, nameInput, api).finally(() => {
  //   profileButton.disabled = true;
  //   profileButton.classList.add("popup__button_inactive");
  // });
  jobInput.value = user.getUserInfo().about;
  nameInput.value = user.getUserInfo().name;
  // user.getUserInfo();
});
