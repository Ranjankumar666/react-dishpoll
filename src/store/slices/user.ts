import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Set, fromJS } from 'immutable';
import { IUser, users } from '../../models/user';

export interface IUserState {
	selected: Set<number>;
	logged: boolean;
	username: string;
}

const initialState: IUserState = {
	selected: Set(),
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

			const cachedUserData = JSON.parse(localStorage.getItem(username)!);

			if (cachedUserData) {
				state.selected = Set(cachedUserData);
			}
		},

		unlog: (state) => {
			localStorage.setItem(
				state.username,
				JSON.stringify(state.selected.toJS())
			);
			state.logged = false;
			state.selected = state.selected.clear();
			state.username = '';
		},
	},
});

export const { addDish, clearSelected, log, unlog } = userSlice.actions;
