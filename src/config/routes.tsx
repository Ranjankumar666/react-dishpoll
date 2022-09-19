import { createRoutesFromElements, Route } from 'react-router-dom';
import { App } from '../components/App/App';
import { Home } from '../components/App/Home';
import { Polls } from '../components/App/Polls';
import { Auth } from '../components/Auth/Auth';
import { Login, loginAction } from '../components/Auth/Login';
import { ErrorPage } from '../components/ErrorPage';
import { Root } from '../Root';

export const routes = createRoutesFromElements(
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
);
