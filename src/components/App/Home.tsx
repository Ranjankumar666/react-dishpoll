import { FC, PropsWithChildren, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { saveVotes } from '../../store/slices/data';
import { addDish, clearSelected } from '../../store/slices/user';
import { RootState } from '../../store/store';
import { getIndex } from '../../utils/utils';
import './Home.css';

export const Home: FC<PropsWithChildren> = () => {
	const { dishes } = useSelector<RootState, RootState['data']>(
		(state) => state.data
	);
	const { selected } = useSelector<RootState, RootState['user']>(
		(state) => state.user
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const selectDish = (id: number) => {
		dispatch(addDish(id));
	};

	const resetSelected = () => {
		dispatch(clearSelected());
	};

	const castVote = () => {
		dispatch(saveVotes(selected));
		navigate('polls');
	};

	return (
		<>
			<div className="options">
				<h2>Vote for your favourite dish 🍔🍔🍕</h2>
				<button onClick={castVote} disabled={selected.size !== 3}>
					Submit
				</button>
				<button onClick={resetSelected}>Reset</button>
			</div>

			<div className="grid">
				{Object.values(dishes).map((dish) => {
					return (
						<div
							className={
								selected.has(dish.id!)
									? 'card  pointer selected'
									: 'card pointer'
							}
							key={dish.id}
							onClick={() => {
								selectDish(dish.id!);
							}}
						>
							{selected.has(dish.id!) && (
								<span className="selected__rank">
									{getIndex<number>(dish.id!, selected) + 1}
								</span>
							)}
							<div className="card__image">
								<img
									src={dish.image}
									alt={dish.dishName + ' image'}
								/>
							</div>
							<div className="card__details">
								<h3>{dish.dishName}</h3>
								<p>{dish.description}</p>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
