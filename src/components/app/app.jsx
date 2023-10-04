import React from "react";
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

const apiLink = 'https://norma.nomoreparties.space/api';

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  React.useEffect(() => {
    getIngredients();
  }, []);

  const getResponseData = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(`${apiLink}/ingredients`)
      .then(getResponseData)
      .then(data => setState({ ...state, data: data.data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка'}
        {!state.isLoading &&
          !state.hasError &&
          state.data.length &&
        <>
          <BurgerIngredients
            ingredients={state.data}
          />
          <BurgerConstructor elements={state.data} />
        </>}
      </main>
    </div>
  );
}

export default App;
