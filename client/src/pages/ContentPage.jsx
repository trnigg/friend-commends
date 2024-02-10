import { useState, useReducer } from 'react';
import ContentSearch from '../components/contentSearch';
import SelectedContentCard from '../components/selectedContentCard';
import {
	Header,
	HeaderContent,
	Icon,
	Container,
	Segment,
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

function ContentPage({ searchByQuery, searchSource, contentType }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [selectedContent, setSelectedContent] = useState(null);
	const [contentSource, setContentSource] = useState(null);
	const [activeIndex, setActiveIndex] = useState(-1);
	const [noStreamingAvailable, setNoStreamingAvailable] = useState(false);

	const handleSearch = async (query) => {
		try {
			const data = await searchByQuery(query);
			return data;
		} catch (error) {
			console.error(`Failed to search ${contentType}s by query`, error);
		}
	};

	const handleSelectContent = async (e, data) => {
		if (data.title === 'Keep typing to see more results...') {
			return;
		}

		setActiveIndex(-1);
		dispatch({ type: 'UPDATE_SELECTION', selection: data.title });
		setSelectedContent(data);

		const source = await searchSource(data.id);
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
			<Segment raised>
				<Header as="h1">{contentType}</Header>
			</Segment>

			<Segment raised>
				<Header as="h2">
					<Icon name={contentType === 'tv' ? 'tv' : 'film'} />
					<HeaderContent>Search for a {contentType}</HeaderContent>
				</Header>
				<ContentSearch
					state={state}
					dispatch={dispatch}
					handleSearch={handleSearch}
					onResultSelect={handleSelectContent}
					setSelectedContent={setSelectedContent}
				/>
				<SelectedContentCard
					selectedContent={selectedContent}
					contentSource={contentSource}
					noStreamingAvailable={noStreamingAvailable}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
				/>
			</Segment>
			<Segment raised>
				<Header as="h2">
					<Icon name="thumbs up" />
					<HeaderContent>Recommended for you</HeaderContent>
				</Header>
			</Segment>
		</Container>
	);
}

export default ContentPage;
