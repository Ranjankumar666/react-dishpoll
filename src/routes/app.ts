const URL =
	'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json';

export interface IDish {
	id: number;
	dishName: string;
	description: string;
	image: string;
}

export const loader: () => Promise<{
	dishes: IDish[];
}> = async () => {
	const res = await fetch(URL);
	const body = await res.json();

	return {
		dishes: body as IDish[],
	};
};
