import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Set, fromJS } from 'immutable';
import { IUser, users } from '../../models/user';

export interface IUserState {
	selected: Set<number>;
	prevSelected: Set<number>;
	logged: boolean;
	username: string;
}

const initialState: IUserState = {
	selected: Set(),
	prevSelected: Set(),
	logged: false,
	username: '',
};
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addDish: (state, action: PayloadAction<number>) => {
			const id = action.payload;

			if (state.selected.has(id)) {
				state.selected = state.selected.delete(id);
				// state.selected.add(id);
			} else {
				const update = state.selected.toArray();

				if (update.length === 3) {
					update.pop();
				}

				update.push(id);
				state.selected = Set(update);
			}
		},

		clearSelected: (state) => {
			state.selected = state.selected.clear();
		},
		log: (state, action: PayloadAction<IUser>) => {
			const { username, password } = action.payload;

			const hasUser = users.find(
				(e) => e.username === username && e.password === password
			);

			state.logged = !!hasUser;
			state.username = username;
		},

		unlog: (state) => {
			state.logged = false;
		},
		saveData: (state) => {
			localStorage.setItem(
				state.username,
				JSON.stringify(fromJS(state).toJS())
			);
		},
	},
});

export const { addDish, clearSelected, saveData, log, unlog } =
	userSlice.actions;
