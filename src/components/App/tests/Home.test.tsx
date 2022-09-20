import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	createMemoryRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { renderWithProvider } from '../../../test/renderWithProvider';
import { Home } from '../Home';
import { Set, OrderedMap } from 'immutable';
import { vi } from 'vitest';
import { getDummmyDish } from '../../../test/utils';

const mockedUseNavigate = vi.fn();

// mock react router
vi.mock('react-router-dom', async () => {
	const reactRouterDom = await vi.importActual<any>('react-router-dom');
	return {
		...reactRouterDom,
		useNavigate: () => mockedUseNavigate,
	};
});

const router = createMemoryRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />}></Route>
		</>
	)
);

const dummyDish1 = getDummmyDish(1);
const dummyDish2 = getDummmyDish(2);
const dummyDish3 = getDummmyDish(3);

const preloadedState = {
	user: {
		selected: Set(),
	},
	data: {
		dishes: {
			1: dummyDish1,
			2: dummyDish2,
			3: dummyDish3,
		},
		prevVotes: Set(),
		points: OrderedMap(),
	},
};

describe('Test for Home component', () => {
	it('should render dishes properly', async () => {
		renderWithProvider(<RouterProvider router={router} />, {
			preloadedState,
		});

		screen.findByText(dummyDish1.dishName);
		screen.findByText(dummyDish2.dishName);
	});

	it('should select a dish', async () => {
		renderWithProvider(<RouterProvider router={router} />, {
			preloadedState,
		});

		const dish1 = screen.getByText(dummyDish1.dishName).parentElement
			?.parentElement;

		await userEvent.click(dish1!);
		expect(dish1!.classList.contains('selected')).toBe(true);
	});

	it('should go to Polls component  on submit', async () => {
		renderWithProvider(<RouterProvider router={router} />, {
			preloadedState,
		});

		const dish1 = screen.getByText(dummyDish1.dishName).parentElement
			?.parentElement;
		const dish2 = screen.getByText(dummyDish2.dishName).parentElement
			?.parentElement;
		const dish3 = screen.getByText(dummyDish3.dishName).parentElement
			?.parentElement;

		// click 'em all
		await userEvent.click(dish1!);
		await userEvent.click(dish2!);
		await userEvent.click(dish3!);

		await userEvent.click(screen.getByText(/submit/i));
		expect(mockedUseNavigate).toBeCalled();
	});
});
