export function handleResponse(response) {
  if (response.results) {
    return Promise.resolve(response.results);
  }

  if (response.data) {
    return Promise.resolve(response.data);
  }

  return Promise.resolve(response);
}

export function handleError(error) {
  if (error.data) {
    return Promise.reject(error.data);
  }

  if (error.response.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error);
}
