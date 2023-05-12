export class FormValidator {
  constructor(obj, form) {
    this.obj = obj;
    this.form = form;
    this.inputList = Array.from(
      this.form.querySelectorAll(this.obj.inputSelector)
    );
    this.buttonElement = this.form.querySelector(this.obj.submitButtonSelector);
  }

  #showInputError = (inputElement) => {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.obj.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.obj.errorClass);
  };

  #hideInputError = (inputElement) => {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.obj.inputErrorClass);
    errorElement.classList.remove(this.obj.errorClass);
  };

  #hasInvalidInput = () => {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  #toggleButtonState = (inputList) => {
    if (this.#hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this.buttonElement.disabled = true;
      this.buttonElement.classList.add(this.obj.inactiveButtonClass);
    } else {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(this.obj.inactiveButtonClass);
    }
  };

  resetValidation() {
    this.inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
      this.#toggleButtonState(inputElement);
    });
  }

  #isValid = (inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement);
    } else {
      this.#hideInputError(inputElement);
    }
  };

  #setEventListeners = () => {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#isValid(inputElement);

        this.#toggleButtonState(inputElement);
      });
    });
  };

  disableButton() {
    this.buttonElement.disabled = true;
  }

  enableValidation() {
    this.#setEventListeners();
  }
}
