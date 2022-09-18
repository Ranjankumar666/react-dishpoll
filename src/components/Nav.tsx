import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export const Nav: FC<PropsWithChildren> = () => {
	const activeClassName = 'active';

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
			</ul>
		</nav>
	);
};
