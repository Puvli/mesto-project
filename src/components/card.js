import { openPopup, closePopup } from "./modal.js";
import {
  deleteMyCards,
  addServerLike,
  removeLike,
  initiateProfile,
} from "./api.js";

const picturePopup = document.querySelector(".picture-popup");
const openingPicture = document.querySelector(".picture-popup__image");
const openingPictureName = document.querySelector(".picture-popup__name");
const cardTemplate = document.querySelector(".template").content;

function hideBucket(template) {
  const bucketDel = template.querySelector(".element__bucket");
  bucketDel.classList.add("element__bucket_disabled");
}

export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function deleteCards(template, id) {
  const delButton = template.querySelector(".element__bucket");
  delButton.addEventListener("click", function () {
    deleteMyCards(id)
      .then(() => {
        template.remove();
      })
      .catch((e) => e);
  });
}

export function addLike(card, id) {
  const likeButton = card.querySelector(".element__feedback-like");
  const likeNumber = card.querySelector(".element__feedback-like-number");
  likeButton.addEventListener("click", function () {
    if (!likeButton.classList.contains("element__feedback-like_active")) {
      addServerLike(id)
        .then((res) => {
          likeButton.classList.add("element__feedback-like_active");

          console.log("new likes", res.likes);
          likeNumber.textContent = res.likes.length;
          card
            .querySelector(".element__feedback-like-number")
            .classList.remove("element__feedback-like-number_inactive");
        })
        .catch((err) => {
          //попадаем сюда если один из промисов завершаться ошибкой

          console.log(err);
        });
    } else {
      removeLike(id)
        .then((res) => {
          console.log("deleted", res.likes);
          if (res.likes.length === 0) {
            likeNumber.classList.add("element__feedback-like-number_inactive");
          } else {
            likeNumber.textContent = res.likes.length;
          }
          likeButton.classList.remove("element__feedback-like_active");
        })
        .catch((err) => {
          //попадаем сюда если один из промисов завершаться ошибкой

          console.log(err);
        });
    }
  });
}

export function openPictures(card) {
  const picture = card.querySelector(".element__img");
  const pictureName = card.querySelector(".element__feedback-heading");
  picture.setAttribute("alt", pictureName.textContent);
  picture.addEventListener("click", function () {
    openingPicture.src = picture.src;
    openingPictureName.textContent = pictureName.textContent;
    openingPicture.setAttribute("alt", pictureName.textContent);

    openPopup(picturePopup);
  });
}

export function createMyCards(obj) {
  const template = cardTemplate.querySelector(".element").cloneNode(true);
  const image = template.querySelector(".element__img");
  image.src = obj.link;
  image.alt = obj.name;
  template.querySelector(".element__feedback-heading").textContent = obj.name;
  openPictures(template);
  addLike(template, obj["_id"]);
  deleteCards(template, obj["_id"]);
  return template;
}

export function createCard(obj, id) {
  const template = createMyCards(obj);
  if (obj.likes.length > 0) {
    template
      .querySelector(".element__feedback-like-number")
      .classList.remove("element__feedback-like-number_inactive");
    template.querySelector(".element__feedback-like-number").textContent =
      obj.likes.length;
  }

  if (obj.owner._id !== id) {
    hideBucket(template);
  }
  for (let j = 0; j < obj.likes.length; j++) {
    if (obj.likes[j]._id === id) {
      template
        .querySelector(".element__feedback-like")
        .classList.add("element__feedback-like_active");
    }
  }

  return template;
}

export function addCard(card, container) {
  container.prepend(card);
}
