class Api {
  constructor (options) {
    this._url = options.baseUrl
    this._headers = options.headers
    this._authorization = options.headers.authorization
  }

  _checkResponse (res) {
    return res.ok ? res.json() : Promise.reject
  }

  getInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    }).then(this._checkResponse)
  }

  getCards () {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    }).then(this._checkResponse)
  }

  setUserInfo (data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then(this._checkResponse)
  }

  setNewAvatar (data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse)
  }

  addCard (data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    }).then(this._checkResponse)
  }

  addLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    }).then(this._checkResponse)
  }

  removeLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then(this._checkResponse)
  }

  removeCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then(this._checkResponse)
  }
}

//создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '56ca6cc4-cb7f-453a-ad4f-0eadc019fb12',
    'Content-Type': 'application/json'
  }
})

export default api
