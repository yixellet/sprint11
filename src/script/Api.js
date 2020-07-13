export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.headers.authorization;
    this.contentType = options.headers["Content-Type"];
  }

  parseResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Произошла ошибка'));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        authorization: this.authorization
      }
    })
      .then(this.parseResponse);
  }

  getUserProfile() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        authorization: this.authorization
      }
    })
      .then(this.parseResponse);
  }

  editUserProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        authorization: this.authorization
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this.parseResponse);
  }

  addCard(name, link) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        authorization: this.authorization
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this.parseResponse);
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        authorization: this.authorization
      }
    })
      .then(this.parseResponse);
  }
}