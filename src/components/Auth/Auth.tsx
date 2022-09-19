import { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import './Auth.css';

export const Auth: FC<PropsWithChildren> = () => {
	const { logged } = useSelector<RootState, RootState['user']>(
		(state) => state.user
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (logged) navigate('/');
	}, [logged]);
	return (
		<div className="auth_container">
			<Outlet></Outlet>
		</div>
	);
};
