import { ActionFunction, Form } from 'react-router-dom';
import { store } from '../../store/store';
import { log } from '../../store/slices/user';

export const loginAction: ActionFunction = async ({ request }) => {
	const form = await request.formData();

	store.dispatch(
		log({
			username: form.get('username') as string,
			password: form.get('password') as string,
		})
	);
};

export const Login = () => {
	return (
		<>
			<Form method="post">
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
