import {Popup} from './Popup.js';

export class EditProfilePopup extends Popup {
  constructor(popupId, user, resetErrors, sendUserInfoToServer) {
    super(popupId);
    this.user = user;
    this.resetErrors = resetErrors;
    this.sendUserInfoToServer = sendUserInfoToServer;
    this.form = this.popupElement.querySelector('.popup__form');
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
    this.setEventListeners();
  }
  
  open() {
    this.form.reset();
    this.form.elements.name.value = this.user.getUserInfo().name;
    this.form.elements.info.value = this.user.getUserInfo().info;
    this.resetErrors();
    super.open();
  }

  submit(event) {
    event.preventDefault();
    this.sendUserInfoToServer(this.form.elements.name.value, this.form.elements.info.value);
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submit)
  }
}