import {BASE_API_URL} from "../utils/constants";

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
  }

  async doAsyncGetRequest(url) {
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
    return json
  }

  async doAsyncPostRequest(url, data) {
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
    return json
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
