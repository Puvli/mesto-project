export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closeEscButton(popup) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
}
