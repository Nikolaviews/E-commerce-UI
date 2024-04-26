export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
  