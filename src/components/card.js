export const cardTemplate = document.querySelector(".template").content;

export function addCard(card, container) {
  container.prepend(card);
}

//=============== CLASS ===================
export class Card {
  constructor(cardData, cardElement, api, callBack) {
    this.cardData = cardData;
    this._cardElement = cardElement.querySelector(".element").cloneNode(true);
    this.api = api;
    this.callBack = callBack;
    this.cardImage = this._cardElement.querySelector(".element__img");
    this._bucket = this._cardElement.querySelector(".element__bucket");
    this.likeButton = this._cardElement.querySelector(
      ".element__feedback-like"
    );
    this.likeNumber = this._cardElement.querySelector(
      ".element__feedback-like-number"
    );
    this.pictureName = this._cardElement.querySelector(
      ".element__feedback-heading"
    );
  }

  #hideBucket() {
    this._bucket.classList.add("element__bucket_disabled");
  }

  #deleteCards(id) {
    const api = this.api;
    const _cardElement = this._cardElement;
    this._bucket.addEventListener("click", function () {
      api
        .deleteMyCards(id)
        .then(() => {
          _cardElement.remove();
        })
        .catch((e) => console.log(e));
    });
  }

  #addLike(id) {
    const api = this.api;
    const likeButton = this.likeButton;
    const likeNumber = this.likeNumber;
    likeButton.addEventListener("click", function () {
      if (!likeButton.classList.contains("element__feedback-like_active")) {
        api
          .addServerLike(id)
          .then((res) => {
            likeButton.classList.add("element__feedback-like_active");

            console.log("new likes", res.likes);
            likeNumber.textContent = res.likes.length;

            likeNumber.classList.remove(
              "element__feedback-like-number_inactive"
            );
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

  #openPictures() {
    this.cardImage.addEventListener("click", () => {
      this.callBack.call(this, this.cardImage, this.pictureName);
    });
  }

  #setEventListeners(obj) {
    this.#openPictures();
    this.#addLike(obj["_id"]);
    this.#deleteCards(obj["_id"]);
  }

  #createMyCards(obj) {
    this.cardImage.src = obj.link;
    this.cardImage.alt = obj.name;
    this._cardElement.querySelector(".element__feedback-heading").textContent =
      obj.name;

    this.#setEventListeners(obj);

    return this._cardElement;
  }

  #createCard(obj, id) {
    this._cardElement = this.#createMyCards(obj);
    if (obj.likes.length > 0) {
      this._cardElement
        .querySelector(".element__feedback-like-number")
        .classList.remove("element__feedback-like-number_inactive");
      this._cardElement.querySelector(
        ".element__feedback-like-number"
      ).textContent = obj.likes.length;
    }

    if (obj.owner._id !== id) {
      this.#hideBucket();
    }
    for (let j = 0; j < obj.likes.length; j++) {
      if (obj.likes[j]._id === id) {
        this._cardElement
          .querySelector(".element__feedback-like")
          .classList.add("element__feedback-like_active");
      }
    }

    return this._cardElement;
  }

  outputCard(id) {
    if (id === 0) {
      return this.#createMyCards(this.cardData);
    } else {
      return this.#createCard(this.cardData, id);
    }
  }
}