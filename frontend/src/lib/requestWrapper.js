const NO_RESPONSE_STATUS = 204;

export function makeRequest(request) {
  return request.then(response => {
    if (response.status === NO_RESPONSE_STATUS) {
      return {};
    }

    const responseJson = response.json();

    if (response.ok) {
      return responseJson;
    }

    return responseJson.then(error => {
      throw error;
    });
  });
}
