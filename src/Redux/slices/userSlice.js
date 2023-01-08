import {createSlice} from '@reduxjs/toolkit';
export var UserSlice = createSlice({
  name: 'user',
  initialState: {
    Token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      console.log('Token set', JSON.stringify(action.payload));
      state.Token = action.payload;
    },
    setUser: (state, action) => {
      console.log('user set', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    cleardata: (state, action) => {
      (state.Token = null), console.log('All data clear');
    },
  },
});

export const getToken = state => {
  return state.user.Token;
};
export const getUser = state => {
  return state.user.user;
};
export const {setToken, setUser} = UserSlice.actions;

export default UserSlice.reducer;
