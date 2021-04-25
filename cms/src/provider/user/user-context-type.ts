export type UserType = {
    login: string;
};

export type UserContextType = {
    login: (login: string, password: string) => Promise<UserType>;
    isLoggedIn: boolean;
};
