// Uses different methodology for search bar over the userSearchBar component
// This largely copies code from below:
// https://react.semantic-ui.com/modules/search/#types-standard

// TODO: Currently, there is some in-line styling in the resultRenderer function. This should be moved to a CSS file.
// Note, this also requires refining; images are not diplaysed consistently.
// TODO: Also remove inline styles from the TVShows card and Accordion components

// In the future, adding transition to the TVShows card and Accordion components would be nice for user experience

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
	Card,
	CardContent,
	Accordion,
	Button,
	Label,
	CardMeta,
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

	// This will be used to store the number of recommendations
	// TODO also store the user who recommended it
	const [recommendations, setRecommendations] = useState(0);

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
					posterImage: tvShow.poster_path,
					backdropImage: tvShow.backdrop_path,
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
		setSelectedTVShow(data.result);

		const source = await searchTVSource(data.result.id);
		// By default, we will use the Australian region
		// In the future, we can add a user setting to change this and add it to the user's schema
		const userRegion = 'AU';

		if (source.results[userRegion]) {
			// Sort the providers by display priority, a default field from the API
			// lower numbers are higher priority
			const providers = source.results[userRegion].flatrate;
			providers.sort((a, b) => a.display_priority - b.display_priority);
			setTVShowSource(providers);
		} else {
			setTVShowSource([]);
		}
	};

	function resultRenderer({ posterImage, title, description }) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
				<Image
					src={`http://image.tmdb.org/t/p/w185/${posterImage}`}
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

	// panels for the accordion
	// requires ternary to check if the selectedTVShow is null;
	// otherwise it will throw an error before a TV show is selected
	const panels = [
		{
			key: 'description',
			title: 'Description',
			content: selectedTVShow ? selectedTVShow.description : '',
		},
		{
			key: 'stream',
			title: 'Stream',
			content: {
				content:
					tvShowSource &&
					tvShowSource.map((provider) => (
						<Label
							key={provider.provider_id}
							image
							style={{ marginBottom: '4px' }}
						>
							<img
								src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`}
							/>
							{provider.provider_name}
						</Label>
					)),
			},
		},
	];

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
				{selectedTVShow && (
					<Card>
						<CardContent>
							<Card.Header>{selectedTVShow.title}</Card.Header>
						</CardContent>
						<Image
							src={`http://image.tmdb.org/t/p/w342/${selectedTVShow.backdropImage}`}
							wrapped
							ui={false}
							rounded // This is not working
							style={{
								marginLeft: '15px',
								marginRight: '15px',
								marginBottom: '15px',
								borderRadius: '5px',
							}}
						/>
						<CardMeta
							style={{
								display: 'flex',
								alignItems: 'center',
								marginLeft: '15px',
								marginRight: '15px',
								marginBottom: '15px',
							}}
						>
							<Icon
								name="thumbs up outline"
								size="big"
								style={{ marginRight: '10px' }}
							/>
							<div>Recommended by name1, name 2 and 4 other friends.</div>
						</CardMeta>
						<CardContent extra>
							<Accordion defaultActiveIndex={0} panels={panels} />
						</CardContent>
						<CardContent
							extra
							style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}
						>
							<Button circular icon="thumbs up" size="big" />
							<Button circular icon="share" size="big" />
							<Button circular icon="add" size="big" />
						</CardContent>
					</Card>
				)}
			</Segment>
		</Container>
	);
}

export default TVShows;
