import { configureStore } from '@reduxjs/toolkit';
import {apiService} from "../instance/axiosBaseQuery";
import chatSlice from "./slices/chat/chat-slice";
import appSlices from "./slices/app/app-slices";


const store = configureStore({
    reducer: {
        app: appSlices,
        chat:chatSlice,
        [apiService.reducerPath]: apiService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export default store;
