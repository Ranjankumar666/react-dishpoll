import { Outlet, useLoaderData } from 'react-router-dom';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addDishes } from './store/slices/data';

export const Root: FC<PropsWithChildren> = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(addDishes());
	}, []);

	return (
		<div>
			<Outlet></Outlet>
		</div>
	);
};
