import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YOLONoun {
  latestNounId?: number | null;
}

const initialState: YOLONoun = {
  latestNounId: undefined
};

export const yoloNounSlice = createSlice({
  name: 'yoloNoun',
  initialState,
  reducers: {
    setLatestYOLONounId: (state, action: PayloadAction<number | undefined>) => {
      state.latestNounId = action.payload;
    }
    
  },
});

export const { setLatestYOLONounId } = yoloNounSlice.actions;

export default yoloNounSlice.reducer;