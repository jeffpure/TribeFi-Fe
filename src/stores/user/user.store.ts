
import { createSlice } from '@reduxjs/toolkit';

import util from '@/libs/util';

const initialState = {
  ...util.getGlobalState(),
  locale: (util.cookies.get('locale')! || 'zh_CN') as any,
  collapsed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
