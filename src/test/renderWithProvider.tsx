import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { dataSlice } from '../store/slices/data';
import { userSlice } from '../store/slices/user';
import { AppStore, serializableMiddleware } from '../store/store';

// Extends the default render function
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: any;
	store?: AppStore;
}

// new render funvtiom with provider
export const renderWithProvider = (
	ui: ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in]
		store = configureStore({
			reducer: {
				data: dataSlice.reducer,
				user: userSlice.reducer,
			},
			preloadedState,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: false,
				}).concat(serializableMiddleware),
		}),
		...renderOptions
	}: ExtendedRenderOptions = {}
) => {
	// Make a wrapper
	// to include provider
	const Wrapper: (props: PropsWithChildren) => JSX.Element = ({
		children,
	}) => {
		return <Provider store={store}>{children}</Provider>;
	};

	return {
		store,
		...render(ui, {
			wrapper: Wrapper,
			...renderOptions,
		}),
	};
};
