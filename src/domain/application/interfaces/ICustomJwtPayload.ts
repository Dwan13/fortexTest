import { JwtPayload } from 'jwt-decode';

export interface ICustomJwtPayload extends JwtPayload {
    isAdmin: boolean;
    username: string;
    userId: number;
}