import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
}

interface SelectedItemsState {
  selectedItems: Item[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Item>) => {
      state.selectedItems.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter((item) => item.id !== action.payload);
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
