import { FC, PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearPrevVotes } from '../../store/slices/data';
import { unlog } from '../../store/slices/user';
import { RootState } from '../../store/store';
import './Nav.css';

export const Nav: FC<PropsWithChildren> = () => {
	const activeClassName = 'active';

	const { username } = useSelector<RootState, RootState['user']>((state) => state.user);

	const dispatch = useDispatch();

	const logout = () => {
		dispatch(unlog());
		dispatch(clearPrevVotes(username));
	};

	return (
		<nav className="nav">
			<div className="nav__logo">
				<h1>Dish Poll</h1>
			</div>
			<ul className="nav__links">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? activeClassName : undefined
						}
						end
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/polls"
						className={({ isActive }) =>
							isActive ? activeClassName : undefined
						}
					>
						Polls
					</NavLink>
				</li>
				<li>
					<button onClick={logout}>Log out</button>
				</li>
			</ul>
		</nav>
	);
};
