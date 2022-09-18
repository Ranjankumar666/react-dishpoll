import { FC, PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelected, unlog } from '../store/slices/user';
import { RootState } from '../store/store';
import './Home.css';

export const Polls: FC<PropsWithChildren> = () => {
	const { points } = useSelector<RootState, RootState['data']>(
		(state) => state.data
	);
	const { selected } = useSelector<RootState, RootState['user']>(
		(state) => state.user
	);

	const dispatch = useDispatch();

	const logout = () => {
		dispatch(unlog());
	};

	return (
		<>
			<div className="options">
				<h2>Polls</h2>
				<button onClick={logout}>Log out</button>
			</div>

			<div className="grid">
				{Object.values(points).map(([dish, points]) => {
					return (
						<div
							className={
								selected.has(dish.id!)
									? 'selected card'
									: 'card'
							}
							key={dish.id!}
						>
							{dish.dishName}: {points} points
						</div>
					);
				})}
			</div>
		</>
	);
};
