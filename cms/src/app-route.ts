export const appRoute = {
    root: {
        path: '/',
    },
    user: {
        path: '/user',
    },
    userEdit: {
        path: '/user-edit/:userId' as const,
    },
};
