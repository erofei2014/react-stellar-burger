import React from "react";
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../utils/burger-api";

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    getIngredients()
      .then(data => setState({ ...state, data: data, isLoading: false }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

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
