import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish } from '../../models/dish';
import dishJson from '../../data/db.json';
import { Iterable } from 'immutable';

export interface IDataState {
	dishes: IDish[];
	points: {
		[key: number]: [IDish, number];
	};
}
const initialState: IDataState = {
	dishes: [],
	points: {},
};
export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		addDishes: (state) => {
			state.dishes = dishJson as IDish[];
			for (let dish of state.dishes) {
				state.points[dish.id!] = [dish, 0];
			}
		},
		saveVotes: (state, action: PayloadAction<Iterable<any, number>>) => {
			let position = 0;
			const points = [30, 20, 10];

			for (let id of action.payload.toArray()) {
				state.points[id][1] += points[position];
				position++;
			}
		},
	},
});

export const { addDishes, saveVotes } = dataSlice.actions;
