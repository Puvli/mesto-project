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

function hideBucket(temp) {
  const bucketDel = temp.querySelector(".element__bucket");
  bucketDel.classList.add("element__bucket_disabled");
}

export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function deleteCards(temp, id) {
  const delButton = temp.querySelector(".element__bucket");
  delButton.addEventListener("click", function () {
    temp.remove();
    deleteMyCards(id);
  });
}

export function addLike(card, id) {
  const likeButton = card.querySelector(".element__feedback-like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__feedback-like_active");
    if (likeButton.classList.contains("element__feedback-like_active")) {
      addServerLike(id)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(res.status);
        })

        .then((res) => {
          console.log("new likes", res.likes.length);
          card.querySelector(".element__feedback-like-number").textContent =
            res.likes.length;
          card
            .querySelector(".element__feedback-like-number")
            .classList.remove("element__feedback-like-number_inactive");
        });
    } else {
      removeLike(id)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(res.status);
        })

        .then((res) => {
          console.log("new likes", res.likes.length);
          if (res.likes.length === 0) {
            card
              .querySelector(".element__feedback-like-number")
              .classList.add("element__feedback-like-number_inactive");
          } else {
            card.querySelector(".element__feedback-like-number").textContent =
              res.likes.length;
          }
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

export function createCard(obj) {
  const template = cardTemplate.querySelector(".element").cloneNode(true);
  template.querySelector(".element__img").src = obj.link;
  template.querySelector(".element__feedback-heading").textContent = obj.name;
  openPictures(template);
  addLike(template, obj["_id"]);
  deleteCards(template, obj["_id"]);
  if (obj.likes.length > 0) {
    template
      .querySelector(".element__feedback-like-number")
      .classList.remove("element__feedback-like-number_inactive");
    template.querySelector(".element__feedback-like-number").textContent =
      obj.likes.length;
  }

  initiateProfile()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    })

    .then((res) => {
      if (obj.owner._id !== res._id) {
        hideBucket(template);
      }
      for (let j = 0; j < obj.likes.length; j++) {
        if (obj.likes[j]._id === res._id) {
          template
            .querySelector(".element__feedback-like")
            .classList.add("element__feedback-like_active");
        }
      }
    });

  return template;
}

export function createMyCards(obj) {
  const template = cardTemplate.querySelector(".element").cloneNode(true);
  template.querySelector(".element__img").src = obj.link;
  template.querySelector(".element__feedback-heading").textContent = obj.name;
  openPictures(template);
  addLike(template, obj["_id"]);
  deleteCards(template, obj["_id"]);
  return template;
}

export function addCard(card, container) {
  container.prepend(card);
}
