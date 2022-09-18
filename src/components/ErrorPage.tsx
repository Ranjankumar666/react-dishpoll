import { FC, PropsWithChildren } from 'react';
import { useRouteError } from 'react-router-dom';

export const ErrorPage: FC<PropsWithChildren> = () => {
	const error = useRouteError();

	return (
		<div>
			<div>
				<h1>Oops!</h1>
				<h3>{error.statusText || error.message}</h3>
			</div>
		</div>
	);
};
