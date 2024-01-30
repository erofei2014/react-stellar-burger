import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../services/store';
import { TAuthenticationActions } from '../actions/authentication';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TOrderDetailsActions } from '../actions/order-details';
import { TWsActions } from '../actions/wsActions';
import { rootReducer } from '../reducers';

export type TApplicationActions = TAuthenticationActions | TBurgerConstructorActions | TBurgerIngredientsActions | TOrderDetailsActions | TWsActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;