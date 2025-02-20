import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish } from '../../models/dish';
import { Iterable, OrderedMap, Set } from 'immutable';

const FIRST_RANK_POINTS = 30;
const SECOND_RANK_POINTS = 20;
const THIRD_RANK_POINTS = 10;
const PREVVOTES_KEY_START = 'prevVotes_';
const DISHES_DATA_URL =
	'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json ';

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

export const addDishes = createAsyncThunk('data/addDishes', async () => {
	const res = await fetch(DISHES_DATA_URL);
	const body = await res.json();

	return body;
});

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		clearPrevVotes: (state, action: PayloadAction<string>) => {
			const username = action.payload;

			// cache the prevVotes
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

			// remove previous votes if exits
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
			// update the new votes
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

	extraReducers(builder) {
		builder.addCase(
			addDishes.fulfilled,
			(state, action: PayloadAction<IDish[]>) => {
				const dishes = action.payload;
				// add to dishes
				for (let dish of dishes as IDish[]) {
					state.dishes[dish.id!] = dish;
				}
				// initialize the votes
				for (let dish of Object.values(state.dishes)) {
					state.points = state.points.set(dish.id!, 0);
				}
			}
		);
	},
});

export const { saveVotes, clearPrevVotes, initPrevVotes } = dataSlice.actions;
