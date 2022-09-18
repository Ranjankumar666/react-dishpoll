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
		dispatch(clearSelected());
		dispatch(unlog());
	};

	return (
		<div className="">
			<div className="">
				<button onClick={logout}>Log out</button>
			</div>
			<h1>Polls</h1>
			<div className="grid">
				{Object.values(points).map(([dish, votes]) => {
					return (
						<div
							className={
								selected.has(dish.id!)
									? 'selected card'
									: 'card'
							}
							key={dish.id!}
						>
							{dish.dishName}: {votes} votes
						</div>
					);
				})}
			</div>
		</div>
	);
};
