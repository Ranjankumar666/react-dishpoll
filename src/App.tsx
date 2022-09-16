import { useLoaderData } from 'react-router-dom';
import './App.css';
import { IDish } from './routes/app';

function App() {
	const { dishes } = useLoaderData();

	return (
		<div className="App">
			{dishes &&
				dishes.map((dish: IDish) => {
					<div className="">{dish.dishName}</div>;
				})}
		</div>
	);
}

export default App;
