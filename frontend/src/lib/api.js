class Api {
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };
  }

  static get(route, token = null) {
    return this.xhr(route, null, 'GET', token);
  }

  static put(route, params, token = null) {
    return this.xhr(route, params, 'PUT', token);
  }

  static post(route, params, token = null) {
    return this.xhr(route, params, 'POST', token);
  }

  static delete(route, params, token = null) {
    return this.xhr(route, params, 'DELETE', token);
  }

  static xhr(route, params, verb, token) {
    const host = 'http://localhost:3001';
    const url = `${host}${route}`;
    let options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null
    );
    options.headers = Api.headers();

    if (token) {
      options.headers['Authorization'] = token;
    }

    return fetch(url, options).then(resp => {
      return resp;
    });
  }
}

export default Api;
