export function renderLoading(isLoading, btn) {
  if (isLoading) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
}
