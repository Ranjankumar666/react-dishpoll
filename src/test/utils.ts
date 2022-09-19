import { IDish } from '../models/dish';

export const getDummmyDish: (id: number) => IDish = (id) => {
	return {
		id,
		dishName: 'example' + id,
		description: 'dummy description',
		image: 'dfjjdf',
	};
};
