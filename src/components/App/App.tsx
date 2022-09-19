import { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import './App.css';
import { Nav } from './Nav';

export const App: FC<PropsWithChildren> = () => {
	const { logged } = useSelector<RootState, RootState['user']>(
		(state) => state.user
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (!logged) navigate('login');
	}, [logged]);

	return (
		<div className="App">
			<Nav />
			<div className="container">
				<Outlet></Outlet>
			</div>
		</div>
	);
};
