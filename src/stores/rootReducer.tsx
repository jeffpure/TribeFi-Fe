import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from './system/global.store';
import userReducer from './user/user.store';

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});

export default rootReducer;
