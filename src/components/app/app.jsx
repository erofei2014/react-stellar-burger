import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from '../app-header/app-header.jsx';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <body className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={data}
        />
        <BurgerConstructor elements={data} />
      </main>
    </body>
  );
}

export default App;
