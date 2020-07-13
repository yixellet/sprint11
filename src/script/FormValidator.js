export class FormValidator {
  constructor(form) {
    this.form = form;
    this.submitButton = this.form.elements.submit;
    this.renderErrorElement = this.renderErrorElement.bind(this);
    this.handleInputForm = this.handleInputForm.bind(this);
  }

  checkInputValidity(field) {
    // Функция проверяет валидность поля и устанавливает кастомное сообщение

    // Можно лучше (практически надо исправить)
    // Объект с текстом ошибок должен быть передан в класс валидатора

    // Тексты ошибок
    const errorMessages = {
      empty: 'Это обязательное поле',
      wrongLength: 'Должно быть от 2 до 30 символов',
      wrongUrl: 'Здесь должна быть ссылка'
    };
    field.setCustomValidity('');

    if (field.validity.valueMissing) {
      field.setCustomValidity(errorMessages.empty);
      return false;
    }

    if (field.validity.tooShort || field.validity.tooLong) {
      field.setCustomValidity(errorMessages.wrongLength);
      return false;
    }

    if (field.validity.typeMismatch && field.type === 'url') {
      field.setCustomValidity(errorMessages.wrongUrl);
      return false;
    }
    return field.checkValidity();
  };

  checkFormValidity() {
    // Проверяет валидность всей формы
    const fields = this.form.querySelectorAll('.popup__input');
    let isValid = true;
    fields.forEach((field) => {
      if (!this.renderErrorElement(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  setSubmitButtonState(state) {
    // Меняет состояние кнопки
    if (state) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.remove('popup__button_disabled');
    } else {
      this.submitButton.setAttribute('disabled', true);
      this.submitButton.classList.add('popup__button_disabled');
    }
  };

  renderErrorElement(field) {
    // Запускает проверку валидности и назначает элементу ошибки текст
    const errorElement = this.form.querySelector(`#error-${field.id}`);
    const isValid = this.checkInputValidity(field);
    errorElement.textContent = field.validationMessage;
    return isValid;
  };

  resetErrors() {
    const fields = this.form.querySelectorAll('.popup__input');
    fields.forEach((field) => {
      this.form.querySelector(`#error-${field.id}`).textContent = '';
      field.setCustomValidity('');
    });
    this.setSubmitButtonState(this.form.checkValidity());
  }

  handleInputForm(event) {
    // Слушатель событий на инпутах
    this.renderErrorElement(event.target);
    this.setSubmitButtonState(this.form.checkValidity());
  };

  setEventListeners() {
    this.form.addEventListener('input', this.handleInputForm);
  };
}