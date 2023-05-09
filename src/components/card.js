// import { PopupWithImage } from "./PopupWithImage.js";
// import { api } from "./index.js";

// const picturePopup = document.querySelector(".picture-popup");
export const cardTemplate = document.querySelector(".template").content;

export function addCard(card, container) {
  container.prepend(card);
}

//=============== CLASS ===================
export class Card {
  constructor(cardData, templateSelector, api, callBack) {
    this.cardData = cardData;
    this.templateSelector = templateSelector
      .querySelector(".element")
      .cloneNode(true);
    this.api = api;
    this.callBack = callBack;
    this.cardImage = this.templateSelector.querySelector('.element__img');
  }

  #hideBucket(template) {
    const bucketDel = template.querySelector(".element__bucket");
    bucketDel.classList.add("element__bucket_disabled");
  }

  #deleteCards(template, id) {
    const api = this.api;
    const delButton = template.querySelector(".element__bucket");
    delButton.addEventListener("click", function () {
      api
        .deleteMyCards(id)
        .then(() => {
          template.remove();
        })
        .catch((e) => console.log(e));
    });
  }

  #addLike(card, id) {
    const api = this.api;
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
    // const popupImage = new PopupWithImage(picturePopup);
    picture.addEventListener("click", () => {
      // popupImage.open(picture, pictureName);
      // popupImage.setEventListeners(picturePopup);
      this.callBack.call(this, picture, pictureName);
    });
  }

  /* #addCard(card, container) {
    container.prepend(card);
  }*/

  #setEventListeners(obj) {
    this.#openPictures(this.templateSelector);
    this.#addLike(this.templateSelector, obj["_id"]);
    this.#deleteCards(this.templateSelector, obj["_id"]);
  }

  #createMyCards(obj) {
    // const template = this.templateSelector;
    // const image = this.templateSelector.querySelector(".element__img");
    this.cardImage.src = obj.link;
    this.cardImage.alt = obj.name;
    this.templateSelector.querySelector(".element__feedback-heading").textContent = obj.name;
    // this.#openPictures(template);
    // this.#addLike(template, obj["_id"]);
    // this.#deleteCards(template, obj["_id"]);
    this.#setEventListeners(obj);

    return this.templateSelector;
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
    this.#setEventListeners(obj);

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
