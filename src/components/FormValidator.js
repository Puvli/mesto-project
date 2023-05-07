export class FormValidator {
  constructor(obj, form) {
    this.obj = obj;
    this.form = form;
  }

  #showInputError = (
    formElement,
    inputElement,
    errorMessage,
    error,
    errorActive
  ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(error);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorActive);
  };

  #hideInputError = (formElement, inputElement, error, errorActive) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(error);
    errorElement.classList.remove(errorActive);
    errorElement.textContent = "";
  };

  #hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  #toggleButtonState = (inputList, buttonElement, inactiveClass) => {
    if (this.#hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveClass);
    }
  };

  #isValid = (formElement, inputElement, error, errorActive) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this.#showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        error,
        errorActive
      );
    } else {
      this.#hideInputError(formElement, inputElement, error, errorActive);
    }
  };

  #setEventListeners = (formElement, obj) => {
    const inputList = Array.from(
      formElement.querySelectorAll(obj.inputSelector)
    );
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    this.#toggleButtonState(inputList, buttonElement, obj.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#isValid(
          formElement,
          inputElement,
          obj.inputErrorClass,
          obj.errorClass
        );

        this.#toggleButtonState(
          inputList,
          buttonElement,
          obj.inactiveButtonClass
        );
      });
    });
  };

  enableValidation() {
    this.#setEventListeners(this.form, this.obj);
  }
}
