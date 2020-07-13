import {Popup} from './Popup.js';

export class NewCardPopup extends Popup {
  constructor(popupId, sendNewCardToServer, cardList, resetErrors, createNewCard) {
    super(popupId);
    this.sendNewCardToServer = sendNewCardToServer;
    this.cardList = cardList;
    this.resetErrors = resetErrors;
    this.createNewCard = createNewCard;
    this.form = this.popupElement.querySelector('.popup__form');
    this.submit = this.submit.bind(this);
    this.setEventListeners();
  }

  open() {
    this.form.reset();
    this.resetErrors();
    super.open();
  }

  submit(event) {
    event.preventDefault();
    // Длинные строки следует переносить -- так код легче читается
    // Можно лучше
    this.sendNewCardToServer(this.form.elements.name.value, this.form.elements.url.value).then(res => {
      this.cardList.addToContainer(this.createNewCard(res._id, res.name, res.link, res.owner._id, res.likes.length));
    })
      .catch(err => { console.log(err) });
    this.form.reset();
    super.close();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submit);
  }
}