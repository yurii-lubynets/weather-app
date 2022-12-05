import { combineReducers } from '@reduxjs/toolkit';
import { weatherApi } from 'src/services/weatherService';

const appReducer = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export type AppReducer = ReturnType<typeof appReducer>;

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const resetAppAction = () => (dispatch) => {
  dispatch({ type: 'RESET_APP' });
};

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
