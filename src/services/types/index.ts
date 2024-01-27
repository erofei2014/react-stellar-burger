import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../services/store';
import { TAuthentificationActions } from '../actions/authentification';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TOrderDetailsActions } from '../actions/order-details';
import { TWsActions } from '../actions/wsActions';

type TApplicationActions = TAuthentificationActions | TBurgerConstructorActions | TBurgerIngredientsActions | TOrderDetailsActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;