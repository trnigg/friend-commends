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

import { useState, useReducer } from 'react';
import { Search } from 'semantic-ui-react';
import { searchTVsByQuery, searchTVByID, searchTVSource } from '../utils/API';
import ContentSearch from '../components/contentSearch';
import SelectedContent from '../components/selectedContent';
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

function reducer(state, action) {
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
	const [state, dispatch] = useReducer(reducer, initialState);
	const [selectedContent, setSelectedContent] = useState(null);
	const [contentSource, setContentSource] = useState(null);

	// This will be used to store the number of recommendations
	// TODO also store the user who recommended it
	const [recommendations, setRecommendations] = useState(0);

	// used in the accordion to keep track of the active index and reset on new search
	// activeIndex is the index of the active panel
	// -1 means no panels are open
	const [activeIndex, setActiveIndex] = useState(-1);

	// condition/state to display a message if no streaming is available in user's region
	const [noStreamingAvailable, setNoStreamingAvailable] = useState(false);

	const handleSearch = async (query) => {
		try {
			const data = await searchTVsByQuery(query);
			return data; // return the parsed data
		} catch (error) {
			console.error('Failed to search TVs by query', error);
		}
	};

	const handleSelectContent = async (e, data) => {
		console.log(data); // Log the data

		// If the selected result is the "Keep typing..." message, do nothing
		if (data.title === 'Keep typing to see more results...') {
			return;
		}

		setActiveIndex(-1);
		dispatch({ type: 'UPDATE_SELECTION', selection: data.title });
		setSelectedContent(data);

		const source = await searchTVSource(data.id);
		const userRegion = 'AU';

		if (source.results[userRegion]) {
			const providers = source.results[userRegion].flatrate;
			providers.sort((a, b) => a.display_priority - b.display_priority);
			setContentSource(providers);
			setNoStreamingAvailable(false);
		} else {
			setContentSource([]);
			setNoStreamingAvailable(true);
		}
	};

	return (
		<Container>
			<h1>This is the TVShows page</h1>
			<Segment raised>
				<Header as="h2">
					<Icon name="tv" />
					<HeaderContent>Search for a show</HeaderContent>
				</Header>
				<ContentSearch
					state={state}
					dispatch={dispatch}
					handleSearch={handleSearch}
					onResultSelect={handleSelectContent}
					setSelectedContent={setSelectedContent}
				/>
				<SelectedContent
					selectedContent={selectedContent}
					contentSource={contentSource}
					noStreamingAvailable={noStreamingAvailable}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
				/>
			</Segment>
		</Container>
	);
}

export default TVShows;
