import { PopupWithImage } from "./PopupWithImage.js";
import { api } from "./index.js";

const picturePopup = document.querySelector(".picture-popup");
export const cardTemplate = document.querySelector(".template").content;

export function addCard(card, container) {
  container.prepend(card);
}

//=============== CLASS ===================
export class Card {
  constructor(cardData, templateSelector) {
    this.cardData = cardData;
    this.templateSelector = templateSelector
      .querySelector(".element")
      .cloneNode(true);
  }

  #hideBucket(template) {
    const bucketDel = template.querySelector(".element__bucket");
    bucketDel.classList.add("element__bucket_disabled");
  }

  #deleteCards(template, id) {
    const delButton = template.querySelector(".element__bucket");
    delButton.addEventListener("click", function () {
      api
        .deleteMyCards(id)
        .then(() => {
          template.remove();
        })
        .catch((e) => e);
    });
  }

  #addLike(card, id) {
    const likeButton = card.querySelector(".element__feedback-like");
    const likeNumber = card.querySelector(".element__feedback-like-number");
    likeButton.addEventListener("click", function () {
      if (!likeButton.classList.contains("element__feedback-like_active")) {
        api
          .addServerLike(id)
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
        api
          .removeLike(id)
          .then((res) => {
            console.log("deleted", res.likes);
            if (res.likes.length === 0) {
              likeNumber.classList.add(
                "element__feedback-like-number_inactive"
              );
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

  #openPictures(card) {
    const picture = card.querySelector(".element__img");
    const pictureName = card.querySelector(".element__feedback-heading");
    const popupImage = new PopupWithImage(picturePopup);
    picture.addEventListener("click", function () {
      popupImage.open(picture, pictureName);
      popupImage.setEventListeners(picturePopup);
    });
  }

  /* #addCard(card, container) {
    container.prepend(card);
  }*/

  #createMyCards(obj) {
    const template = this.templateSelector;
    const image = template.querySelector(".element__img");
    image.src = obj.link;
    image.alt = obj.name;
    template.querySelector(".element__feedback-heading").textContent = obj.name;
    this.#openPictures(template);
    this.#addLike(template, obj["_id"]);
    this.#deleteCards(template, obj["_id"]);

    return template;
  }

  #createCard(obj, id) {
    const template = this.#createMyCards(obj);
    if (obj.likes.length > 0) {
      template
        .querySelector(".element__feedback-like-number")
        .classList.remove("element__feedback-like-number_inactive");
      template.querySelector(".element__feedback-like-number").textContent =
        obj.likes.length;
    }

    if (obj.owner._id !== id) {
      this.#hideBucket(template);
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

  outputCard(id) {
    if (id === 0) {
      return this.#createMyCards(this.cardData);
    } else {
      return this.#createCard(this.cardData, id);
    }
  }
}
