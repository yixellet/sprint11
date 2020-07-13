export class Card {
  constructor(popup, id, name, link, removeFromServer, ownerId, userId, likeCount) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.popup = popup;
    this.removeFromServer = removeFromServer;
    this.ownerId = ownerId;
    this.userId = userId;
    this.likeCount = likeCount;
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
    this.cardContainer = null;
  }

  create() {
    // Создает карточку
    const placeCard = document.createElement("div");
    placeCard.classList.add('place-card');
    placeCard.insertAdjacentHTML('beforeend', `
      <div class="place-card__image">
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class="place-card__likes-block">
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-count">${this.likeCount}</p>
        </div>
      </div>`);
    placeCard.querySelector(".place-card__name").textContent = this.name;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
    this.cardContainer = placeCard;
    this.likeButton = this.cardContainer.querySelector('.place-card__like-icon');
    this.image = this.cardContainer.querySelector('.place-card__image');
    if (this.ownerId === this.userId) {
      this.image.insertAdjacentHTML('beforeend', `<button class="place-card__delete-icon"></button>`);
      this.deleteButton = this.cardContainer.querySelector('.place-card__delete-icon');
    };
    this.setEventListeners();
    return placeCard;
  }

  like() {
    // Ставит лайк на карточку
    this.cardContainer.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    // Удаляет карточку
    if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
      this.removeEventListeners();
      this.removeFromServer(this.id);
      this.cardContainer.remove();
    }
    event.stopPropagation();
  };

  setEventListeners() {
    this.likeButton.addEventListener('click', this.like);
    if (this.ownerId === this.userId) {
      this.deleteButton.addEventListener('click', this.remove);
    }
    this.image.addEventListener('click', () => {
      this.popup.open(this.link);
    });
  }

  removeEventListeners() {
    this.likeButton.removeEventListener('click', this.like);
    if (this.ownerId === this.userId) {
      this.deleteButton.removeEventListener('click', this.remove);
    }
    this.image.removeEventListener('click', () => {
      this.popup.open(this.link);
    });
  }
}