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

const popup = document.querySelector(".popup");

//закрытие попапа по клику крестика
const closeBtn = document
  .querySelector(".popup__close-button")
  .addEventListener("click", function () {
    popup.classList.remove("popup_opened");
  });

const editBtn = document
  .querySelector(".profile__info-button")
  .addEventListener("click", function () {
    popup.classList.add("popup_opened");
  });

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");

// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__user-name");
nameInput.value = "Жак-Ив Кусто";
const jobInput = document.querySelector(".popup__user-activity");
jobInput.value = "Исследователь океана";

function formSubmitHandler(evt) {
  evt.preventDefault();
  const job = jobInput.value;
  const name = nameInput.value;
  let profileName = document.querySelector(".profile__info-name");
  let profileJob = document.querySelector(".profile__info-activity");
  profileJob.textContent = `${job}`;
  profileName.textContent = `${name}`;
  popup.classList.remove("popup_opened");
}

//============================ДОБАВЛЕНИЕ КАРТОЧЕК======================================
// + кнопка добавления новой карточки
let addBtn = document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    addNewCard.classList.add("card-popup_opened");
  });
//закрывающая кнопка попапа добавления новой карточки
let closeNew = document
  .querySelector(".card-popup__close-button")
  .addEventListener("click", function () {
    addNewCard.classList.remove("card-popup_opened");
  });

const addNewCard = document.querySelector(".card-popup");
const formCardElement = document.querySelector(".card-popup__form");
// Поля формы для добавления карточек
const itemName = document.querySelector(".card-popup__item-name");
const itemLink = document.querySelector(".card-popup__item-link");

//================================Функция добавления и удаления карточек==============================================
function deleteCards(temp) {
  //Удаление элементов
  let delButton = document.querySelector(".element__bucket");
  delButton.addEventListener("click", function () {
    temp.remove();
  });
}

const newCard = document.querySelector(".elements");
function addCard(obj) {
  const cardTemplate = document.querySelector(".template").content;
  const template = cardTemplate.querySelector(".element").cloneNode(true);
  // const newCard = document.querySelector(".elements");
  template.querySelector(".element__img").src = obj.link;
  template.querySelector(".element__feedback-heading").textContent = obj.name;
  newCard.prepend(template);
  console.log(newCard);
  //Удаление элементов
  deleteCards(template);
}

function addLike() {
  // =============================LIKES====================================
  let likeButton = document.querySelector(".element__feedback-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__feedback-like_active");
  });
}

function closePictures(pic) {
  //Закрытие картинок
  let closePicture = document.querySelector(".picture-popup__close-button");
  closePicture.addEventListener("click", function () {
    pic.classList.remove("picture-popup_opened");
  });
}

//Открытие картинок
function openPictures() {
  let picture = document.querySelector(".element__img");
  let picturePopup = document.querySelector(".picture-popup");
  let openingPicture = document.querySelector(".picture-popup__image");
  let pictureName = document.querySelector(".element__feedback-heading");
  let openingPictureName = document.querySelector(".picture-popup__name");
  picture.addEventListener("click", function () {
    openingPicture.src = picture.src;
    openingPictureName.textContent = pictureName.textContent;
    picturePopup.classList.add("picture-popup_opened");
  });

  closePictures(picturePopup);
}

//добавляем карточки из массива
for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i]);
  openPictures();
  addLike();
}

//форма добавления новых карточек
function formCardHandler(evt) {
  evt.preventDefault();
  const itemNewName = itemName.value;
  const itemNewLink = itemLink.value;
  let newObj = {};
  newObj["name"] = itemNewName;
  newObj["link"] = itemNewLink;
  addCard(newObj);
  addLike();
  addNewCard.classList.toggle("card-popup_opened");
  openPictures();
}

formElement.addEventListener("submit", formSubmitHandler);
formCardElement.addEventListener("submit", formCardHandler);
