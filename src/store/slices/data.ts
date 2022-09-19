import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish } from '../../models/dish';
import dishJson from '../../data/db.json';
import { Iterable, OrderedMap, Set } from 'immutable';

const FIRST_RANK_POINTS = 30;
const SECOND_RANK_POINTS = 20;
const THIRD_RANK_POINTS = 10;
const PREVVOTES_KEY_START = 'prevVotes_';

export interface IDataState {
	dishes: {
		[key: number]: IDish;
	};
	prevVotes: Iterable<any, number>;
	points: OrderedMap<number, number>;
}
const initialState: IDataState = {
	dishes: {},
	prevVotes: Set(),
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
		clearPrevVotes: (state, action: PayloadAction<string>) => {
			const username = action.payload;

			localStorage.setItem(
				PREVVOTES_KEY_START + username,
				JSON.stringify(state.prevVotes.toArray())
			);
			state.prevVotes = Set();
		},
		initPrevVotes: (state, action: PayloadAction<string>) => {
			const username = action.payload;

			const prevVotesforCurrentUser = JSON.parse(
				localStorage.getItem(PREVVOTES_KEY_START + username)!
			);

			if (prevVotesforCurrentUser) {
				state.prevVotes = Set(prevVotesforCurrentUser);
			}
		},
		saveVotes: (state, action: PayloadAction<Iterable<any, number>>) => {
			const points = [
				FIRST_RANK_POINTS,
				SECOND_RANK_POINTS,
				THIRD_RANK_POINTS,
			];

			if (state.prevVotes.size > 0) {
				for (let [i, id] of state.prevVotes.toArray().entries()) {
					let update = state.points.get(id);
					update -= points[i];

					state.points = state.points
						.set(id, update)
						.sort((a, b) => b - a)
						.toOrderedMap();
				}
			}

			for (let [i, id] of action.payload.toArray().entries()) {
				let update = state.points.get(id);
				update += points[i];

				state.points = state.points
					.set(id, update)
					.sort((a, b) => b - a)
					.toOrderedMap();
			}

			state.prevVotes = action.payload;
		},
	},
});

export const { addDishes, saveVotes, clearPrevVotes, initPrevVotes } =
	dataSlice.actions;
