// Uses different methodology for search bar over the userSearchBar component
// This largely copies code from below:
// https://react.semantic-ui.com/modules/search/#types-standard

// TODO: Currently, there is some in-line styling in the resultRenderer function. This should be moved to a CSS file.
// Note, this also requires refining; images are not diplaysed consistently.

// Poster path: http://image.tmdb.org/t/p/
// https://www.themoviedb.org/talk/568e3711c3a36858fc002384
// NOTE: These are the known poster_path sizes: "w92", "w154", "w185", "w342", "w500", "w780", or "original"
// so combined, for mobile eg http://image.tmdb.org/t/p/w185/ + poster_path

import { useReducer, useRef, useCallback, useEffect, useState } from 'react';
import { Search } from 'semantic-ui-react';
import { searchTVsByQuery, searchTVByID, searchTVSource } from '../utils/API';
import {
	Header,
	HeaderContent,
	Icon,
	Container,
	Segment,
	Image,
	List,
} from 'semantic-ui-react';

const initialState = {
	loading: false,
	results: [],
	value: '',
};

function exampleReducer(state, action) {
	switch (action.type) {
		case 'CLEAN_QUERY':
			return initialState;
		case 'START_SEARCH':
			return { ...state, loading: true, value: action.query };
		case 'FINISH_SEARCH':
			return { ...state, loading: false, results: action.results };
		case 'UPDATE_SELECTION':
			return { ...state, value: action.selection };

		default:
			throw new Error();
	}
}

function TVShows() {
	const [state, dispatch] = useReducer(exampleReducer, initialState);
	const { loading, results, value } = state;
	const [selectedTVShow, setSelectedTVShow] = useState(null);
	const [tvShowSource, setTVShowSource] = useState(null);

	const timeoutRef = useRef();
	const handleSearchChange = useCallback((e, data) => {
		clearTimeout(timeoutRef.current);
		dispatch({ type: 'START_SEARCH', query: data.value });

		timeoutRef.current = setTimeout(async () => {
			if (data.value.length === 0) {
				dispatch({ type: 'CLEAN_QUERY' });
				return;
			}

			try {
				const response = await searchTVsByQuery(data.value);
				console.log(response);
				const results = response.results.map((tvShow) => ({
					title: tvShow.name,
					description: tvShow.overview,
					image: tvShow.poster_path,
					id: tvShow.id,
				}));
				dispatch({
					type: 'FINISH_SEARCH',
					results,
				});
			} catch (error) {
				console.error('Failed to search TVs by query', error);
			}
		}, 300);
	}, []);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	const handleSelectTVShow = async (e, data) => {
		dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title });
		const tvShow = await searchTVByID(data.result.id);
		setSelectedTVShow(tvShow);
		const source = await searchTVSource(data.result.id);
		setTVShowSource(source);
	};

	function resultRenderer({ image, title, description }) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
				<Image
					src={`http://image.tmdb.org/t/p/w185/${image}`}
					alt={title}
					style={{
						marginRight: '10px',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
				<List>
					<List.Item>
						<List.Content>
							<List.Header>{title}</List.Header>
							<List.Description>
								{description.length > 200
									? description.slice(0, 200) + '...'
									: description}
							</List.Description>
						</List.Content>
					</List.Item>
				</List>
			</div>
		);
	}

	return (
		<Container>
			<h1>This is the TVShows page</h1>
			<Segment raised>
				<Header as="h2">
					<Icon name="tv" />
					<HeaderContent>Search for a show</HeaderContent>
				</Header>
				<Search
					fluid
					loading={loading}
					onResultSelect={handleSelectTVShow}
					onSearchChange={handleSearchChange}
					results={results}
					value={value}
					resultRenderer={resultRenderer}
				/>
			</Segment>
			{selectedTVShow && (
				<div>
					{/* Display selectedTVShow details */}
					<h2>{selectedTVShow.name}</h2>
					<p>{selectedTVShow.overview}</p>
					{/* Display tvShowSource details */}
					{tvShowSource && <p>Available on: {tvShowSource}</p>}
					{/* Add buttons for adding to watchlist, recommended list, or sharing */}
				</div>
			)}
		</Container>
	);
}

export default TVShows;
