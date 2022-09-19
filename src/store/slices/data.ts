import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish } from '../../models/dish';
import dishJson from '../../data/db.json';
import { Iterable, OrderedMap } from 'immutable';

export interface IDataState {
	dishes: {
		[key: number]: IDish;
	};
	points: OrderedMap<number, number>;
}
const initialState: IDataState = {
	dishes: {},
	points: OrderedMap(),
};
export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		addDishes: (state) => {
			for (let dish of dishJson as IDish[]) {
				state.dishes[dish.id!] = dish;
			}
			for (let dish of Object.values(state.dishes)) {
				state.points = state.points.set(dish.id!, 0);
			}
		},
		saveVotes: (state, action: PayloadAction<Iterable<any, number>>) => {
			let position = 0;
			const points = [30, 20, 10];

			for (let id of action.payload.toArray()) {
				let update = state.points.get(id);
				update += points[position];

				state.points = state.points
					.set(id, update)
					.sort((a, b) => b - a)
					.toOrderedMap();
				position++;
			}
		},
	},
});

export const { addDishes, saveVotes } = dataSlice.actions;
