import { useRef, useCallback, useEffect } from 'react';
import { Search, Button, Image, List } from 'semantic-ui-react';

const ContentSearch = ({
	state,
	dispatch,
	onResultSelect,
	handleSearch,
	setSelectedContent,
}) => {
	const { loading, results, value } = state;

	const timeoutRef = useRef();

	const handleSearchChange = useCallback(
		(e, data) => {
			clearTimeout(timeoutRef.current);
			dispatch({ type: 'START_SEARCH', query: data.value });

			timeoutRef.current = setTimeout(async () => {
				if (data.value.length === 0) {
					dispatch({ type: 'CLEAN_QUERY' });
					return;
				}

				try {
					const response = await handleSearch(data.value);
					console.log(response); // Add this line
					const results = response.results.slice(0, 5).map((item) => ({
						title: item.original_name || item.original_title, // Use item.original_title if item.original_name (title for movies, name for tv shows)
						description: item.overview,
						posterImage: item.poster_path,
						backdropImage: item.backdrop_path,
						id: item.id,
					}));

					if (response.results.length > 5) {
						results.push({
							title: 'Keep typing to see more results...',
							description: '',
							posterImage: '',
							backdropImage: '',
							id: '',
						});
					}
					dispatch({
						type: 'FINISH_SEARCH',
						results,
					});
				} catch (error) {
					console.error('Failed to search content', error);
				}
			}, 300); // 300ms delay before starting search
		},
		[handleSearch]
	);

	const handleClearSearch = () => {
		dispatch({ type: 'CLEAN_QUERY' });
		setSelectedContent(null); // Add this line
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	function resultRenderer({ posterImage, title, description }) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
				{posterImage && (
					<Image
						src={`http://image.tmdb.org/t/p/w185/${posterImage}`}
						alt={title}
						style={{
							marginRight: '10px',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				)}
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
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Search
				fluid
				loading={loading}
				onResultSelect={(e, data) => onResultSelect(e, data.result)}
				onSearchChange={handleSearchChange}
				results={results}
				value={value}
				style={{ flex: 1 }}
				resultRenderer={resultRenderer}
			/>
			<Button
				circular
				basic
				color="red"
				icon="close"
				onClick={handleClearSearch}
			/>
		</div>
	);
};

export default ContentSearch;
