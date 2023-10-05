const apiLink = 'https://norma.nomoreparties.space/api';

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getIngredients = () => {
  return fetch(`${apiLink}/ingredients`)
    .then(getResponseData)
    .then(data => {
      if(data?.success) return data.data;
      return Promise.reject(data)
    });
};