import { Iterable } from 'immutable';

/**
 * returns the index if found else -1
 * @param target
 * @param itr
 * @returns
 */
export const getIndex = <T>(target: T, itr: Iterable<any, T>) => {
	let idx = 0;

	for (let val of itr.toArray()) {
		if (val === target) {
			return idx;
		}

		idx++;
	}

	return -1;
};
