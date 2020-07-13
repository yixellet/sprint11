import {Popup} from './Popup.js';

export class ImagePopup extends Popup {
  constructor(popupId) {
    super(popupId);
    this.picture = this.popupElement.querySelector('.popup__picture');
  }
  open(imageUrl) {
    // Открывает карточку     
    this.picture.src = imageUrl;
    super.open();
  }
}