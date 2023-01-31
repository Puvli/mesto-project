const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupProfile = document.querySelector(".popup");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//закрытие попапа по клику крестика
const closePopupButton = document.querySelector(".popup__close-button");
closePopupButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

const popupProfileOpenButton = document.querySelector(".profile__info-button");
popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupProfile);
});

// Находим форму в DOM
const formProfile = document.querySelector(".popup__form");

// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__user-name");
const jobInput = document.querySelector(".popup__user-activity");

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

//============================ДОБАВЛЕНИЕ КАРТОЧЕК======================================
// + кнопка добавления новой карточки
const newCard = document.querySelector(".card-popup");

const addingButton = document.querySelector(".profile__add-button");
addingButton.addEventListener("click", function () {
  openPopup(newCard);
});
//закрывающая кнопка попапа добавления новой карточки
const popupClosingButton = document.querySelector(".card-popup__close-button");
popupClosingButton.addEventListener("click", function () {
  closePopup(newCard);
});

const formCardElement = document.querySelector(".card-popup__form");
// Поля формы для добавления карточек
const itemName = document.querySelector(".card-popup__item-name");
const itemLink = document.querySelector(".card-popup__item-link");

//================================Функция добавления и удаления карточек==============================================
function deleteCards(temp) {
  //Удаление элементов
  const delButton = temp.querySelector(".element__bucket");
  delButton.addEventListener("click", function () {
    temp.remove();
  });
}

function addLike(obj) {
  // =============================LIKES====================================
  const likeButton = obj.querySelector(".element__feedback-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__feedback-like_active");
  });
}

//Закрытие картинок
const picturePopup = document.querySelector(".picture-popup");
const pictureButtonClose = document.querySelector(
  ".picture-popup__close-button"
);
pictureButtonClose.addEventListener("click", function () {
  closePopup(picturePopup);
});

//Открытие картинок
function openPictures(obj) {
  const picture = obj.querySelector(".element__img");
  // const picturePopup = document.querySelector(".picture-popup");
  const openingPicture = document.querySelector(".picture-popup__image");
  const pictureName = obj.querySelector(".element__feedback-heading");
  const openingPictureName = document.querySelector(".picture-popup__name");
  picture.setAttribute("alt", pictureName.textContent);
  picture.addEventListener("click", function () {
    openingPicture.src = picture.src;
    openingPictureName.textContent = pictureName.textContent;
    openingPicture.setAttribute("alt", pictureName.textContent);

    openPopup(picturePopup);
  });

  // closePictures(picturePopup);
}

const cards = document.querySelector(".elements");
//функция создания новой карточки
function createCard(obj) {
  const cardTemplate = document.querySelector(".template").content;
  const template = cardTemplate.querySelector(".element").cloneNode(true);
  template.querySelector(".element__img").src = obj.link;
  template.querySelector(".element__feedback-heading").textContent = obj.name;
  // addCard(template, cards);
  openPictures(template);
  addLike(template);
  deleteCards(template);
  return template;
}

//функция добавления новой карточки
function addCard(card, container) {
  container.prepend(card);
  // openPictures(card);
}

//добавляем карточки из массива
for (let i = 0; i < initialCards.length; i++) {
  const card = createCard(initialCards[i]);
  addCard(card, cards);
  // openPictures();
  // addLike();
}

//форма добавления новых карточек
function formCardHandler(evt) {
  evt.preventDefault();
  const itemNewName = itemName.value;
  const itemNewLink = itemLink.value;
  const newObj = {};
  newObj["name"] = itemNewName;
  newObj["link"] = itemNewLink;
  let card = createCard(newObj);
  addCard(card, cards);
  // addLike();
  // openPictures(newObj);
  closePopup(newCard);
  itemName.value = "";
  itemLink.value = "";
}

formProfile.addEventListener("submit", formSubmitHandler);
formCardElement.addEventListener("submit", formCardHandler);
