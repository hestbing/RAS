import { configureStore } from '@reduxjs/toolkit';
import { userReducer, administrationReducer, fucultiesReducer } from './slices';

export const store = configureStore({
    reducer: {
        administration: administrationReducer,
        fuculties: fucultiesReducer,
        user: userReducer
    }
}) 

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch