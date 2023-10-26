const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredients = () => request('ingredients');

export const getOrderNumber = (orderElements) => request(
  'orders',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'ingredients': orderElements
    })
  }
);