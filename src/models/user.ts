import userJson from '../data/users.json';

export interface IUser {
	id?: number;
	username: string;
	password: string;
}

export const users: IUser[] = userJson;
