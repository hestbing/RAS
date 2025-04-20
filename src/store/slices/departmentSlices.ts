import { UnknownAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Fuculty } from "../../types/models";
import {
    getFuculties, 
    addFuculties,
    editFuculties,
    deleteFuculties,
    addVisitors,
    editVisitors,
    deleteVisitors,
    addDepart,
    deleteDepart,
    uploadFile,
    deleteFile
} from '../../services';

const NAME = 'fuculties'

interface FucultiesState {
    fuculties: Array<Fuculty>
    loading: boolean
    fucultiesError?: string | null
}

const initialState: FucultiesState = {
    fuculties: [],
    loading: false,
    fucultiesError: undefined
};

const isLoading = (action: UnknownAction) => action.type.endsWith('pending')
const isError = (action: UnknownAction) => action.type.endsWith('rejected')

const setState = (state: any, action: any) => {
    state.fuculties = action.payload;
    state.fucultiesError = undefined;
    state.loading = false;
};

const fucultiesSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFuculties.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addFuculties.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editFuculties.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteFuculties.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addVisitors.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editVisitors.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteVisitors.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addDepart.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteDepart.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addMatcher(isLoading, (state) => {
                state.loading = true;
                state.fucultiesError = undefined;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.fucultiesError = action.payload;
            })
    },
});

export const fucultiesReducer = fucultiesSlice.reducer