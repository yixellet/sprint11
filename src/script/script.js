import {Api} from './Api.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {EditProfilePopup} from './EditProfilePopup.js';
import {FormValidator} from './FormValidator.js';
import {ImagePopup} from './ImagePopup.js';
import {NewCardPopup} from './NewCardPopup.js';
import {UserInfo} from './UserInfo.js';

import '../pages/index.css';

const API_URL = process.env.NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';
const api = new Api({
  baseUrl: '${API_URL}/cohort11',
  headers: {
    authorization: 'ae4ba36d-0185-466a-bd72-ffd163f7adae',
    'Content-Type': 'application/json'
  }
});

// Создание списка карточек
const cardList = new CardList(document.querySelector('.places-list'));

// Определение дефолтного пользователя и добавление его данных на страницу
const user = new UserInfo(
  document.querySelector('.user-info__name'),
  document.querySelector('.user-info__job'),
  document.querySelector('.user-info__photo')
);

// Получаем от сервера информацию о пользователе
api.getUserProfile().then(res => {
  user.setUserInfo(res._id, res.name, res.about, res.avatar);
  user.updateUserInfo();
})
  .catch(err => { console.log(err) });

// Кнопка добавления новой карточки
const addButton = document.querySelector('.user-info__button');

// Кнопка редактирования профиля
const editButton = document.querySelector('.user-info__button-edit-profile');

// Попап карточки
const openCardPopup = new ImagePopup(document.querySelector('#openCardPopup'));


function createNewCard(id, name, link, ownerId, likesList) {
  // Создание новой карточки
  const card = new Card(openCardPopup, id, name, link, deleteCardFromServer, ownerId, user.id, likesList);
  card.create();
  return card;
}

function sendUserInfoToServer(name, about) {
  // Отправка новых данных пользователя на сервер
  api.editUserProfile(name, about).then(res => {
    user.setUserInfo(res._id, res.name, res.about, res.avatar);
    user.updateUserInfo();
    editProfilePopup.close();
  })
    .catch(err => { console.log(err) });
}

function sendNewCardToServer(name, link) {
  //Отправка новой карточки на сервер
  return api.addCard(name, link)
}

function deleteCardFromServer(id) {
  // Удаление карточки с сервера
  api.deleteCard(id).then(res => {
    console.log(res)
  })
    .catch(err => console.log(err))
}

function resetEditErrors() {
  // Сброс ошибок формы редактирования профиля
  editProfileValidator.resetErrors()
}

function resetNewCardErrors() {
  // Сброс ошибок формы добавления карточки
  newCardValidator.resetErrors()
}

// Попап добавления новой карточки
const newCardPopup = new NewCardPopup(document.querySelector('#newCardPopup'), sendNewCardToServer, cardList, resetNewCardErrors, createNewCard);
const newCardValidator = new FormValidator(newCardPopup.form);
newCardValidator.setEventListeners();

// Попап редактирования профиля
const editProfilePopup = new EditProfilePopup(document.querySelector('#editProfilePopup'), user, resetEditErrors, sendUserInfoToServer);
const editProfileValidator = new FormValidator(editProfilePopup.form);
editProfileValidator.setEventListeners();

// Загрузка карточек с сервера
api.getInitialCards().then(res => {
  res.forEach(function (item) {
    cardList.addCard(createNewCard(item._id, item.name, item.link, item.owner._id, item.likes.length));
  });
  cardList.render();
})
  .catch(err => { console.log(err) });


editButton.addEventListener('click', editProfilePopup.open);

addButton.addEventListener('click', newCardPopup.open);
