import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Home.css';

export const Polls: FC<PropsWithChildren> = () => {
	const { points, dishes } = useSelector<RootState, RootState['data']>(
		(state) => state.data
	);
	const { selected } = useSelector<RootState, RootState['user']>(
		(state) => state.user
	);

	return (
		<>
			<div className="options">
				<h2>Polls</h2>
			</div>
			<div className="grid">
				{points
					.keySeq()
					.toArray()
					.map((id) => {
						const dish = dishes[id];
						const pointsGiven = points.get(id);

						return (
							<div
								className={
									selected.has(dish.id!)
										? 'selected card'
										: 'card'
								}
								key={dish.id!}
							>
								{`${dish.dishName}: ${pointsGiven} points`}
							</div>
						);
					})}
			</div>
			)
		</>
	);
};
