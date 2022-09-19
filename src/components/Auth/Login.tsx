import { ActionFunction, Form, useActionData } from 'react-router-dom';
import { store } from '../../store/store';
import { log } from '../../store/slices/user';
import { initPrevVotes } from '../../store/slices/data';

export const loginAction: ActionFunction = async ({ request }) => {
	const form = await request.formData();

	// submit the form
	store.dispatch(
		log({
			username: form.get('username') as string,
			password: form.get('password') as string,
		})
	);
	// throw error if not logged
	if (!store.getState().user.logged) {
		return {
			error: 'Wrong creditials',
		};
	}

	// load prev data for current user
	const username = store.getState().user.username;
	store.dispatch(initPrevVotes(username));
};

export const Login = () => {
	const actionData = useActionData() as { error: string } | undefined;

	return (
		<>
			<Form method="post">
				{actionData && actionData.error && (
					<p className="error">{actionData.error} !!!</p>
				)}
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" />
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" />
				</div>
				<button type="submit">Login</button>
			</Form>
		</>
	);
};
