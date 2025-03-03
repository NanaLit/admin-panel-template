// types/reduxTypes.ts
import { store } from '../store'; // Путь к вашему store

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;
