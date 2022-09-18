import {
	configureStore,
	createSerializableStateInvariantMiddleware,
	isPlain,
} from '@reduxjs/toolkit';
import { dataSlice } from './slices/data';
import { userSlice } from './slices/user';

import { Iterable } from 'immutable';

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) =>
	Iterable.isIterable(value) || isPlain(value);

const getEntries = (value: any) =>
	Iterable.isIterable(value) ? value.entries() : Object.entries(value);

const serializableMiddleware = createSerializableStateInvariantMiddleware({
	isSerializable,
	getEntries,
});

export const store = configureStore({
	reducer: {
		data: dataSlice.reducer,
		user: userSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(serializableMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
