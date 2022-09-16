import { FC, PropsWithChildren } from 'react';

export const ErrorPage: FC<PropsWithChildren> = () => {
	return (
		<div>
			<div>
				<h1>Oops!</h1>
				<h3>Page not found</h3>
			</div>
		</div>
	);
};
