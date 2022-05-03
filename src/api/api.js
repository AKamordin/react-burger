import {BASE_API_URL} from "../utils/constants";

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
  }

  async doAsyncGetRequest(url, onSuccess = (f) => f, onError = (f) => f) {
    try {
      const res = await fetch(`${this._baseUrl}/${url}`, this._getDefaultConfig())
      let json
      try {
        json = await res.json()
      } catch (err) {
        json = null
      }
      if (!json) {
        this._handleError(res)
      }
      return onSuccess(json)
    } catch (err) {
      onError(err)
    }
  }

  async doAsyncPostRequest(url, data, onSuccess = (f) => f, onError = (f) => f) {
    try {
      const res = await fetch(`${this._baseUrl}/${url}`, {
        ...this._getDefaultConfig(),
        method: 'POST',
        body: JSON.stringify(data)
      })
      let json
      try {
        json = await res.json()
      } catch (err) {
        json = null
      }
      if (!json) {
        this._handleError(res)
      }
      return onSuccess(json)
    } catch (err) {
      onError(err)
    }
  }

  _handleError(res) {
    if (!res.ok) {
      const text = res.statusText ? res.statusText : res.url;
      const message = `Ошибка: ${res.status} - ${text}`;
      throw new Error(message);
    }
  }

  _getDefaultConfig() {
    return {
      headers: {
        "Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
      }
    }
  }
}

const api = new Api({baseUrl: BASE_API_URL})

export default api;
