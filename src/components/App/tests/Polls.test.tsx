import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Set, OrderedMap } from 'immutable';
import { renderWithProvider } from '../../../test/renderWithProvider';
import { getDummmyDish } from '../../../test/utils';
import { Polls } from '../Polls';

describe('Test for Polls component', () => {
	const dummyDish1 = getDummmyDish(1);

	const preloadedState = {
		user: {
			selected: Set([dummyDish1.id!]),
		},
		data: {
			dishes: {
				1: dummyDish1,
			},
			prevVotes: Set(),
			points: OrderedMap({
				1: 30,
			}),
		},
	};

	it('should render dishes properly', async () => {
		renderWithProvider(<Polls />, {
			preloadedState,
		});

		const dish1 = screen.getByText(new RegExp(dummyDish1.dishName, 'i'));
		expect(dish1.classList.contains('selected')).toBe(true);
	});
});
