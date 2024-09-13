import { Section } from "./Section";
import "../styles/index.css";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { Card, cardTemplate } from "./Card.js";
import { Api } from "./Api.js";
import {
  config,
  formObj,
  picturePopup,
  avatarSubmitForm,
  avatarEditButton,
  formProfile,
  formCardElement,
  nameInput,
  jobInput,
  cards,
  addingButton,
  popupProfileOpenButton,
  userObj,
} from "../utils/constants.js";

const popupImage = new PopupWithImage(".picture-popup");
popupImage.setEventListeners(picturePopup);

function callListener(picture, pictureName) {
  popupImage.open(picture, pictureName);
}

export const api = new Api(config);
// ===============================CLASS=================================

function createCard(items, id, templateElement) {
  const card = new Card(items, templateElement, api, callListener);
  return card.outputCard(id);
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

    console.log("profile", resProfile);

    section = new Section(
      {
        items: resCard,
        renderer: createCard,
      },
      cards,
      resProfile._id,
      cardTemplate
    );
    section.renderItems();
  })

  .catch((err) => {
    console.log(err);
  });

const profileValid = new FormValidator(formObj, formProfile);

profileValid.enableValidation();

const cardValid = new FormValidator(formObj, formCardElement);
cardValid.enableValidation();

const avatarValid = new FormValidator(formObj, avatarSubmitForm);
avatarValid.enableValidation();

const user = new UserInfo(userObj);

function handleProfileFormSubmit(evt, arr, cls) {
  evt.preventDefault();
  cls.renderLoading(true);
  const job = arr[1];
  const name = arr[0];
  api
    .updateProfile(name, job)
    .then((res) => {
      user.setUserInfo(res.name, res.about, res.avatar, res._id);
      cls.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cls.renderLoading(false);
    });
}

function handleAvatarForm(event, arr, cls) {
function handleAvatarForm(event, arr, cls) {
  event.preventDefault();
  cls.renderLoading(true);
  const link = arr[0];
  cls.renderLoading(true);
  const link = arr[0];

  api
    .updateAvatar(link)
    .then((res) => {
      user.setUserInfo(res.name, res.about, res.avatar, res._id);
      cls.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cls.renderLoading(false);
      cls.renderLoading(false);
    });
}

function handleCardFormSubmit(evt, arr, cls) {
  evt.preventDefault();
  const itemNewName = arr[0];
  const itemNewLink = arr[1];

  cls.renderLoading(true);

  const itemNewName = arr[0];
  const itemNewLink = arr[1];

  cls.renderLoading(true);

  api
    .addNewPhotoCard(itemNewName, itemNewLink)
    .then((res) => {
      console.log("new object", res);
      section.addItem(createCard(res, 0, cardTemplate));
      cls.close();
    })
    .catch((err) => {
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
  avatarValid.disableButton();
});

const popupForProfile = new PopupWithForm(
  ".profile-popup",
  handleProfileFormSubmit
);
popupForProfile.setEventListeners();

const popupForCard = new PopupWithForm(".card-popup", handleCardFormSubmit);
popupForCard.setEventListeners();

addingButton.addEventListener("click", function () {
  popupForCard.open();
  cardValid.resetValidation();
  cardValid.disableButton();
});

popupProfileOpenButton.addEventListener("click", function () {
  popupForProfile.open();
  profileValid.resetValidation();
  profileValid.disableButton();
  jobInput.value = user.getUserInfo().about;
  nameInput.value = user.getUserInfo().name;
});
