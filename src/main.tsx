import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { Root } from './Root';
import { ErrorPage } from './components/ErrorPage';
import { Home } from './components/Home';
import { Login, loginAction } from './components/Login';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Auth } from './components/Auth';
import { Polls } from './components/Polls';
import { App } from './components/App';
import { enableMapSet } from 'immer';

enableMapSet();

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} errorElement={<ErrorPage />}>
			<Route element={<App />}>
				<Route index element={<Home />}></Route>
				<Route path="polls" element={<Polls />}></Route>
			</Route>
			<Route element={<Auth />}>
				<Route
					path="login"
					element={<Login />}
					action={loginAction}
				></Route>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
