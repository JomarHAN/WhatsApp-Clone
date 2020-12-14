import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    chatName: null,
    chatTime: null,
    chatClick: false
  },
  reducers: {
    setChatRoom: (state, action) => {
      state.chatId = action.payload.chatId;
      state.chatName = action.payload.chatName;
      state.chatTime = action.payload.chatTime
    },
    setClick: (state, action) => {
      state.chatClick = action.payload.chatClick
    }
  }
});

export const { setChatRoom, setClick } = chatSlice.actions;

export const selectChatId = state => state.chat.chatId;
export const selectChatName = state => state.chat.chatName;
export const selectChatTime = state => state.chat.chatTime;
export const selectChatClick = state => state.chat.chatClick;

export default chatSlice.reducer;
