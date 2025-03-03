export interface AuthState {
    isLoggedIn: boolean;
    user: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any; // Или более конкретный тип, если знаете структуру user
    };
}
