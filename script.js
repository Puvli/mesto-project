let addNewCard = document.querySelector(".card-popup");

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

let popup = document.querySelector(".popup");
// let formName = document.querySelector('.popup__user-name').textContent;

//закрытие попапа по клику крестика
let closeBtn = document
  .querySelector(".popup__close-button")
  .addEventListener("click", function () {
    popup.classList.remove("popup_opened");
  });

let editBtn = document
  .querySelector(".profile__info-button")
  .addEventListener("click", function () {
    popup.classList.add("popup_opened");
  });

// let saveBtn = document.querySelector('.popup__form-button').addEventListener('click', function() {
//     document.querySelector('.profile__info-name').textContent = document.querySelector('.popup__user-name').textContent;
// });
// Находим форму в DOM

const formElement = document.querySelector(".popup__form");
// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM

const nameInput = document.querySelector(".popup__user-name");
// Воспользуйтесь инструментом .querySelector()
nameInput.value = "Жак-Ив Кусто";
const jobInput = document.querySelector(".popup__user-activity");
jobInput.value = "Исследователь океана";
// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока

// она никуда отправляться не будет

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

// Прикрепляем обработчик к форме:

// он будет следить за событием “submit” - «отправка»

formElement.addEventListener("submit", formSubmitHandler);
