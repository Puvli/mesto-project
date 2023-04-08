export function renderLoading(isLoading, btn) {
  // let button = btn.textContent;
  if (isLoading) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
    if (btn.classList.contains("card-popup__form-button")) {
      btn.textContent = "Создать";
    }
  }
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}
