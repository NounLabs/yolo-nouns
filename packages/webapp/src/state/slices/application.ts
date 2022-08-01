import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AlertModal {
  show: boolean;
  title?: string;
  message?: string;
}

interface ApplicationState {
  alertModal: AlertModal;
  lastAttemptedNextNounId?: number | null;
  lastMintedBlockNumber?: number | null;
  showYOLONounId?: number | null;
}

const initialState: ApplicationState = {
  alertModal: {
    show: false
  },  
  lastAttemptedNextNounId: undefined,
  lastMintedBlockNumber: undefined,
  showYOLONounId: undefined
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setAlertModal: (state, action: PayloadAction<AlertModal>) => {
      state.alertModal = action.payload;
    },
    setLastAttemptedNextNounId: (state, action: PayloadAction<number>) => {
      state.lastAttemptedNextNounId = action.payload;
    },    
    setLastMintedBlockNumber: (state, action: PayloadAction<number | undefined>) => {
      state.lastMintedBlockNumber = action.payload;
    },    
    setShowYOLONounId: (state, action: PayloadAction<number>) => {
      state.showYOLONounId = action.payload;
    },    
  },
});

export const { setAlertModal, setLastAttemptedNextNounId, setLastMintedBlockNumber, setShowYOLONounId } = applicationSlice.actions;

export default applicationSlice.reducer;
