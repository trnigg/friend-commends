import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import ErrorPage from './pages/Error.jsx';
import ForYou from './pages/ForYou.jsx'; // Import your ForYou component
import User from './pages/User.jsx'; // Import your User component
import Movies from './pages/Movies.jsx'; // Import your Movies component
import TVShows from './pages/TVShows.jsx'; // Import your TVShows component
import Books from './pages/Books.jsx'; // Import your Books component
import Friends from './pages/Friends.jsx'; // Import your Friends component

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <ForYou />,
			},
			{
				path: 'user',
				element: <User />,
			},
			{
				path: 'movies',
				element: <Movies />,
			},
			{
				path: 'tv_shows',
				element: <TVShows />,
			},
			{
				path: 'books',
				element: <Books />,
			},
			{
				path: 'friends',
				element: <Friends />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
