
export interface Roles{
    admin?: boolean;
}

export interface User{
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    roles: Roles;
}